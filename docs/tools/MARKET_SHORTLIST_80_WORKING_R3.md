# MenezesDev Tools — Market Shortlist 80 WORKING R3

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 + Phase 2 evidence  
**Status:** CURRENT WORKING SHORTLIST — not Launch 50, not Phase 3  
**Historical initial universe:** 172  
**Current admitted universe:** 176  
**Supersedes current view:** R2

---

# 1. R3 replacement decisions

The shortlist remains fixed at **80**.

## Added

- #175 **Number Base Converter**
- #176 **Binary Translator**

## Demoted to reserve

- **Slug Generator**
- **Gzip Compressor**

Both demotions preserve the capability in the wider research/reserve universe; they are not technical rejections.

---

# 2. Why the replacements are rational

## Number Base Converter > Gzip Compressor

Number Base Converter has previously observed current signals around:

- `binary converter`: ~550K / ~$7.65 CPC;
- `hex converter`: ~165K / ~$9.75 CPC.

Current SERP review confirms the numeric conversion intent can be consolidated cleanly into one base-conversion utility rather than many directional pages.

Technical path:

- internal/browser;
- arbitrary-precision/string-safe logic;
- 0 backend requests;
- no dependency.

Gzip Compressor remains technically excellent through native CompressionStream, but candidate-specific market evidence is much weaker and archive/file coverage survives through ZIP tools/File Type Detector.

## Binary Translator > Slug Generator

Binary Translator has previously observed signal around:

- `binary translator`: ~135K / ~$9.35 CPC.

Current SERP review confirms text ↔ binary is semantically separate from numeric base conversion.

Technical path:

- TextEncoder/TextDecoder;
- internal byte formatting/parsing;
- 0 backend requests;
- no dependency.

Slug Generator remains useful and has strong direct-use evidence, but visible organic/CPC economics are materially weaker.

---

# 3. Current exact 80

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

## Text / writing — 6

40. Word Counter
41. Character Counter
42. Case Converter
43. Title Case Converter
44. Text Diff / Compare Text
45. Remove Duplicate Lines

## Developer / structured data — 22

46. Markdown Previewer
47. URL Encoder
48. URL Decoder
49. JSON Validator
50. JSON Formatter
51. JSON Minifier
52. Base64 Encoder
53. Base64 Decoder
54. UUID Generator
55. Secure Token Generator
56. Random Password Generator
57. SHA-256 Hash Generator
58. File Hash Calculator
59. Regex Tester
60. HTML Formatter
61. JavaScript Formatter
62. CSS Formatter
63. XML Formatter
64. CSV to JSON
65. JSON to CSV
66. **Number Base Converter**
67. **Binary Translator**

## Date / time — 3

68. Age Calculator
69. Date Difference Calculator
70. Unix Timestamp Converter

## Archive / file — 3

71. ZIP Creator
72. ZIP Extractor
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

# 4. Technical profile improves in R3

#175 and #176 are both `LOCAL-CLEAR` with no dependency.

They replace two `LOCAL-CLEAR` candidates, so raw clear/conditional counts do not worsen. More importantly, they provide materially better observed market economics without adding any parser/supply-chain burden.

R3 continues to have:

- **0 ordinary backend-processing requirements**;
- **0 HOLD/UNRESOLVED capability requirements**;
- local execution for every candidate;
- technical conditionality concentrated in the same minority families as before.

---

# 5. Current reserve pool strengthened

Demoted but easy future capabilities now include:

- Reading Time Calculator;
- Slug Generator;
- Gzip Compressor;
- Gzip Decompressor;
- Sort Lines;
- YAML ↔ JSON;
- JWT Decoder;
- Present Value Calculator;
- other original Batch-1 candidates.

This is healthy: Launch selection has many cheap reserves and does not need to preserve marginal tools merely for quantity.

---

# 6. Next cut pressure after R3

Most vulnerable current rows:

1. File Type Detector;
2. Remove Duplicate Lines;
3. Savings Goal Calculator;
4. Discount Calculator;
5. Scientific Notation Calculator;
6. GCD/LCM Calculator;
7. lower-evidence PDF operations beyond Merge/Split;
8. formatter/data variants whose independent intent remains under-proven;
9. one of Case Converter / Title Case if cannibalization evidence favors consolidation;
10. one of Word Counter / Character Counter if a combined utility is clearly superior.

The next pass should seek challengers or stronger evidence rather than mechanically cutting to 50 now.

---

# 7. Workflow status

- Phase 1: ACTIVE / R3 shortlist exists.
- Phase 2: ACTIVE.
- Phase 3: NOT STARTED.
- Launch 50: NOT FROZEN.
