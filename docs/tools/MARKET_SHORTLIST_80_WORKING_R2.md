# MenezesDev Tools — Market Shortlist 80 WORKING R2

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 + Phase 2 evidence  
**Status:** CURRENT WORKING SHORTLIST — not Launch 50, not Phase 3  
**Supersedes as current view:** `MARKET_SHORTLIST_80_WORKING.md`  
**Historical initial universe:** 172  
**Current admitted universe:** 174

---

# 1. R2 changes

The shortlist stays at **80**. New evidence must compete for slots rather than inflate the pool.

## Added

- Candidate #173 — **Retirement Calculator**
- Candidate #174 — **Budget Calculator**

## Demoted to reserve

- **Reading Time Calculator** — current direct US evidence ~2.9K / $0 CPC is too weak for the current top-80 pool.
- **Gzip Decompressor** — technically excellent but currently redundant for architecture coverage with ZIP Extractor/Gzip Compressor and lacks enough candidate-specific market evidence to defend a slot.

The second cut is a portfolio decision, not a technical rejection. `Gzip Decompressor` remains an easy future Tool Factory/reserve capability.

---

# 2. Current exact 80

## Finance / business — 18

1. Loan Calculator
2. Compound Interest Calculator
3. Mortgage Calculator
4. Auto Loan Calculator
5. Interest Calculator
6. Amortization Calculator
7. Margin Calculator
8. ROI Calculator
9. CAGR Calculator
10. Markup Calculator
11. Break-even Calculator
12. Savings Goal Calculator
13. Investment Growth Calculator
14. Simple Interest Calculator
15. Discount Calculator
16. Future Value Calculator
17. **Retirement Calculator** — admitted #173
18. **Budget Calculator** — admitted #174

## Math / general — 10

19. Slope Calculator
20. Proportion Calculator
21. Volume Calculator
22. Percentage Change Calculator
23. Percentage Calculator
24. Ratio Calculator
25. Area Calculator
26. Weighted Average Calculator
27. Scientific Notation Calculator
28. GCD/LCM Calculator

## Image / color — 11

29. Image Resizer
30. Image Compressor
31. Image Cropper
32. JPG to PNG
33. PNG to JPG
34. WebP to PNG
35. Image Metadata Viewer
36. Remove Image Metadata
37. SVG to PNG
38. Color Contrast Checker
39. Gradient/Palette Generator

## Text / writing — 7

40. Word Counter
41. Character Counter
42. Case Converter
43. Title Case Converter
44. Text Diff / Compare Text
45. Remove Duplicate Lines
46. Slug Generator

## Developer / structured data — 20

47. Markdown Previewer
48. URL Encoder
49. URL Decoder
50. JSON Validator
51. JSON Formatter
52. JSON Minifier
53. Base64 Encoder
54. Base64 Decoder
55. UUID Generator
56. Secure Token Generator
57. Random Password Generator
58. SHA-256 Hash Generator
59. File Hash Calculator
60. Regex Tester
61. HTML Formatter
62. JavaScript Formatter
63. CSS Formatter
64. XML Formatter
65. CSV to JSON
66. JSON to CSV

## Date / time — 3

67. Age Calculator
68. Date Difference Calculator
69. Unix Timestamp Converter

## Archive / file — 4

70. ZIP Creator
71. ZIP Extractor
72. Gzip Compressor
73. File Type Detector

## Structural PDF — 7

74. Split PDF
75. Merge PDF
76. Extract PDF Pages
77. Remove PDF Pages
78. Reorder PDF Pages
79. Rotate PDF Pages
80. Add Text Watermark to PDF

---

# 3. Why Retirement replaces Reading Time

The comparison is stark:

## Retirement Calculator

Current US signal:

- ~301K searches;
- ~$2.26 CPC;
- related retirement-planning terms with higher CPC;
- deterministic browser-local implementation.

## Reading Time Calculator

Current US signal:

- ~2.9K searches;
- $0 CPC on the head term;
- small related cluster;
- deterministic browser-local implementation.

When both have similarly tiny marginal infrastructure cost, the market signal decides.

**Replacement is approved in the working shortlist.**

---

# 4. Why Budget replaces Gzip Decompressor

## Budget Calculator

Current US signal:

- ~22.2K searches / ~$5.81 CPC;
- `budget tool` ~9.9K / ~$16.91;
- several same-intent terms around $5–8+ CPC;
- browser-only internal implementation;
- no bank integration required.

## Gzip Decompressor

- technically excellent native browser capability;
- zero backend cost;
- but weak candidate-specific market evidence so far;
- architecture/file coverage remains represented by ZIP Create/Extract, Gzip Compressor and File Type Detector.

Therefore Budget adds materially more economic upside without removing an entire architecture family from the shortlist.

**Replacement is approved in the working shortlist.**

---

# 5. Technical effect

Both new candidates are `LOCAL-CLEAR / INTERNAL`, audited in:

- `docs/tools/OSS_AUDIT_BATCH9_ADMITTED_FINANCE.md`

Removing Reading Time and Gzip Decompressor does not create a technical gap.

R2 therefore remains:

- **80/80 expected zero ordinary backend processing requests per operation**;
- no candidate requiring live external data;
- no HEIC/OCR/generic-PDF-compression HOLD capability forced into the pool.

The exact clear/conditional count should be read together with `PHASE2_SHORTLIST_80_COVERAGE.md`; replacing two clear candidates with two clear candidates leaves the aggregate technical risk profile materially unchanged.

---

# 6. Candidates now under strongest cut pressure

The next replacement/cut pass should challenge, in roughly this order:

1. Slug Generator — strong direct usage but weak visible acquisition economics;
2. File Type Detector — useful coverage but weak market normalization;
3. Gzip Compressor — cheap coverage, weak candidate economics;
4. Remove Duplicate Lines — cheap text utility, weak direct market evidence;
5. Savings Goal Calculator — broad savings cluster strong, exact goal intent still under-proven;
6. Discount Calculator — useful but easy/commodity;
7. Scientific Notation Calculator — education value, modest monetization;
8. GCD/LCM Calculator — education value, low commercial intent;
9. lower-evidence PDF structural operations beyond Merge/Split;
10. one or more formatter/data variants if market evidence fails to justify separate URLs.

A candidate can survive for architectural coverage, but that must be explicit rather than an excuse to keep every easy feature.

---

# 7. Strongest reserve/discovery challengers

Current challengers outside R2 include:

- Binary Converter — semantic hold, very strong observed economics;
- Hex Converter — semantic hold, very strong observed economics;
- Binary Translator — consolidation hold;
- Present Value Calculator — original reserve, technically local;
- YAML ↔ JSON — technically conditional reserve;
- JWT Decoder — semantics/trust reserve;
- Gzip Decompressor — newly demoted easy reserve;
- Reading Time Calculator — newly demoted low-economics reserve.

This means weak R2 rows are not protected by lack of alternatives.

---

# 8. Workflow state

- Phase 1: ACTIVE / working shortlist R2 exists.
- Phase 2: ACTIVE / all R2 families have local paths; conditional admission remains for a minority.
- Phase 3: NOT STARTED.
- Phase 4: NOT STARTED.
- Launch 50: NOT FROZEN.
