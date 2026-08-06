import { getAllDocSlugs, getDocContentBySlug } from '@/lib/docs'
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
 * /llms.txt — a lightweight, curated index of the documentation for LLMs,
 * per the llms.txt convention (https://llmstxt.org). Each entry links the
 * canonical doc URL with a content-derived one-line description, so an LLM
 * can decide which page to fetch for full detail.
 */
export function GET() {
  const lines: string[] = []

  lines.push(`# ${siteConfig.name}`)
  lines.push('')
  lines.push(blockquote(siteConfig.defaultDescription))
  lines.push('')
  lines.push('## Documentation')
  lines.push('')

  for (const slug of getAllDocSlugs()) {
    const doc = getDocContentBySlug(slug)
    if (!doc) continue

    const url = canonicalUrl(slug.length === 0 ? '/docs' : `/docs/${slug.join('/')}`)
    lines.push(`- [${doc.title}](${url}): ${doc.description}`)
  }

  lines.push('')
  lines.push(
    `For the complete documentation in a single file, see [llms-full.txt](${siteConfig.url}/llms-full.txt).`
  )
  lines.push('')

  const body = lines.join('\n').trimEnd() + '\n'

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
