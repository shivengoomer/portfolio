"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  Briefcase,
  Users,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
} from "lucide-react";
import { experiences } from "@/config/experience";
import { cn } from "@/lib/utils";

const formatMonthYear = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));

function formatExperienceDate(endDate: Date | "Present", startDate: Date) {
  const start = formatMonthYear(startDate);
  if (endDate === "Present") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs">
        <span className="text-zinc-600 dark:text-zinc-400">{start}</span>
        <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">—</span>
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">Present</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
      <span>{start}</span>
      <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">—</span>
      <span>{formatMonthYear(endDate)}</span>
    </span>
  );
}

const isEngineeringRole = (id: string) =>
  id === "panscience" ||
  id === "houseofcouton" ||
  id === "houseofcotton" ||
  id === "gncipl";

// Role accent styling palette
const roleAccents: Record<
  string,
  {
    borderHover: string;
    glow: string;
    badgeBg: string;
    markerColor: string;
  }
> = {
  panscience: {
    borderHover: "hover:border-purple-500/50 dark:hover:border-purple-500/40",
    glow: "rgba(168, 85, 247, 0.12)",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/25 text-purple-700 dark:text-purple-300",
    markerColor: "border-purple-500/50 bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  },
  houseofcouton: {
    borderHover: "hover:border-indigo-500/50 dark:hover:border-indigo-500/40",
    glow: "rgba(99, 102, 241, 0.12)",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/25 text-indigo-700 dark:text-indigo-300",
    markerColor: "border-indigo-500/50 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  },
  gncipl: {
    borderHover: "hover:border-cyan-500/50 dark:hover:border-cyan-500/40",
    glow: "rgba(6, 182, 212, 0.12)",
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500/25 text-cyan-700 dark:text-cyan-300",
    markerColor: "border-cyan-500/50 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  },
  geekroom: {
    borderHover: "hover:border-amber-500/50 dark:hover:border-amber-500/40",
    glow: "rgba(245, 158, 11, 0.12)",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/25 text-amber-700 dark:text-amber-300",
    markerColor: "border-amber-500/50 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
  ieee: {
    borderHover: "hover:border-sky-500/50 dark:hover:border-sky-500/40",
    glow: "rgba(14, 165, 233, 0.12)",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/25 text-sky-700 dark:text-sky-300",
    markerColor: "border-sky-500/50 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  },
};

export function DeliveryFramework() {
  const [filter, setFilter] = useState<"all" | "engineering" | "community">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeCount = experiences.filter((e) => e.endDate === "Present").length;
  const engineeringCount = experiences.filter((e) => isEngineeringRole(e.id)).length;
  const communityCount = experiences.length - engineeringCount;

  const filteredExperiences = experiences.filter((exp) => {
    if (filter === "engineering") return isEngineeringRole(exp.id);
    if (filter === "community") return !isEngineeringRole(exp.id);
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience-timeline"
      className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden"
      aria-label="Experience Timeline"
    >
      {/* Background Ambient Glow Accents */}
      <div className="pointer-events-none absolute -top-24 right-10 z-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute top-1/2 left-0 z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* ── LEFT COLUMN: CAREER CONSOLE & STATS ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                </span>
                TIMELINE & CAREER
              </div>
              
              {/* Main Heading */}
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-zinc-950 dark:text-zinc-100 leading-[1.15]">
                Experience
              </h2>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                A chronological track of engineering production systems, quantitative platforms, and developer community initiatives.
              </p>

              {/* Career Snapshot Glass Card */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-white/90 via-white/80 to-zinc-50/80 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800/90 dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-950/80">
                <div className="flex items-center justify-between border-b border-zinc-200/70 pb-3 dark:border-zinc-800/70">
                  <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                    Career Snapshot
                  </span>

                  {/* Active Status Badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {activeCount} ACTIVE ROLES
                  </span>
                </div>

                {/* Primary Focus */}
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 gap-2">
                    <span className="text-zinc-500">Current Role</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-right truncate">
                      Quant Finance Intern @ PanScience
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 gap-2">
                    <span className="text-zinc-500">Engineering Focus</span>
                    <span className="font-mono text-[11px] font-medium text-purple-600 dark:text-purple-400 text-right truncate">
                      GenAI · Quant · Full Stack
                    </span>
                  </div>
                </div>

                {/* Interactive Metric Filters */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-zinc-200/70 pt-3.5 dark:border-zinc-800/70">
                  <button
                    onClick={() => setFilter(filter === "engineering" ? "all" : "engineering")}
                    type="button"
                    className={cn(
                      "group flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all text-center select-none cursor-pointer",
                      filter === "engineering"
                        ? "border-purple-500/40 bg-purple-500/10 shadow-sm"
                        : "border-zinc-200/80 bg-white/70 hover:border-purple-300 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-purple-500" />
                      <span className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">
                        {String(engineeringCount).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Engineering
                    </span>
                  </button>

                  <button
                    onClick={() => setFilter(filter === "community" ? "all" : "community")}
                    type="button"
                    className={cn(
                      "group flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all text-center select-none cursor-pointer",
                      filter === "community"
                        ? "border-cyan-500/40 bg-cyan-500/10 shadow-sm"
                        : "border-zinc-200/80 bg-white/70 hover:border-cyan-300 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-cyan-500" />
                      <span className="font-mono text-lg font-bold text-cyan-600 dark:text-cyan-400">
                        {String(communityCount).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Community
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300/80 bg-zinc-900 px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black dark:border-zinc-700/80 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  View full experience
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                >
                  View Resume
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: CONNECTED TIMELINE & EXPERIENCE CARDS ── */}
          <div className="lg:col-span-7 relative">
            {/* Filter Pills Header */}
            <div className="mb-6 flex items-center justify-between gap-2 border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                    filter === "all"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                >
                  All Roles ({experiences.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("engineering")}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                    filter === "engineering"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400"
                  )}
                >
                  Engineering ({engineeringCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("community")}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                    filter === "community"
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "text-zinc-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
                  )}
                >
                  Community ({communityCount})
                </button>
              </div>
            </div>

            {/* Continuous Vertical Gradient Spine */}
            <div
              className="absolute left-[17px] sm:left-[21px] top-16 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-500 via-cyan-500 to-zinc-300 dark:to-zinc-800 rounded-full"
              aria-hidden="true"
            />

            {/* Experience Cards List */}
            <div className="space-y-5 sm:space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredExperiences.map((exp, index) => {
                  const isCurrent = exp.endDate === "Present";
                  const isEngineering = exp.category === "Engineering" || isEngineeringRole(exp.id);
                  const markerNumber = String(index + 1).padStart(2, "0");
                  const accent = roleAccents[exp.id] || roleAccents.panscience;
                  const isExpanded = expandedId === exp.id;

                  return (
                    <motion.div
                      key={exp.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="group relative flex items-start gap-3 sm:gap-5"
                    >
                      {/* Timeline Numbered Marker Node */}
                      <div
                        className={cn(
                          "relative z-10 flex h-[34px] w-[34px] sm:h-[40px] sm:w-[40px] shrink-0 items-center justify-center rounded-xl font-mono text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 mt-2 select-none",
                          isCurrent
                            ? "border-2 border-cyan-500 bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.3)]"
                            : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:border-purple-400 dark:group-hover:border-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                        )}
                        aria-label={`Milestone ${markerNumber}`}
                      >
                        {markerNumber}
                      </div>

                      {/* Experience Card */}
                      <div
                        className={cn(
                          "flex-1 overflow-hidden rounded-2xl border bg-white/85 dark:bg-zinc-900/60 p-5 sm:p-6 shadow-sm backdrop-blur-md transition-all duration-300 ease-out",
                          "border-zinc-200/90 dark:border-zinc-800/80",
                          "hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]",
                          accent.borderHover
                        )}
                      >
                        {/* Header: Company Logo, Title, and Metadata */}
                        <div className="flex items-start gap-3.5 sm:gap-4">
                          {/* Company Logo Badge */}
                          {exp.logo && (
                            <div className="relative flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-800">
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={44}
                                height={44}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          )}

                          {/* Role Title & Company Header */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-300">
                                  {exp.position}
                                </h3>

                                {/* Role Track Badge */}
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border",
                                    accent.badgeBg
                                  )}
                                >
                                  {isEngineering ? (
                                    <Code2 className="h-3 w-3" aria-hidden="true" />
                                  ) : (
                                    <Users className="h-3 w-3" aria-hidden="true" />
                                  )}
                                  {isEngineering ? "Engineering" : "Community"}
                                </span>

                                {/* Current Role Status */}
                                {isCurrent && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                    </span>
                                    CURRENT
                                  </span>
                                )}
                              </div>

                              {/* Dates */}
                              <div className="shrink-0 flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                                <Calendar className="h-3 w-3 opacity-60 hidden sm:inline" />
                                {formatExperienceDate(exp.endDate, exp.startDate)}
                              </div>
                            </div>

                            {/* Company & Location */}
                            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                              {exp.companyUrl ? (
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-zinc-900 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold"
                                >
                                  {exp.company}
                                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                                </a>
                              ) : (
                                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                                  {exp.company}
                                </span>
                              )}
                              <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-normal">
                                <MapPin className="h-3 w-3 opacity-60" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Primary Overview Paragraph */}
                        <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {exp.description[0]}
                        </p>

                        {/* Expandable Key Impact / Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => toggleExpand(exp.id)}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                            >
                              <span>
                                {isExpanded ? "Hide Impact Details" : `View Key Achievements (${exp.achievements.length})`}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-3 w-3 transition-transform duration-200",
                                  isExpanded && "rotate-180"
                                )}
                              />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <ul className="mt-2.5 space-y-1.5 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                                    {exp.achievements.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                                        <span className="leading-relaxed">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Tech Stack Pills */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60" aria-label="Technologies used">
                            {exp.skills.slice(0, 6).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {exp.skills.length > 6 && (
                              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 self-center px-1 font-medium">
                                +{exp.skills.length - 6} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
