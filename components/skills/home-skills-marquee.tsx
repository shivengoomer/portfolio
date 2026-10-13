"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { skills } from "@/config/skills";

export function HomeSkillsMarquee() {
  const items = skills.map((skill) => {
    const Icon = skill.icon;
    return {
      name: skill.name,
      icon: <Icon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />,
      className: "text-text-muted hover:text-accent transition-colors",
    };
  });

  return (
    <section className="relative py-14 sm:py-16" aria-label="Featured skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 px-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
              Skills
            </p>

            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-text">
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
