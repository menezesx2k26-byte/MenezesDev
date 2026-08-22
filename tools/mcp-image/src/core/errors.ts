export type PipelineErrorCode =
  | "CONFIG_ERROR"
  | "FILE_NOT_FOUND"
  | "INVALID_IMAGE"
  | "INVALID_INPUT"
  | "OPENAI_ERROR"
  | "OUTPUT_EXISTS"
  | "PATH_NOT_ALLOWED"
  | "WRITE_ERROR";

export class PipelineError extends Error {
  readonly code: PipelineErrorCode;
  readonly retryable: boolean;

  constructor(code: PipelineErrorCode, message: string, retryable = false, cause?: unknown) {
    super(message, { cause });
    this.name = "PipelineError";
    this.code = code;
    this.retryable = retryable;
  }
}

export function normalizeError(error: unknown): PipelineError {
  if (error instanceof PipelineError) {
    return error;
  }

  const message = error instanceof Error ? error.message : "Unexpected image pipeline failure.";
  return new PipelineError("OPENAI_ERROR", message, false, error);
}
