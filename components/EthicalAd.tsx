import { cn } from '@/lib/utils'

interface EthicalAdProps {
  type: 'text' | 'image'
  className?: string
}

export function EthicalAd({ type, className }: EthicalAdProps) {
  return (
    <div
      data-ea-publisher="halfhandorg"
      data-ea-type={type}
      className={cn('ethical-ad', className)}
    />
  )
}
