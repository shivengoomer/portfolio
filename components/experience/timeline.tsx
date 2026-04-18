"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { AnimatedSection } from "@/components/common/animated-section";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { ExperienceInterface } from "@/config/experience";

// Helper functions
const getYearFromDate = (date: Date): string => new Date(date).getFullYear().toString();

const getDurationText = (startDate: Date, endDate: Date | "Present"): string => {
  const startYear = getYearFromDate(startDate);
  const endYear = typeof endDate === "string" ? "Present" : getYearFromDate(endDate);
  return `${startYear} - ${endYear}`;
};

interface TimelineProps {
  experiences: ExperienceInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const pinned = experiences.filter((exp) => exp.pinned);
  const others = experiences.filter((exp) => !exp.pinned);

  const sortedOthers = [...others].sort((a, b) => {
    const dateA = a.endDate === "Present" ? new Date() : a.endDate;
    const dateB = b.endDate === "Present" ? new Date() : b.endDate;
    return dateB.getTime() - dateA.getTime();
  });

  const finalList = [...pinned, ...sortedOthers];

  return (
    <div className="space-y-5">
      {finalList.map((experience, index) => (
        <AnimatedSection
          key={experience.id}
          delay={0.1 * (index + 1)}
          direction="up"
        >
          <div
            className={`w-full rounded-[1.75rem] border border-black/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur transition-all duration-300 dark:border-white/10 dark:bg-white/5 sm:p-6 ${
              experience.pinned
                ? "border-primary/25 ring-1 ring-primary/20"
                : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {experience.logo && (
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white sm:h-16 sm:w-16 dark:border-white/10">
                    <Image
                      src={experience.logo}
                      alt={experience.company}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {experience.position}
                    </h3>
                    <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm">
                      {getDurationText(experience.startDate, experience.endDate)}
                    </span>
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {experience.company}
                    </span>
                    {experience.companyUrl && (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icons.externalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {experience.location}
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground line-clamp-2">
                    {experience.description[0]}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-black/10 bg-white/80 sm:w-auto dark:border-white/10 dark:bg-white/[0.04]"
                asChild
              >
                <Link href={`/experience/${experience.id}`}>
                  View Details
                  <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default Timeline;
