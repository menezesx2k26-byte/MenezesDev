# MenezesDev Tools — Market Priority Ranking V2 WORKING B6

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** WORKING / expanded normalized subset through Market Batch 6  
**Not Launch 50. Not Phase 3.**

---

# 1. Scoring model

The working model remains unchanged:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

Where:

- D = demand;
- M = monetization/commercial signal;
- O = realistic organic opportunity;
- C = marginal cost efficiency;
- S = security/implementation confidence;
- R = repeat/linkability.

Scores are prioritization heuristics, not traffic/revenue forecasts. Evidence band and technical state outrank tiny numeric differences.

This file does not attempt to assign false precision to all 80 shortlist rows. It expands the evidence-normalized scoring subset only where the current research supports it.

---

# 2. Expanded normalized subset

| Rank | Candidate | Category | Score | Conf. | Tech | Role |
|---:|---|---|---:|:---:|---|---|
| 1 | Loan Calculator | Finance | **4.31** | A | LOCAL-CLEAR | revenue/traffic anchor |
| 2 | Markdown Previewer | Developer | **4.30** | A | LOCAL-BOUNDED | premium developer anchor |
| 3 | URL Encoder | Developer | **4.27** | A | LOCAL-CLEAR | premium developer anchor |
| 4 | Margin Calculator | Finance | **4.23** | A | INTERNAL | premium finance anchor |
| 5 | Image Resizer | Image | **4.16** | A | LOCAL-CLEAR | flagship traffic utility |
| 6 | UUID Generator | Developer | **4.13** | B+ | LOCAL-CLEAR | developer utility |
| 7 | JSON Validator | Developer | **4.09** | A | LOCAL-CLEAR | premium developer utility |
| 8 | Hash Generator / SHA family | Developer | **4.08** | B+ | LOCAL-CLEAR | developer/security utility |
| 9 | ROI Calculator | Finance | **4.08** | B+ | LOCAL-CLEAR | commercial finance utility |
| 10 | Image Metadata Viewer | Image | **4.05** | A-market | LOCAL-CONDITIONAL | privacy/image utility |
| 11 | Compound Interest Calculator | Finance | **4.05** | A | LOCAL-CLEAR | finance traffic anchor |
| 12 | Regex Tester | Developer | **4.04** | A | LOCAL-BOUNDED | premium developer anchor |
| 13 | Mortgage Calculator | Finance | **4.03** | A | LOCAL-CLEAR | mass finance traffic |
| 14 | Interest Calculator | Finance | **4.03** | A | LOCAL-CLEAR | commercial finance utility |
| 15 | Auto Loan Calculator | Finance | **4.03** | A | LOCAL-CLEAR | finance cluster depth |
| 16 | Amortization Calculator | Finance | **4.03** | A | LOCAL-CLEAR | finance anchor |
| 17 | Slope Calculator | Math | **4.01** | A | INTERNAL | math traffic anchor |
| 18 | Proportion Calculator | Math | **4.00** | A | INTERNAL | math traffic anchor |
| 19 | Base64 Decoder | Developer | **4.00** | A | INTERNAL | repeat developer traffic |
| 20 | Text Diff / Compare Text | Text/Dev | **3.99** | A | LOCAL-BOUNDED | high-repeat utility |
| 21 | Case Converter | Text | **3.94** | A | INTERNAL | traffic/repeat anchor |
| 22 | HTML Formatter | Developer | **3.92** | A | LOCAL-CONDITIONAL | high-CPC developer utility |
| 23 | Gradient/Palette Generator | Image/Color | **3.92** | A-market | LOCAL-CLEAR | design repeat utility |
| 24 | Remove Image Metadata | Image | **3.90** | B+ | LOCAL-CLEAR | privacy differentiator |
| 25 | CAGR Calculator | Finance | **3.89** | B+ | LOCAL-CLEAR | attainable finance long-tail |
| 26 | Volume Calculator | Math | **3.82** | A | INTERNAL | durable math traffic |
| 27 | Age Calculator | Date | **3.82** | A | LOCAL-CLEAR | mass low-CPC traffic |
| 28 | Color Contrast Checker | Image/Color | **3.78** | A-use/B-econ | LOCAL-CLEAR | accessibility/linkability |
| 29 | Password Generator | Developer | **3.68** | A | LOCAL-CLEAR | mass security traffic |
| 30 | XML Formatter | Developer | **3.69** | A | LOCAL-CLEAR | structured-data traffic |
| 31 | Image Compressor | Image | **3.64** | A | LOCAL-CONDITIONAL | global image utility |
| 32 | JSON Formatter | Developer | **3.62** | A | LOCAL-CLEAR | high-repeat traffic |
| 33 | Title Case Converter | Text | **3.59** | A-use/B-econ | INTERNAL | editorial repeat utility |
| 34 | Word Counter | Text | **3.58** | A | INTERNAL | mass low-CPC traffic |
| 35 | Slug Generator | Text/Dev | **3.55** | A-use/B-econ | INTERNAL | repeat utility |
| 36 | Character Counter | Text | **3.54** | A-market | INTERNAL | mass traffic companion |
| 37 | ZIP Create/Extract cluster | File | **3.48** | B/A-market | LOCAL-BOUNDED | privacy/file coverage |
| 38 | Split PDF | PDF | **3.40** | A-market | LOCAL-CONDITIONAL | PDF demand/coverage |
| 39 | WebP to PNG | Image | **3.50** | A-market | LOCAL-CONDITIONAL | conversion traffic |
| 40 | Merge PDF | PDF | **3.16** | A-market | LOCAL-CONDITIONAL | huge traffic, weak sampled monetization |

Ordering around rows with scores within ~0.1 should not be overinterpreted. Candidate role, evidence quality and technical caveats matter more than adjacent rank.

---

# 3. Material Batch-6 movements

## 3.1 Image Metadata Viewer enters near the top

The combination of:

- hundreds of thousands of monthly visits on a dedicated moderate-authority competitor;
- substantial Direct + Google mix;
- visible metadata/EXIF demand;
- an unusually strong `$6.82` CPC row for `metadata viewer` in a recent US snapshot;
- privacy/image-cluster fit;

makes this a serious shortlist candidate.

It does not become `LOCAL-CLEAR` because rich metadata parsing remains an untrusted-parser surface with explicit Phase-2 conditions.

## 3.2 Case Converter moves from generic text filler to an A candidate

A dedicated market with ~5M monthly visits, nearly 1M US visits and very high direct usage proves independent utility value. Moderate CPC prevents it from becoming a revenue flagship, but the zero-cost runtime makes the economics attractive.

## 3.3 Color Contrast Checker is valuable even without premium CPC evidence

The candidate's strength is different:

- durable accessibility workflow;
- trusted reference use;
- potential backlinks/documentation references;
- zero backend cost;
- strong cross-linking to color tools.

It is intentionally scored below premium finance/dev terms until direct economics are normalized.

## 3.4 Word Counter / Password / JSON Formatter return to the current view

They were never invalidated; they simply were not migrated into the first 28-row V2 working table.

All three have direct market evidence and zero-backend technical paths. Their role is predominantly traffic/repeat rather than CPC leadership.

---

# 4. Ranking versus shortlist

`MARKET_SHORTLIST_80_WORKING.md` is broader than this ranking table.

That is intentional:

- this file ranks candidates with relatively mature evidence;
- the 80-row shortlist also includes B/coverage rows that need cut tests;
- a low-evidence candidate should not receive a fake numeric score just because it appears in the shortlist.

The next Phase-1 objective is therefore not to force scores onto every row. It is to improve or eliminate the weakest shortlist candidates until the remaining pool can support a final Launch-50 decision without arbitrary guessing.

---

# 5. Current gate state

- Phase 1: **ACTIVE / first >50 working shortlist exists; ranking breadth improving**.
- Phase 2: **ACTIVE**.
- Phase 3: **NOT STARTED**.
- Launch 50: **NOT FROZEN**.
