# js-gpt-image-designer-skill

一个按 `js-eyes` 风格组织的设计师图像 Skill 包。它把图像工作拆成两层：

- 设计层：需求澄清、视觉策略、prompt 组装、结果评审
- 执行层：调用本地 `gpt-image-2` 生成脚本输出图片

当前仓库根目录就是 Skill 包本体，不再额外嵌套在 `skills/<skill-name>/` 下。

## 目录结构

```text
js-designer-skill/
├── SKILL.md
├── README.md
├── package.json
├── skill.contract.js
├── index.js
├── cli/
│   └── index.js
├── lib/
│   ├── api.js
│   └── runtimeConfig.js
├── scripts/
│   ├── gpt-image-generate.js
│   └── gptImageGenerator.js
└── docs/
    ├── reference.md
    ├── examples.md
    └── script-contract.md
```

## 核心文件说明

- `SKILL.md`
  Cursor / OpenClaw 侧的技能说明，描述适用场景、工作流和目录结构。

- `skill.contract.js`
  对外暴露工具定义、CLI 元信息和运行时入口。

- `index.js`
  主命令分发入口。

- `cli/index.js`
  CLI 包装层，负责把命令转发给主入口，形式与 `js-eyes` 系列技能保持一致。

- `lib/api.js`
  业务 API 层，统一封装参数归一化和图片生成调用。

- `lib/runtimeConfig.js`
  运行时配置解析，负责环境变量和默认值。

- `scripts/gpt-image-generate.js`
  生成命令脚本，负责参数解析和 CLI 执行。

- `scripts/gptImageGenerator.js`
  底层生成器实现，直接对接 `gpt-image-2`。

- `docs/reference.md`
  设计方法框架。

- `docs/examples.md`
  典型任务示例。

- `docs/script-contract.md`
  执行层参数约定和命令模式。

## 提供的能力

当前 Skill 暴露一个核心工具：

- `gpt_image_generate`

它支持：

- `prompt`
- `model`
- `n`
- `size`
- `quality`
- `responseFormat`
- `moderation`
- `outputDir`
- `sessionName`
- `baseUrl`
- `apiKey`
- `user`

## 使用方式

### 1. 通过 CLI

```bash
node cli/index.js generate --prompt "一张高级感品牌海报" --n 1 --size 1536x1024 --quality high --session-name brand-kv-v1
```

### 2. 通过 npm script

```bash
npm run generate -- --prompt "一张温暖克制的产品 KV" --n 1 --quality high
```

### 3. 通过编程 API

```javascript
const contract = require('./skill.contract');

const adapter = contract.createOpenClawAdapter({
  defaultQuality: 'high',
});

const result = await adapter.tools[0].execute('demo-call', {
  prompt: '一张温暖克制的产品 KV',
  n: 1,
  size: '1536x1024',
  sessionName: 'brand-kv-demo',
});
```

## 环境变量

必需：

- `OPENAI_API_KEY`

可选：

- `OPENAI_API_BASE`
- `GPT_IMAGE_OUTPUT_DIR`

## 设计工作流

默认流程是：

1. 判断任务类型
2. 澄清目标、受众、平台、必带文字和禁区
3. 输出视觉策略
4. 组装 prompt 与参数
5. 执行生成
6. 评审结果并决定下一轮修改

## 目前检查结果

按当前目录结构核对后，已经统一了几处旧路径文案：

- `SKILL.md` 中的 CLI 示例
- `docs/script-contract.md` 中的脚本路径与命令示例
- `scripts/gpt-image-generate.js` 中的帮助输出

当前目录结构和内容是匹配的。
