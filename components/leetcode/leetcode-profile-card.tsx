"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";
type ProblemDifficulty = Exclude<Difficulty, "All">;

type SubmissionStats = {
  difficulty: Difficulty;
  count: number;
  submissions: number;
};

type LeetCodePayload = {
  main?: {
    data?: {
      matchedUser?: {
        username: string;
        profile?: {
          ranking?: number;
          reputation?: number;
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
  error?: string;
};

const difficultyStyles: Record<ProblemDifficulty, string> = {
  Easy: "bg-emerald-500",
  Medium: "bg-amber-500",
  Hard: "bg-rose-500",
};

const formatNumber = (value?: number) =>
  typeof value === "number" ? new Intl.NumberFormat("en-US").format(value) : "-";

function buildHeatmapDays(calendar?: string) {
  const submissionsByDay: Record<string, number> = {};
  const submissions = calendar ? (JSON.parse(calendar) as Record<string, number>) : {};

  Object.entries(submissions).forEach(([timestamp, count]) => {
    const dayKey = new Date(Number(timestamp) * 1000).toISOString().slice(0, 10);
    submissionsByDay[dayKey] = count;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 182 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (181 - index));
    const dayKey = date.toISOString().slice(0, 10);
    const count = submissionsByDay[dayKey] ?? 0;

    return {
      key: dayKey,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count,
    };
  });
}

function getHeatmapColor(count: number) {
  if (count === 0) return "bg-zinc-200 dark:bg-zinc-800";
  if (count < 2) return "bg-emerald-300 dark:bg-emerald-900";
  if (count < 4) return "bg-emerald-500 dark:bg-emerald-700";
  if (count < 7) return "bg-emerald-600 dark:bg-emerald-500";
  return "bg-emerald-800 dark:bg-emerald-300";
}

function isProblemDifficulty(value: Difficulty): value is ProblemDifficulty {
  return value !== "All";
}

export function LeetCodeProfileCard() {
  const [data, setData] = useState<LeetCodePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
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

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const user = data?.main?.data?.matchedUser;
  const contest = data?.main?.data?.userContestRanking;
  const calendar = data?.calendar?.data?.matchedUser?.userCalendar;
  const stats = user?.submitStatsGlobal?.acSubmissionNum ?? [];
  const solvedTotal = stats.find((item) => item.difficulty === "All")?.count;
  const heatmapDays = useMemo(
    () => buildHeatmapDays(calendar?.submissionCalendar),
    [calendar?.submissionCalendar],
  );
  const heatmapWeeks = useMemo(
    () =>
      Array.from({ length: 26 }, (_, weekIndex) =>
        heatmapDays.slice(weekIndex * 7, weekIndex * 7 + 7),
      ),
    [heatmapDays],
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85">
      <div className="flex flex-col gap-5 border-b border-zinc-200 p-6 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300">
            <Icons.leetcode className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              LeetCode Profile
            </p>
            <h3 className="mt-1 font-heading text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
              {user?.username ?? "shivengoomer"}
            </h3>
          </div>
        </div>

        <Link
          href="/leetcode"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Full stats
          <Icons.arrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="grid min-h-[16rem] place-items-center text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Icons.spinner className="h-4 w-4 animate-spin" />
              Loading coding stats
            </span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { label: "Solved", value: formatNumber(solvedTotal) },
                { label: "Ranking", value: formatNumber(user?.profile?.ranking) },
                { label: "Streak", value: formatNumber(calendar?.streak) },
                {
                  label: "Contest",
                  value: contest?.rating ? Math.round(contest.rating) : "-",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/70"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats
                .filter(
                  (
                    item,
                  ): item is SubmissionStats & {
                    difficulty: ProblemDifficulty;
                  } => isProblemDifficulty(item.difficulty),
                )
                .map((item) => (
                  <div
                    key={item.difficulty}
                    className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            difficultyStyles[item.difficulty],
                          )}
                        />
                        {item.difficulty}
                      </span>
                      <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                        {formatNumber(item.count)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  6 Month Heatmap
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatNumber(calendar?.totalActiveDays)} active days
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
                  {heatmapWeeks.map((week, weekIndex) => (
                    <div
                      key={`week-${weekIndex}`}
                      className="grid grid-rows-7 gap-1"
                    >
                      {week.map((day) => (
                        <span
                          key={day.key}
                          title={`${day.date}: ${day.count} submissions`}
                          className={cn(
                            "aspect-square min-h-3 rounded-[3px]",
                            getHeatmapColor(day.count),
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
