#!/usr/bin/env node
// Copies the Halfhand docs from the core repo into this site.
//
// The Markdown source of truth is halfhandorg/halfhand's `docs/` folder, so
// docs ship in the same PR as the feature they describe. This site only
// renders them. `docs/` and the synced images here are build inputs and are
// gitignored: never edit them in this repo.
//
// Usage:
//   npm run sync-docs                      # from ../halfhand/docs
//   HALFHAND_DOCS_SRC=/path/to/docs npm run sync-docs
//
// Besides the files, it writes docs/.docs-dates.json with each page's first
// and last commit dates in the core repo, so article dates in metadata and
// the sitemap reflect real edits rather than the build time.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const src = path.resolve(process.env.HALFHAND_DOCS_SRC ?? path.join(root, '..', 'halfhand', 'docs'))
const docsOut = path.join(root, 'docs')
const assetsOut = path.join(root, 'public', 'docs', 'assets')

if (!fs.existsSync(path.join(src, 'SUMMARY.md'))) {
  console.error(`error: no SUMMARY.md in ${src}`)
  console.error('  The docs source is the core repo (halfhandorg/halfhand) docs/ folder.')
  console.error('  Clone it next to this repo, or set HALFHAND_DOCS_SRC=/path/to/halfhand/docs.')
  process.exit(1)
}

fs.rmSync(docsOut, { recursive: true, force: true })
fs.mkdirSync(docsOut, { recursive: true })
fs.mkdirSync(assetsOut, { recursive: true })

const dates = {}
function gitDates(file) {
  try {
    const out = execFileSync('git', ['log', '--format=%cI', '--', file], {
      cwd: src,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (!out) return null
    const lines = out.split('\n')
    return { first: lines[lines.length - 1], last: lines[0] }
  } catch {
    return null
  }
}

// mdbook-style `{{#include ../STABILITY.md}}` pulls a repo-root file into a
// page. Expand it here. Relative links in the included file are relative to
// its own folder, so rebase them onto the page's folder (lib/docs.ts then
// turns `../docs/x.md` into /docs/x/ and other `../` links into GitHub URLs).
function expandIncludes(markdown, fileDir) {
  return markdown.replace(/\{\{#include\s+([^}\s]+)\s*\}\}/g, (directive, target) => {
    const includePath = path.resolve(fileDir, target)
    if (!fs.existsSync(includePath)) {
      console.warn(`warning: ${directive} not found at ${includePath}; left as-is`)
      return directive
    }
    const rel = path.relative(fileDir, path.dirname(includePath)).split(path.sep).join('/')
    const included = fs.readFileSync(includePath, 'utf8')
    if (!rel) return included
    return included.replace(/\]\((?![a-z][a-z0-9+.-]*:|#|\/)([^)\s]+)/gi, (_m, href) => `](${rel}/${href})`)
  })
}

let copied = 0
function walk(dir, rel) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const from = path.join(dir, entry.name)
    const relPath = rel ? `${rel}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (relPath === 'book') continue // stale local mdbook output
      if (relPath === 'assets') {
        for (const a of fs.readdirSync(from)) fs.copyFileSync(path.join(from, a), path.join(assetsOut, a))
        continue
      }
      fs.mkdirSync(path.join(docsOut, relPath), { recursive: true })
      walk(from, relPath)
    } else if (entry.name.endsWith('.md')) {
      const markdown = expandIncludes(fs.readFileSync(from, 'utf8'), dir)
      fs.writeFileSync(path.join(docsOut, relPath), markdown)
      const d = gitDates(path.join(src, relPath))
      if (d) dates[`docs/${relPath}`] = d
      copied++
    }
  }
}
walk(src, '')
fs.writeFileSync(path.join(docsOut, '.docs-dates.json'), `${JSON.stringify(dates, null, 2)}\n`)
console.log(`synced ${copied} docs pages from ${src}`)
