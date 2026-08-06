import type { Metadata } from 'next'

/**
 * Single source of truth for site-wide metadata. All canonical URLs,
 * Open Graph URLs, and relative metadata fields are derived from here
 * instead of being hardcoded per-page.
 */
export const siteConfig = {
  name: 'Halfhand',
  url: 'https://halfhand.org',
  defaultTitle: 'Halfhand — Replay Every Action Your Agents Took',
  defaultDescription:
    'Halfhand is a local-first developer tool for recording, replaying, and debugging AI agent execution. Inspect prompts, tool calls, MCP traffic, file modifications, and execution history through a deterministic replay interface.',
  // Relative to the site — Next.js resolves it against metadataBase into an
  // absolute URL (https://halfhand.org/opengraph-image). Served by the
  // file-based image convention in app/opengraph-image.tsx.
  ogImage: '/opengraph-image',
  ogImageAlt: 'Halfhand — Replay Every Action Your Agents Took',
} as const

/**
 * Build an absolute canonical URL from a route path, normalized to the
 * trailing-slash format used across the site (see next.config.ts).
 *
 *   canonicalUrl()                  -> 'https://halfhand.org/'
 *   canonicalUrl('/docs')           -> 'https://halfhand.org/docs/'
 *   canonicalUrl('/docs/quickstart')-> 'https://halfhand.org/docs/quickstart/'
 */
export function canonicalUrl(path = '/'): string {
  if (path === '/' || path === '') {
    return `${siteConfig.url}/`
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalized.replace(/\/+$/, '')}/`
}

interface BuildMetadataOptions {
  /** Route path, e.g. '/' or '/docs/quickstart'. A trailing slash is optional. */
  path?: string
  title?: string
  description?: string
  type?: 'website' | 'article'
}

/**
 * Centralized metadata builder. Sets metadataBase (so any relative URLs in
 * metadata resolve against the site), an explicit per-route trailing-slash
 * canonical, and consistent Open Graph / Twitter / robots tags.
 */
export function buildMetadata({
  path = '/',
  title,
  description,
  type = 'website',
}: BuildMetadataOptions = {}): Metadata {
  const canonical = canonicalUrl(path)
  const resolvedTitle = title ?? siteConfig.defaultTitle
  const resolvedDescription = description ?? siteConfig.defaultDescription

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: 'en_US',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      site: '@halfhandorg',
      creator: '@halfhandorg',
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
