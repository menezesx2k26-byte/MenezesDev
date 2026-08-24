# MenezesDev Tools — Phase 2 Final Coverage for the 68-Candidate Pool

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Input pool:** `docs/tools/MARKET_SHORTLIST_68_FINAL_PHASE1.md`  
**Status:** FINAL COVERAGE / CLOSURE INPUT

---

# 1. Executive result

For the final 68 Phase-1 candidates:

- **60/68** have a clear/internal/local-bounded implementation path;
- **8/68** are `LOCAL-CONDITIONAL` with explicit admission profiles below;
- **0/68** require ordinary server-side processing per user operation;
- **0/68** depend on a `HOLD` or `UNRESOLVED` capability;
- **68/68** are designed for **0 MenezesDev backend-processing requests per ordinary operation**.

The eight conditional rows are not eight unrelated architecture unknowns. They are concentrated in six shared technical families:

1. image compression;
2. WebP browser decode/runtime capability;
3. EXIF metadata parsing;
4. HTML formatting / Prettier;
5. CSV ↔ JSON parsing/export;
6. one structural PDF engine powering three tools.

---

# 2. Final conditional survivors and exact admission profiles

## 2.1 Image Compressor — LOCAL-CONDITIONAL

**Preferred path:** browser-native decode/Canvas/encoder quality controls; pica/browser-image-compression only where benchmark evidence justifies them.  
**Backend requests/op:** 0.

Admission profile:

- enforce encoded-byte and decoded-pixel caps before/around decode;
- prefer browser-native encoder output when quality/size is acceptable;
- benchmark representative photographic, graphic, transparent and pathological fixtures;
- verify actual output MIME/type rather than trusting requested extension;
- worker/off-main-thread execution where browser API/support makes it practical for large inputs;
- explicit quality/output-size semantics;
- never upload user images merely for compression.

Dependency rule:

- `pica` is already approved for quality resize;
- `browser-image-compression` is benchmark-first and must not be imported merely for convenience if native APIs are sufficient.

## 2.2 WebP to PNG — LOCAL-CONDITIONAL

**Preferred path:** browser-native WebP decode (`createImageBitmap`/image decode) → Canvas/OffscreenCanvas → PNG encode.  
**Backend requests/op:** 0.

Admission profile:

- runtime feature-detect WebP decode and PNG encode behavior;
- byte, width, height and total-pixel caps;
- reject malformed/unsupported input cleanly;
- do not use the currently held stale jSquash WebP codec path;
- preserve transparency correctly;
- output-type fixture verification;
- unsupported browser path degrades honestly rather than silently sending the image to a backend.

## 2.3 Image Metadata Viewer — LOCAL-CONDITIONAL

**Preferred engine:** `ExifReader` local `File`/`ArrayBuffer`.  
**License:** MPL-2.0; obligations must be preserved.  
**Audited line:** 4.44.0 released 2026-08-21 in current catalog.  
**Backend requests/op:** 0.

Admission profile:

- pin the exact stable audited version at integration time; recheck advisories before install;
- local bytes/File input only; no user-controlled remote URL fetch;
- cap encoded bytes and metadata parsing work;
- extracted metadata strings are untrusted and rendered through safe text sinks only;
- no `innerHTML` from metadata;
- hostile fixtures for malformed EXIF/XMP/IPTC, oversized tags, prototype-like keys and truncated containers;
- include MPL notice/source-obligation review in third-party notices.

## 2.4 HTML Formatter — LOCAL-CONDITIONAL

**Preferred engine:** Prettier standalone + HTML plugin, lazy and route-isolated.  
**License:** MIT.  
**Backend requests/op:** 0.

Admission profile:

- pin an exact stable audited Prettier version immediately before integration;
- lazy import `prettier/standalone` plus only the HTML parser/plugin needed;
- no arbitrary user plugin/config loading;
- non-trivial formatting runs in a browser Worker;
- input byte cap, output cap and main-thread wall-clock timeout/cancellation;
- formatted output rendered as escaped text, never executed as application HTML;
- bundle-size check to ensure formatter plugins do not contaminate unrelated routes.

## 2.5 CSV to JSON (bidirectional CSV ↔ JSON product) — LOCAL-CONDITIONAL

**Preferred engine:** PapaParse 5.6.0 or a newer separately audited release at integration time.  
**License:** MIT.  
**Backend requests/op:** 0.

Admission profile:

- local `File`/string only; never use Papa remote-download mode for arbitrary user URLs;
- byte, row, column, field-length and output-size caps;
- abort processing on limit breach;
- Worker/chunking above threshold only after exact Astro/Vite production regression tests;
- explicit UTF-8/chunk-boundary fixtures;
- JSON object/key handling must not merge parsed data into application config/state;
- reverse JSON → CSV mode implements a project-owned spreadsheet-formula-injection policy;
- quote/newline/null/type-loss semantics documented;
- pin/re-audit exact package version before install.

## 2.6 Split PDF / Merge PDF / Remove PDF Pages — LOCAL-CONDITIONAL

**Preferred engine:** isolated `@pdfme/pdf-lib` structural package.  
**License:** MIT.  
**Minimum audited safe line:** `>=6.1.12` in the current Phase-2 audit; older `<=5.5.9` inherited the decompression-bomb issue fixed in 5.5.10.  
**Backend requests/op:** 0.

One admission profile applies to all three tools:

- pin `@pdfme/pdf-lib >=6.1.12` or a newer separately audited stable release;
- import only the structural PDF package, not pdfme UI/schema stacks;
- parse/manipulate inside a dedicated browser Web Worker;
- pre-cap compressed bytes;
- cap page count, object/work count where measurable, output bytes and operation duration;
- terminate Worker on timeout/cancel;
- keep the library decoded-stream limit but impose stricter MenezesDev whole-operation budgets;
- hostile corpus must include FlateDecode/decompression bombs, malformed xref/object streams, nested filters, corrupt PDFs, giant page counts and truncated files;
- reject encrypted/unsupported inputs explicitly;
- disable/avoid active document behavior and never execute PDF JavaScript/actions;
- test output preservation claims narrowly: links/forms/outlines/attachments are not promised unless regression fixtures prove them;
- Merge: disclose structural/document-level preservation limitations;
- Split: selected range/page export only;
- Remove Pages: validate that at least one page remains and bound requested page-index sets.

The earlier Hopding `pdf-lib` and audited Cantoo path remain HOLD for hostile public uploads and must not be silently substituted.

---

# 3. Clear/internal/local-bounded survivors

The other **60/68** candidates use already-selected browser/native/internal paths. Their major families are:

- deterministic finance formulas + lazy `decimal.js` only when precision warrants it;
- integer/BigInt rational math and standard numerical algorithms;
- browser-native Canvas/OffscreenCanvas for ordinary raster crop/resize/conversion;
- `resvg` for bounded SVG → PNG;
- internal color/contrast formulas;
- Unicode-aware internal text transforms/counters;
- `jsdiff` locally for Text Diff with Worker/work caps;
- `markdown-it >=15` + DOMPurify restricted profile for Markdown Previewer;
- native URL APIs and encode/decode primitives;
- bounded native JSON parse/stringify;
- TextEncoder/TextDecoder for Base64/binary text semantics;
- `crypto.randomUUID()` and `crypto.getRandomValues()`;
- Web Crypto `crypto.subtle.digest` for SHA-256 text/file modes within limits;
- native RegExp inside a disposable Worker with hard timeout;
- DOMParser/XMLSerializer with pre-parse DOCTYPE rejection for XML;
- native Date/Intl/Temporal path for deterministic date/time tools;
- zip.js/fflate-compatible local ZIP creation behind output/resource caps.

No server path is justified for any of these ordinary operations.

---

# 4. Phase-2 dependency/security decisions carried forward

Still HOLD/REJECT and **not required by the 68**:

- universal HEIC/HEIF conversion path;
- stale/vulnerable jSquash WebP/AVIF codec paths audited earlier;
- generic PDF compression/qpdf path;
- arbitrary PDF text extraction/editing;
- OCR production stack;
- fast-xml-parser for our public XML formatter scope;
- archived `saxes` for new integration;
- js-beautify as default formatter;
- remote arbitrary URL fetching for file/data tools.

This is intentional: Phase 2 does not need to solve capabilities that market selection no longer requires.

---

# 5. Phase-2 exit-gate assessment

The immutable workflow requires:

> every Launch 50 capability has an implementation path or a documented reason to implement it internally.

The final candidate pool is 68, and **every one of the 68 now has a concrete path**:

- 60 clear/internal/local-bounded;
- 8 conditional with exact admission gates;
- no backend-required or unresolved capability.

A conditional dependency is not authorized for blind installation; its integration still must satisfy its recorded conditions. That does not block Capability Map creation because the architecture/path and admission requirements are concrete.

**Phase-2 gate assessment: SATISFIED.**

A separate closure record should mark Phase 2 closed without rewriting historical workflow text.
