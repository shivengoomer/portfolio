"use client";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { GitHubProfileCard } from "@/components/github/github-profile-card";
import { HeroGrainientBg } from "@/components/common/hero-grainient-bg";
import { LeetCodeProfileCard } from "@/components/leetcode/leetcode-profile-card";
import ProjectCard from "@/components/projects/project-card";
import { HomeSkillsMarquee } from "@/components/skills/home-skills-marquee";
import { buttonVariants } from "@/components/ui/button";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { SocialLinks } from "@/config/socials";
import { featuredSkills } from "@/config/skills";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";
import { DeliveryFramework } from "@/components/common/delivery-framework";
import GlassSurface from "@/components/GlassSurface";

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
          className="relative -mt-20 flex min-h-screen items-start overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-32"
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
            {/* Hero copy with GlassSurface */}
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={32}
              borderWidth={0.06}
              brightness={100}
              opacity={0.35}
              blur={20}
              displace={1.5}
              backgroundOpacity={0.35}
              saturation={1.6}
              distortionScale={-20}
              redOffset={2}
              greenOffset={5}
              blueOffset={8}
              className="mt-20 lg:mt-0 max-w-2xl lg:translate-x-[-1.75rem] lg:-translate-y-12 xl:translate-x-[-3rem]"
              contentClassName="space-y-7 p-7 sm:p-9 justify-center w-full"
            >
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-center font-semibold uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-300">
                  Full Stack Developer · B.Tech IT
                </p>

                <h1 className="relative max-w-xl text-center font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white drop-shadow-sm">
                  Shiven Goomer
                </h1>

                <div className="max-w-3xl rounded-full border border-black/[0.08] bg-black/[0.04] px-6 py-2.5 text-center text-base sm:text-lg font-medium text-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md dark:border-white/[0.14] dark:bg-white/[0.07] dark:text-zinc-100 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-wrap items-center justify-center gap-2">
                  <span className="text-zinc-700 dark:text-zinc-200">I build</span>

                  <BlurText
                    key={rotatingWords[currentWord]}
                    text={rotatingWords[currentWord]}
                    delay={180}
                    animateBy="words"
                    direction="top"
                    className="font-bold text-purple-600 dark:text-cyan-400 drop-shadow-sm"
                  />

                  <span className="text-zinc-700 dark:text-zinc-200">for the modern web.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-6 text-sm shadow-sm",
                  )}
                >
                  View Projects
                  <Icons.arrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/resume"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-full border-border bg-background/90 px-6 text-sm text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Download CV
                </Link>
              </div>

              {/* Social row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 justify-center">
                {SocialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.link}
                      target={link.link.startsWith("http") ? "_blank" : undefined}
                      rel={link.link.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={link.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-sm text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </GlassSurface>

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

        {/* ── FEATURED PROJECTS ── */}
        <section
          id="projects"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="featured-projects-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2
                  id="featured-projects-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  <span className="relative">
                    Featured Work
                    <span className="absolute -bottom-1 left-0 h-[3px] w-12 rounded-full bg-blue-500/60" />
                  </span>
                </h2>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  A curated look at projects spanning analytics, AI workflows,
                  full-stack apps, and interaction-heavy interfaces.
                </p>
              </div>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-fit justify-start rounded-full px-0 text-sm text-zinc-700 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                )}
              >
                Browse all work
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <HoverEffectGrid className="mx-auto mt-8 w-full max-w-7xl py-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </HoverEffectGrid>
          </div>
        </section>

        {/* ── DELIVERY FRAMEWORK / PROJECT TIMELINE ── */}
        <DeliveryFramework />

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="about-title"
        >
          <div className="mx-auto max-w-6xl">
            <article className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 sm:p-12 text-white shadow-sm">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Profile
                </div>
                <h2
                  id="about-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  Building things that matter
                </h2>
                <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-white/60">
                  I live at the intersection of product thinking and
                  engineering, where calm interfaces meet strong execution. My
                  work centers on React, Next.js, Node.js, and AI-enabled
                  developer tools.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3.5 py-1.5 text-xs font-medium text-violet-100 transition-colors hover:border-violet-300/45 hover:bg-violet-300/20"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.1em] text-white/30">
                <span>Est. 2024</span>
                <span>Full Stack Developer</span>
              </div>
            </article>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="contact"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <h2
                  id="contact-title"
                  className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                >
                  <span className="relative">
                    Let&apos;s work together
                    <span className="absolute -bottom-1 left-0 h-[3px] w-12 rounded-full bg-rose-500/60" />
                  </span>
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
                  I&apos;m open to freelance work, internships, and roles where
                  I can help shape clean interfaces and robust full-stack
                  systems.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-6 text-sm",
                  )}
                >
                  Start a Conversation
                </Link>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-full border-zinc-200 bg-white/80 px-6 text-sm dark:border-zinc-700 dark:bg-zinc-800/80",
                  )}
                >
                  GitHub Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientPageWrapper>
  );
}
