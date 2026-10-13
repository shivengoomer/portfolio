"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Globe, Zap, Sparkles, Code2 } from "lucide-react";
import { SocialLinks } from "@/config/socials";
import TechText from "@/components/TechText";
import BlurText from "@/components/BlurText";

interface HeroGlassCardProps {
  rotatingWords?: string[];
  currentWord?: number;
  className?: string;
}

export function HeroGlassCard({ className }: HeroGlassCardProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={className || "relative w-full max-w-2xl"}>
      {/* ── HIGH-CONTRAST SOBER GLASS CARD (NO WASHED-OUT BLEED) ── */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-6 sm:p-8 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)] backdrop-blur-3xl text-zinc-100">
        {/* Subtle top inner hairline sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="space-y-5 sm:space-y-6">
          {/* ── TOP METADATA BAR ── */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-3.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-medium tracking-wide text-zinc-300">
                Available for roles
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Globe className="h-3 w-3 text-zinc-500" />
              <span>New Delhi, India · UTC+5:30</span>
            </div>
          </div>

          {/* ── EDITORIAL HEADER: ROLE + BADGES + TECHTEXT WORDMARK ── */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-indigo-400">
                Full-Stack & Systems Engineer
              </div>

              {/* Inline Avatar Pill */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-2.5 py-0.5 shadow-xs">
                <img
                  src="/profile-img.jpg"
                  alt="Shiven Goomer"
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span className="text-[11px] font-mono text-zinc-300 font-medium">
                  @shivengoomer
                </span>
              </div>
            </div>

            {/* Interactive TechText Name Wordmark with Creative Overlaid Stickers */}
            <div className="relative w-full h-[66px] sm:h-[80px] select-none pt-1">
              {/* Creative Floating Badge: Quant & GenAI */}
              <div className="absolute -top-1 right-2 z-20 hidden sm:inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-950/90 px-3 py-0.5 text-[11px] font-bold text-purple-300 shadow-md backdrop-blur-md pointer-events-none">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>Quant & GenAI</span>
              </div>

              <TechText
                key={isDarkMode ? "dark" : "light"}
                text="Shiven Goomer"
                fontSize={72}
                fontWeight={700}
                color="#ffffff"
                accentColor="#818cf8"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={12}
                draggable={true}
                selection={true}
                labels={true}
                sweep={true}
                speed={0.8}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* ── EDITORIAL BLURTEXT NARRATIVE WITH INLINE COMPANY LOGOS ── */}
          <div className="space-y-3">
            <BlurText
              text="Engineering quantitative trading platforms, distributed backend services, and AI-native retrieval engines"
              delay={35}
              animateBy="words"
              direction="top"
              className="text-base sm:text-lg leading-relaxed font-normal text-zinc-200"
            />

            {/* Inline Company Credentials Stack */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs sm:text-sm text-zinc-400">
              <span className="text-zinc-300">Shipped production code across</span>
              <span className="inline-flex items-center -space-x-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xs hover:space-x-1 transition-all duration-300">
                <span
                  className="relative h-6 w-6 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-zinc-700"
                  title="PanScience Innovations (Quant & GenAI)"
                >
                  <img
                    src="/experience/panscience.png"
                    alt="PanScience"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span
                  className="relative h-6 w-6 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-zinc-700"
                  title="House of Couton (FastAPI & AI)"
                >
                  <img
                    src="/experience/hoc.png"
                    alt="House of Couton"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span
                  className="relative h-6 w-6 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-zinc-700"
                  title="GNCIPL (Full Stack)"
                >
                  <img
                    src="/experience/gncipl-logo.png"
                    alt="GNCIPL"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span
                  className="relative h-6 w-6 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-zinc-700"
                  title="Geek Room (Head Emerging Tech)"
                >
                  <img
                    src="/experience/geekroom-logo.png"
                    alt="Geek Room"
                    className="h-full w-full object-contain"
                  />
                </span>
              </span>
              <span className="text-zinc-300">with TypeScript, Go, & Python.</span>
            </div>
          </div>

          {/* ── UNIFIED BOTTOM ACTION ROW & SOCIAL DOCK ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
            <div className="flex items-center gap-2">
              <Link
                href="/projects"
                className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 text-xs font-semibold text-zinc-950 shadow-sm transition-all hover:bg-zinc-200"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/resume"
                target="_blank"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-800"
              >
                <FileText className="h-3.5 w-3.5 text-zinc-400" />
                <span>Resume</span>
              </Link>
            </div>

            {/* Social Icons Dock */}
            <div className="flex items-center gap-1.5">
              {SocialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.link}
                    target={link.link.startsWith("http") ? "_blank" : undefined}
                    rel={link.link.startsWith("http") ? "noreferrer" : undefined}
                    title={link.name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
