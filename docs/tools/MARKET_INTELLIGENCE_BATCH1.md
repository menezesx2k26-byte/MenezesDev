# MenezesDev Tools — Market Intelligence Batch 1

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global market intelligence  
**Status:** ACTIVE — first evidence-backed market map and candidate universe  
**Important:** traffic/keyword figures below are third-party estimates/snapshots, useful for prioritization rather than guarantees.

---

# 1. Executive finding

The global utility-tool market is large enough to justify the MenezesDev Tools thesis, and the strongest evidence is spread across several independent utility archetypes rather than one single competitor:

1. **PDF utilities** can reach enormous scale.
2. **Calculators** can generate tens of millions of monthly visits with deterministic, zero-backend functionality.
3. **File/image conversion** has extremely strong search-led demand.
4. **Simple text utilities** can sustain multi-million monthly traffic with almost no operating cost.
5. **Developer tools** have lower raw volume than mass-market calculators/converters but can carry materially higher CPC on some intents.
6. A free-tools site can be monetized with ads while keeping a free tier — TinyWow publicly describes ads as a monetization mechanism and operates hundreds of tools.

The strategic implication is not “copy one competitor.” It is to build a **balanced portfolio of high-volume mass utilities plus higher-commercial-value developer/finance intents**, while selecting implementations that remain local in the browser whenever possible.

---

# 2. Competitor market map

## 2.1 PDF — iLovePDF

Semrush July 2026 snapshot:

- estimated visits: **250.21M/month**;
- Authority Score: **92**;
- direct + Google organic dominate traffic;
- India is the largest country, followed by **Brazil** and the United States;
- June 2026 organic traffic estimate was ~166.9M.

The product catalog spans merge, split, remove/extract/reorder pages, compress, Office conversions, JPG/PDF, rotate, page numbers, watermark, security, forms, OCR and newer AI/document-intelligence tools.

Interpretation:

- PDF intent is proven at massive scale;
- Brazil being a major market supports our English-first + PT-BR-secondary strategy;
- many high-value PDF features are server-heavy or parser-heavy, so we should target the subset that our audited browser stack can safely support rather than copy the entire catalog.

Sources:
- https://www.semrush.com/website/ilovepdf.com/overview/
- https://www.ilovepdf.com/
- https://www.ilovepdf.com/pricing

## 2.2 General free tools — TinyWow

Current public product positioning:

- **200+/250+ tools** across PDF, image, video, file and AI categories;
- no-sign-up free experience remains central;
- public privacy/monetization page states the site monetizes free use with ads; current premium offering removes ads/CAPTCHAs and adds priority processing.

Semrush June 2026 traffic estimate:

- ~**1.92M visits/month**;
- Authority Score ~51.

Interpretation:

- validates the “large utility catalog + ads” model directly;
- also shows why MenezesDev should differentiate economically: TinyWow performs server processing and even AI/OCR, while our default should eliminate server compute for deterministic tools.

Sources:
- https://tinywow.com/
- https://tinywow.com/tools
- https://tinywow.com/your-data
- https://www.semrush.com/website/tinywow.com/overview/

## 2.3 Calculators — Calculator.net

Semrush July 2026:

- ~**61.07M visits/month**;
- Authority Score ~90;
- ~38.6M organic-search visits estimated;
- US is the largest market.

Visible US keyword snapshot:

| Keyword | Est. monthly volume | CPC USD |
|---|---:|---:|
| calculator | 24.9M | 0.53 |
| calorie calculator | 3.35M / recent snapshots 2.74M–3.35M | 0.72–0.82 |
| tip calculator | 1.5M | 0.06 |
| BMI calculator | 4.09M | 0.15 |
| mortgage calculator | 3.35M | 0.59 |

Interpretation:

- calculators are one of the strongest browser-first categories available to us;
- raw volume can be extraordinary while per-operation hosting cost is effectively zero;
- some health calculators are high-volume but require careful non-diagnostic wording and may not be the best initial AdSense-risk/quality choice compared with finance/math calculators.

Source:
- https://www.semrush.com/website/calculator.net/overview/

## 2.4 Long-tail calculators — Omni Calculator

Semrush June 2026:

- ~**14.29M visits/month**;
- Authority Score ~83;
- ~15.8M organic-search estimate in the same report;
- US largest market; Brazil appears among top markets.

Visible US keyword examples:

| Keyword | Volume | CPC USD |
|---|---:|---:|
| tip calculator | 1.5M | 0.06 |
| proportion calculator | 550K | 1.22 |
| slope calculator | 550K | 1.33 |
| volume calculator | 550K | 0.41 |

Interpretation:

The winning calculator strategy is not only broad head terms. A large graph of specific, useful mathematical/financial calculators can collectively build traffic and internal linking depth.

Source:
- https://www.semrush.com/website/omnicalculator.com/overview/

## 2.5 Reference/conversion utilities — RapidTables

Semrush June 2026:

- ~**11.8M visits/month**;
- Authority Score ~78;
- audience strongly US-weighted;
- Google/direct traffic dominate.

Interpretation:

Unit conversion, reference tables, numeric/electrical/web/color utilities have durable demand and map extremely well to zero-backend execution.

Source:
- https://www.semrush.com/website/rapidtables.com/overview/

## 2.6 Text utility — WordCounter

Semrush June 2026:

- ~**11.16M visits/month**;
- Authority Score ~70.

Visible US keyword snapshot:

| Keyword | Volume | CPC USD |
|---|---:|---:|
| word counter | 1.0M | 0.08 |
| word count | 246K | 0.08 |
| character counter | 201K | 0.07 |
| word count checker | 27.1K | 0.12 |

Interpretation:

The CPC is modest, but operating cost is essentially zero and the utility has strong repeat/direct usage. This is a valuable portfolio stabilizer rather than a high-RPM flagship.

Source:
- https://www.semrush.com/website/wordcounter.net/overview/

## 2.7 Developer utilities — CodeBeautify

Semrush June 2026:

- ~**2.55M visits/month**;
- Authority Score ~61;
- ~588K organic-search estimate in the report;
- direct and Google are dominant.

Visible US keyword examples:

| Keyword | Volume | CPC USD |
|---|---:|---:|
| code beautify | 6.6K | 5.15 |
| code beautification | 8.1K | 4.93 |
| HTML viewer | 40.5K | 4.28 |
| random phone numbers | 14.8K | 1.29 |

Interpretation:

Developer utilities can have **far higher CPC** than mass-market word/conversion terms even with lower volume. They belong in the balanced portfolio because most can execute locally and attract a commercially valuable technical audience.

Source:
- https://www.semrush.com/website/codebeautify.org/overview/

## 2.8 File/image converters — CloudConvert, Convertio, FreeConvert

June 2026 Semrush estimates:

| Domain | Monthly visits | Authority Score | Search-led evidence |
|---|---:|---:|---|
| cloudconvert.com | 32.16M | 74 | ~73.7% of desktop traffic from Google organic in report |
| convertio.co | 20.27M | 71 | Google organic leading source; Brazil largest market |
| freeconvert.com | 43.07M | 82 | Google organic leading source |

Visible keyword examples:

| Keyword | Market/source | Volume | CPC USD |
|---|---|---:|---:|
| file compressor | US / FreeConvert | 673K | 0.66 |
| PDF converter | US / FreeConvert | 301K | 0.63 |
| video converter | US / FreeConvert | 246K | 0.54 |
| HEIC to JPG | US / FreeConvert | 246K | 0.03 |
| MP3 converter | US / CloudConvert | 246K | 0.73 |
| WebP to PNG | US / CloudConvert | 165K | 0.02 |
| WebP to PNG | Brazil / Convertio | 49.5K | 0.01 |

Interpretation:

- enormous demand exists in file conversion;
- not every high-volume conversion is attractive for us because audio/video and some proprietary formats can require huge codecs/backend compute;
- browser-native image conversions are especially attractive because we can participate in this search market with near-zero operating cost.

Sources:
- https://www.semrush.com/website/cloudconvert.com/overview/
- https://www.semrush.com/website/convertio.co/overview/
- https://www.semrush.com/website/freeconvert.com/overview/

---

# 3. Finance/calculator monetization signal

Finance is particularly attractive because many intents combine large volume, reasonable/high CPC and deterministic local math.

Visible 2026 US examples:

| Keyword | Estimated volume | CPC USD | Evidence source |
|---|---:|---:|---|
| mortgage calculator | 3.35M | 0.59 | Bankrate / MortgageCalculator.org |
| loan calculator | 1.22M–1.5M | 1.31–4.25 across current snapshots | Bankrate / FinAid |
| compound interest calculator | ~1.22M | 0.48 | Investor.gov / Bankrate |
| auto loan calculator | 550K | 0.49 | Bankrate |
| investment calculator | 450K | 0.65 | Investor.gov |
| interest calculator | 135K | 1.78 | Investor.gov |

The variation in CPC between snapshots/domains is a reminder that CPC is not revenue and should not be treated as a guaranteed RPM. It is still a useful **commercial-intent signal**.

Sources:
- https://www.semrush.com/website/bankrate.com/overview/
- https://www.semrush.com/website/investor.gov/overview/
- https://www.semrush.com/website/finaid.org/overview/
- https://www.semrush.com/website/mortgagecalculator.org/overview/

---

# 4. Market scoring model for candidate tools

Every candidate should ultimately receive a scored row before Launch 50 freeze.

Proposed normalized dimensions (0–5):

- **D — Demand:** search volume / breadth of related queries / competitor traffic evidence.
- **M — Monetization:** CPC/commercial intent and probable advertiser density, not merely raw searches.
- **O — Opportunity:** realistic ranking opportunity for a new domain/subsection; higher means more attainable.
- **C — Cost efficiency:** 5 for deterministic browser-only; lower for heavy local/WASM; 0–1 for recurring paid backend compute.
- **S — Security/implementation confidence:** current audited path and hostile-input posture.
- **R — Repeat/linkability:** likelihood of repeat direct usage, backlinks or related-tool navigation.

Initial weighted score:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

Rules:

1. A high demand score cannot compensate for an unresolved license/security gate.
2. A high CPC does not justify a server-expensive tool with weak economics.
3. Search-volume estimates from a single provider are not sufficient by themselves for freeze.
4. Exact long-tail/keyword evidence should be recorded when available.
5. Zero-backend candidates get structural preference because traffic growth does not linearly increase cost.

---

# 5. Candidate universe — deliberately larger than Launch 50

The list below is **not** the Launch 50. It is the Phase 1 universe to be scored, consolidated and cut later.

## 5.1 Calculators — math/general

1. Percentage Calculator
2. Percentage Change Calculator
3. Ratio Calculator
4. Proportion Calculator
5. Average Calculator
6. Weighted Average Calculator
7. Fraction Calculator
8. Fraction to Decimal Calculator
9. Decimal to Fraction Calculator
10. Scientific Notation Calculator
11. Exponent Calculator
12. Root Calculator
13. Slope Calculator
14. Distance Between Points Calculator
15. Midpoint Calculator
16. Pythagorean Theorem Calculator
17. Triangle Calculator
18. Circle Calculator
19. Area Calculator
20. Volume Calculator
21. Standard Deviation Calculator
22. Mean/Median/Mode Calculator
23. Permutation & Combination Calculator
24. GCD/LCM Calculator
25. Prime Factorization Calculator

## 5.2 Calculators — finance/business

26. Compound Interest Calculator
27. Simple Interest Calculator
28. Loan Calculator
29. Loan Payment Calculator
30. Amortization Calculator
31. Mortgage Calculator
32. Auto Loan Calculator
33. Investment Growth Calculator
34. ROI Calculator
35. CAGR Calculator
36. Present Value Calculator
37. Future Value Calculator
38. Savings Goal Calculator
39. Discount Calculator
40. Margin Calculator
41. Markup Calculator
42. Break-even Calculator
43. Tip Calculator
44. VAT Calculator (rate supplied / locale-specific snapshot)
45. Sales Tax Calculator (careful jurisdiction/date scope)

## 5.3 Image / color

46. Image Resizer
47. Image Cropper
48. Image Rotator
49. Image Flipper
50. Image Compressor
51. JPG to PNG
52. PNG to JPG
53. JPG to WebP
54. PNG to WebP
55. WebP to PNG
56. WebP to JPG
57. Image Metadata Viewer
58. Remove Image Metadata
59. SVG to PNG
60. SVG to JPG
61. SVG Optimizer
62. Color Converter
63. HEX to RGB
64. RGB to HEX
65. HSL to HEX/RGB
66. OKLCH Converter
67. Color Contrast Checker
68. Gradient/Palette Generator (deterministic local)
69. Aspect Ratio Calculator
70. Image Dimension/Pixel Calculator

**Research-gated image candidates:** HEIC to JPG, HEIC to PNG, AVIF conversion — demand exists, but current safe universal codec path is not approved.

## 5.4 PDF

71. Merge PDF
72. Split PDF
73. Extract PDF Pages
74. Remove PDF Pages
75. Reorder PDF Pages
76. Rotate PDF Pages
77. Add Page Numbers to PDF
78. Add Text Watermark to PDF
79. Add Image Watermark to PDF
80. Images to PDF
81. PDF Metadata Viewer
82. Edit PDF Metadata
83. Clear Standard PDF Metadata
84. Fill PDF Form
85. Flatten PDF Form
86. PDF Page to Image

**Research-gated PDF candidates:** generic PDF compression, arbitrary PDF text extraction, arbitrary edit/remove existing text, repair PDF, OCR PDF, unlock/decrypt PDF.

## 5.5 Text / writing primitives

87. Word Counter
88. Character Counter
89. Line Counter
90. Sentence Counter
91. Reading Time Calculator
92. Case Converter
93. Title Case Converter
94. Remove Extra Spaces
95. Remove Duplicate Lines
96. Sort Lines
97. Reverse Lines
98. Text Diff / Compare Text
99. Find & Replace Text
100. Text Repeater
101. Slug Generator
102. Unicode Normalizer
103. Markdown Previewer
104. Markdown to HTML (sanitized output/download)
105. HTML to Plain Text

## 5.6 Developer / structured-data

106. JSON Formatter
107. JSON Validator
108. JSON Minifier
109. JSON to YAML
110. YAML to JSON
111. YAML Formatter
112. XML Formatter
113. XML Validator
114. XML to JSON (restricted deterministic mapping)
115. CSV Viewer
116. CSV Formatter
117. CSV to JSON
118. JSON to CSV
119. Base64 Encoder
120. Base64 Decoder
121. URL Encoder
122. URL Decoder
123. Query String Parser
124. Query String Builder
125. UUID Generator
126. Secure Token Generator
127. Random Password Generator
128. SHA-256 Hash Generator
129. SHA-512 Hash Generator
130. File Hash Calculator
131. Regex Tester
132. JavaScript Formatter
133. CSS Formatter
134. HTML Formatter
135. HTML Sanitizer / Cleaner
136. HTML Viewer (safe sandbox design required)
137. JWT Decoder (decode/inspect only; never imply signature verification unless implemented)
138. Unix Timestamp Converter
139. HTTP Status Code Lookup (static data)
140. MIME Type Lookup (static curated data)

## 5.7 Converters / units

141. Length Converter
142. Weight/Mass Converter
143. Temperature Converter
144. Area Converter
145. Volume Converter
146. Speed Converter
147. Pressure Converter
148. Energy Converter
149. Power Converter
150. Data Storage Converter
151. Angle Converter
152. Time Unit Converter
153. Fuel Economy Converter
154. Frequency Converter
155. Data Transfer Rate Converter

## 5.8 Date/time

156. Date Difference Calculator
157. Age Calculator
158. Add/Subtract Days Calculator
159. Business Days Calculator
160. Days Until Date Calculator
161. Time Duration Calculator
162. Unix Timestamp to Date
163. Date to Unix Timestamp
164. Time Zone Offset Converter (IANA/local data considerations)

## 5.9 Archive / file

165. ZIP Creator
166. ZIP Extractor
167. ZIP File Viewer/List Contents
168. Gzip Compressor
169. Gzip Decompressor
170. File Type Detector
171. File Size Converter
172. File Checksum Tool

Total initial universe: **172 named candidates/capabilities**, before consolidation and exact-intent scoring.

This intentionally exceeds Launch 50 by a wide margin. Thin/overlapping candidates will be consolidated during scoring rather than treated as a target page count.

---

# 6. First-priority opportunity clusters

These clusters deserve early scoring because current evidence combines demand with strong browser economics.

## Tier A — strongest immediate research priority

### Finance/math calculators

Reasons:

- very large visible search volumes;
- commercial-intent CPC evidence;
- deterministic local formulas;
- tiny bundle/runtime cost;
- easy PT-BR localization while retaining English canonical content.

Focus first on:

- compound interest;
- loan;
- mortgage;
- amortization;
- investment growth;
- percentage/proportion/slope/volume.

### Text counters / transforms

Reasons:

- WordCounter proves multi-million traffic can accumulate around an ultra-cheap utility;
- virtually zero attack/compute cost after input caps;
- useful direct/repeat behavior.

### Browser-native image conversion

Reasons:

- converter competitors prove enormous traffic;
- `WebP to PNG` alone shows high search volume even with low CPC;
- local browser execution means we can compete without copying their server cost structure.

Prioritize supported safe format pairs, not every possible extension.

### Developer formatters/inspectors

Reasons:

- lower demand but visible CPC of ~$4–5 on some CodeBeautify terms;
- high desktop/technical audience quality;
- JSON/encoding/hash/formatter tools are near-zero marginal cost.

## Tier B — high value but technical/search competition must be challenged

### Structural PDF

Massive market evidence, but competitors have huge authority. Prefer precise intents we can execute safely and privately in-browser:

- merge;
- split;
- extract/remove/reorder/rotate pages;
- page numbers/watermark;
- metadata.

Privacy can be a real product differentiator because many incumbent web PDF workflows upload documents, whereas our selected operations can be local.

### ZIP/archive

Good general utility and local architecture, but search demand/CPC needs more specific keyword validation before Launch 50 slots are spent.

## Tier C — demand proven but blocked/expensive

- HEIC to JPG — high visible volume, but safe current codec path is unresolved;
- generic PDF compression — large incumbent demand, but no approved hostile-input local engine yet;
- audio/video conversion — large demand, but codec bundles/performance/complexity may work against launch economics;
- OCR — useful but current local model licensing/safety unresolved;
- generative AI — compute economics conflict with the zero-backend launch thesis;
- live FX/market tools — require fresh external data and separate cost/cache model.

These remain candidates, not Launch commitments.

---

# 7. Strategic market conclusions

1. **The browser-first constraint is an economic advantage, not only an engineering preference.** We can enter search markets occupied by server-processing competitors without scaling compute cost linearly with traffic.
2. **Finance/math + developer utilities are especially interesting together.** The former supplies enormous broad demand; the latter supplies higher CPC/technical users.
3. **PDF deserves representation but not domination of Launch 50.** The incumbents' authority is enormous and some high-volume PDF jobs have unresolved parser/codec risk.
4. **PT-BR is commercially sensible as secondary locale.** Brazil is a major market for iLovePDF and Convertio, while English gives access to the US/India/global search pool.
5. **High-volume low-CPC tools still matter when marginal cost is near zero.** Word counter is the clearest example.
6. **Do not chase high-volume file types with unsafe codec stacks.** HEIC demand is real, but current audit says HOLD; the market signal is recorded so we can revisit when the technical gate changes.
7. **No single traffic source should be assumed.** Strong competitors combine organic and direct/repeat use; Tool UX must be good enough to create return usage, not merely satisfy one SERP click.

---

# 8. Phase 1 next actions

Before Phase 1 can close:

1. score and rank at least the strongest ~80 candidates using the D/M/O/C/S/R model;
2. gather keyword-volume/CPC evidence for the highest-impact clusters, prioritizing English US/global intent;
3. consolidate overlapping candidates into real distinct search intents;
4. identify SERP incumbents and rough authority/difficulty for top candidates;
5. tag candidates with Phase 2 technical status (`LOCAL-CLEAR`, `LOCAL-CONDITIONAL`, `HOLD`, etc.);
6. produce a ranked shortlist substantially larger than 50 so Phase 3/4 can make the final portfolio decision without guessing.

Phase 1 remains **ACTIVE** after this document.
