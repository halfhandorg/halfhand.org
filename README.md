# Halfhand Website

The landing page and documentation site for [Halfhand](https://halfhand.org), built with Next.js 15, React 19, and Tailwind CSS.

## Overview

Halfhand is a local-first developer tool for recording, replaying, and debugging AI agent execution. This repository contains the source code for the public-facing landing page (`halfhand.org`).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19 RC
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Icons:** Lucide React
- **Fonts:** Geist (Sans & Mono)
- **Deployment:** GitHub Pages via GitHub Actions (Static Export)

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Installation

```bash
git clone https://github.com/halfhandorg/halfhand.org.git
cd halfhand.org
npm install --legacy-peer-deps
```
*(Note: `--legacy-peer-deps` is required due to React 19 RC peer dependency resolution in the current Next.js ecosystem).*

### Docs

The docs pages under `/docs/` are **not** edited here. Their Markdown source is
the [`docs/` folder of halfhandorg/halfhand](https://github.com/halfhandorg/halfhand/tree/main/docs),
so docs ship in the same PR as the feature they describe. This repo renders them.

Before `npm run dev` or `npm run build`, pull the docs in:

```bash
git clone https://github.com/halfhandorg/halfhand.git ../halfhand   # once
npm run sync-docs        # or: HALFHAND_DOCS_SRC=/path/to/halfhand/docs npm run sync-docs
```

`docs/` is gitignored. CI syncs on every push, on a `docs-updated` dispatch from
the core repo, and daily. Contributor-only pages (manual QA, 1.0 definition of
done, the Homebrew tap README) are filtered out in `lib/docs.ts`.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. Changes will hot-reload automatically.

## Deployment

This site is automatically deployed to GitHub Pages via a GitHub Actions workflow (`.github/workflows/deploy.yml`). 

Pushing to the `main` branch will trigger a production build using `next build` (with `output: "export"` configured in `next.config.ts`), and the resulting static files will be published to the `github-pages` environment.

## License

MIT
