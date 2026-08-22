---
name: menezesdev-image-director
description: Direct and audit raster-image work for MenezesDev and its demo projects from repository briefings, producing layout-aware prompts for native ImageGen and a focused visual review. Use for heroes, editorial photography, gallery images, textures, and image edits; do not use for logos, exact UI, diagrams, charts, or screenshots.
---

# MenezesDev Image Director

Turn repository briefings into one auditable production prompt, then review the resulting raster asset against its layout role and project identity.

## Required sources

Read the applicable `AGENTS.md`, then inspect the consumer and read:

1. the asset-specific instruction;
2. `docs/DEMO_CASES.md`;
3. `docs/IMAGE_GENERATION_RULES.md`;
4. `docs/BRAND_GUIDE.md` when the asset belongs to MenezesDev or the guide is otherwise relevant;
5. any supplied reference images.

Record every source and reference used. Never infer that a generic external image is an approved reference.

## Route the asset

- Use `$imagegen` native for photographic or otherwise raster-native heroes, galleries, editorial scenes, textures, and directed bitmap edits.
- Build logos, marks, icons, diagrams, charts, exact geometry, and exact UI as SVG or frontend.
- Capture screenshots only from the real implemented site.
- Reserve Canva for later editable compositions using approved assets and real screenshots.
- Never route generation through the OpenAI Image API, `OPENAI_API_KEY`, `images.generate`, `images.edit`, an image MCP, browser automation, stock, placeholders, gradients, or blobs.

## Direct one candidate

Before generation, confirm the destination and sidecars do not already contain an approved or in-use asset. If the requested destination exists, use the next `-candidate-NN` filename unless replacement was explicitly authorized.

Prepare one concise `$imagegen` prompt with these fields when applicable:

```text
Use case
Asset type
Primary request
Scene/backdrop
Subject
Style/medium
Composition/framing
Lighting/mood
Color palette
Materials/textures
Constraints
Avoid
```

Make the layout function concrete: HTML position, protected negative space, focal-point placement, and mobile crop behavior. Keep text, invented branding, watermarks, fake business claims, and prohibited project clichés out of the bitmap.

Generate one candidate. Do not fan out random variants.

## Review

Open the output at high detail and evaluate:

- project identity and briefing fidelity;
- real-world anatomy, interactions, materials, tools, hair, skin, food, or other subject-critical detail;
- lighting and color;
- protected negative space and focal-point placement;
- desktop composition and mobile crop resilience;
- absence of readable text, watermarks, invented logos, stock staging, and project-specific prohibited clichés.

Reject objective failures. If one focused correction can fix the asset, make only one edit and state:

```text
CHANGE: <single defect to correct>
PRESERVE: <composition, identity, lighting, subject, and other invariants>
```

Do not approve an asset that still fails its layout role.

## Handoff

Materialize the selected project asset in its requested repository path, with a sibling `.prompt.md` and `.meta.json`. Report the final prompt, sources, references, review observations, output dimensions/format, status, and any remaining blocker.
