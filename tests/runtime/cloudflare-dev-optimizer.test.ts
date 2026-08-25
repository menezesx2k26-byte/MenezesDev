import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const config = readFileSync(resolve(process.cwd(), "astro.config.mjs"), "utf8");

describe("Cloudflare astro dev SSR dependency optimization", () => {
  it("pre-optimizes the passthrough image service in server environments", () => {
    expect(config).toMatch(/configEnvironment\s*\(/);
    expect(config).toMatch(/if\s*\(\s*environment\s*===\s*["']client["']\s*\)\s*return/);
    expect(config).toMatch(/optimizeDeps\s*:\s*\{/);
    expect(config).toMatch(/include\s*:\s*\[[^\]]*["']astro\/assets\/services\/noop["']/s);
  });

  it("keeps the workaround narrowly scoped instead of forcing all dependency optimization", () => {
    expect(config).not.toMatch(/optimizeDeps\s*:\s*\{[^}]*force\s*:\s*true/s);
    expect(config).not.toMatch(/optimizeDeps\s*:\s*\{[^}]*disabled\s*:/s);
  });
});
