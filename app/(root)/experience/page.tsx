import { type Metadata } from "next";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import Timeline from "@/components/experience/timeline";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and career milestones in software development.`,
  alternates: { canonical: `${siteConfig.url}/experience` },
};

export default function ExperiencePage() {
  return <ClientPageWrapper><main className="retro-surface site-gutter relative min-h-screen overflow-hidden bg-[#12070d] pb-20 pt-28 sm:pt-32">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_52%_40%_at_50%_0%,rgba(242,92,42,0.15),transparent_72%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(242,92,42,0.17)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_35%)]" />
    <div className="relative mx-auto max-w-[1400px]">
      <header className="max-w-3xl pb-14 sm:pb-20"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Career / selected chapters</p><h1 className="mt-4 font-heading text-5xl font-extrabold uppercase tracking-[-0.06em] text-text sm:text-6xl lg:text-7xl">Experience.</h1><p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">Engineering work shaped by hard problems, useful systems, and the people who use them.</p></header>
      <Timeline experiences={experiences} />
    </div>
  </main></ClientPageWrapper>;
}
