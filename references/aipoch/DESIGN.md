---
version: alpha
name: AIPOCH Visual Design System
description: Official AIPOCH visual rules mirrored from design-system.aipoch.com, with Figma color tokens as the normative palette.
omitted:
  - section: rounded
    reason: Official page does not publish a rounded token scale
  - section: components
    reason: Official page documents components in prose, not DESIGN.md component tokens
colors:
  primary: "#EDB732"
  primary-050: "#FFF9DE"
  primary-100: "#FFF4B8"
  primary-200: "#FFEC8C"
  primary-300: "#FBDD67"
  primary-400: "#F6CC46"
  primary-500: "#EDB732"
  primary-600: "#D08D23"
  primary-700: "#A66B1C"
  primary-800: "#7A4D16"
  primary-900: "#52320F"
  accent-orange: "#EA580C"
  neutral-050: "#FCFCFA"
  neutral-100: "#F7F7F4"
  neutral-200: "#E7E5DE"
  neutral-300: "#D9D7D0"
  neutral-400: "#B4B4AE"
  neutral-500: "#8E8E87"
  neutral-600: "#6B6B66"
  neutral-700: "#4E4E49"
  neutral-800: "#2A2A28"
  neutral-900: "#111111"
  success-100: "#E0EBE7"
  success-300: "#9FBFB4"
  success-500: "#5A8876"
  success-700: "#3E6B5A"
  success-900: "#2C5348"
  warning-100: "#F6EEDC"
  warning-300: "#D8B96D"
  warning-500: "#C18E2A"
  warning-700: "#8F6118"
  warning-900: "#5B3C0E"
  error-100: "#F5E3E1"
  error-300: "#D69A94"
  error-500: "#B85E57"
  error-700: "#8D4A44"
  error-900: "#603733"
  state-info: "#4B6778"
typography:
  headline-display-base:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.025em
  headline-display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.025em
  headline-section:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: -0.025em
  headline-accent:
    fontFamily: Tinos
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
  panel-title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
  label-brand:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.18em
  label-system:
    fontFamily: Roboto Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.18em
  inline-code:
    fontFamily: Roboto Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
  banner-title-base:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.025em
  banner-title-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.025em
  banner-cta-base:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 500
    letterSpacing: 0.1em
  banner-cta-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.1em
spacing:
  note: 4px
  micro: 12px
  section: 24px
  panel: 32px
  major: 48px
  desktop-columns: 12
---

# AIPOCH Visual Design System

Official source: [design-system.aipoch.com](https://design-system.aipoch.com/).
Figma source named on that page: AIPOCH UI Component Library → Foundations → Color Scheme.
Local assets: [assets/README.md](./assets/README.md). Last verified: 2026-08-19.

YAML values that match Figma color tokens are normative. Typography and spacing
tokens below are DESIGN.md mappings of official written sizes, not extra Figma
names. Implementation observations from the documentation site are labeled as
such and must not override written rules.

`## Repository Extensions` at the end is this repository only. It is not
published by AIPOCH.

## Overview

AIPOCH should feel calm, precise, and legible. The official guideline is a
rule-based output system: approved brand elements, approved background language,
and one layout logic per asset.

### Evidence classes

- Figma token: hex values published as `color/primary/*`, `color/neutral/*`,
  semantic scales, `color/accent/orange`, and `color/state/info`.
- Official written rule: Global Rules, logo usage, typography roles, spacing
  roles, social templates, copy tone.
- Implementation observation: Tailwind classes, sidebar width, docs-site hover
  shadow, Banner DOM layout. Dated 2026-08-19.

### Global Rules

#### Mockups

- Mockups must be present in every template that defines a device visual.
- Mockups must keep the original aspect ratio at all times.
- Mockups must never be stretched, squashed, or distorted.

#### Typography

- Titles must use one emphasis only.
- Emphasis must use Tinos Italic.
- Approved brand accent colors may apply to the italic keyword only when the
  template defines that treatment.

#### Layout

- Extra frames, nested outlines, and duplicate containers are not allowed.
- Placeholder text and debug text must not appear in output.
- Templates must use only the approved structure defined in the system.

#### Consistency

- The left preview must match the right-side specification exactly.
- Every rendered element must be defined by the written rule set.
- Elements not defined in the specification must not appear in the preview.

## Colors

Figma names are the source of truth. `{colors.primary}` is the DESIGN.md-required
alias of `color/primary/500` / `{colors.primary-500}`.

### Figma scales

- Primary / Highlight `color/primary/050–900`: restrained warm yellow for
  emphasis, guided attention, and a single focal CTA per view.
- Neutral `color/neutral/050–900`: canvas, structure, reading, and borders.
- Semantic success / warning / error: workflow confirmation, caution, and
  blocking failure. Do not use them as decorative palette extras.
- `{colors.accent-orange}` = `color/accent/orange` `#EA580C`: approved keyword
  emphasis and standout CTA accents.
- `{colors.state-info}` = `color/state/info` `#4B6778`: context, guidance, and
  research notes.

### Compatibility mappings

These names are not Figma tokens. They only map official roles to Figma hex:

- canvas → `{colors.neutral-050}` `#FCFCFA`
- surface → `{colors.neutral-100}` `#F7F7F4`
- line → `{colors.neutral-200}` `#E7E5DE`
- primary-highlight → `{colors.primary-300}` `#FBDD67`
- text-primary → `{colors.neutral-900}` `#111111`
- text-secondary → `{colors.neutral-600}` `#6B6B66`
- text-tertiary → `{colors.neutral-400}` `#B4B4AE`

The documentation site often uses Tailwind `gray-*` in its own chrome. Do not
copy those grays over Figma neutrals.

Use one focal accent treatment per view. `{colors.primary-300}` and
`{colors.accent-orange}` must not compete unless a named template defines both.

## Typography

Inter is the interface face. Roboto Mono is the system voice. Tinos is the
sole headline accent face.

`{typography.headline-accent}` records Tinos weight and family only. Official
italic treatment is not expressible in DESIGN.md alpha YAML. Always apply
`font-style: italic` and `font-synthesis: none`. Never use browser-generated
italic. The italic keyword inherits the surrounding title size; it is not a
fixed 36px face.

### Hierarchy

- Hero: `{typography.headline-display-base}` at the default breakpoint,
  `{typography.headline-display-lg}` from `lg`. Official classes:
  `text-5xl lg:text-7xl font-normal tracking-tight`.
- Section: `{typography.headline-section}` / `text-4xl font-light tracking-tight`.
- Panel title: `{typography.panel-title}` / `text-xl font-medium`.
- Body: `{typography.body-md}` / `text-sm leading-[1.65]`. Keep sentences short,
  factual, and low-drama.
- Social brand marker: `{typography.label-brand}`, uppercase `AIPOCH` and
  `@AIPOCH`, compact and secondary to the headline.
- System label: `{typography.label-system}`, uppercase mono, e.g. `Ready`.
- Inline code: `{typography.inline-code}` with `{colors.neutral-200}` border and
  `{colors.neutral-100}` fill.

Approved italic keyword examples: Portfolio Signals, Accelerate Insight,
Product Focus.

### Banner type

Official Banner example uses `{typography.banner-title-base}` →
`{typography.banner-title-lg}` and `{typography.banner-cta-base}` →
`{typography.banner-cta-lg}`. These sizes come from the Banner example, not
from a separate Figma type scale.

## Layout

Official published spacing roles:

- `{spacing.panel}` 32px: default internal padding for technical panels.
- `{spacing.major}` 48px: gap between primary columns or major groups.
- `{spacing.section}` 24px: stacked content groups in one column.
- `{spacing.micro}` 12px: compact stacks.
- `{spacing.note}` 4px: tightly related metadata or note lines.
- `{spacing.desktop-columns}` 12: desktop grid.

Official grid label: `12-Column Desktop Grid max-w-6xl`, with an indexed
support rail example using `col-span-5`.

Use visible left, center, or grid alignment. Leave quiet zones around the
focal content. Structure must do more work than decoration.

Allowed background structures: line grids, orbit rings, bracket corners, node
fields, flat surfaces, and simple black or neutral planes. Backgrounds must
support the message and must not overpower it. Opacity stays inside the
approved palette.

Hard limits: no extra gradients unless already defined; no blur, noise, glow,
or atmospheric texture.

### Implementation observations (2026-08-19)

These are documentation-site measurements, not Figma tokens:

- guideline sidebar width 256px;
- main content `max-w-6xl` (1152px);
- large docs section gap approximately 144px (`space-y-36`);
- baseline grid used on the page is 30px at about 3% line opacity.

Do not promote these values into YAML tokens.

## Elevation & Depth

Hierarchy is tonal: canvas `{colors.neutral-050}`, surface
`{colors.neutral-100}`, and one-pixel `{colors.neutral-200}` lines. Use scale
and contrast before adding parts. Official social hard limits forbid blur,
noise, glow, atmospheric texture, and new gradients.

A hard frame is allowed only when a named template requires one unbroken frame.

### Implementation observation (2026-08-19)

The documentation-site icon download control uses a light hover fill
`#fbfaf7`, border `#d8d3c8`, and `box-shadow: 0 6px 14px rgba(17,17,17,0.04)`
at 240ms. That is local chrome, not a published elevation token. Do not treat
it as permission to add global shadows to brand output.

## Shapes

Official shape vocabulary is structural: circular marks, framed structure,
line grids, and decisive highlight blocks.

- Extra frames, nested outlines, and duplicate containers are forbidden.
- Template 3 yellow highlight behind `Focus` must have no border radius.
- Buttons in official examples are square-cornered ink or outline controls.
- `{rounded}` is omitted because the official page does not publish a radius
  scale. Docs-site cards using `rounded-2xl` / `rounded-xl` are chrome, not
  brand tokens.

Lens / Orbit forms are circular. `{colors.neutral-900}` center dots are
permitted as cadence marks, not as decorative pills.

## Components

Official component guidance is prose. DESIGN.md component tokens are omitted
so undocumented padding and widths are not elevated to schema values.

### Logo

Use only the official lockups. Local copies:

- Primary: `assets/logo/aipoch-logo-primary.svg` and `.png` (128×31). Light
  headers, navigation, standard interfaces.
- Inverse: `assets/logo/aipoch-logo-inverse.svg` and `.png` (128×31). Dark
  surfaces.
- Stacked: `assets/logo/aipoch-logo-stacked.svg` and `.png` (85×92). Footer or
  vertical signatures.

Define `x` as the rendered logo height. Keep `1x` clear space on all sides;
reduce to `0.5x` only when constrained. Standard UI height is about 32px;
48px for larger UI; 64px prominent. Keep original aspect ratio and set width
to auto. Do not lock 128×32 or apply horizontal sizes to the stacked mark.

Do: original proportions; default on light, inverse on dark; calm high-contrast
placement.

Don't: stretch, distort, rotate, re-space, recolor, add shadows/gradients/
outlines, or place the logo on busy or low-contrast backgrounds.

### Iconography

Lucide Core: 24×24 frame, 2px stroke, outline only, round caps and joins.
Official object names, in page order:

Bot, Activity, Info, Github, Layout, Cpu, Finance, Copy, Search, Close,
Check, Plus, Minus, ArrowRight, ArrowLeft, ChevronRight, ChevronDown,
Settings, MoreHorizontal, ExternalLink, Edit, Trash, Download, Upload, User,
Bell, Calendar, Clock, MessageSquare, File, Folder, Home, Link, Lock, Unlock,
Eye, EyeOff, Filter, Sliders, Share, Bookmark, Star.

Local files use official download names under `assets/icons/`, e.g.
`github.svg`, `arrowright.svg`, `messagesquare.svg`. Keep the official object
name `Github`. These SVGs are runtime reconstructions, not Figma tokens.

### Buttons

- Primary Ink: black fill, light text, uppercase wide tracking, optional
  ArrowRight. Single focal action.
- Secondary Outline: white fill, black border, same label discipline.
- Split Directional: black square with a white outline arrow beside a white
  label block.

Labels stay one to three words.

### Utility elements

- Neutral Tag: white / subtle line, uppercase 10px.
- Active Tag: `{colors.primary-300}` fill, black text and border.
- System Label: `{typography.label-system}`.
- Inline code: `--dry-run`, `/workspace/config`, `{colors.neutral-200}` border,
  `{colors.neutral-100}` fill.
- Copy / Copied: swap to a short confirmation, then reset.

### Interaction and motion

- Hover: accent the touched surface; keep structure and text contrast.
- Active / Focus: 1px outline / 2px offset before heavier fills.
- Copied / Success: short confirmation label, then automatic reset.
- Motion: 300ms direct response; 1000ms ambient settle. Slower motion is for
  color settling only, not structural shifts.
- `prefers-reduced-motion` on the docs site disables icon chrome transitions.

## Do's and Don'ts

### Do

- Do make one element read first: a headline, a lens form, or one color block.
- Do use one approved layout logic per graphic.
- Do use one Tinos Italic keyword per title.
- Do keep required mockups visible and undistorted.
- Do use only approved backgrounds and brand elements.
- Do keep labels operational, short, and factual.
- Do use the inverse logo on dark surfaces.
- Do match preview output to the written specification.

### Don't

- Don't mix Hero, Split, and Frame in one composition.
- Don't stretch, squash, or distort a required device mockup.
- Don't add a second highlight, duplicate frame, or nested outline.
- Don't introduce blur, noise, glow, atmospheric texture, or new gradients.
- Don't render placeholder text, debug text, or random symbols.
- Don't recolor, rotate, re-space, or add effects to the logo.
- Don't use playful verbs such as Grab, Explore Now, or Magic.
- Don't treat documentation-site chrome (sidebar, card radius, hover shadow)
  as published brand tokens.

## Social Media

Official written rule: social media is a rule-based output system, not a
single fixed template. Each asset must use approved brand elements, approved
background language, and one layout logic. Layout types must not be mixed.

### Brand elements

Official base vocabulary:

- Lens / Orbit: focal anchors, cadence markers, or end points. Runtime CSS,
  no standalone file.
- Grid Origin: `assets/brand-elements/H.svg`. Sets origin, alignment, and
  framing boundaries.
- Concentric Pattern: `assets/brand-elements/image-concentric-pattern.png`.
  Radial hierarchy and continuity.
- Background Styles: Light structural background and Dark radial background.

Derived template elements, not the same-level official asset cards: Highlight
Block and Device Mockup. Device mockups are DOM/CSS constructions with no
stable image URL.

### Background compositions

Official page copy says “direct SVG download”; the actual files are PNG.
All twelve are 3120×1755. Only 03 and 11 are dark.

| # | Name | Theme | Local file |
|---|---|---|---|
| 01 | Minimalist Center Focus | light | `assets/background-compositions/aipoch-background-01.png` |
| 02 | Array Pattern | light | `assets/background-compositions/aipoch-background-02.png` |
| 03 | Radial Composition (Dark) | dark | `assets/background-compositions/aipoch-background-03.png` |
| 04 | Scattered Elements | light | `assets/background-compositions/aipoch-background-04.png` |
| 05 | Symmetrical Grid | light | `assets/background-compositions/aipoch-background-05.png` |
| 06 | Technical Drawing | light | `assets/background-compositions/aipoch-background-06.png` |
| 07 | Dual Radial | light | `assets/background-compositions/aipoch-background-07.png` |
| 08 | Concentric Wave | light | `assets/background-compositions/aipoch-background-08.png` |
| 09 | Diagonal Flow | light | `assets/background-compositions/aipoch-background-09.png` |
| 10 | Corner Focus | light | `assets/background-compositions/aipoch-background-10.png` |
| 11 | Minimal Dark | dark | `assets/background-compositions/aipoch-background-11.png` |
| 12 | Hexagonal Matrix | light | `assets/background-compositions/aipoch-background-12.png` |

### Layout options

- Hero / single focus: one dominant visual, minimal text. Example line:
  “One field. One signal.”
- Split / dual rail: keep proof separate from message.
- Frame / margin-led: structured margins and one frame. Example line:
  “Structure must carry the read.”

### Composition rules

- Focal Point: one thing reads first.
- Alignment: visible left, center, or grid. No scattered floats.
- Negative Space: quiet zones around the focal content.
- Hierarchy: scale and contrast before adding parts.

### Correction logic

- If Weak: simplify; strengthen one anchor.
- If Crowded: delete; keep the strongest line, block, and message.
- If Empty: add an approved frame, grid, ring, or color plane. Do not decorate.

### Content examples

Official abstract examples, not platform skins:

- Editorial Hero / 4:5 — “Evidence needs a clear signal.” / One focus only.
- Structured Split / 1:1 — “Keep insight and structure distinct.”
- Framed Statement / 9:16 — “Structure must carry the read.” / Use approved
  elements only.

### Template 1: Dark Background / Portfolio Intro

Use only for portfolio, category-intro, or opening social slides. Text leads;
the device mockup supports. Mode: no frame / background-driven.

Composition Structure: pure black field; top-left brand; top-right handle;
center-left headline; supporting URL below; device mockup anchored at the
bottom.

Elements Breakdown: branding, handle, one-keyword italic headline with
`#FBDD67`, supporting URL, laptop mockup, pure black background, and
radial/grid overlays from approved brand elements.

Layout Rules: headline is the primary read; title block stays left-weighted;
mockup stays lower and wider than the text block; support text sits between
headline and device.

Constraints:

- Background must be pure black.
- Background pattern must render correctly with no artifacts or broken visuals.
- Title must use one italic keyword only.
- The italic keyword must use `#FBDD67`.
- Random symbols and debug elements must not appear.
- Mockup must not be distorted.

Official preview copy: `Portfolio Signals` and `www.aipoch.com`.

### Template 2: Framed Device Showcase

Use only for headline-led product showcase slides. Mode: single hard frame.

Composition Structure: light field; top-corner brand markers; centered
headline; framed device showcase in the center; one restrained brand graphic
behind.

Elements Breakdown: branding, handle, one-keyword italic headline where
Insight uses `#EA580C`, laptop mockup, one hard frame boundary, and one
approved grid/radial background element.

Layout Rules: composition stays vertically centered; headline stays above the
mockup; a single unbroken frame wraps the device area.

Constraints:

- Mockup is required and must always be visible.
- Only one frame is allowed. Duplicate and nested frames are not allowed.
- Mockup must keep the original aspect ratio with no distortion.
- Title must use one italic keyword only.
- The italic keyword must use `#EA580C`.
- Extra text and placeholder text must not appear.

Official preview copy: `Accelerate Insight`.

### Template 3: Soft UI / Product Promotion

Use only for softer product-led promotion. Mode: soft container / no visible
border.

Composition Structure: light neutral field with grid overlay; top-corner brand
markers; left-aligned headline; large rounded mockup container; centered CTA
below; yellow highlight `#FBDD67` behind Focus only.

Elements Breakdown: branding, handle, one-keyword italic headline, product
mockup inside a rounded container, CTA button, grid origin structure, approved
radial background pattern, and one `#FBDD67` highlight block behind Focus.

Layout Rules: headline stays in the upper-left read zone; mockup container is
the primary visual focus and must use the same scale and proportion logic as
the Framed Device Showcase; CTA sits below as a separate interaction band.

Constraints:

- Mockup is required and must be the primary visual focus.
- Mockup scale must match Framed Device Showcase ratio.
- `#FBDD67` highlight applies only to the word Focus.
- Yellow block must have no border radius.
- Only one highlight element is allowed.
- Extra text and placeholder content must not appear.

Official preview copy: `Product Focus` and `View Mockups →`.

### Banner Systems

Official example: LinkedIn Cover & Web Heroes / Web Horizontal. This is an
official page example, not a Figma token set.

Implementation observations from the live example (2026-08-19):

- canvas ratio `aspect-[2.6/1]`;
- left information pane 50%, `md` 60%; right graphic pane 50%, `md` 40%;
- left padding `p-10` / `lg:p-16` (40px → 64px);
- left pane white; right pane `#0f0f0f` with 2px black divider;
- title `{typography.banner-title-base}` → `{typography.banner-title-lg}`;
- CTA `{typography.banner-cta-base}` → `{typography.banner-cta-lg}`, black ink;
- official sample headline: “The new standard for clinical data agents.”
- official sample support: “Deploy fully verified medical AI skills in seconds.
  Completely private.”
- official sample CTA: `Experience V2`;
- right pane uses a grid overlay plus an already-defined dark fade;
- mock UI is DOM/CSS, starts at `rotate(-6deg)` + `skew-y-3`, 1000ms to rest.

Do not invent a new Banner gradient language beyond this example.

## Copy Tone

Official Copy Tone Application:

- Calm & Factual: “Run structured checks with clear visual hierarchy.”
- Hyped & Desperate, do not use: “Unlock the most powerful workflow ever built!”
- Preferred labels: `copy` / `copied` / `tip` / `ready`.
- Direct verbs: `Run`, `View`, `Copy`, `Ready`, `Unavailable`.
- Prefer one helper sentence over multi-step persuasion.
- Avoid `Grab`, `Explore Now`, or `Magic` in technical UI.

Keep it operational, short, and factual. Success and warning states read as
system feedback, not marketing.

## Repository Extensions

The following subsections are maintained by this repository. They are not
published on design-system.aipoch.com.

### Presentation System

Presentation slides inherit official tokens and social layout logic. They do
not inherit the obsolete May 2026 `#E8E8E8` / `#ECD44C` Neo-Brutalist notes.

Extension-only type sizes. These are not official DESIGN.md YAML tokens:

- Title: Inter 52px / weight 400 / line-height 1.08
- Section: Inter 36px / weight 300 / line-height 1.15
- Body: Inter 20px / weight 400 / line-height 1.45
- Label: Roboto Mono 12px / weight 500 / letter-spacing 0.12em

- Compose for 16:9. Keep essential content inside a 5% safe margin.
- When an image API only provides 1536×1024, compose a centered 16:9 safe
  frame and crop excess height. Do not stretch.
- Default canvas `{colors.neutral-050}` or `{colors.neutral-100}`.
- Dark `{colors.neutral-900}` only for a deliberate opener, divider, or close.
- One Tinos Italic keyword maximum in a title.
- Templates: Cover, Section divider, Horizontal timeline, Two-column
  comparison, Process diagram, Two-by-two system map. Choose Hero, Split, or
  Frame; do not mix.
- Charts: one accent series, explicit units, visible source. Omit the chart
  if source data is unavailable.

### Chinese Copy Safety

- Supply final visible Chinese copy separately from visual instructions.
- Quote required text verbatim.
- Review every generated character before delivery.
- Prefer a deterministic renderer when exact wording is mandatory.

### Agent Style Lock

Use this block as the stable visual constraint when generating an AIPOCH
asset. Add task-specific content after it.

```text
AIPOCH STYLE LOCK

Visual character: calm, precise, legible, scientific, and operational.
Canvas: warm neutral #FCFCFA or surface #F7F7F4; pure black only for an
approved dark template.
Typography: Inter for all standard text; exactly one title keyword may use
true Tinos Italic. Roboto Mono is reserved for compact system labels, paths,
codes, dates, and metrics.
Accent: use one focal treatment only. Use #FBDD67 for an approved warm-yellow
highlight or #EA580C for an approved orange keyword; do not use both as
competing accents.
Structure: choose exactly one layout logic — Hero, Split, or Frame. Build with
visible alignment, negative space, line grids, orbit rings, bracket corners,
node fields, flat planes, and at most one decisive highlight block.
Mockups: include a device mockup whenever the chosen template requires it.
Preserve its original aspect ratio; never stretch, squash, or distort it.
Effects: no blur, glow, noise, atmospheric texture, or decorative gradients.
Do not add global hard shadows, nested frames, or duplicate outlines.
Icons: Lucide-style outline icons, 24x24 geometry, 2px stroke, one color.
Copy: short, factual, low-drama, and operational. Render only final approved
visible copy. Never render prompt instructions, placeholders, debug text, or
random symbols.
Logo: use an approved Primary, Inverse, or Stacked asset without recoloring,
re-spacing, effects, or distortion. Keep original aspect ratio; width auto.
```

### Source Coverage Ledger

| Official section | DESIGN.md location | Evidence |
|---|---|---|
| 0 Global Rules | Overview → Global Rules | written rule |
| 1 Logo | Components → Logo + `assets/logo/` | written rule + HTTP assets |
| 2 Typography | Typography | written rule + DESIGN.md size mapping |
| 3 Color System | Colors YAML | Figma token |
| 4 Icon System | Components → Iconography + `assets/icons/` | runtime SVG |
| 5 Buttons & UI | Components | written rule |
| 6 Spacing & Grid | Layout | written rule |
| 7 Social Media | Social Media | written rule + PNG assets |
| Banner Systems | Social Media → Banner Systems | official example / observation |
| Copy Tone | Copy Tone | written rule |
| Presentation / Style Lock | Repository Extensions | repository only |
