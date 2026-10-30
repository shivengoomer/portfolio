"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  Clock,
  Sparkles,
  Terminal,
  ShieldCheck,
  Briefcase,
  Zap,
  Coffee,
  Code2,
  CornerDownLeft,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

type IntentType = "role" | "contract" | "collab" | "casual";

interface IntentConfig {
  id: IntentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subject: string;
  placeholder: string;
}

const INTENTS: IntentConfig[] = [
  {
    id: "role",
    label: "Full-Time Role",
    icon: Briefcase,
    subject: "Full-Time Engineering Opportunity for Shiven",
    placeholder: "Hi Shiven, I'm reaching out from [Company] regarding a full-stack / backend role on our team...",
  },
  {
    id: "contract",
    label: "Contract / Architecture",
    icon: Zap,
    subject: "High-Impact Contract / Advisory Project",
    placeholder: "Hey Shiven, we're building a system that needs [scale / quant / GenAI / architecture] expertise...",
  },
  {
    id: "collab",
    label: "Tech Collab / OSS",
    icon: Code2,
    subject: "Open Source / Technical Collaboration",
    placeholder: "Hey Shiven, came across your work on [Project/GitHub] and wanted to explore collaborating on...",
  },
  {
    id: "casual",
    label: "Quick Chat",
    icon: Coffee,
    subject: "Coffee Chat / Reaching Out",
    placeholder: "Hey Shiven, loved your portfolio and wanted to connect about...",
  },
];

export function ReachOutConsole() {
  const storeModal = useModalStore();

  // Live IST Clock
  const [istTime, setIstTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shivengoomer@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // CLI command copy state
  const [copiedCli, setCopiedCli] = useState(false);
  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("curl -s https://shivengoomer.vercel.app/api/contact");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  // Form State
  const [activeIntent, setActiveIntent] = useState<IntentType>("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [social, setSocial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentIntentConfig = INTENTS.find((i) => i.id === activeIntent) || INTENTS[0];

  // Direct mailto link helper
  const mailtoHref = `mailto:shivengoomer@gmail.com?subject=${encodeURIComponent(
    currentIntentConfig.subject
  )}&body=${encodeURIComponent(
    message ? message : `Hi Shiven,\n\nI wanted to discuss a ${currentIntentConfig.label.toLowerCase()} with you.\n\nBest,\n`
  )}`;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill out your name, email, and a short message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: `[Intent: ${currentIntentConfig.label}]\n\n${message.trim()}`,
          social: social.trim() || undefined,
        }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setSocial("");
        storeModal.onOpen({
          title: "Dispatch Received!",
          description:
            "Thank you! Your message hit my inbox and I will review and reply within 12 hours.",
          icon: Icons.successAnimated,
        });
      } else {
        const err = await response.json().catch(() => null);
        setErrorMsg(err?.error || "Failed to deliver. Please email directly at shivengoomer@gmail.com");
      }
    } catch {
      setErrorMsg("Network issue. Please email directly at shivengoomer@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── TOP TELEMETRY & DIRECT LINE BENTO ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Direct Line Box (7 cols) */}
        <div className="md:col-span-7 rounded-2xl border border-border/80 bg-surface/70 p-6 shadow-sm backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[11px] font-medium text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span>OPEN TO ROLES & CONTRACTS</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>{istTime ? `${istTime} IST` : "New Delhi (IST)"}</span>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Primary Direct Line</p>
              <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text">
                shivengoomer@gmail.com
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Average reply time: <span className="font-semibold text-text">&lt; 12 hours</span>. Direct to personal inbox.
              </p>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/60">
            <button
              type="button"
              onClick={handleCopyEmail}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all shadow-sm",
                copiedEmail
                  ? "bg-success text-white"
                  : "bg-accent text-white hover:opacity-90 active:scale-95"
              )}
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-xs font-semibold text-text transition-colors hover:border-accent/40 hover:text-accent active:scale-95"
            >
              <Mail className="h-3.5 w-3.5 text-text-muted" />
              <span>Launch Mail Client</span>
              <ExternalLink className="h-3 w-3 text-text-muted" />
            </a>
          </div>
        </div>

        {/* Channels & Verified Identity (5 cols) */}
        <div className="md:col-span-5 rounded-2xl border border-border/80 bg-surface/70 p-6 shadow-sm backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Verified Handles
              </span>
              <span className="font-mono text-[10px] text-text-muted">UTC+5:30</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="https://github.com/shivengoomer"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 p-2.5 transition-all hover:border-accent/40 hover:bg-surface-2"
              >
                <Icons.gitHub className="h-4 w-4 text-text-muted group-hover:text-text transition-colors" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-text leading-tight truncate">GitHub</p>
                  <p className="font-mono text-[10px] text-text-muted truncate">@shivengoomer</p>
                </div>
              </Link>

              <Link
                href="https://www.linkedin.com/in/shiven-goomer/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 p-2.5 transition-all hover:border-accent/40 hover:bg-surface-2"
              >
                <Icons.linkedin className="h-4 w-4 text-text-muted group-hover:text-text transition-colors" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-text leading-tight truncate">LinkedIn</p>
                  <p className="font-mono text-[10px] text-text-muted truncate">Shiven Goomer</p>
                </div>
              </Link>

              <Link
                href="https://leetcode.com/shivengoomer/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 p-2.5 transition-all hover:border-accent/40 hover:bg-surface-2"
              >
                <Icons.leetcode className="h-4 w-4 text-text-muted group-hover:text-text transition-colors" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-text leading-tight truncate">LeetCode</p>
                  <p className="font-mono text-[10px] text-text-muted truncate">shivengoomer</p>
                </div>
              </Link>

              <Link
                href="https://x.com/shivengoomer"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 p-2.5 transition-all hover:border-accent/40 hover:bg-surface-2"
              >
                <Icons.twitter className="h-4 w-4 text-text-muted group-hover:text-text transition-colors" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-text leading-tight truncate">X / Twitter</p>
                  <p className="font-mono text-[10px] text-text-muted truncate">@shivengoomer</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick CLI command */}
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted truncate">
              <Terminal className="h-3 w-3 text-accent shrink-0" />
              <span className="truncate">curl -s /api/contact</span>
            </div>
            <button
              type="button"
              onClick={handleCopyCli}
              className="text-[10px] font-mono text-accent hover:underline flex items-center gap-1 shrink-0 ml-2"
            >
              {copiedCli ? "copied!" : "copy cmd"}
            </button>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE DISPATCH CONSOLE ──────────────────────────────── */}
      <div className="rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-8 shadow-sm backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border/60">
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-text">
              Direct Dispatch Console
            </h4>
            <p className="text-xs text-text-muted">
              Select intent to pre-tune context or leave a direct note.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-text-muted bg-surface-2 px-2.5 py-1 rounded-md border border-border">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-text font-semibold">⌘ + Enter</kbd>
            <span>to dispatch</span>
          </div>
        </div>

        {/* Intent Selectors */}
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            01. Select Conversation Context
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INTENTS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeIntent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIntent(item.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-3 text-left transition-all duration-150 text-xs font-medium",
                    isSelected
                      ? "border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                      : "border-border bg-surface-2/70 text-text-muted hover:border-border/80 hover:text-text"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isSelected ? "text-accent" : "text-text-muted")} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Chen"
                required
                className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs sm:text-sm text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                Your Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                required
                className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs sm:text-sm text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                Message & Overview <span className="text-accent">*</span>
              </label>
              <span className="font-mono text-[10px] text-text-muted">
                Subject: {currentIntentConfig.subject}
              </span>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentIntentConfig.placeholder}
              required
              className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs sm:text-sm text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y min-h-[96px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
              LinkedIn / Company Website <span className="text-text-muted/60 lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={social}
              onChange={(e) => setSocial(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-xs sm:text-sm text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>

          {errorMsg && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive">
              {errorMsg}
            </p>
          )}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] text-text-muted">
              Sends encrypted straight to <span className="font-mono text-text">shivengoomer@gmail.com</span>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Message</span>
                  <CornerDownLeft className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

