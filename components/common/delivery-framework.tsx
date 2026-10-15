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
        <span className="text-text-muted">{start}</span>
        <span className="text-border" aria-hidden="true">—</span>
        <span className="font-semibold text-accent-text">Present</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-text-muted">
      <span>{start}</span>
      <span className="text-border" aria-hidden="true">—</span>
      <span>{formatMonthYear(endDate)}</span>
    </span>
  );
}

const isEngineeringRole = (id: string) =>
  id === "panscience" ||
  id === "houseofcouton" ||
  id === "houseofcotton" ||
  id === "gncipl";

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
      className="relative px-4 py-10 sm:px-6 md:py-24 lg:px-8 overflow-hidden"
      aria-label="Experience Timeline"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* ── LEFT COLUMN: CAREER CONSOLE & STATS — hidden on mobile ── */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {/* Eyebrow */}
              <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
                Timeline & Career
              </p>
              
              {/* Main Heading */}
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-text leading-[1.15]">
                Experience
              </h2>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-text-muted leading-relaxed max-w-md">
                A chronological track of engineering production systems, quantitative platforms, and developer community initiatives.
              </p>

              {/* Career Snapshot Card */}
              <div className="editorial-card mt-6 overflow-hidden rounded-2xl p-5">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    Career Snapshot
                  </span>

                  {/* Active Status Badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {activeCount} ACTIVE ROLES
                  </span>
                </div>

                {/* Primary Focus */}
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-text-muted">Current Role</span>
                    <span className="font-semibold text-text text-right truncate">
                      Quant Finance Intern @ PanScience
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-text-muted">Engineering Focus</span>
                    <span className="font-mono text-[11px] font-medium text-text text-right truncate">
                      GenAI · Quant · Full Stack
                    </span>
                  </div>
                </div>

                {/* Interactive Metric Filters */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-border pt-3.5">
                  <button
                    onClick={() => setFilter(filter === "engineering" ? "all" : "engineering")}
                    type="button"
                    className={cn(
                      "group flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all text-center select-none cursor-pointer",
                      filter === "engineering"
                        ? "border-accent bg-accent-soft text-text shadow-sm"
                        : "border-border bg-surface-2 text-text-muted hover:border-accent hover:text-text"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-accent" />
                      <span className="font-heading text-lg font-bold text-accent">
                        {String(engineeringCount).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mt-0.5">
                      Engineering
                    </span>
                  </button>

                  <button
                    onClick={() => setFilter(filter === "community" ? "all" : "community")}
                    type="button"
                    className={cn(
                      "group flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all text-center select-none cursor-pointer",
                      filter === "community"
                        ? "border-accent bg-accent-soft text-text shadow-sm"
                        : "border-border bg-surface-2 text-text-muted hover:border-accent hover:text-text"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-accent" />
                      <span className="font-heading text-lg font-bold text-accent">
                        {String(communityCount).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mt-0.5">
                      Community
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 rounded-[12px] bg-accent px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] transition-all duration-200 hover:brightness-110 active:scale-95"
                >
                  View full experience
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 rounded-[12px] border border-border bg-transparent px-4 py-2.5 text-xs sm:text-sm font-semibold text-text transition-colors hover:bg-surface-2 active:scale-95"
                >
                  View Resume
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: CONNECTED TIMELINE & EXPERIENCE CARDS ── */}
          <div className="lg:col-span-7 relative">
            {/* Filter Pills Header — desktop only */}
            <div className="mb-6 hidden items-center justify-between gap-2 border-b border-border pb-3 md:flex">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-semibold transition-all",
                    filter === "all"
                      ? "bg-accent text-[#FDF9E7] shadow-sm"
                      : "text-text-muted hover:text-text"
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
                      ? "bg-accent text-[#FDF9E7] shadow-sm"
                      : "text-text-muted hover:text-text"
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
                      ? "bg-accent text-[#FDF9E7] shadow-sm"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  Community ({communityCount})
                </button>
              </div>
            </div>

            {/* Mobile summary strip — replaces left column */}
            <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-2.5 md:hidden">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  {activeCount} Active
                </span>
                <span className="text-border">·</span>
                <span className="font-mono text-[10px] text-text-muted">{experiences.length} Roles</span>
              </div>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent-text hover:underline"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Vertical Line Spine in --border */}
            <div
              className="absolute left-[17px] sm:left-[21px] top-16 bottom-6 w-[2px] -translate-x-1/2 bg-border rounded-full"
              aria-hidden="true"
            />

            {/* Experience Cards List */}
            <div className="space-y-5 sm:space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredExperiences.map((exp, index) => {
                  const isCurrent = exp.endDate === "Present";
                  const isEngineering = exp.category === "Engineering" || isEngineeringRole(exp.id);
                  const markerNumber = String(index + 1).padStart(2, "0");
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
                      {/* Timeline Numbered Marker Node: Node 01 filled orange, others hollow with --border */}
                      <div
                        className={cn(
                          "relative z-10 flex h-[34px] w-[34px] sm:h-[40px] sm:w-[40px] shrink-0 items-center justify-center rounded-xl font-heading text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 mt-2 select-none",
                          index === 0
                            ? "border-2 border-accent bg-accent text-[#FDF9E7] shadow-[0_0_16px_rgba(242,92,42,0.3)]"
                            : "border-2 border-border bg-surface text-text-muted"
                        )}
                        aria-label={`Milestone ${markerNumber}`}
                      >
                        {markerNumber}
                      </div>

                      {/* Experience Card */}
                      <div
                        className={cn(
                          "editorial-card flex-1 overflow-hidden rounded-2xl transition-all duration-300 ease-out",
                          "hover:-translate-y-0.5 hover:border-accent",
                          // Mobile: tight padding; Desktop: normal
                          "p-3.5 sm:p-5 md:p-6"
                        )}
                      >
                        {/* Header: Company Logo, Title, and Metadata */}
                        <div className="flex items-start gap-3 sm:gap-3.5 md:gap-4">
                          {/* Company Logo Badge */}
                          {exp.logo && (
                            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-sm sm:h-12 sm:w-12 sm:rounded-xl sm:p-1.5">
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
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h3 className="font-heading text-sm font-bold tracking-tight text-text transition-colors group-hover:text-accent sm:text-base md:text-lg">
                                  {exp.position}
                                </h3>

                                {/* Role Track Badge — hidden on mobile */}
                                <span
                                  className={cn(
                                    "hidden items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-tint-ink sm:inline-flex",
                                    isEngineering ? "bg-tint-green" : "bg-tint-pink"
                                  )}
                                >
                                  {isEngineering ? (
                                    <Code2 className="h-3 w-3" aria-hidden="true" />
                                  ) : (
                                    <Users className="h-3 w-3" aria-hidden="true" />
                                  )}
                                  {isEngineering ? "Engineering" : "Community"}
                                </span>

                                {/* Current Role Status — compact on mobile */}
                                {isCurrent && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-text sm:gap-1.5 sm:px-2.5 sm:text-[10px]">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                                    </span>
                                    CURRENT
                                  </span>
                                )}
                              </div>

                              {/* Dates */}
                              <div className="shrink-0 flex items-center gap-1.5 text-text-muted">
                                <Calendar className="h-3 w-3 opacity-60 hidden sm:inline" />
                                {formatExperienceDate(exp.endDate, exp.startDate)}
                              </div>
                            </div>

                            {/* Company & Location */}
                            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] font-medium text-text sm:mt-1 sm:gap-1.5 sm:text-xs md:text-sm">
                              {exp.companyUrl ? (
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-text hover:text-accent transition-colors font-semibold"
                                >
                                  {exp.company}
                                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                                </a>
                              ) : (
                                <span className="font-semibold text-text">
                                  {exp.company}
                                </span>
                              )}
                              <span className="text-border" aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 text-text-muted font-normal">
                                <MapPin className="hidden h-3 w-3 opacity-60 sm:inline" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Primary Overview Paragraph — HIDDEN on mobile */}
                        <p className="mt-3.5 hidden text-xs leading-relaxed text-text-muted sm:block md:text-[13px]">
                          {exp.description[0]}
                        </p>

                        {/* Expandable Key Impact / Achievements — HIDDEN on mobile */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-3 hidden sm:block">
                            <button
                              type="button"
                              onClick={() => toggleExpand(exp.id)}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-text hover:underline cursor-pointer"
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
                                  <ul className="mt-2.5 space-y-1.5 border-t border-border pt-2.5 text-xs text-text-muted">
                                    {exp.achievements.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                                        <span className="leading-relaxed">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Tech Stack Pills — mobile: max 2 + "View details" link; Desktop: up to 6 */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-border pt-2.5 sm:mt-4 sm:pt-3" aria-label="Technologies used">
                            {/* Mobile: 2 pills + link */}
                            {exp.skills.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-sans text-[10px] text-text-muted sm:hidden"
                              >
                                {skill}
                              </span>
                            ))}
                            <Link
                              href={`/experience/${exp.id}`}
                              className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent-text hover:underline sm:hidden"
                            >
                              Details <ArrowRight className="h-3 w-3" />
                            </Link>

                            {/* Desktop: up to 6 pills */}
                            {exp.skills.slice(0, 6).map((skill) => (
                              <span
                                key={skill}
                                className="hidden rounded-md border border-border bg-surface-2 px-2 py-0.5 font-sans text-[11px] text-text-muted sm:inline"
                              >
                                {skill}
                              </span>
                            ))}
                            {exp.skills.length > 6 && (
                              <span className="hidden font-sans text-[11px] text-text-muted self-center px-1 font-medium sm:inline">
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
