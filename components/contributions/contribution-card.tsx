"use client";

import * as React from "react";

import { Icons } from "@/components/common/icons";
import { certInterface } from "@/config/certs";
import { Button } from "@/components/ui/button";

// both contributions and certs share the same shape used here
type Item = certInterface;

interface ContributionCardProps {
  contributions: Item[];
}

export default function ContributionCard({
  contributions,
}: ContributionCardProps) {
  const [selected, setSelected] = React.useState<Item | null>(null);

  const openExternal = (url: string) => {
    if (!url) return;
    // open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getViewerSrc = (url?: string) => {
    if (!url) return url;
    try {
      const u = new URL(url, window.location.origin);
      // Google Drive file urls: support both `open?id=...` and `/file/d/<id>/...`
      if (u.hostname.includes("drive.google.com")) {
        // handle open?id=ID
        if (u.searchParams.get("id")) {
          return `https://drive.google.com/file/d/${u.searchParams.get("id")}/preview`;
        }
        // handle /file/d/<id>/
        const m = u.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;
      }
    } catch (e) {
      // ignore
    }

    return url;
  };

  const isPdf = (url?: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    if (lower.endsWith(".pdf")) return true;
    if (lower.includes("drive.google.com")) return true;
    return false;
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-4 w-full max-w-4xl static">
        {contributions.map((contribution, id) => (
          <div
            key={id}
            className="group relative overflow-hidden rounded-lg border bg-background p-4 sm:p-6 transition-all duration-300"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-border overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                {contribution.logo ? (
                  // render issuer logo if available
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={contribution.logo}
                    alt={contribution.repoOwner + " logo"}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <Icons.gitRepoIcon size={20} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <div className="flex items-start sm:items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2 sm:line-clamp-1">
                      {contribution.repo}
                    </h3>
                    <a
                      href={contribution.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5 sm:mt-0"
                      aria-label={`Open ${contribution.repo} in new tab`}
                    >
                      <Icons.externalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">
                      {contribution.repoOwner}
                    </span>
                  </div>

                  <p className="mt-2 sm:mt-3 text-sm text-muted-foreground line-clamp-3">
                    {contribution.contibutionDescription}
                  </p>

                  <div className="mt-3 sm:mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg w-full sm:w-auto mr-2"
                      onClick={() => setSelected(contribution)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => openExternal(contribution.link)}
                    >
                      Open
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal preview */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-md bg-popover p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 rounded-md bg-background p-2 text-muted-foreground hover:shadow"
              aria-label="Close preview"
            >
              <Icons.close size={18} />
            </button>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selected.repo}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-md px-3 py-1 text-sm hover:underline"
                >
                  Open source / file
                  <Icons.externalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>

            <div className="h-[70vh] w-full overflow-auto bg-muted">
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
