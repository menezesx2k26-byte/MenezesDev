# MenezesDev Tools — OSS Audit Batch 11: Decimal/Fraction + Random Number

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Governing documents:** `IMMUTABLE_WORKFLOW.md`, binding addenda, `SECURITY_POLICY.md`

This audit follows Batch 8 market promotion/admission pressure. Both capabilities are intentionally evaluated for the smallest safe browser-first path.

---

# 1. Decimal to Fraction

## Preferred execution

**Browser / internal implementation**  
**Dependency:** none required  
**Server requests per operation:** 0  
**Decision:** **LOCAL-CLEAR / INTERNAL**

## Product scope

Support, at minimum:

- terminating decimal -> reduced fraction;
- negative values;
- optional mixed-number representation;
- exact rational reduction for user-entered decimal strings;
- repeating-decimal mode only when the UI explicitly asks which trailing group repeats.

## Correctness rule

Do **not** convert ordinary decimal text to IEEE-754 `Number` first and then guess a fraction from the binary floating-point approximation.

Preferred terminating-decimal algorithm:

1. parse a bounded decimal string;
2. preserve sign separately;
3. split integer/fractional digits;
4. construct integer numerator from decimal digits;
5. denominator = `10^fractionDigitCount`;
6. reduce with Euclidean GCD;
7. normalize sign and optional mixed-number output.

Use `BigInt` for numerator/denominator where the accepted digit bound can exceed safe integer precision.

This produces exact decimal-text semantics rather than `0.1` binary floating-point artifacts.

## Repeating decimal mode

Repeating decimals require explicit user semantics. Example input might represent `0.1(6)` or a separate field declaring the repeating trailing group.

For a non-repeating prefix `A` and repeating group `R`, derive the exact rational algebraically using powers of ten represented as integers/BigInt.

Do not infer repeating structure automatically from a finite typed value.

## Input/security bounds

- ASCII/locale-normalized decimal syntax only after explicit locale handling;
- cap total input characters/digits;
- reject exponent notation unless the tool intentionally supports it and the parser path is specified;
- cap repeating-group length;
- reject malformed multiple decimal separators/signs;
- bound output digit length;
- no HTML interpretation;
- render steps/results as escaped text/structured math UI.

## Tests

Mandatory fixtures include:

- `0.5 -> 1/2`;
- `1.625 -> 13/8 -> 1 5/8`;
- `-0.125 -> -1/8`;
- `0 -> 0/1` or normalized `0`;
- leading/trailing zeros;
- very large bounded decimal strings through BigInt;
- repeating `0.(3) -> 1/3`;
- repeating `0.(6) -> 2/3`;
- malformed/rejected syntax;
- max-boundary input.

## Conclusion

No decimal arithmetic dependency is justified for this tool. Exact string-to-rational math is smaller and safer than adding a generalized math package.

---

# 2. Random Number Generator

## Preferred execution

**Browser-native Web Crypto + internal selection logic**  
**Entropy:** `crypto.getRandomValues()`  
**Dependency:** none  
**Server requests per operation:** 0  
**Decision:** **LOCAL-CLEAR / APPROVED INTERNAL PATH**

## Why Web Crypto

The product should not use `Math.random()` when we can obtain unbiased high-quality local randomness from the platform with no network cost.

This does **not** mean the UI should market every output as cryptographic material. The tool is a general random-number utility; Web Crypto is simply the strongest available default entropy source.

## Bounded integer generation

Naive `randomByte % range` introduces modulo bias unless the range divides the source interval exactly.

Required approach:

1. choose 32-bit or 64-bit random words appropriate to the configured range;
2. calculate an acceptance ceiling that is an exact multiple of the target range;
3. discard random words above/equal to that ceiling;
4. map accepted values into the requested range;
5. repeat until requested quantity is generated or the explicit work cap is reached.

For very large integer ranges, use a BigInt-capable rejection-sampling implementation with a bounded bit/byte budget.

## Unique picks / no repeats

Do not repeatedly sample until unique for a requested quantity near the full range; that becomes inefficient.

Use a bounded strategy such as:

- partial Fisher-Yates when the finite range is small enough to materialize;
- Floyd's algorithm / sampled-set approach where appropriate;
- explicit rejection of impossible requests (`quantity > range size`).

Selection algorithm must be chosen based on declared range/quantity limits.

## Security/privacy bounds

- no generated values in telemetry;
- no generated values sent to server;
- cap quantity of generated numbers;
- cap integer magnitude/digit length;
- cap number of sets;
- use cancellation/yielding if a large but permitted generation could block the main thread;
- do not expose a seed field unless a separate deterministic PRNG mode is designed and clearly labelled as not cryptographic.

## Tests

Deterministic tests should inject a test entropy adapter rather than try to assert real randomness.

Test:

- inclusive min/max semantics;
- negative ranges;
- min == max;
- invalid min > max;
- repeats allowed;
- unique picks;
- quantity edge cases;
- sorting after generation;
- rejection-sampling branch behavior with deterministic mocked entropy;
- impossible unique requests;
- max-boundary sizes;
- no calls to `Math.random()` in the secure/default path.

Statistical smoke tests may supplement correctness tests but must not be used as proof of cryptographic quality.

## Conclusion

Random Number Generator adds **no dependency, no WASM and no backend cost**. The existing Web Crypto approval from earlier audits already supplies the correct entropy primitive; this batch narrows the product-specific unbiased-range algorithm and test expectations.

---

# 3. Consolidated decision

| Capability | Path | Dependency | Backend/op | Decision |
|---|---|---|---:|---|
| Decimal to Fraction | decimal-string -> BigInt rational + GCD | none | 0 | **LOCAL-CLEAR / INTERNAL** |
| Random Number Generator | Web Crypto + rejection sampling | none | 0 | **LOCAL-CLEAR / INTERNAL** |

Neither capability introduces a new supply-chain or parser dependency. Both are better economic fits than weak shortlist rows that require similar or greater editorial/maintenance effort.
