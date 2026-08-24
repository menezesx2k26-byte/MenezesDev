# MenezesDev Tools — Market Shortlist 80 WORKING R4

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 + Phase 2 evidence  
**Status:** CURRENT WORKING SHORTLIST — not Launch 50, not Phase 3  
**Historical initial universe:** 172  
**Current admitted universe:** 177  
**Supersedes current view:** R3

---

# 1. R4 replacement decisions

The shortlist remains fixed at **80**.

## Added/promoted

- original candidate #9 **Decimal to Fraction Calculator**
- admitted candidate #177 **Random Number Generator**

## Demoted to reserve

- **File Type Detector**
- **Remove Duplicate Lines**

Demotion means market-priority reserve, not technical rejection.

---

# 2. Why these replacements are rational

## Decimal to Fraction > File Type Detector

Current US signal from CalculatorSoup/Semrush:

- `decimal to fraction`: ~673K monthly searches;
- CPC ~US$2.65;
- strong proven calculator intent.

Technical path:

- exact decimal-string -> BigInt rational conversion;
- internal Euclidean GCD reduction;
- no dependency;
- 0 backend requests.

File Type Detector remains a technically useful browser-local capability, but exact-intent market evidence is currently much weaker and the signature database has more ongoing maintenance surface than exact rational math.

## Random Number Generator > Remove Duplicate Lines

Current US signal:

- `random number generator`: ~1.22M monthly searches;
- CPC ~US$1.66.

Technical path:

- `crypto.getRandomValues()`;
- rejection sampling for unbiased ranges;
- no dependency;
- 0 backend requests.

Remove Duplicate Lines has obvious utility and many current browser-local implementations, but the market is fragmented and current direct volume/CPC evidence is materially weaker than the admitted RNG opportunity.

---

# 3. Anti-thin decisions carried into R4

Batch 8 resolved several possible consolidations.

## Keep separate

- **Case Converter** and **Title Case Converter**;
- **Word Counter** and **Character Counter**;
- **Compound Interest Calculator** and **Investment Growth Calculator**;
- **Future Value Calculator** remains separate for now.

These tools may share engines/components but have independently evidenced user/search intent.

## Keep under pressure

- Savings Goal Calculator;
- Scientific Notation Calculator;
- lower-evidence structural PDF operations;
- some formatter/data variants.

## Retain traffic-role candidate

- GCD/LCM Calculator — strong current volume despite ~$0 CPC.

---

# 4. Current exact 80

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
17. Retirement Calculator
18. Budget Calculator

## Math / general — 12

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
29. **Decimal to Fraction Calculator**
30. **Random Number Generator**

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

# 5. R4 technical profile

Both R4 additions are `LOCAL-CLEAR / INTERNAL` and replace one `LOCAL-CONDITIONAL`-leaning capability (broad File Type Detector) plus one internal text primitive.

Net effect:

- no new dependency;
- no new parser;
- no WASM requirement;
- no backend per ordinary operation;
- attack/supply-chain surface does not increase;
- expected market economics improve materially.

The previous aggregate 63 clear / 17 conditional estimate should improve by at least one conditional-to-clear slot after exact recount, because File Type Detector was conditional while Decimal to Fraction is clear. A formal exact recount should be done in the next shortlist coverage revision rather than relying on mental arithmetic.

---

# 6. Current reserve pool

Notable reserve/demoted capabilities now include:

- Reading Time Calculator;
- Slug Generator;
- Remove Duplicate Lines;
- File Type Detector;
- Gzip Compressor;
- Gzip Decompressor;
- Sort Lines;
- YAML ↔ JSON;
- JWT Decoder;
- Present Value Calculator;
- other original Batch-1 candidates.

Reserve is intentionally strong. The project is no longer at risk of needing weak tools merely to reach 50.

---

# 7. Next cut pressure after R4

Most vulnerable current rows:

1. Savings Goal Calculator;
2. Scientific Notation Calculator;
3. Discount Calculator, unless its high-CPC percent-off cluster proves sufficiently distinct from Percentage Calculator;
4. lower-evidence PDF operations beyond Merge/Split;
5. formatter/data variants whose exact independent-intent evidence remains weak;
6. one or more image conversion variants if intent/capability overlap is too high;
7. ZIP Creator/Extractor if market evidence remains weaker than reserve challengers.

Strong reserve/challenger families worth validating next:

- Fraction Calculator / Fraction-to-Decimal;
- Present Value Calculator;
- Standard Deviation / Mean-Median-Mode;
- selected color/image privacy utilities;
- selected data/encoding utilities;
- any newly discovered candidate only through explicit dated admission.

---

# 8. Workflow status

- Phase 1: **ACTIVE / R4 shortlist exists**.
- Phase 2: **ACTIVE / R4 additions have local-clear paths**.
- Phase 3: **NOT STARTED**.
- Launch 50: **NOT FROZEN**.
- No implementation is authorized by this file.
