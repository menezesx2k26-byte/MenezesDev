# MenezesDev Tools — OSS Audit Batch 5: Client Engines

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS capability audit  
**Governing documents:** `docs/tools/IMMUTABLE_WORKFLOW.md`, `docs/tools/SECURITY_POLICY.md`.

This batch continues the browser-first/cost-first audit. The objective is not to maximize dependency count; it is to identify the safest zero-backend path for capabilities likely to appear in Launch 50.

---

# 1. Native image pipeline first

## `createImageBitmap()` + Canvas / OffscreenCanvas + `toBlob()`

**Type:** browser platform APIs  
**Server requests per operation:** 0  
**Decision:** **APPROVED — first-choice path for formats supported by the current browser**

Capabilities:

- decode browser-supported images into an `ImageBitmap`;
- perform resize/crop/rotate/composition locally;
- encode PNG universally through Canvas;
- encode JPEG in modern browsers;
- encode WebP only when runtime feature detection proves support;
- use Worker/OffscreenCanvas paths where supported to keep the UI responsive.

Rules:

1. Detect actual input format and enforce byte/pixel limits before expensive processing.
2. Feature-detect output formats; never assume `toBlob('image/webp')` actually produced WebP because unsupported types may fall back to PNG.
3. Revoke object URLs after use.
4. Explicitly close disposable `ImageBitmap` objects.
5. Prefer local platform decoding/encoding before shipping a codec WASM bundle.
6. `ImageDecoder` may be used as an optional optimized path where available, but it is not Baseline and cannot be the sole implementation.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap
- https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/createImageBitmap
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
- https://developer.mozilla.org/en-US/docs/Web/API/ImageDecoder

---

# 2. jSquash supply-chain audit

## `jamsinclair/jSquash`

**Top-level license:** Apache-2.0  
**Community:** ~700 stars; browser/Web Worker focused; ESM; no dynamic-code execution  
**Architecture signal:** strong  
**Decision:** **CONDITIONAL AS A PROJECT / INDIVIDUAL CODECS REQUIRE SEPARATE APPROVAL**

The architecture is attractive for MenezesDev Tools because the codecs execute locally in browser/Workers and avoid server compute. However, the top-level Apache license and current maintenance do **not** make every packaged native codec safe.

### `@jsquash/avif` 2.1.1

The package build currently pins:

- `libavif 1.0.1`;
- `libaom 3.7.0`;
- a fixed libwebp commit for SharpYUV.

`libavif 1.0.1` predates a critical integer-overflow/buffer-overflow fix shipped in libavif 1.3.0 (CVE-2025-48174, disclosed/ingested in 2026 security databases).

**Decision:** **HOLD — current package must not process public untrusted AVIF input.**

Re-evaluate only after the package updates to a currently audited libavif/libaom/libwebp stack and passes malformed-image/resource tests.

Upstream evidence:
- `packages/avif/codec/Makefile` in jSquash pins libavif 1.0.1.
- https://osv.dev/vulnerability/JLSEC-2026-125

### `@jsquash/webp`

The package build currently pins libwebp commit `d2e245ea9e959a5a79e1db0ed2085206947e98f2`, dated 2020-11-24.

That predates the libwebp heap-buffer-overflow fix for CVE-2023-4863, which requires libwebp 1.3.2 or equivalent patched code.

**Decision:** **HOLD — current package must not process public untrusted WebP input.**

The fact that the old native codec is wrapped in WASM does not remove the memory-safety bug.

### `@jsquash/jpeg`

The current codec build pins MozJPEG `v3.3.1`, an old native codec line.

**Decision:** **HOLD pending exact CVE/advisory and fuzzing review.**

There is no reason to choose this stale native codec for ordinary JPEG conversions when the browser's native decoder + Canvas encoder covers the common Launch 50 path locally.

### `@jsquash/png`

The current Rust codec pins `png = 0.17.10` rather than the current audited `image-png` line already preferred in the Rust audit.

**Decision:** **CONDITIONAL / YAGNI.** Prefer browser-native PNG or a separately pinned current `image-png` WASM build if browser-native behavior is insufficient.

### jSquash conclusion

Do not reject jSquash as an architecture. Reject **stale embedded codec versions**. Every WASM image dependency must record the exact native/Rust codec commit it ships, not merely the npm package version.

References:
- https://github.com/jamsinclair/jSquash
- repository codec build files under `packages/*/codec/`
- https://github.com/advisories/GHSA-j7hp-h8jx-5ppr

---

# 3. Markdown parsing / preview

## `markdown-it` 15.0.0

**License:** MIT  
**Community:** ~21.8k stars, ~1.8k forks  
**Current repository version:** 15.0.0  
**Decision:** **APPROVED under the MenezesDev restricted browser profile**

Security history reviewed:

- CVE-2026-2327 / GHSA-38c4-r59v-3vqw: ReDoS affecting >=13.0.0 and <14.1.1; fixed in 14.1.1.
- CVE-2026-48988 / GHSA-6v5v-wf23-fmfq: quadratic smartquotes DoS affecting <=14.1.1; fixed in 14.2.0.
- v14.3.0 and v15.0.0 are after those fixes.

Required browser profile for public user Markdown:

- exact audited version `>=15.0.0`;
- `html: false`;
- `typographer: false` unless a future reviewed tool explicitly needs it;
- `linkify: false` by default unless the tool explicitly needs automatic linkification;
- strict input byte/character limit;
- Worker execution or cancellable work budget for large preview inputs;
- sanitize the final generated HTML with the already-approved DOMPurify before inserting it into a live DOM as defense in depth;
- safe link policy (`http:`, `https:`, `mailto:` only when applicable; `rel="noopener noreferrer"` on external targets).

Why preferred over a custom Markdown parser:

- mature CommonMark behavior;
- configurable rule surface;
- active security fixes;
- no backend request;
- avoids us implementing a parser with a much less tested attack surface.

References:
- https://github.com/markdown-it/markdown-it
- https://github.com/advisories/GHSA-38c4-r59v-3vqw
- https://github.com/advisories/GHSA-6v5v-wf23-fmfq

## `marked` 18.0.7

**License:** MIT  
**Community:** very large/established  
**Decision:** **CONDITIONAL ALTERNATE — not the default Markdown engine**

Positive:

- lightweight, browser-compatible, actively maintained;
- project explicitly documents running parsing in a Web Worker with a timeout for ReDoS protection.

Cautions:

- upstream explicitly warns that Marked does **not** sanitize output HTML;
- 2026 releases repeatedly hardened catastrophic/quadratic regex/tokenizer paths, including fixes in 17.0.5, 18.0.6 and 18.0.7;
- therefore it must never feed output directly to `innerHTML` without sanitization.

Required profile if selected later:

- pin `>=18.0.7` or newer separately audited version;
- parse in Worker for untrusted/large inputs;
- hard timeout/cancellation;
- input cap;
- DOMPurify final output sanitation;
- regression corpus for known pathological Markdown patterns.

References:
- https://github.com/markedjs/marked
- https://github.com/markedjs/marked/releases

---

# 4. QR / barcode decoding

## Native `BarcodeDetector`

**Type:** browser platform API  
**Server requests per operation:** 0  
**Decision:** **APPROVED AS FEATURE-DETECTED FAST PATH ONLY**

The API runs locally and can run in Workers, but is still Limited Availability / experimental and therefore cannot be our only implementation.

Rules:

- feature detect `BarcodeDetector`;
- query `getSupportedFormats()` before use;
- request only the barcode formats the tool actually needs;
- cap source pixels/dimensions before scanning;
- never treat decoded QR/barcode text as trusted HTML/URL/code.

Reference:
- https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector

## `zxing-js/library` 0.23.0 + `zxing-js/browser` 0.2.1

**License:** Apache-2.0 core; MIT browser layer package metadata  
**Community:** ~2.9k stars / ~570 forks on core; active Apr 2026 release modernization  
**Decision:** **CONDITIONAL — preferred broad barcode fallback candidate**

Strengths:

- fully browser-local;
- broad 1D/2D format coverage;
- current release activity in 2026;
- maintained TypeScript/browser integration.

Cautions:

- core currently has no SECURITY.md and no published GitHub advisories;
- decoder receives hostile pixel data and can still have CPU/pathological-input problems despite memory-safe JavaScript;
- ~167 open issues at audit time, so the exact formats we enable must be benchmarked/tested.

Admission gate:

- limit enabled formats to the tool's declared set;
- resize/normalize very large source images before decode;
- Worker execution for repeated scanning;
- explicit per-scan timeout/work budget;
- hostile/noise/truncated barcode corpus;
- compare accuracy/latency against `rxing` WASM before final engine freeze.

References:
- https://github.com/zxing-js/library
- https://github.com/zxing-js/browser

## `nimiq/qr-scanner` 1.4.2

**License:** MIT  
**Community:** ~2.9k stars / ~579 forks  
**Runtime:** native BarcodeDetector when available; Web Worker fallback  
**Decision:** **HOLD AS NEW DEFAULT / useful benchmark candidate**

Its architecture is excellent for QR-only scanning and its bundle is small, but the current package version remains 1.4.2 and the issue tracker includes a 2025 question asking whether the library is still maintained, with many unresolved issues. For a new 2026 platform, prefer the actively released ZXing JS stack unless benchmarking proves a material QR-specific advantage and maintenance is re-established.

References:
- https://github.com/nimiq/qr-scanner
- repository `package.json`

---

# 5. Hash / checksum tools

## Native `crypto.subtle.digest()`

**Type:** browser platform API  
**Algorithms:** SHA-1, SHA-256, SHA-384, SHA-512  
**Server requests per operation:** 0  
**Decision:** **APPROVED — first choice for standard SHA tools**

Policy:

- SHA-256/384/512 are the normal cryptographic choices;
- SHA-1 may be exposed only as a clearly labelled legacy/compatibility checksum, never recommended for security;
- `digest()` is not streaming and requires the full input in memory, therefore maximum file size must reflect realistic browser memory budgets;
- use a Worker for large files to avoid blocking the main thread;
- text hashing uses `TextEncoder` with an explicit UTF-8 statement in the UI.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
- https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder

## `hash-wasm` 4.12.0

**License:** MIT top-level; embedded C implementations carry additional permissive notices  
**Community:** ~1.1k stars; ~1M+ weekly npm downloads  
**Decision:** **CONDITIONAL / secondary streaming & extra-algorithm candidate**

Use only when native Web Crypto cannot satisfy the actual tool, e.g.:

- streaming very large files without full-buffer `SubtleCrypto.digest()`;
- BLAKE2/BLAKE3/SHA-3/xxHash/CRC tools;
- compatibility algorithms deliberately exposed as non-cryptographic/legacy choices.

Cautions:

- package has no SECURITY.md;
- npm publish cadence is older despite continuing repository issue activity;
- license notices of embedded C implementations must be enumerated before integration;
- an open possible memory-leak issue exists and should be reproduced/closed for any long-running repeated-file hashing UI.

Decision remains conditional until exact algorithm subset, bundle size and memory behavior are benchmarked.

References:
- https://github.com/Daninet/hash-wasm
- https://www.npmjs.com/package/hash-wasm

---

# 6. Encoding / text byte conversion

## `TextEncoder` / `TextDecoder`

**Type:** browser platform APIs  
**Server requests per operation:** 0  
**Decision:** **APPROVED — default encoding primitives**

- `TextEncoder` emits UTF-8.
- `TextDecoder` can decode UTF-8 and many standardized legacy encodings.
- both are widely available and Worker-capable.

Use these before adding an encoding package.

Reference:
- https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API

---

# 7. PDF rasterization reaffirmation

`pdf-lib` remains the preferred structural manipulation engine.

PDF.js remains **CONDITIONAL**, not rejected, for page rendering/rasterization that cannot be achieved structurally:

- `pdfjs-dist >= 6.2.108` or a newer separately audited release;
- scripting disabled;
- worker isolation;
- strict CSP;
- page/pixel/output caps;
- hostile PDF regression corpus;
- no backend conversion request.

The qpdf WASM HOLD from Batch 4 remains unchanged.

---

# Batch 5 consolidated decisions

| Capability | Preferred path | Decision |
|---|---|---|
| ordinary PNG/JPEG decode/resize/encode | native bitmap + Canvas | **APPROVED** |
| WebP encode | Canvas only when feature detection proves actual WebP output | **APPROVED conditional on runtime support** |
| WebCodecs `ImageDecoder` | optional local acceleration | **APPROVED optional / not sole path** |
| jSquash AVIF current package | stale libavif 1.0.1 | **HOLD** |
| jSquash WebP current package | stale 2020 libwebp | **HOLD** |
| jSquash JPEG current package | old MozJPEG 3.3.1 | **HOLD pending audit** |
| Markdown preview | markdown-it 15 + restricted profile + DOMPurify | **APPROVED** |
| Marked | Worker + timeout + DOMPurify | **CONDITIONAL alternate** |
| QR/barcode native | BarcodeDetector feature-detected | **APPROVED fast path** |
| broad QR/barcode fallback | ZXing JS | **CONDITIONAL preferred candidate** |
| Nimiq QR Scanner | benchmark only until maintenance question clears | **HOLD default** |
| SHA-256/384/512 | Web Crypto | **APPROVED** |
| streaming/extra hashes | hash-wasm | **CONDITIONAL** |
| UTF-8/text decoding | Encoding API | **APPROVED** |
| PDF page rasterization | patched PDF.js in isolated Worker | **CONDITIONAL** |

---

# Economic impact

Every approved default in this batch runs in the user's browser and requires **zero per-operation MenezesDev backend requests**. Worker use means a browser Web Worker unless explicitly stated otherwise; it does not mean a Cloudflare Worker.

A future capability may not replace these local paths with server compute merely for implementation convenience without failing the workflow's browser-first/cost gate.

# Next Phase 2 audit targets

- exact unit/conversion data sources and whether a dependency is needed at all;
- CSV/JSON/XML browser-first wrappers versus native/simple JS and existing Rust options;
- safe regex testing/tool design without allowing attacker-controlled catastrophic backtracking;
- HTML/CSS/JS formatter candidates and Prettier standalone bundle audit;
- password/random generator paths based only on Web Crypto entropy;
- image quality/latency benchmarks for native Canvas vs pica vs safe current codecs;
- local PDF structural-operation capability matrix (`pdf-lib`) to identify which proposed PDF tools need no raster/parser fallback.
