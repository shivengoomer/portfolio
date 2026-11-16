"use client";

import { ProjectInterface } from "@/config/projects";
import {
  getCaseStudyData,
  deriveFallbackCaseStudy,
} from "@/config/case-study-data";

import CaseStudyNavigation from "./case-study/case-study-nav";
import ProjectHero from "./case-study/project-hero";
import FeatureBentoGrid from "./case-study/feature-bento-grid";
import InteractiveArchitecture from "./case-study/interactive-architecture";
import ProductShowcase from "./case-study/product-showcase";
import EngineeringDecisions from "./case-study/engineering-decisions";
import OutcomeMetrics from "./case-study/outcome-metrics";
import NextProjectNavigation from "./case-study/next-project-nav";

interface ShowcaseItem {
  title: string;
  description?: string;
  validImages: string[];
}

interface ProjectDetailViewProps {
  project: ProjectInterface;
  showcaseItems: ShowcaseItem[];
  prevProject: ProjectInterface | null;
  nextProject: ProjectInterface | null;
}

export default function ProjectDetailView({
  project,
  showcaseItems,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  // Get curated case study data, or derive a minimal fallback
  const caseStudy =
    getCaseStudyData(project.id) ||
    deriveFallbackCaseStudy({
      id: project.id,
      companyName: project.companyName,
      shortDescription: project.shortDescription,
      techStack: project.techStack,
      pagesInfoArr: project.pagesInfoArr,
    });

  return (
    <div className="relative min-h-screen">
      {/* Sticky sidebar nav (desktop) + horizontal pill nav (mobile) */}
      <CaseStudyNavigation />

      {/* Main content — offset for desktop sidebar */}
      <main className="pb-16 lg:pb-0 lg:pl-52 xl:pl-56">
        {/* 1. Cinematic hero */}
        <ProjectHero
          project={project}
          caseStudy={caseStudy}
          prevProject={prevProject}
          nextProject={nextProject}
        />

        {/* Thin accent divider */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </div>

        {/* 2. Features bento grid */}
        <FeatureBentoGrid features={caseStudy.features} />

        {/* 3. Architecture diagram */}
        <InteractiveArchitecture
          nodes={caseStudy.architecture.nodes}
          edges={caseStudy.architecture.edges}
        />

        {/* 4. Product screenshots */}
        <ProductShowcase items={showcaseItems} />

        {/* 5. Engineering decisions */}
        <EngineeringDecisions decisions={caseStudy.engineeringDecisions} />

        {/* 6. Outcomes */}
        <OutcomeMetrics outcomes={caseStudy.outcomes} />

        {/* 7. Next project navigation */}
        <NextProjectNavigation
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </main>
    </div>
  );
}
