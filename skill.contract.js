'use strict';

const pkg = require('./package.json');
const { resolveRuntimeConfig } = require('./lib/runtimeConfig');
const { generateImage } = require('./lib/api');

const CLI_COMMANDS = [
  { name: 'generate', description: '调用 gpt-image-2 生成图片' },
];

function makeLogger(logger) {
  return {
    info: typeof logger?.info === 'function' ? logger.info.bind(logger) : console.log.bind(console),
    warn: typeof logger?.warn === 'function' ? logger.warn.bind(logger) : console.warn.bind(console),
    error: typeof logger?.error === 'function' ? logger.error.bind(logger) : console.error.bind(console),
  };
}

function createRuntime(config = {}, logger) {
  const resolvedConfig = resolveRuntimeConfig(config);
  return {
    config: resolvedConfig,
    logger: makeLogger(logger),
    textResult(text) {
      return { content: [{ type: 'text', text }] };
    },
    jsonResult(value) {
      return this.textResult(JSON.stringify(value, null, 2));
    },
  };
}

const TOOL_DEFINITIONS = [
  {
    name: 'gpt_image_generate',
    label: 'GPT Image Designer: Generate',
    description: '调用 gpt-image-2 生成图片，支持 prompt、尺寸、质量、输出目录与会话命名。',
    parameters: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: '图片生成提示词' },
        model: { type: 'string', description: '模型名，默认 gpt-image-2' },
        n: { type: 'number', description: '生成张数，1-10' },
        size: { type: 'string', description: '图片尺寸，如 1024x1024、1536x1024、auto' },
        quality: { type: 'string', enum: ['low', 'medium', 'high', 'auto'], description: '生成质量' },
        responseFormat: { type: 'string', enum: ['b64_json', 'url'], description: '返回格式' },
        moderation: { type: 'string', enum: ['auto', 'low'], description: '审核级别' },
        outputDir: { type: 'string', description: '输出目录' },
        sessionName: { type: 'string', description: '会话目录名' },
        baseUrl: { type: 'string', description: '自定义 API 根' },
        apiKey: { type: 'string', description: '覆盖环境变量的 API Key' },
        user: { type: 'string', description: '可选 user 字段' },
      },
      required: ['prompt'],
    },
    optional: true,
    async execute(runtime, params) {
      return generateImage(runtime.config, params);
    },
  },
];

function createOpenClawAdapter(config = {}, logger) {
  const runtime = createRuntime(config, logger);
  return {
    runtime,
    tools: TOOL_DEFINITIONS.map((tool) => ({
      name: tool.name,
      label: tool.label,
      description: tool.description,
      parameters: tool.parameters,
      optional: tool.optional,
      async execute(toolCallId, params) {
        const result = await tool.execute(runtime, params, { toolCallId });
        return runtime.jsonResult(result);
      },
    })),
  };
}

module.exports = {
  id: pkg.name,
  name: 'JS GPT Image Designer Skill',
  version: pkg.version,
  description: pkg.description,
  runtime: {
    requiresServer: false,
    requiresBrowserExtension: false,
    platforms: ['*'],
  },
  cli: {
    entry: './cli/index.js',
    commands: CLI_COMMANDS,
  },
  openclaw: {
    tools: TOOL_DEFINITIONS.map((tool) => ({
      name: tool.name,
      label: tool.label,
      description: tool.description,
      parameters: tool.parameters,
      optional: tool.optional,
    })),
  },
  createRuntime,
  createOpenClawAdapter,
};
