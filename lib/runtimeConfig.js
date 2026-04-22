'use strict';

const path = require('path');

function resolveRuntimeConfig(overrides = {}) {
  return {
    apiKey: overrides.apiKey || process.env.OPENAI_API_KEY || null,
    baseUrl: overrides.baseUrl || process.env.OPENAI_API_BASE || null,
    defaultModel: overrides.defaultModel || 'gpt-image-2',
    defaultQuality: overrides.defaultQuality || 'auto',
    defaultSize: overrides.defaultSize || 'auto',
    defaultCount: Number(overrides.defaultCount || 1),
    defaultOutputDir: overrides.defaultOutputDir
      || process.env.GPT_IMAGE_OUTPUT_DIR
      || path.resolve(process.cwd(), 'work_dir', 'generated_images_gpt_image_2'),
  };
}

module.exports = {
  resolveRuntimeConfig,
};
