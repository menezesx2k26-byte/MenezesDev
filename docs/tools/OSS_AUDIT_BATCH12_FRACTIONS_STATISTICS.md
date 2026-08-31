# MenezesDev Tools — OSS Audit Batch 12: Fractions + Statistics

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Status:** ACTIVE / candidate-specific local-path audit

---

# 1. Fraction Calculator

**Preferred execution:** browser/internal  
**Dependency:** none required  
**Server requests per operation:** 0  
**Decision:** **LOCAL-CLEAR / INTERNAL**

## Scope

Support bounded exact rational arithmetic for:

- addition;
- subtraction;
- multiplication;
- division;
- proper/improper fractions;
- mixed numbers;
- simplification;
- decimal equivalent as a derived display.

## Representation

Use integer numerator/denominator pairs, promoting to `BigInt` within declared digit limits when needed.

Normalize:

- denominator always positive;
- sign stored on numerator/result;
- denominator cannot be zero;
- reduce with Euclidean GCD after each operation or at safe defined boundaries.

Do not route exact fraction operations through floating-point arithmetic and then reconstruct the rational answer.

## Resource/security contract

- cap numerator/denominator digit lengths;
- cap mixed-number whole-part digits;
- reject zero denominator before arithmetic;
- cap intermediate BigInt digit growth;
- no arbitrary expression evaluation;
- render formulas/steps as structured escaped output;
- no user content telemetry.

## Correctness fixtures

At minimum:

- `1/2 + 1/3 = 5/6`;
- `3/4 - 1/8 = 5/8`;
- `2/3 × 9/4 = 3/2`;
- `5/6 ÷ 10/9 = 3/4`;
- negative fractions;
- mixed numbers;
- denominator sign normalization;
- zero numerator;
- zero denominator rejection;
- large bounded BigInt inputs;
- already simplified and reducible results.

No third-party generalized math engine is justified.

---

# 2. Standard Deviation Calculator

**Preferred execution:** browser/internal  
**Dependency:** none required for Launch scope  
**Server requests per operation:** 0  
**Decision:** **LOCAL-CLEAR / INTERNAL**

## Scope

Compute from a bounded numeric dataset:

- count;
- arithmetic mean;
- population variance;
- population standard deviation;
- sample variance;
- sample standard deviation;
- optional min/max/range and other non-controversial descriptive outputs.

The UI must make **population vs sample** explicit; they are not interchangeable because the denominator differs (`n` vs `n-1`).

## Numerical method

Avoid the naive one-pass `E[x²] - E[x]²` formula for general floating-point datasets because catastrophic cancellation can produce poor numerical behavior for large values with small variance.

Preferred implementation:

- Welford's online algorithm or an equivalently stable two-pass method;
- finite-number checks;
- explicit policy for decimal parsing and non-finite values;
- sample variance rejected/undefined when `n < 2`.

A later precision benchmark may justify `decimal.js` only if product requirements prove native double precision insufficient. No dependency is required for the current shortlist decision.

## Resource/security contract

- cap input characters;
- cap number of observations;
- reject NaN/Infinity and malformed tokens;
- cap absolute numeric magnitude to a documented practical range;
- optionally process a larger permitted dataset in a browser Worker, but ordinary sets need no Worker/backend;
- no pasted dataset values in telemetry;
- no server execution.

## Correctness fixtures

At minimum:

- known textbook population set;
- known sample set;
- identical values -> SD 0;
- negative values;
- decimal values;
- one observation: population allowed, sample undefined;
- empty input rejected;
- malformed/non-finite values rejected;
- large-offset/small-spread dataset to catch cancellation problems;
- max-boundary observation count.

---

# 3. Consolidated decision

| Capability | Path | Dependency | Backend/op | Decision |
|---|---|---|---:|---|
| Fraction Calculator | integer/BigInt rational arithmetic + GCD | none | 0 | **LOCAL-CLEAR / INTERNAL** |
| Standard Deviation Calculator | Welford/two-pass descriptive statistics | none | 0 | **LOCAL-CLEAR / INTERNAL** |

Both promoted candidates strengthen market quality without adding dependency, parser, WASM or backend risk.
