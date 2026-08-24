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
- current Market Intelligence universe: 172 candidate ideas;
- post-launch scale is data-gated rather than count/calendar-gated.

---

# Market intelligence

Current artifacts:

- `docs/tools/MARKET_INTELLIGENCE_BATCH1.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V1.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2.md`
- `docs/tools/MARKET_INTELLIGENCE_BATCH2B.md`
- `docs/tools/MARKET_PRIORITY_RANKING_V2_DRAFT.md`

Known status:

- competitor/category demand supports calculators, PDF, image/file conversion, text and developer utilities;
- finance/math and developer intents show especially attractive combinations of commercial value and zero-backend execution;
- direct 2026 evidence now strongly supports Margin Calculator, Image Resizer, Amortization Calculator and several previously A-confidence finance/math candidates;
- Margin Calculator has direct US evidence around 110K monthly volume / ~$4 CPC but strong incumbents;
- Image Resizer has repeated US evidence around 673K / ~$0.88 and dedicated lower-authority competitors, making it a probable shortlist anchor;
- Amortization Calculator has direct US evidence around 246K / ~$0.79 and a page-one result from a materially lower-authority domain;
- ROI Calculator now has a current Google-Ads-derived signal around 27.1K US / ~$2.86 and is promoted C -> B pending corroboration;
- UUID and Hash Generator have promising secondary-source evidence and remain B pending stronger corroboration;
- HTML/code formatting has smaller head volume than V1 assumed but strong ~$4–5 CPC signals and repeat developer value;
- Image Compressor remains globally attractive but has large country/provider variance, so US-weighted demand was normalized down;
- Merge PDF has enormous sampled volume but very low sampled CPC and extremely strong incumbents; it is no longer treated as a revenue flagship merely because of raw volume;
- Split PDF has meaningful volume and somewhat better sampled CPC, but remains technically conditional;
- Ranking V2 DRAFT covers the evidence-normalized subset only; it is not Launch 50 and does not imply Phase 1 closure;
- remaining high-value evidence gaps include Markup, Break-even, Savings Goal, Secure Token, URL Encoder/Decoder and several data/text candidates.

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
- `docs/tools/PHASE2_CAPABILITY_COVERAGE.md`
- `docs/tools/SECURITY_POLICY.md`

Current direction:

- many calculator/text/dev/image/structured-data capabilities already have zero-backend paths;
- PDFs are viable for a bounded subset with a current maintained/safety-reviewed fork/engine strategy;
- HEIC/AVIF universal conversion, OCR and some advanced PDF operations remain research-gated/conditional and should not receive effort unless market evidence justifies Launch 50 relevance;
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

The repository contains historical site-commercial phase state in `docs/context/STATE.md` and `HANDOFF.md`.

Those phases are **not** the MenezesDev Tools workflow phases.

For any Tools task, use:

1. `AGENTS.md`;
2. `docs/context/TOOLS_STATE.md`;
3. `docs/context/TOOLS_DECISIONS.md`;
4. `docs/context/TOOLS_HANDOFF.md`;
5. `docs/tools/IMMUTABLE_WORKFLOW.md`;
6. every binding file under `docs/tools/workflow-addenda/`;
7. relevant Tools security/scope/spec/audit documents.

Never infer Tools status from the commercial-site Phase 9/10 wording.

---

# Next logical work

Continue Phase 1 and Phase 2 only:

1. corroborate Tier B-high candidates from `MARKET_PRIORITY_RANKING_V2_DRAFT.md`;
2. obtain direct candidate evidence for the strongest remaining research-hold candidates, especially Markup, Break-even, Savings Goal, Secure Token, URL Encoder/Decoder and selected text/data tools;
3. produce the full evidence-normalized Ranking V2 / >50 shortlist only when confidence depth is sufficient;
4. close material OSS/capability gaps only for candidates likely to survive into that shortlist;
5. once Phase 1/2 gates are truly satisfied, start Phase 3 Capability Map;
6. do not freeze Launch 50 or implement Tool SDK prematurely.

The Autonomous Growth Engine design is documented early but implementation remains post-prerequisite/future work under the immutable workflow.
