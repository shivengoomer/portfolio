import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isHackathonWinner = project.companyName.toLowerCase().includes("winner") || project.shortDescription.toLowerCase().includes("winner");

  return (
    <CardContainer className="inter-var w-full h-full">
      <Link href={`/projects/${project.id}`} className="block w-full h-full hover:no-underline">
        <CardBody className="relative group/card bg-white/5 dark:bg-neutral-900/40 backdrop-blur-md dark:hover:shadow-2xl dark:hover:shadow-primary/[0.2] border-white/10 hover:border-primary/50 w-full h-full rounded-2xl p-6 border transition-all duration-300 flex flex-col cursor-pointer overflow-hidden">
          
          {/* subtle inside glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {isHackathonWinner && (
             <GlowingEffect glowClassName="opacity-100 blur-sm from-yellow-300 via-yellow-500 to-amber-600" />
          )}

          <CardItem translateZ="100" className="w-full h-[220px] mt-2 relative z-10">
             <Image
                src={project.companyLogoImg}
                className="rounded-xl object-contain bg-white dark:bg-black/80 p-2 border border-white/5 shadow-inner"
                alt={project.companyName}
                fill
             />
          </CardItem>

          <CardItem translateZ="60" className="text-2xl font-heading font-bold text-neutral-800 dark:text-neutral-100 mt-8 z-10 tracking-tight">
             {project.companyName}
          </CardItem>

          <CardItem translateZ="50" className="text-neutral-600 text-sm mt-3 dark:text-neutral-400 line-clamp-3 leading-relaxed z-10 flex-grow">
             {project.shortDescription}
          </CardItem>

          <CardItem translateZ="40" className="flex gap-2 flex-wrap mt-6 z-10">
            <ChipContainer textArr={project.category} />
          </CardItem>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5 z-10">
            <CardItem translateZ={20} className="flex items-center text-sm font-semibold text-primary transition-all group-hover/card:translate-x-1">
              Read more <Icons.chevronRight className="w-4 h-4 ml-1" />
            </CardItem>
            <CardItem translateZ={20} className="p-2.5 rounded-full bg-black/20 border border-white/10 text-neutral-300 backdrop-blur-md group-hover/card:bg-primary group-hover/card:text-white transition-colors">
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
