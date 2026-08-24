# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **CLOSED / gate passed** (`docs/tools/PHASE1_CLOSURE.md`).
- Phase 2 — OSS Capability Audit: **CLOSED / gate passed** (`docs/tools/PHASE2_CLOSURE.md`).
- Phase 3 — Capability Map: **CLOSED / gate passed** (`docs/tools/PHASE3_CLOSURE.md`).
- Phase 4 — Freeze Launch 50: **ACTIVE / all pre-approval checks passed; exact matrix pending explicit approval**.
- Phase 5 — Information architecture / international SEO: **BLOCKED by Phase-4 approval gate**.
- Tools runtime implementation: **NOT STARTED**.
- `main` must remain outside partial Tools implementation.

The historical status text in `IMMUTABLE_WORKFLOW.md` remains untouched. Later phase progress is recorded through closure/preflight artifacts under the append-only governance model.

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

# Candidate-universe state

Historical Batch-1 universe: **172**.

Explicit dated admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator;
- #177 Random Number Generator.

Current admitted research universe: **177**.

Historical 172 references remain valid and are not rewritten.

---

# Phase-1 final market pool

Canonical final pool:

`docs/tools/MARKET_SHORTLIST_68_FINAL_PHASE1.md`

Exact size: **68**.

Closure rationale:

- `docs/tools/MARKET_INTELLIGENCE_BATCH10_CLOSURE_PASS.md`
- `docs/tools/PHASE1_CLOSURE.md`

Key final consolidation decisions include:

- Simple Interest becomes a mode of Interest Calculator;
- JSON Minifier becomes a mode of JSON Formatter;
- File Hash becomes a bounded file mode of SHA-256 Hash Generator;
- JSON → CSV becomes the reverse mode of one CSV ↔ JSON product;
- numeric binary/octal/decimal/hex directions consolidate into Number Base Converter;
- Binary Translator remains separate as UTF-8 text ↔ binary-byte intent;
- weaker PDF operations were reduced so PDF does not dominate merely because the category is large.

Final pool composition:

- Finance/business: 17;
- Math/statistics: 13;
- Image/color: 10;
- Text/writing: 5;
- Developer/data: 16;
- Date/time: 3;
- Archive/file: 1;
- Structural PDF: 3;
- total: **68**.

---

# Phase-2 final technical state

Canonical final coverage:

`docs/tools/PHASE2_FINAL_68_COVERAGE.md`

Result:

- **60/68** clear/internal/local-bounded;
- **8/68** local-conditional with exact admission profiles;
- **0/68** ordinary backend processing requirements;
- **0/68** HOLD/UNRESOLVED capabilities;
- **68/68** expected to use 0 MenezesDev backend-processing requests per ordinary operation.

Conditional survivors are concentrated in:

- Image Compressor;
- WebP to PNG browser capability gate;
- Image Metadata Viewer / ExifReader;
- HTML Formatter / Prettier;
- CSV ↔ JSON / PapaParse;
- Split PDF / Merge PDF / Remove PDF Pages through one audited structural PDF engine family.

Capabilities intentionally not required for Launch selection include HEIC/AVIF universal conversion, OCR, generic PDF compression and arbitrary PDF text editing/extraction.

---

# Phase-3 Capability Map

Canonical map:

`docs/tools/CAPABILITY_MAP.md`

All 68 candidates now declare:

- stable id;
- category/intent/locale;
- native/browser/Worker/WASM execution decision;
- selected engine or internal path;
- license state;
- bundle-impact class;
- server requests/op;
- expected marginal backend cost;
- concrete security/input-limit profile;
- privacy-safe telemetry profile;
- monetization eligibility;
- rationale.

Economic headline:

> ordinary server-processing requests per operation = 0 across the full 68-candidate pool.

---

# Phase-4 exact recommendation

Canonical recommendation:

`docs/tools/LAUNCH50_RECOMMENDATION.md`

Status: **PENDING APPROVAL — NOT FROZEN**.

Recommended allocation:

- **35 SEO/AdSense-led tools (70%)**;
- **10 architectural-coverage tools (20%)**;
- **5 experiments (10%)**;
- total **50**.

Category distribution:

- Finance/business: 14;
- Math/statistics: 10;
- Image/color: 6;
- Text/writing: 4;
- Developer/data: 11;
- Date/time: 2;
- Archive/file: 1;
- PDF: 2.

Technical distribution:

- **46/50** clear/internal/local-bounded;
- **4/50** local-conditional: Image Compressor, HTML Formatter, Merge PDF, Split PDF;
- **0/50** backend-required.

The 18 reserve candidates reconstruct the full 68 pool and provide substitution pressure if a conditional admission gate later fails.

Phase-4 preflight:

`docs/tools/PHASE4_PREFLIGHT.md`

Every pre-approval requirement passes. The sole remaining Phase-4 gate is explicit approval of the exact matrix.

---

# SEO / autonomous-growth sequencing

Strategic SEO research was completed through Phase 1.

Once Phase 4 is explicitly approved:

- Phase 5 defines route taxonomy, canonical/hreflang, sitemap, robots, structured data, category pages, titles/meta and internal search;
- Phase 11–15 make the Tool SDK/pages carry the SEO contract;
- Phase 16 performs English editorial QA;
- Phase 17 localizes PT-BR;
- Phase 18 connects Search Console/product analytics;
- Phase 19 runs technical SEO preflight;
- Phase 20 launches;
- Phase 21 activates Autonomous Growth / AI Editorial / Trend Radar / ethical crawler;
- Phase 22 Tool Factory waits for Launch 50 + SDK stability.

No crawler, AI provider, Workflow, D1 resource or autonomous publisher has been implemented yet.

---

# Deployment portability

Binding deployment addendum remains compatible:

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`

- Git is source of truth;
- Cloudflare Pages primary;
- provider-neutral static artifact required;
- browser-capable tools cannot become Cloudflare-backend-dependent for convenience;
- fallback must preserve canonical-domain and ad-safety behavior.

---

# Current hard stop / next legal action

Everything possible through Phase 4 preflight has been completed without fabricating approval.

Current hard stop:

> Phase-4 gate requires the exact Launch-50 matrix to be explicitly approved.

Until that approval is recorded:

- do not mark Phase 4 closed;
- do not start Phase 5;
- do not implement Tool SDK/runtime;
- do not install conditional dependencies;
- do not implement crawler/AI/autonomous growth.

Before every future Tools action, reread the actual ref workflow, addenda and Tools-specific context. Git remains the source of truth.
