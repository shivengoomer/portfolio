"use client";

import React, { useState, useMemo, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Eye,
  MapPin,
  Building,
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

  // Mobile swipe ref
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  // Filter items based on selected category
  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return hackathonEvents;
    return hackathonEvents.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeEvent = filteredEvents[activeIndex] || filteredEvents[0];

  const handleFilterChange = (cat: FilterCategory) => {
    setActiveFilter(cat);
    setActiveIndex(0);
    setMobileActiveIdx(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Scroll mobile snap carousel
  const scrollMobile = (dir: "prev" | "next") => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const target =
      dir === "prev"
        ? Math.max(0, container.scrollLeft - cardWidth)
        : Math.min(container.scrollWidth, container.scrollLeft + cardWidth);
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const idx = Math.round(container.scrollLeft / cardWidth);
    setMobileActiveIdx(Math.max(0, Math.min(filteredEvents.length - 1, idx)));
  };

  // Responsive card width for desktop 3D carousel
  const [cardWidth, setCardWidth] = useState(420);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 1024) {
        setCardWidth(380);
      } else {
        setCardWidth(440);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="hackathons-and-events"
      className="relative px-4 py-12 sm:px-6 md:py-20 lg:px-8 overflow-hidden select-none"
      aria-label="Hackathons and Events Organized"
    >
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 sm:space-y-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-border pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-text-muted flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Leadership &amp; Competitions
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text">
              Events Organized &amp; Hackathons
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
              Official Certificates of Appreciation for university ideathons, Google Developer Group CTFs, and national hackathon achievements.
            </p>
          </div>

          {/* ── FILTER & PRESET CONTROLS ── */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="inline-flex w-full sm:w-auto rounded-xl bg-surface-2 p-1 border border-border overflow-x-auto scrollbar-none">
              {(
                [
                  { id: "all", label: `All (${hackathonEvents.length})` },
                  {
                    id: "organized",
                    label: `Leadership (${hackathonEvents.filter((e) => e.category === "organized").length})`,
                  },
                  {
                    id: "competitions",
                    label: `Hackathons (${hackathonEvents.filter((e) => e.category === "competitions").length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  type="button"
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0",
                    activeFilter === tab.id
                      ? "bg-accent text-[#FDF9E7] shadow-sm font-semibold"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop 3D Perspective Preset Switcher */}
            <div className="hidden lg:inline-flex rounded-xl bg-surface-2 p-1 border border-border">
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

        {/* ── MOBILE VIEW: PROPER FULL-SIZE RESPONSIVE DECK (NO SMALL SQUISHED DIVS) ── */}
        <div className="block md:hidden space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[11px] text-text-muted flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Swipe or tap card to view full certificate
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollMobile("prev")}
                disabled={mobileActiveIdx === 0}
                className="h-8 w-8 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text disabled:opacity-30 active:scale-95 transition-all"
                aria-label="Previous event"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobile("next")}
                disabled={mobileActiveIdx >= filteredEvents.length - 1}
                className="h-8 w-8 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text disabled:opacity-30 active:scale-95 transition-all"
                aria-label="Next event"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Native Touch-Snap Deck */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
          >
            {filteredEvents.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setSelectedEvent(item)}
                className="w-[86vw] max-w-[340px] shrink-0 snap-center rounded-2xl border border-border bg-surface p-4 shadow-sm active:scale-[0.99] transition-all flex flex-col justify-between cursor-pointer"
              >
                {/* Certificate Image Preview - Full, crisp, proper aspect ratio */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-2 border border-border/80 group">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-md bg-tint-green/95 text-tint-ink px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur-md">
                      <Trophy className="h-3 w-3" />
                      {item.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-black/60 text-white/90 px-2 py-0.5 text-[10px] font-mono backdrop-blur-md">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>

                  {/* Tap to expand hint */}
                  <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
                    <Eye className="h-3 w-3" />
                    <span>Tap to inspect</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="mt-3.5 space-y-1.5 flex-1">
                  <h3 className="font-heading text-lg font-bold text-text leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-accent">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
                  <span className="text-[11px] text-text-muted flex items-center gap-1 truncate max-w-[190px]">
                    <Building className="h-3 w-3 shrink-0" />
                    <span className="truncate">{item.organization}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(item);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile pagination indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {filteredEvents.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === mobileActiveIdx
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP VIEW: FULL 3D INTERACTIVE CIRCULAR CAROUSEL ── */}
        <div className="hidden md:block editorial-card relative rounded-3xl p-4 sm:p-6 overflow-hidden">
          {/* Hint */}
          <div className="absolute top-4 left-6 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border text-[11px] font-mono text-text-muted shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Drag to rotate · Click card to inspect certificate</span>
            </span>
          </div>

          <div className="relative w-full h-[580px] lg:h-[640px] overflow-hidden rounded-2xl">
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

        {/* ── DESKTOP SPOTLIGHT CARD ── */}
        {activeEvent && (
          <motion.div
            key={activeEvent.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex editorial-card rounded-2xl p-5 sm:p-6 flex-row items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-tint-green text-tint-ink px-2 py-0.5 text-xs font-bold">
                  <Trophy className="h-3 w-3" />
                  {activeEvent.tag}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-text-muted">
                  <Calendar className="h-3 w-3" />
                  {activeEvent.date}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-text-muted">
                  <MapPin className="h-3 w-3" />
                  {activeEvent.location}
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-text">
                {activeEvent.title}
              </h3>

              <p className="text-xs sm:text-sm text-text-muted">
                {activeEvent.subtitle} · {activeEvent.organization}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(activeEvent)}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[12px] text-xs font-semibold bg-accent text-[#FDF9E7] shadow-[0_8px_24px_rgba(242,92,42,0.35)] hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              <span>Inspect Certificate</span>
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
                className="editorial-card relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-surface-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded bg-tint-green px-2 py-0.5 text-[11px] font-bold text-tint-ink shrink-0">
                      {selectedEvent.tag}
                    </span>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-text truncate">
                      {selectedEvent.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    type="button"
                    className="rounded-lg p-1.5 text-text-muted hover:text-text hover:bg-surface transition-colors shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Certificate Display */}
                <div className="p-3 sm:p-6 flex flex-col items-center justify-center bg-surface overflow-y-auto">
                  <img
                    src={selectedEvent.src}
                    alt={selectedEvent.alt}
                    className="max-h-[60vh] w-auto max-w-full rounded-lg object-contain shadow-xl border border-border"
                  />
                </div>

                {/* Modal Footer */}
                <div className="px-4 sm:px-5 py-3 border-t border-border bg-surface-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-text-muted shrink-0">
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    <span className="truncate">
                      {selectedEvent.organization} · {selectedEvent.date}
                    </span>
                  </div>

                  <a
                    href={selectedEvent.src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline transition-colors shrink-0"
                  >
                    <span>Open full certificate</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
