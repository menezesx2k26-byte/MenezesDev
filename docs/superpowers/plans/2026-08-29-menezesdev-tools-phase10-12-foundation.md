# MenezesDev Tools Phase 10–12 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the implemented commercial Astro site with the approved MenezesDev Tools governance, build the typed/security-enforced Tool SDK foundation, and prove it with four materially different local-browser tools without touching production `main`.

**Architecture:** Start `feat/tools-platform` from the freshly revalidated commercial implementation branch, merge the canonical Tools documentation history, then build a provider-neutral static Tools layer beside—not inside—the commercial experience. The SDK uses serializable tool definitions, explicit locale routes, allowlisted boundaries/engines, profile-driven security, local execution, lazy Workers where needed, and generated route/SEO/search metadata. The proof set covers scalar math, structured text, native image processing, and a killable regex Worker.

**Tech Stack:** Astro 7.2.4 static, TypeScript 6.0.3 strictest, Tailwind CSS 4.3.3, Node >=24.19.0 <25, pnpm 11.22.0, native browser APIs, Web Workers, Node built-in `node:test`; no React/Vue/Svelte, no new runtime/backend service, no new third-party parser/codec in this plan.

**Spec:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`, `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`, `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-design.md`, plus the Phase-5 SEO/IA contract.

## Global Constraints

- Git and the approved repository history are the source of truth; `main` receives no partial Tools implementation.
- Re-read `AGENTS.md`, Tools state/decisions/handoff, the immutable workflow in full, all binding addenda, security policy, and relevant specs before every implementation task.
- Phase-10 base is **not permanently pinned**: immediately before branch creation, revalidate the current head of `origin/feat/phase-10-implementation`. Planning observation on 2026-08-29: `a98be87db3863505397ba9f2e80d9b656228d750`.
- Preserve the existing commercial/demo behavior and its automated acceptance checks.
- Required baseline versions: Astro `7.2.4`, TypeScript `6.0.3`, Tailwind `4.3.3`, pnpm `11.22.0`, Node `>=24.19.0 <25` unless a separately approved dependency/version decision changes them.
- No client UI framework is added.
- Ordinary frozen Launch-50 operations remain `serverRequired=false`, `costClass=C0`, with zero MenezesDev backend-processing requests per operation.
- Every user-input path follows `validate -> bound -> sanitize/canonicalize -> process -> encode safe output`.
- Security-profile overrides may tighten limits only.
- `src/tools/engines/**`, `src/tools/boundaries/**`, and `src/tools/workers/**` have zero ambient network authority.
- No user file/text/result/private metadata is copied into telemetry.
- No conditional dependency is admitted by this plan. In particular, do not install PDF, Prettier standalone, image-compression, DOMPurify, Markdown, CSV, EXIF or WASM packages here.
- Launch remains service-worker-free.
- AdSense/native-ad provider code is out of scope; implement only the provider-neutral/no-op Ads seam and static policy model required by the approved architecture.
- Cloudflare production WAF/rate/Turnstile rules are out of scope; implement only application/static artifacts and validators that later phases can bind.
- Phase 13 visual design system is out of scope. Proof UI must be semantic, accessible and intentionally minimal rather than treated as final visual design.
- Phase 17 owns final PT-BR editorial/localization QA. This plan creates only the minimum PT-BR proof content needed to validate locale routing/hreflang.
- TDD is mandatory for behavior changes: write one focused failing test, run it and confirm the expected failure, implement the minimum behavior, rerun to green, then refactor while green.
- Every task ends with a focused commit and a fresh verification command.

---

## File Structure Locked by This Plan

### Existing files modified

- `.gitignore` — only if the manual worktree fallback requires a tracked `.worktrees/` ignore.
- `README.md` — resolve commercial-status + Tools-platform documentation during integration; keep claims factual.
- `package.json` — add dependency-free Tools test/check scripts; preserve versions.
- `astro.config.mjs` — reconcile static output with approved `build.format: "preserve"` and `trailingSlash: "ignore"`; keep provider-neutral build.
- `src/config/site.ts` — preserve commercial config while exposing canonical-origin helpers usable by neutral document metadata.
- `src/layouts/BaseLayout.astro` — delegate metadata/head construction to neutral metadata component without importing Tools chrome.
- `src/data/routes.ts` — remain the legacy/commercial route source; do not turn commercial routes into ToolDefinitions.
- `src/types/index.ts` — retain existing commercial types; add only neutral document types that genuinely belong across surfaces.
- `src/pages/index.astro` and listed commercial/demo call sites — pass explicit canonical metadata after neutral-head migration.
- `src/pages/robots.txt.ts` — consume canonical origin consistently and advertise the canonical sitemap index.
- `public/_headers` — preserve existing headers; add narrowly scoped Tools/Worker header rules only where the Phase-7 policy can be expressed statically.
- `scripts/check-routes.mjs` — evolve from the hard-coded file-layout assumption to the release manifest while preserving the legacy 16-route assertions.
- `scripts/check-acceptance.mjs` — preserve all existing checks and add Tools invariants without deleting commercial gates.

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
- Preserve/import: all canonical `docs/tools/**`, `docs/context/TOOLS_*`, `docs/superpowers/specs/**`, `docs/superpowers/plans/**`, and `AGENTS.md`

**Interfaces:**
- Consumes: latest verified `origin/feat/phase-10-implementation`; canonical `origin/feat/tools-oss-catalog`.
- Produces: isolated `feat/tools-platform` working branch containing both the implemented commercial app and the approved Tools governance/spec history.

- [ ] **Step 1: Re-read project governance before touching Git state**

Run from the repository root:

```bash
git fetch origin --prune
git rev-parse origin/feat/phase-10-implementation
git rev-parse origin/feat/tools-oss-catalog
git status --short
git branch --show-current
```

Expected: both refs resolve; planning-time app head was `a98be87db3863505397ba9f2e80d9b656228d750`, but the execution-time value is authoritative. Do not continue from an unexplained dirty repository.

- [ ] **Step 2: Verify the commercial base before integrating Tools**

In an isolated checkout of the current `origin/feat/phase-10-implementation`, run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm validate
```

Expected: the commercial baseline passes before Tools changes. If it fails, stop and report the baseline failure instead of attributing it to Tools.

- [ ] **Step 3: Create `feat/tools-platform` through the worktree skill**

Invoke `superpowers:using-git-worktrees` and follow its detection/native-tool/manual-fallback flow. The intended branch base is the fresh `origin/feat/phase-10-implementation` head.

Manual fallback equivalent after the skill's ignore safety checks:

```bash
git worktree add .worktrees/tools-platform -b feat/tools-platform origin/feat/phase-10-implementation
cd .worktrees/tools-platform
```

Expected: isolated workspace on `feat/tools-platform`, with no modification to `main`.

- [ ] **Step 4: Merge the canonical Tools documentation branch**

Run:

```bash
git merge --no-ff origin/feat/tools-oss-catalog -m "merge: integrate approved tools design history"
git diff --name-only --diff-filter=U
```

Expected: resolve only real overlaps. Current planning evidence predicts `README.md` as the prominent overlap; do not assume that list is immutable if either branch advanced.

- [ ] **Step 5: Resolve `README.md` by preserving both factual surfaces**

Resolution rule:

```text
KEEP: Tools promotional/platform thesis, Launch 50, browser-first economics, growth flywheel
+
KEEP: current commercial implementation status, branch, build stack and preview caveats
-
REMOVE: duplicated/stale statements and any claim that production is ready when it is not
```

Do not replace the Tools README with the old commercial README and do not erase current commercial status merely because Tools is the strategic lead.

- [ ] **Step 6: Verify the merged baseline before feature work**

Run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm validate
git status --short
```

Expected: existing commercial checks still pass; only the deliberate merge resolution is staged/committed.

- [ ] **Step 7: Commit the integration checkpoint**

```bash
git add README.md AGENTS.md docs .gitignore
git commit -m "chore(tools): establish tools platform integration branch"
```

If `.gitignore` was not changed, omit it from `git add`. Do not commit unrelated files.

---

### Task 2: Dependency-free Tools test runner and release-manifest seam

**Files:**
- Create: `scripts/run-tools-tests.mjs`
- Create: `src/tools/build/site-release-manifest.ts`
- Test: `tests/tools/core/release-manifest.test.ts`
- Modify: `package.json`
- Modify: `scripts/check-routes.mjs`
- Modify: `src/data/routes.ts` only if a read-only helper export is required

**Interfaces:**
- Consumes: existing `routes` from `src/data/routes.ts`.
- Produces: `SiteReleaseRoute`, `siteReleaseManifest`, cross-platform `pnpm test:tools`, and route validation that understands both legacy flat output and Tools directory output.

- [ ] **Step 1: Write the failing release-manifest test**

Create `tests/tools/core/release-manifest.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { siteReleaseManifest } from "../../../src/tools/build/site-release-manifest.ts";

test("preserves all 16 legacy routes with explicit output artifacts", () => {
  const legacy = siteReleaseManifest.filter((route) =>
    route.surface === "commercial" || route.surface === "demo"
  );
  assert.equal(legacy.length, 16);
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/projetos/m47")?.outputFile,
    "projetos/m47.html",
  );
  assert.equal(
    legacy.find((route) => route.canonicalPath === "/demo/tavola27/menu")?.indexPolicy,
    "noindex",
  );
});
```

- [ ] **Step 2: Run the single test and verify RED**

Temporarily run it directly:

```bash
node --test tests/tools/core/release-manifest.test.ts
```

Expected: FAIL because `src/tools/build/site-release-manifest.ts` does not exist.

- [ ] **Step 3: Implement the minimal release-manifest type and legacy mapping**

Create `src/tools/build/site-release-manifest.ts` with this public shape:

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
  outputFile: route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`,
  surface: route.project === "m47" || route.project === "tavola27" || route.project === "prismae"
    ? "demo"
    : "commercial",
  locale: "pt-BR",
  indexPolicy: route.indexable ? "index" : "noindex",
}));

export const siteReleaseManifest: readonly SiteReleaseRoute[] = legacyRoutes;
```

The Tools portion is added later from the registry; this first red-green cycle only proves legacy preservation.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/tools/core/release-manifest.test.ts
```

Expected: PASS.

- [ ] **Step 5: Add the cross-platform test launcher**

Create `scripts/run-tools-tests.mjs` that recursively enumerates `tests/tools/**/*.test.ts`, sorts the paths, and runs:

```js
spawnSync(process.execPath, ["--test", ...files], { cwd: root, stdio: "inherit" });
```

Fail if no test files are found or the child exits non-zero.

Modify `package.json` scripts:

```json
{
  "test:tools": "node scripts/run-tools-tests.mjs",
  "check:tools": "node scripts/check-tools.mjs && node scripts/check-tools-security.mjs"
}
```

Do not add a test package. Node 24 is the test runner.

- [ ] **Step 6: Refactor `check-routes.mjs` to consume manifest output paths**

Keep all existing legacy assertions. Replace the assumption:

```js
route === "/" ? "dist/index.html" : `dist/${route}.html`
```

with manifest-driven `outputFile` resolution. The script must still report the legacy `16/16` gate separately even after Tools routes are added.

- [ ] **Step 7: Run the focused and legacy checks**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:acceptance
```

Expected: new manifest test passes and all pre-existing commercial acceptance checks still pass.

- [ ] **Step 8: Commit**

```bash
git add package.json scripts/run-tools-tests.mjs scripts/check-routes.mjs src/tools/build/site-release-manifest.ts tests/tools/core/release-manifest.test.ts
git commit -m "test(tools): add release manifest and native test runner"
```

---

### Task 3: Tool SDK core contracts, security profiles and catalog validator

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
- Produces: serializable `ToolDefinition`, profile registry, tightening-only `resolveSecurityPolicy`, catalog validation, stable error codes.
- Later tasks consume these exact exported names.

- [ ] **Step 1: Write failing contract tests**

`tests/tools/core/catalog.test.ts` must prove duplicate ids/routes and executable-like module paths are rejected. `tests/tools/core/security-policy.test.ts` must prove tightening is accepted and loosening is rejected.

Use a real definition fixture:

```ts
const baseDefinition = {
  id: "fixture-tool",
  category: "developer",
  routes: {
    en: {
      locale: "en",
      categorySlug: "developer",
      toolSlug: "fixture-tool",
      canonicalPath: "/tools/developer/fixture-tool/",
      indexPolicy: "index",
    },
  },
  ui: { renderer: "generic", primaryAction: "calculate", resultKind: "text", supportsReset: true },
  execution: { preferred: "browser", fallback: "none", serverRequired: false, isolation: "main-thread", load: "eager-tiny" },
  boundary: { boundaryId: "fixture-boundary", profileId: "T-TEXT" },
  engineId: "fixture-engine",
  output: { kind: "text" },
  security: { profileId: "T-TEXT" },
  seoPolicy: { structuredData: ["breadcrumb"] },
  relations: { relatedToolIds: [] },
  analytics: { enabled: true },
  ads: { class: "eligible" },
  privacy: { localProcessing: true },
} as const;
```

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/core/catalog.test.ts tests/tools/core/security-policy.test.ts
```

Expected: FAIL because the core modules do not exist.

- [ ] **Step 3: Implement `src/tools/core/types.ts`**

Export these literal unions/interfaces:

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

export interface ToolDefinition {
  readonly id: string;
  readonly category: ToolCategory;
  readonly routes: Partial<Record<ToolLocale, ToolRouteEntry>>;
  readonly ui: {
    readonly renderer: "generic" | "image-resizer" | "regex-tester";
    readonly primaryAction: "calculate" | "format" | "resize" | "test";
    readonly resultKind: "number" | "text" | "file" | "matches";
    readonly supportsReset: boolean;
    readonly supportsCancel?: boolean;
    readonly inputs?: readonly ToolInputFieldDefinition[];
  };
  readonly execution: ToolExecutionProfile;
  readonly boundary: { readonly boundaryId: string; readonly profileId: SecurityProfileId };
  readonly engineId: string;
  readonly output: { readonly kind: "number" | "text" | "file" | "matches" };
  readonly security: { readonly profileId: SecurityProfileId; readonly overrides?: SecurityLimitOverrides };
  readonly seoPolicy: { readonly structuredData: readonly ("breadcrumb" | "none")[] };
  readonly relations: { readonly relatedToolIds: readonly string[]; readonly guideIds?: readonly string[] };
  readonly analytics: { readonly enabled: boolean };
  readonly ads: { readonly class: "eligible" | "eligible-ymyl" | "eligible-private" | "ad-free" };
  readonly privacy: { readonly localProcessing: boolean };
}
```

Also define `ToolInputFieldDefinition`, `SecurityLimits`, `SecurityLimitOverrides`, `ToolExecutionResult<T>`, `RawToolInput`, `ToolBoundary`, and `ToolEngine` as focused types. Do not put implementation functions in this file.

- [ ] **Step 4: Implement the canonical error-code module**

`src/tools/errors/codes.ts` exports the literal array and a narrow helper:

```ts
export const TOOL_ERROR_CODES = [
  "INVALID_INPUT", "LIMIT_EXCEEDED", "UNSUPPORTED_FORMAT", "UNSUPPORTED_BROWSER",
  "TIMEOUT", "ABORTED", "ENGINE_FAILURE", "OUTPUT_TOO_LARGE",
  "ENCRYPTED_UNSUPPORTED", "ACTIVE_CONTENT_REJECTED",
] as const;

export function toolError(code: ToolErrorCode, messageKey: string) {
  return { ok: false as const, error: { code, messageKey } };
}
```

No raw exception/details bag is exposed.

- [ ] **Step 5: Encode all Phase-7 profile hard caps as data**

`src/tools/security/profiles.ts` exports `SECURITY_PROFILES` covering all 19 profile ids. Encode the exact approved caps, including:

| Profile | Required hard caps |
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
| C-SECRET | 4,096 generated characters |
| H-HASH | 10 MiB text; 100 MiB file |
| I-RASTER | 25 MiB encoded; 12,000 px/axis; 80 MP; 50 MiB output |
| I-META | 25 MiB input; 5 MiB output |
| I-SVG | 5 MiB input; 20 MP; 5,000 ms; 50 MiB output |
| A-ZIP-CREATE | 100 MiB total; 1,000 entries; 50 MiB/entry; 150 MiB output |
| P-PDF | 75 MiB aggregate; 500 pages; 100 MiB output; 15,000 ms |
| D-DATE | civil years 1..9999; 1,000 generated segments |

Use integer byte constants (`MiB = 1024 * 1024`, `KiB = 1024`) rather than decimal MB.

- [ ] **Step 6: Implement tightening-only resolution**

`resolveSecurityPolicy(tool)` must:

1. resolve the referenced profile;
2. verify `boundary.profileId === security.profileId`;
3. allow an override only when each numeric maximum is <= profile maximum;
4. reject added formats/protocols or weaker isolation/active-content/network policy;
5. return an immutable resolved object.

Throw a build-time configuration error with tool id/profile/field only; never user content.

- [ ] **Step 7: Implement catalog validation**

`validateToolCatalog(definitions)` must reject:

- duplicate ids;
- duplicate canonical paths;
- mismatched route locale/category shape;
- non-trailing-slash Tools canonical paths;
- `serverRequired=true` in the frozen proof catalog;
- unknown profile/boundary/engine ids;
- relations to missing ids once the full catalog is assembled;
- security profile mismatch;
- `routes` with executable/module-path values instead of serializable metadata.

`catalog.ts` exports a readonly array; `index.ts` validates once at build/import time and exports `toolCatalog`, `getToolById`, `getToolByRoute`.

- [ ] **Step 8: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm check
```

Expected: core tests pass and TypeScript/Astro checks remain green.

- [ ] **Step 9: Commit**

```bash
git add src/tools/core src/tools/errors src/tools/security src/tools/registry tests/tools/core/catalog.test.ts tests/tools/core/security-policy.test.ts
git commit -m "feat(tools): add typed sdk and security policy core"
```

---

### Task 4: Neutral document metadata, explicit canonical paths and static route generation

**Files:**
- Create: `src/components/seo/DocumentHead.astro`
- Create: `src/layouts/ToolLayout.astro`
- Create: `src/tools/seo/resolve-tool-seo.ts`
- Test: `tests/tools/core/seo.test.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/config/site.ts`
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`
- Modify: `src/components/ProjectCasePage.astro`
- Modify explicit `BaseLayout` call sites under `src/pages/demo/**`
- Create: the six Tools root/category/tool page templates listed in the file map
- Modify: `src/tools/build/site-release-manifest.ts`
- Modify: `src/pages/robots.txt.ts`

**Interfaces:**
- Produces: `DocumentMetadata`, `resolveToolSeo(tool, locale)`, explicit canonical origin/path handling, nested Tool route output.
- Consumes: validated `toolCatalog` and locale content registry introduced by proof tasks.

- [ ] **Step 1: Write SEO resolver tests first**

Create `tests/tools/core/seo.test.ts` with a fixture tool containing EN/PT-BR routes and assert:

```ts
assert.equal(en.canonicalPath, "/tools/calculators/fixture/");
assert.deepEqual(en.alternates, [
  { locale: "en", path: "/tools/calculators/fixture/" },
  { locale: "pt-BR", path: "/pt-br/ferramentas/calculadoras/ferramenta/" },
]);
assert.equal(pt.alternates.length, 2);
```

Also assert a one-locale tool does not fabricate an alternate.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/core/seo.test.ts
```

Expected: FAIL because `resolve-tool-seo.ts` is absent.

- [ ] **Step 3: Add neutral document types and resolver**

Add to `src/types/index.ts` only the cross-surface type:

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

`resolveToolSeo` takes `ToolDefinition`, locale content and locale; it never reads request host/path.

- [ ] **Step 4: Create `DocumentHead.astro` and make canonical paths explicit**

`DocumentHead.astro` receives `DocumentMetadata`, builds canonical/alternate URLs through the configured canonical origin, emits title/description/robots/canonical/hreflang/OG/Twitter metadata, and emits BreadcrumbList only from a real breadcrumb descriptor.

`BaseLayout.astro` receives an explicit `metadata: DocumentMetadata` prop instead of deriving canonical identity from `Astro.url.pathname`. Preserve commercial analytics/demo noindex behavior outside `DocumentHead` as appropriate.

Update commercial call sites with explicit paths:

```text
/
/projetos/m47
/projetos/tavola-27
/projetos/prismae
/demo/m47
/demo/tavola27
/demo/tavola27/menu
/demo/tavola27/storia
/demo/tavola27/gallery
/demo/tavola27/contact
/demo/prismae
/demo/prismae/solutions
/demo/prismae/solutions/strategy
/demo/prismae/solutions/processes
/demo/prismae/solutions/indicators
/demo/prismae/contact
/404
```

Demo/404 metadata stays `noindex`; commercial canonical routes preserve their historical slashless URLs.

- [ ] **Step 5: Reconcile Astro output format only after explicit canonical metadata exists**

Change `astro.config.mjs`:

```js
output: "static",
trailingSlash: "ignore",
build: { format: "preserve" },
```

Do not couple canonical URLs to generated output filenames.

Preserve existing CSP baseline; Phase-7/14 later extensions remain explicit.

- [ ] **Step 6: Add `ToolLayout.astro`**

`ToolLayout` accepts resolved metadata, breadcrumb descriptors and privacy/status copy. It must:

- set correct `<html lang>` through the neutral document layer;
- render a skip link and `<main id="main-content">`;
- expose slots for `tool`, `result`, `explanation`, and `related`;
- contain no commercial WhatsApp CTA;
- contain no ad-provider script;
- contain no engine execution code.

Keep styling minimal/semantic; Phase 13 owns final visual identity.

- [ ] **Step 7: Add static root/category/tool templates**

Create:

```text
src/pages/tools/index.astro
src/pages/tools/[category]/index.astro
src/pages/tools/[category]/[slug]/index.astro
src/pages/pt-br/ferramentas/index.astro
src/pages/pt-br/ferramentas/[category]/index.astro
src/pages/pt-br/ferramentas/[category]/[slug]/index.astro
```

Dynamic templates use `getStaticPaths()` and validated catalog data only. No runtime/user path creates arbitrary pages.

Category indexing rule:

```ts
const indexPolicy = publishedToolsInCategory.length >= 3 ? "index" : "noindex";
```

Do not invent an “independently useful” override in code until a specifically authored category hub is approved.

- [ ] **Step 8: Extend the release manifest for Tools outputs**

A tool canonical path `/tools/calculators/example/` maps to:

```text
tools/calculators/example/index.html
```

A PT-BR path maps equivalently under `pt-br/ferramentas/.../index.html`.

Keep legacy output entries unchanged.

- [ ] **Step 9: Update robots to canonical sitemap index without changing demo noindex**

`robots.txt.ts` must use configured canonical origin and advertise `/sitemap-index.xml` only when a canonical production origin is configured. It must not block Tools roots.

Do not remove `public/_headers` demo `X-Robots-Tag`.

- [ ] **Step 10: Verify GREEN and commercial regression safety**

```bash
corepack pnpm test:tools
corepack pnpm check
corepack pnpm build
corepack pnpm check:acceptance
```

Expected: SEO tests pass, legacy 16 routes still materialize at their expected output files, and generated nested Tools output can be represented without changing canonical identity.

- [ ] **Step 11: Commit**

```bash
git add astro.config.mjs src/components/seo src/layouts src/config/site.ts src/types/index.ts src/pages src/components/ProjectCasePage.astro src/tools/seo src/tools/build/site-release-manifest.ts tests/tools/core/seo.test.ts scripts/check-routes.mjs
git commit -m "feat(tools): add neutral metadata and static tools routing"
```

---

### Task 5: Runtime controller, allowlisted loaders, no-op analytics/Ads and security scanner

**Files:**
- Create: `src/tools/runtime/controller.ts`
- Create: `src/tools/runtime/boundary-loaders.client.ts`
- Create: `src/tools/runtime/engine-loaders.client.ts`
- Create: `src/tools/runtime/worker-watchdog.ts`
- Create: `src/tools/analytics/noop.ts`
- Create: `src/tools/ads/policy.ts`
- Create: `scripts/check-tools.mjs`
- Create: `scripts/check-tools-security.mjs`
- Test: `tests/tools/runtime/controller.test.ts`
- Test: `tests/tools/runtime/worker-watchdog.test.ts`

**Interfaces:**
- Produces: `executeTool(toolId, rawInput, options)`, `runWorkerWithWatchdog`, allowlisted loader maps, `NOOP_ANALYTICS`, static `AD_POLICY` model.

- [ ] **Step 1: Write controller tests before runtime code**

Use injected allowlisted test loaders, not network mocks. Test order explicitly:

```text
raw input -> boundary -> engine -> typed result
```

Assert boundary failure prevents engine execution and unexpected exceptions normalize to `ENGINE_FAILURE` without raw exception text.

- [ ] **Step 2: Write watchdog tests before implementation**

Define a tiny `WorkerLike` test double implementing `postMessage`, `terminate`, `addEventListener`, `removeEventListener`. Assert timeout calls `terminate()` and resolves to `TIMEOUT`; cancellation resolves to `ABORTED`.

- [ ] **Step 3: Verify RED**

```bash
node --test tests/tools/runtime/controller.test.ts tests/tools/runtime/worker-watchdog.test.ts
```

Expected: FAIL because runtime modules are absent.

- [ ] **Step 4: Implement runtime controller**

Public contract:

```ts
export interface ExecuteToolOptions {
  readonly signal?: AbortSignal;
}

export async function executeTool(
  toolId: string,
  rawInput: RawToolInput,
  options: ExecuteToolOptions = {},
): Promise<ToolExecutionResult<unknown>>;
```

Implementation sequence:

1. resolve validated definition;
2. resolve boundary by fixed id;
3. parse/bound/canonicalize input;
4. stop immediately on boundary error;
5. lazy-resolve engine by fixed id;
6. execute with signal/context;
7. normalize exceptions;
8. return typed result.

No DOM, Ads, locale copy, Cloudflare binding or generic network client enters the engine context.

- [ ] **Step 5: Implement allowlisted loader maps**

Loader maps are literal code-owned maps. User input may select only an existing tool id; it never supplies module strings.

Initial maps are empty until proof tools land, but their type is fixed:

```ts
export type BoundaryLoader = () => Promise<{ default: ToolBoundary<unknown> }>;
export type EngineLoader = () => Promise<{ default: ToolEngine<unknown, unknown> }>;
```

- [ ] **Step 6: Implement the Worker watchdog**

`runWorkerWithWatchdog` owns timer/listeners and hard termination. On timeout/cancel:

```text
terminate -> cleanup listeners/timer -> typed error
```

Never retry automatically and never fall back to a server.

- [ ] **Step 7: Implement no-op analytics and Ads policy only**

`src/tools/analytics/noop.ts`:

```ts
export const NOOP_ANALYTICS = Object.freeze({ track() {} });
```

`src/tools/ads/policy.ts` exports:

```ts
export interface AdPolicyManifest {
  readonly globalEnabled: boolean;
  readonly categories: Readonly<Record<ToolCategory, boolean>>;
  readonly routes: Readonly<Partial<Record<string, boolean>>>;
  readonly providers: Readonly<Record<string, boolean>>;
}

export const AD_POLICY: AdPolicyManifest = Object.freeze({
  globalEnabled: false,
  categories: { calculators: false, image: false, text: false, developer: false, files: false, pdf: false },
  routes: {},
  providers: { adsense: false },
});
```

No provider script/path is enabled in Phase 11.

- [ ] **Step 8: Implement build/static security checks**

`scripts/check-tools-security.mjs` scans `src/tools/engines`, `src/tools/boundaries`, `src/tools/workers` and fails on direct occurrences of:

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
```

It also fails on `innerHTML` outside an explicitly allowlisted future safe-rich-output file; this plan creates no such privileged file.

`scripts/check-tools.mjs` imports the catalog and release manifest and validates ids/routes/profile resolution/local execution.

- [ ] **Step 9: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm check:tools
corepack pnpm check
```

Expected: controller/watchdog tests pass, scanner finds no forbidden network/eval/HTML sink in Tools security-sensitive directories.

- [ ] **Step 10: Commit**

```bash
git add src/tools/runtime src/tools/analytics src/tools/ads scripts/check-tools.mjs scripts/check-tools-security.mjs tests/tools/runtime package.json
git commit -m "feat(tools): add local runtime and policy seams"
```

---

### Task 6: Proof tool 1 — Percentage Calculator, generic numeric path and EN/PT-BR pair

**Files:**
- Create: `src/tools/registry/definitions/percentage-calculator.ts`
- Create: `src/tools/content/en/percentage-calculator.ts`
- Create: `src/tools/content/pt-BR/percentage-calculator.ts`
- Create: `src/tools/boundaries/percentage.ts`
- Create: `src/tools/engines/percentage.ts`
- Create: `src/tools/ui/GenericToolForm.astro`
- Create: `src/tools/ui/ToolStatus.astro`
- Test: `tests/tools/engines/percentage.test.ts`
- Modify: loader maps and catalog

**Interfaces:**
- Produces: first real `generic` tool; first reciprocal EN/PT-BR route pair.
- Engine input/output:

```ts
export interface PercentageInput { readonly percentage: number; readonly value: number }
export interface PercentageOutput { readonly result: number }
```

- [ ] **Step 1: Write failing engine tests**

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { calculatePercentage } from "../../../src/tools/engines/percentage.ts";

test("calculates X percent of Y deterministically", () => {
  assert.deepEqual(calculatePercentage({ percentage: 15, value: 200 }), { result: 30 });
});

test("accepts negative values but rejects non-finite input at boundary", async () => {
  assert.deepEqual(calculatePercentage({ percentage: 25, value: -40 }), { result: -10 });
});
```

Boundary tests belong beside the engine tests or a focused security test and must cover 128-char token cap and non-finite rejection.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/percentage.test.ts
```

Expected: FAIL because engine is absent.

- [ ] **Step 3: Implement minimal pure engine**

```ts
export function calculatePercentage(input: PercentageInput): PercentageOutput {
  return { result: (input.percentage / 100) * input.value };
}
```

Default engine wrapper returns the typed success result. No locale/DOM knowledge.

- [ ] **Step 4: Implement N-MATH boundary**

Read raw fields as strings, enforce <=128 chars each, parse finite numbers only, return `INVALID_INPUT` or `LIMIT_EXCEEDED` safely.

- [ ] **Step 5: Define exact routes and content**

EN:

```text
/tools/calculators/percentage-calculator/
```

PT-BR:

```text
/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/
```

Definition:

```ts
execution: { preferred: "browser", fallback: "none", serverRequired: false, isolation: "main-thread", load: "eager-tiny" }
security: { profileId: "N-MATH" }
ads: { class: "eligible" }
privacy: { localProcessing: true }
```

Content files own title/H1/description/field/result/error copy exactly once per locale.

- [ ] **Step 6: Build the first generic semantic form**

`GenericToolForm.astro` renders label/input/button/result/status from definition metadata and attaches one client controller module. It must use native labels, button type, `aria-live` status and text-safe result sinks.

Do not style it as final product design.

- [ ] **Step 7: Add loaders/catalog and verify locale SEO**

The EN page must emit self-canonical EN + reciprocal `hreflang="pt-BR"`; PT-BR does the reverse. No `x-default` is emitted.

- [ ] **Step 8: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected files:

```text
dist/tools/calculators/percentage-calculator/index.html
dist/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/index.html
```

Both contain correct `lang`, canonical and reciprocal alternate metadata.

- [ ] **Step 9: Commit**

```bash
git add src/tools/registry src/tools/content src/tools/boundaries/percentage.ts src/tools/engines/percentage.ts src/tools/ui src/tools/runtime tests/tools/engines/percentage.test.ts
git commit -m "feat(tools): add percentage calculator proof"
```

---

### Task 7: Proof tool 2 — JSON Formatter with bounded structured-text path

**Files:**
- Create: `src/tools/registry/definitions/json-formatter.ts`
- Create: `src/tools/content/en/json-formatter.ts`
- Create: `src/tools/boundaries/json.ts`
- Create: `src/tools/engines/json-formatter.ts`
- Test: `tests/tools/engines/json-formatter.test.ts`
- Test: `tests/tools/security/json-boundary.test.ts`
- Modify: loader maps/catalog

**Interfaces:**
- Input: `{ readonly text: string; readonly indent: 2 | 4 }`
- Output: `{ readonly formatted: string }`
- Security: `S-JSON` hard caps: 2 MiB input, depth 128, 200,000 traversed nodes, 5 MiB output.

- [ ] **Step 1: Write failing formatter and boundary tests**

Cover:

- stable 2-space formatting;
- invalid JSON -> `INVALID_INPUT`;
- exact depth 128 accepted where structurally valid;
- depth 129 rejected before expensive derived work;
- 200,001 traversed nodes rejected;
- output >5 MiB rejected;
- attacker-controlled keys such as `__proto__` are treated as data and never merged into app state.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/json-formatter.test.ts tests/tools/security/json-boundary.test.ts
```

Expected: FAIL because modules are absent.

- [ ] **Step 3: Implement bounded JSON boundary**

Order:

```text
UTF-8 byte count <= 2 MiB
-> lexical depth preflight <=128
-> JSON.parse
-> iterative node count <=200,000
-> canonical typed input
```

Use an iterative stack for node count; do not recursively traverse attacker depth.

- [ ] **Step 4: Implement pure formatter engine**

```ts
const formatted = JSON.stringify(parsed, null, indent);
```

Measure UTF-8 output bytes before returning. Output is text only; never inject as HTML.

- [ ] **Step 5: Register EN route**

```text
/tools/developer/json-formatter/
```

Use generic textarea/select form metadata. Do not create a PT-BR route yet; Phase 17 owns the full localization wave.

- [ ] **Step 6: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected: JSON route builds; static security scan finds no eval/network/unsafe HTML sink.

- [ ] **Step 7: Commit**

```bash
git add src/tools/registry/definitions/json-formatter.ts src/tools/content/en/json-formatter.ts src/tools/boundaries/json.ts src/tools/engines/json-formatter.ts src/tools/runtime tests/tools/engines/json-formatter.test.ts tests/tools/security/json-boundary.test.ts
git commit -m "feat(tools): add bounded json formatter proof"
```

---

### Task 8: Proof tool 3 — Image Resizer with native browser decode/canvas path

**Files:**
- Create: `src/tools/registry/definitions/image-resizer.ts`
- Create: `src/tools/content/en/image-resizer.ts`
- Create: `src/tools/boundaries/image-raster.ts`
- Create: `src/tools/engines/image-resizer.client.ts`
- Create: `src/tools/ui/renderers/ImageResizer.astro`
- Test: `tests/tools/security/image-raster.test.ts`
- Modify: loader maps/catalog

**Interfaces:**
- Proof input formats: PNG and JPEG only; tightening the broader raster profile is allowed.
- Hard caps remain: encoded <=25 MiB, width/height <=12,000, pixels <=80 MP, output <=50 MiB.
- Output is a local Blob/Object URL; no upload.

- [ ] **Step 1: Write failing binary preflight tests**

Use tiny synthetic `Uint8Array` fixtures; do not allocate huge bitmaps. Cover:

- PNG signature + dimensions;
- JPEG SOF dimension discovery through bounded segment scanning;
- file >25 MiB rejected before decode;
- width 12,001 rejected;
- pixel product 80 MP + 1 rejected;
- extension/MIME mismatch does not override actual bytes;
- unsupported WebP in this tightened proof profile returns `UNSUPPORTED_FORMAT` rather than silently decoding.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/security/image-raster.test.ts
```

Expected: FAIL because image preflight module is absent.

- [ ] **Step 3: Implement safe PNG/JPEG header preflight**

`image-raster.ts` exports a pure byte function:

```ts
export interface RasterHeader { readonly format: "png" | "jpeg"; readonly width: number; readonly height: number }
export function inspectRasterHeader(bytes: Uint8Array): ToolExecutionResult<RasterHeader>;
```

JPEG scanning must cap examined header bytes/segments to the provided buffer and reject truncated/invalid lengths rather than seeking beyond bounds.

- [ ] **Step 4: Implement browser-only resize engine**

`image-resizer.client.ts`:

1. receives a boundary-approved `File` plus canonical target dimensions;
2. uses `createImageBitmap` when available;
3. verifies decoded dimensions again;
4. draws to a local Canvas/OffscreenCanvas path;
5. exports PNG/JPEG according to explicit user output choice;
6. rejects output >50 MiB;
7. never calls network APIs;
8. returns Blob metadata, not an unreleased global Object URL.

Renderer/runtime owns Object URL creation/revocation on replace/reset/navigation.

- [ ] **Step 5: Register EN route and specialized renderer**

```text
/tools/image/image-resizer/
```

Definition uses `renderer: "image-resizer"`, `profileId: "I-RASTER"`, `ads.class: "eligible-private"`, `serverRequired:false`, local privacy copy.

Renderer uses `<input type="file" accept="image/png,image/jpeg">`, numeric width/height fields and explicit format select. It must not read the file until the user invokes Resize.

- [ ] **Step 6: Verify Node security tests and production build**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected: binary preflight tests pass; route builds; no network API exists in boundary/engine.

- [ ] **Step 7: Perform one browser smoke in the isolated development environment**

Run:

```bash
corepack pnpm dev
```

Open `/tools/image/image-resizer/`, resize a known small PNG fixture, download the result, then confirm no upload/processing request appears in the browser network log. Record this as Phase-12 evidence; do not call it a full Phase-19 browser audit.

- [ ] **Step 8: Commit**

```bash
git add src/tools/registry/definitions/image-resizer.ts src/tools/content/en/image-resizer.ts src/tools/boundaries/image-raster.ts src/tools/engines/image-resizer.client.ts src/tools/ui/renderers/ImageResizer.astro src/tools/runtime tests/tools/security/image-raster.test.ts
git commit -m "feat(tools): add local image resizer proof"
```

---

### Task 9: Proof tool 4 — Regex Tester with disposable Worker and 1.5 s hard kill

**Files:**
- Create: `src/tools/registry/definitions/regex-tester.ts`
- Create: `src/tools/content/en/regex-tester.ts`
- Create: `src/tools/boundaries/regex.ts`
- Create: `src/tools/engines/regex.ts`
- Create: `src/tools/workers/regex.worker.ts`
- Create: `src/tools/ui/renderers/RegexTester.astro`
- Test: `tests/tools/engines/regex.test.ts`
- Test: `tests/tools/security/regex-boundary.test.ts`
- Modify: runtime loader maps

**Interfaces:**
- Input: `{ pattern: string; subject: string; flags: string }`.
- Output: bounded match descriptors only; no subject copy in telemetry.
- Hard caps: pattern <=10 KiB, subject <=1 MiB, <=10,000 results, 1,500 ms Worker watchdog.

- [ ] **Step 1: Write failing safe-regex engine and boundary tests**

Test:

- normal global matches;
- zero-length global match advances safely;
- duplicate/unsupported flags rejected;
- pattern 10 KiB + 1 rejected;
- subject 1 MiB + 1 rejected;
- result count stops at 10,000 with a bounded status.

Do not run a catastrophic regex on the main Node test thread.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/engines/regex.test.ts tests/tools/security/regex-boundary.test.ts
```

Expected: FAIL because modules are absent.

- [ ] **Step 3: Implement pure safe-case match extraction**

`regex.ts` may construct `RegExp` because this tool explicitly tests regex; it must never use eval/new Function. Return only:

```ts
interface RegexMatch {
  readonly index: number;
  readonly match: string;
  readonly groups: readonly string[];
}
```

Cap result count and manually advance `lastIndex` after zero-length global/sticky matches.

- [ ] **Step 4: Implement the dedicated Worker**

`regex.worker.ts` accepts a typed operation envelope, invokes the regex engine, posts a typed result, and performs no network/importScripts/provider access.

The Worker itself does not own the security timeout. Parent runtime owns hard termination.

- [ ] **Step 5: Wire the Worker through `runWorkerWithWatchdog(..., 1500)`**

Worker is disposable per user operation by default. Timeout/cancel always calls `terminate()` and returns typed `TIMEOUT`/`ABORTED`; there is no retry or server fallback.

- [ ] **Step 6: Register EN route and specialized renderer**

```text
/tools/developer/regex-tester/
```

Renderer includes pattern, flags and subject inputs; test button; cancel when running; text-safe match display; no raw HTML.

- [ ] **Step 7: Verify automated suite**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected: safe cases pass; static scanner confirms no network/eval/unsafe sink.

- [ ] **Step 8: Verify the hard kill in a real browser**

In the isolated dev build, submit a known pathological backtracking pattern/subject chosen to exceed the 1.5 s budget. Expected behavior:

```text
Worker terminates
-> UI receives TIMEOUT
-> page remains responsive
-> no automatic retry
-> no backend request
```

Keep the fixture bounded so the browser/CI host cannot be exhausted.

- [ ] **Step 9: Commit**

```bash
git add src/tools/registry/definitions/regex-tester.ts src/tools/content/en/regex-tester.ts src/tools/boundaries/regex.ts src/tools/engines/regex.ts src/tools/workers/regex.worker.ts src/tools/ui/renderers/RegexTester.astro src/tools/runtime tests/tools/engines/regex.test.ts tests/tools/security/regex-boundary.test.ts
git commit -m "feat(tools): add isolated regex tester proof"
```

---

### Task 10: Catalog-driven discovery, category hubs, local search and relations

**Files:**
- Create: `src/tools/search/build-index.ts`
- Test: `tests/tools/search/search-index.test.ts`
- Modify: Tools root/category pages
- Modify: `src/tools/build/site-release-manifest.ts`
- Modify: `src/tools/registry/definitions/*.ts` relations
- Modify: `scripts/check-tools.mjs`

**Interfaces:**
- Produces: one compact public search index per locale from catalog/content only; category-hub index policy; validated related-tool ids.

- [ ] **Step 1: Write failing local-index tests**

Assert the EN index contains exactly the four proof tools with only public metadata fields:

```text
id
title
aliases
keywords
category
canonicalPath
description
```

Assert it contains no security limits, engine module strings, user data, file data, telemetry state or unpublished PT-BR entries.

Assert PT-BR index contains only Percentage Calculator at this proof stage.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/tools/search/search-index.test.ts
```

Expected: FAIL because `build-index.ts` is absent.

- [ ] **Step 3: Implement deterministic index generation**

`buildSearchIndex(locale)` consumes validated catalog + locale content, sorts by localized title then id, and returns serializable public records.

No semantic/AI search dependency is introduced.

- [ ] **Step 4: Implement hash-state search on root pages**

Root search uses client-local state such as:

```text
/tools/#q=json
```

Never create crawlable `/tools/search?q=...` result URLs. Search must function without a backend.

- [ ] **Step 5: Enforce category-hub indexing threshold**

With the proof set:

```text
calculators = 1 proof tool -> noindex,follow
image       = 1 proof tool -> noindex,follow
developer   = 2 proof tools -> noindex,follow
```

Do not artificially add dummy tools/content to reach the threshold. The root can remain a meaningful indexable discovery page once its own content is substantial enough; otherwise mark it conservatively until Phase 13/15 content fills it.

- [ ] **Step 6: Add only semantically justified related links**

Relations are stable ids. Do not force every proof tool to link to all three others merely to hit a count. Validate no missing/duplicate/self relation.

- [ ] **Step 7: Verify GREEN**

```bash
corepack pnpm test:tools
corepack pnpm build
corepack pnpm check:tools
```

Expected: search index tests pass; category pages use correct noindex state; no query-result route is generated.

- [ ] **Step 8: Commit**

```bash
git add src/tools/search src/tools/registry/definitions src/tools/build/site-release-manifest.ts src/pages/tools src/pages/pt-br/ferramentas scripts/check-tools.mjs tests/tools/search/search-index.test.ts
git commit -m "feat(tools): add catalog driven discovery"
```

---

### Task 11: Preserve commercial acceptance while adding Tools build/security gates

**Files:**
- Modify: `scripts/check-acceptance.mjs`
- Modify: `scripts/check-routes.mjs`
- Modify: `scripts/check-tools.mjs`
- Modify: `scripts/check-tools-security.mjs`
- Modify: `package.json`
- Modify: `public/_headers` only for proven static Tool/Worker policy
- Test: all `tests/tools/**`

**Interfaces:**
- Produces: one repeatable local validation command covering legacy commercial checks plus the new Tools foundation.

- [ ] **Step 1: Add failing acceptance assertions for Tools invariants**

Before changing implementation scripts, extend the check to require:

- four proof ids exist;
- Percentage has EN/PT-BR pair;
- all proof operations declare `serverRequired=false`;
- all proof tools resolve valid security profiles;
- no forbidden network APIs in engines/boundaries/workers;
- no service-worker registration;
- no client framework dependency;
- Tools canonical routes use trailing slash;
- demo routes remain noindex/ad-free;
- commercial routes remain present.

Run the check and confirm the newly added assertion fails until its corresponding implementation/check module is wired.

- [ ] **Step 2: Update package validation pipeline**

Final scripts must expose:

```json
{
  "test:tools": "node scripts/run-tools-tests.mjs",
  "check:tools": "node scripts/check-tools.mjs && node scripts/check-tools-security.mjs",
  "validate": "prettier --check . && astro check && node scripts/run-tools-tests.mjs && astro build && node scripts/check-routes.mjs && node scripts/check-tools.mjs && node scripts/check-tools-security.mjs && node scripts/check-acceptance.mjs"
}
```

Keep `check:release` separate because production release gates are intentionally not satisfied yet.

- [ ] **Step 3: Preserve static security headers and add only justified scopes**

`public/_headers` must continue to include the existing global security headers and demo noindex header.

If emitted same-origin Worker assets can be targeted reliably by a stable path in the current Astro build, add a restrictive Worker CSP there. If Astro hashes Worker output into an unstable path that cannot be safely targeted with `_headers`, record this as a Phase-19 host-verification item rather than writing a fake broad rule. Do not weaken global CSP to make a test pass.

- [ ] **Step 4: Run the complete local gate**

```bash
corepack pnpm validate
corepack pnpm check:release
```

Expected:

- `validate`: PASS.
- `check:release`: may intentionally remain non-zero because external production URL/domain/release gates are not part of Phase 10–12. Capture the exact expected blockers; do not “fix” them by fabricating production state.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts public/_headers
git commit -m "test(tools): enforce sdk security and route gates"
```

---

### Task 12: Phase-12 proof-set evidence and checkpoint

**Files:**
- Create: `docs/tools/PHASE12_PROOF_SET_REPORT.md`
- Modify: `docs/context/TOOLS_STATE.md`
- Modify: `docs/context/TOOLS_HANDOFF.md`
- Modify: `docs/context/TOOLS_DECISIONS.md` only by appending durable implementation decisions after evidence exists

**Interfaces:**
- Consumes: completed Tasks 1–11.
- Produces: evidence that one SDK supports the four selected execution/input patterns; does not claim Phase 13–20 completion.

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

Expected: all commands above exit 0 and working tree is clean after documentation/evidence commit preparation.

- [ ] **Step 2: Verify exact proof output artifacts**

Confirm these exist:

```text
dist/tools/calculators/percentage-calculator/index.html
dist/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/index.html
dist/tools/developer/json-formatter/index.html
dist/tools/image/image-resizer/index.html
dist/tools/developer/regex-tester/index.html
```

Also confirm all legacy 16 route artifacts and `dist/404.html` still exist according to the release manifest.

- [ ] **Step 3: Verify exact SEO/locale invariants from built HTML**

Check built proof pages for:

- `<html lang="en">` on EN routes;
- `<html lang="pt-BR">` on PT-BR Percentage;
- self canonical on all proof pages;
- reciprocal EN/PT-BR hreflang only on Percentage;
- no fabricated PT-BR alternate on EN-only proof tools;
- no fallback/Pages hostname in canonical metadata;
- developer/image/calculator category hubs `noindex,follow` at this proof count;
- demo indexing behavior unchanged.

- [ ] **Step 4: Verify the economic/network invariant**

Use browser DevTools on each proof tool and perform one successful operation.

Expected network behavior:

```text
static document/assets/chunks: allowed
optional production Ads/analytics: not enabled in this proof phase
MenezesDev processing API request: ZERO
user file/text upload: ZERO
```

For Image Resizer, confirm file bytes remain local. For Regex, confirm timeout uses Worker termination rather than a server fallback.

- [ ] **Step 5: Verify security boundary representatives**

Run/record:

- Percentage: 129-character numeric token rejected;
- JSON: depth 129 rejected and oversized input rejected;
- Image: giant declared dimensions rejected before full decode where header preflight can determine them;
- Regex: pathological job terminates at the hard watchdog and UI remains responsive;
- static scanner: zero forbidden network APIs/eval/service-worker registration in protected directories.

- [ ] **Step 6: Write `PHASE12_PROOF_SET_REPORT.md` from observed evidence only**

Required sections:

```text
Commit under test
Commands + exit status
Legacy regression result
Proof tools + routes
Security boundary evidence
Worker/cancellation evidence
Network/backend-request evidence
Locale/SEO evidence
Known limitations deliberately deferred
Phase-13 gate status
```

Do not write “production ready”. Do not mark all 50 tools complete. Do not claim browser checks that were not actually run.

- [ ] **Step 7: Update Tools context accurately**

If and only if evidence passes:

- Phase 10 = CLOSED;
- Phase 11 = CLOSED only if the SDK foundation gate is actually met;
- Phase 12 = CLOSED only if one SDK demonstrably supports the proof diversity;
- Phase 13 = next legal phase / design-system gate;
- Launch 50 remains incomplete;
- production remains unreleased.

If any gate fails, leave that phase open and record the exact blocker instead.

- [ ] **Step 8: Commit evidence**

```bash
git add docs/tools/PHASE12_PROOF_SET_REPORT.md docs/context/TOOLS_STATE.md docs/context/TOOLS_HANDOFF.md docs/context/TOOLS_DECISIONS.md
git commit -m "docs(tools): record phase 12 proof set evidence"
```

- [ ] **Step 9: Request code review before advancing to Phase 13**

Invoke `superpowers:requesting-code-review` against the complete Phase 10–12 diff. Resolve findings through `superpowers:receiving-code-review`, rerun the full verification set, and only then consider the Phase-12 checkpoint complete.

---

## Phase-9 Plan Self-Review Checklist

Before treating this plan as approved for execution, verify against the Phase-5/6/7/8 contracts:

- [ ] Phase-10 branch starts from the latest verified commercial implementation base, not stale `main`.
- [ ] `main` stays untouched.
- [ ] Existing commercial/demo acceptance checks are preserved.
- [ ] Canonical identity is explicit before switching Astro output to `preserve`.
- [ ] Tool catalog is serializable/data-only.
- [ ] Boundary and engine execution resolves through allowlisted ids.
- [ ] All 19 approved security profiles are representable with exact hard caps.
- [ ] Overrides tighten only.
- [ ] Protected engine/boundary/Worker directories have zero ambient network authority.
- [ ] Runtime errors are typed and content-free.
- [ ] Ads/analytics are no-op-capable and do not affect correctness.
- [ ] No real Ads/native provider is enabled.
- [ ] No Cloudflare production security resources are created.
- [ ] All four proof tools are C0 / browser-local / `serverRequired=false`.
- [ ] Percentage proves a generic numeric path plus real EN/PT-BR reciprocal metadata.
- [ ] JSON proves structured input byte/depth/node/output bounds.
- [ ] Image Resizer proves native hostile-file preflight and local binary output without a third-party codec.
- [ ] Regex proves a disposable Worker and parent-owned 1.5 s hard termination.
- [ ] No conditional dependency enters the proof set.
- [ ] No speculative WASM framework enters the foundation.
- [ ] Local search is generated from public metadata and uses non-crawlable hash state.
- [ ] Category hubs do not become indexable merely to make the proof set look larger.
- [ ] Proof verification explicitly checks zero backend-processing requests.
- [ ] Phase 13/14/15 remain separate future gates.

## Execution Boundary

This plan is the Phase-9 deliverable. Writing or approving it does **not** itself create `feat/tools-platform`, install dependencies, edit runtime code, configure Cloudflare production controls, or publish Tools.

After the plan is committed, self-reviewed and approved, execution begins at Task 1 under the required Superpowers execution/worktree/TDD/review skills.
