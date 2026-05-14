"use client";

import PageContainer from "@/components/common/page-container";
import SkillsCard from "@/components/skills/skills-card";
import { skills } from "@/config/skills";

export default function SkillsPage() {
  return (
    <PageContainer
      title="Skills"
      description="Key skills that define my professional identity."
    >
      <SkillsCard skills={skills} />
    </PageContainer>
  );
}
