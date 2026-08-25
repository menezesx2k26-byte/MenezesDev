# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **CLOSED** (`docs/tools/PHASE1_CLOSURE.md`).
- Phase 2 — OSS Capability Audit: **CLOSED** (`docs/tools/PHASE2_CLOSURE.md`).
- Phase 3 — Capability Map: **CLOSED** (`docs/tools/PHASE3_CLOSURE.md`).
- Phase 4 — Freeze Launch 50: **CLOSED / frozen** (`docs/tools/LAUNCH50_FROZEN.md`).
- Phase 5 — Information architecture / international SEO: **CLOSED / written spec approved** (`docs/tools/PHASE5_CLOSURE.md`).
- Phase 6 — Tools architecture design: **WRITTEN SPEC COMMITTED + SELF-REVIEWED / USER REVIEW PENDING**.
- Phase 7+ — not started.
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

It fixes:

- shallow category route taxonomy;
- exact EN/PT-BR Launch-50 routes;
- canonical/hreflang behavior;
- sitemap/robots/indexing contract;
- breadcrumbs/related-tool graph;
- guide routing;
- internal-search non-indexing;
- structured-data policy;
- anti-thin rules;
- static-HTML SEO requirements;
- finance/YMYL constraints;
- fallback-host canonical protection.

---

# Phase-6 written architecture package

Concrete architecture was presented in chat and approved by Gabriel with `Vai`.

Written design:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`

Self-review:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-self-review.md`

Current architecture defines:

- correct existing implementation base reconciliation;
- hybrid typed Tool SDK;
- serializable build-time Tool catalog;
- stable tool ids independent from locale routes;
- separate localized content ownership;
- structural SEO policy + derived localized SEO output;
- allowlisted boundary/engine bindings rather than executable functions in catalog metadata;
- mandatory validate/bound/canonicalize/process/safe-output pipeline;
- pure engines;
- main-thread / Web Worker / optional WASM-worker execution classes;
- `serverRequired=false` for ordinary frozen Launch-50 operations;
- generic UI primitives plus specialized renderer escape hatch;
- lazy engine/dependency loading;
- no React/Vue/Svelte requirement for Launch 50;
- no-op-capable analytics and Ads adapters;
- Traffic Guard seam without pre-empting Phase 8 policy;
- provider-neutral static artifact boundary;
- PWA-compatible but no service worker by default;
- layered correctness/security/SEO/bundle/economic/provider tests;
- later integration-branch strategy.

Self-review corrected two ambiguity risks before user review:

1. catalog boundary bindings are now data-only ids/profiles; executable boundaries resolve through allowlisted code;
2. localized title/description are authored only in locale content; SEO metadata is derived at build time rather than duplicated.

Fresh scans found no `TODO` or `TBD` placeholders.

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

Important integration seams:

- current `BaseLayout` is PT-BR/commercial oriented;
- current canonical generation uses `Astro.url.pathname`;
- current build uses `format: "file"`, `trailingSlash: "never"`;
- current sitemap only includes Home + `/projetos/**`;
- current route validation assumes the legacy 16-route set.

Phase-6 design target uses static output with `build.format: "preserve"` and `trailingSlash: "ignore"`, explicit canonical-path metadata, nested index routes for Tools, and provider/preflight normalization for prerendered trailing-slash behavior.

Official Astro docs were revalidated on 2026-08-24 for these version-sensitive semantics.

---

# Deployment portability

Binding addendum:

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`

- Git is source of truth;
- Cloudflare Pages primary;
- provider-neutral static artifact required;
- browser-capable tools cannot become Cloudflare-backend-dependent;
- at least one approved fallback path must be verified before release;
- fallback must preserve canonical-domain and ad-safety behavior.

---

# Autonomous-growth sequencing

No crawler, AI Editorial provider, Workflow, D1 resource or Tool Factory runtime is implemented yet.

Later sequence remains:

- Phase 7: security/threat model;
- Phase 8: Traffic Guard / Cost Guard;
- Phase 9: implementation plan;
- Phase 10+: isolated implementation;
- Phase 18: Search Console/product analytics;
- Phase 20: launch;
- Phase 21: Autonomous Growth / AI Editorial / Trend Radar / ethical crawler;
- Phase 22: Tool Factory after Launch 50 + SDK stability.

---

# Current hard gate / next legal action

Superpowers written-spec user review is still required for Phase 6.

Until Gabriel approves the committed Phase-6 package:

- do not create `PHASE6_CLOSURE.md`;
- do not mark Phase 6 closed;
- do not begin Phase 7;
- do not invoke `writing-plans`;
- do not install dependencies or implement runtime code.

Before every future Tools action, reread the exact-ref workflow, all binding addenda, Tools context and relevant specs. Git remains source of truth.
