"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { experiences } from "@/config/experience";
import { cn } from "@/lib/utils";

const formatMonthYear = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const formatPeriod = (startDate: Date, endDate: Date | "Present") =>
  `${formatMonthYear(startDate)} — ${endDate === "Present" ? "Present" : formatMonthYear(endDate)}`;

export function DeliveryFramework() {
  return (
    <section
      id="experience-timeline"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="experience-timeline-title"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              Selected experience
            </p>
            <h2
              id="experience-timeline-title"
              className="mt-3 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl"
            >
              The work so far.
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
              Building thoughtful products, useful systems, and stronger developer communities.
            </p>
          </div>
          <Link
            href="/experience"
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-text transition-colors hover:text-accent-text"
          >
            View all experience
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="relative mt-10 sm:mt-12">
          <div
            className="absolute bottom-8 left-[7px] top-7 w-px bg-border sm:left-[9px]"
            aria-hidden="true"
          />

          <div className="space-y-5 sm:space-y-6">
            {experiences.map((experience, index) => {
              const current = experience.endDate === "Present";

              return (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative grid grid-cols-[16px_1fr] gap-4 sm:grid-cols-[20px_150px_1fr] sm:gap-6"
                >
                  <span
                    className={cn(
                      "relative z-10 mt-6 block h-4 w-4 rounded-full border-[3px] border-surface transition-transform duration-300 group-hover:scale-110",
                      current ? "bg-accent shadow-[0_0_0_1px_var(--accent)]" : "bg-text-muted/50"
                    )}
                    aria-label={current ? "Current role" : undefined}
                  />

                  <p className="hidden pt-5 font-mono text-xs leading-5 text-text-muted sm:block">
                    {formatPeriod(experience.startDate, experience.endDate)}
                  </p>

                  <Link
                    href={`/experience/${experience.id}`}
                    className="rounded-2xl border border-border bg-surface/50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-2 hover:shadow-lg sm:p-5"
                  >
                    <p className="mb-3 font-mono text-[11px] text-text-muted sm:hidden">
                      {formatPeriod(experience.startDate, experience.endDate)}
                    </p>
                    <div className="flex items-start gap-3">
                      {experience.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-1.5">
                          <Image
                            src={experience.logo}
                            alt={`${experience.company} logo`}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-heading text-base font-bold tracking-tight text-text transition-colors group-hover:text-accent-text sm:text-lg">
                            {experience.position}
                          </h3>
                          {current && (
                            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent-text">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-text-muted">
                          <span className="font-medium text-text">{experience.company}</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {experience.location}
                          </span>
                        </div>
                        <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-text-muted">
                          {experience.description[0]}
                        </p>
                        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-text opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          View role <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
