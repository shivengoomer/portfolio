"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Cpu,
  Monitor,
  CheckCircle2,
  LayoutGrid,
  Maximize2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/projects";
import { cn } from "@/lib/utils";

interface FeaturedWorkShowcaseProps {
  projects: ProjectInterface[];
}

interface ScreenTab {
  label: string;
  image: string;
  url: string;
}

// Spotlight tracking wrapper component for cursor-following ambient glow
function InteractiveCard({
  children,
  className,
  glowColor = "rgba(6, 182, 212, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

export function FeaturedWorkShowcase({ projects }: FeaturedWorkShowcaseProps) {
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");

  // Identify the 3 showcase projects: Nifty50 Quant (1), Mentora (2), and D-TOX (3)
  const niftyProject =
    projects.find((p) => p.id === "nifty50-qa-platform") || projects[0];
  const mentoraProject =
    projects.find((p) => p.id === "Mentora") || projects[1] || projects[0];
  const dtoxProject =
    projects.find((p) => p.id === "wpbot-news") || projects[2] || projects[0];

  // Active screen tabs for each project
  const [niftyScreenIdx, setNiftyScreenIdx] = useState(0);
  const [mentoraScreenIdx, setMentoraScreenIdx] = useState(0);
  const [dtoxScreenIdx, setDtoxScreenIdx] = useState(0);

  // Active metric pulse feedback state
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const niftyScreens: ScreenTab[] = [
    {
      label: "Trading Terminal",
      image: "/projects/nifty50/terminal.png",
      url: "nifty50-quant.internal/terminal",
    },
    {
      label: "Overview Dashboard",
      image: "/projects/nifty50/dashboard.png",
      url: "nifty50-quant.internal/dashboard",
    },
    {
      label: "Quant Screener",
      image: "/projects/nifty50/screener.png",
      url: "nifty50-quant.internal/screener",
    },
    {
      label: "Factor Analytics",
      image: "/projects/nifty50/analytics.png",
      url: "nifty50-quant.internal/analytics",
    },
  ];

  const mentoraScreens: ScreenTab[] = [
    {
      label: "Assessment Creator",
      image: "/projects/mentora/creator.png",
      url: "mentora.app/exam-studio",
    },
    {
      label: "Grading Suite",
      image: "/projects/mentora/grading.png",
      url: "mentora.app/ai-evaluator",
    },
    {
      label: "Student Lab",
      image: "/projects/mentora/student.png",
      url: "mentora.app/practice-arena",
    },
  ];

  const dtoxScreens: ScreenTab[] = [
    {
      label: "Phishing Scanner",
      image: "/projects/wpbot-news/phishing.png",
      url: "d-tox.security/whatsapp-scanner",
    },
    {
      label: "Fake News Analysis",
      image: "/projects/wpbot-news/fakenews.png",
      url: "d-tox.security/news-detector",
    },
  ];

  return (
    <section
      id="projects"
      className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      aria-labelledby="featured-projects-title"
    >
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex cursor-default items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cyan-600 shadow-sm backdrop-blur dark:text-cyan-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span>SELECTED WORK · PRODUCTION ARCHITECTURES</span>
            </motion.div>

            <h2
              id="featured-projects-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Engineering Work
              </span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              A curated look at quantitative finance suites, AI-driven assessment engines, and real-time security assistants built for performance and polish.
            </p>
          </div>

          {/* View Mode Controls & All Projects Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center rounded-full border border-zinc-200/80 bg-white/80 p-1 font-mono text-xs shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setViewMode("spotlight")}
                className={cn(
                  "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
                  viewMode === "spotlight"
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {viewMode === "spotlight" && (
                  <motion.span
                    layoutId="featured-view-pill"
                    className="absolute inset-0 rounded-full bg-zinc-900 shadow-sm dark:bg-zinc-100"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Flagship</span>
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setViewMode("grid")}
                className={cn(
                  "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
                  viewMode === "grid"
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {viewMode === "grid" && (
                  <motion.span
                    layoutId="featured-view-pill"
                    className="absolute inset-0 rounded-full bg-zinc-900 shadow-sm dark:bg-zinc-100"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Workstations</span>
                </span>
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                <span>Browse all 18 projects</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── ANIMATED VIEW CONTAINER ── */}
        <AnimatePresence mode="wait">
          {/* ── VIEW MODE: SPOTLIGHT (FLAGSHIP + COMPANION BENTO) ── */}
          {viewMode === "spotlight" ? (
            <motion.div
              key="spotlight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* 1. PRIMARY FLAGSHIP SHOWCASE: NIFTY50 QUANT */}
              <InteractiveCard
                className="rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-8 lg:p-10"
                glowColor="rgba(6, 182, 212, 0.18)"
              >
                <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Left Info Column (5 cols) */}
                  <div className="space-y-6 lg:col-span-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300"
                      >
                        <Zap className="h-3 w-3" /> Flagship Deployment
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Engine
                      </motion.span>
                    </div>

                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {niftyProject.companyName}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {niftyProject.shortDescription}
                      </p>
                    </div>

                    {/* Interactive Spec Matrix Chips with Click Feedback */}
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200/80 bg-white/60 p-3.5 font-mono text-xs dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:grid-cols-3">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("latency")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "latency" ? "bg-cyan-500/10" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500">Latency</div>
                        <div className="font-semibold text-cyan-600 dark:text-cyan-400">&lt; 50ms Stream</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("coverage")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "coverage" ? "bg-cyan-500/10" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500">Coverage</div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">50 Equities</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("terminal")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "terminal" ? "bg-indigo-500/10" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500">Terminal</div>
                        <div className="font-semibold text-indigo-600 dark:text-indigo-400">4-Way Split</div>
                      </motion.button>
                    </div>

                    {/* Architecture Highlights */}
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-500" />
                        <span>FastAPI WebSocket pipeline with live Level-2 order book visualization.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-500" />
                        <span>Multi-parameter quantitative screener with custom technical filters and factor models.</span>
                      </li>
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js", "FastAPI", "Python", "TradingView", "TypeScript", "Tailwind CSS"].map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="cursor-default rounded-md border border-zinc-200/80 bg-zinc-100/80 px-2 py-0.5 text-[11px] font-medium text-zinc-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons with Spring Motion */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}>
                        <Link
                          href={`/projects/${niftyProject.id}`}
                          className="group/btn inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-cyan-500 hover:shadow-cyan-500/25"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>
                      </motion.div>

                      {niftyProject.githubLink && (
                        <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}>
                          <a
                            href={niftyProject.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          >
                            <Icons.gitHub className="h-3.5 w-3.5" />
                            <span>Source Code</span>
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Right Interactive Mockup Column (7 cols) */}
                  <div className="space-y-3 lg:col-span-7">
                    {/* macOS Window Frame */}
                    <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-2xl transition-all dark:border-zinc-800">
                      {/* Window Title Bar */}
                      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5 backdrop-blur">
                        <div className="flex items-center gap-1.5">
                          <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-rose-500/80 cursor-pointer" />
                          <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-amber-500/80 cursor-pointer" />
                          <motion.span whileHover={{ scale: 1.3 }} className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 cursor-pointer" />
                        </div>

                        {/* Simulated URL Bar with Motion Text */}
                        <motion.div
                          key={niftyScreens[niftyScreenIdx].url}
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          <span className="truncate max-w-[200px] sm:max-w-xs">{niftyScreens[niftyScreenIdx].url}</span>
                        </motion.div>

                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                          PRO_V2.4
                        </span>
                      </div>

                      {/* Screenshot Viewport with Smooth Zoom & Blur Cross-Fade */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={niftyScreens[niftyScreenIdx].image}
                            initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-full w-full"
                          >
                            <Image
                              src={niftyScreens[niftyScreenIdx].image}
                              alt={niftyScreens[niftyScreenIdx].label}
                              fill
                              className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Screen Switcher Tabs with Sliding LayoutId Pill */}
                      <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-800/80 bg-zinc-900/90 p-2">
                        {niftyScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setNiftyScreenIdx(idx)}
                            className={cn(
                              "relative rounded-lg px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                              niftyScreenIdx === idx
                                ? "text-cyan-300"
                                : "text-zinc-400 hover:text-zinc-200"
                            )}
                          >
                            {niftyScreenIdx === idx && (
                              <motion.span
                                layoutId="nifty-screen-pill"
                                className="absolute inset-0 rounded-lg bg-cyan-500/20 border border-cyan-500/40 shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>

              {/* 2. DUAL COMPANION SHOWCASES: MENTORA & D-TOX */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* MENTORA BENTO CARD */}
                <InteractiveCard
                  className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-7"
                  glowColor="rgba(168, 85, 247, 0.18)"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300"
                      >
                        <Cpu className="h-3 w-3" /> AI EdTech & Virtual Class
                      </motion.span>
                      <span className="font-mono text-[10px] text-zinc-500">Groq · Llama 3.3</span>
                    </div>

                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {mentoraProject.companyName}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 line-clamp-2 dark:text-zinc-400">
                        {mentoraProject.shortDescription}
                      </p>
                    </div>

                    {/* macOS Frame */}
                    <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-md dark:border-zinc-800">
                      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                        </div>
                        <motion.span
                          key={mentoraScreens[mentoraScreenIdx].url}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-mono text-[10px] text-zinc-400"
                        >
                          {mentoraScreens[mentoraScreenIdx].url}
                        </motion.span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={mentoraScreens[mentoraScreenIdx].image}
                            initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative h-full w-full"
                          >
                            <Image
                              src={mentoraScreens[mentoraScreenIdx].image}
                              alt={mentoraScreens[mentoraScreenIdx].label}
                              fill
                              className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 45vw"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Screen tabs with layoutId pill */}
                      <div className="flex items-center gap-1 border-t border-zinc-800 bg-zinc-900/90 p-1.5">
                        {mentoraScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setMentoraScreenIdx(idx)}
                            className={cn(
                              "relative rounded px-2 py-0.5 font-mono text-[10px] transition-colors",
                              mentoraScreenIdx === idx
                                ? "text-purple-300 font-semibold"
                                : "text-zinc-400 hover:text-zinc-200"
                            )}
                          >
                            {mentoraScreenIdx === idx && (
                              <motion.span
                                layoutId="mentora-screen-pill"
                                className="absolute inset-0 rounded bg-purple-500/25 border border-purple-500/40"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["BullMQ & Redis", "SM-2 Repetition", "Express Monorepo", "PDF Compiler"].map((t) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          className="cursor-default rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                    <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        href={`/projects/${mentoraProject.id}`}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:text-purple-600 dark:text-zinc-100 dark:hover:text-purple-400"
                      >
                        <span>Read Deep Dive</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </motion.div>

                    {mentoraProject.githubLink && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={mentoraProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        title="GitHub Repository"
                      >
                        <Icons.gitHub className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </InteractiveCard>

                {/* D-TOX BENTO CARD */}
                <InteractiveCard
                  className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-7"
                  glowColor="rgba(16, 185, 129, 0.18)"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
                      >
                        <ShieldCheck className="h-3 w-3" /> 🏆 Hackathon Winner
                      </motion.span>
                      <span className="font-mono text-[10px] text-zinc-500">AI WhatsApp Bot</span>
                    </div>

                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        D-TOX: AI Security Assistant
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 line-clamp-2 dark:text-zinc-400">
                        {dtoxProject.shortDescription}
                      </p>
                    </div>

                    {/* macOS Frame */}
                    <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-md dark:border-zinc-800">
                      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                        </div>
                        <motion.span
                          key={dtoxScreens[dtoxScreenIdx].url}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-mono text-[10px] text-zinc-400"
                        >
                          {dtoxScreens[dtoxScreenIdx].url}
                        </motion.span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={dtoxScreens[dtoxScreenIdx].image}
                            initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative h-full w-full"
                          >
                            <Image
                              src={dtoxScreens[dtoxScreenIdx].image}
                              alt={dtoxScreens[dtoxScreenIdx].label}
                              fill
                              className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 45vw"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Screen tabs with layoutId pill */}
                      <div className="flex items-center gap-1 border-t border-zinc-800 bg-zinc-900/90 p-1.5">
                        {dtoxScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setDtoxScreenIdx(idx)}
                            className={cn(
                              "relative rounded px-2 py-0.5 font-mono text-[10px] transition-colors",
                              dtoxScreenIdx === idx
                                ? "text-emerald-300 font-semibold"
                                : "text-zinc-400 hover:text-zinc-200"
                            )}
                          >
                            {dtoxScreenIdx === idx && (
                              <motion.span
                                layoutId="dtox-screen-pill"
                                className="absolute inset-0 rounded bg-emerald-500/25 border border-emerald-500/40"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["WhatsApp Web API", "FaceForensics++", "FAISS Similarity", "NLP Verification"].map((t) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          className="cursor-default rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                    <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        href={`/projects/${dtoxProject.id}`}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400"
                      >
                        <span>Read Deep Dive</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </motion.div>

                    {dtoxProject.githubLink && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={dtoxProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        title="GitHub Repository"
                      >
                        <Icons.gitHub className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </InteractiveCard>
              </div>
            </motion.div>
          ) : (
            /* ── VIEW MODE: GRID (3 HIGH-OCTANE WORKSTATION CARDS) ── */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-3"
            >
              {/* CARD 1: NIFTY50 */}
              <InteractiveCard
                className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-5 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-6"
                glowColor="rgba(6, 182, 212, 0.18)"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-md dark:border-zinc-800">
                    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-400">nifty50.quant</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={niftyScreens[niftyScreenIdx].image}
                        alt={niftyProject.companyName}
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                        Quant & Derivatives
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">&lt;50ms</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                      {niftyProject.companyName}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400">
                      {niftyProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {niftyProject.techStack.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-zinc-200 bg-zinc-100/70 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${niftyProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 transition-colors hover:text-cyan-600 dark:text-zinc-100 dark:hover:text-cyan-400"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  </motion.div>
                  {niftyProject.githubLink && (
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      href={niftyProject.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <Icons.gitHub className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </InteractiveCard>

              {/* CARD 2: MENTORA */}
              <InteractiveCard
                className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-5 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-6"
                glowColor="rgba(168, 85, 247, 0.18)"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-md dark:border-zinc-800">
                    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-400">mentora.app</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={mentoraScreens[mentoraScreenIdx].image}
                        alt={mentoraProject.companyName}
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        AI Virtual Classroom
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">Groq LLM</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                      {mentoraProject.companyName}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400">
                      {mentoraProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {mentoraProject.techStack.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-zinc-200 bg-zinc-100/70 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${mentoraProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 transition-colors hover:text-purple-600 dark:text-zinc-100 dark:hover:text-purple-400"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  </motion.div>
                  {mentoraProject.githubLink && (
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      href={mentoraProject.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <Icons.gitHub className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </InteractiveCard>

              {/* CARD 3: D-TOX */}
              <InteractiveCard
                className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-5 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-6"
                glowColor="rgba(16, 185, 129, 0.18)"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-md dark:border-zinc-800">
                    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-400">d-tox.security</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={dtoxScreens[dtoxScreenIdx].image}
                        alt="D-TOX"
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        🏆 Hackathon Winner
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">AI Security</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                      D-TOX: AI Security Assistant
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400">
                      {dtoxProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {["Node.js", "WhatsApp API", "FaceForensics++", "FAISS"].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-zinc-200 bg-zinc-100/70 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${dtoxProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  </motion.div>
                  {dtoxProject.githubLink && (
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      href={dtoxProject.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <Icons.gitHub className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </InteractiveCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
