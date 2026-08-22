import { stat } from "node:fs/promises";
import path from "node:path";

import type {
  EditImageInput,
  HeroGenerationInput,
  ImageModelConfig,
  PipelineFailure,
  PipelineSuccess,
  PlannedAsset,
  ResolvedImageOptions,
} from "../types/index.js";
import { loadConfig } from "./config.js";
import { normalizeError, PipelineError } from "./errors.js";
import { inspectImageFile } from "./imageInspector.js";
import { planOutput, type OutputTarget, writeGeneratedAssets } from "./imageWriter.js";
import { OpenAIImageClient } from "./openai.js";
import { buildEditPrompt, buildHeroPrompt } from "./promptBuilder.js";
import { resolveImageOptions } from "./validators.js";
import { candidateOutputPath, Workspace } from "./workspace.js";

function publicPlan(target: OutputTarget): PlannedAsset {
  return {
    metadata_path: target.metadata_path,
    output_path: target.output_path,
    prompt_log_path: target.prompt_log_path,
  };
}

function successResult(args: {
  assetName: string;
  assetType: "hero" | "edit";
  config: ImageModelConfig;
  dryRun: boolean;
  options: ResolvedImageOptions;
  prompt: string;
  project: HeroGenerationInput["project"];
  requestId?: string;
  targets: OutputTarget[];
  warnings?: string[];
}): PipelineSuccess {
  const planned = args.targets.map(publicPlan);
  return {
    asset_name: args.assetName,
    asset_type: args.assetType,
    dry_run: args.dryRun,
    format: args.options.format,
    metadata_paths: planned.map((item) => item.metadata_path),
    model: args.config.model,
    output_paths: planned.map((item) => item.output_path),
    planned_assets: planned,
    project: args.project,
    prompt_log_paths: planned.map((item) => item.prompt_log_path),
    prompt_preview: args.prompt.slice(0, 6_000),
    quality: args.options.quality,
    size: args.options.size,
    status: args.dryRun ? "dry-run" : "generated",
    success: true,
    warnings: args.warnings ?? [],
    ...(args.requestId ? { request_id: args.requestId } : {}),
  };
}

export async function runHeroPipeline(
  input: HeroGenerationInput,
  config: ImageModelConfig = loadConfig(),
): Promise<PipelineSuccess> {
  const workspace = new Workspace(config.workspaceRoot);
  const options = resolveImageOptions({
    aspectRatio: input.aspect_ratio,
    background: input.background,
    config,
    outputCompression: input.output_compression,
    outputPath: input.output_path,
    quality: input.quality,
    ...(input.output_format ? { outputFormat: input.output_format } : {}),
    ...(input.size ? { size: input.size } : {}),
  });
  const targets: OutputTarget[] = [];
  for (let index = 0; index < input.variant_count; index += 1) {
    const candidate = candidateOutputPath(input.output_path, index, input.variant_count);
    targets.push(await planOutput(workspace, candidate, input.project, input.overwrite));
  }

  const references = await Promise.all(input.reference_images.map((item) => workspace.resolveImage(item)));
  await Promise.all(references.map((item) => inspectImageFile(item.absolute)));
  const prompt = await buildHeroPrompt(workspace, input, options);

  if (input.dry_run) {
    return successResult({
      assetName: input.asset_name,
      assetType: "hero",
      config,
      dryRun: true,
      options,
      prompt: prompt.prompt,
      project: input.project,
      targets,
      warnings:
        references.length > 0
          ? ["Reference images are supplied; the real call will use the image edit endpoint."]
          : [],
    });
  }

  const client = new OpenAIImageClient(config);
  const result = references.length
    ? await client.edit(
        prompt.prompt,
        options,
        references.map((item) => item.absolute),
        undefined,
        input.variant_count,
      )
    : await client.generate(prompt.prompt, options, input.variant_count);

  await writeGeneratedAssets(workspace, targets, result.images, {
    assetType: "hero",
    config,
    options,
    overwrite: input.overwrite,
    project: input.project,
    prompt,
    sourceImages: references.map((item) => item.relative),
    ...(result.requestId ? { requestId: result.requestId } : {}),
  });

  return successResult({
    assetName: input.asset_name,
    assetType: "hero",
    config,
    dryRun: false,
    options,
    prompt: prompt.prompt,
    project: input.project,
    targets,
    ...(result.requestId ? { requestId: result.requestId } : {}),
  });
}

export async function runEditPipeline(
  input: EditImageInput,
  config: ImageModelConfig = loadConfig(),
): Promise<PipelineSuccess> {
  const workspace = new Workspace(config.workspaceRoot);
  const options = resolveImageOptions({
    background: input.background,
    config,
    outputCompression: input.output_compression,
    outputPath: input.output_path,
    quality: input.quality,
    size: input.size ?? "auto",
    ...(input.output_format ? { outputFormat: input.output_format } : {}),
  });
  const target = await planOutput(workspace, input.output_path, input.project, input.overwrite);
  const sources = await Promise.all(input.source_images.map((item) => workspace.resolveImage(item)));
  const sourceInfo = await Promise.all(sources.map((item) => inspectImageFile(item.absolute)));
  const mask = input.mask_file ? await workspace.resolveImage(input.mask_file) : undefined;

  if (mask) {
    const maskInfo = await inspectImageFile(mask.absolute);
    const maskSize = await stat(mask.absolute);
    if (maskInfo.format !== "png") {
      throw new PipelineError("INVALID_INPUT", "mask_file must be a PNG image.");
    }
    if (maskSize.size >= 4 * 1024 * 1024) {
      throw new PipelineError("INVALID_INPUT", "mask_file must be smaller than 4 MB.");
    }
    if (maskInfo.width !== sourceInfo[0]!.width || maskInfo.height !== sourceInfo[0]!.height) {
      throw new PipelineError("INVALID_INPUT", "mask_file must match the first source image dimensions.");
    }
  }

  const prompt = await buildEditPrompt(workspace, input, options);
  const assetName = path.basename(input.output_path, path.extname(input.output_path));
  if (input.dry_run) {
    return successResult({
      assetName,
      assetType: "edit",
      config,
      dryRun: true,
      options,
      prompt: prompt.prompt,
      project: input.project,
      targets: [target],
    });
  }

  const client = new OpenAIImageClient(config);
  const result = await client.edit(
    prompt.prompt,
    options,
    sources.map((item) => item.absolute),
    mask?.absolute,
  );
  await writeGeneratedAssets(workspace, [target], result.images, {
    assetType: "edit",
    config,
    options,
    overwrite: input.overwrite,
    project: input.project,
    prompt,
    sourceImages: sources.map((item) => item.relative),
    ...(result.requestId ? { requestId: result.requestId } : {}),
  });

  return successResult({
    assetName,
    assetType: "edit",
    config,
    dryRun: false,
    options,
    prompt: prompt.prompt,
    project: input.project,
    targets: [target],
    ...(result.requestId ? { requestId: result.requestId } : {}),
  });
}

export function failureResult(error: unknown): PipelineFailure {
  const normalized = normalizeError(error);
  return {
    code: normalized.code,
    message: normalized.message,
    retryable: normalized.retryable,
    success: false,
  };
}
