"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    // Delay sidebar appearance
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
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
  };

  return (
    <>
      {/* Desktop: sticky left sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
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

      {/* Mobile: sticky horizontal pill nav */}
      <nav
        className="lg:hidden sticky top-16 z-40 bg-bg/90 backdrop-blur-md border-b border-border"
        aria-label="Case study sections"
      >
        <div className="flex overflow-x-auto gap-1 px-4 py-2 no-scrollbar">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 whitespace-nowrap",
                active === id
                  ? "bg-accent text-white"
                  : "bg-surface text-text-muted hover:text-text"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
