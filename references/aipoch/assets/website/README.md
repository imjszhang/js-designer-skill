# AIPOCH public website evidence manifest

Browser-captured evidence for the dated implementation profile in
[../../WEBSITE.md](../../WEBSITE.md). Source:
[aipoch.com](https://aipoch.com/). Captured 2026-08-20 with Google Chrome
151.0.7922.138 on macOS.

This directory is intentionally separate from the 62-file official
design-system mirror in [../README.md](../README.md). The screenshots are
observational evidence, not downloadable AIPOCH source assets and not Figma
tokens. Source licensing for the public site is not published; treat these
captures as `license: not-published`.

The cookie-choice panel is visible because it is part of the live page's local
chrome. No consent choice or form was submitted. Dynamic product mockups,
tickers, ecosystem diagrams, radial glows, and section backgrounds are
DOM/CSS/JS runtime constructions and are not mirrored as standalone assets.

| id | local_path | source | captured_at | viewport | media_type | bytes | dimensions | sha256 | transformation |
|---|---|---|---|---|---|---|---|---|---|
| home-desktop | `screenshots/home-desktop-1440x1200.png` | https://aipoch.com/ | 2026-08-20 | 1440×1200 | image/png | 279544 | 1440×1200 | `a7f419b5e66fc1c6ea4f2683bb563307db50d7303889985cbd02e67af020e23c` | browser screenshot; viewport crop |
| home-tablet | `screenshots/home-tablet-768x1024.png` | https://aipoch.com/ | 2026-08-20 | 768×1024 | image/png | 151284 | 768×1024 | `69accebb2f72e1a475f52826edf3b6232cda9a598c10664653dc15a246f3c6d3` | browser screenshot; viewport crop |
| home-mobile | `screenshots/home-mobile-390x844.png` | https://aipoch.com/ | 2026-08-20 | 390×844 | image/png | 92096 | 390×844 | `7d4ed89615481ba66eb9be32cfced964128d480c388b0d3eb6b1c56d58f3c288` | browser screenshot; viewport crop |

## Evidence limits

- Captures prove the visible viewport at the stated date and size; they are
  not pixel-reference masters for future releases.
- Computed values, responsive behavior, and interaction observations are
  recorded in `WEBSITE.md`, not inferred solely from these images.
- The live page can change independently of this repository. Re-capture and
  update hashes whenever `last_verified` changes.
- Stable logos and design-system backgrounds remain under the parent asset
  mirror and must not be duplicated here.
