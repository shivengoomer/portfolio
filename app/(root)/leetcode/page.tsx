"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";

type SubmissionStats = {
  difficulty: Difficulty;
  count: number;
  submissions: number;
};

type RecentSubmission = {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
};

type LeetCodePayload = {
  main?: {
    data?: {
      matchedUser?: {
        username: string;
        profile?: {
          ranking?: number;
          reputation?: number;
          starRating?: number;
        };
        submitStatsGlobal?: {
          acSubmissionNum?: SubmissionStats[];
        };
      };
      userContestRanking?: {
        rating?: number;
        globalRanking?: number;
        attendedContestsCount?: number;
        topPercentage?: number;
      };
    };
  };
  calendar?: {
    data?: {
      matchedUser?: {
        userCalendar?: {
          streak?: number;
          totalActiveDays?: number;
          submissionCalendar?: string;
        };
      };
    };
  };
  submissions?: {
    data?: {
      recentAcSubmissionList?: RecentSubmission[];
    };
  };
  error?: string;
};

const difficultyStyles: Record<Difficulty, string> = {
  All: "border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
  Easy: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Medium: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Hard: "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const formatNumber = (value?: number) =>
  typeof value === "number" ? new Intl.NumberFormat("en-US").format(value) : "-";

const formatDate = (timestamp: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Number(timestamp) * 1000));

export default function LeetCodePage() {
  const [data, setData] = useState<LeetCodePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLeetCodeData() {
      try {
        const response = await fetch("/api/leetcode", { cache: "no-store" });
        const payload: LeetCodePayload = await response.json();

        if (!response.ok || payload.error) {
          throw new Error(payload.error ?? "Failed to load LeetCode data");
        }

        if (isMounted) {
          setData(payload);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load LeetCode data",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLeetCodeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const user = data?.main?.data?.matchedUser;
  const contest = data?.main?.data?.userContestRanking;
  const calendar = data?.calendar?.data?.matchedUser?.userCalendar;
  const recentSubmissions =
    data?.submissions?.data?.recentAcSubmissionList ?? [];

  const stats = useMemo(
    () => user?.submitStatsGlobal?.acSubmissionNum ?? [],
    [user],
  );

  const solvedTotal = stats.find((item) => item.difficulty === "All")?.count;
  const activeDays = calendar?.totalActiveDays;
  const streak = calendar?.streak;

  return (
    <ClientPageWrapper>
      <div className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  Coding Profile
                </p>
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                  LeetCode
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
                  A live snapshot of solved problems, contest activity, and
                  recent accepted submissions from my LeetCode profile.
                </p>
              </div>

              <Link
                href="https://leetcode.com/shivengoomer/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-fit rounded-full border-zinc-200 bg-white/80 dark:border-zinc-700 dark:bg-zinc-800/80",
                )}
              >
                Open Profile
                <Icons.externalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>

          {isLoading ? (
            <section className="grid min-h-[22rem] place-items-center rounded-2xl border border-zinc-200 bg-white/75 dark:border-zinc-800 dark:bg-zinc-900/75">
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <Icons.spinner className="h-4 w-4 animate-spin" />
                Loading LeetCode stats
              </div>
            </section>
          ) : error ? (
            <section className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300">
              <div className="flex items-start gap-3">
                <Icons.warning className="mt-0.5 h-5 w-5" />
                <div>
                  <h2 className="font-semibold">Unable to load LeetCode data</h2>
                  <p className="mt-2 text-sm leading-6">{error}</p>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="grid gap-4 md:grid-cols-4">
                {[
                  { label: "Solved", value: formatNumber(solvedTotal) },
                  { label: "Ranking", value: formatNumber(user?.profile?.ranking) },
                  { label: "Active Days", value: formatNumber(activeDays) },
                  { label: "Current Streak", value: formatNumber(streak) },
                ].map((item) => (
                  <article
                    key={item.label}
                    className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </p>
                    <p className="mt-3 font-heading text-3xl font-semibold text-zinc-950 dark:text-zinc-100">
                      {item.value}
                    </p>
                  </article>
                ))}
              </section>

              <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
                <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85">
                  <h2 className="font-heading text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
                    Solved by Difficulty
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {stats.map((item) => (
                      <div
                        key={item.difficulty}
                        className={cn(
                          "rounded-xl border p-4",
                          difficultyStyles[item.difficulty],
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold">
                            {item.difficulty}
                          </p>
                          <p className="font-heading text-2xl font-semibold">
                            {formatNumber(item.count)}
                          </p>
                        </div>
                        <p className="mt-2 text-xs opacity-75">
                          {formatNumber(item.submissions)} submissions
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85">
                <h2 className="font-heading text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
                  Recent Accepted Submissions
                </h2>
                <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {recentSubmissions.map((submission) => (
                    <Link
                      key={`${submission.titleSlug}-${submission.timestamp}`}
                      href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col gap-2 py-4 transition-colors hover:text-zinc-950 dark:hover:text-white sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          {submission.title}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {submission.lang} · {formatDate(submission.timestamp)}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {submission.statusDisplay}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </ClientPageWrapper>
  );
}
