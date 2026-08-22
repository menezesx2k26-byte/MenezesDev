import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import { failureResult, runEditPipeline } from "../core/pipeline.js";
import { BACKGROUNDS, OUTPUT_FORMATS, PROJECTS, QUALITIES } from "../types/index.js";

const relativePath = z
  .string()
  .trim()
  .min(1)
  .max(500)
  .describe("Workspace-relative path. Absolute paths and parent traversal are rejected.");

export const editInputSchema = z.object({
  project: z.enum(PROJECTS),
  source_images: z.array(relativePath).min(1).max(16),
  mask_file: relativePath.optional(),
  brief_file: relativePath,
  output_path: relativePath,
  change_request: z.string().trim().min(3).max(8_000),
  preserve: z.array(z.string().trim().min(1).max(1_000)).min(1).max(30),
  size: z.string().trim().regex(/^(auto|\d{2,4}x\d{2,4})$/).optional(),
  quality: z.enum(QUALITIES).default("medium"),
  output_format: z.enum(OUTPUT_FORMATS).optional(),
  output_compression: z.number().int().min(0).max(100).default(85),
  background: z.enum(BACKGROUNDS).default("opaque"),
  dry_run: z.boolean().default(false),
  overwrite: z.boolean().default(false),
});

export function registerEditImageAsset(server: McpServer): void {
  server.registerTool(
    "edit_image_asset",
    {
      title: "Edit image asset",
      description:
        "Edits one or more workspace image assets while separating requested changes from protected visual traits. Use dry_run=true first.",
      inputSchema: editInputSchema,
      annotations: { destructiveHint: false, idempotentHint: false, openWorldHint: true, readOnlyHint: false },
    },
    async (input) => {
      try {
        const result = await runEditPipeline(input);
        return {
          content: [
            {
              type: "text" as const,
              text: result.dry_run ? "Dry run valid. Planned edited asset." : "Edited image asset generated.",
            },
          ],
          structuredContent: result as unknown as Record<string, unknown>,
        };
      } catch (error) {
        const failure = failureResult(error);
        return {
          content: [{ type: "text" as const, text: `${failure.code}: ${failure.message}` }],
          isError: true,
          structuredContent: failure as unknown as Record<string, unknown>,
        };
      }
    },
  );
}
