"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Zap,
  Globe,
  Mail,
  Layers,
  ShieldCheck,
  FileText,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

type TerminalTab = "status" | "stack" | "quant" | "contact";

function TerminalOutput({ data }: { data: object | string }) {
  if (typeof data === "string") {
    return <span className="text-[#FDF9E7]">{data}</span>;
  }
  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="text-accent shrink-0">&quot;{key}&quot;:</span>
          <span className="text-[#FDF9E7]">
            {Array.isArray(val) ? (
              <span>
                [
                {val.map((item, i) => (
                  <span key={item}>
                    &quot;{item}&quot;{i < val.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]
              </span>
            ) : (
              <span>&quot;{String(val)}&quot;</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BuilderProfileAndCta() {
  // Live ticking IST clock for New Delhi, India
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal active tab state
  const [activeTab, setActiveTab] = useState<TerminalTab>("status");

  // Email copy state
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shivengoomer@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const terminalData: Record<TerminalTab, { command: string; output: object | string }> = {
    status: {
      command: "shiven --status",
      output: {
        availability: "Open to Full-Time Roles & High-Impact Contracts",
        location: "New Delhi, India (Remote Worldwide)",
        specializations: ["Quant Systems", "Distributed Backend", "Generative AI"],
        responseTime: "< 12 Hours",
      },
    },
    stack: {
      command: "shiven --stack --production",
      output: {
        frontend: ["Next.js 14 (App Router)", "React", "TypeScript", "Tailwind CSS"],
        backend: ["FastAPI (Python)", "Node.js", "Express", "REST & WebSockets"],
        dataAndAI: ["PostgreSQL", "Redis", "MongoDB", "FAISS", "Groq LLaMA-3.3"],
        devOps: ["Docker", "BullMQ", "PyTest", "CI/CD Pipelines"],
      },
    },
    quant: {
      command: "shiven --flagship-metric",
      output: {
        project: "Nifty50 Market Intelligence",
        latency: "< 50ms Real-Time WebSocket Order Book",
        coverage: "Complete NIFTY 50 Universe",
        highlights: ["TradingView Charts", "Level-2 Market Depth", "Factor Models"],
      },
    },
    contact: {
      command: "shiven --contact-direct",
      output: {
        email: "shivengoomer@gmail.com",
        github: "github.com/shivengoomer",
        linkedin: "linkedin.com/in/shiven-goomer",
        calendly: "Available upon email request",
      },
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── 1. BUILDER PROFILE & ENGINEERING DNA BENTO ── */}
      <section
        id="about"
        className="px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-title"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
              Engineering DNA & Profile
            </p>
          </motion.div>

          {/* 12-Column Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Left Card: Builder Philosophy & Core Pillars (7 cols) */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="editorial-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-7 lg:p-9"
            >
              <div className="relative z-10 space-y-6">
                <div>
                  <h2
                    id="about-title"
                    className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text"
                  >
                    Building systems that scale & endure
                  </h2>
                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-text-muted">
                    I live at the intersection of quantitative rigor, distributed systems, and calm, high-precision product design. I treat performance, reliability, and human ergonomics as equal first-class constraints.
                  </p>
                </div>

                {/* 3 Core Operating Pillars */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-border bg-surface-2 p-3.5 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-heading text-xs font-bold text-text uppercase tracking-wider">
                      Sub-50ms Latency
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-text-muted">
                      Streaming WebSockets, Redis cache clusters, and async queue workers.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-border bg-surface-2 p-3.5 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-heading text-xs font-bold text-text uppercase tracking-wider">
                      Production AI
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-text-muted">
                      Groq LLaMA-3.3, FAISS embeddings, and automated grading pipelines.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-border bg-surface-2 p-3.5 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-heading text-xs font-bold text-text uppercase tracking-wider">
                      Human Craft
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-text-muted">
                      Fluid Framer Motion physics, accessibility, and pixel precision.
                    </p>
                  </motion.div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-2 pt-1">
                  <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Primary Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Next.js 14",
                      "TypeScript",
                      "FastAPI",
                      "Python",
                      "Node.js",
                      "TradingView",
                      "Redis & BullMQ",
                      "Docker",
                    ].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded-md border border-border bg-surface-2 px-2.5 py-1 font-sans text-xs font-medium text-text-muted transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Attribution Line */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-border pt-4 font-sans text-[11px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span>Est. 2024 · B.Tech Information Technology</span>
                </span>
                <span>Full-Stack & Quant Engineer</span>
              </div>
            </motion.article>

            {/* Right Card: Live Workstation Telemetry & Interactive Terminal (5 cols) */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="editorial-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 lg:col-span-5"
            >
              <div className="relative z-10 space-y-5">
                {/* Live Status Header & Ticking Clock */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface-2 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                    </span>
                    <div>
                      <div className="font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-text">
                        AVAILABLE FOR ROLES
                      </div>
                      <div className="text-[11px] text-text-muted">
                        New Delhi, India
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-text">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span>{localTime || "11:51:00 PM"}</span>
                    <span className="text-[9px] text-text-muted">IST</span>
                  </div>
                </div>

                {/* Interactive Developer CLI Terminal: dark in BOTH themes */}
                <div className="overflow-hidden rounded-2xl border border-[#3A2530] bg-[#120912] shadow-2xl">
                  {/* macOS Terminal Title Bar */}
                  <div className="flex h-9 items-center justify-between border-b border-[#3A2530] bg-[#120912] px-3.5">
                    <div className="flex items-center gap-1.5 opacity-40">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
                      <Terminal className="h-3 w-3 text-accent" />
                      <span>shiven-cli v2.4</span>
                    </div>
                    <span className="font-mono text-[9px] text-text-muted">zsh</span>
                  </div>

                  {/* Terminal Tabs */}
                  <div className="flex items-center gap-1 border-b border-[#3A2530] bg-[#120912] p-1.5">
                    {(["status", "stack", "quant", "contact"] as TerminalTab[]).map((tab) => (
                      <motion.button
                        key={tab}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative rounded px-2.5 py-1 font-mono text-[10px] font-medium transition-colors",
                          activeTab === tab
                            ? "text-[#FDF9E7]"
                            : "text-text-muted hover:text-[#FDF9E7]"
                        )}
                      >
                        {activeTab === tab && (
                          <motion.span
                            layoutId="terminal-tab-pill"
                            className="absolute inset-0 rounded bg-accent"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">--{tab}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Terminal Command & JSON Output */}
                  <div className="p-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">$</span>
                      <span className="text-[#FDF9E7]">{terminalData[activeTab].command}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="mt-3 rounded-lg bg-[#170A10] p-2.5 text-[11px] leading-relaxed border border-[#3A2530]"
                      >
                        <div className="overflow-x-auto font-mono">
                          <TerminalOutput data={terminalData[activeTab].output} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Quick Spec Matrix: Oswald numbers in --text, 2px orange bar on top of tile 1 */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="relative overflow-hidden rounded-xl border border-border bg-surface-2 p-2">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                    <div className="font-heading text-lg font-bold text-text">18+</div>
                    <div className="font-heading text-[10px] font-medium text-text-muted uppercase tracking-[0.1em]">Shipped</div>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2 p-2">
                    <div className="font-heading text-lg font-bold text-text">450+</div>
                    <div className="font-heading text-[10px] font-medium text-text-muted uppercase tracking-[0.1em]">LeetCode</div>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2 p-2">
                    <div className="font-heading text-lg font-bold text-text">100%</div>
                    <div className="font-heading text-[10px] font-medium text-text-muted uppercase tracking-[0.1em]">TypeScript</div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ── 2. HIGH-CONVERSION COLLABORATION COMMAND CENTER (CTA) ── */}
      <section
        id="contact"
        className="px-4 pb-16 sm:px-6 lg:px-8"
        aria-labelledby="contact-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="editorial-card group relative mx-auto max-w-6xl overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content (7 cols) */}
            <div className="space-y-4 lg:col-span-7">
              <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
                Collaboration & Contact
              </p>

              <h2
                id="contact-title"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text"
              >
                Let&apos;s build something extraordinary
              </h2>

              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-text-muted">
                Whether you&apos;re architecting a low-latency trading engine, launching an AI product, or looking for an engineer who executes with speed and taste—my inbox is open.
              </p>

              {/* Instant 1-Click Email Copy Capsule */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface-2 p-2 shadow-sm">
                  <span className="px-3 font-mono text-xs font-semibold text-text">
                    shivengoomer@gmail.com
                  </span>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-[12px] bg-accent px-3.5 py-2 font-sans text-xs font-semibold text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] transition-all hover:brightness-110 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#FDF9E7]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    href="mailto:shivengoomer@gmail.com"
                    className="rounded-[12px] border border-border bg-surface p-2 text-text hover:bg-surface-2 transition-colors"
                    title="Send Email Directly"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>

              {/* Response & Location Guarantee Metrics */}
              <div className="flex flex-wrap items-center gap-4 pt-1 font-sans text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  <span>Guaranteed reply &lt; 12h</span>
                </div>
                <span className="text-border">·</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-accent" />
                  <span>Remote Worldwide / Hybrid</span>
                </div>
              </div>
            </div>

            {/* Right Action Matrix (5 cols) */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact"
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-[12px] bg-accent px-6 font-sans text-sm font-semibold text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] transition-all hover:brightness-110 active:scale-95"
                >
                  <span className="py-3">Start a Conversation</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/resume"
                    target="_blank"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-border bg-transparent px-4 font-sans text-xs font-semibold text-text shadow-sm transition-all hover:bg-surface-2 active:scale-95"
                  >
                    <FileText className="h-3.5 w-3.5 text-accent" />
                    <span>Resume (PDF)</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-border bg-transparent px-4 font-sans text-xs font-semibold text-text shadow-sm transition-all hover:bg-surface-2 active:scale-95"
                  >
                    <Icons.gitHub className="h-3.5 w-3.5" />
                    <span>GitHub Profile</span>
                  </a>
                </motion.div>
              </div>

              {/* Connected Social Dock */}
              <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-2 p-3">
                <span className="font-sans text-[11px] font-medium text-text-muted">
                  Connect on Platforms:
                </span>
                <div className="flex items-center gap-2">
                  {SocialLinks.map((s) => (
                    <motion.a
                      key={s.name}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      title={s.name}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent"
                    >
                      <s.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
