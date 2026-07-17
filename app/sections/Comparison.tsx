import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const rows = [
  { feature: 'Replay execution', halfhand: true, logs: false },
  { feature: 'Inspect tool calls', halfhand: true, logs: 'partial' },
  { feature: 'Track file changes', halfhand: true, logs: false },
  { feature: 'MCP visibility', halfhand: true, logs: false },
  { feature: 'Deterministic replay', halfhand: true, logs: false },
  { feature: 'Agent audit trail', halfhand: true, logs: false },
]

export function Comparison() {
  return (
    <section id="comparison" className="py-20 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Halfhand vs. Traditional Logs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Observability designed for agents, not applications.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/30">
                <th className="px-6 py-4 font-semibold text-foreground">
                  Feature
                </th>
                <th className="px-6 py-4 font-semibold text-foreground text-center">
                  <span className="inline-flex items-center gap-1">
                    <span className="font-bold">Halfhand</span>
                  </span>
                </th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-center">
                  Traditional Logs
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {rows.map((row, index) => (
                <tr key={index} className="bg-card/30">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.logs === 'partial' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-400">
                        <X className="h-3.5 w-3.5" />
                        Partial
                      </span>
                    ) : row.logs ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-1.5">
                        <Check className="h-4 w-4 text-emerald-500" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full bg-destructive/10 p-1.5">
                        <X className="h-4 w-4 text-destructive" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
