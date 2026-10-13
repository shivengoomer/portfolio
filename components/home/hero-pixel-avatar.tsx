"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";

interface HeroPixelAvatarProps {
  className?: string;
}

const quotes = [
  "Happy to see you here! 👋",
  "Specialized in Quant & GenAI platforms. ⚡",
  "Engineering high-throughput Go & Next.js systems.",
  "Check out my 8 hackathons & credentials below! 🏆",
  "Shipped production code across PanScience & GNCIPL.",
  "New Delhi · UTC+5:30. Available worldwide.",
  "Hover me to wave! Click to cycle info. 🚀",
];

export function HeroPixelAvatar({ className = "" }: HeroPixelAvatarProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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

  const cycleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={cycleQuote}
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* ── CONCENTRIC PORTAL RINGS (INSPIRED BY RETRO RADAR / RIPPLE) ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-visible">
        {/* Soft Ambient Radial Core Glow */}
        <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-pink-500/10 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Innermost Portal Ring */}
        <div className="absolute h-64 w-64 rounded-full border border-indigo-400/25 dark:border-indigo-400/20 animate-[spin_24s_linear_infinite]" />

        {/* Middle Dashed Concentric Ring */}
        <div className="absolute h-80 w-80 rounded-full border border-dashed border-purple-400/20 dark:border-purple-400/15" />

        {/* Outer Fine Radial Pulse Ring */}
        <div className="absolute h-96 w-96 rounded-full border border-indigo-500/15 dark:border-indigo-500/10" />

        {/* Ultra-Wide Wave Ring */}
        <div className="absolute h-[440px] w-[440px] rounded-full border border-white/5 opacity-50" />
      </div>

      {/* ── INTERACTIVE SPEECH BUBBLE ── */}
      <motion.div
        layout
        className="relative z-20 mb-3 max-w-[280px] sm:max-w-[320px] rounded-2xl border border-indigo-500/30 bg-zinc-950/90 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl text-center"
      >
        <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-indigo-400 font-semibold mb-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>SHIVEN_SAYS</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[8px] text-zinc-400 font-normal">[CLICK AVATAR]</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs sm:text-sm font-medium text-zinc-100 leading-snug"
          >
            {quotes[quoteIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Speech Bubble Pointer Tail */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-indigo-500/30 bg-zinc-950/90" />
      </motion.div>

      {/* ── 3D TILTED & BOBBING SPRITE CONTAINER ── */}
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
        className="relative flex flex-col items-center justify-center"
      >
        {/* Floating Bobbing Motion */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.94 }}
          className="relative w-64 h-72 sm:w-80 sm:h-96 lg:w-[360px] lg:h-[440px] xl:w-[400px] xl:h-[480px] drop-shadow-[0_20px_35px_rgba(99,102,241,0.3)] transition-transform duration-300 group-hover:scale-[1.03]"
        >
          {/* Main Pixel Avatar (Swaps to waving on hover!) */}
          <img
            src={isHovered ? "/shiven-pixel-waving.png" : "/shiven-pixel-full-body.png"}
            alt="Shiven Goomer Pixel Avatar"
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
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-2 pointer-events-none rounded-full border border-indigo-400/30 bg-indigo-950/90 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-indigo-300 shadow-md backdrop-blur-md"
          >
            👋 Hey there!
          </motion.div>
        </motion.div>

        {/* Soft Contact Floor Shadow */}
        <motion.div
          animate={{
            scale: [1, 0.88, 1],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-40 sm:w-52 h-4 sm:h-5 rounded-full bg-black/60 blur-md -mt-4 -z-10"
        />
      </motion.div>
    </div>
  );
}
