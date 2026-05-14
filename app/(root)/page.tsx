import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ProjectCard from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { SocialLinks } from "@/config/socials";
import { featuredSkills } from "@/config/skills";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { cn, formatDateFromObj } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shiven Goomer",
  description: pagesConfig.home.metadata.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

function formatExperienceDate(endDate: Date | "Present", startDate: Date) {
  const start = formatDateFromObj(startDate);
  if (endDate === "Present") return `${start} - Present`;
  return `${start} - ${formatDateFromObj(endDate)}`;
}

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Full Stack Developer",
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
  };

  const highlightedExperience = experiences.slice(0, 2);

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="relative isolate">
        {/* ── HERO ── */}
        <section
          className="relative -mt-20 flex min-h-screen overflow-hidden bg-[url('/bg-portfolio.gif')] bg-cover bg-[62%_bottom] px-4 pb-20 pt-40 sm:px-6 lg:px-8"
          aria-label="Hero"
        >
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/95 to-transparent" />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Left — text */}
            <div className="max-w-2xl space-y-6 rounded-2xl border border-white/35 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/74 sm:p-8">
              <div className="space-y-4">
                <h1 className="relative font-heading text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
                  Shiven Goomer
                  <span className="ml-1 inline-block h-[1.1em] w-[3px] translate-y-[0.05em] animate-pulse bg-zinc-900 dark:bg-zinc-100" />
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  Full Stack Developer · B.Tech CSE
                </p>
                <p className="max-w-lg text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  I build things for the web — polished interfaces, scalable
                  APIs, and AI&#8209;powered tooling that feels simple to use.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-6 text-sm shadow-sm",
                  )}
                >
                  View Projects
                  <Icons.arrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/resume"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-full border-zinc-200 bg-white/80 px-6 text-sm text-zinc-700 backdrop-blur hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800/80",
                  )}
                >
                  Download CV
                </Link>
              </div>

              {/* Social row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {SocialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.link}
                      target={
                        link.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.link.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      aria-label={link.name}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3.5 py-2 text-sm text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS ── */}
        <section
          id="projects"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="featured-projects-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2
                  id="featured-projects-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  <span className="relative">
                    Featured Work
                    <span className="absolute -bottom-1 left-0 h-[3px] w-12 rounded-full bg-blue-500/60" />
                  </span>
                </h2>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  A curated look at projects spanning analytics, AI workflows,
                  full-stack apps, and interaction-heavy interfaces.
                </p>
              </div>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start rounded-full px-0 text-sm text-zinc-700 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                )}
              >
                Browse all work
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <HoverEffectGrid className="mx-auto mt-8 w-full max-w-7xl py-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </HoverEffectGrid>
          </div>
        </section>

        {/* ── ABOUT + EXPERIENCE — square symmetrical cards ── */}
        <section
          id="about"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="about-title"
        >
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {/* About card */}
            <article className="flex aspect-square flex-col justify-between rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <div>
                <h2
                  id="about-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 h-[3px] w-10 rounded-full bg-emerald-500/60" />
                  </span>
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
                  I enjoy the intersection of product thinking and engineering,
                  especially when a project needs both strong execution and a
                  calm, elegant interface. My work usually centers on React,
                  Next.js, Node.js, and AI-enabled developer tools.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>

            {/* Experience card */}
            <article className="flex aspect-square flex-col justify-between rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  <span className="relative">
                    Experience
                    <span className="absolute -bottom-1 left-0 h-[3px] w-10 rounded-full bg-amber-500/60" />
                  </span>
                </h2>
                <div className="mt-6 space-y-4">
                  {highlightedExperience.map((experience) => (
                    <div
                      key={experience.id}
                      className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            {experience.position}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {experience.company} · {experience.location}
                          </p>
                        </div>
                        <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {formatExperienceDate(
                            experience.endDate,
                            experience.startDate,
                          )}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 line-clamp-2 dark:text-zinc-300">
                        {experience.description[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/experience"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-4 rounded-full border-zinc-200 bg-white/80 dark:border-zinc-700 dark:bg-zinc-800/80",
                )}
              >
                View full experience
              </Link>
            </article>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="contact"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <h2
                  id="contact-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  <span className="relative">
                    Let&apos;s work together
                    <span className="absolute -bottom-1 left-0 h-[3px] w-12 rounded-full bg-rose-500/60" />
                  </span>
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
                  I&apos;m open to freelance work, internships, and roles where
                  I can help shape clean interfaces and robust full-stack
                  systems.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-6 text-sm",
                  )}
                >
                  Start a Conversation
                </Link>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-full border-zinc-200 bg-white/80 px-6 text-sm dark:border-zinc-700 dark:bg-zinc-800/80",
                  )}
                >
                  GitHub Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientPageWrapper>
  );
}
