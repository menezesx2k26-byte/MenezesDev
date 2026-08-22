import { access, lstat, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";

import type { Project } from "../types/index.js";
import { PipelineError } from "./errors.js";

const TEXT_EXTENSIONS = new Set([".json", ".md", ".txt", ".yaml", ".yml"]);
const IMAGE_EXTENSIONS = new Set([".jpeg", ".jpg", ".png", ".webp"]);
const MAX_TEXT_BYTES = 2 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 50 * 1024 * 1024;

function posix(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function isWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

export function normalizeRelativePath(value: string): string {
  if (!value || value.includes("\0") || path.isAbsolute(value)) {
    throw new PipelineError("PATH_NOT_ALLOWED", "Paths must be non-empty and relative to the workspace root.");
  }

  const normalized = path.normalize(value);
  if (normalized === ".." || normalized.startsWith(`..${path.sep}`)) {
    throw new PipelineError("PATH_NOT_ALLOWED", `Path escapes the workspace: ${value}`);
  }
  return posix(normalized.replace(/^\.\//, ""));
}

async function nearestExistingAncestor(candidate: string): Promise<string> {
  let current = candidate;
  while (true) {
    try {
      await access(current);
      return current;
    } catch {
      const parent = path.dirname(current);
      if (parent === current) return current;
      current = parent;
    }
  }
}

async function assertNoSymlinkEscape(root: string, candidate: string): Promise<void> {
  const realRoot = await realpath(root);
  const ancestor = await nearestExistingAncestor(candidate);
  const realAncestor = await realpath(ancestor);
  if (!isWithin(realRoot, realAncestor)) {
    throw new PipelineError("PATH_NOT_ALLOWED", "Resolved path escapes the configured workspace root.");
  }
}

function allowedRead(relativePath: string): boolean {
  return (
    relativePath === "docs" ||
    relativePath.startsWith("docs/") ||
    relativePath === "public/assets" ||
    relativePath.startsWith("public/assets/") ||
    relativePath === ".imagegen/references" ||
    relativePath.startsWith(".imagegen/references/")
  );
}

function allowedWrite(relativePath: string, project: Project): boolean {
  if (relativePath === ".imagegen/tmp" || relativePath.startsWith(".imagegen/tmp/")) return true;
  if (project === "menezesdev") return relativePath.startsWith("public/assets/menezesdev/");
  return relativePath.startsWith(`public/assets/demos/${project}/`);
}

export class Workspace {
  readonly root: string;

  constructor(root: string) {
    this.root = path.resolve(root);
  }

  async ensureRoot(): Promise<void> {
    const rootStat = await stat(this.root).catch(() => undefined);
    if (!rootStat?.isDirectory()) {
      throw new PipelineError("CONFIG_ERROR", `Workspace root does not exist: ${this.root}`);
    }
  }

  async resolveReadable(relativeInput: string): Promise<{ absolute: string; relative: string }> {
    await this.ensureRoot();
    const relative = normalizeRelativePath(relativeInput);
    if (!allowedRead(relative)) {
      throw new PipelineError("PATH_NOT_ALLOWED", `Read path is outside allowed workspace directories: ${relative}`);
    }
    const absolute = path.resolve(this.root, relative);
    if (!isWithin(this.root, absolute)) {
      throw new PipelineError("PATH_NOT_ALLOWED", `Read path escapes workspace: ${relative}`);
    }
    await assertNoSymlinkEscape(this.root, absolute);
    const fileStat = await stat(absolute).catch(() => undefined);
    if (!fileStat?.isFile()) {
      throw new PipelineError("FILE_NOT_FOUND", `Required file was not found: ${relative}`);
    }
    return { absolute, relative };
  }

  async readText(relativeInput: string): Promise<{ absolute: string; relative: string; text: string }> {
    const file = await this.resolveReadable(relativeInput);
    const extension = path.extname(file.relative).toLowerCase();
    if (!TEXT_EXTENSIONS.has(extension)) {
      throw new PipelineError("INVALID_INPUT", `Briefing files must be text documents: ${file.relative}`);
    }
    const fileStat = await stat(file.absolute);
    if (fileStat.size > MAX_TEXT_BYTES) {
      throw new PipelineError("INVALID_INPUT", `Text file exceeds 2 MB: ${file.relative}`);
    }
    return { ...file, text: await readFile(file.absolute, "utf8") };
  }

  async resolveImage(relativeInput: string): Promise<{ absolute: string; relative: string }> {
    const file = await this.resolveReadable(relativeInput);
    if (!IMAGE_EXTENSIONS.has(path.extname(file.relative).toLowerCase())) {
      throw new PipelineError("INVALID_INPUT", `Unsupported source image extension: ${file.relative}`);
    }
    const fileStat = await stat(file.absolute);
    if (fileStat.size > MAX_IMAGE_BYTES) {
      throw new PipelineError("INVALID_INPUT", `Source image exceeds 50 MB: ${file.relative}`);
    }
    return file;
  }

  async resolveWritable(
    relativeInput: string,
    project: Project,
    overwrite: boolean,
  ): Promise<{ absolute: string; relative: string }> {
    await this.ensureRoot();
    const relative = normalizeRelativePath(relativeInput);
    if (!allowedWrite(relative, project)) {
      throw new PipelineError(
        "PATH_NOT_ALLOWED",
        `Output for '${project}' must remain in its configured asset directory: ${relative}`,
      );
    }
    if (!IMAGE_EXTENSIONS.has(path.extname(relative).toLowerCase())) {
      throw new PipelineError("INVALID_INPUT", "Writable image output must use PNG, JPEG, or WebP.");
    }

    const absolute = path.resolve(this.root, relative);
    if (!isWithin(this.root, absolute)) {
      throw new PipelineError("PATH_NOT_ALLOWED", `Write path escapes workspace: ${relative}`);
    }
    await assertNoSymlinkEscape(this.root, absolute);

    const existing = await lstat(absolute).catch(() => undefined);
    if (existing?.isSymbolicLink()) {
      throw new PipelineError("PATH_NOT_ALLOWED", `Output cannot be a symbolic link: ${relative}`);
    }
    if (existing && !overwrite) {
      throw new PipelineError("OUTPUT_EXISTS", `Output already exists; set overwrite=true to replace it: ${relative}`);
    }
    if (existing && overwrite) {
      await this.assertNotProtected(absolute, relative);
    }
    return { absolute, relative };
  }

  private async assertNotProtected(absolute: string, relative: string): Promise<void> {
    const extension = path.extname(absolute);
    const metadataPath = `${absolute.slice(0, -extension.length)}.meta.json`;
    try {
      const metadata = JSON.parse(await readFile(metadataPath, "utf8")) as { status?: unknown };
      if (metadata.status === "approved" || metadata.status === "in-use") {
        throw new PipelineError(
          "OUTPUT_EXISTS",
          `Asset is marked '${metadata.status}' and cannot be overwritten: ${relative}`,
        );
      }
    } catch (error) {
      if (error instanceof PipelineError) throw error;
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
    }
  }
}

export function sidecarPaths(outputPath: string): { metadata: string; prompt: string } {
  const extension = path.extname(outputPath);
  const base = outputPath.slice(0, -extension.length);
  return { metadata: `${base}.meta.json`, prompt: `${base}.prompt.md` };
}

export function candidateOutputPath(outputPath: string, index: number, count: number): string {
  if (count === 1) return outputPath;
  const extension = path.extname(outputPath);
  const base = outputPath.slice(0, -extension.length);
  return `${base}-candidate-${String(index + 1).padStart(2, "0")}${extension}`;
}
