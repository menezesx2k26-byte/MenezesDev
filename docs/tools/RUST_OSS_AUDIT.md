# MenezesDev Tools — Rust-first OSS Audit

**Status:** audited candidate batch 2  
**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Policy:** Rust is preferred for security-sensitive parsing/codecs when the Rust candidate is mature, permissively licensed and demonstrably safer. Rust alone is never sufficient for approval. All integrations are additionally bound by `docs/tools/SECURITY_POLICY.md`.

## Decision legend

- **APPROVED** — strong candidate for selective integration after exact-version pin and integration tests.
- **CONDITIONAL** — useful, but one or more explicit constraints must be satisfied first.
- **HOLD** — do not integrate for Launch 50 unless a new review resolves the concern.
- **REJECT FOR HOSTILE INPUT** — may be technically interesting, but is not acceptable on a public upload boundary.

## Audited Rust candidates

| Candidate | Capability | License | Security / community findings | Decision |
|---|---|---|---|---|
| `image-rs/image` | Raster image decode/encode + basic operations | MIT OR Apache-2.0 | ~5.9k stars; active in 2026; security policy; supports common formats; upstream recommends `default-features = false` for libraries and explicit format features. Past changelog shows malformed-input/OOM/fuzz fixes and resource-limit work. | **APPROVED** with explicit features and decode limits |
| `image-rs/image-png` | PNG/APNG encode/decode | MIT OR Apache-2.0 | Pure Rust; upstream states no `unsafe`; fuzzed on OSS-Fuzz; battle-tested; ~500 stars. Excellent fit for hostile PNG parsing compared with native FFI codecs. | **APPROVED — preferred PNG backend** |
| `image-rs/image-webp` | WebP encode/decode | MIT OR Apache-2.0 | Pure Rust; decoder supports full WebP feature set; audit shown by upstream reports zero unsafe usage in crate/deps snapshot. Encoder is lossless-only, so it cannot replace every lossy compression use case. | **APPROVED** for decode/lossless encode; benchmark before compression-default use |
| `image-rs/imageproc` | Image processing operations | MIT | ~974 stars; tested/maintained; built on `image`; optional parallel/text/FFT features. Not a format decoder itself. | **APPROVED** only for tools needing its higher-level operations; disable unused features |
| `linebender/resvg` | SVG parsing/rendering to raster | MIT OR Apache-2.0 | ~4k stars; fully Rust final binary, almost no `unsafe`; extensive ~1,600 SVG regression tests; explicit defenses against endless loops and stack overflows; WASM-capable. Strong security posture for untrusted SVG. | **APPROVED — preferred SVG rasterization engine** |
| `J-F-Liu/lopdf` | PDF parsing/manipulation | MIT (repo notes Montserrat font exception) | ~2.2k stars; Rust PDF library; current 0.44.x line uses Rust 2024. Important caveat: design keeps whole document in memory, so public upload use requires strict bytes/page/object/work caps and isolated runtime. | **CONDITIONAL** — benchmark + hostile-PDF/resource testing required |
| `serde-rs/json` (`serde_json`) | JSON parse/serialize | MIT OR Apache-2.0 | ~5.6k stars; very mature/active Serde ecosystem; strongly typed parsing; no reason to use a JS eval-like parser. | **APPROVED — preferred JSON engine when Rust/WASM is used** |
| `BurntSushi/rust-csv` (`csv`) | CSV parse/write | MIT OR Unlicense | ~2k stars; mature and fast; supports Serde. Public input still needs byte/row/column/field limits; CSV formula injection matters only when exporting for spreadsheet consumption and must be handled at output boundary. | **APPROVED** with structural limits |
| `tafia/quick-xml` | XML pull parsing/writing | MIT | High-performance zero-copy-oriented parser; active 0.41.x line; external resources must remain disabled/not fetched by our integration. XML depth/bytes/event counts must be bounded. | **APPROVED** with strict depth/work limits; no network entity resolution |
| `RustCrypto/hashes` | SHA-2/SHA-3/BLAKE/etc. | MIT OR Apache-2.0 | ~2.2k stars; pure Rust; no_std/WASM friendly; security policy; project explicitly recommends modern hashes. For ordinary browser SHA-256, Web Crypto remains smaller and preferred; RustCrypto adds value for algorithms Web Crypto does not expose or shared WASM. | **APPROVED, YAGNI check** |
| `nayuki/QR-Code-generator` / Rust `qrcodegen` | QR generation | MIT | Long-lived, small, deterministic implementation; Rust package is MIT and actively receives maintenance PRs. Generation parses text but does not decode hostile images. | **APPROVED — preferred simple QR generator candidate** |
| `kennytm/qrcode-rust` | QR/Micro QR generation | MIT OR Apache-2.0 | Mature Rust encoder; optional/default image dependency can be removed when not needed. Overlaps heavily with `qrcodegen`; choose one after API/bundle benchmark. | **APPROVED, compare with qrcodegen** |
| `robertknight/ocrs` | OCR | MIT OR Apache-2.0 code | ~1.9k stars; Rust/WASM-capable and promising, but upstream explicitly labels it early preview and Latin-only. More importantly, a July 2026 open issue notes that distributed `.rten` model files have no clear license statement. | **HOLD — model artifact licensing unresolved** |
| `kornelski/cavif-rs` / `ravif` | AVIF encoding | BSD-3-Clause | ~674 stars; primarily Rust but README notes C LCMS2 for color profiles; latest listed release is from 2024. Useful, but not fully Rust/FFI-free and maintenance cadence is weaker than core image-rs. | **CONDITIONAL** — prefer `image`/native path first; FFI/license tree review required |
| `image-rs/image-extras` | Additional image formats | MIT OR Apache-2.0 | Pure-Rust inclusion goal, but upstream explicitly says fuzzing is not a priority and decoders may panic or worse on malformed input. This is incompatible with a public attacker-controlled upload boundary. | **REJECT FOR HOSTILE INPUT / HOLD** |
| `wg/quirc-rs` | QR decode | ISC | Rust wrapper bundles C `quirc` and requires C compiler; very small community (~20 stars). Rust wrapper does not deliver the memory-safety benefit we are seeking because parsing core remains C. | **HOLD** — seek mature pure-Rust decoder first |

## Category recommendations after Rust-first review

### Image

Preferred stack to benchmark:

1. `image-rs/image` as common typed raster layer with **only required format features enabled**.
2. `image-png` for PNG where direct control is useful.
3. `image-webp` for safe-Rust WebP decode/lossless encode.
4. `imageproc` only when an operation is not already covered efficiently by `image` or browser primitives.
5. `resvg` for SVG -> raster.

`pica` remains a strong JavaScript/browser candidate for very high-quality resize; Rust-first does not automatically replace it. We should benchmark `pica` against Rust/WASM resize for output quality, latency, WASM startup and bundle size.

### PDF

- Keep `pdf-lib` as the currently approved TypeScript structural PDF engine.
- Evaluate `lopdf` as the Rust alternative for parser-heavy/hybrid tasks.
- Do **not** promote `lopdf` merely because it is Rust: its whole-document-in-memory design makes resource caps mandatory.
- PDF rendering via PDF.js remains conditional on patched version, scripting disabled, CSP and worker isolation.

### Structured text

For any Worker/WASM tools where Rust is already justified:

- JSON: `serde_json`
- CSV: `csv`
- XML: `quick-xml`

For small client-only formatter tools, native/JS parsing may still be smaller. The Rust version is preferred when the parser is shared, runs on a hostile boundary, or a WASM worker already exists.

### Cryptographic hashes

- Browser standard hashes: prefer `crypto.subtle.digest()`.
- Additional algorithms/shared WASM: RustCrypto.
- Hash tools must clearly label broken/legacy algorithms (MD5/SHA-1) as compatibility-only, not secure choices.

### OCR

`ocrs` is technically attractive because it is Rust/WASM, but **no production integration until model redistribution terms are explicit**. Code license and model license are separate gates.

## Rust security-specific admission checks

Every Rust dependency added to Tools must record:

1. whether `unsafe` exists in the crate itself;
2. whether dependencies contain `unsafe`;
3. whether FFI/native code is pulled by default or optional features;
4. whether default features can/should be disabled;
5. WASM support and threading assumptions;
6. fuzzing/OSS-Fuzz/property-test evidence;
7. RUSTSEC/GitHub advisory findings at the exact pinned version;
8. malformed-input/resource-limit behavior;
9. exact license of **code, bundled assets, fonts, models and test fixtures separately**;
10. exact version/tag/commit selected at integration time.

## Sanitization contract (mandatory)

Every public user-input flow must implement the policy in `SECURITY_POLICY.md`. No tool may bypass it because the parser is written in Rust.

Minimum boundary sequence:

`validate -> bound -> sanitize/canonicalize -> process -> encode output`

Examples:

- image converter: cap bytes -> detect actual format -> read dimensions -> cap total pixels -> decode -> canonical typed pixels -> encode new file;
- SVG rasterizer: cap bytes -> parse with scripting/external resources disabled -> bound complexity/output dimensions -> rasterize with `resvg` -> emit PNG/WebP;
- JSON formatter: cap bytes/depth -> parse -> serialize from typed value -> render as escaped text;
- CSV formatter: cap bytes/rows/columns/field length -> parse records -> serialize safely -> escape output;
- PDF tool: cap bytes/pages/work -> parser in isolated worker/runtime -> active scripting/actions disabled -> perform structural operation -> encode result;
- URL input: parse -> protocol allowlist -> if server fetch is ever enabled, apply full SSRF policy and revalidate every redirect.

## Immediate next Rust audit targets

- mature pure-Rust QR/barcode **decoding** candidates;
- HEIF/HEIC decoding without unsafe native `libheif` FFI, if practical;
- file signature/type detection in pure Rust;
- YAML parser options and YAML bomb/alias behavior;
- date/time libraries only if native Temporal/Intl does not cover the tool;
- PDF compression/raster alternatives in Rust/WASM;
- archive handling (`zip`, tar) with zip-bomb/path-traversal controls;
- color-management libraries, especially whether avoiding LCMS2 FFI is realistic;
- Rust/WASM bundle-size and cold-start benchmark harness for candidate engines.
