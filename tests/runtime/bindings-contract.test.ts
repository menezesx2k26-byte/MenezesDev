import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const bindingsPath = resolve(process.cwd(), "src/runtime/bindings.ts");
const source = existsSync(bindingsPath) ? readFileSync(bindingsPath, "utf8") : "";

describe("Cloudflare runtime binding access", () => {
  it("centralizes binding access in a dedicated module", () => {
    expect(existsSync(bindingsPath)).toBe(true);
  });

  it("uses the current cloudflare:workers env API", () => {
    expect(source).toMatch(/from\s+["']cloudflare:workers["']/);
    expect(source).toMatch(/\benv\.DB\b/);
    expect(source).toMatch(/\benv\.MEDIA\b/);
  });

  it("does not use the removed Astro.locals.runtime API", () => {
    expect(source).not.toMatch(/Astro\.locals\.runtime|locals\.runtime|runtime\.env/);
  });

  it("exposes only the approved DB and MEDIA binding surface", () => {
    expect(source).toMatch(/Pick<Env,\s*["']DB["']\s*\|\s*["']MEDIA["']>/);
    expect(source).not.toMatch(/\b(?:IMAGES|SESSION)\b/);
  });
});
