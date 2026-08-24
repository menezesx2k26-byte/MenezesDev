# MenezesDev Tools — Security Policy

**Status:** mandatory architecture contract  
**Date:** 2026-08-24  
**Scope:** every public MenezesDev Tools route, client engine, WebAssembly module, Worker endpoint, parser, converter and third-party dependency.

## 1. Security invariants

The following are **hard gates**. A tool cannot ship if any applicable gate is missing.

1. **All user-controlled input is untrusted.** This includes text, files, filenames, MIME headers, metadata, URLs, query parameters, form values, JSON/XML/CSV fields, archive entries, image dimensions, PDF objects and output returned by third-party parsers.
2. **Every input must pass a boundary pipeline before business logic:**

   `validate -> bound -> sanitize/canonicalize -> process -> encode output`

3. **No parser receives unbounded input.** Every Tool SDK definition must declare byte, character, dimension, page, row/field, depth, time and/or work limits as applicable.
4. **No direct HTML rendering of untrusted data.** Use `textContent`, escaped templates or equivalent safe sinks by default. DOMPurify may be used only when rendering HTML is an explicit feature.
5. **No implicit trust in file extensions, MIME strings or filenames.** Detect/verify formats from bytes when format detection matters; mismatch is rejected or treated as unknown.
6. **No server-side fetch of arbitrary user URLs.** Any URL-fetching tool requires a dedicated SSRF threat model, protocol/host validation, redirect re-validation, DNS/IP checks and egress restrictions.
7. **No executable content is enabled by default.** PDF JavaScript, SVG scripting, active HTML, macros and equivalent active features remain disabled unless a specific tool requires them and receives a dedicated review.
8. **Resource exhaustion is a security issue.** Decompression bombs, giant dimensions, zip bombs, parser recursion, catastrophic regex, quadratic algorithms, huge page counts and intentionally pathological documents must be rejected or bounded.
9. **Errors exposed to users do not include secrets, stack traces, local paths or internal infrastructure details.**
10. **Telemetry never stores user file contents, pasted text, document contents, extracted metadata values or generated private outputs.**

## 2. Rust-first dependency policy

Rust is the preferred implementation language for security-sensitive parsers, codecs and compute-heavy engines **when an audited Rust option is mature enough**.

Selection order:

1. native browser platform API when it is secure, standards-based and sufficient;
2. mature pure-Rust implementation, preferably safe Rust and WASM-capable;
3. mature Rust implementation with narrowly audited `unsafe`/FFI;
4. mature non-Rust dependency with materially better correctness/maintenance than available Rust options;
5. custom implementation only when the operation is simple, deterministic and safer than adding a dependency.

Rust is **not** an approval signal by itself. A Rust project may still be rejected for weak fuzzing, poor maintenance, excessive `unsafe`, unsafe FFI, unclear model/data licensing, resource-exhaustion risk or insufficient malformed-input handling.

For Rust candidates, the OSS audit additionally records:

- `unsafe` usage and whether it is forbidden/minimized;
- FFI/native-code dependencies;
- WASM compatibility;
- fuzzing/property-test posture;
- RUSTSEC/advisory status where relevant;
- resource-limit APIs and parser complexity behavior;
- crate feature flags and whether defaults pull unnecessary native/unsafe code.

## 3. Sanitization / validation requirements by input class

### Plain text

- enforce UTF-8/Unicode handling explicitly;
- cap code points/bytes before expensive normalization;
- strip or reject forbidden control characters when the tool semantics do not require them;
- normalize only when semantically appropriate (do not silently change user data in diff/hash tools);
- render output through text-safe sinks.

### HTML / rich text

- HTML is never trusted because it originated from our parser or another library;
- escape by default;
- if HTML rendering is required, sanitize using an approved sanitizer with an explicit allowlist;
- never execute inline scripts, event handlers, `javascript:` URLs or equivalent active content.

### URLs

- parse with standards-based URL parsing;
- allowlist protocols;
- reject credentials unless explicitly required;
- never server-fetch arbitrary user URLs without the dedicated SSRF controls in section 1;
- redirects are revalidated at every hop.

### Images / binary media

- enforce input byte limits before decode;
- enforce decoded width, height and total pixel limits before allocation when the codec exposes headers first;
- protect against decompression bombs and malformed metadata;
- prefer decode-to-typed-buffer then re-encode for sanitizing conversion tools;
- extracted EXIF/XMP/ICC text remains untrusted output;
- filenames never determine the actual format.

### PDF

- cap bytes and page count;
- disable scripting/active actions;
- isolate rendering/parsing where possible;
- cap rasterization dimensions and total output pixels;
- reject encrypted/unsupported PDFs explicitly rather than attempting unsafe recovery;
- hostile-PDF regression fixtures are mandatory for every PDF engine used at Launch 50.

### Archives

- cap compressed bytes, entry count, per-entry size and aggregate decompressed size;
- reject path traversal (`../`, absolute paths, platform drive prefixes) before extraction;
- reject symlink/hardlink surprises unless explicitly supported;
- stop extraction when the decompression ratio/work budget is exceeded.

### JSON / XML / CSV / structured text

- cap bytes before parsing;
- cap nesting/depth and collection sizes where possible;
- cap CSV rows, columns and field sizes;
- external XML resources/entities are not fetched;
- never evaluate parsed expressions/code;
- prototype/object-key concerns must be handled when crossing into JavaScript objects.

### Regex

- users do not provide regex to server-side shared infrastructure unless the regex engine is linear-time or execution is strongly bounded;
- avoid backtracking engines for attacker-controlled expressions where ReDoS is possible.

## 4. Tool SDK mandatory security metadata

Every tool definition that accepts user input must declare an equivalent of:

```text
security:
  inputClass
  maxInputBytes
  maxOutputBytes (when applicable)
  maxWork / timeout
  acceptedFormats / protocols
  activeContent: disabled | required-reviewed
  sanitizationStrategy
  hostileInputTests
```

Additional limits (pixels, pages, rows, depth, archive entries, etc.) are mandatory when relevant.

A Tool SDK entry without applicable limits and sanitization strategy **fails CI** once the SDK enforcement exists.

## 5. Dependency admission gates

A dependency cannot move to `APPROVED` unless all applicable checks pass:

- commercial-use license and NOTICE obligations understood;
- current upstream/release reviewed;
- security advisories reviewed;
- maintenance/community health reviewed;
- Rust/unsafe/FFI posture reviewed where applicable;
- hostile-input behavior understood for parsers;
- bundle/runtime cost justified;
- exact version/tag is pin-able;
- integration plan includes input limits and sanitization strategy.

## 6. Testing requirements

Security-sensitive tools require malformed/hostile fixtures in addition to happy-path tests. At minimum, relevant suites cover:

- truncated files;
- intentionally malformed headers/lengths;
- maximum-boundary inputs;
- decompression/resource bombs where applicable;
- oversized image dimensions;
- deeply nested structured data;
- script-bearing PDF/SVG/HTML fixtures;
- archive path traversal;
- invalid encodings;
- parser outputs containing HTML/script-like text;
- cancellation/time-budget behavior.

Fuzzing is strongly preferred for Rust parsers/codecs we own or wrap. New custom Rust parsers should not ship without fuzz/property-test coverage.

## 7. Security-over-convenience rule

If two candidates provide comparable functionality and maintenance quality, prefer the one with the smaller attack surface, stronger malformed-input posture, less FFI/unsafe code and clearer resource controls — even if the other option is easier to integrate.
