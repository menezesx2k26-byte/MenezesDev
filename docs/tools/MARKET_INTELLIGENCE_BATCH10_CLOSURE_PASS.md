# MenezesDev Tools — Market Intelligence Batch 10: Closure Cut Pass

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** CLOSURE PASS — evidence-backed cut/consolidation decisions; not Launch 50

---

# 1. Purpose

This pass converts the R5 shortlist from an 80-candidate research buffer into a smaller final Phase-1 pool that is still comfortably larger than Launch 50.

The governing rule is not “cut to a round number.” It is:

> A weaker candidate leaves when a stronger candidate or a cleaner consolidated product covers the user intent with better market/economic evidence and no worse technical risk.

All keyword/traffic figures below are third-party estimates/snapshots used for prioritization, not guarantees of traffic, RPM or ranking.

---

# 2. PDF: retain only the operations that justify hostile-input admission cost

The PDF market is enormous, but every public PDF operation carries materially higher malformed-input/parser risk than a plain calculator or text utility. Therefore category size alone is not sufficient.

## 2.1 Merge PDF — KEEP

Current US evidence:

- `merge pdf`: ~135K searches/month;
- CPC: ~$1.68;
- reported competition: ~0.11;
- strong overlapping terms such as `combine pdf`, `pdf merge`, and free variants.

Source: https://www.seodata.dev/keyword/merge-pdf

This is sufficient to justify keeping Merge PDF in the final Phase-1 pool despite the conditional parser gate.

## 2.2 Split PDF — KEEP

Current/near-current evidence shows a durable independent split intent:

- US May 2026 snapshot on a ranking competitor: `split pdf` ~40.5K / ~$0.30 and `pdf splitter` ~27.1K / ~$0.33;
- India June 2026: `split pdf` ~550K / ~$0.35;
- moderate-authority sites can participate in the SERP rather than only the mega-incumbents.

Sources:
- https://es.semrush.com/website/maxai.co/overview/
- https://www.semrush.com/website/apitemplate.io/overview/

Split remains market-justified.

## 2.3 Remove PDF Pages — KEEP

Current US evidence:

- `remove pdf pages`: ~33.1K / ~$1.48;
- variants such as `delete page from pdf`, `delete pages pdf`, and `pdf page remover` show effectively identical SERP overlap.

Source: https://www.seodata.dev/keyword/remove-pdf-pages

This is a clean, independent deletion intent and stays.

## 2.4 Extract / Reorder / Rotate / Text Watermark — DEMOTE TO RESERVE

These remain technically feasible through the same bounded structural PDF engine, but this pass did not find candidate-specific current evidence strong enough to justify four additional hostile-PDF launch-pool surfaces.

`Rotate PDF` does show meaningful demand in some non-US snapshots, but the currently visible economics are weak and the operation can be reconsidered after Launch 50 data proves PDF cluster traction.

Demotions:

- Extract PDF Pages;
- Reorder PDF Pages;
- Rotate PDF Pages;
- Add Text Watermark to PDF.

Important: these are **market-priority demotions, not technical rejections**.

---

# 3. Formatter/data consolidation

## 3.1 HTML Formatter — KEEP

Current developer-tool evidence is commercially attractive:

- Prettier.io July 2026: ~88K visits, Authority Score ~46;
- `html prettier`: ~$10.23 CPC in the visible US table;
- `code beautification`: ~8.1K / ~$5.15;
- `code formatter`: ~1K / ~$3.92;
- CodeBeautify June 2026: ~2.55M visits with both direct and organic traffic material.

Sources:
- https://www.semrush.com/website/prettier.io/overview/
- https://www.semrush.com/website/codebeautify.org/overview/

HTML Formatter remains the representative Prettier-backed formatter in the final Phase-1 pool.

## 3.2 JavaScript Formatter / CSS Formatter — DEMOTE AS STANDALONE LAUNCH-POOL URLs

The shared formatter market is real, but current direct candidate-specific evidence is materially stronger for HTML/general code formatting than for separate JavaScript and CSS URLs.

The eventual tool architecture may still support JS/CSS formatting through one formatter shell or future expansion. This Phase-1 decision only says they do not each deserve a scarce final-pool slot now.

## 3.3 CSV to JSON + JSON to CSV — CONSOLIDATE INTO ONE BIDIRECTIONAL DATA-CONVERSION TOOL

CSV and JSON conversion are two directions of one tightly related workflow. Two separate indexed Launch URLs create unnecessary cannibalization risk unless later Search Console data proves distinct user intents.

Canonical Phase-1 representative:

- **CSV to JSON** — keep as the named candidate;
- include reverse JSON → CSV mode in the product specification;
- **JSON to CSV standalone URL** — demote.

The exact public route/title is a Phase-5 IA decision, not frozen here.

## 3.4 JSON Minifier — CONSOLIDATE INTO JSON Formatter

JSON formatting and minification are opposite output modes over the same parse/stringify pipeline. The final Phase-1 pool keeps:

- JSON Formatter with pretty/minify modes;
- JSON Validator as an independent validation intent.

Standalone JSON Minifier is demoted to prevent a thin sibling URL.

---

# 4. Hash/token consolidation

## 4.1 SHA-256 Hash Generator — KEEP AND EXPAND INPUT MODES

The surviving hash tool should support at minimum:

- text hashing;
- file hashing within browser resource limits;
- clear algorithm labeling;
- no upload/backend requirement.

## 4.2 File Hash Calculator — DEMOTE AS SEPARATE URL

A separate File Hash page is not justified by current evidence strongly enough to beat a combined hash utility. File input becomes a mode of the hash tool instead.

## 4.3 Secure Token Generator — DEMOTE TO RESERVE

Secure random generation remains technically trivial and safe with Web Crypto, but current independent acquisition evidence is weaker than the already-surviving:

- Random Password Generator;
- UUID Generator;
- Random Number Generator.

Token generation can later be a mode/related utility when first-party demand appears.

---

# 5. Finance/math cleanup and challengers

## 5.1 Simple Interest Calculator — CONSOLIDATE INTO Interest Calculator

Simple-interest mode belongs inside the broader Interest Calculator unless later search evidence proves a sufficiently independent intent. The final pool keeps Interest Calculator and demotes standalone Simple Interest.

## 5.2 Weighted Average Calculator — DEMOTE TO RESERVE

Useful and inexpensive, but current candidate-specific market evidence is weaker than the two challengers promoted below.

## 5.3 Tip Calculator — PROMOTE

Current US evidence remains enormous:

- `tip calculator`: ~1.5M searches/month;
- CPC ~US$0.06.

Sources:
- https://www.semrush.com/website/omnicalculator.com/overview/
- https://www.semrush.com/website/calculator.net/overview/

This is explicitly a **high-volume/low-CPC traffic anchor**, not a high-RPM flagship. Its marginal compute cost is effectively zero.

## 5.4 Aspect Ratio Calculator — PROMOTE

March 2026 US evidence is unusually attractive for a small/local tool:

- `aspect ratio calculator`: ~14.8K / ~$5.63;
- `aspect ratio finder`: ~4.4K / ~$5.63;
- `aspect ratio calc`: ~5.4K / ~$5.63;
- a domain with Authority Score ~25 ranked around position #7.

Source: https://pt.semrush.com/website/mononodes.com/overview/

This combines commercial-value signal, attainable-incumbent evidence and zero-backend implementation.

---

# 6. Image/privacy cleanup

## Remove Image Metadata — DEMOTE TO RESERVE

The capability remains technically attractive and privacy-friendly, but current acquisition evidence is weaker than the image tools already retained.

Image Metadata Viewer remains in the final pool because prior research showed stronger dedicated-product market evidence. Metadata removal can be reconsidered as a mode or later sibling when first-party data justifies it.

---

# 7. Archive cleanup

## ZIP Creator — KEEP

Keeps a representative archive/file capability, remains local, useful, and relatively straightforward under output/resource caps.

## ZIP Extractor — DEMOTE TO RESERVE

ZIP extraction has materially more hostile-input complexity:

- decompression-bomb risk;
- entry-count and aggregate-size limits;
- path traversal;
- symlink/hardlink surprises;
- cancellation/work-budget requirements.

Current exact market economics do not justify carrying that additional conditional surface into the final Phase-1 pool when the project already has more than enough safe/local candidates for Launch 50.

---

# 8. Final R5 → Phase-1 final-pool changes

## Promotions into the final pool

1. Tip Calculator
2. Aspect Ratio Calculator

## Demotions / consolidations from R5

1. Simple Interest Calculator → mode under Interest Calculator
2. Weighted Average Calculator → reserve
3. Remove Image Metadata → reserve
4. JSON Minifier → mode under JSON Formatter
5. File Hash Calculator → file mode under SHA-256 Hash Generator
6. Secure Token Generator → reserve
7. JavaScript Formatter → reserve/shared formatter future
8. CSS Formatter → reserve/shared formatter future
9. JSON to CSV → reverse mode under CSV↔JSON utility
10. ZIP Extractor → reserve
11. Extract PDF Pages → reserve / overlap with Split
12. Reorder PDF Pages → reserve
13. Rotate PDF Pages → reserve
14. Add Text Watermark to PDF → reserve

Net result:

- R5: 80 candidates;
- 14 demotions/consolidations;
- 2 promotions;
- **Final Phase-1 pool: 68 candidates**.

The pool remains substantially larger than Launch 50 and retains enough reserve pressure for Phase 4.

---

# 9. Phase-1 closure assessment

The Phase-1 exit gate requires sufficient evidence to select Launch 50 without arbitrary guessing.

This research program now has:

- a historical universe of 172 plus five explicitly admitted discoveries = 177 candidates;
- market/competitor research across all major candidate families;
- current direct evidence for the strongest anchors and high-value challengers;
- a normalized working ranking;
- repeated cut/replacement passes rather than one-shot intuition;
- explicit anti-thin/consolidation decisions;
- a final evidence-backed pool of 68, still >50;
- Phase-2 technical status attached to the pool.

**Phase-1 gate assessment: SATISFIED.**

A separate closure record should mark Phase 1 closed without rewriting the historical immutable-workflow text.
