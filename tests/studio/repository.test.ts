import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";

type RepositoryModule = typeof import("../../src/studio/repository");
type ErrorsModule = typeof import("../../src/studio/errors");

let repositoryModule: RepositoryModule | null = null;
let errorsModule: ErrorsModule | null = null;
try {
  repositoryModule = await import("../../src/studio/repository");
  errorsModule = await import("../../src/studio/errors");
} catch {
  repositoryModule = null;
  errorsModule = null;
}

const requireRepository = () => {
  expect(
    repositoryModule,
    "src/studio/repository.ts must implement the revision-safe D1 repository",
  ).not.toBeNull();
  expect(
    errorsModule,
    "src/studio/errors.ts must expose typed Studio repository errors",
  ).not.toBeNull();
  return {
    repository: repositoryModule as RepositoryModule,
    errors: errorsModule as ErrorsModule,
  };
};

type StateRow = {
  site_id: string;
  draft_json: string;
  draft_revision: number;
  published_version_number: number | null;
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

const now = "2026-08-24T12:00:00.000Z";
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

  prepare(query: string) {
    return new FakeD1PreparedStatement(this, query);
  }

  async batch(statements: FakeD1PreparedStatement[]) {
    const snapshot = {
      state: this.state ? { ...this.state } : null,
      versions: this.versions.map((row) => ({ ...row })),
      audits: this.audits.map((row) => ({ ...row })),
      nextVersionId: this.nextVersionId,
      nextAuditId: this.nextAuditId,
    };

    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
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

  corruptDraft(value: string) {
    if (!this.state) throw new Error("Studio is not initialized");
    this.state.draft_json = value;
  }

  corruptPublished(value: string) {
    if (!this.state?.published_version_number) throw new Error("No published version");
    const row = this.versions.find(
      (version) => version.version_number === this.state?.published_version_number,
    );
    if (!row) throw new Error("Published version missing");
    row.snapshot_json = value;
  }

  execute(query: string, params: unknown[]) {
    const sql = normalizeSql(query);

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
      const limit = Number(params[1] ?? 20);
      const offset = Number(params[2] ?? 0);
      return this.result(
        matching
          .sort((a, b) => b.version_number - a.version_number)
          .slice(offset, offset + limit)
          .map((row) => ({ ...row })),
      );
    }

    if (sql.startsWith("INSERT INTO STUDIO_VERSIONS")) {
      const [siteId, versionNumber, sourceRevision, snapshotJson, publishedBy] = params as [
        string,
        number,
        number,
        string,
        string | null,
      ];
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
      if (this.state) throw new Error("UNIQUE constraint failed: studio_state.site_id");
      this.state = {
        site_id: siteId,
        draft_json: draftJson,
        draft_revision: draftRevision,
        published_version_number: publishedVersionNumber,
        created_at: now,
        updated_at: now,
      };
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
    return {
      success: true,
      results,
      meta: { changes },
    };
  }
}

const asD1 = (db: FakeD1) => db as unknown as D1Database;

const changedDocument = (title: string) => {
  const document = createDefaultSiteDocument();
  document.home.hero.title = title;
  return document;
};

describe("Studio D1 repository", () => {
  it("fails closed when Studio state is not initialized", async () => {
    const { repository, errors } = requireRepository();
    const db = new FakeD1();

    await expect(repository.getStudioState(asD1(db))).rejects.toBeInstanceOf(
      errors.StudioNotInitializedError,
    );
    await expect(repository.getDraft(asD1(db))).rejects.toBeInstanceOf(
      errors.StudioNotInitializedError,
    );
    await expect(repository.getPublished(asD1(db))).rejects.toBeInstanceOf(
      errors.StudioNotInitializedError,
    );
  });

  it("initializes one draft, immutable version 1 and one audit event", async () => {
    const { repository } = requireRepository();
    const db = new FakeD1();
    const document = createDefaultSiteDocument();

    await repository.initializeStudio(asD1(db), document, "local-seed");

    const state = await repository.getStudioState(asD1(db));
    expect(state).toMatchObject({
      siteId: "menezesdev",
      draftRevision: 0,
      publishedVersionNumber: 1,
    });
    expect(await repository.getDraft(asD1(db))).toEqual({ document, revision: 0 });
    expect(await repository.getPublished(asD1(db))).toMatchObject({
      document,
      versionNumber: 1,
      sourceRevision: 0,
      publishedBy: "local-seed",
    });
    expect(db.versions).toHaveLength(1);
    expect(db.audits).toHaveLength(1);
    expect(db.audits[0]).toMatchObject({
      event_type: "studio_initialized",
      actor_subject: "local-seed",
      entity_type: "studio",
      entity_id: "menezesdev",
    });
  });

  it("saves a draft with one compare-and-swap revision increment", async () => {
    const { repository } = requireRepository();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");

    const document = changedDocument("Título de rascunho");
    const saved = await repository.saveDraft(asD1(db), {
      document,
      expectedRevision: 0,
    });

    expect(saved).toEqual({ document, revision: 1 });
    expect(await repository.getDraft(asD1(db))).toEqual({ document, revision: 1 });
  });

  it("rejects stale revisions without overwriting the stored draft", async () => {
    const { repository, errors } = requireRepository();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");

    const winner = changedDocument("Primeiro editor");
    await repository.saveDraft(asD1(db), { document: winner, expectedRevision: 0 });

    await expect(
      repository.saveDraft(asD1(db), {
        document: changedDocument("Editor atrasado"),
        expectedRevision: 0,
      }),
    ).rejects.toBeInstanceOf(errors.StudioRevisionConflictError);

    expect(await repository.getDraft(asD1(db))).toEqual({ document: winner, revision: 1 });
  });

  it("never exposes mutable draft data through the published read path", async () => {
    const { repository } = requireRepository();
    const db = new FakeD1();
    const published = createDefaultSiteDocument();
    await repository.initializeStudio(asD1(db), published, "local-seed");

    await repository.saveDraft(asD1(db), {
      document: changedDocument("Somente no rascunho"),
      expectedRevision: 0,
    });

    const result = await repository.getPublished(asD1(db));
    expect(result.document).toEqual(published);
    expect(result.versionNumber).toBe(1);
  });

  it("lists versions and fetches a specific immutable snapshot", async () => {
    const { repository } = requireRepository();
    const db = new FakeD1();
    const document = createDefaultSiteDocument();
    await repository.initializeStudio(asD1(db), document, "local-seed");

    expect(await repository.listVersions(asD1(db), { limit: 10, offset: 0 })).toEqual([
      expect.objectContaining({ versionNumber: 1, sourceRevision: 0, publishedBy: "local-seed" }),
    ]);
    expect(await repository.getVersion(asD1(db), 1)).toMatchObject({
      document,
      versionNumber: 1,
      sourceRevision: 0,
      publishedBy: "local-seed",
    });
    expect(await repository.getVersion(asD1(db), 999)).toBeNull();
  });

  it("fails closed when stored draft JSON is malformed", async () => {
    const { repository, errors } = requireRepository();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");
    db.corruptDraft("{not-json");

    await expect(repository.getDraft(asD1(db))).rejects.toBeInstanceOf(
      errors.StudioStoredDocumentError,
    );
  });

  it("fails closed when a published snapshot is malformed", async () => {
    const { repository, errors } = requireRepository();
    const db = new FakeD1();
    await repository.initializeStudio(asD1(db), createDefaultSiteDocument(), "local-seed");
    db.corruptPublished(JSON.stringify({ schemaVersion: 999 }));

    await expect(repository.getPublished(asD1(db))).rejects.toBeInstanceOf(
      errors.StudioStoredDocumentError,
    );
  });

  it("refuses duplicate initialization without mutating existing state", async () => {
    const { repository, errors } = requireRepository();
    const db = new FakeD1();
    const document = createDefaultSiteDocument();
    await repository.initializeStudio(asD1(db), document, "local-seed");

    await expect(
      repository.initializeStudio(asD1(db), changedDocument("Não substituir"), "local-seed"),
    ).rejects.toBeInstanceOf(errors.StudioAlreadyInitializedError);

    expect(await repository.getDraft(asD1(db))).toEqual({ document, revision: 0 });
    expect(db.versions).toHaveLength(1);
  });
});
