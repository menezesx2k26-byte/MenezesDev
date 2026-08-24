# MenezesDev Studio — Media, Security & Regression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish MenezesDev Studio with an R2-backed safe media library, production-fail-closed admin protection, request integrity defenses, operational health, and full automated/browser regression proving the Studio does not weaken the public site.

**Architecture:** R2 stores raster bytes under opaque keys; D1 stores media metadata. Media writes and admin mutations pass centralized authorization/origin/content guards. Cloudflare Access remains the production perimeter for `/admin/*` and `/api/admin/*`; the app itself refuses privileged execution without a valid production Access context. Regression extends, rather than replaces, the 97 Phase 10 hard-gate intent.

**Tech Stack:** Cloudflare Access, Workers, D1, R2, Astro, TypeScript, Vitest 4.1.11, Playwright Test 1.62.1 for committed end-to-end regression, existing accessibility/route checks.

**Spec:** `docs/superpowers/specs/2026-08-23-menezesdev-studio-design.md`

## Global constraints

- No SVG uploads through ordinary Studio media in release 1.
- Allowed raster upload types: WebP, JPEG, PNG only.
- Maximum ordinary Studio upload size: 12 MiB per file. Larger future assets require an explicit design decision/direct-upload architecture, not silently raised limits.
- MIME declaration alone is never trusted; validate file signature/magic bytes.
- Referenced media is never physically deleted by normal Studio actions.
- Admin and preview responses are no-store/noindex.
- Production auth bypass is impossible by configuration.
- Access route/policy setup is an external deployment gate; implementation must not invent account/team/domain identifiers.

---

## Task 1 — Centralize admin authorization context and local-only bypass

**Files:**
- Create: `src/studio/auth.ts`
- Create: `src/middleware.ts`
- Create: `tests/security/auth.test.ts`
- Modify: `src/env.d.ts`

- [ ] **1.1 Write auth tests first**

Cover:
- development + explicit local bypass flag → local actor allowed;
- development without bypass → denied unless a test/admin identity context is injected;
- preview/production ignores/rejects local bypass flag;
- production without Cloudflare Access identity context → denied;
- admin and API paths are protected;
- public routes and demos are not accidentally put behind admin auth;
- actor value is normalized/bounded before audit use;
- auth errors reveal no configured emails/policy internals.

- [ ] **1.2 Implement `AdminContext`**

Example:

```ts
export interface AdminContext {
  actor: string;
  source: "cloudflare-access" | "local-development";
}
```

Cloudflare Access is the network perimeter. Within application code, production requests require expected Access context/header presence before privileged APIs execute. Do not treat a user-supplied query/cookie/localStorage value as identity.

- [ ] **1.3 Implement middleware path policy**

Protect:
- `/admin` and descendants;
- `/api/admin` and descendants.

Do not protect `/`, `/projetos/*`, `/demo/**`, public assets or managed public media reads.

- [ ] **1.4 Run focused tests**

```bash
corepack pnpm test -- tests/security/auth.test.ts
```

- [ ] **1.5 Commit**

```bash
git add src/studio/auth.ts src/middleware.ts tests/security/auth.test.ts src/env.d.ts
git commit -m "feat(studio): enforce admin authorization boundary"
```

---

## Task 2 — Add centralized mutation request integrity guards

**Files:**
- Create: `src/studio/security/request-guard.ts`
- Create: `tests/security/request-guard.test.ts`
- Modify: admin mutation route files to use guard

- [ ] **2.1 Write security tests first**

Cover:
- mutation with foreign `Origin` rejected;
- missing/invalid origin rejected in browser-style production mutation;
- exact same-origin accepted;
- wrong HTTP method gets 405 + Allow;
- wrong content type rejected for JSON endpoints;
- body over configured limit rejected before JSON parse;
- GET/read routes do not require CSRF token but remain authenticated;
- mutation CSRF token mechanism is tied to authenticated same-origin session/page context and cannot be supplied through URL query parameters.

- [ ] **2.2 Implement same-origin + CSRF strategy**

Use same-origin enforcement plus a per-admin-page CSRF token delivered in protected HTML and echoed in a custom header for state-changing requests. Token must be server-derived/validated and never placed in URLs or logs. If Cloudflare Access architecture makes a different current best-practice mechanism demonstrably safer, document the substitution and retain equivalent tests.

- [ ] **2.3 Apply guard to all state-changing APIs**

Draft save, publish, restore, media upload/patch/archive all pass through one shared guard.

- [ ] **2.4 Run tests/commit**

```bash
corepack pnpm test -- tests/security/request-guard.test.ts
git add src/studio/security tests/security/request-guard.test.ts src/pages/api/admin
git commit -m "feat(studio): protect admin mutations"
```

---

## Task 3 — Implement media signature validation and metadata model

**Files:**
- Create: `src/studio/media/types.ts`
- Create: `src/studio/media/validate.ts`
- Create: `src/studio/media/repository.ts`
- Create: `tests/media/validate.test.ts`
- Create: `tests/media/repository.test.ts`

- [ ] **3.1 Write byte-signature tests**

Fixtures may be tiny byte arrays generated in test code. Cover:
- WebP RIFF/WEBP accepted only with matching content type;
- JPEG SOI signature accepted;
- PNG 8-byte signature accepted;
- SVG/XML rejected even when labeled `image/png`;
- executable/random content rejected;
- 12 MiB limit enforced from actual byte length/content length;
- unsupported GIF/AVIF rejected in release 1 rather than silently accepted;
- original filenames are never used as R2 keys.

- [ ] **3.2 Implement validation**

Return normalized metadata object or structured rejection issue. Sanitize original filename for display metadata only; never concatenate it into storage paths or response headers.

- [ ] **3.3 Implement media repository**

D1 methods:
- create metadata;
- list/search/filter;
- update alt text/status;
- find by id;
- compute/return usage references through document scanning/service layer;
- archive.

Use prepared statements only.

- [ ] **3.4 Run tests/commit**

```bash
corepack pnpm test -- tests/media/validate.test.ts tests/media/repository.test.ts
git add src/studio/media tests/media
git commit -m "feat(studio): validate and index media assets"
```

---

## Task 4 — Implement R2 upload and controlled public delivery

**Files:**
- Create: `src/studio/media/storage.ts`
- Create: `src/pages/api/admin/media/index.ts`
- Create: `src/pages/api/admin/media/[id].ts`
- Create: `src/pages/api/admin/media/[id]/archive.ts`
- Create: `src/pages/media/[id]/[version].ts`
- Create: `tests/media/storage.test.ts`
- Create: `tests/media/http.test.ts`

- [ ] **4.1 Write storage/API tests first**

Cover:
- valid upload produces opaque key, R2 object and D1 metadata;
- failed R2 write produces no active metadata row;
- failed metadata write cleans up newly written unreferenced R2 object where safe;
- alt text patch is bounded;
- referenced active/published media cannot be destructively deleted;
- archive retains bytes;
- public media route returns exact validated content type and no user-controlled attachment filename;
- unknown/unused unpublished media is not exposed publicly;
- versioned published URL uses immutable cache policy.

- [ ] **4.2 Implement opaque keys**

Use cryptographically random UUID/key material, e.g. `media/<uuid>`, independent of original filename. Persist stable media ID and a content/version token for cache-safe public URLs.

- [ ] **4.3 Implement upload endpoint**

Authenticated + same-origin + CSRF protected. Parse multipart in a bounded way suitable for 12 MiB. Reject before storage if signature/type/size invalid.

- [ ] **4.4 Implement public media route**

Only serve media proven referenced by the current published snapshot or a policy-defined historical route when needed. Headers:
- validated `Content-Type`;
- `X-Content-Type-Options: nosniff`;
- immutable cache headers for versioned published URLs;
- no CORS wildcard unless a concrete use case requires it.

- [ ] **4.5 Run tests/commit**

```bash
corepack pnpm test -- tests/media/storage.test.ts tests/media/http.test.ts
git add src/studio/media/storage.ts src/pages/api/admin/media src/pages/media tests/media
git commit -m "feat(studio): add R2 media upload and delivery"
```

---

## Task 5 — Build the Media Library UI and usage protection

**Files:**
- Create: `src/pages/admin/midia.astro`
- Create: `src/components/admin/media/MediaLibrary.astro`
- Create: `src/components/admin/media/MediaUploader.astro`
- Create: `src/components/admin/media/MediaPicker.astro`
- Create: `src/components/admin/media/MediaUsageDialog.astro`
- Create: `src/studio/client/media-controller.ts`
- Create: `tests/admin/media-library.test.ts`

- [ ] **5.1 Write UI contract tests**

Require upload format/size guidance, alt-text editing, search/filter, status badge, usage-reference display, archive action and absence of destructive delete for referenced assets.

- [ ] **5.2 Implement library**

Use real metadata only. Thumbnail requests use controlled media URLs. Empty/error/loading states are explicit.

- [ ] **5.3 Implement reusable picker**

Home/project editors select managed media by stable ID; picker returns a `MediaReference`, not raw unvalidated URL text.

- [ ] **5.4 Implement archive confirmation**

If referenced, explain where used and block unsafe action. If unreferenced, archive metadata while preserving bytes according to retention policy.

- [ ] **5.5 Run/commit**

```bash
corepack pnpm test -- tests/admin/media-library.test.ts
git add src/pages/admin/midia.astro src/components/admin/media src/studio/client/media-controller.ts tests/admin/media-library.test.ts
git commit -m "feat(studio): add protected media library UI"
```

---

## Task 6 — Add system health screen without secret leakage

**Files:**
- Create: `src/pages/admin/sistema.astro`
- Create: `src/pages/api/admin/health.ts`
- Create: `src/studio/health.ts`
- Create: `tests/security/health.test.ts`

- [ ] **6.1 Write health tests**

Response may contain only:
- app commit/version when available;
- environment label;
- D1 healthy/degraded;
- R2 healthy/degraded;
- published version;
- draft revision;
- last publish timestamp;
- canonical configured boolean;
- WhatsApp configured boolean;
- analytics configured boolean.

Assert it never includes secret values, database IDs, bucket keys, Access JWTs, email allowlists, stack traces or raw errors.

- [ ] **6.2 Implement inexpensive probes**

Reuse bounded runtime health code; authenticate endpoint and set no-store.

- [ ] **6.3 Add System entry under advanced settings**

Keep this outside the primary navigation to preserve simple everyday operation.

- [ ] **6.4 Run/commit**

```bash
corepack pnpm test -- tests/security/health.test.ts
git add src/pages/admin/sistema.astro src/pages/api/admin/health.ts src/studio/health.ts tests/security/health.test.ts
git commit -m "feat(studio): add safe operational health view"
```

---

## Task 7 — Extend CSP/security headers deliberately for Studio

**Files:**
- Modify: `astro.config.mjs`
- Modify/Create: public Worker headers/middleware as required by server output
- Create: `tests/security/headers.test.ts`

- [ ] **7.1 Write header-policy tests**

Require:
- `default-src 'self'`;
- `object-src 'none'`;
- `base-uri 'self'`;
- `frame-ancestors` policy chosen deliberately;
- admin/API no-store;
- media nosniff;
- preview noindex/no-store;
- no broad `unsafe-eval` introduced;
- any `frame-src`/`frame-ancestors` change needed for same-origin preview is scoped and documented.

- [ ] **7.2 Adjust CSP minimally**

Preview iframe is same-origin. Keep policy as strict as possible and avoid weakening public CSP just to make admin code easier.

- [ ] **7.3 Run/commit**

```bash
corepack pnpm test -- tests/security/headers.test.ts
corepack pnpm check
git add astro.config.mjs src tests/security/headers.test.ts
git commit -m "security(studio): harden runtime response policy"
```

---

## Task 8 — Add committed Playwright end-to-end regression

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `playwright.config.ts`
- Create: `tests/e2e/studio.spec.ts`
- Create: `tests/e2e/public-regression.spec.ts`
- Create: `tests/e2e/demo-safety.spec.ts`

- [ ] **8.1 Add pinned Playwright Test**

```bash
corepack pnpm add -D @playwright/test@1.62.1
corepack pnpm exec playwright install chromium
```

Commit package/lock/config, not downloaded browser binaries.

- [ ] **8.2 Configure local test server**

Use a deterministic local Wrangler/Astro server with local auth bypass explicitly enabled only in the test process environment. Migrate and seed a fresh local D1 before suite start.

- [ ] **8.3 Implement Studio happy-path E2E**

At minimum:
1. open dashboard;
2. edit Home text;
3. observe autosave success;
4. preview draft and verify edited text visible;
5. verify public `/` still shows old published text;
6. publish;
7. verify public `/` shows new text;
8. publish second change;
9. restore version 1 to draft;
10. verify live unchanged until publishing restore;
11. publish restore and verify version history remains intact.

Use a disposable test field/value and fresh local DB, never real production content mutation.

- [ ] **8.4 Implement conflict E2E**

Open two contexts/tabs, edit from both, save first, confirm second receives conflict and cannot silently overwrite.

- [ ] **8.5 Implement media E2E**

Upload tiny generated-valid PNG/WebP fixture, set alt, select it, preview it, publish, verify public managed media route, then verify referenced archive/destruction protection.

- [ ] **8.6 Implement public/demo regression**

For all 16 canonical routes:
- expected status;
- metadata policy;
- no page-level horizontal overflow at mobile widths;
- no obvious console/page errors.

For demos additionally:
- noindex exact policy;
- demo actions remain local-only;
- `/demo/prismae/about` remains absent;
- Prismae form sends no network request to a business/backend endpoint.

- [ ] **8.7 Add scripts**

```json
"test:e2e": "playwright test",
"test:e2e:studio": "playwright test tests/e2e/studio.spec.ts"
```

- [ ] **8.8 Run/commit**

```bash
corepack pnpm test:e2e
git add package.json pnpm-lock.yaml playwright.config.ts tests/e2e
git commit -m "test(studio): add end-to-end admin regression"
```

---

## Task 9 — Extend acceptance/release gates rather than weakening Phase 10

**Files:**
- Modify: `scripts/check-acceptance.mjs`
- Modify: `scripts/check-release.mjs`
- Modify: `scripts/check-routes.mjs`
- Create: `scripts/check-studio.mjs`
- Create: `docs/STUDIO_IMPLEMENTATION_REPORT.md`

- [ ] **9.1 Define Studio hard gates before implementation is called done**

Include machine-checkable gates for:
- protected admin/API path contracts;
- local bypass production impossibility;
- D1 migration/schema;
- baseline seed equivalence;
- draft/public isolation;
- optimistic conflict;
- atomic publication;
- immutable restore history;
- preview noindex/no-store;
- R2 type/signature/size policy;
- referenced media protection;
- SVG upload rejection;
- admin accessibility/E2E results;
- demo safety preservation;
- no secrets staged.

- [ ] **9.2 Preserve old gate IDs/evidence where still applicable**

If a Phase 10 gate's implementation mechanism changed from static HTML artifact to runtime HTTP response, record it as superseded-by-equivalent-runtime-evidence, not silently delete it.

- [ ] **9.3 Keep release gates external and fail closed**

Production remains blocked until real values/config are approved:
- WhatsApp destination;
- canonical domain/TLS;
- actual Workers/Access/D1/R2 production binding setup;
- analytics/consent decision;
- production Access policy verification.

- [ ] **9.4 Run full verification**

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm format:check
corepack pnpm test
corepack pnpm check
corepack pnpm build
corepack pnpm check:acceptance
corepack pnpm test:e2e
corepack pnpm check:release
```

`check:release` is expected to remain blocked until external production inputs are supplied; that is not an implementation failure.

- [ ] **9.5 Produce implementation report**

`docs/STUDIO_IMPLEMENTATION_REPORT.md` records each new hard/release gate, commands, results, known external blockers, and confirms no production deploy/merge occurred.

- [ ] **9.6 Commit**

```bash
git add scripts docs/STUDIO_IMPLEMENTATION_REPORT.md
git commit -m "test(studio): complete Studio acceptance audit"
```

---

## Task 10 — Update durable project memory and prepare review branch

**Files:**
- Modify: `docs/context/STATE.md`
- Modify: `docs/context/DECISIONS.md`
- Modify: `docs/context/HANDOFF.md`
- Modify: `README.md`
- Modify: design spec status header

- [ ] **10.1 Record new durable decisions**

Add decisions that explicitly supersede only the old no-runtime/no-backend/no-persistence constraints and retain all security/demo/accessibility/release discipline.

- [ ] **10.2 Update current state**

Record actual implemented/tested state only. Do not mark production ready if Access/resources/domain/WhatsApp remain unresolved.

- [ ] **10.3 Replace handoff**

Include branch HEAD, completed work, verification commands/results, external blockers, next review step and explicit no-merge/no-deploy status.

- [ ] **10.4 Update README architecture**

Explain that the Studio branch uses Workers/D1/R2 while the Phase 10 baseline history remains documented. Avoid pretending production migration has happened before it actually does.

- [ ] **10.5 Final secrets/diff audit**

Search staged/tracked changes for token/private-key patterns, accidental `.env`, Cloudflare production IDs and personal credentials.

- [ ] **10.6 Commit final documentation**

```bash
git add README.md docs/context docs/superpowers/specs/2026-08-23-menezesdev-studio-design.md
git commit -m "docs(studio): record completed Studio architecture"
```

No merge or deployment follows automatically.

---

## Final Studio completion gate

The Studio implementation is eligible for review only when:

- all four implementation plans pass;
- unit/integration/E2E tests pass;
- public Home/cases render only published snapshots;
- draft/public isolation and concurrency are proven;
- admin/preview/API access is fail-closed outside explicit local development;
- R2 uploads enforce signature/type/size and referenced media protection;
- all 16 public canonical routes and demo safety invariants remain intact;
- accessibility/mobile behavior remains acceptable;
- no secret/fake commercial data is committed;
- `main` is untouched and no production deployment occurred.
