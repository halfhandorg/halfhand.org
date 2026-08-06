import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Standardize all URLs to trailing-slash form (/docs/ instead of /docs).
  // This is the canonical routing convention for the site: every internal
  // link, canonical tag, sitemap URL, and the metadata helper in
  // lib/metadata.ts must emit URLs with a trailing slash. Keep them in sync
  // to avoid 'Page with redirect' / duplicate-URL issues in Search Console.
  trailingSlash: true,
}

export default nextConfig
