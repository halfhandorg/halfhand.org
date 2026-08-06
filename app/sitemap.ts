import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllDocSlugs } from '@/lib/docs'
import { fileLastModified } from '@/lib/fileDates'
import { canonicalUrl } from '@/lib/metadata'

// Required for the metadata-route file convention to build with `output: 'export'`.
export const dynamic = 'force-static'

// Main routes and the source file each is generated from. The source file is
// used to derive the `lastModified` date. Order matters: home first.
const mainRoutes = [
  { path: '/', source: 'app/page.tsx', priority: 1.0 },
  { path: '/install', source: 'app/install/page.tsx', priority: 0.8 },
  { path: '/docs', source: 'docs/index.md', priority: 0.7 },
  { path: '/privacy', source: 'app/privacy/page.tsx', priority: 0.5 },
  { path: '/terms', source: 'app/terms/page.tsx', priority: 0.5 },
] as const

const DOC_PRIORITY = 0.6

function entry(
  url: string,
  priority: number,
  source: string
): MetadataRoute.Sitemap[number] {
  return {
    url,
    lastModified: fileLastModified(source),
    changeFrequency: 'weekly',
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const main = mainRoutes.map((r) => entry(canonicalUrl(r.path), r.priority, r.source))

  // Doc sub-pages come from the same SUMMARY.md-driven slug list that
  // generateStaticParams uses, and each slug is double-checked to exist on
  // disk. This guarantees the sitemap never references a page that won't be
  // generated (zero 404s) and never includes drafts/build artifacts
  // (book.toml, READMEs, docs/assets, etc. are not in SUMMARY.md).
  const docs = getAllDocSlugs()
    .filter((slug) => slug.length > 0) // '/docs' index is handled above
    .filter((slug) =>
      fs.existsSync(path.join(process.cwd(), 'docs', `${slug.join('/')}.md`))
    )
    .map((slug) =>
      entry(
        canonicalUrl(`/docs/${slug.join('/')}`),
        DOC_PRIORITY,
        `docs/${slug.join('/')}.md`
      )
    )

  return [...main, ...docs]
}
