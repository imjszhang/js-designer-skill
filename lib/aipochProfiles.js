'use strict';

const fs = require('fs');
const { referencePaths } = require('./referencePaths');

const DEFAULT_PRESET = 'official-design';

const PROFILE_DEFINITIONS = Object.freeze({
  core: Object.freeze({
    source: referencePaths.aipoch.designSystem,
    marker: 'AIPOCH STYLE LOCK',
    requiresOptIn: false,
  }),
  website: Object.freeze({
    source: referencePaths.aipoch.website,
    marker: 'AIPOCH WEBSITE PROFILE LOCK',
    requiresOptIn: true,
  }),
  presentation: Object.freeze({
    source: referencePaths.aipoch.designSystem,
    marker: 'AIPOCH PRESENTATION PROFILE LOCK',
    requiresOptIn: true,
  }),
});

const PRESETS = Object.freeze({
  'official-design': Object.freeze(['core']),
  'website-replica': Object.freeze(['website']),
  'board-slide': Object.freeze(['core', 'presentation']),
});

const CORE_FORBIDDEN =
  /#E8E8E8|#ECD44C|Neo-Brutalist|(?:radial|marketing|ambient|decorative)\s+(?:blur\s+)?glow|pill\s+(?:button|control|CTA)|rounded-full/i;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadFencedBlock(filePath, marker) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`AIPOCH profile source not found: ${filePath}`);
  }

  const text = fs.readFileSync(filePath, 'utf8');
  const pattern = new RegExp(
    `\`\`\`text\\r?\\n(${escapeRegExp(marker)}[\\s\\S]*?)\`\`\``,
  );
  const match = text.match(pattern);
  if (!match) {
    throw new Error(`${marker} fenced block not found in ${filePath}`);
  }

  return match[1].trim();
}

function getPresetProfiles(presetName = DEFAULT_PRESET) {
  const profiles = PRESETS[presetName];
  if (!profiles) {
    throw new Error(
      `Unknown AIPOCH preset "${presetName}". Expected one of: ${Object.keys(PRESETS).join(', ')}`,
    );
  }
  return profiles;
}

function loadProfile(profileName) {
  const definition = PROFILE_DEFINITIONS[profileName];
  if (!definition) {
    throw new Error(
      `Unknown AIPOCH profile "${profileName}". Expected one of: ${Object.keys(PROFILE_DEFINITIONS).join(', ')}`,
    );
  }
  return loadFencedBlock(definition.source, definition.marker);
}

function guardPreset(presetName, prompt) {
  if (presetName !== 'website-replica' && CORE_FORBIDDEN.test(prompt)) {
    throw new Error(
      `AIPOCH ${presetName} prompt contains website-only palette or legacy style language`,
    );
  }
  return prompt;
}

function loadPreset(presetName = DEFAULT_PRESET) {
  const prompt = getPresetProfiles(presetName).map(loadProfile).join('\n\n');
  return guardPreset(presetName, prompt);
}

function composeAipochPrompt({ preset = DEFAULT_PRESET, taskPrompt = '' } = {}) {
  const profileLock = loadPreset(preset);
  const task = String(taskPrompt).trim();
  const prompt = task ? `${profileLock}\n\nTASK\n${task}` : profileLock;
  return guardPreset(preset, prompt);
}

function assertAipochProfileSources() {
  for (const profileName of Object.keys(PROFILE_DEFINITIONS)) {
    loadProfile(profileName);
  }
  if (getPresetProfiles(DEFAULT_PRESET).join(',') !== 'core') {
    throw new Error('The default AIPOCH preset must resolve to core only');
  }
}

module.exports = {
  DEFAULT_PRESET,
  PRESETS,
  PROFILE_DEFINITIONS,
  assertAipochProfileSources,
  composeAipochPrompt,
  getPresetProfiles,
  guardPreset,
  loadFencedBlock,
  loadPreset,
  loadProfile,
};
