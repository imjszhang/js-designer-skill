---
name: js-gpt-image-designer-skill
description: 面向图像生成与视觉策略的设计师 skill，提供需求澄清、视觉方向制定、prompt 组装、结果评审与 gpt-image-2 执行能力。适用于海报、封面、品牌视觉、社媒图、信息图、图片评审、系列图统一风格等场景。
version: 1.0.0
metadata:
  openclaw:
    emoji: "\U0001F3A8"
    requires:
      bins:
        - node
---

# js-gpt-image-designer-skill

面向图像生成任务的设计师技能。它不只是“帮你出 prompt”，而是把图像工作拆成需求澄清、视觉策略、prompt 组装、执行和评审几个阶段。

## 提供的 AI 工具

| 工具 | 说明 |
|------|------|
| `gpt_image_generate` | 调用本地 gpt-image-2 生成器，支持 prompt、尺寸、质量、输出目录和会话命名 |
| `gpt_image_edit` | 以一张或多张参考图（可选 mask）调用 `/v1/images/edits` 生成新图 |

## CLI

```bash
# 文生图
node cli/index.js generate --prompt "一张高级感海报" --n 3 --quality high

# 以参考图编辑（本地文件 multipart；可多张，最多 16；可选 mask 做局部改）
node cli/index.js edit \
  --prompt "保留整体构图，改为冷调、加少量雾气，顶部 1/4 留给标题" \
  --image work_dir/generated_images_gpt_image_2/skill-smoke-test/image_001_2026-04-22T15-12-07.png \
  --n 1 --quality high --session-name brand-kv-v2

# 以远程/上传方式提供参考图（JSON 模式）
node cli/index.js edit --prompt "..." \
  --image-url https://example.com/ref.png \
  --mask-url https://example.com/mask.png \
  --n 1
```

## 默认工作流

1. 判断任务类型：快速出图、视觉探索、品牌物料、信息图、评图迭代、系列图
2. 澄清缺失信息：目标、受众、平台、必带文字、风格、禁区
3. 输出视觉策略：情绪、层级、构图、材质、色彩、文案区
4. 组装 prompt 与参数：prompt、negative constraints、尺寸、质量、张数、session name
5. 需要执行时调用 `gpt_image_generate`
6. 按 brief 做结果评审并决定下一轮修改方向

## 使用原则

- 先定义问题，再写 prompt
- 先给一个强方向，再扩展多个弱方向
- 文字上图是高风险项，必须单独检查
- 信息图优先保证正确和可读，再考虑装饰
- 系列图先锁定统一变量，再放开局部变化

## 编程 API

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

## 目录结构

```text
js-gpt-image-designer-skill/
├── SKILL.md
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

## 参考文档

- [docs/reference.md](docs/reference.md)：设计方法框架
- [docs/examples.md](docs/examples.md)：典型任务示例
- [docs/script-contract.md](docs/script-contract.md)：脚本参数与执行约定

## 架构说明

- `skill.contract.js`：对外暴露工具定义和运行时入口
- `index.js`：主命令分发
- `cli/index.js`：CLI 包装层，形式与 `js-eyes` 技能保持一致
- `lib/api.js`：业务 API，统一封装图片生成调用
- `scripts/`：实际执行脚本
