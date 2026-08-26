# MenezesDev Tools — Current State

**Last updated:** 2026-08-26  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **CLOSED** (`docs/tools/PHASE1_CLOSURE.md`).
- Phase 2 — OSS Capability Audit: **CLOSED** (`docs/tools/PHASE2_CLOSURE.md`).
- Phase 3 — Capability Map: **CLOSED** (`docs/tools/PHASE3_CLOSURE.md`).
- Phase 4 — Freeze Launch 50: **CLOSED / frozen** (`docs/tools/LAUNCH50_FROZEN.md`).
- Phase 5 — Information architecture / international SEO: **CLOSED** (`docs/tools/PHASE5_CLOSURE.md`).
- Phase 6 — Tools architecture design: **CLOSED / written spec approved** (`docs/tools/PHASE6_CLOSURE.md`).
- Phase 7 — Security design and threat-model consolidation: **CLOSED / written spec approved** (`docs/tools/PHASE7_CLOSURE.md`).
- Phase 8 — Traffic Guard and Cost Guard design: **ACTIVE / Superpowers architectural design cycle**.
- Phase 9+ — **NOT STARTED**.
- Tools runtime implementation: **NOT STARTED**.
- `main` remains outside partial Tools implementation.

Historical status wording in `IMMUTABLE_WORKFLOW.md` is not rewritten; closure/review artifacts record later progress.

---

# Product invariants

- same MenezesDev repository/domain;
- `/tools/...` international-English canonical;
- `/pt-br/ferramentas/...` PT-BR secondary;
- `/guides/...` editorial growth surface;
- AdSense-first on eligible Tools/guides;
- commercial/portfolio/demo surfaces ad-free;
- browser-first execution;
- Rust justified, not mandatory;
- zero unnecessary backend request per ordinary deterministic tool operation;
- Launch 50 is a hard first-release gate, not a permanent ceiling;
- Tool SDK mandatory for implementation scale;
- no auth required for Launch 50;
- autonomous growth remains Option-B policy-gated and post-prerequisite.

---

# Frozen Launch 50

Canonical matrix:

`docs/tools/LAUNCH50_FROZEN.md`

Allocation:

- 35 SEO/AdSense-led;
- 10 architectural coverage;
- 5 experiments;
- exactly 50.

Technical posture:

- 46/50 clear/internal/local-bounded;
- 4/50 local-conditional: Image Compressor, HTML Formatter, Merge PDF, Split PDF;
- 0/50 ordinary backend-required.

Security/dependency gates are never weakened to preserve a frozen slot; ordered reserves remain available.

---

# Phase-5 approved SEO/IA contract

Canonical spec:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`

It fixes the route taxonomy, exact EN/PT-BR Launch-50 routes, canonical/hreflang behavior, sitemap/robots/indexing contract, breadcrumb/related-tool graph, guide routing, anti-thin rules, static-HTML SEO requirements, YMYL constraints and fallback-host canonical protection.

---

# Phase-6 approved architecture

Canonical design:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`

Closure:

`docs/tools/PHASE6_CLOSURE.md`

Approved architecture includes:

- hybrid typed Tool SDK;
- serializable build-time catalog;
- stable tool ids independent from locale routes;
- localized copy as the single localized SEO/content authoring source;
- explicit canonical-path metadata;
- data-only boundary/engine bindings resolved through allowlisted executable registries;
- mandatory boundary before pure engines;
- main-thread / browser Web Worker / optional WASM-worker runtime classes;
- `serverRequired=false` for ordinary frozen Launch-50 operations;
- generic primitives plus specialized renderers;
- lazy dependency loading;
- no React/Vue/Svelte requirement;
- no-op-capable Ads and analytics seams;
- provider-neutral static artifact boundary;
- separate commercial and Tools layouts;
- layered correctness/security/SEO/bundle/economic/provider tests.

---

# Phase-7 approved security contract

Canonical design:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`

Self-review:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-self-review.md`

Closure:

`docs/tools/PHASE7_CLOSURE.md`

Approved security design fixes:

- finite profile-driven security policies;
- build-time `ResolvedSecurityPolicy` semantics;
- tightening-only per-tool overrides;
- exact Capability Map resource limits;
- pre-parse byte/char/signature/structural guards;
- image dimension/pixel preflight;
- structured-text depth/node/row/field controls;
- disposable Regex Worker + 1.5 s hard kill;
- Worker watchdogs for diff/Markdown/HTML/SVG/PDF;
- zero ambient network authority in engines/boundaries/workers;
- strict CSP split between application-safe sinks, real HTTP headers and Worker-resource policy;
- single privileged sanitized rich-output path;
- remote Markdown media disabled by default;
- conditional PDF active-content reject/strip proof gate;
- ZIP-create entry-name/path controls;
- deterministic output filename/Blob/Object-URL lifecycle;
- safe public error codes;
- typed content-free telemetry allowlist;
- dependency security hard stops;
- future server URL fetch forbidden until dedicated SSRF review;
- hostile fixture taxonomy;
- browser/economic/security CI invariants;
- provider/fallback security equivalence or safe degradation.

The written package was approved by Gabriel with `Segue` on 2026-08-26.

---

# Existing application implementation base

Current design-reconciliation base:

`feat/phase-10-implementation` @ `152fab910296f29cfae2e07bf6ccc2c69f0ce0df`

Observed stack:

- Astro 7.2.4 static;
- TypeScript 6.0.3;
- Tailwind 4.3.3;
- pnpm 11.22.0 / Node 24;
- no client UI framework.

Phase-6 integration direction uses provider-neutral static output, explicit canonical metadata and nested index routes for Tools without contaminating commercial/demo surfaces.

---

# Deployment portability

Binding addendum:

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`

- Git is source of truth;
- Cloudflare Pages primary;
- provider-neutral static artifact required;
- browser-capable tools cannot become Cloudflare-backend-dependent;
- at least one approved fallback path must be verified before release;
- fallback must preserve canonical-domain and application security or safely degrade;
- Ads are disabled on fallback when policy/consent integrity cannot be guaranteed.

---

# Phase-8 design scope

Phase 8 must convert the immutable Traffic Guard / Cost Guard requirements into a concrete, testable edge/application contract.

Required areas:

- Cloudflare-primary edge-protection model;
- provider-neutral application-level invariants;
- verified crawler handling without harming SEO;
- traffic-signal inputs and confidence model;
- rate-limit policy by route/cost class;
- challenge/Turnstile triggers;
- `adsEligible` contract;
- ad kill switches at global/category/route levels;
- cost-class taxonomy;
- backend quota policy for future server-required operations;
- local-tool behavior under suspicious traffic;
- abuse observability without collecting user tool contents;
- fallback degraded behavior when Cloudflare-specific signals are unavailable.

Phase 8 is Architectural under Superpowers. Its concrete design must be presented and approved before a written Phase-8 spec is committed.

---

# Autonomous-growth sequencing

No crawler, AI Editorial provider, Workflow, D1 resource or Tool Factory runtime is implemented yet.

Later sequence remains:

- Phase 8: Traffic Guard / Cost Guard — **ACTIVE**;
- Phase 9: implementation plan;
- Phase 10+: isolated implementation;
- Phase 18: Search Console/product analytics;
- Phase 20: launch;
- Phase 21: Autonomous Growth / AI Editorial / Trend Radar / ethical crawler;
- Phase 22: Tool Factory after Launch 50 + SDK stability.

---

# Current next legal action

Present the concrete Phase-8 Traffic Guard / Cost Guard architecture under Superpowers brainstorming.

Only after that specific design is approved may the Phase-8 written spec be committed and self-reviewed.

Do not invoke Phase-9 `writing-plans`, install dependencies, create `feat/tools-platform` or implement Tool SDK/runtime/tools yet.

Before every future Tools action, reread the exact-ref workflow, binding addenda, security policy, Tools context and relevant approved specs. Git remains source of truth.
