"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import { AnimatedSection } from "@/components/common/animated-section";
import { Icons } from "@/components/common/icons";
import { ExperienceInterface } from "@/config/experience";

// Dynamically import BorderGlow for the premium card effect
const BorderGlow = dynamic(() => import("@/components/BorderGlow"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-[24px] bg-zinc-100 dark:bg-zinc-800/50" />,
});

const getMonthYear = (date: Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getDurationText = (
  startDate: Date,
  endDate: Date | "Present"
): string => {
  const start = getMonthYear(startDate);
  const end = typeof endDate === "string" ? "Present" : getMonthYear(endDate);
  return `${start} – ${end}`;
};

interface TimelineProps {
  experiences: ExperienceInterface[];
}

export default function Timeline({ experiences }: TimelineProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted && (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const borderColors = isDark
    ? ["#0ea5e9", "#8b5cf6", "#ec4899"]
    : ["#e0f2fe", "#ede9fe", "#fbcfe8"];

  return (
    <div className="relative space-y-12 pl-4 sm:pl-0">
      {/* Premium glowing dashed vertical timeline line */}
      <div className="absolute bottom-0 left-[27px] top-4 hidden w-[2px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(63,63,70,0.2)_10%,rgba(63,63,70,0.2)_90%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(161,161,170,0.15)_10%,rgba(161,161,170,0.15)_90%,transparent_100%)] sm:block" />

      {experiences.map((experience, index) => (
        <AnimatedSection
          key={experience.id}
          delay={0.1 * (index + 1)}
          direction="up"
          className="group relative flex flex-col gap-6 sm:flex-row"
        >
          {/* Timeline Node & Logo */}
          <div className="relative z-10 hidden sm:flex sm:w-16 sm:flex-shrink-0 sm:justify-center">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-zinc-200 bg-white/90 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110 dark:border-zinc-700 dark:bg-zinc-900/90">
              {experience.logo ? (
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={36}
                  height={36}
                  className="rounded-xl object-contain p-1"
                />
              ) : (
                <Icons.work className="h-6 w-6 text-zinc-400" />
              )}
            </div>
          </div>

          {/* Experience Card */}
          <div className="w-full flex-1">
            <BorderGlow
              borderRadius={24}
              glowIntensity={0.65}
              colors={borderColors} // Match hero grainient theme
              className="w-full bg-white/95 transition-transform duration-300 dark:bg-zinc-900/95 backdrop-blur"
            >
              <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8">
                {/* Mobile Logo & Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 sm:hidden">
                    {experience.logo && (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                        <Image
                          src={experience.logo}
                          alt={experience.company}
                          width={32}
                          height={32}
                          className="rounded-lg object-contain p-0.5"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {experience.position}
                      </h3>
                      <p className="mt-0.5 font-medium text-primary">
                        {experience.company}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Header */}
                  <div className="hidden sm:block">
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {experience.position}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-primary">
                      <span>{experience.company}</span>
                      <span className="text-zinc-300 dark:text-zinc-600">•</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{experience.location}</span>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="inline-flex w-fit items-center rounded-full border border-zinc-200/60 bg-zinc-100/50 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-tight text-zinc-600 backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-300">
                    <Icons.calendar className="mr-2 h-3.5 w-3.5 opacity-70" />
                    {getDurationText(experience.startDate, experience.endDate)}
                  </div>
                </div>

                {/* Description Content */}
                <ul className="mb-8 space-y-3">
                  {experience.description.map((desc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300"
                    >
                      <Icons.chevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div className="mt-auto border-t border-zinc-100 pt-6 dark:border-zinc-800/60">
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
