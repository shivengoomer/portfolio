"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Calendar,
  Layers,
  RotateCw,
  Compass,
  Maximize2,
  ExternalLink,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import CircularCarousel, {
  CircularCarouselPreset,
} from "@/components/CircularCarousel";
import { hackathonEvents, EventItem } from "@/config/events";
import { cn } from "@/lib/utils";

type FilterCategory = "all" | "organized" | "competitions";

const PRESET_OPTIONS: { id: CircularCarouselPreset; label: string; icon: typeof Layers }[] = [
  { id: "cylinder", label: "Cylinder", icon: Layers },
  { id: "orbit", label: "Orbit", icon: Compass },
  { id: "panorama", label: "Panorama", icon: Maximize2 },
  { id: "wheel", label: "Wheel", icon: RotateCw },
];

export function HackathonsShowcase() {
  const [preset, setPreset] = useState<CircularCarouselPreset>("cylinder");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Filter items based on selected category
  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return hackathonEvents;
    return hackathonEvents.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeEvent = filteredEvents[activeIndex] || filteredEvents[0];

  const handleFilterChange = (cat: FilterCategory) => {
    setActiveFilter(cat);
    setActiveIndex(0);
  };

  // Responsive card width so cards appear significantly larger and clearer
  const [cardWidth, setCardWidth] = useState(420);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setCardWidth(290);
      } else if (window.innerWidth < 1024) {
        setCardWidth(360);
      } else {
        setCardWidth(420);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="hackathons-and-events"
      className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden select-none"
      aria-label="Hackathons and Events Organized"
    >
      <div className="relative z-10 mx-auto max-w-6xl space-y-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
              Hackathons & Community
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Events Organized & Competitions
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-text-muted">
              Certificates of Appreciation for organizing university ideathons and CTFs, alongside national hackathon finalist credentials.
            </p>
          </div>

          {/* ── FILTER & PRESET CONTROLS ── */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl bg-surface-2 p-1 border border-border">
              {(
                [
                  { id: "all", label: `All (${hackathonEvents.length})` },
                  { id: "organized", label: `Leadership & Organized (${hackathonEvents.filter((e) => e.category === "organized").length})` },
                  { id: "competitions", label: `Hackathons (${hackathonEvents.filter((e) => e.category === "competitions").length})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  type="button"
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    activeFilter === tab.id
                      ? "bg-accent text-[#FDF9E7] shadow-sm font-semibold"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3D Perspective Preset Switcher */}
            <div className="hidden sm:inline-flex rounded-xl bg-surface-2 p-1 border border-border">
              {PRESET_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isActive = preset === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPreset(opt.id)}
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      isActive
                        ? "bg-accent text-[#FDF9E7] shadow-sm font-semibold"
                        : "text-text-muted hover:text-text"
                    )}
                    title={`Switch 3D perspective to ${opt.label}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 3D CIRCULAR CAROUSEL STAGE ── */}
        <div className="editorial-card relative rounded-3xl p-2 sm:p-5 overflow-hidden">
          {/* Subtle hint */}
          <div className="absolute top-4 left-5 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border text-[11px] font-mono text-text-muted shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Drag to rotate · Click card to inspect certificate</span>
            </span>
          </div>

          <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] overflow-hidden rounded-2xl">
            <CircularCarousel
              key={`${activeFilter}-${preset}-${cardWidth}`}
              items={filteredEvents}
              preset={preset}
              intro="rise"
              cardWidth={cardWidth}
              aspectRatio={1.38}
              curve={0}
              tilt={-3}
              gap={36}
              speed={9}
              autoplay="drift"
              fadeColor="#170A10"
              depthFade={0.42}
              captions={true}
              pauseOnHover={true}
              focusOnClick={true}
              onChange={(index) => setActiveIndex(index)}
              onItemClick={(item) => setSelectedEvent(item as EventItem)}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* ── CLEAN SPOTLIGHT (NECESSARY INFO ONLY) ── */}
        {activeEvent && (
          <motion.div
            key={activeEvent.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="editorial-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-tint-green text-tint-ink px-2 py-0.5 text-xs font-bold">
                  <Trophy className="h-3 w-3" />
                  {activeEvent.tag}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-text-muted">
                  <Calendar className="h-3 w-3" />
                  {activeEvent.date}
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-text">
                {activeEvent.title}
              </h3>

              <p className="text-xs sm:text-sm text-text-muted">
                {activeEvent.organization}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(activeEvent)}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[12px] text-xs font-semibold bg-accent text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              <span>View Certificate</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}

        {/* ── HIGH-RES CERTIFICATE MODAL ── */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="editorial-card relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded bg-tint-green px-2 py-0.5 text-[11px] font-bold text-tint-ink">
                      {selectedEvent.tag}
                    </span>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-text truncate">
                      {selectedEvent.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    type="button"
                    className="rounded-lg p-1.5 text-text-muted hover:text-text hover:bg-surface transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Certificate Display */}
                <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-surface">
                  <img
                    src={selectedEvent.src}
                    alt={selectedEvent.alt}
                    className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-xl border border-border"
                  />
                </div>

                {/* Modal Footer: Necessary details only */}
                <div className="px-5 py-3.5 border-t border-border bg-surface-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    <span>{selectedEvent.organization} · {selectedEvent.date}</span>
                  </div>

                  <a
                    href={selectedEvent.src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline transition-colors"
                  >
                    <span>Open full image</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
