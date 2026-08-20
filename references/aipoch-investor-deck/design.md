# AIPOCH Investor Deck Design

> Status: repository extension · target specification  
> Inherits: [`../aipoch/DESIGN.md`](../aipoch/DESIGN.md)  
> Does not inherit: [`../aipoch/WEBSITE.md`](../aipoch/WEBSITE.md)

This document defines an investor-storytelling and presentation-engineering
profile. Canonical AIPOCH brand tokens, logo files, icon geometry, and core
restrictions remain authoritative in `../aipoch/DESIGN.md`. This file adds only
deck narrative, slide layout, Chinese typography, source treatment, dual
canvases, and illustration usage.

The live website's observed `#141519`, `#ECD44C`, glow, pill controls, and
marketing motion do not apply. This profile does not modify canonical YAML or
claim official-template status.

## Format and master geometry

- Canvas: 16:9 widescreen.
- Safe area: minimum 5% of slide width and height on every edge.
- Grid: 12 columns with consistent gutters; primary content aligns to columns
  1, 5, 7, or 9 rather than arbitrary coordinates.
- Title baseline: fixed across content slides; chapter and hero pages may use a
  separate intentional baseline.
- Source bar: lower left, one or two lines maximum.
- Page number: lower right, aligned with source bar.
- Running label: upper left on ordinary content pages.
- Keep meaningful slide content outside software-specific placeholders so the
  deck survives export and theme replacement.

## Three-level brand signature

### Level 1 — cover and close

Use a complete Primary, Inverse, or Stacked logo at 48–92 px high as part of the
composition. Prefer Stacked only when the close page needs a centered seal-like
ending.

### Level 2 — chapter opener

Use a complete horizontal logo at 32–40 px high. Light chapters use Primary;
black chapters use Inverse.

### Level 3 — content and data

Do not repeat a complete logo. Set `AIPOCH / INVESTOR DECK` in 10–12 pt Roboto
Mono, paired with a short `#FBDD67` rule or the canonical Grid Origin element.
This preserves brand ownership without turning every slide into a title card.

For every complete logo: preserve aspect ratio and original colors, retain at
least `1x` clear space, never separate symbol from wordmark, never tint it
yellow, never reduce opacity, and never go below the official minimum size.

## Color system

Use only canonical roles and one focus color per slide:

- Primary warm white: `#FCFCFA`
- Secondary warm white: `#F7F7F4`
- Structural line: `#E7E5DE`
- Canonical black: `#111111`
- Secondary text: `#6B6B66`
- Brand yellow: `#FBDD67`
- Alert/exception orange: `#EA580C`
- Dark-canvas secondary text: `#B4B4AE`
- Dark-canvas structural line: `#4E4E49`

Yellow identifies a single thesis, node, active stage, or decisive number.
Orange is reserved for genuine risk, exception, or contradiction and does not
coexist with yellow as a competing focus.

## Typography

- Chinese: Noto Sans SC; use Light for large editorial statements and Regular
  or Medium where projection contrast requires it.
- English: Inter.
- System labels, running labels, dates, source IDs, and small metadata: Roboto
  Mono.
- Editorial accent: Tinos Italic, limited to one short Latin word per title.
- Do not fake italic Chinese, condense fonts, or use decorative display fonts.

### Target sizes

| Role | Size |
|---|---:|
| Hero statement | 52–64 pt |
| Content title | 36–44 pt |
| Dense data-page title | at least 32 pt |
| Body | 16–20 pt |
| Data label | 14–16 pt |
| Table text | 12–14 pt minimum |
| Running label / source / page number | 10–12 pt |

Prefer deleting copy or splitting a slide to dropping below the minimums.
Line-height should be approximately 1.05–1.15 for display text and 1.25–1.4 for
body text.

## Light Canvas

Use `#FCFCFA` or `#F7F7F4` for data, competition, team, operations, financial,
and financing pages. Set primary type in `#111111`, secondary type in
`#6B6B66`, and rules in `#E7E5DE`.

Light pages carry most analytical density. Cards should be created only when
grouping is semantically necessary; prefer flat regions, rules, and alignment.
No card shadow or floating-dashboard treatment.

## Black Canvas

Use canonical `#111111` with `#FCFCFA` primary text, `#B4B4AE` secondary text,
`#4E4E49` rules, and one `#FBDD67` focus. Black pages are reserved for cover,
chapter anchors, strategic turns, and close. A complete logo on black must use
the official Inverse asset.

### Black Hero

One 52–64 pt thesis, a short subline, a large negative field, and optional
native dark illustration. No table, multi-card grid, or paragraph stack.

### Black Split

A 5/7 or 6/6 split between a concise statement and one diagram, product detail,
or illustration. Limit the textual side to one title, one supporting sentence,
and one proof point.

### Black System Frame

A sparse system map or strategic transition inside a precise line frame. Keep
to five major nodes and one highlighted path. This is not a dense architecture
or financial table.

Black pages never use yellow-green glow, gradient, particles, pill CTAs, large
drop shadows, or a light illustration converted by negative inversion.

## Deck rhythm

Target 20–25% black pages in a typical 22-page deck: cover, product chapter,
community chapter, commercial turn, and close. Keep intervening analytical runs
light. Avoid two dense black pages in succession; a black anchor should reset
attention and create narrative punctuation.

Illustration appears on roughly 6–8 pages: cover, ecosystem, product chapter,
community, activity/process, flywheel, and close. Product evidence uses real UI
screenshots. Finance, team, competition, and operating metrics use native
information graphics.

## Components and effects

- Icons: canonical icons or Lucide-like 1.5–2 px line icons; never emoji.
- Charts: direct labels, restrained axes, no 3D, no legend when inline labels
  work.
- Tables: flat rows, strong typographic hierarchy, limited rules.
- Screenshots: preserve legibility, crop intentionally, add a thin structural
  border only when needed.
- Halftone: only regular structural dot fields in illustrations.
- Shadows: only a subtle object-grounding shadow inside an illustration; never
  on cards, titles, logos, charts, or UI chrome.
- Gradients, glow, glassmorphism, random paper noise, and decorative particles
  are prohibited.

## Accessibility and export

- Maintain readable contrast for body copy and source text.
- Never encode a distinction with color alone; pair it with label, shape, or
  position.
- Verify the PDF export at 100% and a projected-distance thumbnail.
- Keep chart labels and sources live text when possible.
- Record any intentional font substitution in production notes.

## AIPOCH Investor Deck Style Lock

Append this block only through the opt-in `investor-deck` preset. The canonical
core lock remains first and authoritative.

```text
AIPOCH INVESTOR DECK STYLE LOCK
AUTHORITY: repository extension layered after AIPOCH core; never override canonical logo, icon, or brand-token rules.
FORMAT: 16:9; minimum 5% safe margin; fixed content-title baseline; source bar lower left; page number lower right.
BRAND SIGNATURE: cover/close use a complete 48–92px Primary, Inverse, or Stacked logo; chapter openers use a complete 32–40px horizontal logo; ordinary content/data pages use only the 10–12pt Roboto Mono label "AIPOCH / INVESTOR DECK" with a short yellow rule or Grid Origin.
LOGO: preserve original aspect ratio, color, and 1x clear space; never split, tint, fade, or undersize; every complete logo on black uses the official Inverse asset; Stacked is allowed on the close.
LIGHT CANVAS: #FCFCFA or #F7F7F4 background; #111111 primary text; #6B6B66 secondary text; #E7E5DE structure.
BLACK CANVAS: #111111 background; #FCFCFA primary text; #B4B4AE secondary text; #4E4E49 structure; #FBDD67 is the only focus; use only for cover, chapter anchors, strategic turns, and close.
BLACK PAGE TYPES: Black Hero, Black Split, or Black System Frame; large type, sparse copy, large negative space; never place a complex table on black.
RHYTHM: approximately 20–25% black pages; keep analytical pages light; illustrations appear on approximately 6–8 narrative pages.
COLOR: canonical #FCFCFA #F7F7F4 #E7E5DE #111111 #6B6B66 #FBDD67 #EA580C; one focus color per slide.
TYPE: Chinese Noto Sans SC/Light; English Inter; labels and sources Roboto Mono; at most one short Tinos Italic Latin word per title.
TYPE SCALE: hero 52–64pt; content title 36–44pt; dense title >=32pt; body 16–20pt; data label 14–16pt; table >=12pt; source/folio 10–12pt.
ILLUSTRATION: scientific editorial line art; structured halftone; research symbols; isometric workflows; yellow connection arcs and nodes; preserve large copy-negative space.
DARK ILLUSTRATION: compose natively for black with warm-white lines, gray structural halftone, and one yellow node or path; never create by negative inversion.
EVIDENCE: real product pages use legible UI screenshots; finance, team, competition, and operations use native information graphics; put dated sources in the lower-left source bar and full citations in speaker notes.
RESTRAINT: no gradients, luminous marketing effects, capsule-shaped calls to action, decorative particles, glass effects, random paper noise, emoji, 3D charts, or shadows on cards, titles, logos, charts, and UI.
```
