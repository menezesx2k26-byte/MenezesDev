import type {
  EditImageInput,
  HeroGenerationInput,
  Project,
  PromptBuildResult,
  ResolvedImageOptions,
} from "../types/index.js";
import { PROJECT_PRESETS } from "./presets.js";
import { Workspace } from "./workspace.js";

const MAX_PROMPT_CHARS = 31_500;
const MAX_SOURCE_EXCERPT = 12_000;

function compact(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").replace(/\n{4,}/g, "\n\n\n").trim();
}

function clip(text: string, length = MAX_SOURCE_EXCERPT): string {
  const cleaned = compact(text);
  return cleaned.length <= length ? cleaned : `${cleaned.slice(0, length)}\n[excerpt truncated]`;
}

function sectionByHeading(text: string, headingPattern: RegExp): string | undefined {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => headingPattern.test(line));
  if (start < 0) return undefined;
  const level = /^(#+)\s/.exec(lines[start]!)?.[1]?.length ?? 1;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = /^(#+)\s/.exec(lines[index]!);
    if (match && match[1]!.length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function projectContext(text: string, project: Project): string {
  const patterns: Record<Project, RegExp[]> = {
    menezesdev: [/^# CASE \d+\s*[—-]\s*MENEZESDEV\b/i, /^## \d+\. Direção específica\s*[—-]\s*MenezesDev/i],
    m47: [/^# CASE \d+\s*[—-]\s*M47\b/i, /^## \d+\. Direção específica\s*[—-]\s*M47\b/i],
    prismae: [/^# CASE \d+\s*[—-]\s*PRISMAE\b/i, /^## \d+\. Direção específica\s*[—-]\s*Prismae\b/i],
    tavola27: [/^# CASE \d+\s*[—-]\s*TAVOLA 27\b/i, /^## \d+\. Direção específica\s*[—-]\s*Tavola 27\b/i],
  };
  for (const pattern of patterns[project]) {
    const section = sectionByHeading(text, pattern);
    if (section) return clip(section);
  }
  return clip(text);
}

function globalRulesContext(text: string): string {
  const principles = sectionByHeading(text, /^## 2\. Princípios obrigatórios/i) ?? "";
  const anatomy = sectionByHeading(text, /^## 6\. Anatomia obrigatória do prompt/i) ?? "";
  const content = sectionByHeading(text, /^## 19\. Regras globais de conteúdo/i) ?? "";
  return clip([principles, anatomy, content].filter(Boolean).join("\n\n"), 8_000);
}

function list(items: string[]): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- none supplied";
}

function finishPrompt(parts: string[]): string {
  const prompt = compact(parts.filter(Boolean).join("\n\n"));
  if (prompt.length <= MAX_PROMPT_CHARS) return prompt;
  return `${prompt.slice(0, MAX_PROMPT_CHARS - 64)}\n[context truncated to API prompt limit]`;
}

async function readContexts(
  workspace: Workspace,
  project: Project,
  briefFile: string,
  brandGuideFile?: string,
): Promise<{
  brand?: { path: string; text: string };
  brief: { path: string; text: string };
  rules?: { global: string; path: string; project: string };
}> {
  const brief = await workspace.readText(briefFile);
  const brand = brandGuideFile ? await workspace.readText(brandGuideFile) : undefined;
  const rules = await workspace.readText("docs/IMAGE_GENERATION_RULES.md").catch(() => undefined);

  return {
    brief: { path: brief.relative, text: projectContext(brief.text, project) },
    ...(brand ? { brand: { path: brand.relative, text: projectContext(brand.text, project) } } : {}),
    ...(rules
      ? {
          rules: {
            global: globalRulesContext(rules.text),
            path: rules.relative,
            project: projectContext(rules.text, project),
          },
        }
      : {}),
  };
}

export async function buildHeroPrompt(
  workspace: Workspace,
  input: HeroGenerationInput,
  options: ResolvedImageOptions,
): Promise<PromptBuildResult> {
  const preset = PROJECT_PRESETS[input.project];
  const context = await readContexts(workspace, input.project, input.brief_file, input.brand_guide_file);
  const sourceFiles = [context.brief.path];
  if (context.brand) sourceFiles.push(context.brand.path);
  if (context.rules) sourceFiles.push(context.rules.path);

  const prompt = finishPrompt([
    "PURPOSE\nCreate a production-ready hero image for a responsive website. It must support HTML content and conversion-oriented layout, not behave like a standalone poster.",
    `PROJECT IDENTITY\n${preset.identity}\nStyle: ${preset.style}.\nMood: ${preset.mood}.\nPalette: ${preset.palette}.`,
    `SOURCE CONTEXT — PRIMARY BRIEF (${context.brief.path})\n${context.brief.text}`,
    context.brand ? `SOURCE CONTEXT — BRAND GUIDE (${context.brand.path})\n${context.brand.text}` : "",
    context.rules
      ? `SOURCE CONTEXT — GLOBAL RULES (${context.rules.path})\n${context.rules.global}\n\nPROJECT-SPECIFIC RULES\n${context.rules.project}`
      : "",
    `SCENE / SUBJECT\nAsset name: ${input.asset_name}.\n${input.subject ?? "Infer the precise subject from the supplied project brief."}${input.notes ? `\nAdditional notes: ${input.notes}` : ""}`,
    `COMPOSITION\nLayout role: ${input.layout_role}.\nFocal point: ${input.focal_point}.\nReserve intentional negative space: ${input.negative_space}.\nHTML text block position: ${input.text_block_position}.\nAvoid placing important details underneath the HTML text area. Keep a clear hierarchy and credible real-world framing.`,
    `LIGHTING AND COLOR\nFollow the project palette and mood. Use purposeful light, dimensional contrast, and believable color response. Do not add an unrelated color gradient.`,
    `MATERIALS AND TEXTURE\nPreserve realistic material, skin, food, fabric, wood, metal, paper, or environmental texture as applicable. Avoid plastic surfaces, excessive denoising, and synthetic stock-photo polish.`,
    `WEB LAYOUT REQUIREMENTS\nCanvas: ${options.size} (${input.aspect_ratio}).\nOutput: ${options.format}, ${options.quality} quality, ${options.background} background.\nMobile strategy: ${input.mobile_strategy ?? "Keep the central narrative legible under a responsive crop and avoid fragile edge details."}\nThe image contains no UI, button, caption, watermark, invented sign, or readable display copy.`,
    `CONSTRAINTS\n${list(preset.banned)}\n- no invented logos or trademarks\n- no watermark or signature\n- no generic stock-photo staging\n- no legible text unless the brief explicitly requires photographed environmental text\n- no claims, awards, ratings, addresses, phone numbers, or fabricated business data`,
    `OUTPUT\nOne coherent hero candidate per requested variant. Photographic projects should look editorial and physically plausible. Abstract projects should use clean geometry without rasterized UI copy.`,
  ]);

  return {
    briefPath: context.brief.path,
    prompt,
    sourceFiles,
    ...(context.brand ? { brandGuidePath: context.brand.path } : {}),
    ...(context.rules ? { rulesPath: context.rules.path } : {}),
  };
}

export async function buildEditPrompt(
  workspace: Workspace,
  input: EditImageInput,
  options: ResolvedImageOptions,
): Promise<PromptBuildResult> {
  const preset = PROJECT_PRESETS[input.project];
  const context = await readContexts(workspace, input.project, input.brief_file);
  const sourceFiles = [context.brief.path];
  if (context.rules) sourceFiles.push(context.rules.path);

  const prompt = finishPrompt([
    "PURPOSE\nEdit the supplied source image asset for production use on a responsive website.",
    `PROJECT IDENTITY\n${preset.identity}\nStyle: ${preset.style}.\nMood: ${preset.mood}.\nPalette: ${preset.palette}.`,
    `SOURCE CONTEXT — PRIMARY BRIEF (${context.brief.path})\n${context.brief.text}`,
    context.rules
      ? `SOURCE CONTEXT — GLOBAL AND PROJECT RULES (${context.rules.path})\n${context.rules.global}\n\n${context.rules.project}`
      : "",
    `CHANGE REQUEST\n${input.change_request}`,
    `PRESERVE EXACTLY\n${list(input.preserve)}`,
    `COMPOSITION\nAdapt only what the change request requires. Preserve subject identity, visual continuity, and believable geometry. If a mask is supplied, constrain modifications to the masked region while maintaining natural edge integration.`,
    `CONSTRAINTS\n${list(preset.banned)}\n- do not introduce readable text, watermarks, invented logos, claims, or fabricated business details\n- do not change unrequested areas\n- avoid stock-photo polish and synthetic texture`,
    `OUTPUT\nCanvas: ${options.size}. Format: ${options.format}. Quality: ${options.quality}. Background: ${options.background}. Return a single clean production candidate.`,
  ]);

  return {
    briefPath: context.brief.path,
    prompt,
    sourceFiles,
    ...(context.rules ? { rulesPath: context.rules.path } : {}),
  };
}
