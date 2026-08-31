# MenezesDev Tools Phase 10–12 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the implemented commercial Astro site with the approved MenezesDev Tools governance, build the typed/security-enforced Tool SDK foundation, and prove it with four materially different local-browser tools without touching production `main`.

**Architecture:** Start `feat/tools-platform` from the freshly revalidated commercial implementation branch, merge the canonical Tools documentation history, then build a provider-neutral static Tools layer beside—not inside—the commercial experience. The SDK uses serializable tool definitions, explicit locale routes, allowlisted boundaries/engines, profile-driven security, local execution, lazy Workers where needed, and generated route/SEO/search metadata. The proof set covers scalar math, structured text, native image processing, and a killable regex Worker.

**Tech Stack:** Astro 7.2.4 static, TypeScript 6.0.3 strictest, Tailwind CSS 4.3.3, Node >=24.19.0 <25, pnpm 11.22.0, native browser APIs, Web Workers, Node built-in `node:test`; no React/Vue/Svelte, no new runtime/backend service, no new third-party parser/codec in this plan.

**Spec:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`, `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`, `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`, and `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-design.md`.

## Global Constraints

- Git and the approved repository history are the source of truth; `main` receives no partial Tools implementation.
- Re-read `AGENTS.md`, Tools state/decisions/handoff, the immutable workflow in full, all binding addenda, security policy, and relevant specs before every implementation task.
- Phase-10 base is **not permanently pinned**: immediately before branch creation, revalidate the current head of `origin/feat/phase-10-implementation`. Planning observation on 2026-08-29: `a98be87db3863505397ba9f2e80d9b656228d750`.
- Preserve existing commercial/demo behavior and automated acceptance gates.
- Required baseline versions: Astro `7.2.4`, TypeScript `6.0.3`, Tailwind `4.3.3`, pnpm `11.22.0`, Node `>=24.19.0 <25` unless a separately approved dependency/version decision changes them.
- No client UI framework is added.
- Ordinary frozen Launch-50 operations remain `serverRequired=false`, `costClass=C0`, with zero MenezesDev backend-processing requests per operation.
- Every user-input path follows `validate -> bound -> sanitize/canonicalize -> process -> encode safe output`.
- Security-profile overrides may tighten limits only.
- `src/tools/engines/**`, `src/tools/boundaries/**`, and `src/tools/workers/**` have zero ambient network authority.
- No user file/text/result/private metadata is copied into telemetry.
- No conditional dependency is admitted by this plan. Do not install PDF, Prettier standalone, image-compression, DOMPurify, Markdown, CSV, EXIF or WASM packages here.
- Launch remains service-worker-free.
- AdSense/native-ad provider code is out of scope; implement only provider-neutral/no-op Ads seams and policy data.
- Cloudflare production WAF/rate/Turnstile rules are out of scope.
- Phase 13 owns final visual design. Proof UI is semantic, accessible and intentionally minimal.
- Phase 17 owns final PT-BR editorial/localization QA. This plan creates only the minimum PT-BR proof required to validate locale routing/hreflang.
- The final Phase-5 sitemap grouping is not declared complete by this foundation plan; Phase 15/19 must finish and verify the full canonical sitemap contract for all launch surfaces. Existing commercial sitemap behavior must not regress in this plan.
- TDD is mandatory for behavior changes: write a focused failing test, run it and confirm the expected failure, implement the minimum behavior, rerun to green, then refactor while green.
- Every implementation task ends with a focused commit and fresh verification.

---

## File Structure Locked by This Plan

### Existing files modified

- `.gitignore` — only if the worktree skill's manual fallback requires tracked `.worktrees/` ignore.
- `README.md` — merge factual commercial status with the Tools platform thesis.
- `package.json` — add dependency-free Tools test/check scripts; preserve versions.
- `astro.config.mjs` — approved `build.format: "preserve"` + `trailingSlash: "ignore"` only after route-output validation is ready.
- `src/config/site.ts` — preserve commercial config; expose canonical-origin helpers to neutral metadata.
- `src/layouts/BaseLayout.astro` — consume explicit neutral metadata rather than derive canonical identity from build path.
- `src/data/routes.ts` — remain commercial/demo route source and gain explicit target output-artifact metadata.
- `src/types/index.ts` — retain commercial types; add neutral document/release fields only where cross-surface.
- `src/pages/index.astro`
- `src/pages/404.astro`
- `src/components/ProjectCasePage.astro`
- `src/pages/demo/m47.astro`
- `src/pages/demo/tavola27/index.astro`
- `src/pages/demo/tavola27/menu.astro`
- `src/pages/demo/tavola27/storia.astro`
- `src/pages/demo/tavola27/gallery.astro`
- `src/pages/demo/tavola27/contact.astro`
- `src/pages/demo/prismae/index.astro`
- `src/pages/demo/prismae/solutions/index.astro`
- `src/pages/demo/prismae/solutions/strategy.astro`
- `src/pages/demo/prismae/solutions/processes.astro`
- `src/pages/demo/prismae/solutions/indicators.astro`
- `src/pages/demo/prismae/contact.astro`
- `public/_headers` — preserve existing headers; add a narrower rule only when build output provides a stable safe target.
- `scripts/check-routes.mjs` — consume explicit release output artifacts while preserving legacy route assertions.
- `scripts/check-acceptance.mjs` — preserve all existing checks and add Tools invariants.

### New foundation files

- `scripts/run-tools-tests.mjs`
- `scripts/check-tools.mjs`
- `scripts/check-tools-security.mjs`
- `src/components/seo/DocumentHead.astro`
- `src/layouts/ToolLayout.astro`
- `src/tools/core/types.ts`
- `src/tools/errors/codes.ts`
- `src/tools/security/profiles.ts`
- `src/tools/security/resolve-policy.ts`
- `src/tools/registry/validate-definition.ts`
- `src/tools/registry/catalog.ts`
- `src/tools/registry/index.ts`
- `src/tools/build/site-release-manifest.ts`
- `src/tools/seo/resolve-tool-seo.ts`
- `src/tools/search/build-index.ts`
- `src/tools/runtime/controller.ts`
- `src/tools/runtime/boundary-loaders.client.ts`
- `src/tools/runtime/engine-loaders.client.ts`
- `src/tools/runtime/worker-watchdog.ts`
- `src/tools/analytics/noop.ts`
- `src/tools/ads/policy.ts`
- `src/tools/ui/GenericToolForm.astro`
- `src/tools/ui/ToolStatus.astro`
- `src/tools/ui/generic-tool.client.ts`
- `src/pages/tools/index.astro`
- `src/pages/tools/[category]/index.astro`
- `src/pages/tools/[category]/[slug]/index.astro`
- `src/pages/pt-br/ferramentas/index.astro`
- `src/pages/pt-br/ferramentas/[category]/index.astro`
- `src/pages/pt-br/ferramentas/[category]/[slug]/index.astro`

### Proof-set files

- `src/tools/registry/definitions/percentage-calculator.ts`
- `src/tools/content/en/percentage-calculator.ts`
- `src/tools/content/pt-BR/percentage-calculator.ts`
- `src/tools/boundaries/percentage.ts`
- `src/tools/engines/percentage.ts`
- `src/tools/registry/definitions/json-formatter.ts`
- `src/tools/content/en/json-formatter.ts`
- `src/tools/boundaries/json.ts`
- `src/tools/engines/json-formatter.ts`
- `src/tools/registry/definitions/image-resizer.ts`
- `src/tools/content/en/image-resizer.ts`
- `src/tools/boundaries/image-raster.ts`
- `src/tools/engines/image-resizer.client.ts`
- `src/tools/ui/renderers/ImageResizer.astro`
- `src/tools/registry/definitions/regex-tester.ts`
- `src/tools/content/en/regex-tester.ts`
- `src/tools/boundaries/regex.ts`
- `src/tools/engines/regex.ts`
- `src/tools/workers/regex.worker.ts`
- `src/tools/ui/renderers/RegexTester.astro`

### Tests

- `tests/tools/core/catalog.test.ts`
- `tests/tools/core/security-policy.test.ts`
- `tests/tools/core/seo.test.ts`
- `tests/tools/core/release-manifest.test.ts`
- `tests/tools/runtime/controller.test.ts`
- `tests/tools/runtime/worker-watchdog.test.ts`
- `tests/tools/engines/percentage.test.ts`
- `tests/tools/engines/json-formatter.test.ts`
- `tests/tools/security/json-boundary.test.ts`
- `tests/tools/security/image-raster.test.ts`
- `tests/tools/engines/regex.test.ts`
- `tests/tools/security/regex-boundary.test.ts`
- `tests/tools/search/search-index.test.ts`

---

### Task 1: Phase 10 integration branch and isolated workspace

**Files:**
- Potentially modify: `.gitignore`
- Resolve after merge: `README.md`
- Preserve/import: canonical `AGENTS.md`, `docs/tools/**`, `docs/context/TOOLS_*`, `docs/superpowers/specs/**`, `docs/superpowers/plans/**`

**Interfaces:**
- Consumes: latest verified `origin/feat/phase-10-implementation`; canonical `origin/feat/tools-oss-catalog`.
- Produces: isolated `feat/tools-platform` containing the implemented commercial app plus approved Tools history.

- [ ] **Step 1: Re-read governance and revalidate refs**

```bash
git fetch origin --prune
git rev-parse origin/feat/phase-10-implementation
git rev-parse origin/feat/tools-oss-catalog
git status --short
git branch --show-current
```

Expected: both refs resolve. Do not continue from an unexplained dirty checkout.

- [ ] **Step 2: Verify the commercial base independently before merge**

In an isolated checkout of the fresh commercial ref:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm validate
```

Expected: baseline passes before Tools changes. A baseline failure is reported/investigated separately.

- [ ] **Step 3: Create `feat/tools-platform` via `superpowers:using-git-worktrees`**

Use the skill's existing-isolation detection, native worktree mechanism when available, and manual fallback only after its ignore-safety check.

Manual fallback equivalent after the skill's safety step:

```bash
git worktree add .worktrees/tools-platform -b feat/tools-platform origin/feat/phase-10-implementation
cd .worktrees/tools-platform
```

Expected: isolated workspace on `feat/tools-platform`; `main` is unchanged.

- [ ] **Step 4: Merge canonical Tools history**

```bash
git merge --no-ff origin/feat/tools-oss-catalog -m "merge: integrate approved tools design history"
git diff --name-only --diff-filter=U
```

Current planning evidence predicts `README.md` as the prominent overlap, but execution-time Git output is authoritative.

- [ ] **Step 5: Resolve README only when Git reports a conflict**

Resolution contract:

```text
KEEP Tools platform/growth thesis, Launch 50, browser-first economics
+
KEEP current commercial implementation status, build stack, preview caveats
-
REMOVE duplicated/stale statements and unsupported production-readiness claims
```

If merge stopped for conflicts:

```bash
git add README.md
git diff --name-only --diff-filter=U
git commit
```

Expected after `git add`: no unresolved paths. If merge completed cleanly, do not manufacture a second merge-resolution commit.

- [ ] **Step 6: Verify merged baseline**

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm validate
git status --short
```

Expected: commercial checks still pass and worktree is clean after the merge commit/resolution.

---

### Task 2: Dependency-free Tools test runner and explicit target release artifacts

**Files:**
- Create: `scripts/run-tools-tests.mjs`
- Create: `src/tools/build/site-release-manifest.ts`
- Test: `tests/tools/core/release-manifest.test.ts`
- Modify: `package.json`
- Modify: `src/types/index.ts`
- Modify: `src/data/routes.ts`

**Interfaces:**
- Produces: cross-platform `pnpm test:tools`, explicit `outputFile` for every existing commercial/demo route in the approved future `preserve` build, and `SiteReleaseRoute`.
- Does **not** switch Astro output yet; `check-routes.mjs` continues using the current `file` build until Task 4 atomically changes config + validator.

- [ ] **Step 1: Write target-output test first**

Create `tests/tools/core/release-manifest.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { siteReleaseManifest } from "../../../src/tools/build/site-release-manifest.ts";

test("models all 16 legacy routes with preserve-mode output artifacts", () => {
  const legacy = siteReleaseManifest.filter((route) =>
    route.surface === "commercial" || route.surface === "demo"
  );
  assert.equal(legacy.length, 16);
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/projetos/m47")?.outputFile,
    "projetos/m47.html",
  );
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/demo/tavola27")?.outputFile,
    "demo/tavola27/index.html",
  );
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/demo/prismae/solutions")?.outputFile,
    "demo/prismae/solutions/index.html",
  );
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/demo/tavola27/menu")?.outputFile,
    "demo/tavola27/menu.html",
  );
});
```

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/core/release-manifest.test.ts
```

Expected: FAIL because `site-release-manifest.ts` and route output metadata do not exist.

- [ ] **Step 3: Extend commercial route type with explicit `outputFile`**

Add to `RouteDefinition`:

```ts
readonly outputFile: string;
```

Update all 16 entries in `src/data/routes.ts` with the **target `build.format: preserve` artifact**:

```text
/                                      -> index.html
/projetos/m47                         -> projetos/m47.html
/projetos/tavola-27                   -> projetos/tavola-27.html
/projetos/prismae                     -> projetos/prismae.html
/demo/m47                             -> demo/m47.html
/demo/tavola27                        -> demo/tavola27/index.html
/demo/tavola27/menu                   -> demo/tavola27/menu.html
/demo/tavola27/storia                 -> demo/tavola27/storia.html
/demo/tavola27/gallery                -> demo/tavola27/gallery.html
/demo/tavola27/contact                -> demo/tavola27/contact.html
/demo/prismae                         -> demo/prismae/index.html
/demo/prismae/solutions               -> demo/prismae/solutions/index.html
/demo/prismae/solutions/strategy      -> demo/prismae/solutions/strategy.html
/demo/prismae/solutions/processes     -> demo/prismae/solutions/processes.html
/demo/prismae/solutions/indicators    -> demo/prismae/solutions/indicators.html
/demo/prismae/contact                 -> demo/prismae/contact.html
```

This metadata is not consumed by the existing validator until Task 4, so the current `file` build remains green between commits.

- [ ] **Step 4: Implement target release manifest**

Create `src/tools/build/site-release-manifest.ts`:

```ts
import { routes } from "../../data/routes.ts";

export type SurfaceClass = "commercial" | "demo" | "tools" | "tools-root" | "tools-category";
export type ReleaseLocale = "en" | "pt-BR";

export interface SiteReleaseRoute {
  readonly id: string;
  readonly canonicalPath: string;
  readonly outputFile: string;
  readonly surface: SurfaceClass;
  readonly locale: ReleaseLocale;
  readonly indexPolicy: "index" | "noindex";
}

const legacyRoutes: readonly SiteReleaseRoute[] = routes.map((route) => ({
  id: `legacy:${route.path}`,
  canonicalPath: route.path,
  outputFile: route.outputFile,
  surface: route.project === "m47" || route.project === "tavola27" || route.project === "prismae"
    ? "demo"
    : "commercial",
  locale: "pt-BR",
  indexPolicy: route.indexable ? "index" : "noindex",
}));

export const siteReleaseManifest: readonly SiteReleaseRoute[] = legacyRoutes;
```

- [ ] **Step 5: Verify GREEN**

```bash
node --test tests/tools/core/release-manifest.test.ts
```

Expected: PASS.

- [ ] **Step 6: Add cross-platform test launcher**

Create `scripts/run-tools-tests.mjs` that recursively enumerates `tests/tools/**/*.test.ts`, sorts paths, and invokes:

```js
spawnSync(process.execPath, ["--test", ...files], { cwd: root, stdio: "inherit" });
```

Fail when no tests exist or child exit status is non-zero.

Add package script:

```json
"test:tools": "node scripts/run-tools-tests.mjs"
```

No new test dependency is installed.

- [ ] **Step 7: Verify the commit remains green under current build mode**

```bash
corepack pnpm test:tools
corepack pnpm validate
```

Expected: test runner passes and the still-unchanged `build.format:file` commercial baseline remains green.

- [ ] **Step 8: Commit**

```bash
git add package.json scripts/run-tools-tests.mjs src/types/index.ts src/data/routes.ts src/tools/build/site-release-manifest.ts tests/tools/core/release-manifest.test.ts
git commit -m "test(tools): model release artifacts and add native test runner"
```

---

### Task 3: Tool SDK core contracts, security profiles and structural catalog validation

**Files:**
- Create: `src/tools/core/types.ts`
- Create: `src/tools/errors/codes.ts`
- Create: `src/tools/security/profiles.ts`
- Create: `src/tools/security/resolve-policy.ts`
- Create: `src/tools/registry/validate-definition.ts`
- Create: `src/tools/registry/catalog.ts`
- Create: `src/tools/registry/index.ts`
- Test: `tests/tools/core/catalog.test.ts`
- Test: `tests/tools/core/security-policy.test.ts`

**Interfaces:**
- Produces: serializable `ToolDefinition`, exact Phase-7 profile data, tightening-only policy resolution, structural catalog validation and stable safe error codes.
- Executable loader existence is deliberately enforced in Task 5 after loader maps exist; Task 3 validates ids as safe non-empty identifiers, not as already-loadable modules.

- [ ] **Step 1: Write failing contract tests**

Tests must prove duplicate ids/routes fail, invalid route shape fails, unsafe/malformed ids fail, profile mismatch fails, tightening succeeds and loosening fails.

Use a real serializable fixture; do not put functions/module paths into the definition.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/core/catalog.test.ts tests/tools/core/security-policy.test.ts
```

Expected: FAIL because core modules are absent.

- [ ] **Step 3: Implement core literal unions/interfaces**

`src/tools/core/types.ts` exports at minimum:

```ts
export type ToolLocale = "en" | "pt-BR";
export type ToolCategory = "calculators" | "image" | "text" | "developer" | "files" | "pdf";
export type SecurityProfileId =
  | "N-FIN" | "N-MATH" | "N-LIST" | "T-TEXT" | "T-DIFF"
  | "S-JSON" | "S-XML" | "S-CSV" | "M-MARKDOWN" | "F-HTML"
  | "R-REGEX" | "C-SECRET" | "H-HASH" | "I-RASTER" | "I-META"
  | "I-SVG" | "A-ZIP-CREATE" | "P-PDF" | "D-DATE";

export type ToolErrorCode =
  | "INVALID_INPUT" | "LIMIT_EXCEEDED" | "UNSUPPORTED_FORMAT"
  | "UNSUPPORTED_BROWSER" | "TIMEOUT" | "ABORTED" | "ENGINE_FAILURE"
  | "OUTPUT_TOO_LARGE" | "ENCRYPTED_UNSUPPORTED" | "ACTIVE_CONTENT_REJECTED";

export interface ToolRouteEntry {
  readonly locale: ToolLocale;
  readonly categorySlug: string;
  readonly toolSlug: string;
  readonly canonicalPath: string;
  readonly indexPolicy: "index" | "noindex";
}

export interface ToolExecutionProfile {
  readonly preferred: "browser";
  readonly fallback: "wasm" | "worker" | "none";
  readonly serverRequired: boolean;
  readonly isolation: "main-thread" | "worker" | "wasm-worker";
  readonly load: "eager-tiny" | "lazy";
}
```

`ToolDefinition` contains only serializable data: id/category/routes/ui/execution/boundary ids/engine id/output/security policy id+tightening overrides/SEO structural policy/relations/analytics flag/Ads class/privacy local-processing flag.

Also define focused `RawToolInput`, `ToolExecutionResult<T>`, `ToolBoundary<Input>`, `ToolEngine<Input, Output>`, `SecurityLimits`, and `SecurityLimitOverrides`.

- [ ] **Step 4: Implement safe error helper**

`src/tools/errors/codes.ts` exports the canonical literal list and:

```ts
export function toolError(code: ToolErrorCode, messageKey: string) {
  return { ok: false as const, error: { code, messageKey } };
}
```

No raw exception/details bag.

- [ ] **Step 5: Encode all 19 Phase-7 hard profiles**

Use `KiB = 1024`, `MiB = 1024 * 1024`. Exact profile caps:

| Profile | Hard caps |
|---|---|
| N-FIN | token 128 chars; 32 fields; 1,200 schedule/output rows |
| N-MATH | token 128 chars; 64 scalars; 1 MiB output |
| N-LIST | 2 MiB input; 100,000 numbers; 2 MiB output |
| T-TEXT | 2 MiB input; 4 MiB output |
| T-DIFF | 1 MiB/side; 3,000 ms; 5 MiB output |
| S-JSON | 2 MiB; depth 128; 200,000 nodes; 5 MiB output |
| S-XML | 2 MiB; depth 128; 200,000 nodes; 5 MiB output; DOCTYPE disabled |
| S-CSV | 10 MiB; 200,000 rows; 256 columns; 1 MiB field; 25 MiB output |
| M-MARKDOWN | 1 MiB; 3,000 ms; 4 MiB generated HTML |
| F-HTML | 1 MiB; 3,000 ms; 4 MiB output |
| R-REGEX | 10 KiB pattern; 1 MiB subject; 1,500 ms; 10,000 results |
| C-SECRET | 4,096 generated chars |
| H-HASH | 10 MiB text; 100 MiB file |
| I-RASTER | 25 MiB encoded; 12,000 px/axis; 80 MP; 50 MiB output |
| I-META | 25 MiB input; 5 MiB output |
| I-SVG | 5 MiB; 20 MP; 5,000 ms; 50 MiB output |
| A-ZIP-CREATE | 100 MiB total; 1,000 entries; 50 MiB/entry; 150 MiB output |
| P-PDF | 75 MiB aggregate; 500 pages; 100 MiB output; 15,000 ms |
| D-DATE | civil years 1..9999; 1,000 generated segments |

- [ ] **Step 6: Implement tightening-only policy resolution**

`resolveSecurityPolicy(tool)`:

1. resolves known profile;
2. verifies boundary/security profile ids match;
3. allows only numeric maxima <= profile maxima;
4. forbids adding format/protocol/network/active-content authority;
5. returns immutable resolved data.

Configuration errors identify tool/profile/field only.

- [ ] **Step 7: Implement structural catalog validation**

Reject:

- duplicate ids;
- duplicate canonical paths;
- route locale/category mismatch;
- non-trailing-slash Tools canonical routes;
- `serverRequired=true` in the proof catalog;
- unknown security profile;
- unsafe boundary/engine identifier syntax;
- profile mismatch;
- non-serializable values/functions.

Do **not** claim loader existence validation yet; Task 5 adds that invariant once executable allowlists exist.

- [ ] **Step 8: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm check
```

- [ ] **Step 9: Commit**

```bash
git add src/tools/core src/tools/errors src/tools/security src/tools/registry tests/tools/core/catalog.test.ts tests/tools/core/security-policy.test.ts
git commit -m "feat(tools): add typed sdk and security policy core"
```

---

### Task 4: Neutral document metadata, preserve-mode route validation and Tools SSG skeleton

**Files:**
- Create: `src/components/seo/DocumentHead.astro`
- Create: `src/layouts/ToolLayout.astro`
- Create: `src/tools/seo/resolve-tool-seo.ts`
- Test: `tests/tools/core/seo.test.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/config/site.ts`
- Modify: `astro.config.mjs`
- Modify: all exact BaseLayout call sites listed in the file map
- Create: six Tools root/category/tool templates
- Modify: `src/tools/build/site-release-manifest.ts`
- Modify: `scripts/check-routes.mjs`

**Interfaces:**
- Produces: explicit `DocumentMetadata`, request-host-independent canonical resolution, validated mixed flat/index preserve-mode artifacts, and catalog-driven static Tools routes.

- [ ] **Step 1: Write SEO resolver tests first**

Create a fixture with a real EN/PT-BR pair and assert self canonical + reciprocal alternates. Also assert an EN-only fixture does not fabricate PT-BR.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/core/seo.test.ts
```

- [ ] **Step 3: Add neutral cross-surface metadata type**

In `src/types/index.ts`:

```ts
export interface DocumentMetadata {
  readonly locale: "en" | "pt-BR";
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly indexPolicy: "index" | "noindex";
  readonly alternates: readonly { readonly locale: "en" | "pt-BR"; readonly path: string }[];
  readonly image?: string;
}
```

- [ ] **Step 4: Implement `resolveToolSeo` and `DocumentHead.astro`**

`resolveToolSeo` consumes definition + locale content + locale. It never reads request host/path.

`DocumentHead.astro` builds absolute URLs through configured canonical origin and emits title, description, robots, canonical, real locale alternates, OG/Twitter and approved structured-data descriptors only.

- [ ] **Step 5: Migrate BaseLayout to explicit metadata**

`BaseLayout.astro` receives `metadata: DocumentMetadata`. Do not derive canonical identity from `Astro.url.pathname`.

Update every current call site listed under Existing files modified. Explicit canonical paths are the current canonical route strings; demo/404 stays `noindex`.

For `ProjectCasePage.astro`, derive the explicit case path from the known project slug:

```ts
const canonicalPath = `/projetos/${project.slug}`;
```

- [ ] **Step 6: Atomically switch build format and route validator**

Change `astro.config.mjs`:

```js
output: "static",
trailingSlash: "ignore",
build: { format: "preserve" },
```

In the same task, refactor `scripts/check-routes.mjs` to read `siteReleaseManifest` output files rather than assume every non-root route is `<path>.html`.

Preserve separate assertions that the 16 legacy canonical routes exist and demos are non-indexed.

Run immediately:

```bash
corepack pnpm build
corepack pnpm check:acceptance
```

Expected: the known nested `index.astro` demos are now validated at their explicit `.../index.html` artifacts; canonical URL identity remains unchanged.

- [ ] **Step 7: Add `ToolLayout.astro`**

Requirements:

- correct locale/language;
- neutral head metadata;
- skip link and `<main id="main-content">`;
- slots for tool/result/explanation/related content;
- no commercial WhatsApp CTA;
- no Ads provider;
- no engine execution logic;
- minimal semantic styling only.

- [ ] **Step 8: Add catalog-driven root/category/tool page templates**

Create exactly:

```text
src/pages/tools/index.astro
src/pages/tools/[category]/index.astro
src/pages/tools/[category]/[slug]/index.astro
src/pages/pt-br/ferramentas/index.astro
src/pages/pt-br/ferramentas/[category]/index.astro
src/pages/pt-br/ferramentas/[category]/[slug]/index.astro
```

Dynamic routes use `getStaticPaths()` from validated catalog data only.

Category index policy is deterministic for this plan:

```ts
publishedToolsInCategory.length >= 3 ? "index" : "noindex"
```

No subjective override is introduced in Phase 11.

- [ ] **Step 9: Extend release manifest with generated Tools artifacts**

A canonical `/tools/calculators/example/` maps to `tools/calculators/example/index.html`; localized routes map equivalently.

Root/category entries are represented separately from individual tool entries.

- [ ] **Step 10: Keep sitemap work honest**

Do not claim the final Phase-5 multi-sitemap contract in this proof phase. Keep the existing commercial sitemap behavior functioning; add full Tools/locale/guide sitemap grouping in the later Launch implementation/preflight work where all indexability states exist. `robots.txt` continues advertising the canonical sitemap index produced by the current site build.

- [ ] **Step 11: Verify GREEN and regressions**

```bash
corepack pnpm test:tools
corepack pnpm check
corepack pnpm build
corepack pnpm check:acceptance
```

- [ ] **Step 12: Commit**

```bash
git add astro.config.mjs src/components/seo src/layouts src/config/site.ts src/types/index.ts src/pages src/components/ProjectCasePage.astro src/tools/seo src/tools/build/site-release-manifest.ts scripts/check-routes.mjs tests/tools/core/seo.test.ts
git commit -m "feat(tools): add neutral metadata and static tools routing"
```

---

### Task 5: Runtime controller, executable allowlists, no-op provider seams and static security checks

**Files:**
- Create runtime/analytics/ads files listed above
- Create: `scripts/check-tools.mjs`
- Create: `scripts/check-tools-security.mjs`
- Test: `tests/tools/runtime/controller.test.ts`
- Test: `tests/tools/runtime/worker-watchdog.test.ts`

**Interfaces:**
- Produces `executeTool`, literal boundary/engine loader maps, `runWorkerWithWatchdog`, `NOOP_ANALYTICS`, disabled `AD_POLICY`, and build-time executable-id validation.

- [ ] **Step 1: Write controller tests first**

Use injected local test loaders. Assert boundary runs before engine, boundary failure prevents engine execution, abort propagates, and unexpected exceptions normalize to `ENGINE_FAILURE` without raw exception text.

- [ ] **Step 2: Write watchdog tests first**

Use a minimal `WorkerLike` test double. Assert timeout/cancel calls `terminate()` exactly once and returns `TIMEOUT`/`ABORTED` after cleanup.

- [ ] **Step 3: Verify RED**

```bash
node --test tests/tools/runtime/controller.test.ts tests/tools/runtime/worker-watchdog.test.ts
```

- [ ] **Step 4: Implement controller**

```ts
export async function executeTool(
  toolId: string,
  rawInput: RawToolInput,
  options: { readonly signal?: AbortSignal } = {},
): Promise<ToolExecutionResult<unknown>>;
```

Sequence: validated definition -> allowlisted boundary -> boundary result -> allowlisted engine -> engine result -> safe exception normalization.

- [ ] **Step 5: Implement literal executable loader maps**

Maps use fixed keys and dynamic imports. User input never becomes a module string.

At this task's end `scripts/check-tools.mjs` must verify **every catalog definition has both a known boundary loader and engine loader**. This is the executable-id invariant intentionally deferred from Task 3.

- [ ] **Step 6: Implement parent-owned Worker watchdog**

Timeout/cancel order:

```text
terminate -> remove listeners -> clear timer -> typed result
```

No retry and no server fallback.

- [ ] **Step 7: Implement disabled provider seams**

```ts
export const NOOP_ANALYTICS = Object.freeze({ track() {} });
```

`AD_POLICY`:

```ts
export const AD_POLICY = Object.freeze({
  globalEnabled: false,
  categories: { calculators: false, image: false, text: false, developer: false, files: false, pdf: false },
  routes: {},
  providers: { adsense: false },
});
```

No provider script/bootstrap is activated here.

- [ ] **Step 8: Implement static security checks**

`check-tools-security.mjs` scans protected directories and fails on direct use of:

```text
fetch(
XMLHttpRequest
WebSocket
EventSource
sendBeacon
new Function
eval(
serviceWorker.register
remote importScripts
innerHTML
```

This plan creates no privileged rich-output sink, so any `innerHTML` in Tools fails.

- [ ] **Step 9: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm check:tools
corepack pnpm check
```

- [ ] **Step 10: Commit**

```bash
git add src/tools/runtime src/tools/analytics src/tools/ads scripts/check-tools.mjs scripts/check-tools-security.mjs tests/tools/runtime package.json
git commit -m "feat(tools): add local runtime and policy seams"
```

---

### Task 6: Proof tool 1 — Percentage Calculator, generic numeric path and EN/PT-BR pair

**Files:**
- Create Percentage definition/content/boundary/engine files
- Create: `src/tools/ui/GenericToolForm.astro`
- Create: `src/tools/ui/ToolStatus.astro`
- Create: `src/tools/ui/generic-tool.client.ts`
- Test: `tests/tools/engines/percentage.test.ts`
- Modify: catalog + loader maps

**Interfaces:**

```ts
export interface PercentageInput { readonly percentage: number; readonly value: number }
export interface PercentageOutput { readonly result: number }
```

- [ ] **Step 1: Write failing engine + boundary tests**

Assert `15% of 200 = 30`, negative base values behave deterministically, >128-char numeric token rejects, malformed/non-finite values reject.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/percentage.test.ts
```

- [ ] **Step 3: Implement pure engine**

```ts
export function calculatePercentage(input: PercentageInput): PercentageOutput {
  return { result: (input.percentage / 100) * input.value };
}
```

- [ ] **Step 4: Implement N-MATH boundary**

Read raw fields as strings, cap at 128 chars, parse finite numbers, return safe `INVALID_INPUT`/`LIMIT_EXCEEDED`.

- [ ] **Step 5: Register exact locale routes**

```text
EN    /tools/calculators/percentage-calculator/
PT-BR /pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/
```

Definition: main thread, eager-tiny, `serverRequired:false`, profile `N-MATH`, Ads class `eligible`, local processing true.

- [ ] **Step 6: Build first generic form/controller**

`GenericToolForm.astro` renders semantic labels/fields/actions/status from metadata. `generic-tool.client.ts` attaches by `data-tool-id`, collects raw values, calls `executeTool`, and writes result through text-safe DOM APIs only.

- [ ] **Step 7: Verify reciprocal locale metadata**

EN self-canonical + PT-BR alternate; PT-BR self-canonical + EN alternate; no `x-default`.

- [ ] **Step 8: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected artifacts:

```text
dist/tools/calculators/percentage-calculator/index.html
dist/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/index.html
```

- [ ] **Step 9: Commit**

```bash
git add src/tools/registry src/tools/content src/tools/boundaries/percentage.ts src/tools/engines/percentage.ts src/tools/ui src/tools/runtime tests/tools/engines/percentage.test.ts
git commit -m "feat(tools): add percentage calculator proof"
```

---

### Task 7: Proof tool 2 — JSON Formatter with bounded structured-text path

**Files:**
- Create JSON definition/content/boundary/engine files
- Test: `tests/tools/engines/json-formatter.test.ts`
- Test: `tests/tools/security/json-boundary.test.ts`
- Modify: catalog + loader maps

**Interfaces:**

```ts
export type JsonValue = null | boolean | number | string | JsonValue[] | { readonly [key: string]: JsonValue };
export interface JsonFormatterInput { readonly value: JsonValue; readonly indent: 2 | 4 }
export interface JsonFormatterOutput { readonly formatted: string }
```

Raw text is consumed by the boundary; the pure engine receives parsed/canonical JSON data, not unvalidated source text.

- [ ] **Step 1: Write failing tests**

Cover stable formatting, invalid JSON, depth 128 vs 129, 200,000 vs 200,001 nodes, 2 MiB input +1, output 5 MiB +1, and `__proto__` treated as data without merge into application state.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/json-formatter.test.ts tests/tools/security/json-boundary.test.ts
```

- [ ] **Step 3: Implement boundary in approved order**

```text
UTF-8 bytes <=2 MiB
-> bounded lexical depth preflight <=128
-> JSON.parse
-> iterative node count <=200,000
-> canonical JsonFormatterInput
```

Do not recursively traverse attacker-controlled depth.

- [ ] **Step 4: Implement pure formatter**

```ts
const formatted = JSON.stringify(input.value, null, input.indent);
```

UTF-8 output must stay <=5 MiB. Render as text only.

- [ ] **Step 5: Register EN route**

```text
/tools/developer/json-formatter/
```

No PT-BR route is fabricated during this proof phase.

- [ ] **Step 6: Verify GREEN and commit**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
git add src/tools/registry/definitions/json-formatter.ts src/tools/content/en/json-formatter.ts src/tools/boundaries/json.ts src/tools/engines/json-formatter.ts src/tools/runtime tests/tools/engines/json-formatter.test.ts tests/tools/security/json-boundary.test.ts
git commit -m "feat(tools): add bounded json formatter proof"
```

---

### Task 8: Proof tool 3 — Image Resizer with native browser decode/canvas path

**Files:**
- Create image definition/content/boundary/engine/renderer files
- Test: `tests/tools/security/image-raster.test.ts`
- Modify: catalog + loader maps

**Interfaces:**
- Proof input allowlist: PNG + JPEG only; this is a valid tightening of `I-RASTER`.
- Hard caps: <=25 MiB encoded; <=12,000 px/axis; <=80 MP; <=50 MiB output.

- [ ] **Step 1: Write failing pure header-preflight tests**

Use tiny synthetic `Uint8Array` fixtures. Cover PNG dimensions, bounded JPEG SOF scan, truncated headers, signature/MIME mismatch, width 12,001, pixel product 80 MP +1, and unsupported WebP -> `UNSUPPORTED_FORMAT`.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/security/image-raster.test.ts
```

- [ ] **Step 3: Implement safe byte-header preflight**

```ts
export interface RasterHeader {
  readonly format: "png" | "jpeg";
  readonly width: number;
  readonly height: number;
}

export function inspectRasterHeader(bytes: Uint8Array): ToolExecutionResult<RasterHeader>;
```

JPEG segment lengths are validated before advancing offsets.

- [ ] **Step 4: Implement browser-only resize engine**

After boundary approval:

1. decode with `createImageBitmap` where available;
2. verify decoded dimensions again;
3. draw to local canvas/OffscreenCanvas path;
4. export explicit PNG/JPEG;
5. reject output >50 MiB;
6. return Blob metadata;
7. never call network APIs.

Renderer/runtime owns Object URL creation/revocation.

- [ ] **Step 5: Register exact EN route**

```text
/tools/image/image-resizer/
```

Use `renderer:"image-resizer"`, profile `I-RASTER`, Ads class `eligible-private`, local-processing privacy copy.

- [ ] **Step 6: Verify automated checks**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

- [ ] **Step 7: Browser smoke with an existing known fixture**

Run dev server and use:

```text
public/assets/brand/favicon-32.png
```

Resize it, download output, and inspect browser network activity. Expected: no user-file upload/processing request.

- [ ] **Step 8: Commit**

```bash
git add src/tools/registry/definitions/image-resizer.ts src/tools/content/en/image-resizer.ts src/tools/boundaries/image-raster.ts src/tools/engines/image-resizer.client.ts src/tools/ui/renderers/ImageResizer.astro src/tools/runtime tests/tools/security/image-raster.test.ts
git commit -m "feat(tools): add local image resizer proof"
```

---

### Task 9: Proof tool 4 — Regex Tester with disposable Worker and 1.5 s hard kill

**Files:**
- Create regex definition/content/boundary/engine/Worker/renderer files
- Test: `tests/tools/engines/regex.test.ts`
- Test: `tests/tools/security/regex-boundary.test.ts`
- Modify: runtime loader maps

**Interfaces:**
- Raw fields: pattern, flags, subject.
- Hard caps: 10 KiB pattern, 1 MiB subject, 10,000 matches, 1,500 ms Worker watchdog.

- [ ] **Step 1: Write failing safe-case and boundary tests**

Cover normal global matches, zero-length match progress, flag validation, duplicate flags, pattern max+1, subject max+1, result count cap.

Do not run catastrophic regex on the Node main test thread.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/regex.test.ts tests/tools/security/regex-boundary.test.ts
```

- [ ] **Step 3: Implement pure safe-case extraction**

`RegExp` construction is expected for this tool; `eval`/`new Function` are not.

```ts
export interface RegexMatch {
  readonly index: number;
  readonly match: string;
  readonly groups: readonly string[];
}
```

Manually advance `lastIndex` after zero-length global/sticky matches. Cap result count.

- [ ] **Step 4: Implement dedicated module Worker**

Typed operation envelope; no network; no remote import; no provider logic. Parent owns timeout.

- [ ] **Step 5: Wire parent watchdog at exactly 1,500 ms**

Timeout/cancel terminates and cleans up. No retry/server fallback.

- [ ] **Step 6: Register route/renderer**

```text
/tools/developer/regex-tester/
```

Renderer uses text-safe result DOM and exposes cancel while running.

- [ ] **Step 7: Verify automated suite**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

- [ ] **Step 8: Browser hard-kill smoke with exact bounded case**

Use pattern:

```text
^(a+)+$
```

Subject: 200,000 `a` characters followed by `!` (well under the 1 MiB subject cap).

Expected: Worker is killed at the watchdog, UI reports `TIMEOUT`, page remains responsive, no automatic retry, no backend request.

- [ ] **Step 9: Commit**

```bash
git add src/tools/registry/definitions/regex-tester.ts src/tools/content/en/regex-tester.ts src/tools/boundaries/regex.ts src/tools/engines/regex.ts src/tools/workers/regex.worker.ts src/tools/ui/renderers/RegexTester.astro src/tools/runtime tests/tools/engines/regex.test.ts tests/tools/security/regex-boundary.test.ts
git commit -m "feat(tools): add isolated regex tester proof"
```

---

### Task 10: Catalog-driven discovery, conservative hubs, local search and relations

**Files:**
- Create: `src/tools/search/build-index.ts`
- Test: `tests/tools/search/search-index.test.ts`
- Modify: root/category pages
- Modify: release manifest
- Modify: proof definitions relations
- Modify: `scripts/check-tools.mjs`

**Interfaces:**
- Produces locale-specific public search records from catalog/content only.

- [ ] **Step 1: Write failing search-index tests**

EN contains exactly four proof tools; PT-BR contains only Percentage. Public fields only:

```text
id, title, aliases, keywords, category, canonicalPath, description
```

No engine paths/security internals/user data.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/search/search-index.test.ts
```

- [ ] **Step 3: Implement deterministic local index**

`buildSearchIndex(locale)` consumes validated catalog + locale content, sorts deterministically, returns serializable records.

- [ ] **Step 4: Implement hash-only search state**

Example:

```text
/tools/#q=json
```

No crawlable query-result route.

- [ ] **Step 5: Set proof-stage hub indexing conservatively**

At this four-tool proof stage, set both locale roots and all category hubs to `noindex,follow` until Phase 13/15 supplies launch-quality discovery/content and final indexing validation.

Do not publish dummy tools/content to satisfy a threshold.

- [ ] **Step 6: Add only semantically justified relations**

Stable ids only; no missing/duplicate/self links. Zero related links is preferable to irrelevant links during the proof set.

- [ ] **Step 7: Verify GREEN and commit**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
git add src/tools/search src/tools/registry/definitions src/tools/build/site-release-manifest.ts src/pages/tools src/pages/pt-br/ferramentas scripts/check-tools.mjs tests/tools/search/search-index.test.ts
git commit -m "feat(tools): add catalog driven discovery"
```

---

### Task 11: Aggregate Tools gates without deleting commercial acceptance

**Files:**
- Modify: `scripts/check-acceptance.mjs`
- Modify: `scripts/check-routes.mjs`
- Modify: `scripts/check-tools.mjs`
- Modify: `scripts/check-tools-security.mjs`
- Modify: `package.json`
- Modify: `public/_headers` only if a stable safe Worker/static scope is proven

**Interfaces:**
- Produces one repeatable validation pipeline for existing commercial gates + Tools foundation.

- [ ] **Step 1: Extend acceptance assertions from already-tested source invariants**

Add checks that:

- four proof ids exist;
- Percentage has EN/PT-BR routes;
- every proof operation has `serverRequired=false`;
- each resolves a valid security profile and executable loader;
- protected directories contain no forbidden network/eval/unsafe sink;
- no service-worker registration exists;
- no client framework dependency exists;
- Tools canonical paths use trailing slash;
- demos remain non-indexed/ad-free;
- all 16 commercial/demo canonical routes remain represented.

These checks aggregate existing tested behavior; they are verification code, not a new runtime feature.

- [ ] **Step 2: Finalize package validation scripts**

```json
{
  "test:tools": "node scripts/run-tools-tests.mjs",
  "check:tools": "node scripts/check-tools.mjs && node scripts/check-tools-security.mjs",
  "validate": "prettier --check . && astro check && node scripts/run-tools-tests.mjs && astro build && node scripts/check-routes.mjs && node scripts/check-tools.mjs && node scripts/check-tools-security.mjs && node scripts/check-acceptance.mjs"
}
```

Keep `check:release` separate.

- [ ] **Step 3: Preserve/strengthen static headers only when target is real**

Keep current global security headers and demo `X-Robots-Tag`.

If Astro's emitted Worker resource path can be targeted reliably without broad weakening, add the Phase-7-compatible static rule. If not, leave `_headers` unchanged and record Worker response-header verification for Phase 19. Never add a fake broad exception.

- [ ] **Step 4: Run complete local gate**

```bash
corepack pnpm validate
corepack pnpm check:release
```

Expected:

- `validate` exits 0.
- `check:release` may remain non-zero only for genuine external production release gates. Record the exact blockers; do not fabricate production values.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts public/_headers
git commit -m "test(tools): enforce sdk security and route gates"
```

If `_headers` is unchanged, omit it.

---

### Task 12: Phase-12 proof evidence, review and checkpoint

**Files:**
- Create: `docs/tools/PHASE12_PROOF_SET_REPORT.md`
- Modify: `docs/context/TOOLS_STATE.md`
- Modify: `docs/context/TOOLS_HANDOFF.md`
- Append durable decisions to: `docs/context/TOOLS_DECISIONS.md`

**Interfaces:**
- Produces evidence that the same SDK supports four materially different local/browser input/execution classes. Does not claim Phase 13–20 completion.

- [ ] **Step 1: Run fresh full verification**

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm format:check
corepack pnpm check
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
corepack pnpm check:acceptance
git status --short
```

Expected: all listed validation commands exit 0 before status claims.

- [ ] **Step 2: Verify exact proof artifacts**

```text
dist/tools/calculators/percentage-calculator/index.html
dist/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/index.html
dist/tools/developer/json-formatter/index.html
dist/tools/image/image-resizer/index.html
dist/tools/developer/regex-tester/index.html
```

Also verify all 16 legacy route artifacts using `siteReleaseManifest`, including directory-index demo artifacts introduced by `preserve`.

- [ ] **Step 3: Verify built SEO/locale behavior**

- EN proof pages: `lang="en"`.
- PT Percentage: `lang="pt-BR"`.
- all proof pages self-canonical.
- Percentage reciprocal EN/PT-BR only.
- EN-only tools have no fabricated PT-BR alternate.
- no provider/fallback hostname in canonicals.
- proof roots/category hubs `noindex,follow`.
- demo indexing unchanged.
- report that final Launch sitemap grouping remains pending rather than claiming it complete.

- [ ] **Step 4: Verify economic/network invariant in browser**

Perform one successful operation per proof tool and inspect network activity.

Expected:

```text
static document/assets/chunks: allowed
production Ads/analytics: not enabled by this proof plan
MenezesDev processing API: zero
user file/text upload: zero
```

- [ ] **Step 5: Verify representative hostile boundaries**

- Percentage: 129-char numeric token rejects.
- JSON: depth 129 and oversize reject.
- Image: giant declared dimensions reject before full decode when header preflight can determine them.
- Regex: exact pathological browser case terminates at 1.5 s and leaves UI usable.
- static scanner reports zero forbidden network/eval/service-worker/innerHTML usage in protected Tools dirs.

- [ ] **Step 6: Write evidence report from observed results only**

Required headings:

```text
Commit under test
Commands and exit status
Legacy regression result
Proof tools and routes
Security boundary evidence
Worker/cancellation evidence
Network/backend-request evidence
Locale/SEO evidence
Deliberately deferred launch work
Phase-13 gate status
```

Deferred work must explicitly include final visual system, production Ads/consent, full Launch-50 waves, final PT-BR localization, final sitemap grouping, analytics provider, production Cloudflare guard configuration and release preflight.

- [ ] **Step 7: Update context only according to evidence**

If and only if gates pass:

- Phase 10 closed;
- Phase 11 closed if SDK foundation supports representative tools without category hacks;
- Phase 12 closed if proof diversity is demonstrated;
- Phase 13 becomes next legal phase;
- Launch 50 remains incomplete;
- production remains unreleased.

If a gate fails, leave the affected phase open and record the precise blocker.

- [ ] **Step 8: Commit evidence/context**

```bash
git add docs/tools/PHASE12_PROOF_SET_REPORT.md docs/context/TOOLS_STATE.md docs/context/TOOLS_HANDOFF.md docs/context/TOOLS_DECISIONS.md
git commit -m "docs(tools): record phase 12 proof set evidence"
```

- [ ] **Step 9: Request independent code review**

Invoke `superpowers:requesting-code-review` on the complete Phase 10–12 diff. Process findings with `superpowers:receiving-code-review`, rerun the full verification set, then use `superpowers:verification-before-completion` before any closure claim.

---

## Phase-9 Plan Self-Review Checklist

- [ ] execution base is revalidated immediately before Phase 10;
- [ ] `main` stays untouched;
- [ ] commercial/demo acceptance remains intact;
- [ ] preserve-mode mixed flat/index artifacts are explicit per legacy route;
- [ ] canonical identity becomes explicit before output-format switch;
- [ ] catalog remains serializable/data-only;
- [ ] executable-loader existence is enforced only after loader maps exist;
- [ ] all 19 security profiles carry exact approved hard caps;
- [ ] overrides tighten only;
- [ ] engines/boundaries/Workers have no ambient network authority;
- [ ] runtime errors/telemetry remain content-free;
- [ ] Ads/analytics remain optional/no-op and no real provider is enabled;
- [ ] no production Cloudflare resource is created;
- [ ] all four proof tools remain C0/browser-local/serverRequired=false;
- [ ] Percentage proves generic numeric + real reciprocal locale pair;
- [ ] JSON boundary owns parse/depth/node validation before pure formatter engine;
- [ ] Image Resizer uses native PNG/JPEG path with hostile header preflight;
- [ ] Regex uses disposable Worker + parent 1.5 s hard kill;
- [ ] no conditional dependency or speculative WASM framework enters proof set;
- [ ] search is local/hash-state only;
- [ ] proof roots/hubs stay conservatively noindex until launch-quality content exists;
- [ ] final sitemap grouping is explicitly deferred, not falsely claimed complete;
- [ ] proof evidence checks zero backend-processing requests;
- [ ] Phase 13/14/15 remain separate future gates.

## Execution Boundary

This plan is the Phase-9 deliverable. Writing or approving it does **not** itself create `feat/tools-platform`, install dependencies, edit runtime code, configure Cloudflare production controls, or publish Tools.

After the plan is committed, self-reviewed and approved, execution begins at Task 1 under the required Superpowers execution/worktree/TDD/review skills.
