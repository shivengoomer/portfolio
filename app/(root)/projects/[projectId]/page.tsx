import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import { IconTerminal2, IconLayoutKanban } from "@tabler/icons-react";
import ProjectDescription from "@/components/projects/project-description";
import { Button, buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const githubUsername = "shivengoomer";

export default function Project({ params }: ProjectPageProps) {
  let project = Projects.find((val) => val.id === params.projectId);
  if (!project) {
    redirect("/projects");
  }

  return (
    <article className="container relative max-w-5xl py-12 lg:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-10 group"
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to projects
      </Link>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <time
              dateTime={Date.now().toString()}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 tracking-wider uppercase"
            >
              {formatDateFromObj(project.startDate)}
            </time>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            {project.companyName}
          </h1>
          <ChipContainer textArr={project.category} />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Image
              src={profileImg}
              alt={"shivengoomer"}
              width={36}
              height={36}
              className="rounded-full bg-neutral-900 border border-white/10"
            />
            <div className="flex-col text-left hidden sm:flex">
              <span className="text-sm font-semibold text-white leading-none">{"Shiven Goomer"}</span>
              <span className="text-xs text-neutral-400 mt-1">@{siteConfig.username}</span>
            </div>
          </Link>

          {project.githubLink && (
            <CustomTooltip text="Source Code">
              <Link href={project.githubLink} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Icons.gitHub className="w-5 h-5 text-neutral-200" />
              </Link>
            </CustomTooltip>
          )}
          {project.websiteLink && (
            <CustomTooltip text="Live Site">
              <Link href={project.websiteLink} target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Icons.externalLink className="w-5 h-5 text-neutral-200" />
              </Link>
            </CustomTooltip>
          )}
        </div>
      </div>

      <div className="my-12 relative w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-2 lg:p-4 shadow-[0_0_40px_rgba(255,255,255,0.02)]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <Image
          src={project.companyLogoImg}
          alt={project.companyName}
          width={1200}
          height={675}
          className="rounded-2xl w-full object-contain bg-black/60 border border-white/5 shadow-inner"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-4 space-y-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white mb-4 flex items-center gap-2">
              <IconTerminal2 className="w-5 h-5 text-primary" /> Tech Stack
            </h2>
            <div className="pt-2">
               <ChipContainer textArr={project.techStack} />
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <h2 className="text-xl font-semibold tracking-tight text-white mb-4 flex items-center gap-2">
            <IconLayoutKanban className="w-5 h-5 text-primary" /> Overview
          </h2>
          <div className="text-neutral-400 prose prose-invert prose-lg max-w-none leading-relaxed">
            <ProjectDescription
              paragraphs={project.descriptionDetails.paragraphs}
              bullets={project.descriptionDetails.bullets}
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-heading font-extrabold tracking-tight text-white mb-8 flex items-center justify-center">
          Project Showcase
        </h2>
        <div className="w-full relative rounded-2xl overflow-hidden mt-4">
          <StickyScroll 
            content={project.pagesInfoArr.map((page) => ({
              title: page.title,
              description: page.description || "",
              content: (
                <div className="flex h-full w-full items-center justify-center text-white bg-neutral-900 border border-neutral-800 rounded-md">
                  {page.imgArr.length > 0 && (
                    <Image
                      src={page.imgArr[0]}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover rounded-lg shadow-2xl"
                      alt={page.title}
                    />
                  )}
                </div>
              )
            }))} 
          />
        </div>
      </div>

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
