"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EngineeringDecision } from "@/config/case-study-data";
import { cn } from "@/lib/utils";

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[];
}

export default function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!decisions || decisions.length === 0) return null;

  return (
    <section id="engineering" className="py-16 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            Engineering decisions
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold uppercase text-text">
            Key Engineering Challenges
          </h2>
        </motion.div>

        {/* Decision rows */}
        <div className="space-y-3">
          {decisions.map((dec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                {/* Collapsed row */}
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full text-left p-5 flex items-start gap-4 hover:bg-surface-2/50 transition-colors duration-200"
                  aria-expanded={expanded === i}
                >
                  {/* Number */}
                  <span className="font-heading text-2xl font-extrabold text-accent/40 leading-none shrink-0 w-8">
                    0{i + 1}
                  </span>

                  {/* Problem → Decision → Result */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                          Problem
                        </span>
                        <span className="text-sm font-medium text-text leading-snug">
                          {dec.problem}
                        </span>
                      </div>
                      <span className="hidden sm:block text-accent text-lg font-bold shrink-0">
                        →
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                          Decision
                        </span>
                        <span className="text-sm font-medium text-text leading-snug">
                          {dec.decision}
                        </span>
                      </div>
                      <span className="hidden sm:block text-accent text-lg font-bold shrink-0">
                        →
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                          Result
                        </span>
                        <span className="text-sm font-semibold text-accent leading-snug">
                          {dec.result}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand icon */}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 mt-0.5",
                      expanded === i && "rotate-180"
                    )}
                  />
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 ml-12">
                        <div className="h-px bg-border mb-4" />
                        <p className="text-sm leading-relaxed text-text-muted">
                          {dec.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
