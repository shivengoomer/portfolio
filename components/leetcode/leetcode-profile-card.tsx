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
  Easy: "bg-text-muted/40",
  Medium: "bg-text-muted/60",
  Hard: "bg-text-muted/80",
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
  if (count === 0) return "bg-border/60";
  if (count < 2) return "bg-accent/25";
  if (count < 4) return "bg-accent/50";
  if (count < 7) return "bg-accent/75";
  return "bg-accent";
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
    <article className="editorial-card overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-5 border-b border-border p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent">
            <Icons.leetcode className="h-6 w-6" />
          </span>
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              LeetCode Profile
            </p>
            <h3 className="mt-1 font-heading text-2xl font-semibold text-text">
              {user?.username ?? "shivengoomer"}
            </h3>
          </div>
        </div>

        <Link
          href="/leetcode"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          Full stats
          <Icons.arrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="grid min-h-[16rem] place-items-center text-sm text-text-muted">
            <span className="inline-flex items-center gap-2">
              <Icons.spinner className="h-4 w-4 animate-spin text-accent" />
              Loading coding stats
            </span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-muted">
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
                  className="rounded-xl border border-border bg-surface-2 p-4"
                >
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-text">
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
                    className="rounded-xl border border-border bg-surface-2 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-text-muted">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            difficultyStyles[item.difficulty],
                          )}
                        />
                        {item.difficulty}
                      </span>
                      <span className="font-semibold text-text">
                        {formatNumber(item.count)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  6 Month Heatmap
                </p>
                <p className="text-xs text-text-muted">
                  {formatNumber(calendar?.totalActiveDays)} active days
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-3">
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
