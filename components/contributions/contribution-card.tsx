"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";

import { type certInterface } from "@/config/certs";

function viewerUrl(url: string) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    return parsed.hostname.includes("drive.google.com") && match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  } catch { return url; }
}

export default function ContributionCard({ contributions }: { contributions: certInterface[] }) {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<certInterface | null>(null);
  useEffect(() => { if (!selected) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [selected]);
  const [lead, ...rest] = contributions;
  if (!lead) return null;

  return <>
    <div className="space-y-8">
      <motion.article initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#180a11] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.36)] sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-end"><div className="grid h-24 w-24 place-items-center rounded-[1.5rem] border border-white/10 bg-white p-5"><img src={lead.logo} alt={`${lead.repoOwner} logo`} className="max-h-full max-w-full object-contain" /></div><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Lead credential / {lead.repoOwner}</p><h2 className="mt-4 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-text sm:text-4xl">{lead.repo}</h2><p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-text-muted">{lead.contibutionDescription}</p></div><div className="flex flex-wrap gap-3"><button onClick={() => setSelected(lead)} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a36] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Preview <Maximize2 className="h-4 w-4" /></button><a href={lead.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Verify <ArrowUpRight className="h-4 w-4" /></a></div></div>
      </motion.article>
      <section className="border-y border-white/10"><div className="grid divide-y divide-white/10">{rest.map((cert, index) => <motion.article key={cert.repo} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.08, duration: 0.5 }} className="group grid gap-5 px-2 py-7 transition-colors hover:bg-[#240e17] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-7 sm:px-5"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white p-3"><img src={cert.logo} alt={`${cert.repoOwner} logo`} className="max-h-full max-w-full object-contain" /></div><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{cert.repoOwner}</p><h3 className="mt-2 font-heading text-2xl font-bold uppercase leading-none tracking-tight text-text">{cert.repo}</h3><p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-text-muted">{cert.contibutionDescription}</p></div><div className="flex gap-4 sm:flex-col sm:items-end"><button onClick={() => setSelected(cert)} className="inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Preview <Maximize2 className="h-4 w-4" /></button><a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent">Verify <ArrowUpRight className="h-3.5 w-3.5" /></a></div></motion.article>)}</div></section>
    </div>
    <AnimatePresence>{selected && <motion.div role="dialog" aria-modal="true" aria-label={`${selected.repo} preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 z-[10000] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} onClick={(event) => event.stopPropagation()} className="relative h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#170a10] p-3 shadow-2xl"><iframe src={viewerUrl(selected.previewLink || selected.link)} title={selected.repo} className="h-full w-full rounded-xl bg-white" /><button onClick={() => setSelected(null)} className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/65 p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Close preview"><X className="h-4 w-4" /></button></motion.div></motion.div>}</AnimatePresence>
  </>;
}
