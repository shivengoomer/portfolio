"use client";

import { skillsInterface } from "@/config/skills";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface SkillsCardProps {
  skills: skillsInterface[];
}

// Group skills by category
function groupSkills(skills: skillsInterface[]) {
  const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C"];
  const frameworks = ["Next.js", "React", "Node.js", "Express.js", "Flask"];
  const tools = ["Docker", "Git ", "Prisma ORM", "Tailwind CSS", "n8n", "AI & APIs"];
  const cloud = ["AWS", "Netlify", "PostgreSQL", "MongoDB", "MySQL"];

  const categorize = (names: string[]) =>
    skills.filter((s) => names.some((n) => s.name.trim() === n.trim()));

  return [
    { label: "Languages", skills: categorize(languages) },
    { label: "Frameworks", skills: categorize(frameworks) },
    { label: "Tools", skills: categorize(tools) },
    { label: "Cloud & Databases", skills: categorize(cloud) },
  ].filter((g) => g.skills.length > 0);
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const groups = groupSkills(skills);
  const allSkills = groups.flatMap((g) => g.skills);

  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half).map((skill) => ({
    name: skill.name,
    icon: <skill.icon className="w-8 h-8" />,
    brandColor: [37, 99, 235],
  }));
  const row2 = allSkills.slice(half).map((skill) => ({
    name: skill.name,
    icon: <skill.icon className="w-8 h-8" />,
    brandColor: [16, 185, 129],
  }));

  return (
    <section className="space-y-8">
      {/* Grouped skill pills */}
      <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="grid gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      <Icon className="h-4 w-4" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee — slowed to ~40s */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 px-4 py-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 sm:px-6 sm:py-10">
        <div className="mb-4 max-w-2xl px-2">
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Strong frontend craft, reliable backend delivery, and practical
            tooling across modern JavaScript and cloud workflows.
          </p>
        </div>
        <div className="z-20 flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
          <InfiniteMovingCards items={row1} direction="left" speed="slow" />
          <InfiniteMovingCards items={row2} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  );
}
