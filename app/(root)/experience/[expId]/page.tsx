import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  IconArrowUpRight,
  IconCalendarStats,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

import { AnimatedSection } from "@/components/common/animated-section";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ChipContainer from "@/components/ui/chip-container";
import { buttonVariants } from "@/components/ui/button";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ExperienceDetailPageProps {
  params: {
    expId: string;
  };
}

const getYearFromDate = (date: Date): string =>
  new Date(date).getFullYear().toString();

const formatMonthYear = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const getDurationText = (
  startDate: Date,
  endDate: Date | "Present",
): string => {
  const startYear = getYearFromDate(startDate);
  const endYear =
    typeof endDate === "string" ? "Present" : getYearFromDate(endDate);

  return `${startYear} - ${endYear}`;
};

const getTimelineText = (startDate: Date, endDate: Date | "Present"): string => {
  const start = formatMonthYear(startDate);
  const end = typeof endDate === "string" ? "Present" : formatMonthYear(endDate);

  return `${start} - ${end}`;
};

export async function generateMetadata({
  params,
}: ExperienceDetailPageProps): Promise<Metadata> {
  const experience = experiences.find((c) => c.id === params.expId);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.position} at ${experience.company} | Experience`,
    description: `Detailed information about my role as ${experience.position} at ${experience.company}.`,
    alternates: {
      canonical: `${siteConfig.url}/experience/${params.expId}`,
    },
  };
}

export default function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps) {
  const experience = experiences.find((c) => c.id === params.expId);

  if (!experience) {
    redirect("/experience");
  }

  const summaryPreview = experience.description[0];
  const achievementCount = experience.achievements.length;
  const skillsCount = experience.skills.length;
  const hasCompanyUrl = Boolean(experience.companyUrl);

  const overviewStats = [
    {
      label: "Timeline",
      value: getDurationText(experience.startDate, experience.endDate),
      detail: getTimelineText(experience.startDate, experience.endDate),
      icon: IconCalendarStats,
    },
    {
      label: "Location",
      value: experience.location,
      detail: "Worked across product, engineering, and delivery needs.",
      icon: IconMapPin,
    },
    {
      label: "Focus",
      value: `${achievementCount} key outcomes`,
      detail: `${skillsCount} technologies used in this role.`,
      icon: IconSparkles,
    },
  ];

  return (
    <ClientPageWrapper>
      <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <AnimatedSection>
            <Link
              href="/experience"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5",
              )}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back to Experience
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <section className="overflow-hidden rounded-[2.25rem] border border-black/10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.9))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] sm:p-8">
              <div className="space-y-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {experience.logo ? (
                    <div className="h-20 w-20 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm dark:border-white/10">
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Experience Detail
                      </span>
                      <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                        {getDurationText(experience.startDate, experience.endDate)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h1 className="font-heading text-3xl tracking-[-0.05em] text-neutral-950 dark:text-white sm:text-4xl lg:text-5xl">
                        {experience.position}
                      </h1>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                          {experience.company}
                        </span>
                        {hasCompanyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-200 dark:hover:text-white"
                          >
                            Visit company
                            <IconArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                      <p className="max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
                        {summaryPreview}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {overviewStats.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[1.5rem] border border-black/10 bg-white/75 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                          {item.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-neutral-950 dark:text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-6">
                    <section className="rounded-[1.9rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                        Role Summary
                      </p>
                      <ul className="mt-5 space-y-4">
                        {experience.description.map((desc, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-base leading-8 text-neutral-700 dark:text-neutral-300"
                          >
                            <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="rounded-[1.9rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                        Key Achievements
                      </p>
                      <ul className="mt-5 space-y-4">
                        {experience.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-base leading-8 text-neutral-700 dark:text-neutral-300"
                          >
                            <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <section className="rounded-[1.9rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                        Skills & Tools
                      </p>
                      <p className="mt-3 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                        Worked with {skillsCount} core technologies across execution,
                        collaboration, and delivery.
                      </p>
                      <div className="mt-5">
                        <ChipContainer textArr={experience.skills} />
                      </div>
                    </section>

                    <section className="rounded-[1.9rem] border border-dashed border-black/10 bg-neutral-50/80 p-6 dark:border-white/10 dark:bg-neutral-950/30">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                        Quick Snapshot
                      </p>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                        <p>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                            Company:
                          </span>{" "}
                          {experience.company}
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                            Date range:
                          </span>{" "}
                          {getTimelineText(experience.startDate, experience.endDate)}
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                            Achievements:
                          </span>{" "}
                          {achievementCount} documented outcomes
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                            Location:
                          </span>{" "}
                          {experience.location}
                        </p>
                      </div>
                    </section>
                  </aside>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="flex justify-center">
            <Link
              href="/experience"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5",
              )}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              View All Experience
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </ClientPageWrapper>
  );
}
