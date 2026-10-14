"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

interface SocialLinkItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; width?: number; height?: number }>;
  hoverClasses: string;
}

const socialLinks: SocialLinkItem[] = [
  {
    name: "GitHub",
    url: "https://github.com/shivengoomer",
    icon: Icons.gitHub,
    hoverClasses:
      "hover:bg-[#CCFF00] hover:border-[#CCFF00] hover:text-[#0B132B] focus-visible:bg-[#CCFF00] focus-visible:border-[#CCFF00] focus-visible:text-[#0B132B]",
  },
];

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const email = "shivengoomer@gmail.com";

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email);
    }
    setCopied(true);
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer
      className={cn(
        "relative w-full bg-[#170A10] text-white pt-16 sm:pt-20 md:pt-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16">
        {/* ── 1. TOP ROW: TWO COLUMNS, VERTICALLY CENTERED (12-col on desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 sm:pb-16 border-b border-white/10">
          {/* Left Column: Heading + Status Indicator */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <h2
              className="font-oswald font-semibold uppercase text-white tracking-[-0.01em] leading-[0.95] select-none m-0"
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
              }}
            >
              LET&apos;S BUILD SOMETHING.
            </h2>
            <div className="flex items-center gap-2.5 text-zinc-400 text-sm sm:text-base">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#7FD6A0] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7FD6A0]" />
              </span>
              <span>Open to internships &amp; collaborations.</span>
            </div>
          </div>

          {/* Right Column: CTA Email Button + Copy Button */}
          <div className="lg:col-span-5 flex items-center lg:justify-end gap-3 flex-wrap sm:flex-nowrap">
            {/* Email Pill Button */}
            <a
              href={`mailto:${email}`}
              aria-label={`Send an email to ${email}`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F25C2A] text-white px-6 py-3.5 sm:px-7 sm:py-4 font-oswald font-medium text-sm sm:text-base tracking-wide shadow-[0_4px_22px_rgba(242,92,42,0.38)] hover:bg-[#ff6935] hover:shadow-[0_6px_28px_rgba(242,92,42,0.55)] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25C2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#170A10] shrink-0"
              style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
            >
              <span>{email}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transform-none" />
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
              className={cn(
                "relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 transition-all duration-150 hover:border-white/30 hover:bg-white/[0.08] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#170A10] shrink-0 cursor-pointer",
                copied
                  ? "px-4 py-3 sm:py-3.5 border-emerald-500/50 bg-emerald-500/15 text-emerald-300 gap-2"
                  : "w-11 h-11 sm:w-12 sm:h-12"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-medium text-emerald-300">
                    Copied
                  </span>
                </>
              ) : (
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* ── 2. LINKS ROW: CENTERED ── */}
        <div className="py-8 sm:py-12 flex items-center justify-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Shiven's ${item.name} profile`}
                className={cn(
                  "group inline-flex items-center justify-center gap-2.5 h-12 sm:h-14 px-8 sm:px-10 rounded-full border border-white/15 bg-white/[0.02] text-white font-oswald font-medium text-sm sm:text-base uppercase tracking-wider select-none transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#170A10] motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5",
                  item.hoverClasses
                )}
                style={{
                  fontFamily: "var(--font-oswald), Oswald, sans-serif",
                }}
              >
                <item.icon
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-zinc-400 group-hover:text-[#0B132B] group-focus-visible:text-[#0B132B] transition-colors duration-150"
                />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── 3. WORDMARK "SHIVEN GOOMER": BOLD MOMENT, EXACT SPAN, BOTTOM CROPPED ── */}
        <div
          className="relative w-full select-none pointer-events-none mt-4 sm:mt-8 mb-6 sm:mb-8 border-0 outline-none p-0 overflow-visible"
          style={{ containerType: "inline-size" }}
        >
          <div
            className="w-full text-center whitespace-nowrap font-oswald font-bold uppercase select-none border-0 outline-none p-0 m-0"
            style={{
              fontFamily: "var(--font-oswald), Oswald, sans-serif",
              fontSize: "15.15cqw",
              lineHeight: 0.8,
              backgroundImage:
                "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.75) 45%, rgba(255, 255, 255, 0.25) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              clipPath: "inset(0 0 12% 0)",
              WebkitClipPath: "inset(0 0 12% 0)",
            }}
            aria-hidden="true"
          >
            SHIVEN GOOMER
          </div>
        </div>

        {/* ── 4. BOTTOM BAR: 1PX DIVIDER, COPYRIGHT & SMOOTH BACK TO TOP ── */}
        <div className="flex items-center justify-between gap-4 pt-6 pb-10 border-t border-white/10 text-xs sm:text-sm text-zinc-400">
          <div>&copy; 2026 Shiven Goomer</div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#170A10] rounded px-2 py-1 -mr-2 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span aria-hidden="true">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
