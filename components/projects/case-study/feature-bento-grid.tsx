"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Layers,
  Code2,
  Zap,
  Globe,
  BarChart3,
  ScanLine,
  Monitor,
  Sparkles,
  CheckCircle2,
  Brain,
  ShieldAlert,
  FileSearch,
  MessageCircle,
  CandlestickChart,
} from "lucide-react";
import { CaseStudyFeature } from "@/config/case-study-data";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Code2,
  Zap,
  Globe,
  BarChart3,
  ScanLine,
  Monitor,
  Sparkles,
  CheckCircle2,
  Brain,
  ShieldAlert,
  FileSearch,
  MessageCircle,
  CandlestickChart,
};

interface FeatureBentoGridProps {
  features: CaseStudyFeature[];
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeatureBentoGrid({ features }: FeatureBentoGridProps) {
  if (!features || features.length === 0) return null;

  // Map features to bento slots: [wide, normal, normal, wide]
  const slots = features.slice(0, 4);

  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            What it does
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold uppercase text-text">
            Key Features
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {slots.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Layers;
            const isWide = feature.span === "wide" || i === 0 || i === 3;

            return (
              <motion.div
                key={feature.title}
                variants={item}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(242,92,42,0.08)]",
                  isWide ? "sm:col-span-2 lg:col-span-2" : "col-span-1"
                )}
              >
                {/* Screenshot / visual area */}
                {feature.image ? (
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-surface-2">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="flex h-36 items-center justify-center bg-surface-2">
                    <Icon className="h-14 w-14 text-accent/20" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                    </span>
                    <h3 className="font-heading text-base font-bold uppercase text-text">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </div>

                {/* Accent corner glow on hover */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
