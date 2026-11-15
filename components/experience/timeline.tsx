"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { type ExperienceInterface } from "@/config/experience";
import { cn } from "@/lib/utils";

const formatDate = (date: Date | "Present") => typeof date === "string" ? date : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
const duration = (experience: ExperienceInterface) => `${formatDate(experience.startDate)} — ${formatDate(experience.endDate)}`;

function CompanyMark({ experience, large = false }: { experience: ExperienceInterface; large?: boolean }) {
  return <div className={cn("grid shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/25", large ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12 sm:h-14 sm:w-14")}>
    {experience.logo ? <Image src={experience.logo} alt={`${experience.company} logo`} width={large ? 76 : 42} height={large ? 76 : 42} className={cn("object-contain", large ? "h-14 w-14 sm:h-16 sm:w-16" : "h-9 w-9")} /> : <span className="font-heading text-xl text-accent">SG</span>}
  </div>;
}

function FeaturedRole({ experience }: { experience: ExperienceInterface }) {
  const reduceMotion = useReducedMotion();
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#180a11] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:p-10">
    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
    <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div>
        <div className="flex items-center gap-4"><CompanyMark experience={experience} large /><div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Current chapter</p><p className="mt-1 text-sm text-text-muted">{experience.company} · {experience.location}</p></div></div>
        <h2 className="mt-8 max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-text sm:text-5xl">{experience.position}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">{experience.description[0]}</p>
      </div>
      <div className="border-l-0 border-white/10 pt-2 lg:border-l lg:pl-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#8fdda9]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7FD6A0]" />{duration(experience)}</p>
        <div className="mt-8 space-y-3 border-y border-white/10 py-5">{experience.achievements.slice(0, 2).map((achievement) => <p key={achievement} className="text-sm leading-relaxed text-text-muted">{achievement}</p>)}</div>
        <Link href={`/experience/${experience.id}`} className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Read the full role <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </div>
  </motion.article>;
}

function RoleRow({ experience, index }: { experience: ExperienceInterface; index: number }) {
  const reduceMotion = useReducedMotion();
  const isCommunity = experience.category === "Community";
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: Math.min(index * 0.06, 0.24), duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="group relative grid gap-5 border-b border-white/10 px-2 py-7 transition-colors hover:bg-[#240e17] sm:grid-cols-[64px_minmax(180px,0.8fr)_1.3fr_auto] sm:items-center sm:gap-6 sm:px-5 sm:py-8">
    <CompanyMark experience={experience} />
    <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{isCommunity ? "Community / leadership" : "Engineering / delivery"}</p><h3 className="mt-2 font-heading text-2xl font-bold uppercase leading-none tracking-tight text-text">{experience.position}</h3><p className="mt-2 text-sm text-text-muted">{experience.company} · {experience.location}</p></div>
    <p className="max-w-xl text-sm leading-relaxed text-text-muted">{experience.description[0]}</p>
    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end"><span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{duration(experience)}</span><Link href={`/experience/${experience.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Details <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
  </motion.article>;
}

export default function Timeline({ experiences }: { experiences: ExperienceInterface[] }) {
  const [lead, ...roles] = experiences;
  if (!lead) return null;
  return <div className="space-y-16 sm:space-y-20"><FeaturedRole experience={lead} /><section><div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"><h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Previous chapters</h2><span className="font-mono text-xs text-text-muted">{String(roles.length).padStart(2, "0")} / ROLES</span></div><div className="border-t border-white/10">{roles.map((experience, index) => <RoleRow key={experience.id} experience={experience} index={index} />)}</div></section></div>;
}
