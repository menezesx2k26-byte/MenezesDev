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
- Phase 8 — Traffic Guard and Cost Guard design: **WRITTEN SPEC COMMITTED + SELF-REVIEWED / USER REVIEW PENDING**.
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

# Approved Phase-5 SEO/IA

Canonical spec:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`

Fixes route taxonomy, exact EN/PT-BR Launch-50 routes, canonical/hreflang, sitemap/robots/indexing, breadcrumbs/related-tool graph, guide routing, anti-thin rules, static-HTML SEO, YMYL constraints and fallback canonical protection.

---

# Approved Phase-6 architecture

Canonical spec:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`

Closure:

`docs/tools/PHASE6_CLOSURE.md`

Core approved architecture:

- hybrid typed Tool SDK;
- serializable build-time catalog;
- stable ids independent from locale routes;
- data-only boundary/engine bindings with allowlisted executable registries;
- mandatory boundary before engines;
- main-thread / browser Worker / optional WASM-worker runtime classes;
- `serverRequired=false` for ordinary frozen Launch-50 operations;
- generic primitives + specialized renderers;
- lazy dependencies;
- no React/Vue/Svelte requirement;
- Ads/analytics optional to correctness;
- provider-neutral static artifact;
- separate commercial/Tools layouts.

---

# Approved Phase-7 security contract

Canonical spec:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-design.md`

Self-review:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase7-security-self-review.md`

Closure:

`docs/tools/PHASE7_CLOSURE.md`

Core approved controls:

- finite profile-driven security policies;
- tightening-only per-tool overrides;
- exact Capability Map resource limits;
- pre-parse guards and signature/structure checks;
- Worker watchdogs / hard kill where required;
- zero ambient network authority in engines/boundaries/workers;
- CSP split across safe application sinks + effective response headers + Worker policy;
- sanitized privileged rich-output path;
- PDF active-content proof gate;
- safe output/download lifecycle;
- typed content-free telemetry;
- hostile fixture taxonomy;
- future arbitrary server URL fetch forbidden until dedicated SSRF review;
- fallback security equivalence or safe degradation.

---

# Phase-8 written package

The concrete Traffic Guard / Cost Guard design was presented in chat and Gabriel approved writing it with:

> `Segue`

Canonical written design:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-design.md`

Self-review:

`docs/superpowers/specs/2026-08-26-menezesdev-tools-phase8-traffic-cost-guard-self-review.md`

Current written contract fixes:

- Cloudflare-primary but provider-neutral policy split;
- known-good crawler protection before relevant custom mitigations;
- no Enterprise Bot Management dependency;
- TrafficClass / TrafficDecision semantics;
- browser/client traffic metadata never grants server authority;
- C0/C1/C2/C3 cost taxonomy;
- all frozen Launch-50 ordinary operations remain C0/local;
- no backend request solely to classify C0 tool use;
- no backend lookup solely for ad-policy state;
- capability/cost-group rate limiting rather than one rule per tool;
- Managed Challenge for suspicious edge traffic where justified;
- Turnstile only for real server-bound protected actions with mandatory server-side Siteverify;
- Ads as an optional capability behind a fixed first-party bootstrap boundary;
- static versioned AdPolicyManifest;
- global/category/route/provider Ads kill controls;
- known-good crawlers do not intentionally enter ordinary ad bootstrap;
- future native/Taboola-style providers must inherit the same eligibility boundary;
- future C2/C3 server work is finite, quota-controlled and fail-closed;
- fallback defaults to unknown/restricted, C0 available, Ads off unless proven safe, C2/C3 off unless equivalent Cost Guard exists;
- privacy-safe abuse observability;
- CI/economic/network/fallback invariants.

Self-review found:

- `TODO`: 0;
- `TBD`: 0;
- `PLACEHOLDER`: 0;
- no higher-precedence gate weakening;
- no speculative backend/database/auth/provider activation.

Phase 8 is **not closed** until Gabriel approves the written spec.

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

Phase 10 integration setup remains blocked until Phase 9 planning closes.

---

# Deployment portability

Binding addendum:

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`

- Git is source of truth;
- Cloudflare Pages primary;
- provider-neutral static artifact required;
- browser-capable tools cannot become Cloudflare-backend-dependent;
- at least one approved fallback path must be verified before release;
- fallback preserves canonical-domain/security or safely degrades;
- Ads disable on fallback when integrity cannot be guaranteed;
- fallback never exposes expensive compute without equivalent Cost Guard.

---

# Current hard gate / next legal action

Superpowers requires **user review of the committed Phase-8 written spec**.

Until Gabriel approves that written package:

- do not create `PHASE8_CLOSURE.md`;
- do not mark Phase 8 closed;
- do not invoke Phase-9 `writing-plans`;
- do not install dependencies;
- do not create `feat/tools-platform`;
- do not configure production Cloudflare WAF/rate/Turnstile/Ads;
- do not implement Tool SDK/runtime/tools.

After written Phase-8 approval, the next legal step is Phase 9 `writing-plans` under Superpowers.

Before every future Tools action, reread exact-ref workflow, binding addenda, security policy, Tools context and relevant specs. Git remains source of truth.
