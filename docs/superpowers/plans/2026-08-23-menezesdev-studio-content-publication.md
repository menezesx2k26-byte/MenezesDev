# MenezesDev Studio — Content Model & Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move editable MenezesDev content into a strongly typed, runtime-validated `SiteDocument` stored in D1, with deterministic seeding, optimistic draft saves, immutable published versions, atomic publish, and non-destructive restore.

**Architecture:** Existing `src/data/home.ts`, `src/data/projects.ts`, and `src/config/site.ts` remain the migration source. A single versioned document becomes the editorial unit. Public routes read only the active published snapshot; admin/preview reads the draft. Repository/service modules own D1 access so UI/routes never contain SQL.

**Tech Stack:** TypeScript 6, Vitest 4.1.11, Astro server routes, Cloudflare D1 prepared statements/batches, existing Astro components.

**Spec:** `docs/superpowers/specs/2026-08-23-menezesdev-studio-design.md`

## Global constraints

- Start only after the Runtime & Persistence Foundation plan passes.
- Preserve current public copy and visuals exactly through the initial seed.
- No arbitrary HTML/CSS/script fields in `SiteDocument`.
- Public read path must never fall back to mutable draft data.
- Publication failure must leave the old published pointer active.
- Published versions are immutable in application code.
- Keep all demo behavior outside the editable commercial document where editing it could make a fictitious business appear real.

---

## Task 1 — Define the canonical `SiteDocument` type and validator

**Files:**
- Create: `src/studio/types.ts`
- Create: `src/studio/validation.ts`
- Create: `tests/studio/validation.test.ts`
- Modify: `src/types/index.ts` only where shared public presentation types should be reused

- [ ] **1.1 Write validation tests first**

Cover at minimum:
- valid baseline document accepted;
- missing `schemaVersion` rejected;
- duplicate project IDs/slugs rejected;
- JavaScript/data URLs rejected from external links;
- invalid layout preset rejected;
- plans with negative structured starting price rejected;
- unsafe demo-indexing mutation rejected;
- oversized lists/strings rejected at documented limits;
- missing required hero/SEO text blocks publication.

The validation API should expose field-addressable issues, e.g.:

```ts
const result = validateSiteDocument(candidate, { mode: "publish" });
expect(result.ok).toBe(false);
expect(result.issues[0]?.path).toBe("home.hero.title");
```

- [ ] **1.2 Implement explicit types**

Create dedicated types for:
- `SiteDocument`;
- `StudioBrand`;
- `StudioNavigationItem`;
- `HomeDocument` and each section;
- `StudioProject`;
- `StudioService`;
- `StudioPlan` with integer `startingPriceCents | null` plus deliberate `priceLabel`;
- `StudioSeo`;
- `StudioCommercial`;
- `StudioPresentation`;
- `MediaReference`.

Stable IDs are strings generated once; display order comes from array order, not mutable numeric rank fields.

- [ ] **1.3 Implement runtime validation without executable content**

Keep the validator small and explicit. If implementation chooses a validation library, pin one current version and document why the dependency reduces risk versus hand-written checks. Do not add a schema library merely for convenience if the custom bounded schema remains maintainable.

- [ ] **1.4 Run focused tests — GREEN**

```bash
corepack pnpm test -- tests/studio/validation.test.ts
corepack pnpm check
```

- [ ] **1.5 Commit**

```bash
git add src/studio/types.ts src/studio/validation.ts tests/studio/validation.test.ts src/types/index.ts
git commit -m "feat(studio): define validated site document"
```

---

## Task 2 — Build a deterministic baseline document from Phase 10 source data

**Files:**
- Create: `src/studio/default-document.ts`
- Create: `tests/studio/default-document.test.ts`
- Read-only source reference: `src/data/home.ts`
- Read-only source reference: `src/data/projects.ts`
- Read-only source reference: `src/config/site.ts`

- [ ] **2.1 Write baseline fidelity tests**

Assert the generated baseline preserves known anchors from Phase 10:
- service count and exact service titles;
- three plan names and starting values 600/950/1500 BRL;
- all existing FAQs/questions;
- project names/slugs M47, Tavola 27, Prismae;
- project cover/strip asset references and alt text;
- existing navigation labels;
- current approved metadata copy;
- WhatsApp remains `null`/unconfigured.

- [ ] **2.2 Implement `createDefaultSiteDocument()`**

Map current typed constants into schema version 1. No copy editing occurs here. Give every editable list item a deterministic stable ID derived from canonical existing identity, not random IDs that change on each seed.

- [ ] **2.3 Validate default for draft and publication**

The default may intentionally fail only the already-known real commercial release requirement (WhatsApp/canonical production input), not structural Studio validation.

- [ ] **2.4 Run tests**

```bash
corepack pnpm test -- tests/studio/default-document.test.ts tests/studio/validation.test.ts
```

- [ ] **2.5 Commit**

```bash
git add src/studio/default-document.ts tests/studio/default-document.test.ts
git commit -m "feat(studio): derive baseline editorial document"
```

---

## Task 3 — Implement D1 repository with optimistic draft revision

**Files:**
- Create: `src/studio/repository.ts`
- Create: `src/studio/errors.ts`
- Create: `tests/studio/repository.test.ts`

- [ ] **3.1 Write repository contract tests using an injected D1-compatible test double/local D1**

Cover:
- missing state returns an explicit `StudioNotInitializedError` rather than guessed content;
- initialization creates one site row and initial version safely;
- `getDraft()` returns document + revision;
- `saveDraft(document, expectedRevision)` increments revision exactly once;
- stale expected revision throws `StudioRevisionConflictError` and leaves stored draft unchanged;
- read published returns snapshot selected by `published_version_id` only;
- malformed stored JSON fails closed.

- [ ] **3.2 Implement repository APIs**

Required public methods:

```ts
getStudioState(db)
getDraft(db)
getPublished(db)
saveDraft(db, input)
listVersions(db, page)
getVersion(db, id)
initializeStudio(db, document, actor)
```

All SQL uses prepared statements and bound parameters. SQL strings remain inside repository/storage modules.

- [ ] **3.3 Make draft write one compare-and-swap statement**

Use a condition equivalent to:

```sql
UPDATE studio_state
SET draft_json = ?, draft_revision = draft_revision + 1, updated_at = ?, updated_by = ?
WHERE id = ? AND draft_revision = ?
```

Check affected rows. Zero affected rows means conflict, never last-write-wins.

- [ ] **3.4 Run focused tests**

```bash
corepack pnpm test -- tests/studio/repository.test.ts
```

- [ ] **3.5 Commit**

```bash
git add src/studio/repository.ts src/studio/errors.ts tests/studio/repository.test.ts
git commit -m "feat(studio): add revision-safe D1 repository"
```

---

## Task 4 — Seed local D1 once and prove content fidelity

**Files:**
- Create: `scripts/seed-studio.mjs`
- Create: `scripts/check-studio-seed.mjs`
- Modify: `package.json`
- Test: `tests/studio/seed-contract.test.ts`

- [ ] **4.1 Write seed contract test**

Assert seeding is explicit and non-destructive:
- refuses to overwrite an initialized database without an explicit reset-only-local path;
- creates version 1 and sets it as published;
- draft equals version 1 initially;
- logs `studio_initialized` audit event;
- actor for local seed is a fixed non-personal label such as `local-seed`.

- [ ] **4.2 Implement deterministic seed serialization**

Prefer generating a JSON file in `tmp/` from `createDefaultSiteDocument()` and passing it to a small local seed path rather than duplicating content in SQL.

- [ ] **4.3 Add scripts**

Examples:

```json
"studio:seed:local": "node scripts/seed-studio.mjs",
"studio:check-seed": "node scripts/check-studio-seed.mjs"
```

- [ ] **4.4 Run local migrations + seed**

```bash
corepack pnpm db:migrate:local
corepack pnpm studio:seed:local
corepack pnpm studio:check-seed
```

- [ ] **4.5 Run seed a second time and verify safe refusal/no mutation**

- [ ] **4.6 Commit**

```bash
git add scripts/seed-studio.mjs scripts/check-studio-seed.mjs tests/studio/seed-contract.test.ts package.json
git commit -m "feat(studio): seed D1 from approved Phase 10 content"
```

---

## Task 5 — Implement atomic publication and non-destructive restore

**Files:**
- Create: `src/studio/publication.ts`
- Create: `tests/studio/publication.test.ts`

- [ ] **5.1 Write atomic publication tests first**

Cover:
- publish validates entire draft in publish mode;
- invalid draft creates no version and does not alter pointer;
- valid publish creates exactly one new immutable snapshot/version number;
- pointer switches to the new version;
- draft revision advances/synchronizes consistently;
- audit event written;
- simulated batch failure leaves prior pointer/version state usable;
- restore copies old snapshot into a new draft but does not publish immediately;
- publish after restore creates a new version with `restored_from_version_id`.

- [ ] **5.2 Implement `publishDraft()` using one D1 batch**

Prepare statements for version insert, pointer/draft synchronization, and audit insert, then execute with `db.batch(...)`. Do not mutate live pointer before all publication checks finish.

- [ ] **5.3 Implement `restoreVersionToDraft()`**

Use optimistic revision on restore as well. Historical rows are never updated or deleted.

- [ ] **5.4 Run focused tests**

```bash
corepack pnpm test -- tests/studio/publication.test.ts
```

- [ ] **5.5 Commit**

```bash
git add src/studio/publication.ts tests/studio/publication.test.ts
git commit -m "feat(studio): add atomic publication and restore"
```

---

## Task 6 — Add protected admin state/draft/version API domain

**Files:**
- Create: `src/studio/http.ts`
- Create: `src/pages/api/admin/state.ts`
- Create: `src/pages/api/admin/draft.ts`
- Create: `src/pages/api/admin/publish.ts`
- Create: `src/pages/api/admin/versions/index.ts`
- Create: `src/pages/api/admin/versions/[id].ts`
- Create: `src/pages/api/admin/versions/[id]/restore.ts`
- Create: `tests/studio/http.test.ts`

- [ ] **6.1 Write pure HTTP/request validation tests**

Cover JSON content type, request-size cap, expected revision parsing, normalized error responses, no stack traces, 409 conflicts, 422 validation failures, and 405 methods.

Authentication middleware itself is completed in the Security plan; until then these routes must be inaccessible in preview/production rather than permissive.

- [ ] **6.2 Implement API routes as thin adapters**

No SQL in route files. Route flow:
1. require admin context/fail closed;
2. parse bounded request;
3. call Studio service/repository;
4. return stable JSON response.

- [ ] **6.3 Add response headers**

Admin JSON responses use `Cache-Control: no-store` and appropriate content type. Never cache draft/version API responses publicly.

- [ ] **6.4 Run tests**

```bash
corepack pnpm test -- tests/studio/http.test.ts tests/studio/repository.test.ts tests/studio/publication.test.ts
```

- [ ] **6.5 Commit**

```bash
git add src/pages/api/admin src/studio/http.ts tests/studio/http.test.ts
git commit -m "feat(studio): expose draft and publication APIs"
```

---

## Task 7 — Switch public MenezesDev Home/cases to published snapshot only

**Files:**
- Create: `src/studio/public-content.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/projetos/m47.astro`
- Modify: `src/pages/projetos/tavola-27.astro`
- Modify: `src/pages/projetos/prismae.astro`
- Modify: `src/components/ProjectCasePage.astro` only as needed for Studio project type compatibility
- Modify: `src/layouts/BaseLayout.astro` for document-driven metadata only where appropriate
- Create: `tests/studio/public-content.test.ts`
- Create: `scripts/check-public-equivalence.mjs`

- [ ] **7.1 Write failing public-content tests**

Assert `getPublishedSiteDocument()` never returns draft and never silently manufactures content when D1 is unavailable/malformed. A safe operational failure is preferable to publishing guessed content.

- [ ] **7.2 Add a pure mapping layer**

Map `SiteDocument` into props/view models expected by the current Home and case components. Keep editorial data retrieval separate from markup.

- [ ] **7.3 Capture baseline public HTML before switching**

Using the previous Phase 10 commit `152fab910296f29cfae2e07bf6ccc2c69f0ce0df`, record normalized structural/text fixtures for `/` and the three `/projetos/*` pages. Ignore only expected generator/runtime serialization noise; do not ignore text, headings, links, image sources, alt text, or semantic structure.

- [ ] **7.4 Switch routes to async published-document reads**

Home and cases consume only the D1 published document. Demos remain independent/prerendered.

- [ ] **7.5 Run equivalence check**

```bash
corepack pnpm studio:check-seed
node scripts/check-public-equivalence.mjs
```

Expected: zero meaningful differences immediately after migration.

- [ ] **7.6 Run full tests/checks**

```bash
corepack pnpm test
corepack pnpm check
corepack pnpm build
corepack pnpm check:acceptance
```

- [ ] **7.7 Commit**

```bash
git add src/studio/public-content.ts src/pages/index.astro src/pages/projetos src/components/ProjectCasePage.astro src/layouts/BaseLayout.astro tests/studio/public-content.test.ts scripts/check-public-equivalence.mjs
git commit -m "feat(studio): serve public content from published snapshots"
```

---

## Content/publication plan completion gate

Complete only when:

- D1 version 1 reproduces the approved Phase 10 public content;
- draft save is optimistic and conflict-safe;
- public routes read published only;
- publish is atomic;
- version history is immutable;
- restore creates a draft then a new version on publish;
- no demo safety invariant changed;
- no fake commercial input was introduced;
- the original public output remains equivalent immediately after seed/migration.
