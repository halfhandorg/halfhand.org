import { cn } from "@/lib/utils";

const footerLinks = {
  Product: [
    { label: "Documentation", href: "https://docs.halfhand.org", external: true },
    { label: "CLI Reference", href: "https://docs.rs/halfhand/1.0.0/halfhand/cli/struct.Cli.html", external: true },
    { label: "Configuration", href: "https://github.com/halfhandorg/halfhand/blob/main/docs/stats.md", external: true },
  ],
  Resources: [
    { label: "Changelog", href: "https://github.com/halfhandorg/halfhand/blob/main/CHANGELOG.md", external: true },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy/", external: false },
    { label: "Terms", href: "/terms/", external: false },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                hh
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Halfhand
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Local-first observability for AI agents. Replay every action,
              inspect every decision.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
                {category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Halfhand. Released under
            Apache-2.0 license.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/halfhandorg/halfhand"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/halfhandorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/halfhandorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
