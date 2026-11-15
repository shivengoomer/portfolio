"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, MoveUp } from "lucide-react";

import { cn } from "@/lib/utils";

const EMAIL = "shivengoomer@gmail.com";
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/shivengoomer", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shiven-goomer/", external: true },
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Resume", href: "/resume" },
];

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [signatureOffset, setSignatureOffset] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const signatureY = useTransform(scrollYProgress, [0, 0.65], [36, 0]);
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.42], [0, 1]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* feedback still confirms the action */ }
    setCopied(true);
  };

  const smoothTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <footer ref={footerRef} className={cn("retro-surface relative isolate overflow-hidden bg-[#170A10] text-white", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(242,92,42,0.22)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_68%)]" />
      <div className="pointer-events-none absolute left-[8%] top-16 h-px w-20 bg-accent/70 before:absolute before:-left-1 before:-top-1 before:h-2.5 before:w-2.5 before:bg-accent" />

      <div className="site-gutter relative mx-auto max-w-[1760px] pt-20 sm:pt-28">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8fdda9]"><span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-[#7FD6A0] motion-safe:animate-ping" /><span className="absolute inset-0 rounded-full bg-[#7FD6A0]" /></span>Available for the right build</div>
            <h2 className="max-w-5xl font-heading text-[clamp(3.4rem,8vw,7.8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-[#f8e7d7]">LET&apos;S BUILD<br />SOMETHING.</h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">Open to software engineering opportunities &amp; collaborations.</p>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="lg:justify-self-end">
            <a href={`mailto:${EMAIL}`} onMouseMove={(event) => { if (reduceMotion) return; const box = event.currentTarget.getBoundingClientRect(); setMagnet({ x: (event.clientX - (box.left + box.width / 2)) * 0.16, y: (event.clientY - (box.top + box.height / 2)) * 0.16 }); }} onMouseLeave={() => setMagnet({ x: 0, y: 0 })} className="group inline-flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <motion.span animate={reduceMotion ? {} : magnet} transition={{ type: "spring", stiffness: 250, damping: 16 }} className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-heading text-lg font-bold uppercase tracking-wide text-white shadow-[0_12px_34px_rgba(242,92,42,0.28)] transition-colors group-hover:bg-[#ff6a36]">
                Let&apos;s talk <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.span>
              <span className="mt-3 pl-2 font-mono text-xs text-zinc-500 transition-colors group-hover:text-[#f8e7d7]">{EMAIL}</span>
            </a>
            <button type="button" onClick={copyEmail} className="mt-5 inline-flex items-center gap-2 border-b border-white/20 pb-1 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {copied ? <><Check className="h-3.5 w-3.5 text-[#7FD6A0]" /> Email copied</> : <><Copy className="h-3.5 w-3.5" /> Copy email</>}
            </button>
          </motion.div>
        </div>

        <nav aria-label="Footer social links" className="flex flex-wrap gap-x-7 gap-y-3 py-7 sm:py-9">
          {SOCIALS.map((social) => <Link key={social.label} href={social.href} {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})} className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-[#f8e7d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"><span className="h-1 w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />{social.label}<ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" /></Link>)}
        </nav>
      </div>

      <motion.div style={reduceMotion ? {} : { y: signatureY, opacity: signatureOpacity }} onMouseMove={(event) => { if (reduceMotion) return; const box = event.currentTarget.getBoundingClientRect(); setSignatureOffset({ x: ((event.clientX - (box.left + box.width / 2)) / box.width) * 8, y: ((event.clientY - (box.top + box.height / 2)) / box.height) * 3 }); }} onMouseLeave={() => setSignatureOffset({ x: 0, y: 0 })} className="site-gutter relative mx-auto mt-4 max-w-[1760px] select-none overflow-hidden">
        <motion.div animate={reduceMotion ? {} : signatureOffset} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="whitespace-nowrap text-center font-heading text-[clamp(3.7rem,13.1vw,13rem)] font-extrabold uppercase leading-[0.75] tracking-[-0.075em]" style={{ backgroundImage: "linear-gradient(180deg,#fff7ef_0%,#eec8ad_52%,#8d5041_100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }} aria-hidden="true">SHIVEN GOOMER</motion.div>
      </motion.div>

      <div className="site-gutter relative mx-auto flex max-w-[1760px] items-center justify-between gap-4 border-t border-white/10 py-7 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600"><span>© {new Date().getFullYear()} Shiven Goomer</span><button type="button" onClick={smoothTop} className="group inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-[#f8e7d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Back to top <MoveUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" /></button></div>
    </footer>
  );
}
