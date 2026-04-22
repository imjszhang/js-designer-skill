'use strict';

const path = require('path');
const GptImage2Generator = require('../scripts/gptImageGenerator');

function normalizeGenerateParams(runtimeConfig = {}, params = {}) {
  return {
    ...params,
    apiKey: params.apiKey || runtimeConfig.apiKey,
    baseUrl: params.baseUrl || runtimeConfig.baseUrl,
    model: params.model || runtimeConfig.defaultModel,
    n: params.n != null ? params.n : runtimeConfig.defaultCount,
    size: params.size || runtimeConfig.defaultSize,
    quality: params.quality || runtimeConfig.defaultQuality,
    outputDir: path.resolve(params.outputDir || runtimeConfig.defaultOutputDir),
  };
}

async function generateImage(runtimeConfig, params = {}) {
  const normalized = normalizeGenerateParams(runtimeConfig, params);

  let generator;
  if (normalized.configFile) {
    generator = GptImage2Generator.loadFromConfig(normalized.configFile);
    if (!generator.config.outputDir) {
      generator.config.outputDir = normalized.outputDir;
    }
  } else {
    generator = new GptImage2Generator(normalized);
  }

  return generator.execute();
}

module.exports = {
  normalizeGenerateParams,
  generateImage,
};
