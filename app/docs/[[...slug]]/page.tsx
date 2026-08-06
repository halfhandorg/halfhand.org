import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocContentBySlug, getAllDocSlugs, splitDocHtmlAtSection } from '@/lib/docs'
import { buildMetadata, canonicalUrl, siteConfig } from '@/lib/metadata'
import { fileFirstModified, fileLastModified } from '@/lib/fileDates'
import { techArticleSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocContentBySlug(slug || [])
  if (!doc) {
    return {}
  }
  const slugPath = slug && slug.length > 0 ? slug.join('/') : ''
  const isIndex = !slug || slug.length === 0
  const title = isIndex ? 'Documentation — Halfhand' : `${doc.title} — Halfhand Docs`
  // From frontmatter when present, otherwise derived from the doc's first
  // paragraph — never a generic fallback string.
  const description = doc.description

  return buildMetadata({
    path: `/docs/${slugPath}`,
    title,
    description,
    type: 'article',
  })
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = getDocContentBySlug(slug || [])

  if (!doc) {
    notFound()
  }

  const { before, after } = splitDocHtmlAtSection(doc.html)

  const slugPath = slug && slug.length > 0 ? slug.join('/') : ''
  const canonical = canonicalUrl(`/docs/${slugPath}`)
  const sourcePath = `docs/${slugPath || 'index'}.md`
  const dateModified = fileLastModified(sourcePath).toISOString()
  const datePublished = doc.date
    ? new Date(doc.date).toISOString()
    : fileFirstModified(sourcePath).toISOString()

  return (
    <>
      <JsonLd
        data={techArticleSchema({
          title: doc.title,
          description: doc.description,
          url: canonical,
          datePublished,
          dateModified,
          image: `${siteConfig.url}/opengraph-image`,
        })}
      />
      <div dangerouslySetInnerHTML={{ __html: before }} />
      {after && <div dangerouslySetInnerHTML={{ __html: after }} />}
    </>
  )
}
