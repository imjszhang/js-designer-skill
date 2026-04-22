'use strict';

const path = require('path');
const GptImage2Generator = require('../scripts/gptImageGenerator');
const GptImageEditor = require('../scripts/gptImageEditor');

function normalizeCommonParams(runtimeConfig = {}, params = {}) {
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

function normalizeGenerateParams(runtimeConfig, params) {
  return normalizeCommonParams(runtimeConfig, params);
}

function normalizeEditParams(runtimeConfig, params) {
  return normalizeCommonParams(runtimeConfig, params);
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

async function editImage(runtimeConfig, params = {}) {
  const normalized = normalizeEditParams(runtimeConfig, params);

  let editor;
  if (normalized.configFile) {
    editor = GptImageEditor.loadFromConfig(normalized.configFile);
    if (!editor.config.outputDir) {
      editor.config.outputDir = normalized.outputDir;
    }
  } else {
    editor = new GptImageEditor(normalized);
  }

  return editor.execute();
}

module.exports = {
  normalizeGenerateParams,
  normalizeEditParams,
  generateImage,
  editImage,
};
