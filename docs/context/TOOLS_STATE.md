# MenezesDev Tools — Current State

**Last updated:** 2026-08-29  
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
- Phase 8 — Traffic Guard and Cost Guard design: **CLOSED / written spec approved** (`docs/tools/PHASE8_CLOSURE.md`).
- Phase 9 — Tool SDK implementation plan: **ACTIVE / Superpowers writing-plans**.
- Phase 10+ — **NOT STARTED**.
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

Canonical matrix: `docs/tools/LAUNCH50_FROZEN.md`.

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

# Approved design contracts

## Phase 5 — SEO / IA

- `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`
- exact EN/PT-BR Launch-50 routes;
- canonical/hreflang/sitemap/robots/indexing contract;
- category/related-tool/guide/internal-search rules;
- static HTML and anti-thin requirements;
- fallback canonical protection.

## Phase 6 — Tools architecture

- `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`
- hybrid typed Tool SDK;
- serializable data-only catalog;
- stable tool ids independent from locale URLs;
- allowlisted boundary/engine registries;
- browser/main-thread/Worker/WASM-worker execution classes;
- generic primitives plus specialized renderers;
- lazy dependency isolation;
- provider-neutral static output;
- Ads/analytics optional to correctness;
- no client framework requirement.

## Phase 7 — Security / threat model

- `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`
- finite profile-driven limits;
- tightening-only per-tool overrides;
- pre-parse guards;
- Worker hard watchdogs;
- zero ambient network authority in engines/boundaries/workers;
- CSP/header/Worker policy;
- hostile fixture taxonomy;
- safe outputs/errors/telemetry;
- PDF active-content proof gate;
- future arbitrary server URL fetch forbidden until dedicated SSRF review.

## Phase 8 — Traffic Guard / Cost Guard

- `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-design.md`
- `docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-self-review.md`
- `docs/tools/PHASE8_CLOSURE.md`
- Cloudflare-primary but provider-neutral enforcement model;
- known-good crawler protection;
- `TrafficClass` / `TrafficDecision` semantics;
- `C0`–`C3` cost taxonomy;
- all frozen Launch-50 ordinary operations remain `C0` / `serverRequired=false`;
- fixed first-party Ads bootstrap boundary and static `AdPolicyManifest` contract;
- global/category/route/provider ad kill controls;
- Turnstile only for real server-bound resources with server-side verification;
- future server compute finite/fail-closed;
- fallback keeps C0 utilities available while Ads/C2/C3 safely degrade.

The written Phase-8 package was approved by Gabriel with `Segue` on 2026-08-29.

---

# Current implementation-base candidate

The implemented commercial Astro application currently lives on:

`feat/phase-10-implementation` @ `a98be87db3863505397ba9f2e80d9b656228d750`

The current head advances the earlier design-time base only with a README/status commit; its parent is the previously reviewed runtime commit `152fab910296f29cfae2e07bf6ccc2c69f0ce0df`.

Observed current stack:

- Astro 7.2.4 static;
- TypeScript 6.0.3 strictest;
- Tailwind 4.3.3;
- pnpm 11.22.0 / Node >=24.19 <25;
- no React/Vue/Svelte client framework;
- current `build.format: "file"` and `trailingSlash: "never"`;
- current commercial `BaseLayout.astro` is PT-BR oriented and derives canonical from `Astro.url.pathname`;
- current route validation hard-codes the legacy 16-route commercial/demo set;
- `public/_headers` already provides baseline security headers and demo `X-Robots-Tag`.

**Phase-10 execution must revalidate the branch head immediately before creating `feat/tools-platform`; this SHA is a planning input, not an eternal pin.**

---

# Phase-9 plan scope

Phase 9 is producing one executable plan for **Phases 10–12 only**:

1. **Phase 10 — integration branch/worktree setup**
   - create `feat/tools-platform` from the freshly revalidated commercial implementation base;
   - merge the canonical Tools documentation/governance history;
   - preserve `main`;
   - resolve the expected README/documentation overlap deliberately;
   - establish a clean verified baseline.

2. **Phase 11 — Tool SDK foundation**
   - neutral document metadata;
   - typed Tool SDK/catalog;
   - locale/content ownership;
   - generated route/site manifests;
   - security profiles and validators;
   - runtime/boundary/engine-loader primitives;
   - no-op analytics/Ads seams;
   - static route generation and local search metadata;
   - existing commercial/demo acceptance preserved.

3. **Phase 12 — reference proof set**
   - Percentage Calculator — simple numeric/generic UI;
   - JSON Formatter — bounded structured text;
   - Image Resizer — native browser file/image path;
   - Regex Tester — disposable Worker + hard watchdog;
   - Percentage Calculator receives the first EN/PT-BR paired proof route to exercise reciprocal locale metadata;
   - no conditional PDF/HTML/Image-Compressor dependency is pulled into the proof set;
   - no WASM framework is added unless a frozen capability proves it necessary later.

Phase 13 visual design system, Phase 14 production advertising, Phase 15 mass Launch-50 waves, analytics providers, autonomous growth and production Cloudflare configuration remain outside this Phase-9 plan package.

---

# Phase-9 gate

Parent workflow requires an executable implementation plan with:

- exact files;
- exact interfaces;
- tests;
- commands;
- expected outcomes;
- commit boundaries;
- no placeholders.

Until the Phase-9 plan is committed, self-reviewed and approved:

- do not create `feat/tools-platform`;
- do not create implementation worktrees;
- do not install dependencies;
- do not modify the Astro runtime;
- do not configure production Cloudflare WAF/rate/Turnstile/Ads;
- do not implement Tool SDK/tools.

After the Phase-9 plan gate passes, Phase 10 begins with Superpowers worktree/TDD/review practices.

Before every future Tools action, reread exact-ref workflow, binding addenda, security policy, Tools context and relevant approved specs. Git remains source of truth.
