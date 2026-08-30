# React Islands Baseline Design

**Date:** 2026-08-29
**Status:** Approved for implementation by user instruction

## Goal

Keep MenezesDev static-first while allowing selective React islands and Motion for high-value visual interactions, so the portfolio can demonstrate modern interaction quality without becoming a SPA or hydrating whole pages.

## Architecture

Astro remains the page/layout/router/build framework with `output: "static"`. React is added only through `@astrojs/react`; interactive islands must use an explicit Astro client directive and should default to `client:visible` or `client:idle` instead of `client:load`. Motion is the default animation runtime inside React islands. Existing Astro/CSS/vanilla components remain valid and are not rewritten merely to use React.

## Dependency baseline

Add exact versions compatible with the current snapshot:

- `@astrojs/react` — integration for React islands.
- `react` and `react-dom` — island runtime.
- `motion` — animation runtime for React islands.

Do not add shadcn, GSAP, Lenis or component-library packages to the baseline. Originkit/Skiper source may be adopted later component-by-component after provenance, attribution, bundle and architecture review.

## Hydration budget

- Passive pages should still ship no React runtime.
- An island must have an interaction or motion reason that CSS/vanilla cannot satisfy cleanly.
- Prefer `client:visible` for below-the-fold motion and `client:idle` for non-critical enhancements.
- `client:load` requires an explicit above-the-fold interaction requirement.
- No client router and no SPA shell.
- `prefers-reduced-motion` must be respected.

## Proof of capability

Introduce one small reusable React/Motion island used on the MenezesDev home page. It should enhance presentation without owning page content or navigation and should hydrate only when visible. The component must be removable without affecting semantic content.

## Acceptance changes

`JS-003` changes from “no client framework” to “no unnecessary hydration/client-router/heavy global runtime”. The gate must verify React is integrated intentionally, the site remains static, and no client router is introduced.

## Non-goals

- No redesign of all pages in this change.
- No migration to Next.js.
- No conversion of existing Astro components to React without need.
- No automatic OriginKit MCP activation.
- No Skiper component import in this baseline change.
