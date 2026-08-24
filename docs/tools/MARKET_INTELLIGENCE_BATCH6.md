# MenezesDev Tools — Market Intelligence Batch 6

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — shortlist-expansion evidence pass  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

This batch expands candidate-specific evidence for currently underrepresented but technically cheap/local families so Phase 1 can move from a 28-row normalized subset toward a defensible shortlist substantially larger than Launch 50.

The pass deliberately uses existing Phase-2 browser/local coverage as a filter: market evidence is especially valuable when the candidate can serve substantial traffic without creating per-operation backend compute cost.

Weak evidence is used to downrank or hold candidates rather than to fill a quota.

Third-party traffic/keyword numbers remain estimates and are useful for prioritization, not guarantees of future traffic or AdSense revenue.

---

# 2. Image metadata / privacy cluster

## 2.1 Image Metadata Viewer — strong upgrade

Current Semrush evidence for `jimpl.com`, July 2026:

- ~**341K monthly visits**;
- Authority Score ~**43**;
- United States largest market at ~**79K visits**;
- traffic mix roughly **51% Direct / 39% Google**;
- organic-search estimate around **38.9K**.

Visible US keyword rows include:

| Keyword | Volume | CPC |
|---|---:|---:|
| exif data viewer | ~2.9K | ~$0.76 |
| data exif | ~2.4K | ~$0.87 |
| exif viewer | ~2.4K | ~$1.06 |
| online exif viewer | ~1.3K | ~$0.00 |

A May-2026 US snapshot exposed a stronger adjacent intent:

- `metadata viewer`: ~**6.6K** / **$6.82 CPC** / position ~5;
- `exif reader`: ~1.9K / ~$0.62;
- `exif data`: ~3.6K / ~$0.66.

The broader current competitor set also demonstrates real scale:

- `metadata2go.com`: about **1.2M visits/month** in June 2026;
- `exif.tools`: about **188K visits/month** in the audited snapshot.

Sources:
- https://www.semrush.com/website/jimpl.com/overview/
- https://www.semrush.com/website/metadata2go.com/overview/
- https://www.semrush.com/website/exif.tools/overview/

### Interpretation

This is a much stronger market than V1 confidence C implied:

- independent utility intent is obvious;
- direct usage is substantial;
- relatively modest-authority dedicated tools participate;
- metadata/privacy naturally links to image resize/compress/convert tools;
- the operation can remain local in-browser.

Technical state remains `LOCAL-CONDITIONAL` for rich EXIF/XMP/ICC reading because parser output is untrusted and the current ExifReader path has explicit audit conditions.

**Confidence direction:** `C -> A-market`.

---

## 2.2 Remove Image Metadata — product logic strong; exact SEO economics less normalized

Phase 2 already has a stronger technical path for removal than for arbitrary metadata reading: decode pixels and re-encode to a clean raster output, then verify metadata absence through fixtures.

The metadata-tool market above provides clear adjacent demand and a compelling privacy story, but the current pass did not obtain equally strong candidate-specific US keyword rows for exact `remove metadata from image` variants.

Decision:

- keep as **B-high / LOCAL-CLEAR**;
- do not inflate to A monetization from viewer keywords;
- shortlist value comes from privacy, image-cluster navigation and nearly zero marginal cost.

---

# 3. Case-conversion cluster

## 3.1 Case Converter — strong A evidence

Semrush / `convertcase.net`, June 2026:

- ~**5.05M monthly visits**;
- Authority Score ~**54**;
- United States ~**998K visits**;
- traffic mix roughly **71% Direct / 25% Google**;
- organic-search estimate ~**942K**.

Visible US keywords:

| Keyword | Volume | CPC |
|---|---:|---:|
| case converter | ~22.2K | ~$1.20 |
| case converted | ~14.8K | ~$0.01 |
| change case uppercase | ~14.8K | ~$0.01 |
| uppercase to lowercase converter | ~12.1K | ~$1.20 |
| convert case | ~8.1K | ~$0.00 |

A second dedicated domain, `caseconverter.com`, had ~133K monthly visits with Authority Score around 30 and a very high direct-traffic share, showing that lower-authority dedicated tools can retain users.

Sources:
- https://www.semrush.com/website/convertcase.net/overview/
- https://www.semrush.com/website/caseconverter.com/overview/

### Interpretation

Case Converter is now a clear shortlist candidate:

- multi-million incumbent traffic proves utility demand;
- strong direct/repeat behavior;
- meaningful exact search volume;
- zero dependency, zero backend processing;
- trivial security surface under text-size bounds.

CPC is not finance/developer-high, so this is a **traffic/repeat anchor**, not a premium-RPM flagship.

**Confidence:** A.  
**Technical state:** INTERNAL / LOCAL-CLEAR.

---

## 3.2 Title Case Converter — independent use proven, anti-thin test still required

Semrush / `titlecaseconverter.com`, July 2026:

- ~**272K monthly visits**;
- Authority Score ~**42**;
- US ~**123K visits**;
- traffic mix roughly **69% Direct / 24% Google**;
- organic-search estimate ~**45K**.

Visible US keywords include:

| Keyword | Volume | CPC |
|---|---:|---:|
| title case | ~9.9K | ~$0.08 |
| title case converter | ~5.4K | ~$0.00 |
| sentence case | ~4.4K | ~$0.03 |
| capitalization | ~9.9K | ~$6.34 |

A June snapshot also exposed `capitalize my title` around **14.8K / $7.83 CPC**.

Source:
- https://www.semrush.com/website/titlecaseconverter.com/overview/

### Interpretation

Title case is more than a purely cosmetic toggle: users return to a dedicated product and there are distinct writing/editorial conventions.

However, MenezesDev should not automatically create a separate route if the eventual Case Converter UX can satisfy the same search intent without sacrificing relevance.

**Confidence:** A-use / B-to-A market.  
**Gate:** explicit anti-thin/cannibalization comparison with generic Case Converter before freeze.

---

# 4. Developer / structured-data refresh

## 4.1 JSON Formatter — migrate existing A evidence into current shortlist

Existing Phase-1 evidence already established `jsonformatter.org` at roughly **2.55M monthly visits** in June 2026. A July snapshot estimated roughly **690K organic-search visits**.

The visible keyword evidence in earlier research showed large JSON-formatting demand but very low CPC in the sampled India market.

Sources:
- https://www.semrush.com/website/jsonformatter.org/overview/
- `docs/tools/MARKET_INTELLIGENCE_BATCH1.md`

### Interpretation

The current V2 working view should not omit JSON Formatter simply because its economics are traffic/repeat rather than CPC-heavy:

- market is clearly proven;
- native JSON engine is already `LOCAL-CLEAR`;
- zero dependency / zero backend operation cost;
- strengthens JSON Validator and conversion cluster.

**Confidence:** A.  
**Role:** developer traffic/repeat stabilizer.

---

## 4.2 Password Generator — proven high demand, intentionally low monetization score

Existing direct US evidence already recorded:

- `password generator`: ~**368K monthly searches** / ~$0.12 CPC;
- `random password generator`: ~**74K** / ~$0.05 CPC.

The dedicated `passwordsgenerator.net` site is much smaller than the total search market, which shows that demand is fragmented across browsers, password managers, security sites and general tools.

Source:
- https://www.semrush.com/website/passwordsgenerator.net/overview/
- `docs/tools/MARKET_PRIORITY_RANKING_V1.md`

### Interpretation

Password Generator should remain in the shortlist because:

- huge independent search intent;
- high repeat/direct utility;
- Web Crypto provides a strong local path;
- essentially zero marginal compute cost.

It is not a premium monetization candidate and should not be scored as one.

**Confidence:** A.  
**Technical:** LOCAL-CLEAR via `crypto.getRandomValues()`.

---

# 5. Text utility refresh

## 5.1 Word Counter — proven mass-volume traffic anchor

Existing direct US evidence recorded in Batch 1:

- `word counter`: ~**1M monthly searches** / ~$0.08 CPC;
- `word count`: ~246K / ~$0.08;
- `character counter`: ~201K / ~$0.07.

WordCounter.net had roughly **11.16M visits/month** in June 2026; a July current snapshot showed organic-search traffic around **3.99M**.

Source:
- https://www.semrush.com/website/wordcounter.net/overview/

### Interpretation

This remains one of the clearest examples of the project's economic thesis:

> enormous usage + tiny CPC can still be valuable when processing cost is effectively zero.

Word Counter belongs in the shortlist as a traffic anchor, not a monetization flagship.

**Confidence:** A.  
**Technical:** INTERNAL / LOCAL-CLEAR.

---

## 5.2 Character Counter — distinct intent evidence already sufficient for shortlist

The same WordCounter evidence exposes `character counter` around **201K US monthly volume**.

Its eventual route independence still must be tested against the anti-thin rule: one combined word/character utility may provide a better product unless SERP intent strongly rewards a dedicated route.

**Confidence:** A market.  
**Gate:** independent-URL decision deferred to IA/freeze; do not create duplicate thin UI.

---

# 6. Color/accessibility utility

## Color Contrast Checker — strong product trust signal, incomplete direct CPC normalization

WebAIM is a highly visible reference implementation. Current third-party traffic evidence in 2026 placed `webaim.org` around **623K monthly visits** in an audited snapshot.

More importantly, the US federal Section508.gov accessibility guidance explicitly recommends the WebAIM Contrast Checker and was reviewed/updated in March 2026.

Sources:
- https://www.section508.gov/test/color-contrast/
- https://webaim.org/resources/contrastchecker/
- current 2026 WebAIM traffic snapshot captured in the research pass.

### Interpretation

This candidate has strong evergreen utility and trust/linkability value even without a current direct CPC row:

- WCAG/accessibility workflows are persistent;
- browser-local computation is trivial;
- useful cross-links to color/palette tools;
- likely backlink/reference value higher than a generic transform.

**Confidence:** A-use / B-economics.  
**Technical:** LOCAL-CLEAR.

Do not pretend its monetization is known until direct search/CPC evidence is normalized.

---

# 7. Finance candidates still below A-confidence

## 7.1 Savings Goal Calculator

Current active dedicated tools exist at:

- NerdWallet — updated June 26, 2026;
- Investor.gov;
- Bankrate.

Sources:
- https://www.nerdwallet.com/calculator/savings-goal-calculator
- https://www.investor.gov/financial-tools-calculators/calculators/savings-goal-calculator
- https://www.bankrate.com/banking/savings/saving-goals-calculator/

This proves independent user intent, but also indicates strong finance incumbents. The current pass did not produce a sufficiently comparable direct keyword-volume/CPC row.

**Decision:** B-market / LOCAL-CLEAR; keep in shortlist consideration but not an anchor.

## 7.2 Markup Calculator

Current Omni Calculator and multiple business/ecommerce tools maintain dedicated Markup Calculator experiences.

Source:
- https://www.omnicalculator.com/finance/markup

Market intent is clear, especially as a natural counterpart to the strongly validated Margin Calculator. Exact direct 2026 volume/CPC remains insufficiently normalized.

**Decision:** `C -> B-market`; LOCAL-CLEAR; shortlist-supporting candidate.

## 7.3 Break-even Calculator

Current dedicated tools remain common across business/finance sites, including Omni Calculator.

Source:
- https://www.omnicalculator.com/finance/break-even

Again, independent intent is credible but direct market economics are not yet A-grade.

**Decision:** `C -> B-market`; LOCAL-CLEAR; shortlist-supporting candidate.

---

# 8. Converter / reference market refresh

RapidTables continues to demonstrate very large demand for deterministic conversion/reference utilities:

- June 2026 site traffic was around **11.8M visits**;
- July 2026 organic-search estimate was around **18.8M** in the current snapshot.

Source:
- https://www.semrush.com/website/rapidtables.com/overview/

The earlier Batch-4 discovery remains especially notable:

- `binary converter`: ~550K / ~$7.65 CPC;
- `hex converter`: ~165K / ~$9.75;
- `binary translator`: ~135K / ~$9.35.

These are still **out-of-universe discoveries**, not silently added to the canonical 172.

Common physical-directional conversion queries can have enormous volume but very low CPC. Therefore the portfolio should distinguish:

- **traffic converters** — physical/unit queries;
- **commercial developer/reference converters** — selected base/hex/binary intents if later admitted;
- **thin-page risk** — do not create one route for every direction/token permutation.

---

# 9. Date/time market refresh

`timeanddate.com` remains enormous in July 2026:

- ~**53.1M monthly visits**;
- Authority Score ~99;
- US ~22.3M visits;
- Direct ~46% / Google ~43%.

Source:
- https://www.semrush.com/website/timeanddate.com/overview/

This validates the overall date/time utility market but also demonstrates a huge incumbent moat.

The attractive direct `date calculator` keyword evidence previously found is not fresh enough for A-confidence August-2026 normalization, so Date Difference remains B-high rather than being promoted from category traffic alone.

---

# 10. Evidence migrations into the current shortlist

The following candidates already had strong enough evidence in prior batches and should be included when building the >50 working shortlist even if they were not in the 28-row V2 table:

- Word Counter — A;
- Character Counter — A-market / route-consolidation test;
- Password Generator — A, low-CPC role;
- JSON Formatter — A, traffic/repeat role;
- XML Formatter — A from prior direct structured-data evidence;
- Volume Calculator — A from Omni evidence;
- WebP to PNG — A market / LOCAL-CLEAR native path where supported;
- Percentage Calculator / Percentage Change — B/A-category evidence, LOCAL-CLEAR;
- Image Cropper — category-supported, LOCAL-CLEAR;
- JPG to PNG / PNG to JPG — category-supported, LOCAL-CLEAR.

Phase 1 does not require re-querying identical evidence merely to move a row between working artifacts.

---

# 11. Phase-1 implications

This batch materially expands the defensible candidate pool without lowering evidence standards.

Strong new/migrated candidates:

- Case Converter;
- Image Metadata Viewer;
- JSON Formatter;
- Password Generator;
- Word Counter;
- Character Counter;
- Color Contrast Checker;
- Title Case Converter (with anti-thin caveat).

Still intentionally B/hold:

- Remove Image Metadata exact acquisition economics;
- Savings Goal;
- Markup;
- Break-even;
- Date Difference current freshness;
- several CSV/YAML/SVG candidates lacking current candidate-specific market normalization.

The next artifact should be a **working shortlist substantially larger than 50**, with evidence bands, technical state and consolidation flags. It must not be treated as Launch 50 or as Phase 3 Capability Map.
