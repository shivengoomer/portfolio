"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { skills } from "@/config/skills";

export function HomeSkillsMarquee() {
  const items = skills.map((skill, index) => {
    const Icon = skill.icon;

    const colors = [
      [37, 99, 235], // blue
      [16, 185, 129], // emerald
      [245, 158, 11], // amber
      [225, 29, 72], // rose
    ];

    return {
      name: skill.name,
      icon: <Icon className="h-8 w-8" />,
      brandColor: colors[index % colors.length],
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
          />
        </div>
      </div>
    </section>
  );
}
