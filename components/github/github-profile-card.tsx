"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

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
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

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

  // Scroll heatmap to the right (latest weeks) on mount
  useEffect(() => {
    if (heatmapScrollRef.current) {
      heatmapScrollRef.current.scrollLeft = heatmapScrollRef.current.scrollWidth;
    }
  }, [data]);

  const user = data?.user;
  const stats = data?.stats;
  const achievements = [
    { label: "Repositories", value: formatNumber(user?.public_repos) },
    { label: "Years Active", value: getAccountYears(user?.created_at) },
  ];

  return (
    <article className="editorial-card overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-text sm:h-12 sm:w-12">
            <Icons.gitHub className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted sm:text-xs">
              GitHub Profile
            </p>
            <h3 className="mt-0.5 font-heading text-lg font-bold text-text sm:mt-1 sm:text-2xl">
              @{user?.login ?? "shivengoomer"}
            </h3>
          </div>
        </div>

        <Link
          href={user?.html_url ?? "https://github.com/shivengoomer"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-[12px] border border-border bg-transparent px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-surface-2 md:px-4 md:py-2"
        >
          Open GitHub
          <Icons.externalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="grid min-h-[12rem] place-items-center text-sm text-text-muted md:min-h-[20rem]">
            <span className="inline-flex items-center gap-2">
              <Icons.spinner className="h-4 w-4 animate-spin text-accent" />
              Loading GitHub profile
            </span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-muted">
            {error}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats grid — 3-col on mobile, 2-col on sm+ */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3">
              {achievements.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-surface-2 px-3 py-2 sm:p-4"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold text-text sm:mt-2 sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Contribution heatmap */}
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Contribution Graph
                </p>
                <p className="text-xs text-text-muted">
                  Live GitHub heatmap
                </p>
              </div>
              {/* Mobile: scrollable with inner min-width; Desktop: full-width */}
              <div className="overflow-hidden rounded-xl border border-border bg-surface p-3">
                <div
                  ref={heatmapScrollRef}
                  className="overflow-x-auto md:overflow-x-hidden"
                >
                  <div className="min-w-[520px] md:min-w-0">
                    <img
                      src="https://ghchart.rshah.org/F25C2A/shivengoomer"
                      alt="GitHub contribution heatmap for shivengoomer"
                      className="h-auto min-h-[7rem] w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Repository Builder",
                    "Open Source Active",
                    "Full Stack Projects",
                    "Consistent Coder",
                  ].map((badge, idx) => {
                    const tintClass = idx % 3 === 0 ? "bg-tint-green" : idx % 3 === 1 ? "bg-tint-pink" : "bg-tint-lavender";
                    return (
                      <span
                        key={badge}
                        className={cn("rounded-full px-3 py-1 text-xs font-bold text-tint-ink", tintClass)}
                      >
                        {badge}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Top Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {(stats?.topLanguages ?? []).map((language) => (
                    <span
                      key={language.name}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text-muted"
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
