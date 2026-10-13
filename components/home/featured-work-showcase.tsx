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

// Editorial Card wrapper component
function InteractiveCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("editorial-card relative overflow-hidden", className)}
    >
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
            <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
              Selected Work · Production Architectures
            </p>

            <h2
              id="featured-projects-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text"
            >
              Featured Engineering{" "}
              <span className="relative inline-block font-serif italic font-normal tracking-normal text-text">
                Work
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-accent overflow-visible"
                  viewBox="0 0 100 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C22 2.5 45 11 65 4.5C78 1 89 8 98 5.5"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-text-muted">
              A curated look at quantitative finance suites, AI-driven assessment engines, and real-time security assistants built for performance and polish.
            </p>
          </div>

          {/* View Mode Controls & All Projects Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center rounded-full border border-border bg-surface-2 p-1 font-mono text-xs shadow-sm">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setViewMode("spotlight")}
                className={cn(
                  "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
                  viewMode === "spotlight"
                    ? "text-[#FDF9E7]"
                    : "text-text-muted hover:text-text"
                )}
              >
                {viewMode === "spotlight" && (
                  <motion.span
                    layoutId="featured-view-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
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
                    ? "text-[#FDF9E7]"
                    : "text-text-muted hover:text-text"
                )}
              >
                {viewMode === "grid" && (
                  <motion.span
                    layoutId="featured-view-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
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
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs font-semibold text-text shadow-sm transition-all hover:border-accent hover:text-accent"
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
                className="rounded-3xl p-6 sm:p-8 lg:p-10"
              >
                <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Left Info Column (5 cols) */}
                  <div className="space-y-6 lg:col-span-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-tint-lavender px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-tint-ink"
                      >
                        <Zap className="h-3 w-3" /> Flagship Deployment
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                        Live Engine
                      </motion.span>
                    </div>

                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text">
                        {niftyProject.companyName}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {niftyProject.shortDescription}
                      </p>
                    </div>

                    {/* Interactive Spec Matrix Chips with Click Feedback */}
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface-2 p-3.5 font-mono text-xs sm:grid-cols-3">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("latency")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "latency" ? "bg-accent-soft border border-accent/40" : "hover:bg-surface"
                        )}
                      >
                        <div className="text-[10px] uppercase text-text-muted">Latency</div>
                        <div className="font-semibold text-accent">&lt; 50ms Stream</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("coverage")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "coverage" ? "bg-accent-soft border border-accent/40" : "hover:bg-surface"
                        )}
                      >
                        <div className="text-[10px] uppercase text-text-muted">Coverage</div>
                        <div className="font-semibold text-text">50 Equities</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveMetric("terminal")}
                        className={cn(
                          "cursor-pointer space-y-0.5 rounded-lg p-1 text-left transition-colors",
                          activeMetric === "terminal" ? "bg-accent-soft border border-accent/40" : "hover:bg-surface"
                        )}
                      >
                        <div className="text-[10px] uppercase text-text-muted">Terminal</div>
                        <div className="font-semibold text-text">4-Way Split</div>
                      </motion.button>
                    </div>

                    {/* Architecture Highlights */}
                    <ul className="space-y-2 text-xs text-text-muted">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                        <span>FastAPI WebSocket pipeline with live Level-2 order book visualization.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                        <span>Multi-parameter quantitative screener with custom technical filters and factor models.</span>
                      </li>
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js", "FastAPI", "Python", "TradingView", "TypeScript", "Tailwind CSS"].map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="cursor-default rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-muted transition-colors"
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
                          className="group/btn inline-flex items-center gap-2 rounded-[12px] bg-accent px-4 py-2 text-xs font-semibold text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] transition-all hover:brightness-110"
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
                            className="inline-flex items-center gap-1.5 rounded-[12px] border border-border bg-transparent px-3.5 py-2 text-xs font-medium text-text transition-colors hover:bg-surface-2"
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
                    <div className="overflow-hidden rounded-2xl border border-[#3A2530] bg-[#120912] shadow-2xl transition-all">
                      {/* Window Title Bar */}
                      <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-4 py-2.5">
                        <div className="flex items-center gap-1.5 opacity-40">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </div>

                        {/* Simulated URL Bar with Motion Text */}
                        <motion.div
                          key={niftyScreens[niftyScreenIdx].url}
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 rounded-md border border-[#3A2530] bg-[#170A10] px-2.5 py-1 font-mono text-[11px] text-text-muted"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="truncate max-w-[200px] sm:max-w-xs text-[#FDF9E7]">{niftyScreens[niftyScreenIdx].url}</span>
                        </motion.div>

                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest hidden sm:inline">
                          PRO_V2.4
                        </span>
                      </div>

                      {/* Screenshot Viewport with Smooth Zoom & Blur Cross-Fade */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <div className="flex flex-wrap items-center gap-1.5 border-t border-[#3A2530] bg-[#120912] p-2">
                        {niftyScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setNiftyScreenIdx(idx)}
                            className={cn(
                              "relative rounded-lg px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                              niftyScreenIdx === idx
                                ? "text-[#FDF9E7]"
                                : "text-text-muted hover:text-[#FDF9E7]"
                            )}
                          >
                            {niftyScreenIdx === idx && (
                              <motion.span
                                layoutId="nifty-screen-pill"
                                className="absolute inset-0 rounded-lg bg-accent shadow-sm"
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
                  className="flex flex-col justify-between rounded-3xl p-6 sm:p-7"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-tint-pink px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-tint-ink"
                      >
                        <Cpu className="h-3 w-3" /> AI EdTech & Virtual Class
                      </motion.span>
                      <span className="font-mono text-[10px] text-text-muted">Groq · Llama 3.3</span>
                    </div>

                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-text">
                        {mentoraProject.companyName}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-muted line-clamp-2">
                        {mentoraProject.shortDescription}
                      </p>
                    </div>

                    {/* macOS Frame */}
                    <div className="overflow-hidden rounded-xl border border-[#3A2530] bg-[#120912] shadow-md">
                      <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3 py-1.5">
                        <div className="flex items-center gap-1 opacity-40">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                        <motion.span
                          key={mentoraScreens[mentoraScreenIdx].url}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-mono text-[10px] text-text-muted"
                        >
                          {mentoraScreens[mentoraScreenIdx].url}
                        </motion.span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <div className="flex items-center gap-1 border-t border-[#3A2530] bg-[#120912] p-1.5">
                        {mentoraScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setMentoraScreenIdx(idx)}
                            className={cn(
                              "relative rounded px-2 py-0.5 font-mono text-[10px] transition-colors",
                              mentoraScreenIdx === idx
                                ? "text-[#FDF9E7] font-semibold"
                                : "text-text-muted hover:text-[#FDF9E7]"
                            )}
                          >
                            {mentoraScreenIdx === idx && (
                              <motion.span
                                layoutId="mentora-screen-pill"
                                className="absolute inset-0 rounded bg-accent"
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
                          className="cursor-default rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-mono text-text-muted"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        href={`/projects/${mentoraProject.id}`}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-text transition-colors hover:text-accent"
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
                        className="text-text-muted hover:text-accent transition-colors"
                        title="GitHub Repository"
                      >
                        <Icons.gitHub className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </InteractiveCard>

                {/* D-TOX BENTO CARD */}
                <InteractiveCard
                  className="flex flex-col justify-between rounded-3xl p-6 sm:p-7"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-tint-green px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-tint-ink"
                      >
                        <ShieldCheck className="h-3 w-3" /> 🏆 Hackathon Winner
                      </motion.span>
                      <span className="font-mono text-[10px] text-text-muted">AI WhatsApp Bot</span>
                    </div>

                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-text">
                        D-TOX: AI Security Assistant
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-muted line-clamp-2">
                        {dtoxProject.shortDescription}
                      </p>
                    </div>

                    {/* macOS Frame */}
                    <div className="overflow-hidden rounded-xl border border-[#3A2530] bg-[#120912] shadow-md">
                      <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3 py-1.5">
                        <div className="flex items-center gap-1 opacity-40">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                        <motion.span
                          key={dtoxScreens[dtoxScreenIdx].url}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-mono text-[10px] text-text-muted"
                        >
                          {dtoxScreens[dtoxScreenIdx].url}
                        </motion.span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <div className="flex items-center gap-1 border-t border-[#3A2530] bg-[#120912] p-1.5">
                        {dtoxScreens.map((tab, idx) => (
                          <motion.button
                            key={tab.label}
                            type="button"
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setDtoxScreenIdx(idx)}
                            className={cn(
                              "relative rounded px-2 py-0.5 font-mono text-[10px] transition-colors",
                              dtoxScreenIdx === idx
                                ? "text-[#FDF9E7] font-semibold"
                                : "text-text-muted hover:text-[#FDF9E7]"
                            )}
                          >
                            {dtoxScreenIdx === idx && (
                              <motion.span
                                layoutId="dtox-screen-pill"
                                className="absolute inset-0 rounded bg-accent"
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
                          className="cursor-default rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-mono text-text-muted"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        href={`/projects/${dtoxProject.id}`}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-text transition-colors hover:text-accent"
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
                        className="text-text-muted hover:text-accent transition-colors"
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
                className="flex flex-col justify-between rounded-3xl p-5 sm:p-6"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-[#3A2530] bg-[#120912] shadow-md">
                    <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3 py-1.5">
                      <div className="flex items-center gap-1 opacity-40">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="font-mono text-[9px] text-text-muted">nifty50.quant</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <span className="rounded-full bg-tint-lavender px-2 py-0.5 font-mono text-[10px] font-semibold text-text uppercase tracking-wider">
                        Quant & Derivatives
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">&lt;50ms</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-text">
                      {niftyProject.companyName}
                    </h3>
                    <p className="text-xs leading-relaxed text-text-muted line-clamp-3">
                      {niftyProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {niftyProject.techStack.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${niftyProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-text transition-colors hover:text-accent"
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
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      <Icons.gitHub className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </InteractiveCard>

              {/* CARD 2: MENTORA */}
              <InteractiveCard
                className="flex flex-col justify-between rounded-3xl p-5 sm:p-6"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-[#3A2530] bg-[#120912] shadow-md">
                    <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3 py-1.5">
                      <div className="flex items-center gap-1 opacity-40">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="font-mono text-[9px] text-text-muted">mentora.app</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <span className="rounded-full bg-tint-pink px-2 py-0.5 font-mono text-[10px] font-semibold text-text uppercase tracking-wider">
                        AI Virtual Classroom
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">Groq LLM</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-text">
                      {mentoraProject.companyName}
                    </h3>
                    <p className="text-xs leading-relaxed text-text-muted line-clamp-3">
                      {mentoraProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {mentoraProject.techStack.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${mentoraProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-text transition-colors hover:text-accent"
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
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      <Icons.gitHub className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </InteractiveCard>

              {/* CARD 3: D-TOX */}
              <InteractiveCard
                className="flex flex-col justify-between rounded-3xl p-5 sm:p-6"
              >
                <div className="relative z-10 space-y-4">
                  {/* Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-[#3A2530] bg-[#120912] shadow-md">
                    <div className="flex items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3 py-1.5">
                      <div className="flex items-center gap-1 opacity-40">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="font-mono text-[9px] text-text-muted">d-tox.security</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#170A10]">
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
                      <span className="rounded-full bg-tint-green px-2 py-0.5 font-mono text-[10px] font-semibold text-text uppercase tracking-wider">
                        🏆 Hackathon Winner
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">AI Security</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-text">
                      D-TOX: AI Security Assistant
                    </h3>
                    <p className="text-xs leading-relaxed text-text-muted line-clamp-3">
                      {dtoxProject.shortDescription}
                    </p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1">
                    {["Node.js", "WhatsApp API", "FaceForensics++", "FAISS"].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono text-text-muted"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                  <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/projects/${dtoxProject.id}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-semibold text-text transition-colors hover:text-accent"
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
                      className="text-text-muted hover:text-accent transition-colors"
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
