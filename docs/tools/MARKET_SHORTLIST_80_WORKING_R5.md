# MenezesDev Tools — Market Shortlist 80 WORKING R5

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 + Phase 2 evidence  
**Status:** CURRENT WORKING SHORTLIST — not Launch 50, not Phase 3  
**Historical initial universe:** 172  
**Current admitted universe:** 177  
**Supersedes current view:** R4

---

# 1. R5 replacement decisions

The shortlist remains fixed at **80**.

## Added/promoted

- original candidate #7 **Fraction Calculator**
- original candidate #21 **Standard Deviation Calculator**

## Demoted to reserve

- **Scientific Notation Calculator**
- **Savings Goal Calculator**

Both demotions preserve the capabilities in the wider research/reserve universe.

---

# 2. Why these replacements are rational

## Fraction Calculator > Scientific Notation Calculator

Current US June 2026 evidence:

- `fraction calculator` ~368K searches / ~$0.82 CPC on DadsWorksheets;
- a moderate-authority AS42 site participates around position #6;
- independent corroborating March 2026 snapshot also showed ~368K head volume.

Technical path:

- exact rational integer/BigInt arithmetic;
- Euclidean GCD simplification;
- no dependency;
- 0 backend requests.

Scientific Notation remains a real utility, but current candidate-specific market evidence is materially weaker.

## Standard Deviation > Savings Goal

Current US May 2026 evidence:

- `standard deviation calculator` ~49.5K / ~$1.77 CPC;
- StatsKingdom appears around position #9.

Technical path:

- stable Welford/two-pass descriptive statistics;
- sample vs population semantics explicit;
- no dependency;
- 0 backend requests.

Savings Goal overlaps an already deep finance cluster and still lacks equally strong direct current exact-intent evidence.

---

# 3. Anti-thin decisions carried into R5

Keep separate based on current evidence:

- Case Converter / Title Case Converter;
- Word Counter / Character Counter;
- Compound Interest / Investment Growth / Future Value;
- Discount Calculator / Percentage Calculator;
- Fraction Calculator / Decimal to Fraction Calculator;
- Number Base Converter / Binary Translator.

Shared engine primitives are encouraged, but shared implementation does not automatically mean shared search intent/URL.

---

# 4. Current exact 80

## Finance / business — 17

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
12. Investment Growth Calculator
13. Simple Interest Calculator
14. Discount Calculator
15. Future Value Calculator
16. Retirement Calculator
17. Budget Calculator

## Math / statistics — 13

18. Slope Calculator
19. Proportion Calculator
20. Volume Calculator
21. Percentage Change Calculator
22. Percentage Calculator
23. Ratio Calculator
24. Area Calculator
25. Weighted Average Calculator
26. GCD/LCM Calculator
27. Decimal to Fraction Calculator
28. Random Number Generator
29. Fraction Calculator
30. Standard Deviation Calculator

## Image / color — 11

31. Image Resizer
32. Image Compressor
33. Image Cropper
34. JPG to PNG
35. PNG to JPG
36. WebP to PNG
37. Image Metadata Viewer
38. Remove Image Metadata
39. SVG to PNG
40. Color Contrast Checker
41. Gradient/Palette Generator

## Text / writing — 5

42. Word Counter
43. Character Counter
44. Case Converter
45. Title Case Converter
46. Text Diff / Compare Text

## Developer / structured data — 22

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
67. Number Base Converter
68. Binary Translator

## Date / time — 3

69. Age Calculator
70. Date Difference Calculator
71. Unix Timestamp Converter

## Archive / file — 2

72. ZIP Creator
73. ZIP Extractor

## Structural PDF — 7

74. Split PDF
75. Merge PDF
76. Extract PDF Pages
77. Remove PDF Pages
78. Reorder PDF Pages
79. Rotate PDF Pages
80. Add Text Watermark to PDF

---

# 5. R5 technical profile

Both promoted candidates are `LOCAL-CLEAR / INTERNAL` and replace two already-clear/internal candidates.

Therefore the R4 aggregate remains:

- **64/80 clear/internal/local-bounded**;
- **16/80 local-conditional**;
- **0/80 backend-required**;
- **0/80 HOLD/UNRESOLVED**;
- **80/80 0 MenezesDev backend-processing requests per ordinary operation**.

Market quality improves without worsening technical risk.

---

# 6. Current reserve pool is now strong

Notable reserve/demoted candidates include:

- Scientific Notation Calculator;
- Savings Goal Calculator;
- Reading Time Calculator;
- Slug Generator;
- Remove Duplicate Lines;
- File Type Detector;
- Gzip Compressor / Decompressor;
- Present Value Calculator;
- Sort Lines;
- YAML ↔ JSON;
- JWT Decoder;
- other original Batch-1 candidates.

---

# 7. Next cut pressure after R5

Priority challenges:

1. reduce the seven-row PDF block to only operations whose market value justifies hostile-input admission work;
2. validate independent intent of CSV ↔ JSON and formatter variants;
3. test whether File Hash deserves a separate indexed tool from text SHA-256;
4. review Image conversion overlap and whether all three current format routes deserve Launch consideration;
5. continue searching reserve candidates that can beat lower-tail rows without adding backend/dependency risk;
6. narrow toward a final evidence-backed pool still >50, not directly to 50 yet.

Phase 1/2 remain ACTIVE. Phase 3 remains NOT STARTED.
