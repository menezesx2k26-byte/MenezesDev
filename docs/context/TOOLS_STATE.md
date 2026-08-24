# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **ACTIVE / materially advanced; shortlist R3 exists**.
- Phase 2 — OSS Capability Audit: **ACTIVE / broad local coverage established**.
- Phase 3 — Capability Map: **NOT STARTED**.
- Phase 4 — Freeze Launch 50: **NOT STARTED**.
- Tools implementation: **NOT STARTED**.
- `main` remains outside partial Tools implementation.

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
- Tool SDK required from MVP once implementation phases are reached;
- no auth required for Launch 50;
- future autonomous growth is policy-gated Option B, but implementation remains post-prerequisite.

---

# Candidate universe

Historical Batch-1 universe: **172**.

Explicit later admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator.

Current admitted research universe: **176**.

Historical “172” references remain valid for Batch 1. New admissions are recorded through dated artifacts rather than silent count rewrites.

Admission artifacts:

- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24.md`
- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24_02_NUMBER_BASE.md`

---

# Current working shortlist

Canonical current view:

`docs/tools/MARKET_SHORTLIST_80_WORKING_R3.md`

The shortlist remains fixed at **80** so new discoveries must displace weaker candidates.

Replacement history:

- R2: Retirement Calculator replaced Reading Time Calculator;
- R2: Budget Calculator replaced Gzip Decompressor;
- R3: Number Base Converter replaced Gzip Compressor;
- R3: Binary Translator replaced Slug Generator.

Current shortlist composition:

- Finance/business: 18;
- Math/general: 10;
- Image/color: 11;
- Text/writing: 6;
- Developer/data: 22;
- Date/time: 3;
- Archive/file: 3;
- Structural PDF: 7;
- total: **80**.

---

# Key market findings

High-value anchors currently include:

- Loan Calculator;
- Markdown Previewer;
- URL Encoder;
- Margin Calculator;
- Image Resizer;
- JSON Validator;
- Compound Interest Calculator;
- Regex Tester;
- Mortgage Calculator;
- Interest Calculator;
- Auto Loan Calculator;
- Amortization Calculator;
- Slope Calculator;
- Proportion Calculator;
- Base64 Decoder;
- Text Diff;
- Case Converter;
- Image Metadata Viewer;
- Number Base Converter;
- Binary Translator;
- Budget Calculator;
- Retirement Calculator.

Mass low-cost traffic roles remain valuable even with low CPC:

- Word Counter;
- Character Counter;
- Password Generator;
- Age Calculator;
- selected math/conversion utilities.

### Current explicit weak/demoted findings

- Reading Time Calculator: current direct US head term ~2.9K / $0; reserve.
- Slug Generator: repeat/direct value but weak visible acquisition economics; reserve after R3.
- Gzip Compressor/Decompressor: technically excellent, insufficient market evidence for current top-80 slots; reserve.
- Savings Goal: exact goal-intent evidence still weaker than the broad savings-interest market.
- lower-evidence PDF structural operations remain under pressure.

### Future Value

Current same-intent US signal around 49.5K / ~$1.59 CPC strengthened Future Value; it remains subject to overlap testing with Investment Growth/Compound Interest.

### Number Base / Binary Translator

Previously observed current signals:

- `binary converter`: ~550K / ~$7.65;
- `hex converter`: ~165K / ~$9.75;
- `binary translator`: ~135K / ~$9.35.

Current SERP review resolved product semantics:

- Number Base Converter = numeric base conversion;
- Binary Translator = UTF-8 text/bytes/binary.

No directional doorway pages are admitted by default.

---

# Market research artifacts

Current relevant artifacts include:

- `MARKET_INTELLIGENCE_BATCH1.md`
- `MARKET_INTELLIGENCE_BATCH2.md`
- `MARKET_INTELLIGENCE_BATCH2B.md`
- `MARKET_INTELLIGENCE_BATCH3.md`
- `MARKET_INTELLIGENCE_BATCH4.md`
- `MARKET_INTELLIGENCE_BATCH5.md`
- `MARKET_INTELLIGENCE_BATCH6.md`
- `MARKET_INTELLIGENCE_BATCH7_CUT_PASS.md`
- `MARKET_PRIORITY_RANKING_V1.md`
- `MARKET_PRIORITY_RANKING_V2_DRAFT.md`
- `MARKET_PRIORITY_RANKING_V2_WORKING.md`
- `MARKET_PRIORITY_RANKING_V2_WORKING_B6.md`
- `MARKET_SHORTLIST_80_WORKING.md`
- `MARKET_SHORTLIST_80_WORKING_R2.md`
- `MARKET_SHORTLIST_80_WORKING_R3.md`

---

# Phase-2 technical state

Technical artifacts now include audits through Batch 10 plus shortlist coverage.

Headline shortlist result remains effectively:

- **63/80** clear/internal/local-bounded;
- **17/80** local-conditional;
- **0/80** ordinary backend processing required;
- **0/80** HOLD/UNRESOLVED capabilities in the shortlist;
- expected **0 MenezesDev backend processing requests per ordinary operation for all 80** under their current local designs.

R2/R3 replacements are clear-for-clear replacements, so the aggregate technical-risk profile does not worsen.

New admitted finance audit:

- Retirement: INTERNAL / LOCAL-CLEAR; YMYL editorial caution;
- Budget: INTERNAL / LOCAL-CLEAR; no private financial values in telemetry.

New admitted developer/math audit:

- Number Base Converter: INTERNAL / LOCAL-CLEAR; arbitrary-precision/string-safe conversion;
- Binary Translator: native Encoding APIs / LOCAL-CLEAR.

Conditional technical risk remains concentrated in:

- image compression/WebP capability checks;
- EXIF metadata parser;
- Prettier-backed formatters;
- PapaParse CSV handling;
- broad file-type detection;
- ZIP extraction wrapper;
- structural PDF engine family.

No need to solve HEIC/AVIF/OCR/generic PDF compression to fill Launch 50.

---

# Autonomous growth scope

Approved future architecture remains:

- Autonomous Growth Engine;
- Opportunity Engine;
- AI Editorial Engine only on qualified opportunities;
- Trend Radar via first-party + APIs/RSS/news/trends;
- ethical whitelist crawler fallback;
- Option B autonomous low-risk policy;
- measurement/pruning loop;
- future Tool Factory after Launch 50/SDK stability;
- hard stops for new dependencies, parsers, backend paths, recurring costs, providers, secrets, crawler domains, licenses, privacy/YMYL expansion, workflow/security changes.

No crawler, AI provider, Workflow, D1 resource or autonomous publisher has been implemented yet.

---

# Next logical work

Continue only Phase 1/2:

1. keep applying replacement pressure to weakest R3 rows;
2. gather current evidence for candidates capable of displacing them;
3. resolve anti-thin comparisons (Case/Title Case, Word/Character, finance overlaps, formatter/data variants);
4. narrow R3 toward a final evidence-backed pool >50;
5. finalize Phase-2 admission only for survivors;
6. only after both gates are truly satisfied, begin Phase 3 Capability Map;
7. do not implement Tool SDK or freeze Launch 50 prematurely.

Before any future Tools action, reread the actual ref workflow and all binding addenda. Git remains the source of truth.
