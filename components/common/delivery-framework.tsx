"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { experiences, type ExperienceInterface } from "@/config/experience";

const formatDate = (date: Date | "Present") => typeof date === "string" ? date : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
const dateRange = (item: ExperienceInterface) => `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`;
const accents = ["#FF7A45", "#FFB067", "#D78CFF", "#FFD166", "#6FD6E8"];

function TimelineEntry({ item, index, expanded, onToggle }: { item: ExperienceInterface; index: number; expanded: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const accent = accents[index % accents.length];
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ delay: Math.min(index * 0.06, 0.25), duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="group relative grid grid-cols-[52px_1fr] gap-5 py-6 first:pt-1 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-7 sm:py-10">
    <div className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[#16090f] p-2.5 shadow-[0_10px_22px_rgba(0,0,0,0.3)] sm:h-14 sm:w-14"><span className="absolute -left-px inset-y-3 w-0.5 rounded-r" style={{ backgroundColor: accent }} />{item.logo ? <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} className="h-full w-full object-contain" /> : <span className="font-heading text-sm" style={{ color: accent }}>SG</span>}</div>
    <div className="min-w-0"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"><div><h3 className="font-heading text-2xl font-bold tracking-[-0.03em] text-text sm:text-3xl">{item.position}</h3><p className="mt-1 text-base text-text-muted sm:text-lg">{item.company}<span className="hidden sm:inline"><span className="mx-1.5 text-white/20">·</span>{item.category || "Engineering"}</span></p></div><p className="order-first font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted sm:order-none sm:whitespace-nowrap">{dateRange(item)}</p></div><p className="mt-6 hidden max-w-4xl text-base leading-relaxed text-text-muted sm:block sm:text-lg">{item.description[0]}</p><button type="button" onClick={onToggle} aria-expanded={expanded} className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mt-5" style={{ color: expanded ? accent : undefined }}><span>{expanded ? "Less" : "More"}</span><ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} /></button><AnimatePresence>{expanded && <motion.div initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><div className="mt-6 border-l border-white/10 pl-5 sm:pl-6"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Selected outcomes</p><ul className="mt-4 space-y-3">{item.achievements.slice(0, 3).map((achievement, achievementIndex) => <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-text-muted sm:text-base"><span className="font-mono text-xs" style={{ color: accent }}>{String(achievementIndex + 1).padStart(2, "0")}</span><span>{achievement}</span></li>)}</ul><Link href={`/experience/${item.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent">View role detail <ArrowUpRight className="h-4 w-4" /></Link></div></motion.div>}</AnimatePresence></div>
    <div className="hidden self-center sm:block"><Link href={`/experience/${item.id}`} aria-label={`View ${item.position} details`} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-text-muted transition-all hover:border-accent hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ArrowUpRight className="h-4 w-4" /></Link></div>
  </motion.article>;
}

export function DeliveryFramework() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const roles = showAll ? experiences : experiences.slice(0, 3);
  return <section id="experience" className="retro-surface career-history relative overflow-hidden px-4 py-12 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="experience-heading">
    <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,122,69,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
    <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#ff7a45]/10 blur-[100px]" />
    <div className="relative mx-auto max-w-6xl">
      <header className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-8">
        <div>
          <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff9a70]"><span className="career-pulse relative flex h-2.5 w-2.5" aria-hidden="true"><span className="career-pulse-ring absolute inset-0 rounded-full bg-[#ff7a45]" /><span className="relative m-[3px] h-1 w-1 rounded-full bg-[#ffe0d1]" /></span>Career / engineering history</p>
          <h2 id="experience-heading" className="mt-3 font-heading text-4xl font-extrabold uppercase tracking-[-0.06em] text-text sm:mt-4 sm:text-6xl">Experience.</h2>
          <p className="mt-4 hidden max-w-2xl text-lg leading-relaxed text-text-muted sm:block">The roles where systems shipped, teams moved, and technical work became visible impact.</p>
        </div>
        <Link href="/experience" className="hidden w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:inline-flex">Full archive <ArrowUpRight className="h-3.5 w-3.5" /></Link>
      </header>
      <div className="relative mt-7 sm:mt-14"><div className="absolute bottom-0 left-[25px] top-0 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent sm:left-7" />{roles.map((item, index) => <TimelineEntry key={item.id} item={item} index={index} expanded={openId === item.id} onToggle={() => setOpenId((current) => current === item.id ? null : item.id)} />)}</div>
      {experiences.length > 3 && <button type="button" onClick={() => setShowAll((current) => !current)} className="ml-[52px] mt-5 rounded-full border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:ml-[64px]">{showAll ? "Show less" : `Show more (${experiences.length - 3})`}</button>}
    </div>
  </section>;
}
