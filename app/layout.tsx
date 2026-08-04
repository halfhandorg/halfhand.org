import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/Header'
import { JSONLD } from '@/components/JSONLD'
import './globals.css'

export const metadata: Metadata = {
  title: 'Halfhand — Replay Every Action Your Agents Took',
  description:
    'Halfhand is a local-first developer tool for recording, replaying, and debugging AI agent execution. Inspect prompts, tool calls, MCP traffic, file modifications, and execution history through a deterministic replay interface.',
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
  metadataBase: new URL('https://halfhand.org'),
  openGraph: {
    title: 'Halfhand — Replay Every Action Your Agents Took',
    description:
      'Halfhand is a local-first developer tool for recording, replaying, and debugging AI agent execution.',
    url: 'https://halfhand.org',
    siteName: 'Halfhand',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Halfhand — Replay Every Action Your Agents Took',
    description:
      'Local-first developer tool for recording, replaying, and debugging AI agent execution.',
    site: '@halfhandorg',
    creator: '@halfhandorg',
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
  alternates: {
    canonical: 'https://halfhand.org',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JSONLD />
      </head>
      <body
        className={`${GeistSans.className} ${GeistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Script
          async
          src="https://media.ethicalads.io/media/client/ethicalads.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
