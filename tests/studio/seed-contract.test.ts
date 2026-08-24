import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const requiredFiles = [
  "scripts/seed-studio.mjs",
  "scripts/check-studio-seed.mjs",
  "src/pages/api/runtime-studio-seed.ts",
] as const;

const missingFiles = requiredFiles.filter((path) => !existsSync(resolve(root, path)));
const seedScript = missingFiles.includes("scripts/seed-studio.mjs")
  ? ""
  : read("scripts/seed-studio.mjs");
const checkScript = missingFiles.includes("scripts/check-studio-seed.mjs")
  ? ""
  : read("scripts/check-studio-seed.mjs");
const endpoint = missingFiles.includes("src/pages/api/runtime-studio-seed.ts")
  ? ""
  : read("src/pages/api/runtime-studio-seed.ts");
const packageJson = JSON.parse(read("package.json")) as { scripts?: Record<string, string> };
const routeContract = read("scripts/route-contract.mjs");
const workflow = read(".github/workflows/studio-tdd.yml");

describe("local Studio seed contract", () => {
  it("materializes the local-only seed path without duplicating editorial JSON in scripts", () => {
    expect(missingFiles).toEqual([]);
    expect(endpoint).toContain("createDefaultSiteDocument");
    expect(endpoint).toContain("initializeStudio");
    expect(endpoint).toContain('"local-seed"');
    expect(seedScript).not.toMatch(/Sites institucionais|M47 Barber|Tavola 27|Prismae/);
    expect(checkScript).not.toMatch(/Sites institucionais|M47 Barber|Tavola 27|Prismae/);
  });

  it("fails closed outside DEV for both discovery and mutation", () => {
    expect(endpoint).toMatch(/if\s*\(\s*!import\.meta\.env\.DEV\s*\)/);
    expect(endpoint).toMatch(/status:\s*404/);
    expect(endpoint).toMatch(/export const GET/);
    expect(endpoint).toMatch(/export const POST/);
    expect(routeContract).toContain('"/api/runtime-studio-seed"');
  });

  it("uses an explicit local actor and reports duplicate initialization as a refusal", () => {
    expect(endpoint).toContain("StudioAlreadyInitializedError");
    expect(endpoint).toMatch(/status:\s*409/);
    expect(seedScript).toMatch(/response\.status\s*===\s*409/);
    expect(seedScript).toMatch(/process\.exitCode\s*=\s*2/);
  });

  it("runs only against local Astro and local Wrangler state", () => {
    expect(seedScript).toContain('const host = "127.0.0.1"');
    expect(seedScript).toContain('"dev"');
    expect(seedScript).toContain('/api/runtime-studio-seed');
    expect(seedScript).not.toMatch(/--remote|https:\/\//);
    expect(checkScript).toContain("wrangler");
    expect(checkScript).toContain("d1");
    expect(checkScript).toContain("--local");
    expect(checkScript).toContain("--json");
    expect(checkScript).not.toContain("--remote");
  });

  it("verifies version 1, published pointer, identical initial draft and one init audit", () => {
    expect(checkScript).toContain("studio_state");
    expect(checkScript).toContain("studio_versions");
    expect(checkScript).toContain("audit_events");
    expect(checkScript).toContain("draft_revision");
    expect(checkScript).toContain("published_version_number");
    expect(checkScript).toContain("snapshots_match");
    expect(checkScript).toContain("studio_initialized");
    expect(checkScript).toContain("local-seed");
  });

  it("exposes explicit package scripts and exercises first seed plus duplicate refusal in CI", () => {
    expect(packageJson.scripts?.["studio:seed:local"]).toBe("node scripts/seed-studio.mjs");
    expect(packageJson.scripts?.["studio:check-seed"]).toBe("node scripts/check-studio-seed.mjs");
    expect(workflow).toContain("corepack pnpm studio:seed:local");
    expect(workflow).toContain("corepack pnpm studio:check-seed");
    expect(workflow).toContain("Refuse duplicate local seed");
  });
});
