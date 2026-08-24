import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = resolve(process.cwd(), "migrations/0001_studio_core.sql");
const sql = existsSync(migrationPath) ? readFileSync(migrationPath, "utf8") : "";
const normalized = sql.replace(/--.*$/gm, " ").replace(/\s+/g, " ").trim();
const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf8")) as {
  scripts?: Record<string, string>;
};

const createdTables = [
  ...normalized.matchAll(/CREATE TABLE IF NOT EXISTS\s+([a-z_][a-z0-9_]*)/gi),
].map(([, table]) => table.toLowerCase());

describe("Studio D1 core migration contract", () => {
  it("creates exactly the four approved Studio tables", () => {
    expect(existsSync(migrationPath)).toBe(true);
    expect(createdTables).toEqual([
      "studio_state",
      "studio_versions",
      "media_assets",
      "audit_events",
    ]);
  });

  it("keeps the site state revisioned and keyed by site id", () => {
    expect(normalized).toMatch(/studio_state\s*\([^;]*site_id\s+TEXT\s+PRIMARY KEY/i);
    expect(normalized).toMatch(/draft_revision\s+INTEGER\s+NOT NULL/i);
    expect(normalized).toMatch(/CHECK\s*\(\s*draft_revision\s*>=\s*0\s*\)/i);
  });

  it("makes published version numbers unique and immutable-history friendly", () => {
    expect(normalized).toMatch(
      /studio_versions\s*\([^;]*version_number\s+INTEGER\s+NOT NULL\s+UNIQUE/i,
    );
    expect(normalized).toMatch(/snapshot_json\s+TEXT\s+NOT NULL/i);
    expect(normalized).toMatch(/published_at\s+TEXT\s+NOT NULL/i);
  });

  it("makes R2 keys unique and constrains media lifecycle status", () => {
    expect(normalized).toMatch(/media_assets\s*\([^;]*r2_key\s+TEXT\s+NOT NULL\s+UNIQUE/i);
    expect(normalized).toMatch(
      /CHECK\s*\(\s*status\s+IN\s*\(\s*'active'\s*,\s*'archived'\s*,\s*'deleted'\s*\)\s*\)/i,
    );
  });

  it("keeps audit events append-oriented and indexed by time", () => {
    expect(normalized).toMatch(/audit_events\s*\([^;]*event_type\s+TEXT\s+NOT NULL/i);
    expect(normalized).toMatch(/audit_events\s*\([^;]*created_at\s+TEXT\s+NOT NULL/i);
    expect(normalized).not.toMatch(/audit_events\s*\([^;]*updated_at/i);
    expect(normalized).toMatch(/CREATE INDEX IF NOT EXISTS\s+idx_audit_events_created_at/i);
  });

  it("creates indexes for version ordering and media status", () => {
    expect(normalized).toMatch(/CREATE INDEX IF NOT EXISTS\s+idx_studio_versions_site_version/i);
    expect(normalized).toMatch(/CREATE INDEX IF NOT EXISTS\s+idx_media_assets_status/i);
  });

  it("is schema-only and contains no destructive or fake production material", () => {
    expect(normalized).not.toMatch(/\bDROP\s+TABLE\b/i);
    expect(normalized).not.toMatch(/\b(?:INSERT|UPDATE|DELETE)\s+(?:INTO|FROM)?\b/i);
    expect(normalized).not.toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
    );
    expect(normalized).not.toMatch(/(?:api[_-]?token|secret|password)\s*=/i);
  });

  it("provides local-only Wrangler migration and query scripts", () => {
    expect(packageJson.scripts?.["db:migrate:local"]).toBe(
      "wrangler d1 migrations apply menezesdev-studio-local --local",
    );
    expect(packageJson.scripts?.["db:query:local"]).toBe(
      "wrangler d1 execute menezesdev-studio-local --local --command",
    );
  });
});
