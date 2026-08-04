import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocContentBySlug, getAllDocSlugs } from '@/lib/docs'

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
  const slugPath = slug && slug.length > 0 ? `${slug.join('/')}/` : ''
  const isIndex = !slug || slug.length === 0
  const title = isIndex ? 'Documentation — Halfhand' : `${doc.title} — Halfhand Docs`
  const description = isIndex
    ? 'Halfhand documentation: installation, replay, MCP debugging, and CLI reference.'
    : `Read the documentation for ${doc.title} on Halfhand.`
  const canonical = `https://halfhand.org/docs/${slugPath}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: ['https://halfhand.org/opengraph-image'],
    },
    twitter: {
      title,
      description,
      images: ['https://halfhand.org/opengraph-image'],
    },
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = getDocContentBySlug(slug || [])

  if (!doc) {
    notFound()
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: doc.html }}
    />
  )
}
