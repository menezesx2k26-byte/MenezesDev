# MenezesDev Tools — Market Intelligence Batch 4

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — evidence expansion across developer/content/converter clusters  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

Continue converting V1/V2 hypotheses into current, candidate-specific evidence while preserving the browser-first and anti-thin-content rules.

This batch focuses on:

- Markdown Previewer;
- palette/color utility evidence;
- unit converter economics;
- Age Calculator;
- newly discovered adjacent converter intents that are not automatically added to the canonical 172-candidate universe.

---

# 2. Markdown Previewer — major upgrade

## Current evidence

Semrush July 2026 for `markdownlivepreview.com`:

- estimated visits: **1.56M/month**;
- Authority Score: ~47;
- July traffic +~29.8% versus June;
- Google organic: ~54.48%;
- Direct: ~40.68%;
- organic-search estimate: ~151.98K;
- previous May/June snapshots show ~1.2M visits/month and the same strong Google/direct mix;
- Brazil was ~6.3–6.4% of traffic in May/June.

US May 2026 keyword snapshot:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `markdown viewer` | 9,900 | **6.27** | 1 |
| `md viewer` | 8,100 | **6.27** | 1 |
| `markdown` | 22,200 | 3.48 | 3 |
| `markdown editor` | 8,100 | 3.23 | 2 |

Sources:
- https://www.semrush.com/website/markdownlivepreview.com/overview/
- https://pt.semrush.com/website/markdownlivepreview.com/overview/

## Interpretation

Markdown Previewer becomes one of the clearest developer-product candidates:

- million-scale dedicated-domain traffic;
- strong repeat/direct usage;
- high CPC in important US intent variants;
- Authority Score below the largest developer incumbents;
- long session duration indicates real interactive use rather than a thin landing-page click;
- Phase 2 already has an approved local `markdown-it` 15 + DOMPurify profile.

The only reason not to automatically rank it at the very top is product-semantic breadth: `viewer`, `previewer` and `editor` may represent related but not identical expectations. UX/IA later must choose one honest scope.

### Confidence change

`C -> A`

---

# 3. Color Palette / Palette Generator — strong market, strong incumbent

The original 172 universe contains `Gradient/Palette Generator (deterministic local)` as candidate #68.

Semrush June 2026 for `coolors.co`:

- ~**5.2M visits/month**;
- Authority Score ~67;
- ~58.1% Direct / ~34.2% Google;
- ~2.71M organic-search estimate;
- US is ~29.5% of traffic (~1.54M visits);
- Brazil ~3.36% (~175K visits).

US June keyword rows:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `color palette` | 110,000 | 1.22 | 1 |
| `color palette generator` | **74,000** | **2.09** | 1 |
| `color` | 165,000 | 1.01 | 2 |

Source:
- https://www.semrush.com/website/coolors.co/overview/

## Interpretation

There is clearly substantial demand and repeat usage for palette generation, and the operation is deterministic/browser-local.

However:

- Coolors has a very large backlink/authority moat (~77K referring domains in the June snapshot);
- the current candidate wording combines `Gradient` and `Palette` even though search intent may be distinct;
- palette generation can be a richer product than a trivial one-click randomizer.

### Confidence

Market evidence: **A**.

### Decision

Keep candidate #68 alive, but Phase 1/5 must later decide whether it should be a Palette Generator, a broader Color Tool, or separate gradient capability. Do not manufacture two URLs merely because two operations are easy.

---

# 4. Unit converters — massive demand, mostly weak CPC

Current Semrush June 2026:

`rapidtables.com`:

- ~11.8M visits/month;
- Authority Score 78;
- ~44.75% Direct / ~43.52% Google;
- ~18.76M organic-search estimate;
- users commonly continue to `unitconverters.net`.

`unitconverters.net` current US keyword rows:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `cm to inches` | **1,500,000** | 0.02 | 1 |
| `kg to lbs` | **823,000** | 0.01 | 1 |
| `mm to inches` | **823,000** | 0.37 | 1 |
| `kg to lb` | 450,000 | 0.01 | 1 |
| `inches to cm` | 301,000 | 0.10 | 1 |

Sources:
- https://www.semrush.com/website/rapidtables.com/overview/
- https://www.semrush.com/website/unitconverters.net/overview/

## Interpretation

This proves the converter cluster is a huge traffic market, but it also warns us against mistaking traffic for revenue:

- common physical conversions have enormous volume;
- CPC is often extremely low;
- incumbents have strong authority;
- runtime cost remains almost zero because typed conversion tables/formulas are already Phase-2 approved.

Therefore unit converters are attractive **traffic stabilizers / internal-graph assets**, not necessarily top AdSense-RPM flagships.

### Important IA warning

Search demand often occurs as directional queries (`cm to inches`, `kg to lbs`) rather than generic `Length Converter`/`Mass Converter` only.

The workflow forbids thin doorway permutations. Future IA must determine whether one strong converter page can capture directional variants without generating dozens of near-identical URLs.

---

# 5. Out-of-universe discovery: Binary / Hex conversion

The same RapidTables June 2026 US snapshot exposes:

| Keyword | Volume | CPC USD |
|---|---:|---:|
| `binary converter` | **550,000** | **7.65** |
| `hex converter` | **165,000** | **9.75** |
| `binary translator` | 135,000 | 9.35 |

These economics are dramatically better than common physical-unit conversions.

However, Binary Converter / Hex Converter are not explicitly named among the canonical initial 172 candidates.

Decision:

- record them in an **out-of-universe discovery queue**;
- do not silently rewrite the original 172 count;
- later candidate consolidation may explicitly add/replace/split capabilities if independent intent and technical semantics are confirmed;
- no Launch slot is granted merely by this finding.

This is exactly why Phase 1 remains research-driven rather than treating the first candidate list as exhaustive truth.

---

# 6. Age Calculator — huge demand, low CPC, strong competition

Semrush July 2026 for `calculator.net`:

- `age calculator`: **1,000,000 US monthly volume**;
- CPC: **$0.29**;
- Calculator.net position #1;
- Calculator.net Authority Score ~90.

A separate July 2026 `calculatestuff.com` snapshot shows:

- `age calculator`: 1,000,000 / $0.29 / position #5;
- a smaller calculator-focused domain can therefore participate on page one despite the AS90 leader.

Sources:
- https://www.semrush.com/website/calculator.net/overview/
- https://www.semrush.com/website/calculatestuff.com/overview/

## Interpretation

Age Calculator is:

- massive traffic potential;
- deterministic/browser-only;
- low monetization per search relative to finance/dev candidates;
- competitive but not exclusively owned by one mega-brand;
- natural part of a date/time cluster.

### Confidence change

`B -> A`

### Portfolio role

Traffic anchor/stabilizer rather than revenue flagship.

---

# 7. Batch 4 deltas

| Candidate / cluster | Prior confidence | New posture | Main reason |
|---|:---:|:---:|---|
| Markdown Previewer | C | **A** | 1.56M visits; strong direct; US viewer CPC ~$6.27 |
| Gradient/Palette candidate | C | **A-market** | 5.2M Coolors; 74K / $2.09 palette-generator intent; strong incumbent |
| Age Calculator | B | **A** | 1M US / $0.29; page-one participation beyond Calculator.net |
| Physical unit converters | C/category evidence | **A-market cluster** | enormous directional-query volume, mostly low CPC |
| Binary/Hex Converter | outside initial 172 | **discovery queue** | 550K/$7.65 and 165K/$9.75 signals; needs explicit candidate decision later |

---

# 8. Phase-1 implication

This batch reinforces a balanced portfolio instead of a CPC-only or volume-only portfolio:

- **high-value / high-margin:** developer tools such as Markdown/URL/JSON/regex;
- **commercial deterministic:** finance calculators;
- **mass-volume local:** image, age/date and unit conversions;
- **selective file/PDF:** architecture/traffic coverage under stricter security gates.

Phase 1 remains ACTIVE. The evidence-normalized candidate pool is growing, but no exact Launch 50 is frozen and Phase 3 remains NOT STARTED.
