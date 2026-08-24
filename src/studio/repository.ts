import {
  StudioAlreadyInitializedError,
  StudioDocumentValidationError,
  StudioNotInitializedError,
  StudioRevisionConflictError,
  StudioStoredDocumentError,
} from "./errors";
import type { SiteDocument } from "./types";
import { validateSiteDocument } from "./validation";

export const STUDIO_SITE_ID = "menezesdev" as const;

interface StudioStateRow {
  site_id: string;
  draft_json: string;
  draft_revision: number;
  published_version_number: number | null;
  created_at: string;
  updated_at: string;
}

interface StudioVersionRow {
  id: number;
  version_number: number;
  source_revision: number;
  snapshot_json: string;
  published_by: string | null;
  published_at: string;
}

export interface StudioState {
  siteId: string;
  draftRevision: number;
  publishedVersionNumber: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudioDraft {
  document: SiteDocument;
  revision: number;
}

export interface StudioVersion {
  id: number;
  document: SiteDocument;
  versionNumber: number;
  sourceRevision: number;
  publishedBy: string | null;
  publishedAt: string;
}

export interface StudioVersionSummary {
  id: number;
  versionNumber: number;
  sourceRevision: number;
  publishedBy: string | null;
  publishedAt: string;
}

const stateSelect = `
  SELECT site_id, draft_json, draft_revision, published_version_number, created_at, updated_at
  FROM studio_state
  WHERE site_id = ?
  LIMIT 1
`;

const parseStoredDocument = (json: string, mode: "draft" | "publish"): SiteDocument => {
  let candidate: unknown;
  try {
    candidate = JSON.parse(json);
  } catch (cause) {
    throw new StudioStoredDocumentError("Stored Studio document is not valid JSON.", { cause });
  }

  const validation = validateSiteDocument(candidate, { mode });
  if (!validation.ok) {
    throw new StudioStoredDocumentError(
      `Stored Studio document failed ${mode} validation: ${validation.issues
        .map((issue) => issue.path || "<root>")
        .join(", ")}.`,
    );
  }

  return candidate as SiteDocument;
};

const validateIncomingDocument = (document: SiteDocument, mode: "draft" | "publish"): void => {
  const validation = validateSiteDocument(document, { mode });
  if (!validation.ok) throw new StudioDocumentValidationError(validation.issues);
};

const readStateRow = async (db: D1Database): Promise<StudioStateRow | null> =>
  db.prepare(stateSelect).bind(STUDIO_SITE_ID).first<StudioStateRow>();

const toState = (row: StudioStateRow): StudioState => ({
  siteId: row.site_id,
  draftRevision: row.draft_revision,
  publishedVersionNumber: row.published_version_number,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const toVersion = (row: StudioVersionRow): StudioVersion => ({
  id: row.id,
  document: parseStoredDocument(row.snapshot_json, "publish"),
  versionNumber: row.version_number,
  sourceRevision: row.source_revision,
  publishedBy: row.published_by,
  publishedAt: row.published_at,
});

export const getStudioState = async (db: D1Database): Promise<StudioState> => {
  const row = await readStateRow(db);
  if (!row) throw new StudioNotInitializedError();
  return toState(row);
};

export const getDraft = async (db: D1Database): Promise<StudioDraft> => {
  const row = await readStateRow(db);
  if (!row) throw new StudioNotInitializedError();

  return {
    document: parseStoredDocument(row.draft_json, "draft"),
    revision: row.draft_revision,
  };
};

export const getPublished = async (db: D1Database): Promise<StudioVersion> => {
  const state = await readStateRow(db);
  if (!state) throw new StudioNotInitializedError();
  if (state.published_version_number === null) {
    throw new StudioStoredDocumentError("Studio has no active published version.");
  }

  const row = await db
    .prepare(
      `
        SELECT v.id, v.version_number, v.source_revision, v.snapshot_json, v.published_by, v.published_at
        FROM studio_state s
        JOIN studio_versions v
          ON v.site_id = s.site_id
         AND v.version_number = s.published_version_number
        WHERE s.site_id = ?
        LIMIT 1
      `,
    )
    .bind(STUDIO_SITE_ID)
    .first<StudioVersionRow>();

  if (!row) {
    throw new StudioStoredDocumentError("Published Studio version pointer is invalid.");
  }

  return toVersion(row);
};

export const saveDraft = async (
  db: D1Database,
  input: { document: SiteDocument; expectedRevision: number },
): Promise<StudioDraft> => {
  validateIncomingDocument(input.document, "draft");

  if (!Number.isInteger(input.expectedRevision) || input.expectedRevision < 0) {
    throw new StudioRevisionConflictError(input.expectedRevision, -1);
  }

  const result = await db
    .prepare(
      `
        UPDATE studio_state
        SET draft_json = ?,
            draft_revision = draft_revision + 1,
            updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(JSON.stringify(input.document), STUDIO_SITE_ID, input.expectedRevision)
    .run();

  if (Number(result.meta.changes ?? 0) === 0) {
    const current = await readStateRow(db);
    if (!current) throw new StudioNotInitializedError();
    throw new StudioRevisionConflictError(input.expectedRevision, current.draft_revision);
  }

  return {
    document: input.document,
    revision: input.expectedRevision + 1,
  };
};

export const listVersions = async (
  db: D1Database,
  page: { limit?: number; offset?: number } = {},
): Promise<StudioVersionSummary[]> => {
  const limit = Math.min(100, Math.max(1, Math.trunc(page.limit ?? 20)));
  const offset = Math.max(0, Math.trunc(page.offset ?? 0));

  const result = await db
    .prepare(
      `
        SELECT id, version_number, source_revision, published_by, published_at
        FROM studio_versions
        WHERE site_id = ?
        ORDER BY version_number DESC
        LIMIT ? OFFSET ?
      `,
    )
    .bind(STUDIO_SITE_ID, limit, offset)
    .all<Omit<StudioVersionRow, "snapshot_json">>();

  return result.results.map((row) => ({
    id: row.id,
    versionNumber: row.version_number,
    sourceRevision: row.source_revision,
    publishedBy: row.published_by,
    publishedAt: row.published_at,
  }));
};

export const getVersion = async (
  db: D1Database,
  versionNumber: number,
): Promise<StudioVersion | null> => {
  if (!Number.isInteger(versionNumber) || versionNumber <= 0) return null;

  const row = await db
    .prepare(
      `
        SELECT id, version_number, source_revision, snapshot_json, published_by, published_at
        FROM studio_versions
        WHERE site_id = ?
          AND version_number = ?
        LIMIT 1
      `,
    )
    .bind(STUDIO_SITE_ID, versionNumber)
    .first<StudioVersionRow>();

  return row ? toVersion(row) : null;
};

export const initializeStudio = async (
  db: D1Database,
  document: SiteDocument,
  actor: string,
): Promise<void> => {
  validateIncomingDocument(document, "publish");

  if (await readStateRow(db)) throw new StudioAlreadyInitializedError();

  const serialized = JSON.stringify(document);
  const versionInsert = db
    .prepare(
      `
        INSERT INTO studio_versions
          (site_id, version_number, source_revision, snapshot_json, published_by)
        VALUES (?, ?, ?, ?, ?)
      `,
    )
    .bind(STUDIO_SITE_ID, 1, 0, serialized, actor);

  const stateInsert = db
    .prepare(
      `
        INSERT INTO studio_state
          (site_id, draft_json, draft_revision, published_version_number)
        VALUES (?, ?, ?, ?)
      `,
    )
    .bind(STUDIO_SITE_ID, serialized, 0, 1);

  const auditInsert = db
    .prepare(
      `
        INSERT INTO audit_events
          (site_id, event_type, actor_subject, entity_type, entity_id, details_json)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
    )
    .bind(
      STUDIO_SITE_ID,
      "studio_initialized",
      actor,
      "studio",
      STUDIO_SITE_ID,
      JSON.stringify({ versionNumber: 1 }),
    );

  try {
    await db.batch([versionInsert, stateInsert, auditInsert]);
  } catch (cause) {
    if (await readStateRow(db)) throw new StudioAlreadyInitializedError();
    throw cause;
  }
};
