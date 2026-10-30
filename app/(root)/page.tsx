"use client";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { GitHubScrollCityGraph } from "@/components/github/github-scroll-city-graph";
import { FeaturedWorkShowcase } from "@/components/home/featured-work-showcase";
import { HomeSkillsMarquee } from "@/components/skills/home-skills-marquee";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.96]);

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
          ref={heroRef}
          className="relative flex min-h-[95vh] w-full items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
          aria-label="Hero"
        >
          {/* Background Video — parallax */}
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center opacity-70"
            >
              <source src="/bg-portfolio.webm" type="video/webm" />
            </video>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          </motion.div>

          {/* Hero content — fades + scales out on scroll */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 w-full flex flex-col items-center justify-center"
          >
            <EditorialHeroSection />
          </motion.div>
        </section>

        {/* ── SKILLS MARQUEE ── */}
        <Reveal y={20} delay={0}>
          <HomeSkillsMarquee />
        </Reveal>

        {/* ── GITHUB 2D TO 3D SCROLL CITY ── */}
        <Reveal y={40} delay={0}>
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
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39d353]" />
                    GitHub Activity
                  </p>
                  <h2
                    id="github-city-title"
                    className="font-heading text-xl font-semibold tracking-tight text-text sm:text-3xl"
                  >
                    Contribution City
                  </h2>
                  <p className="text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
                    Scroll down to watch daily commits elevate from a flat 2D contribution graph into an isometric 3D city skyline.
                  </p>
                </div>
              </Reveal>

              {/* Scroll-Driven 2D to 3D City Graph */}
              <Reveal y={32} delay={0.1}>
                <GitHubScrollCityGraph />
              </Reveal>
            </div>
          </section>
        </Reveal>

        {/* ── FEATURED PROJECTS SHOWCASE ── */}
        <Reveal y={48} delay={0}>
          <FeaturedWorkShowcase projects={Projects} />
        </Reveal>

        {/* ── DELIVERY FRAMEWORK / PROJECT TIMELINE ── */}
        <Reveal y={48} delay={0}>
          <DeliveryFramework />
        </Reveal>

        {/* ── HACKATHONS, EVENTS & COMMUNITY SHOWCASE ── */}
        <Reveal y={48} delay={0}>
          <HackathonsShowcase />
        </Reveal>
      </div>
    </ClientPageWrapper>
  );
}
