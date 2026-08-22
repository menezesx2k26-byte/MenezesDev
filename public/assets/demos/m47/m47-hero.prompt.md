# Prompt — m47-hero.webp

- Date: 2026-08-22
- Project: M47 Barber
- Asset type: responsive landing-page hero
- Destination: `public/assets/demos/m47/m47-hero.webp`
- Art direction: `$menezesdev-image-director`
- Generator: `$imagegen` native (`native-imagegen`)
- References used: none
- Candidate count: 1
- Targeted edits: none

## Briefing files read

- `AGENTS.md`
- `docs/DEMO_CASES.md`
- `docs/IMAGE_GENERATION_RULES.md`
- `docs/BRAND_GUIDE.md`
- `.agents/skills/menezesdev-image-director/SKILL.md`

No M47 component or wireframe exists in the repository yet. The existing bitmap under `Cases/` was inspected only during inventory and was not used as a generation reference because it contains invented readable branding and does not satisfy the current contract.

## Final prompt used

```text
Use case: photorealistic-natural
Asset type: responsive landing-page hero image for the fictional M47 Barber concept
Primary request: Create one production-ready, realistic contemporary barbershop editorial photograph. Show one male barber naturally and actively working on one seated male client's haircut or beard finishing; the moment must feel observational, candid, and unposed.
Scene/backdrop: A real contemporary urban barbershop with deep matte-black surfaces, restrained warm wood or matte-gold details, and professional equipment integrated naturally. Premium finish without ostentation.
Subject: Barber and client are fictional adults. Neither looks at the camera. Hands, fingers, clippers or scissors, cape, chair, hair, and beard must be anatomically and mechanically plausible, with believable tool contact and natural posture.
Style/medium: Photorealistic masculine editorial photography, authentic rather than advertising stock, medium-wide environmental framing, natural skin pores, realistic hair strands and beard texture, subtle photographic grain, no plastic retouching.
Composition/framing: Exact 16:10 landscape composition. Reserve roughly 42% of the full image width on the left as clean, dark, low-detail negative space for HTML eyebrow, headline, paragraph, and two CTAs. Keep faces, hands, tools, mirrors, signage, shelves, bright fixtures, and high-contrast details out of this protected left area. Place the barber-client action on the center-right, not at the extreme edge, with both faces and the essential interaction inside a crop-safe center-right zone so the story survives a narrower mobile crop. No important subject should be cut by the frame.
Lighting/mood: Strong but controlled warm side light from the right or upper-right, deep blacks with retained shadow detail, high contrast, precise, urban, masculine, calm confidence.
Color palette: #101010 and #181818 visual base, warm natural skin and hair, restrained matte-gold #C9A96E accents, off-white only in tiny practical highlights.
Materials/textures: Real hair and beard, skin, black fabric cape, brushed metal tools, leather or matte chair surfaces, subtle lived-in interior texture.
Constraints: No readable text anywhere; no logo, monogram, brand name, wall sign, poster, price list, interface, caption, watermark, signature, third-party trademark, or fabricated business data. No direct-to-camera gaze. No generic stock pose. No excessive tattoos as the visual concept. Keep the left negative space genuinely usable and compositionally quiet.
Avoid: barber pole; red-white-blue stripes; moustache icon; skulls; crossed razors; western or vintage barbershop aesthetic; dominant distressed wood; white background; exaggerated luxury; neon; colorful gradient; blur or blob used as a substitute for the scene; malformed anatomy; extra fingers; fused hands or tools; floating equipment; duplicated people; synthetic skin; overprocessed HDR; stock-photo appearance.
Output intent: one coherent hero candidate only, suitable for final conversion to WebP and later review in desktop and mobile layouts.
```

## Materialization

The native PNG was cropped by one pixel on each edge to an exact 16:10 canvas, resized with Lanczos resampling to `1536×960`, and encoded as WebP. This was a deterministic format/size conversion only; no visual content was added or regenerated.

## Visual review

- Realism, anatomy, hair, beard, cape, chair, scissors and tool contact: passed.
- Warm side light, deep blacks, restrained warm accents and premium contemporary environment: passed.
- Clean protected negative space on the left and focal action on the center-right: passed.
- Desktop crop: passed.
- Mobile 4:5 crop: passed when biased to the center-right; future implementation should use an `object-position`/background position around 65–70% horizontally.
- No readable text, logo, watermark, barber pole, skulls, crossed razors, western styling, direct gaze or stock pose: passed.
- Targeted edit: not required.
