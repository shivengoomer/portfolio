"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { type EngineeringDecision } from "@/config/case-study-data";
import { cn } from "@/lib/utils";

export default function EngineeringDecisions({ decisions }: { decisions: EngineeringDecision[] }) {
  if (!decisions?.length) return null;
  return <section id="engineering" className="border-t border-border py-16 sm:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10"><span className="font-mono text-[10px] uppercase tracking-widest text-accent">Engineering decisions</span><h2 className="mt-2 font-heading text-3xl font-extrabold uppercase text-text sm:text-4xl">Constraints turned into leverage.</h2></motion.div>
    <div className="grid gap-4 lg:grid-cols-2">{decisions.map((decision, index) => <motion.article key={decision.problem} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_44px_rgba(242,92,42,0.1)]"><div className="p-6"><div className="mb-5 flex items-center justify-between"><span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">0{index + 1} / DECISION</span></div><div className="flex gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10"><Lightbulb className="h-4 w-4 text-accent" /></span><div><p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Constraint</p><h3 className="mt-1 text-base font-semibold leading-snug text-text">{decision.problem}</h3></div></div><div className="ml-11 mt-5 border-l border-accent/30 pl-4"><p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Move</p><p className="mt-1 text-sm leading-relaxed text-text-muted">{decision.decision}</p></div><div className="ml-11 mt-4 rounded-xl border border-accent/15 bg-accent/8 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-accent">Outcome</p><p className="mt-1 text-sm font-semibold leading-relaxed text-accent">{decision.result}</p></div></div><div className="border-t border-border bg-surface-2/30 px-6 py-5"><p className="font-mono text-[10px] uppercase tracking-widest text-accent">Implementation detail</p><p className="mt-2 text-sm leading-relaxed text-text-muted"><ArrowUpRight className="mr-2 inline h-3.5 w-3.5 text-accent" />{decision.detail}</p></div></motion.article>)}</div>
  </div></section>;
}
