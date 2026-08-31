# MenezesDev Tools — OSS Audit Batch 6: Zero-backend Data & Developer Tools

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS capability audit  
**Governing documents:** `docs/tools/IMMUTABLE_WORKFLOW.md`, `docs/tools/SECURITY_POLICY.md`.

The default in this batch is deliberately boring: use mature browser primitives for deterministic transforms and add dependencies only when they materially improve correctness or capability.

---

# 1. JSON

## Native `JSON.parse()` / `JSON.stringify()`

**Server requests per operation:** 0  
**Dependency:** none  
**Decision:** **APPROVED — default JSON formatter/validator/minifier engine**

Suitable Launch 50 capabilities:

- JSON formatter / beautifier;
- JSON minifier;
- JSON syntax validator;
- JSON key/count/statistics utilities;
- JSON -> text/tree inspection where no schema evaluation is required.

Security profile:

- byte/character cap before parse;
- parse in a Worker above the small-input threshold;
- depth/node-count budget after parse before recursive traversal;
- no reviver supplied from user input;
- never execute values as JavaScript;
- render output as text, not HTML;
- protect against prototype-sensitive object operations by treating parsed keys such as `__proto__`, `constructor`, and `prototype` as ordinary data rather than merging parsed objects into application configuration/state.

No third-party JSON parser is justified for ordinary Launch 50 formatting.

---

# 2. CSV

## `PapaParse` 5.6.0

**License:** MIT  
**Current npm line audited:** 5.6.0 (published August 2026)  
**Community:** large adoption; ~1.2k forks; millions of weekly npm downloads  
**Runtime:** browser, local file parsing, Worker option, streaming/chunking  
**Server requests per operation:** 0 when local-file/string APIs are used  
**Decision:** **CONDITIONAL — preferred browser CSV engine for non-trivial CSV**

Positive findings:

- purpose-built in-browser parser;
- no runtime dependencies;
- supports chunking, pause/resume/abort and Worker parsing;
- historical ReDoS was fixed in 5.2.0;
- active 2026 package/repository work.

Current cautions:

- open July 2026 issue reports multiple streaming edge cases around chunk-boundary UTF-8, line ending inference, resume and backpressure;
- open 2025 issue reports `escapeFormula` may not protect every spreadsheet execution scenario;
- Worker production behavior must be verified against the exact Vite/Astro build because a 2026 issue reports malformed results with `worker: true` in Vite 8 production builds.

MenezesDev profile:

- pin 5.6.0 or newer separately audited version;
- never use Papa's remote-download feature for user-controlled URLs;
- local `File`/string only for Launch 50;
- byte/row/column/field-length caps;
- stop/abort when limits are crossed;
- for spreadsheet-targeted CSV export, implement our own explicit formula-injection policy rather than trusting a single library flag;
- large files use Worker/chunking only after production-build regression tests.

For tiny simple CSV inputs, an internal RFC-4180-capable parser should **not** be casually written from scratch; CSV quoting/newline edge cases are deceptively complex.

References:
- https://github.com/mholt/PapaParse
- https://www.npmjs.com/package/papaparse
- https://github.com/mholt/PapaParse/issues

---

# 3. XML

## Native `DOMParser` + `XMLSerializer`

**Server requests per operation:** 0  
**Dependency:** none  
**Decision:** **APPROVED — preferred XML formatter/validator path under restrictive wrapper**

Rationale:

- widely available browser APIs;
- parsed XML lives in a separate document;
- malformed XML yields parser error state;
- enough for local validation/tree formatting without introducing a third-party XML parser.

Mandatory public-input wrapper:

1. cap bytes/characters before parse;
2. reject any `<!DOCTYPE` declaration for Launch 50 XML tools;
3. reject/avoid processing instructions or constructs outside the tool's documented scope when unnecessary;
4. call `DOMParser.parseFromString(input, 'application/xml')` only after the preflight;
5. detect `<parsererror>` and return a safe textual error;
6. enforce maximum depth/node/text-size after parse before recursive formatting;
7. never move user-created XML/SVG/HTML nodes into the visible application DOM;
8. never follow URLs/resources found inside parsed XML;
9. serialize into text and render through text-safe sinks.

This wrapper intentionally avoids the high-risk entity/DOCTYPE surface rather than attempting to support every XML feature.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
- https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer/serializeToString

## `fast-xml-parser`

**Decision:** **HOLD FOR PUBLIC UNTRUSTED XML**

Reason: although actively maintained and with fixes available, 2026 produced a dense sequence of XML security advisories including:

- RangeError DoS from numeric entities;
- DOCTYPE entity-expansion DoS;
- critical entity-name regex injection / entity-encoding bypass;
- numeric entity expansion bypassing expansion limits;
- stack overflow in builder paths;
- XML comment/CDATA injection;
- repeated DOCTYPE declarations resetting expansion limits (HIGH, patched 5.10.1).

For the limited formatter/validator behavior we need, using this larger attack surface is not justified over a DOCTYPE-rejecting native browser wrapper.

References:
- https://github.com/NaturalIntelligence/fast-xml-parser/security
- https://github.com/advisories/GHSA-8r6m-32jq-jx6q
- https://github.com/advisories/GHSA-m7jm-9gc2-mpf2

## `saxes`

**License:** ISC  
**State:** repository archived 2025-12-31  
**Decision:** **REJECT for new integration**

The package is massively depended upon historically, but archived parser code is not our default for a new hostile-input surface.

Reference:
- https://github.com/lddubeau/saxes

`quick-xml` remains an approved Rust option from earlier auditing if a future WASM/shared-Rust path genuinely needs streaming XML behavior beyond the browser-native formatter scope.

---

# 4. Unit converters

## Internal deterministic conversion tables/formulas

**Server requests per operation:** 0  
**Dependency:** none  
**Decision:** **APPROVED — default for Launch 50 physical-unit converters**

Use internal typed definitions for stable deterministic families such as:

- length;
- mass;
- area;
- volume;
- temperature;
- speed;
- pressure;
- energy;
- power;
- digital storage where unit definitions are explicit.

Rules:

- base every conversion family on one canonical base unit;
- constants/formulas are covered by reference fixtures;
- clearly distinguish decimal SI units from binary IEC units (e.g. MB vs MiB);
- temperature uses affine transformations rather than a multiplicative factor abstraction;
- no network calls;
- no generalized expression evaluator required.

## `convert-units`

**License:** MIT  
**Community:** ~850 stars / ~310 forks; substantial npm use  
**Decision:** **HOLD / REFERENCE ONLY**

It is a useful source of design ideas and test cases, but the long-running stable package line is old and general physical conversion is simple enough to own safely with typed tables. Pulling a dependency for basic factors does not improve our cost/security profile.

If a future category requires obscure, domain-specific units at scale, re-audit the current maintained beta/stable line rather than copying constants blindly.

Reference:
- https://github.com/convert-units/convert-units

### Currency is explicitly different

Live currency conversion is **not** a deterministic unit conversion. It requires current market data and therefore either an external API/request or a user-provided rate. Do not silently classify a live FX converter as zero-backend.

---

# 5. Regex tester

## Native JavaScript `RegExp` inside a disposable Web Worker

**Server requests per operation:** 0  
**Dependency:** none  
**Decision:** **APPROVED — preferred JS-regex tester architecture**

A regex tester exists specifically to execute user-controlled regular expressions. Running an arbitrary pattern on the main thread would violate the resource-exhaustion hard gate because catastrophic backtracking can freeze the UI.

Required design:

- regex engine runs only in a disposable browser Web Worker;
- cap pattern length;
- cap test-input length;
- cap match/result count;
- enforce hard wall-clock timeout from the main thread;
- `worker.terminate()` on timeout/cancel;
- do not automatically retry a timed-out expression;
- label timeout as possible catastrophic backtracking;
- results are text-only;
- never pass regex/source to a server.

This preserves true JavaScript `RegExp` semantics, including lookarounds/backreferences, while containing CPU abuse to a killable local worker.

## `google/re2-wasm` 1.0.2

**License:** Apache-2.0  
**Property:** RE2 provides linear-time/safe regex behavior but does not implement all JavaScript regex features (notably backreferences and lookahead)  
**Package age:** npm release about five years old  
**Decision:** **HOLD AS DEFAULT / potential optional safe-mode engine**

RE2's algorithmic guarantees are attractive, but a JS regex tester that silently changes language semantics would be misleading. It may later become a separate “safe regex / RE2” mode, not the default JavaScript engine.

References:
- https://github.com/google/re2-wasm
- https://www.npmjs.com/package/re2-wasm

---

# 6. JS/CSS/HTML/JSON formatting

## `prettier` standalone

**License:** MIT  
**Community:** ~51.9k stars; extremely broad adoption; active 2026 development  
**Runtime:** standalone browser build, no Node runtime required  
**Decision:** **APPROVED CONDITIONAL — preferred mature formatter when its grammar is needed**

This is the leading replacement candidate for the earlier `js-beautify` HOLD.

Required integration profile:

- import `prettier/standalone` lazily only on formatter routes;
- import only the parser/plugin needed by the selected tool;
- do not include all language plugins globally;
- run non-trivial/untrusted formatting in a Web Worker with byte and wall-clock limits;
- output is displayed as escaped text, never executed/rendered as application HTML/JS;
- no config-file loading, plugin URLs or user-provided executable plugin loading;
- pin an exact stable audited version at implementation time.

Prettier's own browser documentation confirms the standalone build does not depend on Node and requires explicit plugins, which is useful for bundle isolation.

References:
- https://prettier.io/docs/browser
- https://github.com/prettier/prettier

### Split recommendation

- JSON formatter: native JSON first, no Prettier.
- Markdown preview: markdown-it + DOMPurify, no Prettier.
- JS/TS formatter: Prettier standalone + Babel/Estree plugin set as required.
- CSS formatter: Prettier standalone + PostCSS plugin only on that route.
- HTML formatter: Prettier standalone + HTML parser plugin only on that route.

This avoids turning one formatter feature into a global multi-megabyte dependency.

---

# 7. Password, token and random generators

## `crypto.getRandomValues()` / `crypto.randomUUID()`

**Server requests per operation:** 0  
**Dependency:** none  
**Decision:** **APPROVED — mandatory entropy source for random/security-oriented generators**

Suitable capabilities:

- password generator;
- random token generator;
- UUIDv4 generator (`crypto.randomUUID()`);
- random bytes/hex/base64 generator;
- dice/random-choice tools when unbiased sampling is implemented correctly.

Hard rules:

- never use `Math.random()` for passwords, tokens, IDs presented as secure, salts or secrets;
- avoid modulo bias when mapping random bytes to arbitrary alphabets/ranges; use rejection sampling where necessary;
- do not log generated secrets;
- do not send generated values to telemetry/server;
- generated secrets remain ephemeral unless the user explicitly copies/downloads them;
- `randomUUID()` is the default UUIDv4 path; the `uuid` package remains unnecessary for v4-only functionality.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
- https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID

---

# Batch 6 consolidated decisions

| Capability | Preferred path | Decision |
|---|---|---|
| JSON format/minify/validate | native JSON | **APPROVED** |
| CSV non-trivial parsing | PapaParse local/Worker | **CONDITIONAL** |
| XML format/validate | DOMParser + XMLSerializer + reject DOCTYPE | **APPROVED** |
| fast-xml-parser | current risk density not justified | **HOLD** |
| saxes | archived | **REJECT** |
| ordinary unit conversion | internal typed constants/formulas | **APPROVED** |
| convert-units | reference only | **HOLD dependency** |
| JS regex tester | native RegExp in disposable Worker + timeout | **APPROVED** |
| RE2 WASM | optional future safe-mode, semantic subset | **HOLD default** |
| JS/CSS/HTML formatter | lazy Prettier standalone plugins | **APPROVED CONDITIONAL** |
| password/token generation | Web Crypto | **APPROVED** |
| UUIDv4 | crypto.randomUUID | **APPROVED** |

---

# Cost result

Every default path in this batch is designed to execute with **zero per-operation backend requests**. PapaParse, Prettier, and Worker references mean browser-local JavaScript/Web Workers, not Cloudflare Worker compute.

The only explicitly non-zero-backend-like capability discussed here is **live currency conversion**, because authoritative current FX rates inherently require fresh external data. It should be evaluated later as a separate cost/data capability rather than disguised as a static unit converter.

# Next Phase 2 work

- audit financial/calculator dependency needs (`decimal.js` versus internal formulas) and isolate live-data calculators;
- build a PDF operation coverage matrix around `pdf-lib` so we know precisely which PDF tool ideas stay 100% local;
- audit image metadata removal and privacy-preserving re-encode paths;
- audit SVG optimizer (`svgo`) under untrusted-input constraints versus `resvg` raster-only path;
- audit text utility categories that need no dependencies (case, word count, slug, Base64, URL encode/decode, checksums);
- begin compiling Phase 2 capability coverage table, but do not start Phase 3 until the Phase 2 gate is actually satisfied.
