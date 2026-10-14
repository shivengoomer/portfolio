"use client";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { GitHubProfileCard } from "@/components/github/github-profile-card";
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
import { HackathonsShowcase } from "@/components/home/hackathons-showcase";
import { BuilderProfileAndCta } from "@/components/home/builder-profile-and-cta";
import { EditorialHeroSection } from "@/components/home/editorial-hero-section";

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
          className="relative flex min-h-[95vh] w-full items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
          aria-label="Hero"
        >
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center opacity-70"
            >
              <source src="/bg-portfolio.webm" type="video/webm" />
            </video>
            {/* Smooth bottom blend */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          </div>

          {/* Exact Editorial Style Hero for Shiven Goomer */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center ">
            <EditorialHeroSection />
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
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                Code Profiles
              </p>
              <h2
                id="code-profiles-title"
                className="font-heading text-3xl font-semibold tracking-tight text-text"
              >
                GitHub + LeetCode
              </h2>
              <p className="text-base leading-7 text-text-muted">
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

        {/* ── HACKATHONS, EVENTS & COMMUNITY SHOWCASE ── */}
        <HackathonsShowcase />

      </div>
    </ClientPageWrapper>
  );
}
