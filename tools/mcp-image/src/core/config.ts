import path from "node:path";

import type { Background, ImageModelConfig, OutputFormat, Quality } from "../types/index.js";
import { PipelineError } from "./errors.js";

const FORMATS = new Set<OutputFormat>(["png", "jpeg", "webp"]);
const QUALITIES = new Set<Quality>(["auto", "low", "medium", "high"]);
const BACKGROUNDS = new Set<Background>(["auto", "opaque", "transparent"]);

function integerEnv(name: string, fallback: number, minimum: number, maximum: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new PipelineError("CONFIG_ERROR", `${name} must be an integer from ${minimum} to ${maximum}.`);
  }
  return value;
}

function enumEnv<T extends string>(name: string, fallback: T, values: ReadonlySet<T>): T {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  if (!values.has(raw as T)) {
    throw new PipelineError("CONFIG_ERROR", `${name} has unsupported value: ${raw}.`);
  }
  return raw as T;
}

export function loadConfig(overrides: Partial<ImageModelConfig> = {}): ImageModelConfig {
  const workspaceRoot = path.resolve(
    overrides.workspaceRoot ?? process.env.IMAGEGEN_WORKSPACE_ROOT ?? process.cwd(),
  );

  return {
    defaultBackground:
      overrides.defaultBackground ?? enumEnv("DEFAULT_BACKGROUND", "opaque", BACKGROUNDS),
    defaultCompression:
      overrides.defaultCompression ?? integerEnv("DEFAULT_OUTPUT_COMPRESSION", 85, 0, 100),
    defaultFormat: overrides.defaultFormat ?? enumEnv("DEFAULT_OUTPUT_FORMAT", "webp", FORMATS),
    defaultQuality: overrides.defaultQuality ?? enumEnv("DEFAULT_QUALITY", "medium", QUALITIES),
    maxAttempts: overrides.maxAttempts ?? integerEnv("OPENAI_MAX_ATTEMPTS", 2, 1, 3),
    model: overrides.model ?? process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2",
    timeoutMs: overrides.timeoutMs ?? integerEnv("OPENAI_TIMEOUT_MS", 180_000, 1_000, 600_000),
    workspaceRoot,
    ...(overrides.apiKey ?? process.env.OPENAI_API_KEY
      ? { apiKey: overrides.apiKey ?? process.env.OPENAI_API_KEY }
      : {}),
  };
}
