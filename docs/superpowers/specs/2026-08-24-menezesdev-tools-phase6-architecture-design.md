# MenezesDev Tools — Phase 6 Tools Architecture Design

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 6 — Tools architecture design spec  
**Superpowers path:** Architectural  
**Status:** **WRITTEN SPEC — AWAITING USER REVIEW**  
**Parent workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md`  
**Binding security:** `docs/tools/SECURITY_POLICY.md`  
**Binding portability addendum:** `docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`  
**Approved SEO/IA contract:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`  
**Frozen launch matrix:** `docs/tools/LAUNCH50_FROZEN.md`  
**Capability map:** `docs/tools/CAPABILITY_MAP.md`  
**Authority:** the concrete Phase-6 architecture was presented in chat and approved by Gabriel Menezes with `Vai` before this file was written.

---

# 1. Purpose

Define the implementation architecture that lets MenezesDev ship the frozen Launch 50 as a static-first, browser-first, international Tools platform without turning the existing commercial Astro application into a monolith.

This design specifies:

- how the existing Astro app is reconciled with Tools;
- module boundaries;
- Tool SDK semantics;
- registry and content ownership;
- runtime adapters;
- browser/Worker/WASM boundaries;
- shared security interfaces;
- locale and SEO interfaces;
- analytics and advertising seams;
- result/error handling;
- dependency isolation and lazy loading;
- testing layers;
- provider-neutral build boundaries;
- integration-branch expectations for later implementation.

This phase does **not** implement those modules. Phase 7 and Phase 8 still refine security and traffic/cost policy before Phase 9 implementation planning.

---

# 2. Existing application base

The actual implemented MenezesDev application currently lives on:

```text
feat/phase-10-implementation
@ 152fab910296f29cfae2e07bf6ccc2c69f0ce0df
```

At the time of this design that branch contains:

- Astro 7.2.4;
- static output;
- TypeScript 6.0.3;
- Tailwind CSS 4.3.3 through Vite;
- pnpm 11.22.0;
- Node 24;
- Lucide Astro;
- semantic Astro components;
- minimal vanilla browser JavaScript;
- no React/Vue/Svelte runtime requirement.

Important current reconciliation facts:

- `BaseLayout.astro` is PT-BR/commercial-site oriented;
- `siteConfig.locale` is fixed to `pt-BR`;
- canonical generation currently depends on `Astro.url.pathname`;
- current `astro.config.mjs` uses `build.format: "file"` and `trailingSlash: "never"`;
- current sitemap only includes Home and `/projetos/**`;
- current route validation hard-codes the legacy 16-route set;
- `/demo/**` remains deliberately non-indexed;
- commercial/portfolio/demo surfaces must remain logically isolated from monetized Tools.

These are architecture inputs, not permission to patch code during Phase 6.

---

# 3. Considered approaches

## Option A — universal schema renderer

A single generic renderer interprets every field, result and interaction from schema.

**Rejected as the primary architecture.** It looks scalable for simple calculators but turns image crop, PDF merge/split, regex and editor-like tools into a large UI programming language with accessibility and maintenance special cases.

## Option B — bespoke page per tool

Each tool owns its own page, validation, engine binding and UI.

**Rejected.** It duplicates SEO, security, localization, analytics, ads and runtime plumbing across 50 tools and makes 100/200+ growth expensive.

## Option C — hybrid typed Tool SDK

Use a typed build-time catalog plus shared runtime contracts, generic UI primitives for ordinary calculators/text utilities, and specialized renderers only where interaction genuinely differs.

**Selected.** It preserves strong common gates without forcing rich tools into a universal renderer.

---

# 4. Core principles

1. Registry/catalog is metadata, not executable business logic.
2. Tool identity is stable and independent from locale routes.
3. Engines do not know Astro, DOM, Ads, analytics or locale copy.
4. Raw user input never bypasses an applicable boundary.
5. Ordinary Launch-50 execution remains local.
6. A browser Web Worker is isolation, not backend execution.
7. Heavy code is lazy and engine scoped.
8. Tool correctness never depends on Ads or analytics.
9. Locale content is build-time/static, not a large runtime i18n payload.
10. SEO/search/related-tool data derives from authoritative catalog data rather than duplicate lists.
11. Commercial/demo architecture stays separate from Tools concerns.
12. Git + reproducible static build remain source of truth.
13. Cloudflare-specific APIs do not enter browser-capable engine logic.
14. Phase 7/8 policy may strengthen runtime gates without changing pure engine semantics.

---

# 5. High-level architecture

```text
                       Tool Catalog
                  build-time serializable data
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
     locale content      routes/SEO      relations/search
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
                     Astro static SSG
                            │
                            ▼
                     ToolLayout HTML
                            │
                    interaction only
                            ▼
                  Tool Runtime Controller
                            │
                            ▼
             validate → bound → canonicalize
                            │
                            ▼
                    typed canonical input
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
      main thread       Web Worker        WASM Worker
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
                       typed result
                            │
                            ▼
                    safe output renderer
```

No frozen Launch-50 ordinary operation crosses into a MenezesDev backend-processing endpoint.

---

# 6. Module boundaries

Conceptual structure:

```text
src/
├── components/
│   └── seo/
│       └── DocumentHead.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── ToolLayout.astro
├── tools/
│   ├── core/
│   ├── registry/
│   │   └── definitions/
│   ├── content/
│   │   ├── en/
│   │   └── pt-BR/
│   ├── boundaries/
│   ├── engines/
│   ├── runtime/
│   │   ├── controller.ts
│   │   ├── main-thread.ts
│   │   ├── worker.ts
│   │   ├── wasm-worker.ts
│   │   ├── boundary-loaders.client.ts
│   │   └── engine-loaders.client.ts
│   ├── workers/
│   ├── ui/
│   │   ├── primitives/
│   │   └── renderers/
│   ├── seo/
│   ├── search/
│   ├── analytics/
│   ├── ads/
│   └── errors/
└── pages/
    ├── tools/
    │   ├── index.astro
    │   ├── [category]/index.astro
    │   └── [category]/[slug]/index.astro
    └── pt-br/ferramentas/
        ├── index.astro
        ├── [category]/index.astro
        └── [category]/[slug]/index.astro
```

Exact filenames may be refined by the Phase-9 plan, but the responsibility boundaries are binding.

`core/` contains contracts only. `registry/` is build-safe data. `content/` owns human-readable locale copy. `boundaries/` convert untrusted UI input into canonical engine input. `engines/` contain computation. `runtime/` selects execution and cancellation. `workers/` isolate expensive/untrusted work. `ui/` owns presentation. SEO/search/analytics/ads consume metadata without entering engines.

---

# 7. Stable Tool identity

Every tool has one stable machine id such as:

```text
loan-calculator
json-validator
merge-pdf
image-compressor
```

The id is not a translated slug and does not change when a public route changes.

Example:

```text
id: loan-calculator

en:    /tools/calculators/loan-calculator/
pt-BR: /pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/
```

Stable ids are used for engine binding, boundaries, relations, telemetry, tests, Tool Factory references and internal configuration.

---

# 8. ToolDefinition is data-only

The canonical catalog must be serializable ordinary data where practical.

Semantics equivalent to:

```ts
interface ToolDefinition {
  id: ToolId
  category: ToolCategory
  routes: ToolRouteMap
  ui: ToolUiDefinition
  execution: ToolExecutionProfile
  boundary: ToolBoundaryBinding
  engineId: EngineId
  output: ToolOutputDefinition
  security: ToolSecurityProfile
  seoPolicy: ToolSeoPolicy
  relations: ToolRelations
  analytics: ToolAnalyticsDefinition
  ads: ToolAdsDefinition
  privacy: ToolPrivacyDefinition
}
```

The catalog must **not** store:

- imported engine functions;
- executable boundary functions;
- DOM nodes;
- provider clients;
- arbitrary module paths;
- localized title/description duplicate copies.

Executable boundaries and engines resolve through allowlisted ids/manifests.

Localized SEO copy is authored once in locale content and resolved into page metadata at build time.

---

# 9. Route model

Tool route metadata represents the exact approved Phase-5 paths.

```ts
interface ToolRouteEntry {
  locale: "en" | "pt-BR"
  categorySlug: string
  toolSlug: string
  canonicalPath: string
  indexPolicy: "index" | "noindex"
}

type ToolRouteMap = Partial<Record<"en" | "pt-BR", ToolRouteEntry>>
```

Canonical path is explicit data and is **not** derived from `Astro.url.pathname`.

This is required because locale slugs differ, fallback hosts are not canonical origins, and `build.format: "preserve"` changes build-time path semantics for non-index source files.

---

# 10. Static generation

Tools remain static-generated.

Canonical page templates:

```text
src/pages/tools/[category]/[slug]/index.astro
src/pages/pt-br/ferramentas/[category]/[slug]/index.astro
```

Both use `getStaticPaths()` to enumerate only registry-approved routes at build time.

No user-controlled runtime path creates arbitrary tool pages.

Category/root pages also derive published tools from the same catalog.

---

# 11. Build-format reconciliation

Approved target:

```text
output: "static"
build.format: "preserve"
trailingSlash: "ignore"
```

## 11.1 `preserve`

Current commercial source files such as `src/pages/projetos/m47.astro` can remain flat output files, while Tools use nested `index.astro` source routes that materialize directory `index.html` artifacts.

Current Astro documentation confirms `build.format: "preserve"` preserves source-file form.

## 11.2 `trailingSlash: "ignore"`

Astro's trailing-slash setting controls development/on-demand matching. For prerendered pages, production hosting behavior controls actual slash normalization.

Therefore:

- Phase-5 Tools canonicals remain trailing-slash URLs;
- deploy-layer rules must normalize non-slash Tools requests to canonical slash URLs where the provider supports it;
- Phase 19 verifies one-hop behavior;
- no engine depends on routing behavior.

## 11.3 Never infer canonical from output filename

With `preserve`, build-time `Astro.url` can include `.html` for flat pages. After integration, neither commercial nor Tools canonical metadata may blindly use `Astro.url.pathname` as canonical source.

The neutral metadata layer receives explicit canonical paths.

## 11.4 Fallback compatibility

`preserve` does not guarantee identical clean-URL behavior on every static host.

Provider neutrality therefore requires at least one approved fallback host to be verified against the canonical route contract. GitHub Pages is preferred only when compatible; another approved free/static fallback may be the verified fallback if clean-route behavior differs.

---

# 12. Neutral document metadata

Do not turn the current commercial `BaseLayout.astro` into a Tools monolith.

Extract/share a neutral head primitive with semantics equivalent to:

```ts
interface DocumentMetadata {
  locale: "en" | "pt-BR"
  title: string
  description: string
  canonicalPath: string
  indexPolicy: "index" | "noindex"
  alternates: LocaleAlternate[]
  social?: SocialMetadata
  structuredData?: StructuredDataDescriptor[]
}
```

A component such as `DocumentHead.astro` may be used by commercial `BaseLayout`, `ToolLayout` and future guide layouts.

It must not impose Tools navigation, Ads or theme onto commercial/demo surfaces.

---

# 13. ToolLayout

`ToolLayout.astro` owns Tools page chrome and semantic structure:

- correct `<html lang>`;
- Tools navigation shell;
- utility-first content order;
- breadcrumb presentation;
- related-tool presentation;
- future reserved ad-slot regions;
- privacy/status message areas;
- localized error/status regions.

It does not execute engines and has no dependency on commercial WhatsApp/CTA behavior.

---

# 14. UI model: generic primitives + specialized renderers

Shared primitives cover ordinary controls/results, for example:

- number/text/date/select/list/file inputs;
- submit/reset/cancel;
- copy/download;
- scalar/table/text result;
- progress/status region;
- accessible inline validation.

Simple calculators may use generic composition.

Specialized renderer ids are allowed for genuine interaction differences such as:

- Image Cropper;
- Merge PDF;
- Split PDF;
- Markdown Previewer;
- Regex Tester.

Specialized rendering never bypasses boundary/runtime/security contracts.

Conceptual metadata:

```ts
interface ToolUiDefinition {
  renderer: "generic" | SpecializedRendererId
  inputs?: ToolInputFieldDefinition[]
  primaryAction: ToolActionKind
  resultKind: ToolResultKind
  supportsReset: boolean
  supportsCancel?: boolean
  supportsDownload?: boolean
}
```

UI metadata contains presentation declarations, not formulas.

---

# 15. Boundary binding is metadata, execution is allowlisted

Catalog binding:

```ts
interface ToolBoundaryBinding {
  boundaryId: BoundaryId
  profileId: SecurityProfileId
}
```

The boundary implementation lives in code and resolves through an allowlisted boundary registry/loader.

User input never chooses arbitrary boundary modules.

This keeps ToolDefinition serializable while preserving a strict executable boundary.

---

# 16. Mandatory input pipeline

Every applicable tool follows:

```text
raw UI input
    ↓
pre-parse size/work guard
    ↓
validation
    ↓
sanitization / canonicalization
    ↓
typed canonical input
    ↓
engine
    ↓
typed result
    ↓
safe output encoding/rendering
```

The boundary owns transition from untrusted input to engine input.

The engine may rely on the declared boundary contract having run but may also perform defensive assertions.

---

# 17. Executable boundary interface

Conceptual implementation contract:

```ts
interface ToolBoundary<Input> {
  parse(raw: RawToolInput, context: BoundaryContext): BoundaryResult<Input>
}
```

`BoundaryResult` is a typed result, not an exception-only contract.

Security metadata derives from Capability Map / Phase-7 security classes and supports applicable limits such as bytes, chars, fields, rows, pages, pixels, depth, accepted formats, timeout/work, active-content policy and output bounds.

Phase 6 defines the interface. Phase 7 finalizes enforcement details and hostile-fixture mapping.

---

# 18. Security metadata

Every input-accepting tool must expose semantics equivalent to:

```ts
interface ToolSecurityProfile {
  inputClass: SecurityInputClass
  maxInputBytes?: number
  maxOutputBytes?: number
  maxWork?: WorkBudget
  timeoutMs?: number
  acceptedFormats?: string[]
  acceptedProtocols?: string[]
  activeContent: "disabled" | "required-reviewed"
  sanitizationStrategy: SanitizationStrategyId
  hostileInputTests: HostileFixtureClass[]
}
```

Additional fields are required for pages/pixels/rows/depth/archive entries/etc. where relevant.

Missing applicable limits must fail catalog validation once implemented.

---

# 19. Engine contract

An engine is computation, not product chrome.

```ts
interface ToolEngine<Input, Output> {
  execute(input: Input, context: EngineContext): Promise<ToolExecutionResult<Output>>
}
```

`EngineContext` may include execution concerns such as:

- `AbortSignal`;
- bounded clock/work hooks;
- local capability flags needed for deterministic execution.

It does **not** include DOM elements, Ads, analytics, locale copy, Cloudflare bindings or a generic network client.

Synchronous engines may be adapted to the Promise contract.

---

# 20. Engine-family reuse

Different user/search intents may share engine primitives.

Examples:

```text
finance primitives
├── loan-calculator
├── mortgage-calculator
├── amortization-calculator
└── auto-loan-calculator
```

```text
rational arithmetic
├── decimal-to-fraction-calculator
└── fraction-calculator
```

```text
Canvas image primitives
├── image-resizer
├── image-cropper
├── jpg-to-png
└── png-to-jpg
```

Shared engine does not collapse approved Phase-5 URLs.

---

# 21. Execution profile

Every tool preserves immutable runtime semantics:

```ts
interface ToolExecutionProfile {
  preferred: "browser"
  fallback: "wasm" | "worker" | "none"
  serverRequired: boolean
  isolation: "main-thread" | "worker" | "wasm-worker"
  load: "eager-tiny" | "lazy"
}
```

For the frozen Launch 50:

```text
serverRequired = false
```

for ordinary operations.

The extra `isolation` field distinguishes browser location from thread strategy without weakening the parent workflow semantics.

---

# 22. Main-thread execution

Use main thread for bounded work that is demonstrably fast enough not to hurt responsiveness, such as scalar finance/math, URL encoding, UUID/password generation, small text transforms, simple color math and small structured-data operations below threshold.

Do not move trivial work into Workers for symmetry.

---

# 23. Web Worker execution

Use Workers when untrusted/heavy work can block UI or when termination is a security control.

Representative Launch-50 classes include:

- Regex Tester;
- Text Diff;
- HTML Formatter;
- PDF structural operations;
- large statistics input above threshold;
- Markdown parse/render preparation where configured.

Worker adapters support:

- typed request/response messages;
- operation id;
- cancellation;
- hard termination on timeout where required;
- safe exception normalization;
- no implicit network calls.

---

# 24. Worker construction and dependency isolation

Preferred flow:

```text
ToolDefinition
  ↓ engineId
allowlisted client loader
  ↓
specific Worker factory / dynamic chunk
  ↓
engine-family dependency only
```

Avoid one giant Worker that imports every parser/codec.

A PDF tool must not cause PDF code to enter calculator/text bundles.

---

# 25. WASM boundary

WASM remains local execution.

Use it only when an audited engine materially improves safety, performance, parser behavior or resource control.

The SDK supports `wasm-worker` as a declared runtime class, but Launch 50 does not receive a speculative generic WASM framework if none of the frozen capabilities actually needs one after admission review.

---

# 26. No ordinary backend processing for Launch 50

The frozen 50 expose no normal per-operation MenezesDev processing endpoint.

Later tests must prove ordinary operations do not invoke a MenezesDev compute API.

Optional Ads/analytics network activity is separate and cannot be required for correctness.

A future server-required tool is a new capability/security/cost decision.

---

# 27. Engine loader manifest

Build-time catalog stores only `engineId`.

Client executable resolution is an allowlisted map such as:

```ts
const engineLoaders = {
  "finance-core": () => import("../engines/finance/core"),
  "text-diff": () => import("../engines/text/diff"),
  "pdf-structural": () => import("../runtime/pdf-worker-client"),
  "html-formatter": () => import("../runtime/html-worker-client")
} satisfies EngineLoaderMap
```

The exact names may change, but arbitrary dynamic module strings from user input are forbidden.

---

# 28. Dependency policy

A heavy/conditional dependency enters only chunks that need it.

Conditional dependencies remain uninstalled/unintegrated until their exact admission gates pass.

Phase 6 reserves architecture slots; it does not approve dependencies.

The frozen conditional tools remain:

- Image Compressor;
- HTML Formatter;
- Merge PDF;
- Split PDF.

If a conditional gate fails, use the approved reserve/substitution process rather than weaken security.

---

# 29. Lazy-loading policy

- shared tiny runtime may load with the tool surface;
- heavy engines load only when their tool needs them;
- file/parser engines may wait until operation start;
- static SEO/content/navigation never waits for a heavy engine;
- search index is not required in every tool page bundle.

Crawler-visible meaning must not depend on downloading PDF/image/formatter engines.

---

# 30. Runtime controller

Responsibilities:

1. collect raw input from renderer;
2. invoke declared boundary;
3. reject invalid/bounded input before engine load where possible;
4. load approved engine/runtime adapter;
5. execute with cancellation/timeout context;
6. normalize result/error;
7. render through approved output sinks;
8. emit privacy-safe lifecycle telemetry if an adapter is enabled.

It never sends user data to Ads/analytics, uploads local files for browser-capable tools, chooses arbitrary dependencies, changes SEO routes or decides traffic policy.

---

# 31. Result/error model

```ts
type ToolExecutionResult<T> =
  | { ok: true; value: T; meta?: SafeResultMeta }
  | { ok: false; error: ToolError }
```

Canonical error classes include:

```text
INVALID_INPUT
LIMIT_EXCEEDED
UNSUPPORTED_FORMAT
UNSUPPORTED_BROWSER
TIMEOUT
ABORTED
ENGINE_FAILURE
```

Additional safe domain codes may be added only for real needs, such as encrypted/unsupported PDF states.

A `ToolError` may expose stable code, localized message key, safe field reference and retry/cancel state. It must never expose stack trace, filesystem path, secret, raw private input or private parser payload.

Unexpected exceptions are caught at runtime boundaries and normalized to safe errors.

---

# 32. Safe output rendering

Default sinks:

- text → escaped/text-safe output;
- number → formatted text;
- table → escaped cells;
- generated file → local Blob/Object URL;
- HTML preview → only through approved sanitizer/render path;
- PDF/image output → local Blob/Object URL.

Object URLs are revoked when no longer needed.

Engine output is not trusted HTML merely because it came from internal code.

---

# 33. Locale content owns localized copy exactly once

Localized human-readable content is stored separately from executable engines and is the **single authoring source** for localized title/description/H1/labels/errors/explanations.

```ts
interface ToolLocaleContent {
  locale: "en" | "pt-BR"
  toolId: ToolId
  title: string
  h1: string
  description: string
  purpose: string
  inputLabels: Record<string, string>
  resultLabels: Record<string, string>
  errorMessages: Partial<Record<ToolErrorCode, string>>
  privacyCopy?: string
  explanation?: ToolExplanationContent
  examples?: ToolExampleContent[]
  faq?: ToolFaqItem[]
}
```

The catalog does not duplicate localized `title` or `description`.

English and PT-BR pages are statically generated separately. A page does not download all translations at runtime.

---

# 34. Locale semantics

- English is canonical authored primary content.
- PT-BR is deliberate localization, not runtime string replacement.
- Locale affects visible copy and formatting conventions where appropriate.
- Engine computation remains locale-neutral whenever possible.
- Ambiguous localized numeric parsing must follow an explicit policy; do not guess separators silently.
- Locale content cannot change formulas, security limits or execution class.
- Phase 17 owns final PT-BR linguistic/cultural QA.

---

# 35. SEO ownership: structural policy + resolved locale metadata

To avoid drift, Phase 6 separates **structural SEO policy** from **localized SEO copy**.

Catalog-level structural policy may contain:

```ts
interface ToolSeoPolicy {
  structuredData: StructuredDataKind[]
  socialImagePolicy?: SocialImagePolicy
}
```

Localized `title`/`description` live only in `ToolLocaleContent`.

At build time, the SEO resolver combines:

```text
ToolDefinition structural policy
+
ToolRouteEntry canonical/index data
+
ToolLocaleContent localized copy
+
related/breadcrumb registry data
=
ResolvedToolSeo
```

Conceptually:

```ts
interface ResolvedToolSeo {
  canonicalPath: string
  indexPolicy: "index" | "noindex"
  title: string
  description: string
  alternates: LocaleAlternate[]
  breadcrumb: BreadcrumbDescriptor[]
  structuredData: StructuredDataKind[]
}
```

This is a derived build object, not a second authoring source.

The client runtime must not mutate canonical/hreflang/title into conflicting values.

---

# 36. Canonical-origin configuration

Canonical product origin is configuration, not request-host inference.

The existing `PUBLIC_SITE_URL` concept may continue if semantics remain explicit:

- production value is the approved MenezesDev canonical origin;
- preview/fallback provider hostname does not overwrite it automatically;
- sitemap/hreflang/canonical builders consume the same origin;
- engines never read canonical-origin config.

Deploy-host identity and canonical product identity are separate concepts.

---

# 37. Category/root generation

Category/root pages derive from published catalog data.

Catalog + locale content must provide enough metadata for category membership, localized label/description, publication/index state and canonical route resolution.

Phase-5 category indexing thresholds remain binding.

---

# 38. Related-tool graph

Relations are stored by stable ids:

```ts
interface ToolRelations {
  relatedToolIds: ToolId[]
  guideIds?: GuideId[]
  topicalClusters?: string[]
}
```

Build helpers resolve ids into locale-specific URLs.

Validation rejects missing ids, duplicate ids, unjustified self-links and locale references to unpublished routes.

Future Option-B autonomy may adjust low-risk relation edges only inside approved policy.

---

# 39. Search-index architecture

The catalog/content pipeline emits one compact public metadata index per locale containing only:

- tool id;
- localized title;
- aliases/intents;
- keywords;
- category;
- canonical route;
- short description.

Search remains client-side/local and the index is loaded only where search is used.

No user tool data or private state enters this index.

No second hand-maintained route list is allowed for search.

---

# 40. Commercial route separation and site manifest

Commercial/demo routes remain their own domain model and are not forced into `ToolDefinition`.

A build-validation layer composes:

```text
commercial route manifest
+
Tools generated route manifest
=
site release manifest
```

The release manifest must distinguish at least route id, expected output artifact, canonical path, locale, indexability, surface class and expected alternates.

Validation scripts consume authoritative manifests instead of hard-coding every future localized route.

The exact generated file path belongs to Phase 9 planning.

---

# 41. Analytics adapter

Tool functionality works with analytics disabled.

```ts
interface ToolAnalyticsAdapter {
  track(event: ToolTelemetryEvent): void
}
```

Phase 11 may begin with a no-op adapter; Phase 18 owns actual transport/storage.

The event type is narrow and typed. It may represent tool start/success/safe error/duration bucket/runtime/tool id/category.

Do **not** expose a generic arbitrary property bag that makes private content easy to log.

Telemetry types must not contain raw input, file bytes, pasted text, financial values, generated secrets, extracted metadata or private outputs.

---

# 42. Ads interface

Phase 6 defines a seam, not AdSense implementation/policy.

Tool metadata may declare a monetization class such as:

```text
eligible
eligible-ymyl
eligible-private
ad-free
```

Conceptual provider:

```ts
interface AdProvider {
  mount(slot: AdSlotDescriptor, context: AdEligibilityContext): void
  clear(slotId: string): void
}
```

Default/no-op provider makes no network request.

Ads may fail, be blocked or be disabled without affecting validation, engine load, result, download/copy, SEO or navigation.

Phase 14 owns placements/provider behavior.

---

# 43. Traffic Guard seam

Phase 8 owns classification and `adsEligible` policy.

Phase 6 reserves only a narrow data seam such as:

```ts
interface TrafficDecision {
  adsEligible: boolean
  challengeRequired: boolean
  costClass?: string
}
```

Frozen local tools do not require a traffic decision to compute locally.

A suspicious visitor may have Ads disabled while safe local computation remains available, subject to Phase-8 abuse policy.

---

# 44. Privacy/local-processing messaging

Privacy claims are declared content/metadata, not inferred from implementation accidents.

A file/secret tool may claim local processing only when the approved execution path is actually local.

If a future mode introduces server processing, privacy messaging must become mode-aware.

---

# 45. Dependency admission boundary

- `APPROVED` dependencies may be integrated according to audited conditions.
- `CONDITIONAL` dependencies remain blocked until all listed conditions pass.
- `HOLD`/`REJECT` may not enter production code.
- exact pinning/NOTICE work belongs to later implementation/release steps.

Phase 6 does not promote dependency state.

The architecture must allow reserve substitution if a frozen conditional capability fails.

---

# 46. PWA/offline decision

Launch 50 is **PWA-compatible but service-worker-free by default**.

- do not add a service worker merely for symmetry;
- local deterministic engines remain compatible with future offline caching;
- user-generated input/output is never a default cache target;
- Ads/analytics are not correctness dependencies;
- future offline eligibility may be declared per tool.

This preserves cheap future optionality without stale-cache/update risk now.

---

# 47. Provider-neutral boundary

Core browser code may depend on browser standards, bundled approved JS/WASM and static assets.

Ordinary Launch-50 engines may not depend on Cloudflare-specific globals, Pages Functions, provider request metadata or secret runtime bindings.

Provider configuration belongs to deployment/edge adapters introduced later.

On fallback hosts:

- local computation should remain functional;
- Ads/analytics may be disabled safely;
- canonical origin remains MenezesDev;
- tool ids/routes do not change;
- at least one fallback path must be smoke-tested before release.

---

# 48. Client framework decision

Do **not** add React, Vue, Svelte or another client UI framework by default for Launch 50.

Use the existing Astro + TypeScript + semantic HTML + focused vanilla client modules baseline.

Workers isolate heavy computation; CSS/Tailwind handles presentation.

A future UI framework requires evidence and a dedicated dependency/architecture decision.

---

# 49. Progressive enhancement

Tool meaning, labels, privacy information, explanations and related navigation are static HTML.

Interactive calculation/conversion uses client JavaScript as needed.

If optional Ads/analytics fail, tool function continues.

If JavaScript itself fails, the page remains a meaningful informational/navigation page rather than a blank app shell.

---

# 50. CSP and network boundaries

Tools remain compatible with a strict CSP.

- no `unsafe-eval` for convenience;
- no arbitrary remote script dependency for engines;
- Worker/WASM CSP needs are finalized in Phase 7;
- Ads/analytics CSP additions belong to later phases;
- CSP changes cannot silently weaken commercial/demo security.

Ordinary engines receive no generic network adapter and perform no hidden fetch/XHR.

---

# 51. Testing architecture

## 51.1 Catalog/invariant tests

Verify unique ids/routes, exact Phase-5 route mapping, locale ownership, relations, approved engine/boundary ids, required security metadata and dependency-state gates.

## 51.2 Engine unit/property tests

Test formulas/transforms without DOM. Finance/math require deterministic edge fixtures; property tests are preferred where invariants justify them.

## 51.3 Boundary tests

Test malformed/min/max inputs, size/work limits, canonicalization, unsupported formats, locale parsing and output limits.

## 51.4 Worker/runtime tests

Test message flow, cancellation, timeout/termination, error normalization and cleanup of Workers/Object URLs.

## 51.5 Security/hostile fixtures

The architecture supports malformed PDF/image/archive/HTML, catastrophic regex, resource bombs, active content, invalid encodings and oversized structures. Phase 7 defines exact corpora/gates.

## 51.6 Route/SEO build tests

Verify route artifacts, canonical, hreflang reciprocity, `<html lang>`, index/noindex, sitemap behavior, breadcrumbs, no demo-indexing regression and no provider hostname as canonical.

## 51.7 Browser interaction/accessibility

Exercise keyboard operation, reset/cancel, copy/download, async states, file selection and specialized renderer accessibility.

## 51.8 Bundle isolation

Prove common pages do not ship/load unrelated heavy chunks:

- Percentage Calculator does not load PDF code;
- Loan Calculator does not load Prettier;
- Word Counter does not load image codecs.

## 51.9 Economic/network tests

Assert ordinary tool operations do not call MenezesDev processing APIs. Ads/analytics requests are tested separately and cannot be required for success.

## 51.10 Provider-neutral smoke

Verify the static artifact against Cloudflare-primary behavior and at least one approved fallback path before release.

---

# 52. Test fixtures

Security/correctness fixtures may be synthetic and malformed but must not contain real user/private files or secrets.

Hostile fixtures should be minimal enough to keep CI safe while still exercising resource guards.

---

# 53. Validation evolution

The existing 16-route hard-coded validation is historical and must evolve for generated localized Tools.

New validation consumes machine-readable route/build manifests while preserving legacy commercial assertions.

The commercial acceptance contract is not deleted simply because Tools adds another validation layer.

---

# 54. Integration branch strategy

Phase 10 creates `feat/tools-platform` only after Phase 9 planning.

Intended relationship:

```text
latest approved commercial implementation base
+
Tools documentation/spec history
↓
feat/tools-platform
```

At design time the identified commercial implementation base is:

```text
feat/phase-10-implementation
@ 152fab910296f29cfae2e07bf6ccc2c69f0ce0df
```

If that branch advances, Phase 10 re-verifies the successor rather than blindly pinning stale code.

Tools history/workflow/addenda must remain recoverable and conflicts must be reviewed explicitly. `main` remains outside partial Tools implementation.

---

# 55. Focused changes to existing commercial code

Later implementation may make focused shared changes required by this architecture, including:

- extracting neutral document metadata from `BaseLayout`;
- changing canonical generation to explicit canonical paths;
- changing Astro build format to `preserve`;
- composing build route manifests;
- expanding sitemap generation;
- extending CSP only when approved dependencies/runtime require it.

Tests must prove commercial/demo behavior remains intact.

Unrelated commercial redesign/refactor is out of scope.

---

# 56. Future editorial fact-pack seam

Deterministic engines/tests should expose reusable verified fixtures or fact-generation helpers where appropriate.

Future Phase-21 editorial orchestration may consume these outputs through a separate layer.

The LLM never becomes the source of truth for formulas or tool results.

---

# 57. Tool Factory compatibility

Future low-risk Tool Factory output must conform to this architecture:

- catalog definition;
- locale content;
- approved engine id or policy-permitted deterministic internal engine;
- approved boundary/security class;
- tests;
- SEO structure;
- relations.

It cannot grant itself a dependency, backend path, security class, crawler/provider or policy change.

---

# 58. Later implementation-order implication

The architecture implies foundation-first work:

1. neutral document/SEO boundary;
2. Tool SDK core types + catalog validation;
3. static route generation;
4. boundary/result/error/runtime primitives;
5. generic UI primitives;
6. representative engines/renderers;
7. Worker/lazy-load infrastructure demonstrated by reference tools;
8. Phase-7 security enforcement;
9. Phase-8 Traffic/Ads seams;
10. proof set;
11. mass waves.

Exact files/tasks/commits belong to Phase 9 `writing-plans`.

---

# 59. Non-goals

Phase 6 does not:

- install dependencies;
- create `feat/tools-platform`;
- edit `feat/phase-10-implementation`;
- implement Tool SDK/runtime;
- implement any Launch-50 tool;
- approve conditional dependencies;
- finalize Phase-7 resource/threat details;
- implement Traffic Guard/Cost Guard;
- implement AdSense;
- implement product analytics/Search Console;
- implement AI Editorial/Trend Radar/crawler/Tool Factory;
- enable a PWA/service worker;
- merge Tools work to `main`.

---

# 60. Phase-6 validation checklist

- [x] existing Astro app reconciled;
- [x] implementation base identified;
- [x] module boundaries defined;
- [x] stable identity defined;
- [x] data-only ToolDefinition semantics defined;
- [x] executable boundary/engine bindings separated from catalog;
- [x] static route generation defined;
- [x] build-format/trailing-slash reconciliation defined;
- [x] neutral document/layout boundary defined;
- [x] generic vs specialized UI model defined;
- [x] mandatory input pipeline defined;
- [x] shared security interface defined;
- [x] pure engine contract defined;
- [x] main-thread/Worker/WASM boundaries defined;
- [x] no-backend Launch-50 path defined;
- [x] lazy loader/dependency isolation defined;
- [x] result/error model defined;
- [x] locale/content single-source ownership defined;
- [x] resolved SEO ownership defined without duplicate localized copy;
- [x] related/search generation defined;
- [x] analytics interface defined;
- [x] ad interface defined;
- [x] Traffic Guard seam defined without Phase-8 policy leakage;
- [x] provider-neutral/PWA decision defined;
- [x] testing layers defined;
- [x] integration strategy defined;
- [x] Tool Factory compatibility defined.

---

# 61. External documentation revalidated

Official Astro documentation was rechecked on 2026-08-24 for version-sensitive design points:

- routing/static `getStaticPaths()`: `https://docs.astro.build/en/guides/routing/`
- configuration reference: `https://docs.astro.build/reference/configuration-reference/`

Current facts used here:

- static dynamic routes require `getStaticPaths()`;
- `build.format` supports `file`, `directory`, `preserve`;
- `preserve` keeps source-file output form;
- `trailingSlash` supports `always`, `never`, `ignore`;
- prerendered production slash behavior is ultimately hosting-platform behavior;
- build-time `Astro.url` semantics vary with output format, so canonical ownership must remain explicit.

Revalidate these facts if Astro is materially upgraded before implementation.

---

# 62. Phase-6 gate state

Workflow gate:

> approved written design spec under Superpowers governance.

The concrete architecture was approved in chat before this file was written.

This file is the written design package and still requires the Superpowers **written-spec user review** before Phase 6 can be closed.

Until that written review is approved:

- Phase 6 remains open;
- Phase 7 does not begin;
- Phase 9 `writing-plans` is not invoked;
- no implementation code or dependency installation begins.
