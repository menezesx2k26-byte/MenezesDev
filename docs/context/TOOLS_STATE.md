# MenezesDev Tools — Current State

**Last updated:** 2026-08-24  
**Canonical branch for current research/design docs:** `feat/tools-oss-catalog`

---

# Current workflow state

- Phase 0 — Product constitution: **CLOSED**.
- Phase 1 — Global Market Intelligence: **ACTIVE / partially completed**.
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

Known status:

- competitor/category demand supports calculators, PDF, image/file conversion, text and developer utilities;
- finance/math and developer intents currently show especially attractive combinations of commercial value and zero-backend execution;
- Ranking V1 is provisional and contains confidence levels; it is not the Launch 50 freeze;
- candidate-specific evidence still needs expansion before Phase 1 can close.

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

Approved future post-launch architecture now includes:

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

Canonical new artifacts:

- `docs/tools/TOOLS_SCOPE.md`
- `docs/tools/workflow-addenda/2026-08-24-autonomous-growth-autopilot.md`
- `docs/tools/AUTONOMOUS_GROWTH_SECURITY.md`
- `docs/superpowers/specs/2026-08-24-menezesdev-tools-autonomous-growth-design.md`

---

# Important separation from legacy MenezesDev phases

The repository already contains historical site-commercial phase state in `docs/context/STATE.md` and `HANDOFF.md`.

Those phases are **not** the MenezesDev Tools workflow phases.

For any Tools task, use:

1. `AGENTS.md`;
2. `docs/context/TOOLS_STATE.md`;
3. `docs/context/TOOLS_DECISIONS.md`;
4. `docs/context/TOOLS_HANDOFF.md`;
5. `docs/tools/IMMUTABLE_WORKFLOW.md`;
6. every binding file under `docs/tools/workflow-addenda/`;
7. relevant Tools security/spec/audit documents.

Never infer Tools status from the commercial-site Phase 9/10 wording.

---

# Next logical work

Continue Phase 1 and Phase 2 only:

1. deepen candidate-specific market evidence for high-ranking B/C-confidence candidates;
2. refine Ranking V2;
3. close material OSS/capability gaps only for candidates likely to survive into the Launch shortlist;
4. once Phase 1/2 gates are truly satisfied, start Phase 3 Capability Map;
5. do not freeze Launch 50 or implement Tool SDK prematurely.

The Autonomous Growth Engine design is documented early but implementation remains post-prerequisite/future work under the immutable workflow.
