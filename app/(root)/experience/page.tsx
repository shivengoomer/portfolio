import { Metadata } from "next";
import Link from "next/link";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import Timeline from "@/components/experience/timeline";
import { buttonVariants } from "@/components/ui/button";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and career milestones in software development.`,
  keywords: [
    "experience timeline",
    "professional experience",
    "software developer experience",
    "developer portfolio",
    "work experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

export default function ExperiencePage() {
  const totalAchievements = experiences.reduce(
    (count, experience) => count + experience.achievements.length,
    0,
  );
  const activeRoles = experiences.filter(
    (experience) => experience.endDate === "Present",
  ).length;

  const stats = [
    {
      label: "Roles",
      value: experiences.length.toString().padStart(2, "0"),
    },
    {
      label: "Active",
      value: activeRoles.toString().padStart(2, "0"),
    },
    {
      label: "Outcomes",
      value: totalAchievements.toString().padStart(2, "0"),
    },
  ];

  return (
    <ClientPageWrapper>
      <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-24">
        {/* Ambient Top Glow & Technical Micro-Grid Backdrop */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.12),rgba(168,85,247,0.08),transparent_80%)] blur-3xl dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.18),rgba(168,85,247,0.12),transparent_80%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl space-y-6 sm:space-y-10">
          {/* ── HEADER CARD ── */}
          <section
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85 sm:p-8 lg:p-10"
            aria-labelledby="experience-title"
          >
            <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400 sm:mb-4 sm:text-xs">
                  Portfolio Section
                </p>
                <h1
                  id="experience-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl"
                >
                  Experience
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:mt-5 sm:text-base sm:leading-8">
                  {pagesConfig.experience.description} Roles, internships, and
                  community work where product execution met full-stack
                  engineering.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/60 sm:rounded-2xl">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-r border-zinc-200 px-3 py-3 last:border-r-0 dark:border-zinc-800 sm:min-w-24 sm:px-4 sm:py-4"
                  >
                    <p className="font-heading text-xl font-semibold text-zinc-950 dark:text-zinc-100 sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 sm:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── BODY: sidebar hidden on mobile, timeline full-width ── */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[17rem_1fr] lg:items-start">
            {/* Sidebar — desktop only */}
            <aside className="hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 text-white shadow-sm lg:sticky lg:top-24 lg:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Icons.work className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Career Timeline</p>
                  <p className="mt-0.5 text-xs text-white/45">
                    Latest roles first
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm leading-7 text-white/55">
                <p>
                  Focused on production-ready interfaces, backend APIs,
                  automation, and developer tooling.
                </p>
                <p>
                  Each entry expands into a full detail page with outcomes and
                  tools used.
                </p>
              </div>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "mt-6 rounded-full bg-white text-zinc-950 hover:bg-zinc-100",
                )}
              >
                Get in touch
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </aside>

            {/* Mobile: tiny inline sidebar strip */}
            <div className="flex items-center justify-between rounded-xl border border-zinc-200/60 bg-zinc-50/60 px-4 py-2.5 text-xs text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-950/40 lg:hidden">
              <span className="font-medium">Career Timeline · Latest first</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
              >
                Get in touch <Icons.arrowRight className="h-3 w-3" />
              </Link>
            </div>

            <Timeline experiences={experiences} />
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
}
