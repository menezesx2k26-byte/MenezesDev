export const SITE_DOCUMENT_SCHEMA_VERSION = 1 as const;

export type StudioLayoutPreset = "default" | "split" | "stacked";
export type StudioDensity = "compact" | "comfortable" | "spacious";
export type StudioImageTreatment = "natural" | "soft" | "contrast";
export type MediaReferenceKind = "repository" | "r2";

export interface MediaReference {
  id: string;
  kind: MediaReferenceKind;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface StudioBrand {
  name: string;
  tagline: string;
  locale: "pt-BR";
}

export interface StudioNavigationItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
}

export interface StudioSectionBase {
  visible: boolean;
  layout: StudioLayoutPreset;
}

export interface StudioTrustItem {
  id: string;
  title: string;
  text: string;
}

export interface StudioComparisonColumn {
  id: string;
  title: string;
  items: string[];
}

export interface StudioService {
  id: string;
  title: string;
  text: string;
  microcopy?: string;
  visible: boolean;
}

export interface StudioProcessStep {
  id: string;
  number: string;
  title: string;
  text: string;
}

export interface StudioCapability {
  id: string;
  title: string;
  text: string;
}

export interface StudioPlan {
  id: string;
  name: string;
  startingPriceCents: number | null;
  priceLabel: string;
  description: string;
  highlight: string;
  includes: string[];
  ctaLabel: string;
  recommended: boolean;
  visible: boolean;
}

export interface StudioFaqItem {
  id: string;
  question: string;
  answer: string[];
  visible: boolean;
}

export interface HomeHeroSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  microcopy: string;
  media: MediaReference[];
}

export interface HomeTrustSection extends StudioSectionBase {
  items: StudioTrustItem[];
}

export interface HomeProblemSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  emphasis: string;
  comparisons: StudioComparisonColumn[];
}

export interface HomeProjectsSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  projectIds: string[];
  ctaTitle: string;
  ctaLabel: string;
}

export interface HomeServicesSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  items: StudioService[];
}

export interface HomeProcessSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  steps: StudioProcessStep[];
  note: string;
}

export interface HomeCapabilitiesSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  emphasis: string;
  items: StudioCapability[];
}

export interface HomePlansSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  items: StudioPlan[];
  custom: {
    title: string;
    text: string;
    priceLabel: string;
    ctaLabel: string;
  };
  disclaimer: string;
}

export interface HomeFaqSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  items: StudioFaqItem[];
}

export interface HomeContactSection extends StudioSectionBase {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  emphasis: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface HomeDocument {
  hero: HomeHeroSection;
  trust: HomeTrustSection;
  problem: HomeProblemSection;
  projects: HomeProjectsSection;
  services: HomeServicesSection;
  process: HomeProcessSection;
  capabilities: HomeCapabilitiesSection;
  plans: HomePlansSection;
  faq: HomeFaqSection;
  contact: HomeContactSection;
}

export interface StudioProjectSeo {
  title: string;
  description: string;
  shareImage: MediaReference | null;
}

export interface StudioProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  disclosure: "Conceito demonstrativo";
  headline: string;
  description: string;
  tags: string[];
  planLabel: string;
  demoHref: string;
  cover: MediaReference;
  strip: MediaReference[];
  context: string[];
  approach: string[];
  features: string[];
  visible: boolean;
  showOnHome: boolean;
  layout: StudioLayoutPreset;
  seo: StudioProjectSeo;
}

export interface StudioSocialLink {
  id: string;
  label: string;
  href: string;
}

export interface StudioCommercial {
  whatsappUrl: string | null;
  whatsappMessage: string;
  socialLinks: StudioSocialLink[];
}

export interface StudioSeo {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  ogTitle: string;
  ogDescription: string;
  defaultShareImage: MediaReference | null;
  demosIndexable: false;
}

export interface StudioPresentation {
  density: StudioDensity;
  sectionLayout: StudioLayoutPreset;
  imageTreatment: StudioImageTreatment;
}

export interface SiteDocument {
  schemaVersion: typeof SITE_DOCUMENT_SCHEMA_VERSION;
  brand: StudioBrand;
  navigation: StudioNavigationItem[];
  home: HomeDocument;
  projects: StudioProject[];
  commercial: StudioCommercial;
  seo: StudioSeo;
  presentation: StudioPresentation;
}
