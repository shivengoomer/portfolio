"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Terminal,
  Database,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { skillsInterface } from "@/config/skills";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { cn } from "@/lib/utils";

interface SkillsCardProps {
  skills: skillsInterface[];
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#387EB8"
        d="M63.5 12.8c-12.7 0-23.7 3.5-23.7 13.9v10.4h24.3v3.5H30.5C18.6 40.6 8 50.8 8 63.6c0 13.3 9.4 23.3 22.5 23.3v-11.2c0-7.3 6.3-13.4 13.7-13.4h23.7c6.7 0 12.2-5.4 12.2-12.2V26.7c0-7.8-7-13.9-16.6-13.9zm-9.3 7.3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
      />
      <path
        fill="#FFE052"
        d="M64.5 115.2c12.7 0 23.7-3.5 23.7-13.9V90.9H63.9v-3.5h33.6c11.9 0 22.5-10.2 22.5-23c0-13.3-9.4-23.3-22.5-23.3v11.2c0 7.3-6.3 13.4-13.7 13.4H60.1c-6.7 0-12.2 5.4-12.2 12.2v23.4c0 7.8 7 13.9 16.6 13.9zm9.3-7.3a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"
      />
    </svg>
  );
}

export const skillStyles: Record<
  string,
  {
    color?: string;
    glow: string;
    borderHover: string;
    bgHover: string;
    className?: string;
    customIcon?: (size?: string) => React.ReactNode;
  }
> = {
  Docker: {
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.55)",
    borderHover: "hover:border-[#2496ED]/60",
    bgHover: "hover:bg-[#2496ED]/10",
  },
  AWS: {
    color: "#FF9900",
    glow: "rgba(255, 153, 0, 0.55)",
    borderHover: "hover:border-[#FF9900]/60",
    bgHover: "hover:bg-[#FF9900]/10",
  },
  Git: {
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.55)",
    borderHover: "hover:border-[#F05032]/60",
    bgHover: "hover:bg-[#F05032]/10",
  },
  "Next.js": {
    className: "text-zinc-950 dark:text-white",
    glow: "rgba(255, 255, 255, 0.45)",
    borderHover: "hover:border-zinc-400 dark:hover:border-zinc-500",
    bgHover: "hover:bg-zinc-500/10",
  },
  React: {
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.55)",
    borderHover: "hover:border-[#61DAFB]/60",
    bgHover: "hover:bg-[#61DAFB]/10",
  },
  "Node.js": {
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.55)",
    borderHover: "hover:border-[#5FA04E]/60",
    bgHover: "hover:bg-[#5FA04E]/10",
  },
  "Express.js": {
    className: "text-zinc-800 dark:text-zinc-100",
    glow: "rgba(255, 255, 255, 0.4)",
    borderHover: "hover:border-zinc-400 dark:hover:border-zinc-500",
    bgHover: "hover:bg-zinc-500/10",
  },
  TypeScript: {
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.55)",
    borderHover: "hover:border-[#3178C6]/60",
    bgHover: "hover:bg-[#3178C6]/10",
  },
  JavaScript: {
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.55)",
    borderHover: "hover:border-[#F7DF1E]/60",
    bgHover: "hover:bg-[#F7DF1E]/10",
  },
  Python: {
    glow: "rgba(56, 126, 184, 0.55)",
    borderHover: "hover:border-[#387EB8]/60",
    bgHover: "hover:bg-[#387EB8]/10",
    customIcon: (size = "h-4 w-4") => <PythonIcon className={size} />,
  },
  Java: {
    color: "#EA2D2E",
    glow: "rgba(234, 45, 46, 0.55)",
    borderHover: "hover:border-[#EA2D2E]/60",
    bgHover: "hover:bg-[#EA2D2E]/10",
  },
  "C++": {
    color: "#00599C",
    glow: "rgba(0, 89, 156, 0.55)",
    borderHover: "hover:border-[#00599C]/60",
    bgHover: "hover:bg-[#00599C]/10",
  },
  C: {
    color: "#659AD2",
    glow: "rgba(101, 154, 210, 0.55)",
    borderHover: "hover:border-[#659AD2]/60",
    bgHover: "hover:bg-[#659AD2]/10",
  },
  PostgreSQL: {
    color: "#4169E1",
    glow: "rgba(65, 105, 225, 0.55)",
    borderHover: "hover:border-[#4169E1]/60",
    bgHover: "hover:bg-[#4169E1]/10",
  },
  MongoDB: {
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.55)",
    borderHover: "hover:border-[#47A248]/60",
    bgHover: "hover:bg-[#47A248]/10",
  },
  MySQL: {
    color: "#00758F",
    glow: "rgba(0, 117, 143, 0.55)",
    borderHover: "hover:border-[#00758F]/60",
    bgHover: "hover:bg-[#00758F]/10",
  },
  "Prisma ORM": {
    color: "#5A67D8",
    glow: "rgba(90, 103, 216, 0.55)",
    borderHover: "hover:border-[#5A67D8]/60",
    bgHover: "hover:bg-[#5A67D8]/10",
  },
  "Tailwind CSS": {
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.55)",
    borderHover: "hover:border-[#06B6D4]/60",
    bgHover: "hover:bg-[#06B6D4]/10",
  },
  "AI & APIs": {
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.55)",
    borderHover: "hover:border-[#A855F7]/60",
    bgHover: "hover:bg-[#A855F7]/10",
  },
  Flask: {
    color: "#01949A",
    glow: "rgba(1, 148, 154, 0.55)",
    borderHover: "hover:border-[#01949A]/60",
    bgHover: "hover:bg-[#01949A]/10",
  },
  Netlify: {
    color: "#00C7B7",
    glow: "rgba(0, 199, 183, 0.55)",
    borderHover: "hover:border-[#00C7B7]/60",
    bgHover: "hover:bg-[#00C7B7]/10",
  },
  n8n: {
    color: "#EA4B71",
    glow: "rgba(234, 75, 113, 0.55)",
    borderHover: "hover:border-[#EA4B71]/60",
    bgHover: "hover:bg-[#EA4B71]/10",
  },
};

function groupSkills(skills: skillsInterface[]) {
  const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C"];
  const frameworks = ["Next.js", "React", "Node.js", "Express.js", "Flask"];
  const tools = ["Docker", "Git ", "Prisma ORM", "Tailwind CSS", "n8n", "AI & APIs"];
  const cloud = ["AWS", "Netlify", "PostgreSQL", "MongoDB", "MySQL"];

  const categorize = (names: string[]) =>
    skills.filter((s) => names.some((n) => s.name.trim() === n.trim()));

  return [
    {
      label: "Languages",
      icon: <Code2 className="h-4 w-4 text-amber-500" />,
      tag: "Core Syntax & Compilers",
      skills: categorize(languages),
    },
    {
      label: "Frameworks & Runtimes",
      icon: <Cpu className="h-4 w-4 text-cyan-500" />,
      tag: "Full-Stack & APIs",
      skills: categorize(frameworks),
    },
    {
      label: "DevOps & Tooling",
      icon: <Terminal className="h-4 w-4 text-purple-500" />,
      tag: "CI/CD & Automation",
      skills: categorize(tools),
    },
    {
      label: "Cloud & Databases",
      icon: <Database className="h-4 w-4 text-emerald-500" />,
      tag: "Infrastructure & Stores",
      skills: categorize(cloud),
    },
  ].filter((g) => g.skills.length > 0);
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const groups = groupSkills(skills);
  const allSkills = groups.flatMap((g) => g.skills);

  const half = Math.ceil(allSkills.length / 2);

  // Prepare colorful marquee rows with glowing styles
  const createMarqueeItem = (skill: skillsInterface) => {
    const Icon = skill.icon;
    const cleanName = skill.name.trim();
    const style = skillStyles[cleanName] || skillStyles[skill.name] || {};

    return {
      name: cleanName,
      icon: style.customIcon ? (
        style.customIcon("h-8 w-8 sm:h-9 sm:w-9")
      ) : (
        <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
      ),
      color: style.color,
      glow: style.glow,
      className: style.className,
    };
  };

  const row1 = allSkills.slice(0, half).map(createMarqueeItem);
  const row2 = allSkills.slice(half).map(createMarqueeItem);

  return (
    <section className="space-y-10 sm:space-y-12">
      {/* ── 1. CATEGORIZED BENTO GRID WITH COLORFUL BRAND CHIPS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {groups.map((group) => (
          <div
            key={group.label}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/75 to-zinc-50/80 p-5 sm:p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80 dark:hover:border-zinc-700"
          >
            {/* Header with Group Icon and Tag */}
            <div className="flex items-center justify-between border-b border-zinc-200/70 pb-3 dark:border-zinc-800/70">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
                  {group.icon}
                </div>
                <h3 className="font-heading text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                  {group.label}
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                {group.tag}
              </span>
            </div>

            {/* Colorful Brand Skill Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const Icon = skill.icon;
                const cleanName = skill.name.trim();
                const style = skillStyles[cleanName] || skillStyles[skill.name] || {};

                return (
                  <div
                    key={skill.name}
                    className={cn(
                      "group/chip inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-1.5 text-xs font-mono font-medium text-zinc-700 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 select-none cursor-pointer dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200",
                      style.borderHover,
                      style.bgHover
                    )}
                    style={{
                      "--chip-glow": style.glow || "rgba(255,255,255,0.3)",
                    } as React.CSSProperties}
                  >
                    {/* Colorful Icon with Glow */}
                    <div
                      className={cn(
                        "flex items-center justify-center transition-transform duration-200 group-hover/chip:scale-110",
                        style.className
                      )}
                      style={{
                        color: style.color,
                        filter: "drop-shadow(0 0 0px transparent)",
                      }}
                    >
                      {style.customIcon ? (
                        style.customIcon("h-4 w-4")
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="group-hover/chip:text-zinc-950 dark:group-hover/chip:text-white transition-colors">
                      {cleanName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. CONTINUOUS COLORFUL MARQUEE TECH STREAM ── */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/90 via-white/75 to-zinc-50/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-zinc-800/90 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950/80">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-200/70 pb-4 dark:border-zinc-800/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <h3 className="font-heading text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                Continuous Technical Pipeline
              </h3>
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Interactive stream of production tools, compilers, and cloud infrastructure. Hover to inspect brand telemetry.
            </p>
          </div>
          <span className="font-mono text-[11px] text-zinc-400">
            {allSkills.length} Total Technologies
          </span>
        </div>

        {/* Dual-Direction Infinite Moving Stream */}
        <div className="space-y-4 overflow-hidden py-2">
          {/* Row 1 — Moving Left */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent" />
            <InfiniteMovingCards items={row1} direction="left" speed="slow" variant="clean" />
          </div>

          {/* Row 2 — Moving Right */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent" />
            <InfiniteMovingCards items={row2} direction="right" speed="slow" variant="clean" />
          </div>
        </div>
      </div>
    </section>
  );
}
