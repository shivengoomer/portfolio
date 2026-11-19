"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { experiences, type ExperienceInterface } from "@/config/experience";
import { cn } from "@/lib/utils";

const formatDate = (date: Date | "Present") =>
  typeof date === "string"
    ? date
    : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);

const dateRange = (item: ExperienceInterface) =>
  `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`;

function TimelineEntry({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: ExperienceInterface;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        delay: Math.min(index * 0.05, 0.2),
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative grid grid-cols-[48px_1fr] gap-4 py-6 first:pt-1 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:gap-6 sm:py-8"
    >
      {/* Company Logo Box */}
      <div className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface p-2 shadow-sm transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
        <span className="absolute -left-px inset-y-2.5 w-0.5 rounded-r bg-accent" />
        {item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.company} logo`}
            width={40}
            height={40}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="font-heading text-sm font-bold text-accent">
            SG
          </span>
        )}
      </div>

      {/* Role Details */}
      <div className="min-w-0">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-text">
              {item.position}
            </h3>
            <p className="mt-1 text-sm sm:text-base font-medium text-text-muted">
              <span className="text-text font-semibold">{item.company}</span>
              <span className="mx-1.5 text-border">·</span>
              <span>{item.category || "Engineering"}</span>
              {item.location && (
                <>
                  <span className="mx-1.5 text-border hidden sm:inline">·</span>
                  <span className="font-normal text-text-muted hidden sm:inline">
                    {item.location}
                  </span>
                </>
              )}
            </p>
          </div>
          <p className="order-first font-mono text-[11px] uppercase tracking-wider text-accent font-semibold sm:order-none sm:whitespace-nowrap">
            {dateRange(item)}
          </p>
        </div>

        {/* Overview description */}
        <p className="mt-3.5 max-w-4xl text-sm sm:text-base leading-relaxed text-text-muted">
          {item.description[0]}
        </p>

        {/* Expand / Collapse Button */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className={cn(
            "mt-3.5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors hover:text-accent focus:outline-none",
            expanded ? "text-accent" : "text-text-muted hover:text-text"
          )}
        >
          <span>{expanded ? "Hide Details" : "Explore Dossier"}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>

        {/* Expandable Key Outcomes */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-l-2 border-border pl-4 sm:pl-6 space-y-3 pt-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
                  Selected Technical Outcomes
                </p>
                <ul className="space-y-2.5">
                  {item.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                    <li
                      key={achievement}
                      className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-text-muted"
                    >
                      <span className="font-mono text-xs font-bold text-accent">
                        {String(achievementIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-text">{achievement}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/experience/${item.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-text hover:text-accent transition-colors pt-1"
                >
                  View complete role dossier <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Quick Link Icon */}
      <div className="hidden self-center sm:block">
        <Link
          href={`/experience/${item.id}`}
          aria-label={`View ${item.position} details`}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-text-muted shadow-sm transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function DeliveryFramework() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const roles = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-bg px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-t border-border"
      aria-labelledby="experience-heading"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Career / engineering history
            </p>
            <h2
              id="experience-heading"
              className="mt-3 font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-text"
            >
              Experience.
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-text-muted">
              The roles where systems shipped, teams moved, and technical work became visible impact.
            </p>
          </div>
          <Link
            href="/experience"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent"
          >
            Full archive
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </header>

        {/* Vertical Timeline Track */}
        <div className="relative mt-8 sm:mt-12">
          <div
            className="absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-accent/70 via-border to-transparent sm:left-7"
            aria-hidden="true"
          />
          {roles.map((item, index) => (
            <TimelineEntry
              key={item.id}
              item={item}
              index={index}
              expanded={openId === item.id}
              onToggle={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {experiences.length > 3 && (
          <div className="mt-6 ml-[48px] sm:ml-[56px]">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="rounded-full border border-border bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-text hover:border-accent hover:text-accent shadow-sm transition-all"
            >
              {showAll ? "Show less" : `Show more (${experiences.length - 3})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
