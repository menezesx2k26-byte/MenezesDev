# MenezesDev Tools — Market Intelligence Batch 7: Cut Pass

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — weakest-shortlist validation / cut pass  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

Now that a working 80-candidate shortlist exists, Phase 1 no longer needs broad ideation. It needs **selection pressure**.

This batch targets weaker/B-tier shortlist rows and asks:

> Does current market evidence justify keeping this candidate in the bounded pool, or should it be demoted to reserve/cut despite cheap implementation?

The pass also records strong out-of-universe discoveries without silently changing the canonical 172-candidate count.

---

# 2. Reading Time Calculator — demote

Current Google-Ads-derived US data, updated 2026-07-11:

- `reading time calculator`: **2,900 monthly searches**;
- CPC: **$0**;
- advertiser competition: 0.

Related overlapping terms:

- `read time calculator`: 2,900 / $0;
- `read time`: 2,400 / ~$0.43;
- `reading time`: 2,400 / ~$0.43;
- `time to read calculator`: 480 / $0.

Source:
- https://www.seodata.dev/keyword/reading-time-calculator

### Decision

**DEMOTE FROM WORKING SHORTLIST TO RESERVE.**

Reason:

- independent utility exists;
- implementation is nearly free;
- but current acquisition and monetization evidence is too weak relative to the many stronger candidates already available.

This is exactly the behavior Phase 1 is supposed to enforce: low implementation cost does not earn a Launch slot by itself.

---

# 3. Future Value Calculator — upgrade

Current Google-Ads-derived US data, updated 2026-05-14, exposes the same-intent cluster:

- `future value calculator`: **49,500 monthly searches** / **$1.59 CPC**;
- `calculator for future value`: 49,500 / ~$0.69;
- `fv calculator`: 9,900 / ~$1.88;
- `future value of an investment calculator`: 1,600 / ~$0.84.

Source:
- https://www.seodata.dev/keyword/future-money-value-calculator

### Decision

**B -> A/B+ shortlist candidate.**

Technical path remains deterministic browser-local with zero ordinary backend requests.

Main remaining question is not feasibility but cannibalization/semantic overlap with:

- Investment Growth Calculator;
- Compound Interest Calculator;
- Present Value reserve.

If the SERP/UX intent is independently useful, Future Value is stronger than several current B-tier rows.

---

# 4. Savings cluster — commercial demand strong, but Savings Goal specifically remains unproven

Current Google-Ads-derived evidence for a closely related savings-interest calculator intent, updated 2026-05-20:

- `calculator for interest on savings`: **33,100** / **$1.62 CPC**;
- `high-yield savings account calculator`: **74,000** / **$4.37**;
- `savings interest calculator`: **27,100** / **$1.80**;
- `savings account calculator`: **14,800** / **$3.48**;
- `high yield savings calculator`: **12,100** / **$4.02**.

Source:
- https://www.seodata.dev/keyword/calculator-for-interest-on-savings

### Interpretation

The **savings-calculator market is commercially attractive**, but this evidence is closer to interest/APY/savings-account intent than to the exact question:

> “How much must I save per month to hit a target?”

Therefore it would be dishonest to promote `Savings Goal Calculator` to A using these numbers.

### Decision

- Savings Goal remains **B**;
- cluster evidence improves confidence that finance/savings deserves attention;
- do not create an additional `Savings Interest Calculator` candidate silently, because Interest/Investment/Compound tools already overlap and the original 172 must remain historically clear.

---

# 5. SVG-to-PNG market — strengthen, but source quality is secondary

A current traffic aggregator for the dedicated `svgtopng.com` domain reports approximately:

- ~**0.9M monthly visits**;
- search share around **79%**;
- US roughly **14%** of visitors;
- estimates cross-reference Semrush and Similarweb figures in the report.

Source:
- https://hypestat.com/info/svgtopng.com

This is not as strong as a direct current keyword table, so it does not justify false A-confidence economics.

### Decision

`SVG to PNG`: **B -> B+/A-market**.

The technical path is already strong (`resvg` local/WASM, strict SVG input/resource policy), and dedicated organic traffic appears meaningful.

Keep in shortlist.

---

# 6. Image crop / image cluster signal

Current iLoveIMG June-2026 data remains extremely strong at the category level:

- ~**38.5M monthly visits**;
- ~53% Google organic / ~40% Direct;
- India, Brazil and the US are all material markets;
- `resize image` in the sampled India table is around **1.22M** volume.

Source:
- https://pt.semrush.com/website/iloveimg.com/overview/

The current free table does not expose a comparable `crop image` row.

### Decision

Image Cropper remains **B+ category-supported**, not A candidate-specific.

Keep because:

- image editing utility market is huge;
- runtime is browser-local;
- it complements Resizer/Compressor naturally;
- but exact crop economics should not be invented.

---

# 7. Omni / calculator market reaffirmation

Current Semrush June-2026 Omni Calculator evidence:

- ~**14.29M monthly visits**;
- US ~6M visits;
- Google organic ~53%;
- visible current US rows include:
  - `proportion calculator`: 550K / ~$1.22;
  - `slope calculator`: 550K / ~$1.33;
  - `volume calculator`: 550K / ~$0.41.

Source:
- https://www.semrush.com/website/omnicalculator.com/overview/

This continues to justify retaining a meaningful deterministic math-calculator block even when individual CPCs are not finance-premium.

---

# 8. Out-of-universe discovery — Retirement Calculator

Current Google-Ads-derived US data, updated 2026-07-09:

- `retirement calculator`: **301,000 monthly searches** / **$2.26 CPC**;
- `calculator for retirement`: 246,000 / ~$2.25;
- `retirement savings calculator`: 18,100 / ~$2.94;
- `retirement planning calculator`: 6,600 / ~$4.85.

Source:
- https://www.seodata.dev/keyword/retirement-calculator

### Discovery verdict

**VERY STRONG OUT-OF-UNIVERSE CANDIDATE.**

It was not one of the original 172 named candidates and is therefore **not silently inserted** into the current shortlist.

If admitted later, technical feasibility is likely browser-local, but retirement calculations can require assumption/education design and finance/YMYL wording discipline.

It appears strong enough to challenge weak original shortlist rows after an explicit candidate-admission/consolidation decision.

---

# 9. Out-of-universe discovery — Budget Calculator

Current Google-Ads-derived US data, updated 2026-05-31:

- `budget calculator`: **22,200 monthly searches** / **$5.81 CPC**;
- `budget tool`: 9,900 / **$16.91**;
- `budget calculator free`: 4,400 / ~$5.22;
- `monthly budget calculator`: 2,400 / ~$5.60;
- `online budget calculator`: 1,600 / ~$5.70.

Source:
- https://www.seodata.dev/keyword/budget-calculator

### Discovery verdict

**STRONG OUT-OF-UNIVERSE COMMERCIAL CANDIDATE.**

It is not inserted into the canonical 172/80 without an explicit admission step.

If later admitted, it can execute locally and may be economically superior to several low-CPC original candidates.

---

# 10. Out-of-universe discovery queue after Batch 7

The queue now contains at least:

| Discovery | Current signal | Status |
|---|---|---|
| Binary Converter | ~550K / ~$7.65 | high-priority discovery |
| Hex Converter | ~165K / ~$9.75 | high-priority discovery |
| Binary Translator | ~135K / ~$9.35 | consolidation question |
| Retirement Calculator | ~301K / ~$2.26 | high-priority finance discovery |
| Budget Calculator | ~22.2K / ~$5.81 | high-commercial-value discovery |

No row above changes the historical 172 count in this batch.

A later explicit market-universe admission document should decide whether these:

- become new candidates;
- replace weaker original candidates;
- consolidate into existing utilities;
- or remain outside scope.

---

# 11. First cut recommendations from the 80 shortlist

## Demote to reserve now

1. **Reading Time Calculator** — current direct volume/CPC too weak.

## Keep, but under pressure

- Slug Generator — strong direct use, weak visible acquisition economics;
- Gzip Compressor / Decompressor — technical coverage good, market proof still thin;
- File Type Detector — useful dev/file coverage, market economics weakly normalized;
- Savings Goal — keep pending exact goal-intent evidence;
- Discount Calculator — cheap and broadly useful, but not yet a strong differentiator.

## Strengthen

- Future Value Calculator;
- SVG to PNG;
- Image Cropper remains category-supported;
- finance/math anchors reaffirmed.

---

# 12. Phase-1 effect

The shortlist is beginning to behave as an actual selection funnel:

```text
80 working candidates
        ↓
current evidence / technical economics
        ↓
promote stronger rows
        ↓
demote weak/easy rows
        ↓
compare with out-of-universe discoveries
        ↓
final evidence-backed pool >50
```

Phase 1 remains ACTIVE. The next pass should continue cutting the low-evidence tail and decide whether the strongest out-of-universe discoveries deserve formal candidate admission before the final shortlist is declared sufficient for Phase 3.
