# Prompt — tavola27-detail-01.webp

- Date: 2026-08-22
- Project: Tavola 27
- Asset type: detail — fresh pasta preparation
- Destination: `public/assets/demos/tavola27/tavola27-detail-01.webp`
- Art direction: `$menezesdev-image-director`
- Generator: `$imagegen` native (`native-imagegen`)
- Reference: `public/assets/demos/tavola27/tavola27-hero.webp` — style, restaurant, materials and lighting
- Initial candidate count: 1
- Targeted edits: 1

## Briefing files read

- `AGENTS.md`
- `docs/DEMO_CASES.md`
- `docs/IMAGE_GENERATION_RULES.md`
- `docs/NATIVE_IMAGEGEN_WORKFLOW.md`
- `docs/BRAND_GUIDE.md`
- `docs/context/STATE.md`
- `docs/context/DECISIONS.md`
- `.agents/skills/menezesdev-image-director/SKILL.md`

## Initial generation prompt

```text
Use case: photorealistic-natural
Asset type: Tavola 27 detail photograph 01 — fresh pasta preparation
Input images: Image 1 is a style, restaurant, material and lighting reference only; create a new preparation detail in the same fictional restaurant's kitchen.
Primary request: Create one production-ready editorial detail photograph of fresh pasta being cut by hand on a floured natural-wood worktop.
Scene/backdrop: Tavola 27's compact kitchen, softly out of focus, with warm plaster, muted green accents, brushed steel and coherent handmade ceramics.
Subject: A fictional adult cook's forearms and two hands using a simple chef's knife to cut a folded sheet of fresh egg pasta into even tagliatelle ribbons. Fingers use a safe curled grip; knife, dough and hand contact must be anatomically and mechanically plausible. No face.
Style/medium: Photorealistic culinary-process editorial, tactile, candid, warm and unpretentious, subtle grain, no staged cooking-show polish.
Composition/framing: 3:2 landscape close detail from slightly above worktop height. Both hands, complete knife working edge, folded dough and a small nest of already-cut ribbons are visible. The process is the focus, not a finished dish.
Lighting/mood: Soft directional window light catching flour and dough texture, gentle shadow and calm craft.
Color palette: Fresh pasta gold, warm cream, muted olive green, natural wood and restrained steel.
Materials/textures: Flour dust, elastic egg dough, wood grain, brushed knife steel, cotton apron edge and handmade ceramic flour bowl.
Constraints: One candidate only. No readable text, packaging, label, logo, monogram, watermark, signature, brand, fabricated claims or identifiable face. Hands and tool use must be safe and plausible.
Avoid: Italian flag; map of Italy; red-white-green theme; caricatured nonna/cantina; pizza dough or pizza cues; flour explosion; flying ingredients; unsafe knife grip; malformed anatomy; extra or fused fingers; knife fused to hand or dough; plastic pasta; extreme saturation; white studio background; generic cooking-class stock image.
```

## Targeted edit prompt

```text
Use case: precise-object-edit
Asset type: Tavola 27 detail photograph 01 — fresh pasta preparation
Input images: Image 1 is the edit target.
Primary request: Correct only the guiding hand beside the knife so the pasta-cutting technique is safe and anatomically natural.
CHANGE: Repose only the guiding hand on the right side of the knife into a proper curled claw grip: fingertips tucked safely behind the knuckles, knuckles facing and guiding the side of the blade, five anatomically correct fingers, realistic skin and contact with the folded pasta. Keep the knife edge clearly separated from fingertips.
PRESERVE: Keep the exact camera angle, crop, cook's body and clothing, knife size and position, hand holding the knife, folded dough, cut tagliatelle pile, flour, ceramic bowl, worktop, kitchen background, lighting, colors, focus, grain and every other element unchanged.
Constraints: No new objects, no text, no logo, no watermark, no style drift, no change to the scene or composition.
Avoid: extended fingertips near the blade; extra, fused or missing fingers; distorted wrist; knife fused to hand or pasta; altered food; altered background.
```

## Materialization

The selected native PNG was deterministically fitted to `1536×1024` with Lanczos resampling and encoded as WebP at quality 90. No visual content was added or regenerated during conversion.

## Visual review

- The initial candidate was rejected for extended guiding fingertips too close to the blade.
- One targeted edit changed only the guiding hand to a safe curled claw grip and preserved the composition.
- Edited hands, knife, dough contact, flour, pasta, ceramic and kitchen materials passed high-detail review.
- No face, readable text, invented branding, watermark, caricatured Italian cue or cooking-show staging was found.
