"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skills } from "@/config/skills";

const SPEED = -70; // px per second
const MIN_SCALE = 0.7; // text scale at the center (pinched part of the band)
const MAX_SCALE = 1.3; // text scale at the edges

/** White band that pinches in the middle; text shrinks toward the center and grows toward the edges. */
export function BendingSkillsMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Repeat the list 3x so the loop always covers wide screens
  const names = skills.map((s) => s.name.trim());
  const items = [...names, ...names, ...names];

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const els = Array.from(track.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let lefts: number[] = [];
    let widths: number[] = [];
    let loop = 1;
    let offset = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const measure = () => {
      W = wrap.clientWidth;
      lefts = els.map((e) => e.offsetLeft);
      widths = els.map((e) => e.offsetWidth);
      loop = track.scrollWidth / 3;
    };

    const render = () => {
      for (let i = 0; i < els.length; i++) {
        let cx = lefts[i] + widths[i] / 2 - offset;
        cx = ((cx % (loop * 3)) + loop * 3) % (loop * 3);
        // wrap so item appears at x in [-loop, 2*loop)
        if (cx > loop * 2) cx -= loop * 3;
        const t = Math.min(1, Math.abs(cx - W / 2) / (W / 2));
        const smooth = t * t * (3 - 2 * t);
        const s = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * smooth;
        els[i].style.transform = `translate3d(${cx - (lefts[i] + widths[i] / 2) + offset}px,0,0) scale(${s})`;
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        return;
      }
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      offset = (((offset + (SPEED * dt) / 1000) % loop) + loop) % loop;
      render();
    };

    measure();
    render();
    if (document.fonts?.ready) document.fonts.ready.then(() => { measure(); render(); });

    const ro = new ResizeObserver(() => { measure(); render(); });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(wrap);

    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden select-none" aria-label="Skills & Technologies Marquee">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/80 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text">Tech I Work With</h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl">
              Languages, distributed systems, modern web frameworks, and AI inference engines.
            </p>
          </div>
          <Link
            href="/skills"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline w-fit"
          >
            <span>View Full Matrix</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative h-[120px] sm:h-[150px] w-full overflow-hidden bg-zinc-50 text-zinc-950"
        style={{
          clipPath:
            "polygon(0 0, 35% 17%, 65% 17%, 100% 0, 100% 100%, 65% 83%, 35% 83%, 0 100%)",
        }}
      >
        <div ref={trackRef} className="absolute inset-y-0 left-0 flex w-max items-center whitespace-nowrap will-change-transform">
          {items.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-6 sm:gap-10 pr-6 sm:pr-10 font-heading text-2xl sm:text-4xl font-bold tracking-tight will-change-transform"
            >
              <span>{name}</span>
              <span aria-hidden className="text-xl sm:text-3xl font-normal">✳</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
