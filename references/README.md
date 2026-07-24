`references/` 是本地参考资料目录，供用户在实际使用中自行创建和维护。

这里的文件可能包含隐私信息、项目敏感信息或不适合公开提交的素材，因此默认不纳入版本控制。

## 目录约定

按品牌或项目分子目录存放，Agent 和脚本应优先读取对应子目录，而不是在根目录平铺文件。

```text
references/
├── README.md
├── aipoch/                         AIPOCH 品牌视觉（官网逆向 + PPT 规范）
│   ├── AIPOCH-DESIGN-SYSTEM.md     设计规范（人类可读）
│   ├── aipoch-css1.css             官网 Tailwind 编译样式
│   └── aipoch-css2.css             官网字体加载模块
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
| AIPOCH 品宣 / 董事会 PPT | `aipoch/AIPOCH-DESIGN-SYSTEM.md` |
| JS 赛博道家海报 / 人物 | `cyber-taoist/cyber-taoist-real.md` |
| Editorial Monocle 杂志风 | `open-design/open-design-editorial-monocle.md` |
| X Article 手绘信息图 / 教程风 sketchnote | `sketchnote-editorial/design.md` |
| YouTube / 视频封面 | `youtube-thumbnail/youtube-thumbnail-system.md` |
| 单页课程/流程 napkin 信息图 | `napkin-one-pager/napkin-one-pager-system.md` + `content/<topic>.md` |

代码中的路径常量见 `lib/referencePaths.js`。

## 与 `docs/` 的分工

不要把这里当作公共知识库：

- 可复用、可共享的方法论放到 `docs/`
- 本地、私有、任务相关的输入材料放到 `references/`
