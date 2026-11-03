import type { Metadata } from 'next'
import { Terminal } from '@/components/ui/terminal'
import { buildMetadata } from '@/lib/metadata'
import { Footer } from '../sections/Footer'

export const metadata: Metadata = buildMetadata({
  path: '/install',
  title: 'Install — Halfhand',
  description:
    'Install Halfhand via Cargo, the shell installer, or a prebuilt binary. Get the local-first AI agent flight recorder running in under a minute.',
})

export default function InstallPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-border/40 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Install Halfhand
          </h1>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-code:font-mono prose-pre:font-mono">
          <h2>Shell (macOS &amp; Linux, recommended)</h2>
          <Terminal
            title="bash"
            command="$ curl --proto '=https' --tlsv1.2 -LsSf https://github.com/halfhandorg/halfhand/releases/latest/download/halfhand-installer.sh | sh"
            lines={[]}
          />
          <p>
            No Rust required. Installs to <code>~/.halfhand/bin</code>.
          </p>

          <h2>PowerShell (Windows)</h2>
          <Terminal
            title="powershell"
            command="$ irm https://github.com/halfhandorg/halfhand/releases/latest/download/halfhand-installer.ps1 | iex"
            lines={[]}
          />
          <p>
            Windows builds ship, but runtime support is best-effort for now:
            Linux and macOS are fully supported and tested end to end.
          </p>

          <h2>Cargo (all platforms)</h2>
          <Terminal
            title="bash"
            command="$ cargo install halfhand"
            lines={[]}
          />
          <p>
            Requires{' '}
            <a
              href="https://rustup.rs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rust 1.88+
            </a>
            .
          </p>

          <h2>Latest from <code>main</code></h2>
          <p>
            The methods above install the latest release. To try what&apos;s
            listed under <em>Unreleased</em> in the{' '}
            <a
              href="https://github.com/halfhandorg/halfhand/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              changelog
            </a>
            , build from source:
          </p>
          <Terminal
            title="bash"
            command="$ cargo install --locked --force --git https://github.com/halfhandorg/halfhand halfhand"
            lines={[]}
          />

          <h2>Verify</h2>
          <Terminal title="bash" command="$ hh --version" lines={[]} />
          <p>
            It prints the version and the git commit it was built from.
          </p>

          <h2>First run</h2>
          <Terminal title="bash" command="$ hh init" lines={[]} />
          <p>
            Optional. Creates the data directory and a commented starter
            config, and prints every path it uses. See{' '}
            <a href="/docs/init/">hh init</a>.
          </p>

          <p>
            Download a binary directly from{' '}
            <a
              href="https://github.com/halfhandorg/halfhand/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Releases
            </a>
            .
          </p>
        </div>
      </article>
      <Footer />
    </div>
  )
}
