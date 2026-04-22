# Script Contract

## Purpose
This skill ships with two bundled scripts:

- `scripts/gptImageGenerator.js` — text-to-image via `POST /v1/images/generations`
- `scripts/gptImageEditor.js` — reference-image edit via `POST /v1/images/edits`

CLI wrappers:

- `scripts/gpt-image-generate.js`
- `scripts/gpt-image-edit.js`

## Environment
Required:

- `OPENAI_API_KEY`

Optional:

- `OPENAI_API_BASE`
- `GPT_IMAGE_OUTPUT_DIR`

## Parameter Mapping
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

## Command Pattern

```bash
node cli/index.js generate --prompt "一张高级感品牌海报" --n 1 --size 1536x1024 --quality high --session-name brand-kv-v1
```

### Edit with reference images

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

## Review Priorities
Check these after execution:

1. text correctness
2. crop fitness
3. hierarchy
4. mood accuracy
5. material realism
6. series consistency
