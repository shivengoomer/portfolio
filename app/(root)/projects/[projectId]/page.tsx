import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { IconLayoutKanban, IconTerminal2 } from "@tabler/icons-react";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
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
    if (!imagePath.startsWith("/")) {
      return false;
    }

    return existsSync(join(process.cwd(), "public", imagePath));
  });
}

function ShowcaseMediaCard({
  title,
  images,
  className,
}: {
  title: string;
  images: string[];
  className?: string;
}) {
  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[240px] items-center justify-center rounded-[1.25rem] border border-dashed border-black/15 bg-neutral-50 px-6 text-center text-sm leading-6 text-neutral-500 dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-400",
          className,
        )}
      >
        Product visuals for this workflow are being prepared.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,244,245,0.94))] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(10,10,12,0.98))]",
        className,
      )}
    >
      <div className="grid gap-3">
        {images.map((imagePath, imageIndex) => (
          <div
            key={`${imagePath}-${imageIndex}`}
            className="overflow-hidden rounded-[1rem] border border-black/5 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900"
          >
            <Image
              src={imagePath}
              width={1400}
              height={900}
              className="h-auto w-full object-cover"
              alt={`${title} screen ${imageIndex + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseDetailsCard({
  item,
  index,
}: {
  item: ShowcaseItem;
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
          Screen {index + 1}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          {item.title}
        </h3>
        {item.description ? (
          <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            {item.description}
          </p>
        ) : null}
      </div>

      <ShowcaseMediaCard title={item.title} images={item.validImages} />
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
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-white"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>

        <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-start">
            <div className="space-y-5">
              <time
                dateTime={project.startDate.toISOString()}
                className="inline-flex items-center rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400"
              >
                {formatDateFromObj(project.startDate)}
              </time>
              <div className="space-y-4">
                <h1 className="font-heading text-4xl tracking-[-0.05em] text-neutral-950 dark:text-white sm:text-5xl lg:text-6xl">
                  {project.companyName}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
                  {project.shortDescription}
                </p>
              </div>
              <ChipContainer textArr={project.category} />
            </div>

            <div className="space-y-4">
              <div className="flex h-[180px] items-center justify-center rounded-[1.5rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,244,245,0.94))] p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(10,10,12,0.98))]">
                <div className="relative h-full w-full max-w-[180px]">
                  <Image
                    src={project.companyLogoImg}
                    alt={project.companyName}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-[1.25rem] border border-black/10 bg-white/80 px-4 py-3 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                >
                  <Image
                    src={profileImg}
                    alt="Shiven Goomer"
                    width={40}
                    height={40}
                    className="rounded-full border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900"
                  />
                  <div className="hidden text-left sm:block">
                    <span className="block text-sm font-semibold text-neutral-900 dark:text-white">
                      Shiven Goomer
                    </span>
                    <span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-400">
                      @{siteConfig.username}
                    </span>
                  </div>
                </Link>

                {project.githubLink ? (
                  <CustomTooltip text="Source Code">
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="rounded-full border border-black/10 bg-white/80 p-3 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                    >
                      <Icons.gitHub className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                    </Link>
                  </CustomTooltip>
                ) : null}

                {project.websiteLink ? (
                  <CustomTooltip text="Live Site">
                    <Link
                      href={project.websiteLink}
                      target="_blank"
                      className="rounded-full border border-black/10 bg-white/80 p-3 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                    >
                      <Icons.externalLink className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                    </Link>
                  </CustomTooltip>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
              <IconTerminal2 className="h-5 w-5 text-primary" />
              Tech Stack
            </h2>
            <ChipContainer textArr={project.techStack} />
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
              <IconLayoutKanban className="h-5 w-5 text-primary" />
              Overview
            </h2>
            <ProjectDescription
              paragraphs={project.descriptionDetails.paragraphs}
              bullets={project.descriptionDetails.bullets}
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              Showcase
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-neutral-950 dark:text-white">
              Product screens and key workflows
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              A responsive walkthrough of the main product surfaces, interaction
              states, and workflow highlights for this project.
            </p>
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

              <div className="hidden overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 md:block">
                <StickyScroll
                  content={showcaseItems.map((page) => ({
                    title: page.title,
                    description: page.description || "",
                    content: (
                      <ShowcaseMediaCard
                        title={page.title}
                        images={page.validImages}
                        className="h-full w-full"
                      />
                    ),
                  }))}
                />
              </div>
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/70 px-6 py-12 text-center text-sm leading-7 text-neutral-500 shadow-[0_20px_60px_rgba(15,23,42,0.04)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400">
              This project does not have workflow screenshots yet.
            </div>
          )}
        </section>

        <div className="flex justify-center pt-2">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5",
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
