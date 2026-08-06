import type { Metadata } from 'next'
import { DocsSidebar } from '@/components/DocsSidebar'
import { EthicalAd } from '@/components/EthicalAd'
import { getDocsStructure } from '@/lib/docs'
import { buildMetadata } from '@/lib/metadata'
import { Footer } from '../sections/Footer'

export const metadata: Metadata = buildMetadata({
  path: '/docs',
  title: 'Docs — Halfhand',
  description:
    'Halfhand documentation: installation, replay, MCP debugging, and CLI reference.',
})

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sections = getDocsStructure()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <DocsSidebar sections={sections} />
        <main className="flex-1 min-w-0">
          <article className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-code:text-foreground prose-pre:bg-secondary/50">
            {children}
          </article>
          <EthicalAd type="image" className="mt-12 flex justify-center" />
        </main>
      </div>
      <Footer />
    </div>
  )
}
