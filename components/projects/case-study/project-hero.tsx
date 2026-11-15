"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Trophy,
  Lock,
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/projects";
import { CaseStudyData } from "@/config/case-study-data";
import { formatDateFromObj } from "@/lib/utils";

interface ProjectHeroProps {
  project: ProjectInterface;
  caseStudy: CaseStudyData | null;
  prevProject: ProjectInterface | null;
  nextProject: ProjectInterface | null;
}

export default function ProjectHero({
  project,
  caseStudy,
  prevProject,
  nextProject,
}: ProjectHeroProps) {
  const isDtox = project.id === "wpbot-news";
  const displayTitle = isDtox
    ? "D-TOX: AI Security Assistant"
    : project.companyName;

  const heroImage =
    caseStudy?.heroImage ||
    project.pagesInfoArr?.[0]?.imgArr?.[0] ||
    project.companyLogoImg;

  const headline =
    caseStudy?.headline || project.shortDescription;

  const techToShow = project.techStack.slice(0, 6);

  return (
    <section id="overview" className="relative overflow-hidden">
      {/* Ambient bg glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[800px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,92,42,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 lg:pt-32">
        {/* Breadcrumb + pager */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Selected Work</span>
            <span className="text-border">/</span>
            <span className="text-text truncate max-w-[140px] sm:max-w-xs font-semibold">
              {displayTitle}
            </span>
          </Link>

          {(prevProject || nextProject) && (
            <div className="flex items-center rounded-full border border-border bg-surface px-1 py-1 font-mono text-xs gap-0.5">
              {prevProject && (
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
                  title={`Previous: ${prevProject.companyName}`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[11px]">Prev</span>
                </Link>
              )}
              {prevProject && nextProject && (
                <span className="h-3 w-px bg-border mx-0.5" />
              )}
              {nextProject && (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
                  title={`Next: ${nextProject.companyName}`}
                >
                  <span className="hidden sm:inline text-[11px]">Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Category + badge */}
            <div className="flex flex-wrap items-center gap-2">
              {isDtox ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                  <Trophy className="h-3 w-3" />
                  Hackathon Winner
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  {project.category[0]}
                  {project.category[1] && ` · ${project.category[1]}`}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-text-muted">
                <Calendar className="h-3 w-3 opacity-60" />
                {formatDateFromObj(project.startDate)}
                {project.endDate
                  ? ` — ${formatDateFromObj(project.endDate)}`
                  : " — Present"}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[0.95] uppercase">
                {displayTitle}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-text-muted max-w-xl">
                {headline}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {project.websiteLink ? (
                <a
                  href={project.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-muted cursor-default">
                  <Lock className="h-4 w-4" />
                  Private
                </span>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  Source Code
                </a>
              )}
            </div>

            {/* Tech stack pills */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techToShow.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 6 && (
                  <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted">
                    +{project.techStack.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: hero screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {heroImage && (
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                {/* window chrome */}
                <div className="flex items-center gap-1.5 bg-surface-2 px-4 py-3 border-b border-border">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-auto font-mono text-[10px] text-text-muted">
                    {project.id}.app
                  </span>
                </div>
                <div className="relative bg-bg">
                  <Image
                    src={heroImage}
                    alt={`${displayTitle} screenshot`}
                    width={900}
                    height={560}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* subtle bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
