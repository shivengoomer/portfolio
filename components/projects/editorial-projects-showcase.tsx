"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Search,
  Sparkles,
  Trophy,
  Lock,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/projects";
import { cn } from "@/lib/utils";

type FilterCategory = "all" | "fintech-quant" | "ai-llm" | "fullstack" | "systems";

interface EditorialProjectsShowcaseProps {
  primary: ProjectInterface;
  secondary: ProjectInterface[];
  remaining: ProjectInterface[];
  allProjects?: ProjectInterface[];
}

export default function EditorialProjectsShowcase({
  primary,
  secondary,
  remaining,
  allProjects,
}: EditorialProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const projectList = useMemo(() => {
    if (allProjects && allProjects.length > 0) return allProjects;
    return [primary, ...secondary, ...remaining];
  }, [allProjects, primary, secondary, remaining]);

  // Categorization helper
  const matchesCategory = (project: ProjectInterface, category: FilterCategory): boolean => {
    if (category === "all") return true;

    const catStrings = (project.category || []).map((c) => c.toLowerCase());
    const techStrings = (project.techStack || []).map((t) => t.toLowerCase());
    const name = project.companyName.toLowerCase();
    const desc = (project.shortDescription || "").toLowerCase();

    if (category === "fintech-quant") {
      return (
        catStrings.some((c) => c.includes("fintech") || c.includes("finance")) ||
        techStrings.some((t) => t.includes("trading") || t.includes("quant")) ||
        name.includes("nifty") ||
        name.includes("quant")
      );
    }

    if (category === "ai-llm") {
      return (
        catStrings.some((c) => c.includes("ai") || c.includes("llm")) ||
        techStrings.some(
          (t) =>
            t.includes("groq") ||
            t.includes("llama") ||
            t.includes("nlp") ||
            t.includes("faiss") ||
            t.includes("faceforensics") ||
            t.includes("ai")
        ) ||
        name.includes("mentora") ||
        name.includes("tox") ||
        name.includes("vibe") ||
        name.includes("chat") ||
        name.includes("motty")
      );
    }

    if (category === "fullstack") {
      return (
        catStrings.some((c) => c.includes("full stack") || c.includes("web dev")) ||
        techStrings.some((t) => t.includes("react") || t.includes("next.js") || t.includes("node"))
      );
    }

    if (category === "systems") {
      return (
        catStrings.some(
          (c) => c.includes("automation") || c.includes("backend") || c.includes("security")
        ) ||
        techStrings.some(
          (t) =>
            t.includes("webrtc") ||
            t.includes("n8n") ||
            t.includes("docker") ||
            t.includes("baileys") ||
            t.includes("socket")
        ) ||
        name.includes("webrtc") ||
        name.includes("drive") ||
        name.includes("whatsapp")
      );
    }

    return true;
  };

  // Filter and search matching
  const filteredProjects = useMemo(() => {
    return projectList.filter((p) => {
      const matchCat = matchesCategory(p, activeCategory);
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();

      const inName = p.companyName.toLowerCase().includes(query);
      const inDesc = (p.shortDescription || "").toLowerCase().includes(query);
      const inTech = (p.techStack || []).some((t) => t.toLowerCase().includes(query));

      return inName || inDesc || inTech;
    });
  }, [projectList, activeCategory, searchQuery]);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      all: projectList.length,
      "fintech-quant": projectList.filter((p) => matchesCategory(p, "fintech-quant")).length,
      "ai-llm": projectList.filter((p) => matchesCategory(p, "ai-llm")).length,
      fullstack: projectList.filter((p) => matchesCategory(p, "fullstack")).length,
      systems: projectList.filter((p) => matchesCategory(p, "systems")).length,
    };
  }, [projectList]);

  // If user is filtering or searching, render matched grid with rich cards
  const isFiltering = activeCategory !== "all" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* ── INTERACTIVE FILTER & SEARCH BAR ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <CategoryTab
            label="All Work"
            count={categoryCounts.all}
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          <CategoryTab
            label="FinTech & Quant"
            count={categoryCounts["fintech-quant"]}
            active={activeCategory === "fintech-quant"}
            onClick={() => setActiveCategory("fintech-quant")}
          />
          <CategoryTab
            label="AI & LLMs"
            count={categoryCounts["ai-llm"]}
            active={activeCategory === "ai-llm"}
            onClick={() => setActiveCategory("ai-llm")}
          />
          <CategoryTab
            label="Full-Stack Web"
            count={categoryCounts.fullstack}
            active={activeCategory === "fullstack"}
            onClick={() => setActiveCategory("fullstack")}
          />
          <CategoryTab
            label="Systems & Automation"
            count={categoryCounts.systems}
            active={activeCategory === "systems"}
            onClick={() => setActiveCategory("systems")}
          />
        </div>

        {/* Quick Tech / Keyword Search Input */}
        <div className="relative min-w-[240px] sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech or keyword..."
            className="w-full rounded-xl border border-zinc-200/80 bg-white/70 py-1.5 pl-9 pr-8 text-xs text-zinc-900 placeholder-zinc-400 backdrop-blur-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── VIEW A: FILTERED / SEARCH VIEW ── */}
      {isFiltering ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              Showing {filteredProjects.length} matching{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Reset filters
            </button>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
              <SlidersHorizontal className="mx-auto h-8 w-8 text-zinc-400" />
              <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                No matching projects found
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Try refining your keyword or resetting category filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <CompactProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── VIEW B: CURATED EDITORIAL 3-TIER SHOWCASE (DEFAULT) ── */
        <div className="space-y-10 sm:space-y-14 sm:space-y-18">
          {/* 1. PRIMARY FEATURED SHOWCASE (NIFTY50 QUANT) */}
          <section aria-labelledby="primary-project-title">
            <PrimaryProjectCard project={primary} />
          </section>

          {/* 2. SECONDARY FEATURED PROJECTS (MENTORA & D-TOX) */}
          {secondary.length > 0 && (
            <section aria-labelledby="secondary-projects-title" className="space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
                  </span>
                  <h2
                    id="secondary-projects-title"
                    className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300"
                  >
                    Key Initiatives & Deployments
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">02 Featured</span>
              </div>

              {/* Mobile: only show first secondary if not showAll; Desktop: always all */}
              <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
                {secondary.map((project, i) => (
                  <div
                    key={project.id}
                    className={i > 0 && !showAll ? "hidden md:block" : undefined}
                  >
                    <SecondaryProjectCard project={project} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. COMPACT EDITORIAL GRID (REMAINING PROJECTS) */}
          {remaining.length > 0 && (
            <section aria-labelledby="all-projects-title" className="space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                  </span>
                  <h2
                    id="all-projects-title"
                    className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300"
                  >
                    Other Systems & Production Experiments
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  {remaining.length} Projects
                </span>
              </div>

              {/* Mobile: limit remaining to 3; Desktop: always show all */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {remaining.map((project, i) => (
                  <div
                    key={project.id}
                    className={i >= 3 && !showAll ? "md:block hidden" : undefined}
                  >
                    <CompactProjectCard project={project} />
                  </div>
                ))}
              </div>

              {/* Mobile "View all" button */}
              {!showAll && remaining.length > 3 && (
                <div className="flex justify-center md:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white/80 px-5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-600"
                  >
                    View all {projectList.length} projects
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CATEGORY TAB PILL
// ─────────────────────────────────────────────────────────────
function CategoryTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors duration-200 cursor-pointer select-none",
        active
          ? "text-white dark:text-zinc-950 font-semibold"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
      )}
    >
      {active && (
        <motion.span
          layoutId="category-tab-active-pill"
          className="absolute inset-0 rounded-lg bg-zinc-950 shadow-sm dark:bg-white"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className={cn(
          "relative z-10 rounded-md px-1.5 py-0.2 text-[10px]",
          active
            ? "bg-white/20 text-white dark:bg-zinc-950/20 dark:text-zinc-950 font-bold"
            : "bg-zinc-200/60 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        )}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. PRIMARY FEATURED CARD (FLAGSHIP NIFTY50 QUANT SHOWCASE)
// ─────────────────────────────────────────────────────────────
function PrimaryProjectCard({ project }: { project: ProjectInterface }) {
  const imageSrc =
    project.pagesInfoArr?.[0]?.imgArr?.[0] || project.companyLogoImg;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/70 to-zinc-50/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)] dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] dark:hover:border-cyan-500/40 dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] hover:no-underline"
    >
      {/* Subtle Ambient Radial Highlight */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60 dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40 dark:bg-purple-500/15" />

      <article className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:items-center">
        {/* ── BROWSER WINDOW MOCKUP ── — hidden on mobile */}
        <div className="hidden md:block lg:col-span-7 p-4 sm:p-6 lg:p-7">
          <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-950 shadow-lg dark:border-zinc-800">
            {/* macOS Window Titlebar */}
            <div className="flex h-8 items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 backdrop-blur">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1 rounded-md bg-zinc-800/80 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                <Lock className="h-2.5 w-2.5 text-emerald-400" />
                <span>nifty50-quant.platform/terminal</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Screenshot Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 sm:aspect-[16/9]">
              <Image
                src={imageSrc}
                alt={project.companyName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>

        {/* ── EDITORIAL & ARCHITECTURE CONTENT ── */}
        <div className="flex flex-col justify-between p-4 sm:p-6 sm:p-8 lg:col-span-5 lg:pl-0">
          <div className="space-y-3 sm:space-y-4">
            {/* Status Pill & External Links */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
                </span>
                <span className="hidden sm:inline">FLAGSHIP SYSTEM · </span>QUANTITATIVE PLATFORM
              </span>
              <ExternalLinks project={project} />
            </div>

            {/* Project Headline */}
            <div>
              <h2 className="font-heading text-base font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400 sm:text-2xl md:text-3xl">
                {project.companyName}
              </h2>
              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-2 sm:line-clamp-none sm:text-sm">
                Enterprise-grade quantitative analytics and trading platform for all 50 NSE equities, featuring real-time algorithmic screeners, interactive TradingView charts, and low-latency API pipelines.
              </p>
            </div>

            {/* Key Architecture Features — hidden on mobile */}
            <div className="hidden space-y-1.5 pt-1 sm:block">
              <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                <span>Real-Time NSE Technical Screeners & Market Breadth</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                <span>Interactive TradingView Candlestick Engine with Multi-Timeframes</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                <span>FastAPI Async Engine with PyTest Automated QA Regression</span>
              </div>
            </div>

            {/* Curated Tech Chips — max 3 on mobile */}
            <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {/* Show remaining on desktop */}
              {project.techStack.slice(3, 6).map((tech) => (
                <span
                  key={tech}
                  className="hidden rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-700 sm:inline dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 flex items-center justify-between border-t border-zinc-200/80 pt-3 sm:mt-6 sm:pt-4 dark:border-zinc-800/80">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400">
              <span className="hidden sm:inline">Explore Architecture & System </span>Case Study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. SECONDARY FEATURED CARD (MENTORA & D-TOX SHOWCASE)
// ─────────────────────────────────────────────────────────────
function SecondaryProjectCard({ project }: { project: ProjectInterface }) {
  const imageSrc =
    project.pagesInfoArr?.[0]?.imgArr?.[0] || project.companyLogoImg;

  const isDtox = project.id === "wpbot-news";
  const isMentora = project.id === "Mentora";

  // Clean title display (remove hackathon winner from title text since we have a dedicated badge)
  const displayTitle = isDtox
    ? "D-TOX: AI Security Assistant"
    : project.companyName;

  const urlSlug = isDtox
    ? "whatsapp.dtox.security/bot"
    : isMentora
    ? "mentora.app/exam-studio"
    : `${project.id}.app/dashboard`;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/70 to-zinc-50/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80 dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] dark:hover:border-zinc-700 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:no-underline"
    >
      <article className="flex h-full flex-col">
        {/* Mockup Frame Header — hidden on mobile */}
        <div className="hidden overflow-hidden border-b border-zinc-200/80 bg-zinc-950 md:block dark:border-zinc-800">
          <div className="flex h-7 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1 rounded-md bg-zinc-800/70 px-2 py-0.2 font-mono text-[9px] text-zinc-400">
              <Lock className="h-2 w-2 text-emerald-400" />
              <span>{urlSlug}</span>
            </div>
            <div className="w-8" />
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
            <Image
              src={imageSrc}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {/* Dedicated Badges */}
            <div className="flex items-center justify-between">
              {isDtox ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                  <Trophy className="h-3 w-3" />
                  HACKATHON WINNER
                </span>
              ) : isMentora ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
                  <Sparkles className="h-3 w-3" />
                  AI ASSESSMENT PLATFORM
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                  {project.category?.[0] || "Featured System"}
                </span>
              )}
              <ExternalLinks project={project} />
            </div>

            {/* Title */}
            <h3 className="font-heading text-base font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-purple-600 dark:text-zinc-100 dark:group-hover:text-purple-400 sm:text-xl">
              {displayTitle}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
              {project.shortDescription}
            </p>

            {/* Tech Stack Badges — max 3 on mobile */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.slice(3, 5).map((tech) => (
                <span
                  key={tech}
                  className="hidden rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-700 sm:inline dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center border-t border-zinc-200/60 pt-3 sm:mt-5 dark:border-zinc-800/60">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 transition-colors group-hover:text-purple-600 dark:text-zinc-100 dark:group-hover:text-purple-400">
              View system case study
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. COMPACT EDITORIAL CARD (GRID FOR ALL OTHER PROJECTS)
// ─────────────────────────────────────────────────────────────
function CompactProjectCard({ project }: { project: ProjectInterface }) {
  const imageSrc =
    project.pagesInfoArr?.[0]?.imgArr?.[0] || project.companyLogoImg;

  const urlSlug = `${project.id.toLowerCase().replace(/[^a-z0-9]/g, "-")}.dev`;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-gradient-to-b from-white/90 to-zinc-50/70 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md dark:border-zinc-800/80 dark:from-zinc-900/90 dark:to-zinc-950/70 dark:hover:border-zinc-700 hover:no-underline"
    >
      <article className="flex h-full flex-col">
        {/* Sleek Mini Window Chrome — hidden on mobile */}
        <div className="hidden overflow-hidden border-b border-zinc-200/80 bg-zinc-950 md:block dark:border-zinc-800">
          <div className="flex h-6 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-2.5">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            </div>
            <span className="font-mono text-[9px] text-zinc-500 truncate max-w-[150px]">
              {urlSlug}
            </span>
            <div className="w-5" />
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
            <Image
              src={imageSrc}
              alt={project.companyName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div className="space-y-1.5 sm:space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-sm font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400 line-clamp-1 sm:text-base">
                {project.companyName}
              </h3>
              <ExternalLinks project={project} />
            </div>

            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1 pt-0.5 sm:pt-1">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-zinc-200/80 bg-zinc-100/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="rounded px-1 py-0.5 font-mono text-[10px] text-zinc-400">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center border-t border-zinc-200/60 pt-2.5 sm:mt-4 sm:pt-3 dark:border-zinc-800/60">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 transition-colors group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400">
              Case study
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// EXTERNAL LINKS (GITHUB / LIVE) WITH STOP-PROPAGATION
// ─────────────────────────────────────────────────────────────
function ExternalLinks({ project }: { project: ProjectInterface }) {
  if (!project.githubLink && !project.websiteLink) return null;

  return (
    <div
      className="flex items-center gap-1.5"
      onClick={(e) => {
        // Prevent triggering the parent card's link
        e.stopPropagation();
      }}
    >
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub repository for ${project.companyName}`}
          className="rounded p-1 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
        >
          <Icons.gitHub className="h-3.5 w-3.5" />
        </a>
      )}
      {project.websiteLink && (
        <a
          href={project.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live website for ${project.companyName}`}
          className="rounded p-1 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
        >
          <Icons.externalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
