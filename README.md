# Yao Agents Documentation

Official documentation for Yao Agents, Tai Link, and shared resources.

## Structure

```
{product}/{locale}/{section}/index.yml   — section metadata + page ordering
{product}/{locale}/{section}/{slug}.mdx  — article content (MDX)
```

### Products

| Directory | Product |
|-----------|---------|
| `yao-agents/` | Yao Agents user manual |
| `tai-link/` | Tai Link device connectivity guide |
| `general/` | Shared resources (glossary, FAQ, shortcuts, etc.) |

### Locales

| Code | Language |
|------|----------|
| `en-us` | English |
| `zh-cn` | 简体中文 |
| `zh-tw` | 繁體中文 |
| `ja-jp` | 日本語 |

## index.yml Schema

### Product root (`{product}/{locale}/index.yml`)

```yaml
slug: yao-agents
title: Yao Agents
summary: Product user manual...
sections:
  - getting-started
  - ai-assistants
  - mission-control
```

### Section (`{section}/index.yml`)

```yaml
slug: getting-started
title: Getting Started
summary: From installation to understanding the core product.
pages:
  - slug: what-is-yao-agents
    title: What Is Yao Agents
    summary: Product positioning, core value...
  - slug: installation
    title: Installation
    summary: Download and install on macOS, Windows, or Linux.
children:           # optional, for nested sub-sections
  - execution-pipeline
```

### Key design decisions

- **Ordering**: Determined by array position in `pages[]` and `sections[]` — no numeric filename prefixes
- **Titles**: Locale-aware in `index.yml` — not derived from filenames
- **Slugs**: Stable across locales (same slug, different title/summary per locale)
- **Insertions**: Add an entry to the `pages[]` array + create the `.mdx` file

## Article format (`.mdx`)

```mdx
---
slug: what-is-yao-agents
---

# What Is Yao Agents

Article content in MDX...
```

## Regenerate structure

```bash
npm install yaml typescript tsx
npx tsx generate.ts
```
