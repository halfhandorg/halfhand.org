'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { DocSection } from '@/lib/docs'
import { EthicalAd } from '@/components/EthicalAd'

interface DocsSidebarProps {
  sections: DocSection[]
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Toggle docs menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border/40 bg-background/95 backdrop-blur-md px-6 py-24 transition-transform duration-200 md:translate-x-0 md:border-none md:bg-transparent md:backdrop-blur-none md:block md:py-0 md:px-0 md:h-[calc(100vh-8rem)] md:sticky md:top-24 md:overflow-y-auto pr-4 scrollbar-thin',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="space-y-8">
          {sections.map((section, idx) => (
            <div key={section.title || `sec-${idx}`}>
              {section.title && (
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href} className={cn(item.isNested && 'pl-4')}>
                    <a
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-secondary text-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <EthicalAd
          type="text"
          className="mt-8 rounded-md border border-border/40 p-3"
        />
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
