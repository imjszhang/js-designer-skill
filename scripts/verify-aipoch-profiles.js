'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  DEFAULT_PRESET,
  PRESETS,
  assertAipochProfileSources,
  composeAipochPrompt,
  loadFencedBlock,
  loadPreset,
} = require('../lib/aipochProfiles');
const { assertAipochAssets, slides } = require('../lib/boardSlides');
const { referencePaths } = require('../lib/referencePaths');

const WEBSITE_ONLY =
  /#E8E8E8|#ECD44C|Neo-Brutalist|(?:radial|marketing|ambient|decorative)\s+(?:blur\s+)?glow|pill\s+(?:button|control|CTA)|rounded-full/i;

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function pngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  assert.strictEqual(buffer.toString('ascii', 1, 4), 'PNG', `${filePath} is not PNG`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function verifyDesignSystemAssets() {
  const manifest = fs.readFileSync(referencePaths.aipoch.assetsReadme, 'utf8');
  const manifestRows = [];

  for (const line of manifest.split(/\r?\n/)) {
    const pathMatch = line.match(
      /`((?:logo|brand-elements|background-compositions|icons)\/[^`]+\.(?:svg|png))`/,
    );
    const hashMatch = line.match(/`([0-9a-f]{64})`/);
    if (pathMatch && hashMatch) {
      manifestRows.push({
        relativePath: pathMatch[1],
        expectedHash: hashMatch[1],
      });
    }
  }

  assert.strictEqual(manifestRows.length, 62, 'Expected 62 design-system manifest rows');
  for (const row of manifestRows) {
    const filePath = path.join(referencePaths.aipoch.assetsDir, row.relativePath);
    assert.ok(fs.existsSync(filePath), `Missing design-system asset: ${filePath}`);
    assert.strictEqual(sha256(filePath), row.expectedHash, `Hash mismatch: ${filePath}`);
  }

  assert.strictEqual(Object.keys(referencePaths.aipoch.logo).length, 6);
  assert.strictEqual(Object.keys(referencePaths.aipoch.brandElements).length, 2);
  assert.strictEqual(referencePaths.aipoch.backgrounds.length, 12);
  assert.strictEqual(
    fs.readdirSync(referencePaths.aipoch.iconsDir).filter((name) => name.endsWith('.svg')).length,
    42,
  );

  return manifestRows.length;
}

function verifyWebsiteManifest() {
  const manifestPath = referencePaths.aipoch.websiteAssetsReadme;
  const manifest = fs.readFileSync(manifestPath, 'utf8');
  const rows = [];

  for (const line of manifest.split(/\r?\n/)) {
    const pathMatch = line.match(/`(screenshots\/[^`]+\.png)`/);
    const hashMatch = line.match(/`([0-9a-f]{64})`/);
    const dimensionsMatch = line.match(/\|\s*(\d+)×(\d+)\s*\|\s*`[0-9a-f]{64}`/);
    if (pathMatch && hashMatch && dimensionsMatch) {
      rows.push({
        relativePath: pathMatch[1],
        expectedHash: hashMatch[1],
        expectedWidth: Number(dimensionsMatch[1]),
        expectedHeight: Number(dimensionsMatch[2]),
      });
    }
  }

  assert.strictEqual(rows.length, 3, 'Expected three website evidence screenshots');

  for (const row of rows) {
    const filePath = path.join(referencePaths.aipoch.websiteAssetsDir, row.relativePath);
    assert.ok(fs.existsSync(filePath), `Missing website evidence: ${filePath}`);
    assert.strictEqual(sha256(filePath), row.expectedHash, `Hash mismatch: ${filePath}`);
    assert.deepStrictEqual(
      pngDimensions(filePath),
      { width: row.expectedWidth, height: row.expectedHeight },
      `Dimension mismatch: ${filePath}`,
    );
  }

  return rows.length;
}

function verifyProfileIsolation() {
  assert.strictEqual(DEFAULT_PRESET, 'official-design');
  assert.deepStrictEqual(PRESETS['official-design'], ['core']);
  assert.deepStrictEqual(PRESETS['website-replica'], ['website']);
  assert.deepStrictEqual(PRESETS['board-slide'], ['core', 'presentation']);

  assertAipochProfileSources();

  const core = loadPreset();
  const website = loadPreset('website-replica');
  const board = loadPreset('board-slide');

  assert.ok(core.startsWith('AIPOCH STYLE LOCK'));
  assert.ok(!core.includes('AIPOCH WEBSITE PROFILE LOCK'));
  assert.ok(!core.includes('AIPOCH PRESENTATION PROFILE LOCK'));
  assert.ok(!WEBSITE_ONLY.test(core), 'Website-only style leaked into core');

  assert.ok(website.startsWith('AIPOCH WEBSITE PROFILE LOCK'));
  assert.ok(website.includes('#E8E8E8'));
  assert.ok(website.includes('#ECD44C'));
  assert.ok(website.includes('radial glow'));

  assert.ok(board.includes('AIPOCH STYLE LOCK'));
  assert.ok(board.includes('AIPOCH PRESENTATION PROFILE LOCK'));
  assert.ok(board.includes('16:9 safe frame'));
  assert.ok(!WEBSITE_ONLY.test(board), 'Website-only style leaked into board preset');

  const taskPrompt = composeAipochPrompt({
    preset: 'official-design',
    taskPrompt: 'Render one approved social Hero.',
  });
  assert.ok(taskPrompt.endsWith('TASK\nRender one approved social Hero.'));

  assert.throws(
    () => composeAipochPrompt({ preset: 'official-design', taskPrompt: 'Use #ECD44C.' }),
    /website-only palette/,
  );
  assert.throws(
    () => composeAipochPrompt({ preset: 'official-design', taskPrompt: 'Add a radial glow.' }),
    /website-only palette/,
  );
  assert.throws(
    () => loadFencedBlock('/definitely/missing/AIPOCH.md', 'AIPOCH STYLE LOCK'),
    /profile source not found/,
  );
}

function verifyCanonicalBoundary() {
  const design = fs.readFileSync(referencePaths.aipoch.designSystem, 'utf8');
  const frontMatterMatch = design.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(frontMatterMatch, 'DESIGN.md front matter not found');
  assert.ok(!WEBSITE_ONLY.test(frontMatterMatch[1]), 'Website values leaked into DESIGN YAML');

  const boardPrompt = slides.map((slide) => slide.prompt).join('\n');
  assert.ok(!WEBSITE_ONLY.test(boardPrompt), 'Website values leaked into board prompts');

  for (const scriptName of ['gen-single.js', 'generate-board-slides.js']) {
    const script = fs.readFileSync(path.join(__dirname, scriptName), 'utf8');
    assert.ok(script.includes("size: '1536x1024'"), `${scriptName} output size changed`);
  }
}

function main() {
  verifyProfileIsolation();
  verifyCanonicalBoundary();
  assertAipochAssets();
  const designSystemAssets = verifyDesignSystemAssets();
  const websiteEvidence = verifyWebsiteManifest();

  console.log(JSON.stringify({
    defaultPreset: DEFAULT_PRESET,
    presets: Object.keys(PRESETS),
    designSystemAssets,
    websiteEvidence,
    boardSlides: slides.length,
    boardOutputSize: '1536x1024',
  }, null, 2));
}

main();
