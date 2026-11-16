"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "outcomes", label: "Outcomes" },
];

export default function CaseStudyNavigation() {
  const [active, setActive] = useState("overview");
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Delay sidebar appearance
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop: sticky left sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: visible && !footerVisible ? 1 : 0, x: visible && !footerVisible ? 0 : -16 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 w-44"
        aria-label="Case study navigation"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted mb-2 pl-3">
          On this page
        </span>
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-200",
              active === id
                ? "text-accent bg-accent/8"
                : "text-text-muted hover:text-text hover:bg-surface"
            )}
          >
            {/* active indicator bar */}
            <span
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-300",
                active === id ? "h-5 bg-accent" : "h-0 bg-transparent"
              )}
            />
            <span className="pl-2">{label}</span>
          </button>
        ))}
      </motion.nav>

      {/* Mobile: compact expandable section navigator */}
      <nav className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Case study sections">
        <div className="relative">
          <AnimatePresence>
            {mobileOpen && (
              <div className="absolute bottom-[calc(100%+12px)] left-1/2 w-52 -translate-x-1/2">
                <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} transition={{ duration: 0.18 }} className="rounded-2xl border border-white/10 bg-[#1a0d18]/95 p-2 shadow-[0_14px_38px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="grid grid-cols-1 gap-1">
                    {SECTIONS.map(({ id, label }) => (
                      <button key={id} onClick={() => scrollTo(id)} className={cn("rounded-xl px-3 py-2.5 text-left font-mono text-[11px] transition-colors", active === id ? "bg-accent text-white" : "text-text-muted hover:bg-white/5 hover:text-text")}>
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1a0d18]/95 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f8e7d7] shadow-[0_8px_28px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-transform active:scale-95">
            <Compass className="h-3.5 w-3.5 text-accent" />
            {SECTIONS.find((section) => section.id === active)?.label || "Sections"}
            <ChevronUp className={cn("h-3.5 w-3.5 text-text-muted transition-transform", mobileOpen && "rotate-180")} />
          </button>
        </div>
      </nav>
    </>
  );
}
