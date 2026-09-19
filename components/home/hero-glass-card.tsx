"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Globe } from "lucide-react";
import { SocialLinks } from "@/config/socials";
import GlassSurface from "@/components/GlassSurface";

interface HeroGlassCardProps {
  rotatingWords: string[];
  currentWord: number;
}

export function HeroGlassCard({ rotatingWords, currentWord }: HeroGlassCardProps) {
  return (
    <div className="relative w-full max-w-2xl lg:translate-x-[-1.5rem] lg:-translate-y-8 xl:translate-x-[-2.5rem]">
      {/* ── AUTHENTIC APPLE LIQUID GLASS SURFACE CONTAINER ── */}
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={32}
        className="shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]"
        contentClassName="p-5 sm:p-7 md:p-9 space-y-4 sm:space-y-5 md:space-y-6"
      >
        {/* Top Status & Location Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-black/[0.08] pb-3 sm:pb-4 font-mono dark:border-white/10">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-[10px] sm:text-[11px] whitespace-nowrap">
              Available for Roles
            </span>
          </div>

          <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-[10px] sm:text-[11px] whitespace-nowrap">
            <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
            <span>New Delhi, India</span>
          </div>
        </div>

        {/* Main Name & Identity */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-zinc-600 dark:text-zinc-400 font-semibold">
            Full Stack Engineer · B.Tech IT
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white drop-shadow-xs">
            Shiven Goomer
          </h1>
        </div>

        {/* Authoritative, Clean Tagline with Smooth Rotating Focus */}
        <div className="space-y-2.5 sm:space-y-3">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Building high-performance web systems, quantitative market engines, and calm, accessible user interfaces.
          </p>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-cyan-700 dark:text-cyan-400 font-bold">$</span>
              <span>focus:</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[currentWord]}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22 }}
                className="inline-block rounded-md bg-white/70 dark:bg-white/10 px-2 sm:px-2.5 py-0.5 font-semibold text-zinc-900 dark:text-white border border-white/90 dark:border-white/15 whitespace-nowrap text-[11px] sm:text-xs shadow-xs backdrop-blur-md"
              >
                {rotatingWords[currentWord]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Action Triggers - High Contrast in Both Light and Dark */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/projects"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 font-mono text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/resume"
              target="_blank"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/70 px-5 font-mono text-xs sm:text-sm font-semibold text-zinc-900 shadow-xs backdrop-blur-md transition-all hover:bg-white/90 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/15 dark:hover:border-white/30"
            >
              <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              <span>Resume (PDF)</span>
            </Link>
          </motion.div>
        </div>

        {/* Clean Hairline Social Dock */}
        <div className="flex items-center justify-between gap-2 border-t border-black/[0.08] pt-3 sm:pt-4 dark:border-white/10">
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
            Explore profiles:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SocialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  whileHover={{ scale: 1.15, y: -1 }}
                  whileTap={{ scale: 0.92 }}
                  href={link.link}
                  target={link.link.startsWith("http") ? "_blank" : undefined}
                  rel={link.link.startsWith("http") ? "noreferrer" : undefined}
                  title={link.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/80 bg-white/70 text-zinc-700 shadow-xs backdrop-blur-md transition-colors hover:border-white hover:bg-white/90 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/25 dark:hover:bg-white/15 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
