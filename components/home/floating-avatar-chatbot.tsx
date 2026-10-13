"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare } from "lucide-react";

const heroQuotes = [
  "Happy to see you here! 👋",
  "Specialized in Quant & GenAI platforms. ⚡",
  "Engineering high-throughput Go & Next.js systems.",
  "Check out my 8 hackathons & credentials below! 🏆",
  "Shipped production code across PanScience & GNCIPL.",
  "New Delhi · UTC+5:30. Available worldwide.",
  "Hover me to wave! Click to cycle info. 🚀",
];

export function FloatingAvatarChatbot() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setTilt({
      x: (y / (box.height / 2)) * -6,
      y: (x / (box.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cycleQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % heroQuotes.length);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* ── SPEECH BUBBLE (ABOVE AVATAR) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={cycleQuote}
            className="relative mb-2 w-64 sm:w-72 rounded-2xl border border-white/20 bg-zinc-950/95 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl cursor-pointer text-left group/bubble"
          >
            {/* Top Bar with Status & Close Toggle */}
            <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.16em] text-indigo-400 font-semibold mb-1 pb-1 border-b border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>SHIVEN_SAYS</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] text-zinc-400 font-normal">
                <span>[CLICK TO CYCLE]</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="ml-1 p-0.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                  title="Minimize"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>

            {/* Current Speech Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="text-xs sm:text-[13px] font-medium text-zinc-100 leading-snug"
              >
                {heroQuotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Pointer Arrow Tail pointing to bottom right avatar */}
            <div className="absolute -bottom-1.5 right-10 w-3 h-3 rotate-45 border-r border-b border-white/20 bg-zinc-950/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INTERACTIVE PIXEL AVATAR SPRITE / CHATBOT TRIGGER ── */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
        }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setQuoteIndex((prev) => (prev + 1) % heroQuotes.length);
          }
        }}
        className="relative cursor-pointer group/avatar flex flex-col items-center"
      >
        {/* Floating Gentle Bobbing Animation */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.92 }}
          className="relative w-28 h-32 sm:w-36 sm:h-40 md:w-40 md:h-44 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover/avatar:scale-105"
        >
          {/* Main Pixel Avatar (Swaps to waving on hover!) */}
          <img
            src={isHovered ? "/shiven-pixel-waving.png" : "/shiven-pixel-full-body.png"}
            alt="Shiven Avatar Companion"
            className="h-full w-full object-contain pixelated scale-x-[-1] transition-all duration-200"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Hover Wave Cue Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.15 }}
            className="absolute -top-1 left-0 pointer-events-none rounded-full border border-indigo-400/40 bg-zinc-950/95 px-2 py-0.5 text-[9px] font-mono font-semibold text-indigo-300 shadow-xl backdrop-blur-md"
          >
            👋 Hey!
          </motion.div>
        </motion.div>

        {/* Minimized Chat Pill Indicator if Speech bubble is closed */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg border border-white/20"
          >
            <MessageSquare className="h-3 w-3" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
