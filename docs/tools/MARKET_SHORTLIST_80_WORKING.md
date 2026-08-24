# MenezesDev Tools — Market Shortlist 80 WORKING

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 market intelligence + Phase 2 technical evidence  
**Status:** WORKING SHORTLIST — not Launch 50, not Phase 3, not a freeze  
**Source universe:** only candidates already present in the canonical 172-candidate Batch-1 universe

---

# 1. Purpose

This file creates the first **substantially >50** working shortlist requested by the Phase-1 workflow gate.

It does not claim that all 80 rows have identical evidence depth. Its purpose is to stop treating every one of the original 172 ideas as equally plausible and to create a bounded pool from which later market normalization, anti-thin consolidation and the Phase-3 Capability Map can operate.

The shortlist is deliberately wider than Launch 50 so later phases can remove candidates for:

- weak search economics;
- excessive incumbent strength;
- thin/overlapping intent;
- technical/security conditions;
- poor portfolio balance;
- AdSense-quality concerns;
- weaker alternatives inside the same cluster.

No candidate in this file is authorized for implementation merely by appearing here.

---

# 2. Evidence bands

- **A** — current/direct or already-established candidate-specific market evidence is strong enough for shortlist inclusion.
- **A-market** — market demand is directly strong, but technical/competition/semantic caveats remain.
- **B+** — useful direct/adjacent evidence plus strong zero-backend economics; one more normalization pass is preferred.
- **B** — independent intent/category demand is credible, but exact candidate economics remain incomplete.
- **COVERAGE** — retained primarily because it proves a needed product/runtime family or rounds out a strong cluster; must still survive later market cuts.

Technical states are inherited from Phase-2 audit artifacts:

- `LOCAL-CLEAR` / `INTERNAL` — no material technical blocker;
- `LOCAL-CONDITIONAL` — remains browser-local but requires exact dependency/config/hostile-input/benchmark gate;
- `LOCAL-BOUNDED` — local path requires explicit resource limits/Worker isolation.

---

# 3. Working shortlist — 80 exact candidates

## 3.1 Finance / business — 16

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 1 | Loan Calculator | A | LOCAL-CLEAR | revenue + traffic anchor | very strong incumbents |
| 2 | Compound Interest Calculator | A | LOCAL-CLEAR | traffic/revenue anchor | strong incumbents |
| 3 | Mortgage Calculator | A | LOCAL-CLEAR | huge traffic/commercial intent | extremely competitive head term |
| 4 | Auto Loan Calculator | A | LOCAL-CLEAR | finance cluster depth | competitive |
| 5 | Interest Calculator | A | LOCAL-CLEAR | commercial zero-cost utility | intent breadth needs clean UX |
| 6 | Amortization Calculator | A | LOCAL-CLEAR | high-value finance anchor | schedule/table correctness |
| 7 | Margin Calculator | A | INTERNAL | premium-commercial anchor | strong Omni incumbent |
| 8 | ROI Calculator | B+ | LOCAL-CLEAR | commercial/business anchor | needs stronger corroboration |
| 9 | CAGR Calculator | B+ | LOCAL-CLEAR | attainable finance long-tail | CPC weaker than V1 assumption |
| 10 | Markup Calculator | B | INTERNAL | natural Margin companion | exact 2026 keyword economics incomplete |
| 11 | Break-even Calculator | B | INTERNAL | business cluster depth | exact keyword economics incomplete |
| 12 | Savings Goal Calculator | B | LOCAL-CLEAR | finance breadth | strong finance incumbents |
| 13 | Investment Growth Calculator | B | LOCAL-CLEAR | finance cluster depth | overlaps compound-interest semantics |
| 14 | Simple Interest Calculator | B | LOCAL-CLEAR | educational/finance traffic | lower monetization than loan/margin |
| 15 | Discount Calculator | B | INTERNAL | broad commercial utility | low differentiation |
| 16 | Future Value Calculator | B | LOCAL-CLEAR | finance/education depth | overlap with investment/compound interest |

### Finance consolidation flags

- `Loan Payment Calculator` is intentionally **not** counted separately in this 80 because the current product distinction from `Loan Calculator` is not yet strong enough to justify two URLs.
- `Present Value Calculator` remains reserve; `Future Value` currently gets the shortlist slot but both must undergo intent comparison before freeze.
- No live-rate API is assumed. Mortgage/loan calculators use user-provided rates unless a later data capability is separately approved.

---

## 3.2 Math / general calculators — 10

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 17 | Slope Calculator | A | INTERNAL | high-volume math anchor | strong calculator incumbents |
| 18 | Proportion Calculator | A | INTERNAL | high-volume math anchor | strong calculator incumbents |
| 19 | Volume Calculator | A | INTERNAL | durable math traffic | UX must cover shapes without thin child pages |
| 20 | Percentage Change Calculator | B+ | INTERNAL | common practical intent | overlap with generic Percentage |
| 21 | Percentage Calculator | B+ | INTERNAL | mass utility traffic | generic/competitive |
| 22 | Ratio Calculator | B | INTERNAL | math cluster depth | exact economics weaker |
| 23 | Area Calculator | B | INTERNAL | durable geometry utility | shape breadth/UX design |
| 24 | Weighted Average Calculator | B | INTERNAL | education/business utility | lower observed commercial evidence |
| 25 | Scientific Notation Calculator | B | INTERNAL | education/STEM cluster | monetization likely modest |
| 26 | GCD/LCM Calculator | B | INTERNAL | education/math depth | low commercial intent |

All ten are deterministic zero-backend utilities. Market cuts, not infrastructure cost, should decide which survive.

---

## 3.3 Image / color — 11

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 27 | Image Resizer | A | LOCAL-CLEAR | flagship traffic utility | competitive SERP |
| 28 | Image Compressor | A | LOCAL-CONDITIONAL | major global utility | quality/size benchmark required |
| 29 | Image Cropper | B+ | LOCAL-CLEAR | image cluster repeat utility | lower exact CPC evidence |
| 30 | JPG to PNG | B+ | LOCAL-CLEAR | conversion traffic | commodity/low CPC |
| 31 | PNG to JPG | B+ | LOCAL-CLEAR | conversion traffic | commodity/low CPC |
| 32 | WebP to PNG | A-market | LOCAL-CONDITIONAL | proven conversion demand | runtime encoder/decoder feature gates |
| 33 | Image Metadata Viewer | A-market | LOCAL-CONDITIONAL | privacy/dev-image utility | hostile metadata/parser conditions |
| 34 | Remove Image Metadata | B+ | LOCAL-CLEAR | privacy differentiator | exact removal keyword economics incomplete |
| 35 | SVG to PNG | B | LOCAL-CLEAR | design/dev utility | SVG hostile-input policy |
| 36 | Color Contrast Checker | A-use/B-econ | LOCAL-CLEAR | accessibility/linkability | direct CPC/volume not normalized |
| 37 | Gradient/Palette Generator | A-market | LOCAL-CLEAR | design repeat utility | palette-vs-gradient semantic cleanup |

### Image exclusions/holds

- HEIC/HEIF and AVIF universal conversion remain outside this shortlist because the current universal codec path is not approved.
- No server transcoding is introduced to rescue those candidates.

---

## 3.4 Text / writing primitives — 8

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 38 | Word Counter | A | INTERNAL | mass traffic anchor | very low CPC |
| 39 | Character Counter | A-market | INTERNAL | mass traffic companion | anti-thin route test vs Word Counter |
| 40 | Case Converter | A | INTERNAL | high-repeat text anchor | moderate CPC |
| 41 | Title Case Converter | A-use/B-econ | INTERNAL | editorial/writing utility | anti-thin test vs Case Converter |
| 42 | Text Diff / Compare Text | A | LOCAL-BOUNDED | high-value repeat/dev-text utility | Worker/time/result caps |
| 43 | Remove Duplicate Lines | B | INTERNAL | cheap repeat utility | low direct commercial evidence |
| 44 | Reading Time Calculator | B | INTERNAL | writing/content cluster | low commercial intent |
| 45 | Slug Generator | A-use/B-econ | INTERNAL | repeat/dev-writing utility | acquisition economics weak |

`Sort Lines` remains reserve rather than consuming one of the 80 slots; it can be reconsidered if missing-search or market data later justifies it.

---

## 3.5 Developer / structured data — 20

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 46 | Markdown Previewer | A | LOCAL-BOUNDED | premium developer anchor | parser/sanitizer bounds |
| 47 | URL Encoder | A | INTERNAL | premium developer anchor | semantics must be explicit |
| 48 | URL Decoder | B+ | INTERNAL | natural encoder pair | standalone current table weaker |
| 49 | JSON Validator | A | LOCAL-CLEAR | premium developer anchor | syntax != schema validation |
| 50 | JSON Formatter | A | LOCAL-CLEAR | high-volume/repeat developer traffic | sampled CPC low |
| 51 | JSON Minifier | B | LOCAL-CLEAR | JSON cluster depth | likely lower standalone demand |
| 52 | Base64 Encoder | B+ | INTERNAL | high-repeat encoding utility | paired/cannibalization review |
| 53 | Base64 Decoder | A | INTERNAL | large repeat/developer anchor | incumbent strength/geo concentration |
| 54 | UUID Generator | B+ | LOCAL-CLEAR | low-cost developer utility | corroboration preferred |
| 55 | Secure Token Generator | B | LOCAL-CLEAR | security/dev utility | distinction from password/random string |
| 56 | Random Password Generator | A | LOCAL-CLEAR | mass security utility | low CPC |
| 57 | SHA-256 Hash Generator | B+ | LOCAL-CLEAR | developer/security utility | generic hash overlap |
| 58 | File Hash Calculator | B | LOCAL-CLEAR | file/security repeat utility | separate-intent proof from text hash |
| 59 | Regex Tester | A | LOCAL-BOUNDED | premium developer anchor | catastrophic backtracking containment |
| 60 | HTML Formatter | A | LOCAL-CONDITIONAL | high-CPC developer utility | lazy Prettier/plugin/bounds |
| 61 | JavaScript Formatter | B+ | LOCAL-CONDITIONAL | developer cluster depth | dependency/bundle + incumbent competition |
| 62 | CSS Formatter | B | LOCAL-CONDITIONAL | developer cluster depth | lower exact evidence |
| 63 | XML Formatter | A | LOCAL-CLEAR | structured-data traffic | DOCTYPE rejection/limits |
| 64 | CSV to JSON | B | LOCAL-CONDITIONAL | data-transform utility | current candidate economics incomplete |
| 65 | JSON to CSV | B | LOCAL-CONDITIONAL | data-transform utility | spreadsheet-formula output policy |

### Developer reserve / consolidation notes

- YAML ↔ JSON remains reserve because the technical path is conditional and current candidate-specific market evidence is weaker than CSV/JSON.
- JWT Decoder remains reserve: independent use exists, but signature-verification semantics must never be implied by a decode-only tool.
- `JSON Diff` remains outside the original 172 and therefore outside this shortlist until an explicit future candidate decision.
- binary/hex converters remain in the out-of-universe discovery queue and are not silently inserted here despite unusually attractive current signals.

---

## 3.6 Date / time — 3

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 66 | Age Calculator | A | LOCAL-CLEAR | mass traffic date anchor | low CPC |
| 67 | Date Difference Calculator | B+ | LOCAL-CLEAR | broad date utility | best direct keyword evidence needs freshness refresh |
| 68 | Unix Timestamp Converter | B | LOCAL-CLEAR | developer/date repeat utility | consolidate both directions in one UX |

`Unix Timestamp to Date` and `Date to Unix Timestamp` are intentionally not counted as separate shortlist entries because candidate #138 can serve both directions in one stronger utility.

---

## 3.7 Archive / file — 5

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 69 | ZIP Creator | B | LOCAL-CLEAR | file/privacy coverage | modest direct keyword economics |
| 70 | ZIP Extractor | B/A-market | LOCAL-CONDITIONAL | file/privacy utility | zip-bomb/path limits |
| 71 | Gzip Compressor | B | LOCAL-CLEAR | developer/file utility | narrower audience |
| 72 | Gzip Decompressor | B | LOCAL-CLEAR | developer/file utility | narrower audience |
| 73 | File Type Detector | B | LOCAL-CONDITIONAL | file/dev coverage | broad parser surface if overbuilt |

The ZIP cluster is retained because it proves genuinely local file handling and privacy value without forcing server upload compute.

---

## 3.8 Structural PDF — 7

| # | Candidate | Evidence | Tech | Portfolio role | Main caveat |
|---:|---|:---:|---|---|---|
| 74 | Split PDF | A-market | LOCAL-CONDITIONAL | large PDF demand / architecture coverage | hostile PDF parser surface |
| 75 | Merge PDF | A-market | LOCAL-CONDITIONAL | huge traffic intent / coverage | weak sampled CPC + mega-incumbents |
| 76 | Extract PDF Pages | B | LOCAL-CONDITIONAL | PDF cluster depth | market evidence less normalized |
| 77 | Remove PDF Pages | B | LOCAL-CONDITIONAL | PDF cluster depth | market evidence less normalized |
| 78 | Reorder PDF Pages | B | LOCAL-CONDITIONAL | PDF structural coverage | market evidence less normalized |
| 79 | Rotate PDF Pages | B | LOCAL-CONDITIONAL | PDF structural coverage | market evidence less normalized |
| 80 | Add Text Watermark to PDF | B | LOCAL-CONDITIONAL | business/PDF utility | font/output/hostile-fixture tests |

PDF is deliberately capped at seven shortlist rows despite enormous competitor traffic. It must not dominate Launch 50 merely because its head-volume numbers are seductive.

Generic PDF compression remains HOLD and is not rescued with a server path.

---

# 4. Shortlist composition

Current working pool:

| Category | Rows |
|---|---:|
| Finance/business | 16 |
| Math/general | 10 |
| Image/color | 11 |
| Text/writing | 8 |
| Developer/data | 20 |
| Date/time | 3 |
| Archive/file | 5 |
| PDF | 7 |
| **Total** | **80** |

This distribution is intentionally **not** the final Launch-50 category allocation. The workflow's ~70/20/10 portfolio rule is a Phase-4 freeze constraint, not a reason to force the working shortlist into an arbitrary final shape now.

---

# 5. Technical coverage assessment of the 80

The important economic result is that the overwhelming majority of this shortlist already has a browser-local path.

### No material backend requirement

All finance, math, text and date candidates can run without ordinary backend compute.

Most developer and image candidates are also browser-local; conditional states generally mean:

- dependency/version pin;
- Worker isolation;
- hostile-input limits;
- bundle/quality benchmark;
- sanitizer/output policy.

They do **not** mean a Cloudflare processing request is required per use.

### Main conditional surface

The largest hostile-input/security concentration is:

- structural PDF;
- ZIP extraction;
- image metadata parsing;
- CSV parsing;
- Prettier-backed formatters;
- Markdown/diff/regex work budgets.

This is desirable for portfolio economics: technical complexity is concentrated in a minority of the pool instead of being the default architecture for every utility.

---

# 6. Candidates deliberately excluded from the 80 despite apparent demand

Examples:

- HEIC to JPG / HEIC to PNG — current universal decoder stack not approved;
- generic PDF compression — no approved safe generic engine;
- OCR PDF / OCR — model/runtime/license path unresolved;
- arbitrary PDF text extraction/editing — unresolved parser capability;
- live FX / market-data tools — fresh external data and recurring cost class;
- audio/video conversion — not part of the current low-cost Launch thesis;
- out-of-universe Binary/Hex discoveries — require explicit candidate/consolidation decision first.

This is evidence that the shortlist is being pruned by architecture/security, not merely expanded.

---

# 7. High-priority cut tests before this becomes final Phase-1 shortlist

The following comparisons should remove redundancy before Phase 1 closes:

1. Loan Calculator vs Loan Payment Calculator — current shortlist keeps only Loan.
2. Compound Interest vs Investment Growth vs Future Value — determine independent search/UX roles.
3. Percentage vs Percentage Change — likely independent but verify.
4. Word Counter vs Character Counter — independent route or combined utility?
5. Case Converter vs Title Case Converter — independent editorial intent or one strong case tool?
6. URL Encoder vs URL Decoder — likely distinct intent, but one shared engine/UI may still power both.
7. Base64 Encoder vs Decoder — same question.
8. SHA-256 Hash vs File Hash — text/bytes versus file workflow must remain genuinely distinct.
9. Secure Token vs Password Generator — define output semantics and user intent.
10. Gradient vs Palette Generator — resolve candidate #68 naming/intent.
11. Unix Timestamp candidate variants — consolidated into one converter for this shortlist.
12. PDF structural operations — retain only those with sufficient market evidence to justify hostile-parser cost.

---

# 8. Evidence-breadth status

This 80-row pool is the first point at which the project has a practical >50 candidate set tied to both market and technical evidence.

However, Phase 1 is **not closed yet** because the lower B/coverage rows do not all have comparable candidate-specific current evidence.

The remaining market-research effort should now be much narrower:

- validate/cut the weakest 20–30 shortlist rows;
- strengthen evidence for candidates that could realistically displace them;
- resolve the consolidation tests above;
- avoid spending time on the 92 original candidates already unlikely to survive unless new evidence appears.

This changes the Phase-1 problem from:

> research 172 possibilities

into:

> choose the best 50 from a bounded evidence-backed pool of 80, with explicit reserves and cut tests.

---

# 9. Phase-2 implication

Phase 2 is materially close to supporting this pool because most rows map to already-audited local primitives.

Do not close Phase 2 yet. Instead:

1. map every candidate that survives the next market cut to an existing coverage row;
2. identify any surviving `UNRESOLVED` technical gap;
3. audit only those gaps;
4. if every surviving shortlist capability is `LOCAL-CLEAR`, `INTERNAL`, or explicitly acceptable `LOCAL-CONDITIONAL`, Phase 2 can approach its exit gate.

No Tool SDK implementation begins from this file.

---

# 10. Current workflow status

- Phase 1: **ACTIVE / materially advanced — first >50 working shortlist exists**.
- Phase 2: **ACTIVE — broad local coverage exists**.
- Phase 3: **NOT STARTED**.
- Phase 4: **NOT STARTED**.
- Launch 50: **NOT FROZEN**.
- Tools code implementation: **NOT STARTED**.
