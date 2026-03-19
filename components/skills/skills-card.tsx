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
    <div className="flex flex-col items-center justify-center w-full py-10 gap-8 overflow-hidden z-20">
      <InfiniteMovingCards items={row1} direction="left" speed="normal" />
      <InfiniteMovingCards items={row2} direction="right" speed="normal" />
    </div>
  );
}
