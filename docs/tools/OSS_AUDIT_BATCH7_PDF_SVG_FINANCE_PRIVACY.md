# MenezesDev Tools — OSS Audit Batch 7: PDF, SVG, Finance & Privacy

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS capability audit  
**Governing documents:** `docs/tools/IMMUTABLE_WORKFLOW.md`, `docs/tools/SECURITY_POLICY.md`.

This batch includes a material correction to an earlier OSS recommendation. The correction is additive: earlier audit history remains intact, while this document records the newer evidence and current authoritative dependency decision for Phase 2.

---

# 1. PDF structural engine — status correction

## `Hopding/pdf-lib` 1.17.1

**License:** MIT  
**Published line:** 1.17.1; no upstream npm release for roughly five years  
**Decision:** **HOLD FOR PUBLIC UNTRUSTED PDF INPUT**

Earlier audit status `APPROVED` is superseded by this later evidence for hostile public uploads.

Reasons:

1. The official package remains at `1.17.1` and has not received a new npm release for years.
2. The community explicitly reports that the original repository is effectively on hold and directs maintenance to forks.
3. A 2026 issue documents unbounded `DecodeStream.ensureBuffer()` growth allowing a compressed PDF stream to exhaust browser/process memory.
4. The original repository has no SECURITY.md and no published repository advisories.
5. Current issues still document correctness bugs in form/widget handling.

The library remains useful as reference/API lineage and could still be acceptable for PDFs generated entirely by our own code, but it must not be the default parser for attacker-controlled uploads.

References:
- https://www.npmjs.com/package/pdf-lib
- https://github.com/Hopding/pdf-lib/issues/1720
- https://github.com/Hopding/pdf-lib/issues/1777
- https://github.com/Hopding/pdf-lib/security

## `@cantoo/pdf-lib` 2.9.1

**License:** MIT  
**Maintenance:** active community fork, current 2026 releases  
**Decision:** **HOLD FOR PUBLIC UNTRUSTED PDF INPUT**

The active fork fixes multiple upstream problems and is clearly better maintained than Hopding's package. However, direct source inspection on 2026-08-24 shows `src/core/streams/DecodeStream.ts` still grows the decode buffer by powers of two with no explicit maximum decoded size.

Therefore recent maintenance alone does not close the decompression-bomb class.

Reference source inspected:
- `cantoo-scribe/pdf-lib/src/core/streams/DecodeStream.ts`

## `@pdfme/pdf-lib` 6.1.12

**License:** MIT  
**Current audited line:** 6.1.12, published July 2026  
**Maintenance:** active `pdfme/pdfme` monorepo  
**Decision:** **CONDITIONAL — preferred structural PDF engine candidate**

Critical positive finding:

- GHSA-vrqm-gvq7-rrwh identified the inherited unbounded decompression buffer in `@pdfme/pdf-lib <=5.5.9`;
- fixed in `5.5.10`;
- direct inspection of current source confirms `MAX_DECODED_SIZE = 100 * 1024 * 1024` and `DecompressionBombError` checks before buffer expansion;
- current 6.1.12 is after the fix and has no direct vulnerability listed in the audited vulnerability database snapshot.

This is materially stronger evidence than the older Hopding/Cantoo paths.

Required MenezesDev profile:

- pin `@pdfme/pdf-lib >=6.1.12` or newer separately audited stable version;
- execute public PDF parsing/manipulation inside a browser Web Worker;
- pre-cap compressed input bytes/pages before heavy work where possible;
- keep the library's decoded-stream limit, but do **not** treat 100 MB as our whole-document budget;
- add a stricter MenezesDev operation/output/work budget around each tool;
- cancellation/timeout from main thread;
- hostile fixtures including FlateDecode bombs, nested filters, malformed xref/object streams, giant page counts and corrupt PDFs;
- reject/handle active document features conservatively;
- do not import the full pdfme UI/schema stack merely to get the PDF library.

Important distinction:

The 2026 XSS advisory for `@pdfme/schemas <=5.5.9` is a different package/UI surface. It does not justify importing `@pdfme/ui` or schemas into MenezesDev Tools. Our candidate is the isolated `@pdfme/pdf-lib` structural package only.

References:
- https://github.com/advisories/GHSA-vrqm-gvq7-rrwh
- https://security.snyk.io/package/npm/%40pdfme%2Fpdf-lib
- current `pdfme/pdfme/packages/pdf-lib/src/core/streams/DecodeStream.ts`

---

# 2. PDF Launch 50 operation coverage

The preferred objective is to keep PDF tools **100% client-side**.

Using the maintained pdf-lib lineage, the following operation classes are plausible without server compute:

| Tool capability | Local structural path | Current decision |
|---|---|---|
| Merge PDFs | copy pages into new document | **CANDIDATE — local** |
| Split PDF by page/range | copy selected pages into new documents | **CANDIDATE — local** |
| Extract pages | copy selected pages | **CANDIDATE — local** |
| Remove pages | remove/copy remaining pages | **CANDIDATE — local** |
| Reorder pages | construct new document in selected page order | **CANDIDATE — local** |
| Rotate pages | page rotation APIs | **CANDIDATE — local** |
| Add page numbers/text | draw text | **CANDIDATE — local** |
| Add image/watermark | draw/embed PNG/JPEG/PDF page | **CANDIDATE — local** |
| Read standard metadata | document metadata getters | **CANDIDATE — local** |
| Edit standard metadata | document metadata setters | **CANDIDATE — local** |
| Fill/flatten forms | form APIs | **CONDITIONAL** — regression-test current fork behavior |
| Compress PDF | no safe generic magic compression promise | **DO NOT promise yet** |
| Extract arbitrary page text | not a core pdf-lib capability | **OUT via this engine** |
| Edit/remove existing ordinary page text | not supported generically | **OUT via this engine** |
| Render PDF page to image | use patched PDF.js path, not structural pdf-lib | **CONDITIONAL** |
| Decrypt arbitrary encrypted PDFs | engine-specific/current behavior must be separately audited | **DO NOT include until tested** |

Merge caveat:

- page copying does not automatically guarantee preservation/merging of every document-level structure such as bookmarks/outlines; tool copy must state what is preserved and regression-test links/forms/outlines/attachments rather than promising perfect semantic merge.

Security rule:

A PDF tool does not become “safe” merely because it runs in a browser Worker. The Worker prevents UI blocking from becoming permanent and is killable, but parser-level memory limits and operation budgets remain required.

---

# 3. SVG optimization

## `svg/svgo` 4.0.1

**License:** MIT  
**Community:** ~22.5k stars / ~1.4k forks  
**Browser support:** official `svgo/browser` export  
**Decision:** **CONDITIONAL — preferred SVG optimizer candidate**

Security history:

- CVE-2026-29074 / GHSA-xpqw-6gx7-v673: entity-expansion/Billion Laughs DoS affected `4.0.0`; patched in `4.0.1`;
- 4.0.1 also raises the minimum SAX parser to a line with improved entity-expansion guards.

Required MenezesDev public-input profile:

1. pin `>=4.0.1` or newer separately audited release;
2. pre-cap SVG input bytes;
3. reject `<!DOCTYPE` entirely before SVGO for our web-tool use case;
4. run optimization in a browser Web Worker with a wall-clock timeout;
5. configure a fixed allowlisted plugin set owned by MenezesDev — no user-provided executable/custom plugins;
6. do not fetch config files or external resources;
7. optimized SVG remains **untrusted active content**;
8. never inject optimized SVG directly into application DOM merely because SVGO processed it;
9. preview through safe rasterization (`resvg`) or separately sanitized/sandboxed rendering;
10. cap path/node complexity and output bytes.

Important distinction:

**Optimization is not sanitization.** An SVG optimizer is allowed to preserve semantically meaningful content that is unsafe to execute in our origin. The downloadable optimized file and the site's preview path therefore have separate trust models.

References:
- https://svgo.dev/docs/usage/browser/
- https://github.com/advisories/GHSA-xpqw-6gx7-v673
- https://github.com/svg/svgo/releases/tag/v4.0.1

`resvg` remains the preferred audited SVG -> raster preview/conversion engine from the earlier Rust audit.

---

# 4. Financial calculators

## Internal formulas + `decimal.js` where precision warrants it

**Server requests per operation:** 0  
**Decision:** **APPROVED architecture**

The majority of finance/calculator tools do not require external data if the user provides the relevant rates/inputs.

Examples that can remain fully local:

- percentage / percentage change;
- discount;
- margin and markup;
- simple interest;
- compound interest;
- savings growth;
- loan payment;
- amortization schedule;
- ROI;
- break-even arithmetic;
- VAT/tax calculator when the rate is supplied or the tool uses a clearly static jurisdiction-specific rate snapshot with date disclosure;
- mortgage payment when the user supplies principal/rate/term;
- CAGR;
- future/present value for deterministic inputs.

### `decimal.js`

**License:** MIT  
**Community:** ~7k+ stars; mature project; low current issue volume  
**Decision:** **APPROVED, lazy and scoped**

Use Decimal when:

- money/interest compounding needs deterministic decimal rounding;
- repeated arithmetic would expose meaningful IEEE-754 artifacts;
- user-selected rounding/precision matters.

Do not load Decimal globally for trivial integer or single-step percentage tools where normal Number arithmetic plus explicit output rounding is sufficient and tested.

Hard rules for financial tools:

- formulas and rounding behavior documented;
- no hidden live-rate fetch;
- distinguish nominal/effective/APR concepts instead of relabeling them;
- no financial-advice claims;
- invalid/negative/impossible parameter ranges rejected according to tool semantics;
- cap amortization row counts/term lengths so user input cannot create huge DOM/output work;
- calculation remains local and telemetry records no financial values.

### Live data separation

The following are **not** zero-backend deterministic calculators unless the user provides the data:

- current currency FX;
- stock/ETF prices;
- cryptocurrency prices;
- current benchmark interest rates;
- live inflation/CPI;
- live tax/regulatory rates that must be authoritative at request time.

Such tools require a separate data-source/cost/cache audit and are not allowed to silently call paid APIs under the ordinary calculator runtime.

---

# 5. Image metadata/privacy utilities

## Pixel re-encode for raster metadata removal

**Preferred path:** browser-native image decode -> canonical pixel surface -> new encode  
**Server requests per operation:** 0  
**Decision:** **APPROVED architecture with format-specific verification**

For a “remove image metadata” tool, the safest generic design is not to surgically mutate arbitrary EXIF/XMP structures. Instead:

1. validate/sniff supported raster format;
2. cap bytes/dimensions/pixels;
3. decode into an `ImageBitmap`/pixel surface;
4. draw into Canvas/OffscreenCanvas;
5. encode a brand-new PNG/JPEG/WebP output in a format the browser actually supports;
6. verify with fixture tests that target EXIF/XMP/GPS/comment metadata is absent from the emitted result.

Advantages:

- strips the original container metadata by reconstructing from pixels rather than trusting/rewriting hostile metadata trees;
- remains entirely local;
- naturally avoids preserving hidden GPS/EXIF fields.

Caveats:

- re-encoding can change image quality/color behavior;
- ICC/color-profile handling must be tested before claiming every metadata class is removed;
- format-specific output support is feature-detected;
- the UI must say which metadata classes/formats are verified rather than claiming magical universal sanitization.

ExifReader may be used **after** output generation in tests/verification, but its extracted strings remain untrusted.

## PDF metadata removal

**Decision:** **CONDITIONAL and narrowly named**

A tool based on pdf-lib lineage may clear standard document metadata fields. It must **not** be marketed as “sanitize PDF” or “remove all hidden data” unless we also inspect XMP, attachments, scripts/actions, embedded files, annotations and other document-level structures with dedicated verification.

Safer Launch 50 name/claim if selected: “Edit PDF metadata” or “Clear standard PDF metadata”, not “PDF sanitizer”.

---

# 6. Dependency-free text/privacy utilities

The following utility classes require no server and generally no third-party dependency:

- word/character/line count;
- case conversion;
- whitespace cleanup;
- duplicate-line removal;
- sort lines;
- reverse text/lines;
- Base64 encode/decode with `TextEncoder`/byte-safe helpers;
- URL encode/decode with standards-based URL APIs / `encodeURIComponent`/`decodeURIComponent` as appropriate;
- query-string parser/builder with `URLSearchParams`;
- UUIDv4 via `crypto.randomUUID()`;
- secure random bytes/tokens via `crypto.getRandomValues()`;
- hash tools via Web Crypto for supported SHA families;
- text diff via already-approved `jsdiff` when richer diffing is needed;
- JSON formatter/validator/minifier via native JSON;
- Unicode normalization tools via `String.prototype.normalize()` with explicit semantics.

Security notes:

- user text remains local;
- length/work caps still apply to sort/diff/quadratic transforms;
- Unicode normalization must be opt-in/semantically explicit for tools where byte identity matters;
- Base64 is encoding, not encryption, and the UI must not imply security/privacy protection from Base64 itself.

---

# Batch 7 consolidated decisions

| Capability | Preferred path | Decision |
|---|---|---|
| public structural PDF | `@pdfme/pdf-lib >=6.1.12` isolated package | **CONDITIONAL — preferred** |
| Hopding pdf-lib 1.17.1 hostile uploads | old/unbounded decode path | **HOLD** |
| Cantoo pdf-lib hostile uploads | current but unbounded decode path | **HOLD** |
| PDF merge/split/extract/reorder/rotate | structural local PDF engine | **CANDIDATE local tools** |
| generic PDF compression | no safe default proven | **HOLD capability** |
| arbitrary PDF text extraction/edit | not covered by structural engine | **OUT from this path** |
| SVG optimization | SVGO >=4.0.1 + DOCTYPE reject + Worker | **CONDITIONAL** |
| SVG preview/raster | resvg | **APPROVED from prior audit** |
| deterministic finance calculators | internal formulas | **APPROVED** |
| precision finance math | lazy decimal.js | **APPROVED** |
| live FX/market data | separate data/cost audit | **NOT ordinary zero-backend** |
| raster metadata removal | decode pixels -> re-encode | **APPROVED architecture** |
| PDF metadata | standard fields only unless deeper audit | **CONDITIONAL** |
| common text utilities | browser-native primitives | **APPROVED** |

---

# Phase 2 impact

This batch substantially increases the number of Launch 50 candidate capabilities that can be executed with **zero MenezesDev backend requests**.

It also prevents a false sense of safety around PDF parsing: maintenance freshness and browser execution are not enough; the exact decompression path was inspected and compared between forks.

# Remaining high-value Phase 2 audit work

- final capability coverage inventory across all audited batches;
- image-quality/performance benchmark plan (native Canvas vs pica/current safe codecs);
- exact PDF hostile fixture and output-preservation test matrix;
- calculator formula/test corpus matrix;
- text/Unicode edge-case policy including word counting/segmentation;
- decide whether any plausible Launch 50 tool still truly requires Cloudflare Worker/backend compute;
- only after coverage is complete, satisfy Phase 2 exit gate and begin Phase 3 Capability Map.
