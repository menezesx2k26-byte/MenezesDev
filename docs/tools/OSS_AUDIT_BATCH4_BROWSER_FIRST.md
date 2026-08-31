# MenezesDev Tools — OSS Audit Batch 4: Browser-first / Cost-first

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS capability audit  
**Governing documents:** `docs/tools/IMMUTABLE_WORKFLOW.md`, `docs/tools/SECURITY_POLICY.md`.

This batch prioritizes the project invariant that **safe local execution is preferable to backend compute**. Rust is evaluated when useful, but language is secondary to attack surface, maintenance, commercial-use licensing, browser fit, bundle cost and malformed-input behavior.

## Decision legend

- **APPROVED** — acceptable candidate for selective integration after exact-version pin and normal integration tests.
- **CONDITIONAL** — usable only under the listed constraints.
- **HOLD** — do not integrate for Launch 50 unless a new audit resolves the issue.
- **REJECT** — unsuitable for the intended public-input path.

---

## 1. Native compression streams

### `CompressionStream` / `DecompressionStream`

**Type:** browser platform API  
**Server requests per operation:** 0  
**Decision:** **APPROVED — first choice for supported stream formats**

Findings:

- Widely available across modern browsers since 2023 for the core API.
- Works in Web Workers.
- Avoids a JavaScript/WASM compression dependency for gzip/deflate use cases.
- Advanced format support must still be feature-detected; the Tool SDK must never assume every algorithm exists merely because the API exists.
- Decompression is still attacker-controlled work: output byte/work limits remain mandatory.

Policy:

1. Use native Compression Streams when the required format is supported.
2. Enforce maximum input/output/work budgets while streaming.
3. Use an audited archive library only when a ZIP container, entries, encryption, Zip64 or other container-level functionality is actually required.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream
- https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream

---

## 2. ZIP / archive tooling

### `gildas-lormeau/zip.js` (`@zip.js/zip.js`)

**License:** BSD-3-Clause  
**Current audited release:** 2.8.34  
**Community signal:** ~3.9k stars, ~500+ forks, thousands of commits; actively released in July 2026  
**Runtime:** browser-native streams / Web Workers / optional WASM  
**Server requests per operation:** 0  
**Decision:** **APPROVED — preferred general-purpose ZIP candidate**

Why it is currently preferred for a full ZIP tool:

- designed specifically for browser usage and large data;
- streaming read/write avoids requiring the whole archive/output in one giant in-memory buffer;
- supports native Compression Streams, Web Workers, Zip64, split archives and other real ZIP behavior;
- current upstream is active and had no open issues in the audited repository snapshot.

Security constraints:

- the library is an archive engine, not a security boundary;
- preflight compressed byte limit;
- cap entry count;
- cap per-entry uncompressed bytes;
- cap aggregate uncompressed bytes;
- cap compression ratio/work;
- reject absolute paths, drive prefixes and `../` traversal before exposing/extracting entries;
- reject or explicitly ignore symlink/hardlink semantics unless a tool specifically supports them;
- process large archives incrementally and support cancellation.

Sources:
- https://github.com/gildas-lormeau/zip.js
- https://github.com/gildas-lormeau/zip.js/releases

### `101arrowz/fflate`

**License:** MIT  
**Current audited release:** 0.8.3  
**Community signal:** ~2.9k stars; active 2026 release/PR activity  
**Runtime:** pure JavaScript, browser + Worker  
**Decision:**

- **APPROVED** for ZIP creation and focused gzip/deflate fallback where native Compression Streams are insufficient;
- **CONDITIONAL** for extraction of arbitrary public user ZIPs.

New finding that narrows the earlier approval:

- upstream discussion around intentionally strange ZIPs shows that the project does not promise rejection/sanitization of every malformed archive shape, and path traversal semantics are considered outside the decompressor's core responsibility;
- the repo currently has no SECURITY.md/security policy;
- several 2026 PRs continue to harden unusual ZIP handling.

Therefore, for hostile archive extraction, `fflate` may only be used behind our own archive entry/path/bomb policy. `zip.js` is preferred when a full archive reader is needed.

Sources:
- https://github.com/101arrowz/fflate
- https://github.com/101arrowz/fflate/discussions/245

---

## 3. File signature / MIME detection

### `sindresorhus/file-type`

**License:** MIT  
**Current audited release:** 22.0.1  
**Runtime:** ESM; Uint8Array/ArrayBuffer/Web Streams; usable in browser tooling  
**Decision:** **CONDITIONAL**

Positive signals:

- mature, broad format support;
- active security maintenance;
- current release series includes multiple parser-hardening changes.

Material security history in March 2026:

- infinite loop in malformed ASF parser fixed in 21.3.1;
- ZIP decompression bomb during known-size ZIP probing fixed in 21.3.2;
- recursive BOM/ID3 detection bounded in 21.3.2;
- additional parser hardening landed in 21.3.3/21.3.4.

Policy:

- if selected, pin **22.0.1 or newer audited release**;
- for a tool that accepts only 2–5 known formats, prefer a tiny explicit magic-byte allowlist rather than loading a broad detector;
- use `File.slice()` / bounded byte prefixes when sufficient;
- never treat detected MIME as proof that deeper parsing is safe;
- format detection precedes the real parser but does not replace parser limits.

Sources:
- https://github.com/sindresorhus/file-type/releases
- https://github.com/sindresorhus/file-type/security

---

## 4. YAML

### `eemeli/yaml`

**License:** ISC  
**Stable audited line:** 2.8.4  
**Runtime:** JavaScript, modern browsers, no external runtime dependencies  
**Decision:** **CONDITIONAL — preferred browser-first YAML candidate under restricted mode**

Positive signals:

- full YAML 1.1/1.2 support;
- passes the YAML test suite;
- runs directly in modern browsers;
- built-in alias expansion protection via `maxAliasCount`.

Security findings:

- CVE-2026-33532 / GHSA-48c2-rrv3-qjmp: deeply nested YAML could cause stack overflow; fixed in 2.8.3;
- 2.8.4 added support for disabling alias resolution with `maxAliasCount: 0`;
- current 2026 issue tracker still contains open edge cases around merge aliases and circular merges bypassing/straining alias protections.

Required MenezesDev mode for public formatter/converter input:

- exact stable version `>=2.8.4` after advisory review;
- `maxAliasCount: 0` for Launch 50 unless a tool has an explicit reason to preserve aliases;
- no merge-key expansion for untrusted input;
- byte cap before parse;
- explicit structural/depth/work budget in our wrapper;
- no custom executable tags/types;
- serialize from parsed data/AST, never evaluate YAML content;
- v3 prerelease is not a default production dependency until stable.

Sources:
- https://github.com/eemeli/yaml
- https://github.com/eemeli/yaml/security/advisories/GHSA-48c2-rrv3-qjmp
- https://github.com/eemeli/yaml/issues

### `saphyr-rs/saphyr`

**License:** permissive license set inherited from the `yaml-rust` lineage; required notices must be carried  
**Runtime:** Rust; WASM is possible but adds a compilation/runtime layer  
**Community:** ~300 stars; YAML test-suite compliance; latest listed release in the audited snapshot is 2025-06  
**Decision:** **CONDITIONAL / secondary candidate**

Saphyr is technically attractive and correctness-oriented, but browser-first economics means we should not ship a WASM YAML parser merely because it is Rust when a mature browser-native JS parser can be constrained safely. Reconsider Saphyr if YAML parsing becomes part of an already-loaded shared Rust/WASM engine or if future hostile-input testing demonstrates a material safety/performance advantage.

Source:
- https://github.com/saphyr-rs/saphyr

---

## 5. HEIC / HEIF

### `hoppergee/heic-to` 1.5.2

**License:** LGPL-3.0  
**Runtime:** browser / WASM-derived libheif path  
**Bundled decoder:** libheif 1.22.2  
**Decision:** **HOLD — do not integrate current release**

Reason:

- the current package explicitly uses libheif 1.22.2;
- libheif advisory GHSA-jvmp-j3cw-84mh marks versions `>=1.19.0 <=1.22.2` vulnerable to unbounded heap allocation from crafted HEIF sequences; patched in 1.23.0;
- additional 2026 high-severity libheif fixes required 1.23.1;
- therefore this wrapper currently violates the hostile-input/resource gate even though processing would be local in the browser.

Re-evaluation requirements:

- wrapper must move to an audited libheif version newer than all relevant fixes;
- LGPL distribution obligations documented;
- WASM isolated in a Worker;
- strict input bytes/dimensions/pixels/work caps;
- hostile HEIC corpus and cancellation/OOM tests.

Sources:
- https://github.com/hoppergee/heic-to
- https://github.com/strukturag/libheif/security/advisories/GHSA-jvmp-j3cw-84mh
- https://github.com/strukturag/libheif/security/advisories/GHSA-xpw3-9rhw-482x

### `alexcorvi/heic2any`

**License:** MIT wrapper  
**Current package line:** 0.0.4  
**Decision:** **HOLD**

The wrapper itself is permissively licensed and browser-only, but it is old enough that the embedded/transitive HEIF decoder provenance and security level must be treated as unknown until reconstructed. Do not choose it merely because the top-level package is MIT.

Source:
- https://github.com/alexcorvi/heic2any

### Native Safari HEIC path

A small native-canvas approach exists for Safari/iOS where WebKit can decode HEIC without shipping a multi-megabyte WASM decoder. This is attractive as a **feature-detected optimization**, but it does not provide universal browser support, so it cannot be the sole engine of a general HEIC converter.

Candidate reference:
- https://github.com/crisp-oss/canvas-heic-to-jpeg

---

## 6. PDF compression / qpdf WASM

### `neslinesli93/qpdf-wasm`

**Top-level wrapper license:** ISC  
**Current wrapper:** 0.3.0  
**Bundled qpdf:** 12.2.0  
**Community:** ~37 stars, small wrapper project  
**Decision:** **HOLD for public hostile-PDF paths**

Findings:

- browser execution works through Emscripten virtual filesystem and avoids a backend request;
- the build is pinned to qpdf 12.2.0;
- upstream qpdf has since reached 12.4.0;
- current 2026 upstream issue reports include crafted-PDF memory exhaustion / stack-overflow / 100% CPU paths, including issues reported against 12.4.0;
- therefore upgrading the wrapper alone is not yet sufficient evidence of a safe public parser boundary.

Policy:

- keep `pdf-lib` as the preferred structural browser PDF engine for operations it can perform;
- do not add qpdf WASM merely to claim PDF compression;
- revisit only when the exact qpdf command surface we need can be isolated, bounded and regression-tested against hostile PDFs, and the relevant upstream DoS issues are resolved or proven unreachable by our invocation path.

Sources:
- https://github.com/neslinesli93/qpdf-wasm
- https://github.com/qpdf/qpdf/releases
- https://github.com/qpdf/qpdf/issues/1739
- https://github.com/qpdf/qpdf/issues/1750

---

## 7. Date / time

### Native `Date` + `Intl`

**Decision:** **APPROVED default for simple date/time tools**

For date differences, formatting, locale presentation and simple deterministic calculators, prefer browser-native `Date`/`Intl` where correctness requirements can be met without a large date library.

### Native `Temporal`

**Decision:** **APPROVED with feature detection, but not sufficient alone for Launch 50 compatibility**

As of the audit date, Temporal ships in current Chrome/Edge and Firefox, but Safari/iOS Safari still blocks Baseline availability. Do not assume global Temporal exists.

Source:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal

### `fullcalendar/temporal-polyfill`

**License:** MIT  
**Current line:** 1.0.x  
**Size signal:** under ~20 kB min+gzip for core polyfill according to project documentation  
**Decision:** **APPROVED — lazy fallback for tools that genuinely need Temporal semantics**

Use pattern:

1. use native Temporal when present;
2. lazy-load only the required tree-shakeable polyfill functions when absent;
3. do not load the polyfill globally across unrelated tools;
4. simple `Date`/`Intl` tools should not import it.

Source:
- https://github.com/fullcalendar/temporal-polyfill

### `@js-temporal/polyfill`

**License:** ISC  
**Audited version:** 0.5.1  
**Decision:** **HOLD as default / valid alternate**

It is standards-oriented and legitimate, but the newer `temporal-polyfill` candidate is materially smaller and explicitly optimized for selective/tree-shakeable browser use. Reconsider if conformance or edge behavior later favors the official-champions implementation.

Source:
- https://github.com/js-temporal/temporal-polyfill

---

## 8. Color conversion

### `color-js/color.js` (`colorjs.io`)

**License:** MIT  
**Current audited release:** 0.7.1  
**Community:** ~2.3k stars; project reports >240M npm downloads; actively released July 2026  
**Decision:** **APPROVED for advanced color tools; YAGNI for trivial HEX/RGB/HSL conversions**

Strengths:

- maintained by contributors involved in CSS Color specifications;
- supports modern spaces including OKLCH, Lab/LCH, Display-P3, Rec.2020 and color-difference functions;
- modules can be imported selectively.

Policy:

- trivial conversion formulas may stay internal if smaller and easy to test;
- use Color.js when advanced gamut/color-space correctness would otherwise be reimplemented poorly;
- dynamically import only for color tools.

Source:
- https://github.com/color-js/color.js

---

# Batch 4 consolidated decisions

| Capability | Preferred path | Decision |
|---|---|---|
| gzip/deflate stream | native Compression Streams | **APPROVED** |
| ZIP create/read | `zip.js` | **APPROVED** with archive security wrapper |
| tiny/focused deflate fallback | `fflate` | **APPROVED** |
| arbitrary public ZIP extraction with `fflate` | `fflate` + strict wrapper | **CONDITIONAL** |
| broad file-type detection | `file-type >=22.0.1` | **CONDITIONAL** |
| limited accepted file types | internal magic-byte allowlist | **PREFERRED** |
| YAML browser parser | `yaml >=2.8.4`, aliases disabled | **CONDITIONAL** |
| YAML Rust/WASM | `saphyr` | **SECONDARY / CONDITIONAL** |
| HEIC general conversion | current `heic-to` | **HOLD** |
| HEIC legacy `heic2any` | current package | **HOLD** |
| PDF qpdf WASM | current wrapper/upstream state | **HOLD** |
| simple date/time | native Date + Intl | **APPROVED** |
| advanced date/time | native Temporal + lazy `temporal-polyfill` fallback | **APPROVED** |
| advanced color conversion | Color.js | **APPROVED** |

---

# Security/economic conclusions

1. **Local does not mean safe.** A browser/WASM parser can still freeze a tab, allocate gigabytes or expose memory; hostile-input limits remain mandatory.
2. **Native APIs win when adequate.** Compression Streams and basic Date/Intl eliminate dependencies and backend requests.
3. **A permissive wrapper license does not sanitize transitive code.** HEIC demonstrated that a convenient browser wrapper can still ship a vulnerable C/C++ decoder or impose LGPL obligations.
4. **Do not chase a feature just because an OSS port exists.** qpdf WASM currently offers local execution but fails the risk/maintenance gate for public hostile PDFs.
5. **Prefer narrow parsers/detectors.** A tool that accepts PNG/JPEG/WebP should sniff only those signatures rather than loading a broad file-identification engine.
6. **Archive extraction is a security subsystem, not a helper call.** Entry names, decompression ratio, count, output bytes and cancellation must be controlled outside the library.
7. **No server fallback is introduced by this batch.** Every approved path above is browser/native/Worker/WASM-local.

# Next audit targets

- browser-side AVIF/JPEG/WebP encode/decode quality and codec feature matrix;
- safe Markdown parsing/rendering path for text tools;
- CSV/JSON/XML browser-first path versus existing Rust candidates;
- QR/barcode decoding benchmark (`rxing` WASM versus mature JS alternatives);
- Web Crypto + encoding/hash tool capability matrix;
- PDF page rasterization/canvas path with patched PDF.js and strict scripting/CSP controls;
- bundle/cold-start measurements for the approved local engines.
