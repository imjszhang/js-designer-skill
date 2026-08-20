# Investor Deck illustration reference manifest

These files are reduced visual-style evidence extracted from an external
presentation. They are not official AIPOCH assets and must not be used directly
in a published deck.

```yaml
reference-only: true
license: not-published
external-source:
  filename: aipoch-investor-deck-v3-r5.pptx
  sha256: 77940293f01ba21a3ea4852229f5638765aa4fa2954a7844999a91db29bb1a89
  repository-copy: prohibited
derivation:
  tool: macOS sips
  operation: preserve aspect ratio; constrain longest edge to 1280 px; encode PNG
  sensitive-content-check:
    excluded:
      - product screenshots
      - speaker notes
      - financing and operating data
      - team and person identities
      - source IDs and internal copy
assets:
  - file: illustration-references/r5/global-research-network.png
    role: global research network
    source-media: ppt/media/image.png
    source-media-sha256: 305412e7752a021c26120f63a74a9810dc6de2efb272d99025a11fcff91aab91
    derived-sha256: de45ece27dca6b3b4632cbc1242d54af4578f2ccbb6013417e60a78da41ff23b
    dimensions: 1280x720
    reference-only: true
    license: not-published
  - file: illustration-references/r5/research-ecosystem-ring.png
    role: research ecosystem ring
    source-media: ppt/media/image3.png
    source-media-sha256: 313771d696222096b8ece5e305864eb2ed39aa08c0df0c0d9d15a301c6d5677f
    derived-sha256: 2addaf94f5e0ce1bf6174d4f9adf60155770d6af0556b3e3469a8eeb8bc19761
    dimensions: 1280x720
    reference-only: true
    license: not-published
  - file: illustration-references/r5/three-stage-translation.png
    role: three-stage research translation
    source-media: ppt/media/image2.png
    source-media-sha256: 4813d54c13ee7ecca57acd8b29036084fbbbc25bf1adff785aaf8f8040b6362c
    derived-sha256: e5428dc14b019fdf06e10560f6413cf3dd0f35f2f8344c09d9f2bc16f42cc1b1
    dimensions: 1280x445
    reference-only: true
    license: not-published
  - file: illustration-references/r5/research-workflow-flywheel.png
    role: research workflow flywheel
    source-media: ppt/media/image4.png
    source-media-sha256: 3368d96e55d1238b9cd72777b42c06231d8930794f60cfd1b57d5d625b69b13e
    derived-sha256: 4527305dbd189de30a02971e6fc3986ccb2df0c0cd802d27cba97654989cb94a
    dimensions: 1280x720
    reference-only: true
    license: not-published
```

## Excluded embedded media

- `ppt/media/image.jpeg`: product UI screenshot containing research content.
- `ppt/media/image5.png`: repeated global-network closure artwork, excluded to
  avoid duplicating the same composition.

The r6 file is recorded only in `../audit-r5-r6.md`; no r6 media was mirrored.
