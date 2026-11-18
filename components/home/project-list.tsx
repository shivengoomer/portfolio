"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FloatingProjectPreview,
  EditorialProjectItem,
} from "./floating-project-preview";

interface ProjectListProps {
  projects: EditorialProjectItem[];
  className?: string;
}

export function ProjectList({ projects, className }: ProjectListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<EditorialProjectItem | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [containerBounds, setContainerBounds] = useState({ width: 0, height: 0 });

  // Update container dimensions on mount & resize
  const updateBounds = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerBounds({
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds]);

  // Handle pointer movement over the list
  const rafRef = useRef(0);
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || rafRef.current) return;
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPointerPos({ x: clientX - rect.left, y: clientY - rect.top });
    });
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handlePointerLeave = () => {
    setActiveProject(null);
  };

  // Keyboard accessibility: track row offset
  const handleRowFocus = (project: EditorialProjectItem, index: number) => {
    setActiveProject(project);
    if (!containerRef.current) return;
    const rowHeight = containerBounds.height / (projects.length || 1);
    setPointerPos({
      x: containerBounds.width * 0.75,
      y: (index + 0.5) * rowHeight,
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("relative w-full select-none", className)}
    >
      {/* ── IMAGE PRELOADER (Ensures zero flash when switching between projects) ── */}
      <div className="hidden" aria-hidden="true">
        {projects.map((p) => (
          <Image
            key={p.id}
            src={p.image}
            alt=""
            width={460}
            height={290}
            loading="lazy"
          />
        ))}
      </div>

      {/* ── SIGNATURE FLOATING PREVIEW (Desktop Cursor Follower) ── */}
      <FloatingProjectPreview
        activeProject={activeProject}
        pointerPos={pointerPos}
        containerBounds={containerBounds}
      />

      {/* ── EDITORIAL PROJECT ROWS ── */}
      <div className="relative z-10 divide-y divide-border/60 border-t border-b border-border/60">
        {projects.map((project, idx) => {
          const isHovered = activeProject?.id === project.id;

          return (
            <Link
              key={project.id}
              href={project.href}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setActiveProject(project);
              }}
              onClick={(event) => {
                if (window.innerWidth >= 768 || activeProject?.id === project.id) return;
                event.preventDefault();
                setActiveProject(project);
              }}
              onFocus={() => handleRowFocus(project, idx)}
              onBlur={() => setActiveProject(null)}
              className={cn(
                "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 sm:py-8 px-4 sm:px-6 transition-all duration-200 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isHovered
                  ? "bg-[#251221]/70 dark:bg-[#251221]/80 backdrop-blur-md"
                  : "bg-transparent hover:bg-[#251221]/40"
              )}
            >
              {/* Left Column: Title with ↗ arrow + Short 10-12 word description */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h3
                    className={cn(
                      "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-colors duration-200 leading-tight",
                      isHovered ? "text-white" : "text-text group-hover:text-white"
                    )}
                  >
                    {project.name}
                  </h3>

                  {/* Diagonal arrow that emerges on hover/focus */}
                  <ArrowUpRight
                    className={cn(
                      "h-5 w-5 sm:h-6 sm:w-6 text-accent transition-all duration-200 shrink-0",
                      isHovered
                        ? "opacity-100 translate-x-0 translate-y-0"
                        : "opacity-0 -translate-x-2 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    )}
                    aria-hidden="true"
                  />
                </div>

                <p className="font-sans text-sm sm:text-base text-text-muted transition-colors duration-200 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Right Column: Year (Desktop) + Compact Thumbnail (Mobile) */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                {/* Mobile compact thumbnail (Hover does not exist on touch devices) */}
                <div className="relative block md:hidden h-14 w-24 sm:h-16 sm:w-28 rounded-xl overflow-hidden border border-border/80 shrink-0 shadow-sm bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>

                <span
                  className={cn(
                    "font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold transition-colors duration-200",
                    isHovered ? "text-accent" : "text-text-muted/70 group-hover:text-accent"
                  )}
                >
                  {project.year}
                </span>
              </div>

              {/* Touch equivalent of the desktop hover preview. Tap once to inspect; tap again to open. */}
              <AnimatePresence initial={false}>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="block w-full overflow-hidden md:hidden"
                  >
                    <div className="relative mt-1 aspect-[16/9] w-full overflow-hidden rounded-xl border border-accent/30 bg-black/50 shadow-[0_16px_32px_rgba(0,0,0,0.3)]">
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 3rem), 0px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                        Tap again to open ↗
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
