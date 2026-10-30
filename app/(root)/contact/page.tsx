import { Metadata } from "next";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { ReachOutConsole } from "@/components/contact/reach-out-console";

export const metadata: Metadata = {
  title: "Reach Out | Shiven Goomer",
  description:
    "Direct line, verified channels, and dispatch console to connect with Shiven Goomer for full-time engineering roles, technical advisory, and high-impact systems.",
};

export default function ContactPage() {
  return (
    <ClientPageWrapper>
      <div className="relative min-h-screen overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:px-8">
        {/* Ambient Top Glow & Technical Micro-Grid Backdrop */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(232,80,31,0.12),rgba(57,211,83,0.08),transparent_80%)] blur-3xl dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(242,92,42,0.16),rgba(57,211,83,0.1),transparent_80%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl space-y-10 sm:space-y-12">
          {/* Editorial Section Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-text-muted shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span>DIRECT DISPATCH · LATENCY &lt; 12H · UTC+5:30</span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
                  Direct Line &amp; Reach Out
                </h1>
                <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-text-muted">
                  The fastest route to reach me for full-time engineering roles, technical advisory,
                  quantitative architectures, or exploring new systems together.
                </p>
              </div>

              {/* Quick telemetry badges */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface/60 px-2.5 py-1 text-text-muted backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Available Q2/Q3 2026</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface/60 px-2.5 py-1 text-text-muted backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span>Zero Bureaucracy</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Reach Out Console */}
          <ReachOutConsole />
        </div>
      </div>
    </ClientPageWrapper>
  );
}
