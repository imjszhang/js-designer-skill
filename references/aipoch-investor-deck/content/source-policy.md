# Evidence and source policy

Investor materials are claims artifacts. Every factual statement must be
traceable, scoped, dated, and distinguished from projections.

## Required metadata for numbers

Every displayed number includes:

1. value and unit;
2. measurement period or “as of” date;
3. scope/population/geography when ambiguous;
4. status: `Actual`, `Forecast`, `Target`, or `Illustrative`;
5. concise lower-left source reference;
6. full citation or calculation method in speaker notes.

Never infer a unit, denominator, or period from visual context alone.

## Claim classes

### Verified company fact

Approved internal or audited evidence. State the measurement definition and
data cutoff. Do not silently combine differently defined periods.

### Public external fact

Use a stable publisher, title, date, and URL/document identifier. Record access
date for changing web pages. Prefer primary sources to summaries.

### Forecast or target

Label it on-slide. Speaker notes list key assumptions and responsible owner.
Do not style a forecast exactly like an actual series without a direct legend
or visual distinction.

### Illustrative model

Label “Illustrative” and state that it is not guidance. Show the formula or
scenario assumptions in notes or appendix.

## Source bar

- Position: lower left within the 5% safe area.
- Type: Roboto Mono, 10–12 pt.
- Maximum: two lines on the slide.
- Format: `Source: Publisher, work/title, YYYY-MM-DD · Company data as of
  YYYY-MM-DD (Actual)`.
- Use short source keys only when the full source register is included in
  speaker notes or appendix.
- Never use an opaque internal source ID by itself.

## Speaker notes audit record

For each sourced slide, notes should contain:

```text
CLAIM:
STATUS: Actual | Forecast | Target | Illustrative
SOURCE OWNER:
SOURCE / URL:
PUBLISHED / DATA CUTOFF:
ACCESSED:
SCOPE AND UNIT:
CALCULATION / TRANSFORMATION:
APPROVAL:
```

Notes are not a place for hidden claims. Any conclusion necessary to understand
the slide remains visible on-slide.

## Competitive claims

- Use only public, date-stamped evidence.
- Apply the same criterion definition to every company.
- Use “not publicly verified” for absent evidence; do not translate absence to
  “no.”
- Avoid subjective superlatives unless a named independent source supports
  them.
- Record source links and access dates for each matrix row or cell group.

## Market sizing

- Separate TAM, SAM, SOM, and obtainable near-term opportunity.
- State whether the method is top-down, bottom-up, or both.
- Show currency, price year, exchange-rate date, geography, and category
  boundary.
- Avoid false precision; round values to the confidence supported by the data.

## Product and community evidence

- Product screenshots must show a real approved state; annotate release/version
  and capture date in notes.
- User quotes require consent and context; anonymization must be genuine.
- Community metrics define active status, duplicate handling, and time window.
- Do not include uploaded research files, identifiable patient information, or
  confidential customer data in screenshots.

## Final audit

- [ ] Every number has unit, period, scope, status, and source.
- [ ] Actuals and projections are visually and verbally separated.
- [ ] Competitive statements are public and date-stamped.
- [ ] Sources are readable in PDF and projection views.
- [ ] Full citations and transformations are in speaker notes.
- [ ] No imported r5/r6 internal facts, source IDs, names, or financing figures.
- [ ] Sensitive UI and personal/research data are absent or properly redacted.
