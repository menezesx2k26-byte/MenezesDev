# Workflow Addendum 2026-08-24 — Autonomous Growth Autopilot

**Authority:** Gabriel Menezes  
**Date:** 2026-08-24  
**Type:** explicitly-authorized supersession + additive strengthening  
**Affects:** `docs/tools/IMMUTABLE_WORKFLOW.md` Phases 21–24, autonomous publication governance, editorial growth, crawler/news discovery, AI cost controls  
**Status:** BINDING  
**Parent workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md`

---

# 1. Authorization record

Gabriel explicitly selected **Option B: autonomy total within a whitelist of pre-approved engines/rules** and then explicitly approved the **hybrid Trend Radar** design using APIs/RSS first and an ethical crawler only for whitelisted sources.

This addendum preserves all earlier workflow text and changes only the specific governance rule described below.

---

# 2. Explicit supersession of Phase 22 per-item human review

The original Phase 22 states:

> Human/quality/security gates remain mandatory.

The phrase above is superseded **only with respect to mandatory human review on every individual low-risk autonomous action**.

New binding interpretation:

> **Quality, security, license, cost, privacy, SEO and policy gates remain mandatory. Human review is not required per item when an action is fully inside a pre-authorized low-risk policy/engine whitelist and all automated gates pass.**

Human authorization remains mandatory when a hard-stop boundary is crossed.

No other Phase 22 prerequisite is weakened. In particular, Tool Factory automation still waits until the Tool SDK and Launch 50 prove stable.

---

# 3. Core autonomous-growth rule

After the prerequisites in the parent workflow are met, the platform may run as a self-feeding growth system:

```text
Search Console + product analytics + revenue data + Trend Radar
                           ↓
                  Opportunity Engine
                           ↓
       improve / guide / approved-engine new tool candidate
                           ↓
       policy + quality + security + cost + SEO gates
                           ↓
                      autopublish
                           ↓
                    measure outcome
                           ↓
               expand / improve / prune
                           ↺
```

The system optimizes useful traffic and sustainable marginal revenue, not raw publication count.

No qualifying opportunity means no publication.

---

# 4. Low-risk pre-authorization whitelist

The system may autonomously perform and publish actions only when they stay inside the approved scope and all applicable automated gates pass.

Allowed classes include:

1. editorial improvements to an existing approved page;
2. truthful title/meta/snippet improvements;
3. internal-link and related-tool graph improvements;
4. creation of a guide inside an already approved topic cluster using an approved source/fact pipeline;
5. consolidation, redirect, noindex or removal of weak/cannibalizing editorial pages when deterministic policy supports it;
6. creation of deterministic tools that use only:
   - the existing Tool SDK;
   - approved engines;
   - approved dependency versions/ranges;
   - approved browser/local execution paths;
   - existing security classes and limits;
   - no new recurring backend compute;
7. sitemap/search-index metadata maintenance;
8. measurement and prioritization updates.

Low-risk autonomy is permission to execute **within policy**, not permission to redefine policy.

---

# 5. Mandatory hard stops

The affected autonomous task must stop and await explicit human authorization if it requires any of the following:

- new third-party dependency or materially changed dependency not already approved;
- new parser/codec for attacker-controlled input;
- new backend processing endpoint for user operations;
- new recurring paid compute/data path or material increase in cost class;
- new AI/data/search/provider contract or material change in provider terms;
- new secret/credential class;
- unclear or changed license obligations;
- new crawler domain outside the approved source whitelist;
- bypass of login, paywall, CAPTCHA, WAF or anti-bot controls;
- material privacy/retention expansion;
- material YMYL/high-stakes claims outside the approved educational/factual framework;
- change to `docs/tools/SECURITY_POLICY.md` or other binding security contract;
- change to `docs/tools/IMMUTABLE_WORKFLOW.md` or any binding workflow addendum;
- any action whose correctness/security cannot be adequately verified by the existing automated gates.

A hard stop blocks only the affected task. Other independent low-risk autonomous work may continue.

---

# 6. AI Editorial Engine

The approved editorial model is **AI on demand**, not an unrestricted continuously running writer.

Canonical pipeline:

```text
real opportunity
      ↓
structured brief
      ↓
verified fact/formula/source pack
      ↓
AI draft
      ↓
deterministic validation
      ↓
quality/duplication/SEO critic
      ↓
CI/build
      ↓
autopublish if inside whitelist
```

The AI writer may organize, explain and rewrite. It may not independently establish canonical formulas, legal/license facts, security facts, tool outputs or source claims.

Facts that can be derived from deterministic Tools engines should be generated from those engines rather than invented by the language model.

AI provider/model selection must remain replaceable behind an adapter/gateway layer.

---

# 7. AI cost guard

Unattended editorial AI requires explicit economic controls before production activation.

Minimum controls:

- per-run request/token/output limits;
- daily/monthly spend ceiling or equivalent provider/gateway budget;
- kill switch;
- rate limits;
- cheaper model/task class where quality permits;
- stronger model only for opportunities that pass an economic/quality threshold;
- no expensive generation merely because a schedule fired;
- cost recorded per editorial run at the finest practical level.

If budget is exhausted, generation pauses/degrades safely rather than creating uncontrolled cost.

---

# 8. Trend Radar

The autonomous growth system may use a freshness/trend layer to discover timely opportunities.

Signal priority:

1. Search Console and first-party site data;
2. structured public feeds/APIs/RSS;
3. public trend/news indexes such as GDELT or equivalent approved sources;
4. available Google Trends data/API access where current terms/access permit;
5. ethical HTML crawling of explicitly whitelisted domains only when structured sources are insufficient.

A hot topic is not sufficient by itself. It must be meaningfully connected to an existing Tools cluster or to a separately approved tool opportunity.

The site does not become a general-news publisher.

News acts as an opportunity trigger for useful timely/evergreen content, tool updates or explanations.

---

# 9. Ethical crawler hard gates

The crawler must:

- be whitelist-only;
- respect `robots.txt` and applicable source terms;
- use an identifiable crawler User-Agent/contact identity in production;
- prefer RSS/API/feed access over HTML crawling;
- use cache/content fingerprints to avoid repeated downloads;
- use conditional requests such as ETag/Last-Modified where supported;
- enforce per-domain rate/concurrency budgets;
- back off on `429`, `503` and equivalent pressure/error signals;
- never bypass login, paywall, CAPTCHA, WAF or anti-bot protection;
- never scrape private/user-specific areas;
- never republish complete third-party articles as product content by default;
- retain only the metadata/context needed for classification, source verification and citation workflows;
- maintain domain-level kill switches;
- maintain request budgets;
- never accept arbitrary user-supplied crawl URLs as a public SSRF proxy;
- remain logically separate from ad eligibility and public tool compute.

Crawler failures must degrade to less context/no publication, not to evasion.

---

# 10. Opportunity Engine

The autonomous system prioritizes actions using multiple signals rather than a fixed article calendar.

Candidate dimensions may include:

- search impressions/demand;
- current ranking/position;
- CTR gap;
- commercial/RPM potential;
- topical relevance;
- trend velocity/freshness;
- probability of improving an existing page instead of creating a new one;
- implementation/content cost;
- marginal backend cost;
- security/license confidence;
- repeat/direct-use value;
- internal-navigation/link value;
- cannibalization/duplication risk.

The score/formula may evolve from observed data without changing the governing hard gates.

---

# 11. No calendar-spam rule

The system must not create an article merely because a weekly/daily schedule fired.

Scheduled execution means **look for qualified work**, not **manufacture content**.

An unattended cycle is successful when it concludes that no publication is justified.

---

# 12. Measurement / pruning loop

Autonomous content/tool growth must include feedback and pruning.

Each publication should, where enough data exists, be re-evaluated over short/medium/long windows such as 7, 28, 90 and 180 days.

Possible actions:

- expand successful cluster;
- improve underperforming page;
- wait for more evidence;
- consolidate cannibalizing pages;
- noindex low-value content;
- redirect/remove content whose independent intent is not justified.

Automation that can only create but cannot stop/consolidate/prune fails the intended architecture.

---

# 13. Long-term tool/content scale

Launch 50 remains unchanged as the first public release gate.

After launch, 100, 200, 500+ tools are data-gated possibilities, not quotas.

The same applies to editorial count. The system may produce a large guide library over two years, but only when independent useful intent and measurable opportunity exist.

The preferred outcome is a smaller corpus of compounding useful assets rather than a larger corpus of thin pages.

---

# 14. Phase sequencing remains binding

This addendum **does not authorize implementation now**.

Current sequencing remains:

- Phase 1 market intelligence: active;
- Phase 2 OSS audit: active;
- Phase 3 capability map: not started;
- Phase 4 Launch 50 freeze: not started;
- later design/implementation gates remain prerequisites;
- autonomous growth implementation belongs primarily to post-launch Phases 21–24 and may be designed in advance but must not bypass earlier gates.

---

# 15. Binding supporting scope

`docs/tools/TOOLS_SCOPE.md` is the canonical product-scope summary for these decisions.

A future implementation spec/plan may add concrete interfaces, schedules, storage schemas and provider choices, but it may not weaken this addendum without another explicit authorization from Gabriel Menezes.
