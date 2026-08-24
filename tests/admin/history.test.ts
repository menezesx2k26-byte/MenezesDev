import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");

describe("publication history domain", () => {
  it("exposes immutable restore lineage in version summaries", () => {
    const repository = read("src/studio/repository.ts");
    expect(repository).toMatch(/restored_from_version_id/);
    expect(repository).toMatch(/restoredFromVersionId/);
    expect(repository).toMatch(/StudioVersionSummary/);
  });

  it("loads history from D1 with the current draft revision and no destructive action", () => {
    const page = read("src/pages/admin/historico.astro");
    expect(page).toMatch(/requireStudioAdminContext/);
    expect(page).toMatch(/listVersions\(DB/);
    expect(page).toMatch(/getDraft\(DB\)/);
    expect(page).toMatch(/VersionList/);
    expect(page).toMatch(/RestoreDialog/);
    expect(page).not.toMatch(/DELETE|deleteVersion|Excluir histórico|Apagar histórico/i);
  });

  it("shows version, date, actor, note status and restore lineage", () => {
    const list = read("src/components/admin/history/VersionList.astro");
    expect(list).toMatch(/versionNumber/);
    expect(list).toMatch(/publishedAt/);
    expect(list).toMatch(/publishedBy/);
    expect(list).toMatch(/Nota/i);
    expect(list).toMatch(/restoredFromVersionId/);
    expect(list).toMatch(/Restaurad|restaurad/i);
    expect(list).not.toMatch(/Excluir|Apagar|delete/i);
  });

  it("requires explicit restore confirmation and explains draft-only semantics", () => {
    const dialog = read("src/components/admin/history/RestoreDialog.astro");
    expect(dialog).toMatch(/dialog/i);
    expect(dialog).toMatch(/confirm/i);
    expect(dialog).toMatch(/rascunho/i);
    expect(dialog).toMatch(/não (?:será|fica|é) publicad|não publica/i);
    expect(dialog).toMatch(/data-history-confirm-restore/);
  });

  it("posts revision-checked restore and redirects to the editor only after success", () => {
    const controller = read("src/studio/client/history-controller.ts");
    expect(controller).toMatch(/expectedRevision/);
    expect(controller).toMatch(/\/api\/admin\/versions\/\$\{[^}]+\}\/restore/);
    expect(controller).toMatch(/method:\s*["']POST["']/);
    expect(controller).toMatch(/status\s*===\s*409/);
    expect(controller).toMatch(/\/admin\/studio/);
    expect(controller).not.toMatch(/method:\s*["']DELETE["']/);
  });

  it("keeps History outside the eight-item primary nav but exposes a dashboard entry point", () => {
    const sidebar = read("src/components/admin/AdminSidebar.astro");
    const dashboard = read("src/pages/admin/index.astro");
    expect(sidebar).not.toMatch(/\/admin\/historico/);
    expect(dashboard).toMatch(/\/admin\/historico/);
    expect(dashboard).toMatch(/Histórico/);
  });
});
