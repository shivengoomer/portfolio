"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Trophy,
  Sparkles,
  Lock,
  Calendar,
  Code2,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/projects";
import { cn, formatDateFromObj } from "@/lib/utils";

interface ShowcaseItem {
  title: string;
  description?: string;
  validImages: string[];
}

interface ProjectDetailViewProps {
  project: ProjectInterface;
  showcaseItems: ShowcaseItem[];
  prevProject: ProjectInterface | null;
  nextProject: ProjectInterface | null;
}

export default function ProjectDetailView({
  project,
  showcaseItems,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const handlePrevScreen = () => {
    setSlideDirection(-1);
    setActiveScreenIndex((prev) => (prev > 0 ? prev - 1 : showcaseItems.length - 1));
  };

  const handleNextScreen = () => {
    setSlideDirection(1);
    setActiveScreenIndex((prev) => (prev < showcaseItems.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrevScreen();
      } else if (e.key === "ArrowRight") {
        handleNextScreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showcaseItems.length]);

  const isDtox = project.id === "wpbot-news";
  const isNifty = project.id === "nifty50-qa-platform";
  const isMentora = project.id === "Mentora";

  // Clean title for display
  const displayTitle = isDtox
    ? "D-TOX: AI Security Assistant"
    : project.companyName;

  const displaySubtitle = isDtox
    ? "For Real | WhatsApp Web Security Bot"
    : null;

  const activeScreen = showcaseItems[activeScreenIndex] || null;
  const currentImage =
    activeScreen?.validImages?.[0] ||
    project.pagesInfoArr?.[0]?.imgArr?.[0] ||
    project.companyLogoImg;

  const baseDomain = isDtox
    ? "d-tox.security"
    : isNifty
    ? "nifty50-quant.internal"
    : isMentora
    ? "mentora.app"
    : `${project.id}.app`;

  const screenSlug = activeScreen?.title
    ? activeScreen.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "overview";

  const simulatedUrl = `${baseDomain}/${screenSlug}`;

  return (
    <article className="relative min-h-screen overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-28 md:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
      {/* Ambient Top Glow Accents */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.12),rgba(168,85,247,0.08),transparent_80%)] blur-3xl dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.18),rgba(168,85,247,0.12),transparent_80%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-8 sm:space-y-10">
        {/* ── TOP BREADCRUMB & SWITCHER CAPSULE ── */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3.5 py-1.5 font-mono text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Selected Work</span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[140px] sm:max-w-xs">
              {displayTitle}
            </span>
          </Link>

          {/* Unified Project Pager */}
          {(prevProject || nextProject) && (
            <div className="flex items-center rounded-full border border-zinc-200/80 bg-white/80 p-1 font-mono text-xs shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/70">
              {prevProject && (
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  title={`Previous: ${prevProject.companyName}`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[11px]">Prev</span>
                </Link>
              )}
              {prevProject && nextProject && (
                <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
              )}
              {nextProject && (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  title={`Next: ${nextProject.companyName}`}
                >
                  <span className="hidden sm:inline text-[11px]">Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* ── HERO HEADER SECTION ── */}
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/75 to-zinc-50/80 p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Subtle Ambient Radial Highlight */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* ── LEFT COLUMN: PROJECT NARRATIVE & SPEC MATRIX (8 cols) ── */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Status Pill & Timeline */}
              <div className="flex flex-wrap items-center gap-2.5">
                {isDtox ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 shadow-sm">
                    <Trophy className="h-3.5 w-3.5" />
                    HACKATHON WINNER
                  </span>
                ) : isNifty ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    FLAGSHIP SYSTEM · QUANTITATIVE FINANCE
                  </span>
                ) : isMentora ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI ASSESSMENT PLATFORM · EDTECH
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <Code2 className="h-3 w-3" />
                    {project.category?.[0] || "Full Stack"} · {project.type === "Professional" ? "Production System" : "Engineering Project"}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-100/70 px-3 py-1 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-400">
                  <Calendar className="h-3 w-3 opacity-70" />
                  <span>
                    {formatDateFromObj(project.startDate)}
                    {project.endDate ? ` — ${formatDateFromObj(project.endDate)}` : " — Present"}
                  </span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-100">
                  {displayTitle}
                </h1>
                {displaySubtitle && (
                  <p className="font-mono text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {displaySubtitle}
                  </p>
                )}
                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {project.shortDescription}
                </p>
              </div>

              {/* Action Buttons & Links */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.websiteLink && (
                  <a
                    href={project.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Live Platform Demo</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Icons.gitHub className="h-4 w-4" />
                    <span>View Source Repository</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                  </a>
                )}
              </div>

              {/* ── SPECIFICATION MATRIX BAR (LINEAR STYLE) ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-2xl border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-950/40 p-3.5 backdrop-blur-md font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Domain
                  </span>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {project.category.slice(0, 2).join(" · ")}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Architecture
                  </span>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {project.type === "Professional" ? "Production System" : "Full-Stack System"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Core Runtime
                  </span>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {project.techStack[0]} · {project.techStack[1] || "APIs"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Status
                  </span>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Production Ready
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: BRANDED HARDWARE / SOFTWARE DISPLAY UNIT (4 cols) ── */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-zinc-100 via-white/80 to-zinc-50 p-5 shadow-xl backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-zinc-950/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between group">
                {/* Ambient Halo Behind Logo */}
                <div className="pointer-events-none absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* macOS Titlebar */}
                <div className="relative z-10 flex items-center justify-between border-b border-zinc-200/70 dark:border-zinc-800/70 pb-3 w-full">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                    {project.category[0] || "SYSTEM"}
                  </span>
                </div>

                {/* Center Brand Logo Showcase */}
                <div className="relative z-10 my-auto flex h-28 w-28 sm:h-32 sm:w-32 mx-auto items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                  <Image
                    src={project.companyLogoImg}
                    alt={displayTitle}
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* Bottom Telemetry Strip */}
                <div className="relative z-10 flex items-center justify-between border-t border-zinc-200/70 dark:border-zinc-800/70 pt-3 w-full font-mono text-[10px]">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                    {project.techStack.length} Technologies
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Build
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE PRODUCT SCREENS SHOWCASE ── */}
        {showcaseItems.length > 0 && (
          <section
            aria-labelledby="showcase-title"
            className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/75 to-zinc-50/80 p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(0,0,0,0.03)] backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            {/* Header with Title & Screen Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                    RUNTIME INTERFACE STUDIO
                  </span>
                </div>
                <h2
                  id="showcase-title"
                  className="mt-1 font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100"
                >
                  System Interface & Feature Workflows
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  High-resolution captures of core production runtime views and algorithmic tools.
                </p>
              </div>

              {/* Navigation Controls Capsule */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border border-zinc-200/80 bg-white/80 p-1 font-mono text-xs shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={handlePrevScreen}
                    className="rounded-full p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    title="Previous Screen (Left Arrow)"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                  <span className="px-2 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                    {String(activeScreenIndex + 1).padStart(2, "0")} / {String(showcaseItems.length).padStart(2, "0")}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={handleNextScreen}
                    className="rounded-full p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    title="Next Screen (Right Arrow)"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1.5 font-mono text-xs font-medium text-zinc-700 shadow-sm backdrop-blur hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                  title="Inspect Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Inspect</span>
                </motion.button>
              </div>
            </div>

            {/* Dedicated Horizontal Segmented Tabs Strip */}
            {showcaseItems.length > 1 && (
              <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {showcaseItems.map((item, idx) => {
                  const isActive = activeScreenIndex === idx;
                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        setSlideDirection(idx > activeScreenIndex ? 1 : -1);
                        setActiveScreenIndex(idx);
                      }}
                      className={cn(
                        "group relative flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-colors cursor-pointer select-none",
                        isActive
                          ? "text-cyan-950 dark:text-cyan-100"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-showcase-tab"
                          className="absolute inset-0 rounded-xl bg-cyan-500/15 border border-cyan-500/40 shadow-sm dark:bg-cyan-500/20"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className={cn("relative z-10 text-[10px] font-bold opacity-70", isActive && "text-cyan-600 dark:text-cyan-400")}>
                        0{idx + 1}.
                      </span>
                      <span className="relative z-10 truncate max-w-[200px] sm:max-w-none">
                        {item.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Main Interactive Workstation Chrome */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-2xl transition-all dark:border-zinc-800">
              {/* macOS Titlebar */}
              <div className="flex h-10 items-center justify-between border-b border-zinc-800 bg-zinc-900/95 px-4 backdrop-blur">
                <div className="flex items-center gap-1.5">
                  <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-rose-500/80 cursor-pointer" />
                  <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-amber-500/80 cursor-pointer" />
                  <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 cursor-pointer" />
                </div>

                {/* Simulated URL pill */}
                <motion.div
                  key={simulatedUrl}
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1 font-mono text-[11px] text-zinc-400"
                >
                  <Lock className="h-2.5 w-2.5 text-emerald-400" />
                  <span className="truncate max-w-[220px] sm:max-w-md">{simulatedUrl}</span>
                </motion.div>

                {/* Window Actions */}
                <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                  <button
                    type="button"
                    onClick={handlePrevScreen}
                    className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-200"
                    title="Previous"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-1 text-zinc-500">{activeScreenIndex + 1}/{showcaseItems.length}</span>
                  <button
                    type="button"
                    onClick={handleNextScreen}
                    className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-200"
                    title="Next"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="ml-1 rounded p-1 hover:bg-zinc-800 hover:text-zinc-200"
                    title="Fullscreen"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Main Screenshot Viewport with Hover Overlay Arrows */}
              <div
                className="group/viewport relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 sm:aspect-[16/9] cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={currentImage}
                    custom={slideDirection}
                    initial={{ opacity: 0, x: slideDirection * 20, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: slideDirection * -20, scale: 1.02, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={currentImage}
                      alt={`${displayTitle} - ${activeScreen?.title || "Screen"}`}
                      fill
                      priority
                      className="object-contain object-top"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left & Right floating hover chevron arrows */}
                {showcaseItems.length > 1 && (
                  <>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevScreen();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover/viewport:opacity-100 transition-opacity border border-white/10 hover:bg-black/80 hover:border-cyan-500/40"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextScreen();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover/viewport:opacity-100 transition-opacity border border-white/10 hover:bg-black/80 hover:border-cyan-500/40"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </>
                )}

                {/* Click to expand badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md border border-white/10 opacity-0 group-hover/viewport:opacity-100 transition-opacity">
                  <Maximize2 className="h-3 w-3" />
                  <span>Click to expand</span>
                </div>
              </div>

              {/* Integrated Editorial Workflow Description Bar */}
              {activeScreen?.description && (
                <div className="border-t border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                          WORKFLOW {String(activeScreenIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-xs text-zinc-200">
                          {activeScreen.title}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                        {activeScreen.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Miniature Thumbnail Preview Strip */}
            {showcaseItems.length > 1 && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    All Workflows & Screens ({showcaseItems.length})
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">
                    Tip: Use ← → keys to cycle
                  </span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {showcaseItems.map((item, idx) => {
                    const thumbImg = item.validImages?.[0] || project.companyLogoImg;
                    const isActive = activeScreenIndex === idx;
                    return (
                      <motion.button
                        key={item.title}
                        type="button"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setSlideDirection(idx > activeScreenIndex ? 1 : -1);
                          setActiveScreenIndex(idx);
                        }}
                        className={cn(
                          "group relative flex-shrink-0 w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden border transition-all text-left cursor-pointer",
                          isActive
                            ? "border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/20"
                            : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image
                          src={thumbImg}
                          alt={item.title}
                          fill
                          className="object-cover object-top"
                          sizes="150px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                          <span className="truncate font-mono text-[10px] text-white font-medium">
                            {item.title}
                          </span>
                          <span className="font-mono text-[9px] text-cyan-400 font-bold ml-1">
                            0{idx + 1}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fullscreen Lightbox Modal */}
            <AnimatePresence>
              {lightboxOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
                  onClick={() => setLightboxOpen(false)}
                >
                  <div
                    className="relative flex flex-col max-h-[95vh] w-full max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Lightbox Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                        <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-cyan-400 font-bold">
                          0{activeScreenIndex + 1} / 0{showcaseItems.length}
                        </span>
                        <span className="font-semibold text-white">{activeScreen?.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevScreen}
                          className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-300 hover:text-white"
                          title="Previous"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextScreen}
                          className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-300 hover:text-white"
                          title="Next"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxOpen(false)}
                          className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-300 hover:text-white"
                          title="Close (Esc)"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* High-res Image */}
                    <div className="relative mt-3 aspect-[16/10] w-full max-h-[75vh] overflow-hidden rounded-xl bg-black">
                      <Image
                        src={currentImage}
                        alt={activeScreen?.title || "Screen"}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {activeScreen?.description && (
                      <p className="mt-3 font-mono text-xs text-zinc-400">
                        {activeScreen.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {/* ── ARCHITECTURE OVERVIEW & KEY HIGHLIGHTS (2-COL BENTO) ── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left: Narrative Overview (7 cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 to-zinc-50/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:to-zinc-950/80 dark:shadow-[0_12px_32px_rgba(0,0,0,0.3)] space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
              <Layers className="h-4 w-4 text-purple-500" />
              <h2 className="font-heading text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                Architecture & Overview
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {project.descriptionDetails.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Author Attribution Card */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white/70 p-3.5 dark:border-zinc-800/80 dark:bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src="/profile-img.jpg"
                    alt="Shiven Goomer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Engineered by Shiven Goomer
                  </p>
                  <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    Full Stack & Quant Engineer
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/shivengoomer"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                aria-label="GitHub Profile"
              >
                <Icons.gitHub className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: Key Technical Highlights (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 to-zinc-50/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:to-zinc-950/80 dark:shadow-[0_12px_32px_rgba(0,0,0,0.3)] space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
              <Cpu className="h-4 w-4 text-cyan-500" />
              <h2 className="font-heading text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                Technical Highlights & Outcomes
              </h2>
            </div>

            <div className="space-y-3">
              {project.descriptionDetails.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200/60 bg-zinc-50/60 p-3 text-xs sm:text-sm text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-800/40 dark:text-zinc-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY STACK MATRIX ── */}
        <section className="rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 to-zinc-50/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:to-zinc-950/80 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
            <Code2 className="h-4 w-4 text-purple-500" />
            <h2 className="font-heading text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
              Full Technology & Tooling Stack ({project.techStack.length})
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-1.5 font-mono text-xs font-medium text-zinc-800 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:border-zinc-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── NEXT & PREVIOUS PROJECT FOOTER ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-700 hover:no-underline"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                ← Previous Project
              </span>
              <p className="mt-2 font-heading text-base font-bold text-zinc-950 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400 truncate">
                {prevProject.companyName}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/70 p-5 text-right shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-700 hover:no-underline"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Next Project →
              </span>
              <p className="mt-2 font-heading text-base font-bold text-zinc-950 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400 truncate">
                {nextProject.companyName}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
