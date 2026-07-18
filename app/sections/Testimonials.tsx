import { cn } from '@/lib/utils'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
          What developers are saying
        </h2>

        <div className={cn('rounded-xl border border-border/60 bg-card/50 p-8')}>
          <p className="text-xl italic text-foreground mb-6">
            &ldquo;This is super cool! It&apos;s like a VCR for LLMs.&rdquo;
          </p>
          <div className="text-sm">
            <a
              href="https://kennethreitz.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground"
            >
              &mdash; Kenneth Reitz
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Creator of{' '}
              <a
                href="https://kennethreitz.org/software/requests"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:no-underline"
              >
                Requests
              </a>
              ,{' '}
              <a
                href="https://kennethreitz.org/software/certifi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:no-underline"
              >
                Certifi
              </a>
              ,{' '}
              <a
                href="https://kennethreitz.org/software/pipenv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:no-underline"
              >
                Pipenv
              </a>{' '}
              &amp;{' '}
              <a
                href="https://kennethreitz.org/software"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:no-underline"
              >
                more
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}