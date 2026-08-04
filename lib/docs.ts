import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

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
  html: string
  slug: string
}

export function getDocContentBySlug(slugArray: string[]): DocPageContent | null {
  const relativePath = slugArray.join('/') || 'index'
  const filePath = path.join(DOCS_DIR, `${relativePath}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const rawMarkdown = fs.readFileSync(filePath, 'utf8')

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

  // Parse markdown to HTML using the custom renderer
  const htmlContent = marked.parse(rawMarkdown, { renderer, async: false }) as string

  // Extract the first H1 tag as the page title if possible
  const h1Match = rawMarkdown.match(/^#\s+(.+)$/m)
  const title = h1Match ? h1Match[1].trim() : 'Documentation'

  return {
    title,
    html: htmlContent,
    slug: relativePath,
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
