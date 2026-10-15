"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Icons } from "@/components/common/icons";
import { ExperienceInterface } from "@/config/experience";

const formatMonthYear = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const getDurationText = (
  startDate: Date,
  endDate: Date | "Present",
): string => {
  const start = formatMonthYear(startDate);
  const end = typeof endDate === "string" ? "Present" : formatMonthYear(endDate);
  return `${start} – ${end}`;
};

interface TimelineProps {
  experiences: ExperienceInterface[];
}

// ── individual animated card ──────────────────────────────────
function TimelineCard({
  experience,
  index,
}: {
  experience: ExperienceInterface;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const isPresent = experience.endDate === "Present";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 90,
                damping: 20,
                delay: index * 0.07,
              },
            }
          : {}
      }
      className="group relative grid gap-3 sm:grid-cols-[3.75rem_1fr] sm:gap-4"
    >
      {/* ── Timeline dot / company logo (desktop sidebar) ── */}
      <div className="relative z-10 hidden sm:block">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          {experience.logo ? (
            <Image
              src={experience.logo}
              alt={experience.company}
              width={42}
              height={42}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <Icons.work className="h-7 w-7 text-zinc-500" />
          )}
        </motion.div>
      </div>

      {/* ── Card ── */}
      <article className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/85 sm:rounded-2xl sm:p-6">
        {/* Left accent stripe */}
        <span className="absolute inset-y-0 left-0 w-0.5 rounded-r bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:w-1" />

        {/* ── Top row: logo (mobile) + title + date ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3 sm:gap-4">
            {/* Mobile-only inline logo */}
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
              {experience.logo ? (
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Icons.work className="h-5 w-5 text-zinc-500" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h2 className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-lg">
                  {experience.position}
                </h2>
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                    aria-label={`Visit ${experience.company}`}
                  >
                    <Icons.externalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>

              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 sm:mt-1 sm:text-sm">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {experience.company}
                </span>
                {" · "}
                {experience.location}
              </p>
            </div>
          </div>

          {/* Date badge */}
          <div
            className={`inline-flex w-fit items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-medium sm:text-xs ${
              isPresent
                ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-amber-600/25 bg-amber-600/10 text-amber-800 dark:text-amber-300"
            }`}
          >
            {isPresent && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            )}
            <Icons.calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {getDurationText(experience.startDate, experience.endDate)}
          </div>
        </div>

        {/* ── Description bullets ── clamp on mobile ── */}
        <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
          {experience.description.map((desc, i) => (
            <li
              key={desc}
              className={`flex gap-2 text-xs leading-6 text-zinc-600 dark:text-zinc-300 sm:gap-3 sm:text-sm sm:leading-7 ${
                // hide 3rd+ bullets on mobile
                i >= 2 ? "hidden sm:flex" : ""
              }`}
            >
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500 sm:mt-3" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {/* ── Footer: skills + link ── */}
        <div className="mt-3 flex flex-col gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
          {/* Skills — max 3 on mobile */}
          <div className="flex flex-wrap gap-1.5">
            {experience.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-violet-300/25 bg-violet-300/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-700 dark:text-violet-200 sm:px-3 sm:py-1 sm:text-xs"
              >
                {skill}
              </span>
            ))}
            {/* Desktop: show up to 5, hidden on mobile */}
            {experience.skills.slice(3, 5).map((skill) => (
              <span
                key={skill}
                className="hidden rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-200 sm:inline-flex"
              >
                {skill}
              </span>
            ))}
            {experience.skills.length > 5 ? (
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:px-3 sm:py-1 sm:text-xs">
                +{experience.skills.length - 5} more
              </span>
            ) : experience.skills.length > 3 ? (
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:hidden">
                +{experience.skills.length - 3} more
              </span>
            ) : null}
          </div>

          {/* View details link */}
          <Link
            href={`/experience/${experience.id}`}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 sm:px-4 sm:py-2 sm:text-xs"
          >
            View details
            <Icons.chevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
      </article>
    </motion.div>
  );
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line — desktop only */}
      <div className="absolute bottom-8 left-7 top-8 hidden w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700 sm:block" />

      <div className="space-y-3 sm:space-y-5">
        {experiences.map((experience, index) => (
          <TimelineCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
}
