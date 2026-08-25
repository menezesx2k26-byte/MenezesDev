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
- registry and content boundaries;
- runtime adapters;
- browser/Worker/WASM boundaries;
- security interface boundaries;
- locale and SEO interfaces;
- analytics and advertising adapters;
- error handling;
- dependency isolation and lazy loading;
- testing layers;
- provider-neutral build boundaries;
- the implementation-base relationship used later by Phase 10.

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

Important current constraints:

- `BaseLayout.astro` is PT-BR/commercial-site oriented;
- `siteConfig.locale` is fixed to `pt-BR`;
- canonical generation currently depends on `Astro.url.pathname`;
- current `astro.config.mjs` uses `build.format: "file"` and `trailingSlash: "never"`;
- current sitemap only includes Home and `/projetos/**`;
- current route validation hard-codes the legacy 16-route set;
- `/demo/**` remains deliberately non-indexed;
- commercial/portfolio/demo surfaces must remain logically isolated from monetized Tools.

These are reconciliation inputs, not defects to patch during Phase 6.

---

# 3. Considered architecture approaches

## Option A — fully schema-generated universal renderer

One generic renderer interprets every field, input, result and interaction from schema.

### Rejected as the primary architecture

Advantages:

- maximum apparent reuse;
- easy creation of simple calculators.

Problems:

- image crop, PDF merge/split, regex, Markdown preview and other rich tools would force the schema into a UI programming language;
- generic renderer complexity would become harder to test than focused components;
- accessibility and interaction behavior would accumulate special cases;
- future Tool Factory automation could generate schema complexity rather than maintainable tools.

## Option B — bespoke page/component per tool

Every tool receives a custom Astro page and custom client module.

### Rejected

Advantages:

- direct control;
- low abstraction cost for the first few tools.

Problems:

- duplicates SEO, validation, analytics, ads, localization and error plumbing across 50 tools;
- makes 100/200+ growth expensive;
- weakens automated correctness and policy enforcement;
- encourages drift between tools.

## Option C — hybrid typed Tool SDK — SELECTED

Use a typed registry and shared runtime for common contracts, generic UI primitives for common tools, and specialized renderers only where the interaction genuinely requires them.

This gives:

- one source of truth for identity/routes/SEO/search/relations;
- pure reusable engines;
- explicit boundaries and limits;
- tiny common runtime;
- lazy heavy dependencies;
- enough escape hatches for image/PDF/editor-like tools;
- a stable future interface for Tool Factory automation.

**Decision:** Option C is canonical.

---

# 4. Core architectural principles

Phase 6 adopts these principles:

1. **Registry is metadata, not executable business logic.**
2. **Tool identity is stable and independent from locale routes.**
3. **Engines do not know Astro, DOM, ads, analytics or locale.**
4. **Raw user input never bypasses an applicable boundary.**
5. **Ordinary Launch-50 execution remains local.**
6. **A Web Worker is browser isolation, not backend execution.**
7. **Heavy code is lazy and route/engine scoped.**
8. **Tool correctness never depends on ads or analytics.**
9. **Locale content is build-time/static, not a large runtime i18n payload.**
10. **SEO/search/related-tool data derives from the registry rather than duplicate lists.**
11. **Commercial/demo architecture stays separate from Tools-specific concerns.**
12. **Git + reproducible static build remain the product source of truth.**
13. **Cloudflare-specific APIs do not enter browser-capable engine logic.**
14. **Phase 7/8 policy can strengthen runtime gates without changing engine APIs.**

---

# 5. High-level architecture

```text
                         Tool Catalog
                    (build-time metadata)
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
      locale content      SEO/routes       relations/search
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                       Astro static SSG
                              │
                              ▼
                        ToolLayout HTML
                              │
                    user interaction only
                              ▼
                     Tool Runtime Controller
                              │
                              ▼
                  validate / bound / canonicalize
                              │
                              ▼
                    typed canonical input
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
      main thread        Web Worker         WASM Worker
           │                  │                  │
           └──────────────────┼──────────────────┘
                              ▼
                         typed result
                              │
                              ▼
                      safe result renderer
```

No Launch-50 ordinary operation crosses into a MenezesDev backend-processing endpoint.

---

# 6. Proposed source/module boundaries

The intended module structure is conceptually:

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
│   │   ├── types.ts
│   │   ├── result.ts
│   │   └── invariants.ts
│   ├── registry/
│   │   ├── index.ts
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

Exact filenames may be refined by the Phase-9 implementation plan, but responsibility boundaries are binding.

## 6.1 `core/`

Contains only contracts and reusable domain-independent Tool SDK types.

It does not import Astro, browser DOM APIs, analytics providers or ad providers.

## 6.2 `registry/`

Contains the canonical machine-readable tool catalog.

It is safe to import at build time.

It must not statically import heavy engine dependencies.

## 6.3 `content/`

Contains localized human-readable tool content keyed by stable tool id and locale.

Executable formulas/parsers do not live here.

## 6.4 `boundaries/`

Owns raw-input parsing, validation, resource limits, canonicalization and safe typed input creation.

## 6.5 `engines/`

Contains pure or near-pure tool computation.

An engine does not render UI and does not read provider-specific environment state.

## 6.6 `runtime/`

Selects and invokes the approved execution adapter for a tool.

It owns cancellation and normalization of runtime failures.

## 6.7 `workers/`

Contains browser Worker entry points for tools/engine families that require isolation or responsiveness protection.

## 6.8 `ui/`

Contains shared UI primitives and specialized renderers.

## 6.9 `seo/`, `search/`, `analytics/`, `ads/`

These are adapters/build helpers that consume registry metadata without contaminating engines.

---

# 7. Stable Tool identity

Every tool has one stable machine id.

Examples:

```text
loan-calculator
json-validator
merge-pdf
image-compressor
```

The stable id is not the English slug, not the PT-BR slug and not a translated label.

A tool may therefore map to:

```text
id: loan-calculator

en:
  /tools/calculators/loan-calculator/

pt-BR:
  /pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/
```

Stable ids are used for:

- engine binding;
- relations;
- telemetry;
- tests;
- Tool Factory references;
- internal configuration.

Changing a public slug does not create a new tool id.

---

# 8. ToolDefinition contract

The Tool SDK must support semantics equivalent to:

```ts
interface ToolDefinition<Input, Output> {
  id: ToolId
  category: ToolCategory
  routes: ToolRouteMap
  ui: ToolUiDefinition
  execution: ToolExecutionProfile
  boundary: ToolBoundaryDefinition<Input>
  engineId: EngineId
  output: ToolOutputDefinition<Output>
  security: ToolSecurityProfile
  seo: ToolSeoDefinition
  relations: ToolRelations
  analytics: ToolAnalyticsDefinition
  ads: ToolAdsDefinition
  privacy: ToolPrivacyDefinition
}
```

The exact TypeScript syntax may change in Phase 9/11, but these semantic fields are required where applicable.

## 8.1 Definition remains serializable where practical

The build-time catalog must remain ordinary data as much as possible.

Do not store imported engine functions, DOM nodes or provider objects inside `ToolDefinition`.

Executable bindings are resolved through ids/manifests.

This separation is required for:

- static generation;
- validation scripts;
- future autonomous generation;
- testing;
- bundle isolation.

---

# 9. Route model

Tool route metadata must represent the exact approved Phase-5 paths.

Conceptual type:

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

The canonical path is explicit data.

It is **not** derived from `Astro.url.pathname`.

This matters because:

- fallback provider hostnames are not canonical origins;
- Astro `build.format: "preserve"` changes build-time `Astro.url.pathname` semantics for non-index source files;
- locale slugs differ;
- canonical route governance belongs to Phase 5, not filesystem guessing.

---

# 10. Astro static-generation integration

Tools use static generation.

The two localized dynamic route templates use `getStaticPaths()` to enumerate registry-approved route entries at build time.

Conceptual English page:

```text
src/pages/tools/[category]/[slug]/index.astro
```

Conceptual PT-BR page:

```text
src/pages/pt-br/ferramentas/[category]/[slug]/index.astro
```

`getStaticPaths()` receives data only from the approved registry/content layer.

No user-controlled runtime path causes an arbitrary tool page to render.

Astro static mode therefore knows the complete tool route set during build.

---

# 11. Build-format reconciliation

The approved target is:

```text
output: "static"
build.format: "preserve"
trailingSlash: "ignore"
```

## 11.1 Why `preserve`

Current commercial pages such as:

```text
src/pages/projetos/m47.astro
```

remain flat output files.

Tools pages are intentionally represented as nested `index.astro` files, producing directory `index.html` artifacts.

This lets the source tree express the desired distinction without globally migrating commercial route structure merely to support Tools.

Current Astro documentation explicitly defines `preserve` as preserving source-file form:

- `about.astro` → `/about.html` artifact;
- `about/index.astro` → `/about/index.html` artifact.

## 11.2 Why `trailingSlash: "ignore"`

Astro's `trailingSlash` option controls development/on-demand route matching, not prerendered hosting normalization.

Tools canonical paths still require trailing slashes under Phase 5.

Production normalization for prerendered content therefore belongs to provider routing/redirect configuration and Phase-19 preflight.

## 11.3 Canonical paths never come from output filenames

Because `build.format: "preserve"` can expose `.html` in build-time `Astro.url` for non-index pages, neither commercial nor Tools canonical metadata may depend blindly on `Astro.url.pathname` after integration.

The architecture introduces an explicit canonical-path input to neutral document metadata helpers.

## 11.4 Provider compatibility

`preserve` does not guarantee identical clean-URL behavior on every static host.

The provider-neutral gate therefore means:

- the static artifact is not coupled to Cloudflare APIs;
- at least one approved fallback host must be demonstrated to serve required canonical routes correctly;
- GitHub Pages remains preferred only where its route behavior is compatible;
- Netlify/Vercel-style static fallback is acceptable if GitHub Pages cannot preserve required clean URLs safely;
- host-specific redirects/config remain deploy-layer concerns, not engine logic.

---

# 12. Neutral document metadata layer

The existing `BaseLayout.astro` must not become the universal Tools layout.

Instead, the implementation should extract/share a neutral document-head primitive with semantics equivalent to:

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

A neutral component such as `DocumentHead.astro` can then be consumed by:

- commercial `BaseLayout`;
- `ToolLayout`;
- future guide layout.

It must not impose Tools navigation, Ads or theme on commercial/demo pages.

---

# 13. ToolLayout boundary

`ToolLayout.astro` owns Tools page chrome and semantic structure, including:

- correct locale on `<html lang>`;
- Tools navigation shell;
- utility-first content order;
- breadcrumb slot/data;
- related-tool presentation boundary;
- reserved future ad-slot regions;
- privacy/status message areas;
- localized error/status presentation slots;
- no dependency on commercial CTA/WhatsApp behavior.

`ToolLayout` does not execute tool engines itself.

The interactive runtime attaches only to the tool surface.

---

# 14. Generic UI primitives vs specialized renderers

The architecture deliberately avoids both extremes of a universal renderer and 50 bespoke pages.

## 14.1 Shared primitives

Common primitives may include:

- numeric input;
- text input;
- date input;
- select/radio controls;
- bounded list input;
- file picker/drop surface;
- submit/calculate control;
- reset control;
- copy control;
- download control;
- scalar result;
- table result;
- text result;
- progress/status region;
- accessible inline validation.

## 14.2 Generic renderer

Simple calculator/converter tools may declare enough input/output metadata to render through shared form/result composition.

Examples:

- Margin Calculator;
- Percentage Calculator;
- Ratio Calculator;
- CAGR Calculator;
- Tip Calculator.

## 14.3 Specialized renderers

A tool may declare a specialized renderer id when interaction is materially different.

Examples:

- Image Cropper;
- Merge PDF;
- Split PDF;
- Markdown Previewer;
- Regex Tester.

Specialization is not permission to bypass boundary/runtime/security contracts.

---

# 15. UI definition contract

Conceptual UI metadata:

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

UI metadata describes presentation affordances.

It must not encode executable formulas.

---

# 16. Boundary architecture

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

The boundary layer owns the transition from untrusted input to engine input.

The engine may assume that its declared boundary contract has already run, but engine-internal defensive assertions are still allowed.

---

# 17. Boundary interface

Conceptual interface:

```ts
interface ToolBoundary<Input> {
  parse(raw: RawToolInput, context: BoundaryContext): BoundaryResult<Input>
}
```

`BoundaryResult` must be a typed success/error result, not an uncaught exception contract.

The boundary profile derives from the Capability Map and Phase-7 security classes.

Required semantics include, when applicable:

- maximum input bytes/chars;
- number token limits;
- file count/size;
- accepted formats/protocols;
- rows/columns/depth;
- pages/pixels;
- time/work budget class;
- active-content policy;
- canonicalization strategy;
- output limit.

Phase 6 exposes these fields; Phase 7 finalizes the concrete enforcement model and hostile-fixture matrix.

---

# 18. Security metadata in ToolDefinition

Every input-accepting tool must expose semantics equivalent to the binding policy:

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

Additional class-specific fields are required where relevant.

A definition missing applicable limits must fail registry validation once implemented.

---

# 19. Engine architecture

An engine is computation, not product chrome.

Conceptual contract:

```ts
interface ToolEngine<Input, Output> {
  execute(input: Input, context: EngineContext): Promise<ToolExecutionResult<Output>>
}
```

`EngineContext` may include only execution concerns such as:

- `AbortSignal`;
- bounded clock/work hooks;
- capability flags needed for deterministic local execution.

It does not include:

- DOM elements;
- ad provider;
- analytics provider;
- route object;
- locale copy;
- Cloudflare bindings;
- arbitrary network client.

Synchronous engines may be adapted to the Promise contract by the runtime.

---

# 20. Engine-family reuse

Multiple tools may share an engine family without sharing a URL or user intent.

Examples:

```text
finance engine primitives
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

Engine reuse never overrides the Phase-5 distinct-intent URL contract.

---

# 21. Execution profile

Every tool definition must preserve the immutable runtime semantics:

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

for all ordinary operations.

The extra `isolation` field distinguishes browser location from thread/isolation strategy.

---

# 22. Main-thread adapter

Use main-thread execution for bounded operations that are demonstrably fast enough not to harm responsiveness.

Typical candidates:

- scalar finance/math;
- URL encoding;
- UUID/password generation;
- small text transforms;
- small JSON parse/format below threshold;
- simple color math.

The runtime may still abort/cancel between work steps when an engine supports it.

Do not move trivial work into Workers solely for architectural symmetry.

---

# 23. Web Worker adapter

Workers are used when one or more apply:

- untrusted input could trigger long computation;
- parser/formatter work can block interaction;
- explicit timeout/termination is a security control;
- file processing is non-trivial;
- capability map already calls for Worker isolation.

Representative Launch-50 uses include:

- Regex Tester;
- Text Diff;
- HTML Formatter;
- PDF structural operations;
- large statistics input above threshold;
- Markdown parsing/render preparation where configured.

The Worker adapter must support:

- typed request/response messages;
- operation id;
- cancellation;
- hard termination on timeout where required;
- safe normalization of worker exceptions;
- no implicit network calls.

---

# 24. Worker construction model

Heavy worker dependencies must not be imported by the global registry or global page bundle.

Preferred model:

```text
Tool definition
    ↓ engineId
client loader manifest
    ↓ dynamic import / Worker factory
specific worker entry
    ↓
engine/dependency for that family only
```

Worker entries should be specific enough to preserve dependency isolation but may be shared by a coherent engine family.

Avoid one giant Worker bundle containing every parser/codec.

---

# 25. WASM boundary

WASM is local execution, not a backend.

Use WASM only when an audited capability materially benefits from:

- safety;
- performance;
- parser behavior;
- deterministic resource control.

Launch 50 does not require a speculative generic WASM framework.

The SDK must be able to describe `wasm-worker`, but implementation is required only if a frozen Launch-50 capability actually resolves to an approved WASM engine by its admission gate.

WASM modules remain lazy and isolated.

---

# 26. No normal backend execution for Launch 50

The public runtime architecture must not expose a normal per-operation backend-processing path for the frozen 50.

Tests later must prove that an ordinary tool operation does not invoke MenezesDev processing endpoints.

Network activity from optional analytics/ads is not tool processing and cannot be required for correctness.

If a future tool genuinely needs backend execution, that is a new capability-map/cost/security decision and must use an explicit server adapter outside the current Launch-50 path.

---

# 27. Engine loader manifest

Build-time tool metadata stores only `engineId`.

Client executable resolution lives in an allowlisted client-only loader map.

Conceptually:

```ts
const engineLoaders = {
  "finance-core": () => import("../engines/finance/core"),
  "text-diff": () => import("../engines/text/diff"),
  "pdf-structural": () => import("../runtime/pdf-worker-client"),
  "html-formatter": () => import("../runtime/html-worker-client")
} satisfies EngineLoaderMap
```

The actual map is statically declared and type checked.

User input never selects an arbitrary module path.

---

# 28. Dependency isolation rule

A heavy/conditional dependency may only enter the chunk(s) of tools that need it.

Examples:

- PDF dependency does not enter calculator bundles;
- Prettier does not enter JSON/finance bundles;
- image helper does not enter text tools;
- future WASM does not enter every Tool page.

Conditional dependencies remain **uninstalled/unintegrated** until their admission gates are satisfied in the appropriate later implementation phase.

Phase 6 defines the slot, not dependency approval.

---

# 29. Lazy-loading policy

Default policy:

- shared tiny runtime may load with the interactive tool;
- heavy engines/dependencies load only when the tool surface needs them;
- file/parser engines may wait until the user begins an operation;
- content, SEO, breadcrumbs and related links never wait for a heavy engine.

Search crawlers and users reading tool explanations must not download a PDF/parser/codec merely to render the static page meaning.

---

# 30. Tool runtime controller

The Tool Runtime Controller coordinates interaction without owning tool-specific formulas.

Responsibilities:

1. collect raw input from the renderer;
2. call the declared boundary;
3. reject invalid/bounded input before engine execution;
4. load the declared engine/runtime adapter;
5. execute with cancellation/timeout context;
6. normalize result/error;
7. render through approved output sinks;
8. emit privacy-safe lifecycle telemetry through the adapter if enabled.

It never:

- sends user data to Ads/analytics;
- uploads local files for browser-capable tools;
- chooses unapproved dependencies dynamically;
- changes SEO routes;
- decides traffic/ad policy.

---

# 31. Result contract

Tool results use explicit discriminated results.

Conceptually:

```ts
type ToolExecutionResult<T> =
  | { ok: true; value: T; meta?: SafeResultMeta }
  | { ok: false; error: ToolError }
```

Expected validation/runtime failures are represented as values rather than uncaught exceptions.

Unexpected exceptions are caught at the adapter boundary and converted to a safe `ENGINE_FAILURE` error.

---

# 32. Error model

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

Additional safe domain codes may be added when a real Launch-50 need exists, such as explicit encrypted/unsupported PDF handling.

`ToolError` may contain:

- stable code;
- locale message key;
- safe field reference;
- retryability/cancel state;
- coarse safe diagnostic class.

It must not expose:

- stack trace;
- filesystem path;
- secret;
- raw private input;
- parser-internal private payload.

---

# 33. Output rendering

Output rendering follows the security class.

Default sinks:

- text → escaped/text-safe output;
- number → formatted text;
- table → escaped cells;
- generated file → Blob/Object URL created locally;
- HTML preview → only through the explicitly approved sanitizer/render path;
- PDF/image output → local Blob/Object URL, no automatic upload.

Object URLs are revoked when no longer needed.

No engine result is considered trusted HTML merely because it came from our own code.

---

# 34. Locale/content architecture

Tool content is separated from executable engines.

Conceptual content contract:

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

English and PT-BR are statically generated separately.

The browser does not download the entire second locale merely to render one tool.

---

# 35. Locale rules

- English content is the canonical authored primary language.
- PT-BR is a deliberate localization, not string replacement at runtime.
- Locale affects labels, copy, numeric/date/currency display where appropriate.
- Engine input/output remains locale-neutral whenever possible.
- Parsing localized user numeric inputs must be explicit and deterministic; do not silently infer ambiguous separators without a declared policy.
- Locale content cannot change formulas or security limits.

Phase 17 remains responsible for final PT-BR linguistic/cultural QA.

---

# 36. SEO integration

The Tool SDK must be able to satisfy every Phase-5 SEO semantic.

Conceptual SEO contract includes:

```ts
interface ToolSeoDefinition {
  canonicalPath: string
  indexPolicy: "index" | "noindex"
  title: string
  description: string
  alternates: LocaleAlternate[]
  breadcrumb: BreadcrumbDescriptor[]
  structuredData: StructuredDataKind[]
}
```

SEO output is generated at build time.

The interactive client runtime must not mutate canonical/hreflang/title into conflicting values.

---

# 37. Canonical-origin configuration boundary

The canonical product origin is configuration, not request-host inference.

The existing `PUBLIC_SITE_URL` concept may continue to serve as the canonical origin if implementation keeps the semantics explicit.

Requirements:

- production canonical origin points to the approved MenezesDev domain;
- preview/fallback provider hostname does not replace it automatically;
- sitemap/hreflang/canonical builders consume the same canonical origin;
- no engine reads canonical-origin configuration.

Deploy-host identity and canonical product identity are separate concepts.

---

# 38. Category and root generation

Category/root pages derive published tools from registry state.

The registry provides enough metadata to determine:

- locale route;
- publication status;
- category membership;
- localized title/description;
- search aliases;
- index policy.

Phase-5 category index thresholds remain binding.

A category with insufficient complete tools can still render for users while remaining `noindex,follow` according to the approved SEO contract.

---

# 39. Related-tool graph

Relations are stored by stable tool id:

```ts
interface ToolRelations {
  relatedToolIds: ToolId[]
  guideIds?: GuideId[]
  topicalClusters?: string[]
}
```

Build helpers resolve those ids into localized URLs.

Registry validation must reject:

- missing ids;
- self-links unless explicitly justified;
- duplicate ids;
- references to unpublished locale routes when rendering that locale.

The future autonomous system may update low-risk relation edges only under the approved Option-B policy.

---

# 40. Search-index architecture

Launch search remains local/client-side.

The registry/content pipeline emits one compact public metadata index per locale.

Conceptually:

```text
generated search index
├── en
└── pt-BR
```

Each entry may contain only public metadata:

- tool id;
- localized title;
- aliases/intents;
- keywords;
- category;
- canonical route;
- short description.

Do not include tool user data, engine output or private state.

The search index should be loaded only by surfaces that need search; it is not required in every tool bundle.

---

# 41. Search route/index ownership

No second hand-maintained list of tool routes is allowed for search.

The registry is authoritative.

Similarly:

- sitemap derives from registry/build manifests;
- hreflang derives from route mappings;
- category listings derive from registry;
- related-tool URL resolution derives from registry.

This does not mean commercial routes must be moved into the Tool registry.

---

# 42. Commercial route separation

Existing commercial/demo route definitions remain a separate domain model.

A later build-validation layer may compose:

```text
commercial route manifest
+
Tools-generated route manifest
=
site release route manifest
```

Do not force commercial/demo pages to become fake `ToolDefinition` entries.

Do not let Tools code alter `/demo/**` index policy.

---

# 43. Build validation manifest

The existing route-check script cannot remain a hand-written list once Tools generates 100+ localized routes.

The architecture requires a machine-readable expected-route/build manifest generated from authoritative route sources.

It must distinguish at least:

- route id;
- expected output artifact;
- canonical path;
- locale;
- indexability;
- surface class (`commercial`, `portfolio`, `demo`, `tool`, `category`, `guide`);
- expected alternate locales where applicable.

Validation scripts consume this manifest instead of duplicating every route string.

The exact generated file path is decided by the implementation plan.

---

# 44. Analytics adapter

Tool functionality must work with analytics completely disabled.

Conceptual adapter:

```ts
interface ToolAnalyticsAdapter {
  track(event: ToolTelemetryEvent): void
}
```

Launch implementation starts with a no-op adapter until Phase 18 enables product telemetry.

The event type is narrow and typed.

Allowed event semantics remain:

- tool start;
- success;
- safe error class;
- duration bucket;
- runtime used;
- tool/category id.

Do not expose a generic `Record<string, unknown>` bag that makes private input easy to log accidentally.

---

# 45. Analytics privacy-by-type

The telemetry model must make prohibited content structurally difficult to send.

For example, event types must not contain fields such as:

- raw input;
- filename unless separately proven non-sensitive and explicitly approved;
- file bytes;
- pasted text;
- financial values;
- generated password/token/hash source;
- extracted metadata;
- private output.

Phase 18 defines actual storage/transport.

---

# 46. Ads interface

Phase 6 defines an interface boundary, not AdSense implementation or policy.

Tool metadata can expose a class such as:

```text
eligible
eligible-ymyl
eligible-private
ad-free
```

The eventual ad layer receives eligibility from the future Traffic Guard/Ad policy.

Conceptual interface:

```ts
interface AdProvider {
  mount(slot: AdSlotDescriptor, context: AdEligibilityContext): void
  clear(slotId: string): void
}
```

The default/no-op provider performs no network request.

---

# 47. Ads cannot affect correctness

An ad provider may fail, be blocked or be disabled without affecting:

- input validation;
- engine load;
- tool result;
- download/copy actions;
- SEO content;
- navigation.

Ads are an optional monetization side effect.

Phase 14 defines placements and provider behavior.

---

# 48. Traffic Guard interface seam

Phase 8 owns bot classification and `adsEligible` policy.

Phase 6 reserves only a narrow seam such as:

```ts
interface TrafficDecision {
  adsEligible: boolean
  challengeRequired: boolean
  costClass?: string
}
```

Launch-50 local tools do not need a traffic decision to perform local computation.

A suspicious visitor may have ads disabled while still being able to use safe local tools, subject to future abuse policy.

---

# 49. Privacy message model

Privacy/local-processing messaging is tool metadata/content, not runtime guesswork.

File/secret tools can truthfully state local processing only if their approved execution path actually remains local.

If a future tool gains a server-required mode, privacy copy must become mode-aware and cannot continue claiming fully local execution.

---

# 50. Dependency admission boundary

The architecture can reference a dependency slot only after the dependency's audit state permits it.

Rules:

- `APPROVED` may be integrated according to its audited conditions;
- `CONDITIONAL` remains blocked until every listed condition is proven;
- `HOLD`/`REJECT` cannot be imported into production code;
- exact version/range pinning belongs in implementation plan/lockfile;
- transitive dependency/license notices are verified before release.

Phase 6 does not promote conditional dependencies.

---

# 51. Conditional Launch-50 engines

The frozen four conditional tools remain conditional:

- Image Compressor;
- HTML Formatter;
- Merge PDF;
- Split PDF.

The architecture must permit reserve substitution without changing SDK fundamentals if one admission gate fails.

No conditional engine receives a special bypass because the Launch matrix is frozen.

---

# 52. PWA/offline decision

Launch 50 architecture is **PWA-compatible but does not require a service worker**.

Decision:

- no service worker is introduced merely for Phase 6 symmetry;
- local deterministic engines should remain compatible with future offline caching;
- user-generated tool input/output is never a default cache target;
- analytics/ad code is not required for offline correctness;
- if PWA is later enabled, each tool can declare offline eligibility.

This satisfies portability requirements without adding stale-cache/update risk prematurely.

---

# 53. Provider-neutral application boundary

Core browser code may depend on:

- standards-based browser APIs;
- bundled approved JS/WASM;
- static assets.

It may not depend on:

- Cloudflare Pages Functions;
- Cloudflare-specific globals;
- deployment-provider request metadata;
- secret runtime bindings;

for ordinary Launch-50 operation.

Provider-specific configuration belongs under deployment/edge adapters introduced in later phases.

---

# 54. Fallback behavior

Because Launch 50 processing is local:

- a fallback static host should retain tool computation if static assets/routes work;
- analytics/ads may be disabled safely;
- provider-specific edge protections may degrade only to the safe policy defined in Phase 8/19;
- canonical origin remains MenezesDev;
- no fallback host may rewrite tool ids/routes internally.

The release architecture must be smoke-testable on at least one approved fallback target.

---

# 55. Client framework decision

Do **not** add React, Vue, Svelte or another client UI framework for Launch 50 by default.

The existing app is Astro + TypeScript + minimal vanilla JavaScript.

The frozen tools do not currently demonstrate a need that justifies a client framework as a dependency and bundle/runtime cost.

Use:

- Astro for static structure;
- semantic HTML;
- focused TypeScript modules/custom-element-style controllers where useful;
- Web Workers for isolated computation;
- CSS/Tailwind for presentation.

A future framework introduction would require evidence and a dedicated dependency/architecture decision.

---

# 56. Progressive enhancement

Tool pages must expose their meaning, labels, privacy information, explanation and related navigation in static HTML.

The interactive calculation/conversion requires client JavaScript where appropriate.

Failure to load optional analytics/ads never blocks the tool.

If JavaScript itself fails, the page should still remain a valid informational/navigation page rather than a blank application shell.

---

# 57. Testing architecture

Phase 6 defines the following layers.

## 57.1 Registry/invariant tests

Verify:

- stable ids are unique;
- exact Launch route mappings are unique;
- locale routes match Phase 5;
- related ids exist;
- engine ids exist in the allowlisted manifest;
- no conditional dependency is accidentally admitted;
- required security/SEO metadata exists.

## 57.2 Engine unit tests

Verify deterministic formulas/transforms directly without DOM.

Finance/math engines require deterministic fixtures and edge cases.

Property tests are preferred where algebraic invariants make them useful.

## 57.3 Boundary tests

Verify:

- min/max inputs;
- malformed tokens;
- byte/row/page/pixel limits;
- canonicalization;
- output size limits;
- unsupported formats;
- locale parsing behavior.

## 57.4 Worker/runtime tests

Verify:

- typed message flow;
- cancellation;
- hard timeout/termination where required;
- Worker exception normalization;
- repeated operations do not leak active workers/object URLs.

## 57.5 Security/hostile fixture tests

Phase 7 defines exact fixture corpora and gates.

The test architecture must support:

- malformed PDF/image/archive/HTML;
- catastrophic regex;
- decompression/resource bombs;
- active-content fixtures;
- invalid encodings;
- oversized structures.

## 57.6 Route/SEO build tests

Verify generated output for:

- exact route presence;
- canonical path;
- hreflang reciprocity;
- locale/lang;
- index/noindex;
- sitemap inclusion/exclusion;
- breadcrumbs;
- no demo indexing regression;
- no provider hostname as canonical.

## 57.7 Browser interaction tests

Representative tools must be exercised through real browser interaction for:

- keyboard operation;
- reset/cancel;
- copy/download;
- async progress/error state;
- file selection where applicable.

## 57.8 Accessibility tests

Use semantic inputs/labels/status regions and automated accessibility audits, with manual keyboard checks for specialized renderers.

## 57.9 Bundle-isolation tests

Prove that common calculator/text pages do not load heavy unrelated dependencies.

Examples:

- Percentage Calculator must not ship/load PDF code;
- Loan Calculator must not load Prettier;
- Word Counter must not load image codecs.

## 57.10 Economic/network tests

For representative and ultimately all Launch-50 operation classes, assert that ordinary execution does not call a MenezesDev processing API.

Optional ad/analytics requests are evaluated separately and cannot be required for success.

## 57.11 Provider-neutral build smoke

Verify the generated artifact on Cloudflare-compatible primary behavior and at least one approved fallback path before release.

---

# 58. Test data and fixtures boundary

Tests may contain synthetic/malformed fixtures committed for security/correctness purposes.

They must not contain real user/private files or secrets.

Hostile fixtures must be small where possible and designed to exercise resource guards without making CI itself unsafe or expensive.

---

# 59. Build/release validation evolution

The existing `check-routes.mjs` remains useful history but cannot scale as a static list of 16 paths.

Implementation must evolve validation so route expectations come from authoritative manifests.

Release checks must still preserve legacy commercial assertions while adding Tools assertions.

The existing acceptance contract is not deleted merely because Tools adds another validation layer.

---

# 60. Integration branch strategy

Phase 10 will create `feat/tools-platform` only after Phase 9 planning.

The intended integration relationship is:

```text
latest approved commercial implementation base
           +
Tools documentation/spec history
           ↓
feat/tools-platform
```

At design time, the identified commercial base is:

```text
feat/phase-10-implementation
@ 152fab910296f29cfae2e07bf6ccc2c69f0ce0df
```

If that branch advances before Phase 10, the implementation plan must re-verify the successor commit rather than blindly pinning stale code.

---

# 61. Git-history preservation

The Tools research/spec history must remain recoverable when the implementation branch is created.

Phase 10 may merge/cherry-pick/reconcile histories according to the approved plan, but it must:

- preserve canonical Tools docs;
- preserve workflow/addenda authority;
- review conflicts explicitly;
- avoid overwriting newer commercial application work;
- keep `main` out of partial Tools implementation.

This design does not itself create or merge branches.

---

# 62. Existing commercial code changes allowed later

The implementation may make focused shared changes necessary for Tools, such as:

- extracting neutral document metadata from `BaseLayout`;
- changing canonical generation to explicit canonical paths;
- changing Astro build format to `preserve`;
- composing build route manifests;
- expanding sitemap generation;
- extending CSP when approved client dependencies require it.

These changes require tests that prove commercial/demo behavior is preserved.

Unrelated redesign/refactoring of the commercial site is out of scope.

---

# 63. CSP boundary

The existing CSP is a valuable baseline.

Phase 6 requires that Tools remain compatible with a strict CSP.

Rules:

- no `unsafe-eval` merely for convenience;
- no arbitrary remote script dependency for tool engines;
- Worker/WASM requirements are explicitly accounted for in Phase 7 security design;
- Ads/analytics CSP additions belong to their later approved phases;
- CSP changes cannot silently weaken commercial/demo security.

Phase 7 owns the final concrete directive matrix.

---

# 64. Network boundary

Ordinary engine modules receive no generic network adapter.

If a specific future capability needs network access, that is explicit tool metadata and a reviewed runtime class.

Launch 50 engines must not perform hidden fetch/XHR calls.

This keeps browser-first behavior auditable.

---

# 65. Deterministic fact packs for future editorial automation

Where formulas/examples are deterministic, engines/tests should expose reusable verified fixtures or fact-generation helpers without coupling them to the LLM system.

Future Phase-21 editorial automation may consume those verified outputs through a separate build/orchestration layer.

The LLM never becomes the source of truth for formulas/results.

---

# 66. Tool Factory compatibility

The future Tool Factory can create a low-risk tool automatically only when it can produce/modify artifacts that conform to this architecture:

- registry definition;
- approved locale content;
- approved engine id or new internal deterministic engine within whitelist;
- boundary/security profile from existing approved classes;
- tests;
- SEO metadata;
- relations.

It cannot grant itself:

- a new dependency;
- a new backend path;
- a new security class;
- a new crawler/provider;
- a policy change.

Those remain hard stops under the autonomous-growth addendum.

---

# 67. Implementation sequencing implications

This architecture implies the later implementation order should begin with foundations before 50 tool pages:

1. neutral document/SEO boundary;
2. Tool SDK core types and registry validation;
3. route generation;
4. runtime/boundary/result/error primitives;
5. generic UI primitives;
6. selected reference engines/renderers;
7. Worker/lazy-load infrastructure as demonstrated by reference tools;
8. security enforcement from Phase 7;
9. Traffic/Ads seams from Phase 8;
10. reference proof set;
11. mass waves.

The exact task/commit plan belongs to Phase 9 `writing-plans`, not this design.

---

# 68. Non-goals of Phase 6

Phase 6 does not:

- install dependencies;
- create `feat/tools-platform`;
- edit `feat/phase-10-implementation`;
- implement the Tool SDK;
- implement any of the 50 tools;
- approve conditional dependencies;
- finalize security budgets beyond existing policy/capability data;
- implement Traffic Guard/Cost Guard;
- implement AdSense;
- implement product analytics;
- implement Search Console;
- implement AI Editorial;
- implement Trend Radar/crawler;
- implement Tool Factory;
- enable a PWA/service worker;
- merge Tools work to `main`.

---

# 69. Phase-6 validation checklist

The written architecture is complete only if all are defined:

- [x] existing Astro app reconciliation;
- [x] implementation base identified;
- [x] Tools module boundaries;
- [x] stable tool identity;
- [x] Tool SDK semantic interface;
- [x] registry/executable separation;
- [x] route/static-generation contract;
- [x] `build.format`/trailing-slash reconciliation;
- [x] neutral document/layout boundary;
- [x] generic vs specialized UI model;
- [x] input boundary model;
- [x] shared security metadata interface;
- [x] pure engine contract;
- [x] main-thread/Worker/WASM boundaries;
- [x] no-backend Launch-50 path;
- [x] lazy engine loader model;
- [x] dependency isolation;
- [x] error/result model;
- [x] locale/content interface;
- [x] SEO interface;
- [x] related-tool/search generation;
- [x] analytics interface;
- [x] ad interface;
- [x] Traffic Guard seam without Phase-8 policy leakage;
- [x] provider-neutral build boundary;
- [x] PWA compatibility decision;
- [x] testing layers;
- [x] integration-branch strategy;
- [x] Tool Factory compatibility boundary.

---

# 70. Current external documentation revalidated

Official Astro documentation was rechecked on 2026-08-24 for the version-sensitive parts of this design.

Relevant current documentation:

- routing/static `getStaticPaths()`: `https://docs.astro.build/en/guides/routing/`
- configuration reference / `build.format`: `https://docs.astro.build/reference/configuration-reference/`

Facts used in this architecture:

- static dynamic routes require `getStaticPaths()`;
- `build.format` currently supports `file`, `directory` and `preserve`;
- `preserve` keeps source-file output form;
- `trailingSlash` supports `always`, `never`, `ignore`;
- for prerendered pages, the production host controls actual trailing-slash routing behavior;
- build-time `Astro.url` changes with output format, reinforcing the need for explicit canonical-path metadata.

These facts must be revalidated again if Astro is materially upgraded before implementation.

---

# 71. Phase-6 gate state

Workflow gate:

> approved written design spec under Superpowers governance.

The concrete architecture was approved in chat before this file was written.

This file is the written design package and still requires the Superpowers **written-spec user review** before Phase 6 can be closed.

Until that written review is approved:

- Phase 6 remains open;
- Phase 7 does not begin;
- Phase 9 `writing-plans` is not invoked;
- no implementation code or dependency installation begins.
