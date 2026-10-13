"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Globe } from "lucide-react";
import { SocialLinks } from "@/config/socials";

const companies = [
  { name: "PanScience", logo: "/experience/panscience.png" },
  { name: "House of Couton", logo: "/experience/hoc.png" },
  { name: "GNCIPL", logo: "/experience/gncipl-logo.png" },
  { name: "Geek Room", logo: "/experience/geekroom-logo.png" },
];

/* ── 1. MINT FLOWER STICKER (5-PETAL ORGANIC FLOWER) ── */
function FlowerSticker({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: -10 }}
      whileHover={{ scale: 1.1, rotate: -4 }}
      className={`relative inline-flex items-center justify-center select-none cursor-default drop-shadow-xl ${className}`}
    >
      <svg viewBox="0 0 120 120" className="w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26">
        <g fill="#A7F3D0">
          <circle cx="60" cy="32" r="24" />
          <circle cx="87" cy="51" r="24" />
          <circle cx="77" cy="85" r="24" />
          <circle cx="43" cy="85" r="24" />
          <circle cx="33" cy="51" r="24" />
          <circle cx="60" cy="60" r="26" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-[1.05] pointer-events-none">
        <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-tight text-emerald-950 font-sans">
          Systems
        </span>
        <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-tight text-emerald-950 font-sans">
          Architect
        </span>
      </div>
    </motion.div>
  );
}

/* ── 2. SCALLOPED CLOUD STICKER (PUFFY PINK BUBBLE) ── */
function CloudSticker({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: 6 }}
      animate={{ opacity: 1, scale: 1, rotate: 3 }}
      whileHover={{ scale: 1.1, rotate: 0 }}
      className={`relative inline-flex items-center justify-center select-none cursor-default drop-shadow-xl ${className}`}
    >
      <svg viewBox="0 0 140 85" className="w-20 h-13 sm:w-26 sm:h-16 md:w-30 md:h-18">
        <g fill="#FBCFE8">
          <rect x="25" y="18" width="90" height="48" rx="24" />
          <circle cx="35" cy="24" r="16" />
          <circle cx="65" cy="16" r="18" />
          <circle cx="95" cy="20" r="16" />
          <circle cx="115" cy="42" r="16" />
          <circle cx="95" cy="64" r="16" />
          <circle cx="65" cy="68" r="18" />
          <circle cx="35" cy="60" r="16" />
          <circle cx="20" cy="42" r="16" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-[1.05] pointer-events-none">
        <span className="text-[11px] sm:text-[12px] md:text-[13px] font-black text-pink-950 font-sans">
          Quant &
        </span>
        <span className="text-[11px] sm:text-[12px] md:text-[13px] font-black text-pink-950 font-sans">
          GenAI
        </span>
      </div>
    </motion.div>
  );
}

/* ── 3. SHARP STARBURST STICKER (24-POINT LAVENDER STAR) ── */
function StarburstSticker({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
      animate={{ opacity: 1, scale: 1, rotate: 8 }}
      whileHover={{ scale: 1.1, rotate: 14 }}
      className={`relative inline-flex items-center justify-center select-none cursor-default drop-shadow-xl ${className}`}
    >
      <svg viewBox="0 0 120 120" className="w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28">
        <polygon
          points="60.0,4.0 65.5,18.4 74.5,5.9 76.1,21.2 88.0,11.5 85.6,26.7 99.6,20.4 93.3,34.4 108.5,32.0 98.8,43.9 114.1,45.5 101.6,54.5 116.0,60.0 101.6,65.5 114.1,74.5 98.8,76.1 108.5,88.0 93.3,85.6 99.6,99.6 85.6,93.3 88.0,108.5 76.1,98.8 74.5,114.1 65.5,101.6 60.0,116.0 54.5,101.6 45.5,114.1 43.9,98.8 32.0,108.5 34.4,93.3 20.4,99.6 26.7,85.6 11.5,88.0 21.2,76.1 5.9,74.5 18.4,65.5 4.0,60.0 18.4,54.5 5.9,45.5 21.2,43.9 11.5,32.0 26.7,34.4 20.4,20.4 34.4,26.7 32.0,11.5 43.9,21.2 45.5,5.9 54.5,18.4"
          fill="#C7D2FE"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-[1.05] pointer-events-none -rotate-6">
        <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-tight text-indigo-950 font-sans">
          Full Stack
        </span>
        <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-tight text-indigo-950 font-sans">
          Lead
        </span>
      </div>
    </motion.div>
  );
}

export function HeroCreativeSection() {
  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center select-none pt-4 pb-8">
      {/* ── TOP: AVAILABILITY STATUS PILL ── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/85 px-4 py-1.5 text-xs font-mono backdrop-blur-md shadow-lg mb-6 text-zinc-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-medium text-white">Available for roles</span>
        <span className="text-zinc-600">·</span>
        <span className="flex items-center gap-1 text-zinc-400">
          <Globe className="h-3 w-3" />
          <span>New Delhi, India · UTC+5:30</span>
        </span>
      </motion.div>

      {/* ── EDITORIAL DISPLAY HEADLINE WITH BESPOKE GRAPHIC STICKERS (EXACT MATCH TO REFERENCE) ── */}
      <div className="relative inline-block mb-4 px-6 sm:px-10">
        {/* Mint Flower Sticker overlapping 'S' */}
        <FlowerSticker className="absolute -top-6 -left-2 sm:-top-8 sm:-left-4 md:-top-10 md:-left-8 z-20" />

        {/* Pink Scalloped Cloud Sticker overlapping between words */}
        <CloudSticker className="absolute -top-3 left-[47%] -translate-x-1/2 sm:-top-4 md:-top-5 z-20" />

        {/* Lavender Starburst Sticker overlapping 'R' */}
        <StarburstSticker className="absolute -top-5 -right-3 sm:-top-8 sm:-right-6 md:-top-10 md:-right-8 z-20" />

        {/* Headline Typography (Tall, Condensed, Impactful Display) */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] leading-none">
          SHIVEN GOOMER
        </h1>
      </div>

      {/* Sub-headline directly under the headline (Exact reference style) */}
      <p className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-zinc-200 lowercase tracking-tight mb-8 drop-shadow-md">
        0 → 1 systems & full-stack engineer
      </p>

      {/* ── EDITORIAL CONSOLE WITH NARRATIVE & LOGOS ── */}
      <div className="flex flex-col items-center w-full max-w-2xl px-4 mb-6">
        <div className="w-full rounded-2xl border border-white/15 bg-zinc-950/85 backdrop-blur-md px-6 py-4 shadow-2xl text-center">
          <p className="text-sm sm:text-base font-normal text-zinc-100 leading-relaxed mb-3">
            Engineering quantitative trading platforms, distributed backend services, and AI-native retrieval engines.
          </p>

          {/* Clean Company Logo Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-300">
            <span className="text-zinc-400 text-xs">Shipped production code across</span>
            {companies.map((comp) => (
              <span
                key={comp.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              >
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="h-4 w-4 rounded-xs object-contain bg-white p-0.5 shrink-0"
                />
                <span className="font-medium">{comp.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTONS & SOCIAL DOCK ── */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/projects"
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-950 shadow-lg transition-all hover:bg-zinc-200"
        >
          <span>Explore Projects</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href="/resume"
          target="_blank"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-zinc-900/90 px-5 text-sm font-semibold text-zinc-100 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800"
        >
          <FileText className="h-4 w-4 text-zinc-400" />
          <span>Resume (PDF)</span>
        </Link>

        {/* Social Icons Dock */}
        <div className="flex items-center gap-1.5 ml-1">
          {SocialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.link}
                target={link.link.startsWith("http") ? "_blank" : undefined}
                rel={link.link.startsWith("http") ? "noreferrer" : undefined}
                title={link.name}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-zinc-900/90 text-zinc-300 transition-colors hover:border-white/35 hover:bg-zinc-800 hover:text-white shadow-md backdrop-blur-md"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
