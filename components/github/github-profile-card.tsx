"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Icons } from "@/components/common/icons";

type GitHubPayload = {
  user?: {
    login: string;
    html_url: string;
    public_repos: number;
    followers: number;
    created_at: string;
  };
  stats?: {
    totalStars: number;
    totalForks: number;
    sourceRepos: number;
    topLanguages: { name: string; count: number }[];
    topRepos: {
      name: string;
      href: string;
      stars: number;
      forks: number;
      language: string | null;
    }[];
  };
  error?: string;
};

const formatNumber = (value?: number) =>
  typeof value === "number" ? new Intl.NumberFormat("en-US").format(value) : "-";

function getAccountYears(createdAt?: string) {
  if (!createdAt) return "-";

  const years =
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  return `${Math.max(1, Math.floor(years))}+`;
}

export function GitHubProfileCard() {
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/github", { cache: "no-store" });
        const payload: GitHubPayload = await response.json();

        if (!response.ok || payload.error) {
          throw new Error(payload.error ?? "Failed to load GitHub data");
        }

        if (isMounted) {
          setData(payload);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load GitHub data",
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

  const user = data?.user;
  const stats = data?.stats;
  const achievements = [
    { label: "Repositories", value: formatNumber(user?.public_repos) },
    { label: "Years Active", value: getAccountYears(user?.created_at) },
  ];

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85">
      <div className="flex flex-col gap-5 border-b border-zinc-200 p-6 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
            <Icons.gitHub className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              GitHub Profile
            </p>
            <h3 className="mt-1 font-heading text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
              @{user?.login ?? "shivengoomer"}
            </h3>
          </div>
        </div>

        <Link
          href={user?.html_url ?? "https://github.com/shivengoomer"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Open GitHub
          <Icons.externalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="grid min-h-[20rem] place-items-center text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Icons.spinner className="h-4 w-4 animate-spin" />
              Loading GitHub profile
            </span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {achievements.map((item) => (
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

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Contribution Graph
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Live GitHub heatmap
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <img
                  src="https://ghchart.rshah.org/22c55e/shivengoomer"
                  alt="GitHub contribution heatmap for shivengoomer"
                  className="h-auto min-h-[7rem] w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Repository Builder",
                    "Open Source Active",
                    "Full Stack Projects",
                    "Consistent Coder",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Top Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {(stats?.topLanguages ?? []).map((language) => (
                    <span
                      key={language.name}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                    >
                      {language.name} · {language.count}
                    </span>
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
