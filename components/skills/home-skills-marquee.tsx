"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skills } from "@/config/skills";
import { cn } from "@/lib/utils";

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

const skillStyles: Record<
  string,
  {
    color?: string;
    glow?: string;
    className?: string;
    customIcon?: React.ReactNode;
  }
> = {
  Docker: {
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.45)",
  },
  AWS: {
    color: "#FF9900",
    glow: "rgba(255, 153, 0, 0.45)",
  },
  Git: {
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.45)",
  },
  "Next.js": {
    className: "text-zinc-950 dark:text-white",
    glow: "rgba(255, 255, 255, 0.4)",
  },
  React: {
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.45)",
  },
  "Node.js": {
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.45)",
  },
  "Express.js": {
    className: "text-zinc-800 dark:text-zinc-100",
    glow: "rgba(255, 255, 255, 0.35)",
  },
  TypeScript: {
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.45)",
  },
  JavaScript: {
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.45)",
  },
  Python: {
    glow: "rgba(56, 126, 184, 0.45)",
    customIcon: <PythonIcon className="h-full w-full object-contain" />,
  },
  Java: {
    color: "#EA2D2E",
    glow: "rgba(234, 45, 46, 0.45)",
  },
  "C++": {
    color: "#00599C",
    glow: "rgba(0, 89, 156, 0.45)",
  },
  C: {
    color: "#659AD2",
    glow: "rgba(101, 154, 210, 0.45)",
  },
  PostgreSQL: {
    color: "#4169E1",
    glow: "rgba(65, 105, 225, 0.45)",
  },
  MongoDB: {
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.45)",
  },
  MySQL: {
    color: "#00758F",
    glow: "rgba(0, 117, 143, 0.45)",
  },
  "Prisma ORM": {
    color: "#5A67D8",
    glow: "rgba(90, 103, 216, 0.45)",
  },
  "Tailwind CSS": {
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.45)",
  },
  "AI & APIs": {
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.45)",
  },
  Flask: {
    color: "#01949A",
    glow: "rgba(1, 148, 154, 0.45)",
  },
  Netlify: {
    color: "#00C7B7",
    glow: "rgba(0, 199, 183, 0.45)",
  },
  n8n: {
    color: "#EA4B71",
    glow: "rgba(234, 75, 113, 0.45)",
  },
};

export function HomeSkillsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Grouped for seamless continuous stream
  const doubledSkills = [...skills, ...skills];

  return (
    <section
      className="relative py-12 sm:py-16 overflow-hidden select-none"
      aria-label="Skills & Technologies Marquee"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/80 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Tech I Work With
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl">
              Languages, distributed systems, modern web frameworks, and AI inference engines.
            </p>
          </div>

          <Link
            href="/skills"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline w-fit"
          >
            <span>View Full Matrix</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Marquee Track with Feathered Fades */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/90 to-transparent" />

        {/* Continuous Floating Ribbon */}
        <div
          className="flex w-max items-center gap-8 sm:gap-12 md:gap-16 py-4 animate-scroll"
          style={{
            "--animation-duration": "45s",
            "--animation-direction": "forwards",
            animationPlayState: isPaused ? "paused" : "running",
          } as React.CSSProperties}
        >
          {doubledSkills.map((skill, idx) => {
            const Icon = skill.icon;
            const style = skillStyles[skill.name] || skillStyles[skill.name.trim()] || {};

            return (
              <div
                key={`${skill.name}-${idx}`}
                className="group relative flex flex-col items-center gap-2.5 shrink-0 cursor-pointer transition-all duration-300"
              >
                {/* Floating Icon Frame with Original Brand Colors */}
                <div
                  className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-border/80 bg-surface/80 p-3 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-surface"
                  style={{
                    borderColor: style.color ? `${style.color}40` : undefined,
                    boxShadow: style.glow
                      ? undefined
                      : undefined,
                  }}
                >
                  {/* Brand Colored Icon with Glow on Hover */}
                  <div
                    className={cn(
                      "h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                      style.className
                    )}
                    style={{
                      color: style.color,
                      filter: style.glow
                        ? undefined
                        : undefined,
                    }}
                  >
                    {style.customIcon || (
                      <Icon className="h-full w-full object-contain" />
                    )}
                  </div>

                  {/* Subtle inner ring highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 dark:ring-white/5" />
                </div>

                {/* Crisp Typography Label */}
                <span className="font-heading text-xs font-semibold tracking-tight text-text-muted transition-colors duration-200 group-hover:text-text">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
