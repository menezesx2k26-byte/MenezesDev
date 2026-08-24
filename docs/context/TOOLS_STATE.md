# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch for current research/design docs:** `feat/tools-oss-catalog`

---

# Current workflow state

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **ACTIVE / materially advanced, not closed**.
- Phase 2 — OSS Capability Audit: **ACTIVE**.
- Phase 3 — Capability Map: **NOT STARTED**.
- Phase 4 — Freeze Launch 50: **NOT STARTED**.
- Tools implementation under this workflow: **NOT STARTED**.
- `main` must remain free of partial Tools implementation before the approved launch/integration gates.

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
- initial Market Intelligence universe: 172 named candidate ideas/capabilities;
- post-launch scale is data-gated rather than count/calendar-gated;
- out-of-universe discoveries are recorded separately and do not silently rewrite the 172 count.

---

# Market intelligence

Current artifacts:

- `docs/tools/MARKET_INTELLIGENCE_BATCH1.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V1.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2B.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_DRAFT.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH3.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH4.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH5.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_WORKING.md`

## Current evidence-normalized findings

The working V2 now contains 28 scored candidates/clusters with materially better evidence depth than V1.

Strong A / likely-shortlist anchors currently include:

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
- Age Calculator as a high-volume/low-CPC traffic anchor.

Key evidence added in Batches 3–5:

- **URL Encoder:** dedicated competitor ~186K monthly visits, strong direct use and multiple current US exact-intent terms around ~$5.44 CPC; now A and near the top of the working ranking.
- **JSON Validator:** jsonlint ~473K monthly visits; US `json validator` ~22.2K / ~$4.36; native JSON path already approved; now A.
- **Text Diff:** Diffchecker ~2.18M monthly visits, ~61% Direct; `diff checker` ~27.1K / ~$3.57 and `text compare` ~27.1K / ~$1.26; now A.
- **Markdown Previewer:** dedicated preview site ~1.56M monthly visits in July 2026 with strong Google/direct mix; latest exposed US `markdown viewer`/`md viewer` rows around ~$6.27 CPC; now A and a probable shortlist anchor.
- **Palette Generator candidate:** Coolors ~5.2M monthly visits; current US `color palette generator` ~74K / ~$2.09; market A but incumbent moat and Palette-vs-Gradient semantics remain caveats.
- **Age Calculator:** ~1M US head-term volume / ~$0.29 CPC; A as a traffic-role candidate, not a revenue flagship.
- **physical unit converters:** enormous directional-query volume (e.g. cm→inches, kg→lbs) but generally weak CPC; useful traffic stabilizers, with future IA required to avoid thin directional pages.
- **Slug Generator:** dedicated low-AS site ~283K visits but ~76% Direct and small/zero-CPC visible organic terms; proven useful product, weakly evidenced SEO/AdSense flagship; intentionally downranked.
- **ZIP create/extract:** real mid-scale organic utility market and local privacy advantage, but modest exposed exact keyword economics; coverage/privacy candidate, not flagship.
- **Date Difference / Date Calculator:** attractive older direct keyword signal but insufficient 2026 freshness for A confidence; remains B-high.

## Out-of-universe discovery queue

Current RapidTables evidence exposed unusually strong economics for capabilities not explicitly named in the original 172:

- `binary converter` ~550K / ~$7.65;
- `hex converter` ~165K / ~$9.75;
- `binary translator` ~135K / ~$9.35.

These are research discoveries only. They are not silently counted as candidates or Launch commitments. A later explicit consolidation/intent decision must determine whether they become new candidates, replace weaker overlaps, or belong in one number-base utility.

## Important current research holds

- Markup Calculator;
- Break-even Calculator;
- Savings Goal Calculator;
- Secure Token Generator versus consolidation with random-string/password tooling;
- Loan Payment Calculator versus Loan Calculator;
- Investment Growth Calculator;
- File Hash versus generic Hash Generator;
- Color Contrast Checker;
- Remove Image Metadata;
- current CSV ↔ JSON evidence;
- YAML ↔ JSON;
- SVG Optimizer;
- selected converter families.

Do not fill missing scores from intuition merely because implementation is easy.

---

# OSS / capability audit

Current artifacts:

- `docs/tools/OSS_CATALOG.md`
- `docs/tools/RUST_OSS_AUDIT.md`
- `docs/tools/RUST_OSS_AUDIT_BATCH3.md`
- `docs/tools/OSS_AUDIT_BATCH4_BROWSER_FIRST.md`
- `docs/tools/OSS_AUDIT_BATCH5_CLIENT_ENGINES.md`
- `docs/tools/OSS_AUDIT_BATCH6_ZERO_BACKEND_DATA_DEV.md`
- `docs/tools/OSS_AUDIT_BATCH7_PDF_SVG_FINANCE_PRIVACY.md`
- `docs/tools/OSS_AUDIT_BATCH8_SHORTLIST_PRIMITIVES.md`
- `docs/tools/PHASE2_CAPABILITY_COVERAGE.md`
- `docs/tools/SECURITY_POLICY.md`

Current technical direction:

- many calculator/text/dev/image/structured-data capabilities already have zero-backend paths;
- URL Encode/Decode uses native browser primitives with explicit component/query/full-URL semantics;
- JSON syntax validation uses bounded native `JSON.parse()`; never imply JSON Schema validation;
- Text Diff uses `jsdiff` locally with Worker/input/time/result bounds;
- Markdown Previewer uses the already-approved restricted `markdown-it >=15` + DOMPurify profile;
- physical units use internal typed deterministic conversion tables/formulas;
- date/time uses Date/Intl and Temporal/lazy polyfill only where semantics require it;
- ZIP uses audited browser-local archive engines behind entry/path/bomb limits;
- PDFs are viable for a bounded subset but remain more hostile-input-sensitive;
- HEIC/AVIF universal conversion, OCR and some advanced PDF operations remain research-gated/conditional;
- dependency popularity never overrides security/license findings.

---

# Autonomous growth scope approved

Approved future post-launch architecture includes:

- Autonomous Growth Engine;
- Opportunity Engine;
- AI Editorial Engine invoked only for qualified opportunities;
- Trend Radar using first-party signals + APIs/RSS/trend/news indexes;
- ethical whitelist-only crawler fallback;
- policy-gated autonomy Option B;
- autonomous low-risk editorial improvements/publication;
- future low-risk autonomous Tool Factory only after Launch 50/SDK prerequisites;
- hard stops for new dependencies, parsers, backend paths, recurring costs, providers, secrets, licenses, crawler domains, privacy/YMYL expansions and workflow/security changes;
- measurement/pruning loop;
- AI/crawler cost budgets and kill switches.

Canonical artifacts:

- `docs/tools/TOOLS_SCOPE.md`
- `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`
- `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md`
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-autonomous-growth-design.md`

---

# Important separation from legacy MenezesDev phases

The repository contains historical site-commercial phase state in `docs/context/STATE.md` and `HANDOFF.md`. Those phases are **not** the MenezesDev Tools workflow phases.

For any Tools task, read and obey `AGENTS.md`, Tools-specific context, the immutable workflow in full, every binding workflow addendum and relevant Tools security/scope/spec/audit documents from the actual branch/ref.

Never infer Tools status from the commercial-site Phase 9/10 wording.

---

# Next logical work

Continue Phase 1 and Phase 2 only:

1. keep expanding current evidence across likely top-70 LOCAL-CLEAR candidates until a >50 shortlist is defensible;
2. prioritize unresolved finance, developer/data, converter and privacy/image candidates that can plausibly beat current supporting tools;
3. use negative/weak findings to prune rather than inflate the shortlist;
4. re-audit only technical gaps belonging to candidates likely to survive market selection;
5. produce full evidence-normalized Ranking V2 / shortlist only when breadth is sufficient;
6. once Phase 1/2 gates are genuinely satisfied, start Phase 3 Capability Map;
7. do not freeze Launch 50 or implement Tool SDK prematurely.

The Autonomous Growth Engine design is documented early but implementation remains post-prerequisite/future work under the immutable workflow.
