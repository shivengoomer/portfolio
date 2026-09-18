"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Briefcase, Users } from "lucide-react";
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
      <span className="inline-flex items-center gap-1.5">
        <span>{start}</span>
        <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">—</span>
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">Present</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span>{start}</span>
      <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">—</span>
      <span>{formatMonthYear(endDate)}</span>
    </span>
  );
}

const isCommercialWork = (id: string) =>
  id === "panscience" ||
  id === "houseofcouton" ||
  id === "houseofcotton" ||
  id === "gncipl";

export function DeliveryFramework() {
  const activeRole = experiences.find((e) => e.endDate === "Present") || experiences[0];
  const activeCount = experiences.filter((e) => e.endDate === "Present").length;
  const commercialCount = experiences.filter((e) => isCommercialWork(e.id)).length;
  const leadershipCount = experiences.length - commercialCount;

  return (
    <section
      id="experience-timeline"
      className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      aria-label="Experience Timeline"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Heading, Recruiter Snapshot & View All CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
                TIMELINE & CAREER
              </div>
              
              {/* Main Heading */}
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-zinc-950 dark:text-zinc-100 leading-[1.15]">
                Experience
              </h2>

              {/* Subtitle */}
              <p className="mt-3.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                A chronological track of engineering production web applications, delivering client-facing systems, and technical community leadership.
              </p>

              {/* Recruiter Quick Snapshot Card */}
              <div className="mt-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-2.5">
                  <span className="font-mono text-[11px] font-medium tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                    Quick Summary
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    {activeCount} Active {activeCount === 1 ? "Role" : "Roles"}
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 gap-2">
                    <span className="shrink-0 text-zinc-500 dark:text-zinc-500">Current Position</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-200 text-right truncate">
                      {activeRole ? `${activeRole.position} @ ${activeRole.company.replace(" Innovations", "")}` : "Quant & Web Dev"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 gap-2">
                    <span className="shrink-0 text-zinc-500 dark:text-zinc-500">Core Focus</span>
                    <span className="font-mono text-[11px] text-zinc-800 dark:text-zinc-300 text-right truncate">
                      GenAI · Quant · Full Stack
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3 text-center">
                  <div className="rounded-lg bg-white/80 dark:bg-zinc-900/70 p-2 border border-zinc-200/60 dark:border-zinc-800/60">
                    <div className="font-mono text-base font-bold text-purple-600 dark:text-purple-400">
                      {String(commercialCount).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Commercial
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/80 dark:bg-zinc-900/70 p-2 border border-zinc-200/60 dark:border-zinc-800/60">
                    <div className="font-mono text-base font-bold text-cyan-600 dark:text-cyan-400">
                      {String(leadershipCount).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Leadership
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300/80 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-zinc-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  View full experience
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  View Resume
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Connected Timeline Track & Experience Cards */}
          <div className="lg:col-span-7 relative">
            {/* Continuous Vertical Connecting Spine with Subtle Purple to Cyan Gradient */}
            <div
              className="absolute left-[15px] sm:left-[17px] top-6 bottom-6 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-purple-500/40 via-cyan-500/35 to-zinc-700/30 dark:from-purple-500/30 dark:via-cyan-400/25 dark:to-zinc-800/25 rounded-full"
              aria-hidden="true"
            />

            {/* Timeline Experience Cards */}
            <div className="space-y-4 sm:space-y-5">
              {experiences.map((exp, index) => {
                const isCurrent = exp.endDate === "Present";
                const isWork = isCommercialWork(exp.id);
                const markerNumber = String(index + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="group relative flex items-start gap-3 sm:gap-5"
                  >
                    {/* Monospace Technical Marker Badge */}
                    <div
                      className={cn(
                        "relative z-10 flex h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] shrink-0 items-center justify-center rounded-lg font-mono text-[11px] sm:text-xs font-semibold shadow-sm transition-all duration-200 mt-2 sm:mt-2.5 select-none",
                        isCurrent
                          ? "border border-cyan-500/60 dark:border-cyan-400/50 bg-cyan-50/90 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)] dark:shadow-[0_0_14px_rgba(6,182,212,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.35)]"
                          : "border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 group-hover:border-purple-500/40 group-hover:text-purple-600 dark:group-hover:border-purple-400/40 dark:group-hover:text-purple-300 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                      )}
                      aria-label={`Milestone ${markerNumber}`}
                    >
                      {markerNumber}
                    </div>

                    {/* Compact Experience Card */}
                    <div className="flex-1 rounded-xl border border-zinc-200/85 bg-white/80 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-200 ease-out group-hover:translate-x-1 sm:group-hover:translate-x-1.5 group-hover:border-zinc-300 group-hover:bg-white group-hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:shadow-none dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-900/80">
                      
                      {/* Top Header: Role Title & Date Metadata */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-300">
                            {exp.position}
                          </h3>

                          {/* Work vs Leadership Distinguisher */}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider",
                              isWork
                                ? "border border-purple-500/25 bg-purple-500/10 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300"
                                : "border border-zinc-400/30 bg-zinc-200/50 text-zinc-600 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-400"
                            )}
                          >
                            {isWork ? (
                              <Briefcase className="h-2.5 w-2.5" aria-hidden="true" />
                            ) : (
                              <Users className="h-2.5 w-2.5" aria-hidden="true" />
                            )}
                            {isWork ? "Work" : "Leadership"}
                          </span>

                          {/* Current Role Indicator */}
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                              </span>
                              CURRENT
                            </span>
                          )}
                        </div>

                        {/* Date - Formatted as Muted Technical Metadata */}
                        <div className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {formatExperienceDate(exp.endDate, exp.startDate)}
                        </div>
                      </div>

                      {/* Secondary Info: Company Name & Location */}
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 hover:underline transition-colors"
                          >
                            {exp.company}
                            <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}
                        <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                        <span className="font-normal text-zinc-500 dark:text-zinc-400">
                          {exp.location}
                        </span>
                      </div>

                      {/* Short Description */}
                      <p className="mt-2.5 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300/90 leading-relaxed">
                        {exp.description[0]}
                      </p>

                      {/* Subtle Technology Tags */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Technologies used">
                          {exp.skills.slice(0, 5).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-zinc-200/70 bg-zinc-100/60 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-600 transition-colors dark:border-zinc-800/70 dark:bg-zinc-800/40 dark:text-zinc-400"
                            >
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 5 && (
                            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 self-center px-1">
                              +{exp.skills.length - 5}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

