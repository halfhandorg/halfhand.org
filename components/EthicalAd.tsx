'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface EthicalAdProps {
  type?: 'text' | 'image'
  className?: string
}

declare global {
  interface Window {
    ethicalads?: {
      wait: Promise<unknown[]>
    }
  }
}

// A page can have more placements than EthicalAds has inventory to fill —
// unfilled ones stay as empty divs. Hide this instance rather than leave a
// dead bordered box once we know whether it was actually filled.
function waitForEthicalAds(callback: () => void, attemptsLeft = 20) {
  if (typeof window === 'undefined') return
  if (window.ethicalads?.wait) {
    window.ethicalads.wait.then(callback)
  } else if (attemptsLeft > 0) {
    setTimeout(() => waitForEthicalAds(callback, attemptsLeft - 1), 100)
  }
}

export function EthicalAd({ type = 'image', className }: EthicalAdProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(true)

  useEffect(() => {
    let cancelled = false
    waitForEthicalAds(() => {
      if (!cancelled && ref.current && ref.current.children.length === 0) {
        setFilled(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      ref={ref}
      data-ea-publisher="halfhandorg"
      data-ea-type={type}
      className={cn('ethical-ad dark', className)}
      // Inline style so this always wins regardless of whatever display
      // utility (flex, block, ...) a caller passes via `className` — a
      // `hidden` class can lose that fight on specificity/source order.
      style={filled ? undefined : { display: 'none' }}
    />
  )
}
