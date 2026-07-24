# Content: How to master graph engineering (one page)

> 主题文案包。视觉令牌与组件规范见 `../napkin-one-pager-system.md`。
> 生成前 Gate A：确认本文件中的标题与要点是否需要改写；未确认不要改写字面量进 prompt。

## Page meta

| 字段 | 值 |
|------|-----|
| `language` | English |
| `page_title` | How to master graph engineering — the full course on one page |
| `subtitle` | (optional margin note themes) |
| `aspect_ratio` | 16:9 landscape, e.g. 1536×1024 |
| `reading_order` | Title → cards 1–9 left-to-right, top-to-bottom → Build Order footer |

## Margin annotations (handwritten blue, optional)

- Left: "boxes and arrows on a napkin"
- Right: "never grades its own homework"

## Cards (3×3 grid)

### Card 1 — what a graph is

- **Accent**: pale green
- **Title**: what a graph is
- **Body highlights**: `nodes` = jobs, `arrows` = data flow
- **Diagram**: linear flow left to right; include small "running notes" document icon on the path

### Card 2 — the fake edge

- **Accent**: soft orange
- **Title**: the fake edge
- **Body**: unnecessary sequential step that should be removed
- **Diagram**: show wrong path with red X and dashed lines vs correct shortcut

### Card 3 — the diamond

- **Accent**: light blue
- **Title**: the diamond
- **Body**: fan-out to parallel workers, fan-in to a check gate
- **Diagram**: one node → two parallel branches → merge → shield/check gate

### Card 4 — the checker

- **Accent**: lavender
- **Title**: the checker
- **Body**: validation before downstream work continues
- **Diagram slot**: checklist UI — heading like "Is it correct?" with 3–4 checkmark rows

### Card 5 — the stop rule

- **Accent**: pale green
- **Title**: the stop rule
- **Body**: when to split work vs step sequentially
- **Diagram slot**: mini-table two columns — "split work" vs "step-by-step work" with simple icons

### Card 6 — the human gate

- **Accent**: soft orange
- **Title**: the human gate
- **Body**: person approves before final action
- **Diagram**: research → draft → human approval (person icon) → final action

### Card 7 — the four safety rules

- **Accent**: light blue
- **Title**: the four safety rules
- **Body**: vertical list of 4 rules, each with icon prefix:
  1. loop icon — (rule about iteration limits)
  2. file/document icon
  3. list icon
  4. workers/agents icon

### Card 8 — three builds you can copy

- **Accent**: lavender
- **Title**: three builds you can copy
- **Diagram slot**: 3-column table listing example agent architecture names (short labels)

### Card 9 — quick legend for the icons

- **Accent**: pale green
- **Title**: quick legend for the icons
- **Diagram slot**: 2-column icon legend — split, check gate, approval gate, loop, job, running notes, data, agents

## Build Order (footer stepper)

Horizontal chevron segments, left to right:

1. **draw** — pencil icon — sketch on napkin
2. **delete** — trash icon — remove fake edges
3. **wire** — diamond icon — connect fan-out/in
4. **checker** — shield/check — add validation
5. **ship** — (optional) — run with human gates

Adjust step labels to match final approved copy before generate.

## Locked variables for series / consistency

```
palette_family: cream #FDFBF4 + rotating card accents (green, orange, blue, lavender)
linework: thin dark gray, slightly hand-drawn imperfection
card_shape: rounded rectangle, numbered circle top-left
icon_style: outline icons, consistent stroke weight
typography: clean sans headings; blue handwritten margin notes only
footer: chevron process stepper full width
```
