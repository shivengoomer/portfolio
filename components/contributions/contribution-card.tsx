"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { Icons } from "@/components/common/icons";
import { certInterface } from "@/config/certs";

const BorderGlow = dynamic(() => import("@/components/BorderGlow"), {
  ssr: false,
  loading: () => (
    <div className="h-64 animate-pulse rounded-[20px] bg-zinc-800" />
  ),
});

interface ContributionCardProps {
  contributions: certInterface[];
}

export default function ContributionCard({
  contributions,
}: ContributionCardProps) {
  const [selected, setSelected] = React.useState<certInterface | null>(null);

  const openExternal = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getViewerSrc = (url?: string) => {
    if (!url) return url;
    try {
      const u = new URL(url, window.location.origin);
      if (u.hostname.includes("drive.google.com")) {
        if (u.searchParams.get("id")) {
          return `https://drive.google.com/file/d/${u.searchParams.get("id")}/preview`;
        }
        const m = u.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (m && m[1])
          return `https://drive.google.com/file/d/${m[1]}/preview`;
      }
    } catch {
      // ignore
    }
    return url;
  };

  const isPdf = (url?: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.endsWith(".pdf") || lower.includes("drive.google.com");
  };

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {contributions.map((cert, id) => (
          <BorderGlow
            key={id}
            backgroundColor="hsl(var(--card))"
            borderRadius={16}
            glowIntensity={0.5}
            colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
          >
            <div className="group relative flex min-h-[16rem] w-full flex-col justify-between overflow-hidden p-5">
              {/* Top: logo + issuer */}
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-700">
                  {cert.logo ? (
                    <img
                      src={cert.logo}
                      alt={cert.repoOwner + " logo"}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <Icons.gitRepoIcon className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {cert.repoOwner}
                  </p>
                  <h3 className="mt-0.5 text-sm font-semibold leading-snug tracking-tight text-zinc-900 line-clamp-2 dark:text-zinc-100">
                    {cert.repo}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 flex-1 text-xs leading-5 text-zinc-500 line-clamp-3 dark:text-zinc-400">
                {cert.contibutionDescription}
              </p>

              {/* Action buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(cert);
                  }}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  Preview
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openExternal(cert.link);
                  }}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  Verify →
                </button>
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>

      {/* Modal preview */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-zinc-100 p-2 text-zinc-500 shadow-sm hover:shadow dark:bg-zinc-800 dark:text-zinc-400"
              aria-label="Close preview"
            >
              <Icons.close size={18} />
            </button>

            <div className="mb-4 flex items-center justify-between pr-10">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {selected.repo}
              </h3>
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md px-3 py-1 text-sm text-zinc-600 hover:underline dark:text-zinc-300"
              >
                Open source
                <Icons.externalLink size={16} className="ml-2" />
              </a>
            </div>

            <div className="h-[70vh] w-full overflow-auto rounded-xl bg-zinc-100 dark:bg-zinc-800">
              {(() => {
                const viewerSrc = getViewerSrc(
                  selected.previewLink ?? selected.link
                );
                if (isPdf(viewerSrc)) {
                  return (
                    <iframe
                      src={viewerSrc}
                      title={selected.repo}
                      className="h-full w-full"
                    />
                  );
                }
                return (
                  <img
                    src={viewerSrc}
                    alt={selected.repo}
                    className="mx-auto max-h-full object-contain"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
