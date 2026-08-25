# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **CLOSED** (`docs/tools/PHASE1_CLOSURE.md`).
- Phase 2 — OSS Capability Audit: **CLOSED** (`docs/tools/PHASE2_CLOSURE.md`).
- Phase 3 — Capability Map: **CLOSED** (`docs/tools/PHASE3_CLOSURE.md`).
- Phase 4 — Freeze Launch 50: **CLOSED / exact matrix approved and frozen** (`docs/tools/LAUNCH50_FROZEN.md`, `docs/tools/PHASE4_CLOSURE.md`).
- Phase 5 — Information architecture / international SEO: **CLOSED / written spec approved** (`docs/tools/PHASE5_CLOSURE.md`).
- Phase 6 — Tools architecture design spec: **ACTIVE / Superpowers architectural design cycle**.
- Phase 7+ — not started under the Tools workflow.
- Tools runtime implementation: **NOT STARTED**.
- `main` remains outside partial Tools implementation.

Historical status text in `IMMUTABLE_WORKFLOW.md` remains untouched; later progress is recorded through closure/review artifacts under append-only governance.

---

# Product invariants

- same MenezesDev repo/domain;
- `/tools/...` international-English canonical;
- `/pt-br/ferramentas/...` PT-BR secondary;
- `/guides/...` editorial growth surface;
- AdSense-first on eligible Tools/guides;
- commercial/portfolio/demo surfaces ad-free;
- browser-first execution;
- Rust justified, not mandatory;
- zero unnecessary backend request per ordinary deterministic tool operation;
- Launch 50 is a hard first-release gate, not a permanent ceiling;
- Tool SDK required once implementation phases are reached;
- no auth required for Launch 50;
- autonomous growth remains Option-B policy gated and post-prerequisite.

---

# Candidate universe and Phase-1 pool

Historical Batch-1 universe: **172**.

Explicit later admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator;
- #177 Random Number Generator.

Current admitted research universe: **177**.

Canonical final Phase-1 pool:

`docs/tools/MARKET_SHORTLIST_68_FINAL_PHASE1.md`

Exact size: **68**.

Major consolidation rules include:

- Simple Interest → mode of Interest Calculator;
- JSON Minifier → mode of JSON Formatter;
- File Hash → bounded file mode of SHA-256 Hash Generator;
- JSON → CSV → reverse mode of one CSV ↔ JSON product;
- numeric base directions → Number Base Converter;
- Binary Translator remains separate as text/binary intent;
- lower-value PDF siblings reduced rather than preserving category volume artificially.

---

# Phase-2 technical state

Canonical final coverage:

`docs/tools/PHASE2_FINAL_68_COVERAGE.md`

Result:

- **60/68** clear/internal/local-bounded;
- **8/68** local-conditional with explicit admission profiles;
- **0/68** ordinary backend processing requirements;
- **0/68** HOLD/UNRESOLVED capabilities;
- **68/68** expected to use 0 MenezesDev backend-processing requests per ordinary operation.

Conditional survivor families remain Image Compressor, WebP capability, ExifReader metadata, Prettier HTML formatting, PapaParse CSV, and the @pdfme/pdf-lib structural PDF family.

---

# Phase-3 Capability Map

Canonical map:

`docs/tools/CAPABILITY_MAP.md`

All 68 declare stable id, category/intent/locale, runtime, engine/license, bundle class, requests/op, marginal backend cost, concrete security/input limits, privacy-safe telemetry, monetization eligibility and rationale.

Economic headline:

> ordinary server-processing requests per operation = 0 across the full 68-candidate pool.

---

# Frozen Launch 50

Canonical frozen matrix:

`docs/tools/LAUNCH50_FROZEN.md`

Allocation:

- **35 SEO/AdSense-led tools (70%)**;
- **10 architectural-coverage tools (20%)**;
- **5 experiments (10%)**;
- exactly **50**.

Technical distribution:

- **46/50** clear/internal/local-bounded;
- **4/50** local-conditional: Image Compressor, HTML Formatter, Merge PDF, Split PDF;
- **0/50** backend-required.

An ordered reserve pool of 18 reconstructs the 68-pool and is used if a conditional admission later fails. Security/dependency gates are never weakened to preserve a frozen slot.

---

# Phase-5 approved contract

Canonical spec:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`

Self-review:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-self-review.md`

Closure:

`docs/tools/PHASE5_CLOSURE.md`

The approved contract fixes the shallow category URL model, exact EN/PT-BR Launch-50 routes, canonical/hreflang behavior, sitemap/robots/indexing policy, breadcrumb/related-tool graph, guide routing, internal-search non-indexing, structured-data policy, anti-thin rules, static-HTML SEO requirements, finance/YMYL constraints and fallback-host canonical protection.

Phase 5: **CLOSED**.

---

# Phase-6 current state

Superpowers classification: **architectural**.

The correct existing application implementation base has now been identified for design reconciliation:

`feat/phase-10-implementation` @ `152fab910296f29cfae2e07bf6ccc2c69f0ce0df`

That branch is 10 commits ahead of `main`, 0 behind, and contains the existing Astro application that is absent from the research branch/main baseline.

Observed implementation base:

- Astro `7.2.4`, static output;
- TypeScript `6.0.3`;
- Tailwind `4.3.3` through Vite;
- pnpm `11.22.0` / Node 24;
- current `BaseLayout.astro`, `siteConfig`, typed route list and route/build checks;
- current `BaseLayout` is PT-BR/commercial-site oriented and cannot be reused unchanged for multilingual Tools;
- current Astro config uses `trailingSlash: "never"`, while the approved Phase-5 Tools contract requires trailing-slash canonical content routes;
- current sitemap filter only indexes Home + `/projetos/**`;
- current route-check script assumes file-format non-trailing-slash output and the legacy 16-route set.

These are design reconciliation inputs, not implementation defects to patch during Phase 6.

Phase 6 must now define the Tool SDK/module/runtime/locale/SEO/analytics/ad/error/testing/lazy-load/provider-portability boundaries and how they integrate with the existing Astro application without turning commercial/demo surfaces into Tools-specific architecture.

No Phase-6 spec is approved or written yet; the concrete design must first be presented under Superpowers brainstorming.

---

# SEO / autonomous-growth sequencing

Later workflow remains:

- Phase 6: Tools architecture design;
- Phase 7: security design/threat-model consolidation;
- Phase 8: Traffic Guard / Cost Guard design;
- Phase 9: implementation plan;
- Phase 10+: isolated implementation;
- Phase 18: Search Console/product analytics;
- Phase 20: launch;
- Phase 21: Autonomous Growth / AI Editorial / Trend Radar / ethical crawler;
- Phase 22: Tool Factory only after Launch 50 + SDK stability.

No crawler, AI provider, Workflow, D1 resource or autonomous publisher has been implemented yet.

---

# Deployment portability

Binding deployment addendum remains:

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`

- Git is source of truth;
- Cloudflare Pages primary;
- provider-neutral static artifact required;
- browser-capable tools cannot become Cloudflare-backend-dependent for convenience;
- fallback must preserve canonical-domain and ad-safety behavior.

---

# Current next legal action

Present the concrete Phase-6 Tools architecture design under Superpowers brainstorming.

Only after that specific architecture is approved may a canonical Phase-6 written spec be committed and self-reviewed. Phase 7 remains blocked until Phase 6 closes.

Before every future Tools action, reread the actual ref workflow, addenda and Tools-specific context. Git remains the source of truth.
