import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isHackathonWinner =
    project.companyName.toLowerCase().includes("winner") ||
    project.shortDescription.toLowerCase().includes("winner");

  return (
    <CardContainer className="inter-var w-full h-full">
      <Link href={`/projects/${project.id}`} className="block w-full h-full hover:no-underline">
        <CardBody className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 p-6 backdrop-blur-md transition-all duration-300 group/card dark:border-white/10 dark:bg-white/[0.04] dark:hover:shadow-2xl dark:hover:shadow-primary/[0.14]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-slate-100/80 opacity-80 dark:from-white/[0.06] dark:to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          {isHackathonWinner && (
            <GlowingEffect glowClassName="from-yellow-300 via-yellow-500 to-amber-600 opacity-100 blur-sm" />
          )}

          <CardItem translateZ="80" className="relative z-10 mt-2 h-[220px] w-full overflow-hidden rounded-[1.35rem] border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,244,245,0.88))] p-4 shadow-inner dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(10,10,12,0.96))]">
            <Image
              src={project.companyLogoImg}
              className="rounded-xl object-contain"
              alt={project.companyName}
              fill
            />
          </CardItem>

          <CardItem className="relative z-10 mt-6 flex items-center justify-between gap-3" translateZ="40">
            <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400">
              {project.type}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {project.techStack.slice(0, 2).join(" • ")}
            </span>
          </CardItem>

          <CardItem translateZ="60" className="z-10 mt-5 text-2xl font-heading font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {project.companyName}
          </CardItem>

          <CardItem translateZ="50" className="z-10 mt-3 flex-grow text-sm leading-7 text-neutral-600 line-clamp-3 dark:text-neutral-300">
            {project.shortDescription}
          </CardItem>

          <CardItem translateZ="35" className="z-10 mt-6 flex flex-wrap gap-2">
            <ChipContainer textArr={project.category} />
          </CardItem>

          <div className="z-10 mt-6 flex items-center justify-between border-t border-black/5 pt-6 dark:border-white/10">
            <CardItem translateZ={20} className="flex items-center text-sm font-semibold text-primary transition-all group-hover/card:translate-x-1">
              Read more <Icons.chevronRight className="w-4 h-4 ml-1" />
            </CardItem>
            <CardItem translateZ={20} className="rounded-full border border-black/10 bg-white/80 p-2.5 text-neutral-500 transition-colors group-hover/card:bg-primary group-hover/card:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
              {project.type === "Personal" ? (
                <Icons.userFill className="h-4 w-4" />
              ) : (
                <Icons.work className="h-4 w-4" />
              )}
            </CardItem>
          </div>
        </CardBody>
      </Link>
    </CardContainer>
  );
}
