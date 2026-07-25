'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[]
  defaultIndex?: number
  className?: string
}

export function Tabs({ tabs, defaultIndex = 0, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex border-b border-border/60 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'relative px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0',
              'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-md',
              activeIndex === index
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            {tab.label}
            {activeIndex === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[activeIndex]?.content}</div>
    </div>
  )
}
