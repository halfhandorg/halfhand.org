import { Terminal } from '@/components/ui/terminal'
import { cn } from '@/lib/utils'

export function Hero() {
  const terminalLines = [
    '',
    'Session: 6f4b82',
    'Model: claude-opus',
    '',
    '00:00:01 AGENT Started session',
    '00:00:02 TOOL  Read README.md',
    '00:00:04 MCP   github.search_repositories()',
    '00:00:07 TOOL  Write src/main.rs',
    '00:00:10 TOOL  cargo test',
    '00:00:13 ERROR Test failed',
    '00:00:15 AGENT Generated fix',
    '00:00:21 SUCCESS All tests passed',
  ]

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-40 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl animate-slide-up">
              Replay every action your agents took.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Halfhand records prompts, tool calls, MCP interactions, file
              modifications, terminal commands, and execution history so you can
              inspect failures, understand decisions, reproduce behavior, and audit
              autonomous systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <a
                href="#install"
                className={cn(
                  'inline-flex items-center justify-center rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors',
                  'hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                className={cn(
                  'inline-flex items-center justify-center rounded-lg border border-border/60 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors',
                  'hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                View Demo
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Open source &middot; Local-first &middot; SQLite-backed
            </p>
          </div>

          {/* Right: Terminal */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Terminal
              command="$ hh replay 6f4b82"
              lines={terminalLines}
              className="shadow-2xl"
            />
            {/* Subtle glow behind terminal */}
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-border/30 to-transparent opacity-50 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
