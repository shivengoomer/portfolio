"use client";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { GitHubProfileCard } from "@/components/github/github-profile-card";
import { HeroGrainientBg } from "@/components/common/hero-grainient-bg";
import { LeetCodeProfileCard } from "@/components/leetcode/leetcode-profile-card";
import ProjectCard from "@/components/projects/project-card";
import { HomeSkillsMarquee } from "@/components/skills/home-skills-marquee";
import { buttonVariants } from "@/components/ui/button";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { SocialLinks } from "@/config/socials";
import { featuredSkills } from "@/config/skills";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { cn, formatDateFromObj } from "@/lib/utils";
import { useEffect, useState } from "react";
import BlurText from "@/components/BlurText";


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
      siteConfig.links.leetcode,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
  };
  const rotatingWords = [
    "Scalable APIs",
    "AI Tooling",
    "Cloud Systems",
    "Real-Time Apps",
    "DevOps Workflows",
    "Backend Architecture",
    "Microservices",
    "Full-Stack Apps",
    "Distributed Systems",
    "Automation",
    "Dockerized Apps",
    "Modern UI",
    "Developer Tools",
    "Production Systems",
    "Secure Authentication",
  ];

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
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
          className="relative -mt-20 flex min-h-screen items-start overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-32"
          aria-label="Hero"
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg-portfolio.webm" type="video/webm" />
          </video>

          <HeroGrainientBg />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-start lg:pl-2 xl:pl-0">
            {/* Hero copy */}
            <div className="mt-20 max-w-2xl space-y-7 justify-center rounded-[2rem] border border-border bg-background/85 backdrop-blur-sm p-7 shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:p-9 lg:translate-x-[-1.75rem] lg:-translate-y-12 xl:translate-x-[-3rem]">
              <div className="space-y-4">
                <p className="text-sm text-center font-medium uppercase tracking-[0.24em] text-white text-muted-foreground">
                  Full Stack Developer · B.Tech IT
                </p>

                <h1 className="relative max-w-xl text-center  font-heading text-4xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Shiven Goomer
                </h1>

                <div className="max-w-3xl bg-white/50 backdrop-blur-lg rounded-full px-6 py-3 text-center leading-8 text-lg font-medium text-blue-900 flex flex-wrap items-center justify-center gap-2">
                  <span>I build</span>

                  <BlurText
                    key={rotatingWords[currentWord]}
                    text={rotatingWords[currentWord]}
                    delay={180}
                    animateBy="words"
                    direction="top"
                    className="font-bold text-blue-700"
                  />

                  <span>for the modern web.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center">
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
                    "h-11 rounded-full border-border bg-background/90 px-6 text-sm text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Download CV
                </Link>
              </div>

              {/* Social row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 justify-center ">
                {SocialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.link}
                      target={link.link.startsWith("http") ? "_blank" : undefined}
                      rel={link.link.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={link.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-sm text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
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

        <HomeSkillsMarquee />

        {/* ── CODE PROFILES ── */}
        <section
          className="px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="code-profiles-title"
        >
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Code Profiles
              </p>
              <h2
                id="code-profiles-title"
                className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
              >
                GitHub + LeetCode
              </h2>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
                Live snapshots of shipped code, contribution activity,
                competitive programming stats, and coding consistency.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <GitHubProfileCard />
              <div className="xl:sticky xl:top-24">
                <LeetCodeProfileCard />
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
                  "w-fit justify-start rounded-full px-0 text-sm text-zinc-700 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
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

        {/* ── ABOUT + EXPERIENCE ── */}
        <section
          id="about"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="about-title"
        >
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
            <article className="relative flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-8 text-white shadow-sm">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Profile
                </div>
                <h2
                  id="about-title"
                  className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                >
                  Building things that matter
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
                  I live at the intersection of product thinking and
                  engineering, where calm interfaces meet strong execution. My
                  work centers on React, Next.js, Node.js, and AI-enabled
                  developer tools.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 text-xs font-medium text-violet-100 transition-colors hover:border-violet-300/45 hover:bg-violet-300/20"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-10 text-[10px] font-medium uppercase tracking-[0.1em] text-white/20">
                Est. 2024
              </div>
            </article>

            <article className="relative flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-stone-100 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <svg
                aria-hidden="true"
                className="absolute bottom-5 right-5 opacity-[0.06] dark:opacity-[0.14]"
                width="80"
                height="80"
                viewBox="0 0 80 80"
              >
                <defs>
                  <pattern
                    id="experience-dots"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="80" height="80" fill="url(#experience-dots)" />
              </svg>

              <div className="relative">
                <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Timeline
                </div>
                <h2 className="font-heading text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                  Experience
                </h2>

                <div className="mt-6 space-y-3">
                  {highlightedExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="group relative overflow-hidden rounded-xl border border-black/[0.06] bg-white p-4 transition-transform hover:translate-x-1 dark:border-white/10 dark:bg-zinc-950"
                    >
                      <span className="absolute inset-y-0 left-0 w-1 bg-amber-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="flex gap-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                            {exp.position}
                          </h3>
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {exp.company} · {exp.location}
                          </p>
                        </div>
                        <p className="shrink-0 pt-0.5 text-[10px] text-zinc-400">
                          {formatExperienceDate(exp.endDate, exp.startDate)}
                        </p>
                      </div>
                      <p className="mt-3 line-clamp-2 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
                        {exp.description[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/experience"
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-2 text-xs font-medium text-amber-800 transition-colors hover:border-amber-600/50 hover:bg-amber-600/15 dark:text-amber-300"
              >
                View full experience
                <Icons.arrowRight className="h-3.5 w-3.5" />
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
