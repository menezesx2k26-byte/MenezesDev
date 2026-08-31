# MenezesDev Tools — Phase 2 Coverage for Working Shortlist 80

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Input pool:** `docs/tools/MARKET_SHORTLIST_80_WORKING.md`  
**Status:** ACTIVE COVERAGE PASS — not Phase-2 closure, not Capability Map

---

# 1. Purpose

This file answers one narrow question:

> Of the current 80 market-shortlisted candidates, which already have a concrete browser/local implementation path and which still need a conditional technical gate?

It is deliberately **not** the Phase-3 Capability Map. It does not assign final Tool IDs, routes, telemetry, ads metadata or exact production limits. Those belong later.

The goal is to expose whether Phase 2 still contains material unknowns for candidates that might actually survive market selection.

---

# 2. Headline result

For the current working shortlist of 80:

- **63/80** have a technically clear/internal/local-bounded path with no unresolved engine blocker;
- **17/80** are `LOCAL-CONDITIONAL` and need exact version/config/benchmark/hostile-input admission gates;
- **0/80** require ordinary server-side processing per user operation;
- **0/80** are currently `HOLD` or `UNRESOLVED` capabilities;
- **80/80** are expected to be executable with **0 MenezesDev backend processing requests per ordinary operation** if they survive selection.

This is a major economic result: the current candidate pool is already shaped around browser-local operation rather than relying on a backend that scales cost with traffic.

---

# 3. Coverage by category

| Category | Total | Clear/internal/bounded | Local-conditional | Backend-required | Hold/unresolved |
|---|---:|---:|---:|---:|---:|
| Finance/business | 16 | 16 | 0 | 0 | 0 |
| Math/general | 10 | 10 | 0 | 0 | 0 |
| Image/color | 11 | 8 | 3 | 0 | 0 |
| Text/writing | 8 | 8 | 0 | 0 | 0 |
| Developer/data | 20 | 15 | 5 | 0 | 0 |
| Date/time | 3 | 3 | 0 | 0 | 0 |
| Archive/file | 5 | 3 | 2 | 0 | 0 |
| Structural PDF | 7 | 0 | 7 | 0 | 0 |
| **Total** | **80** | **63** | **17** | **0** | **0** |

`LOCAL-BOUNDED` is counted with clear/local for this summary when the engine/path is already selected and the remaining work is mandatory input/work isolation rather than an unresolved dependency.

---

# 4. Finance / business — 16/16 local clear

| Candidate | Path | Coverage | Requests/op |
|---|---|---|---:|
| Loan Calculator | internal formulas + decimal precision where justified | LOCAL-CLEAR | 0 |
| Compound Interest Calculator | internal formulas / decimal.js where needed | LOCAL-CLEAR | 0 |
| Mortgage Calculator | internal formulas, user-provided rate | LOCAL-CLEAR | 0 |
| Auto Loan Calculator | internal formulas | LOCAL-CLEAR | 0 |
| Interest Calculator | internal formulas | LOCAL-CLEAR | 0 |
| Amortization Calculator | internal formulas + bounded schedule generation | LOCAL-CLEAR | 0 |
| Margin Calculator | internal formula | INTERNAL | 0 |
| ROI Calculator | internal formula | LOCAL-CLEAR | 0 |
| CAGR Calculator | internal formula | LOCAL-CLEAR | 0 |
| Markup Calculator | internal formula | INTERNAL | 0 |
| Break-even Calculator | internal formula | INTERNAL | 0 |
| Savings Goal Calculator | deterministic future-value/savings formula | LOCAL-CLEAR | 0 |
| Investment Growth Calculator | deterministic finance formulas | LOCAL-CLEAR | 0 |
| Simple Interest Calculator | internal formula | LOCAL-CLEAR | 0 |
| Discount Calculator | internal formula | INTERNAL | 0 |
| Future Value Calculator | internal formula / decimal precision | LOCAL-CLEAR | 0 |

No current shortlist finance candidate needs live rate or market-data fetches.

---

# 5. Math / general — 10/10 internal

| Candidate | Path | Coverage | Requests/op |
|---|---|---|---:|
| Slope Calculator | internal math | INTERNAL | 0 |
| Proportion Calculator | internal math | INTERNAL | 0 |
| Volume Calculator | internal formulas by selected shape | INTERNAL | 0 |
| Percentage Change Calculator | internal math | INTERNAL | 0 |
| Percentage Calculator | internal math | INTERNAL | 0 |
| Ratio Calculator | internal math | INTERNAL | 0 |
| Area Calculator | internal formulas by selected shape | INTERNAL | 0 |
| Weighted Average Calculator | internal math | INTERNAL | 0 |
| Scientific Notation Calculator | internal math | INTERNAL | 0 |
| GCD/LCM Calculator | internal integer algorithms | INTERNAL | 0 |

No dependency is justified merely to perform these formulas.

---

# 6. Image / color — 8 clear, 3 conditional

| Candidate | Preferred path | Coverage | Remaining gate |
|---|---|---|---|
| Image Resizer | native Canvas/OffscreenCanvas; pica only if benchmark justifies | LOCAL-CLEAR | quality regression tests |
| Image Compressor | native encoder + quality / approved helper benchmark | LOCAL-CONDITIONAL | size/quality/browser benchmark |
| Image Cropper | Canvas/OffscreenCanvas | LOCAL-CLEAR | pixel/input caps |
| JPG to PNG | createImageBitmap + Canvas | LOCAL-CLEAR | format verification |
| PNG to JPG | createImageBitmap + Canvas | LOCAL-CLEAR | alpha/background policy |
| WebP to PNG | browser-native decode + Canvas | LOCAL-CONDITIONAL | runtime capability/format checks |
| Image Metadata Viewer | ExifReader restricted local path | LOCAL-CONDITIONAL | exact version/license/hostile metadata profile |
| Remove Image Metadata | decode pixels -> clean re-encode | LOCAL-CLEAR | metadata-removal fixtures |
| SVG to PNG | resvg WASM/local | LOCAL-CLEAR | hostile SVG/resource limits |
| Color Contrast Checker | internal/color math | LOCAL-CLEAR | reference fixtures |
| Gradient/Palette Generator | internal + optional Color.js for advanced spaces | LOCAL-CLEAR | semantic product definition |

No shortlisted image tool needs server upload/processing.

---

# 7. Text / writing — 8/8 local

| Candidate | Path | Coverage | Requests/op |
|---|---|---|---:|
| Word Counter | internal Unicode-aware text logic | INTERNAL | 0 |
| Character Counter | internal Unicode-aware text logic | INTERNAL | 0 |
| Case Converter | internal text transforms | INTERNAL | 0 |
| Title Case Converter | internal rules/locale-aware policy | INTERNAL | 0 |
| Text Diff / Compare Text | jsdiff in Worker for non-trivial input | LOCAL-BOUNDED | 0 |
| Remove Duplicate Lines | internal Set/order logic | INTERNAL | 0 |
| Reading Time Calculator | internal token/word estimate | INTERNAL | 0 |
| Slug Generator | internal normalization/transliteration policy | INTERNAL | 0 |

Text Diff still requires byte/time/result caps, but the engine itself is already selected and does not create a Phase-2 dependency gap.

---

# 8. Developer / structured data — 15 clear, 5 conditional

| Candidate | Preferred path | Coverage | Remaining gate |
|---|---|---|---|
| Markdown Previewer | markdown-it >=15 + DOMPurify in browser Worker | LOCAL-BOUNDED | input/work/sanitizer regression |
| URL Encoder | native encodeURIComponent / URL / URLSearchParams | INTERNAL | explicit semantics |
| URL Decoder | native decodeURIComponent / URL primitives | INTERNAL | malformed percent handling |
| JSON Validator | bounded JSON.parse | LOCAL-CLEAR | depth/node limits |
| JSON Formatter | JSON.parse/stringify | LOCAL-CLEAR | depth/node limits |
| JSON Minifier | JSON.parse/stringify | LOCAL-CLEAR | depth/node limits |
| Base64 Encoder | TextEncoder/byte-safe helpers | INTERNAL | Unicode/binary semantics |
| Base64 Decoder | byte-safe helpers/TextDecoder | INTERNAL | invalid alphabet/padding behavior |
| UUID Generator | crypto.randomUUID | LOCAL-CLEAR | none material |
| Secure Token Generator | crypto.getRandomValues + rejection sampling | LOCAL-CLEAR | no secret telemetry |
| Random Password Generator | crypto.getRandomValues + unbiased mapping | LOCAL-CLEAR | no secret telemetry |
| SHA-256 Hash Generator | crypto.subtle.digest | LOCAL-CLEAR | file/text size limits |
| File Hash Calculator | Web Crypto / Worker within memory limits | LOCAL-CLEAR | large-file memory policy |
| Regex Tester | native RegExp in disposable Worker | LOCAL-BOUNDED | hard timeout/cancel |
| HTML Formatter | lazy Prettier standalone HTML plugin | LOCAL-CONDITIONAL | exact version/plugin/bundle/Worker gate |
| JavaScript Formatter | lazy Prettier standalone parser/plugin | LOCAL-CONDITIONAL | exact version/plugin/bundle/Worker gate |
| CSS Formatter | lazy Prettier standalone PostCSS plugin | LOCAL-CONDITIONAL | exact version/plugin/bundle/Worker gate |
| XML Formatter | DOMParser/XMLSerializer, reject DOCTYPE | LOCAL-CLEAR | structural limits |
| CSV to JSON | PapaParse local/Worker | LOCAL-CONDITIONAL | exact version, chunk/build regressions, limits |
| JSON to CSV | PapaParse/controlled serializer | LOCAL-CONDITIONAL | spreadsheet-formula injection policy |

The conditional formatter/CSV rows remain local. Their conditions are supply-chain/bundle/parser correctness gates, not permission to move work to Cloudflare.

---

# 9. Date / time — 3/3 local clear

| Candidate | Path | Coverage | Requests/op |
|---|---|---|---:|
| Age Calculator | Date/Intl + calendar-safe logic | LOCAL-CLEAR | 0 |
| Date Difference Calculator | Date/Intl / Temporal where semantics require | LOCAL-CLEAR | 0 |
| Unix Timestamp Converter | numeric conversion + Date/Intl | LOCAL-CLEAR | 0 |

No backend is justified.

---

# 10. Archive / file — 3 clear, 2 conditional

| Candidate | Preferred path | Coverage | Remaining gate |
|---|---|---|---|
| ZIP Creator | zip.js / focused fflate local | LOCAL-CLEAR | output/resource caps |
| ZIP Extractor | zip.js + archive security wrapper | LOCAL-CONDITIONAL | entry/path/bomb/symlink limits |
| Gzip Compressor | CompressionStream | LOCAL-CLEAR | input/output bounds |
| Gzip Decompressor | DecompressionStream | LOCAL-CLEAR | decompressed byte/work limit |
| File Type Detector | file-type >=22.0.1 or narrow magic bytes | LOCAL-CONDITIONAL | narrow actual format scope + exact version if broad |

No server-side archive service is needed.

---

# 11. Structural PDF — 7/7 local conditional

| Candidate | Preferred path | Coverage | Remaining gate |
|---|---|---|---|
| Split PDF | @pdfme/pdf-lib >=6.1.12 in Worker | LOCAL-CONDITIONAL | hostile corpus + caps |
| Merge PDF | @pdfme/pdf-lib >=6.1.12 in Worker | LOCAL-CONDITIONAL | hostile corpus + caps |
| Extract PDF Pages | same structural engine | LOCAL-CONDITIONAL | parser/document preservation tests |
| Remove PDF Pages | same structural engine | LOCAL-CONDITIONAL | parser/work caps |
| Reorder PDF Pages | same structural engine | LOCAL-CONDITIONAL | parser/work caps |
| Rotate PDF Pages | same structural engine | LOCAL-CONDITIONAL | parser/work caps |
| Add Text Watermark to PDF | same structural engine | LOCAL-CONDITIONAL | fonts/output/hostile fixtures |

These candidates have a viable local engine candidate with a verified decompression-bomb limit, but hostile-PDF regression and resource-bound gates remain mandatory.

Generic PDF compression remains excluded because its safe engine path is still HOLD.

---

# 12. Why 17 conditional rows are acceptable at this stage

`LOCAL-CONDITIONAL` does not mean “unknown architecture.” It means the architecture is local and plausible, but a production dependency/configuration cannot yet be called approved without satisfying documented gates.

The 17 conditional rows are concentrated in only a few engine families:

1. image compression/native-format capability;
2. EXIF metadata parsing;
3. Prettier formatter plugins;
4. PapaParse CSV handling;
5. broad file-type detection;
6. zip extraction security wrapper;
7. one structural PDF engine family.

Therefore a small number of later admission decisions can unlock multiple shortlist tools without creating dozens of unique dependencies.

---

# 13. Phase-2 remaining work after the 80-shortlist cut

Do **not** audit every original candidate family anymore.

The high-value remaining Phase-2 work is:

1. benchmark/lock image compression/resizing profile if both survive market cuts;
2. finalize ExifReader admission only if Metadata Viewer survives;
3. finalize Prettier exact package/plugin/bundle profile if formatter rows survive;
4. finalize PapaParse profile only if CSV conversion survives;
5. decide narrow magic-byte detection versus `file-type` if File Type Detector survives;
6. finalize zip.js extraction wrapper only if ZIP Extractor survives;
7. run structural PDF hostile-fixture admission once the final PDF subset is known.

This is substantially narrower than the original capability universe.

---

# 14. Gate interpretation

The current result is strong but does **not** close Phase 2 because the market shortlist will still shrink and the final survivors must have exact admission conditions satisfied.

What has been proven now:

- the shortlist does not depend on unresolved OCR/HEIC/AVIF/PDF-compression/live-data engines;
- there is no ordinary per-use backend-compute requirement in any of the 80 current candidates;
- unresolved technical risk is concentrated rather than systemic;
- enough technically safe/local candidates exist to cut aggressively on market quality without worrying that Launch 50 will run out of implementable options.

Phase 3 remains NOT STARTED.
