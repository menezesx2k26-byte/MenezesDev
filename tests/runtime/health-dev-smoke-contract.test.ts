import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const scriptPath = resolve(process.cwd(), "scripts/check-runtime-health-dev.mjs");
const scriptSource = existsSync(scriptPath) ? readFileSync(scriptPath, "utf8") : "";
const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf8")) as {
  scripts?: Record<string, string>;
};
const workflowSource = readFileSync(
  resolve(process.cwd(), ".github/workflows/studio-tdd.yml"),
  "utf8",
);

describe("development runtime health smoke contract", () => {
  it("provides a dedicated smoke script", () => {
    expect(existsSync(scriptPath)).toBe(true);
    expect(scriptSource).toMatch(/astroExecutable/);
    expect(scriptSource).toMatch(/["']dev["']/);
    expect(scriptSource).toMatch(/\/api\/runtime-health/);
  });

  it("requires the exact healthy JSON contract and no-store response", () => {
    expect(scriptSource).toMatch(/status\s*!==\s*200/);
    expect(scriptSource).toMatch(/cache-control/i);
    expect(scriptSource).toMatch(/no-store/);
    expect(scriptSource).toMatch(/database:\s*["']ok["']/);
    expect(scriptSource).toMatch(/media:\s*["']ok["']/);
  });

  it("exposes the smoke through a package script", () => {
    expect(packageJson.scripts?.["check:runtime-health:dev"]).toBe(
      "node scripts/check-runtime-health-dev.mjs",
    );
  });

  it("runs the smoke in read-only CI after local D1 verification", () => {
    expect(workflowSource).toMatch(/name:\s*Smoke development runtime health/);
    expect(workflowSource).toMatch(/corepack pnpm check:runtime-health:dev/);
    expect(workflowSource.indexOf("Verify local D1 schema")).toBeLessThan(
      workflowSource.indexOf("Smoke development runtime health"),
    );
  });
});
