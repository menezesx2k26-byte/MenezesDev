# MenezesDev Tools — Phase 3 Capability Map

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 3 — Capability Map  
**Input pool:** `docs/tools/MARKET_SHORTLIST_68_FINAL_PHASE1.md`  
**Status:** COMPLETE CANDIDATE CAPABILITY MAP — not Launch 50 freeze

---

# 1. Purpose

This map gives every one of the final 68 Phase-1 candidates a concrete technical and economic execution path before Launch 50 selection.

All ordinary tool processing remains local to the browser. `Worker` below means **browser Web Worker**, not Cloudflare Worker, unless explicitly stated otherwise.

No row in this map requires ordinary MenezesDev server processing per operation.

---

# 2. Shared declarations

## 2.1 Execution labels

- `native` — browser standards/internal TS; no third-party runtime dependency.
- `browser-js` — browser-local JS dependency/internal module.
- `worker-js` — browser Web Worker for bounded untrusted/heavy work.
- `wasm` — local browser WebAssembly, lazy-loaded.

## 2.2 Bundle-impact labels

- `tiny` — internal/native logic; effectively negligible incremental bundle.
- `small` — small focused helper/module.
- `lazy-medium` — dependency loaded only on the relevant route.
- `lazy-heavy` — parser/WASM engine isolated to the relevant route and loaded on demand.

## 2.3 Security / limit profiles

### `N-FIN` — bounded finance numeric

- numeric token: <=128 chars;
- finite numeric values only;
- <=32 ordinary input fields;
- term/schedule <=1,200 periods/rows;
- output table <=1,200 rows;
- no user financial values in telemetry;
- deterministic formula/rounding fixtures required.

### `N-MATH` — bounded scalar math

- numeric token <=128 chars;
- <=64 scalar inputs unless the tool declares a smaller count;
- finite values / explicit domain validation;
- output <=1 MiB.

### `N-LIST` — bounded numeric list/statistics

- source text <=2 MiB;
- <=100,000 parsed numbers;
- numeric token <=128 chars;
- output <=2 MiB;
- Worker above the implementation threshold when list work would block UI.

### `T-TEXT` — ordinary text

- input <=2 MiB;
- output <=4 MiB;
- preserve user bytes/code points when tool semantics require identity;
- safe text sinks only;
- no pasted text in telemetry.

### `T-DIFF` — text diff

- each side <=1 MiB;
- browser Worker for non-trivial input;
- hard timeout <=3 s per diff attempt;
- rendered/result payload <=5 MiB;
- safe text sinks only.

### `S-JSON` — JSON structured text

- input <=2 MiB;
- maximum traversal depth 128;
- maximum traversed nodes 200,000;
- output <=5 MiB;
- Worker above threshold;
- never merge parsed objects into application config/state;
- text output only.

### `S-XML` — XML structured text

- input <=2 MiB;
- reject `<!DOCTYPE` before parse;
- depth <=128;
- nodes <=200,000;
- output <=5 MiB;
- no external resource/entity fetch;
- parsed nodes never inserted into visible app DOM.

### `S-CSV` — CSV/JSON conversion

- total input <=10 MiB;
- rows <=200,000;
- columns <=256;
- individual field <=1 MiB;
- output <=25 MiB;
- Worker/chunking above threshold;
- explicit spreadsheet-formula-injection export policy.

### `M-MARKDOWN` — Markdown preview

- input <=1 MiB;
- browser Worker parsing above threshold;
- parse/work timeout <=3 s;
- generated HTML <=4 MiB;
- fixed markdown-it profile;
- DOMPurify restricted sanitizer before any rendered preview;
- no arbitrary HTML execution/plugin loading.

### `F-HTML` — HTML formatter

- input <=1 MiB;
- browser Worker;
- formatting timeout <=3 s;
- output <=4 MiB;
- no execution/rendering of formatted HTML;
- no user plugins/config-file loading.

### `R-REGEX` — JavaScript RegExp sandbox

- pattern <=10 KiB;
- test input <=1 MiB;
- disposable Worker;
- hard timeout <=1.5 s;
- match/result count <=10,000;
- terminate Worker on timeout/cancel.

### `C-SECRET` — generated secrets/identifiers

- generated length <=4,096 characters where length is configurable;
- Web Crypto only for security-oriented randomness;
- rejection sampling for bounded alphabets/ranges;
- generated values never enter telemetry/logging.

### `H-HASH` — SHA-256 text/file hashing

- text <=10 MiB;
- file <=100 MiB in the initial browser profile;
- browser-local bytes only;
- no file/content telemetry;
- output fixed-size digest.

### `I-RASTER` — raster image decode/encode

- encoded input <=25 MiB;
- width/height <=12,000 px;
- total decoded pixels <=80 MP;
- output <=50 MiB;
- actual format verified from decode/output behavior;
- no server upload.

### `I-META` — image metadata parsing

- file <=25 MiB;
- parser work/output bounded;
- extracted metadata output <=5 MiB;
- local File/ArrayBuffer only;
- all metadata strings treated as untrusted text.

### `I-SVG` — SVG rasterization

- SVG <=5 MiB;
- reject/disable script, active external resources and unsafe document behavior;
- render output <=20 MP;
- Worker/WASM timeout <=5 s;
- raster output <=50 MiB.

### `A-ZIP-CREATE` — archive creation

- total source bytes <=100 MiB;
- <=1,000 entries;
- individual entry <=50 MiB;
- output <=150 MiB;
- sanitized archive entry names;
- Worker/stream path for non-trivial sets.

### `P-PDF` — hostile structural PDF

- total compressed input <=75 MiB;
- aggregate pages <=500;
- output <=100 MiB;
- dedicated browser Worker;
- wall-clock cancellation/timeout target <=15 s per bounded operation;
- malformed/decompression-bomb corpus mandatory;
- encrypted/unsupported inputs rejected explicitly;
- active PDF behavior never executed.

### `D-DATE` — date/time

- years constrained to supported civil range 1–9999 unless implementation proves a broader documented range;
- <=1,000 generated duration rows/segments;
- explicit timezone/calendar semantics;
- no network requirement for deterministic operations.

## 2.4 Telemetry profile `TEL-LOCAL`

Allowed only:

- `tool_start`;
- `tool_success`;
- `tool_error`;
- duration bucket;
- runtime used;
- category/tool id;
- coarse non-content error class.

Never record user input, files, formulas, generated secrets, extracted metadata, private outputs or financial values.

## 2.5 Monetization labels

- `ADS-ELIGIBLE` — normal tool page may use approved ad slots outside action/error/result-adjacency safety zones.
- `ADS-ELIGIBLE-YMYL` — same, but finance copy must remain factual/educational and avoid advice/guarantee claims.
- `ADS-ELIGIBLE-PRIVATE` — same, with explicit local-processing/privacy messaging for files/secrets.

Final placement still belongs to Phase 14 and production policy.

---

# 3. Capability map — finance / business

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Marginal backend cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `loan-calculator` | Loan Calculator / loan payment | en + pt-BR | native | internal formulas + lazy decimal.js (MIT) where needed | tiny/small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | High demand/commercial intent; deterministic. |
| `compound-interest-calculator` | Compound Interest Calculator | en + pt-BR | native | internal + optional decimal.js MIT | tiny/small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Large demand; exact local compounding. |
| `mortgage-calculator` | Mortgage Calculator | en + pt-BR | native | internal formulas | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Major search intent; user supplies rate/term. |
| `auto-loan-calculator` | Auto Loan Calculator | en + pt-BR | native | internal formulas | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Distinct vehicle-finance intent. |
| `interest-calculator` | Interest Calculator / simple + general interest modes | en + pt-BR | native | internal + optional decimal.js MIT | tiny/small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Consolidates simple-interest sibling; independent head intent. |
| `amortization-calculator` | Amortization Calculator / schedule | en + pt-BR | native | internal + optional decimal.js MIT | small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Strong market; bounded schedule generation. |
| `margin-calculator` | Margin Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | High CPC signal + trivial runtime. |
| `roi-calculator` | ROI Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Commercial business intent. |
| `cagr-calculator` | CAGR Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Strong rankability/finance cluster. |
| `markup-calculator` | Markup Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Distinct from margin; business cluster leverage. |
| `break-even-calculator` | Break-even Calculator | en + pt-BR | native | internal formulas | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Useful commercial-intent business calculation. |
| `investment-growth-calculator` | Investment Growth Calculator | en + pt-BR | native | internal + optional decimal.js MIT | tiny/small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Separate investment-growth intent from compound-interest explainer. |
| `discount-calculator` | Discount / percent-off calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Current high-CPC percent-off cluster. |
| `future-value-calculator` | Future Value Calculator | en + pt-BR | native | internal + optional decimal.js MIT | tiny/small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Independent finance formula/intent. |
| `retirement-calculator` | Retirement Calculator | en + pt-BR | native | internal + optional decimal.js MIT | small | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | Strong current demand; assumptions must be explicit. |
| `budget-calculator` | Budget Calculator | en + pt-BR | native | internal arithmetic | tiny | 0 | 0 | N-FIN | TEL-LOCAL | ADS-ELIGIBLE-YMYL | High CPC signal; private values remain local. |
| `tip-calculator` | Tip Calculator | en + pt-BR | native | internal arithmetic | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Very high-volume traffic anchor. |

---

# 4. Capability map — math / statistics

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `slope-calculator` | Slope Calculator | en + pt-BR | native | internal math | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | High-volume deterministic math. |
| `proportion-calculator` | Proportion Calculator | en + pt-BR | native | internal math | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Strong demand/CPC evidence. |
| `volume-calculator` | Volume Calculator | en + pt-BR | native | internal shape formulas | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | High-volume general math. |
| `percentage-change-calculator` | Percentage Change Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Distinct change intent; zero cost. |
| `percentage-calculator` | Percentage Calculator | en + pt-BR | native | internal formula | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Broad repeat utility. |
| `ratio-calculator` | Ratio Calculator | en + pt-BR | native | internal integer/rational math | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Large current search/CPC signal. |
| `area-calculator` | Area Calculator | en + pt-BR | native | internal shape formulas | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Broad geometry utility. |
| `gcd-lcm-calculator` | GCD/LCM Calculator | en + pt-BR | native | Euclidean algorithms / internal | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | High-volume low-cost educational traffic role. |
| `decimal-to-fraction-calculator` | Decimal to Fraction | en + pt-BR | native | BigInt rational + GCD | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Strong current demand/CPC. |
| `random-number-generator` | Random Number Generator | en + pt-BR | native | Web Crypto + rejection sampling | tiny | 0 | 0 | C-SECRET + count<=10,000 | TEL-LOCAL | ADS-ELIGIBLE | Large demand; no thin per-range URLs. |
| `fraction-calculator` | Fraction Calculator | en + pt-BR | native | BigInt rational arithmetic | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Large independent fraction arithmetic intent. |
| `standard-deviation-calculator` | Standard Deviation Calculator | en + pt-BR | native/worker | Welford/two-pass internal | tiny | 0 | 0 | N-LIST | TEL-LOCAL | ADS-ELIGIBLE | Strong statistics intent with stable algorithm. |
| `aspect-ratio-calculator` | Aspect Ratio Calculator | en + pt-BR | native | internal ratio/dimension math | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | High CPC + low-authority incumbent evidence. |

---

# 5. Capability map — image / color

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `image-resizer` | Image Resizer | en + pt-BR | native/browser-js | Canvas/OffscreenCanvas; pica MIT if quality benchmark warrants | tiny/lazy-medium | 0 | 0 | I-RASTER | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Major market; entirely local. |
| `image-compressor` | Image Compressor | en + pt-BR | native/browser-js | native encoder first; benchmarked helper only if needed | lazy-medium | 0 | 0 | I-RASTER; CONDITIONAL profile | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Strong utility; quality/bundle gate retained. |
| `image-cropper` | Image Cropper | en + pt-BR | native | Canvas/OffscreenCanvas | tiny | 0 | 0 | I-RASTER | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Common local image workflow. |
| `jpg-to-png` | JPG to PNG | en + pt-BR | native | createImageBitmap + Canvas PNG encode | tiny | 0 | 0 | I-RASTER | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Browser-native format conversion. |
| `png-to-jpg` | PNG to JPG | en + pt-BR | native | createImageBitmap + Canvas JPEG encode | tiny | 0 | 0 | I-RASTER | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Browser-native; explicit alpha/background policy. |
| `webp-to-png` | WebP to PNG | en + pt-BR | native | native WebP decode + Canvas PNG; no stale jSquash codec | tiny | 0 | 0 | I-RASTER; CONDITIONAL capability detection | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Proven converter demand without backend. |
| `image-metadata-viewer` | Image Metadata / EXIF Viewer | en + pt-BR | browser-js/worker | ExifReader 4.44.0 line, MPL-2.0; conditional | lazy-medium | 0 | 0 | I-META | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Dedicated market + privacy-local differentiator. |
| `svg-to-png` | SVG to PNG | en + pt-BR | wasm/worker | resvg, permissive audited Rust/WASM path | lazy-heavy | 0 | 0 | I-SVG | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Safe raster path for active-format input. |
| `color-contrast-checker` | Color Contrast Checker | en + pt-BR | native | internal WCAG contrast math | tiny | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Accessibility utility, no external data. |
| `palette-generator` | Gradient / Palette Generator | en + pt-BR | native | internal color math; Color.js only if advanced spaces justify | tiny/small | 0 | 0 | N-MATH | TEL-LOCAL | ADS-ELIGIBLE | Strong market/repeat-use cluster. |

---

# 6. Capability map — text / writing

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `word-counter` | Word Counter | en + pt-BR | native | internal + Intl segmentation where helpful | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Proven multi-million utility market. |
| `character-counter` | Character Counter | en + pt-BR | native | internal Unicode-aware count | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Independent large search intent. |
| `case-converter` | Case Converter | en + pt-BR | native | internal text transforms | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Strong repeat/direct product evidence. |
| `title-case-converter` | Title Case Converter | en + pt-BR | native | internal documented style rules | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Independent title-case SERP/use intent. |
| `text-diff` | Text Diff / Compare Text | en + pt-BR | worker-js | jsdiff/diff BSD-3-Clause | small | 0 | 0 | T-DIFF | TEL-LOCAL | ADS-ELIGIBLE | Strong commercial/repeat developer intent. |

---

# 7. Capability map — developer / structured data

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `markdown-previewer` | Markdown Previewer | en + pt-BR | worker-js | markdown-it >=15 + DOMPurify (MIT / Apache-2.0 election where applicable) | lazy-medium | 0 | 0 | M-MARKDOWN | TEL-LOCAL | ADS-ELIGIBLE | Elite developer candidate; sanitized rendered preview. |
| `url-encoder` | URL Encoder | en + pt-BR | native | URL/URLSearchParams/encodeURIComponent | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | High CPC + repeat usage. |
| `url-decoder` | URL Decoder | en + pt-BR | native | decodeURIComponent/URL primitives | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Independent decoding utility; malformed-percent errors bounded. |
| `json-validator` | JSON Validator | en + pt-BR | native/worker | JSON.parse | tiny | 0 | 0 | S-JSON | TEL-LOCAL | ADS-ELIGIBLE | Strong current CPC/dedicated-market evidence. |
| `json-formatter` | JSON Formatter + minify mode | en + pt-BR | native/worker | JSON.parse/stringify | tiny | 0 | 0 | S-JSON | TEL-LOCAL | ADS-ELIGIBLE | Large repeat-use market; minifier consolidated. |
| `base64-encoder` | Base64 Encoder | en + pt-BR | native | TextEncoder + byte-safe internal helpers | tiny | 0 | 0 | input<=10MiB/output<=16MiB | TEL-LOCAL | ADS-ELIGIBLE | Common encoding intent; clearly not encryption. |
| `base64-decoder` | Base64 Decoder | en + pt-BR | native | byte-safe internal helpers + TextDecoder | tiny | 0 | 0 | input<=16MiB/output<=10MiB | TEL-LOCAL | ADS-ELIGIBLE | High-demand developer utility. |
| `uuid-generator` | UUID Generator | en + pt-BR | native | crypto.randomUUID() | tiny | 0 | 0 | C-SECRET | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Native, zero-dependency repeat utility. |
| `password-generator` | Random Password Generator | en + pt-BR | native | crypto.getRandomValues + rejection sampling | tiny | 0 | 0 | C-SECRET | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Huge volume, secrets never leave device. |
| `sha256-hash-generator` | SHA-256 Hash Generator, text + file modes | en + pt-BR | native/worker | Web Crypto `subtle.digest` | tiny | 0 | 0 | H-HASH | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Consolidates file-hash sibling while preserving capability. |
| `regex-tester` | JavaScript Regex Tester | en + pt-BR | worker-js | native RegExp in disposable Worker | tiny | 0 | 0 | R-REGEX | TEL-LOCAL | ADS-ELIGIBLE | High CPC; hard timeout contains catastrophic patterns. |
| `html-formatter` | HTML Formatter | en + pt-BR | worker-js | lazy Prettier standalone + HTML plugin, MIT; conditional exact pin | lazy-heavy | 0 | 0 | F-HTML | TEL-LOCAL | ADS-ELIGIBLE | Strongest formatter economics; route-isolated bundle. |
| `xml-formatter` | XML Formatter | en + pt-BR | native/worker | DOMParser + XMLSerializer | tiny | 0 | 0 | S-XML | TEL-LOCAL | ADS-ELIGIBLE | Native restrictive path avoids larger risky XML parser. |
| `csv-json-converter` | CSV ↔ JSON Converter | en + pt-BR | worker-js | PapaParse 5.6.0 line, MIT; conditional | lazy-medium | 0 | 0 | S-CSV | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Bidirectional product avoids two thin sibling URLs. |
| `number-base-converter` | Number Base Converter | en + pt-BR | native/worker | internal arbitrary-precision/string-safe conversion | tiny | 0 | 0 | input<=100KiB digits; timeout<=2s above threshold | TEL-LOCAL | ADS-ELIGIBLE | Very strong binary/hex CPC and demand signals. |
| `binary-translator` | UTF-8 Text ↔ Binary Translator | en + pt-BR | native | TextEncoder/TextDecoder + internal bit formatting | tiny | 0 | 0 | T-TEXT | TEL-LOCAL | ADS-ELIGIBLE | Separate text/binary intent from numeric base conversion. |

---

# 8. Capability map — date / time

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `age-calculator` | Age Calculator | en + pt-BR | native | Date/Intl + calendar-safe internal logic | tiny | 0 | 0 | D-DATE | TEL-LOCAL | ADS-ELIGIBLE | Massive high-volume traffic role. |
| `date-difference-calculator` | Date Difference Calculator | en + pt-BR | native | Date/Intl; Temporal/lazy polyfill only if semantics require | tiny/small | 0 | 0 | D-DATE | TEL-LOCAL | ADS-ELIGIBLE | Deterministic independent date intent. |
| `unix-timestamp-converter` | Unix Timestamp Converter | en + pt-BR | native | numeric conversion + Date/Intl | tiny | 0 | 0 | D-DATE | TEL-LOCAL | ADS-ELIGIBLE | Developer/date utility; no duplicate direction URLs. |

---

# 9. Capability map — archive / file

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `zip-creator` | ZIP Creator | en + pt-BR | worker-js | fflate MIT or approved focused local ZIP writer | lazy-medium | 0 | 0 | A-ZIP-CREATE | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Preserves archive coverage without extraction attack surface. |

---

# 10. Capability map — structural PDF

| Tool id | Candidate / primary intent | Locale | Execution | Engine / license | Bundle | Req/op | Cost | Security / limits | Telemetry | Ads | Rationale |
|---|---|---|---|---|---|---:|---:|---|---|---|---|
| `split-pdf` | Split PDF | en + pt-BR | worker-js | `@pdfme/pdf-lib >=6.1.12` or newer separately audited stable, MIT; conditional | lazy-heavy | 0 | 0 | P-PDF | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Strong independent split market justifies parser gate. |
| `merge-pdf` | Merge PDF | en + pt-BR | worker-js | same isolated structural engine, MIT; conditional | lazy-heavy | 0 | 0 | P-PDF | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Current US demand/CPC supports inclusion; disclose preservation limits. |
| `remove-pdf-pages` | Remove PDF Pages | en + pt-BR | worker-js | same isolated structural engine, MIT; conditional | lazy-heavy | 0 | 0 | P-PDF | TEL-LOCAL | ADS-ELIGIBLE-PRIVATE | Current 33K+ US deletion intent with clean SERP overlap. |

---

# 11. Economic summary

For all 68 candidates:

```text
server processing requests per ordinary tool operation = 0
expected marginal MenezesDev compute cost per ordinary operation ≈ 0
```

This does not claim that CDN transfer, static hosting, analytics, advertising or future autonomous-growth orchestration are literally free. It records that **tool computation itself does not scale into per-operation backend compute cost**.

---

# 12. Conditional dependency admission rule

Capability Map inclusion is not permission to install a conditional dependency blindly.

Before implementation:

- ExifReader exact version/license/security profile must pass its recorded admission gate;
- Prettier exact stable version/plugin/bundle profile must be re-audited and pinned;
- PapaParse exact stable version/Worker/export behavior must pass its gate;
- @pdfme/pdf-lib must remain at the audited safe line or a newer separately audited version and pass hostile-PDF fixtures;
- image compression/WebP feature/quality behavior must pass browser fixture benchmarks.

If a conditional survivor fails its admission profile later, Phase 4 reserve candidates replace it rather than weakening a hard gate.

---

# 13. Phase-3 gate assessment

The immutable workflow requires that no candidate Launch 50 tool lack a concrete technical and economic execution path.

This map covers the entire final 68-candidate selection pool, not merely 50:

- every row has a runtime decision;
- engine/internal path;
- license state;
- bundle-impact class;
- requests/op;
- marginal backend cost;
- security/input-limit profile;
- telemetry profile;
- monetization eligibility;
- market/architecture rationale.

**Phase-3 gate assessment: SATISFIED.**

A separate closure record may mark Phase 3 closed. Phase 4 may then produce an exact Launch-50 recommendation, but the Launch-50 freeze itself still requires its own approval gate.
