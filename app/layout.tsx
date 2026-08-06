import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { buildMetadata } from '@/lib/metadata'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

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
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
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
