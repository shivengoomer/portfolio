"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type EngineeringDecision } from "@/config/case-study-data";

export default function EngineeringDecisions({ decisions }: { decisions: EngineeringDecision[] }) {
  if (!decisions?.length) return null;
  return <section id="engineering" className="border-t border-border py-16 sm:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10"><span className="font-mono text-[10px] uppercase tracking-widest text-accent">Engineering decisions</span><h2 className="mt-2 font-heading text-3xl font-extrabold uppercase text-text sm:text-4xl">Constraints turned into leverage.</h2></motion.div>
    <div className="grid gap-4 lg:grid-cols-2">{decisions.map((decision, index) => (
      <motion.article key={decision.problem} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-text-muted"><span className="font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span><span>Constraint</span></div>
        <h3 className="text-lg font-semibold leading-snug text-text">{decision.problem}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">{decision.decision}</p>
        <p className="mt-auto pt-5 text-sm font-medium leading-snug text-accent"><ArrowUpRight className="mr-1.5 -mt-0.5 inline h-3.5 w-3.5" />{decision.result}</p>
      </motion.article>
    ))}</div>
  </div></section>;
}
