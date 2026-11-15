"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Award, ArrowUpRight, ChevronRight } from "lucide-react";
import { certsUnsorted } from "@/config/certs";
import { cn } from "@/lib/utils";

// Colour palette per issuer for the strip backgrounds
const ISSUER_PALETTES: Record<
  string,
  { from: string; to: string; accent: string }
> = {
  Oracle: { from: "#C74634", to: "#70192C", accent: "#F5793B" },
  Google: { from: "#1A73E8", to: "#0D47A1", accent: "#FBBC04" },
  CS50: { from: "#A51C30", to: "#6B1123", accent: "#E8E8E8" },
  default: { from: "#2D1E28", to: "#170A10", accent: "#F25C2A" },
};

function getPalette(issuer: string) {
  return ISSUER_PALETTES[issuer] || ISSUER_PALETTES.default;
}

export function CertificatesShowcase() {
  const certs = certsUnsorted;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const featured = hoveredIndex !== null ? certs[hoveredIndex] : certs[0];

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent flex items-center gap-2">
              <Award className="h-3 w-3" />
              Verified credentials
            </p>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
              Certifications
            </h2>
          </div>
          <Link
            href="/cert"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors duration-200"
          >
            View all
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Strip gallery */}
        <div className="flex gap-3 h-72 sm:h-80">
          {certs.map((cert, i) => {
            const palette = getPalette(cert.repoOwner);
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.a
                key={cert.repo}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Expand hovered strip, compress others
                animate={{
                  flex: isHovered ? 4 : isAnyHovered ? 0.6 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border cursor-pointer"
                style={{
                  background: `linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
                }}
                aria-label={`${cert.repo} certificate`}
              >
                {/* Noise texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "128px 128px",
                  }}
                />

                {/* Accent glow top */}
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full blur-2xl opacity-50 pointer-events-none"
                  style={{ backgroundColor: palette.accent }}
                />

                {/* Vertical cert name (always visible, rotated) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0 : 1,
                      scale: isHovered ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="origin-center"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    <span
                      className="font-heading text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                      style={{ color: palette.accent }}
                    >
                      {cert.repoOwner}
                    </span>
                  </motion.div>
                </div>

                {/* Expanded content — shown only when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="absolute inset-0 flex flex-col justify-between p-5"
                    >
                      {/* Top: issuer + arrow */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {cert.logo && (
                            <div className="relative h-7 w-7 rounded-md overflow-hidden bg-white/10 flex items-center justify-center p-1 shrink-0">
                              <Image
                                src={cert.logo}
                                alt={cert.repoOwner}
                                fill
                                className="object-contain p-0.5"
                                unoptimized
                              />
                            </div>
                          )}
                          <span
                            className="font-mono text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: palette.accent }}
                          >
                            {cert.repoOwner}
                          </span>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      {/* Bottom: cert name */}
                      <div className="space-y-2">
                        <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase leading-tight text-white">
                          {cert.repo}
                        </h3>
                        {/* Issue date extracted from description */}
                        {cert.contibutionDescription && (
                          <p className="font-mono text-[11px] text-white/50 leading-relaxed line-clamp-2">
                            {cert.contibutionDescription
                              .split("\n")
                              .find((l) => l.trim().startsWith("Issued"))
                              ?.trim() || ""}
                          </p>
                        )}
                        <div
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${palette.accent}25`,
                            color: palette.accent,
                            border: `1px solid ${palette.accent}40`,
                          }}
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                          View Certificate
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom index number (always visible on non-hovered) */}
                <motion.div
                  animate={{ opacity: isHovered ? 0 : 0.3 }}
                  className="absolute bottom-3 left-0 right-0 text-center"
                >
                  <span className="font-mono text-[10px] text-white">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <Link
            href="/cert"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-[11px] text-text-muted hover:border-accent/40 hover:text-accent transition-all duration-200"
          >
            <Award className="h-3 w-3" />
            All Certificates &amp; Credentials
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
}
