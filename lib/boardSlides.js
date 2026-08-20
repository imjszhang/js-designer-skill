'use strict';

const fs = require('fs');
const { composeAipochPrompt, loadFencedBlock, loadPreset } = require('./aipochProfiles');
const { referencePaths } = require('./referencePaths');

const designSystemPath = referencePaths.aipoch.designSystem;

function loadStyleLock(filePath = designSystemPath) {
  return loadFencedBlock(filePath, 'AIPOCH STYLE LOCK');
}

function withStyleLock(taskPrompt) {
  return composeAipochPrompt({
    preset: 'board-slide',
    taskPrompt,
  });
}

const slides = [
  {
    name: 'Slide 4 - 历史复盘',
    session: 'board-v2-04',
    prompt: withStyleLock(
      'Presentation slide, Horizontal timeline, Frame layout. Title: 历史复盘. Three equal stages on one baseline: 岗位化 2006-2012, 工业化 2013-2017, 中台化 2018-2022. Each stage has one Lucide-style outline icon and one short supporting sentence. Highlight only the current or decisive stage with #FBDD67. Warm #FCFCFA canvas, #F7F7F4 modules, #111111 type. No global hard shadows.',
    ),
  },
  {
    name: 'Slide 5 - 康威定律',
    session: 'board-v2-05',
    prompt: withStyleLock(
      'Presentation slide, Split layout. Title: 康威定律的现实. Left rail: organizational chart. Right rail: fragmented product architecture blocks. Connect equivalent nodes with thin dashed #111111 lines. One #FBDD67 accent only for the decisive mismatch. Warm #FCFCFA canvas. Lucide-style outline icons. No decorative data.',
    ),
  },
  {
    name: 'Slide 8 - AI产品经理对比传统PM',
    session: 'board-v2-08',
    prompt: withStyleLock(
      'Presentation slide, Split layout, two-column comparison. Title uses one Tinos Italic keyword only if needed. Left column label 传统PM: slow waterfall. Right column label AI产品经理: fast circular loop. Matched geometry. Use #FBDD67 on the AI loop only. Warm #FCFCFA canvas and #F7F7F4 panels. No hard drop shadows.',
    ),
  },
  {
    name: 'Slide 9 - 微型生产线',
    session: 'board-v2-09',
    prompt: withStyleLock(
      'Presentation slide, Process diagram, Hero layout. Title: 微型生产线. One directional flow of small autonomous teams connected to end users. Lucide-style nodes, short labels, one #EA580C or #FBDD67 accent only. Warm #FCFCFA canvas. No crossed connectors or ornamental pseudo-data.',
    ),
  },
  {
    name: 'Slide 10 - 我们招什么样的人',
    session: 'board-v2-10',
    prompt: withStyleLock(
      'Presentation slide, Two-by-two system map, Frame layout. Title: 我们招什么样的人. Four equal peer modules numbered 1 2 3 4, each with one Lucide-style outline icon and short Chinese copy. Shared title and one alignment origin. One #FBDD67 highlight only. Warm #FCFCFA canvas. Do not give every module a different accent color.',
    ),
  },
];

function assertAipochAssets() {
  loadPreset('board-slide');

  const required = [
    designSystemPath,
    referencePaths.aipoch.assetsDir,
    referencePaths.aipoch.assetsReadme,
    referencePaths.aipoch.logo.primarySvg,
    referencePaths.aipoch.brandElements.gridOrigin,
    ...referencePaths.aipoch.backgrounds,
  ];

  const missing = required.filter((filePath) => !fs.existsSync(filePath));
  if (missing.length > 0) {
    throw new Error(`Missing AIPOCH official assets:\n${missing.join('\n')}`);
  }

  const iconCount = fs
    .readdirSync(referencePaths.aipoch.iconsDir)
    .filter((name) => name.endsWith('.svg')).length;
  if (iconCount !== 42) {
    throw new Error(`Expected 42 AIPOCH icons, found ${iconCount} in ${referencePaths.aipoch.iconsDir}`);
  }

  if (referencePaths.aipoch.backgrounds.length !== 12) {
    throw new Error('Expected 12 AIPOCH background paths');
  }
}

module.exports = {
  slides,
  designSystemPath,
  loadStyleLock,
  assertAipochAssets,
  referencePaths,
};
