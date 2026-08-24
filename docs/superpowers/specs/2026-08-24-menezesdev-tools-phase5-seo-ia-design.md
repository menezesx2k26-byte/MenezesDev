# MenezesDev Tools — Phase 5 Information Architecture & International SEO Design

**Date:** 2026-08-24  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 5 — Information architecture and international SEO spec  
**Superpowers path:** Architectural  
**Status:** **WRITTEN SPEC — AWAITING USER REVIEW**  
**Parent workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md`  
**Frozen launch matrix:** `docs/tools/LAUNCH50_FROZEN.md`  
**Authority:** design presented to and approved in chat by Gabriel Menezes before this file was written.

---

# 1. Purpose

Define one complete route, indexing, localization and internal-discovery contract for the frozen Launch 50 before mass page generation begins.

This spec is intentionally implementation-independent. Phase 6 will define Astro/module/SDK interfaces that implement this contract.

The SEO architecture must preserve the higher-precedence product rules:

- international English is the primary Tools language;
- PT-BR is the secondary localized surface;
- utility comes before SEO prose;
- no thin doorway pages;
- normal deterministic tool execution remains browser-first;
- commercial/portfolio/demo surfaces remain separate from the monetized Tools surface;
- canonical URLs must remain on the MenezesDev canonical domain even during fallback hosting;
- future autonomous growth may create/modify low-risk SEO assets only inside the approved policy gates.

---

# 2. Design classification and approved approach

This work is **architectural** because it establishes URL contracts, locale relationships, indexing rules and metadata interfaces that future SDK/page generation depends on.

Three approaches were considered.

## Option A — stable shallow category taxonomy — SELECTED

Example:

```text
/tools/calculators/loan-calculator/
/tools/developer/json-validator/
/tools/image/image-resizer/
```

Benefits:

- category semantics are visible in URLs;
- tool URLs remain stable even if topical clusters change;
- internal navigation remains understandable;
- no unnecessary third or fourth hierarchy level;
- easier localized category mapping;
- compatible with static route generation.

## Option B — flat tools namespace — REJECTED

Example:

```text
/tools/loan-calculator/
```

This is simple, but gives up useful category architecture without a meaningful offsetting benefit for Launch 50.

## Option C — deep topical hierarchy — REJECTED

Example:

```text
/tools/calculators/finance/loan-calculator/
```

Finance/math/statistics clusters can change over time. Encoding those secondary clusters into the canonical path makes future taxonomy changes unnecessarily expensive.

**Decision:** use one stable category segment between `/tools/` and the tool slug.

---

# 3. Canonical origin and URL normalization

Canonical public origin:

```text
https://menezesdev.com
```

Canonical metadata must be generated from this configured product origin, never from the current request hostname.

This is mandatory so Cloudflare Pages, GitHub Pages or another approved fallback hostname cannot become a competing SEO origin.

## 3.1 Trailing slash policy

Canonical public content routes use a trailing slash.

Examples:

```text
https://menezesdev.com/tools/calculators/loan-calculator/
https://menezesdev.com/pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/
```

Any deploy/runtime layer that exposes a non-trailing-slash variant should redirect it once to the trailing-slash canonical form.

Avoid redirect chains.

## 3.2 Scheme and host normalization

Production canonical state is:

- HTTPS;
- canonical MenezesDev host;
- trailing slash for content routes;
- lowercase ASCII route slugs;
- hyphen-delimited slugs;
- no duplicate index-file variant.

Temporary provider hostnames never receive self-canonicals to themselves.

## 3.3 Query strings and fragments

Tool input state, filters, search state and UI configuration do not create independent canonical URLs.

Canonical tags always resolve to the base content route unless a future explicitly approved feature defines a genuinely indexable query-based resource.

Fragments never alter canonical identity.

---

# 4. Primary information architecture

English Tools root:

```text
/tools/
```

Launch category segments:

```text
/tools/calculators/
/tools/image/
/tools/text/
/tools/developer/
/tools/files/
/tools/pdf/
```

These are stable URL categories. Secondary topical clusters such as finance, statistics, accessibility or encoding are modeled through metadata, internal links, guide taxonomy and future search/filter facets rather than extra tool-path levels.

## 4.1 Category responsibilities

### `calculators`

Finance, general math, statistics and date calculators whose primary user intent is calculation.

### `image`

Image conversion/editing/compression plus directly image-oriented visual utilities.

### `text`

General writing/text-count/transformation/comparison utilities.

### `developer`

Developer/data/encoding/formatting/cryptographic-identification utilities.

### `files`

General file/archive utilities that are not better represented by a dedicated format category.

### `pdf`

PDF-specific operations.

---

# 5. Frozen Launch-50 English route registry

The following route mapping is part of the Phase-5 contract.

| # | Tool | Canonical English route |
|---:|---|---|
| 1 | Loan Calculator | `/tools/calculators/loan-calculator/` |
| 2 | Compound Interest Calculator | `/tools/calculators/compound-interest-calculator/` |
| 3 | Mortgage Calculator | `/tools/calculators/mortgage-calculator/` |
| 4 | Auto Loan Calculator | `/tools/calculators/auto-loan-calculator/` |
| 5 | Interest Calculator | `/tools/calculators/interest-calculator/` |
| 6 | Amortization Calculator | `/tools/calculators/amortization-calculator/` |
| 7 | Margin Calculator | `/tools/calculators/margin-calculator/` |
| 8 | ROI Calculator | `/tools/calculators/roi-calculator/` |
| 9 | CAGR Calculator | `/tools/calculators/cagr-calculator/` |
| 10 | Investment Growth Calculator | `/tools/calculators/investment-growth-calculator/` |
| 11 | Discount Calculator | `/tools/calculators/discount-calculator/` |
| 12 | Retirement Calculator | `/tools/calculators/retirement-calculator/` |
| 13 | Tip Calculator | `/tools/calculators/tip-calculator/` |
| 14 | Slope Calculator | `/tools/calculators/slope-calculator/` |
| 15 | Proportion Calculator | `/tools/calculators/proportion-calculator/` |
| 16 | Volume Calculator | `/tools/calculators/volume-calculator/` |
| 17 | Percentage Calculator | `/tools/calculators/percentage-calculator/` |
| 18 | Ratio Calculator | `/tools/calculators/ratio-calculator/` |
| 19 | Decimal to Fraction Calculator | `/tools/calculators/decimal-to-fraction-calculator/` |
| 20 | Fraction Calculator | `/tools/calculators/fraction-calculator/` |
| 21 | Image Resizer | `/tools/image/image-resizer/` |
| 22 | JPG to PNG | `/tools/image/jpg-to-png/` |
| 23 | PNG to JPG | `/tools/image/png-to-jpg/` |
| 24 | Word Counter | `/tools/text/word-counter/` |
| 25 | Character Counter | `/tools/text/character-counter/` |
| 26 | Case Converter | `/tools/text/case-converter/` |
| 27 | URL Encoder | `/tools/developer/url-encoder/` |
| 28 | JSON Validator | `/tools/developer/json-validator/` |
| 29 | JSON Formatter | `/tools/developer/json-formatter/` |
| 30 | Base64 Decoder | `/tools/developer/base64-decoder/` |
| 31 | Regex Tester | `/tools/developer/regex-tester/` |
| 32 | Age Calculator | `/tools/calculators/age-calculator/` |
| 33 | Date Difference Calculator | `/tools/calculators/date-difference-calculator/` |
| 34 | Merge PDF | `/tools/pdf/merge-pdf/` |
| 35 | Text Diff / Compare Text | `/tools/text/text-diff/` |
| 36 | Image Compressor | `/tools/image/image-compressor/` |
| 37 | Image Cropper | `/tools/image/image-cropper/` |
| 38 | Color Contrast Checker | `/tools/image/color-contrast-checker/` |
| 39 | Markdown Previewer | `/tools/developer/markdown-previewer/` |
| 40 | UUID Generator | `/tools/developer/uuid-generator/` |
| 41 | Random Password Generator | `/tools/developer/password-generator/` |
| 42 | SHA-256 Hash Generator | `/tools/developer/sha256-hash-generator/` |
| 43 | HTML Formatter | `/tools/developer/html-formatter/` |
| 44 | ZIP Creator | `/tools/files/zip-creator/` |
| 45 | Split PDF | `/tools/pdf/split-pdf/` |
| 46 | Budget Calculator | `/tools/calculators/budget-calculator/` |
| 47 | Random Number Generator | `/tools/calculators/random-number-generator/` |
| 48 | Standard Deviation Calculator | `/tools/calculators/standard-deviation-calculator/` |
| 49 | Aspect Ratio Calculator | `/tools/image/aspect-ratio-calculator/` |
| 50 | Number Base Converter | `/tools/developer/number-base-converter/` |

The registry is keyed by stable Tool SDK ids later; the human-readable route is a separate locale-aware field.

---

# 6. PT-BR route contract

PT-BR root:

```text
/pt-br/ferramentas/
```

Localized category segments:

```text
/pt-br/ferramentas/calculadoras/
/pt-br/ferramentas/imagem/
/pt-br/ferramentas/texto/
/pt-br/ferramentas/desenvolvedor/
/pt-br/ferramentas/arquivos/
/pt-br/ferramentas/pdf/
```

PT-BR routes use localized natural-language slugs rather than mechanically reusing English slugs.

## 6.1 Launch-50 PT-BR route registry

| # | Tool | Canonical PT-BR route |
|---:|---|---|
| 1 | Loan Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/` |
| 2 | Compound Interest Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-juros-compostos/` |
| 3 | Mortgage Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-financiamento-imobiliario/` |
| 4 | Auto Loan Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-financiamento-de-veiculo/` |
| 5 | Interest Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-juros/` |
| 6 | Amortization Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-amortizacao/` |
| 7 | Margin Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-margem/` |
| 8 | ROI Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-roi/` |
| 9 | CAGR Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-cagr/` |
| 10 | Investment Growth Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-crescimento-de-investimentos/` |
| 11 | Discount Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-desconto/` |
| 12 | Retirement Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-aposentadoria/` |
| 13 | Tip Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-gorjeta/` |
| 14 | Slope Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-coeficiente-angular/` |
| 15 | Proportion Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-proporcao/` |
| 16 | Volume Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-volume/` |
| 17 | Percentage Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-porcentagem/` |
| 18 | Ratio Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-razao/` |
| 19 | Decimal to Fraction Calculator | `/pt-br/ferramentas/calculadoras/decimal-para-fracao/` |
| 20 | Fraction Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-fracoes/` |
| 21 | Image Resizer | `/pt-br/ferramentas/imagem/redimensionador-de-imagem/` |
| 22 | JPG to PNG | `/pt-br/ferramentas/imagem/jpg-para-png/` |
| 23 | PNG to JPG | `/pt-br/ferramentas/imagem/png-para-jpg/` |
| 24 | Word Counter | `/pt-br/ferramentas/texto/contador-de-palavras/` |
| 25 | Character Counter | `/pt-br/ferramentas/texto/contador-de-caracteres/` |
| 26 | Case Converter | `/pt-br/ferramentas/texto/conversor-de-maiusculas-e-minusculas/` |
| 27 | URL Encoder | `/pt-br/ferramentas/desenvolvedor/codificador-de-url/` |
| 28 | JSON Validator | `/pt-br/ferramentas/desenvolvedor/validador-de-json/` |
| 29 | JSON Formatter | `/pt-br/ferramentas/desenvolvedor/formatador-de-json/` |
| 30 | Base64 Decoder | `/pt-br/ferramentas/desenvolvedor/decodificador-base64/` |
| 31 | Regex Tester | `/pt-br/ferramentas/desenvolvedor/testador-de-regex/` |
| 32 | Age Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-idade/` |
| 33 | Date Difference Calculator | `/pt-br/ferramentas/calculadoras/diferenca-entre-datas/` |
| 34 | Merge PDF | `/pt-br/ferramentas/pdf/juntar-pdf/` |
| 35 | Text Diff / Compare Text | `/pt-br/ferramentas/texto/comparar-textos/` |
| 36 | Image Compressor | `/pt-br/ferramentas/imagem/compressor-de-imagem/` |
| 37 | Image Cropper | `/pt-br/ferramentas/imagem/recortar-imagem/` |
| 38 | Color Contrast Checker | `/pt-br/ferramentas/imagem/verificador-de-contraste-de-cores/` |
| 39 | Markdown Previewer | `/pt-br/ferramentas/desenvolvedor/visualizador-de-markdown/` |
| 40 | UUID Generator | `/pt-br/ferramentas/desenvolvedor/gerador-de-uuid/` |
| 41 | Random Password Generator | `/pt-br/ferramentas/desenvolvedor/gerador-de-senhas/` |
| 42 | SHA-256 Hash Generator | `/pt-br/ferramentas/desenvolvedor/gerador-de-hash-sha256/` |
| 43 | HTML Formatter | `/pt-br/ferramentas/desenvolvedor/formatador-de-html/` |
| 44 | ZIP Creator | `/pt-br/ferramentas/arquivos/criador-de-zip/` |
| 45 | Split PDF | `/pt-br/ferramentas/pdf/dividir-pdf/` |
| 46 | Budget Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-orcamento-pessoal/` |
| 47 | Random Number Generator | `/pt-br/ferramentas/calculadoras/gerador-de-numeros-aleatorios/` |
| 48 | Standard Deviation Calculator | `/pt-br/ferramentas/calculadoras/calculadora-de-desvio-padrao/` |
| 49 | Aspect Ratio Calculator | `/pt-br/ferramentas/imagem/calculadora-de-proporcao-de-tela/` |
| 50 | Number Base Converter | `/pt-br/ferramentas/desenvolvedor/conversor-de-bases-numericas/` |

Phase 17 may improve localized wording/copy, but once any PT-BR route is first published/indexable its slug becomes stable. A later slug change requires an explicit old→new redirect mapping and all canonical/hreflang/internal-link references must move atomically.

---

# 7. Locale behavior

## 7.1 HTML language

English pages:

```html
<html lang="en">
```

PT-BR pages:

```html
<html lang="pt-BR">
```

## 7.2 No forced geo/language redirect

Do not redirect users by IP, browser locale or inferred geography away from an indexable canonical page.

A user-language suggestion may be shown, but the user controls navigation.

Search crawlers must always be able to access both published locale variants directly.

## 7.3 Locale completeness

Do not emit an `hreflang` target for a locale page that does not exist, is noindexed, redirects, errors or is materially incomplete.

No artificial PT-BR page is created for an intent that Phase 17 determines is not appropriate for PT-BR.

---

# 8. Canonical contract

Every indexable tool/category/guide page emits exactly one static HTML canonical link.

Example English tool:

```html
<link rel="canonical" href="https://menezesdev.com/tools/calculators/loan-calculator/">
```

Example PT-BR tool:

```html
<link rel="canonical" href="https://menezesdev.com/pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/">
```

## 8.1 Localized pages self-canonicalize

Equivalent English and PT-BR pages do **not** canonicalize to one another.

Each localized page is its own canonical and language alternates describe the relationship.

## 8.2 Consistent canonical signals

For a canonical content URL:

- internal links point to the canonical form;
- sitemap contains the canonical form only;
- `rel="canonical"` uses the canonical form;
- redirects normalize duplicate forms to it;
- no fallback hostname appears as canonical.

## 8.3 Static HTML canonical

Canonical markup is present in the server/static HTML output. Client JavaScript must not mutate it to a conflicting URL.

---

# 9. `hreflang` contract

`hreflang` is emitted in the static `<head>`.

For a complete English/PT-BR pair:

```html
<link rel="alternate" hreflang="en" href="https://menezesdev.com/tools/calculators/loan-calculator/">
<link rel="alternate" hreflang="pt-BR" href="https://menezesdev.com/pt-br/ferramentas/calculadoras/calculadora-de-emprestimo/">
```

Rules:

1. both pages list both published variants;
2. each page includes itself in the alternate set;
3. reciprocal annotations are mandatory;
4. URLs are absolute HTTPS canonical URLs;
5. only published/indexable locale variants participate;
6. HTML-head annotations are the canonical implementation source;
7. do not duplicate the same locale mapping independently in HTML, HTTP headers and sitemap unless a later technical need justifies the maintenance cost.

## 9.1 `x-default`

Launch 50 does not emit `x-default` on every tool page.

`x-default` is reserved for a genuine language/default selector page if such a surface is later created.

The English tool itself is not mislabeled as an `x-default` selector.

---

# 10. Tool-page content hierarchy

Tool pages are utility-first.

Recommended semantic order:

```text
H1 + concise purpose
interactive tool
result/output region
how it works
formula/method when applicable
worked example
limitations / edge cases
privacy behavior
useful FAQ copy
related tools
relevant guide links
```

There is no minimum word count.

Do not place long prose ahead of the primary utility merely to target keywords.

## 10.1 Deterministic examples

Where a tool engine can generate an example or formula result deterministically, editorial copy should source that value from the tested engine/fixture rather than manually inventing it.

This also creates a future fact source for the Phase-21 AI Editorial Engine.

---

# 11. Title, H1 and meta-description contract

## 11.1 Page title

Every indexable page has one unique, concise title that begins with or naturally contains the primary user intent.

Default tool pattern:

```text
<Primary Tool Name> — Free Online Tool | MenezesDev
```

The exact copy may be shortened where the tool name already makes the intent obvious.

Do not keyword-stuff synonyms into title tags.

There is no fake hard character limit; copy should be concise enough to remain useful when Search truncates it.

## 11.2 H1

Exactly one primary H1 identifies the current tool/guide intent.

The H1 may be slightly more natural than the title tag but must not target a conflicting intent.

## 11.3 Meta description

Each indexable page has a useful, truthful summary written for the likely searcher.

Meta descriptions:

- are unique where practical;
- do not promise unsupported features;
- do not list repeated keywords;
- may mention the local/private processing advantage where true;
- avoid fake urgency/freshness.

Descriptions are treated as snippet guidance, not a ranking guarantee.

---

# 12. Category-page contract

Category pages are navigation hubs, not keyword-list dumps.

A category page includes:

- clear category H1;
- concise explanation of the group;
- searchable/filterable list of currently published tools;
- meaningful subcluster groupings where useful;
- links to relevant guides;
- no copied description block repeated from every tool page.

## 12.1 Category indexing threshold

A category hub is indexable only when it has either:

1. at least **3 complete published tools**, or
2. independently useful category/navigation content strong enough to justify the URL.

Otherwise it remains accessible to users but `noindex,follow` until the threshold is met.

This prevents thin launch hubs such as a one-tool files category from being indexed merely because the URL hierarchy exists.

---

# 13. Breadcrumb contract

Visible breadcrumbs are used on tool and guide pages.

English tool example:

```text
Home > Tools > Calculators > Loan Calculator
```

PT-BR:

```text
Início > Ferramentas > Calculadoras > Calculadora de Empréstimo
```

The category link uses the canonical category route even when the category hub is temporarily noindexed.

Breadcrumb labels follow the user-facing hierarchy, not blindly the literal URL tokens.

---

# 14. Related-tool graph

Every Launch-50 tool declares a small set of strong related-tool edges.

Default target:

- 3–6 directly useful related tools;
- fewer when fewer truly useful relations exist;
- category hub link separately;
- cross-category links allowed when user intent justifies them.

Do not create a sitewide list of all 50 tools on every tool page.

Examples:

```text
Mortgage Calculator
├── Loan Calculator
├── Amortization Calculator
├── Interest Calculator
└── Compound Interest Calculator
```

```text
JSON Validator
├── JSON Formatter
├── URL Encoder
├── Base64 Decoder
└── Regex Tester
```

The graph is modeled in structured registry metadata so future Phase-21 automation can improve links without scraping rendered HTML.

---

# 15. Guides architecture

Canonical English editorial root:

```text
/guides/
```

Guide categories may include:

```text
/guides/finance/
/guides/math/
/guides/image/
/guides/developer/
/guides/text/
/guides/files/
/guides/pdf/
```

Example routes:

```text
/guides/finance/margin-vs-markup/
/guides/finance/how-compound-interest-works/
/guides/developer/what-is-base64/
/guides/image/jpeg-vs-png/
```

A guide exists only for a distinct informational intent.

There is no one-tool-one-guide quota.

Initial launch may contain a small set of high-quality pillar/golden-example guides.

## 15.1 PT-BR guides

PT-BR guide localization is not required merely because a tool has PT-BR localization.

If/when a guide is deliberately localized, use:

```text
/pt-br/guias/<categoria>/<slug>/
```

and apply the same self-canonical/reciprocal-hreflang rules.

---

# 16. Internal search contract

Launch search uses a local client-side index.

Per-locale index fields include:

- stable tool id;
- title;
- localized title;
- aliases;
- user-language intents;
- keywords;
- category;
- canonical route;
- short description.

The index contains public metadata only.

## 16.1 Search state is not an SEO surface

Preferred Launch pattern:

```text
/tools/#q=json
```

or an equivalent client-only state.

Do not generate crawlable/indexable result pages for arbitrary internal search terms.

If a routable search page is added later, it defaults to `noindex,follow` and is excluded from sitemaps.

Search-query variants do not receive canonical URLs pretending to be independent content.

## 16.2 `missing_search`

The future telemetry event records only privacy-safe aggregate unmet intent after Phase 18 privacy controls exist.

Never store pasted tool content or sensitive user data as a search-discovery shortcut.

---

# 17. Index / noindex contract

## 17.1 Index by default only when complete

Indexable surfaces:

- complete canonical Launch tool pages;
- category hubs meeting section 12.1;
- substantive guides with independent intent;
- Tools root if it provides useful navigation/discovery.

## 17.2 Noindex or do not generate

Default non-index surfaces:

- internal search-result routes;
- filter/sort/facet states;
- draft/preview/editorial staging pages;
- test/QA routes;
- incomplete locale variants;
- thin category hubs below the threshold;
- user-specific tool state/results;
- duplicate URL variants;
- fallback-provider duplicate content.

Prefer not generating unnecessary public routes over generating large numbers of `noindex` pages.

## 17.3 Robots nuance

Do not block a URL in `robots.txt` when Google must crawl it to observe a `noindex` directive.

Where a page should not exist publicly, return the correct status code or remove the route rather than relying on robots exclusion.

---

# 18. HTTP/status behavior

- valid canonical content: `200`;
- permanent URL replacement: one-hop `301`/`308` policy selected consistently in implementation;
- nonexistent tools/categories/guides: real `404`;
- removed content with no replacement: `404` or `410` according to release policy;
- never redirect unrelated deleted tools to `/tools/` merely to avoid 404s;
- avoid soft 404 templates that return `200` for missing content.

---

# 19. Sitemap architecture

Tools SEO uses a sitemap index rather than one unstructured file as the platform grows.

Conceptual output:

```text
/sitemap-index.xml
├── sitemap-site.xml
├── sitemap-tools-en.xml
├── sitemap-tools-pt-br.xml
└── sitemap-guides-en.xml
```

A future PT-BR guide sitemap is added only when localized guides exist.

## 19.1 Sitemap inclusion

Include only:

- canonical absolute HTTPS URLs;
- indexable routes;
- successful `200` content;
- intended public locale variants.

Exclude:

- noindex category/search pages;
- redirects;
- preview/test routes;
- query-state URLs;
- provider fallback hostnames.

## 19.2 `lastmod`

`lastmod` changes only when the page receives a meaningful content/tool update.

Do not bump every URL daily or on every build.

## 19.3 Ignored sitemap fields

Do not spend implementation effort on `<priority>` or `<changefreq>` for Google Search; current Google guidance says it ignores these values.

---

# 20. `robots.txt` contract

`robots.txt` is generated for the canonical product host.

Requirements:

- do not block canonical public Tools content;
- do not block JS/CSS assets required for rendering;
- reference the sitemap index;
- do not use robots rules as a substitute for authentication/privacy;
- avoid blocking noindex pages if crawling is required to observe `noindex`;
- preview/private environments should be protected at the environment/access layer, not trusted to `robots.txt` alone.

Fallback hosts should default to preventing independent indexing through host/deploy policy and canonical metadata; if a fallback becomes the public delivery origin behind the canonical domain, canonical-domain behavior remains unchanged.

---

# 21. Structured-data policy

Structured data is used only where the visible page and current Google eligibility support it.

## 21.1 `BreadcrumbList` — APPROVED

Use on visible tool/category/guide breadcrumb trails.

Markup must match the visible hierarchy and canonical URLs.

## 21.2 Article/BlogPosting — CONDITIONAL FOR GUIDES

A substantive editorial guide may use appropriate Article/BlogPosting markup when:

- the page is genuinely editorial content;
- author/publisher/date values are real;
- visible content matches the markup;
- no unsupported claims are invented merely for schema completeness.

## 21.3 FAQ rich-result markup — DO NOT IMPLEMENT

Google deprecated FAQ rich results effective 2026-05-07.

Tool pages may still contain useful human-readable FAQ sections, but Launch should not build FAQ structured-data machinery for a Google rich result that no longer appears.

## 21.4 `QAPage` — NOT FOR TOOL FAQ

Do not use `QAPage` for a normal tool-page FAQ. It is intended for pages centered on a question with answer contributions, not a product FAQ block.

## 21.5 `SoftwareApplication` — OFF BY DEFAULT

Do not add app structured data to every utility merely because the page runs software.

Only add it later if the page genuinely meets current Google eligibility and we can truthfully satisfy its required/recommended properties.

Never fabricate reviews, ratings, price, offers or install metadata.

## 21.6 Generic schema is not a ranking ritual

Schema.org vocabulary that does not unlock a useful/search-supported feature is not added merely to maximize the number of JSON-LD objects.

---

# 22. Social metadata

Indexable Tools/guides should expose truthful basic sharing metadata:

- Open Graph title;
- description;
- canonical URL;
- appropriate type;
- representative image only when a real useful asset exists.

Do not create large image-generation requirements for every trivial utility solely to fill social-card fields.

Social metadata does not replace SEO canonical metadata.

---

# 23. Performance / rendering SEO contract

Search-critical content is present in static HTML where practical:

- title;
- meta description;
- canonical;
- hreflang;
- H1;
- concise purpose;
- primary explanatory content;
- breadcrumb;
- related-tool links;
- guide links.

Interactive engines hydrate on the client.

Heavy dependencies are lazy-loaded after tool interaction or when the specific route needs them.

Examples:

```text
static HTML
   ↓
user starts operation
   ↓
lazy import / Web Worker / WASM where required
```

The search crawler must not need to execute a heavy PDF/image/formatter engine merely to discover the page's meaning and internal links.

Ad layout space should be reserved where Phase 14 enables monetization so SEO/CWV content is not destabilized by ad insertion.

---

# 24. Anti-thin / cannibalization rules

A new URL must pass all of the following:

1. genuinely distinct user/search intent;
2. distinct enough utility or informational purpose;
3. not better served as a mode/state of an existing canonical tool;
4. not a query/filter/number/file-extension permutation generated only for search volume;
5. enough unique useful content/interaction to avoid near-duplicate clustering.

Existing Phase-1 consolidation decisions remain binding, including:

- Simple Interest lives inside Interest Calculator;
- JSON Minifier lives inside JSON Formatter;
- File Hash lives as bounded file mode inside SHA-256 Hash Generator;
- numeric base directions live inside Number Base Converter.

Canonical tags are not used as an excuse to publish avoidable thin duplicates.

---

# 25. Internal-linking policy

Internal linking serves user navigation first.

Rules:

- descriptive anchor text;
- no exact-match keyword stuffing across every page;
- category hubs link to their canonical tools;
- tools link back to category hubs and selected related tools;
- guides link to tools they genuinely help users apply;
- tools may link to guides that answer a distinct nearby informational need;
- avoid orphan canonical pages;
- no sitewide hidden link blocks.

The future autonomous system may adjust low-risk related-tool/internal-link edges under the Option-B whitelist, but it cannot create new route taxonomy or intent policy by itself.

---

# 26. Finance/YMYL editorial constraint

Finance calculators are educational utility pages, not individualized financial advice.

Rules:

- formulas and assumptions are explicit;
- default values are labeled as examples, not recommendations;
- no guaranteed-return claims;
- no individualized investment/retirement recommendation language;
- material factual assumptions can be sourced/revalidated;
- tool output is presented as calculation based on user inputs.

Phase 16 English editorial QA and future Phase-21 AI Editorial automation must honor these constraints.

---

# 27. Search/AI feature posture

Do not build a separate “GEO/AEO” content system for Launch 50.

The architecture optimizes the underlying page quality that Google says remains relevant to Search and generative Search experiences:

- useful original utility;
- clear crawlable text;
- logical navigation;
- canonical consistency;
- real expertise/factual grounding where needed;
- non-commodity content;
- no scaled spam.

No `llms.txt` or AI-specific file becomes a Launch-50 SEO requirement unless a later approved design identifies a concrete supported use.

---

# 28. Route-change governance

Before first public indexing, implementation details may fix a genuine typo/inconsistency in this spec through the normal design-review process.

After a canonical route has shipped/indexed, changing it requires:

1. documented reason;
2. old→new one-hop redirect;
3. updated canonical;
4. updated hreflang pairs;
5. updated sitemap;
6. updated internal links;
7. Search Console observation after release;
8. no mass unrelated redirects.

Autonomous Phase-21 content optimization does not have authority to rename canonical tool routes by itself.

---

# 29. Implementation data contract for Phase 6

Phase 6/Tool SDK design must be able to represent, at minimum:

```ts
seo: {
  canonicalPath: string
  indexPolicy: "index" | "noindex"
  title: string
  description: string
  hreflang: Array<{
    locale: "en" | "pt-BR"
    path: string
  }>
  breadcrumbs: BreadcrumbItem[]
  structuredData: StructuredDataKind[]
}

localization: {
  locale: "en" | "pt-BR"
  routeSlug: string
  categorySlug: string
}

relations: {
  relatedToolIds: string[]
  guideIds?: string[]
  topicalClusters?: string[]
}
```

The exact TypeScript names may change in Phase 6, but the semantics above are required.

Canonical URL generation must use the configured MenezesDev canonical origin rather than request-host inference.

---

# 30. Phase-5 validation checklist

The Phase-5 contract is complete only if all of these are true:

- [x] stable route taxonomy defined;
- [x] exact English Launch-50 canonical routes defined;
- [x] PT-BR localized route contract and exact Launch mapping defined;
- [x] category rules defined;
- [x] breadcrumbs defined;
- [x] related-tool graph policy defined;
- [x] canonical logic defined;
- [x] hreflang logic defined;
- [x] sitemap strategy defined;
- [x] robots behavior defined;
- [x] structured-data applicability defined;
- [x] category-page indexing requirements defined;
- [x] index/noindex rules defined;
- [x] page-title/meta rules defined;
- [x] internal-search indexing contract defined;
- [x] guide route policy defined;
- [x] fallback-host canonical protection defined;
- [x] anti-thin/cannibalization policy defined;
- [x] performance/static-HTML requirements defined;
- [x] finance/YMYL editorial constraint carried forward.

No mass page generation begins until this written spec passes user review under Superpowers governance.

---

# 31. Current Google Search documentation revalidated for this design

The following official documentation was rechecked on 2026-08-24 while preparing the Phase-5 design:

- URL canonicalization: `https://developers.google.com/search/docs/crawling-indexing/canonicalization`
- canonical troubleshooting: `https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting`
- localized versions / hreflang: `https://developers.google.com/search/docs/specialty/international/localized-versions`
- sitemap guidance: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`
- breadcrumb structured data: `https://developers.google.com/search/docs/appearance/structured-data/breadcrumb`
- current Search documentation updates: `https://developers.google.com/search/updates`

Notable current facts reflected in this spec:

- canonical is a strong signal/hint, not an absolute command to Google;
- self-consistent canonical/internal-link/sitemap signals matter;
- localized equivalents should use reciprocal hreflang rather than cross-language canonical collapse;
- FAQ rich results were deprecated effective 2026-05-07;
- Google ignores sitemap `priority` and `changefreq`;
- normal SEO fundamentals remain the foundation for generative Search experiences.

---

# 32. Non-goals of Phase 5

Phase 5 does not:

- implement Astro routes;
- create the Tool SDK;
- install dependencies;
- build pages;
- implement AdSense;
- implement Traffic Guard/Cost Guard;
- activate Search Console telemetry;
- create the AI Editorial backend;
- create the Trend Radar/crawler;
- publish Launch 50;
- merge Tools work to `main`.

Those remain governed by later phases.

---

# 33. Phase-5 gate state

Workflow gate:

> complete route/SEO contract before mass page generation.

This document contains the complete proposed contract and has passed the design-approval step in chat.

Under Superpowers governance, the remaining gate before this spec is treated as fully approved/closed is **user review of the written committed spec**.

Until that review is approved:

- Phase 5 is not marked closed;
- Phase 6 does not begin;
- no implementation plan or runtime code begins.
