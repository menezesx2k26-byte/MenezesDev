import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import { failureResult, runHeroPipeline } from "../core/pipeline.js";
import {
  ASPECT_RATIOS,
  BACKGROUNDS,
  NEGATIVE_SPACES,
  OUTPUT_FORMATS,
  PROJECTS,
  QUALITIES,
} from "../types/index.js";

const relativePath = z
  .string()
  .trim()
  .min(1)
  .max(500)
  .describe("Workspace-relative path. Absolute paths and parent traversal are rejected.");

export const heroInputSchema = z.object({
  project: z.enum(PROJECTS),
  asset_name: z.string().trim().min(1).max(120),
  brief_file: relativePath,
  brand_guide_file: relativePath.optional(),
  output_path: relativePath,
  aspect_ratio: z.enum(ASPECT_RATIOS),
  size: z.string().trim().regex(/^(auto|\d{2,4}x\d{2,4})$/).optional(),
  quality: z.enum(QUALITIES).default("medium"),
  output_format: z.enum(OUTPUT_FORMATS).optional(),
  output_compression: z.number().int().min(0).max(100).default(85),
  background: z.enum(BACKGROUNDS).default("opaque"),
  negative_space: z.enum(NEGATIVE_SPACES).default("none"),
  layout_role: z.string().trim().min(3).max(500),
  subject: z.string().trim().min(1).max(2_000).optional(),
  notes: z.string().trim().min(1).max(4_000).optional(),
  reference_images: z.array(relativePath).max(16).default([]),
  variant_count: z.number().int().min(1).max(4).default(1),
  dry_run: z.boolean().default(false),
  overwrite: z.boolean().default(false),
  text_block_position: z.enum(["left", "right", "center", "overlay-none"]),
  focal_point: z.enum(["left", "right", "center"]),
  mobile_strategy: z.enum(["shared-crop", "dedicated-mobile-asset"]).default("shared-crop"),
});

export function registerGenerateHeroImage(server: McpServer): void {
  server.registerTool(
    "generate_hero_image",
    {
      title: "Generate website hero image",
      description:
        "Builds a brief-grounded prompt and generates a production raster hero. Use dry_run=true first; HTML copy and logos stay outside the image.",
      inputSchema: heroInputSchema,
      annotations: { destructiveHint: false, idempotentHint: false, openWorldHint: true, readOnlyHint: false },
    },
    async (input) => {
      try {
        const result = await runHeroPipeline(input);
        return {
          content: [
            {
              type: "text" as const,
              text: result.dry_run
                ? `Dry run valid. Planned ${result.output_paths.length} hero asset(s).`
                : `Generated ${result.output_paths.length} hero asset(s).`,
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
