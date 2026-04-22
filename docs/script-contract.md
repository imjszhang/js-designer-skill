# Script Contract

## Purpose
This skill ships with a bundled generator script:

- `scripts/gptImageGenerator.js`

CLI wrapper:

- `scripts/gpt-image-generate.js`

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

## Review Priorities
Check these after execution:

1. text correctness
2. crop fitness
3. hierarchy
4. mood accuracy
5. material realism
6. series consistency
