"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ShowcaseItem {
  title: string;
  description?: string;
  validImages: string[];
}

interface ProjectStepperProps {
  items: ShowcaseItem[];
}

export default function ProjectStepper({ items }: ProjectStepperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = items.length;

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const item = items[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-5">
      {/* Navigation bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "h-2.5 w-7 bg-zinc-900 dark:bg-zinc-100"
                  : "h-2.5 w-2.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
            aria-label="Previous"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="min-w-[3rem] text-center font-mono text-xs text-zinc-400 dark:text-zinc-500">
            {currentIndex + 1}/{total}
          </span>
          <button
            onClick={goNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
            aria-label="Next"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30 sm:p-5">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Step header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="flex-shrink-0 rounded-md bg-zinc-200/80 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                {item.validImages.length} {item.validImages.length === 1 ? "image" : "images"}
              </span>
            </div>

            {/* Screenshots */}
            {item.validImages.length > 0 ? (
              <div className="space-y-3">
                {item.validImages.map((img, imgIdx) => (
                  <div
                    key={`${img}-${imgIdx}`}
                    className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700"
                  >
                    <Image
                      src={img}
                      width={800}
                      height={500}
                      className="h-auto w-full object-cover"
                      alt={`${item.title} screen ${imgIdx + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-zinc-200 text-sm text-zinc-400 dark:border-zinc-700">
                No screenshots for this step.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
