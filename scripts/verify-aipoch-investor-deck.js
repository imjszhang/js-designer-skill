'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  PRESETS,
  composeAipochPrompt,
  getPresetProfiles,
  loadFencedBlock,
  loadPreset,
} = require('../lib/aipochProfiles');
const { referencePaths } = require('../lib/referencePaths');

const R5_FILE = 'aipoch-investor-deck-v3-r5.pptx';
const R6_FILE = 'aipoch-investor-deck-v3-r6.pptx';
const R5_HASH = '77940293f01ba21a3ea4852229f5638765aa4fa2954a7844999a91db29bb1a89';
const R6_HASH = '0d017489cd88530ad859c9ec26dae4d0d51e5dcae0aa5e1e0df4bd6f7953c53b';
const DECK_BINARY = /\.(?:pptx|ppt|potx)$/i;
const WEBSITE_ONLY = /#141519|#ECD44C|\bglow\b|\bpill\b/i;
const LEGACY_R5_COLOR = /#F7F5EF|#E8E8E8|#ECD44C|#626262/i;

const ASSETS = Object.freeze([
  Object.freeze({
    name: 'global-research-network.png',
    hash: 'de45ece27dca6b3b4632cbc1242d54af4578f2ccbb6013417e60a78da41ff23b',
    width: 1280,
    height: 720,
  }),
  Object.freeze({
    name: 'research-ecosystem-ring.png',
    hash: '2addaf94f5e0ce1bf6174d4f9adf60155770d6af0556b3e3469a8eeb8bc19761',
    width: 1280,
    height: 720,
  }),
  Object.freeze({
    name: 'research-workflow-flywheel.png',
    hash: '4527305dbd189de30a02971e6fc3986ccb2df0c0cd802d27cba97654989cb94a',
    width: 1280,
    height: 720,
  }),
  Object.freeze({
    name: 'three-stage-translation.png',
    hash: 'e5428dc14b019fdf06e10560f6413cf3dd0f35f2f8344c09d9f2bc16f42cc1b1',
    width: 1280,
    height: 445,
  }),
]);

function walkFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(filePath));
    } else {
      files.push(filePath);
    }
  }
  return files;
}

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

function verifyPackBoundary() {
  const { dir, assetsReadme, audit } = referencePaths.aipochInvestorDeck;
  const files = walkFiles(dir);
  assert.ok(files.length > 0, 'Investor Deck pack is empty');
  assert.deepStrictEqual(
    files.filter((filePath) => DECK_BINARY.test(filePath)),
    [],
    'Investor Deck pack must not contain PPT/PPTX/POTX binaries',
  );

  const allowedProvenanceFiles = new Set([audit, assetsReadme]);
  for (const filePath of files.filter((candidate) => candidate.endsWith('.md'))) {
    const text = fs.readFileSync(filePath, 'utf8');
    if (!allowedProvenanceFiles.has(filePath)) {
      assert.ok(!text.includes(R5_FILE), `${R5_FILE} leaked outside audit/manifest`);
      assert.ok(!text.includes(R6_FILE), `${R6_FILE} leaked outside audit/manifest`);
      assert.ok(!text.includes(R5_HASH), `${R5_HASH} leaked outside audit/manifest`);
      assert.ok(!text.includes(R6_HASH), `${R6_HASH} leaked outside audit/manifest`);
    }
    assert.ok(
      !/\/Users\/|[A-Za-z]:\\/.test(text),
      `Local absolute path leaked into ${filePath}`,
    );
  }

  const auditText = fs.readFileSync(audit, 'utf8');
  assert.ok(auditText.includes(R5_FILE) && auditText.includes(R5_HASH));
  assert.ok(auditText.includes(R6_FILE) && auditText.includes(R6_HASH));

  const manifest = fs.readFileSync(assetsReadme, 'utf8');
  assert.ok(manifest.includes(R5_FILE) && manifest.includes(R5_HASH));
  assert.ok(manifest.includes('reference-only: true'));
  assert.ok(manifest.includes('license: not-published'));

  return files.length;
}

function verifyIllustrations() {
  const dir = referencePaths.aipochInvestorDeck.illustrationReferencesDir;
  const files = fs.readdirSync(dir).filter((name) => !name.startsWith('.')).sort();
  assert.deepStrictEqual(files, ASSETS.map((asset) => asset.name).sort());

  for (const asset of ASSETS) {
    const filePath = path.join(dir, asset.name);
    assert.strictEqual(sha256(filePath), asset.hash, `Hash mismatch: ${asset.name}`);
    assert.deepStrictEqual(
      pngDimensions(filePath),
      { width: asset.width, height: asset.height },
      `Dimension mismatch: ${asset.name}`,
    );
    assert.ok(asset.width <= 1280 && asset.height <= 1280, `${asset.name} is not reduced`);
    assert.ok(asset.width / asset.height > 1.4, `${asset.name} has an unexpected ratio`);
  }

  const manifest = fs.readFileSync(referencePaths.aipochInvestorDeck.assetsReadme, 'utf8');
  for (const asset of ASSETS) {
    assert.ok(manifest.includes(asset.name), `Missing manifest row: ${asset.name}`);
    assert.ok(manifest.includes(asset.hash), `Missing derived hash: ${asset.name}`);
  }
  assert.ok(manifest.includes('product UI screenshot'));
  assert.ok(manifest.includes('excluded'));

  return ASSETS.length;
}

function verifyInvestorProfile() {
  assert.deepStrictEqual(PRESETS['official-design'], ['core']);
  assert.deepStrictEqual(PRESETS['website-replica'], ['website']);
  assert.deepStrictEqual(PRESETS['board-slide'], ['core', 'presentation']);
  assert.deepStrictEqual(PRESETS['investor-deck'], ['core', 'investor']);
  assert.deepStrictEqual(getPresetProfiles('investor-deck'), ['core', 'investor']);

  const lock = loadFencedBlock(
    referencePaths.aipochInvestorDeck.design,
    'AIPOCH INVESTOR DECK STYLE LOCK',
  );
  const preset = loadPreset('investor-deck');

  assert.ok(preset.startsWith('AIPOCH STYLE LOCK'));
  assert.ok(preset.includes('AIPOCH INVESTOR DECK STYLE LOCK'));
  assert.ok(!preset.includes('AIPOCH WEBSITE PROFILE LOCK'));
  assert.ok(!preset.includes('AIPOCH PRESENTATION PROFILE LOCK'));

  for (const required of [
    'LIGHT CANVAS:',
    'BLACK CANVAS:',
    'Noto Sans SC/Light',
    'source bar lower left',
    'scientific editorial line art',
    '#111111',
    '#FBDD67',
    'BRAND SIGNATURE:',
    'ordinary content/data pages use only',
    'every complete logo on black uses the official Inverse asset',
    'Stacked is allowed on the close',
  ]) {
    assert.ok(lock.includes(required), `Investor lock is missing: ${required}`);
  }

  assert.ok(!WEBSITE_ONLY.test(lock), 'Website-only language leaked into Investor lock');
  assert.ok(!LEGACY_R5_COLOR.test(lock), 'Legacy r5 color leaked into Investor lock');
  assert.throws(
    () => composeAipochPrompt({ preset: 'investor-deck', taskPrompt: 'Use #141519.' }),
    /website-only palette/,
  );
  assert.throws(
    () => composeAipochPrompt({ preset: 'investor-deck', taskPrompt: 'Use #ECD44C.' }),
    /website-only palette/,
  );

  return getPresetProfiles('investor-deck');
}

function verifyRequiredDocuments() {
  const pack = referencePaths.aipochInvestorDeck;
  const required = [
    pack.readme,
    pack.design,
    pack.audit,
    pack.illustrationStyle,
    pack.slideTypes,
    pack.assetsReadme,
    path.join(pack.dir, 'content', 'deck-outline.md'),
    path.join(pack.dir, 'content', 'source-policy.md'),
    path.join(pack.dir, 'prompts', 'slide-light.md'),
    path.join(pack.dir, 'prompts', 'slide-black.md'),
    path.join(pack.dir, 'prompts', 'illustration-light.md'),
    path.join(pack.dir, 'prompts', 'illustration-dark.md'),
  ];
  for (const filePath of required) {
    assert.ok(fs.existsSync(filePath), `Missing Investor Deck file: ${filePath}`);
  }
  return required.length;
}

function main() {
  const result = {
    documents: verifyRequiredDocuments(),
    files: verifyPackBoundary(),
    illustrations: verifyIllustrations(),
    preset: verifyInvestorProfile(),
    externalDecks: {
      r5: { filename: R5_FILE, sha256: R5_HASH, copied: false },
      r6: { filename: R6_FILE, sha256: R6_HASH, copied: false },
    },
    imageApiCalled: false,
    deckGenerated: false,
  };

  console.log(JSON.stringify(result, null, 2));
}

main();
