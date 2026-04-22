# Script Contract

## Purpose

This skill ships with four bundled scripts, paired as (core class + CLI wrapper):

| Concern | Core class | CLI wrapper |
|---|---|---|
| text-to-image (gpt-image-2 `/images/generations`) | `scripts/gptImageGenerator.js` | `scripts/gpt-image-generate.js` |
| reference-image edit (gpt-image-2 `/images/edits`) | `scripts/gptImageEditor.js` | `scripts/gpt-image-edit.js` |
| 7-dimension review (multimodal chat completions) | `scripts/gptImageReviewer.js` | `scripts/gpt-image-review.js` |
| series consistency check (multimodal chat completions) | `scripts/gptImageConsistencyChecker.js` | `scripts/gpt-image-consistency.js` |

All four are reachable through `cli/index.js`:

```
generate | edit | review | consistency
```

And exposed as AI tools via `skill.contract.js`:

```
gpt_image_generate | gpt_image_edit | gpt_image_review | gpt_image_consistency
```

## Environment

Required:

- `OPENAI_API_KEY`

Optional:

- `OPENAI_API_BASE` — override API root (defaults to `https://api.openai.com/v1`).
- `GPT_IMAGE_OUTPUT_DIR` — default output root; defaults to `./work_dir/generated_images_gpt_image_2`.

## generate (gpt_image_generate)

### Parameter mapping

| Design decision | Script argument |
|---|---|
| final prompt | `--prompt` |
| model override | `--model` |
| image count | `--n` |
| size | `--size` |
| quality | `--quality` |
| response format | `--format` |
| moderation | `--moderation` |
| output root | `--output-dir` |
| session name | `--session-name` |
| backend override | `--base-url` |
| audit field | `--user` |

### Command pattern

```bash
node cli/index.js generate --prompt "一张高级感品牌海报" --n 1 --size 1536x1024 --quality high --session-name brand-kv-v1
```

## edit (gpt_image_edit)

```bash
# multipart: 本地参考图（可多张 --image，最多 16；--mask 可选做局部编辑）
node cli/index.js edit \
  --prompt "保留静物与色调，改为冷调并在顶部 1/4 预留标题" \
  --image path/to/ref1.png --image path/to/ref2.png \
  --n 1 --size 1536x1024 --quality high \
  --session-name brand-kv-v2

# JSON: 远程 URL / data URL / file_id
node cli/index.js edit --prompt "..." --image-url https://x/ref.png --mask-url https://x/mask.png
node cli/index.js edit --prompt "..." --image-file-id file_abc --mask-file-id file_def
```

Edit-only options: `--image`, `--image-url`, `--image-file-id`, `--mask`, `--mask-url`, `--mask-file-id`, `--output-format`, `--output-compression`, `--background`, `--input-fidelity`.

## review (gpt_image_review)

Read one or more generated images, evaluate against the 7-dimension rubric in [rubric/aesthetic-7dim.md](rubric/aesthetic-7dim.md), return structured JSON.

### Parameter mapping

| Concern | Script argument |
|---|---|
| image input (local) | `--image <file>` (repeatable, 1-10) |
| image input (URL / data URL) | `--image-url <url>` |
| image input (File API id) | `--image-file-id <id>` |
| brief text | `--brief "…"` or `--brief-file <path>` |
| custom rubric | `--rubric-file <path>` |
| review model | `--model` (default `gpt-4o`) |
| output root | `--output-dir` |
| session name | `--session-name` |
| backend override | `--base-url` |
| decode temperature | `--temperature` (default 0.2) |
| token budget | `--max-tokens` (default 2000) |

### Command pattern

```bash
node cli/index.js review \
  --image work_dir/.../image_001.png \
  --brief "小红书新品封面，调性温柔新中式，目标 25-35 岁都市女性" \
  --session-name review-tea-kv-v1
```

### Output contract

Writes `review_result.json` in `<outputDir>/<sessionName>/` containing:

```json
{
  "review": {
    "overall_score": 4.1,
    "band": "deliverable_with_one_iteration",
    "dimension_scores": {
      "visual_hierarchy":     { "score": 4, "note": "…" },
      "composition_balance":  { "score": 4, "note": "…" },
      "color_harmony":        { "score": 5, "note": "…" },
      "typography_text":      { "score": 3, "note": "…" },
      "emotional_fit":        { "score": 4, "note": "…" },
      "originality":          { "score": 4, "note": "…" },
      "functionality":        { "score": 4, "note": "…" }
    },
    "p0_issues": [],
    "top_strengths": ["…"],
    "critical_issues": ["…"],
    "improvement_suggestions": [
      { "issue": "…", "prompt_patch": "…" }
    ]
  }
}
```

## consistency (gpt_image_consistency)

Check a series of images against a set of locked visual variables; report per-variable scores and per-outlier fix suggestions.

### Parameter mapping

| Concern | Script argument |
|---|---|
| image input (local) | `--image <file>` (repeatable, 2-8) |
| image input (URL / data URL) | `--image-url <url>` |
| image input (File API id) | `--image-file-id <id>` |
| locked variables | `--locked <a,b,c>` (palette, lighting, framing, texture, character, typography, aspect_ratio, brand_cues) |
| permitted variance description | `--permitted "…"` |
| brief | `--brief "…"` or `--brief-file <path>` |
| model | `--model` (default `gpt-4o`) |
| output root | `--output-dir` |
| session name | `--session-name` |
| backend override | `--base-url` |
| decode temperature | `--temperature` |
| token budget | `--max-tokens` |

### Command pattern

```bash
node cli/index.js consistency \
  --image hero.png --image lifestyle.png --image quote.png \
  --locked palette,lighting,texture,typography \
  --permitted "subject and scene may differ; framing angle may shift within the locked framing logic" \
  --session-name series-tea-campaign-v1
```

### Output contract

Writes `consistency_result.json` in `<outputDir>/<sessionName>/` containing:

```json
{
  "report": {
    "overall_consistency": 4.1,
    "band": "minor_drift",
    "locked_variables": ["palette", "lighting", "texture", "typography"],
    "per_variable_report": [
      { "variable": "palette",    "score": 5, "observation": "…", "outlier_indices": [] },
      { "variable": "lighting",   "score": 3, "observation": "…", "outlier_indices": [2] }
    ],
    "outlier_images": [
      {
        "index": 2,
        "reason": "lighting direction shifted to front-on while others are side-left",
        "fix_suggestion": "Rerun image #3 with Layer 4 (lighting) patched to 'side window light from camera-left, 4000K, soft diffused'.",
        "tool_recommendation": "gpt_image_edit"
      }
    ],
    "summary": "…"
  }
}
```

## Review priorities after any execution

1. text correctness
2. crop fitness
3. hierarchy
4. mood accuracy
5. material realism
6. series consistency (for multi-image tasks)
