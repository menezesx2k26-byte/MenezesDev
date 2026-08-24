import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const wranglerPath = resolve(root, "wrangler.jsonc");
const gitignorePath = resolve(root, ".gitignore");
const envExamplePath = resolve(root, ".env.example");

describe("local Cloudflare configuration", () => {
  it("defines a Wrangler configuration", () => {
    expect(existsSync(wranglerPath)).toBe(true);
  });

  it("declares DB and MEDIA bindings without production Cloudflare ids", () => {
    if (!existsSync(wranglerPath)) return;
    const source = readFileSync(wranglerPath, "utf8");

    expect(source).toContain('"binding": "DB"');
    expect(source).toContain('"binding": "MEDIA"');
    expect(source).toContain('"preview_database_id": "menezesdev-studio-local"');
    expect(source).not.toMatch(/"database_id"\s*:\s*"[0-9a-f]{8}-[0-9a-f-]{27,}"/i);
  });

  it("keeps Wrangler state and local auth bypass outside Git", () => {
    const gitignore = readFileSync(gitignorePath, "utf8");
    const envExample = readFileSync(envExamplePath, "utf8");

    expect(gitignore).toContain(".wrangler/");
    expect(envExample).toContain("STUDIO_LOCAL_AUTH_BYPASS=");
    expect(envExample).toMatch(/local-only/i);
    expect(envExample).toMatch(/never.*preview.*production|preview.*production.*never/i);
  });
});
