# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch for current research/design docs:** `feat/tools-oss-catalog`

---

# Current workflow state

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **ACTIVE / materially advanced, first bounded >50 shortlist exists**.
- Phase 2 — OSS Capability Audit: **ACTIVE / broad shortlist coverage established**.
- Phase 3 — Capability Map: **NOT STARTED**.
- Phase 4 — Freeze Launch 50: **NOT STARTED**.
- Tools implementation under this workflow: **NOT STARTED**.
- `main` must remain free of partial Tools implementation before approved launch/integration gates.

---

# Product decisions already closed

- same MenezesDev repository/domain;
- `/tools/...` international-English canonical Tools surface;
- `/pt-br/ferramentas/...` PT-BR secondary localization;
- `/guides/...` approved editorial/educational growth surface;
- AdSense-first monetization for eligible Tools/guides;
- commercial/portfolio/demo surfaces ad-free;
- browser-first execution;
- Rust only when concretely justified;
- Tool SDK required from MVP;
- no auth requirement for Launch 50;
- 50 complete tools required for first public Tools launch;
- Launch 50 is a gate, not a two-year ceiling;
- post-launch scale is data-gated rather than count/calendar-gated;
- new strong discoveries should create selection pressure rather than automatically expand publication count.

---

# Candidate-universe accounting

Historical initial universe:

- `MARKET_INTELLIGENCE_BATCH1.md`: **172 named candidates/capabilities**.

Explicit later admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator.

Current admitted research universe: **174 candidates**.

The historical 172 count remains true for Batch 1. New admissions must be recorded explicitly rather than silently editing history.

Current semantic-hold discoveries not yet admitted:

- Binary Converter;
- Hex Converter;
- Binary Translator.

Their observed economics are strong, but actual SERP/product semantics need consolidation work first.

---

# Market intelligence artifacts

Current major artifacts:

- `docs/tools/MARKET_INTELLIGENCE_BATCH1.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2B.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH3.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH4.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH5.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH6.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH7_CUT_PASS.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V1.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_DRAFT.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_WORKING.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_WORKING_B6.md`
- `docs/tools/MARKET_SHORTLIST_80_WORKING.md`
- `docs/tools/MARKET_SHORTLIST_80_WORKING_R2.md`
- `docs/tools/CANDIDATE_UNIVERSE_ADMISSION_2026-08-24.md`

---

# Current working shortlist

Canonical current shortlist view:

`docs/tools/MARKET_SHORTLIST_80_WORKING_R2.md`

It contains **80 candidates** and is deliberately larger than Launch 50.

R2 replacement decisions:

- Retirement Calculator entered and Reading Time Calculator moved to reserve;
- Budget Calculator entered and Gzip Decompressor moved to reserve.

The shortlist remains at 80 rather than expanding to 82.

## Current high-confidence / high-value anchors

Strong current candidates include:

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
- Text Diff / Compare Text;
- Case Converter;
- Image Metadata Viewer;
- Word Counter as a mass low-cost traffic role;
- Password Generator as a large low-CPC repeat role;
- Age Calculator as a mass low-CPC date role.

## Newly strengthened evidence

### Case Converter

Current dedicated market evidence shows roughly:

- ~5M monthly visits on convertcase.net;
- strong US traffic;
- high Direct share;
- exact US `case converter` demand around 22K with moderate CPC.

Now A-confidence / INTERNAL.

### Image Metadata Viewer

Current moderate-authority competitors demonstrate hundreds of thousands to >1M monthly visits across metadata/EXIF tools, with current US metadata-viewer/EXIF keyword rows including meaningful CPC.

Now A-market / LOCAL-CONDITIONAL.

### Future Value Calculator

Current US same-intent evidence includes roughly:

- `future value calculator` ~49.5K / ~$1.59 CPC.

Upgraded to A/B+ working candidate, still subject to overlap testing with Investment Growth/Compound Interest.

### Retirement Calculator — admitted #173

Current US signal:

- ~301K monthly searches;
- ~$2.26 CPC;
- related planning terms with higher CPC.

LOCAL-CLEAR / INTERNAL, with YMYL editorial caution.

### Budget Calculator — admitted #174

Current US signal:

- ~22.2K / ~$5.81 CPC;
- `budget tool` ~9.9K / ~$16.91;
- multiple same-intent commercial terms.

LOCAL-CLEAR / INTERNAL, with private financial input excluded from telemetry.

## Current deliberate demotions / pressure

- Reading Time Calculator — moved to reserve after current ~2.9K / $0 US head-term evidence.
- Gzip Decompressor — moved to reserve; great local primitive but not enough market evidence to defend a top-80 slot when archive coverage remains elsewhere.
- Slug Generator — useful/repeat, weak visible acquisition economics.
- File Type Detector — useful coverage, weak current market normalization.
- Gzip Compressor — cheap coverage, weak candidate-specific economics.
- Remove Duplicate Lines — cheap utility, weak direct market evidence.
- Savings Goal — broader savings market strong, exact goal-intent under-proven.
- lower-evidence structural PDF operations remain under pressure.

---

# Market role conclusions

Current portfolio evidence continues to support:

1. **Finance/business** — strongest commercial-value zero-backend cluster.
2. **Developer** — high CPC/repeat intent and extremely low marginal cost.
3. **Image** — mass demand while mostly remaining local/private.
4. **Math/general** — durable search traffic and internal-link depth.
5. **Text** — low-cost traffic/repeat stabilizers.
6. **Date/time** — mass utility traffic with low compute cost.
7. **PDF** — selective representation only; huge demand does not override parser risk/competition/weak CPC.
8. **Archive/file** — useful privacy/coverage cluster but not current revenue flagship.

---

# Phase-2 / technical coverage

Current technical artifacts include:

- `docs/tools/OSS_CATALOG.md`
- `docs/tools/RUST_OSS_AUDIT.md`
- `docs/tools/RUST_OSS_AUDIT_BATCH3.md`
- `docs/tools/OSS_AUDIT_BATCH4_BROWSER_FIRST.md`
- `docs/tools/OSS_AUDIT_BATCH5_CLIENT_ENGINES.md`
- `docs/tools/OSS_AUDIT_BATCH6_ZERO_BACKEND_DATA_DEV.md`
- `docs/tools/OSS_AUDIT_BATCH7_PDF_SVG_FINANCE_PRIVACY.md`
- `docs/tools/OSS_AUDIT_BATCH8_SHORTLIST_PRIMITIVES.md`
- `docs/tools/OSS_AUDIT_BATCH9_ADMITTED_FINANCE.md`
- `docs/tools/PHASE2_CAPABILITY_COVERAGE.md`
- `docs/tools/PHASE2_SHORTLIST_80_COVERAGE.md`
- `docs/tools/SECURITY_POLICY.md`

## Headline technical result for shortlist

For the working 80 pool before/after the two clear-for-clear replacements:

- **63/80** clear/internal/local-bounded path;
- **17/80** local-conditional;
- **0/80** ordinary backend processing required;
- **0/80** current HOLD/UNRESOLVED capabilities;
- expected **0 MenezesDev backend processing requests per ordinary operation for all 80** if their current local path survives implementation admission.

The R2 replacements preserve this risk profile because Retirement and Budget are both LOCAL-CLEAR and replaced two technically clear candidates.

## Conditional technical risk is concentrated in few families

- image compression / WebP capability checks;
- EXIF metadata reading;
- Prettier-backed formatters;
- PapaParse CSV transforms;
- broad file-type detection;
- ZIP extraction wrapper;
- structural PDF engine family.

No need to solve HEIC/AVIF/OCR/generic PDF compression merely to fill Launch 50.

---

# Autonomous growth scope approved

Future post-launch architecture remains approved:

- Autonomous Growth Engine;
- Opportunity Engine;
- AI Editorial Engine invoked only for qualified opportunities;
- Trend Radar using first-party signals + APIs/RSS/trend/news indexes;
- ethical whitelist-only crawler fallback;
- Option B policy-gated autonomy;
- autonomous low-risk publication/improvement;
- future low-risk Tool Factory after Launch 50/SDK prerequisites;
- hard stops for new dependencies/parsers/backend paths/recurring costs/providers/secrets/licenses/crawler domains/privacy/YMYL/security/workflow changes;
- measurement/pruning loop;
- AI/crawler budgets and kill switches.

Canonical artifacts:

- `docs/tools/TOOLS_SCOPE.md`
- `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`
- `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md`
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-autonomous-growth-design.md`

No autonomous-growth implementation is authorized yet.

---

# Important workflow separation

For any Tools task, read and obey from the actual ref:

1. `AGENTS.md`;
2. Tools-specific context;
3. `IMMUTABLE_WORKFLOW.md` in full;
4. every binding workflow addendum;
5. relevant security/scope/spec/audit docs.

Never infer Tools status from the legacy commercial-site phase numbering.

---

# Next logical work

Continue Phase 1/2 only:

1. run further replacement/cut passes on the weakest R2 rows;
2. resolve Binary/Hex/Binary-Translator semantics before possible admission;
3. obtain current evidence for candidates capable of replacing low-value rows;
4. preserve a final evidence-backed shortlist >50 with enough reserve depth;
5. map final survivors against Phase-2 coverage and satisfy only their remaining conditional admission gates;
6. only when Phase 1 and Phase 2 exit gates are genuinely satisfied, begin Phase 3 Capability Map;
7. do not freeze Launch 50 or implement Tool SDK prematurely.
