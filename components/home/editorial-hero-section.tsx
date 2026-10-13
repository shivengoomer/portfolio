"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* ── STICKER 1: FULL STACK LEAD (LIME GREEN 24-POINT STARBURST, MIRRORS QUANT BADGE) ── */
function TacticalStarSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ delay: 0.25, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.09, rotate: -16 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="absolute top-[0.02em] right-[100%] mr-[0.08em] z-10 w-[0.88em] h-[0.88em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* SVG background: Lime green 24-point starburst matching Quant badge */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full pointer-events-none drop-shadow-sm"
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

        {/* Centered normal HTML text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-semibold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
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

/* ── STICKER 2: HAZARD AMBER INDUSTRIAL STADIUM BADGE ("SYSTEMS / ARCHITECT") ── */
function TacticalStadiumSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ delay: 0.35, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.09, rotate: -1 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="relative z-10 w-[1.15em] h-[0.62em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* SVG background: Chamfered stadium badge with rivets and white die-cut border */}
        <svg
          viewBox="0 0 120 70"
          className="w-full h-full pointer-events-none drop-shadow-sm"
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
          {/* Subtle industrial rivet accents */}
          <circle cx="15" cy="35" r="2.2" fill="#0B132B" opacity="0.4" />
          <circle cx="105" cy="35" r="2.2" fill="#0B132B" opacity="0.4" />
        </svg>

        {/* Centered normal HTML text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-semibold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
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

/* ── STICKER 3: ELECTRIC CYAN 24-POINT STARBURST ("QUANT & / GENAI") ── */
function CyanStarburstSticker({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: 12 }}
      animate={{ opacity: 1, scale: 1, rotate: 12 }}
      transition={{ delay: 0.45, type: "spring", stiffness: 340, damping: 20 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.09, rotate: 16 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.45}
      className="absolute top-[0.02em] left-[100%] ml-[0.08em] z-10 w-[0.88em] h-[0.88em] cursor-grab active:cursor-grabbing select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] pointer-events-auto"
      title="Drag me!"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* SVG background: Electric cyan 24-point starburst with white die-cut border */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full pointer-events-none drop-shadow-sm"
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

        {/* Centered normal HTML text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span
            className="font-oswald font-semibold uppercase text-[#0B132B] leading-[1.08] tracking-[0.02em] whitespace-nowrap select-none text-center block"
            style={{
              fontFamily: "var(--font-oswald), Oswald, sans-serif",
              fontSize: "0.14em",
              letterSpacing: "0.02em",
            }}
          >
            Quant &
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
  {
    name: "PanScience Innovations",
    logo: "/experience/panscience.png",
    url: "https://www.linkedin.com/company/panscience-innovations/",
  },
  {
    name: "House of Couton",
    logo: "/experience/hoc.png",
    url: "",
  },
  {
    name: "GNCIPL",
    logo: "/experience/gncipl-logo.png",
    url: "https://www.gncipl.com",
  },
  {
    name: "Geek Room",
    logo: "/experience/geekroom-logo.png",
    url: "https://www.linkedin.com/company/geek-room-msit/",
  },
];

export function EditorialHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center select-none py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 overflow-x-clip">
      {/* ── SUBTLE DARK RADIAL GRADIENT SCRIM BEHIND TEXT BLOCK ── */}
      <div
        className="absolute -inset-x-6 sm:-inset-x-16 -inset-y-6 sm:-inset-y-12 pointer-events-none -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* ── 1. GIANT NAME WITH 3 HIGH-ENERGY STREET/TECH STICKER BADGES ── */}
      <div className="relative inline-block w-fit max-w-full mx-auto text-center px-12 sm:px-16 md:px-20 lg:px-24">
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-oswald font-semibold uppercase text-white tracking-[-0.01em] leading-[0.88] md:leading-[0.85] text-center w-full select-none"
          style={{
            fontFamily: "var(--font-oswald), Oswald, sans-serif",
            fontSize: "clamp(2.5rem, 7.5vw, 9.2rem)",
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
          }}
        >
          {/* Word 1: SHIVEN (has Full Stack Lead starburst beside S) */}
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

          {/* Word 2: GOOMER (has Quant & GenAI starburst beside R) */}
          <span className="relative flex md:inline-flex items-baseline justify-center">
            <span>GOOME</span>
            <span className="relative inline-block">
              <CyanStarburstSticker shouldReduceMotion={shouldReduceMotion} />
              <span>R</span>
            </span>
          </span>
        </motion.h1>
      </div>

      {/* ── 2. TAGLINE DIRECTLY UNDER THE NAME (~1/3 CAP HEIGHT, OSWALD 500, LOWERCASE) ── */}
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-oswald font-[500] lowercase text-orange-400 tracking-tight mt-3 sm:mt-4 text-center"
        style={{
          fontFamily: "var(--font-oswald), Oswald, sans-serif",
          fontSize: "clamp(1.15rem, 3.2vw, 2.9rem)",
          lineHeight: "1.15",
          textShadow: "0 2px 16px rgba(0,0,0,0.5)",
        }}
      >
        0→1 systems & full-stack engineer
      </motion.p>

      {/* ── 3. HEADLINE LINE IN CONTRASTING INSTRUMENT SERIF ITALIC (28-36PX) ── */}
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif italic text-white/95 text-center mt-3 sm:mt-4 max-w-[92vw] sm:max-w-3xl md:max-w-4xl mx-auto px-2 leading-[1.35] break-words"
        style={{
          fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
          fontSize: "clamp(1.2rem, 2.5vw, 2.25rem)",
          textShadow: "0 2px 14px rgba(0,0,0,0.55)",
        }}
      >
        I build quant trading platforms and AI retrieval systems{" "}
        <span className="inline-flex items-center -space-x-1.5 align-middle mx-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-md -translate-y-0.5 hover:space-x-1 transition-all duration-300">
          {workedAtCompanies.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white p-0.5 border border-white/40 shadow-xs overflow-hidden transition-transform duration-200 hover:scale-110 hover:z-20"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-full h-full object-contain rounded-full"
              />
            </span>
          ))}
        </span>{" "}
        that hold up in production.
      </motion.p>

      {/* ── 4. BUTTONS ROW (~30-40PX BELOW) ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.36 }}
        className="flex flex-col items-center gap-2 mt-4 sm:mt-5"
      >
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {/* Primary Button: Book a short call (tactical warm orange #F25C2A, soft glow shadow) */}
          <a
            href="mailto:shivengoomer@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-[#F25C2A] text-white px-5 py-2 sm:px-7 sm:py-3 font-oswald font-[500] text-sm sm:text-base tracking-wide hover:bg-[#ff6935] active:scale-95 transition-all shadow-[0_4px_22px_rgba(242,92,42,0.45)]"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            Book a short call
          </a>

          {/* Secondary Button: Resume (PDF) */}
          <Link
            href="/resume"
            target="_blank"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/40 text-white bg-black/40 backdrop-blur-md px-5 py-2 sm:px-7 sm:py-3 font-oswald font-[500] text-sm sm:text-base tracking-wide hover:bg-white/15 active:scale-95 transition-all shadow-xl"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            Resume (PDF)
          </Link>
        </div>

        {/* Demoted Explore Projects to a text link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-zinc-300 hover:text-white font-oswald font-[500] text-xs sm:text-sm tracking-wide transition-colors group mt-0.5"
          style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
        >
          <span>Explore Projects</span>
          <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>



      {/* ── 6. THIN 3-ITEM STAT STRIP SEPARATED BY VERTICAL DIVIDERS ── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.52 }}
        className="flex items-center justify-center gap-2.5 sm:gap-6 md:gap-8 mt-3.5 sm:mt-4 px-3 sm:px-6 md:px-7 py-1.5 sm:py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/15 shadow-xl max-w-[94vw] sm:max-w-none"
      >
        {/* Stat 1: Projects Shipped (REAL: 18+) */}
        <div className="flex flex-col items-center text-center">
          <span
            className="font-oswald font-semibold text-lg sm:text-2xl text-white tracking-tight leading-none"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            18+
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-300 mt-0.5 font-sans whitespace-nowrap">
            Projects Shipped
          </span>
        </div>

        {/* Divider 1 */}
        <div className="h-5 sm:h-6 w-px bg-white/20" />

        {/* Stat 2: Hackathons (REAL: 5+) */}
        <div className="flex flex-col items-center text-center">
          <span
            className="font-oswald font-semibold text-lg sm:text-2xl text-white tracking-tight leading-none"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            5+
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-300 mt-0.5 font-sans whitespace-nowrap">
            Hackathons
          </span>
        </div>

        {/* Divider 2 */}
        <div className="h-5 sm:h-6 w-px bg-white/20" />

        {/* Stat 3: CGPA / Years building (Placeholder metric) */}
        <div className="flex flex-col items-center text-center">
          <span
            className="font-oswald font-semibold text-sm sm:text-lg text-amber-300/90 tracking-tight leading-none"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            [add metric]
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-300 mt-0.5 font-sans whitespace-nowrap">
            CGPA / Years
          </span>
        </div>
      </motion.div>
    </div>
  );
}
