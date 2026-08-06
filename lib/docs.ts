import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { canonicalUrl } from '@/lib/metadata'

export interface DocItem {
  label: string
  href: string
  slug: string // e.g. "quickstart" or "adr/0001-threads-vs-tokio"
  isNested?: boolean
}

export interface DocSection {
  title: string
  items: DocItem[]
}

const DOCS_DIR = path.join(process.cwd(), 'docs')

// Helper to normalize the hrefs from SUMMARY.md to our app routing
function normalizeHref(rawHref: string): { href: string; slug: string } {
  // e.g. "./index.md" -> slug: "" (root), href: "/docs/"
  // e.g. "./quickstart.md" -> slug: "quickstart", href: "/docs/quickstart/"
  // e.g. "./adr/0001-threads-vs-tokio.md" -> slug: "adr/0001-threads-vs-tokio", href: "/docs/adr/0001-threads-vs-tokio/"
  const normalized = rawHref.replace(/^\.\//, '').replace(/\.md$/, '')
  if (normalized === 'index') {
    return { href: '/docs/', slug: '' }
  }
  return { href: `/docs/${normalized}/`, slug: normalized }
}

export function getDocsStructure(): DocSection[] {
  const summaryPath = path.join(DOCS_DIR, 'SUMMARY.md')
  if (!fs.existsSync(summaryPath)) {
    return []
  }

  const content = fs.readFileSync(summaryPath, 'utf8')
  const lines = content.split('\n')
  const sections: DocSection[] = []
  let currentSection: DocSection | null = null

  // Default section for items before any heading
  const introSection: DocSection = { title: '', items: [] }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Header matches (e.g. "# Getting started")
    if (trimmed.startsWith('# ')) {
      const title = trimmed.replace('# ', '').trim()
      if (title.toLowerCase() === 'summary') continue

      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = { title, items: [] }
      continue
    }

    // List item matches (e.g. "- [Quickstart](./quickstart.md)")
    const listMatch = line.match(/^(\s*)-\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (listMatch) {
      const indent = listMatch[1] || ''
      const label = listMatch[2].trim()
      const rawHref = listMatch[3].trim()
      const { href, slug } = normalizeHref(rawHref)
      const isNested = indent.length > 0

      const item: DocItem = { label, href, slug, isNested }

      if (currentSection) {
        currentSection.items.push(item)
      } else {
        introSection.items.push(item)
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection)
  }

  if (introSection.items.length > 0) {
    return [introSection, ...sections]
  }

  return sections
}

export interface DocPageContent {
  title: string
  description: string
  html: string
  slug: string
  /** Optional frontmatter date (YYYY-MM-DD), used as the article date. */
  date?: string
}

interface DocFrontmatter {
  title?: string
  description?: string
  date?: string
}

// Minimal YAML frontmatter parser (title / description / date only).
function parseFrontmatter(raw: string): { frontmatter: DocFrontmatter; body: string } {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/)
  if (!match) return { frontmatter: {}, body: raw }

  const frontmatter: DocFrontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (m) {
      const value = m[2].trim().replace(/^["']|["']$/g, '')
      if (value) frontmatter[m[1] as keyof DocFrontmatter] = value
    }
  }
  return { frontmatter, body: raw.slice(match[0].length) }
}

// Derive a meta description from the document's prose: drop code blocks,
// images, links, HTML, headings, and markdown punctuation, then accumulate
// paragraphs (skipping headings) until the description is substantial
// (~60+ chars) or hits the 160-char meta-description cap.
function extractDescription(body: string): string {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\(([^)]*)\)/g, '$1')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[*_~`>|]+/g, ' ')
        .replace(/^#{1,6}\s+.*$/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((p) => p.length > 0)

  let description = ''
  for (const para of paragraphs) {
    const candidate = description ? `${description} ${para}` : para
    if (candidate.length > 160) {
      if (description.length >= 60) break
      description = `${candidate.slice(0, 157).trimEnd()}...`
      break
    }
    description = candidate
  }
  return description
}

export function getDocContentBySlug(slugArray: string[]): DocPageContent | null {
  const relativePath = slugArray.join('/') || 'index'
  const filePath = path.join(DOCS_DIR, `${relativePath}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const rawMarkdown = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(rawMarkdown)

  // Set up custom marked renderer to handle relative links and assets beautifully
  const renderer = new marked.Renderer()

  // 1. Rewrite relative .md links (e.g., ./quickstart.md -> /docs/quickstart/)
  renderer.link = ({ href, title, text }) => {
    let targetHref = href
    if (href.endsWith('.md')) {
      const normalized = href.replace(/^\.\//, '').replace(/\.md$/, '')
      targetHref = normalized === 'index' ? '/docs/' : `/docs/${normalized}/`
    }
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${targetHref}"${titleAttr}>${text}</a>`
  }

  // 2. Rewrite relative image sources to point to our static assets if needed,
  // or serve them if they are in the docs/assets/ directory
  renderer.image = ({ href, title, text }) => {
    let targetSrc = href
    // If the image is located under `./assets/`, we can map it to our public path `/docs-assets/`
    if (href.startsWith('./assets/') || href.startsWith('assets/')) {
      const filename = href.split('/').pop()
      targetSrc = `/docs/assets/${filename}`
    }
    const titleAttr = title ? ` title="${title}"` : ''
    const altAttr = text ? ` alt="${text}"` : ''
    return `<img src="${targetSrc}"${altAttr}${titleAttr} class="block my-8 rounded-lg shadow-md border border-border/40 max-w-sm md:max-w-md w-full h-auto" />`
  }

  // Parse markdown to HTML using the custom renderer (frontmatter already stripped)
  const htmlContent = marked.parse(body, { renderer, async: false }) as string

  // Title: frontmatter wins, else the first H1 heading.
  const h1Match = body.match(/^#\s+(.+)$/m)
  const title = frontmatter.title ?? (h1Match ? h1Match[1].trim() : 'Documentation')

  // Description: frontmatter wins, else derived from the first paragraph.
  const extractedDescription = extractDescription(body)
  const description =
    frontmatter.description ??
    (extractedDescription || `Halfhand documentation for ${title}.`)

  return {
    title,
    description,
    html: htmlContent,
    slug: relativePath,
    date: frontmatter.date,
  }
}

// Splits doc HTML right before the second <h2>, so a component (e.g. an ad)
// can be inserted between the two halves. Returns `after: null` when there's
// no second section to split before.
export function splitDocHtmlAtSection(html: string): {
  before: string
  after: string | null
} {
  const firstH2 = html.indexOf('<h2')
  if (firstH2 === -1) {
    return { before: html, after: null }
  }
  const secondH2 = html.indexOf('<h2', firstH2 + 1)
  if (secondH2 === -1) {
    return { before: html, after: null }
  }
  return { before: html.slice(0, secondH2), after: html.slice(secondH2) }
}

export function getAllDocSlugs(): string[][] {
  const sections = getDocsStructure()
  const slugs: string[][] = [[]] // [] represents the index /docs page

  for (const section of sections) {
    for (const item of section.items) {
      if (item.slug === '') continue // already handled by []
      slugs.push(item.slug.split('/'))
    }
  }

  return slugs
}

export interface DocMarkdown {
  title: string
  /** Raw markdown body: frontmatter stripped, leading H1 removed. */
  markdown: string
  slug: string
}

/**
 * Raw markdown source of a doc, for single-file exports (e.g. /llms-full.txt).
 * Returns null if the file doesn't exist. The leading H1 is removed because
 * the exporter provides its own heading; the title is still resolved from
 * frontmatter or the H1.
 */
export function getDocMarkdown(slugArray: string[]): DocMarkdown | null {
  const relativePath = slugArray.join('/') || 'index'
  const filePath = path.join(DOCS_DIR, `${relativePath}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(raw)
  const h1 = body.match(/^#\s+(.+)$/m)
  const title = frontmatter.title ?? (h1 ? h1[1].trim() : relativePath)

  const markdown = body.replace(/^#\s+.*(?:\r?\n|$)/, '').trim()

  return { title, markdown, slug: relativePath }
}

// Rewrites relative `./x.md` links in prose to absolute canonical URLs so the
// single-file export reads cleanly for LLM ingestion. Fenced code blocks and
// `../` (repo-root) references are left untouched.
export function rewriteDocLinks(markdown: string): string {
  const parts = markdown.split(/(```[\s\S]*?```)/g)
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part // inside a code fence — leave as-is
      return part.replace(
        /\[([^\]]+)\]\(\.\/([^)]*\.md)(#[^)]*)?\)/g,
        (_m, text, file: string, anchor: string | undefined) => {
          const slug = file.replace(/\.md$/, '')
          return `[${text}](${canonicalUrl(`/docs/${slug === 'index' ? '' : slug}`)}${anchor ?? ''})`
        }
      )
    })
    .join('')
}
