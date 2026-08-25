import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const typesPath = resolve(process.cwd(), "worker-configuration.d.ts");

describe("generated Cloudflare binding types", () => {
  it("commits the Wrangler-generated project-local type file", () => {
    expect(existsSync(typesPath)).toBe(true);
  });

  it("exposes only the approved DB and MEDIA bindings", () => {
    const types = readFileSync(typesPath, "utf8");
    expect(types).toMatch(/\bDB\s*:\s*D1Database\b/);
    expect(types).toMatch(/\bMEDIA\s*:\s*R2Bucket\b/);
    expect(types).not.toMatch(/\bIMAGES\s*:/);
    expect(types).not.toMatch(/\bSESSION\s*:/);
  });
});
