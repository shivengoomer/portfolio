"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/projects";

const BorderGlow = dynamic(() => import("@/components/BorderGlow"), {
  ssr: false,
  loading: () => <div className="aspect-square animate-pulse rounded-[20px] bg-zinc-800" />,
});

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full w-full hover:no-underline"
    >
      <BorderGlow
        backgroundColor="hsl(var(--card))"
        borderRadius={16}
        glowIntensity={0.5}
        colors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
        className="h-full"
      >
        <article className="flex h-full w-full cursor-pointer flex-col p-4 sm:p-5">
          {/* Image Container */}
          <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xl border border-zinc-100 bg-gradient-to-b from-white to-zinc-50 p-3 sm:p-4 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
            <Image
              src={project.companyLogoImg}
              className="rounded-lg object-contain"
              alt={project.companyName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Title */}
          <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.companyName}
          </h3>

          {/* Description */}
          <p className="mt-1 sm:mt-1.5 flex-grow text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600 line-clamp-2 dark:text-zinc-300">
            {project.shortDescription}
          </p>

          {/* Tech stack */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
            <span className="flex items-center text-xs sm:text-sm font-semibold text-zinc-900 transition-all group-hover:translate-x-1 dark:text-zinc-100">
              Read more <Icons.chevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </span>
            <div className="flex gap-2">
              {project.githubLink && (
                <span className="text-zinc-400 dark:text-zinc-500">
                  <Icons.gitHub className="h-4 w-4" />
                </span>
              )}
              {project.websiteLink && (
                <span className="text-zinc-400 dark:text-zinc-500">
                  <Icons.externalLink className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </article>
      </BorderGlow>
    </Link>
  );
}
