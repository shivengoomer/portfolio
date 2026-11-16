"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, Cloud, Cpu, Database } from "lucide-react";

import { type skillsInterface } from "@/config/skills";
import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = { JavaScript: "#F7DF1E", TypeScript: "#3178C6", Python: "#4B8BBE", Java: "#EA2D2E", "C++": "#00599C", C: "#659AD2", React: "#61DAFB", "Next.js": "#FDF9E7", "Node.js": "#5FA04E", "Express.js": "#FDF9E7", Flask: "#16A3A5", Docker: "#2496ED", Git: "#F05032", "Prisma ORM": "#5A67D8", "Tailwind CSS": "#06B6D4", n8n: "#EA4B71", "AI & APIs": "#A855F7", AWS: "#FF9900", Netlify: "#00C7B7", PostgreSQL: "#4169E1", MongoDB: "#47A248", MySQL: "#00758F" };
const GROUPS = [
  { title: "Languages", note: "The foundations", icon: Braces, names: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C"] },
  { title: "Product engineering", note: "Interfaces, APIs, systems", icon: Cpu, names: ["Next.js", "React", "Node.js", "Express.js", "Flask", "AI & APIs"] },
  { title: "Delivery", note: "Tools that get work shipped", icon: Cloud, names: ["Docker", "Git", "Prisma ORM", "Tailwind CSS", "n8n", "AWS", "Netlify"] },
  { title: "Data", note: "Reliable systems of record", icon: Database, names: ["PostgreSQL", "MongoDB", "MySQL"] },
];

export default function SkillsCard({ skills }: { skills: skillsInterface[] }) {
  const reduceMotion = useReducedMotion();
  return <div className="space-y-12 sm:space-y-16">{GROUPS.map((group, groupIndex) => {
    const Icon = group.icon;
    const members = group.names.map((name) => skills.find((skill) => skill.name.trim() === name)).filter(Boolean) as skillsInterface[];
    return <motion.section key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ delay: groupIndex * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}><div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent"><Icon className="h-4 w-4" /></span><div><h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-text sm:text-3xl">{group.title}</h2><p className="mt-0.5 text-sm text-text-muted">{group.note}</p></div></div><span className="font-mono text-xs text-text-muted">{String(members.length).padStart(2, "0")}</span></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-3">{members.map((skill, index) => { const SkillIcon = skill.icon; const color = COLORS[skill.name.trim()] || "#F25C2A"; return <motion.article key={skill.name} whileHover={reduceMotion ? {} : { y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group relative min-h-[148px] overflow-hidden rounded-2xl border border-white/10 bg-[#180a11] p-4 transition-colors hover:border-white/20 sm:min-h-[168px] sm:p-5"><div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" style={{ backgroundColor: color }} /><div className="relative flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/20 sm:h-11 sm:w-11" style={{ color }}><SkillIcon className="h-5 w-5 sm:h-6 sm:w-6" /></span><span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">0{index + 1}</span></div><h3 className="relative mt-4 font-heading text-lg font-bold tracking-tight text-text sm:mt-5 sm:text-xl">{skill.name.trim()}</h3><p className="relative mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">{skill.description}</p></motion.article>; })}</div></motion.section>;
  })}</div>;
}
