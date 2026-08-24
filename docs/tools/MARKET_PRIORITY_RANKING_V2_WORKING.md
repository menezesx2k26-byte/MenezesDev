# MenezesDev Tools — Market Priority Ranking V2 WORKING

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** WORKING / evidence-normalized subset expanded through Batch 5  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

This file supersedes `MARKET_PRIORITY_RANKING_V2_DRAFT.md` only as the **current working market-research view**. The older draft remains useful historical evidence and is not deleted.

It adds the strongest candidate-specific evidence from Market Intelligence Batches 3–5 while preserving the same weighted model:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

The score is a prioritization heuristic, not a traffic/revenue forecast. Confidence, implementation risk and portfolio role remain more important than small score differences.

Confidence notation:

- **A** — current direct candidate evidence is strong enough for the working comparison;
- **B** — promising but one more corroboration/currentness pass is preferred;
- **A-market** — market evidence is strong but technical/semantic/competition caveats remain;
- **A-use/B-econ** — product/repeat use is directly evidenced while SEO/AdSense economics remain under-proven.

---

# 2. Expanded evidence-normalized subset

| Rank | Candidate | Category | Score | D | M | O | C | S | R | Conf. | Tech |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 1 | Loan Calculator | Finance | **4.31** | 5.0 | 5.0 | 1.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 2 | Markdown Previewer | Developer | **4.30** | 4.3 | 5.0 | 2.8 | 4.8 | 4.6 | 5.0 | A | LOCAL-CLEAR/BOUNDED |
| 3 | URL Encoder | Developer | **4.27** | 3.5 | 5.0 | 3.2 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 4 | Margin Calculator | Finance | **4.23** | 4.5 | 5.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 5 | Image Resizer | Image | **4.16** | 5.0 | 3.5 | 2.4 | 5.0 | 5.0 | 4.5 | A | LOCAL-CLEAR |
| 6 | UUID Generator | Developer | **4.13** | 4.1 | 3.1 | 3.8 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 7 | JSON Validator | Developer | **4.09** | 3.5 | 4.7 | 2.6 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 8 | Hash Generator | Developer | **4.08** | 3.5 | 3.4 | 4.0 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 9 | ROI Calculator | Finance | **4.08** | 3.5 | 4.3 | 3.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 10 | Compound Interest Calculator | Finance | **4.05** | 5.0 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 11 | Regex Tester | Developer | **4.04** | 3.8 | 5.0 | 1.7 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 12 | Mortgage Calculator | Finance | **4.03** | 5.0 | 4.0 | 1.4 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 13 | Interest Calculator | Finance | **4.03** | 4.2 | 4.2 | 2.2 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 14 | Auto Loan Calculator | Finance | **4.03** | 4.5 | 4.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 15 | Amortization Calculator | Finance | **4.03** | 4.5 | 3.2 | 2.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 16 | Slope Calculator | Math | **4.01** | 4.8 | 3.8 | 1.8 | 5.0 | 5.0 | 3.8 | A | LOCAL-CLEAR |
| 17 | Proportion Calculator | Math | **4.00** | 4.8 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 18 | Base64 Decoder | Developer | **4.00** | 4.7 | 3.6 | 1.8 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 19 | Text Diff / Compare Text | Text/Dev | **3.99** | 4.0 | 4.0 | 2.2 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR/BOUNDED |
| 20 | HTML Formatter | Developer | **3.92** | 3.0 | 4.7 | 3.0 | 4.8 | 4.4 | 5.0 | A | LOCAL-CONDITIONAL |
| 21 | Palette Generator candidate | Image/Color | **3.92** | 4.5 | 3.5 | 1.7 | 5.0 | 5.0 | 5.0 | A-market | LOCAL-CLEAR |
| 22 | CAGR Calculator | Finance | **3.89** | 3.8 | 2.0 | 4.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 23 | Age Calculator | Date | **3.82** | 5.0 | 1.8 | 2.4 | 5.0 | 5.0 | 4.5 | A | LOCAL-CLEAR |
| 24 | Image Compressor | Image | **3.64** | 3.8 | 3.0 | 2.2 | 5.0 | 4.5 | 4.5 | A | LOCAL-CONDITIONAL |
| 25 | Slug Generator | Text/Dev | **3.55** | 3.2 | 1.0 | 4.0 | 5.0 | 5.0 | 5.0 | A-use/B-econ | LOCAL-CLEAR |
| 26 | ZIP Create/Extract cluster | File | **3.48** | 3.5 | 2.0 | 3.2 | 4.7 | 4.2 | 4.5 | B/A-market | LOCAL-BOUNDED |
| 27 | Split PDF | PDF | **3.40** | 4.5 | 2.2 | 1.8 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |
| 28 | Merge PDF | PDF | **3.16** | 5.0 | 1.0 | 1.2 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |

`Date Difference / Date Calculator` remains B-high outside the scored table because the attractive direct keyword row found in this pass is from October 2025 rather than a current 2026 snapshot. Physical-unit converters are also kept at cluster level until directional-query intent is normalized into a non-thin URL strategy.

---

# 3. Why Markdown Previewer enters the elite group

Current evidence for a dedicated Markdown preview site is unusually strong:

- ~1.56M monthly visits in July 2026;
- Google ~54% and Direct ~41%;
- US `markdown viewer` / `md viewer` evidence around 9.9K/8.1K volume with ~$6.27 CPC in the latest exposed US table;
- Authority Score around 47 rather than a mega-incumbent;
- Phase 2 already has an approved restricted `markdown-it` + DOMPurify local path.

The score still discounts Opportunity and Security modestly because Markdown is parsed untrusted input and viewer/editor/previewer expectations can overlap.

---

# 4. Why URL Encoder remains near the top

The score is not based on mass head volume. It is based on a rare combination:

- a current dedicated competitor around 186K visits/month;
- very high direct/repeat traffic;
- multiple exact US intent terms around $5.44 CPC in current snapshots;
- Authority Score around 47;
- browser-native zero-request implementation;
- strong relationship to URL Decoder and Base64.

This is a high-margin utility alongside mass-volume tools.

---

# 5. Why JSON Validator outranks generic JSON formatting economics

Current direct evidence for `json validator` is ~22.2K US volume / ~$4.36 CPC, with a dedicated competitor around 473K monthly visits and majority direct+Google traffic.

The product path is already technically approved using native JSON parsing with limits. Therefore the candidate has strong monetization without adding runtime cost or dependency risk.

The score still penalizes Opportunity because the incumbent has meaningful authority/backlinks.

---

# 6. Why Text Diff enters the A tier

Diffchecker demonstrates:

- ~2.18M visits/month;
- ~61% direct traffic;
- `diff checker` ~27.1K / ~$3.57 CPC;
- `text compare` ~27.1K / ~$1.26;
- strong engagement/repeat behavior.

This makes Text Diff materially different from low-CPC generic text utilities. Its technical path is local but bounded in a browser Worker for non-trivial input.

---

# 7. Why Palette, Age, Slug and ZIP have different portfolio roles

## Palette Generator

Coolors proves a large market (~5.2M monthly visits; `color palette generator` ~74K / ~$2.09 in the US), but the incumbent has an enormous authority/backlink moat. Keep as A-market, not an easy win. Candidate #68 also still needs semantic cleanup between palette and gradient expectations.

## Age Calculator

~1M US head-term volume with only ~$0.29 CPC. Excellent zero-backend traffic anchor; not a revenue flagship.

## Slug Generator

The dedicated low-AS domain receives ~283K visits but ~76% are direct and the visible organic keyword table is small/zero-CPC. This proves product/repeat value much better than it proves SEO/AdSense economics. It is deliberately downranked.

## ZIP

Competitor traffic proves real utility demand, but exposed exact US terms are modest. ZIP earns portfolio value from file-tool coverage, privacy/local execution and repeat use, under strict archive security limits.

---

# 8. Confidence-aware tiers through Batch 5

## Tier A1 — current direct evidence + local-clear/high-confidence path

Likely shortlist anchors unless later cannibalization/portfolio evidence disqualifies them:

- Loan Calculator
- Markdown Previewer
- URL Encoder
- Margin Calculator
- Image Resizer
- JSON Validator
- Compound Interest Calculator
- Regex Tester
- Mortgage Calculator
- Interest Calculator
- Auto Loan Calculator
- Amortization Calculator
- Slope Calculator
- Proportion Calculator
- Base64 Decoder
- Text Diff / Compare Text
- Age Calculator (traffic-role anchor)

## Tier A2 — market validated with technical/semantic/competition caveat

- HTML Formatter
- Palette Generator candidate
- Image Compressor
- Split PDF
- Merge PDF

## Tier B-high — strong enough to continue, one more evidence/currentness pass preferred

- UUID Generator
- Hash Generator
- ROI Calculator
- CAGR Calculator
- URL Decoder
- Date Difference / Date Calculator
- ZIP Create/Extract cluster

## Supporting/hold rather than current anchor

- Slug Generator — useful/repeat but weak visible acquisition economics;
- physical converter families — enormous volume but mostly low CPC; IA must solve directional-query thin-page risk;
- CSV ↔ JSON — attractive exact historical economics but current evidence gap.

---

# 9. Out-of-universe discovery queue

Market Batch 4 found unusually strong current RapidTables US signals for capabilities not explicitly named in the initial 172:

- `binary converter` ~550K / ~$7.65;
- `hex converter` ~165K / ~$9.75;
- `binary translator` ~135K / ~$9.35.

They are **not silently added** to the canonical 172 count.

A later research/consolidation decision must determine whether they:

- deserve explicit new candidates;
- replace weaker overlapping converter candidates;
- belong inside a broader number-base conversion utility;
- or fail an independent-intent/anti-thin gate.

---

# 10. Research holds still worth pursuing

High-priority unresolved:

- Markup Calculator
- Break-even Calculator
- Savings Goal Calculator
- Secure Token Generator versus consolidation with random-string/password tooling
- Loan Payment Calculator versus Loan Calculator
- Investment Growth Calculator
- File Hash as separate intent versus generic Hash Generator
- Color Contrast Checker
- Remove Image Metadata
- CSV ↔ JSON current evidence
- YAML ↔ JSON
- SVG Optimizer
- selected unit-converter families / number-base discovery

A candidate being easy/local does not earn a Launch URL without enough evidence of independent intent.

---

# 11. Cluster signal: JSON Diff

Current market evidence shows a dedicated JSON diff site can receive substantial organic/direct usage, but JSON Diff is not automatically inserted as a 173rd candidate.

Before any expansion it must pass independent intent, semantic distinction from Text Diff, clear structural-diff semantics and the anti-thin/cannibalization gate.

---

# 12. Current Phase-1 gate status

Phase 1 remains **ACTIVE / materially advanced**.

The A/A-market/B-high pool is now much less speculative, but it is still below the breadth needed for a final >50 evidence-based shortlist with reasonably comparable depth.

The next research pass should prioritize candidates likely to rank inside the top ~70 **and** already LOCAL-CLEAR or close to it, while using low-value findings to prune rather than inflate the list.

Phase 2 remains ACTIVE. Phase 3 Capability Map remains **NOT STARTED**.
