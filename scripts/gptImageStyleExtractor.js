#!/usr/bin/env node

/**
 * 风格抽取工具：读取一张或多张参考图，通过多模态 Chat Completions
 * 输出可入库的视觉系统 JSON（Style Lock + design.md 草稿）。
 *
 * 主要字段：
 *   images          本地图片路径数组（至少 1 张，建议 ≤ 8）
 *   roles           与 images 按下标配对的角色（cover / inline / table / other）
 *   imagesJson      等价的 [{image_url}] / [{file_id}] 形式
 *   brief           结构化 brief；也可传对象会被 JSON.stringify
 *   model           未传时：GPT_IMAGE_EXTRACT_MODEL → GPT_IMAGE_REVIEW_MODEL → gpt-4o
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

require('dotenv').config();

const DEFAULT_BASE = 'https://api.openai.com/v1';
const DEFAULT_EXTRACT_MODEL = 'gpt-4o';
const ALLOWED_COMMANDS = new Set(['edit', 'generate']);

const EXTRACT_SCHEMA_HINT = `Return ONLY valid JSON matching this schema (no markdown, no prose outside JSON):
{
  "pack_id_suggestion": "kebab-case-id",
  "label": "short human label",
  "recommended_command": "edit" | "generate",
  "default_size": "1536x1024",
  "palette": {
    "background": "description",
    "ink": "description",
    "accent": "description",
    "hex": ["#RRGGBB"]
  },
  "typography": "type direction",
  "imagery_style": "illustration / photo / mixed + references",
  "lighting": "direction + quality + temperature",
  "texture": "material keywords",
  "composition": "main composition system",
  "anti_references": ["what to avoid"],
  "style_lock": "one English paragraph that can be prepended to every generation prompt",
  "locked_variables": ["palette", "texture", "typography"],
  "origin_roles": { "origin_cover": 0, "origin_table": null },
  "design_md": "# Full style pack markdown draft, must include a Style Lock heading and a fenced text block"
}

Rules:
- Distill a reusable visual SYSTEM. Do not score quality. Do not transcribe body copy from the images.
- style_lock must be non-empty English, concrete (palette, line, texture, forbidden traits).
- recommended_command is "edit" when a reference image should be the style anchor; "generate" when text-to-image is enough.
- origin_roles.origin_cover / origin_table are 0-based indices into the attached images, or null.
- design_md must include a heading containing "Style Lock" and a \`\`\`text fenced block with the same lock text.`;

function mimeFromExt(ext) {
  const e = (ext || '').toLowerCase();
  if (e === '.png') return 'image/png';
  if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
  if (e === '.webp') return 'image/webp';
  if (e === '.gif') return 'image/gif';
  return 'application/octet-stream';
}

function fileToDataUrl(filePath) {
  const buf = fs.readFileSync(filePath);
  const mime = mimeFromExt(path.extname(filePath));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function tryExtractJson(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (_) {}
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch (_) {}
  }
  const first = trimmed.indexOf('{');
  const last = trimmed.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    try {
      return JSON.parse(trimmed.slice(first, last + 1));
    } catch (_) {}
  }
  return null;
}

function hasStyleLockFence(designMd) {
  if (!designMd || typeof designMd !== 'string') return false;
  const lines = designMd.split('\n');
  let inTarget = false;
  let inFence = false;
  const fenceLines = [];
  for (const line of lines) {
    if (/^#{2,4}\s/.test(line) && /Style Lock/i.test(line)) {
      inTarget = true;
      inFence = false;
      fenceLines.length = 0;
      continue;
    }
    if (inTarget && /^#{2,4}\s/.test(line) && !/Style Lock/i.test(line)) {
      if (fenceLines.join('\n').trim()) return true;
      inTarget = false;
      inFence = false;
      continue;
    }
    if (!inTarget) continue;
    if (/^```(?:text)?\s*$/.test(line.trim())) {
      if (inFence) return fenceLines.join('\n').trim().length > 0;
      inFence = true;
      continue;
    }
    if (inFence) fenceLines.push(line);
  }
  return fenceLines.join('\n').trim().length > 0;
}

function ensureStyleLockFence(designMd, styleLock) {
  const body = String(designMd || '').trim();
  if (hasStyleLockFence(body)) return body.endsWith('\n') ? body : `${body}\n`;
  const lockBlock = `## Style Lock\n\n\`\`\`text\n${styleLock}\n\`\`\`\n`;
  return body ? `${lockBlock}\n${body}\n` : `${lockBlock}`;
}

function slugifyPackId(value) {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'untitled-style';
}

function normalizeIndex(value, imageCount) {
  if (value == null || value === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) return null;
  if (imageCount > 0 && n >= imageCount) return null;
  return n;
}

function normalizeExtractResult(raw, { imageCount = 0 } = {}) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('extract result must be an object');
  }
  const style_lock = String(raw.style_lock || '').trim();
  if (!style_lock) {
    throw new Error('extract result missing style_lock');
  }
  const recommended_command = String(raw.recommended_command || 'edit').trim();
  if (!ALLOWED_COMMANDS.has(recommended_command)) {
    throw new Error(`recommended_command must be edit|generate, got: ${recommended_command}`);
  }
  const palette = raw.palette && typeof raw.palette === 'object' && !Array.isArray(raw.palette)
    ? raw.palette
    : {};
  const origin = raw.origin_roles && typeof raw.origin_roles === 'object' ? raw.origin_roles : {};
  const design_md = ensureStyleLockFence(raw.design_md, style_lock);
  if (!hasStyleLockFence(design_md)) {
    throw new Error('design_md must include a Style Lock heading and a ```text fence');
  }

  return {
    pack_id_suggestion: slugifyPackId(raw.pack_id_suggestion),
    label: String(raw.label || raw.pack_id_suggestion || 'Untitled style').trim(),
    recommended_command,
    default_size: String(raw.default_size || '1536x1024').trim() || '1536x1024',
    palette: {
      background: String(palette.background || '').trim(),
      ink: String(palette.ink || '').trim(),
      accent: String(palette.accent || '').trim(),
      hex: Array.isArray(palette.hex) ? palette.hex.map((h) => String(h).trim()).filter(Boolean) : [],
    },
    typography: String(raw.typography || '').trim(),
    imagery_style: String(raw.imagery_style || '').trim(),
    lighting: String(raw.lighting || '').trim(),
    texture: String(raw.texture || '').trim(),
    composition: String(raw.composition || '').trim(),
    anti_references: Array.isArray(raw.anti_references)
      ? raw.anti_references.map((item) => String(item).trim()).filter(Boolean)
      : [],
    style_lock,
    locked_variables: Array.isArray(raw.locked_variables)
      ? raw.locked_variables.map((item) => String(item).trim()).filter(Boolean)
      : [],
    origin_roles: {
      origin_cover: normalizeIndex(origin.origin_cover, imageCount),
      origin_table: normalizeIndex(origin.origin_table, imageCount),
    },
    design_md,
  };
}

class GptImageStyleExtractor {
  constructor(options = {}) {
    const envModel = process.env.GPT_IMAGE_EXTRACT_MODEL || process.env.GPT_IMAGE_REVIEW_MODEL;
    this.config = {
      baseUrl: (options.baseUrl || process.env.OPENAI_API_BASE || DEFAULT_BASE).replace(/\/$/, ''),
      apiKey: options.apiKey || process.env.OPENAI_API_KEY || null,
      model: options.model || envModel || DEFAULT_EXTRACT_MODEL,
      images: Array.isArray(options.images) ? options.images.slice() : [],
      roles: Array.isArray(options.roles) ? options.roles.slice() : [],
      imagesJson: Array.isArray(options.imagesJson) ? options.imagesJson.slice() : [],
      brief: options.brief != null
        ? (typeof options.brief === 'string' ? options.brief : JSON.stringify(options.brief, null, 2))
        : '',
      outputDir: options.outputDir || './work_dir/generated_images_gpt_image_2',
      sessionName: options.sessionName || null,
      timeout: options.timeout || 180000,
      retryCount: options.retryCount != null ? options.retryCount : 2,
      retryDelay: options.retryDelay || 2000,
      temperature: options.temperature != null ? options.temperature : 0.2,
      maxTokens: options.maxTokens || 4000,
    };

    this.sessionDir = null;
    this.rawResponse = null;
    this.extract = null;
    this.taskStatus = 'pending';
    this.startTime = null;
    this.endTime = null;

    this.validateConfig();
  }

  validateConfig() {
    if (!this.config.apiKey) {
      throw new Error('必须提供 API 密钥: 在 .env 中设置 OPENAI_API_KEY 或使用 --api-key');
    }
    const hasLocal = this.config.images.length > 0;
    const hasJson = this.config.imagesJson.length > 0;
    if (!hasLocal && !hasJson) {
      throw new Error('必须至少提供一张图：--image <本地路径> 或 --image-url <URL|data URL>');
    }
    for (const p of this.config.images) {
      if (!fs.existsSync(p)) throw new Error(`参考图不存在: ${p}`);
    }
    if (this.config.images.length + this.config.imagesJson.length > 10) {
      throw new Error('一次抽取最多 10 张图');
    }
  }

  initializeSession() {
    const ts = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const sessionName = this.config.sessionName || `gpt_image2_extract_${ts}`;
    this.sessionDir = path.join(this.config.outputDir, sessionName);
    if (!fs.existsSync(this.sessionDir)) {
      fs.mkdirSync(this.sessionDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(this.sessionDir, 'session_info.json'),
      JSON.stringify({
        sessionName,
        sessionDirectory: this.sessionDir,
        mode: 'extract',
        model: this.config.model,
        createdAt: new Date().toISOString(),
        status: 'initialized',
      }, null, 2),
    );
    return this.sessionDir;
  }

  _parseBaseUrl(u) {
    const withProto = u.startsWith('http') ? u : `https://${u}`;
    const parsed = new URL(withProto);
    const isHttps = parsed.protocol === 'https:';
    const defaultPort = isHttps ? 443 : 80;
    let pathname = (parsed.pathname || '/').replace(/\/$/, '');
    if (!/\/chat\/completions$/.test(pathname)) {
      if (!pathname.includes('/v1') && !pathname.endsWith('/v1')) {
        pathname = `${pathname && pathname !== '/' ? pathname : ''}/v1`;
      }
      pathname = `${pathname}/chat/completions`;
    }
    return {
      hostname: parsed.hostname,
      port: parseInt(parsed.port, 10) || defaultPort,
      isHttps,
      path: pathname + (parsed.search || ''),
    };
  }

  buildUserContent() {
    const content = [];
    const roleLines = this.config.images.map((filePath, index) => {
      const role = this.config.roles[index] || 'unspecified';
      return `- image[${index}] role=${role} file=${path.basename(filePath)}`;
    });
    const header = [
      'You are a senior visual translator. Distill a reusable visual style system from the attached image(s).',
      'Do not score quality. Do not transcribe body copy. Describe palette, line, texture, type, composition, and forbidden traits.',
      '',
      '=== Brief ===',
      this.config.brief ? this.config.brief : '(no brief provided; infer the system from imagery)',
      '',
      '=== Attached image roles ===',
      roleLines.length ? roleLines.join('\n') : '(roles unspecified)',
      '',
      '=== Output format ===',
      EXTRACT_SCHEMA_HINT,
    ].join('\n');
    content.push({ type: 'text', text: header });

    for (const filePath of this.config.images) {
      content.push({
        type: 'image_url',
        image_url: { url: fileToDataUrl(filePath) },
      });
    }
    for (const obj of this.config.imagesJson) {
      if (obj.image_url) {
        content.push({ type: 'image_url', image_url: { url: obj.image_url } });
      }
    }

    return content;
  }

  buildRequestBody() {
    return {
      model: this.config.model,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are a senior visual translator. Always answer in strict JSON matching the provided schema. No prose outside JSON.',
        },
        {
          role: 'user',
          content: this.buildUserContent(),
        },
      ],
    };
  }

  sendApiRequest(requestBody) {
    return new Promise((resolve, reject) => {
      const { hostname, port, isHttps, path: reqPath } = this._parseBaseUrl(this.config.baseUrl);
      const postData = Buffer.from(JSON.stringify(requestBody), 'utf8');
      const lib = isHttps ? https : http;

      const options = {
        hostname,
        port,
        path: reqPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Length': postData.length,
        },
        timeout: this.config.timeout,
      };

      const req = lib.request(options, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          if (res.statusCode !== 200) {
            reject(Object.assign(new Error(`HTTP ${res.statusCode}: ${raw || '(无响应体)'}`), { status: res.statusCode, raw }));
            return;
          }
          try { resolve(JSON.parse(raw)); } catch (e) { reject(new Error(`JSON 解析失败: ${e.message}`)); }
        });
      });
      req.on('error', (err) => reject(new Error(`请求错误: ${err.message}`)));
      req.on('timeout', () => { req.destroy(); reject(new Error('请求超时')); });
      req.write(postData);
      req.end();
    });
  }

  async extractWithRetry() {
    let useJsonFormat = true;
    let last;
    const imageCount = this.config.images.length + this.config.imagesJson.length;
    for (let attempt = 1; attempt <= this.config.retryCount; attempt += 1) {
      try {
        if (this.config.retryCount > 1) {
          console.log(`抽取尝试 ${attempt}/${this.config.retryCount}`);
        }
        const body = this.buildRequestBody();
        if (!useJsonFormat) delete body.response_format;
        const response = await this.sendApiRequest(body);
        this.rawResponse = response;
        const text = response && response.choices && response.choices[0]
          && response.choices[0].message && response.choices[0].message.content;
        const parsed = tryExtractJson(text);
        if (!parsed) {
          throw new Error('抽取返回内容无法解析为 JSON');
        }
        this.rawExtract = parsed;
        this.extract = normalizeExtractResult(parsed, { imageCount });
        return this.extract;
      } catch (e) {
        last = e;
        console.error(`失败: ${e.message}`);
        if (useJsonFormat && e && e.raw && /response_format/i.test(e.raw)) {
          useJsonFormat = false;
        }
        if (attempt < this.config.retryCount) {
          await new Promise((r) => setTimeout(r, this.config.retryDelay));
        }
      }
    }
    throw last;
  }

  saveResult() {
    const safeConfig = { ...this.config, apiKey: '***' };
    const out = {
      sessionName: path.basename(this.sessionDir),
      mode: 'extract',
      config: safeConfig,
      extract: this.extract,
      raw: this.rawResponse,
      taskStatus: this.taskStatus,
      startTime: this.startTime,
      endTime: this.endTime,
      durationMs: this.endTime && this.startTime ? this.endTime - this.startTime : null,
      savedAt: new Date().toISOString(),
    };
    const fp = path.join(this.sessionDir, 'extract_result.json');
    fs.writeFileSync(fp, JSON.stringify(out, null, 2));
    console.log(`结果: ${fp}`);
  }

  async execute() {
    this.startTime = Date.now();
    console.log('gpt-image extract 开始');
    console.log(`model=${this.config.model} images=${this.config.images.length + this.config.imagesJson.length}`);
    try {
      this.initializeSession();
      this.taskStatus = 'extracting';
      await this.extractWithRetry();
      this.taskStatus = 'completed';
      this.endTime = Date.now();
      this.saveResult();
      if (this.extract) {
        console.log(`pack=${this.extract.pack_id_suggestion} command=${this.extract.recommended_command}`);
      }
      return {
        success: true,
        sessionDir: this.sessionDir,
        extract: this.extract,
      };
    } catch (e) {
      this.taskStatus = 'failed';
      this.endTime = Date.now();
      if (this.sessionDir) {
        try {
          fs.writeFileSync(
            path.join(this.sessionDir, 'extract_failed.json'),
            JSON.stringify({
              failed: true,
              error: e.message,
              rawExtract: this.rawExtract || null,
              at: new Date().toISOString(),
            }, null, 2),
          );
        } catch (_) {}
      }
      throw e;
    }
  }

  static loadFromConfig(configFile) {
    if (!fs.existsSync(configFile)) {
      throw new Error(`配置不存在: ${configFile}`);
    }
    const raw = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    return new GptImageStyleExtractor(raw);
  }
}

module.exports = GptImageStyleExtractor;
module.exports.tryExtractJson = tryExtractJson;
module.exports.normalizeExtractResult = normalizeExtractResult;
module.exports.hasStyleLockFence = hasStyleLockFence;
module.exports.ensureStyleLockFence = ensureStyleLockFence;
module.exports.EXTRACT_SCHEMA_HINT = EXTRACT_SCHEMA_HINT;
