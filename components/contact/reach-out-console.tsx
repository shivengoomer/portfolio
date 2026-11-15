"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";

import { Icons } from "@/components/common/icons";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

const EMAIL = "shivengoomer@gmail.com";
const INTENTS = [
  { value: "role", label: "A role", subject: "Software Engineering Opportunity for Shiven" },
  { value: "project", label: "A project", subject: "Potential project collaboration" },
  { value: "collab", label: "A collaboration", subject: "Technical collaboration" },
  { value: "hello", label: "Say hello", subject: "Reaching out" },
];

export function ReachOutConsole() {
  const reduceMotion = useReducedMotion();
  const modal = useModalStore();
  const [copied, setCopied] = useState(false);
  const [intent, setIntent] = useState(INTENTS[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (!copied) return; const timer = window.setTimeout(() => setCopied(false), 1800); return () => window.clearTimeout(timer); }, [copied]);
  const activeIntent = INTENTS.find((item) => item.value === intent) || INTENTS[0];
  const copyEmail = async () => { try { await navigator.clipboard.writeText(EMAIL); } catch {} setCopied(true); };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(null); setIsSending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message: `[${activeIntent.label}]\n\n${message}`, social: undefined }) });
      if (!response.ok) throw new Error("Unable to send");
      setName(""); setEmail(""); setMessage("");
      modal.onOpen({ title: "Message received.", description: "Thanks for reaching out — I’ll get back to you shortly.", icon: Icons.successAnimated });
    } catch { setError(`Something interrupted the send. Email me directly at ${EMAIL}.`); } finally { setIsSending(false); }
  };

  return <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
    <motion.section initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#180a11] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.36)] sm:p-10">
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex h-full flex-col items-start">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8fdda9]"><span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-[#7FD6A0] motion-safe:animate-ping" /><span className="absolute inset-0 rounded-full bg-[#7FD6A0]" /></span>Available for a good challenge</p>
        <h2 className="mt-7 font-heading text-4xl font-extrabold uppercase leading-[0.85] tracking-[-0.05em] text-text sm:text-5xl">Start with<br />a conversation.</h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">Whether it’s an engineering role, a system worth building, or an ambitious collaboration—I’d like to hear the shape of it.</p>
        <a href={`mailto:${EMAIL}`} className="group mt-9 inline-flex items-center gap-3 text-lg font-semibold text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">{EMAIL}<ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        <button type="button" onClick={copyEmail} className="mt-3 inline-flex items-center gap-2 border-b border-white/15 pb-1 font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">{copied ? <><Check className="h-3.5 w-3.5 text-[#7FD6A0]" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy email</>}</button>
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-12 font-mono text-xs uppercase tracking-[0.14em] text-text-muted"><Link href="https://github.com/shivengoomer" target="_blank" className="hover:text-text">GitHub ↗</Link><Link href="https://www.linkedin.com/in/shiven-goomer/" target="_blank" className="hover:text-text">LinkedIn ↗</Link><Link href="/resume" className="hover:text-text">Resume ↗</Link></div>
      </div>
    </motion.section>

    <motion.form initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }} onSubmit={submit} className="rounded-[1.75rem] border border-white/10 bg-[#16090f] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-10">
      <div className="flex items-end justify-between border-b border-white/10 pb-5"><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Direct note</p><h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-text">What are we making?</h2></div><Mail className="h-5 w-5 text-text-muted" /></div>
      <fieldset className="mt-7"><legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">I&apos;m writing about</legend><div className="mt-3 flex flex-wrap gap-2">{INTENTS.map((item) => <button key={item.value} type="button" onClick={() => setIntent(item.value)} className={cn("rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent", intent === item.value ? "border-accent bg-accent/10 text-accent" : "border-white/10 text-text-muted hover:border-white/25 hover:text-text")}>{item.label}</button>)}</div></fieldset>
      <div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Your name</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Jane Smith" className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-sm text-text outline-none placeholder:text-zinc-600 transition-colors focus:border-accent" /></label><label className="block"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="jane@company.com" className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-sm text-text outline-none placeholder:text-zinc-600 transition-colors focus:border-accent" /></label></div>
      <label className="mt-7 block"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Your message</span><textarea required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A little context goes a long way…" className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/15 p-4 text-sm leading-relaxed text-text outline-none placeholder:text-zinc-600 transition-colors focus:border-accent" /></label>
      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Replies usually land within 12 hours.</p><button disabled={isSending} type="submit" className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a36] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">{isSending ? "Sending…" : "Send message"}<Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div>
    </motion.form>
  </div>;
}
