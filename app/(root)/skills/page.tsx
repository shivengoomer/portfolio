"use client";

import React from "react";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import SkillsCard from "@/components/skills/skills-card";
import { skills } from "@/config/skills";
import { Code2, Cpu, Terminal, Database } from "lucide-react";

export default function SkillsPage() {
  return (
    <ClientPageWrapper>
      <div className="relative min-h-screen overflow-hidden px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 lg:px-8">
        {/* Ambient Top Glow & Technical Micro-Grid Backdrop */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.14),rgba(168,85,247,0.1),transparent_80%)] blur-3xl dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.18),rgba(168,85,247,0.12),transparent_80%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl space-y-10 sm:space-y-12">
          {/* Editorial Section Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-zinc-700 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span>TECHNICAL MATRIX · 22 CORE TECHNOLOGIES</span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                  Skills & Engineering Stack
                </h1>
                <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A comprehensive breakdown of programming languages, distributed backend frameworks, cloud infrastructure, and AI engineering tooling I build with daily.
                </p>
              </div>

              {/* Category Counter Pills */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white/60 px-2.5 py-1 text-zinc-700 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>06 Languages</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white/60 px-2.5 py-1 text-zinc-700 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  <span>05 Frameworks</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white/60 px-2.5 py-1 text-zinc-700 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>06 Tooling & DevOps</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white/60 px-2.5 py-1 text-zinc-700 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>05 Cloud & DB</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Skills Content */}
          <SkillsCard skills={skills} />
        </div>
      </div>
    </ClientPageWrapper>
  );
}
