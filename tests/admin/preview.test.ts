import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";

type PreviewModule = typeof import("../../src/studio/preview");

const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");

const loadPreview = async (): Promise<PreviewModule | null> => {
  try {
    return await import("../../src/studio/preview");
  } catch {
    return null;
  }
};

describe("draft preview domain", () => {
  it("defines documented responsive viewport widths and private no-store policy", async () => {
    const module = await loadPreview();
    expect(module, "preview.ts must exist").not.toBeNull();
    if (!module) return;

    expect(module.PREVIEW_VIEWPORTS).toEqual({ desktop: 1440, tablet: 768, mobile: 390 });
    expect(module.PREVIEW_CACHE_CONTROL).toBe("private, no-store");
  });

  it("can preview an existing draft project by id even when it is hidden", async () => {
    const module = await loadPreview();
    expect(module, "preview.ts must exist").not.toBeNull();
    if (!module) return;

    const document = createDefaultSiteDocument();
    const target = document.projects[0]!;
    target.visible = false;
    target.showOnHome = false;

    const preview = module.toDraftProjectPreview(document, target.id);
    expect(preview.id).toBe(target.id);
    expect(preview.slug).toBe(target.slug);
    expect(preview.label).toBe("Conceito demonstrativo");
    expect(() => module.toDraftProjectPreview(document, "missing-project")).toThrow(
      /projeto|project/i,
    );
  });
});

describe("shared public renderers", () => {
  it("makes live Home and draft Home import the same HomePage renderer", () => {
    const live = read("src/pages/index.astro");
    const preview = read("src/pages/admin/preview/index.astro");
    const renderer = read("src/components/menezesdev/HomePage.astro");

    expect(renderer, "HomePage.astro must exist").not.toBe("");
    expect(live).toMatch(/components\/menezesdev\/HomePage\.astro/);
    expect(preview).toMatch(/components\/menezesdev\/HomePage\.astro/);
    expect(live).toMatch(/<HomePage/);
    expect(preview).toMatch(/<HomePage/);
    expect(preview).not.toMatch(/md-hero__grid|md-projects|md-plans/);
  });

  it("makes live cases and draft case preview share ProjectCasePage", () => {
    const live = read("src/pages/projetos/m47.astro");
    const preview = read("src/pages/admin/preview/projetos/[id].astro");

    expect(live).toMatch(/ProjectCasePage\.astro/);
    expect(preview).toMatch(/ProjectCasePage\.astro/);
    expect(live).toMatch(/<ProjectCasePage/);
    expect(preview).toMatch(/<ProjectCasePage/);
    expect(preview).not.toMatch(/md-case-hero__grid|ESCOPO DEMONSTRADO/);
  });
});

describe("protected preview routes", () => {
  it("reads draft only, fails closed and sends no-store headers", () => {
    const routes = [
      read("src/pages/admin/preview/index.astro"),
      read("src/pages/admin/preview/projetos/[id].astro"),
    ];

    for (const source of routes) {
      expect(source).toMatch(/requireStudioAdminContext/);
      expect(source).toMatch(/getDraft\(DB\)/);
      expect(source).not.toMatch(/getPublished\(|getPublishedSiteDocument/);
      expect(source).toMatch(/Cache-Control/);
      expect(source).toMatch(/PREVIEW_CACHE_CONTROL|private, no-store/);
      expect(source).not.toMatch(
        /searchParams.*(?:draft|document|json)|JSON\.stringify\([^)]*Astro\.url/i,
      );
    }
  });

  it("marks shared renderers as draft preview, noindex and suppresses commercial destinations", () => {
    const home = read("src/components/menezesdev/HomePage.astro");
    const project = read("src/components/ProjectCasePage.astro");

    expect(home).toMatch(/preview/);
    expect(home).toMatch(/noindex=\{preview\}|noindex=\{[^}]*preview/);
    expect(home).toMatch(/Rascunho|Draft Preview|Prévia do rascunho/i);
    expect(home).toMatch(/preview\s*\?\s*null/);
    expect(home).toMatch(/admin\/preview\/projetos/);

    expect(project).toMatch(/preview/);
    expect(project).toMatch(/noindex=\{preview\}|noindex=\{[^}]*preview/);
    expect(project).toMatch(/Rascunho|Draft Preview|Prévia do rascunho/i);
    expect(project).toMatch(/preview\s*\?\s*null/);
  });
});

describe("responsive preview frame", () => {
  it("provides desktop/tablet/mobile iframe controls without pretending to spoof a user agent", () => {
    const frame = read("src/components/admin/PreviewFrame.astro");
    expect(frame, "PreviewFrame.astro must exist").not.toBe("");
    expect(frame).toMatch(/data-preview-frame/);
    expect(frame).toMatch(/data-preview-viewport=["']desktop["']/);
    expect(frame).toMatch(/data-preview-viewport=["']tablet["']/);
    expect(frame).toMatch(/data-preview-viewport=["']mobile["']/);
    expect(frame).toMatch(/1440/);
    expect(frame).toMatch(/768/);
    expect(frame).toMatch(/390/);
    expect(frame).toMatch(/viewport responsiv|prévia responsiv|responsive viewport/i);
    expect(frame).not.toMatch(/navigator\.userAgent|User-Agent|user agent/i);
  });

  it("replaces the old placeholder and refreshes the iframe only after a persisted autosave", () => {
    const shell = read("src/components/admin/studio/StudioShell.astro");
    const controller = read("src/studio/client/studio-controller.ts");

    expect(shell).toMatch(/PreviewFrame/);
    expect(shell).not.toMatch(/prévia visual com o mesmo renderer.*adicionada/i);
    expect(controller).toMatch(/data-preview-frame/);
    expect(controller).toMatch(/phase === "idle"|phase\s*===\s*["']idle["']/);
    expect(controller).toMatch(/status === "clean"|status\s*===\s*["']clean["']/);
    expect(controller).toMatch(/contentWindow.*location\.reload|location\.reload\(\)/s);
  });
});
