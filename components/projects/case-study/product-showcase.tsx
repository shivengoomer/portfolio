"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  title: string;
  description?: string;
  validImages: string[];
}

interface ProductShowcaseProps {
  items: ShowcaseItem[];
}

export default function ProductShowcase({ items }: ProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const validItems = items.filter((it) => it.validImages.length > 0);
  if (validItems.length === 0) return null;

  const active = validItems[activeIndex];

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return validItems.length - 1;
        if (next >= validItems.length) return 0;
        return next;
      });
    },
    [validItems.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <section id="product" className="py-16 sm:py-20 border-t border-border">
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
            Inside the product
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold uppercase text-text">
            Product Screens
          </h2>
        </motion.div>

        {/* Main image display */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 bg-surface-2 px-4 py-3 border-b border-border">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-auto font-mono text-[11px] text-text-muted">
              {active.title}
            </span>
          </div>

          <div className="relative h-[280px] sm:h-[400px] lg:h-[520px] w-full overflow-hidden bg-surface-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.validImages[0]}
                  alt={active.title}
                  fill
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            {validItems.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 border border-border backdrop-blur-sm text-text-muted hover:text-text hover:border-accent/40 transition-all duration-200"
                  aria-label="Previous screen"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 border border-border backdrop-blur-sm text-text-muted hover:text-text hover:border-accent/40 transition-all duration-200"
                  aria-label="Next screen"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          {active.description && (
            <div className="px-5 py-3 border-t border-border">
              <p className="font-mono text-xs text-text-muted">{active.description}</p>
            </div>
          )}
        </div>

        {/* Tab navigation */}
        {validItems.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {validItems.map((item, i) => (
              <button
                key={item.title}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-200",
                  i === activeIndex
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-border bg-surface text-text-muted hover:border-accent/20 hover:text-text"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

        {/* Dot indicators */}
        {validItems.length > 1 && (
          <div className="mt-3 flex items-center gap-1.5">
            {validItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "h-2 w-6 bg-accent"
                    : "h-2 w-2 bg-border hover:bg-text-muted"
                )}
                aria-label={`Screen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
