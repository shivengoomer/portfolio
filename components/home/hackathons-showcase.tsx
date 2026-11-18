"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Calendar,
  Award,
  ExternalLink,
  MapPin,
  Building,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Users,
} from "lucide-react";

import { hackathonEvents, EventItem } from "@/config/events";
import { certsUnsorted } from "@/config/certs";
import { cn } from "@/lib/utils";

type ShowcaseCategory = "all" | "organized" | "competitions" | "certifications";

interface UnifiedShowcaseItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  category: "organized" | "competitions" | "certifications";
  date: string;
  location?: string;
  organization: string;
  description: string;
  link?: string;
  badgeType?: "mentor" | "organizer" | "winner" | "cert";
}

export function HackathonsShowcase() {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<UnifiedShowcaseItem | null>(null);

  // Combine events and certificates into unified showcase list
  const unifiedItems: UnifiedShowcaseItem[] = useMemo(() => {
    const events: UnifiedShowcaseItem[] = hackathonEvents.map((evt, idx) => ({
      id: `evt-${idx}`,
      src: evt.src,
      title: evt.title,
      subtitle: evt.subtitle,
      tag: evt.tag,
      category: evt.category,
      date: evt.date,
      location: evt.location,
      organization: evt.organization,
      description: evt.description,
      badgeType: evt.tag.toLowerCase().includes("mentor")
        ? "mentor"
        : evt.tag.toLowerCase().includes("organizer")
        ? "organizer"
        : "winner",
    }));

    const certs: UnifiedShowcaseItem[] = certsUnsorted.map((cert, idx) => ({
      id: `cert-${idx}`,
      src:
        idx === 0
          ? "/events/hackwie-certificate.jpg"
          : idx === 1
          ? "/events/build-up-ideathon.jpg"
          : "/events/digital-cyberhunt-ctf.jpg",
      title: cert.repo,
      subtitle: `${cert.repoOwner} · Certified Credential`,
      tag: "Verified Credential",
      category: "certifications",
      date: cert.contibutionDescription.split("\n")[1] || "Issued 2025",
      organization: cert.repoOwner,
      description: cert.contibutionDescription,
      link: cert.link,
      badgeType: "cert",
    }));

    return [...events, ...certs];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return unifiedItems;
    return unifiedItems.filter((it) => it.category === activeCategory);
  }, [unifiedItems, activeCategory]);

  // Reset active index when category changes
  const handleCategoryChange = (cat: ShowcaseCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              <Trophy className="h-3.5 w-3.5" />
              Impact &amp; Credentials
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-text">
              Events Organized &amp; Certifications
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-text-muted leading-relaxed">
              Hackathons organized, campus leadership, technical mentorship, and verified certifications.
              Hover or click any capsule to expand the dossier.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-surface p-1.5 text-xs font-mono">
            {(
              [
                { id: "all", label: "All Works" },
                { id: "organized", label: "Events Organized" },
                { id: "competitions", label: "Hackathons" },
                { id: "certifications", label: "Certifications" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-all duration-200 whitespace-nowrap",
                  activeCategory === tab.id
                    ? "bg-accent text-white font-semibold shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CAPSULE STRIP GALLERY ACCORDION ── */}
        <div className="relative w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
          <div className="flex items-stretch gap-2.5 sm:gap-3 h-[380px] sm:h-[430px] min-w-[720px] md:min-w-0">
            {filteredItems.slice(0, 8).map((item, index) => {
              const isExpanded = activeIndex === index;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                  }}
                  className={cn(
                    "relative overflow-hidden cursor-pointer select-none transition-all duration-300 border border-border/80 group",
                    isExpanded
                      ? "flex-[3.5] rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] border-accent/40"
                      : "flex-[0.65] rounded-full hover:flex-[0.85] opacity-75 hover:opacity-100"
                  )}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full bg-surface-2">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-500",
                        isExpanded ? "scale-100 group-hover:scale-105" : "scale-110"
                      )}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    {/* Dark gradient overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 transition-opacity duration-300",
                        isExpanded
                          ? "bg-gradient-to-t from-black/90 via-black/40 to-black/20"
                          : "bg-black/55 group-hover:bg-black/35"
                      )}
                    />
                  </div>

                  {/* ── EXPANDED STATE CONTENT ── */}
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8"
                    >
                      {/* Top Bar: Tag & Index */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                            {item.badgeType === "mentor" && <Sparkles className="h-3 w-3 text-accent" />}
                            {item.badgeType === "organizer" && <Users className="h-3 w-3 text-emerald-400" />}
                            {item.badgeType === "winner" && <Trophy className="h-3 w-3 text-amber-400" />}
                            {item.badgeType === "cert" && <Award className="h-3 w-3 text-cyan-400" />}
                            {item.tag}
                          </span>
                          <span className="font-mono text-xs text-white/70">
                            {item.date}
                          </span>
                        </div>

                        <span className="font-mono text-xs text-white/40">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Bottom Info & Action */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                            {item.organization}
                          </p>
                          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white leading-tight">
                            {item.title}
                          </h3>
                          <p className="font-mono text-xs text-white/70 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2 max-w-lg">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110 shadow-lg"
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                            View Certificate
                          </button>

                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/40 px-3.5 py-2 font-mono text-xs font-medium text-white hover:bg-black/60 transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Verify
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── COLLAPSED VERTICAL CAPSULE STRIP ── */
                    <div className="relative z-10 flex h-full flex-col justify-between items-center py-6 px-2">
                      <span className="font-mono text-[10px] text-white/50">
                        #{String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Rotated Vertical Title */}
                      <div
                        className="origin-center whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        <span className="font-heading text-xs font-bold uppercase tracking-widest text-white/90">
                          {item.title}
                        </span>
                      </div>

                      <div className="h-2 w-2 rounded-full bg-accent/60" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Archive Nav */}
        <div className="flex items-center justify-between pt-2">
          <p className="font-mono text-xs text-text-muted">
            Hover or tap to reveal authentic credentials and tenure recognition
          </p>
          <Link
            href="/cert"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
          >
            Complete Credentials Archive
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* ── MODAL LIGHTBOX ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border bg-surface-2 p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="font-heading text-base font-bold uppercase text-text truncate max-w-md">
                    {selectedItem.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg p-1.5 text-text-muted hover:bg-surface hover:text-text transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="relative aspect-[4/3] w-full bg-black/40">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border bg-surface p-4 text-xs font-mono">
                <div>
                  <p className="font-semibold text-text">{selectedItem.organization}</p>
                  <p className="text-text-muted">{selectedItem.subtitle}</p>
                </div>
                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-bold text-white hover:brightness-110 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Verify Authenticity
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
