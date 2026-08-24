# MenezesDev Tools — Market Priority Ranking V1

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global market intelligence  
**Status:** PROVISIONAL / evidence-expansion required  
**Not a Launch 50 freeze.** Phase 3 and Phase 4 remain NOT STARTED.

This ranking crosses market evidence with the audited Phase 2 technical/economic status. It exists to prioritize **what to validate next**, not to manufacture false precision or prematurely select the final 50.

---

# 1. Ranking model

Each candidate is scored from 0–5 on:

- **D — Demand:** search volume, competitor traffic, breadth of related intent.
- **M — Monetization:** CPC/commercial intent/advertiser density signal.
- **O — Opportunity:** estimated attainability for a new Tools surface; higher means more realistically rankable.
- **C — Cost efficiency:** preference for zero-backend/browser-local execution.
- **S — Security/implementation confidence:** current audited safe execution path.
- **R — Repeat/linkability:** repeat direct use, internal-navigation or linking potential.

Weighted score:

```text
Score = 0.25D + 0.20M + 0.20O + 0.15C + 0.15S + 0.05R
```

This is a prioritization heuristic, not a statistical forecast of traffic or AdSense revenue.

## Evidence confidence

- **A:** candidate-specific current keyword/competitor evidence is available.
- **B:** strong adjacent/category evidence exists, but the exact candidate needs deeper keyword/SERP validation.
- **C:** economically/technically plausible hypothesis; exact market evidence is still thin.

**A high score with C confidence is a research priority, not a launch commitment.**

---

# 2. Current direct evidence anchors

The following current snapshots materially inform the ranking. Third-party SEO/traffic numbers are estimates, not guarantees.

## Finance / calculators

- Calculator.net: ~61.07M monthly visits in July 2026; major calculator search demand.
- US `mortgage calculator`: ~3.35M searches, ~$0.59 CPC in the audited snapshot.
- `loan calculator`: current snapshots around 1.22M–1.5M searches; CPC varied materially by source/domain (~$1.31 to ~$4.25).
- `compound interest calculator`: around 1.22M searches, ~$0.48 CPC in a current snapshot.
- `auto loan calculator`: ~550K, ~$0.49 CPC.
- OmniCalculator evidence: `proportion calculator` ~550K / ~$1.22 CPC, `slope calculator` ~550K / ~$1.33 CPC, `volume calculator` ~550K / ~$0.41 CPC.

Sources:
- https://www.semrush.com/website/calculator.net/overview/
- https://www.semrush.com/website/bankrate.com/overview/
- https://www.semrush.com/website/investor.gov/overview/
- https://www.semrush.com/website/finaid.org/overview/
- https://www.semrush.com/website/omnicalculator.com/overview/

## Regex

Semrush June 2026 estimate for regex101.com:

- ~579.86K monthly visits;
- Authority Score 52;
- ~61.86% direct traffic and ~26.54% from Google in the snapshot;
- previous current snapshot exposed `regex tester` at ~18.1K US monthly volume and ~$8.38 CPC.

This is a strong commercial-intent signal but also evidence of a mature incumbent with ~15K+ referring domains, so ranking opportunity is deliberately scored lower.

Source:
- https://www.semrush.com/website/regex101.com/overview/

## Base64

Semrush June 2026 estimate for base64decode.org:

- ~9.68M monthly visits;
- Authority Score 62;
- ~606.96K organic-search estimate;
- strong direct/repeat usage;
- South Korea represents ~64% of traffic in the snapshot, so geo concentration is a material caveat;
- Korean-market keyword snapshot: `base64` ~135K / $1.56 CPC, `base64 decode` ~8.1K / $4.06 CPC.

The ranking therefore preserves strong demand/repeat scores but reduces opportunity compared with the initial heuristic.

Source:
- https://www.semrush.com/website/base64decode.org/overview/

## JWT

Current public evidence:

- jwt.io estimated ~1.8M monthly visits in July 2026 by a third-party analytics snapshot;
- current dedicated keyword-analysis source estimates `jwt decoder` around 45K monthly searches, ~$1.45 CPC and moderate/low estimated keyword difficulty.

These are useful signals but not as authoritative/consistent as the Semrush domain snapshots above, so JWT remains confidence B until deeper SERP/keyword validation.

Sources:
- https://analytics.explodingtopics.com/website/jwt.io
- https://kdroi.io/analysis/jwt-decoder
- https://www.jwt.io/

## Password generator

Semrush June 2026:

- `password generator`: ~368K US volume / ~$0.12 CPC;
- `random password generator`: ~74K / ~$0.05 CPC;
- the audited dedicated domain itself only received ~21K monthly visits, while listed competitors have larger traffic.

The evidence confirms demand but materially lowers the monetization score versus the first heuristic.

Source:
- https://www.semrush.com/website/passwordsgenerator.net/overview/

## JSON/XML developer formatting

Semrush June 2026 for jsonformatter.org:

- ~2.55M visits;
- ~690K organic search estimate;
- India snapshot: `json formatter` ~246K / ~$0.01 CPC, `json beautifier` ~110K / ~$0.01, `xml formatter` ~40.5K / ~$0.

This proves demand and repeat use, but the direct CPC signal is low. These tools remain attractive mainly because marginal operating cost is near zero and they strengthen the developer cluster.

Source:
- https://www.semrush.com/website/jsonformatter.org/overview/

## Word/character tools

WordCounter June 2026 market evidence already recorded in Batch 1:

- ~11.16M visits;
- `word counter` ~1M US volume / ~$0.08 CPC;
- `character counter` ~201K / ~$0.07 CPC.

High volume + very low marginal cost, but low commercial intent.

Source:
- https://www.semrush.com/website/wordcounter.net/overview/

## File/image conversion

Current competitor estimates already recorded:

- FreeConvert ~43.07M visits/month;
- CloudConvert ~32.16M;
- Convertio ~20.27M;
- `file compressor` ~673K / ~$0.66 CPC in the FreeConvert US snapshot;
- `WebP to PNG` ~165K / ~$0.02 in a CloudConvert US snapshot;
- `HEIC to JPG` ~246K / ~$0.03, but HEIC is technically HOLD in the current safety audit.

Sources:
- https://www.semrush.com/website/freeconvert.com/overview/
- https://www.semrush.com/website/cloudconvert.com/overview/
- https://www.semrush.com/website/convertio.co/overview/

---

# 3. Provisional top-80 ranking

**Important:** exact score ordering will change as B/C-confidence candidates receive candidate-specific evidence. The purpose is to focus research, not to treat rank #19 as objectively superior to #20.

| # | Candidate | Category | Score | D | M | O | C | S | R | Conf. | Tech |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|:---:|---|
| 1 | Loan Calculator | Finance | 4.31 | 5 | 5 | 1.8 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 2 | Base64 Encoder | Developer | 4.08 | 4.3 | 3.8 | 2.5 | 5 | 5 | 5 | B | LOCAL-CLEAR |
| 3 | HTML Formatter | Developer | 4.07 | 4 | 4.2 | 3 | 4.8 | 4.4 | 5 | B | LOCAL-CONDITIONAL |
| 4 | Secure Token Generator | Developer | 4.06 | 3.5 | 3.5 | 3.8 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 5 | Loan Payment Calculator | Finance | 4.06 | 4 | 4.5 | 2.3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 6 | Compound Interest Calculator | Finance | 4.05 | 5 | 3.5 | 2 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 7 | Regex Tester | Developer | 4.04 | 3.8 | 5 | 1.7 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 8 | JavaScript Formatter | Developer | 4.03 | 4 | 4.2 | 2.8 | 4.8 | 4.4 | 5 | B | LOCAL-CONDITIONAL |
| 9 | Interest Calculator | Finance | 4.03 | 4.2 | 4.2 | 2.2 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 10 | Mortgage Calculator | Finance | 4.03 | 5 | 4 | 1.4 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 11 | Margin Calculator | Finance | 4.03 | 3.7 | 4 | 3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 12 | Auto Loan Calculator | Finance | 4.03 | 4.5 | 4 | 2 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 13 | Slope Calculator | Math | 4.01 | 4.8 | 3.8 | 1.8 | 5 | 5 | 3.8 | A | LOCAL-CLEAR |
| 14 | CAGR Calculator | Finance | 4.01 | 3.8 | 4 | 2.8 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 15 | Base64 Decoder | Developer | 4.00 | 4.7 | 3.6 | 1.8 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 16 | Savings Goal Calculator | Finance | 4.00 | 3.6 | 4 | 3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 17 | Proportion Calculator | Math | 4.00 | 4.8 | 3.5 | 2 | 5 | 5 | 4 | A | LOCAL-CLEAR |
| 18 | Amortization Calculator | Finance | 4.00 | 4 | 4.2 | 2.3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 19 | Markup Calculator | Finance | 4.00 | 3.5 | 4 | 3.1 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 20 | ROI Calculator | Finance | 3.99 | 3.8 | 4 | 2.7 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 21 | Investment Growth Calculator | Finance | 3.99 | 4.2 | 4 | 2.2 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 22 | Unix Timestamp Converter | Date | 3.95 | 4 | 3 | 3 | 5 | 5 | 5 | C | LOCAL-CLEAR |
| 23 | CSS Formatter | Developer | 3.95 | 3.6 | 4 | 3.2 | 4.8 | 4.4 | 4.5 | B | LOCAL-CONDITIONAL |
| 24 | URL Encoder | Developer | 3.94 | 3.8 | 3 | 3.3 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 25 | URL Decoder | Developer | 3.94 | 3.8 | 3 | 3.3 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 26 | Break-even Calculator | Finance | 3.94 | 3.2 | 4 | 3.3 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 27 | File Hash Calculator | Developer | 3.93 | 3.4 | 3.2 | 3.7 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 28 | UUID Generator | Developer | 3.93 | 4 | 3 | 3 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 29 | SHA-256 Hash Generator | Developer | 3.93 | 4 | 3 | 3 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 30 | Color Contrast Checker | Image | 3.91 | 3.8 | 3 | 3.3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 31 | Remove Image Metadata | Image | 3.90 | 3.3 | 3 | 4 | 5 | 4.8 | 4 | C | LOCAL-CLEAR |
| 32 | Image Compressor | Image | 3.89 | 4.8 | 3.2 | 2 | 5 | 4.5 | 4.5 | B | LOCAL-CONDITIONAL |
| 33 | Simple Interest Calculator | Finance | 3.88 | 3.8 | 3.5 | 2.8 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 34 | Text Diff / Compare Text | Text | 3.88 | 3.8 | 3 | 3.2 | 4.8 | 4.8 | 5 | C | LOCAL-CLEAR |
| 35 | Markdown Previewer | Developer | 3.86 | 3.5 | 3 | 3.6 | 4.8 | 4.8 | 4.5 | C | LOCAL-CLEAR |
| 36 | JWT Decoder | Developer | 3.79 | 3.6 | 3.2 | 2.5 | 5 | 5 | 5 | B | LOCAL-CLEAR |
| 37 | Volume Calculator | Math | 3.82 | 4.7 | 2.8 | 2 | 5 | 5 | 3.8 | A | LOCAL-CLEAR |
| 38 | Percentage Change Calculator | Math | 3.81 | 4.2 | 2.5 | 2.8 | 5 | 5 | 4 | B | LOCAL-CLEAR |
| 39 | Image Resizer | Image | 3.81 | 4.5 | 2.5 | 2.3 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 40 | Slug Generator | Text | 3.77 | 3.5 | 2.7 | 3.4 | 5 | 4.8 | 4 | C | LOCAL-CLEAR |
| 41 | Password Generator | Developer | 3.68 | 4.5 | 1.5 | 2.5 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 42 | Data Storage Converter | Converters | 3.75 | 3.6 | 2.5 | 3.2 | 5 | 5 | 4.2 | C | LOCAL-CLEAR |
| 43 | Ratio Calculator | Math | 3.74 | 4 | 2.5 | 2.7 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 44 | Percentage Calculator | Math | 3.70 | 4.8 | 2 | 2 | 5 | 5 | 4 | B | LOCAL-CLEAR |
| 45 | Image Cropper | Image | 3.70 | 4 | 2.3 | 2.7 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 46 | Area Calculator | Math | 3.70 | 4.3 | 2.5 | 2.2 | 5 | 5 | 3.7 | C | LOCAL-CLEAR |
| 47 | XML Formatter | Developer | 3.69 | 4 | 2 | 3 | 5 | 4.8 | 4.5 | A | LOCAL-CLEAR |
| 48 | Remove Duplicate Lines | Text | 3.69 | 3.2 | 2 | 3.8 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 49 | JSON Validator | Developer | 3.69 | 4 | 2 | 2.8 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 50 | Image Metadata Viewer | Image | 3.68 | 3.2 | 2.5 | 4 | 5 | 4.2 | 4 | C | LOCAL-CONDITIONAL |
| 51 | SVG Optimizer | Image | 3.68 | 3.4 | 3 | 3.4 | 4.8 | 4 | 4.5 | C | LOCAL-CONDITIONAL |
| 52 | Date Difference Calculator | Date | 3.68 | 4.2 | 2 | 2.5 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 53 | Discount Calculator | Finance | 3.67 | 4 | 2.5 | 2.5 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 54 | CSV to JSON | Developer | 3.68 | 3.7 | 2.5 | 3.5 | 4.8 | 4.2 | 4 | C | LOCAL-CONDITIONAL |
| 55 | JSON to CSV | Developer | 3.65 | 3.6 | 2.5 | 3.5 | 4.8 | 4.2 | 4 | C | LOCAL-CONDITIONAL |
| 56 | JSON Minifier | Developer | 3.65 | 3.4 | 2 | 3.5 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 57 | Weighted Average Calculator | Math | 3.65 | 3.5 | 2.5 | 3 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 58 | YAML to JSON | Developer | 3.65 | 3.5 | 2.5 | 3.6 | 4.7 | 4.3 | 4 | C | LOCAL-CONDITIONAL |
| 59 | JSON to YAML | Developer | 3.65 | 3.5 | 2.5 | 3.6 | 4.7 | 4.3 | 4 | C | LOCAL-CONDITIONAL |
| 60 | Sort Lines | Text | 3.64 | 3 | 2 | 3.8 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 61 | Reading Time Calculator | Text | 3.63 | 3.4 | 2 | 3.4 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 62 | Scientific Notation Calculator | Math | 3.62 | 3.8 | 2 | 3 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 63 | JSON Formatter | Developer | 3.62 | 4.7 | 1.2 | 2.3 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 64 | Distance Between Points Calculator | Math | 3.62 | 3.4 | 2.5 | 3 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 65 | SVG to PNG | Image | 3.60 | 3.8 | 2 | 3.2 | 4.7 | 4.7 | 4 | C | LOCAL-CLEAR |
| 66 | Average Calculator | Math | 3.60 | 4 | 2 | 2.5 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 67 | Word Counter | Text | 3.58 | 5 | 1.2 | 1.7 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 68 | YAML Formatter | Developer | 3.58 | 3.2 | 2.5 | 3.7 | 4.7 | 4.2 | 4 | C | LOCAL-CONDITIONAL |
| 69 | Case Converter | Text | 3.56 | 4 | 1.5 | 2.7 | 5 | 5 | 4.5 | C | LOCAL-CLEAR |
| 70 | Title Case Converter | Text | 3.56 | 3.6 | 1.8 | 3 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 71 | Midpoint Calculator | Math | 3.56 | 3.2 | 2.2 | 3.2 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 72 | Fraction Calculator | Math | 3.55 | 4 | 2 | 2.4 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 73 | Age Calculator | Date | 3.55 | 4.5 | 1.5 | 2 | 5 | 5 | 4.5 | B | LOCAL-CLEAR |
| 74 | Add Watermark to PDF | PDF | 3.54 | 4 | 3.2 | 2.3 | 4.5 | 3.8 | 4 | C | LOCAL-CONDITIONAL |
| 75 | Character Counter | Text | 3.54 | 4.5 | 1.2 | 2.1 | 5 | 5 | 5 | A | LOCAL-CLEAR |
| 76 | Speed Converter | Converters | 3.51 | 3.8 | 1.5 | 2.8 | 5 | 5 | 4 | C | LOCAL-CLEAR |
| 77 | PNG to JPG | Image | 3.50 | 4.2 | 1.5 | 2.4 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 78 | JPG to PNG | Image | 3.50 | 4.2 | 1.5 | 2.4 | 5 | 5 | 3.5 | C | LOCAL-CLEAR |
| 79 | GCD/LCM Calculator | Math | 3.50 | 3.2 | 2 | 3.2 | 5 | 5 | 3.2 | C | LOCAL-CLEAR |
| 80 | WebP to PNG | Image | 3.50 | 4.8 | 1 | 2 | 5 | 5 | 4 | A | LOCAL-CLEAR |

### Ordering caution

The table is provisional and includes a few rows whose updated evidence was incorporated after the initial 96-candidate heuristic. Therefore **tier membership matters more than exact adjacent rank** until the whole shortlist has the same evidence depth. A later V2 should recompute every row after targeted keyword/SERP validation.

---

# 4. Priority tiers for the next research pass

## Tier A — validate/freeze candidates first

These combine strong economics and/or strong direct evidence with local execution:

- Loan Calculator
- Compound Interest Calculator
- Mortgage Calculator
- Auto Loan Calculator
- Interest Calculator
- Slope Calculator
- Proportion Calculator
- Regex Tester
- Base64 Decoder / Encoder cluster
- JSON Formatter / Validator cluster
- HTML / JavaScript / CSS formatter cluster
- Image Compressor / Resizer cluster
- Password Generator / Secure Token Generator
- Word / Character Counter cluster
- WebP / PNG / JPG browser-native conversion cluster

The “cluster” label does **not** mean one URL or many URLs. Exact search intent and UX distinction must still pass the workflow's anti-thin-content gate.

## Tier B — likely useful, needs direct candidate evidence

- CAGR / ROI / Margin / Markup / Savings Goal / Amortization
- URL Encoder / Decoder
- UUID / SHA / File Hash
- Color Contrast Checker
- Remove Image Metadata
- Text Diff
- Markdown Previewer
- Slug Generator
- Date Difference / Unix Timestamp
- CSV ↔ JSON
- YAML ↔ JSON
- SVG Optimizer / SVG to PNG
- physical unit converter families

## Tier C — high competition or technical caution

- structural PDF cluster: Merge / Split / Extract / Reorder / Rotate / Watermark / Page Numbers
- very broad head calculators such as Percentage/Age with strong incumbents
- any file-format tool requiring a codec that is not yet approved

---

# 5. Economically attractive but currently blocked / separated

These are deliberately **not** allowed to climb the ranking merely because demand exists:

| Capability | Market signal | Current blocker |
|---|---|---|
| HEIC to JPG | ~246K US search-volume signal from converter competitor snapshot | currently audited universal browser codec path is HOLD due stale/vulnerable libheif wrappers |
| AVIF universal conversion | growing modern format demand | current jSquash AVIF stack pins stale vulnerable native codec |
| Generic PDF compression | huge incumbent usage | no currently approved hostile-input local compression engine |
| OCR | broad utility demand | current local OCR model licensing/production posture unresolved |
| Audio/video conversion | huge converter-market demand | codec size/performance/safety/economics not yet justified for Launch 50 |
| Live FX | obvious recurring utility | authoritative fresh data requires external request/data-source economics |
| Stock/crypto prices | commercial demand | current external data and caching costs |
| Generative AI utilities | strong trend demand | model/API compute directly conflicts with zero-backend launch economics unless separately justified |

This table is intentionally a **market backlog**, not permission to bypass Phase 2.

---

# 6. What V1 says about likely portfolio shape

Without freezing any exact 50, current evidence points toward a portfolio weighted roughly toward:

- **finance/math calculators** for large demand and commercial intent;
- **developer utilities** for CPC/repeat use and almost-zero marginal cost;
- **text utilities** for cheap high-volume traffic and internal linking;
- **browser-native image tools** for converter demand without server processing cost;
- **a restrained PDF subset** for market breadth/privacy differentiation;
- **physical/date converters** as stable zero-backend evergreen coverage.

This is substantially healthier economically than a portfolio dominated by server-heavy PDF/video/OCR/AI jobs.

---

# 7. V1 research gaps before Phase 1 can close

1. Candidate-specific search/CPC/SERP evidence for the high-scoring C-confidence finance tools (Margin, CAGR, ROI, Savings Goal, Amortization, Markup, Break-even).
2. Candidate-specific evidence for Base64 Encoder rather than inferring it from Decoder/category behavior.
3. Exact HTML/JS/CSS formatter queries and incumbent difficulty.
4. Secure Token Generator / UUID / SHA / File Hash exact intent sizes.
5. Image Compressor / Image Resizer direct keyword/SERP difficulty rather than only converter-category evidence.
6. PDF Merge/Split/etc direct keyword evidence and whether privacy-local positioning creates a realistic long-tail wedge.
7. Decide whether overlapping calculator/tool names represent separate intent/UX or should be consolidated under one stronger utility.
8. Produce Ranking V2 with consistent evidence depth and a shortlist larger than 50 but materially smaller than 172.

Phase 1 remains **ACTIVE**. This V1 does not authorize Phase 3 or Phase 4.
