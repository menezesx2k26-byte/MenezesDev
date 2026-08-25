import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");

describe("admin publication completion gate", () => {
  it("computes dirty state from document content rather than revision counters", () => {
    const dashboard = read("src/pages/admin/index.astro");
    expect(dashboard).toMatch(/draftResult\.value\.document/);
    expect(dashboard).toMatch(/publishedResult\.value\.document/);
    expect(dashboard).not.toMatch(/draftResult\.value\.revision\s*!==\s*publishedResult\.value\.sourceRevision/);
  });

  it("exposes a publication confirmation flow with the real draft revision", () => {
    const dashboard = read("src/pages/admin/index.astro");
    expect(dashboard).toMatch(/PublicationDialog/);
    expect(dashboard).toMatch(/data-publication-root/);
    expect(dashboard).toMatch(/data-publication-revision/);
    expect(dashboard).toMatch(/data-publish-open/);
    expect(dashboard).toMatch(/draftDirty\s*!==\s*true|disabled=\{draftDirty\s*!==\s*true\}/);
  });

  it("makes publication consequences explicit before confirmation", () => {
    const dialog = read("src/components/admin/publication/PublicationDialog.astro");
    expect(dialog).toMatch(/dialog/i);
    expect(dialog).toMatch(/Confirmar publicação/i);
    expect(dialog).toMatch(/site ao vivo|versão publicada/i);
    expect(dialog).toMatch(/data-publication-confirm/);
    expect(dialog).toMatch(/data-publication-cancel/);
  });

  it("posts the expected revision and never overwrites a conflict silently", () => {
    const controller = read("src/studio/client/publication-controller.ts");
    expect(controller).toMatch(/\/api\/admin\/publish/);
    expect(controller).toMatch(/method:\s*["']POST["']/);
    expect(controller).toMatch(/expectedRevision/);
    expect(controller).toMatch(/credentials:\s*["']same-origin["']/);
    expect(controller).toMatch(/status\s*===\s*409/);
    expect(controller).toMatch(/location\.reload\(\)/);
    expect(controller).not.toMatch(/method:\s*["']DELETE["']/);
  });
});
