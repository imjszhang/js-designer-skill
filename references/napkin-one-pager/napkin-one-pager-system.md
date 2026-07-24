# Napkin One-Pager Infographic System

> **定位**：单页高密度教程 / 方法论信息图（napkin-sketch 美学）。
> **典型任务**：Agent 工作流、课程地图、产品说明、流程规范「一张图讲完」。
> **工作流**：`information_design`（首选）；同风格多主题 → `series_and_system` + `gpt_image_consistency`。
> **参考图**：同目录 `assets/reference-graph-engineering.png`
> **示例文案包**：`content/graph-engineering-en.md`

---

## 零、系统定位

**Napkin One-Pager** 把「餐巾纸上的框与箭头」做成可复用的视觉系统：

1. **可读优先** — 3×3 卡片网格 + 页脚 Build Order，读图顺序固定。
2. **风格可锁** — 奶油底、细线框、区块色循环、正文高亮、页边手写批注。
3. **内容与风格分离** — 本文件管「怎么长」；`content/<topic>.md` 管「写什么」。

**技术栈**：js-designer-skill · `gpt_image_generate` / `gpt_image_edit` · Gate A/B/C · 7 维评审（信息图对 `typography_text` / `functionality` 从严）。

---

## 一、色彩系统

| 角色 | Hex / 描述 | 用途 |
|------|------------|------|
| **页面背景** | `#FDFBF4` | warm off-white / cream，全画布 |
| **线稿 / 主文字** | `#2A2A2A` ~ `#1F1F1F` | 标题、正文、框线 |
| **卡片底** | `#FFFFFF` 或 `#FAFAF8` | InfoCard 填充 |
| **卡片描边** | `#D8D4CC` 或 `#2A2A2A` 1px 细线 | 略不完美的 hand-drawn 感 |
| **Accent 1** | 淡绿 `#D4EDDA` / 高亮 `#A8D5BA` | 卡 1、4、7… 循环 |
| **Accent 2** | 软橙 `#FFE8D6` / 高亮 `#FFC9A3` | 卡 2、5、8… |
| **Accent 3** | 浅蓝 `#D6EAF8` / 高亮 `#AED6F1` | 卡 3、6、9… |
| **Accent 4** | 薰衣草 `#E8DAEF` / 高亮 `#D2B4DE` | 补充循环 |
| **页边批注** | 手写蓝 `#2563EB` 或 `#1D4ED8` | 仅 margin notes + 弯箭头 |
| **错误/删除** | `#DC2626` | fake edge 上的 X、警示 |

**Accent 分配规则**：按卡序号 `((n-1) mod 4) + 1` 选 accent；编号圆点与卡内 highlighter 同色族。

---

## 二、排版规范

| 元素 | 规范 |
|------|------|
| **主标题** | 无衬线，700，全页顶居中或左对齐，英文 Title Case 或 sentence case 与参考一致 |
| **卡标题** | 无衬线 600–700，卡内顶部 |
| **正文** | 无衬线 400–500，14–16px 等效，行距 1.4–1.5 |
| **Highlighter** | 短语级背景色块，与卡 accent 同族，圆角 2–4px，勿整段糊满 |
| **页边批注** | 手写/ casual script 或 italic sans，蓝色，小于正文 |
| **编号** | 卡左上角圆形 badge，白字或深字 + accent 底 |

**语言**：默认跟随 `content/*.md` 的 `language` 字段；Layer 7 必须声明 exact copy。

---

## 三、布局结构

### 3.1 主网格

- **3 行 × 3 列** 等宽等高 InfoCard， gutters 一致（约 16–24px 等效）。
- 每卡结构：**编号圆** → **标题** → **正文（含 highlight）** → **diagram / table / list 区**。

### 3.2 页脚 Build Order

- 全宽横条，**chevron** 分段（箭头形相邻块）。
- 每段：**小图标 + 短标签**（如 draw → delete → wire → checker）。
- 位于 3×3 网格下方，不挤压卡片可读区。

### 3.3 读图路径

- 标题 → 1→9 按行扫读 → Build Order。
- 认知负荷：单卡内并列元素 ≤ 7；过多则拆到 `content` 另一主题页。

---

## 四、组件库（Prompt 乐高）

生成时在 prompt 中 **按组件名描述**，保持与参考图一致。

### InfoCard

圆角矩形容器；左上 numbered circle；bold title；body with inline highlight spans；底部 flexible diagram slot。

### FlowDiagram

- **Nodes**：圆角矩形，内嵌短标签。
- **Edges**：实线箭头 = 主路径；虚线 = 可选/错误路径。
- **Gate**：盾形或勾选徽章 = check gate。
- **Human**：人形图标 = approval gate。
- **Diamond pattern**：一入多出再合并 = fan-out / fan-in。

### MiniTable

细边框，2–3 列，用于对比（如 split work vs step-by-step）。

### Checklist

小标题 "Is it correct?" 或等价；每行左侧勾号图标。

### IconLegend

两列：左图标右标签，用于 Card 9 或独立图例卡。

### ProcessStepper（Build Order）

水平 chevron 链；每 chevron 内 icon + 1–2 词 label。

---

## 五、图标词表（锁定描述）

在 prompt 与 consistency 中复用同一套 **outline icon，统一 stroke**：

| 键 | 形状描述 |
|----|----------|
| `split` | 分叉箭头 |
| `check_gate` | 盾 / 勾选 |
| `approval_gate` | 人形 |
| `loop` | 环形箭头 |
| `job` | 单页文档 |
| `running_notes` | 叠页或记事本 |
| `data` | 圆柱/栈 |
| `agents` | 多人/用户组 |
| `pencil` | 铅笔（draw） |
| `trash` | 垃圾桶（delete） |
| `diamond` | 菱形（wire / 并行） |

系列一致性建议锁定：`palette, linework, icon_style, card_shape, typography`。

---

## 六、生成策略

| 策略 | 何时用 | 命令倾向 |
|------|--------|----------|
| **A. 整页一次** |  demo、英文短、可接受改字 | `generate --quality high --size 1536x1024` |
| **B. 单卡多次** | 文案长、P0 零容忍 | 9 次 generate，同一 `sessionName` 前缀 |
| **C. 参考图 edit** | 只换主题、保构图 | `edit --image assets/reference-graph-engineering.png` |

**推荐默认**：Gate A 锁 `content/<topic>.md` → Gate B ASCII 确认 3×3+footer → 策略 A 试 2 张 → Gate C `review`；文字 P0 则策略 C 或 B。

---

## 七、gpt-image-2 提示词模板

### 7.1 整页基础框架（Layer 1–8 合一）

```
Subject: a single educational infographic poster titled "How to master graph engineering — the full course on one page".

Scene: warm cream background (#FDFBF4). Main area is a 3 rows by 3 columns grid of nine equal rounded InfoCards with thin slightly imperfect hand-drawn dark gray outlines. Each card has a numbered circle badge top-left, bold sans-serif title, short paragraph with colored highlight spans on key terms, and a small nested flow diagram or mini-table at the bottom of the card. Card accent colors rotate pale green, soft orange, light blue, lavender. Optional blue handwritten margin notes with thin curved arrows on left and right edges ("boxes and arrows on a napkin", "never grades its own homework").

Camera: flat orthographic top-down view, no perspective distortion, full poster in frame.

Lighting: even flat illumination, no dramatic shadows, print-like clarity.

Color mood: restrained educational palette, cream base, muted accents only inside cards.

Style: napkin-sketch infographic, thin outline icons, hand-drawn linework feel, not photorealistic, not 3D, no drop shadows, no stock photo elements.

Text: [PASTE exact titles and key phrases from content/<topic>.md for all 9 cards and Build Order footer labels — English, verbatim].

Technical: 16:9 landscape 1536x1024, high quality, sharp readable text, safe margins 48px.

Negative prompt: no photorealistic people, no glossy UI, no neon gradients, no cluttered decorative illustrations, no blurry text, no misspelled words, no watermark.
```

### 7.2 单卡模板（策略 B）

```
Subject: one InfoCard from a napkin-sketch infographic series, card [N] of 9.

Scene: isolated card on cream #FDFBF4 background with generous padding; same linework and accent as napkin-one-pager system; [CARD-SPECIFIC diagram from content file].

Style: match reference napkin one-pager — thin dark outlines, outline icons, highlight spans on [KEY TERMS].

Text: title "[EXACT TITLE]" and body "[EXACT SHORT COPY]" verbatim in English.

Technical: square or 4:5 card crop, high quality.

Negative: no other cards visible, no footer stepper unless requested.
```

### 7.3 Edit 模板（策略 C）

```
Keep the exact layout, grid, card positions, icon style, cream background, and Build Order footer structure from the reference image. Replace all text content with the new topic from the brief. Preserve napkin-sketch thin outlines and accent color cycling per card. Do not change aspect ratio or add photorealistic elements.

New page title: [TITLE]
[Per-card text replacements...]
```

---

## 八、与 Skill 流程的衔接

1. **Task Router** → `information_design`（见 `docs/workflows/information-design.md`）。
2. **Problem Definer** — 锁定 `data`、`reading_order`、`truth_source`；文案来源 = `content/*.md`。
3. **Gate A** — 用户确认文案；禁止模型自由发挥数字与步骤。
4. **Visual Translator** — 从本文「色彩 + 布局 + 组件」填 structured brief。
5. **Gate B** — 输出 3×3 ASCII 或列表，指名每卡 diagram 类型。
6. **Prompt Director** — 用 §7 模板 + 8-layer（Layer 7 = 全文案）。
7. **Gate C** — `gpt_image_review`；信息图文字错误 = P0。
8. **系列** — 多主题同风格时 `gpt_image_consistency --locked palette,linework,icon_style,card_shape,typography`。

---

## 九、反模式

- 一次整页 + 长英文不锁文案 → 高概率错字；必须 Gate A + Layer 7 verbatim。
- 每卡随机换图标风格 → 用 §五 词表 + consistency。
- 加 3D、写实人物、重阴影 → 破坏 napkin 可读性。
- 装饰插画抢过流程图 → 违反 information_design 原则。

---

## 十、已验证参考

| 项目 | 路径 |
|------|------|
| 风格锚点 PNG | `assets/reference-graph-engineering.png` |
| Graph engineering 文案 | `content/graph-engineering-en.md` |

成功 prompt 与 session 目录可回写到本节（与 `open-design` 案例做法一致）。

---

## 十一、路径常量

代码中读取：

```javascript
const { referencePaths } = require('./lib/referencePaths');
referencePaths.napkinOnePager.system;
referencePaths.napkinOnePager.referenceImage;
referencePaths.napkinOnePager.graphEngineeringContent;
```
