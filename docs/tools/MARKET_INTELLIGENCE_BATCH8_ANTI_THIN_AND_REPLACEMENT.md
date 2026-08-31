# MenezesDev Tools — Market Intelligence Batch 8: Anti-thin + Replacement Pressure

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence, with Phase-2 cross-checks  
**Status:** ACTIVE / evidence pass; not Launch 50 and not Phase 3

---

# 1. Objective

This pass resolves several explicit R3 questions before the shortlist is narrowed further:

- Case Converter vs Title Case Converter;
- Word Counter vs Character Counter;
- finance overlap among Compound Interest / Investment Growth / Future Value / Savings Goal;
- whether GCD/LCM is actually too weak to retain;
- whether Scientific Notation, File Type Detector and Remove Duplicate Lines deserve their current slots;
- whether overlooked/reserve candidates can displace weak R3 rows without adding backend cost.

The rule remains: **easy implementation does not buy a shortlist slot; independent useful intent + market evidence does.**

---

# 2. Case Converter vs Title Case Converter — KEEP BOTH FOR NOW

## Current market evidence

`titlecaseconverter.com`, July 2026 Semrush snapshot:

- ~271.85K monthly visits;
- Authority Score ~42;
- US is the largest market (~45% of visits);
- ~69% Direct / ~24% Google on desktop;
- `title case` ~9.9K US volume / ~$0.08 CPC;
- `title case converter` ~5.4K / ~$0 CPC;
- `sentence case` ~4.4K / ~$0.03;
- long session duration (~10 minutes), supporting real repeat/product use.

`caseconverter.com`, July 2026:

- ~132.59K monthly visits;
- Authority Score ~30;
- ~76.5% Direct / ~20.3% Google;
- current visible India `case converter` ~90.5K volume.

`convertcase.net`, June 2026:

- ~5.05M monthly visits;
- Authority Score ~54.

## Decision

**Do not consolidate Case Converter and Title Case Converter at Phase 1.**

Why:

1. Title Case has a dedicated product market and direct-use behavior.
2. Title Case has its own editorial/rule complexity (AP/APA/Chicago-style expectations, small words, punctuation, acronyms).
3. Generic Case Converter serves uppercase/lowercase/sentence/capitalization transformations rather than editorial title-casing rules.
4. They should link to each other but should not be doorway variants of the same engine/page.

Future Phase-5 IA must prevent duplicated copy and make the functional distinction obvious.

Sources:
- https://www.semrush.com/website/titlecaseconverter.com/overview/
- https://www.semrush.com/website/caseconverter.com/overview/
- https://www.semrush.com/website/convertcase.net/overview/

---

# 3. Word Counter vs Character Counter — KEEP BOTH

## Current market evidence

WordCounter remains a mass-scale market signal:

- ~11.16M monthly visits in June 2026;
- Authority Score ~70;
- previous direct evidence in Batch 1: `word counter` ~1.0M US volume / ~$0.08 CPC and `character counter` ~201K / ~$0.07.

Dedicated character-count products also prove the intent is not merely a sub-feature:

`charactercountonline.com`, July 2026:

- ~1.22M monthly visits;
- Authority Score ~49;
- ~65.6% Direct / ~29.7% Google;
- ~14-minute session duration;
- dedicated character-count audience.

`charactercounter.com`, July 2026:

- ~291.37K monthly visits;
- Authority Score ~42;
- ~45.7% Direct / ~41.7% Google;
- US `character counter` ~201K / ~$0.07;
- US `character count` ~74K / ~$0.07.

## Decision

**Keep Word Counter and Character Counter as separate candidate tools.**

They may share one internal counting primitive, but they satisfy distinct head intents and proven dedicated product behavior. Shared-engine implementation does not imply shared URL.

Sources:
- https://www.semrush.com/website/wordcounter.net/overview/
- https://www.semrush.com/website/charactercountonline.com/overview/
- https://www.semrush.com/website/charactercounter.com/overview/

---

# 4. Finance overlap — do not collapse the wrong tools

## Compound Interest Calculator

Investor.gov July 2026 US snapshot:

- `compound interest calculator` ~1.22M / ~$0.48 CPC;
- position #1 for Investor.gov.

## Investment Calculator / Investment Growth

Same current snapshot:

- `investment calculator` ~450K / ~$0.65 CPC on Investor.gov.

RamseySolutions June 2026 exposes the same US `investment calculator` volume ~450K with a materially higher ~$2.91 CPC snapshot, demonstrating provider/snapshot variance but strong advertiser intent.

## Future Value Calculator

Current Google-Ads-derived evidence recorded in Batch 7:

- `future value calculator` ~49.5K US volume / ~$1.59 CPC;
- `fv calculator` ~9.9K / ~$1.88;
- related exact variants have very high SERP overlap.

## Savings Goal Calculator

The broad savings market is real, but current direct exact-goal evidence remains materially weaker/less clean than the three tools above.

## Decision

- **Compound Interest: retain.**
- **Investment Growth / Investment Calculator: retain.** Separate broad contribution/growth planning intent is proven.
- **Future Value: retain for now.** Smaller than Investment but distinct finance/education intent and better CPC signal.
- **Savings Goal: remains vulnerable.** It should be displaced if a stronger candidate needs a slot unless a new current direct-intent pass materially improves its evidence.

Sources:
- https://www.semrush.com/website/investor.gov/overview/
- https://www.semrush.com/website/ramseysolutions.com/overview/
- https://www.seodata.dev/keyword/future-money-value-calculator

---

# 5. GCD/LCM — RETAIN despite weak CPC

CalculatorSoup June 2026 US snapshot:

- `lcm calculator` ~550K searches / ~$0 CPC;
- `gcf calculator` ~301K / ~$0 CPC;
- CalculatorSoup overall ~9.22M monthly visits and AS80.

This is a classic **traffic-role** candidate:

- low advertiser value;
- strong head demand;
- deterministic browser-only implementation;
- tiny maintenance/runtime cost;
- educational/internal-link value to fractions/number theory.

## Decision

**GCD/LCM remains in the shortlist.**

Its role is volume and cluster depth, not RPM leadership.

Source:
- https://www.semrush.com/website/calculatorsoup.com/overview/

---

# 6. Decimal to Fraction — PROMOTE from the original universe

Candidate already existed in Batch 1 as original candidate #9 but had not made R3.

Current CalculatorSoup June 2026 US evidence:

- `decimal to fraction` ~673K searches / ~$2.65 CPC;
- CalculatorSoup ranks #1;
- CalculatorSoup AS80 shows competition is strong, but economics are materially better than multiple current R3 supporting rows.

Product semantics are independent:

- terminating decimals;
- repeating decimals;
- simplified rational output;
- mixed-number output;
- step-by-step conversion.

Technical path is deterministic/local and requires no backend.

## Decision

**Promote Decimal to Fraction into the next shortlist revision.**

Source:
- https://www.semrush.com/website/calculatorsoup.com/overview/
- https://www.calculatorsoup.com/calculators/math/decimal-to-fraction-calculator.php

---

# 7. Random Number Generator — ADMISSION CHALLENGER

This capability was not explicitly named in the historical 172, but current evidence is too strong to ignore.

CalculatorSoup June 2026 US snapshot:

- `random number generator` ~1.22M searches / ~$1.66 CPC;
- CalculatorSoup ranks ~#4 in the exposed snapshot.

Intent is independent from:

- Password Generator;
- Secure Token Generator;
- UUID Generator.

A general RNG serves ranges, counts, unique/non-unique picks, sorting and reproducible/non-reproducible UX semantics rather than secret generation.

Technical path:

- browser-native CSPRNG (`crypto.getRandomValues()`), with rejection sampling for unbiased bounded integers;
- 0 backend requests;
- no third-party dependency;
- generated values never enter telemetry.

## Decision

**Admit Random Number Generator explicitly as candidate #177 and make it compete for a shortlist slot.**

Source:
- https://www.semrush.com/website/calculatorsoup.com/overview/
- https://www.calculatorsoup.com/calculators/statistics/random-number-generator.php

---

# 8. Scientific Notation — VULNERABLE, not rejected

Current product SERPs confirm a real standalone utility market and multiple actively maintained 2026 competitors/pages, but this pass did not recover direct current head keyword volume/CPC comparable to Decimal-to-Fraction/GCD/LCM.

Therefore:

- technical/everyday utility remains valid;
- market confidence is below the promoted challengers;
- it stays on the shortlist only until stronger rows force a cut.

This is not a technical rejection.

---

# 9. File Type Detector — DEMOTE candidate

A current dedicated browser-local implementation exists and demonstrates product plausibility, but this pass did not find strong enough current exact-intent market evidence to justify a top-80 slot against newly strengthened candidates.

The capability also carries more dependency/signature-maintenance surface than trivial math/text tools.

## Decision

**Demote File Type Detector to reserve in the next shortlist revision.**

It remains technically useful and may return later through observed missing-search demand or stronger market evidence.

---

# 10. Remove Duplicate Lines — DEMOTE candidate

Current 2026 SERPs show many dedicated/browser-local duplicate-line tools, proving utility, but the market is highly fragmented and this pass did not recover strong direct keyword-volume/CPC evidence comparable to the current shortlist anchors/challengers.

## Decision

**Demote Remove Duplicate Lines to reserve in the next shortlist revision.**

The internal primitive remains easy and can later be included as a mode in broader line/list utilities without requiring an indexed standalone page.

---

# 11. PDF lower-tail pressure increases

Current market evidence continues to prove the PDF category at enormous scale:

- iLovePDF July 2026 ~250.21M visits, AS92;
- Sejda June 2026 ~19.57M visits, AS72.

However, exposed current head economics remain concentrated in broad PDF/editor/conversion terms, and our PDF structural family carries a materially higher hostile-input burden than internal calculators/text tools.

Therefore lower-evidence PDF operations beyond Merge/Split remain under pressure. Category scale alone does not grant every structural operation a Launch-50 slot.

Sources:
- https://www.semrush.com/website/ilovepdf.com/overview/
- https://www.semrush.com/website/sejda.com/overview/

---

# 12. Result of Batch 8

Resolved:

- Case vs Title Case: **both survive anti-thin gate**;
- Word vs Character: **both survive anti-thin gate**;
- Compound vs Investment vs Future Value: **all remain distinct enough**;
- Savings Goal: **weakest finance overlap remains vulnerable**;
- GCD/LCM: **retain as high-volume/low-CPC traffic role**;
- Decimal to Fraction: **promote**;
- Random Number Generator: **admit + promote challenger**;
- File Type Detector: **demote to reserve**;
- Remove Duplicate Lines: **demote to reserve**;
- Scientific Notation: **vulnerable but not cut in this pass**.

Phase 1 remains ACTIVE. These decisions are intended to feed `MARKET_SHORTLIST_80_WORKING_R4.md`, not freeze Launch 50.
