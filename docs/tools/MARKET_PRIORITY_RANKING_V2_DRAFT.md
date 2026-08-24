# MenezesDev Tools — Market Priority Ranking V2 DRAFT

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** DRAFT / targeted normalization only  
**Not Launch 50. Not Phase 3.**

---

# 1. Why this is a draft

Ranking V1 intentionally mixed high-confidence rows with B/C hypotheses to tell us what to research next.

Batches 2 and 2B have now produced direct candidate evidence for a useful subset, but ROI/Markup/Break-even/Savings and several developer/data candidates still do not have equal evidence depth.

Therefore this file does **not** pretend to be a fully normalized ranking of all 172 candidates.

It is the first V2 pass over candidates whose market and technical evidence are strong enough to compare more honestly.

---

# 2. Scoring model

The same V1 weighted dimensions are retained in this draft so score movement reflects evidence changes rather than a changed formula:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

Where:

- D = demand;
- M = monetization/commercial signal;
- O = organic opportunity / realistic attainability;
- C = cost efficiency;
- S = security/implementation confidence;
- R = repeat/linkability.

Confidence remains separate from score:

- **A** — direct current candidate evidence;
- **B** — useful direct/secondary or partially corroborated evidence;
- **A-market** — market evidence is strong, but technical path is still conditional;
- **C** — hypothesis remains insufficiently validated and is omitted from the normalized table below.

A high B score is not promoted over an A candidate merely because the heuristic differs by a few hundredths.

---

# 3. Evidence-normalized ranking subset

| Rank | Candidate | Category | Score | D | M | O | C | S | R | Conf. | Tech |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 1 | Loan Calculator | Finance | **4.31** | 5.0 | 5.0 | 1.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 2 | Margin Calculator | Finance | **4.23** | 4.5 | 5.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 3 | Image Resizer | Image | **4.16** | 5.0 | 3.5 | 2.4 | 5.0 | 5.0 | 4.5 | A | LOCAL-CLEAR |
| 4 | UUID Generator | Developer | **4.13** | 4.1 | 3.1 | 3.8 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 5 | Hash Generator | Developer | **4.08** | 3.5 | 3.4 | 4.0 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 6 | ROI Calculator | Finance | **4.08** | 3.5 | 4.3 | 3.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 7 | Compound Interest Calculator | Finance | **4.05** | 5.0 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 8 | Regex Tester | Developer | **4.04** | 3.8 | 5.0 | 1.7 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 9 | Mortgage Calculator | Finance | **4.03** | 5.0 | 4.0 | 1.4 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 10 | Interest Calculator | Finance | **4.03** | 4.2 | 4.2 | 2.2 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 11 | Auto Loan Calculator | Finance | **4.03** | 4.5 | 4.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 12 | Amortization Calculator | Finance | **4.03** | 4.5 | 3.2 | 2.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 13 | Slope Calculator | Math | **4.01** | 4.8 | 3.8 | 1.8 | 5.0 | 5.0 | 3.8 | A | LOCAL-CLEAR |
| 14 | Proportion Calculator | Math | **4.00** | 4.8 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 15 | Base64 Decoder | Developer | **4.00** | 4.7 | 3.6 | 1.8 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 16 | HTML Formatter | Developer | **3.92** | 3.0 | 4.7 | 3.0 | 4.8 | 4.4 | 5.0 | A | LOCAL-CONDITIONAL |
| 17 | CAGR Calculator | Finance | **3.89** | 3.8 | 2.0 | 4.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 18 | Image Compressor | Image | **3.64** | 3.8 | 3.0 | 2.2 | 5.0 | 4.5 | 4.5 | A | LOCAL-CONDITIONAL |
| 19 | Split PDF | PDF | **3.40** | 4.5 | 2.2 | 1.8 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |
| 20 | Merge PDF | PDF | **3.16** | 5.0 | 1.0 | 1.2 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |

---

# 4. Important rank changes versus V1

## 4.1 Margin Calculator moves into the elite group

Direct US evidence now shows 110K monthly volume and ~$4 CPC. Its Market score rises while Opportunity is reduced for strong incumbent competition.

Result: **4.23**, behind Loan but ahead of most other normalized candidates.

## 4.2 Image Resizer becomes a probable flagship

Direct US evidence repeatedly exposes ~673K volume / ~$0.88 CPC, and dedicated lower-authority tools can receive substantial traffic.

Result: **4.16**.

This is especially attractive because the audited runtime remains browser-local with zero per-operation backend compute.

## 4.3 Amortization strengthens without needing heroic assumptions

246K US monthly volume / ~$0.79 CPC plus a page-one result from a materially lower-authority domain improves both Demand and realistic Opportunity.

Result: **4.03**.

## 4.4 ROI moves from speculation to high-value B candidate

A current Google-Ads-derived snapshot reports ~27.1K US volume / ~$2.86 CPC and a broad overlapping intent family.

The score becomes **4.08**, but confidence remains B until corroborated.

## 4.5 HTML Formatter changes character

The direct head volume is much smaller than V1 assumed, but CPC remains excellent (~$4–5 for related formatting/beautification terms).

Result: **3.92**.

This is a high-value developer-cluster tool, not a mass-volume anchor.

## 4.6 Image Compressor normalizes downward in US-weighted scoring

US `image compressor` evidence is around 49.5K / $0.71 in multiple Semrush snapshots, although international variants are dramatically larger.

Result: **3.64** in the normalized US-weighted pass.

It remains strategically valuable because of global demand, repeat use, privacy positioning and zero-backend economics.

## 4.7 PDF volume does not automatically win

Merge PDF has millions of searches in a sampled market, but very low CPC and huge incumbents. Split PDF has lower volume but somewhat better CPC and evidence of a lower-authority site participating in related SERPs.

Result:

- Split PDF: **3.40**;
- Merge PDF: **3.16**.

They remain architecture/traffic-cluster candidates rather than revenue flagships.

---

# 5. Confidence-aware tiers

Exact numeric adjacency is less important than confidence and role.

## Tier A1 — direct evidence + local-clear + strong economics

- Loan Calculator
- Margin Calculator
- Image Resizer
- Compound Interest Calculator
- Regex Tester
- Mortgage Calculator
- Interest Calculator
- Auto Loan Calculator
- Amortization Calculator
- Slope Calculator
- Proportion Calculator
- Base64 Decoder

These should be treated as likely shortlist anchors unless later SERP/cannibalization work reveals a disqualifier.

## Tier A2 — direct market evidence but technical/portfolio caveat

- HTML Formatter — dependency/bundle path conditional;
- Image Compressor — local path conditional/benchmark-sensitive;
- Split PDF — hostile-input/PDF conditional;
- Merge PDF — hostile-input/PDF conditional + weak sampled CPC/high incumbent strength.

## Tier B-high — economically attractive but requires one more evidence pass

- ROI Calculator
- UUID Generator
- Hash Generator
- CAGR Calculator

These are not rejected. They are specifically the best next candidates to corroborate.

---

# 6. Research-hold candidates carried from V1

The following high V1 candidates are intentionally **not** assigned a new normalized V2 rank yet because direct candidate evidence remains insufficient or inconsistent:

- Secure Token Generator;
- Loan Payment Calculator as distinct from Loan Calculator;
- Savings Goal Calculator;
- Markup Calculator;
- Break-even Calculator;
- Investment Growth Calculator;
- URL Encoder;
- URL Decoder;
- File Hash Calculator as a separate URL from generic hash tooling;
- Color Contrast Checker;
- Remove Image Metadata;
- Text Diff;
- Markdown Previewer;
- Slug Generator;
- CSV ↔ JSON;
- YAML ↔ JSON;
- SVG Optimizer;
- several physical converter families.

The correct action is more research, not filling the missing cells from intuition.

---

# 7. Portfolio implications already visible

Even before full V2 normalization, a likely Launch-50 shape is emerging:

1. **Finance/business** provides the strongest commercial-value browser-local cluster.
2. **Image** provides some of the best mass demand while staying mostly local.
3. **Developer** provides high CPC/repeat usage and extremely low marginal cost.
4. **Math/general calculators** provide durable volume and topical graph depth.
5. **Text** remains a low-cost traffic stabilizer.
6. **PDF** should be included selectively for demand/coverage, not allowed to dominate because raw volume is seductive.

No exact category count is frozen here.

---

# 8. Phase gate status

Phase 1 remains **ACTIVE**.

This draft is enough to narrow where the next market-research effort goes, but not enough to declare all Launch-50 choices evidence-normalized.

Phase 2 remains **ACTIVE**.

Phase 3 Capability Map remains **NOT STARTED**.

The next high-value Phase-1 action is to corroborate the Tier B-high rows and validate the best remaining research-hold candidates until a >50 shortlist can be formed without arbitrary guesses.
