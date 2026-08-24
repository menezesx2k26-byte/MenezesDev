# MenezesDev Tools — OSS Audit Batch 8: Shortlist Browser Primitives

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Governing:** `IMMUTABLE_WORKFLOW.md`, `SECURITY_POLICY.md`  
**Scope:** market-strengthened developer/text candidates from Market Intelligence Batch 3.

---

# 1. Purpose

Phase 2 should spend effort only on candidates with a realistic chance of surviving market selection. Market Batch 3 materially strengthened URL Encoder, Text Diff and JSON Validator, so this batch confirms their concrete browser-local paths before the future Capability Map.

This is an audit artifact, **not Phase 3** and not implementation.

---

# 2. URL Encoder / Decoder

## Preferred path: native browser primitives

**Dependency:** none  
**Server requests per operation:** 0  
**Runtime:** browser main thread for bounded normal text  
**Decision:** **APPROVED — native browser implementation**

### Semantics must be explicit

“URL encoding” is ambiguous unless the UI tells the user what is being encoded.

The implementation should distinguish at least:

1. **URI component percent-encoding** — use `encodeURIComponent()` for a component/value;
2. **URI decoding** — use `decodeURIComponent()` for a component/value;
3. **query-string construction/parsing** — use `URLSearchParams` when form/query semantics are intended;
4. **full URL parsing** — use `URL` for structural validation/manipulation, not `encodeURIComponent(fullUrl)` as a generic substitute.

Do not claim RFC/form semantics that the chosen primitive does not implement. In particular, form/query serialization has conventions such as space-to-`+` that differ from raw `encodeURIComponent()` output.

### Security / robustness

- cap input bytes/chars before transformation;
- reject or surface malformed percent escapes safely; `decodeURIComponent()` may throw on malformed input;
- never interpret decoded output as HTML or JavaScript;
- render through text-safe sinks;
- never automatically navigate/fetch a decoded URL;
- never send input/output to telemetry;
- preserve Unicode intentionally and test astral/surrogate/combining cases;
- provide explicit copy output rather than injecting it into DOM attributes/URLs without a separate validation boundary.

### Testing fixtures

- ASCII reserved/unreserved characters;
- spaces and `+` distinction;
- `%20`, `%2F`, `%25`;
- UTF-8 multibyte characters;
- emoji/non-BMP;
- malformed `%`, `%2`, `%ZZ`;
- double-encoded strings;
- already encoded input;
- very long bounded input;
- query pairs with repeated keys.

### Cost result

This capability has no technical reason for a backend request. A server round trip would fail the browser-first economic gate.

---

# 3. JSON Validator

## Preferred path: native `JSON.parse()`

**Dependency:** none  
**Server requests per operation:** 0  
**Decision:** **APPROVED — reaffirm Batch 6 native path**

Market Batch 3 raises the business priority of this already-audited capability; it does not require a new parser.

Required profile remains:

- byte/character cap before parse;
- parse in disposable/local Worker above an implementation-defined threshold;
- cap post-parse depth/node/traversal work before tree/statistics features;
- no user-provided reviver;
- parsed keys remain untrusted data;
- never merge parsed objects into application configuration/state;
- errors are normalized to safe syntax feedback without stack/internal details;
- source text and validation result never leave the device;
- output rendered as text.

### Important product distinction

Syntax validation is not JSON Schema validation.

Launch copy must not say an object is “valid according to a schema” unless a separately designed/audited schema-validation feature exists. Native `JSON.parse()` proves syntax only.

### Cost result

Zero backend compute per validation.

---

# 4. Text Diff / Compare Text

## Preferred path: `jsdiff/diff` under strict limits

**Existing audit state:** BSD-3-Clause / previously APPROVED  
**Server requests per operation:** 0  
**Runtime:** browser; Worker for non-trivial input  
**Decision:** **APPROVED WITH BOUNDED WORK PROFILE**

Text comparison can become CPU/memory-expensive on pathological or very large inputs even when no parser vulnerability exists. Market priority therefore does not remove resource gates.

### Integration profile

- import only on the Text Diff route;
- cap bytes/chars independently for left/right inputs;
- cap line/token count where line/word modes exist;
- run non-trivial comparisons in a disposable Web Worker;
- main thread enforces wall-clock timeout and may terminate the Worker;
- cap number/size of diff hunks returned to UI;
- cancellation must release Worker/memory;
- never send compared text to server/telemetry;
- render inserts/deletes using text nodes / escaped spans, never user-controlled `innerHTML`;
- line/word/character mode must be explicit because they produce materially different results/cost.

### Pathological fixtures

- identical large text;
- completely different large text;
- repeated/near-repeated lines;
- one-character edits across many lines;
- Unicode normalization variants;
- CRLF/LF differences;
- empty left/right;
- extremely long single lines;
- HTML/script-like text as ordinary content;
- cancellation/timeout.

### Dependency posture

The existing BSD-3-Clause approval remains sufficient in principle, but the exact package version must still be pinned and advisory-checked at implementation time as required by the global dependency gate.

### Cost result

Zero backend requests. CPU cost is borne locally and bounded by Worker/time/input limits.

---

# 5. JSON Diff signal — do not over-generalize Text Diff

Market Batch 3 identified material demand for JSON-aware diff, but this batch deliberately does **not** declare JSON Diff a separate approved Launch candidate.

If later selected, a JSON-aware comparison must first define semantics:

- raw textual diff;
- canonicalized JSON textual diff;
- structural/object diff;
- array ordering semantics;
- key-order treatment;
- numeric/string equality behavior.

A generic text-diff engine cannot silently claim semantic JSON comparison.

Decision: **HOLD as separate capability until Phase 1/3 intent and semantics justify it.**

---

# 6. URL Decoder pairing / anti-thin gate

Market evidence strongly suggests users move between URL encode and decode operations. Technical implementation for both is trivial and approved.

However, technical separability does not decide URL architecture.

Phase 5 SEO/IA must later determine whether:

- Encoder and Decoder deserve distinct indexable routes because search intent is independent; or
- one stronger URL Encode/Decode utility should serve both operations.

No duplicate/thin route may be manufactured simply because two native functions exist.

---

# 7. Consolidated Batch 8 decisions

| Capability | Preferred path | Server requests/op | Decision |
|---|---|---:|---|
| URL component encode | `encodeURIComponent()` | 0 | **APPROVED** |
| URL component decode | `decodeURIComponent()` + safe error handling | 0 | **APPROVED** |
| query-string parse/build | `URLSearchParams` | 0 | **APPROVED** |
| JSON syntax validate | native `JSON.parse()` | 0 | **APPROVED** |
| Text Diff | `jsdiff` + Worker/limits | 0 | **APPROVED WITH BOUNDS** |
| JSON-aware semantic diff | semantics not frozen | 0 likely | **HOLD as separate capability** |

---

# 8. Phase-2 implication

The newly strengthened Market Batch 3 anchors do **not** create major new OSS gaps:

- URL Encoder/Decoder needs no dependency;
- JSON Validator needs no dependency;
- Text Diff reuses an already-approved permissive dependency with bounded local execution.

This is favorable for Launch economics: three increasingly attractive market candidates can remain fully browser-local with zero ordinary backend compute.

Phase 2 remains ACTIVE because the final >50 shortlist is not frozen and other likely shortlist candidates still have conditional engines/coverage gaps.
