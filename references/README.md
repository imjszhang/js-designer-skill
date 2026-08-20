`references/` 是仓库内置的视觉风格模版目录，随本 Skill 一并版本化并同步到 GitHub。

按风格或项目分子目录存放。Agent 和脚本应优先读取对应子目录，而不是在根目录平铺文件。

## 目录约定

```text
references/
├── README.md
├── aipoch/                         AIPOCH 官方品牌镜像 + 官网 Profile + 仓库演示扩展
│   ├── DESIGN.md                   Figma / design-system 官方规则 + Repository Extensions
│   ├── WEBSITE.md                  aipoch.com dated implementation Profile
│   ├── AIPOCH-DESIGN-SYSTEM.md     旧路径兼容说明
│   ├── assets/                     62 个 design-system 资产 + website 审计证据
│   ├── aipoch-css1.css             2026-05 官网 CSS 历史快照
│   └── aipoch-css2.css             2026-05 字体加载历史快照
├── cyber-taoist/                   JS Cyber-Taoist 视觉风格
│   ├── cyber-taoist-real.md        完整风格系统
│   └── cyber-taoist-character-prompt.md
├── open-design/                    open-design 项目风格参考
│   └── open-design-editorial-monocle.md
├── sketchnote-editorial/           X Article 手绘信息图（皱纸 sketchnote）
│   ├── design.md                   完整风格系统 + prompt 模板 + 样例索引
│   └── samples/                    风格母版与验证样例（jpg/png）
├── youtube-thumbnail/              YouTube 封面生成体系
│   └── youtube-thumbnail-system.md
└── napkin-one-pager/               单页 napkin-sketch 信息图模版
    ├── napkin-one-pager-system.md
    ├── assets/reference-graph-engineering.png
    └── content/                    graph-engineering-en.md, agent-loops-praxis-en.md 等
```

## 使用方式

| 任务场景 | 优先读取 |
|----------|----------|
| AIPOCH 品牌基础 / 社媒 | `aipoch/DESIGN.md` + `official-design` Profile |
| AIPOCH 官网 / Landing Page / Web Hero 复刻 | `aipoch/WEBSITE.md` + 显式 `website-replica` Profile |
| AIPOCH 董事会 PPT | `aipoch/DESIGN.md` + `board-slide` Profile |
| JS 赛博道家海报 / 人物 | `cyber-taoist/cyber-taoist-real.md` |
| Editorial Monocle 杂志风 | `open-design/open-design-editorial-monocle.md` |
| X Article 手绘信息图 / 教程风 sketchnote | `sketchnote-editorial/design.md` |
| YouTube / 视频封面 | `youtube-thumbnail/youtube-thumbnail-system.md` |
| 单页课程/流程 napkin 信息图 | `napkin-one-pager/napkin-one-pager-system.md` + `content/<topic>.md` |

代码中的路径常量见 `lib/referencePaths.js`。

## 与 `docs/` 的分工

- `docs/`：可复用方法论（工作流、知识卡、8 层 prompt、7 维评审）
- `references/`：可复用的视觉风格模版（色板、构图、prompt 骨架、样例图）

新增风格模版应作为新的子目录入库，并在本文件、`SKILL.md`、`lib/referencePaths.js` 中登记。含隐私、密钥或不宜公开的素材不要放进本目录。
