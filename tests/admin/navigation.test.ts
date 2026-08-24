import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (path: string) => {
  const absolute = resolve(process.cwd(), path);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : "";
};

const sidebarPath = "src/components/admin/AdminSidebar.astro";
const layoutPath = "src/layouts/AdminLayout.astro";
const statusPath = "src/components/admin/AdminStatus.astro";
const dashboardPath = "src/pages/admin/index.astro";

const expectedNavigation = [
  ["Visão geral", "/admin"],
  ["Studio", "/admin/studio"],
  ["Projetos", "/admin/projetos"],
  ["Serviços", "/admin/servicos"],
  ["Planos", "/admin/planos"],
  ["Mídia", "/admin/midia"],
  ["SEO", "/admin/seo"],
  ["Configurações", "/admin/configuracoes"],
] as const;

describe("MenezesDev Studio admin shell", () => {
  it("exposes exactly the intended eight primary areas", () => {
    const source = readSource(sidebarPath);
    expect(source, `${sidebarPath} must exist`).not.toBe("");

    for (const [label, href] of expectedNavigation) {
      expect(source).toContain(`label: "${label}"`);
      expect(source).toContain(`href: "${href}"`);
    }

    const labelEntries = source.match(/label:\s*"[^"]+"/g) ?? [];
    expect(labelEntries).toHaveLength(expectedNavigation.length);
  });

  it("keeps admin navigation independent from the public site navigation", () => {
    const sidebar = readSource(sidebarPath);
    const layout = readSource(layoutPath);

    expect(sidebar).not.toContain("MenezesHeader");
    expect(sidebar).not.toContain("siteConfig.navigation");
    expect(layout).not.toContain("MenezesHeader");
    expect(layout).not.toContain("siteConfig.navigation");
  });

  it("forces admin surfaces out of indexing and provides accessible status feedback", () => {
    const layout = readSource(layoutPath);
    const status = readSource(statusPath);

    expect(layout, `${layoutPath} must exist`).not.toBe("");
    expect(layout).toMatch(/noindex/i);
    expect(layout).toMatch(/noarchive/i);
    expect(layout).toContain("skip-link");

    expect(status, `${statusPath} must exist`).not.toBe("");
    expect(status).toContain('aria-live="polite"');
    expect(status).toMatch(/salv|public/i);
  });

  it("renders a dashboard from real Studio/runtime state without invented zero metrics", () => {
    const dashboard = readSource(dashboardPath);
    expect(dashboard, `${dashboardPath} must exist`).not.toBe("");

    expect(dashboard).toMatch(/getDraft|getStudioState/);
    expect(dashboard).toContain("getPublished");
    expect(dashboard).toMatch(/buildRuntimeHealth|createRuntimeHealthProbes/);
    expect(dashboard).toMatch(/document\.projects|projects\.length/);
    expect(dashboard).toMatch(/indisponível|Indisponível/);
    expect(dashboard).not.toMatch(/media(?:Count|Storage)?\s*=\s*0/);
  });
});
