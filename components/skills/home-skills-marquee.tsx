"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { skills } from "@/config/skills";

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
    glow: "rgba(36, 150, 237, 0.55)",
  },
  AWS: {
    color: "#FF9900",
    glow: "rgba(255, 153, 0, 0.55)",
  },
  Git: {
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.55)",
  },
  "Next.js": {
    className: "text-zinc-950 dark:text-white",
    glow: "rgba(255, 255, 255, 0.45)",
  },
  React: {
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.55)",
  },
  "Node.js": {
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.55)",
  },
  "Express.js": {
    className: "text-zinc-800 dark:text-zinc-100",
    glow: "rgba(255, 255, 255, 0.4)",
  },
  TypeScript: {
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.55)",
  },
  JavaScript: {
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.55)",
  },
  Python: {
    glow: "rgba(56, 126, 184, 0.55)",
    customIcon: <PythonIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />,
  },
  Java: {
    color: "#EA2D2E",
    glow: "rgba(234, 45, 46, 0.55)",
  },
  "C++": {
    color: "#00599C",
    glow: "rgba(0, 89, 156, 0.55)",
  },
  C: {
    color: "#659AD2",
    glow: "rgba(101, 154, 210, 0.55)",
  },
  PostgreSQL: {
    color: "#4169E1",
    glow: "rgba(65, 105, 225, 0.55)",
  },
  MongoDB: {
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.55)",
  },
  MySQL: {
    color: "#00758F",
    glow: "rgba(0, 117, 143, 0.55)",
  },
  "Prisma ORM": {
    color: "#5A67D8",
    glow: "rgba(90, 103, 216, 0.55)",
  },
  "Tailwind CSS": {
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.55)",
  },
  "AI & APIs": {
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.55)",
  },
  Flask: {
    color: "#01949A",
    glow: "rgba(1, 148, 154, 0.55)",
  },
  Netlify: {
    color: "#00C7B7",
    glow: "rgba(0, 199, 183, 0.55)",
  },
  n8n: {
    color: "#EA4B71",
    glow: "rgba(234, 75, 113, 0.55)",
  },
};

export function HomeSkillsMarquee() {
  const items = skills.map((skill) => {
    const Icon = skill.icon;
    const style = skillStyles[skill.name] || skillStyles[skill.name.trim()] || {};

    return {
      name: skill.name,
      icon: style.customIcon || (
        <Icon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
      ),
      color: style.color,
      glow: style.glow,
      className: style.className,
    };
  });

  return (
    <section className="relative py-14 sm:py-16" aria-label="Featured skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 px-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Skills
            </p>

            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Tech I work with
            </h2>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background via-background/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background via-background/95 to-transparent" />

        <div className="mx-auto max-w-none px-0">
          <InfiniteMovingCards
            items={items}
            direction="left"
            speed="super-slow"
            className="max-w-none py-2"
            variant="clean"
          />
        </div>
      </div>
    </section>
  );
}
