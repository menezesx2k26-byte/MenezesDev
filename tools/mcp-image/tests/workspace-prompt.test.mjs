import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

import { runEditPipeline, runHeroPipeline } from "../dist/core/pipeline.js";
import { Workspace } from "../dist/core/workspace.js";

const ONE_BY_ONE_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

let root;

function config() {
  return {
    defaultBackground: "opaque",
    defaultCompression: 85,
    defaultFormat: "webp",
    defaultQuality: "medium",
    maxAttempts: 2,
    model: "gpt-image-2",
    timeoutMs: 10_000,
    workspaceRoot: root,
  };
}

before(async () => {
  root = await mkdtemp(path.join(os.tmpdir(), "menezesdev-image-test-"));
  await mkdir(path.join(root, "docs"), { recursive: true });
  await mkdir(path.join(root, "public/assets/demos/m47"), { recursive: true });
  await writeFile(
    path.join(root, "docs/DEMO_CASES.md"),
    "# CASE 01 — M47\nHigh-contrast contemporary barbershop. Warm side light. HTML copy on the left.\n",
  );
  await writeFile(
    path.join(root, "docs/IMAGE_GENERATION_RULES.md"),
    "# Rules\n## 2. Princípios obrigatórios\nNo text.\n## 20. Direção específica — M47 Barber\nDeep black, editorial realism, no barber pole.\n",
  );
});

after(async () => {
  await rm(root, { recursive: true, force: true });
});

test("workspace rejects path traversal", async () => {
  const workspace = new Workspace(root);
  await assert.rejects(() => workspace.readText("../secrets.txt"), /escapes the workspace/);
});

test("approved asset remains protected even with overwrite=true", async () => {
  const output = path.join(root, "public/assets/demos/m47/protected.webp");
  const metadata = path.join(root, "public/assets/demos/m47/protected.meta.json");
  await writeFile(output, "existing");
  await writeFile(metadata, '{"status":"approved"}\n');
  const workspace = new Workspace(root);
  await assert.rejects(
    () => workspace.resolveWritable("public/assets/demos/m47/protected.webp", "m47", true),
    /marked 'approved'/,
  );
});

test("hero dry run builds the project prompt without requiring an API key", async () => {
  const result = await runHeroPipeline(
    {
      aspect_ratio: "16:10",
      asset_name: "m47-hero",
      background: "opaque",
      brief_file: "docs/DEMO_CASES.md",
      dry_run: true,
      focal_point: "right",
      layout_role: "Full-width homepage hero behind HTML copy",
      mobile_strategy: "shared-crop",
      negative_space: "left",
      output_compression: 85,
      output_path: "public/assets/demos/m47/m47-hero.webp",
      overwrite: false,
      project: "m47",
      quality: "medium",
      reference_images: [],
      text_block_position: "left",
      variant_count: 1,
    },
    config(),
  );

  assert.equal(result.status, "dry-run");
  assert.match(result.prompt_preview, /M47 Barber/);
  assert.match(result.prompt_preview, /Reserve intentional negative space: left/);
  assert.deepEqual(result.output_paths, ["public/assets/demos/m47/m47-hero.webp"]);
});

test("edit dry run validates PNG mask dimensions before API usage", async () => {
  const source = path.join(root, "public/assets/demos/m47/source.png");
  const mask = path.join(root, "public/assets/demos/m47/mask.png");
  const mismatchedMask = Buffer.from(ONE_BY_ONE_PNG);
  mismatchedMask.writeUInt32BE(2, 16);
  await writeFile(source, ONE_BY_ONE_PNG);
  await writeFile(mask, mismatchedMask);

  await assert.rejects(
    () =>
      runEditPipeline(
        {
          background: "opaque",
          brief_file: "docs/DEMO_CASES.md",
          change_request: "Warm the side light while retaining the subject.",
          dry_run: true,
          mask_file: "public/assets/demos/m47/mask.png",
          output_compression: 85,
          output_path: "public/assets/demos/m47/edited.png",
          overwrite: false,
          preserve: ["subject identity", "camera angle"],
          project: "m47",
          quality: "medium",
          source_images: ["public/assets/demos/m47/source.png"],
        },
        config(),
      ),
    /must match the first source image dimensions/,
  );
});

test("edit dry run succeeds with a compatible PNG mask and preserves change boundaries", async () => {
  const source = path.join(root, "public/assets/demos/m47/source-valid.png");
  const mask = path.join(root, "public/assets/demos/m47/mask-valid.png");
  await writeFile(source, ONE_BY_ONE_PNG);
  await writeFile(mask, ONE_BY_ONE_PNG);

  const result = await runEditPipeline(
    {
      background: "opaque",
      brief_file: "docs/DEMO_CASES.md",
      change_request: "Warm the side light while retaining the subject.",
      dry_run: true,
      mask_file: "public/assets/demos/m47/mask-valid.png",
      output_compression: 85,
      output_path: "public/assets/demos/m47/edited-valid.png",
      overwrite: false,
      preserve: ["subject identity", "camera angle"],
      project: "m47",
      quality: "medium",
      source_images: ["public/assets/demos/m47/source-valid.png"],
    },
    config(),
  );

  assert.equal(result.status, "dry-run");
  assert.match(result.prompt_preview, /CHANGE REQUEST/);
  assert.match(result.prompt_preview, /subject identity/);
});
