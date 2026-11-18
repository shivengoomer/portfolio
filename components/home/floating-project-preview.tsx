"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EditorialProjectItem {
  id: string;
  name: string;
  description: string;
  year: string;
  image: string;
  href: string;
  category?: string;
}

interface FloatingProjectPreviewProps {
  activeProject: EditorialProjectItem | null;
  pointerPos: { x: number; y: number };
  containerBounds: { width: number; height: number };
  className?: string;
}

export function FloatingProjectPreview({
  activeProject,
  pointerPos,
  containerBounds,
  className,
}: FloatingProjectPreviewProps) {
  const shouldReduceMotion = useReducedMotion();

  // Width and height of floating window
  const PREVIEW_WIDTH = 460;
  const PREVIEW_HEIGHT = 290;

  // Calculate clamped Y position relative to container
  const clampedY = Math.max(
    PREVIEW_HEIGHT / 2,
    Math.min(containerBounds.height - PREVIEW_HEIGHT / 2, pointerPos.y)
  );

  // Subtle X offset tracking cursor
  const normalizedX = containerBounds.width > 0
    ? (pointerPos.x - containerBounds.width / 2) / (containerBounds.width / 2)
    : 0;
  const subtleXOffset = normalizedX * 24;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-30 hidden md:block overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="floating-preview-container"
            initial={{
              opacity: 0,
              scale: 0.94,
              y: clampedY - PREVIEW_HEIGHT / 2 + 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: clampedY - PREVIEW_HEIGHT / 2,
              x: subtleXOffset,
              transition: {
                opacity: { duration: 0.22, ease: "easeOut" },
                scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                y: shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 180, damping: 24, mass: 0.6 },
                x: shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 140, damping: 20 },
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            style={{
              right: "4%",
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
            }}
            className="absolute rounded-2xl border border-white/15 dark:border-white/10 bg-[#1A0D18]/95 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(242,92,42,0.15)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Top Bar Window Dot Controls */}
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-accent font-semibold tracking-wider uppercase">
                <span>View Project</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>

            {/* Inner Screenshot Container */}
            <div className="relative h-[calc(100%-24px)] w-full overflow-hidden rounded-xl bg-black/40 border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.name}
                    fill
                    sizes="460px"
                    className="object-cover object-top"
                  />
                  {/* Subtle vignette sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Project Name Pill Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="rounded-lg bg-black/70 px-2.5 py-1 font-mono text-[11px] font-semibold text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
                      {activeProject.name}
                    </span>
                    <span className="rounded-lg bg-accent/90 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
                      {activeProject.year}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
