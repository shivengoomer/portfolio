"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

/* ── STICKER 1: FULL STACK LEAD (ELECTRIC LIME 24-POINT STARBURST) ── */
function TacticalStarSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ delay: 0.25, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.14, rotate: -16 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="absolute top-[0.02em] right-[100%] mr-[0.08em] z-10 w-[0.88em] h-[0.88em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full pointer-events-none drop-shadow-[0_0_12px_rgba(204,255,0,0.5)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <polygon
            points="50.0,2.0 55.0,12.3 62.4,3.6 64.5,14.9 74.0,8.4 73.1,19.9 83.9,16.1 80.1,26.9 91.6,26.0 85.1,35.5 96.4,37.6 87.7,45.0 98.0,50.0 87.7,55.0 96.4,62.4 85.1,64.5 91.6,74.0 80.1,73.1 83.9,83.9 73.1,80.1 74.0,91.6 64.5,85.1 62.4,96.4 55.0,87.7 50.0,98.0 45.0,87.7 37.6,96.4 35.5,85.1 26.0,91.6 26.9,80.1 16.1,83.9 19.9,73.1 8.4,74.0 14.9,64.5 3.6,62.4 12.3,55.0 2.0,50.0 12.3,45.0 3.6,37.6 14.9,35.5 8.4,26.0 19.9,26.9 16.1,16.1 26.9,19.9 26.0,8.4 35.5,14.9 37.6,3.6 45.0,12.3"
            fill="#CCFF00"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-bold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
            style={{
              fontFamily: "var(--font-oswald), Oswald, sans-serif",
              fontSize: "0.14em",
              letterSpacing: "0.02em",
            }}
          >
            Full Stack
            <br />
            Lead
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── STICKER 2: SYSTEMS ARCHITECT STADIUM BADGE (LUMINOUS HAZARD GOLD) ── */
function TacticalStadiumSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ delay: 0.35, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.14, rotate: -1 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="relative z-10 w-[1.15em] h-[0.62em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 120 70"
          className="w-full h-full pointer-events-none drop-shadow-[0_0_12px_rgba(255,183,3,0.5)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x="5"
            y="7"
            width="110"
            height="56"
            rx="18"
            fill="#FFB703"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="35" r="2.2" fill="#0B132B" opacity="0.4" />
          <circle cx="105" cy="35" r="2.2" fill="#0B132B" opacity="0.4" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-bold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
            style={{
              fontFamily: "var(--font-oswald), Oswald, sans-serif",
              fontSize: "0.14em",
              letterSpacing: "0.02em",
            }}
          >
            Systems
            <br />
            Architect
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── STICKER 3: ELECTRIC CYAN STARBURST ("QUANT & / GENAI") ── */
function CyanStarburstSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: 12 }}
      animate={{ opacity: 1, scale: 1, rotate: 12 }}
      transition={{ delay: 0.45, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.14, rotate: 16 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="absolute top-[0.02em] left-[100%] ml-[0.08em] z-10 w-[0.88em] h-[0.88em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full pointer-events-none drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <polygon
            points="50.0,2.0 55.0,12.3 62.4,3.6 64.5,14.9 74.0,8.4 73.1,19.9 83.9,16.1 80.1,26.9 91.6,26.0 85.1,35.5 96.4,37.6 87.7,45.0 98.0,50.0 87.7,55.0 96.4,62.4 85.1,64.5 91.6,74.0 80.1,73.1 83.9,83.9 73.1,80.1 74.0,91.6 64.5,85.1 62.4,96.4 55.0,87.7 50.0,98.0 45.0,87.7 37.6,96.4 35.5,85.1 26.0,91.6 26.9,80.1 16.1,83.9 19.9,73.1 8.4,74.0 14.9,64.5 3.6,62.4 12.3,55.0 2.0,50.0 12.3,45.0 3.6,37.6 14.9,35.5 8.4,26.0 19.9,26.9 16.1,16.1 26.9,19.9 26.0,8.4 35.5,14.9 37.6,3.6 45.0,12.3"
            fill="#00E5FF"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-bold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
            style={{
              fontFamily: "var(--font-oswald), Oswald, sans-serif",
              fontSize: "0.14em",
              letterSpacing: "0.02em",
            }}
          >
            Quant &amp;
            <br />
            GenAI
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── WORKED AT COMPANIES ── */
const workedAtCompanies = [
  { name: "PanScience Innovations", logo: "/experience/panscience.png" },
  { name: "House of Couton", logo: "/experience/hoc.png" },
  { name: "GNCIPL", logo: "/experience/gncipl-logo.png" },
  { name: "Geek Room", logo: "/experience/geekroom-logo.png" },
];

export function EditorialHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center select-none py-8 sm:py-10 md:py-14 px-3 sm:px-6 md:px-8 overflow-visible max-w-5xl mx-auto">
      
      {/* ── CINEMATIC VIBRANT ATMOSPHERIC LIGHT CONE ── */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[94vw] max-w-4xl h-[460px] rounded-full blur-2xl -z-10 opacity-80"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,106,0,0.3) 0%, rgba(204,255,0,0.12) 35%, rgba(0,229,255,0.08) 55%, transparent 75%)",
        }}
      />

      {/* ── 1. GIANT DOMINANT NAME WITH 3 INTEGRATED STICKERS ── */}
      <div className="relative inline-block w-fit max-w-full mx-auto text-center px-10 sm:px-16 md:px-20 lg:px-24">
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-oswald font-bold uppercase text-white tracking-[-0.01em] leading-[0.88] md:leading-[0.85] text-center w-full select-none"
          style={{
            fontFamily: "var(--font-oswald), Oswald, sans-serif",
            fontSize: "clamp(2.5rem, 7.5vw, 9.2rem)",
            textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 0 35px rgba(255,255,255,0.35), 0 0 60px rgba(242,92,42,0.35)",
          }}
        >
          {/* Word 1: SHIVEN (with Full Stack Lead starburst beside S) */}
          <span className="relative flex md:inline-flex items-baseline justify-center">
            <span className="relative inline-block">
              <TacticalStarSticker shouldReduceMotion={shouldReduceMotion} />
              <span>S</span>
            </span>
            <span>HIVEN</span>
          </span>

          {/* Center Bridge: Systems Architect Stadium Badge */}
          <span className="relative flex md:inline-flex items-center justify-center my-2 md:my-0 mx-auto md:mx-[0.25em] self-center">
            <TacticalStadiumSticker shouldReduceMotion={shouldReduceMotion} />
          </span>

          {/* Word 2: GOOMER (with Quant & GenAI starburst beside R) */}
          <span className="relative flex md:inline-flex items-baseline justify-center">
            <span>GOOME</span>
            <span className="relative inline-block">
              <CyanStarburstSticker shouldReduceMotion={shouldReduceMotion} />
              <span>R</span>
            </span>
          </span>
        </motion.h1>
      </div>

      {/* ── 2. LUMINOUS SUNSET HEADLINE (0 → 1 ENGINEER. BUILT FOR PRODUCTION) ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3.5 sm:mt-4"
      >
        <h2
          className="font-oswald font-bold uppercase tracking-wider text-center"
          style={{
            fontFamily: "var(--font-oswald), Oswald, sans-serif",
            fontSize: "clamp(1.15rem, 3.4vw, 2.5rem)",
            lineHeight: "1.2",
            background: "linear-gradient(135deg, #FF9500 0%, #FF6B00 50%, #FF3D00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 14px rgba(255,107,0,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
          }}
        >
          0 → 1 ENGINEER. BUILT FOR PRODUCTION.
        </h2>
      </motion.div>

      {/* ── 3. VIBRANT HIGHLIGHTED NARRATIVE BODY (Color-Coded to Badges) ── */}
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-[0.95rem] sm:text-base md:text-lg leading-relaxed text-zinc-100 text-center font-normal px-3 max-w-2xl mx-auto mt-4 sm:mt-4"
        style={{
          textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.95)",
        }}
      >
        I turn complex ideas into working products — from{" "}
        <span className="text-[#00E5FF] font-semibold drop-shadow-[0_0_12px_rgba(0,229,255,0.7)]">
          AI retrieval pipelines
        </span>{" "}
        to{" "}
        <span className="text-[#FFD166] font-semibold drop-shadow-[0_0_12px_rgba(255,209,102,0.7)]">
          financial systems
        </span>{" "}
        and{" "}
        <span className="text-[#CCFF00] font-semibold drop-shadow-[0_0_12px_rgba(204,255,0,0.7)]">
          scalable backend infrastructure
        </span>
        .
      </motion.p>

      {/* ── 4. LUMINOUS INLINE CREDIBILITY ROW ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="grid grid-cols-[auto_auto] items-center justify-center gap-x-2 gap-y-2 mt-5 sm:mt-4 sm:flex sm:flex-wrap text-xs font-mono"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85)" }}
      >
        <span className="uppercase tracking-wider text-[11px] sm:text-xs text-white font-semibold">
          Shipped code with
        </span>
        <span className="inline-flex items-center -space-x-1.5 align-middle p-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          {workedAtCompanies.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white p-0.5 border-2 border-white/70 shadow-sm overflow-hidden transition-transform duration-200 hover:scale-115 hover:z-20"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-full h-full object-contain rounded-full"
              />
            </span>
          ))}
        </span>
        <span className="col-span-2 text-center text-[#FFE066] font-semibold text-[11px] sm:text-xs sm:col-auto drop-shadow-[0_0_10px_rgba(255,224,102,0.5)]">
          &amp; national hackathon podiums
        </span>
      </motion.div>

      {/* ── 5. RADIANT CALL-TO-ACTIONS ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.38 }}
        className="flex w-full max-w-[36rem] flex-col items-center gap-3 mt-6 px-2 sm:mt-6 sm:px-0"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
          {/* Primary CTA: Explore Work (Electric Tactical Warm Orange) */}
          <Link
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#F25C2A] to-[#FF4500] text-white px-7 py-2.5 sm:px-8 sm:py-3 font-oswald font-bold text-sm sm:text-base tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(242,92,42,0.6),0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_42px_rgba(255,107,0,0.85)]"
          >
            <span>Explore Work</span>
            <span className="text-xs font-bold">↓</span>
          </Link>

          {/* Secondary CTA: View Resume (Luminous Glass Pill) */}
          <Link
            href="/resume"
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 text-white bg-black/50 backdrop-blur-md px-7 py-2.5 sm:px-8 sm:py-3 font-oswald font-semibold text-sm sm:text-base tracking-wider hover:border-[#00E5FF] hover:bg-white/15 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_28px_rgba(0,229,255,0.45)]"
          >
            <FileText className="h-4 w-4" />
            <span>View Resume</span>
          </Link>
        </div>

        {/* Tertiary CTA: Let's Talk (Electric Interactive Status Link) */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-zinc-100 hover:text-white font-mono text-sm sm:text-sm tracking-wide transition-colors group mt-1"
        >
          <span className="h-2 w-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-pulse" />
          <span>Let&apos;s Talk</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00E5FF]" />
        </Link>
      </motion.div>

    </div>
  );
}
