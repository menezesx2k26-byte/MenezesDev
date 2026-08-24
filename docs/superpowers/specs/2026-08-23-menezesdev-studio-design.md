# MenezesDev Studio — Design Specification

**Status:** approved architecture, pending implementation-plan approval  
**Date:** 2026-08-23  
**Branch:** `feat/menezesdev-studio`  
**Base:** `feat/phase-10-implementation`

## 1. Purpose

Build a complete administrative system for MenezesDev, inspired by the successful interaction model of the Punctum Studio but designed specifically for a commercial web-development business.

The Studio must let the owner operate the public MenezesDev site without editing source code while preserving the quality, performance, accessibility, SEO and visual discipline already established in Phase 10.

The Studio is not a free-form page builder. It exposes curated, validated controls over an intentionally constrained design system so that ordinary content changes cannot break the public presentation.

## 2. Product principles

1. **Simple outside, rigorous inside.** Common operations use plain language and safe defaults. Technical settings are progressively disclosed.
2. **Draft first.** Editing never mutates the currently published site directly.
3. **Preview is real.** Preview renders the same components and content model used by production.
4. **Publication is atomic.** A published version is immutable and either becomes active completely or not at all.
5. **Rollback is first-class.** Restoring an old version creates a new version; history is never rewritten.
6. **Design cannot be casually destroyed.** Layouts, typography, color and spacing remain within approved presets and bounded controls.
7. **The public site remains the priority.** Admin functionality must not weaken public performance, accessibility, SEO, security or fictitious-demo safety rules.
8. **No secrets in Git.** Cloudflare identifiers that are safe to commit may be versioned; credentials, tokens and private environment values may not.
9. **Low operational cost.** Use Cloudflare-native primitives already suitable for the project rather than introducing a separate SaaS CMS.

## 3. Scope

### 3.1 Included

The first complete Studio release includes:

- protected admin shell;
- overview dashboard;
- Home editor;
- project/case editor;
- services editor;
- plans/pricing editor;
- navigation editor;
- brand/presentation controls;
- media library backed by R2;
- global SEO controls;
- commercial/contact settings;
- real responsive preview;
- autosave;
- 40-state local undo/redo;
- section reset;
- draft discard;
- immutable publication history;
- version restore;
- optimistic-concurrency protection;
- audit events;
- health/system screen;
- validation gates before publication.

### 3.2 Explicitly excluded from this release

- arbitrary HTML/CSS/JavaScript editing;
- arbitrary drag-and-drop canvas positioning;
- plugin marketplace;
- multi-tenant customer CMS;
- billing/payment processing;
- CRM automation;
- email marketing;
- AI-generated copy or media as a runtime dependency;
- direct editing of fictitious demo business behavior that could make a demo appear to be a real business;
- destructive deletion of historical versions;
- public user accounts.

These exclusions are intentional YAGNI boundaries, not future promises.

## 4. Architecture decision

### 4.1 Runtime

MenezesDev evolves from a purely static Astro deployment to an Astro application on Cloudflare Workers using `@astrojs/cloudflare`.

The adapter uses server output by default. Routes that do not require runtime data remain prerendered explicitly.

This is a deliberate superseding decision over the Phase 8/10 rule that excluded Cloudflare runtime/backend/persistence. The reason is now concrete: the Studio requires authentication, persistence, media storage, preview, publication history and runtime retrieval of published content.

### 4.2 Cloudflare resources

Use:

- **Cloudflare Worker / Astro runtime** for admin pages, admin APIs and runtime-rendered public content;
- **D1** binding `DB` for draft state, published snapshots, metadata and audit history;
- **R2** binding `MEDIA` for uploaded media objects;
- **Cloudflare Access** as the production authentication perimeter for admin routes;
- **static asset binding** for the built Astro assets.

Do not introduce a separate Node server, external database, headless CMS or object-storage provider.

### 4.3 Route strategy

Runtime-rendered:

- `/`
- `/projetos/*`
- `/admin/*`
- `/api/admin/*`
- `/media/*` when serving managed R2 assets through controlled responses
- internal preview endpoints/routes

Prerendered unless a later concrete requirement changes them:

- `/demo/**`
- `/404`
- static legal/informational surfaces that do not consume Studio content

The fictitious demos retain their current noindex/non-commercial safety rules.

## 5. Authentication and authorization

### 5.1 Production

Cloudflare Access protects both:

- `/admin/*`
- `/api/admin/*`

Only explicitly allowlisted identity/identities may pass the Access policy.

The application must still treat every admin API request as privileged. Admin APIs must not be exposed through an unprotected alternate route.

### 5.2 Local development

Local development may bypass Access only when both conditions are true:

1. the runtime is demonstrably local/development; and
2. a local-only development flag is enabled outside Git.

No environment variable may disable authentication in production or preview deployments.

### 5.3 Request integrity

State-changing admin requests must additionally enforce:

- same-origin checks;
- explicit allowed HTTP methods;
- JSON/content-type validation where applicable;
- CSRF protection appropriate to the chosen request mechanism;
- request-size limits;
- optimistic revision checks on draft writes.

## 6. Content model

### 6.1 Canonical site document

The editable site is represented as one versioned `SiteDocument` JSON object. This document is strongly typed and runtime-validated.

High-level shape:

```text
SiteDocument
├── schemaVersion
├── brand
├── navigation
├── home
│   ├── hero
│   ├── projects
│   ├── services
│   ├── process
│   ├── plans
│   ├── faq
│   └── contact
├── projects[]
├── commercial
├── seo
└── presentation
```

The document stores editorial/configuration data, not arbitrary executable markup.

### 6.2 Migration from source data

The initial D1 seed is derived from the already approved Phase 10 sources:

- `src/data/home.ts`
- `src/data/projects.ts`
- relevant typed project/content data;
- `src/config/site.ts`

The migration must preserve the rendered public content at the point the Studio branch is introduced. It must not silently rewrite approved copy or visual identity.

After the migration, runtime editable values come from the published snapshot, while code retains schemas, components, defaults, fallback-safe constants and seed/migration tooling.

### 6.3 Runtime validation

Every draft save and publish operation validates:

- complete document shape;
- required text fields;
- bounded list sizes;
- allowed preset IDs;
- unique stable IDs/slugs;
- valid internal links;
- URL policy for external links;
- media references;
- pricing constraints;
- SEO length/sanity rules;
- demo safety invariants;
- publication-critical commercial configuration.

Invalid drafts may be autosaved only when the invalidity is a normal intermediate editing state and is explicitly represented as such; invalid drafts can never be published.

## 7. D1 schema

Use SQL migrations under `migrations/`.

### 7.1 `studio_state`

Single logical site row.

Fields:

- `id TEXT PRIMARY KEY` — fixed logical key, e.g. `menezesdev`;
- `draft_json TEXT NOT NULL`;
- `draft_revision INTEGER NOT NULL`;
- `published_version_id TEXT`;
- `updated_at TEXT NOT NULL`;
- `updated_by TEXT`.

### 7.2 `studio_versions`

Immutable published snapshots.

Fields:

- `id TEXT PRIMARY KEY`;
- `version_number INTEGER NOT NULL UNIQUE`;
- `schema_version INTEGER NOT NULL`;
- `snapshot_json TEXT NOT NULL`;
- `created_at TEXT NOT NULL`;
- `created_by TEXT`;
- `publication_note TEXT`;
- `restored_from_version_id TEXT`.

Published rows are append-only from application code.

### 7.3 `media_assets`

Metadata for R2-backed media.

Fields:

- `id TEXT PRIMARY KEY`;
- `r2_key TEXT NOT NULL UNIQUE`;
- `original_name TEXT NOT NULL`;
- `mime_type TEXT NOT NULL`;
- `byte_size INTEGER NOT NULL`;
- `width INTEGER`;
- `height INTEGER`;
- `alt_text TEXT NOT NULL DEFAULT ''`;
- `status TEXT NOT NULL`;
- `created_at TEXT NOT NULL`;
- `updated_at TEXT NOT NULL`;
- `created_by TEXT`.

Allowed states initially: `active`, `unused`, `archived`.

Deletion is conservative: an asset referenced by the current draft or any published snapshot cannot be physically deleted through normal Studio actions.

### 7.4 `audit_events`

Append-only operational history.

Fields:

- `id TEXT PRIMARY KEY`;
- `actor TEXT`;
- `action TEXT NOT NULL`;
- `resource_type TEXT NOT NULL`;
- `resource_id TEXT`;
- `metadata_json TEXT`;
- `created_at TEXT NOT NULL`.

Do not log secrets or full sensitive request payloads.

## 8. Draft, autosave and concurrency

### 8.1 Autosave

The browser keeps working state locally and sends debounced draft patches/snapshots to the server.

Each save includes the last known `draft_revision`.

The server updates only when the submitted revision matches the current revision, then increments it. A mismatch returns a conflict response instead of silently overwriting another session.

### 8.2 Conflict UX

When a conflict occurs:

- editing is not discarded;
- the user sees that another session changed the draft;
- the current local state can be copied/reloaded/compared through a safe recovery flow;
- no automatic last-write-wins behavior is permitted.

### 8.3 Undo/redo

Undo/redo is local to the current editor session and retains up to 40 meaningful content states.

Server version history is not used as an undo stack.

## 9. Publication model

### 9.1 Publish transaction

Publish performs, in order:

1. read the current draft;
2. validate the complete draft for publication;
3. create a new immutable `studio_versions` row;
4. point `studio_state.published_version_id` to the new version;
5. synchronize the draft to the now-published snapshot/revision state;
6. write an audit event.

The D1 operations that establish the new published version and pointer must execute atomically using a transactional batch so a partial publication cannot become visible.

### 9.2 Read path

Public runtime routes read only the published snapshot, never the mutable draft.

The published snapshot may be cached at the application/edge layer with explicit invalidation/version keys, but correctness must not depend on a cache being present.

### 9.3 Restore

Restoring version N never rewrites version N or deletes later versions.

It loads the old snapshot into a new draft state; the user previews and publishes it, creating a new version whose `restored_from_version_id` points to the source version.

## 10. Admin information architecture

Primary navigation:

1. **Visão geral**
2. **Studio**
3. **Projetos**
4. **Serviços**
5. **Planos**
6. **Mídia**
7. **SEO**
8. **Configurações**

### 10.1 Visão geral

Shows only useful operational information:

- published version;
- last publish time;
- draft status;
- unpublished-change indicator;
- project count;
- media count/storage summary;
- public-site health summary;
- shortcuts to continue editing, preview and publish.

Avoid dashboard-card clutter and vanity metrics.

### 10.2 Studio

Desktop uses a three-part composition where space permits:

- section navigator;
- property editor;
- real preview.

Smaller layouts progressively collapse into focused editing and preview modes instead of shrinking three columns until unusable.

Editable Home sections:

- hero;
- project showcase;
- services;
- process;
- plans;
- FAQ;
- contact/final CTA.

For each section, expose only applicable controls:

- visible/hidden when safe;
- copy;
- selected media;
- bounded layout preset;
- ordering where allowed;
- section reset.

### 10.3 Projetos

Projects can be:

- created;
- edited;
- reordered;
- drafted;
- shown/hidden from the Home;
- published as part of the global site snapshot;
- archived without deleting historical references.

Fields include the case material actually supported by MenezesDev components: identity, slug, category/labels, summary, challenge, solution/process, visual assets, links, SEO and presentation variant.

Slug changes require explicit warning because they affect URLs.

### 10.4 Serviços

Manage service entries, descriptions, highlights, ordering and visibility.

The editor must prevent an empty public service section when the selected Home layout requires at least one service.

### 10.5 Planos

Manage:

- plan name;
- starting price/display price;
- description;
- included features;
- highlight/recommended state;
- order;
- CTA label;
- visibility.

Prices are represented as structured values plus deliberate display formatting, not parsed from arbitrary copy.

### 10.6 Mídia

Functions:

- upload supported raster formats;
- validate MIME type and signature;
- enforce file-size limits;
- record dimensions when available;
- require/edit alt text according to usage;
- browse/search/filter;
- select media from content editors;
- see usage references;
- archive unused media;
- prevent unsafe deletion of referenced assets.

SVG upload is excluded from ordinary Studio media uploads in the first release because SVG is executable-capable XML and the existing brand/vector assets should remain code-reviewed repository assets.

### 10.7 SEO

Global controls:

- site title template;
- default description;
- social title/description;
- default share image;
- canonical configuration status;
- indexing status display.

Per-project controls:

- title;
- description;
- social metadata;
- optional share image.

The Studio does not allow fictitious demo routes to be made indexable.

### 10.8 Configurações

Common settings:

- WhatsApp destination;
- default WhatsApp message;
- approved social links;
- navigation labels/order;
- contact copy;
- selected brand/presentation preset.

Advanced/system details are separated from ordinary editing.

## 11. Presentation system

The admin itself follows the existing MenezesDev brand guide:

- dark-first;
- high contrast;
- restrained violet/magenta accent;
- Manrope for display hierarchy;
- Inter for interface/body;
- existing radius and spacing language;
- Lucide iconography;
- minimal glow;
- no cyberpunk/Matrix decoration;
- no excessive glassmorphism;
- no card-per-everything dashboard aesthetic.

The Studio's public-site presentation controls are curated presets, not arbitrary CSS inputs.

Initial public presentation controls may include:

- approved layout variants per section;
- approved density presets;
- approved image treatment variants;
- a small set of brand-safe emphasis choices.

They may not expose raw CSS, unrestricted font names, arbitrary RGB fields or unbounded spacing sliders.

## 12. Preview

Preview uses the same public rendering components as the live site.

Modes:

- desktop;
- tablet;
- mobile.

Preview reads the authenticated draft, not the published snapshot.

Preview routes must:

- be protected by Access;
- be `noindex`;
- never leak draft content to public cache keys;
- clearly indicate draft mode;
- not execute real commercial side effects.

## 13. Media delivery

R2 objects use opaque/stable keys independent of the original filename.

Public media delivery must use controlled URLs and correct headers.

Requirements:

- immutable cache headers for versioned object URLs;
- content type from validated stored metadata;
- no user-controlled response headers;
- no directory-style bucket exposure;
- archived media remains available if referenced by historical published versions;
- newly uploaded media is not considered public content until referenced by a published snapshot.

## 14. API organization

Admin APIs live under `/api/admin/*` and are grouped by responsibility, not by UI screen alone.

Representative endpoints:

- `GET /api/admin/state`
- `PUT /api/admin/draft`
- `POST /api/admin/publish`
- `GET /api/admin/versions`
- `GET /api/admin/versions/:id`
- `POST /api/admin/versions/:id/restore`
- `GET /api/admin/media`
- `POST /api/admin/media`
- `PATCH /api/admin/media/:id`
- `POST /api/admin/media/:id/archive`
- `GET /api/admin/health`

Exact route files may vary during implementation, but the domain boundaries above are contractual.

## 15. Error handling

Errors are categorized and surfaced deliberately:

- validation error — point to exact editable field/section;
- revision conflict — recovery flow, never silent overwrite;
- authentication/authorization failure — deny without revealing protected data;
- D1/R2 unavailable — preserve local edits and block destructive/publication actions;
- upload rejection — explain format/size/content issue;
- publication failure — published pointer remains unchanged;
- malformed stored document — fail closed, emit operational error, never publish guessed/fallback content over the live site.

Admin error messages may be friendly but must remain technically diagnosable through safe server logs/audit metadata.

## 16. Security requirements

Hard requirements:

- Cloudflare Access on production admin surfaces;
- no credential/session token stored in source or D1 content JSON;
- no raw SQL from request input;
- prepared statements for parameterized D1 queries;
- strict runtime validation;
- same-origin and CSRF defenses for mutations;
- upload signature/type/size validation;
- SVG ordinary uploads disabled;
- external URL allow/scheme validation;
- CSP preserved/updated deliberately;
- admin/preview pages noindex;
- rate limiting or equivalent abuse control on state-changing/upload endpoints where appropriate;
- sensitive error details withheld from unauthenticated clients;
- audit trail for publish, restore and media lifecycle operations.

## 17. Public compatibility requirements

The Studio implementation must preserve the intent of all Phase 10 public hard gates unless a gate is explicitly superseded by this specification because of the runtime change.

Specifically preserve:

- 16 canonical public routes;
- deliberate absence of `/demo/prismae/about` until separately approved;
- real custom 404 behavior;
- all fictitious demo noindex rules;
- semantic accessibility baseline;
- WCAG 2.2 AA target;
- 44×44 mobile-control baseline;
- approved visual assets unless intentionally migrated into managed media;
- no fake WhatsApp destination;
- no real transmission from demo forms/actions;
- no made-up client metrics/testimonials/results.

Existing acceptance scripts should be adapted, not discarded.

## 18. Testing strategy

### 18.1 Unit/schema tests

Cover:

- document validation;
- publication validation;
- URL/media policy;
- pricing rules;
- slug uniqueness;
- demo safety invariants;
- revision conflict logic;
- version restore transformation.

### 18.2 D1 integration tests

Use local D1 for deterministic tests of:

- migrations;
- initial seed;
- draft save/revision increment;
- conflict rejection;
- atomic publish;
- append-only versions;
- restore flow;
- audit creation.

### 18.3 R2 integration tests

Use local/simulated R2 bindings to test:

- accepted upload;
- rejected type/size;
- metadata creation;
- referenced-asset deletion protection;
- archive behavior;
- delivery headers.

### 18.4 Browser tests

Exercise at minimum:

- Access/local-auth boundary behavior;
- dashboard load;
- Home copy edit → autosave → preview;
- undo/redo;
- section reset;
- project reorder;
- plan price edit;
- media upload/select;
- SEO edit;
- failed validation;
- publish;
- second publish;
- version restore;
- concurrent-tab conflict;
- mobile admin navigation;
- keyboard operation;
- reduced motion;
- public route equivalence/safety after publish.

### 18.5 Existing quality gates

Keep and extend:

- format check;
- Astro/TypeScript check;
- production build;
- route checks;
- acceptance checks;
- release checks;
- axe/browser accessibility QA;
- Lighthouse monitoring on public surfaces.

## 19. Rollout and migration

Implementation proceeds on `feat/menezesdev-studio` only.

No automatic merge to `main` and no production deployment occur as part of implementation.

Rollout phases inside the branch:

1. introduce Cloudflare adapter/runtime while preserving public rendering;
2. add typed bindings and local Wrangler configuration;
3. add D1 migrations and seed from Phase 10 content;
4. add repository/service layer for site documents;
5. switch public editable surfaces to the published snapshot;
6. add Access-compatible admin shell/API protection;
7. implement draft/version workflow;
8. implement Studio editors;
9. implement R2 media library;
10. implement preview;
11. implement publication/history/restore;
12. extend automated acceptance gates and run full regression.

A migration verification must compare the public output before and after seeding sufficiently to prove that introducing the Studio did not silently change approved content.

## 20. Operational behavior

The system screen reports, without exposing secrets:

- application version/commit when available;
- environment (`development`, `preview`, `production`);
- D1 binding health;
- R2 binding health;
- current published version;
- draft revision;
- last publish time;
- canonical URL configuration status;
- WhatsApp configuration status;
- analytics configuration status.

Health checks must be bounded and inexpensive.

## 21. Cost posture

The architecture is designed to fit low-volume owner-operated usage efficiently.

D1 stores small JSON snapshots and metadata; R2 stores media; Worker requests handle the dynamic surfaces. No always-on server is introduced.

Any future feature that creates material recurring third-party cost requires an explicit product decision rather than being silently added as a Studio dependency.

## 22. Success criteria

The MenezesDev Studio is complete when all of the following are true:

1. The owner can change supported Home, project, service, plan, SEO, navigation, commercial and media content without editing source code.
2. Draft changes autosave and never alter the public site before publication.
3. Real preview accurately reflects draft content at desktop/tablet/mobile sizes.
4. Publication is atomic and produces an immutable version.
5. A previous version can be restored without rewriting history.
6. Concurrent edits cannot silently overwrite each other.
7. Referenced media cannot be accidentally destroyed.
8. Production admin/API routes are protected by Cloudflare Access and application security checks.
9. Fictitious demos retain their indexing and non-commercial safety guarantees.
10. Existing public accessibility/quality intent remains passing after the runtime migration.
11. No secret enters Git.
12. The branch passes the extended automated and browser quality gates before being proposed for merge.

## 23. Superseded architectural constraints

This specification intentionally supersedes only the earlier constraints that no longer fit the now-approved Studio requirement:

- no Cloudflare adapter/runtime;
- no backend;
- no persistence;
- purely static output for every public editable route.

It does **not** supersede the project's security, accessibility, demo-safety, content-integrity, visual-brand or release-discipline rules.

## 24. Implementation boundary

This document defines the product and architecture. It does not authorize weakening release gates, merging into `main`, deploying production, inventing external credentials, changing the canonical production domain, or substituting placeholders for unresolved real commercial configuration.
