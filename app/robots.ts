import type { MetadataRoute } from 'next'

// Required for the metadata-route file convention to build with `output: 'export'`.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly permit social-media crawlers that fetch OpenGraph /
      // Twitter Card previews (e.g. /opengraph-image). They are already
      // covered by `Allow: /` above, but listing them makes the intent
      // explicit and guards against future scope creep.
      {
        userAgent: ['Twitterbot', 'facebookexternalhit', 'LinkedInBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://halfhand.org/sitemap.xml',
  }
}
