# MenezesDev Tools — Phase 2 Coverage for Working Shortlist 80 R4

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 2 — OSS Capability Audit  
**Input pool:** `docs/tools/MARKET_SHORTLIST_80_WORKING_R4.md`  
**Status:** ACTIVE COVERAGE PASS — not Phase-2 closure, not Capability Map

---

# 1. Headline result

After R4 replacements, the exact technical distribution is:

- **64/80** clear/internal/local-bounded;
- **16/80** local-conditional;
- **0/80** ordinary backend processing required;
- **0/80** HOLD/UNRESOLVED capability dependencies;
- **80/80** expected to execute with **0 MenezesDev backend-processing requests per ordinary operation**.

R4 therefore improves the risk profile from 63/17 to **64/16** while improving market strength.

---

# 2. Category recount

| Category | Total | Clear/internal/bounded | Local-conditional | Backend-required | Hold/unresolved |
|---|---:|---:|---:|---:|---:|
| Finance/business | 18 | 18 | 0 | 0 | 0 |
| Math/general | 12 | 12 | 0 | 0 | 0 |
| Image/color | 11 | 8 | 3 | 0 | 0 |
| Text/writing | 5 | 5 | 0 | 0 | 0 |
| Developer/data | 22 | 17 | 5 | 0 | 0 |
| Date/time | 3 | 3 | 0 | 0 | 0 |
| Archive/file | 2 | 1 | 1 | 0 | 0 |
| Structural PDF | 7 | 0 | 7 | 0 | 0 |
| **Total** | **80** | **64** | **16** | **0** | **0** |

---

# 3. What changed from the earlier coverage pass

## Added clear/internal

- Decimal to Fraction Calculator — exact decimal-string -> BigInt rational + GCD;
- Random Number Generator — Web Crypto + unbiased rejection sampling;
- Retirement Calculator and Budget Calculator were already admitted as clear/local in earlier R2 work;
- Number Base Converter and Binary Translator were already admitted as clear/local in R3.

## Removed/demoted

- File Type Detector — was `LOCAL-CONDITIONAL`; now reserve;
- Remove Duplicate Lines — was internal/clear; now reserve.

Net change versus the previous 63/17 baseline:

- clear: +1;
- conditional: -1;
- backend/HOLD: unchanged at 0.

---

# 4. Conditional risk remains concentrated

The 16 conditional rows still come from a small number of families:

1. Image Compressor;
2. WebP to PNG runtime capability path;
3. Image Metadata Viewer / ExifReader;
4. HTML Formatter / Prettier;
5. JavaScript Formatter / Prettier;
6. CSS Formatter / Prettier;
7. CSV to JSON / PapaParse;
8. JSON to CSV / PapaParse/CSV export policy;
9. ZIP Extractor / zip.js security wrapper;
10–16. seven structural PDF operations through the same audited structural engine family.

This is strategically useful: conditional count is not 16 unrelated engineering risks. It is a few shared admission decisions that fan out to multiple tools.

---

# 5. Clear/local families are now deep enough to cut hard

R4 already contains 64 clear/local candidates, which is more than the eventual Launch 50 count by itself.

That does **not** mean Launch 50 should consist only of clear rows. It means market selection can be strict without being held hostage by unresolved technology.

The project can now:

- demote weak conditional tools when their market value does not justify admission work;
- keep a few conditional tools when they provide important market/architectural coverage;
- preserve the 70/20/10 portfolio principle without introducing backend compute merely to add variety.

---

# 6. Phase-2 next work becomes survivor-driven

Do not finalize all 16 conditional rows immediately.

Next sequence:

1. continue Phase-1 cut/replacement pressure;
2. identify the final >50 survivor pool;
3. count which conditional families actually remain;
4. finalize exact dependency/config/hostile-input gates only for those survivors;
5. only then declare the Phase-2 exit gate satisfied.

This avoids spending security/audit effort on a conditional tool that market evidence will later cut anyway.

Phase 3 remains **NOT STARTED**.
