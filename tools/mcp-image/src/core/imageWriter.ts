import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  ImageModelConfig,
  PlannedAsset,
  Project,
  PromptBuildResult,
  ResolvedImageOptions,
} from "../types/index.js";
import { PipelineError } from "./errors.js";
import { assertImageMatches, inspectImage } from "./imageInspector.js";
import { sidecarPaths, Workspace } from "./workspace.js";

export interface OutputTarget extends PlannedAsset {
  absolute: string;
  metadataAbsolute: string;
  promptAbsolute: string;
}

interface WriteContext {
  assetType: "hero" | "edit";
  config: ImageModelConfig;
  options: ResolvedImageOptions;
  overwrite: boolean;
  project: Project;
  prompt: PromptBuildResult;
  requestId?: string;
  sourceImages?: string[];
}

async function exists(filePath: string): Promise<boolean> {
  return Boolean(await stat(filePath).catch(() => undefined));
}

export async function planOutput(
  workspace: Workspace,
  relativeOutput: string,
  project: Project,
  overwrite: boolean,
): Promise<OutputTarget> {
  const output = await workspace.resolveWritable(relativeOutput, project, overwrite);
  const sidecars = sidecarPaths(output.relative);
  return {
    absolute: output.absolute,
    metadata_path: sidecars.metadata,
    metadataAbsolute: path.resolve(workspace.root, sidecars.metadata),
    output_path: output.relative,
    prompt_log_path: sidecars.prompt,
    promptAbsolute: path.resolve(workspace.root, sidecars.prompt),
  };
}

export async function writeGeneratedAssets(
  workspace: Workspace,
  targets: OutputTarget[],
  base64Images: string[],
  context: WriteContext,
): Promise<void> {
  if (targets.length !== base64Images.length || targets.length === 0) {
    throw new PipelineError("INVALID_IMAGE", "Generated image count does not match planned outputs.");
  }
  const runId = randomUUID();
  const tempDirectory = path.join(workspace.root, ".imagegen", "tmp", runId);
  const stagedDirectory = path.join(tempDirectory, "staged");
  const backupDirectory = path.join(tempDirectory, "backup");
  const staged: Array<{ destination: string; source: string }> = [];
  const backups: Array<{ destination: string; source: string }> = [];
  const promoted: string[] = [];

  await mkdir(stagedDirectory, { recursive: true });
  try {
    for (const [index, target] of targets.entries()) {
      const bytes = Buffer.from(base64Images[index]!, "base64");
      if (bytes.length === 0) throw new PipelineError("INVALID_IMAGE", "Generated image payload is empty.");
      const info = inspectImage(bytes);
      assertImageMatches(info, { format: context.options.format, size: context.options.size });
      const generatedAt = new Date().toISOString();
      const sha256 = createHash("sha256").update(bytes).digest("hex");
      const assetName = path.basename(target.output_path, path.extname(target.output_path));
      const metadata = {
        asset_name: assetName,
        asset_type: context.assetType,
        background: context.options.background,
        created_at: generatedAt,
        format: context.options.format,
        height: info.height,
        model: context.config.model,
        output_compression: context.options.compression ?? null,
        output_sha256: sha256,
        project: context.project,
        prompt_log_path: target.prompt_log_path,
        prompt_version: "1.0",
        quality: context.options.quality,
        reference_images: context.sourceImages ?? [],
        request_id: context.requestId ?? null,
        schema_version: 1,
        size: context.options.size,
        source_files: context.prompt.sourceFiles,
        source_hashes: {},
        status: "generated",
        suggested_alt: "",
        width: info.width,
      };
      const promptLog = [
        `# Prompt log — ${path.basename(target.output_path)}`,
        "",
        `- Generated: ${generatedAt}`,
        `- Model: ${context.config.model}`,
        `- Project: ${context.project}`,
        `- Output: ${target.output_path}`,
        `- Request ID: ${context.requestId ?? "not returned"}`,
        "",
        "## Source files",
        "",
        ...context.prompt.sourceFiles.map((source) => `- ${source}`),
        "",
        "## Final prompt",
        "",
        context.prompt.prompt,
        "",
      ].join("\n");

      const prefix = String(index).padStart(2, "0");
      const tempImage = path.join(stagedDirectory, `${prefix}.image`);
      const tempPrompt = path.join(stagedDirectory, `${prefix}.prompt`);
      const tempMetadata = path.join(stagedDirectory, `${prefix}.metadata`);
      await Promise.all([
        writeFile(tempImage, bytes, { flag: "wx" }),
        writeFile(tempPrompt, promptLog, { flag: "wx" }),
        writeFile(tempMetadata, `${JSON.stringify(metadata, null, 2)}\n`, { flag: "wx" }),
      ]);
      staged.push(
        { destination: target.absolute, source: tempImage },
        { destination: target.promptAbsolute, source: tempPrompt },
        { destination: target.metadataAbsolute, source: tempMetadata },
      );
    }

    for (const item of staged) {
      await mkdir(path.dirname(item.destination), { recursive: true });
      if (await exists(item.destination)) {
        if (!context.overwrite) {
          throw new PipelineError("OUTPUT_EXISTS", `Output appeared during generation: ${item.destination}`);
        }
        await mkdir(backupDirectory, { recursive: true });
        const backup = path.join(backupDirectory, String(backups.length));
        await rename(item.destination, backup);
        backups.push({ destination: item.destination, source: backup });
      }
      await rename(item.source, item.destination);
      promoted.push(item.destination);
    }

    for (const [index, target] of targets.entries()) {
      const persisted = await readFile(target.absolute);
      const intended = Buffer.from(base64Images[index]!, "base64");
      const persistedHash = createHash("sha256").update(persisted).digest("hex");
      const intendedHash = createHash("sha256").update(intended).digest("hex");
      if (persistedHash !== intendedHash) {
        throw new PipelineError("WRITE_ERROR", `Checksum verification failed for ${target.output_path}.`);
      }
    }
  } catch (error) {
    for (const destination of promoted.reverse()) {
      await rm(destination, { force: true }).catch(() => undefined);
    }
    for (const backup of backups.reverse()) {
      await rename(backup.source, backup.destination).catch(() => undefined);
    }
    if (error instanceof PipelineError) throw error;
    throw new PipelineError("WRITE_ERROR", "Could not persist the generated asset set.", false, error);
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}
