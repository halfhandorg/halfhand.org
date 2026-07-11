import type { Metadata } from 'next'
import { Footer } from '../sections/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — Halfhand',
  description:
    'The terms that govern use of the halfhand.org website and the Halfhand software, which is released under the Apache-2.0 license.',
  alternates: {
    canonical: 'https://halfhand.org/terms/',
  },
}

const LAST_UPDATED = 'July 11, 2026'

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-border/40 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of the halfhand.org website (the &ldquo;Website&rdquo;) and
            the Halfhand software (the &ldquo;Software&rdquo;). By using the
            Website or the Software, you agree to these Terms. If you do not
            agree, please do not use the Website or the Software.
          </p>

          <h2>1. The Software License</h2>
          <p>
            The Halfhand Software is open source and released under the{' '}
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apache License, Version 2.0
            </a>{' '}
            (the &ldquo;License&rdquo;). Your rights to use, copy, modify, and
            distribute the Software are granted by, and subject to, that License.
            In the event of any conflict between these Terms and the License with
            respect to the Software itself, the License controls. A copy of the
            License is included in the Software&apos;s source repository.
          </p>

          <h2>2. Use of the Website</h2>
          <p>
            The Website is provided for informational purposes — to document the
            Software, share updates, and point you to the source code. You agree
            to use the Website only for lawful purposes and not to:
          </p>
          <ul>
            <li>attempt to disrupt, damage, or gain unauthorized access to the Website or its underlying systems;</li>
            <li>use automated means to overload or interfere with the Website;</li>
            <li>misrepresent your affiliation with Halfhand or its maintainers.</li>
          </ul>

          <h2>3. Your Data and Recordings</h2>
          <p>
            Halfhand is local-first. Any data you record, replay, or store using
            the Software — including prompts, tool calls, and execution
            history — remains on your own systems and under your control. You are
            solely responsible for that data, for complying with all laws and
            agreements that apply to it, and for obtaining any consents needed
            before recording, storing, or sharing it.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            Except for the Software (which is governed by the License) and any
            third-party materials, the content, design, and trademarks on the
            Website are the property of Halfhand or its maintainers. The
            &ldquo;Halfhand&rdquo; name and logo may not be used in a way that
            suggests endorsement or affiliation without permission, except as
            permitted by applicable trademark law.
          </p>

          <h2>5. Third-Party Links and Services</h2>
          <p>
            The Website may contain links to third-party websites and services,
            such as GitHub and X. We do not control and are not responsible for
            the content, policies, or practices of any third-party services.
            Accessing them is at your own risk and subject to their terms.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Website and the Software are provided &ldquo;as is&rdquo; and
            &ldquo;as available,&rdquo; without warranties of any kind, whether
            express or implied, including but not limited to the implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Website or Software will
            be uninterrupted, error-free, or secure. Your use of the Software is
            further subject to the warranty disclaimer set out in the License.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, in no event shall Halfhand or
            its maintainers be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of data, profits, or
            goodwill, arising out of or related to your use of — or inability to
            use — the Website or the Software, even if advised of the possibility
            of such damages. The limitation of liability set out in the License
            also applies to the Software.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Halfhand and its maintainers
            from any claims, damages, liabilities, and expenses arising out of
            your use of the Website or the Software, or your violation of these
            Terms or of any law or third-party right.
          </p>

          <h2>9. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will
            revise the &ldquo;Last updated&rdquo; date above. Your continued use
            of the Website or the Software after an update constitutes acceptance
            of the revised Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have questions about these Terms, please reach out through our{' '}
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
