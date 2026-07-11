import type { Metadata } from 'next'
import { Footer } from '../sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Halfhand',
  description:
    'How Halfhand handles data. Halfhand is local-first: agent recordings stay on your machine. This policy covers the halfhand.org website and the Halfhand software.',
  alternates: {
    canonical: 'https://halfhand.org/privacy/',
  },
}

const LAST_UPDATED = 'July 11, 2026'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-border/40 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl">
          <p>
            Halfhand is a local-first developer tool for recording, replaying,
            and debugging AI agent execution. Privacy is central to how the
            product is designed: your agent recordings, prompts, tool calls, and
            execution history are captured and stored on your own machine. This
            policy explains what data is involved when you use the Halfhand
            software and when you visit our website at{' '}
            <a href="https://halfhand.org">halfhand.org</a>.
          </p>

          <h2>Summary</h2>
          <ul>
            <li>
              <strong>The Halfhand software is local-first.</strong> The data it
              records about your AI agents stays on your device. We do not
              collect, transmit, or store it.
            </li>
            <li>
              <strong>The website collects almost nothing.</strong> halfhand.org
              is a static site with no accounts, no login, and no tracking
              cookies.
            </li>
            <li>
              <strong>We do not sell your data.</strong> Ever.
            </li>
          </ul>

          <h2>1. Data Handled by the Halfhand Software</h2>
          <p>
            When you run Halfhand to record and replay AI agent sessions, the
            tool captures information such as prompts, model responses, tool
            calls, Model Context Protocol (MCP) traffic, file modifications, and
            execution history. This data:
          </p>
          <ul>
            <li>is written to storage on your local machine or wherever you configure it;</li>
            <li>
              is never sent to Halfhand or any third party as part of the
              tool&apos;s normal operation;
            </li>
            <li>remains entirely under your control, to keep, export, or delete as you choose.</li>
          </ul>
          <p>
            Because the recordings you generate may contain sensitive material
            (source code, credentials passed to agents, personal data in
            prompts, and similar), you are responsible for securing and handling
            that data appropriately, including before you share any recording
            with others.
          </p>

          <h2>2. Information Collected Through the Website</h2>
          <p>
            The halfhand.org website is a static site. We do not require you to
            create an account, and we do not use tracking or advertising
            cookies. Depending on how the site is hosted and served, our hosting
            and content-delivery providers may automatically process limited
            technical information — such as your IP address, browser type, and
            the pages you request — in server logs for the purpose of delivering
            the site securely and reliably. We do not use this information to
            build profiles about you.
          </p>

          <h2>3. How We Use Information</h2>
          <p>Any limited information described above is used only to:</p>
          <ul>
            <li>serve and secure the website;</li>
            <li>diagnose technical problems and protect against abuse;</li>
            <li>understand aggregate, non-identifying traffic trends.</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            The website may rely on third-party infrastructure providers (for
            example, a static-hosting or content-delivery provider) to serve
            content. Links to external sites such as our source code repository
            on GitHub or our profile on X are provided for convenience; once you
            follow such a link, the privacy practices of those services apply,
            and we encourage you to review them.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We do not maintain a database of personal information collected
            through the website. Any server logs generated by our hosting
            providers are retained only for as long as those providers keep them
            for operational and security purposes. Data recorded by the Halfhand
            software is retained by you, on your own systems, for as long as you
            choose.
          </p>

          <h2>6. Security</h2>
          <p>
            We take reasonable measures to keep the website secure. However, no
            method of transmission or storage is completely secure. Because your
            Halfhand recordings live on your infrastructure, their security is
            governed by the controls you put in place on your own systems.
          </p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            Halfhand is a developer tool intended for professional and technical
            use. It is not directed to children, and we do not knowingly collect
            personal information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the &ldquo;Last updated&rdquo; date at the top of this
            page. Material changes will be reflected here, and your continued use
            of the website or software after an update constitutes acceptance of
            the revised policy.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out
            through our{' '}
            <a
              href="https://github.com/halfhandorg/halfhand"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </article>
      <Footer />
    </div>
  )
}
