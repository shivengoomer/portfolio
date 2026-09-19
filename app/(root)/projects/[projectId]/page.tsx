import { Metadata } from "next";
import { redirect } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import ProjectDetailView from "@/components/projects/project-detail-view";
import { Projects } from "@/config/projects";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

function getExistingImagePaths(imagePaths: string[]) {
  return imagePaths.filter((imagePath) => {
    if (!imagePath.startsWith("/")) return false;
    return existsSync(join(process.cwd(), "public", imagePath));
  });
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = Projects.find((val) => val.id === params.projectId);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const isDtox = project.id === "wpbot-news";
  const title = isDtox
    ? "D-TOX: AI Security Assistant (Hackathon Winner)"
    : project.companyName;

  return {
    title: `${title} | Engineering Case Study`,
    description: project.shortDescription,
    keywords: [
      project.companyName,
      ...project.category,
      ...project.techStack,
      "Case Study",
      "Software Architecture",
      "Full Stack Development",
    ],
  };
}

export default function Project({ params }: ProjectPageProps) {
  const sortedProjects = [...Projects].sort((a, b) => a.priority - b.priority);
  const currentIndex = sortedProjects.findIndex((p) => p.id === params.projectId);

  if (currentIndex === -1) {
    redirect("/projects");
  }

  const project = sortedProjects[currentIndex];
  const prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : null;

  const showcaseItems = project.pagesInfoArr
    .map((page) => ({
      ...page,
      validImages: getExistingImagePaths(page.imgArr),
    }))
    .filter((page) => page.title.trim().length > 0);

  return (
    <ClientPageWrapper>
      <ProjectDetailView
        project={project}
        showcaseItems={showcaseItems}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </ClientPageWrapper>
  );
}
