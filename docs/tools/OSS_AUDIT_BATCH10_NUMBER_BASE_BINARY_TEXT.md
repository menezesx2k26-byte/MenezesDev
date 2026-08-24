# MenezesDev Tools — OSS Audit Batch 10: Number Base + Binary Text

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Candidates:** #175 Number Base Converter, #176 Binary Translator

---

# 1. Executive result

Both newly admitted candidates are **browser-native/internal** and require:

- no third-party dependency;
- no backend request per operation;
- no WASM;
- no paid data source.

They are therefore unusually attractive replacements for weaker shortlist rows.

---

# 2. Candidate #175 — Number Base Converter

## Preferred implementation

Internal deterministic parser/formatter.

Recommended scope:

- accepted bases: 2–36 where UX supports it;
- primary visible modes: binary, octal, decimal, hexadecimal;
- arbitrary precision through `BigInt` and/or string algorithms;
- no JavaScript bitwise coercion for general input because bitwise operators silently coerce to 32-bit integers;
- explicit sign handling;
- clear rejection of malformed digits for the selected base.

## Input boundary

Validation should enforce:

- maximum character count;
- optional leading sign only where supported;
- digit alphabet constrained to selected base;
- no exponent notation unless deliberately implemented;
- no decimal/fractional values in baseline unless a separately tested rational/base-fraction mode is designed;
- deterministic output-length cap.

## Security

Attack surface is tiny:

- plain text/numeric input only;
- no parser dependency;
- no dynamic code execution;
- no network;
- no HTML output.

Very large inputs still require a length/work budget because arbitrary-precision conversion can become expensive.

## Decision

**INTERNAL / LOCAL-CLEAR.**  
**Backend requests/op:** 0.

---

# 3. Candidate #176 — Binary Translator

## Preferred implementation

Use Web Platform Encoding APIs:

- `TextEncoder` for UTF-8 text → bytes;
- internal byte → 8-bit binary formatting;
- bounded binary token parser;
- `TextDecoder` for bytes → UTF-8 text.

No package is justified.

## Semantics

The tool must clearly distinguish byte/text encoding from numeric base conversion.

Text mode:

```text
"A"
→ UTF-8 byte 65
→ 01000001
```

Numeric mode belongs in Number Base Converter, not here.

## Input/security rules

- byte/character caps;
- accept only `0`/`1` plus documented separators in binary input;
- enforce valid byte grouping or explicitly document supported ungrouped parsing behavior;
- reject impossible/incomplete byte sequences rather than guessing;
- expose invalid UTF-8 behavior clearly if decoding uses fatal mode;
- output rendered as text-safe data;
- no user text in telemetry.

## Decision

**NATIVE / LOCAL-CLEAR.**  
**Backend requests/op:** 0.

---

# 4. Anti-thin engine policy

One shared internal primitive may power multiple UI modes without creating separate SEO routes.

Canonical split:

1. **Number Base Converter** — numeric numeral systems;
2. **Binary Translator** — UTF-8 text/bytes/binary.

Do not create separate implementations/routes for every conversion direction by default.

---

# 5. Economic result

| Candidate | Runtime | Dependency | Backend requests/op | Tech state |
|---|---|---|---:|---|
| Number Base Converter | browser | none | 0 | LOCAL-CLEAR |
| Binary Translator | browser | none | 0 | LOCAL-CLEAR |

The admitted-universe expansion to 176 introduces **zero new technical debt classes**.

---

# 6. Phase-2 implication

If #175/#176 displace weaker shortlist candidates, Phase-2 risk decreases or remains flat because they replace candidates with equal or larger technical uncertainty while requiring only browser-native/internal primitives.

Phase 2 remains ACTIVE; Phase 3 remains NOT STARTED.
