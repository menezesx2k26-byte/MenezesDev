import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string): string => {
  const full = resolve(process.cwd(), path);
  return existsSync(full) ? readFileSync(full, "utf8") : "";
};

const editorContracts = [
  {
    file: "src/components/admin/studio/editors/HeroEditor.astro",
    paths: [
      "home.hero.title",
      "home.hero.lead",
      "home.hero.primaryCtaLabel",
      "home.hero.secondaryCtaHref",
    ],
  },
  {
    file: "src/components/admin/studio/editors/ProjectsSectionEditor.astro",
    paths: ["home.projects.title", "home.projects.projectIds", "home.projects.ctaLabel"],
  },
  {
    file: "src/components/admin/studio/editors/ServicesSectionEditor.astro",
    paths: ["home.services.title", "home.services.items.${index}.title"],
  },
  {
    file: "src/components/admin/studio/editors/ProcessEditor.astro",
    paths: ["home.process.title", "home.process.steps.${index}.title"],
  },
  {
    file: "src/components/admin/studio/editors/PlansSectionEditor.astro",
    paths: [
      "home.plans.title",
      "home.plans.items.${index}.priceLabel",
      "home.plans.custom.title",
    ],
  },
  {
    file: "src/components/admin/studio/editors/FaqEditor.astro",
    paths: ["home.faq.title", "home.faq.items.${index}.question"],
  },
  {
    file: "src/components/admin/studio/editors/ContactEditor.astro",
    paths: ["home.contact.title", "home.contact.secondaryCtaHref"],
  },
] as const;

describe("Home Studio form bindings", () => {
  it.each(editorContracts)("binds $file to known SiteDocument paths", ({ file, paths }) => {
    const source = read(file);
    expect(source, `${file} must exist`).not.toBe("");
    expect(source).toContain("data-studio-path");
    expect(source).toContain("STUDIO_LIMITS.longText");
    for (const path of paths) expect(source).toContain(path);
  });

  it("offers only curated section visibility/layout controls", () => {
    const source = read("src/components/admin/studio/PropertyPanel.astro");
    expect(source, "PropertyPanel.astro must exist").not.toBe("");
    expect(source).toContain("data-studio-section-visible");
    expect(source).toContain('value="default"');
    expect(source).toContain('value="split"');
    expect(source).toContain('value="stacked"');
    expect(source).not.toMatch(/type=["']color["']|data-studio-(?:css|html|javascript)|raw css/i);
  });

  it("exposes the seven approved Home editing sections and responsive modes", () => {
    const navigator = read("src/components/admin/studio/SectionNavigator.astro");
    const shell = read("src/components/admin/studio/StudioShell.astro");
    expect(navigator, "SectionNavigator.astro must exist").not.toBe("");
    for (const label of ["Hero", "Projetos", "Serviços", "Processo", "Planos", "FAQ", "Contato"]) {
      expect(navigator).toContain(label);
    }
    expect(shell, "StudioShell.astro must exist").not.toBe("");
    expect(shell).toContain('data-studio-mode="editor"');
    expect(shell).toContain('data-studio-mode="preview"');
    expect(shell).toContain("data-studio-undo");
    expect(shell).toContain("data-studio-redo");
  });

  it("renders the Studio page from the real persisted draft", () => {
    const page = read("src/pages/admin/studio.astro");
    expect(page, "src/pages/admin/studio.astro must exist").not.toBe("");
    expect(page).toMatch(/getRuntimeBindings/);
    expect(page).toMatch(/getDraft\(/);
    expect(page).toContain("<AdminLayout");
    expect(page).toContain("<StudioShell");
    expect(page).toContain("studio-initial-state");
    expect(page).toContain("ConflictDialog");
  });

  it("wires one draft store to autosave, reset and safe keyboard controls", () => {
    const source = read("src/studio/client/studio-controller.ts");
    expect(source, "studio-controller.ts must exist").not.toBe("");
    expect(source).toMatch(/createDraftStore/);
    expect(source).toMatch(/createAutosaveController/);
    expect(source).toContain("data-studio-path");
    expect(source).toContain("resetSection");
    expect(source).toContain("isEditableTarget");
    expect(source).toContain("data-studio-undo");
    expect(source).toContain("data-studio-redo");
  });

  it("does not expose free-form styling or executable inputs in editor sources", () => {
    const combined = editorContracts.map(({ file }) => read(file)).join("\n");
    expect(combined).not.toMatch(/type=["']color["']/i);
    expect(combined).not.toMatch(/name=["'](?:css|html|javascript|script)["']/i);
    expect(combined).not.toMatch(/contenteditable/i);
    expect(combined).not.toMatch(/<textarea[^>]+data-studio-(?:css|html|script)/i);
  });
});
