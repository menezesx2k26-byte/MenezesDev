export const PROJECTS = ["menezesdev", "m47", "tavola27", "prismae"] as const;
export type Project = (typeof PROJECTS)[number];

export const ASPECT_RATIOS = ["1:1", "16:10", "3:2", "16:9", "4:5", "2:3", "9:16"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export const OUTPUT_FORMATS = ["png", "jpeg", "webp"] as const;
export type OutputFormat = (typeof OUTPUT_FORMATS)[number];

export const QUALITIES = ["auto", "low", "medium", "high"] as const;
export type Quality = (typeof QUALITIES)[number];

export const BACKGROUNDS = ["auto", "opaque", "transparent"] as const;
export type Background = (typeof BACKGROUNDS)[number];

export const NEGATIVE_SPACES = ["none", "left", "right", "top", "bottom", "center"] as const;
export type NegativeSpace = (typeof NEGATIVE_SPACES)[number];

export const POSITION_HINTS = ["left", "center", "right", "top", "bottom", "none"] as const;
export type PositionHint = (typeof POSITION_HINTS)[number];

export interface ImageModelConfig {
  apiKey?: string | undefined;
  defaultBackground: Background;
  defaultCompression: number;
  defaultFormat: OutputFormat;
  defaultQuality: Quality;
  maxAttempts: number;
  model: string;
  timeoutMs: number;
  workspaceRoot: string;
}

export interface HeroGenerationInput {
  aspect_ratio: AspectRatio;
  asset_name: string;
  background: Background;
  brand_guide_file?: string | undefined;
  brief_file: string;
  dry_run: boolean;
  focal_point: "left" | "center" | "right";
  layout_role: string;
  mobile_strategy: "shared-crop" | "dedicated-mobile-asset";
  negative_space: NegativeSpace;
  notes?: string | undefined;
  output_compression: number;
  output_format?: OutputFormat | undefined;
  output_path: string;
  overwrite: boolean;
  project: Project;
  quality: Quality;
  reference_images: string[];
  size?: string | undefined;
  subject?: string | undefined;
  text_block_position: "left" | "center" | "right" | "overlay-none";
  variant_count: number;
}

export interface EditImageInput {
  background: Background;
  brief_file: string;
  change_request: string;
  dry_run: boolean;
  mask_file?: string | undefined;
  output_compression: number;
  output_format?: OutputFormat | undefined;
  output_path: string;
  overwrite: boolean;
  preserve: string[];
  project: Project;
  quality: Quality;
  size?: string | undefined;
  source_images: string[];
}

export interface ResolvedImageOptions {
  background: Background;
  compression?: number;
  format: OutputFormat;
  quality: Quality;
  size: string;
}

export interface PromptBuildResult {
  briefPath: string;
  brandGuidePath?: string;
  prompt: string;
  rulesPath?: string;
  sourceFiles: string[];
}

export interface ImageInfo {
  format: OutputFormat;
  height: number;
  width: number;
}

export interface OpenAIImageResult {
  images: string[];
  requestId?: string;
}

export interface PlannedAsset {
  metadata_path: string;
  output_path: string;
  prompt_log_path: string;
}

export interface PipelineSuccess {
  asset_name: string;
  asset_type: "hero" | "edit";
  dry_run: boolean;
  format: OutputFormat;
  metadata_paths: string[];
  model: string;
  output_paths: string[];
  planned_assets: PlannedAsset[];
  project: Project;
  prompt_log_paths: string[];
  prompt_preview: string;
  quality: Quality;
  request_id?: string;
  size: string;
  status: "dry-run" | "generated";
  success: true;
  warnings: string[];
}

export interface PipelineFailure {
  code: string;
  message: string;
  retryable: boolean;
  success: false;
}

export type PipelineResult = PipelineSuccess | PipelineFailure;

export interface ProjectPreset {
  banned: string[];
  identity: string;
  mood: string;
  palette: string;
  style: string;
}
