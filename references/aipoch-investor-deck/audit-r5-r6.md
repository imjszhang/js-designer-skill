# External r5/r6 audit

This audit records provenance and design observations only. The external files
remain outside this repository; no local absolute path, PPTX binary, speaker
note, or confidential slide copy is preserved here.

## Provenance

| External file | SHA-256 | Repository status |
|---|---|---|
| `aipoch-investor-deck-v3-r5.pptx` | `77940293f01ba21a3ea4852229f5638765aa4fa2954a7844999a91db29bb1a89` | External; never commit |
| `aipoch-investor-deck-v3-r6.pptx` | `0d017489cd88530ad859c9ec26dae4d0d51e5dcae0aa5e1e0df4bd6f7953c53b` | External; never commit |

## Observed lineage

### r5

- Strong scientific-editorial illustration language: line-drawn researchers,
  halftone maps and structures, yellow connection arcs, research symbols, and
  isometric workflows.
- Legacy palette appears in the source. It is observation evidence, not a token
  source. Mapping for new work:
  - legacy warm/off white → canonical `#FCFCFA` or `#F7F7F4`;
  - legacy yellow → canonical `#FBDD67`;
  - legacy mid gray → canonical `#6B6B66`.
- Old paper/noise textures and duplicated network artwork are not carried
  forward.

### r6

- Closer to canonical AIPOCH assets and restrained presentation composition.
- Uses 16:9 framing, Noto Sans SC for Chinese, and occasional Tinos Italic
  editorial emphasis.
- Avoids gradients, glow, pill controls, large shadows, and arbitrary logo
  recoloring.
- Existing 28 pt titles and 10–16 pt body copy are too small to become the
  target template. The target sizes are defined in `design.md`.
- Office theme defaults inside the package are implementation residue, not
  canonical theme colors.
- r6 intentionally removed older texture illustrations. The selected r5
  imagery is therefore style evidence only and must not be reused as finished
  r6 production art.

## Decisions

1. Preserve r6's restraint, canonical brand assets, and data-first composition.
2. Restore a controlled scientific-editorial language from r5 on only 6–8
   storytelling slides.
3. Add canonical black chapter pages for pacing, not marketing-style effects.
4. Replace repeated upper-left logos with the three-level brand signature.
5. Enforce larger investor-room typography and auditable source treatment.

## Explicit exclusions

- no website-only palette or yellow-green marketing treatment;
- no glow, gradient, particle field, pill CTA, or oversized card shadow;
- no direct negative inversion of a light illustration to make dark artwork;
- no financing facts, named team members, internal metrics, or source IDs from
  either external deck;
- no claim that this repository extension is an official AIPOCH template.
