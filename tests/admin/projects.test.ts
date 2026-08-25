import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import { validateSiteDocument } from "../../src/studio/validation";
import type { SiteDocument } from "../../src/studio/types";

const root = resolve(process.cwd());
const read = (path: string): string => {
  try {
    return readFileSync(resolve(root, path), "utf8");
  } catch {
    return "";
  }
};

const loadProjectModule = async () => import("../../src/studio/client/projects").catch(() => null);

const documentWithProjects = (): SiteDocument => createDefaultSiteDocument();

describe("project management domain", () => {
  it("duplicates an existing case into a valid hidden draft without inventing disclosure or media", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const source = initial.projects[0]!;
    const next = module.duplicateProject(initial, source.id, {
      id: "project-m47-copia",
      slug: "m47-copia",
      name: "M47 Barber — cópia",
    });
    const created = next.projects.find((project) => project.id === "project-m47-copia");

    expect(created).toBeDefined();
    expect(created?.visible).toBe(false);
    expect(created?.showOnHome).toBe(false);
    expect(created?.disclosure).toBe("Conceito demonstrativo");
    expect(created?.cover).toEqual(source.cover);
    expect(created?.strip).toEqual(source.strip);
    expect(next.home.projects.projectIds).toContain("project-m47-copia");
    expect(validateSiteDocument(next, { mode: "draft" }).ok).toBe(true);
  });

  it("rejects duplicate project ids and slugs when creating a case", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const source = initial.projects[0]!;
    expect(() =>
      module.duplicateProject(initial, source.id, {
        id: initial.projects[1]!.id,
        slug: "novo-case",
        name: "Novo case",
      }),
    ).toThrow(/id/i);
    expect(() =>
      module.duplicateProject(initial, source.id, {
        id: "project-novo-case",
        slug: initial.projects[1]!.slug,
        name: "Novo case",
      }),
    ).toThrow(/slug/i);
  });

  it("moves projects accessibly and keeps Home project ordering aligned", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const target = initial.projects[1]!;
    const next = module.moveProject(initial, target.id, "up");

    expect(next.projects.map((project) => project.id)).toEqual([
      initial.projects[1]!.id,
      initial.projects[0]!.id,
      initial.projects[2]!.id,
    ]);
    expect(next.home.projects.projectIds.slice(0, 3)).toEqual(
      next.projects.slice(0, 3).map((project) => project.id),
    );
  });

  it("archives without deletion and removes the case from Home visibility", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const target = initial.projects[0]!;
    const next = module.archiveProject(initial, target.id);
    const archived = next.projects.find((project) => project.id === target.id);

    expect(next.projects).toHaveLength(initial.projects.length);
    expect(archived?.visible).toBe(false);
    expect(archived?.showOnHome).toBe(false);
    expect(next.home.projects.projectIds).toContain(target.id);
  });

  it("does not allow an archived case to be shown on Home", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const target = initial.projects[0]!;
    const archived = module.archiveProject(initial, target.id);
    expect(() => module.setProjectHomeVisibility(archived, target.id, true)).toThrow(/archiv/i);
  });

  it("requires explicit confirmation for a slug change and still rejects duplicates", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const target = initial.projects[0]!;
    expect(() => module.changeProjectSlug(initial, target.id, "m47-novo", false)).toThrow(
      /confirm/i,
    );
    expect(() =>
      module.changeProjectSlug(initial, target.id, initial.projects[1]!.slug, true),
    ).toThrow(/slug/i);

    const next = module.changeProjectSlug(initial, target.id, "m47-novo", true);
    expect(next.projects.find((project) => project.id === target.id)?.slug).toBe("m47-novo");
  });

  it("rejects malformed slug syntax before a save can be queued", async () => {
    const module = await loadProjectModule();
    expect(module, "projects.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = documentWithProjects();
    const target = initial.projects[0]!;
    for (const invalid of ["M47 NOVO", "../m47", "m47_2", "-m47", "m47-"]) {
      expect(() => module.changeProjectSlug(initial, target.id, invalid, true)).toThrow(/slug/i);
    }
  });

  it("enforces the concept disclosure for every demo-linked case at runtime validation", () => {
    const candidate = documentWithProjects() as unknown as Record<string, unknown>;
    const projects = structuredClone((candidate.projects ?? []) as Array<Record<string, unknown>>);
    projects[0]!.disclosure = "Cliente real";
    candidate.projects = projects;

    const result = validateSiteDocument(candidate, { mode: "draft" });
    expect(result.ok).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "projects[0].disclosure", code: "demo_disclosure" }),
      ]),
    );
  });
});

describe("Projects admin UI contract", () => {
  it("provides list, focused editor and explicit slug-change dialog", () => {
    const list = read("src/components/admin/projects/ProjectList.astro");
    const editor = read("src/components/admin/projects/ProjectEditor.astro");
    const dialog = read("src/components/admin/projects/SlugChangeDialog.astro");

    expect(list, "ProjectList.astro must exist").not.toBe("");
    expect(editor, "ProjectEditor.astro must exist").not.toBe("");
    expect(dialog, "SlugChangeDialog.astro must exist").not.toBe("");
    expect(list).toContain("Mover para cima");
    expect(list).toContain("Mover para baixo");
    expect(list).toContain("Arquivar");
    expect(list).not.toMatch(/Excluir projeto|Apagar projeto/);
    expect(editor).toContain('data-project-field="showOnHome"');
    expect(editor).toContain("Conceito demonstrativo");
    expect(editor).not.toContain('data-studio-path="projects.${index}.disclosure"');
    expect(dialog).toMatch(/rota pública|URL pública/i);
    expect(dialog).toMatch(/Confirmar alteração de slug/i);
  });

  it("renders both project routes from the persisted Studio draft and fails closed outside admin context", () => {
    const indexPage = read("src/pages/admin/projetos/index.astro");
    const detailPage = read("src/pages/admin/projetos/[id].astro");

    expect(indexPage, "projects index page must exist").not.toBe("");
    expect(detailPage, "project detail page must exist").not.toBe("");
    for (const source of [indexPage, detailPage]) {
      expect(source).toMatch(/requireStudioAdminContext/);
      expect(source).toMatch(/getRuntimeBindings/);
      expect(source).toMatch(/getDraft\(/);
    }
    expect(indexPage).toMatch(/ProjectList/);
    expect(detailPage).toMatch(/ProjectEditor/);
  });
});
