"use client";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { GitHubProfileCard } from "@/components/github/github-profile-card";
import { HeroGrainientBg } from "@/components/common/hero-grainient-bg";
import { LeetCodeProfileCard } from "@/components/leetcode/leetcode-profile-card";
import { FeaturedWorkShowcase } from "@/components/home/featured-work-showcase";
import { HomeSkillsMarquee } from "@/components/skills/home-skills-marquee";
import { buttonVariants } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { Projects, featuredProjects } from "@/config/projects";
import { SocialLinks } from "@/config/socials";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { DeliveryFramework } from "@/components/common/delivery-framework";
import { BuilderProfileAndCta } from "@/components/home/builder-profile-and-cta";
import { HeroGlassCard } from "@/components/home/hero-glass-card";

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
  const rotatingWords = [
    "Scalable APIs",
    "AI Tooling",
    "Cloud Systems",
    "Real-Time Apps",
    "DevOps Workflows",
    "Backend Architecture",
    "Microservices",
    "Full-Stack Apps",
    "Distributed Systems",
    "Automation",
    "Dockerized Apps",
    "Modern UI",
    "Developer Tools",
    "Production Systems",
    "Secure Authentication",
  ];

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [heroQuoteIndex, setHeroQuoteIndex] = useState(0);
  const heroQuotes = [
    "Happy to see you here! 👋",
    "Let's build something great. 🚀",
    "Specialized in Next.js & Cloud Systems.",
    "Feel free to check out my projects below!",
    "B.Tech IT | Engineering scalable web apps.",
    "Based in India. Shipped worldwide.",
    "Click my avatar to cycle info!"
  ];

  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const heroCardRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const box = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setHeroTilt({
      x: (y / (box.height / 2)) * -8,
      y: (x / (box.width / 2)) * 8,
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  return (

    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="relative isolate">
        {/* ── HERO ── */}
        <section
          className="relative flex min-h-screen items-start overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-32"
          aria-label="Hero"
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg-portfolio.webm" type="video/webm" />
          </video>

          <HeroGrainientBg />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col justify-start lg:pl-2 xl:pl-0 pt-16 lg:pt-24">
            {/* Modern Impressive Hero Card */}
            <HeroGlassCard
              rotatingWords={rotatingWords}
              currentWord={currentWord}
            />

            {/* Avatar Column (Mobile/Tablet only - centered flow below card) */}
            <div className="lg:hidden w-full flex items-center justify-center relative select-none mt-16 z-[40]">
              <motion.div
                onClick={() => setHeroQuoteIndex((prev) => (prev + 1) % heroQuotes.length)}
                className="flex flex-col items-center relative cursor-pointer w-full max-w-[280px]"
              >
                {/* Mobile Welcome Greeting - Clean Text Only */}
                <div className="mb-6 w-full text-center pointer-events-none">
                  <div className="text-[8px] text-indigo-400 font-mono tracking-[0.2em] uppercase mb-1">
                    SHIVEN_SAYS:
                  </div>
                  <motion.p
                    key={heroQuoteIndex}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading text-base font-bold text-zinc-100 uppercase tracking-tight"
                  >
                    {heroQuotes[heroQuoteIndex]}
                  </motion.p>
                  <div className="text-[7px] text-zinc-500 font-mono uppercase tracking-[0.25em] mt-1.5">
                    [ CLICK AVATAR TO CYCLE ]
                  </div>
                </div>

                {/* Mobile Floating Avatar container (scale-x-[-1] mirrored) */}
                <div className="w-72 h-[360px] relative drop-shadow-[0_15px_30px_rgba(139,92,246,0.25)] flex items-center justify-center z-10">
                  <img 
                    src="/shiven-pixel-full-body.png" 
                    alt="Shiven Pixel Avatar" 
                    className="object-contain w-full h-full pixelated scale-x-[-1]"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Extreme Right Floating Avatar (Desktop only - GIGANTIC SIZING & ABSOLUTE ALIGNED) */}
          <div className="hidden lg:flex absolute right-2 xl:right-0 top-[55%] pb-5 -translate-y-1/2 z-[40] select-none lg:translate-x-12 xl:translate-x-20">
            <motion.div
              ref={heroCardRef}
              layoutId="hero-avatar"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              onClick={() => setHeroQuoteIndex((prev) => (prev + 1) % heroQuotes.length)}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: heroTilt.x,
                rotateY: heroTilt.y,
              }}
              transition={{
                x: { type: "spring", stiffness: 60, damping: 14, delay: 0.5 },
                y: { type: "spring", stiffness: 60, damping: 14, delay: 0.5 },
                scale: { type: "spring", stiffness: 60, damping: 14, delay: 0.5 },
                opacity: { duration: 0.6, delay: 0.5 },
                rotateX: { type: "spring", stiffness: 150, damping: 20 },
                rotateY: { type: "spring", stiffness: 150, damping: 20 },
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="flex flex-col items-center relative cursor-pointer w-full"
            >

              {/* 3D Floating Avatar container (30% SIZE INCREASE & CUSTOM ZOOM) */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(30px)" }}
                className="w-[480px] h-[590px] xl:w-[640px] xl:h-[720px] relative drop-shadow-[0_25px_50px_rgba(139,92,246,0.25)] flex items-center justify-center z-10 hover:scale-[1.02] transition-transform duration-300"
              >
                <img 
                  src="/shiven-pixel-full-body.png" 
                  alt="Shiven Pixel Avatar" 
                  className="object-contain w-full h-full pixelated scale-x-[-1] scale-130 xl:scale-140"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <HomeSkillsMarquee />

        {/* ── CODE PROFILES ── */}
        <section
          className="px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="code-profiles-title"
        >
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Code Profiles
              </p>
              <h2
                id="code-profiles-title"
                className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
              >
                GitHub + LeetCode
              </h2>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
                Live snapshots of shipped code, contribution activity,
                competitive programming stats, and coding consistency.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <GitHubProfileCard />
              <div className="xl:sticky xl:top-24">
                <LeetCodeProfileCard />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS SHOWCASE ── */}
        <FeaturedWorkShowcase projects={Projects} />

        {/* ── DELIVERY FRAMEWORK / PROJECT TIMELINE ── */}
        <DeliveryFramework />

        {/* ── BUILDER PROFILE & COLLABORATION COMMAND CENTER ── */}
        <BuilderProfileAndCta />
      </div>
    </ClientPageWrapper>
  );
}
