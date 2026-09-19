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
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              ENGINEERING DNA & PROFILE
            </span>
          </motion.div>

          {/* 12-Column Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Left Card: Builder Philosophy & Core Pillars (7 cols) */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-8 lg:col-span-7 lg:p-9"
            >
              {/* Subtle Backlight */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-cyan-500/15" />

              <div className="relative z-10 space-y-6">
                <div>
                  <h2
                    id="about-title"
                    className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white"
                  >
                    Building systems that scale & endure
                  </h2>
                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    I live at the intersection of quantitative rigor, distributed systems, and calm, high-precision product design. I treat performance, reliability, and human ergonomics as equal first-class constraints.
                  </p>
                </div>

                {/* 3 Core Operating Pillars */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-zinc-200/80 bg-white/70 p-3.5 transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Sub-50ms Latency
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-zinc-500 dark:text-zinc-400">
                      Streaming WebSockets, Redis cache clusters, and async queue workers.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-zinc-200/80 bg-white/70 p-3.5 transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Production AI
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-zinc-500 dark:text-zinc-400">
                      Groq LLaMA-3.3, FAISS embeddings, and automated grading pipelines.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-zinc-200/80 bg-white/70 p-3.5 transition-all dark:border-zinc-800/80 dark:bg-zinc-900/60"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Human Craft
                    </h3>
                    <p className="mt-1 text-[11px] leading-normal text-zinc-500 dark:text-zinc-400">
                      Fluid Framer Motion physics, accessibility, and pixel precision.
                    </p>
                  </motion.div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-2 pt-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Primary Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Next.js 14", color: "text-zinc-900 dark:text-zinc-100" },
                      { name: "TypeScript", color: "text-blue-500" },
                      { name: "FastAPI", color: "text-teal-500" },
                      { name: "Python", color: "text-amber-500" },
                      { name: "Node.js", color: "text-emerald-500" },
                      { name: "TradingView", color: "text-cyan-500" },
                      { name: "Redis & BullMQ", color: "text-rose-500" },
                      { name: "Docker", color: "text-sky-500" },
                    ].map((tech) => (
                      <motion.span
                        key={tech.name}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded-md border border-zinc-200/80 bg-white/80 px-2.5 py-1 font-mono text-xs font-medium shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-900/80"
                      >
                        <span className={tech.color}>{tech.name}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Attribution Line */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-zinc-200/80 pt-4 font-mono text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 to-zinc-50/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:to-zinc-900/90 sm:p-7 lg:col-span-5"
            >
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-cyan-500/15" />

              <div className="relative z-10 space-y-5">
                {/* Live Status Header & Ticking Clock */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/80 p-3.5 dark:border-zinc-800/80 dark:bg-zinc-900/70">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                        AVAILABLE FOR ROLES
                      </div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        New Delhi, India
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-300">
                    <Clock className="h-3.5 w-3.5 text-cyan-500" />
                    <span>{localTime || "11:51:00 PM"}</span>
                    <span className="text-[9px] text-zinc-400">IST</span>
                  </div>
                </div>

                {/* Interactive Developer CLI Terminal */}
                <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-2xl dark:border-zinc-800">
                  {/* macOS Terminal Title Bar */}
                  <div className="flex h-9 items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3.5 backdrop-blur">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                      <Terminal className="h-3 w-3 text-cyan-400" />
                      <span>shiven-cli v2.4</span>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-500">zsh</span>
                  </div>

                  {/* Terminal Tabs */}
                  <div className="flex items-center gap-1 border-b border-zinc-800/80 bg-zinc-900/50 p-1.5">
                    {(["status", "stack", "quant", "contact"] as TerminalTab[]).map((tab) => (
                      <motion.button
                        key={tab}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative rounded px-2.5 py-1 font-mono text-[10px] font-medium transition-colors",
                          activeTab === tab
                            ? "text-cyan-300"
                            : "text-zinc-400 hover:text-zinc-200"
                        )}
                      >
                        {activeTab === tab && (
                          <motion.span
                            layoutId="terminal-tab-pill"
                            className="absolute inset-0 rounded bg-cyan-500/20 border border-cyan-500/40"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">--{tab}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Terminal Command & JSON Output */}
                  <div className="p-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-cyan-400 font-bold">$</span>
                      <span className="text-zinc-200">{terminalData[activeTab].command}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="mt-3 rounded-lg bg-black/50 p-2.5 text-[11px] leading-relaxed text-zinc-300 border border-zinc-800/60"
                      >
                        <pre className="overflow-x-auto whitespace-pre-wrap font-mono">
                          {JSON.stringify(terminalData[activeTab].output, null, 2)}
                        </pre>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Quick Spec Matrix */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="rounded-xl border border-zinc-200/70 bg-white/70 p-2 dark:border-zinc-800/70 dark:bg-zinc-900/60">
                    <div className="text-base font-bold text-cyan-600 dark:text-cyan-400">18+</div>
                    <div className="text-[10px] text-zinc-500">Shipped</div>
                  </div>
                  <div className="rounded-xl border border-zinc-200/70 bg-white/70 p-2 dark:border-zinc-800/70 dark:bg-zinc-900/60">
                    <div className="text-base font-bold text-purple-600 dark:text-purple-400">450+</div>
                    <div className="text-[10px] text-zinc-500">LeetCode</div>
                  </div>
                  <div className="rounded-xl border border-zinc-200/70 bg-white/70 p-2 dark:border-zinc-800/70 dark:bg-zinc-900/60">
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                    <div className="text-[10px] text-zinc-500">TypeScript</div>
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
          className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white/95 via-white/80 to-zinc-50/90 p-8 shadow-2xl backdrop-blur dark:border-zinc-800/90 dark:from-zinc-950/95 dark:via-zinc-900/80 dark:to-zinc-950/90 sm:p-10 lg:p-12"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-cyan-500/15" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-emerald-500/15" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content (7 cols) */}
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>OPEN FOR HIGH-IMPACT COLLABORATION</span>
              </div>

              <h2
                id="contact-title"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
              >
                Let&apos;s build something extraordinary
              </h2>

              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Whether you&apos;re architecting a low-latency trading engine, launching an AI product, or looking for an engineer who executes with speed and taste—my inbox is open.
              </p>

              {/* Instant 1-Click Email Copy Capsule */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/80 p-2 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/80">
                  <span className="px-3 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    shivengoomer@gmail.com
                  </span>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
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
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    title="Send Email Directly"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>

              {/* Response & Location Guarantee Metrics */}
              <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Guaranteed reply &lt; 12h</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Remote Worldwide / Hybrid</span>
                </div>
              </div>
            </div>

            {/* Right Action Matrix (5 cols) */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact"
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 px-6 font-mono text-sm font-semibold text-white shadow-xl transition-all hover:shadow-zinc-900/25 dark:from-white dark:via-zinc-100 dark:to-white dark:text-zinc-950"
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
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-4 font-mono text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <FileText className="h-3.5 w-3.5 text-cyan-500" />
                    <span>Resume (PDF)</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-4 font-mono text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Icons.gitHub className="h-3.5 w-3.5" />
                    <span>GitHub Profile</span>
                  </a>
                </motion.div>
              </div>

              {/* Connected Social Dock */}
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/60 p-3 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/60">
                <span className="font-mono text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
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
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
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
