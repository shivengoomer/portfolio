import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { pagesConfig } from "@/config/pages";
import { Projects } from "@/config/projects";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

const renderContent = (tabVal: string) => {
  let projectArr = Projects;
  if (tabVal === "personal") {
    projectArr = projectArr.filter((val) => val.type === "Personal");
  } else if (tabVal === "professional") {
    projectArr = projectArr.filter((val) => val.type === "Professional");
  }

  return (
    <HoverEffectGrid className="mx-auto my-2 w-full max-w-7xl py-2">
      {projectArr.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </HoverEffectGrid>
  );
};

export default function ProjectsPage() {
  const tabItems = [
    {
      value: "all",
      label: "All",
      content: renderContent("all"),
    },
    {
      value: "personal",
      label: "Personal",
      content: renderContent("personal"),
    },
    {
      value: "professional",
      label: "Professional",
      content: renderContent("professional"),
    },
  ];

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <section className="rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
        <ResponsiveTabs items={tabItems} defaultValue="all" />
      </section>
    </PageContainer>
  );
}
