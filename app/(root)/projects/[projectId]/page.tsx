import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { IconLayoutKanban } from "@tabler/icons-react";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import ProjectStepper from "@/components/projects/project-stepper";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

interface ShowcaseItem {
  title: string;
  description?: string;
  validImages: string[];
}

function getExistingImagePaths(imagePaths: string[]) {
  return imagePaths.filter((imagePath) => {
    if (!imagePath.startsWith("/")) return false;
    return existsSync(join(process.cwd(), "public", imagePath));
  });
}

function ShowcaseDetailsCard({
  item,
  index,
}: {
  item: ShowcaseItem;
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mb-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Screen {index + 1}
        </p>
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {item.description}
          </p>
        )}
      </div>
      {item.validImages.map((img, imgIdx) => (
        <div
          key={`${img}-${imgIdx}`}
          className="overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <Image
            src={img}
            width={800}
            height={500}
            className="h-auto w-full object-cover"
            alt={`${item.title} screen ${imgIdx + 1}`}
          />
        </div>
      ))}
    </article>
  );
}

export default function Project({ params }: ProjectPageProps) {
  const project = Projects.find((val) => val.id === params.projectId);

  if (!project) {
    redirect("/projects");
  }

  const showcaseItems = project.pagesInfoArr
    .map((page) => ({
      ...page,
      validImages: getExistingImagePaths(page.imgArr),
    }))
    .filter((page) => page.title.trim().length > 0);

  const hasShowcase = showcaseItems.length > 0;

  return (
    <article className="px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Back nav */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-500 backdrop-blur transition-all hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          <Icons.chevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </Link>

        {/* ── HERO HEADER ── */}
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          {/* Top gradient accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

          <div className="p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
              {/* Left — project info */}
              <div className="space-y-5">
                <time
                  dateTime={project.startDate.toISOString()}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {formatDateFromObj(project.startDate)}
                </time>

                <div className="space-y-3">
                  <h1 className="font-heading text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    {project.companyName}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Category + tech stack inline */}
                <div className="flex flex-wrap gap-1.5">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      {cat}
                    </span>
                  ))}
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "h-9 gap-2 rounded-full border-zinc-200 px-4 text-sm dark:border-zinc-700",
                      )}
                    >
                      <Icons.gitHub className="h-4 w-4" />
                      Source Code
                    </Link>
                  )}
                  {project.websiteLink && (
                    <Link
                      href={project.websiteLink}
                      target="_blank"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "h-9 gap-2 rounded-full px-4 text-sm",
                      )}
                    >
                      <Icons.externalLink className="h-4 w-4" />
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>

              {/* Right — logo */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
                  <div className="relative h-full w-full">
                    <Image
                      src={project.companyLogoImg}
                      alt={project.companyName}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
                >
                  <Image
                    src={profileImg}
                    alt="Shiven Goomer"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Shiven Goomer
                    </span>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                      @{siteConfig.username}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW (left) | PRODUCT SCREENS (right) ── */}
        <section className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          {/* Overview */}
          <div className="space-y-1">
            <div className="rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <IconLayoutKanban className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Overview
                </h2>
              </div>
              <ProjectDescription
                paragraphs={project.descriptionDetails.paragraphs}
                bullets={project.descriptionDetails.bullets}
              />
            </div>
          </div>

          {/* Product Screens */}
          <div className="rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Product Screens
              </h2>
              {hasShowcase && (
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {showcaseItems.length} screens
                </span>
              )}
            </div>
            {hasShowcase ? (
              <>
                <div className="grid gap-4 md:hidden">
                  {showcaseItems.map((page, index) => (
                    <ShowcaseDetailsCard
                      key={`${page.title}-${index}`}
                      item={page}
                      index={index}
                    />
                  ))}
                </div>
                <div className="hidden md:block">
                  <ProjectStepper items={showcaseItems} />
                </div>
              </>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 text-center dark:border-zinc-700 dark:bg-zinc-800/30">
                <div>
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icons.image className="h-5 w-5 text-zinc-400" />
                  </div>
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">
                    Screenshots coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Back to all */}
        <div className="flex justify-center pt-2">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-zinc-200 bg-white/80 dark:border-zinc-700 dark:bg-zinc-800/80",
            )}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            All Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
