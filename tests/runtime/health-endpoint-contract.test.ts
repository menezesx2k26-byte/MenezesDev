import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const endpointPath = resolve(process.cwd(), "src/pages/api/runtime-health.ts");
const source = existsSync(endpointPath) ? readFileSync(endpointPath, "utf8") : "";

describe("development-only runtime health endpoint", () => {
  it("exists as a dedicated API route", () => {
    expect(existsSync(endpointPath)).toBe(true);
    expect(source).toMatch(/export\s+const\s+GET\b/);
  });

  it("fails closed outside Astro development mode", () => {
    expect(source).toMatch(/!import\.meta\.env\.DEV/);
    expect(source).toMatch(/status:\s*404/);
  });

  it("uses centralized bindings and sanitized health construction", () => {
    expect(source).toMatch(/getRuntimeBindings/);
    expect(source).toMatch(/createRuntimeHealthProbes/);
    expect(source).toMatch(/buildRuntimeHealth/);
    expect(source).not.toMatch(/Astro\.locals\.runtime|locals\.runtime|runtime\.env/);
  });

  it("is non-cacheable and signals degraded health without leaking diagnostics", () => {
    expect(source).toMatch(/["']Cache-Control["']\s*:\s*["']no-store["']/);
    expect(source).toMatch(/health\.status\s*===\s*["']healthy["']\s*\?\s*200\s*:\s*503/);
    expect(source).not.toMatch(/console\.(?:log|error)|error\.message|stack/);
  });
});
