import { describe, expect, it } from "vitest";
import { faqs, plans, services } from "../../src/data/home";
import { projects } from "../../src/data/projects";
import { siteConfig } from "../../src/config/site";
import { validateSiteDocument } from "../../src/studio/validation";

type DefaultDocumentModule = typeof import("../../src/studio/default-document");

let defaultDocumentModule: DefaultDocumentModule | null = null;
try {
  defaultDocumentModule = await import("../../src/studio/default-document");
} catch {
  defaultDocumentModule = null;
}

const requireDefaultDocument = () => {
  expect(
    defaultDocumentModule,
    "src/studio/default-document.ts must derive the Phase 10 editorial baseline",
  ).not.toBeNull();
  return defaultDocumentModule as DefaultDocumentModule;
};

const expectedPrices = new Map([
  ["Essencial", 60000],
  ["Profissional", 95000],
  ["Negócio", 150000],
]);

describe("createDefaultSiteDocument", () => {
  it("is deterministic and validates in draft and publish modes", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const first = createDefaultSiteDocument();
    const second = createDefaultSiteDocument();

    expect(first).toEqual(second);
    expect(validateSiteDocument(first, { mode: "draft" })).toEqual({ ok: true, issues: [] });
    expect(validateSiteDocument(first, { mode: "publish" })).toEqual({ ok: true, issues: [] });
  });

  it("preserves every current service title and service body", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.home.services.items).toHaveLength(services.length);
    expect(document.home.services.items.map(({ title, text, microcopy }) => ({ title, text, microcopy }))).toEqual(
      services.map(({ title, text, microcopy }) => ({ title, text, microcopy })),
    );
  });

  it("preserves plan names, labels, inclusions and structured BRL starting prices", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.home.plans.items).toHaveLength(plans.length);
    for (const source of plans) {
      const migrated = document.home.plans.items.find((plan) => plan.name === source.name);
      expect(migrated).toBeDefined();
      expect(migrated?.startingPriceCents).toBe(expectedPrices.get(source.name));
      expect(migrated?.priceLabel).toBe(source.price);
      expect(migrated?.description).toBe(source.description);
      expect(migrated?.highlight).toBe(source.highlight);
      expect(migrated?.includes).toEqual([...source.includes]);
      expect(migrated?.ctaLabel).toBe(source.cta);
      expect(migrated?.recommended).toBe(Boolean(source.recommended));
    }
  });

  it("preserves all FAQ questions and answer paragraphs in order", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.home.faq.items.map(({ question, answer }) => ({ question, answer }))).toEqual(
      faqs.map(({ question, answer }) => ({ question, answer: [...answer] })),
    );
  });

  it("preserves all three project identities, demo links and approved visual metadata", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.projects.map(({ name, slug }) => ({ name, slug }))).toEqual(
      projects.map(({ name, slug }) => ({ name, slug })),
    );

    projects.forEach((source) => {
      const migrated = document.projects.find((project) => project.slug === source.slug);
      expect(migrated?.demoHref).toBe(source.demoHref);
      expect(migrated?.cover).toMatchObject(source.cover);
      expect(migrated?.strip.map(({ src, width, height, alt }) => ({ src, width, height, alt }))).toEqual(
        source.strip.map(({ src, width, height, alt }) => ({ src, width, height, alt })),
      );
      expect(migrated?.context).toEqual([...source.context]);
      expect(migrated?.approach).toEqual([...source.approach]);
      expect(migrated?.features).toEqual([...source.features]);
    });
  });

  it("preserves the current navigation and global metadata copy", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.navigation.map(({ label, href }) => ({ label, href }))).toEqual(
      siteConfig.navigation.map(({ label, href }) => ({ label, href })),
    );
    expect(document.brand.name).toBe(siteConfig.brandName);
    expect(document.brand.tagline).toBe(siteConfig.tagline);
    expect(document.seo.defaultTitle).toBe(siteConfig.metadata.title);
    expect(document.seo.defaultDescription).toBe(siteConfig.metadata.description);
    expect(document.seo.ogTitle).toBe(siteConfig.metadata.ogTitle);
    expect(document.seo.ogDescription).toBe(siteConfig.metadata.ogDescription);
  });

  it("keeps unresolved commercial configuration unresolved rather than inventing production data", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.commercial.whatsappUrl).toBeNull();
    expect(document.commercial.whatsappMessage).toBe(siteConfig.commercial.whatsappMessage);
    expect(document.commercial.socialLinks).toEqual([]);
    expect(document.seo.demosIndexable).toBe(false);
  });

  it("preserves hardcoded Phase 10 Home anchors without executable markup", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.home.hero.eyebrow).toBe("DESENVOLVIMENTO WEB PARA NEGÓCIOS");
    expect(document.home.hero.title).toBe("Seu negócio merece um site à altura.");
    expect(document.home.hero.primaryCtaLabel).toBe("Quero meu site");
    expect(document.home.projects.title).toBe("Sites que parecem caros. Sem precisar custar uma fortuna.");
    expect(document.home.process.title).toBe("Seu novo site em quatro etapas.");
    expect(document.home.capabilities.title).toBe("Bonito por fora. Bem construído por dentro.");
    expect(document.home.contact.title).toBe("Sua empresa já existe. Agora faça ela existir na internet.");
    expect(JSON.stringify(document)).not.toMatch(/<script|<style|javascript:/i);
  });

  it("uses stable deterministic ids derived from existing canonical identities", () => {
    const { createDefaultSiteDocument } = requireDefaultDocument();
    const document = createDefaultSiteDocument();

    expect(document.projects.map((project) => project.id)).toEqual([
      "project-m47",
      "project-tavola-27",
      "project-prismae",
    ]);
    expect(document.home.services.items.map((service) => service.id)).toEqual([
      "service-sites-institucionais",
      "service-landing-pages",
      "service-catalogos-digitais",
      "service-integracoes",
      "service-aplicacoes-personalizadas",
    ]);
    expect(document.home.plans.items.map((plan) => plan.id)).toEqual([
      "plan-essencial",
      "plan-profissional",
      "plan-negocio",
    ]);
  });
});
