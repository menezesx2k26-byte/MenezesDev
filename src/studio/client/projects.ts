import { validateSiteDocument } from "../validation";
import type { SiteDocument, StudioProject } from "../types";

export type ProjectMoveDirection = "up" | "down";

const PROJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const clone = (document: SiteDocument): SiteDocument => structuredClone(document);

const projectIndex = (document: SiteDocument, projectId: string): number => {
  const index = document.projects.findIndex((project) => project.id === projectId);
  if (index < 0) throw new RangeError(`Project id not found: ${projectId}`);
  return index;
};

const assertSlug = (slug: string): void => {
  if (slug.length === 0 || slug.length > 160 || !PROJECT_SLUG.test(slug)) {
    throw new TypeError("Project slug must use lowercase letters, numbers and single hyphens.");
  }
};

const assertUniqueSlug = (document: SiteDocument, slug: string, exceptId?: string): void => {
  if (document.projects.some((project) => project.id !== exceptId && project.slug === slug)) {
    throw new TypeError(`Project slug already exists: ${slug}`);
  }
};

const assertValidDraft = (document: SiteDocument): void => {
  const validation = validateSiteDocument(document, { mode: "draft" });
  if (!validation.ok) {
    throw new TypeError(
      `Project operation produced an invalid Studio draft: ${validation.issues
        .map((issue) => `${issue.path}:${issue.code}`)
        .join(", ")}`,
    );
  }
};

const alignHomeProjectOrder = (document: SiteDocument): void => {
  const position = new Map(document.projects.map((project, index) => [project.id, index]));
  document.home.projects.projectIds.sort(
    (left, right) =>
      (position.get(left) ?? Number.MAX_SAFE_INTEGER) -
      (position.get(right) ?? Number.MAX_SAFE_INTEGER),
  );
};

export const duplicateProject = (
  document: SiteDocument,
  sourceId: string,
  input: { id: string; slug: string; name: string },
): SiteDocument => {
  if (!input.id.trim()) throw new TypeError("Project id is required.");
  if (document.projects.some((project) => project.id === input.id)) {
    throw new TypeError(`Project id already exists: ${input.id}`);
  }
  assertSlug(input.slug);
  assertUniqueSlug(document, input.slug);
  if (!input.name.trim()) throw new TypeError("Project name is required.");

  const source = document.projects[projectIndex(document, sourceId)]!;
  const next = clone(document);
  const created: StudioProject = {
    ...structuredClone(source),
    id: input.id,
    slug: input.slug,
    name: input.name.trim(),
    disclosure: "Conceito demonstrativo",
    visible: false,
    showOnHome: false,
  };

  next.projects.push(created);
  if (!next.home.projects.projectIds.includes(created.id)) {
    next.home.projects.projectIds.push(created.id);
  }
  alignHomeProjectOrder(next);
  assertValidDraft(next);
  return next;
};

export const moveProject = (
  document: SiteDocument,
  projectId: string,
  direction: ProjectMoveDirection,
): SiteDocument => {
  const currentIndex = projectIndex(document, projectId);
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= document.projects.length) return clone(document);

  const next = clone(document);
  const current = next.projects[currentIndex]!;
  const target = next.projects[targetIndex]!;
  next.projects[currentIndex] = target;
  next.projects[targetIndex] = current;
  alignHomeProjectOrder(next);
  return next;
};

export const archiveProject = (document: SiteDocument, projectId: string): SiteDocument => {
  const next = clone(document);
  const project = next.projects[projectIndex(next, projectId)]!;
  project.visible = false;
  project.showOnHome = false;
  return next;
};

export const setProjectHomeVisibility = (
  document: SiteDocument,
  projectId: string,
  showOnHome: boolean,
): SiteDocument => {
  const next = clone(document);
  const project = next.projects[projectIndex(next, projectId)]!;
  if (showOnHome && !project.visible) {
    throw new TypeError("Archived project cannot be shown on Home.");
  }
  project.showOnHome = showOnHome;
  return next;
};

export const changeProjectSlug = (
  document: SiteDocument,
  projectId: string,
  slug: string,
  confirmed: boolean,
): SiteDocument => {
  const current = document.projects[projectIndex(document, projectId)]!;
  assertSlug(slug);
  assertUniqueSlug(document, slug, projectId);
  if (slug === current.slug) return clone(document);
  if (!confirmed) {
    throw new TypeError("Project slug change requires explicit confirmation.");
  }

  const next = clone(document);
  next.projects[projectIndex(next, projectId)]!.slug = slug;
  return next;
};
