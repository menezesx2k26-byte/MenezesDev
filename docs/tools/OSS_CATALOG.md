# MenezesDev Tools — Audited OSS Catalog

**Status:** initial audited shortlist  
**Date:** 2026-08-24  
**Scope:** candidate open-source libraries/engines for the MenezesDev Tools platform.  
**Rule:** inclusion here does **not** mean installed. Only `APPROVED` items may be integrated without a new license decision; `CONDITIONAL` items require the listed constraints to be satisfied first.

## Audit gates

Each candidate is evaluated on:

1. **Commercial-use license compatibility** — MIT, Apache-2.0, BSD-2/3-Clause, ISC are preferred. Dual or copyleft licenses require explicit review.
2. **Maintenance health** — recent commits/releases, non-archived repository, issue activity, release cadence.
3. **Community signal** — GitHub stars/forks/issues, adoption signals and maintainer/community feedback. Popularity is evidence, not a substitute for technical review.
4. **Security posture** — security policy/advisories, known CVEs, unsafe defaults, parser attack surface.
5. **Browser/runtime fit** — Astro static-first, client/hybrid/worker execution, ESM support, bundle isolation.
6. **Performance/bundle cost** — dependency weight must be proportional to the tool(s) it enables.
7. **Scope leverage** — preference for engines that safely unlock multiple tools.

## Status legend

- **APPROVED** — permissive license and acceptable current technical/security posture for selective integration.
- **CONDITIONAL** — potentially useful, but integration must honor specific license/security/runtime constraints.
- **HOLD** — not rejected permanently, but current maintenance/security/complexity signals make it a poor default.
- **REJECT** — incompatible license, unacceptable risk, abandoned upstream, or no clear commercial-use permission.

---

## Initial shortlist

| Candidate | Category | License | Community / maintenance signal | Security / technical notes | Decision |
|---|---|---|---|---|---|
| `nodeca/pica` | Image resize | MIT | ~4.1k stars; established browser-focused project; active security policy | Browser-first; WebWorker/WASM support; good fit for isolated client bundle | **APPROVED** |
| `Donaldcwl/browser-image-compression` | Image compression | MIT | ~1.7k stars / ~187 forks; active issue tracker | Good high-level browser API; depends on `uzip`; must benchmark against native codecs/pica and inspect transitive package before install | **APPROVED, benchmark first** |
| `mattiasw/ExifReader` | Image metadata | MPL-2.0 | Long-lived project; active since 2012; release 4.44.0 on 2026-08-21; very recent hardening work | Treat metadata as untrusted; never inject returned values as HTML; prefer bytes/File rather than user-controlled URL strings; MPL obligations must be preserved | **CONDITIONAL** |
| `Hopding/pdf-lib` | PDF create/edit/merge/page ops | MIT | Large established project and broad ecosystem adoption | Works in browser/Node/Deno; does not decrypt encrypted PDFs; strong candidate for merge/split/reorder/stamp/metadata | **APPROVED** |
| `mozilla/pdf.js` / `pdfjs-dist` | PDF rendering/parsing | Apache-2.0 | Mozilla-maintained, extremely mature | **HIGH advisory CVE-2026-16633** affected `pdfjs-dist >=5.6.83`; patched in `6.2.108`. If used: pin `>=6.2.108`, set `enableScripting=false`, enforce CSP, isolate rendering worker | **CONDITIONAL — security pin required** |
| `MikeMcl/decimal.js` | Calculators / finance / precision | MIT | ~7.2k stars; mature, no runtime dependencies; used by math.js | Excellent for deterministic decimal arithmetic where IEEE-754 surprises matter | **APPROVED** |
| `josdejong/mathjs` | Math / matrices / units | Apache-2.0 plus bundled CSparse LGPL-2.1+ component | ~15.1k stars / ~1.3k forks; extensive tests and active project | Powerful but large; expression parser and sparse-matrix subcomponent expand audit surface. Prefer tree-shaken imports; review LGPL component usage/distribution before enabling sparse-matrix features | **CONDITIONAL** |
| `validatorjs/validator.js` | Text/dev validators | MIT | Mature, widely used, security policy present | Import per-validator for tree shaking. Do not expose user-controlled regex directly where ReDoS could be introduced | **APPROVED** |
| `kpdecker/jsdiff` (`diff`) | Text diff | BSD-3-Clause | ~9.2k stars / ~535 forks; low current issue count | Focused implementation of Myers-style diff; suitable for local text comparison | **APPROVED** |
| `uuidjs/uuid` | Developer tools | MIT | ~15k stars; active in 2026 | Standards-oriented, but for a simple UUID generator prefer native `crypto.randomUUID()` when supported; library only if multi-version UUID support is needed | **APPROVED, YAGNI check** |
| `beautifier/js-beautify` | JS/CSS/HTML formatting | MIT | ~9k stars, but maintainers explicitly state limited time and need contributors; hundreds of open issues | Popular and capable, but maintenance warning is material. Compare against Prettier standalone / smaller parsers before selecting | **HOLD** |
| `cure53/DOMPurify` | Security/sanitization | Apache-2.0 OR MPL-2.0 | ~17k stars, security-focused project, active releases and OpenSSF practices | Prefer Apache-2.0 election for distribution records. Use only where HTML rendering is actually required; escaping/textContent remains simpler and safer for most tools | **APPROVED** |
| `101arrowz/fflate` | ZIP/deflate | MIT | Mature lightweight compression library | Useful for client-side batch downloads/ZIP; isolate to tools that need archives | **APPROVED** |

---

## Approved capability map

### Image

- High-quality resize: **pica**
- Browser compression convenience layer: **browser-image-compression** (after benchmark/transitive review)
- Metadata reading: **ExifReader** (conditional MPL/security handling)

### PDF

- Structural create/edit/merge/split/page operations: **pdf-lib**
- Rendering / page rasterization: **PDF.js** only with `pdfjs-dist >= 6.2.108`, scripting disabled and CSP

### Calculators / Math

- Precise decimal calculations: **decimal.js**
- Advanced matrices/units/symbolic features: **mathjs** only when a specific tool needs it; avoid loading it globally

### Text / Developer

- Validators: **validator.js**
- Text diff: **jsdiff / diff**
- UUID: prefer native `crypto.randomUUID()` for UUIDv4; use **uuid** only for broader version support
- Beautification: **js-beautify remains HOLD** pending comparison

### Security / shared utilities

- Sanitization of intentionally rendered untrusted HTML: **DOMPurify**
- ZIP/deflate: **fflate**

---

## Integration rules

1. **No vendoring by default.** Prefer pinned package dependencies. Vendor only when there is a concrete offline/WASM/build reason.
2. **No global bundle contamination.** Heavy engines are dynamically imported only on routes/tools that require them.
3. **Record exact version and upstream commit/tag** when a dependency is integrated.
4. **Preserve license/NOTICE obligations** in `THIRD_PARTY_NOTICES.md` and generated distributions where required.
5. **Security-sensitive parsers receive hostile-input tests** before Launch 50.
6. **Every parser runs with explicit input-size limits** from the Tool SDK.
7. **No direct HTML rendering of parser output.** Use text nodes/escaping by default; DOMPurify is a fallback for intentional HTML rendering.
8. **No remote-file fetching from user-controlled strings** unless the tool is explicitly designed for URLs and protected against SSRF/open redirects/CORS abuse.
9. **Native browser APIs beat dependencies** when they provide the same function reliably (for example `crypto.randomUUID()`).
10. **Popularity does not override a HOLD.** Maintenance and security gates remain mandatory.

---

## Security findings to carry into the implementation spec

### PDF.js

- CVE-2026-16633 / GHSA-hq66-cqwq-w95j was published 2026-07-28 with HIGH severity.
- Affected: `pdfjs-dist >= 5.6.83`.
- Patched: `6.2.108`.
- Required MenezesDev posture if adopted: pin patched or newer version, set `enableScripting=false`, strict CSP, worker isolation and malicious-PDF regression fixtures.

### ExifReader

- Upstream documentation explicitly warns that metadata text is attacker-controlled.
- Never use `innerHTML` with extracted metadata.
- Avoid passing user-controlled strings to `ExifReader.load()`; use `File`/`ArrayBuffer` for local uploads.
- Recent 2026 releases include memory/complexity bounds and prototype/XMP hardening; keep version current and include hostile-file fixtures.

### mathjs

- Apache-2.0 main project contains a CSparse port under LGPL-2.1+.
- Before using sparse-matrix code in production, document whether that component is included in the shipped bundle and preserve corresponding notices/obligations.
- Do not expose unrestricted expression evaluation as a server-side execution surface.

---

## Next audit batch

Before any package installation, audit candidates for:

- HEIC/HEIF/AVIF browser conversion
- SVG optimization
- PDF compression / qpdf WASM
- OCR
- QR/barcode generation and reading
- color conversion
- date/time parsing
- CSV/XML/YAML formatting
- cryptographic hash utilities (prefer Web Crypto where possible)
- file-type detection
- unit conversion datasets

For each, record: upstream, license, version, maintenance signal, community signal, known advisories, bundle/runtime cost, tools unlocked and final status.
