# AIPOCH Investor Deck

Reusable investor-presentation profile derived from an audited 22-slide AIPOCH
deck lineage. This pack is a repository extension. It is not published by
AIPOCH and does not alter the canonical visual system in
[`../aipoch/DESIGN.md`](../aipoch/DESIGN.md).

## Authority

1. Brand colors, logo assets, icon geometry, and core visual restrictions come
   from `../aipoch/DESIGN.md`.
2. Investor-specific typography, dual canvases, slide grammar, source
   discipline, and illustration treatment come from this directory.
3. The public-website implementation in `../aipoch/WEBSITE.md` is not inherited.
4. External r5/r6 PPTX files are provenance only. They are not copied,
   embedded, or committed to this repository.

## Contents

| File | Purpose |
|---|---|
| [`design.md`](./design.md) | Normative Investor Deck rules and runtime Style Lock |
| [`illustration-style.md`](./illustration-style.md) | Scientific editorial illustration language |
| [`slide-types.md`](./slide-types.md) | Reusable slide archetypes and density limits |
| [`audit-r5-r6.md`](./audit-r5-r6.md) | External lineage and observed issues, without PPTX binaries |
| [`content/deck-outline.md`](./content/deck-outline.md) | Generic four-act, 22-role investor story |
| [`content/source-policy.md`](./content/source-policy.md) | Evidence, source bar, notes, and claims rules |
| [`prompts/slide-light.md`](./prompts/slide-light.md) | Light Canvas slide prompt |
| [`prompts/slide-black.md`](./prompts/slide-black.md) | Black Canvas slide prompt |
| [`prompts/illustration-light.md`](./prompts/illustration-light.md) | Light-canvas illustration prompt |
| [`prompts/illustration-dark.md`](./prompts/illustration-dark.md) | Black-canvas illustration prompt |
| [`assets/README.md`](./assets/README.md) | Reference-only illustration manifest |

## Runtime profile

Use the explicit `investor-deck` preset. It composes:

```text
AIPOCH STYLE LOCK
+
AIPOCH INVESTOR DECK STYLE LOCK
```

The default `official-design`, `website-replica`, and existing `board-slide`
presets remain separate.

## Brand signature

The deck uses a three-tier signature instead of repeating the complete logo on
every page:

- cover and close: complete Primary, Inverse, or Stacked logo;
- chapter opener: complete horizontal logo;
- content and data pages: `AIPOCH / INVESTOR DECK` running label plus a short
  yellow rule or the official Grid Origin structure.

Full logo assets always retain original color, aspect ratio, and `1x` clear
space. Black brand pages use the Inverse asset.

## Binary and content boundary

This directory must not contain `.pptx`, `.ppt`, or `.potx` files. It also
excludes external speaker notes, product screenshots, team rosters, financing
figures, internal source IDs, and company-management assertions. The included
illustrations are reduced, reference-only style evidence with unpublished
licensing status; they are not official AIPOCH assets or production-ready deck
art.
