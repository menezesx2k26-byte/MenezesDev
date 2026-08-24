import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import * as repository from "../../src/studio/repository";
import * as errors from "../../src/studio/errors";

type PublicationModule = typeof import("../../src/studio/publication");

let publicationModule: PublicationModule | null = null;
try {
  publicationModule = await import("../../src/studio/publication");
} catch {
  publicationModule = null;
}

const requirePublication = () => {
  expect(
    publicationModule,
    "src/studio/publication.ts must implement atomic publish and non-destructive restore",
  ).not.toBeNull();
  return publicationModule as PublicationModule;
};

type StateRow = {
  site_id: string;
  draft_json: string;
  draft_revision: number;
  published_version_number: number | null;
  draft_restored_from_version_id: number | null;
  created_at: string;
  updated_at: string;
};

type VersionRow = {
  id: number;
  site_id: string;
  version_number: number;
  source_revision: number;
  snapshot_json: string;
  published_by: string | null;
  published_at: string;
  restored_from_version_id: number | null;
};

type AuditRow = {
  id: number;
  site_id: string;
  event_type: string;
  actor_subject: string | null;
  entity_type: string;
  entity_id: string | null;
  details_json: string | null;
  created_at: string;
};

const now = "2026-08-24T13:00:00.000Z";
const normalizeSql = (query: string) => query.replace(/\s+/g, " ").trim().toUpperCase();

class FakeD1PreparedStatement {
  constructor(
    private readonly db: FakeD1,
    readonly query: string,
    readonly params: unknown[] = [],
  ) {}

  bind(...params: unknown[]) {
    return new FakeD1PreparedStatement(this.db, this.query, params);
  }

  async first<T>(): Promise<T | null> {
    const result = this.db.execute(this.query, this.params);
    return (result.results[0] as T | undefined) ?? null;
  }

  async all<T>() {
    return this.db.execute(this.query, this.params) as unknown as D1Result<T>;
  }

  async run<T>() {
    return this.db.execute(this.query, this.params) as unknown as D1Result<T>;
  }
}

class FakeD1 {
  state: StateRow | null = null;
  versions: VersionRow[] = [];
  audits: AuditRow[] = [];
  private nextVersionId = 1;
  private nextAuditId = 1;
  private failBatchStatement: number | null = null;

  prepare(query: string) {
    return new FakeD1PreparedStatement(this, query);
  }

  failNextBatchAt(statementIndex: number) {
    this.failBatchStatement = statementIndex;
  }

  async batch(statements: FakeD1PreparedStatement[]) {
    const snapshot = {
      state: this.state ? { ...this.state } : null,
      versions: this.versions.map((row) => ({ ...row })),
      audits: this.audits.map((row) => ({ ...row })),
      nextVersionId: this.nextVersionId,
      nextAuditId: this.nextAuditId,
    };
    const failAt = this.failBatchStatement;
    this.failBatchStatement = null;

    try {
      const results = [];
      for (let index = 0; index < statements.length; index += 1) {
        if (failAt === index) throw new Error(`simulated D1 batch failure at ${index}`);
        results.push(await statements[index]!.run());
      }
      return results;
    } catch (error) {
      this.state = snapshot.state;
      this.versions = snapshot.versions;
      this.audits = snapshot.audits;
      this.nextVersionId = snapshot.nextVersionId;
      this.nextAuditId = snapshot.nextAuditId;
      throw error;
    }
  }

  execute(query: string, params: unknown[]) {
    const sql = normalizeSql(query);

    if (sql.startsWith("SELECT") && sql.includes("MAX(VERSION_NUMBER)")) {
      const [siteId] = params as [string];
      const max = this.versions
        .filter((row) => row.site_id === siteId)
        .reduce((value, row) => Math.max(value, row.version_number), 0);
      return this.result([{ next_version_number: max + 1 }]);
    }

    if (sql.startsWith("SELECT") && sql.includes("JOIN STUDIO_VERSIONS")) {
      const [siteId] = params as [string];
      if (!this.state || this.state.site_id !== siteId || !this.state.published_version_number) {
        return this.result([]);
      }
      const version = this.versions.find(
        (row) =>
          row.site_id === siteId && row.version_number === this.state?.published_version_number,
      );
      return this.result(version ? [{ ...version }] : []);
    }

    if (sql.startsWith("SELECT") && sql.includes("FROM STUDIO_STATE")) {
      const [siteId] = params as [string];
      return this.result(this.state && this.state.site_id === siteId ? [{ ...this.state }] : []);
    }

    if (sql.startsWith("SELECT") && sql.includes("FROM STUDIO_VERSIONS")) {
      const [siteId] = params as [string];
      const matching = this.versions.filter((row) => row.site_id === siteId);
      if (sql.includes("VERSION_NUMBER = ?")) {
        const versionNumber = Number(params[1]);
        const version = matching.find((row) => row.version_number === versionNumber);
        return this.result(version ? [{ ...version }] : []);
      }
      return this.result(matching.map((row) => ({ ...row })));
    }

    if (sql.startsWith("INSERT INTO STUDIO_VERSIONS") && sql.includes(" SELECT ")) {
      const [
        siteId,
        versionNumber,
        sourceRevision,
        snapshotJson,
        publishedBy,
        stateSiteId,
        expectedRevision,
      ] = params as [string, number, number, string, string | null, string, number];
      if (
        !this.state ||
        this.state.site_id !== stateSiteId ||
        this.state.site_id !== siteId ||
        this.state.draft_revision !== expectedRevision
      ) {
        return this.result([], 0);
      }
      if (this.versions.some((row) => row.version_number === versionNumber)) {
        throw new Error("UNIQUE constraint failed: studio_versions.version_number");
      }
      this.versions.push({
        id: this.nextVersionId++,
        site_id: siteId,
        version_number: versionNumber,
        source_revision: sourceRevision,
        snapshot_json: snapshotJson,
        published_by: publishedBy,
        published_at: now,
        restored_from_version_id: this.state.draft_restored_from_version_id,
      });
      return this.result([], 1);
    }

    if (sql.startsWith("INSERT INTO STUDIO_VERSIONS")) {
      const [siteId, versionNumber, sourceRevision, snapshotJson, publishedBy] = params as [
        string,
        number,
        number,
        string,
        string | null,
      ];
      this.versions.push({
        id: this.nextVersionId++,
        site_id: siteId,
        version_number: versionNumber,
        source_revision: sourceRevision,
        snapshot_json: snapshotJson,
        published_by: publishedBy,
        published_at: now,
        restored_from_version_id: null,
      });
      return this.result([], 1);
    }

    if (sql.startsWith("INSERT INTO STUDIO_STATE")) {
      const [siteId, draftJson, draftRevision, publishedVersionNumber] = params as [
        string,
        string,
        number,
        number | null,
      ];
      this.state = {
        site_id: siteId,
        draft_json: draftJson,
        draft_revision: draftRevision,
        published_version_number: publishedVersionNumber,
        draft_restored_from_version_id: null,
        created_at: now,
        updated_at: now,
      };
      return this.result([], 1);
    }

    if (sql.startsWith("INSERT INTO AUDIT_EVENTS") && sql.includes(" SELECT ")) {
      const [siteId, eventType, actorSubject, entityType, entityId, detailsJson, stateSiteId, revision] =
        params as [string, string, string | null, string, string | null, string | null, string, number];
      if (
        !this.state ||
        this.state.site_id !== stateSiteId ||
        this.state.site_id !== siteId ||
        this.state.draft_revision !== revision
      ) {
        return this.result([], 0);
      }
      this.audits.push({
        id: this.nextAuditId++,
        site_id: siteId,
        event_type: eventType,
        actor_subject: actorSubject,
        entity_type: entityType,
        entity_id: entityId,
        details_json: detailsJson,
        created_at: now,
      });
      return this.result([], 1);
    }

    if (sql.startsWith("INSERT INTO AUDIT_EVENTS")) {
      const [siteId, eventType, actorSubject, entityType, entityId, detailsJson] = params as [
        string,
        string,
        string | null,
        string,
        string | null,
        string | null,
      ];
      this.audits.push({
        id: this.nextAuditId++,
        site_id: siteId,
        event_type: eventType,
        actor_subject: actorSubject,
        entity_type: entityType,
        entity_id: entityId,
        details_json: detailsJson,
        created_at: now,
      });
      return this.result([], 1);
    }

    if (sql.startsWith("UPDATE STUDIO_STATE") && sql.includes("PUBLISHED_VERSION_NUMBER")) {
      const [draftJson, versionNumber, siteId, expectedRevision] = params as [
        string,
        number,
        string,
        number,
      ];
      if (
        !this.state ||
        this.state.site_id !== siteId ||
        this.state.draft_revision !== expectedRevision
      ) {
        return this.result([], 0);
      }
      this.state.draft_json = draftJson;
      this.state.draft_revision += 1;
      this.state.published_version_number = versionNumber;
      this.state.draft_restored_from_version_id = null;
      this.state.updated_at = now;
      return this.result([], 1);
    }

    if (sql.startsWith("UPDATE STUDIO_STATE") && sql.includes("DRAFT_RESTORED_FROM_VERSION_ID")) {
      const [draftJson, restoredFromVersionId, siteId, expectedRevision] = params as [
        string,
        number,
        string,
        number,
      ];
      if (
        !this.state ||
        this.state.site_id !== siteId ||
        this.state.draft_revision !== expectedRevision
      ) {
        return this.result([], 0);
      }
      this.state.draft_json = draftJson;
      this.state.draft_revision += 1;
      this.state.draft_restored_from_version_id = restoredFromVersionId;
      this.state.updated_at = now;
      return this.result([], 1);
    }

    if (sql.startsWith("UPDATE STUDIO_STATE")) {
      const [draftJson, siteId, expectedRevision] = params as [string, string, number];
      if (
        !this.state ||
        this.state.site_id !== siteId ||
        this.state.draft_revision !== expectedRevision
      ) {
        return this.result([], 0);
      }
      this.state.draft_json = draftJson;
      this.state.draft_revision += 1;
      this.state.updated_at = now;
      return this.result([], 1);
    }

    throw new Error(`Unsupported fake D1 query: ${query}`);
  }

  private result(results: unknown[], changes = 0) {
    return { success: true, results, meta: { changes } };
  }
}

const asD1 = (db: FakeD1) => db as unknown as D1Database;

const documentWithHero = (title: string) => {
  const document = createDefaultSiteDocument();
  document.home.hero.title = title;
  return document;
};

const setupChangedDraft = async (db: FakeD1, title = "Versão publicada dois") => {
  const baseline = createDefaultSiteDocument();
  await repository.initializeStudio(asD1(db), baseline, "local-seed");
  const changed = documentWithHero(title);
  await repository.saveDraft(asD1(db), { document: changed, expectedRevision: 0 });
  return { baseline, changed };
};

describe("Studio atomic publication and restore", () => {
  it("validates the complete draft in publish mode before writing anything", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");
    const invalidForPublish = documentWithHero("");
    await repository.saveDraft(asD1(db), { document: invalidForPublish, expectedRevision: 0 });

    await expect(
      publication.publishDraft(asD1(db), { expectedRevision: 1, actor: "editor" }),
    ).rejects.toBeInstanceOf(errors.StudioDocumentValidationError);

    expect(db.versions).toHaveLength(1);
    expect(db.state?.published_version_number).toBe(1);
    expect(db.audits.map((row) => row.event_type)).toEqual(["studio_initialized"]);
  });

  it("publishes one immutable snapshot, advances revision, switches pointer and audits", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    const { baseline, changed } = await setupChangedDraft(db);
    const versionOneJson = db.versions[0]?.snapshot_json;

    const result = await publication.publishDraft(asD1(db), {
      expectedRevision: 1,
      actor: "editor",
    });

    expect(result).toEqual({ versionNumber: 2, revision: 2, restoredFromVersionId: null });
    expect(db.versions).toHaveLength(2);
    expect(db.versions[0]?.snapshot_json).toBe(versionOneJson);
    expect(JSON.parse(db.versions[0]!.snapshot_json)).toEqual(baseline);
    expect(JSON.parse(db.versions[1]!.snapshot_json)).toEqual(changed);
    expect(db.state).toMatchObject({
      draft_revision: 2,
      published_version_number: 2,
      draft_restored_from_version_id: null,
    });
    expect((await repository.getPublished(asD1(db))).document).toEqual(changed);
    expect(db.audits.at(-1)).toMatchObject({
      event_type: "studio_published",
      actor_subject: "editor",
      entity_type: "studio_version",
      entity_id: "2",
    });
  });

  it("rejects a stale publish revision without creating history", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    await setupChangedDraft(db);

    await expect(
      publication.publishDraft(asD1(db), { expectedRevision: 0, actor: "stale-editor" }),
    ).rejects.toBeInstanceOf(errors.StudioRevisionConflictError);

    expect(db.versions).toHaveLength(1);
    expect(db.state?.published_version_number).toBe(1);
  });

  it("rolls back the whole publication batch when D1 fails", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    const { baseline } = await setupChangedDraft(db);
    db.failNextBatchAt(1);

    await expect(
      publication.publishDraft(asD1(db), { expectedRevision: 1, actor: "editor" }),
    ).rejects.toThrow("simulated D1 batch failure");

    expect(db.versions).toHaveLength(1);
    expect(db.state).toMatchObject({ draft_revision: 1, published_version_number: 1 });
    expect(db.audits.map((row) => row.event_type)).toEqual(["studio_initialized"]);
    expect((await repository.getPublished(asD1(db))).document).toEqual(baseline);
  });

  it("restores an immutable old snapshot into draft without publishing it", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    const { baseline, changed } = await setupChangedDraft(db);
    await publication.publishDraft(asD1(db), { expectedRevision: 1, actor: "editor" });
    const versionOneId = db.versions[0]!.id;

    const restored = await publication.restoreVersionToDraft(asD1(db), {
      versionNumber: 1,
      expectedRevision: 2,
      actor: "editor",
    });

    expect(restored).toEqual({
      document: baseline,
      revision: 3,
      restoredFromVersionId: versionOneId,
    });
    expect(db.versions).toHaveLength(2);
    expect(db.state).toMatchObject({
      draft_revision: 3,
      published_version_number: 2,
      draft_restored_from_version_id: versionOneId,
    });
    expect((await repository.getDraft(asD1(db))).document).toEqual(baseline);
    expect((await repository.getPublished(asD1(db))).document).toEqual(changed);
    expect(db.audits.at(-1)).toMatchObject({
      event_type: "studio_version_restored_to_draft",
      actor_subject: "editor",
      entity_type: "studio_version",
      entity_id: "1",
    });
  });

  it("publishes a restored draft as a new version carrying immutable lineage", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    const { baseline } = await setupChangedDraft(db);
    await publication.publishDraft(asD1(db), { expectedRevision: 1, actor: "editor" });
    const versionOneId = db.versions[0]!.id;
    await publication.restoreVersionToDraft(asD1(db), {
      versionNumber: 1,
      expectedRevision: 2,
      actor: "editor",
    });

    const result = await publication.publishDraft(asD1(db), {
      expectedRevision: 3,
      actor: "editor",
    });

    expect(result).toEqual({
      versionNumber: 3,
      revision: 4,
      restoredFromVersionId: versionOneId,
    });
    expect(db.versions).toHaveLength(3);
    expect(db.versions[2]).toMatchObject({
      version_number: 3,
      source_revision: 3,
      restored_from_version_id: versionOneId,
    });
    expect(JSON.parse(db.versions[2]!.snapshot_json)).toEqual(baseline);
    expect(db.state).toMatchObject({
      draft_revision: 4,
      published_version_number: 3,
      draft_restored_from_version_id: null,
    });
  });

  it("uses optimistic revision for restore and leaves state untouched on conflict", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    await setupChangedDraft(db);
    const before = JSON.stringify({ state: db.state, versions: db.versions, audits: db.audits });

    await expect(
      publication.restoreVersionToDraft(asD1(db), {
        versionNumber: 1,
        expectedRevision: 0,
        actor: "stale-editor",
      }),
    ).rejects.toBeInstanceOf(errors.StudioRevisionConflictError);

    expect(JSON.stringify({ state: db.state, versions: db.versions, audits: db.audits })).toBe(before);
  });

  it("fails explicitly when the requested restore version does not exist", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");

    await expect(
      publication.restoreVersionToDraft(asD1(db), {
        versionNumber: 999,
        expectedRevision: 0,
        actor: "editor",
      }),
    ).rejects.toMatchObject({ name: "StudioVersionNotFoundError" });

    expect(db.versions).toHaveLength(1);
    expect(db.state?.published_version_number).toBe(1);
  });

  it("rolls back restore audit and draft mutation together when its batch fails", async () => {
    const publication = requirePublication();
    const db = new FakeD1();
    await setupChangedDraft(db);
    db.failNextBatchAt(1);

    await expect(
      publication.restoreVersionToDraft(asD1(db), {
        versionNumber: 1,
        expectedRevision: 1,
        actor: "editor",
      }),
    ).rejects.toThrow("simulated D1 batch failure");

    expect(db.state).toMatchObject({
      draft_revision: 1,
      published_version_number: 1,
      draft_restored_from_version_id: null,
    });
    expect(db.audits.map((row) => row.event_type)).toEqual(["studio_initialized"]);
  });
});
