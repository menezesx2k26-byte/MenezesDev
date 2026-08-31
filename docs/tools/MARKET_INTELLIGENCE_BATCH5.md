# MenezesDev Tools — Market Intelligence Batch 5

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — evidence expansion / deliberate downranking pass  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

Not every zero-backend utility deserves a Launch 50 slot. This pass intentionally tests three easy/local families that could otherwise be over-selected merely because implementation is cheap:

- Slug Generator;
- ZIP create/extract;
- Date Difference / Date Calculator.

The goal is to distinguish search/revenue anchors from useful architecture/traffic fillers.

---

# 2. Slug Generator — product-use signal, weak visible SEO monetization

## Current evidence

Semrush June 2026 for `slugify.online`:

- estimated visits: **283.51K/month**;
- Authority Score: **30**;
- average visit duration: ~21:14;
- Direct traffic: **75.76%**;
- Google: ~23.08%;
- organic-search estimate: only ~6.42K;
- United States: ~17.34% of total traffic (~49.16K visits);
- only ~391 referring domains.

Visible India June keyword table:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `slug generator` | 1,900 | 0 | 1 |
| `url slug generator` | 590 | 0 | 1 |
| `slug maker` | 140 | 0 | 1 |
| `url slug` | 320 | 0 | 1 |

Source:
- https://www.semrush.com/website/slugify.online/overview/

## Interpretation

This is a useful but unusual signal:

- a very low-authority/small-backlink domain can receive hundreds of thousands of monthly visits;
- most observed traffic is direct rather than organic;
- visible keyword demand/CPC in the exposed India table is small/zero;
- long session duration suggests repeat/tool use or measurement quirks, not necessarily high monetizable SEO intent.

### Decision

Do **not** promote Slug Generator into the evidence-normalized top tier from this dataset.

It remains a cheap cluster utility with potential direct/repeat value. Its V1 monetization/opportunity assumptions should be treated cautiously until stronger US/global keyword evidence appears.

### Confidence

Market/product-use evidence: **A**.  
SEO/AdSense economics: **B/C**.

This distinction matters: a candidate can be a proven useful product without being a top acquisition/revenue page.

---

# 3. ZIP create/extract — real market, moderate direct economics

## Current competitor evidence

Semrush February 2026 for `ezyzip.com`:

- ~**626.58K visits/month**;
- Authority Score **45**;
- US ~18.54% (~116K visits);
- India ~11.1%;
- Brazil ~5.24% (~32.8K visits);
- Google organic ~52.9% of traffic;
- Direct ~23.95%;
- organic-search estimate ~101K;
- average visit duration ~7:21.

Visible US February keyword rows:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `unzip program online` | 1,300 | 0.33 | 1 |
| `decompress zip online` | 1,000 | 0.33 | 1 |
| `ezyzip` | 1,600 | 1.18 | 1 |

Source:
- https://www.semrush.com/website/ezyzip.com/overview/

A more recent June 2026 Semrush snapshot for `files2zip.com` shows:

- India ~28.6% (~40.1K visits);
- US ~13.93% (~19.5K visits);
- Google organic ~74.81%;
- Direct ~19.95%;
- users commonly continue to `ezyzip.com` and `7-zip.org`.

Source:
- https://pt.semrush.com/website/files2zip.com/overview/

## Interpretation

ZIP is a genuine utility market with meaningful organic discovery and direct use, but the exposed exact US keywords are not high-CPC/high-volume flagships.

Portfolio value comes from:

- privacy positioning — local archive processing;
- repeated utility;
- file-tool architectural coverage;
- Brazil/international demand;
- zero ordinary backend compute with the already-audited browser archive path.

Phase 2 already has `zip.js` approved as the preferred general-purpose ZIP engine under strict entry/path/bomb limits, with native Compression Streams preferred where container semantics are unnecessary.

### Confidence

Market: **B/A-market** (competitor scale is current enough, exact keyword depth limited).  
Technical: **LOCAL-CLEAR with archive security wrapper**.

### Portfolio role

Coverage/traffic/privacy candidate, not revenue flagship.

---

# 4. Date Difference / Date Calculator — strong category signal, freshness mismatch

Current public product evidence confirms the intent remains active in 2026:

- Timeanddate maintains dedicated Duration Between Two Dates, Add/Subtract Days, Workdays and related date calculators;
- multiple specialized sites currently expose date-duration/days-between-dates utilities, often client-side.

The best visible Semrush keyword row found in this pass is older (October 2025) for Timeanddate:

- `date calculator`: ~**450K US volume** / **$3.06 CPC** / position #1.

Source:
- historical Semrush snapshot surfaced at `timeanddate.com` domain analysis.

Current product source:
- https://www.timeanddate.com/date/duration.php

## Interpretation

The older keyword evidence is economically attractive but does **not** meet the same August-2026 freshness bar used for A-confidence candidate metrics.

Decision:

- Date Difference / Date Calculator remains a strong **B** candidate;
- do not promote to A until a current 2026 keyword table is corroborated;
- technical path stays excellent: Date/Intl, with Temporal/polyfill only when semantics require it;
- future IA must distinguish `difference between dates`, `add/subtract days`, business days and duration rather than collapsing or multiplying URLs without intent evidence.

---

# 5. Batch 5 deltas

| Candidate / cluster | Market result | Technical result | Portfolio interpretation |
|---|---|---|---|
| Slug Generator | proven repeat/direct product use; weak visible SEO/CPC | local-clear | low-cost supporting tool, not flagship |
| ZIP Creator/Extractor | meaningful organic competitor traffic; modest exact keyword CPC | local-clear under archive wrapper | coverage/privacy/traffic |
| Date Difference / Date Calculator | strong older keyword economics + current product intent; freshness gap | local-clear | B-high pending current corroboration |

---

# 6. Phase-1 implication

This batch is intentionally useful because it **prevents easy tools from flooding Launch 50**.

The selection model is doing what it should:

- promote high-margin local tools when evidence supports them;
- keep high-volume/low-CPC tools for portfolio balance;
- retain architectural/privacy utilities selectively;
- downrank cheap-to-build features when search/revenue evidence is weak.

Phase 1 remains ACTIVE. Phase 3 remains NOT STARTED.
