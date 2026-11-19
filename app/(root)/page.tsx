"use client";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import dynamic from "next/dynamic";
const GitHubScrollCityGraph = dynamic(
  () => import("@/components/github/github-scroll-city-graph").then((m) => m.GitHubScrollCityGraph),
  { ssr: false, loading: () => <div className="h-[640px] w-full rounded-3xl border border-border/80 bg-surface/70" /> }
);
import { FeaturedWorkShowcase } from "@/components/home/featured-work-showcase";
import { HomeSkillsMarquee } from "@/components/skills/home-skills-marquee";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DeliveryFramework } from "@/components/common/delivery-framework";
import { HackathonsShowcase } from "@/components/home/hackathons-showcase";
import { EditorialHeroSection } from "@/components/home/editorial-hero-section";

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-72px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 72,
                damping: 17,
                delay,
              },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}


// ─── Main page ────────────────────────────────────────────────────────────────
export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Full Stack Developer",
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.leetcode,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
  };

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="relative isolate">
        {/* ── HERO ── with parallax scroll effect */}
        <section
          className="relative isolate flex min-h-[95vh] w-full items-center justify-center overflow-hidden bg-[#12070d] px-4 py-16 sm:py-24"
          aria-label="Hero"
        >
          {/* Background Video — parallax */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden [transform:translateZ(0)]">
            <video
              ref={heroVideoRef}
              preload="auto"
              poster="/bg-portfolio-poster.webp"
              disablePictureInPicture
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full [transform:translateZ(0)] object-cover object-[56%_center] opacity-60 sm:object-center sm:opacity-75"
            >
              <source src="/bg-portfolio.mp4" type='video/mp4; codecs="avc1.640028"' />
              <source src="/bg-portfolio.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,7,13,0.3)_0%,rgba(18,7,13,0.08)_42%,rgba(18,7,13,0.56)_100%)] sm:bg-[linear-gradient(180deg,rgba(18,7,13,0.18)_0%,rgba(18,7,13,0.02)_44%,rgba(18,7,13,0.46)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#12070d] via-[#12070d]/80 to-transparent pointer-events-none" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center">
            <div className="pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_62%_58%_at_50%_45%,rgba(18,7,13,0.45),transparent_72%)] sm:bg-[radial-gradient(ellipse_56%_58%_at_50%_45%,rgba(18,7,13,0.3),transparent_72%)]" />
            <EditorialHeroSection />
          </div>
        </section>

        {/* ── SKILLS MARQUEE: TECH I WORK WITH ── */}
        <HomeSkillsMarquee />

        {/* ── CAREER / ENGINEERING HISTORY ── */}
        <DeliveryFramework />

        {/* ── GITHUB 2D TO 3D SCROLL CITY ── */}
        <section
            id="github-city"
            className="scroll-mt-20 px-4 py-8 sm:px-6 md:py-20 lg:px-8"
            aria-labelledby="github-city-title"
          >
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
              {/* Section heading */}
              <Reveal y={24} delay={0.05}>
                <div className="max-w-2xl space-y-2 sm:space-y-3">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-xs flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39d353] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39d353]" />
                    </span>
                    Production Cadence · 3D Isometric Voxel City
                  </p>
                  <h2
                    id="github-city-title"
                    className="font-heading text-2xl font-bold tracking-tight text-text sm:text-4xl"
                  >
                    GitHub Contribution Metropolis
                  </h2>
                  <p className="text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
                    Every commit is an architectural voxel building. Scroll down or drag to explore the skyline as daily engineering activity rises into an interactive 3D metropolis.
                  </p>
                </div>
              </Reveal>

              {/* Scroll-Driven 2D to 3D City Graph */}
              <Reveal y={32} delay={0.1}>
                <GitHubScrollCityGraph />
              </Reveal>
            </div>
          </section>

        {/* ── FEATURED PROJECTS SHOWCASE ── */}
        <FeaturedWorkShowcase projects={Projects} />

        {/* ── TIMELINE: HACKATHONS, EVENTS & CERTIFICATES ── */}
        <HackathonsShowcase />
      </div>
    </ClientPageWrapper>
  );
}
