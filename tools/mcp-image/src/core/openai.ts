import { readFile } from "node:fs/promises";
import path from "node:path";

import OpenAI, { APIConnectionError, APIConnectionTimeoutError, APIError, toFile } from "openai";
import type { Uploadable } from "openai";

import type { ImageModelConfig, OpenAIImageResult, ResolvedImageOptions } from "../types/index.js";
import { PipelineError } from "./errors.js";

const MIME_BY_EXTENSION: Record<string, string> = {
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function isRetryable(error: unknown): boolean {
  if (error instanceof APIConnectionTimeoutError || error instanceof APIConnectionError) return true;
  if (error instanceof APIError) return error.status === 429 || error.status >= 500;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" && (status === 429 || status >= 500);
}

async function delay(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function extractImages(response: { data?: Array<{ b64_json?: string }> }): string[] {
  const images = (response.data ?? []).flatMap((item) => (item.b64_json ? [item.b64_json] : []));
  if (images.length === 0) {
    throw new PipelineError("OPENAI_ERROR", "OpenAI returned no base64 image data.");
  }
  return images;
}

export class OpenAIImageClient {
  private readonly client: OpenAI;
  private readonly config: ImageModelConfig;

  constructor(config: ImageModelConfig) {
    if (!config.apiKey) {
      throw new PipelineError(
        "CONFIG_ERROR",
        "OPENAI_API_KEY is required for real generation. Use dry_run=true to validate without API usage.",
      );
    }
    this.config = config;
    this.client = new OpenAI({ apiKey: config.apiKey, maxRetries: 0, timeout: config.timeoutMs });
  }

  async generate(prompt: string, options: ResolvedImageOptions, count: number): Promise<OpenAIImageResult> {
    return this.withRetries(async () => {
      const request = this.client.images.generate({
        background: options.background,
        model: this.config.model,
        n: count,
        output_format: options.format,
        prompt,
        quality: options.quality,
        size: options.size,
        ...(options.compression !== undefined ? { output_compression: options.compression } : {}),
      });
      const { data, request_id } = await request.withResponse();
      return {
        images: extractImages(data),
        ...(request_id ? { requestId: request_id } : {}),
      };
    });
  }

  async edit(
    prompt: string,
    options: ResolvedImageOptions,
    sourcePaths: string[],
    maskPath?: string,
    count = 1,
  ): Promise<OpenAIImageResult> {
    const images = await Promise.all(sourcePaths.map((sourcePath) => this.uploadable(sourcePath)));
    const mask = maskPath ? await this.uploadable(maskPath) : undefined;

    return this.withRetries(async () => {
      const request = this.client.images.edit({
        background: options.background,
        image: images,
        model: this.config.model,
        n: count,
        output_format: options.format,
        prompt,
        quality: options.quality,
        size: options.size,
        ...(mask ? { mask } : {}),
        ...(options.compression !== undefined ? { output_compression: options.compression } : {}),
      });
      const { data, request_id } = await request.withResponse();
      return {
        images: extractImages(data),
        ...(request_id ? { requestId: request_id } : {}),
      };
    });
  }

  private async uploadable(filePath: string): Promise<Uploadable> {
    const extension = path.extname(filePath).toLowerCase();
    return toFile(await readFile(filePath), path.basename(filePath), {
      type: MIME_BY_EXTENSION[extension] ?? "application/octet-stream",
    });
  }

  private async withRetries<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= this.config.maxAttempts; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (!isRetryable(error) || attempt === this.config.maxAttempts) break;
        await delay(250 * 2 ** (attempt - 1));
      }
    }

    const retryable = isRetryable(lastError);
    const message = lastError instanceof Error ? lastError.message : "OpenAI image request failed.";
    throw new PipelineError("OPENAI_ERROR", message, retryable, lastError);
  }
}
