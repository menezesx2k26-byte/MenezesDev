import { describe, expect, it } from "vitest";
import {
  blockedRoutes,
  canonicalRoutes,
  runtimeRoutes,
  staticRoutes,
  staticRouteFile,
} from "../../scripts/route-contract.mjs";

describe("hybrid route contract", () => {
  it("keeps exactly sixteen canonical public routes", () => {
    expect(canonicalRoutes).toHaveLength(16);
    expect(new Set(canonicalRoutes).size).toBe(16);
  });

  it("classifies four runtime routes and twelve prerendered demo routes", () => {
    expect(runtimeRoutes).toEqual([
      "/",
      "/projetos/m47",
      "/projetos/tavola-27",
      "/projetos/prismae",
    ]);
    expect(staticRoutes).toHaveLength(12);
    expect(staticRoutes.every((route: string) => route.startsWith("/demo/"))).toBe(true);
  });

  it("keeps blocked routes outside the canonical surface", () => {
    expect(blockedRoutes).toContain("/demo/prismae/about");
    for (const route of blockedRoutes) expect(canonicalRoutes).not.toContain(route);
  });

  it("maps prerendered routes to the Cloudflare client output", () => {
    expect(staticRouteFile("/tmp/dist/client", "/demo/m47")).toBe(
      "/tmp/dist/client/demo/m47.html",
    );
  });
});
