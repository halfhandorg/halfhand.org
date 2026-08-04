import type { Metadata } from 'next'
import { Terminal } from '@/components/ui/terminal'
import { Footer } from '../sections/Footer'

const title = 'Install — Halfhand'
const description =
  'Install Halfhand via Cargo, Homebrew, or a prebuilt binary. Get the local-first AI agent flight recorder running in under a minute.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://halfhand.org/install/',
  },
  openGraph: {
    title,
    description,
    url: 'https://halfhand.org/install/',
    type: 'website',
    images: ['https://halfhand.org/opengraph-image'],
  },
  twitter: {
    title,
    description,
    images: ['https://halfhand.org/opengraph-image'],
  },
}

export default function InstallPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-border/40 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Install Halfhand
          </h1>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl">
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

          <h2>Homebrew (macOS &amp; Linux)</h2>
          <Terminal
            title="bash"
            command="$ brew install halfhand-org/tap/halfhand"
            lines={[]}
          />

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
              Rust 1.75+
            </a>
            .
          </p>

          <h2>Verify</h2>
          <Terminal title="bash" command="$ hh --version" lines={[]} />

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
