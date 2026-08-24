# MenezesDev Tools — Market Priority Ranking V2 WORKING

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** WORKING / evidence-normalized subset expanded through Batch 3  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

This file supersedes `MARKET_PRIORITY_RANKING_V2_DRAFT.md` only as the **current working market-research view**. The older draft remains useful historical evidence and is not deleted.

It adds the strongest Batch-3 candidates while preserving the same weighted model:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

The score is a prioritization heuristic, not a traffic/revenue forecast. Confidence and technical gate state remain more important than small score differences.

---

# 2. Expanded evidence-normalized subset

| Rank | Candidate | Category | Score | D | M | O | C | S | R | Conf. | Tech |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 1 | Loan Calculator | Finance | **4.31** | 5.0 | 5.0 | 1.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 2 | URL Encoder | Developer | **4.27** | 3.5 | 5.0 | 3.2 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 3 | Margin Calculator | Finance | **4.23** | 4.5 | 5.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 4 | Image Resizer | Image | **4.16** | 5.0 | 3.5 | 2.4 | 5.0 | 5.0 | 4.5 | A | LOCAL-CLEAR |
| 5 | UUID Generator | Developer | **4.13** | 4.1 | 3.1 | 3.8 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 6 | JSON Validator | Developer | **4.09** | 3.5 | 4.7 | 2.6 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 7 | Hash Generator | Developer | **4.08** | 3.5 | 3.4 | 4.0 | 5.0 | 5.0 | 4.5 | B | LOCAL-CLEAR |
| 8 | ROI Calculator | Finance | **4.08** | 3.5 | 4.3 | 3.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 9 | Compound Interest Calculator | Finance | **4.05** | 5.0 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 10 | Regex Tester | Developer | **4.04** | 3.8 | 5.0 | 1.7 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 11 | Mortgage Calculator | Finance | **4.03** | 5.0 | 4.0 | 1.4 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 12 | Interest Calculator | Finance | **4.03** | 4.2 | 4.2 | 2.2 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 13 | Auto Loan Calculator | Finance | **4.03** | 4.5 | 4.0 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 14 | Amortization Calculator | Finance | **4.03** | 4.5 | 3.2 | 2.8 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 15 | Slope Calculator | Math | **4.01** | 4.8 | 3.8 | 1.8 | 5.0 | 5.0 | 3.8 | A | LOCAL-CLEAR |
| 16 | Proportion Calculator | Math | **4.00** | 4.8 | 3.5 | 2.0 | 5.0 | 5.0 | 4.0 | A | LOCAL-CLEAR |
| 17 | Base64 Decoder | Developer | **4.00** | 4.7 | 3.6 | 1.8 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR |
| 18 | Text Diff / Compare Text | Text/Dev | **3.99** | 4.0 | 4.0 | 2.2 | 5.0 | 5.0 | 5.0 | A | LOCAL-CLEAR/BOUNDED |
| 19 | HTML Formatter | Developer | **3.92** | 3.0 | 4.7 | 3.0 | 4.8 | 4.4 | 5.0 | A | LOCAL-CONDITIONAL |
| 20 | CAGR Calculator | Finance | **3.89** | 3.8 | 2.0 | 4.2 | 5.0 | 5.0 | 4.0 | B | LOCAL-CLEAR |
| 21 | Image Compressor | Image | **3.64** | 3.8 | 3.0 | 2.2 | 5.0 | 4.5 | 4.5 | A | LOCAL-CONDITIONAL |
| 22 | Split PDF | PDF | **3.40** | 4.5 | 2.2 | 1.8 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |
| 23 | Merge PDF | PDF | **3.16** | 5.0 | 1.0 | 1.2 | 4.5 | 3.8 | 4.5 | A-market | LOCAL-CONDITIONAL |

---

# 3. Why URL Encoder jumps near the top

The score is not based on massive head volume. It is based on a rare combination:

- a current dedicated competitor around 186K visits/month;
- ~47% direct traffic, supporting repeat use;
- multiple exact US intent terms around $5.44 CPC;
- Authority Score ~47 rather than a mega-incumbent AS90+;
- browser-native zero-request implementation;
- strong relationship to URL Decoder and Base64.

This is exactly the kind of high-margin utility the portfolio needs alongside mass-volume tools.

---

# 4. Why JSON Validator outranks generic JSON formatting economics

Current direct evidence for `json validator` is ~22.2K US volume / ~$4.36 CPC, with a dedicated competitor around 473K monthly visits and majority direct+Google traffic.

The product path is already technically approved using native JSON parsing with limits. Therefore the candidate has strong monetization without adding runtime cost or dependency risk.

The score still penalizes Opportunity because the incumbent has meaningful authority/backlinks.

---

# 5. Why Text Diff enters the A tier

Diffchecker demonstrates:

- ~2.18M visits/month;
- ~61% direct traffic;
- `diff checker` ~27.1K / ~$3.57 CPC;
- `text compare` ~27.1K / ~$1.26;
- strong engagement/repeat behavior.

This makes Text Diff materially different from low-CPC generic text utilities.

Its technical path is local, but CPU/memory work is bounded through Worker/input/time/result limits, so its cost score remains high without pretending computational complexity is zero.

---

# 6. Confidence-aware tiers after Batch 3

## Tier A1 — current direct evidence + local-clear/high-confidence path

Likely shortlist anchors unless later cannibalization/portfolio evidence disqualifies them:

- Loan Calculator
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

## Tier A2 — market validated, technical/competition caveat

- HTML Formatter
- Image Compressor
- Split PDF
- Merge PDF

## Tier B-high — strong economics but one more market-evidence pass preferred

- UUID Generator
- Hash Generator
- ROI Calculator
- CAGR Calculator
- URL Decoder (paired-intent evidence strong; standalone current keyword table incomplete)

---

# 7. Research holds still worth pursuing

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
- Markdown Previewer
- Slug Generator
- CSV ↔ JSON current evidence
- YAML ↔ JSON
- SVG Optimizer
- selected unit-converter families

A candidate being easy/local does not earn a Launch URL without enough evidence of independent intent.

---

# 8. Cluster signal: JSON Diff

Current market evidence shows a dedicated JSON diff site can receive substantial organic/direct usage, but JSON Diff is not automatically inserted as a 173rd candidate.

Before any expansion it must pass:

- independent search intent;
- semantic distinction from Text Diff;
- clear JSON structural-diff semantics;
- anti-thin/cannibalization gate.

This preserves the integrity of the 172-candidate research universe while allowing new evidence to inform future decisions.

---

# 9. Current Phase-1 gate status

Phase 1 remains **ACTIVE / materially advanced**.

The normalized A/A-market/B-high set is now more credible, but it is still too small to form a final >50 shortlist with comparable evidence depth.

Next research should prioritize unresolved candidates that are both:

1. likely to rank inside the top ~70 by economics; and
2. already LOCAL-CLEAR or close to it.

Phase 3 remains **NOT STARTED**.
