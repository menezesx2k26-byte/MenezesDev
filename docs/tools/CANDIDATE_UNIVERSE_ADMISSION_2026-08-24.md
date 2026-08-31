# MenezesDev Tools — Candidate Universe Admission 2026-08-24

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Type:** explicit research-universe admission decision  
**Historical Batch-1 universe:** 172 candidates  
**Working universe after this decision:** **174 candidates**  
**Not Launch 50. Not Phase 3.**

---

# 1. Why this file exists

The original `MARKET_INTELLIGENCE_BATCH1.md` deliberately created a large 172-candidate universe before deeper market research.

Later research is expected to discover opportunities that were not named in the first brainstorm. Refusing to admit a materially better opportunity merely to preserve a round historical count would contradict the Phase-1 purpose of evidence-driven selection.

At the same time, silently editing “172” into another number would destroy the historical record and confuse future agents.

Therefore:

- **172 remains the historical initial universe**;
- new candidates are admitted through explicit dated decisions;
- the current working-universe count is derived from those admissions;
- out-of-universe discoveries that remain ambiguous do not change the count.

---

# 2. Admission criteria

A discovery may be admitted when all of the following are sufficiently clear for Phase-1 research:

1. independent user/search intent;
2. material evidence that it could beat weaker existing candidates;
3. no obvious thin-page duplication with an existing candidate;
4. plausible technical path consistent with browser-first economics;
5. no immediate license/security blocker;
6. admission improves the quality of later Launch-50 selection rather than merely increasing page count.

Admission is **not** implementation approval.

---

# 3. ADMITTED — Candidate 173: Retirement Calculator

## Market evidence

Current Google-Ads-derived US data, updated 2026-07-09:

- `retirement calculator`: **301,000 monthly searches** / **$2.26 CPC**;
- `calculator for retirement`: 246,000 / ~$2.25;
- `retirement savings calculator`: 18,100 / ~$2.94;
- `retirement planning calculator`: 6,600 / ~$4.85.

Source:
- https://www.seodata.dev/keyword/retirement-calculator

## Independent intent

Retirement planning is materially different from:

- generic compound interest;
- future value;
- savings goal;
- investment growth.

A useful retirement calculator can model goal age, contribution period, current savings, contribution amount and assumed return without requiring live market data.

## Technical/economic path

**Preferred execution:** browser/internal deterministic calculations.  
**Ordinary backend processing requests:** 0.  
**Provisional technical status:** `LOCAL-CLEAR / YMYL-CONTENT-CAUTION`.

The mathematical engine is low risk; the editorial layer must avoid presenting assumptions as personalized financial advice or guaranteed future returns.

## Admission verdict

**ADMIT as candidate #173.**

This candidate is strong enough to challenge weaker finance/text/file rows in the working shortlist.

---

# 4. ADMITTED — Candidate 174: Budget Calculator

## Market evidence

Current Google-Ads-derived US data, updated 2026-05-31:

- `budget calculator`: **22,200 monthly searches** / **$5.81 CPC**;
- `budget tool`: 9,900 / **$16.91**;
- `budget calculator free`: 4,400 / ~$5.22;
- `monthly budget calculator`: 2,400 / ~$5.60;
- `online budget calculator`: 1,600 / ~$5.70.

Source:
- https://www.seodata.dev/keyword/budget-calculator

## Independent intent

A budget calculator/planner solves a different task from ROI, margin, loan, discount or savings-goal calculations.

The useful baseline can remain deterministic/local:

- income buckets;
- expense buckets;
- monthly surplus/deficit;
- percentages by category;
- optional editable budgeting guideline comparison clearly labelled as a guideline, not a rule.

No account, bank integration or persistent financial data is required for the initial candidate concept.

## Technical/economic path

**Preferred execution:** browser/internal.  
**Ordinary backend processing requests:** 0.  
**Provisional technical status:** `LOCAL-CLEAR / PRIVACY-SENSITIVE-INPUT-NO-TELEMETRY`.

User-entered income/expense values are private tool inputs and must not enter analytics/telemetry.

## Admission verdict

**ADMIT as candidate #174.**

Its CPC signal makes it economically capable of displacing several low-value original candidates.

---

# 5. NOT YET ADMITTED — Binary Converter discovery

Current research signal recorded previously:

- `binary converter`: ~550K / ~$7.65 CPC.

The economics are unusually attractive, but the phrase can refer to multiple products:

- binary ↔ decimal/hex/octal numeric conversion;
- text ↔ binary encoding;
- file/binary data conversion;
- adjacent “binary translator” intent.

## Verdict

**SEMANTIC HOLD — no candidate-count change.**

Before admission, map the actual SERP/intents and decide whether one Number Base Converter would be a better, non-thin product.

---

# 6. NOT YET ADMITTED — Hex Converter discovery

Current research signal recorded previously:

- `hex converter`: ~165K / ~$9.75 CPC.

Potential ambiguity includes:

- hexadecimal number conversion;
- hex text/byte encoding;
- color HEX conversion.

Candidate #62+ already contains color conversion capabilities, so blindly adding “Hex Converter” could create cannibalization or misleading intent.

## Verdict

**SEMANTIC HOLD — no candidate-count change.**

Investigate the SERP and query cluster before any admission.

---

# 7. Binary Translator discovery

`binary translator` was observed around ~135K / ~$9.35 in the prior research snapshot.

This is likely related to text ↔ binary rather than generic numeric conversion.

## Verdict

**HOLD FOR CLUSTER CONSOLIDATION.**

Do not create separate Binary Converter + Binary Translator pages until intent evidence proves both deserve independent URLs.

---

# 8. Current universe accounting

```text
Initial Batch-1 candidates       172
+ Retirement Calculator            1
+ Budget Calculator                1
------------------------------------
Current admitted working universe 174
```

The historical statement “Batch 1 contains 172 candidates” remains true.

The current statement becomes:

> MenezesDev Tools has an initial 172-candidate universe plus 2 explicitly admitted research discoveries, for **174 current admitted candidates**.

---

# 9. Effect on the 80 working shortlist

`MARKET_SHORTLIST_80_WORKING.md` intentionally remains an 80-row shortlist drawn from the original 172 at the time it was created.

The two new admitted candidates do **not** silently make it 82.

Instead, the next cut/replacement pass should ask whether Candidate 173 or 174 should **replace** weaker rows.

This preserves selection pressure:

```text
new strong discovery
      ↓
does not expand Launch target
      ↓
forces weak existing candidate to defend its slot
```

---

# 10. Workflow state

- Phase 1 remains ACTIVE.
- Phase 2 remains ACTIVE.
- Phase 3 remains NOT STARTED.
- Launch 50 remains NOT FROZEN.
- This admission decision creates no route, dependency, backend, account or deployment.
