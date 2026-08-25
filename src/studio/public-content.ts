import { StudioStoredDocumentError } from "./errors";
import type {
  HomeHeroSection,
  SiteDocument,
  StudioCapability,
  StudioFaqItem,
  StudioNavigationItem,
  StudioPlan,
  StudioProcessStep,
  StudioProject,
  StudioService,
  StudioTrustItem,
} from "./types";
import { validateSiteDocument } from "./validation";

const STUDIO_SITE_ID = "menezesdev";

interface PublishedSnapshotRow {
  snapshot_json: string;
}

export interface PublicProjectView {
  id: string;
  slug: string;
  name: string;
  category: string;
  label: "Conceito demonstrativo";
  headline: string;
  description: string;
  tags: string[];
  plan: string;
  demoHref: string;
  cover: StudioProject["cover"];
  strip: StudioProject["strip"];
  context: string[];
  approach: string[];
  features: string[];
  title: string;
  metaDescription: string;
}

export interface PublicHomeView {
  metadata: {
    title: string;
    description: string;
    image: string | null;
  };
  navigation: StudioNavigationItem[];
  hero: HomeHeroSection;
  trustItems: StudioTrustItem[];
  problem: SiteDocument["home"]["problem"];
  projectsSection: SiteDocument["home"]["projects"];
  projects: PublicProjectView[];
  servicesSection: SiteDocument["home"]["services"];
  services: StudioService[];
  processSection: SiteDocument["home"]["process"];
  processSteps: StudioProcessStep[];
  capabilitiesSection: SiteDocument["home"]["capabilities"];
  capabilities: StudioCapability[];
  plansSection: SiteDocument["home"]["plans"];
  plans: StudioPlan[];
  faqSection: SiteDocument["home"]["faq"];
  faqs: StudioFaqItem[];
  contact: SiteDocument["home"]["contact"];
  whatsappUrl: string | null;
}

export class PublicProjectNotFoundError extends Error {
  constructor(slug: string) {
    super(`Published project not found: ${slug}`);
    this.name = "PublicProjectNotFoundError";
  }
}

const parsePublishedDocument = (json: string): SiteDocument => {
  let candidate: unknown;
  try {
    candidate = JSON.parse(json);
  } catch (cause) {
    throw new StudioStoredDocumentError("Published Studio document is not valid JSON.", { cause });
  }

  const validation = validateSiteDocument(candidate, { mode: "publish" });
  if (!validation.ok) {
    throw new StudioStoredDocumentError(
      `Published Studio document failed validation: ${validation.issues
        .map((issue) => issue.path || "<root>")
        .join(", ")}.`,
    );
  }

  return candidate as SiteDocument;
};

export const getPublishedSiteDocument = async (db: D1Database): Promise<SiteDocument> => {
  const row = await db
    .prepare(
      `
        SELECT v.snapshot_json
        FROM studio_state s
        JOIN studio_versions v
          ON v.site_id = s.site_id
         AND v.version_number = s.published_version_number
        WHERE s.site_id = ?
          AND s.published_version_number IS NOT NULL
        LIMIT 1
      `,
    )
    .bind(STUDIO_SITE_ID)
    .first<PublishedSnapshotRow>();

  if (!row) {
    throw new StudioStoredDocumentError("Studio has no valid active published snapshot.");
  }

  return parsePublishedDocument(row.snapshot_json);
};

const toProjectView = (project: StudioProject): PublicProjectView => ({
  id: project.id,
  slug: project.slug,
  name: project.name,
  category: project.category,
  label: project.disclosure,
  headline: project.headline,
  description: project.description,
  tags: [...project.tags],
  plan: project.planLabel,
  demoHref: project.demoHref,
  cover: project.cover,
  strip: [...project.strip],
  context: [...project.context],
  approach: [...project.approach],
  features: [...project.features],
  title: project.seo.title,
  metaDescription: project.seo.description,
});

export const toPublicProjectView = (document: SiteDocument, slug: string): PublicProjectView => {
  const project = document.projects.find(
    (candidate) => candidate.slug === slug && candidate.visible,
  );
  if (!project) throw new PublicProjectNotFoundError(slug);
  return toProjectView(project);
};

export const toPublicHomeView = (document: SiteDocument): PublicHomeView => {
  const projectsById = new Map(document.projects.map((project) => [project.id, project]));
  const homeProjects = document.home.projects.projectIds
    .map((id) => projectsById.get(id))
    .filter((project): project is StudioProject => Boolean(project?.visible && project.showOnHome))
    .map(toProjectView);

  return {
    metadata: {
      title: document.seo.defaultTitle,
      description: document.seo.defaultDescription,
      image: document.seo.defaultShareImage?.src ?? null,
    },
    navigation: document.navigation.filter((item) => item.visible),
    hero: document.home.hero,
    trustItems: document.home.trust.items,
    problem: document.home.problem,
    projectsSection: document.home.projects,
    projects: homeProjects,
    servicesSection: document.home.services,
    services: document.home.services.items.filter((service) => service.visible),
    processSection: document.home.process,
    processSteps: document.home.process.steps,
    capabilitiesSection: document.home.capabilities,
    capabilities: document.home.capabilities.items,
    plansSection: document.home.plans,
    plans: document.home.plans.items.filter((plan) => plan.visible),
    faqSection: document.home.faq,
    faqs: document.home.faq.items.filter((item) => item.visible),
    contact: document.home.contact,
    whatsappUrl: document.commercial.whatsappUrl,
  };
};
