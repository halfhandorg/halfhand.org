import { Terminal } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section id="install" className="py-20 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Stop guessing why your agents failed.
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Replay every action. Inspect every decision. Built for the engineers
          shipping AI systems.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <a
            href="https://halfhand.org/install.sh"
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors",
              "hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Install Halfhand
          </a>

          <div className="w-full max-w-lg">
            <Terminal
              title="bash"
              command="$ curl -fsSL https://halfhand.org/install.sh | sh"
              lines={[]}
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          macOS &middot; Linux &middot; No Rust required &middot;{" "}
          <a
            href="https://halfhand.org/install"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Other install methods
          </a>
        </p>
      </div>
    </section>
  );
}
