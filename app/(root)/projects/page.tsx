import { type Metadata } from "next";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import EditorialProjectsShowcase from "@/components/projects/editorial-projects-showcase";
import { getCaseStudyData } from "@/config/case-study-data";
import { featuredProjects, rankedProjects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Projects | Selected Work & Systems",
  description: "A collection of quantitative finance platforms, AI suites, distributed systems, and developer tooling.",
};

export default function ProjectsPage() {
  const [primary, ...secondary] = featuredProjects;
  const primaryOutcomes = getCaseStudyData(primary.id)?.outcomes.slice(0, 2) ?? [];
  const remaining = rankedProjects.slice(featuredProjects.length);

  return (
    <ClientPageWrapper>
      <main className="retro-surface site-gutter relative min-h-screen overflow-hidden bg-[#12070d] pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_55%_38%_at_52%_0%,rgba(242,92,42,0.15),transparent_72%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(242,92,42,0.17)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_36%)]" />
        <div className="relative mx-auto max-w-[1400px]">
          <header className="max-w-3xl pb-14 sm:pb-20">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Engineering / selected projects</p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold uppercase tracking-[-0.06em] text-text sm:text-6xl lg:text-7xl">Selected Work.</h1>
            <p className="mt-4 text-lg leading-relaxed text-text-muted sm:text-xl">Real products. Complex problems. Built to ship.</p>
          </header>
          <EditorialProjectsShowcase
            primary={primary}
            primaryOutcomes={primaryOutcomes}
            secondary={secondary}
            remaining={remaining}
          />
        </div>
      </main>
    </ClientPageWrapper>
  );
}
