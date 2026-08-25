# MenezesDev Studio — Runtime & Persistence Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate MenezesDev from an all-static Astro build to a Cloudflare Workers-capable Astro runtime with typed D1/R2 bindings, without changing the rendered public experience or relaxing any Phase 10 hard gate.

**Architecture:** Introduce `@astrojs/cloudflare` and Wrangler while retaining the existing Astro component tree. `/demo/**` and `/404` stay prerendered. Runtime infrastructure is added before any public route starts reading from D1. D1/R2 are wired locally first; no production resources, credentials, deploy, merge, or placeholder commercial values are created.

**Tech Stack:** Astro 7.2.4, `@astrojs/cloudflare` 14.2.3, Cloudflare Workers, Wrangler 4.125.0, D1, R2, TypeScript 6.0.3, Vitest 4.1.11, pnpm 11.22.0, Node 24.19.0.

**Spec:** `docs/superpowers/specs/2026-08-23-menezesdev-studio-design.md`

## Global constraints

- Work only on `feat/menezesdev-studio`.
- Do not merge into `main` or deploy production.
- Never touch `tools/mcp-image/src/core/promptBuilder.ts` or `tools/mcp-image/tests/workspace-prompt.test.mjs`.
- No real Cloudflare IDs, Access credentials, tokens, secrets, or customer data in Git.
- Keep the 16 canonical routes and deliberate absence of `/demo/prismae/about`.
- Keep all `/demo/**` routes `noindex, nofollow, noarchive` and local-only in behavior.
- Keep the real WhatsApp destination unresolved until explicitly supplied; never introduce a fake value.
- Every implementation task follows red → green → refactor TDD where executable behavior is introduced.

---

## Task 1 — Add runtime/test tooling without changing behavior

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vitest.config.ts`
- Create: `tests/runtime/config.test.ts`

- [ ] **1.1 Write the failing runtime-config test**

Create `tests/runtime/config.test.ts` asserting the intended constants exported from a new runtime config module do not yet exist. The test contract must cover:

```ts
import { describe, expect, it } from "vitest";
import { runtimeConfig } from "../../src/runtime/config";

describe("runtimeConfig", () => {
  it("uses fixed safe binding names", () => {
    expect(runtimeConfig.bindings.database).toBe("DB");
    expect(runtimeConfig.bindings.media).toBe("MEDIA");
  });

  it("does not contain production resource ids", () => {
    expect(JSON.stringify(runtimeConfig)).not.toMatch(/[0-9a-f]{8}-[0-9a-f-]{27,}/i);
  });
});
```

- [ ] **1.2 Run the focused test and confirm RED**

```bash
corepack pnpm vitest run tests/runtime/config.test.ts
```

Expected: failure because `src/runtime/config.ts` does not exist yet.

- [ ] **1.3 Add pinned dependencies**

Run:

```bash
corepack pnpm add @astrojs/cloudflare@14.2.3
corepack pnpm add -D wrangler@4.125.0 vitest@4.1.11
```

Do not add `@cloudflare/workers-types`; generated Wrangler runtime types are the source of truth.

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest",
"cf:types": "wrangler types",
"cf:dev": "wrangler dev"
```

- [ ] **1.4 Create `vitest.config.ts`**

Use Node test environment and include `tests/**/*.test.ts`. Keep coverage out of the initial baseline until behavior exists worth measuring.

- [ ] **1.5 Commit checkpoint**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts tests/runtime/config.test.ts
git commit -m "chore(studio): add Cloudflare and test tooling"
```

---

## Task 2 — Add safe Wrangler configuration and generated binding types

**Files:**
- Create: `wrangler.jsonc`
- Create: `src/runtime/config.ts`
- Create: `worker-configuration.d.ts`
- Modify: `.gitignore`
- Modify: `.env.example`
- Test: `tests/runtime/config.test.ts`

- [ ] **2.1 Create the runtime config module**

`src/runtime/config.ts` exports a frozen object with logical binding names only:

```ts
export const runtimeConfig = {
  bindings: { database: "DB", media: "MEDIA" },
  siteId: "menezesdev",
} as const;
```

- [ ] **2.2 Create `wrangler.jsonc` for local-safe configuration**

Use:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "menezesdev",
  "compatibility_date": "2026-08-23",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "menezesdev-studio-local",
      "database_id": "local"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MEDIA",
      "bucket_name": "menezesdev-studio-media-local"
    }
  ]
}
```

Before implementation, validate whether Wrangler 4 accepts `database_id: "local"` for the intended local-only workflow. If it does not, omit `database_id` from the committed local config rather than inventing a UUID. Production binding identifiers remain a release-time configuration concern, never a fake committed ID.

- [ ] **2.3 Ignore local Cloudflare state**

Append `.wrangler/` to `.gitignore`.

- [ ] **2.4 Document only safe local flags**

Extend `.env.example` with names such as:

```dotenv
PUBLIC_SITE_URL=
PUBLIC_DEPLOY_ENV=development
STUDIO_LOCAL_AUTH_BYPASS=
```

The comment must explicitly say `STUDIO_LOCAL_AUTH_BYPASS` is local-only and must never be enabled in preview/production.

- [ ] **2.5 Generate Worker types**

```bash
corepack pnpm cf:types
```

Commit the generated `worker-configuration.d.ts` only if Wrangler's current output is stable and project-local; do not hand-author stale D1/R2 interfaces.

- [ ] **2.6 Run test and type check — GREEN**

```bash
corepack pnpm test -- tests/runtime/config.test.ts
corepack pnpm check
```

- [ ] **2.7 Commit checkpoint**

```bash
git add wrangler.jsonc src/runtime/config.ts worker-configuration.d.ts .gitignore .env.example
git commit -m "feat(studio): configure local Cloudflare bindings"
```

---

## Task 3 — Migrate Astro to Cloudflare server output while keeping demos prerendered

**Files:**
- Modify: `astro.config.mjs`
- Modify: all pages under `src/pages/demo/**`
- Modify: `src/pages/404.astro`
- Create: `tests/runtime/prerender-policy.test.ts`

- [ ] **3.1 Write failing prerender policy test**

Read source files as text and assert:
- every canonical `/demo/**` page has `export const prerender = true;`;
- `src/pages/404.astro` has `export const prerender = true;`;
- Home and `/projetos/*` do not force prerender.

Run and confirm RED.

- [ ] **3.2 Configure Cloudflare adapter**

In `astro.config.mjs`:

```js
import cloudflare from "@astrojs/cloudflare";
```

Set:

```js
output: "server",
adapter: cloudflare(),
```

Preserve current fonts, sitemap filtering, CSP, Tailwind, site URL, `trailingSlash`, and all existing visual/build settings unless the adapter requires a documented change.

- [ ] **3.3 Mark static demo routes and 404 prerendered**

Add `export const prerender = true;` to all 12 demo page source files and `404.astro`. Do not alter copy, assets, demo actions, metadata, or layout.

- [ ] **3.4 Run focused and build validation**

```bash
corepack pnpm test -- tests/runtime/prerender-policy.test.ts
corepack pnpm check
corepack pnpm build:site
```

- [ ] **3.5 Adapt route audit for hybrid/server output**

The existing `scripts/check-routes.mjs` assumes every canonical route becomes `dist/<route>.html`. Refactor it so:
- prerendered demo routes and 404 are still verified from build artifacts;
- runtime Home/case routes are verified by source route presence and later runtime HTTP smoke tests;
- no gate is silently dropped.

Add a test for the audit's route classification rather than merely deleting static assertions.

- [ ] **3.6 Commit checkpoint**

```bash
git add astro.config.mjs src/pages/demo src/pages/404.astro scripts/check-routes.mjs tests/runtime/prerender-policy.test.ts
git commit -m "feat(studio): migrate Astro runtime to Cloudflare"
```

---

## Task 4 — Create D1 schema and deterministic local migration path

**Files:**
- Create: `migrations/0001_studio_core.sql`
- Create: `tests/runtime/migration-contract.test.ts`
- Modify: `package.json`

- [ ] **4.1 Write failing migration-contract test**

Assert the SQL contains exactly the four required tables and critical constraints:
- `studio_state` primary site row;
- `studio_versions` unique `version_number`;
- `media_assets` unique `r2_key`;
- `audit_events` append-only application target.

Also assert no `DROP TABLE`, no destructive seed, and no fake credentials/resource IDs.

- [ ] **4.2 Implement `0001_studio_core.sql`**

Use `TEXT` timestamps in ISO-8601 UTC, `INTEGER` revisions/version numbers, appropriate `CHECK` constraints for media status, indexes for version ordering/media status/audit time, and foreign keys only where they do not prevent immutable historical snapshots.

The migration creates schema only. Initial content seeding belongs to the next plan.

- [ ] **4.3 Add local D1 scripts**

Add:

```json
"db:migrate:local": "wrangler d1 migrations apply menezesdev-studio-local --local",
"db:query:local": "wrangler d1 execute menezesdev-studio-local --local --command"
```

If Wrangler's CLI requires binding/database-name syntax different from this exact form, use the current documented syntax and update the plan note in the implementation commit; never substitute a production identifier.

- [ ] **4.4 Run migration locally twice**

```bash
corepack pnpm db:migrate:local
corepack pnpm db:migrate:local
```

Second run must be a no-op/success, proving idempotent migration tracking.

- [ ] **4.5 Query schema**

Use Wrangler local D1 to confirm all four tables and indexes exist.

- [ ] **4.6 Run tests**

```bash
corepack pnpm test -- tests/runtime/migration-contract.test.ts
corepack pnpm check
```

- [ ] **4.7 Commit checkpoint**

```bash
git add migrations/0001_studio_core.sql tests/runtime/migration-contract.test.ts package.json pnpm-lock.yaml
git commit -m "feat(studio): add D1 persistence schema"
```

---

## Task 5 — Add runtime binding access and health smoke without exposing admin data

**Files:**
- Create: `src/runtime/bindings.ts`
- Create: `src/runtime/health.ts`
- Create: `src/pages/api/runtime-health.ts`
- Create: `tests/runtime/health.test.ts`

- [ ] **5.1 Write failing pure health tests**

Design `buildRuntimeHealth()` around injected minimal D1/R2 probes so unit tests do not require live Cloudflare resources. Test:
- DB success + R2 success → healthy;
- either failure → degraded;
- response object never includes raw exceptions, secrets, object keys, SQL, or auth headers.

- [ ] **5.2 Implement typed binding helpers**

Centralize all access to `Astro.locals.runtime.env.DB` and `.MEDIA` in `src/runtime/bindings.ts`. Do not scatter casts across routes.

- [ ] **5.3 Implement bounded health checks**

D1 probe: a cheap `SELECT 1`.
R2 probe: binding existence plus a bounded metadata-safe operation; do not list an entire bucket.

- [ ] **5.4 Add development-only runtime health endpoint**

`GET /api/runtime-health` may return generic health only in development. In preview/production it returns 404 or an authorization-safe denial. This is not the future authenticated `/api/admin/health` endpoint.

- [ ] **5.5 Run local Worker smoke**

```bash
corepack pnpm cf:dev
```

Verify:
- `/` returns successfully;
- `/demo/m47` returns successfully and remains noindex;
- `/demo/prismae/about` remains 404;
- `/api/runtime-health` reports local binding health without secret data.

- [ ] **5.6 Run full checkpoint**

```bash
corepack pnpm format:check
corepack pnpm test
corepack pnpm check
corepack pnpm build
corepack pnpm check:acceptance
```

Any Phase 10 gate failing due only to its old static-file assumption must be adapted with equivalent-or-stronger runtime evidence, never removed.

- [ ] **5.7 Commit checkpoint**

```bash
git add src/runtime src/pages/api/runtime-health.ts tests/runtime/health.test.ts scripts package.json pnpm-lock.yaml
git commit -m "test(studio): verify Cloudflare runtime foundation"
```

---

## Runtime plan completion gate

This plan is complete only when:

- Cloudflare server build succeeds locally;
- D1 and R2 bindings work locally;
- all demo routes remain prerendered and behaviorally unchanged;
- the 16-route contract remains represented and audited;
- no D1 content is yet used to alter the public Home/cases;
- no production resource is created or deployed;
- all relevant Phase 10 hard-gate intent remains passing;
- no secret or fake commercial configuration entered Git.
