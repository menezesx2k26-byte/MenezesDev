import { SITE_DOCUMENT_SCHEMA_VERSION } from "./types";
import type { SiteDocument, StudioLayoutPreset } from "./types";

export const STUDIO_LIMITS = {
  shortText: 320,
  longText: 5000,
  listItems: 50,
  navigationItems: 20,
  projects: 50,
  mediaItems: 20,
} as const;

export type StudioValidationMode = "draft" | "publish";

export interface StudioValidationIssue {
  path: string;
  code: string;
  message: string;
}

export interface StudioValidationResult {
  ok: boolean;
  issues: StudioValidationIssue[];
}

type UnknownRecord = Record<string, unknown>;

const layoutPresets = new Set<StudioLayoutPreset>(["default", "split", "stacked"]);
const densityPresets = new Set(["compact", "comfortable", "spacious"]);
const imageTreatments = new Set(["natural", "soft", "contrast"]);
const topLevelKeys = new Set([
  "schemaVersion",
  "brand",
  "navigation",
  "home",
  "projects",
  "commercial",
  "seo",
  "presentation",
]);

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const addIssue = (
  issues: StudioValidationIssue[],
  path: string,
  code: string,
  message: string,
) => {
  if (issues.some((issue) => issue.path === path && issue.code === code)) return;
  issues.push({ path, code, message });
};

const valueAt = (record: UnknownRecord | null, key: string): unknown => record?.[key];

const recordAt = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
): UnknownRecord | null => {
  const value = valueAt(parent, key);
  if (!isRecord(value)) {
    addIssue(issues, path, "type", "Expected an object.");
    return null;
  }
  return value;
};

const arrayAt = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
): unknown[] => {
  const value = valueAt(parent, key);
  if (!Array.isArray(value)) {
    addIssue(issues, path, "type", "Expected an array.");
    return [];
  }
  return value;
};

const requireString = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
  options: { nonEmpty?: boolean; max?: number } = {},
): string | null => {
  const value = valueAt(parent, key);
  if (typeof value !== "string") {
    addIssue(issues, path, "type", "Expected a string.");
    return null;
  }
  if (options.nonEmpty && value.trim().length === 0) {
    addIssue(issues, path, "required", "Value is required.");
  }
  const max = options.max ?? STUDIO_LIMITS.longText;
  if (value.length > max) {
    addIssue(issues, path, "too_large", `String exceeds ${max} characters.`);
  }
  return value;
};

const requireBoolean = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
): boolean | null => {
  const value = valueAt(parent, key);
  if (typeof value !== "boolean") {
    addIssue(issues, path, "type", "Expected a boolean.");
    return null;
  }
  return value;
};

const validateLayout = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
) => {
  const value = valueAt(parent, key);
  if (typeof value !== "string" || !layoutPresets.has(value as StudioLayoutPreset)) {
    addIssue(issues, path, "preset", "Unsupported layout preset.");
  }
};

const isSafeHref = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.startsWith("/")) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const validateHref = (
  parent: UnknownRecord | null,
  key: string,
  path: string,
  issues: StudioValidationIssue[],
  options: { nullable?: boolean } = {},
) => {
  const value = valueAt(parent, key);
  if (value === null && options.nullable) return;
  if (typeof value !== "string" || !isSafeHref(value)) {
    addIssue(issues, path, "url", "Only internal, HTTP, or HTTPS URLs are allowed.");
  }
};

const inspectBoundsAndExecutableFields = (
  value: unknown,
  path: string,
  issues: StudioValidationIssue[],
) => {
  if (typeof value === "string") {
    if (value.length > STUDIO_LIMITS.longText) {
      addIssue(
        issues,
        path,
        "too_large",
        `String exceeds ${STUDIO_LIMITS.longText} characters.`,
      );
    }
    return;
  }

  if (Array.isArray(value)) {
    if (value.length > STUDIO_LIMITS.listItems) {
      addIssue(
        issues,
        path,
        "too_many_items",
        `List exceeds ${STUDIO_LIMITS.listItems} items.`,
      );
    }
    value.forEach((item, index) =>
      inspectBoundsAndExecutableFields(item, `${path}[${index}]`, issues),
    );
    return;
  }

  if (!isRecord(value)) return;

  for (const [key, nested] of Object.entries(value)) {
    const nestedPath = path ? `${path}.${key}` : key;
    if (/(?:html|css|script|javascript)$/i.test(key) || /^on[A-Z]/.test(key)) {
      addIssue(issues, nestedPath, "executable_field", "Executable content fields are not allowed.");
    }
    inspectBoundsAndExecutableFields(nested, nestedPath, issues);
  }
};

const validateMedia = (
  value: unknown,
  path: string,
  issues: StudioValidationIssue[],
): void => {
  if (!isRecord(value)) {
    addIssue(issues, path, "type", "Expected media metadata.");
    return;
  }
  requireString(value, "id", `${path}.id`, issues, { nonEmpty: true, max: STUDIO_LIMITS.shortText });
  const kind = requireString(value, "kind", `${path}.kind`, issues, { nonEmpty: true });
  if (kind !== null && kind !== "repository" && kind !== "r2") {
    addIssue(issues, `${path}.kind`, "enum", "Unsupported media reference kind.");
  }
  validateHref(value, "src", `${path}.src`, issues);
  requireString(value, "alt", `${path}.alt`, issues, { max: STUDIO_LIMITS.shortText });
  for (const key of ["width", "height"] as const) {
    const dimension = value[key];
    if (!Number.isInteger(dimension) || Number(dimension) <= 0) {
      addIssue(issues, `${path}.${key}`, "number", "Expected a positive integer dimension.");
    }
  }
};

const validateSectionBase = (
  section: UnknownRecord | null,
  path: string,
  issues: StudioValidationIssue[],
) => {
  requireBoolean(section, "visible", `${path}.visible`, issues);
  validateLayout(section, "layout", `${path}.layout`, issues);
};

const validateIdList = (
  items: unknown[],
  path: string,
  issues: StudioValidationIssue[],
  key: "id" | "slug" = "id",
) => {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    if (!isRecord(item)) return;
    const value = item[key];
    if (typeof value !== "string" || value.trim().length === 0) {
      addIssue(issues, `${path}[${index}].${key}`, "required", `${key} is required.`);
      return;
    }
    if (seen.has(value)) {
      addIssue(issues, `${path}[${index}].${key}`, "duplicate", `Duplicate ${key}.`);
      return;
    }
    seen.add(value);
  });
};

const validateNavigation = (
  root: UnknownRecord,
  issues: StudioValidationIssue[],
): void => {
  const navigation = arrayAt(root, "navigation", "navigation", issues);
  if (navigation.length > STUDIO_LIMITS.navigationItems) {
    addIssue(issues, "navigation", "too_many_items", "Too many navigation items.");
  }
  validateIdList(navigation, "navigation", issues);
  navigation.forEach((item, index) => {
    if (!isRecord(item)) {
      addIssue(issues, `navigation[${index}]`, "type", "Expected a navigation item.");
      return;
    }
    requireString(item, "label", `navigation[${index}].label`, issues, {
      nonEmpty: true,
      max: STUDIO_LIMITS.shortText,
    });
    validateHref(item, "href", `navigation[${index}].href`, issues);
    requireBoolean(item, "visible", `navigation[${index}].visible`, issues);
  });
};

const validateHome = (
  root: UnknownRecord,
  issues: StudioValidationIssue[],
  mode: StudioValidationMode,
): void => {
  const home = recordAt(root, "home", "home", issues);
  if (!home) return;

  const hero = recordAt(home, "hero", "home.hero", issues);
  validateSectionBase(hero, "home.hero", issues);
  requireString(hero, "eyebrow", "home.hero.eyebrow", issues);
  requireString(hero, "title", "home.hero.title", issues, { nonEmpty: mode === "publish" });
  requireString(hero, "lead", "home.hero.lead", issues);
  requireString(hero, "primaryCtaLabel", "home.hero.primaryCtaLabel", issues);
  requireString(hero, "secondaryCtaLabel", "home.hero.secondaryCtaLabel", issues);
  validateHref(hero, "secondaryCtaHref", "home.hero.secondaryCtaHref", issues);
  requireString(hero, "microcopy", "home.hero.microcopy", issues);
  const heroMedia = arrayAt(hero, "media", "home.hero.media", issues);
  if (heroMedia.length > STUDIO_LIMITS.mediaItems) {
    addIssue(issues, "home.hero.media", "too_many_items", "Too many hero media items.");
  }
  heroMedia.forEach((media, index) => validateMedia(media, `home.hero.media[${index}]`, issues));

  const trust = recordAt(home, "trust", "home.trust", issues);
  validateSectionBase(trust, "home.trust", issues);
  const trustItems = arrayAt(trust, "items", "home.trust.items", issues);
  validateIdList(trustItems, "home.trust.items", issues);

  const problem = recordAt(home, "problem", "home.problem", issues);
  validateSectionBase(problem, "home.problem", issues);
  for (const key of ["eyebrow", "title", "lead", "emphasis"] as const) {
    requireString(problem, key, `home.problem.${key}`, issues);
  }
  arrayAt(problem, "paragraphs", "home.problem.paragraphs", issues);
  const comparisons = arrayAt(problem, "comparisons", "home.problem.comparisons", issues);
  validateIdList(comparisons, "home.problem.comparisons", issues);

  const projectsSection = recordAt(home, "projects", "home.projects", issues);
  validateSectionBase(projectsSection, "home.projects", issues);
  for (const key of ["eyebrow", "title", "lead", "body", "ctaTitle", "ctaLabel"] as const) {
    requireString(projectsSection, key, `home.projects.${key}`, issues);
  }
  arrayAt(projectsSection, "projectIds", "home.projects.projectIds", issues);

  const services = recordAt(home, "services", "home.services", issues);
  validateSectionBase(services, "home.services", issues);
  for (const key of ["eyebrow", "title", "lead"] as const) {
    requireString(services, key, `home.services.${key}`, issues);
  }
  const serviceItems = arrayAt(services, "items", "home.services.items", issues);
  validateIdList(serviceItems, "home.services.items", issues);

  const process = recordAt(home, "process", "home.process", issues);
  validateSectionBase(process, "home.process", issues);
  for (const key of ["eyebrow", "title", "lead", "note"] as const) {
    requireString(process, key, `home.process.${key}`, issues);
  }
  const steps = arrayAt(process, "steps", "home.process.steps", issues);
  validateIdList(steps, "home.process.steps", issues);

  const capabilities = recordAt(home, "capabilities", "home.capabilities", issues);
  validateSectionBase(capabilities, "home.capabilities", issues);
  for (const key of ["eyebrow", "title", "lead", "body", "emphasis"] as const) {
    requireString(capabilities, key, `home.capabilities.${key}`, issues);
  }
  const capabilityItems = arrayAt(capabilities, "items", "home.capabilities.items", issues);
  validateIdList(capabilityItems, "home.capabilities.items", issues);

  const plans = recordAt(home, "plans", "home.plans", issues);
  validateSectionBase(plans, "home.plans", issues);
  for (const key of ["eyebrow", "title", "lead", "note", "disclaimer"] as const) {
    requireString(plans, key, `home.plans.${key}`, issues);
  }
  const planItems = arrayAt(plans, "items", "home.plans.items", issues);
  validateIdList(planItems, "home.plans.items", issues);
  planItems.forEach((item, index) => {
    if (!isRecord(item)) {
      addIssue(issues, `home.plans.items[${index}]`, "type", "Expected a plan.");
      return;
    }
    const price = item.startingPriceCents;
    if (price !== null && (!Number.isInteger(price) || Number(price) < 0)) {
      addIssue(
        issues,
        `home.plans.items[${index}].startingPriceCents`,
        "price",
        "Price must be null or a non-negative integer in cents.",
      );
    }
    requireString(item, "priceLabel", `home.plans.items[${index}].priceLabel`, issues);
  });
  recordAt(plans, "custom", "home.plans.custom", issues);

  const faq = recordAt(home, "faq", "home.faq", issues);
  validateSectionBase(faq, "home.faq", issues);
  requireString(faq, "eyebrow", "home.faq.eyebrow", issues);
  requireString(faq, "title", "home.faq.title", issues);
  const faqItems = arrayAt(faq, "items", "home.faq.items", issues);
  validateIdList(faqItems, "home.faq.items", issues);

  const contact = recordAt(home, "contact", "home.contact", issues);
  validateSectionBase(contact, "home.contact", issues);
  for (const key of [
    "eyebrow",
    "title",
    "lead",
    "body",
    "emphasis",
    "primaryCtaLabel",
    "secondaryCtaLabel",
  ] as const) {
    requireString(contact, key, `home.contact.${key}`, issues);
  }
  validateHref(contact, "secondaryCtaHref", "home.contact.secondaryCtaHref", issues);
};

const validateProjects = (root: UnknownRecord, issues: StudioValidationIssue[]): void => {
  const projects = arrayAt(root, "projects", "projects", issues);
  if (projects.length > STUDIO_LIMITS.projects) {
    addIssue(issues, "projects", "too_many_items", "Too many projects.");
  }
  validateIdList(projects, "projects", issues, "id");
  validateIdList(projects, "projects", issues, "slug");

  const projectIds = new Set<string>();
  projects.forEach((project, index) => {
    if (!isRecord(project)) {
      addIssue(issues, `projects[${index}]`, "type", "Expected a project.");
      return;
    }
    if (typeof project.id === "string") projectIds.add(project.id);
    requireString(project, "name", `projects[${index}].name`, issues, { nonEmpty: true });
    requireString(project, "disclosure", `projects[${index}].disclosure`, issues, { nonEmpty: true });
    validateHref(project, "demoHref", `projects[${index}].demoHref`, issues);
    validateLayout(project, "layout", `projects[${index}].layout`, issues);
    const tags = arrayAt(project, "tags", `projects[${index}].tags`, issues);
    if (tags.length > STUDIO_LIMITS.listItems) {
      addIssue(issues, `projects[${index}].tags`, "too_many_items", "Too many project tags.");
    }
    validateMedia(project.cover, `projects[${index}].cover`, issues);
    const strip = arrayAt(project, "strip", `projects[${index}].strip`, issues);
    if (strip.length > STUDIO_LIMITS.mediaItems) {
      addIssue(issues, `projects[${index}].strip`, "too_many_items", "Too many project images.");
    }
    strip.forEach((media, mediaIndex) =>
      validateMedia(media, `projects[${index}].strip[${mediaIndex}]`, issues),
    );
    const seo = recordAt(project, "seo", `projects[${index}].seo`, issues);
    requireString(seo, "title", `projects[${index}].seo.title`, issues);
    requireString(seo, "description", `projects[${index}].seo.description`, issues);
    if (seo?.shareImage !== null && seo?.shareImage !== undefined) {
      validateMedia(seo.shareImage, `projects[${index}].seo.shareImage`, issues);
    }
  });

  const home = isRecord(root.home) ? root.home : null;
  const section = home && isRecord(home.projects) ? home.projects : null;
  const referenced = section && Array.isArray(section.projectIds) ? section.projectIds : [];
  referenced.forEach((projectId, index) => {
    if (typeof projectId !== "string" || !projectIds.has(projectId)) {
      addIssue(
        issues,
        `home.projects.projectIds[${index}]`,
        "reference",
        "Project reference does not exist.",
      );
    }
  });
};

const validateCommercial = (root: UnknownRecord, issues: StudioValidationIssue[]): void => {
  const commercial = recordAt(root, "commercial", "commercial", issues);
  if (!commercial) return;
  validateHref(commercial, "whatsappUrl", "commercial.whatsappUrl", issues, { nullable: true });
  requireString(commercial, "whatsappMessage", "commercial.whatsappMessage", issues);
  const links = arrayAt(commercial, "socialLinks", "commercial.socialLinks", issues);
  validateIdList(links, "commercial.socialLinks", issues);
  links.forEach((link, index) => {
    if (!isRecord(link)) return;
    validateHref(link, "href", `commercial.socialLinks[${index}].href`, issues);
  });
};

const validateSeo = (
  root: UnknownRecord,
  issues: StudioValidationIssue[],
  mode: StudioValidationMode,
): void => {
  const seo = recordAt(root, "seo", "seo", issues);
  if (!seo) return;
  requireString(seo, "titleTemplate", "seo.titleTemplate", issues);
  requireString(seo, "defaultTitle", "seo.defaultTitle", issues, { nonEmpty: mode === "publish" });
  requireString(seo, "defaultDescription", "seo.defaultDescription", issues, {
    nonEmpty: mode === "publish",
  });
  requireString(seo, "ogTitle", "seo.ogTitle", issues);
  requireString(seo, "ogDescription", "seo.ogDescription", issues);
  if (seo.defaultShareImage !== null && seo.defaultShareImage !== undefined) {
    validateMedia(seo.defaultShareImage, "seo.defaultShareImage", issues);
  }
  if (seo.demosIndexable !== false) {
    addIssue(
      issues,
      "seo.demosIndexable",
      "demo_safety",
      "Fictitious demos can never be indexable through Studio.",
    );
  }
};

const validatePresentation = (root: UnknownRecord, issues: StudioValidationIssue[]): void => {
  const presentation = recordAt(root, "presentation", "presentation", issues);
  if (!presentation) return;
  if (!densityPresets.has(presentation.density as string)) {
    addIssue(issues, "presentation.density", "preset", "Unsupported density preset.");
  }
  validateLayout(presentation, "sectionLayout", "presentation.sectionLayout", issues);
  if (!imageTreatments.has(presentation.imageTreatment as string)) {
    addIssue(issues, "presentation.imageTreatment", "preset", "Unsupported image treatment.");
  }
};

export const validateSiteDocument = (
  candidate: unknown,
  options: { mode: StudioValidationMode },
): StudioValidationResult => {
  const issues: StudioValidationIssue[] = [];

  if (!isRecord(candidate)) {
    return {
      ok: false,
      issues: [{ path: "", code: "type", message: "SiteDocument must be an object." }],
    };
  }

  for (const key of Object.keys(candidate)) {
    if (!topLevelKeys.has(key)) {
      addIssue(issues, key, "unknown_field", "Field is not part of the bounded SiteDocument schema.");
    }
  }

  inspectBoundsAndExecutableFields(candidate, "", issues);

  if (candidate.schemaVersion !== SITE_DOCUMENT_SCHEMA_VERSION) {
    addIssue(
      issues,
      "schemaVersion",
      "schema_version",
      `Only schemaVersion ${SITE_DOCUMENT_SCHEMA_VERSION} is supported.`,
    );
  }

  const brand = recordAt(candidate, "brand", "brand", issues);
  requireString(brand, "name", "brand.name", issues, { nonEmpty: true });
  requireString(brand, "tagline", "brand.tagline", issues);
  if (brand?.locale !== "pt-BR") {
    addIssue(issues, "brand.locale", "locale", "Only pt-BR is supported in schema version 1.");
  }

  validateNavigation(candidate, issues);
  validateHome(candidate, issues, options.mode);
  validateProjects(candidate, issues);
  validateCommercial(candidate, issues);
  validateSeo(candidate, issues, options.mode);
  validatePresentation(candidate, issues);

  return { ok: issues.length === 0, issues };
};

export const isValidSiteDocument = (candidate: unknown): candidate is SiteDocument =>
  validateSiteDocument(candidate, { mode: "draft" }).ok;
