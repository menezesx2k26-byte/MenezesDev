# MenezesDev Tools — Phase 7 Security Design and Threat Model

**Date:** 2026-08-26  
**Branch:** `feat/tools-oss-catalog`  
**Workflow phase:** Phase 7 — Security design and threat-model consolidation  
**Superpowers path:** Architectural  
**Status:** **WRITTEN SPEC — AWAITING USER REVIEW**  
**Parent workflow:** `docs/tools/IMMUTABLE_WORKFLOW.md`  
**Binding security:** `docs/tools/SECURITY_POLICY.md`  
**Binding portability:** `docs/tools/addenda/2026-08-24_DEPLOYMENT_PORTABILITY_AND_FALLBACK.md`  
**Approved architecture:** `docs/superpowers/specs/2026-08-24-menezesdev-tools-phase6-architecture-design.md`  
**Capability limits:** `docs/tools/CAPABILITY_MAP.md`  
**Frozen launch portfolio:** `docs/tools/LAUNCH50_FROZEN.md`

**Approval record:** the concrete Phase-7 design was presented in chat before this file existed. On 2026-08-26 Gabriel instructed `Prossiga com as implementações`. In context, this is treated as approval to proceed with the already-presented Phase-7 design and write/self-review this spec. It does not approve this subsequently written spec, Phase 8, Phase 9, dependencies, or runtime code in advance.

---

# 1. Purpose

Convert the binding security policy and existing Capability Map profiles into concrete, testable SDK/runtime security gates for the frozen Launch 50.

Phase 7 defines:

- threat model and trust boundaries;
- build-time security-profile resolution;
- resource budgets;
- pre-parse guards;
- format sniffing and structural preflight;
- Worker isolation and hard watchdog semantics;
- safe rendering/output contracts;
- CSP and browser network authority;
- PDF/image/archive/structured-text/regex controls;
- error sanitization and telemetry privacy;
- hostile fixture taxonomy;
- dependency/security admission hard stops;
- future SSRF boundary requirements without creating a URL-fetch path;
- provider/fallback security expectations;
- CI invariants that prove those controls.

Phase 7 does **not** implement the SDK, install dependencies, create the integration branch, design Traffic Guard/Cost Guard policy, or enable Ads/analytics providers.

---

# 2. Governing invariants

The following are non-negotiable:

1. all user-controlled input is untrusted;
2. every applicable flow follows `validate -> bound -> sanitize/canonicalize -> process -> encode safe output`;
3. no parser receives unbounded input;
4. no Launch-50 ordinary operation requires MenezesDev backend processing;
5. browser Worker means local isolation, not backend execution;
6. tool engines/boundaries/workers have no ambient network authority by default;
7. active document behavior is disabled/rejected unless a separately reviewed capability explicitly requires it;
8. user content never enters telemetry;
9. conditional dependencies remain conditional until their admission gates pass;
10. security gates are not weakened to preserve a frozen Launch-50 slot;
11. fallback hosting must preserve application-level security or disable the affected capability/Ads rather than silently weaken it;
12. CSP is defense in depth, not a substitute for correct output encoding/sanitization.

---

# 3. Threat model

## 3.1 Protected assets

Protect at minimum:

- browser availability/responsiveness;
- user device memory/CPU;
- user-provided private files/text;
- generated private outputs/secrets;
- canonical application origin and DOM integrity;
- analytics/telemetry privacy boundary;
- ad/account integrity;
- static-site availability;
- dependency/runtime integrity;
- future backend/edge resources from accidental exposure;
- SEO/canonical integrity against untrusted runtime state.

## 3.2 Adversary capabilities

Assume an attacker can:

- paste arbitrary text;
- submit arbitrarily malformed files within browser-selection limits;
- lie through filename, extension and `File.type`;
- construct pathological JSON/XML/CSV/regex/Markdown/HTML;
- construct compressed/decompression-bomb-like documents;
- submit files with active content or misleading headers;
- repeatedly trigger operations;
- cancel/restart operations rapidly;
- attempt to induce huge output allocations;
- craft parser error strings containing attacker-controlled data;
- manipulate query/hash/UI state;
- attempt to trigger remote requests from rendered content;
- attempt to exploit third-party parser/codec bugs.

For Launch 50, the attacker does **not** receive a public MenezesDev server-side arbitrary URL fetch or general server compute endpoint.

## 3.3 Trust boundaries

```text
untrusted UI input
      ↓
PRE-PARSE GUARD
      ↓
allowlisted boundary
      ↓
typed canonical input
      ↓
allowlisted engine/runtime
      ↓
typed bounded result
      ↓
approved output sink
```

Separate trust boundaries also exist around:

```text
third-party parser/codec output
Worker messages
WASM boundary
browser file metadata
parser errors
rendered rich content
analytics adapter
Ads provider
host/security headers
future URL/network adapters
```

None become trusted merely because they are local or bundled.

---

# 4. Selected security architecture

Three approaches were considered conceptually:

1. bespoke security logic per tool — rejected because limits and dangerous exceptions drift;
2. one global fixed limit set — rejected because numeric, text, image, regex and PDF risks differ materially;
3. **finite security profiles + build-time resolution + per-tool tightening + specialized hostile-input gates** — selected.

Canonical relationship:

```text
ToolDefinition
     ↓ profileId
Security Profile Registry
     ↓
Build-time Security Resolver
     ↓
ResolvedSecurityPolicy
     ↓
Boundary + Runtime + CI
```

---

# 5. Security profile registry

Profiles are versioned, finite, allowlisted data.

Conceptual contract:

```ts
interface SecurityProfileDefinition {
  id: SecurityProfileId
  inputClass: SecurityInputClass
  limits: SecurityLimits
  runtime: SecurityRuntimePolicy
  formatPolicy: FormatPolicy
  outputPolicy: OutputPolicy
  richOutput: "none" | "sanitized-markup"
  networkAuthority: "none"
  activeContent: "disabled" | "required-reviewed"
  hostileFixtureClasses: HostileFixtureClass[]
}
```

A ToolDefinition references the profile id; it does not embed executable guards.

Executable guards resolve through allowlisted boundary/runtime code from Phase 6.

---

# 6. Resolved security policy

Build-time resolution produces an immutable object equivalent to:

```ts
interface ResolvedSecurityPolicy {
  toolId: ToolId
  profileId: SecurityProfileId
  inputClass: SecurityInputClass
  limits: ResolvedSecurityLimits
  runtime: ResolvedRuntimeSecurity
  acceptedFormats: readonly AcceptedFormat[]
  output: ResolvedOutputPolicy
  networkAuthority: "none"
  activeContent: "disabled" | "required-reviewed"
  sanitizationStrategy: SanitizationStrategyId
  hostileFixtureClasses: readonly HostileFixtureClass[]
}
```

The runtime consumes the resolved policy; it does not infer limits from UI widgets or dependency defaults.

---

# 7. Per-tool override rule

A per-tool override may **tighten** a profile by default.

Examples allowed without redefining the profile:

- max text 2 MiB -> 512 KiB;
- max output 5 MiB -> 1 MiB;
- max page count 500 -> 100;
- timeout 3 s -> 1 s;
- accepted formats `[jpeg,png,webp]` -> `[jpeg,png]`.

A ToolDefinition may not silently loosen a hard profile cap.

The build validator rejects an override that increases a maximum, adds a protocol/format, changes `activeContent` from disabled, enables network authority, or weakens the required runtime isolation.

Loosening a security profile is a security-design change requiring explicit review at the appropriate authority level; it is not a normal ToolDefinition edit.

---

# 8. Canonical security profiles and hard limits

The Phase-3 Capability Map remains the source for Launch limits. Phase 7 turns them into enforceable contracts.

## `N-FIN` — finance numeric

- numeric token <=128 chars;
- finite values only;
- <=32 ordinary input fields;
- schedules/terms <=1,200 periods/rows;
- output table <=1,200 rows;
- deterministic formula/rounding fixtures required;
- user financial values prohibited from telemetry.

## `N-MATH` — scalar math

- numeric token <=128 chars;
- <=64 scalar inputs unless tightened;
- finite/domain validation mandatory;
- output <=1 MiB.

## `N-LIST` — numeric list/statistics

- source text <=2 MiB;
- <=100,000 parsed numbers;
- numeric token <=128 chars;
- output <=2 MiB;
- Worker threshold required when work can block the UI.

## `T-TEXT` — ordinary text

- input <=2 MiB;
- output <=4 MiB;
- semantic identity preserved when the tool requires it;
- text-safe sinks only;
- pasted text prohibited from telemetry.

## `T-DIFF` — text diff

- each side <=1 MiB;
- Worker for non-trivial input;
- hard timeout <=3,000 ms;
- result/render payload <=5 MiB;
- text-safe sinks only.

## `S-JSON`

- input <=2 MiB;
- depth <=128;
- traversed nodes <=200,000;
- output <=5 MiB;
- Worker above implementation threshold;
- parsed objects never merged into application config/state;
- text output only.

## `S-XML`

- input <=2 MiB;
- reject `<!DOCTYPE` before parse;
- depth <=128;
- nodes <=200,000;
- output <=5 MiB;
- no external entity/resource fetch;
- parsed nodes never inserted into visible app DOM.

## `S-CSV`

- total input <=10 MiB;
- rows <=200,000;
- columns <=256;
- individual field <=1 MiB;
- output <=25 MiB;
- Worker/chunking above threshold;
- spreadsheet-formula-injection export policy mandatory.

## `M-MARKDOWN`

- input <=1 MiB;
- Worker parsing above threshold;
- timeout <=3,000 ms;
- generated HTML <=4 MiB;
- fixed Markdown parser profile;
- raw HTML disabled;
- approved restricted sanitizer before preview;
- no arbitrary plugin/config loading.

## `F-HTML`

- input <=1 MiB;
- dedicated Worker;
- timeout <=3,000 ms;
- output <=4 MiB;
- formatted output is text only and never executed;
- no user plugins/config-file loading.

## `R-REGEX`

- pattern <=10 KiB;
- test input <=1 MiB;
- disposable Worker;
- hard timeout <=1,500 ms;
- match/result count <=10,000;
- Worker terminated on timeout/cancel.

## `C-SECRET`

- configurable generated length <=4,096 chars;
- Web Crypto only for security-oriented randomness;
- rejection sampling for bounded alphabets/ranges;
- generated values prohibited from telemetry/logging.

## `H-HASH`

- text <=10 MiB;
- file <=100 MiB;
- browser-local bytes only;
- content prohibited from telemetry;
- fixed-size digest output.

## `I-RASTER`

- encoded input <=25 MiB;
- width <=12,000 px;
- height <=12,000 px;
- decoded pixels <=80 MP;
- output <=50 MiB;
- actual format verified from bytes/decode behavior;
- no server upload.

## `I-META`

- file <=25 MiB;
- parser work bounded;
- metadata output <=5 MiB;
- local File/ArrayBuffer only;
- extracted strings remain untrusted text.

## `I-SVG`

- SVG <=5 MiB;
- script/active external resources disabled/rejected;
- raster output <=20 MP;
- timeout <=5,000 ms;
- raster output <=50 MiB.

## `A-ZIP-CREATE`

- total source bytes <=100 MiB;
- entries <=1,000;
- individual entry <=50 MiB;
- output <=150 MiB;
- sanitized archive entry names;
- Worker/stream path for non-trivial sets.

## `P-PDF`

- aggregate compressed input <=75 MiB;
- aggregate pages <=500;
- output <=100 MiB;
- dedicated Worker;
- hard operation watchdog <=15,000 ms;
- malformed/decompression-bomb corpus mandatory;
- encrypted/unsupported inputs rejected;
- active PDF behavior never executed.

## `D-DATE`

- civil year range 1..9999 unless a later approved implementation proves broader semantics;
- generated duration rows/segments <=1,000;
- explicit timezone/calendar semantics;
- no network dependency.

---

# 9. Boundary order

The runtime must enforce this order where applicable:

```text
raw input
  ↓
cheap metadata/length guard
  ↓
raw byte/char count
  ↓
format/signature/structural preflight
  ↓
semantic validation
  ↓
canonicalization/sanitization
  ↓
expensive parser/decoder/engine
  ↓
output bound
  ↓
safe encoding/rendering
```

Expensive dependencies should not be loaded merely to discover that an input exceeds a cheap known limit.

---

# 10. Raw byte/character counting

Byte limits are measured from the actual data representation consumed by the parser, not only UI character count.

For text:

- raw string character/code-point policy is explicit per tool;
- UTF-8 byte size uses a standards-based encoder when byte caps matter;
- normalization is not performed before identity-sensitive tools such as hash/diff unless tool semantics explicitly require it.

For files:

- `File.size` is an early upper-bound signal;
- when actual ArrayBuffer/stream bytes are consumed, runtime guards verify the consumed length;
- filename/extension/`File.type` never substitute for content validation.

---

# 11. File signature and structural sniffing

Binary tools use a layered allowlist:

1. expected tool-selected format family;
2. byte signature/header inspection where meaningful;
3. lightweight structural preflight;
4. decoder/parser confirmation;
5. emitted output format verified by the encoder path.

Signature validation is not treated as sufficient by itself.

Mismatch behavior:

- explicit supported mismatch that can be safely identified -> `UNSUPPORTED_FORMAT` or user-selectable correction;
- ambiguous/polyglot/suspicious structure -> reject;
- never silently trust extension.

---

# 12. Image preflight

For raster image tools:

1. reject encoded bytes above profile cap;
2. identify supported PNG/JPEG/WebP signatures/containers as applicable;
3. obtain width/height from safely bounded header parsing where practical;
4. reject width/height above 12,000 px or total pixels above 80 MP before full decode where possible;
5. decode only after preflight;
6. verify decoded dimensions again;
7. bound output dimensions/bytes;
8. use local Blob output;
9. revoke Object URLs when replaced/reset/navigation completes.

If safe header preflight is not possible for a format/browser path, the decoder path must still be isolated/bounded and the feature may be conditional rather than receiving a fake guarantee.

---

# 13. Raster sanitizing conversions

When a tool's purpose includes stripping metadata or reconstructing a raster:

```text
validated supported input
   ↓
decode pixels
   ↓
canonical pixel surface
   ↓
new encode
```

Do not promise universal metadata sanitization unless tests prove the exact metadata classes and formats removed.

Color profile/quality behavior must be documented/tested before claims are made.

---

# 14. Structured text preflight

## JSON

- input bytes first;
- pre-scan depth/token/node risk where practical before building large derived structures;
- parse failures normalize to safe error codes;
- object keys never gain authority to modify app config/prototypes;
- output is text, not executable object injection.

## XML

- reject `<!DOCTYPE` before parser invocation;
- no external entities/resources;
- enforce depth/node/output limits;
- output remains text-safe.

## CSV

- enforce bytes/rows/columns/field caps;
- streaming/chunked parse when needed;
- exported CSV must apply the approved spreadsheet-formula-injection policy;
- no cell becomes HTML automatically.

---

# 15. Regex sandbox

User regex runs only in a disposable dedicated Worker.

Canonical lifecycle:

```text
spawn Worker
  ↓
post bounded pattern + bounded subject
  ↓
start 1.5s watchdog
  ├─ success → bounded results → terminate/cleanup
  ├─ cancel  → terminate immediately
  └─ timeout → terminate immediately → TIMEOUT
```

No automatic retry after timeout.

The Worker is not pooled across hostile regex jobs by default; a poisoned/hung job must not affect later sessions.

Result count is capped at 10,000.

---

# 16. Worker security model

Workers serve two purposes:

1. responsiveness isolation;
2. killable containment for hostile/heavy work.

Worker requirements:

- same-origin bundled module Worker by default;
- no user-provided module URL;
- no `data:` or `blob:` Worker source by default;
- typed message envelope;
- operation id;
- message payload validated on both sides;
- watchdog owned by the parent runtime;
- `Worker.terminate()` on hard timeout/cancel where required;
- cleanup of message listeners/timers;
- errors normalized before reaching UI/telemetry;
- no ambient network API use in engine/boundary/worker modules.

Cooperative `AbortSignal` is useful for clean cancellation but is not the hard security boundary for code that may stop cooperating.

---

# 17. Worker watchdogs

Canonical maximums inherited from profiles:

| Class | Hard watchdog |
|---|---:|
| Regex | 1,500 ms |
| Text Diff | 3,000 ms |
| Markdown parse | 3,000 ms |
| HTML Formatter | 3,000 ms |
| SVG raster/processing | 5,000 ms |
| PDF structural operation | 15,000 ms |

A tool may use a lower threshold.

Timeout policy:

- terminate;
- emit typed `TIMEOUT`;
- release references;
- no silent fallback to server processing;
- no automatic retry storm.

---

# 18. Main-thread work budget

Main-thread execution remains permitted for bounded operations proven fast enough.

Rules:

- scalar math/finance/date/simple encoding may run directly;
- large list/structured transforms cross a measured threshold into Worker execution;
- threshold selection belongs to implementation benchmarking but may not exceed the hard profile limits;
- synchronous UI work that causes material long tasks must be moved or tightened;
- moving work to a Worker does not permit increasing input limits automatically.

---

# 19. Network authority: deny by default

The following module families have **zero network authority by design**:

```text
src/tools/engines/**
src/tools/boundaries/**
src/tools/workers/**
```

They must not directly use normal network primitives such as:

- `fetch`;
- `XMLHttpRequest`;
- `WebSocket`;
- `EventSource`;
- `navigator.sendBeacon`;
- remote dynamic import;
- `importScripts()` from remote origins.

CI statically checks forbidden usage with narrow allowlisted exceptions only in dedicated adapters approved by later phases.

Ordinary Launch-50 computation never requires such an exception.

---

# 20. CSP architecture

CSP has two layers:

1. Astro-generated page meta CSP may provide hashes/resources for processed static scripts/styles;
2. real HTTP response headers provide directives that require header delivery and provider-level protection.

The application must not claim complete CSP coverage from a `<meta http-equiv>` policy alone.

Baseline Tools policy target before Ads/analytics extensions:

```text
default-src 'self';
base-uri 'none';
object-src 'none';
frame-ancestors 'none';
form-action 'none';
script-src 'self' <generated-hashes>;
worker-src 'self';
connect-src 'none';
img-src 'self' data: blob:;
font-src 'self';
frame-src 'none';
```

Exact hash/directive output is implementation/provider-specific and must be tested in a real browser.

`unsafe-eval` is not introduced for convenience.

`unsafe-inline` is not introduced broadly merely to simplify ad/analytics integration.

---

# 21. Header-only directives and host responsibility

`frame-ancestors` is a response-header responsibility; it is not supported through CSP meta.

Therefore Phase 19 must verify effective HTTP headers on:

- Cloudflare primary;
- the approved fallback path used for security equivalence.

If a fallback cannot reproduce a required security header, it is not automatically security-equivalent. The project may choose a different fallback or degrade/disable affected behavior.

---

# 22. Worker CSP

A same-origin Worker script receives its own response and requires its own CSP/network policy.

Do not assume the document's CSP automatically constrains a normal same-origin Worker script.

Worker resources should be served with a restrictive CSP compatible with their needs, normally no network access and no eval.

`worker-src 'self'` controls which Worker scripts the document may instantiate; the Worker resource policy controls code running inside the Worker context.

---

# 23. Rich output policy

Default output mode is text-safe.

Allowed normal sinks:

- `textContent`/escaped template text;
- numeric formatted text;
- escaped table cells;
- Blob/Object URL for generated binary;
- attributes set through safe DOM APIs with protocol/value validation.

No arbitrary `innerHTML` is allowed in ordinary renderers.

---

# 24. Single privileged rich-output path

Only an explicit reviewed renderer may consume sanitized markup.

Initial privileged use case: Markdown Previewer.

Canonical path:

```text
bounded Markdown
  ↓
fixed parser profile
  ↓
raw HTML disabled
  ↓
Worker parse where threshold requires
  ↓
restricted sanitizer
  ↓
SafeRichOutput wrapper
  ↓
preview container
```

The wrapper is the only normal place where sanitized HTML insertion may occur.

CI checks unsafe sinks outside approved files.

---

# 25. Markdown remote-resource policy

Pasted Markdown must not silently turn into third-party network activity.

Default:

- remote images/media are not auto-fetched in preview;
- unsafe protocols are rejected;
- external links may render only after protocol allowlisting;
- external links use appropriate `rel` isolation where applicable;
- scripts/event handlers/raw HTML are not executed;
- sanitizer configuration is fixed by MenezesDev, not user configurable.

A future remote-media preview mode would be a new network/privacy decision.

---

# 26. HTML Formatter

HTML Formatter is a text transformation tool, not an HTML renderer.

Rules:

- bounded input <=1 MiB;
- dedicated Worker;
- hard timeout <=3 s;
- no external resources/plugins/config;
- formatted output <=4 MiB;
- output rendered as text/code only;
- no preview execution;
- parser errors normalized.

Its conditional dependency remains blocked until the exact audited admission gate is satisfied.

---

# 27. Text Diff

Diff input remains opaque user text.

- <=1 MiB per side;
- Worker for non-trivial input;
- <=3 s hard attempt;
- <=5 MiB result payload;
- diff segments rendered as text nodes/spans whose text is escaped;
- no HTML interpretation of source text.

---

# 28. PDF security model

Merge/Split PDF are conditional Launch-50 tools and receive the strictest structural-file controls.

Requirements:

1. aggregate compressed input <=75 MiB;
2. aggregate page count <=500;
3. output <=100 MiB;
4. dedicated killable Worker;
5. hard watchdog <=15 s per bounded operation;
6. encrypted/unsupported PDFs rejected explicitly;
7. decompression-bomb protections of the approved engine preserved;
8. wrapper-level work/output limits stricter than dependency defaults where appropriate;
9. malformed/truncated/xref/object-stream/filter hostile fixtures mandatory;
10. active content is never executed;
11. output preservation claims are tested rather than assumed;
12. no promise of generic compression, text editing, sanitization or perfect semantic preservation outside proven capability.

---

# 29. PDF active-content gate

Browser-local execution does not make active PDF content safe by itself.

Hostile fixtures must cover relevant structures such as:

- JavaScript actions/name trees;
- `OpenAction`;
- additional actions (`/AA`);
- launch/URI-like active actions as applicable;
- suspicious annotations/actions;
- embedded/attachment behavior relevant to the selected engine path;
- malformed action dictionaries.

The implementation must prove a safe outcome for each operation class:

- reject input containing unsupported active content; or
- demonstrate deterministic stripping/neutralization with fixtures and output inspection.

If safe reject/strip behavior cannot be proven for the approved PDF engine/wrapper, Merge/Split fail admission and an ordered reserve replaces the frozen slot. Security is not weakened to keep PDF in Launch 50.

---

# 30. PDF engine admission reminder

The preferred structural candidate remains conditional according to the Phase-2 audit.

Phase 7 does not promote it to `APPROVED`.

Implementation may use the dependency only after the exact current version/advisory/source behavior is re-audited and every listed condition is satisfied.

No full PDF UI/schema stack is imported merely to obtain the isolated structural library.

---

# 31. ZIP Creator

Launch includes ZIP creation, not extraction.

Creation controls:

- total source <=100 MiB;
- <=1,000 entries;
- individual entry <=50 MiB;
- output <=150 MiB;
- entry names sanitized;
- absolute paths forbidden;
- drive prefixes forbidden;
- traversal segments canonicalized/rejected;
- NUL/control surprises rejected;
- non-trivial creation uses Worker/streaming path when needed;
- generated archive is local output.

Archive extraction is a separate future capability with decompression-ratio, aggregate-expanded-size, symlink/hardlink and traversal defenses. It is not silently bundled into ZIP Creator.

---

# 32. Output filenames

Generated download filenames derive from deterministic tool-owned rules plus a sanitized basename when useful.

Rules:

- strip path separators;
- strip/replace control characters;
- bound filename length;
- avoid platform-reserved/path-like names where practical;
- extension derives from actual output format;
- never preserve a dangerous user-supplied extension merely for familiarity;
- content type derives from the encoder/output path.

---

# 33. Blob/Object URL lifecycle

Generated binary output uses local Blob/Object URLs where appropriate.

Runtime must revoke URLs:

- when replaced by a new result;
- on reset;
- when renderer is disposed/navigation completes;
- after download when safe and compatible with browser behavior.

Long sessions must not accumulate stale object URLs indefinitely.

---

# 34. Secrets and random generators

Password/secret/token-like outputs:

- use Web Crypto;
- use rejection sampling for bounded alphabets/ranges when modulo bias matters;
- never enter telemetry/logs;
- never persist by default;
- copy action is explicit user interaction;
- result rendering is text-safe.

UUID uses standards/native cryptographic generation where available according to the approved engine path.

---

# 35. Hash tools

Hashing remains local.

- text <=10 MiB;
- file <=100 MiB;
- no upload;
- no content telemetry;
- digest is fixed-size safe text;
- hash tool copy must not imply encryption or secrecy.

---

# 36. Error model hardening

Phase-6 error classes remain and Phase 7 extends safe domain codes where real security semantics require them.

Allowed canonical set includes:

```text
INVALID_INPUT
LIMIT_EXCEEDED
UNSUPPORTED_FORMAT
UNSUPPORTED_BROWSER
TIMEOUT
ABORTED
ENGINE_FAILURE
OUTPUT_TOO_LARGE
ENCRYPTED_UNSUPPORTED
ACTIVE_CONTENT_REJECTED
```

No public error exposes:

- raw parser exception;
- stack trace;
- file contents;
- pasted text;
- local path;
- internal module path;
- secret;
- provider credential/config;
- hostile source snippet.

Unexpected exceptions map to `ENGINE_FAILURE` with an internal non-content reason code where useful.

---

# 37. Telemetry allowlist

Telemetry remains content-free and typed.

Allowed event fields are restricted to values such as:

```text
event kind
tool id
category
runtime class
safe error code
duration bucket
coarse browser capability flag
```

No generic `details: any`, arbitrary property bag, parser message or raw exception object is allowed.

Prohibited:

- filenames when they can contain private data;
- pasted text;
- financial inputs;
- generated secrets;
- document metadata values;
- output contents;
- regex pattern/subject;
- Markdown/HTML/JSON/XML/CSV content.

Phase 18 chooses transport/storage; Phase 7 fixes the privacy shape.

---

# 38. Dependency hard stops

Security-sensitive dependency integration fails if any applicable condition is missing:

- exact commercial-use license/NOTICE state;
- current version pin;
- current advisory check;
- maintenance review;
- hostile-input behavior understood;
- resource limits understood;
- transitive dependency review appropriate to risk;
- browser/Worker/WASM fit proven;
- CSP implications known;
- fixed configuration owned by MenezesDev;
- fixture coverage present.

A new parser/codec or materially changed conditional dependency is not a routine generated-tool change.

---

# 39. Future SSRF boundary

Launch 50 has no public server-side arbitrary URL fetch.

The default capability state is:

```text
SERVER_URL_FETCH = FORBIDDEN_UNTIL_REVIEW
```

If a future tool genuinely needs server fetch, it requires a dedicated threat model including at minimum:

- protocol allowlist;
- host/domain allowlist where feasible;
- credential rejection;
- DNS/IP validation;
- private/loopback/link-local/metadata-address blocking;
- redirect revalidation at every hop;
- redirect count cap;
- response-byte cap;
- request timeout;
- content-type allowlist;
- egress restrictions;
- cache/cost policy;
- no user-controlled whitelist expansion.

Denylist-only URL filtering is insufficient.

---

# 40. Service worker / PWA

Launch 50 remains service-worker-free by default.

Phase 7 strengthens the Phase-6 rule:

- no service worker is added incidentally by a dependency;
- CI/release scan checks for unapproved registration;
- future PWA activation requires cache/update threat review;
- user-generated/private content is never a default cache target;
- Ads/analytics are not offline correctness dependencies.

---

# 41. Third-party Ads and analytics

AdSense/analytics are outside tool correctness and outside parser trust.

Before Phase 14/18 provider activation:

- no provider script receives authority merely because an interface exists;
- CSP additions are explicit and route-aware where possible;
- content-sensitive/private tool surfaces receive privacy review;
- if a provider cannot be integrated without exposing private interaction content or weakening required security, the affected route remains ad-free or provider-free;
- tool computation/download remains functional with providers blocked.

Phase 7 does not choose AdSense script configuration or analytics transport.

---

# 42. Hostile fixture taxonomy

Minimum reusable fixture classes:

```text
BOUNDARY_EXACT_MAX
BOUNDARY_MAX_PLUS_ONE
TRUNCATED_INPUT
MALFORMED_HEADER
MIME_EXTENSION_MISMATCH
SIGNATURE_MISMATCH
POLYGLOT_SUSPICIOUS
INVALID_UNICODE
DEEP_STRUCTURE
MANY_NODES
OVERSIZED_FIELD
OVERSIZED_OUTPUT
DECOMPRESSION_BOMB
GIANT_DIMENSIONS
CATASTROPHIC_REGEX
ACTIVE_HTML
ACTIVE_MARKDOWN_LINK
REMOTE_MARKDOWN_MEDIA
ACTIVE_PDF
ENCRYPTED_PDF
MALFORMED_PDF_XREF
MALFORMED_PDF_STREAM
ARCHIVE_TRAVERSAL_NAME
WORKER_TIMEOUT
WORKER_CANCEL
WORKER_CRASH
PARSER_ERROR_WITH_PRIVATE_PAYLOAD
```

Tools select the applicable classes through their security profile.

Fixtures contain synthetic/non-private data only.

---

# 43. Boundary test rule: max and max+1

Every numeric hard cap that can be deterministically constructed receives at least:

- below-max fixture;
- exact-max accepted/rejected according to defined inclusivity;
- max+1 rejected;
- malformed representation rejected;
- output cap equivalent where applicable.

No test may assert only a friendly happy path for a security limit.

---

# 44. Resource-bomb fixtures

CI fixtures must be safe to execute while proving guard placement.

Preferred strategy:

- synthetic headers declaring giant dimensions rather than allocating giant bitmaps;
- compressed structures that trip a pre-parser/wrapper/dependency limit at bounded CI cost;
- deeply nested generators with hard small fixture caps sufficient to cross declared depth;
- regex patterns/subjects that trigger watchdog termination without consuming unbounded CI time;
- PDF structures designed to hit parser protections within known limits.

A security test that itself can exhaust CI is a failed test design.

---

# 45. Static security checks

CI/review automation must detect forbidden patterns in Tools security-sensitive directories, including where technically reliable:

- network APIs in engines/boundaries/workers;
- `eval`/`new Function`;
- remote `importScripts`;
- user-controlled dynamic imports;
- unapproved `innerHTML`/HTML sinks;
- service-worker registration;
- dependency imports from HOLD/REJECT packages;
- conditional dependencies before their admission flag/gate is satisfied;
- security profile overrides that loosen caps;
- missing profile/security metadata.

False-positive handling uses narrow reviewed allowlists, not disabling the check globally.

---

# 46. Browser security tests

Production-like browser tests verify at least:

- Worker creation only from allowed sources;
- forbidden network request attempts are blocked/fail;
- Markdown remote media does not auto-fetch;
- HTML/JSON/XML/diff hostile strings do not execute;
- CSP header is present/effective on required routes;
- `frame-ancestors` blocks embedding as designed;
- Workers run under the expected resource policy;
- object URLs are cleaned up;
- timeout/cancel leaves the UI usable;
- optional Ads/analytics absence does not break tools.

---

# 47. Economic/network invariant test

For every frozen Launch-50 ordinary operation:

> success must not require a MenezesDev backend-processing request.

Test harness classifies network traffic.

Allowed optional categories such as static assets or later Ads/analytics are separated from processing requests and cannot be prerequisites for a successful tool result.

A local-capable tool that introduces a processing API call fails.

---

# 48. CSP/provider test matrix

Phase 19 ultimately verifies the effective policy on primary and fallback.

Phase 7 defines the minimum matrix:

| Surface | Page CSP | HTTP security headers | Worker CSP | Ads requirement |
|---|---|---|---|---|
| Tools primary | required | required | required where Workers exist | later Phase 14 |
| Commercial | preserve existing/approved | preserve existing/approved | n/a unless used | ad-free |
| Demo | preserve noindex/security behavior | preserve existing/approved | n/a unless used | ad-free |
| Fallback Tools | equivalent app security or safe degradation | verify provider capability | verify if Workers used | disable Ads if integrity uncertain |

Provider portability never means lowest-common-denominator security.

---

# 49. Phase-8 seam

Phase 7 exposes security facts but does not decide bot/traffic policy.

Phase 8 may consume safe route/tool metadata such as:

```text
surface class
ads eligibility class
serverRequired
cost class placeholder
public/local operation class
security sensitivity class
```

Phase 8 cannot weaken local input guards because a visitor passed edge classification.

Trusted traffic still submits untrusted files/text.

---

# 50. Implementation module implications

Phase 9 planning should create focused modules equivalent in responsibility to:

```text
src/tools/security/profiles.ts
src/tools/security/resolve-policy.ts
src/tools/security/preflight/*
src/tools/security/file-sniff/*
src/tools/security/output/*
src/tools/security/errors.ts
src/tools/runtime/worker-watchdog.ts
src/tools/ui/safe-rich-output.ts
scripts/validate-tools-security.mjs
tests/tools/security/**
tests/fixtures/hostile/**
```

Exact filenames belong to Phase 9; these names are illustrative responsibility boundaries, not permission to implement now.

---

# 51. Build-time invariants

Catalog build fails when:

- a tool accepts input with no security profile;
- referenced profile does not exist;
- required limit for the input class is absent;
- tool override loosens a profile;
- engine/boundary id is not allowlisted;
- active content is enabled without reviewed state;
- network authority is requested by an ordinary Launch-50 engine;
- conditional dependency is used without passed admission state;
- hostile fixture class list is empty for a parser/hostile-input profile;
- output cap is missing where output can grow materially.

---

# 52. Release hard stops

A Launch tool fails security release if any applicable condition is true:

1. parser/decoder can receive input beyond declared cap;
2. max/max+1 tests are absent for relevant limits;
3. hostile fixtures do not exercise applicable risk class;
4. Worker timeout does not hard-stop where required;
5. user content can reach telemetry;
6. output can execute as active HTML unexpectedly;
7. file type is trusted only from name/MIME;
8. active PDF/SVG/HTML behavior is enabled without dedicated review;
9. output allocation is materially unbounded;
10. network authority appears in an ordinary engine/boundary/worker;
11. security headers/CSP required by the surface are not verifiable;
12. conditional dependency admission is incomplete;
13. user/private input is uploaded for a browser-capable operation;
14. a frozen slot is preserved by weakening security rather than substituting a reserve.

---

# 53. Acceptance criteria for Phase 7 gate

The Phase-7 workflow gate is satisfied only when every public input class in the frozen Launch 50 maps to a testable boundary policy.

This spec satisfies the design side when the written package is approved and all of the following are explicit:

- profile registry semantics;
- exact hard resource caps;
- tightening-only override rule;
- pre-parse ordering;
- file/signature strategy;
- image guards;
- structured-text guards;
- regex sandbox;
- Worker kill model;
- network deny-by-default;
- CSP/header/Worker policy;
- rich-output sanitizer path;
- PDF active-content/admission gate;
- ZIP-create path handling;
- output filename/Object URL behavior;
- safe errors;
- telemetry allowlist;
- dependency hard stops;
- future SSRF requirements;
- hostile fixture taxonomy;
- static/browser/economic CI invariants;
- fallback/provider security behavior.

---

# 54. Non-goals

Phase 7 does not:

- implement these modules;
- create `feat/tools-platform`;
- install or approve dependencies;
- enable CSP in production yet;
- choose final ad/analytics CSP endpoints;
- implement Traffic Guard/Cost Guard;
- configure Turnstile/rate limits;
- implement any Launch tool;
- enable a service worker;
- create a public URL-fetch endpoint;
- implement autonomous growth systems;
- modify immutable workflow/security contracts;
- merge partial Tools work to `main`.

---

# 55. External security references revalidated

Revalidated on 2026-08-26:

- OWASP Input Validation Cheat Sheet — validate untrusted input early; allowlisting is preferred over denylist-only controls; size/range limits are core validation controls.
- OWASP File Upload Cheat Sheet — do not trust content type alone; use defense in depth including size/type/signature/content validation.
- OWASP SSRF Prevention Cheat Sheet — future server-fetch designs require strict validation/allowlisting and redirect/network controls; denylist-only URL defense is inadequate.
- MDN `Worker.terminate()` — terminates a Worker immediately and is suitable as the hard-kill primitive for disposable hostile jobs.
- MDN `worker-src` — controls allowed Worker/SharedWorker/ServiceWorker script sources.
- MDN `frame-ancestors` — not supported through CSP meta; must be delivered as an HTTP response header.
- MDN Web Workers CSP guidance — normal Worker scripts receive policy from the Worker script response; do not assume ordinary same-origin Workers inherit the parent document policy.
- Astro current CSP configuration — Astro can emit a CSP meta policy with generated script/style hashes, which remains useful defense in depth but does not replace header-only directives.

Current implementation must revalidate version-sensitive framework/provider details if Astro/hosting materially changes before Phase 19.

---

# 56. Phase-7 gate state

The concrete design was approved in chat before this file was written.

This file is the written design package and requires the Superpowers **written-spec user review** before Phase 7 may close.

Until that written review is explicitly approved:

- do not create `PHASE7_CLOSURE.md`;
- do not mark Phase 7 closed;
- do not start Phase 8;
- do not invoke Phase-9 `writing-plans`;
- do not install dependencies;
- do not create `feat/tools-platform`;
- do not implement Tool SDK/runtime/tools.
