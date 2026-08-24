import { toPublicProjectView, type PublicProjectView } from "./public-content";
import type { SiteDocument } from "./types";

export const PREVIEW_VIEWPORTS = {
  desktop: 1440,
  tablet: 768,
  mobile: 390,
} as const;

export type PreviewViewport = keyof typeof PREVIEW_VIEWPORTS;

export const PREVIEW_CACHE_CONTROL = "private, no-store" as const;

export const toDraftProjectPreview = (
  document: SiteDocument,
  projectId: string,
): PublicProjectView => {
  const draft = structuredClone(document);
  const project = draft.projects.find((candidate) => candidate.id === projectId);
  if (!project) throw new Error(`Draft project not found: ${projectId}`);

  project.visible = true;
  return toPublicProjectView(draft, project.slug);
};
