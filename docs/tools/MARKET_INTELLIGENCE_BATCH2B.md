# MenezesDev Tools — Market Intelligence Batch 2B

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — second candidate-specific evidence pass  
**Parent:** `docs/tools/MARKET_INTELLIGENCE_BATCH2.md`

---

# 1. Purpose

Continue closing evidence gaps identified in Batch 2 without pretending that all remaining candidates have equal evidence depth.

This batch focuses on ROI and developer-generator opportunities where useful current keyword datasets became available.

---

# 2. ROI Calculator — direct US signal found

A current Google-Ads-derived dataset reports for the United States:

- `roi calculator`: **27,100 monthly searches**;
- CPC: **$2.86**;
- Google Ads competition signal: **0.15**;
- data updated: **2026-07-11**.

Strong-overlap related terms in the same dataset include:

- `return on investment calculator`: 27,100 / $2.86;
- `roi calculator investment`: 14,800 / $0.88;
- `how to calculate roi`: 12,100 / $2.40;
- `investment roi calculator`: 12,100 / $1.99;
- `calculate roi`: 3,600 / $3.21.

Source:
- https://www.seodata.dev/keyword/roi-calculator

The source states that its keyword data is retrieved through the Google Ads API. This is useful direct evidence, but because the V2 confidence system prefers corroboration for important promotions, ROI is upgraded only to **B**, not A.

## Interpretation

ROI is now much stronger than a pure hypothesis:

- moderate head demand;
- high CPC compared with most utility keywords;
- a large same-intent/adjacent query family;
- deterministic browser-only math;
- no dependency required for the core engine;
- natural links to Margin, CAGR, Investment Growth and Break-even.

The Google Ads competition value is a paid-ad signal and must **not** be treated as organic keyword difficulty.

### Confidence change

`C -> B`

### Recommended V2 posture

Keep Demand moderate, raise Monetization, keep Cost/Security maxed, and avoid inflating organic Opportunity until SERP authority/competition is separately measured.

---

# 3. UUID Generator — secondary direct-intent evidence strengthened

KDROI's current tool-intent dataset reports:

- `uuid generator`: **110,000 monthly searches**;
- estimated difficulty: 22/100;
- CPC: **$0.85**.

Source:
- https://kdroi.io/analysis/uuid-generator

The same source family reports `hash generator` around 45K monthly searches / $1.15 CPC.

This is useful but remains a secondary source versus Semrush/Google-Ads-derived evidence used for A-confidence rows.

### Decision

- UUID remains **B**, but with stronger launch-shortlist interest;
- do not promote to A without corroboration;
- runtime remains exceptionally attractive because simple UUID v4 can use native `crypto.randomUUID()`;
- no backend request is justified.

---

# 4. Hash Generator — secondary evidence strengthened

KDROI reports:

- `hash generator`: **45,000 monthly searches**;
- estimated difficulty: 20/100;
- CPC: **$1.15**.

Source:
- https://kdroi.io/analysis/hash-generator

Interpretation:

- meaningful developer/security-adjacent intent;
- decent commercial signal;
- native Web Crypto path for SHA-family operations;
- file hashing can remain local with chunked/worker handling as required;
- no public server compute needed.

### Confidence change

`C -> B` for the generic Hash Generator hypothesis.

Exact URL decisions between text-hash, SHA-256, SHA-512 and file-hash still need anti-thin-intent analysis. A family of algorithm-permutation pages is not automatically justified.

---

# 5. Markup / Break-even / Savings Goal remain gaps

Current 2026 SERPs contain many dedicated implementations, including business/e-commerce-specific break-even calculators, but the present research pass still lacks a sufficiently trustworthy candidate-specific monthly volume/CPC row for:

- Markup Calculator;
- generic Break-even Calculator;
- Savings Goal Calculator.

The existence of current tools is evidence of user utility, not enough to fabricate a market score.

These remain in the evidence queue.

---

# 6. Candidate delta table

| Candidate | Prior conf. | New conf. | Evidence | Decision |
|---|:---:|:---:|---|---|
| ROI Calculator | C | B | 27.1K US / $2.86 + overlapping ROI terms | upgrade research priority |
| UUID Generator | B | B stronger | 110K / $0.85 secondary source | strong local candidate; await corroboration |
| Hash Generator | C | B | 45K / $1.15 secondary source | upgrade research priority |
| Markup Calculator | C | C | direct metric still missing | no invented upgrade |
| Break-even Calculator | C | C | direct metric still missing | no invented upgrade |
| Savings Goal Calculator | C | C | direct metric still missing | no invented upgrade |

---

# 7. Phase impact

Phase 1 remains **ACTIVE**.

The evidence set is now strong enough to produce a **targeted V2 draft** for evidence-normalized candidates, but not to claim the entire 172-candidate universe has equal validation depth.

Phase 3 remains **NOT STARTED**.
