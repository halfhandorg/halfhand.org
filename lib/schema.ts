import { canonicalUrl, siteConfig } from './metadata'

/**
 * schema.org/SoftwareApplication for the homepage — the primary entity for a
 * developer-tool marketing site.
 */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Linux, macOS, Windows',
    softwareVersion: '0.1.0',
    url: canonicalUrl('/'),
    description: siteConfig.defaultDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    featureList: [
      'AI agent observability',
      'Deterministic agent execution replay',
      'MCP debugging',
      'Agent tracing',
      'Execution timeline visualization',
      'File diff inspection',
      'SQLite storage',
      'Local-first data ownership',
    ],
    keywords: [
      'AI agent observability',
      'AI agent debugging',
      'agent execution replay',
      'deterministic agent execution',
      'agent tracing',
      'MCP debugging',
      'AI workflow observability',
      'AI agent audit trail',
      'AI agent monitoring',
      'agent forensics',
      'replay AI agent sessions',
      'Model Context Protocol debugging',
    ],
  }
}

export interface TechArticleSchemaOptions {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
}

/**
 * schema.org/TechArticle for documentation pages. Helps Google treat docs as
 * article content (distinct from the homepage's SoftwareApplication) and
 * surfaces lastUpdated in search results.
 */
export function techArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: TechArticleSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: 'en-US',
    image,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}
