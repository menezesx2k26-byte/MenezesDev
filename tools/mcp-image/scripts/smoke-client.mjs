import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport, getDefaultEnvironment } from "@modelcontextprotocol/client/stdio";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [path.join(packageRoot, "dist/index.js")],
  cwd: packageRoot,
  env: {
    ...getDefaultEnvironment(),
    IMAGEGEN_WORKSPACE_ROOT: path.join(packageRoot, "tests/fixtures"),
    OPENAI_IMAGE_MODEL: "gpt-image-2",
  },
  stderr: "pipe",
});
const client = new Client({ name: "menezesdev-image-smoke", version: "0.1.0" });

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const names = listed.tools.map((tool) => tool.name).sort();
  if (!names.includes("generate_hero_image") || !names.includes("edit_image_asset")) {
    throw new Error(`Expected tools were not advertised: ${names.join(", ")}`);
  }

  const result = await client.callTool({
    name: "generate_hero_image",
    arguments: {
      project: "m47",
      asset_name: "m47-hero",
      brief_file: "docs/DEMO_CASES.md",
      output_path: "public/assets/demos/m47/m47-hero.webp",
      aspect_ratio: "16:10",
      layout_role: "Full-width homepage hero behind HTML copy",
      negative_space: "left",
      text_block_position: "left",
      focal_point: "right",
      mobile_strategy: "shared-crop",
      dry_run: true,
    },
  });
  if (result.isError || result.structuredContent?.status !== "dry-run") {
    throw new Error(`Dry-run tool call failed: ${JSON.stringify(result)}`);
  }
  process.stdout.write(`MCP smoke passed: ${names.join(", ")}\n`);
} finally {
  await client.close();
}
