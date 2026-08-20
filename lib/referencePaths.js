'use strict';

const path = require('path');

const referencesRoot = path.resolve(__dirname, '..', 'references');

const referencePaths = {
  root: referencesRoot,
  readme: path.join(referencesRoot, 'README.md'),
  aipoch: {
    dir: path.join(referencesRoot, 'aipoch'),
    designSystem: path.join(referencesRoot, 'aipoch', 'DESIGN.md'),
    website: path.join(referencesRoot, 'aipoch', 'WEBSITE.md'),
    css1: path.join(referencesRoot, 'aipoch', 'aipoch-css1.css'),
    css2: path.join(referencesRoot, 'aipoch', 'aipoch-css2.css'),
    assetsDir: path.join(referencesRoot, 'aipoch', 'assets'),
    assetsReadme: path.join(referencesRoot, 'aipoch', 'assets', 'README.md'),
    websiteAssetsDir: path.join(referencesRoot, 'aipoch', 'assets', 'website'),
    websiteAssetsReadme: path.join(referencesRoot, 'aipoch', 'assets', 'website', 'README.md'),
    iconsDir: path.join(referencesRoot, 'aipoch', 'assets', 'icons'),
    backgroundsDir: path.join(referencesRoot, 'aipoch', 'assets', 'background-compositions'),
    logo: {
      primarySvg: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-primary.svg'),
      primaryPng: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-primary.png'),
      inverseSvg: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-inverse.svg'),
      inversePng: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-inverse.png'),
      stackedSvg: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-stacked.svg'),
      stackedPng: path.join(referencesRoot, 'aipoch', 'assets', 'logo', 'aipoch-logo-stacked.png'),
    },
    brandElements: {
      gridOrigin: path.join(referencesRoot, 'aipoch', 'assets', 'brand-elements', 'H.svg'),
      concentricPattern: path.join(
        referencesRoot,
        'aipoch',
        'assets',
        'brand-elements',
        'image-concentric-pattern.png',
      ),
    },
    backgrounds: [
      'aipoch-background-01.png',
      'aipoch-background-02.png',
      'aipoch-background-03.png',
      'aipoch-background-04.png',
      'aipoch-background-05.png',
      'aipoch-background-06.png',
      'aipoch-background-07.png',
      'aipoch-background-08.png',
      'aipoch-background-09.png',
      'aipoch-background-10.png',
      'aipoch-background-11.png',
      'aipoch-background-12.png',
    ].map((name) => path.join(referencesRoot, 'aipoch', 'assets', 'background-compositions', name)),
  },
  cyberTaoist: {
    dir: path.join(referencesRoot, 'cyber-taoist'),
    real: path.join(referencesRoot, 'cyber-taoist', 'cyber-taoist-real.md'),
    characterPrompt: path.join(referencesRoot, 'cyber-taoist', 'cyber-taoist-character-prompt.md'),
  },
  openDesign: {
    dir: path.join(referencesRoot, 'open-design'),
    editorialMonocle: path.join(referencesRoot, 'open-design', 'open-design-editorial-monocle.md'),
  },
  youtubeThumbnail: {
    dir: path.join(referencesRoot, 'youtube-thumbnail'),
    system: path.join(referencesRoot, 'youtube-thumbnail', 'youtube-thumbnail-system.md'),
  },
  sketchnoteEditorial: {
    dir: path.join(referencesRoot, 'sketchnote-editorial'),
    design: path.join(referencesRoot, 'sketchnote-editorial', 'design.md'),
    samplesDir: path.join(referencesRoot, 'sketchnote-editorial', 'samples'),
    refOriginCover: path.join(
      referencesRoot,
      'sketchnote-editorial',
      'samples',
      'ref-origin-cover-kopadze-agents.jpg',
    ),
    refOriginInlineTable: path.join(
      referencesRoot,
      'sketchnote-editorial',
      'samples',
      'ref-origin-inline-spectrum-table.jpg',
    ),
  },
  napkinOnePager: {
    dir: path.join(referencesRoot, 'napkin-one-pager'),
    system: path.join(referencesRoot, 'napkin-one-pager', 'napkin-one-pager-system.md'),
    referenceImage: path.join(
      referencesRoot,
      'napkin-one-pager',
      'assets',
      'reference-graph-engineering.png',
    ),
    graphEngineeringContent: path.join(
      referencesRoot,
      'napkin-one-pager',
      'content',
      'graph-engineering-en.md',
    ),
    agentLoopsPraxisContent: path.join(
      referencesRoot,
      'napkin-one-pager',
      'content',
      'agent-loops-praxis-en.md',
    ),
  },
};

function resolveReference(...segments) {
  return path.join(referencesRoot, ...segments);
}

module.exports = {
  referencePaths,
  resolveReference,
  referencesRoot,
};
