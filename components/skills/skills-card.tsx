import { skillsInterface } from "@/config/skills";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface SkillsCardProps {
  skills: skillsInterface[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half).map((skill) => ({
    name: skill.name,
    icon: <skill.icon className="w-8 h-8" />,
    brandColor: [37, 99, 235]
  }));
  const row2 = skills.slice(half).map((skill) => ({
    name: skill.name,
    icon: <skill.icon className="w-8 h-8" />,
    brandColor: [16, 185, 129]
  }));

  return (
    <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/75 px-4 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:px-6 sm:py-10">
      <div className="mb-6 max-w-2xl px-2">
        <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          Strong frontend craft, reliable backend delivery, and practical tooling
          across modern JavaScript and cloud workflows.
        </p>
      </div>
      <div className="z-20 flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
      <InfiniteMovingCards items={row1} direction="left" speed="normal" />
      <InfiniteMovingCards items={row2} direction="right" speed="normal" />
      </div>
    </section>
  );
}
