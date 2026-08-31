# MenezesDev Tools — OSS Audit Batch 9: Admitted Finance Candidates

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Candidates:** #173 Retirement Calculator, #174 Budget Calculator  
**Governing docs:** immutable workflow + Security Policy

---

# 1. Purpose

Market Batch 7 explicitly admitted two new candidates to the working universe because their current economics were materially stronger than several low-value original candidates.

This audit checks whether admitting them would create a new dependency/backend/cost problem.

Result: **both fit the browser-first thesis cleanly.**

---

# 2. Retirement Calculator

## Preferred execution

**Browser-only deterministic engine.**

No third-party library is required for the baseline calculation model.

Potential inputs:

- current age;
- retirement age;
- current retirement savings;
- periodic contribution;
- assumed annual return;
- optional contribution growth;
- optional inflation assumption only when clearly defined.

Potential deterministic outputs:

- projected future balance;
- total contributions;
- estimated investment growth under the stated assumption;
- gap to a user-provided target;
- contribution required to reach a user-provided target, where mathematically solvable.

## Dependency decision

**Internal formulas preferred.**

`decimal.js` remains available only if numeric precision/rounding requirements justify it across the finance engine; do not add a retirement-specific package.

## Backend requests per operation

**0**.

No live market return, inflation or retirement-rule API is required for the baseline tool.

## Security/privacy profile

Input values are private financial planning inputs.

Rules:

- no user-entered values in telemetry;
- no persistent account/storage requirement;
- bounds on age/years/contribution/return fields;
- finite-number checks;
- prevent exponent/overflow pathological inputs;
- deterministic examples used for regression tests.

## YMYL/content boundary

The engine may compute arithmetic from user-selected assumptions.

The UI/editorial layer must not claim:

- guaranteed future returns;
- personalized investment advice;
- a universally correct retirement age or savings target;
- legal/tax retirement eligibility without a separately current jurisdictional data source.

Safe framing:

> projection based on assumptions entered by the user.

## Decision

**LOCAL-CLEAR / INTERNAL.**

Candidate #173 introduces no backend cost and no new dependency requirement.

---

# 3. Budget Calculator

## Preferred execution

**Browser-only deterministic state + arithmetic.**

Baseline inputs:

- one or more income rows;
- expense rows/categories;
- frequency normalization where supported;
- optional user-defined categories.

Outputs:

- total income;
- total expenses;
- surplus/deficit;
- category shares;
- simple period-normalized summaries.

## Dependency decision

No finance/math dependency required.

Use internal typed arithmetic and browser UI state.

If CSV export/import is added later, it must use the separately audited CSV path and does not become a requirement for the core candidate.

## Backend requests per operation

**0**.

No bank/account integration is required or desired for the initial candidate.

## Security/privacy profile

Budget values can reveal sensitive personal finances.

Mandatory rules:

- values remain local by default;
- do not emit amounts/categories into product telemetry;
- no hidden autosave to server;
- no account requirement;
- bounded row/category count to prevent UI/resource abuse;
- user-entered category names rendered through text-safe sinks.

Optional local persistence, if ever added, must be explicit and limited to non-sensitive preferences or an explicitly user-enabled local draft; it is not part of Launch necessity.

## Editorial boundary

If the UI shows a budgeting heuristic such as a percentage allocation, label it as an editable example/guideline rather than authoritative personal financial advice.

The core calculator does not need any such heuristic to function.

## Decision

**LOCAL-CLEAR / INTERNAL.**

Candidate #174 introduces no backend cost and no new dependency requirement.

---

# 4. Economic result

| Candidate | Dependency | Backend requests/op | Tech status |
|---|---|---:|---|
| Retirement Calculator | internal formulas | 0 | LOCAL-CLEAR |
| Budget Calculator | internal arithmetic/state | 0 | LOCAL-CLEAR |

Both candidates can challenge weaker shortlist rows without harming the project's cost architecture.

---

# 5. Phase-2 implication

The working-universe expansion from 172 to 174 has **not created a new technical gap**.

If either candidate survives market selection, it can move forward under the existing calculator/text-input security classes.

Phase 2 remains ACTIVE because other shortlist conditional families still need final admission only after market cuts.
