import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { pagesConfig } from "@/config/pages";
import { Projects } from "@/config/projects";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

export default function ProjectsPage() {
  const sortedProjects = [...Projects].sort(
    (a, b) => a.priority - b.priority,
  );

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <section className="rounded-2xl border border-zinc-200 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-6">
        <HoverEffectGrid className="mx-auto my-2 w-full max-w-7xl py-2">
          {sortedProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </HoverEffectGrid>
      </section>
    </PageContainer>
  );
}
