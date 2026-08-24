# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch:** `feat/tools-oss-catalog`

---

# Workflow status

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **ACTIVE / materially advanced; shortlist R5 exists**.
- Phase 2 — OSS Capability Audit: **ACTIVE / broad local coverage established**.
- Phase 3 — Capability Map: **NOT STARTED**.
- Phase 4 — Freeze Launch 50: **NOT STARTED**.
- Tools implementation: **NOT STARTED**.
- `main` must remain outside partial Tools implementation.

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
- future autonomous growth is Option-B policy gated, but implementation remains post-prerequisite.

---

# Candidate universe

Historical Batch-1 universe: **172**.

Explicit later admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator;
- #177 Random Number Generator.

Current admitted research universe: **177**.

Historical `172` references remain valid for Batch 1. New admissions are recorded through dated artifacts rather than silent count rewrites.

Admission artifacts include:

- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24.md`;
- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24_02_NUMBER_BASE.md`;
- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24_03_RANDOM_NUMBER.md`.

---

# Current working shortlist

Canonical current view:

`docs/tools/MARKET_SHORTLIST_80_WORKING_R5.md`

The shortlist remains fixed at **80** so new/rediscovered strong candidates must displace weaker rows.

Replacement history:

- R2: Retirement Calculator replaced Reading Time Calculator;
- R2: Budget Calculator replaced Gzip Decompressor;
- R3: Number Base Converter replaced Gzip Compressor;
- R3: Binary Translator replaced Slug Generator;
- R4: Decimal to Fraction Calculator replaced File Type Detector;
- R4: Random Number Generator replaced Remove Duplicate Lines;
- R5: Fraction Calculator replaced Scientific Notation Calculator;
- R5: Standard Deviation Calculator replaced Savings Goal Calculator.

R5 composition:

- Finance/business: 17;
- Math/statistics: 13;
- Image/color: 11;
- Text/writing: 5;
- Developer/data: 22;
- Date/time: 3;
- Archive/file: 2;
- Structural PDF: 7;
- total: **80**.

---

# Key market / anti-thin decisions

Current high-value/strong-role candidates include Loan, Markdown Previewer, URL Encoder, Margin, Image Resizer, JSON Validator, Compound Interest, Regex Tester, Mortgage, Interest, Auto Loan, Amortization, Slope, Proportion, Base64 Decoder, Text Diff, Case Converter, Image Metadata Viewer, Number Base Converter, Binary Translator, Budget, Retirement, Decimal to Fraction, Fraction Calculator and Random Number Generator.

Current market evidence also supports keeping these separate despite shared implementation primitives:

- Case Converter / Title Case Converter;
- Word Counter / Character Counter;
- Compound Interest / Investment Growth / Future Value;
- Discount Calculator / Percentage Calculator;
- Fraction Calculator / Decimal to Fraction Calculator;
- Number Base Converter / Binary Translator.

Notable current evidence from the latest passes:

- Decimal to Fraction: ~673K US searches / ~$2.65 CPC;
- Random Number Generator: ~1.22M / ~$1.66;
- Fraction Calculator: ~368K / ~$0.82, with a moderate-authority AS42 site around position #6;
- Standard Deviation Calculator: ~49.5K / ~$1.77;
- Discount/percent-off cluster: ~22.2K / ~$5.19 for `percent off calculator` and ~12.1K / ~$5.19 for `percentage off calculator`;
- GCD/LCM remains a deliberate high-volume/low-CPC traffic role;
- Present Value is a legitimate reserve (~8.1K / ~$1.42), but does not currently displace R5 rows.

Current reserve/demoted examples:

- Scientific Notation Calculator;
- Savings Goal Calculator;
- Reading Time Calculator;
- Slug Generator;
- Remove Duplicate Lines;
- File Type Detector;
- Gzip Compressor / Decompressor;
- Present Value Calculator;
- Sort Lines;
- YAML ↔ JSON;
- JWT Decoder.

Lower-evidence structural PDF operations remain under pressure despite the huge PDF category market because their hostile-input admission cost is materially higher.

---

# Market research artifacts

Current relevant artifacts now include Market Intelligence through Batch 9, the historical/working V1/V2 rankings, and shortlist revisions through R5.

Newest files:

- `docs/tools/MARKET_INTELLIGENCE_BATCH8_ANTI_THIN_AND_REPLACEMENT.md`;
- `docs/tools/MARKET_INTELLIGENCE_BATCH9_R5_CHALLENGERS.md`;
- `docs/tools/MARKET_SHORTLIST_80_WORKING_R4.md`;
- `docs/tools/MARKET_SHORTLIST_80_WORKING_R5.md`.

---

# Phase-2 technical state

Newest technical artifacts:

- `docs/tools/OSS_AUDIT_BATCH11_DECIMAL_FRACTION_RANDOM.md`;
- `docs/tools/OSS_AUDIT_BATCH12_FRACTIONS_STATISTICS.md`;
- `docs/tools/PHASE2_SHORTLIST_80_COVERAGE_R4.md`.

R5 retains the R4 exact aggregate:

- **64/80** clear/internal/local-bounded;
- **16/80** local-conditional;
- **0/80** ordinary backend processing required;
- **0/80** HOLD/UNRESOLVED capabilities;
- expected **0 MenezesDev backend-processing requests per ordinary operation for all 80**.

This means the clear/local pool alone already exceeds the eventual Launch-50 count.

New clear/internal paths:

- Decimal to Fraction: exact decimal string -> BigInt rational + GCD;
- Random Number Generator: Web Crypto + unbiased rejection sampling;
- Fraction Calculator: integer/BigInt rational arithmetic + GCD;
- Standard Deviation Calculator: Welford/two-pass descriptive statistics.

Conditional technical risk is now concentrated in:

- Image Compressor;
- WebP runtime-capability path;
- Image Metadata Viewer / ExifReader;
- Prettier-backed HTML/JS/CSS formatters;
- CSV conversions / PapaParse and export policy;
- ZIP Extractor security wrapper;
- structural PDF engine family.

No need to solve HEIC/AVIF/OCR/generic PDF compression to fill Launch 50.

---

# SEO / autonomous-growth state

Strategic SEO is already active through Phase 1 market/intent/competition research.

Later sequencing remains:

- Phase 5: formal information architecture + international technical SEO contract;
- Phase 11–15: SDK/implementation carries SEO metadata, related-tool graph and tool pages;
- Phase 16: English editorial QA;
- Phase 17: PT-BR localization/hreflang;
- Phase 18: Search Console/product analytics;
- Phase 19: technical SEO preflight;
- Phase 20: launch;
- Phase 21: Autonomous Growth Engine / AI Editorial / Trend Radar / ethical crawler;
- Phase 22: Tool Factory only after Launch 50 + SDK stability.

No crawler, AI provider, Workflow, D1 resource or autonomous publisher has been implemented yet.

---

# Deployment portability note

`docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md` exists from a concurrent workstream and was reviewed. It is compatible with current work: Git is source of truth, public Tools remain provider-neutral/static where possible, Cloudflare Pages is primary, fallback readiness is additive. It does not change current Phase 1/2 authorization.

---

# Next logical work

Continue only Phase 1/2:

1. pressure the seven-row structural PDF block and retain only the operations whose market value justifies hostile-input admission work;
2. validate independent intent for CSV/data formatter variants and File Hash vs text SHA-256;
3. review current image conversion overlap;
4. continue testing strong reserve challengers without inflating the shortlist;
5. narrow R5 to a final evidence-backed pool still >50;
6. finalize Phase-2 conditional gates only for survivors;
7. begin Phase 3 only after both Phase-1 and Phase-2 exit gates are genuinely satisfied;
8. do not implement Tool SDK, crawler, AI editorial backend or freeze Launch 50 prematurely.

Before every future Tools action, reread the actual ref workflow and binding addenda. Git remains the source of truth.
