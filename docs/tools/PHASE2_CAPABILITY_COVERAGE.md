# MenezesDev Tools — Phase 2 Capability Coverage Matrix

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS capability audit  
**Status:** ACTIVE — coverage inventory, not a Phase 2 closure declaration  
**Authority:** constrained by `docs/tools/IMMUTABLE_WORKFLOW.md` and `docs/tools/SECURITY_POLICY.md`.

This document consolidates the capability evidence accumulated across the Phase 2 audit files. It does **not** freeze Launch 50; that belongs to later workflow phases. Its purpose is to make gaps explicit and prevent an agent from inventing an engine/dependency when a capability is revisited.

## Decision vocabulary

- **LOCAL-CLEAR** — a browser-native/JS/WASM-local implementation path is already technically justified.
- **LOCAL-CONDITIONAL** — still local, but exact version/config/hostile-input or benchmark gate remains.
- **INTERNAL** — safer/smaller to implement as deterministic code rather than add a dependency.
- **DATA-DEPENDENT** — needs current external data; cannot be represented as a normal zero-backend tool.
- **HOLD** — current candidate engine/capability fails an audit gate or has unresolved risk.
- **UNRESOLVED** — further audit is required before technical selection.

---

# 1. Image / raster tools

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op | Notes |
|---|---|---|---|---:|---|
| Resize image | browser | native Canvas/OffscreenCanvas; pica for quality benchmark | **LOCAL-CLEAR** | 0 | pica already approved; native first when adequate |
| Crop image | browser | Canvas/OffscreenCanvas | **LOCAL-CLEAR** | 0 | dimension/pixel caps |
| Rotate/flip image | browser | Canvas/OffscreenCanvas | **LOCAL-CLEAR** | 0 | re-encode output |
| PNG/JPEG conversion | browser | createImageBitmap + Canvas + toBlob | **LOCAL-CLEAR** | 0 | feature-detect actual encoder output |
| WebP conversion | browser | native Canvas when verified | **LOCAL-CONDITIONAL** | 0 | jSquash current WebP codec HOLD because stale libwebp |
| AVIF conversion | browser/WASM | no currently approved universal codec | **HOLD** | 0 if solved | jSquash AVIF current codec stale/vulnerable; native support may be opportunistic |
| HEIC/HEIF conversion | browser/WASM | no currently approved universal codec | **HOLD** | 0 if solved | current heic-to bundles vulnerable libheif; legacy wrapper not approved |
| Image compression | browser | native encoder + quality; pica/browser-image-compression benchmark | **LOCAL-CONDITIONAL** | 0 | quality/size benchmark pending |
| Image metadata read | browser | ExifReader | **LOCAL-CONDITIONAL** | 0 | MPL obligations + hostile metadata strings |
| Image metadata removal | browser | decode pixels -> clean re-encode | **LOCAL-CLEAR** | 0 | verify metadata removal by fixtures |
| SVG -> raster | browser/WASM | resvg | **LOCAL-CLEAR** | 0 | approved strong Rust/WASM candidate |
| SVG optimize | browser Worker | SVGO >=4.0.1 restricted profile | **LOCAL-CONDITIONAL** | 0 | reject DOCTYPE; optimize != sanitize |
| Advanced color conversion | browser | Color.js | **LOCAL-CLEAR** | 0 | simple color conversions internal |

**Unresolved image blockers:** AVIF/HEIC universal codec path and quality/bundle benchmark. These are **not automatically Launch 50 blockers** unless Phase 1/4 selects those capabilities.

---

# 2. PDF tools

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op | Notes |
|---|---|---|---|---:|---|
| Merge | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | hostile corpus + document-structure preservation tests |
| Split/extract pages | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | same parser limits |
| Remove/reorder pages | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | operation work caps |
| Rotate pages | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | local structural edit |
| Page numbers/text/watermark | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | font/output tests |
| Standard metadata read/edit | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | do not claim complete sanitization |
| Form fill/flatten | browser Worker | @pdfme/pdf-lib >=6.1.12 | **LOCAL-CONDITIONAL** | 0 | regression tests required |
| Page render/raster | browser Worker | pdfjs-dist >=6.2.108 or newer audited | **LOCAL-CONDITIONAL** | 0 | scripting disabled, CSP, page/pixel caps |
| Generic compression | unknown | no approved generic engine | **HOLD** | — | qpdf WASM/upstream DoS state not acceptable |
| Arbitrary text extraction | unknown | structural pdf-lib does not provide it | **UNRESOLVED** | — | requires separate parser capability audit |
| Edit/remove arbitrary existing page text | unknown | not generic in structural engine | **UNRESOLVED** | — | likely out of Launch 50 unless a safe engine emerges |

**Material supersession:** Hopding `pdf-lib 1.17.1` and current Cantoo fork are HOLD for hostile public PDFs because their audited decode path lacks an explicit decoded-stream cap. `@pdfme/pdf-lib` contains the verified decompression-bomb limit and is the current preferred structural candidate.

---

# 3. Calculators / finance

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op | Notes |
|---|---|---|---|---:|---|
| Percentage/change/discount | browser | internal Number/formulas | **INTERNAL** | 0 | explicit rounding tests |
| Margin/markup | browser | internal formulas | **INTERNAL** | 0 | exact terminology |
| Simple/compound interest | browser | internal formulas + lazy decimal.js where needed | **LOCAL-CLEAR** | 0 | deterministic |
| Loan payment/amortization | browser | internal + decimal.js | **LOCAL-CLEAR** | 0 | cap term/rows |
| CAGR/ROI/PV/FV | browser | internal + decimal.js | **LOCAL-CLEAR** | 0 | formula fixtures |
| Mortgage payment | browser | internal; user-supplied rate | **LOCAL-CLEAR** | 0 | no hidden rate API |
| Static-rate tax/VAT | browser | internal | **LOCAL-CONDITIONAL** | 0 | disclose jurisdiction/effective-date assumptions |
| Live FX conversion | external data | separate data/cache path | **DATA-DEPENDENT** | >0 unless user rate | must undergo data/cost audit |
| Live stock/crypto | external data | separate data/cache path | **DATA-DEPENDENT** | >0 | not ordinary calculator runtime |
| Live CPI/benchmark rates | external data | separate data/cache path | **DATA-DEPENDENT** | >0 | not Launch default without economics |

---

# 4. Physical/unit converters

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op |
|---|---|---|---|---:|
| Length | browser | typed internal constants | **INTERNAL** | 0 |
| Mass | browser | typed internal constants | **INTERNAL** | 0 |
| Area | browser | typed internal constants | **INTERNAL** | 0 |
| Volume | browser | typed internal constants | **INTERNAL** | 0 |
| Temperature | browser | affine formulas | **INTERNAL** | 0 |
| Speed | browser | typed internal constants | **INTERNAL** | 0 |
| Pressure | browser | typed internal constants | **INTERNAL** | 0 |
| Energy/power | browser | typed internal constants | **INTERNAL** | 0 |
| Digital storage | browser | typed internal constants | **INTERNAL** | 0 |

All require reference fixtures and explicit SI/IEC semantics where applicable. No conversion dependency is currently justified for ordinary families.

---

# 5. Text / encoding / developer utilities

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op |
|---|---|---|---|---:|
| Word/char/line count | browser | internal + Intl where helpful | **INTERNAL** | 0 |
| Case/whitespace/line transforms | browser | internal JS | **INTERNAL** | 0 |
| Text diff | browser | jsdiff | **LOCAL-CLEAR** | 0 |
| Base64 | browser | TextEncoder/byte-safe helpers | **INTERNAL** | 0 |
| URL encoding/query strings | browser | URL/URLSearchParams/native functions | **INTERNAL** | 0 |
| UUIDv4 | browser | crypto.randomUUID | **LOCAL-CLEAR** | 0 |
| Secure random password/token | browser | crypto.getRandomValues | **LOCAL-CLEAR** | 0 |
| SHA-256/384/512 | browser Worker as needed | crypto.subtle.digest | **LOCAL-CLEAR** | 0 |
| Extra/streaming hashes | browser/WASM | hash-wasm | **LOCAL-CONDITIONAL** | 0 |
| JSON format/minify/validate | browser Worker above threshold | native JSON | **LOCAL-CLEAR** | 0 |
| YAML format/parse | browser Worker | yaml >=2.8.4 restricted | **LOCAL-CONDITIONAL** | 0 |
| XML format/validate | browser Worker | DOMParser/XMLSerializer + DOCTYPE reject | **LOCAL-CLEAR** | 0 |
| CSV parse/format | browser Worker | PapaParse 5.6.0 | **LOCAL-CONDITIONAL** | 0 |
| Markdown preview | browser Worker | markdown-it 15 + DOMPurify | **LOCAL-CLEAR** | 0 |
| JS/CSS/HTML formatter | browser Worker | lazy Prettier standalone/plugin | **LOCAL-CONDITIONAL** | 0 |
| Regex tester | disposable browser Worker | native RegExp + hard timeout | **LOCAL-CLEAR** | 0 |
| HTML sanitization tool | browser | DOMPurify with explicit profile | **LOCAL-CLEAR** | 0 |

---

# 6. Archives / files

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op |
|---|---|---|---|---:|
| gzip/deflate | browser streams | CompressionStream/DecompressionStream | **LOCAL-CLEAR** | 0 |
| ZIP create | browser Worker/streams | zip.js or focused fflate | **LOCAL-CLEAR** | 0 |
| ZIP list/read/extract | browser Worker/streams | zip.js + archive security wrapper | **LOCAL-CONDITIONAL** | 0 |
| Broad file type detection | browser | file-type >=22.0.1 | **LOCAL-CONDITIONAL** | 0 |
| Narrow known-type sniff | browser | internal magic-byte allowlist | **INTERNAL** | 0 |

Archive extraction always enforces entry/path/decompression limits outside the library.

---

# 7. QR / barcode

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op |
|---|---|---|---|---:|
| QR generate | browser | qrcodegen / internal wrapper | **LOCAL-CLEAR** | 0 |
| QR/barcode decode fast path | browser | BarcodeDetector feature-detected | **LOCAL-CLEAR fast path** | 0 |
| Broad fallback decode | browser Worker | ZXing JS vs rxing WASM benchmark | **LOCAL-CONDITIONAL** | 0 |

Final fallback engine needs hostile/noise/latency/accuracy benchmark, but no server path is currently justified.

---

# 8. Date / time

| Capability family | Preferred execution | Engine/path | Coverage | Backend requests/op |
|---|---|---|---|---:|
| Simple date differences/formatting | browser | Date + Intl | **LOCAL-CLEAR** | 0 |
| Advanced calendar arithmetic | browser | native Temporal where present + lazy temporal-polyfill | **LOCAL-CLEAR** | 0 |

No backend is justified for deterministic date tools.

---

# 9. OCR / AI / current-data capabilities

| Capability family | Current coverage | Why |
|---|---|---|
| OCR | **HOLD / UNRESOLVED** | ocrs model redistribution license unclear and project early-preview; no approved production model stack yet |
| Generative AI tools | **OUT of ordinary zero-cost path** | external/model compute cost; requires explicit economics/quota design |
| Live market/data tools | **DATA-DEPENDENT** | require authoritative fresh external data |

These categories should **not** be forced into Launch 50 merely for architectural variety. Selection remains evidence-driven.

---

# 10. Coverage assessment

## Already strong zero-backend coverage

The audited platform can already support substantial candidate depth in:

- calculators;
- physical converters;
- text utilities;
- developer/encoding utilities;
- JSON/XML/YAML/CSV;
- Markdown;
- passwords/random/hash;
- ordinary image resize/crop/convert/privacy;
- SVG raster/optimization;
- ZIP/compression;
- QR generation/decoding;
- date/time;
- a significant structural subset of PDF operations.

## Remaining technical gaps

1. universal safe HEIC/HEIF conversion;
2. universal audited AVIF codec path when browser-native support is insufficient;
3. generic safe PDF compression;
4. arbitrary PDF text extraction/editing;
5. production OCR model/code license and safety path;
6. final QR/barcode fallback benchmark;
7. image resize/compression quality/bundle benchmark;
8. any live-data capability that Phase 1 proves economically necessary.

## Gate interpretation

Phase 2 is **not marked CLOSED by this document** because Phase 1 has not yet finalized the evidence-backed candidate universe that will ultimately feed Launch 50 selection. A capability gap that never enters the candidate portfolio does not need to be solved merely to increase technical breadth.

The correct next move is:

1. preserve this Phase 2 coverage state;
2. complete/advance Phase 1 market intelligence enough to identify which unresolved capability families have real Launch 50 value;
3. return to Phase 2 only for unresolved capabilities that the evidence-backed candidate set actually needs;
4. only then declare Phase 2 exit gate satisfied and proceed to Phase 3 Capability Map.

This prevents both premature closure and wasteful engineering/auditing of tools that should not launch.
