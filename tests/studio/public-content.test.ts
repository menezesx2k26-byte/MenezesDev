import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import { StudioStoredDocumentError } from "../../src/studio/errors";

type PublicContentModule = typeof import("../../src/studio/public-content");

let publicContentModule: PublicContentModule | null = null;
try {
  publicContentModule = await import("../../src/studio/public-content");
} catch {
  publicContentModule = null;
}

const requirePublicContent = () => {
  expect(
    publicContentModule,
    "src/studio/public-content.ts must expose the published-only public mapping layer",
  ).not.toBeNull();
  return publicContentModule as PublicContentModule;
};

class PublishedDb {
  readonly queries: string[] = [];

  constructor(
    private readonly row:
      | {
          id: number;
          version_number: number;
          source_revision: number;
          snapshot_json: string;
          published_by: string | null;
          published_at: string;
        }
      | null,
    private readonly failure?: Error,
  ) {}

  prepare(query: string) {
    this.queries.push(query);
    if (this.failure) throw this.failure;
    return {
      bind: () => ({
        first: async <T>() => this.row as T | null,
      }),
    };
  }
}

const asD1 = (db: PublishedDb) => db as unknown as D1Database;

const publishedRow = (document = createDefaultSiteDocument()) => ({
  id: 1,
  version_number: 1,
  source_revision: 0,
  snapshot_json: JSON.stringify(document),
  published_by: "local-seed",
  published_at: "2026-08-24T13:00:00.000Z",
});

const routePaths = [
  "src/pages/index.astro",
  "src/pages/projetos/m47.astro",
  "src/pages/projetos/tavola-27.astro",
  "src/pages/projetos/prismae.astro",
] as const;

const routeSources = routePaths.map((path) => ({
  path,
  source: readFileSync(resolve(process.cwd(), path), "utf8"),
}));

describe("published-only public content", () => {
  it("returns exactly the immutable published snapshot without reading draft_json", async () => {
    const publicContent = requirePublicContent();
    const published = createDefaultSiteDocument();
    published.home.hero.title = "Título publicado";
    const db = new PublishedDb(publishedRow(published));

    const document = await publicContent.getPublishedSiteDocument(asD1(db));

    expect(document.home.hero.title).toBe("Título publicado");
    expect(db.queries.some((query) => /draft_json/i.test(query))).toBe(false);
    expect(db.queries.some((query) => /published_version_number/i.test(query))).toBe(true);
  });

  it("does not manufacture fallback content when D1 is unavailable", async () => {
    const publicContent = requirePublicContent();
    const db = new PublishedDb(null, new Error("D1 unavailable"));

    await expect(publicContent.getPublishedSiteDocument(asD1(db))).rejects.toThrow("D1 unavailable");
  });

  it("fails closed when the published snapshot is malformed", async () => {
    const publicContent = requirePublicContent();
    const db = new PublishedDb({ ...publishedRow(), snapshot_json: "{broken" });

    await expect(publicContent.getPublishedSiteDocument(asD1(db))).rejects.toBeInstanceOf(
      StudioStoredDocumentError,
    );
  });

  it("maps the seeded document into visible Home content without changing editorial values", () => {
    const publicContent = requirePublicContent();
    const document = createDefaultSiteDocument();
    const view = publicContent.toPublicHomeView(document);

    expect(view.metadata).toEqual({
      title: document.seo.defaultTitle,
      description: document.seo.defaultDescription,
      image: null,
    });
    expect(view.navigation.map((item) => item.label)).toEqual(
      document.navigation.filter((item) => item.visible).map((item) => item.label),
    );
    expect(view.hero).toEqual(document.home.hero);
    expect(view.trustItems).toEqual(document.home.trust.items);
    expect(view.services).toEqual(document.home.services.items);
    expect(view.processSteps).toEqual(document.home.process.steps);
    expect(view.capabilities).toEqual(document.home.capabilities.items);
    expect(view.plans).toEqual(document.home.plans.items.filter((plan) => plan.visible));
    expect(view.faqs).toEqual(document.home.faq.items.filter((item) => item.visible));
    expect(view.whatsappUrl).toBe(document.commercial.whatsappUrl);
    expect(view.projects.map((project) => project.slug)).toEqual(["m47", "tavola-27", "prismae"]);
  });

  it("orders Home projects by published projectIds and excludes hidden/non-home records", () => {
    const publicContent = requirePublicContent();
    const document = createDefaultSiteDocument();
    document.home.projects.projectIds = [
      "project-prismae",
      "project-m47",
      "project-tavola-27",
    ];
    document.projects.find((project) => project.slug === "tavola-27")!.showOnHome = false;

    const view = publicContent.toPublicHomeView(document);
    expect(view.projects.map((project) => project.slug)).toEqual(["prismae", "m47"]);
  });

  it("maps a published Studio project into the case renderer shape and respects visibility", () => {
    const publicContent = requirePublicContent();
    const document = createDefaultSiteDocument();
    const project = publicContent.toPublicProjectView(document, "m47");

    expect(project).toMatchObject({
      slug: "m47",
      label: "Conceito demonstrativo",
      plan: document.projects[0]!.planLabel,
      title: document.projects[0]!.seo.title,
      metaDescription: document.projects[0]!.seo.description,
    });
    expect(project.cover).toEqual(document.projects[0]!.cover);

    document.projects[0]!.visible = false;
    expect(() => publicContent.toPublicProjectView(document, "m47")).toThrowError(
      expect.objectContaining({ name: "PublicProjectNotFoundError" }),
    );
  });

  it("keeps the public mapping independent from legacy editorial/config imports", () => {
    const sourcePath = resolve(process.cwd(), "src/studio/public-content.ts");
    expect(existsSync(sourcePath)).toBe(true);
    const source = existsSync(sourcePath) ? readFileSync(sourcePath, "utf8") : "";
    expect(source).not.toMatch(/\.\.\/data\/(?:home|projects)/);
    expect(source).not.toContain("../config/site");
    expect(source).not.toContain("createDefaultSiteDocument");
  });

  it("switches all four public runtime routes away from legacy data/config sources", () => {
    for (const { path, source } of routeSources) {
      expect(source, `${path} must read the published SiteDocument`).toContain(
        "getPublishedSiteDocument",
      );
      expect(source, `${path} must access the Cloudflare DB binding`).toContain("getRuntimeBindings");
      expect(source, `${path} must not read legacy projects`).not.toContain("data/projects");
      expect(source, `${path} must not read legacy Home data`).not.toContain("data/home");
      expect(source, `${path} must not read static siteConfig`).not.toContain("config/site");
    }
  });
});
