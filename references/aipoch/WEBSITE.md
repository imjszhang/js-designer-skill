---
name: AIPOCH Public Website Implementation Profile
source: https://aipoch.com/
profile: website
status: observed-not-normative
last_verified: 2026-08-20
---

# AIPOCH Public Website Implementation Profile

This document records the visible implementation of
[aipoch.com](https://aipoch.com/) as observed on 2026-08-20. It is an
official-site implementation profile, not a published design-system
specification and not a Figma token source.

Canonical brand rules remain in [DESIGN.md](./DESIGN.md), mirrored from
[design-system.aipoch.com](https://design-system.aipoch.com/). Browser evidence
is listed in [assets/website/README.md](./assets/website/README.md).

## Authority and precedence

Use the following order when evidence conflicts:

1. Figma color tokens and official written rules in `DESIGN.md`;
2. dated live DOM/CSS observations in this file for reproducing
   `aipoch.com`;
3. repository-only presentation rules in `DESIGN.md` → Repository Extensions;
4. historical `aipoch-css1.css` / `aipoch-css2.css` snapshots for comparison
   only.

This means:

- brand tokens, logo handling, and icon geometry come from `DESIGN.md`;
- website section structure, responsive behavior, and current effects come
  from this file only when the `website` Profile is explicitly selected;
- an observed website value is not promoted into `DESIGN.md` YAML;
- a mismatch is documented as drift instead of silently normalized.

## Evidence classes

- **shared brand signal** — visible on the website and aligned in intent with
  `DESIGN.md`, such as Inter, Roboto Mono, one yellow focal action, lens marks,
  line grids, and numbered system labels.
- **website-only application pattern** — a live marketing-site composition
  that is not published as a Foundation or social template.
- **explicit drift** — a live implementation that conflicts with the
  canonical design-system rule or token.
- **legacy local chrome** — an isolated control whose styling must not define
  the wider site, currently the cookie-choice panel.

Evidence was collected from rendered desktop (1440×1200), tablet (768×1024),
and mobile (390×844) viewports, plus live DOM/computed-style inspection. The
site is mutable; every observation below is dated.

## Site scope

The main audited route is `/`, titled “AIPOCH | The Open-Source Harness for
Scientific Research.” Its current content sequence is:

1. global navigation;
2. Open Science Hero and Product Tour;
3. latest release and editorial ticker;
4. “What it does” capability summary;
5. ecosystem signal flow;
6. Open Science workbench detail;
7. medical research Skills library;
8. MedSkillAudit release gate;
9. closing CTA and global footer.

`/open-science` uses the same brand voice but a longer editorial/product-story
layout. It is supporting evidence, not the baseline for this Profile.

## Global chrome

### Navigation

Observed desktop navigation:

- 72px fixed top bar;
- horizontal logo at approximately 32px visual height;
- uppercase Inter semibold links at about 12px with `0.08em` tracking;
- transparent/dark treatment over the Hero, with a translucent dark settled
  state and subtle bottom line after scroll;
- Product menu rendered as a roughly 322×212 panel with icon, title, status
  badge, and one-sentence description.

At tablet and mobile widths the link row collapses to a menu icon. The header
remains dark and the logo retains its original proportions.

Classification: shared brand signal for the logo and compact labels;
website-only application pattern for fixed navigation and mega menu.

### Footer

The footer uses a near-black `#1A1A1A` field, inverse lens/wordmark treatment,
and grouped Resource / Explore / Connect / Legal rails. Rail labels are compact
uppercase system labels with reduced white opacity.

Classification: website-only application pattern using shared brand signals.

### Cookie choice panel

The consent panel is a white, square-cornered overlay with black controls and a
hard `6px 6px 0 rgba(0,0,0,0.92)` shadow. Its hover yellow can reach
`#FACC15`.

Classification: legacy local chrome. Do not copy its hard shadow, button
geometry, or Neo-Brutalist treatment into marketing sections, presentations,
or canonical components.

## Color

### Observed website roles

- marketing dark canvas: `#141519`;
- deeper product mockup plane: approximately `#0F1013`;
- footer: `#1A1A1A`;
- light/grid canvas: `#E8E8E8`;
- focal yellow / CSS primary: `#ECD44C`;
- dark text: `#111111`;
- light text: approximately `#E7E9EE`;
- dark-section supporting text: approximately `#B7BCC6`;
- light-section supporting text: approximately `#555555`;
- dark dividers: white at roughly 10% opacity;
- light dividers: black at roughly 14–15% opacity.

The website also uses local release-gate state fills close to Tailwind green,
amber, gray, and red values. They are not the semantic scales published in
`DESIGN.md`.

### Canonical comparison

- `#ECD44C` is not `{colors.primary-500}` `#EDB732` or the approved
  `{colors.primary-300}` `#FBDD67` highlight.
- `#E8E8E8` is not `{colors.neutral-050}` `#FCFCFA` or
  `{colors.neutral-100}` `#F7F7F4`.
- `#141519`, `#0F1013`, and the local disposition fills are not Figma tokens.

These values are explicit drift. They are allowed only when reproducing the
dated website Profile.

## Typography

The live site loads Inter and Roboto Mono. No Tinos face was present in the
observed font set.

### Observed hierarchy

- Hero H1: `clamp(30px, 4.4vw, 54px)`, Inter ExtraBold 800, approximately
  `-0.035em` tracking;
- large section heading: `clamp(32px, 5.2vw, 64px)`, Inter ExtraBold 800;
- dark-section body: around 16.5px with line-height near 1.7;
- light-section body: around 18px;
- system labels: Roboto Mono 10–11px, uppercase, `0.12–0.18em` tracking;
- compact metrics: about 19px ExtraBold with small mono labels.

The Hero emphasizes the word “workbench” with `<em class="italic">`, but the
computed face is synthesized Inter Italic at weight 800. The closing phrase
“yours to run.” uses the same treatment plus a yellow underline.

Classification:

- Inter and Roboto Mono roles are shared brand signals;
- ExtraBold marketing hierarchy and underline are website-only patterns;
- synthesized Inter Italic is explicit drift from the required Tinos Italic
  and `font-synthesis: none`.

## Layout

### Page grid

- main desktop content width: approximately 1320px;
- Hero desktop columns: roughly 0.86fr text / 1.14fr Product Tour;
- light sections use a 56px square line grid at about 2.5% black opacity;
- dark and light full-width regions alternate through the long page;
- borders and alignment lines carry most local grouping.

The 1320px container and 56px grid are website observations. They do not
replace the official `max-w-6xl` documentation example or 12-column token.

### Responsive behavior

- desktop: full navigation and two-column Hero;
- tablet: menu icon replaces navigation; Hero text and release badge remain
  on one dark field; metrics become a full-width four-cell rail; primary and
  secondary download actions remain side by side;
- mobile: single-column Hero; release badge moves above metrics; long copy is
  allowed to extend beyond the first viewport; controls and modules stack;
- preserve the Product Tour and media aspect ratios rather than squeezing
  their internal UI.

The cookie panel can dominate the mobile viewport. That is an observed
accessibility/usability issue, not a target composition rule.

## Components

### Buttons and action clusters

Observed marketing actions use:

- yellow filled pill for the primary download;
- dark or transparent outline pill for alternatives;
- white filled and outline pills on the closing dark CTA;
- compact social pills for GitHub, Discord, X, and YouTube;
- a muted rounded GitHub URL strip below primary actions.

Rounded-full marketing CTAs are website-only patterns. They do not replace the
square-cornered Primary Ink / Secondary Outline controls in `DESIGN.md`.

### Cards and panels

- ecosystem cards: white, approximately 16px radius, selected card with a dark
  inset boundary;
- Skills grid: mostly square-cornered white cells with black/14 borders and
  dark inversion on hover;
- audit disposition cards: approximately 16px radius with local semantic fills;
- Product Tour: approximately 16px radius with
  `0 40px 90px rgba(8,10,16,0.45)` style depth;
- navigation and GitHub strips: approximately 8–13px radius.

There is no universal website radius token. Record the role with the
observation; do not export a rounded scale.

### Visual effects

The Hero uses large yellow and green radial fields, roughly 720px and 560px,
with blur near 110px and low alpha. The focal yellow button uses a restrained
yellow shadow. Product preview panels use large soft depth. Some tour content
contains particles or granular texture.

These are website-only patterns and explicit drift from the social hard limit
that forbids blur, glow, noise, atmospheric texture, and new gradients.

## Section patterns

### Open Science Hero

- dark full-width field;
- left rail: yellow signal line, mono eyebrow, H1, explanatory copy, metrics,
  download cluster, repository strip, social links, three getting-started
  steps;
- right rail: release badge and large Product Tour;
- one focal yellow action;
- asymmetry comes from the wider visual rail, not scattered placement.

### Release and editorial signal

- latest release card with date, version, and compact change summary;
- paired horizontal editorial tickers driven by JS transforms;
- motion is subordinate to release metadata.

### Ecosystem signal flow

- section marker `§01 · ECOSYSTEM / SIGNAL FLOW`;
- three numbered nodes — workbench, library, release gate — connected in one
  horizontal flow;
- selected node expands into a dark detail rail.

### Workbench detail

- section marker `§02 · FLAGSHIP / THE WORKBENCH`;
- provider rail, four-step plan/execute/produce/preview sequence, and large
  Preview Panel;
- internal tabs use Data, Documents, Images, Source, Structures, and Notebook;
- terminal-window conventions use compact dots and mono metadata.

### Skills library

- section marker `§03 · AGENT SKILLS / THE LIBRARY`;
- four peer cells for Evidence Insights, Protocol Design, Data Analysis, and
  Academic Writing;
- cells invert to dark on hover;
- supported-agent ticker and install command form a secondary band.

### MedSkillAudit release gate

- section marker `§04 · BENCHMARK / RELEASE GATE`;
- submitted → audit → library capsule flow;
- four disposition cards: Production Ready, Limited Release, Beta Only,
  Reject;
- quality score and high-risk flag are factual system outcomes, not decorative
  color categories.

### Closing CTA

- dark centered field;
- title “Open, auditable, and yours to run.”;
- one synthesized italic phrase with yellow underline;
- paired GitHub and exploration actions.

## Motion

Observed timing and behavior:

- navigation color/state transition: about 350ms;
- menu and common hover feedback: about 150ms;
- card hover: 250–300ms with up to 3px vertical translation;
- social pills: subtle upward translation;
- editorial tickers: JS-driven continuous horizontal transforms;
- local provider, step, tab, and ecosystem selections update content in place.

Structural hover translation conflicts with the design-system guidance that
slower motion should not shift structure. Use it only in website Profile
reproduction, and respect `prefers-reduced-motion`.

## Copy

The website voice is scientific, explicit, and product-led:

- Hero: “The open-source AI research workbench.”
- Primary action: “Download for macOS” with an “All platforms” alternative.
- Operational claims: “Execution, not suggestions,” “Traceable artifacts,”
  “Any model,” “Local-first.”
- Ecosystem labels: workbench, library, release gate.
- Closing line: “Open, auditable, and yours to run.”

The site uses “Explore,” “Browse,” and “Get started” in marketing navigation.
Those are website acquisition labels, not permission to weaken the compact
technical microcopy rules in `DESIGN.md`.

## Accessibility observations

- light/dark section contrast and persistent text hierarchy are generally
  clear;
- keyboard focus must remain visible when pill buttons are reproduced;
- continuous tickers require a reduced-motion or paused alternative;
- synthesized italic can reduce consistency and should not be generalized;
- the cookie panel consumes most of a 390×844 viewport and should be treated
  as local compliance chrome;
- body copy and Product Tour internals must not be compressed below readable
  size when adapting to mobile.

These are observations, not a completed accessibility conformance audit.

## Known drift

The following live choices conflict with canonical `DESIGN.md` and must remain
scoped to this Profile:

- `#ECD44C`, `#E8E8E8`, `#141519`, `#0F1013`, and local disposition colors;
- synthesized Inter Italic instead of Tinos Italic;
- Hero and section titles at weight 800 instead of 400/300;
- pill CTAs and observed 8–16px card radii;
- radial blur glow, large soft shadows, particles, and hover lift;
- 1320px container and 56px background grid;
- legacy Neo-Brutalist cookie shadow.

Shared signals that remain valid across Profiles:

- Inter for interface copy and Roboto Mono for system labels;
- original-proportion AIPOCH logo;
- one focal yellow action per composition;
- lens dots, indexed labels, line grids, strong alignment, and restrained copy;
- undistorted product mockups.

## AIPOCH Website Profile Lock

Use this block only when a task explicitly requests the current
`aipoch.com` marketing-site look. It is standalone and must not be appended to
the canonical core lock because several effects intentionally conflict.

```text
AIPOCH WEBSITE PROFILE LOCK

Scope: reproduce the dated public marketing implementation of aipoch.com, not
the canonical Figma foundations or the social-media system.
Character: open-source scientific infrastructure; dark, editorial, technical,
auditable, and product-led.
Canvas: alternate #141519 dark sections with #E8E8E8 light grid sections.
Use #0F1013 for deep product preview planes and #1A1A1A for the footer.
Accent: #ECD44C is the single focal website action color. Do not reinterpret
it as a Figma token or leak it into core or presentation Profiles.
Typography: Inter for marketing headlines and body; ExtraBold may be used for
Hero and section headlines. Roboto Mono is reserved for indexed labels,
versions, paths, metrics, and system metadata. The live site synthesizes
Inter Italic for one emphasized phrase; record that as website drift, never as
the canonical Tinos rule.
Structure: build a long alternating dark/light page with a 72px global
navigation, approximately 1320px desktop content width, visible lines,
section markers, numbered flows, metrics rails, and one dominant product
preview per section.
Patterns: use the asymmetric Open Science Hero, release signal, ecosystem
three-node flow, step rail plus Preview Panel, invert-on-hover Skills grid,
release-gate disposition cards, and a centered closing CTA only when relevant.
Controls: marketing actions may use pill geometry; cards may use observed
8–16px role-specific radii. Do not create a universal radius token.
Effects: low-alpha yellow/green radial glow, restrained yellow CTA shadow,
large Product Tour depth, and subtle hover lift are website-only. Keep them
behind content and never apply the cookie panel's hard shadow to the main UI.
Grid: light regions may use a 56px one-pixel square grid at very low opacity.
Motion: keep direct feedback within 150–350ms, provide reduced-motion behavior,
and avoid motion that competes with scientific content.
Copy: factual but acquisition-aware. Prefer open, local-first, model-agnostic,
traceable, reproducible, inspectable, and auditable claims. Do not render
placeholder, prompt, consent, or debug copy as marketing content.
Assets: use approved logo files without distortion. Treat Product Tour,
tickers, ecosystem diagrams, glow, and mock UI as runtime constructions unless
a stable public source asset is explicitly mirrored.
```

## Source coverage ledger

| Area | Evidence | Profile classification |
|---|---|---|
| Navigation / mega menu | live DOM + desktop/tablet/mobile captures | website-only |
| Hero / metrics / download cluster | live DOM + captures + computed style | website-only + drift |
| Product Tour | live DOM/CSS | website-only runtime construction |
| Release / editorial ticker | live page text + JS motion observation | website-only |
| Ecosystem signal flow | live DOM/CSS | website-only, shared structural signal |
| Workbench Preview Panel | live DOM/CSS | website-only runtime construction |
| Skills grid | live DOM/CSS | website-only |
| MedSkillAudit cards | live DOM/CSS | website-only + local semantic drift |
| Closing CTA / footer | live DOM + computed style | website-only |
| Cookie choice panel | live capture | legacy local chrome |
| Canonical tokens / logo / icons | [DESIGN.md](./DESIGN.md) | core authority |
| Website screenshots | [assets/website/README.md](./assets/website/README.md) | dated browser evidence |
