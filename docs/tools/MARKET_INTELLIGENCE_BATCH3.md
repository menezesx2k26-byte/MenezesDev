# MenezesDev Tools — Market Intelligence Batch 3

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 1 — Global Market Intelligence  
**Status:** ACTIVE — candidate-specific evidence expansion  
**Not Launch 50. Not Phase 3.**

---

# 1. Purpose

This pass continues the evidence-normalization work required by Phase 1. It focuses on low-cost browser-local candidates that remained under-validated in `MARKET_PRIORITY_RANKING_V2_DRAFT.md`, especially URL encoding/decoding, text comparison and JSON validation.

Third-party traffic and keyword metrics are treated as estimates/snapshots for prioritization, not guarantees of traffic, AdSense RPM or ranking.

---

# 2. URL Encoder — strong direct upgrade

## Current direct evidence

Semrush July 2026 for `urlencoder.org`:

- estimated visits: **185.81K/month**;
- Authority Score: **47**;
- visits increased ~35.8% versus June;
- United States: ~12.55% of traffic (~23.33K visits);
- Brazil: ~10.15% (~18.86K visits);
- Direct traffic: ~47.36%;
- Google: ~34.79%;
- organic-search estimate: ~45.57K;
- users commonly continue to `urldecoder.org` and `base64decode.org`.

Current US keyword rows exposed by the same Semrush domain family include:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `url encoder` | 6,600 | 5.44 | 2 |
| `url encode` | 5,400 | 5.44 | 1–2 depending snapshot |
| `urlencode` | 5,400 | 5.44 | 1–2 |
| `urlencoder` | 1,300 | 5.44–11.56 depending snapshot | 1 |
| `encode the url` | 4,400–6,600 depending snapshot | 5.44–11.56 | 2 |

Sources:
- https://www.semrush.com/website/urlencoder.org/overview/
- https://pt.semrush.com/website/urlencoder.org/overview/

## Interpretation

This is materially better than the V1/V2-hold posture suggested:

- head volume is not mass-market scale, but CPC is unusually high for a trivial deterministic utility;
- almost half of traffic is direct, supporting repeat/bookmarked technical usage;
- the dedicated incumbent is Authority Score ~47 rather than an AS90 mega-site;
- Brazil is already a top traffic market for the incumbent, which supports the existing EN + PT-BR strategy;
- users naturally navigate between URL encode/decode/Base64 utilities, strengthening cluster/internal-navigation value;
- implementation can stay fully local with no server compute.

### Confidence change

`B / research-hold -> A`

### Ranking implication

URL Encoder should enter the normalized shortlist tier as a strong developer candidate. Demand is moderate, monetization and repeat-use are strong, and cost/security confidence is maximal under the audited native-browser path.

---

# 3. URL Decoder — paired intent strong, standalone metrics still incomplete

The current `urlencoder.org` traffic journey repeatedly sends users to `urldecoder.org`, demonstrating a real paired workflow and independent user need.

However, this pass did not obtain a comparably fresh July 2026 standalone Semrush keyword table for `urldecoder.org`.

Decision:

- retain URL Decoder as a likely paired shortlist candidate;
- raise evidence confidence qualitatively, but do **not** assign A solely by symmetry with URL Encoder;
- require one more direct/current standalone evidence source before final V2 normalization if exact URL separation matters.

This also preserves the anti-thin-content gate: encode/decode may share one product surface if SERP/UX evidence later shows that to be superior.

---

# 4. Text Diff / Compare Text — strong direct upgrade

## Current direct evidence

Semrush June 2026 for `diffchecker.com`:

- estimated visits: **2.18M/month**;
- Authority Score: **52**;
- pages per visit: ~4.01;
- average visit duration: ~9:37;
- Direct traffic: ~61.13%;
- Google: ~32.35%;
- organic-search estimate: ~696.11K;
- United States: ~20.38% of visits (~445K).

US organic keyword snapshot:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `diff checker` | 27,100 | 3.57 | 1 |
| `diffchecker` | 14,800 | 2.74 | 1 |
| `diff` | 60,500 | 0.54 | 1 |
| `text compare` | 27,100 | 1.26 | 2 |
| `compare` | 33,100 | 12.99 | 1 |

Source:
- https://www.semrush.com/website/diffchecker.com/overview/

## Interpretation

Text Diff is much stronger than a generic low-value text utility:

- multi-million monthly competitor traffic;
- very high direct/repeat usage;
- meaningful US query volume;
- monetizable developer/business-adjacent intent;
- browser-local implementation path already clear;
- natural links to JSON diff/formatters and text tools.

Competition is real: Diffchecker has ~6K referring domains and strong product engagement. Opportunity must therefore be scored lower than raw economics might imply.

### Confidence change

`C -> A`

### Ranking implication

Promote Text Diff / Compare Text into the evidence-normalized shortlist tier, but do not score it as an easy SERP win.

---

# 5. JSON Validator — strong direct upgrade

## Current direct evidence

Semrush June 2026 for `jsonlint.com`:

- estimated visits: **472.88K/month**;
- Authority Score: **53**;
- average visit duration: ~12:55;
- Direct traffic: ~52.93%;
- Google: ~36.83%;
- organic-search estimate: ~235.8K;
- United States: ~19.34% (~91.45K visits);
- Brazil: ~3.7% (~17.48K visits).

US organic keyword snapshot:

| Keyword | Volume | CPC USD | Position |
|---|---:|---:|---:|
| `json validator` | **22,200** | **4.36** | 1 |
| `json object validator` | 8,100 | 2.60 | 1 |
| `jsonlint` | 9,900 | 8.62 | 1 |
| `json lint` | 5,400 | 3.02 | 1 |
| `json pretty print` | 4,400 | 3.26 | 1 |

Source:
- https://www.semrush.com/website/jsonlint.com/overview/

## Interpretation

JSON Validator is a particularly clean MenezesDev fit:

- direct commercial signal is much stronger than generic JSON Formatter CPC snapshots;
- substantial repeat/direct usage;
- no server request is needed;
- Phase 2 already approves native `JSON.parse()` / `JSON.stringify()` under input/depth/work limits;
- it strengthens the same developer graph as formatters, Base64, URL encoding, UUID/hash and regex.

The downside is incumbent authority/backlinks (~7.7K referring domains), so rankability should not be over-scored.

### Confidence change

`C -> A`

### Ranking implication

Promote JSON Validator into the evidence-normalized shortlist tier as a higher-value developer utility than JSON Formatter on direct CPC evidence.

---

# 6. JSON Diff — strong adjacent signal, no automatic new candidate

Semrush July 2026 for `jsondiff.com`:

- ~**209.52K visits/month**;
- Authority Score ~44;
- Google organic ~47.41%;
- Direct ~45.42%;
- organic-search estimate ~155.78K;
- current India keyword rows include `json compare` 40.5K and `json diff` 18.1K.

Source:
- https://www.semrush.com/website/jsondiff.com/overview/

This proves that structured-data diff has independent utility demand, but it does **not** automatically expand the candidate universe beyond the recorded 172.

Decision:

- record JSON Diff as an adjacent cluster/opportunity signal;
- later evaluate whether Text Diff can safely/clearly serve JSON comparison or whether a genuinely distinct JSON-aware UX deserves a separate candidate;
- no new URL/count is created solely from this finding.

---

# 7. CSV ↔ JSON — useful evidence, but currentness gap remains

The strongest directly exposed candidate-specific Semrush table found in this pass is from `convertcsv.com`, May 2025:

- ~444K visits/month at that time;
- `json to csv`: 9.9K US volume / $2.73 CPC;
- `csv to json`: 4.4K / $4.00;
- `json to csv converter`: 1.9K / $3.12;
- `xml to csv`: 2.4K / $4.00.

Source:
- https://www.semrush.com/website/convertcsv.com/overview/

This is useful historical evidence that the conversion cluster can carry high CPC, but it is **too old to qualify as current A-confidence evidence in August 2026**.

Decision:

- retain CSV ↔ JSON as promising;
- do not promote to A from stale data;
- Phase 2 remains `CONDITIONAL` through PapaParse for non-trivial CSV and requires the already-recorded limits/Worker/build-regression checks.

---

# 8. Markup / Break-even / Savings Goal / Secure Token — disciplined non-finding

Current searches continue to find many live dedicated tools for Markup, Break-even and Savings Goal, which confirms plausible independent intent. But this pass still did not produce candidate-specific current keyword volume/CPC evidence of the same quality as Margin, URL Encoder, Text Diff or JSON Validator.

Secure Token Generator also remains ambiguous at the search-intent layer because users may express the need as `random string generator`, `token generator`, `random token`, `secret generator` or adjacent UUID/password intents.

Decision:

- do **not** manufacture market scores;
- Markup, Break-even and Savings Goal remain research-hold/B-C until current direct metrics are found;
- Secure Token stays a technical capability with an excellent Web Crypto path, but its URL/intent may need consolidation rather than a standalone launch page.

This non-finding is useful: zero-backend ease does not substitute for evidence of independent search intent.

---

# 9. Batch 3 confidence deltas

| Candidate | Prior posture | New posture | Reason |
|---|---|---|---|
| URL Encoder | B / hold | **A** | current dedicated-domain traffic + repeated $5.44 CPC head terms + strong direct usage |
| URL Decoder | hold | **B-high** | strong paired navigation/intention; standalone current table still missing |
| Text Diff / Compare Text | C | **A** | 2.18M competitor visits; 27.1K `diff checker`; strong direct/repeat |
| JSON Validator | C | **A** | 472.9K competitor visits; 22.2K / $4.36 `json validator` |
| JSON Diff | adjacent/not frozen | **cluster evidence only** | strong dedicated demand but anti-thin gate applies |
| CSV ↔ JSON | C / conditional | **B evidence, not A** | attractive exact metrics exist but strongest exposed table is 2025 |
| Markup | C | **C / continue research** | no normalized direct current metrics found |
| Break-even | C | **C / continue research** | no normalized direct current metrics found |
| Savings Goal | C | **C/B plausibility only** | credible dedicated tools; no direct current volume/CPC table |
| Secure Token | C | **intent-consolidation review** | great technical path; standalone search intent still ambiguous |

---

# 10. Phase 1 implication

The evidence-normalized shortlist is becoming much less speculative.

New likely anchors from this pass:

- URL Encoder;
- Text Diff / Compare Text;
- JSON Validator.

They share a highly attractive property: **meaningful current demand/commercial/repeat evidence with zero ordinary backend compute**.

Phase 1 remains ACTIVE because the >50 shortlist still needs comparable evidence depth across enough candidates. Phase 3 remains NOT STARTED.
