"use client";

import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/common/animated-section";
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

  return `${start} - ${end}`;
};

interface TimelineProps {
  experiences: ExperienceInterface[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute bottom-8 left-7 top-8 hidden w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700 sm:block" />

      <div className="space-y-5">
        {experiences.map((experience, index) => (
          <AnimatedSection
            key={experience.id}
            delay={0.05 * index}
            direction="up"
            className="group relative grid gap-4 sm:grid-cols-[3.75rem_1fr]"
          >
            <div className="relative z-10 hidden sm:block">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white shadow-sm transition-transform group-hover:scale-105 dark:border-zinc-800 dark:bg-zinc-950">
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
              </div>
            </div>

            <article className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900/85 sm:p-6">
              <span className="absolute inset-y-0 left-0 w-1 bg-amber-600 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
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
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
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
                          <Icons.externalLink className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>

                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {experience.company}
                      </span>{" "}
                      · {experience.location}
                    </p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center rounded-full border border-amber-600/25 bg-amber-600/10 px-3 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-300">
                  <Icons.calendar className="mr-2 h-3.5 w-3.5" />
                  {getDurationText(experience.startDate, experience.endDate)}
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {experience.description.map((desc) => (
                  <li
                    key={desc}
                    className="flex gap-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {experience.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 5 ? (
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                      +{experience.skills.length - 5} more
                    </span>
                  ) : null}
                </div>

                <Link
                  href={`/experience/${experience.id}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  View details
                  <Icons.chevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
