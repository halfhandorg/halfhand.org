import { cn } from "@/lib/utils";
import { Terminal } from "@/components/ui/terminal";

const steps = [
  {
    number: "01",
    title: "Record",
    description: "Wrap any agent execution with a single command.",
    code: (
      <Terminal
        title="bash"
        command="$ hh run claude-code"
        lines={[
          "",
          "Recording session...",
          "Agent: claude-code",
          "Session: a1b2c3",
          "",
          "All tool calls, MCP traffic, and file changes will be captured.",
        ]}
      />
    ),
  },
  {
    number: "02",
    title: "Replay",
    description: "Navigate execution timelines step-by-step.",
    code: (
      <Terminal
        title="bash"
        command="$ hh replay a1b2c3"
        lines={[
          "",
          "Replaying session a1b2c3",
          "",
          "Controls:",
          "  [n]ext     — advance one step",
          "  [p]revious — go back one step",
          "  [j]ump     — jump to timestamp",
          "  [q]uit     — exit replay",
        ]}
      />
    ),
  },
  {
    number: "03",
    title: "Understand",
    description: "Inspect every detail of agent behavior.",
    code: (
      <Terminal
        title="bash"
        command="$ hh inspect a1b2c3 --step 7"
        lines={[
          "",
          "Step 7: TOOL Write src/main.rs",
          "",
          "--- src/main.rs",
          "+++ src/main.rs",
          "@@ -1,3 +1,4 @@",
          " fn main() {",
          '+    println!("Hello, Halfhand!");',
          " }",
        ]}
      />
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-24 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How Halfhand Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps to full agent observability.
          </p>
        </div>

        {/* Horizontal timeline visualization */}
        <div className="relative mb-16 hidden lg:block">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold z-10">
                  {step.number}
                </div>
                <span className="mt-3 text-sm font-medium text-foreground">
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-10 w-[calc(100%+4rem)] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
          {/* Connector line hack — simpler to just use flex gaps */}
        </div>

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "grid gap-8 items-center",
                "lg:grid-cols-2",
              )}
            >
              <div className={cn("max-w-xl", index % 2 === 1 && "lg:order-2")}>
                <span className="inline-block mb-3 text-sm font-mono font-bold text-muted-foreground">
                  Step {step.number}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {step.number === "01" && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Wraps any CLI agent transparently
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Zero configuration required
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Captures full execution context
                      </li>
                    </>
                  )}
                  {step.number === "02" && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Chronological step navigation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Jump to any timestamp
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Keyboard-driven interface
                      </li>
                    </>
                  )}
                  {step.number === "03" && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Prompt history with full context
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Tool outputs and MCP traffic
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        Unified diff for file changes
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="max-w-lg">{step.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
