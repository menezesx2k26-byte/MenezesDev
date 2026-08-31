# MenezesDev Tools — Candidate Universe Admission 2026-08-24 #2

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Historical Batch-1 universe:** 172  
**Previously admitted:** #173 Retirement Calculator, #174 Budget Calculator  
**Working universe after this decision:** **176 candidates**  
**Not Launch 50. Not Phase 3.**

---

# 1. Problem resolved

Earlier market research found unusually strong signals for:

- `binary converter` ~550K / ~$7.65 CPC;
- `hex converter` ~165K / ~$9.75 CPC;
- `binary translator` ~135K / ~$9.35 CPC.

They were held outside the candidate universe because the terms might represent overlapping or ambiguous products.

Current SERP/product review resolves the ambiguity sufficiently for Phase-1 admission.

---

# 2. Numeric base conversion is one product family

Current RapidTables-style results clearly distinguish numeric base conversion from text encoding.

Representative numeric converter behavior:

- binary ↔ decimal;
- binary ↔ hex;
- binary ↔ octal;
- decimal ↔ hex/octal/binary;
- general base conversion.

Current reference pages:

- https://www.rapidtables.com/convert/number/hex-dec-bin-converter.html
- https://www.rapidtables.com/convert/number/binary-to-decimal.html

The same ecosystem exposes many directional pages, but MenezesDev should **not** copy that URL explosion.

---

# 3. ADMITTED — Candidate #175: Number Base Converter

## Product semantics

One utility converts numeric values among numeral systems.

Launch-candidate UX should support at least:

- binary (base 2);
- octal (base 8);
- decimal (base 10);
- hexadecimal (base 16);
- optionally bases 2–36 when correctness/UI remain clear.

A single page can target real `binary converter`, `hex converter`, `base converter` and related numeric intent without creating separate doorway pages for every direction.

## Why not admit separate Binary Converter + Hex Converter pages

Because the actual operation is the same number-base engine and the user experience can be materially better as one bidirectional/multi-base utility.

Separate pages may only be revisited later if Search Console proves genuinely distinct intent that one strong page cannot serve.

## Market basis

Previously captured current signals:

- `binary converter`: ~550K / ~$7.65 CPC;
- `hex converter`: ~165K / ~$9.75 CPC.

These are unusually strong for a deterministic browser-only developer/math utility.

## Technical preview

Provisional execution: browser/internal integer/string conversion.

No backend request is required.

Use arbitrary-precision/string-safe logic instead of silently truncating values to JavaScript 32-bit bitwise semantics.

## Admission verdict

**ADMIT #175 — Number Base Converter.**

---

# 4. Text/binary translation is a separate intent

Current dedicated tools and SERP results explicitly distinguish:

> numeric binary value conversion

from:

> text encoded as bytes/binary and decoded back to text.

Examples:

- https://binarytrans.com/
- https://binary-translator.com/

Modern implementations commonly expose Text ↔ Binary and separately direct numeric users to Binary ↔ Decimal tools.

That is sufficient semantic separation to avoid treating the two products as duplicate doorway pages.

---

# 5. ADMITTED — Candidate #176: Binary Translator

## Product semantics

Binary Translator is a byte/text encoding utility:

```text
Unicode text
   ↓ UTF-8
bytes
   ↓
8-bit binary groups
```

and the reverse path.

It is **not** numeric base conversion and must clearly explain that distinction.

Example:

- text character `0` encodes as its UTF-8/ASCII byte representation;
- numeric zero converted to binary remains `0`.

## Market basis

Previously captured signal:

- `binary translator`: ~135K / ~$9.35 CPC.

Current SERP inspection shows multiple dedicated current products targeting exactly text/binary translation, validating independent intent.

## Technical preview

- `TextEncoder` for UTF-8 text → bytes;
- explicit binary-byte formatting;
- bounded parser for binary groups → bytes;
- `TextDecoder` with documented UTF-8 behavior;
- 0 backend requests.

## Admission verdict

**ADMIT #176 — Binary Translator.**

---

# 6. What remains NOT admitted

No separate new candidates are created for:

- Binary to Decimal;
- Decimal to Binary;
- Binary to Hex;
- Hex to Decimal;
- Hex to Binary;
- Octal to Decimal;
- Text to Binary;
- Binary to Text.

These are operations/modes inside #175 or #176 unless later first-party evidence proves a genuinely superior independent product/URL.

This is an explicit anti-thin-content decision.

---

# 7. Universe accounting

```text
Initial Batch-1 candidates       172
#173 Retirement Calculator         1
#174 Budget Calculator             1
#175 Number Base Converter         1
#176 Binary Translator             1
------------------------------------
Current admitted universe        176
```

The initial 172 remains the historical Batch-1 count.

---

# 8. Shortlist effect

#175 and #176 are strong enough to challenge low-value R2 rows.

They do not automatically expand the 80-row shortlist. The next replacement pass should make weaker candidates surrender slots.

---

# 9. Workflow state

- Phase 1 remains ACTIVE.
- Phase 2 remains ACTIVE.
- Phase 3 remains NOT STARTED.
- Launch 50 remains NOT FROZEN.
