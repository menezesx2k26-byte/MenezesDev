# MenezesDev Tools — Durable Decision Log

**Date created:** 2026-08-24  
**Scope:** MenezesDev Tools only  
**Precedence:** lower than `docs/tools/IMMUTABLE_WORKFLOW.md` and binding workflow addenda

---

## T-D001 — Same repository and primary domain
**Status:** accepted  
**Date:** 2026-08-24

MenezesDev Tools lives in the existing MenezesDev repository/domain. English Tools use `/tools/...`; Brazilian Portuguese uses `/pt-br/ferramentas/...`. Commercial/portfolio/demo surfaces remain logically separate and ad-free.

## T-D002 — International English is canonical
**Status:** accepted  
**Date:** 2026-08-24

Primary Tools content is authored in international English (`en`). PT-BR is secondary localization rather than the source from which English is mechanically translated.

## T-D003 — Launch target is 50 complete tools
**Status:** accepted  
**Date:** 2026-08-24

Launch 50 is a public-release quality gate, not the permanent maximum size of the platform.

## T-D004 — Candidate universe is larger than Launch 50
**Status:** accepted  
**Date:** 2026-08-24

Market Intelligence Batch 1 created an initial universe of 172 candidate tool ideas. They are scored/researched before a shortlist and Launch 50 freeze; candidate count is not a commitment to ship all items.

## T-D005 — Browser-first is an economic hard gate
**Status:** accepted  
**Date:** 2026-08-24

Prefer secure native browser API, then browser JS/TS, then local WASM. Backend processing is allowed only when local execution is inadequate. Ordinary deterministic tools must not incur unnecessary per-use backend cost.

## T-D006 — Rust is justified, not mandatory
**Status:** accepted  
**Date:** 2026-08-24

Rust/WASM is preferred when it materially improves safety, hostile-input posture, correctness, performance or resource control. A mature JS/TS/native browser implementation may be preferred when it is safer/smaller/better maintained.

## T-D007 — OSS reuse before reinvention
**Status:** accepted  
**Date:** 2026-08-24

Audit mature open-source/native capabilities before building complex commodity functionality. Commercial-use license, exact dependency version, transitive supply chain, security posture and runtime cost are mandatory gates.

## T-D008 — AdSense-first monetization
**Status:** accepted  
**Date:** 2026-08-24

Primary initial Tools monetization is AdSense. Commercial, portfolio and fictitious demo surfaces remain ad-free. Ad loading is subject to traffic eligibility and kill switches.

## T-D009 — Utility-first content
**Status:** accepted  
**Date:** 2026-08-24

The interactive utility is primary. Supporting SEO/editorial content is adaptive, useful and not driven by word-count quotas or thin intent permutations.

## T-D010 — Data-driven post-launch growth
**Status:** accepted  
**Date:** 2026-08-24

Post-launch scale is driven by Search Console, product analytics, revenue and opportunity evidence. 100/200/500+ tool counts are possible outcomes, not quotas.

## T-D011 — Autonomous Growth Engine
**Status:** accepted  
**Date:** 2026-08-24

Post-launch the platform should become self-feeding: observe signals → rank opportunities → improve/create/prune → measure → feed outcomes back into prioritization.

## T-D012 — Policy-gated autonomy option B
**Status:** accepted / explicit authorization  
**Date:** 2026-08-24

Low-risk work may execute/autopublish without per-item human review when it remains entirely inside pre-approved engine/policy whitelists and all automated gates pass. Risky boundary changes hard-stop for explicit authorization.

## T-D013 — Hard-stop boundaries remain human-controlled
**Status:** accepted  
**Date:** 2026-08-24

New dependencies/parsers/backend paths/recurring costs/provider contracts/secrets/licenses/crawler domains/material privacy or high-stakes claims/security/workflow changes do not receive automatic authority.

## T-D014 — AI is an on-demand editorial worker
**Status:** accepted  
**Date:** 2026-08-24

Use AI to draft/revise from structured briefs and verified fact/source packs. Do not keep a free-form writer running just to satisfy a publication cadence. No qualified opportunity may legitimately produce zero AI generation.

## T-D015 — AI provider is replaceable
**Status:** accepted  
**Date:** 2026-08-24

Editorial model/provider access sits behind a replaceable gateway/adapter with explicit budgets, kill switches and cost telemetry. Exact provider/model is not frozen at design time.

## T-D016 — Initial pillar content, not two years pre-generated
**Status:** accepted  
**Date:** 2026-08-24

Launch may include a small set of high-quality pillar/golden-example guides. Future editorial should be generated from observed opportunities rather than prewriting a two-year calendar.

## T-D017 — Trend Radar hybrid discovery
**Status:** accepted / explicit approval  
**Date:** 2026-08-24

Trend Radar uses first-party data plus structured APIs/RSS/news/trend indexes. Ethical HTML crawling is fallback-only and whitelist-only when structured sources are insufficient.

## T-D018 — News is a trigger, not the product
**Status:** accepted  
**Date:** 2026-08-24

The site does not become a general-news publisher. A hot event may trigger a useful timely/evergreen guide or tool update only when it is materially connected to an approved Tools cluster/opportunity.

## T-D019 — Ethical crawler cannot evade source controls
**Status:** accepted  
**Date:** 2026-08-24

Crawler must respect robots/source restrictions, identify itself, rate-limit/backoff/cache, prefer feeds, and never bypass paywalls/login/CAPTCHA/WAF/anti-bot protection. Adding a new crawled domain is a hard-stop review action.

## T-D020 — Autonomous system must prune as well as create
**Status:** accepted  
**Date:** 2026-08-24

The growth loop re-evaluates outcomes and may improve, consolidate, noindex, redirect or remove weak/cannibalizing content under approved policy. A create-only automation is not acceptable.

## T-D021 — Tools context is isolated from legacy site-phase context
**Status:** accepted  
**Date:** 2026-08-24

Use Tools-specific `TOOLS_STATE.md`, `TOOLS_DECISIONS.md` and `TOOLS_HANDOFF.md` alongside the existing MenezesDev context files.

## T-D022 — Candidate universe can expand only through explicit dated admission
**Status:** accepted  
**Date:** 2026-08-24

The 172 candidates in Batch 1 remain the historical initial universe. Later Phase-1 discoveries may be admitted when evidence shows an independent useful intent and realistic technical/economic path.

Explicit admissions:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator;
- #177 Random Number Generator.

Current admitted research universe: **177**.

## T-D023 — Strong discoveries displace weak shortlist rows
**Status:** accepted  
**Date:** 2026-08-24

Once a bounded >50 shortlist exists, newly admitted high-quality candidates compete for slots rather than inflating the shortlist by default.

## T-D024 — Number-base conversion and Binary Translator are separate intents
**Status:** accepted  
**Date:** 2026-08-24

Use one `Number Base Converter` for numeric base conversion and a distinct `Binary Translator` for UTF-8 text ↔ binary-byte representation.

## T-D025 — Random Number Generator is an independent intent
**Status:** accepted  
**Date:** 2026-08-24

One configurable Random Number Generator handles ranges/count/repeat policy with Web Crypto and unbiased bounded sampling rather than creating thin indexed range pages.

## T-D026 — Shared engine does not imply shared SEO intent
**Status:** accepted  
**Date:** 2026-08-24

Separate URLs are allowed where evidence shows genuinely distinct user/search intent even if implementation primitives are shared.

## T-D027 — R5 was the final 80-candidate working buffer
**Status:** historical / superseded  
**Date:** 2026-08-24

`MARKET_SHORTLIST_80_WORKING_R5.md` remains the final 80-candidate working snapshot before closure pressure.

## T-D028 — Phase 1 closes on a final 68-candidate pool
**Status:** accepted / gate passed  
**Date:** 2026-08-24

`docs/tools/MARKET_SHORTLIST_68_FINAL_PHASE1.md` is the final Phase-1 candidate pool. `PHASE1_CLOSURE.md` records the gate pass.

## T-D029 — Consolidate weak sibling URLs into stronger tools
**Status:** accepted  
**Date:** 2026-08-24

Final Phase-1 consolidations include Simple Interest → Interest Calculator mode, JSON Minifier → JSON Formatter mode, File Hash → SHA-256 bounded file mode, and JSON→CSV → bidirectional CSV↔JSON product.

## T-D030 — Phase 2 closes with 68/68 concrete local paths
**Status:** accepted / gate passed  
**Date:** 2026-08-24

Final Phase-2 coverage is 60 clear/internal/local-bounded + 8 local-conditional, 0 backend-required and 0 HOLD/UNRESOLVED. All 68 ordinary operations target zero MenezesDev backend-processing requests.

## T-D031 — Phase 3 Capability Map covers all 68
**Status:** accepted / gate passed  
**Date:** 2026-08-24

`docs/tools/CAPABILITY_MAP.md` records technical/economic/security metadata for the full 68-pool. `PHASE3_CLOSURE.md` records the gate pass.

## T-D032 — Exact Launch-50 recommendation uses 35/10/5
**Status:** historical recommendation / superseded by approval  
**Date:** 2026-08-24

`docs/tools/LAUNCH50_RECOMMENDATION.md` proposed exactly 35 SEO/AdSense-led, 10 architecture-coverage and 5 experiment tools, with 18 ordered reserves.

## T-D033 — Phase 4 cannot self-approve a not-yet-presented matrix
**Status:** accepted / still valid  
**Date:** 2026-08-24

An earlier generic instruction to work autonomously did not authorize fabricating approval for a matrix that did not yet exist. This remains a governance rule.

## T-D034 — Exact Launch 50 is approved and frozen
**Status:** accepted / gate passed  
**Date:** 2026-08-24

After the exact 50-tool matrix was presented as the sole remaining Phase-4 gate, Gabriel instructed again: “Usa o superpowers e faz tudo que der seguindo o workflow sem encher meu saco.” In that immediate context this is approval to proceed with the **already-presented matrix**, not a blanket authority to alter workflow/security or approve future unseen designs.

Canonical frozen matrix:

`docs/tools/LAUNCH50_FROZEN.md`

Phase-4 closure:

`docs/tools/PHASE4_CLOSURE.md`

The frozen portfolio remains:

- 35 SEO/AdSense-led;
- 10 architectural coverage;
- 5 experiments;
- 46 clear/local + 4 local-conditional;
- 0 ordinary backend-required operations.

## T-D035 — Phase 5 is architectural and requires its own Superpowers design approval
**Status:** accepted / process gate  
**Date:** 2026-08-24

Phase 4 approval unblocks Phase 5 but does not pre-approve its route/SEO architecture. Current official Google Search documentation may be researched before approval, but the Phase-5 design/spec must be presented and approved under Superpowers brainstorming before it is committed as the canonical SEO/IA contract.

A generic “continue” after that specific design is presented is sufficient approval of the presented design; it is not approval of unseen later architecture.

## T-D036 — Phase 5 written SEO/IA contract is approved and closed
**Status:** accepted / gate passed  
**Date:** 2026-08-24

The concrete Phase-5 design was presented and approved, then written to:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-design.md`

It was self-reviewed in:

`docs/superpowers/specs/2026-08-24-menezesdev-tools-phase5-seo-ia-self-review.md`

Gabriel then replied `Segue` to the written-spec review gate. `docs/tools/PHASE5_CLOSURE.md` records the gate pass.

The approved Phase-5 contract includes stable shallow category routes, exact EN/PT-BR Launch-50 routes, self-canonical localized pages, reciprocal hreflang for real pairs, sitemap/robots/indexing rules, related-tool graph rules, guide routing, structured-data policy, anti-thin rules and fallback-host canonical protection.

This approval closes Phase 5 only. Phase 6 requires its own architectural design approval before a written Phase-6 spec or implementation plan can be produced.
