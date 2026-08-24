import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(process.cwd());
const read = (path: string): string => {
  try {
    return readFileSync(resolve(root, path), "utf8");
  } catch {
    return "";
  }
};

describe("Projects controller wiring", () => {
  it("uses one revision-safe DraftStore/autosave pipeline for project operations", () => {
    const source = read("src/studio/client/projects-controller.ts");
    expect(source, "projects-controller.ts must exist").not.toBe("");
    expect(source).toMatch(/createDraftStore/);
    expect(source).toMatch(/createAutosaveController/);
    expect(source).toMatch(/duplicateProject/);
    expect(source).toMatch(/moveProject/);
    expect(source).toMatch(/archiveProject/);
    expect(source).toMatch(/setProjectHomeVisibility/);
    expect(source).toMatch(/changeProjectSlug/);
    expect(source).not.toMatch(/deleteProject|splice\([^)]*1\)/);
  });

  it("wires list and detail pages to the same project controller", () => {
    for (const path of [
      "src/pages/admin/projetos/index.astro",
      "src/pages/admin/projetos/[id].astro",
    ]) {
      const source = read(path);
      expect(source, `${path} must exist`).not.toBe("");
      expect(source).toMatch(/setupProjectsController/);
      expect(source).toContain("studio-initial-state");
    }
  });
});
