# MenezesDev Tools — Canonical Product Scope

**Status:** approved product scope  
**Date:** 2026-08-24  
**Repository:** `menezesx2k26-byte/MenezesDev`  
**Documentation branch:** `feat/tools-oss-catalog`  
**Authority:** Gabriel Menezes  
**Governing workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md` plus binding files under `docs/tools/workflow-addenda/`

---

# 1. Mission

Build a large international web-utilities platform inside MenezesDev that compounds organic traffic and advertising revenue while keeping marginal operating cost extremely low.

The product is designed around four economic principles:

1. **utility before content** — the tool must solve a real task;
2. **browser-first execution** — user devices perform deterministic processing whenever safe and practical;
3. **data-driven growth** — search, product and revenue evidence determine where effort goes;
4. **guardrailed autonomy** — low-risk improvements may operate automatically after one-time policy approval, while risky changes stop for explicit review.

The commercial MenezesDev surface remains separate from the ad-monetized Tools surface even though both share the same repository and primary domain.

---

# 2. Canonical product surface

```text
menezesdev.com/
├── /                         commercial MenezesDev; no ads
├── /projetos/...             portfolio; no ads
├── /demo/...                 fictional demos; no ads
├── /tools/...                international-English Tools surface
├── /pt-br/ferramentas/...    Brazilian-Portuguese Tools localization
└── /guides/...               editorial/educational growth surface
```

English (`en`) is canonical/default for Tools. Brazilian Portuguese (`pt-BR`) is secondary.

Tools, guides and future growth surfaces must not alter the indexing policy of the existing fictitious `/demo/**` routes.

---

# 3. Launch scope: 50 is a gate, not a permanent ceiling

The first public Tools release requires **50 complete functioning tools**.

Launch 50 remains a hard quality milestone because it is large enough to test:

- finance/math intent;
- developer utilities;
- text utilities;
- image/file utilities;
- PDF/file parsing where safely supported;
- localization;
- search/discovery;
- internal linking;
- AdSense integration;
- Traffic Guard / Cost Guard;
- analytics;
- the Tool SDK across genuinely different use cases.

The 50 are selected from a deliberately larger candidate universe. Market Intelligence Batch 1 currently contains **172 candidate tool ideas**. They are candidates, not 172 approved launch commitments.

Selection principle for Launch 50 remains approximately:

- 70% SEO/AdSense opportunity;
- 20% architectural coverage;
- 10% experimentation.

After Launch 50, tool count becomes data-gated rather than calendar-gated. Milestones such as 100, 200 or 500+ are possible only when the opportunity engine continues finding independent useful intents that pass the same quality, security, cost and licensing gates.

---

# 4. Browser-first economic architecture

For every tool, execution preference is:

```text
secure native browser API
        >
secure browser JS/TS
        >
secure local WASM
        >
Worker/backend only when technically necessary
```

A tool fails architecture review when it creates backend compute cost per ordinary operation despite an equivalent safe local implementation being available.

Rust is not mandatory. It is selected only when it gives a concrete advantage in safety, malformed-input handling, performance, deterministic correctness, resource control or WASM suitability.

The objective is that traffic growth increases revenue much faster than infrastructure cost.

---

# 5. Open-source reuse

Commodity functionality should not be rebuilt merely for ownership.

For each capability:

1. check native browser APIs;
2. inspect mature permissively licensed OSS;
3. audit exact dependency/version and transitive supply chain;
4. audit malformed-input/resource behavior;
5. measure browser/WASM/bundle fit;
6. integrate only when it is safer or economically better than a small internal implementation.

Dependency states remain:

- `APPROVED`;
- `CONDITIONAL`;
- `HOLD`;
- `REJECT`.

No unclear-license code enters the product.

---

# 6. Monetization

Primary initial monetization is Google AdSense on eligible Tools/guide surfaces.

Commercial, portfolio and demo surfaces remain ad-free.

Advertising is governed by Traffic Guard and an ad-eligibility layer. Suspicious/automated traffic must not intentionally enter the same monetized path as ordinary trusted human traffic.

Long-term optional revenue may include Pro/ad-free, batch features, APIs or contextual affiliate revenue, but only after observed usage/revenue data justifies the complexity.

---

# 7. Content model

Tool pages are utility-first. The interactive utility appears before unnecessary SEO prose.

A tool page may include, where useful:

- result;
- how it works;
- formulas/methods;
- worked examples;
- limitations;
- privacy behavior;
- FAQ;
- related tools.

There is no mandatory word count.

The platform also supports a separate `/guides/...` editorial layer for distinct informational intents. A guide exists because a real user/search question deserves an independent answer, not because every tool must mechanically receive an article.

Initial launch may contain a small set of high-quality pillar guides that establish topic clusters and act as editorial golden examples. Two years of future articles must **not** be pre-generated up front.

---

# 8. Autonomous Growth Engine

The approved long-term strategy is a self-feeding growth system.

```text
Search Console + product analytics + revenue data + Trend Radar
                           ↓
                  Opportunity Engine
                           ↓
        improve existing page / guide / new tool candidate
                           ↓
                  Policy + quality gates
                           ↓
                       publish
                           ↓
                    measure 7/28/90+
                           ↓
                reward or prune strategy
                           ↺
```

The system optimizes **useful organic traffic and sustainable marginal revenue**, not URL count.

No opportunity means no publication and, where possible, no paid AI call.

---

# 9. Autonomy model — approved option B

Gabriel explicitly approved **policy-gated autonomy for low-risk work**.

Per-item human approval is not required when every applicable condition below is already satisfied.

## 9.1 Auto-execution / autopublish may be allowed

Examples include:

- improving copy or metadata on an existing approved Tools/guide surface;
- creating a new guide inside an existing approved topical cluster from a verified fact/source pack;
- internal-link updates;
- title/description experiments that remain truthful and non-deceptive;
- consolidating or pruning weak editorial content under deterministic policy;
- creating a new deterministic tool when it uses only the existing Tool SDK, existing approved engines, existing approved dependencies and the browser-first path;
- adding a new calculator/converter variant only when it represents an independent useful intent rather than a thin doorway page;
- routine CI-verified SEO metadata, sitemap and related-tool graph maintenance.

All automated changes still require automated quality/security/SEO gates to pass.

## 9.2 Mandatory hard stops

Autonomy must stop the affected task — without stopping unrelated safe work — when it would introduce or change any of the following:

- a new third-party dependency or materially different dependency version not already approved;
- a new parser/codec handling hostile user input;
- a new backend endpoint or server-side processing requirement;
- a new recurring paid infrastructure path or materially higher cost class;
- a new AI/data/provider contract or materially changed provider terms;
- a new secret/credential requirement;
- unclear commercial-use license or NOTICE obligations;
- a new crawler domain outside the approved source whitelist;
- paywall, login, CAPTCHA or anti-bot bypass;
- material privacy/data-retention expansion;
- material YMYL/high-stakes claims beyond the approved educational/factual model;
- a security-policy change;
- a workflow/governance change.

Hard-stop items require explicit human authorization/review before proceeding.

---

# 10. AI Editorial Engine

AI is an on-demand editorial worker, not an always-running autonomous publisher with unrestricted authority.

Preferred pipeline:

```text
observed opportunity
       ↓
structured brief + verified fact pack + approved sources
       ↓
AI drafting
       ↓
deterministic fact/format/link/duplication gates
       ↓
quality critic
       ↓
CI/build
       ↓
autopublish only if policy permits
```

The LLM does not invent canonical formulas, tool outputs, licenses, security facts or source claims. Those are supplied from deterministic engines or verified source data.

The editorial model/provider should remain replaceable behind a gateway/adapter rather than being hard-wired into product logic.

AI usage is budgeted. A monthly/daily spend ceiling and kill switch are required before unattended operation. When there is no sufficiently strong opportunity, the system should not call an expensive model merely to satisfy a schedule.

---

# 11. Trend Radar

The Trend Radar adds freshness signals to the otherwise search-performance-driven growth engine.

Preferred source order:

1. first-party Search Console/product/revenue signals;
2. structured feeds/APIs/RSS;
3. public trend/news indexes where licensing/terms permit;
4. ethical HTML crawling only for approved domains and only when structured sources are insufficient.

Potential signal sources include Search Console, available Google Trends data/API access, GDELT, RSS/Atom feeds, official/technical feeds and other explicitly approved public sources.

A trending topic is only useful when it is meaningfully connected to an existing Tools cluster or a separately approved tool opportunity.

The product does **not** become a general-news publisher.

News is a trigger for useful evergreen or timely utility content, not content to copy.

---

# 12. Ethical crawler contract

The crawler is whitelist-only and source-efficient.

Mandatory rules:

- respect `robots.txt` and applicable site terms;
- use an identifiable User-Agent/contact identity once deployed;
- prefer feeds/APIs over HTML fetching;
- cache seen URLs and content fingerprints;
- use `ETag` / `If-Modified-Since` when supported;
- enforce per-domain rate limits and concurrency limits;
- exponential/backoff handling for `429`, `503` and equivalent pressure signals;
- never bypass login, paywall, CAPTCHA, WAF or anti-bot protection;
- never scrape private/user-specific areas;
- never mirror or republish full third-party articles by default;
- retain only the metadata/context needed for classification, fact extraction and citation workflows;
- enforce domain-level kill switches and daily request budgets;
- prevent user-controlled arbitrary URLs from turning the crawler into an SSRF proxy;
- separate crawler ingestion from public user tool traffic and from ad eligibility.

The crawler must not pretend to be a browser/user it is not.

---

# 13. Opportunity Engine

The Opportunity Engine ranks actions rather than blindly publishing on a calendar.

A candidate score may combine:

- search demand/impressions;
- ranking position and realistic movement opportunity;
- CTR gap;
- commercial value/RPM signal;
- trend velocity/freshness;
- relation to existing topical authority;
- implementation cost;
- backend marginal cost;
- security/licensing confidence;
- repeat/direct-use potential;
- internal-navigation value;
- content duplication/cannibalization risk.

The exact scoring formula may evolve from observed data. A score is a prioritization aid, not proof that a page deserves to exist.

---

# 14. Measurement and self-correction

Every autonomous publication/action should enter a measurement lifecycle.

Typical checkpoints:

- short-term indexing/technical validation;
- approximately 7/28/90-day performance observations where enough data exists;
- longer 180-day prune/consolidate review for weak content when appropriate.

Possible outcomes:

```text
works strongly      → expand related cluster
works moderately    → improve/observe
noisy/uncertain     → wait for more evidence
cannibalizes        → consolidate
no value over time  → update, noindex, redirect or remove under policy
```

The engine must be capable of **not creating**, **stopping**, **consolidating** and **pruning**, not only generating.

---

# 15. Backend posture

The public tools remain browser-first.

Backend compute exists mainly for platform coordination that cannot live safely on the client, such as:

- scheduled growth orchestration;
- external metrics ingestion;
- Trend Radar ingestion;
- editorial AI invocation;
- bounded autonomous decision records;
- deployment/CI coordination.

A Cloudflare-native design is preferred for the orchestration layer when implementation begins, using the smallest justified set of Workers/Workflows/storage/gateway capabilities. Exact products, limits, prices and schedules must be revalidated against current Cloudflare documentation during the architecture/implementation phase.

The editorial backend must never become the processing backend for ordinary deterministic user tools merely for convenience.

---

# 16. Privacy and telemetry

Never store:

- user-uploaded file contents;
- pasted private text;
- private tool outputs;
- extracted private document metadata values;
- unnecessary persistent identities.

The growth engine may store aggregate performance, page/query statistics, editorial decision records, source metadata, costs, publication history and non-sensitive operational metrics needed to improve the platform.

---

# 17. Two-year strategy

The two-year objective is not a fixed publication quota.

Canonical strategy:

```text
Launch 50
  ↓
measure
  ↓
expand proven clusters
  ↓
add guides/tools only when evidence justifies them
  ↓
self-correct via performance and revenue data
  ↓
continue while marginal opportunity remains attractive
```

A plausible mature catalog may reach 100–250+ useful tools and a substantial guide library, but those counts are **outcomes**, not quotas.

Publishing 500 weak URLs is a failure even if it is technically automated.

Publishing 137 excellent tools/guides that compound traffic and revenue can be a success even if a round-number milestone is not reached.

---

# 18. Current phase boundary

This scope does not authorize premature implementation.

At the time this file is created:

- Phase 1 — Global Market Intelligence: active;
- Phase 2 — OSS Capability Audit: active;
- Phase 3 — Capability Map: not started;
- Phase 4 — Freeze Launch 50: not started;
- implementation phases: not started under the Tools workflow.

Autonomous Growth Engine / Trend Radar / AI Editorial Engine are approved **future architecture scope**, primarily affecting post-launch Phases 21–24. Their implementation still waits for the prerequisites defined by the immutable workflow and its binding addenda.
