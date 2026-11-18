"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProjectInterface } from "@/config/projects";
import { ProjectList } from "./project-list";
import { EditorialProjectItem } from "./floating-project-preview";

interface FeaturedWorkShowcaseProps {
  projects?: ProjectInterface[];
}

const EDITORIAL_PROJECTS: EditorialProjectItem[] = [
  {
    id: "nifty50-qa-platform",
    name: "Nifty50 Market Intelligence",
    description: "50 equities. Live market intelligence. One trading terminal.",
    year: "2024",
    image: "/projects/nifty50/dashboard.png",
    href: "/projects/nifty50-qa-platform",
    category: "Quantitative Finance",
  },
  {
    id: "Mentora",
    name: "Mentora",
    description: "AI-powered assessments, from creation to evaluation.",
    year: "2024",
    image: "/projects/mentora/home.png",
    href: "/projects/Mentora",
    category: "Artificial Intelligence",
  },
  {
    id: "wpbot-news",
    name: "D-TOX Security Assistant",
    description: "Detecting digital threats where conversations happen.",
    year: "2024",
    image: "/projects/wpbot-news/phishing.png",
    href: "/projects/wpbot-news",
    category: "Cybersecurity",
  },
  {
    id: "indiair-intelligence",
    name: "India IR Intelligence",
    description: "Evidence-first investor-relations research for Indian equities.",
    year: "2026",
    image: "/projects/indiair-intelligence/01-home.webp",
    href: "/projects/indiair-intelligence",
    category: "Financial Intelligence",
  },
  {
    id: "scraper-leads",
    name: "BizzInnovate LeadEngine",
    description: "AI-assisted prospect discovery, qualification, and outreach operations.",
    year: "2026",
    image: "/projects/scraper-leads/02-pipeline-table.webp",
    href: "/projects/scraper-leads",
    category: "Market Intelligence",
  },
  {
    id: "recon-desk",
    name: "Recon Desk",
    description: "Evidence-backed reconciliation for D2C settlements and freight.",
    year: "2026",
    image: "/projects/recon-desk/cover.svg",
    href: "/projects/recon-desk",
    category: "Financial Operations",
  },
  {
    id: "satyam-journal-portal",
    name: "SATYAM Research Portal",
    description: "Peer-reviewed publishing platform with automated editorial review workflows.",
    year: "2024",
    image: "/projects/satyam/archives.png",
    href: "/projects/satyam-journal-portal",
    category: "Academic Publishing",
  },
  {
    id: "mba-library",
    name: "MBA Academic Library",
    description: "Digital academic repository and catalog management for management scholars.",
    year: "2025",
    image: "/projects/mba-library/homepage.png",
    href: "/projects/mba-library",
    category: "Web Application",
  },
  {
    id: "matty",
    name: "Matty Markdown Studio",
    description: "Interactive technical documentation editor with live execution tooling.",
    year: "2025",
    image: "/projects/matty/editor.png",
    href: "/projects/matty",
    category: "Developer Tools",
  },
  {
    id: "clix",
    name: "Clix Realtime Analytics",
    description: "Instant event tracking and visitor engagement intelligence engine.",
    year: "2024",
    image: "/projects/clix/dashboard.png",
    href: "/projects/clix",
    category: "Analytics",
  },
  {
    id: "vibeStudio",
    name: "VibeStudio Developer CLI",
    description: "Modern developer CLI toolchain and automated workspace workflow manager.",
    year: "2025",
    image: "/projects/vibestudio/cli.png",
    href: "/projects/vibeStudio",
    category: "Developer Infrastructure",
  },
];

export function FeaturedWorkShowcase({}: FeaturedWorkShowcaseProps) {
  return (
    <section
      id="projects"
      className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-8 select-none"
      aria-labelledby="featured-projects-title"
    >
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
        
        {/* ── SECTION HEADER (Clean, Confident, Editorial with Hand-Drawn Swash) ── */}
        <div className="flex flex-col gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Editorial Product Index</span>
            </div>

            <h2
              id="featured-projects-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text"
            >
              Featured Engineering{" "}
              <span className="relative inline-block font-serif italic font-normal tracking-normal text-text">
                Work
                {/* Hand-drawn accent SVG swash underline */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-accent overflow-visible"
                  viewBox="0 0 100 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C22 2.5 45 11 65 4.5C78 1 89 8 98 5.5"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Hover any project to reveal its live interactive preview window. Click to read the full technical architecture.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 font-mono text-xs font-semibold text-text shadow-sm transition-all hover:border-accent hover:text-accent w-fit"
          >
            <span>Browse All 22 Projects</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── REUSABLE EDITORIAL PROJECT LIST WITH SIGNATURE FLOATING PREVIEW ── */}
        <ProjectList projects={EDITORIAL_PROJECTS.slice(0, 7)} />
        
      </div>
    </section>
  );
}
