"use client";

import { motion } from "framer-motion";
import { OutcomeMetric } from "@/config/case-study-data";

interface OutcomeMetricsProps {
  outcomes: OutcomeMetric[];
}

export default function OutcomeMetrics({ outcomes }: OutcomeMetricsProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section id="outcomes" className="py-16 sm:py-20 border-t border-border">
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
            Outcomes
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold uppercase text-text">
            Results
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-surface p-6 space-y-2 hover:border-accent/30 transition-colors duration-200"
            >
              <div className="font-heading text-5xl sm:text-6xl font-extrabold text-accent leading-none">
                {metric.value}
              </div>
              <div className="font-semibold text-text text-sm">{metric.label}</div>
              {metric.note && (
                <div className="font-mono text-[11px] text-text-muted">{metric.note}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
