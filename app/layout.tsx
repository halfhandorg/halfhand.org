import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/Header'
import { buildMetadata } from '@/lib/metadata'
import './globals.css'

export const metadata: Metadata = {
  ...buildMetadata({ path: '/' }),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
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
