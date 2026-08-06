import { getAllDocSlugs, getDocMarkdown, rewriteDocLinks } from '@/lib/docs'
import { canonicalUrl, siteConfig } from '@/lib/metadata'

// Route handlers must be statically prerenderable under `output: 'export'`.
export const dynamic = 'force-static'

function blockquote(text: string): string {
  return text
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')
}

/**
 * /llms-full.txt — a single, plain-text Markdown export of the entire
 * documentation for deep LLM ingestion. Generated at build time from the same
 * SUMMARY.md-driven doc list that powers the site's docs routes.
 */
export function GET() {
  const sections: string[] = []

  // Header: H1 title + blockquote summary of purpose.
  sections.push(`# ${siteConfig.name}`)
  sections.push('')
  sections.push(blockquote(siteConfig.defaultDescription))
  sections.push('')

  for (const slug of getAllDocSlugs()) {
    const doc = getDocMarkdown(slug)
    if (!doc) continue

    const url = canonicalUrl(doc.slug === 'index' ? '/docs' : `/docs/${doc.slug}`)
    sections.push(`## ${doc.title} — ${url}`)
    sections.push('')
    sections.push(rewriteDocLinks(doc.markdown))
    sections.push('')
  }

  const body = sections.join('\n').trimEnd() + '\n'

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
