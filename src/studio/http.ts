import {
  StudioAlreadyInitializedError,
  StudioDocumentValidationError,
  StudioNotInitializedError,
  StudioRevisionConflictError,
  StudioStoredDocumentError,
  StudioVersionNotFoundError,
} from "./errors";

export const STUDIO_ADMIN_BODY_LIMIT_BYTES = 524_288;

export interface StudioAdminContext {
  actor: string;
}

export class StudioHttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "StudioHttpError";
  }
}

const baseHeaders = (): Headers => {
  const headers = new Headers();
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  return headers;
};

export const requireStudioAdminContext = (input: { isDev: boolean }): StudioAdminContext | null =>
  input.isDev ? { actor: "local-admin" } : null;

export const privateAdminNotFoundResponse = (): Response =>
  new Response(null, {
    status: 404,
    headers: baseHeaders(),
  });

export const studioJsonResponse = (
  body: unknown,
  init: { status?: number; headers?: HeadersInit } = {},
): Response => {
  const headers = baseHeaders();
  for (const [name, value] of new Headers(init.headers)) headers.set(name, value);
  return Response.json(body, {
    status: init.status ?? 200,
    headers,
  });
};

export const methodNotAllowedResponse = (methods: string[]): Response =>
  studioJsonResponse(
    {
      error: {
        code: "method_not_allowed",
        message: "Method not allowed.",
      },
    },
    {
      status: 405,
      headers: { Allow: methods.join(", ") },
    },
  );

export const readStudioJson = async (request: Request): Promise<unknown> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
    throw new StudioHttpError(
      415,
      "unsupported_media_type",
      "Content-Type must be application/json.",
    );
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const parsed = Number(declaredLength);
    if (Number.isFinite(parsed) && parsed > STUDIO_ADMIN_BODY_LIMIT_BYTES) {
      throw new StudioHttpError(413, "payload_too_large", "Request body is too large.");
    }
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > STUDIO_ADMIN_BODY_LIMIT_BYTES) {
    throw new StudioHttpError(413, "payload_too_large", "Request body is too large.");
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new StudioHttpError(400, "invalid_json", "Request body must be valid JSON.");
  }
};

export const parseExpectedRevision = (value: unknown): number => {
  if (!Number.isInteger(value) || Number(value) < 0) {
    throw new StudioHttpError(
      400,
      "invalid_revision",
      "expectedRevision must be a non-negative integer.",
    );
  }
  return Number(value);
};

export const parseStudioVersionNumber = (value: unknown): number => {
  const parsed = typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;
  if (!Number.isInteger(parsed) || Number(parsed) <= 0) {
    throw new StudioHttpError(400, "invalid_version", "Version number must be a positive integer.");
  }
  return Number(parsed);
};

export const requireStudioObject = (value: unknown): Record<string, unknown> => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new StudioHttpError(400, "invalid_body", "Request body must be a JSON object.");
  }
  return value as Record<string, unknown>;
};

export const assertStudioSameOrigin = (request: Request): void => {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    throw new StudioHttpError(403, "origin_required", "Origin header is required.");
  }

  let suppliedOrigin: string;
  try {
    suppliedOrigin = new URL(originHeader).origin;
  } catch {
    throw new StudioHttpError(403, "origin_mismatch", "Request origin is not allowed.");
  }

  if (suppliedOrigin !== new URL(request.url).origin) {
    throw new StudioHttpError(403, "origin_mismatch", "Request origin is not allowed.");
  }
};

export const studioErrorResponse = (error: unknown): Response => {
  if (error instanceof StudioHttpError) {
    return studioJsonResponse(
      { error: { code: error.code, message: error.message } },
      { status: error.status },
    );
  }

  if (error instanceof StudioRevisionConflictError) {
    return studioJsonResponse(
      {
        error: {
          code: "revision_conflict",
          message: "The Studio draft changed elsewhere.",
          expectedRevision: error.expectedRevision,
          currentRevision: error.currentRevision,
        },
      },
      { status: 409 },
    );
  }

  if (error instanceof StudioDocumentValidationError) {
    return studioJsonResponse(
      {
        error: {
          code: "validation_failed",
          message: "Studio document failed validation.",
        },
        issues: error.issues,
      },
      { status: 422 },
    );
  }

  if (error instanceof StudioVersionNotFoundError) {
    return studioJsonResponse(
      {
        error: {
          code: "version_not_found",
          message: "Studio version not found.",
        },
      },
      { status: 404 },
    );
  }

  if (error instanceof StudioNotInitializedError) {
    return studioJsonResponse(
      {
        error: {
          code: "studio_not_initialized",
          message: "Studio is not initialized.",
        },
      },
      { status: 503 },
    );
  }

  if (error instanceof StudioAlreadyInitializedError) {
    return studioJsonResponse(
      {
        error: {
          code: "studio_already_initialized",
          message: "Studio is already initialized.",
        },
      },
      { status: 409 },
    );
  }

  if (error instanceof StudioStoredDocumentError) {
    return studioJsonResponse(
      {
        error: {
          code: "stored_document_invalid",
          message: "Stored Studio data is unavailable.",
        },
      },
      { status: 500 },
    );
  }

  return studioJsonResponse(
    {
      error: {
        code: "internal_error",
        message: "Internal Studio error.",
      },
    },
    { status: 500 },
  );
};
