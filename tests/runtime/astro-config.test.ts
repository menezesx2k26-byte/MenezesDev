import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const config = readFileSync(resolve(process.cwd(), "astro.config.mjs"), "utf8");

describe("Astro Cloudflare runtime contract", () => {
  it("uses Cloudflare server output", () => {
    expect(config).toMatch(/output:\s*"server"/);
    expect(config).toMatch(/adapter:\s*cloudflare\(/);
  });

  it("does not provision implicit Cloudflare Images or KV session bindings", () => {
    expect(config).toMatch(/imageService:\s*"passthrough"/);
    expect(config).toMatch(/session:\s*false/);
  });
});
