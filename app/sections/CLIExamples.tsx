import { Tabs } from '@/components/ui/tabs'
import { Terminal } from '@/components/ui/terminal'
import { cn } from '@/lib/utils'

export function CLIExamples() {
  const replayTab = {
    label: 'Replay',
    content: (
      <Terminal
        title="bash"
        command="$ hh replay last"
        lines={[
          '',
          'Loading last session...',
          'Session: 8d9f1a',
          'Model: claude-sonnet-4-20250514',
          'Duration: 00:04:32',
          '',
          'Controls:',
          '  n  — next step',
          '  p  — previous step',
          '  j  — jump to timestamp',
          '  q  — quit replay',
          '',
          '[step 1/42] 00:00:00 AGENT session started',
        ]}
      />
    ),
  }

  const inspectTab = {
    label: 'Inspect',
    content: (
      <Terminal
        title="bash"
        command="$ hh inspect 6f4b82"
        lines={[
          '',
          'Session: 6f4b82',
          'Model: claude-opus',
          'Started: 2024-11-14T09:23:11Z',
          'Duration: 2m 14s',
          '',
          'Summary:',
          '  12 prompt exchanges',
          '  8 tool calls',
          '  3 MCP interactions',
          '  4 file modifications',
          '  1 error (resolved)',
          '',
          'Result: SUCCESS',
        ]}
      />
    ),
  }

  const recordTab = {
    label: 'Record',
    content: (
      <Terminal
        title="bash"
        command="$ hh run -- claude"
        lines={[
          '',
          'Your agent runs as usual. Halfhand captures:',
          '  terminal output (any agent)',
          '  file changes, with real before/after diffs',
          '  prompts, tool calls, model and token usage (Claude Code)',
          '  MCP traffic (via hh mcp-proxy)',
          '',
          '✓ Recorded session e7c3d9 · 4m32s · 42 steps · 7 files changed · hh replay e7c3d9',
        ]}
      />
    ),
  }

  return (
    <section id="cli" className="py-20 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            CLI-first interface
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three core commands. Zero learning curve.
          </p>
        </div>

        <Tabs tabs={[recordTab, replayTab, inspectTab]} defaultIndex={1} />
      </div>

      <div className="mx-auto max-w-3xl mt-16 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3 text-center">
          {[
            { label: 'hh run', desc: 'Record any agent' },
            { label: 'hh replay', desc: 'Step through history' },
            { label: 'hh inspect', desc: 'Analyze sessions' },
          ].map((cmd) => (
            <div
              key={cmd.label}
              className={cn(
                'rounded-lg border border-border/60 bg-card/50 p-4',
                'hover:bg-card transition-colors'
              )}
            >
              <code className="text-sm font-mono font-bold text-foreground">
                {cmd.label}
              </code>
              <p className="mt-1 text-xs text-muted-foreground">{cmd.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
