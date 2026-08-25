import type { StudioValidationIssue } from "./validation";

export class StudioNotInitializedError extends Error {
  constructor() {
    super("MenezesDev Studio is not initialized.");
    this.name = "StudioNotInitializedError";
  }
}

export class StudioAlreadyInitializedError extends Error {
  constructor() {
    super("MenezesDev Studio is already initialized.");
    this.name = "StudioAlreadyInitializedError";
  }
}

export class StudioRevisionConflictError extends Error {
  constructor(
    readonly expectedRevision: number,
    readonly currentRevision: number,
  ) {
    super(
      `Studio draft revision conflict: expected ${expectedRevision}, current ${currentRevision}.`,
    );
    this.name = "StudioRevisionConflictError";
  }
}

export class StudioStoredDocumentError extends Error {
  constructor(message = "Stored Studio document is invalid.", options?: ErrorOptions) {
    super(message, options);
    this.name = "StudioStoredDocumentError";
  }
}

export class StudioDocumentValidationError extends Error {
  constructor(readonly issues: StudioValidationIssue[]) {
    super("Studio document failed validation.");
    this.name = "StudioDocumentValidationError";
  }
}

export class StudioVersionNotFoundError extends Error {
  constructor(readonly versionNumber: number) {
    super(`Studio version ${versionNumber} was not found.`);
    this.name = "StudioVersionNotFoundError";
  }
}
