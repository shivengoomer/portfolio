"use client";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { GitHubProfileCard } from "@/components/github/github-profile-card";
import { LeetCodeProfileCard } from "@/components/leetcode/leetcode-profile-card";
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

// ─── Mobile-only tab toggle ───────────────────────────────────────────────────
function CodeProfileTabs() {
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github");
  return (
    <div className="md:hidden">
      <div className="mb-3 flex rounded-xl border border-border bg-surface-2 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("github")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
            activeTab === "github"
              ? "bg-background text-text shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          GitHub
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("leetcode")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
            activeTab === "leetcode"
              ? "bg-background text-text shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          LeetCode
        </button>
      </div>
      {activeTab === "github" ? <GitHubProfileCard /> : <LeetCodeProfileCard />}
    </div>
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

        {/* ── CODE PROFILES ── */}
        <Reveal y={40} delay={0}>
          <section
            className="scroll-mt-20 px-4 py-8 sm:px-6 md:py-20 lg:px-8"
            aria-labelledby="code-profiles-title"
          >
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
              {/* Section heading */}
              <Reveal y={24} delay={0.05}>
                <div className="max-w-2xl space-y-2 sm:space-y-3">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted sm:text-xs">
                    Code Profiles
                  </p>
                  <h2
                    id="code-profiles-title"
                    className="font-heading text-xl font-semibold tracking-tight text-text sm:text-3xl"
                  >
                    GitHub + LeetCode
                  </h2>
                  <p className="text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
                    Live snapshots of shipped code, contribution activity,
                    competitive programming stats, and coding consistency.
                  </p>
                </div>
              </Reveal>

              {/* Mobile: two-tab toggle */}
              <Reveal y={24} delay={0.1}>
                <CodeProfileTabs />
              </Reveal>

              {/* Desktop: side-by-side */}
              <div className="hidden gap-4 md:grid xl:grid-cols-2 xl:items-start">
                <Reveal y={32} delay={0.08}>
                  <GitHubProfileCard />
                </Reveal>
                <Reveal y={32} delay={0.16}>
                  <div className="xl:sticky xl:top-24">
                    <LeetCodeProfileCard />
                  </div>
                </Reveal>
              </div>
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
