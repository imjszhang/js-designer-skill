# Content: Agent loops praxis (X Article deliverable)

> Source: `x-articles-js/deliverables/x-article/agent-loops-praxis/article.md`
> Published: 2026-07-21 · https://x.com/i/article/2079182399943147520
> Visual system: `../napkin-one-pager-system.md`

## Page meta

| 字段 | 值 |
|------|-----|
| `language` | English |
| `page_title` | Agent loops — lineage, gates, and five pieces on one page |
| `aspect_ratio` | 16:9 landscape 1536×1024 |
| `reading_order` | Title → cards 1–9 → Build Order footer |

## Margin annotations (blue handwritten)

- Left: "design loops, not prompts"
- Right: "never grades its own homework"

## Cards (3×3)

### Card 1 — what a loop is

- **Title**: what a loop is
- **Body**: A **small program** feeds the agent a **prompt**, reads **output**, decides **done**; if not, another round. The model is a subroutine inside your loop.
- **Diagram**: linear flow: program → agent → output → decision diamond → loop back or exit

### Card 2 — the fake edge

- **Title**: the fake edge
- **Body**: Hand-typing every agent prompt is the unnecessary sequential step. Replace with a **designed loop** that prompts agents for you.
- **Diagram**: red X on "manual prompt each time"; dashed shortcut to "loop owns prompts"

### Card 3 — the diamond

- **Title**: the diamond
- **Body**: **Maker-checker**: worker agent and reviewer agent run in parallel paths, then **fan-in** at verify.
- **Diagram**: one task → worker + reviewer → merge at shield gate

### Card 4 — the checker

- **Title**: the checker
- **Body**: **Verify** is a hard gate: tests, lint, rubrics. The worker **cannot grade its own homework**.
- **Diagram**: checklist titled "Is it done?" with checkmark rows

### Card 5 — the stop rule

- **Title**: the stop rule
- **Body**: **Double exit**: objective **done** shuts down, or **iteration/budget caps** force halt.
- **Diagram**: mini-table "keep looping" vs "stop" with stop icon

### Card 6 — the human gate

- **Title**: the human gate
- **Body**: Pass **four conditions** before you automate; fail any one and keep **hand-prompting**.
- **Diagram**: four conditions → human approval icon → "/loop or cron"

### Card 7 — four conditions

- **Title**: four conditions
- **Body**: (1) task repeats weekly+ (2) output auto-rejected by rules (3) agent finishes end-to-end (4) **done** is objective—not taste
- **Diagram**: vertical list with loop, file, list, agents icons

### Card 8 — three builds you can copy

- **Title**: three builds you can copy
- **Diagram**: 3-column table: **ralph** anchor reset | **/goal** validator done | **orchestration** loops supervising loops

### Card 9 — quick legend

- **Title**: quick legend for the icons
- **Diagram**: split, check gate, approval gate, loop, job/skill file, running notes/state, data, agents

## Build Order (footer)

1. **run** — hand-run the task once
2. **skill** — codify as reusable skill file
3. **gate** — add verify + stop
4. **schedule** — cron or /loop
5. **orchestrate** — only after one loop is stable

## Source attribution (small footer note, optional)

Based on X Article "What Is an Agent Loop?" (agent-loops-praxis), published 2026-07-21.
