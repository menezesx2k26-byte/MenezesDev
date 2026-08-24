import {
  StudioDocumentValidationError,
  StudioNotInitializedError,
  StudioRevisionConflictError,
  StudioVersionNotFoundError,
} from "./errors";
import { getDraft, getVersion, STUDIO_SITE_ID } from "./repository";
import type { SiteDocument } from "./types";
import { validateSiteDocument } from "./validation";

interface PublicationStateRow {
  draft_revision: number;
  published_version_number: number | null;
  draft_restored_from_version_id: number | null;
}

interface NextVersionRow {
  next_version_number: number;
}

export interface PublishDraftResult {
  versionNumber: number;
  revision: number;
  restoredFromVersionId: number | null;
}

export interface RestoreDraftResult {
  document: SiteDocument;
  revision: number;
  restoredFromVersionId: number;
}

const readPublicationState = async (db: D1Database): Promise<PublicationStateRow> => {
  const row = await db
    .prepare(
      `
        SELECT draft_revision, published_version_number, draft_restored_from_version_id
        FROM studio_state
        WHERE site_id = ?
        LIMIT 1
      `,
    )
    .bind(STUDIO_SITE_ID)
    .first<PublicationStateRow>();

  if (!row) throw new StudioNotInitializedError();
  return row;
};

const requireExpectedRevision = (expectedRevision: number, currentRevision: number): void => {
  if (
    !Number.isInteger(expectedRevision) ||
    expectedRevision < 0 ||
    expectedRevision !== currentRevision
  ) {
    throw new StudioRevisionConflictError(expectedRevision, currentRevision);
  }
};

const changes = (result: D1Result<unknown> | undefined): number =>
  Number(result?.meta.changes ?? 0);

const validateForPublication = (document: SiteDocument): void => {
  const validation = validateSiteDocument(document, { mode: "publish" });
  if (!validation.ok) throw new StudioDocumentValidationError(validation.issues);
};

export const publishDraft = async (
  db: D1Database,
  input: { expectedRevision: number; actor: string },
): Promise<PublishDraftResult> => {
  const state = await readPublicationState(db);
  requireExpectedRevision(input.expectedRevision, state.draft_revision);

  const draft = await getDraft(db);
  requireExpectedRevision(input.expectedRevision, draft.revision);
  validateForPublication(draft.document);

  const nextVersion = await db
    .prepare(
      `
        SELECT COALESCE(MAX(version_number), 0) + 1 AS next_version_number
        FROM studio_versions
        WHERE site_id = ?
      `,
    )
    .bind(STUDIO_SITE_ID)
    .first<NextVersionRow>();

  const versionNumber = Number(nextVersion?.next_version_number ?? 1);
  const serialized = JSON.stringify(draft.document);
  const restoredFromVersionId = state.draft_restored_from_version_id ?? null;

  const versionInsert = db
    .prepare(
      `
        INSERT INTO studio_versions
          (
            site_id,
            version_number,
            source_revision,
            snapshot_json,
            published_by,
            restored_from_version_id
          )
        SELECT ?, ?, ?, ?, ?, draft_restored_from_version_id
        FROM studio_state
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(
      STUDIO_SITE_ID,
      versionNumber,
      input.expectedRevision,
      serialized,
      input.actor,
      STUDIO_SITE_ID,
      input.expectedRevision,
    );

  const auditInsert = db
    .prepare(
      `
        INSERT INTO audit_events
          (site_id, event_type, actor_subject, entity_type, entity_id, details_json)
        SELECT ?, ?, ?, ?, ?, ?
        FROM studio_state
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(
      STUDIO_SITE_ID,
      "studio_published",
      input.actor,
      "studio_version",
      String(versionNumber),
      JSON.stringify({
        versionNumber,
        sourceRevision: input.expectedRevision,
        restoredFromVersionId,
      }),
      STUDIO_SITE_ID,
      input.expectedRevision,
    );

  const stateUpdate = db
    .prepare(
      `
        UPDATE studio_state
        SET draft_json = ?,
            draft_revision = draft_revision + 1,
            published_version_number = ?,
            draft_restored_from_version_id = NULL,
            updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(serialized, versionNumber, STUDIO_SITE_ID, input.expectedRevision);

  let results: D1Result<unknown>[];
  try {
    results = await db.batch([versionInsert, auditInsert, stateUpdate]);
  } catch (cause) {
    const current = await readPublicationState(db).catch(() => null);
    if (current && current.draft_revision !== input.expectedRevision) {
      throw new StudioRevisionConflictError(input.expectedRevision, current.draft_revision);
    }
    throw cause;
  }

  if (changes(results[0]) !== 1 || changes(results[1]) !== 1 || changes(results[2]) !== 1) {
    const current = await readPublicationState(db);
    if (current.draft_revision !== input.expectedRevision) {
      throw new StudioRevisionConflictError(input.expectedRevision, current.draft_revision);
    }
    throw new Error("Studio publication batch did not apply atomically.");
  }

  return {
    versionNumber,
    revision: input.expectedRevision + 1,
    restoredFromVersionId,
  };
};

export const restoreVersionToDraft = async (
  db: D1Database,
  input: { versionNumber: number; expectedRevision: number; actor: string },
): Promise<RestoreDraftResult> => {
  const state = await readPublicationState(db);
  requireExpectedRevision(input.expectedRevision, state.draft_revision);

  const version = await getVersion(db, input.versionNumber);
  if (!version) throw new StudioVersionNotFoundError(input.versionNumber);

  const serialized = JSON.stringify(version.document);

  const auditInsert = db
    .prepare(
      `
        INSERT INTO audit_events
          (site_id, event_type, actor_subject, entity_type, entity_id, details_json)
        SELECT ?, ?, ?, ?, ?, ?
        FROM studio_state
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(
      STUDIO_SITE_ID,
      "studio_version_restored_to_draft",
      input.actor,
      "studio_version",
      String(input.versionNumber),
      JSON.stringify({
        versionNumber: input.versionNumber,
        restoredFromVersionId: version.id,
      }),
      STUDIO_SITE_ID,
      input.expectedRevision,
    );

  const stateUpdate = db
    .prepare(
      `
        UPDATE studio_state
        SET draft_json = ?,
            draft_revision = draft_revision + 1,
            draft_restored_from_version_id = ?,
            updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        WHERE site_id = ?
          AND draft_revision = ?
      `,
    )
    .bind(serialized, version.id, STUDIO_SITE_ID, input.expectedRevision);

  let results: D1Result<unknown>[];
  try {
    results = await db.batch([auditInsert, stateUpdate]);
  } catch (cause) {
    const current = await readPublicationState(db).catch(() => null);
    if (current && current.draft_revision !== input.expectedRevision) {
      throw new StudioRevisionConflictError(input.expectedRevision, current.draft_revision);
    }
    throw cause;
  }

  if (changes(results[0]) !== 1 || changes(results[1]) !== 1) {
    const current = await readPublicationState(db);
    if (current.draft_revision !== input.expectedRevision) {
      throw new StudioRevisionConflictError(input.expectedRevision, current.draft_revision);
    }
    throw new Error("Studio restore batch did not apply atomically.");
  }

  return {
    document: version.document,
    revision: input.expectedRevision + 1,
    restoredFromVersionId: version.id,
  };
};
