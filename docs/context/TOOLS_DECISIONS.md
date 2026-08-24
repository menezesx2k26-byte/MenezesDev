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

Use Tools-specific `TOOLS_STATE.md`, `TOOLS_DECISIONS.md` and `TOOLS_HANDOFF.md` alongside the existing MenezesDev context files. This prevents the commercial site's historical Phase numbering/state from being confused with the Tools workflow.

## T-D022 — Candidate universe can expand only through explicit dated admission
**Status:** accepted  
**Date:** 2026-08-24

The 172 candidates in Batch 1 remain the historical initial universe. Later Phase-1 discoveries may be admitted when evidence shows an independent useful intent and realistic technical/economic path. Admissions are recorded in dated artifacts; agents must never silently rewrite the historical 172 count.

Explicit admissions so far:

- #173 Retirement Calculator;
- #174 Budget Calculator;
- #175 Number Base Converter;
- #176 Binary Translator;
- #177 Random Number Generator.

Current admitted working universe: **177**.

## T-D023 — New strong discoveries must displace weak shortlist rows rather than inflate the pool by default
**Status:** accepted  
**Date:** 2026-08-24

Once a bounded >50 shortlist exists, newly admitted high-quality candidates compete for slots.

Working replacements to date:

- R2: Retirement Calculator replaced Reading Time Calculator; Budget Calculator replaced Gzip Decompressor.
- R3: Number Base Converter replaced Gzip Compressor; Binary Translator replaced Slug Generator.
- R4: Decimal to Fraction Calculator replaced File Type Detector; Random Number Generator replaced Remove Duplicate Lines.
- R5: Fraction Calculator replaced Scientific Notation Calculator; Standard Deviation Calculator replaced Savings Goal Calculator.

The current shortlist remains **80** candidates. This selection-pressure rule is a Phase-1 research practice, not a change to the immutable Launch-50 target.

## T-D024 — Numeric base conversion and text/binary translation are separate product intents
**Status:** accepted  
**Date:** 2026-08-24

Use one `Number Base Converter` for numeric binary/octal/decimal/hex/base conversion rather than creating a route for every direction. Use a distinct `Binary Translator` for UTF-8 text ↔ binary-byte representation. This is an anti-thin-content consolidation decision based on current SERP/product semantics.

## T-D025 — Random Number Generator is an admitted independent intent
**Status:** accepted  
**Date:** 2026-08-24

General random-number generation is distinct from passwords, secure tokens and UUIDs. One configurable Random Number Generator should handle numeric ranges/counts/repeat policy rather than creating indexed pages for specific ranges such as 1–10 or 1–100. The default implementation uses browser Web Crypto with unbiased bounded-integer sampling and zero backend requests.

## T-D026 — Shared engine does not imply shared SEO intent
**Status:** accepted  
**Date:** 2026-08-24

Current market evidence supports retaining these as separate candidate URLs despite shared primitives:

- Case Converter vs Title Case Converter;
- Word Counter vs Character Counter;
- Compound Interest vs Investment Growth vs Future Value;
- Discount Calculator vs Percentage Calculator;
- Fraction Calculator vs Decimal to Fraction Calculator;
- Number Base Converter vs Binary Translator.

Phase-5 IA/content must make functional differences explicit and avoid duplicate/thin copy.

## T-D027 — Current R5 shortlist is the canonical Phase-1 working pool
**Status:** accepted  
**Date:** 2026-08-24

`docs/tools/MARKET_SHORTLIST_80_WORKING_R5.md` is the current working shortlist. It remains 80 so Phase 1 can continue cut/replacement pressure before creating the final >50 evidence-backed pool. It is not Launch 50 and does not authorize Phase 3 or implementation.
