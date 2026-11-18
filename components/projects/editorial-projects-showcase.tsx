"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Maximize2, X } from "lucide-react";

import type { OutcomeMetric } from "@/config/case-study-data";
import type { ProjectInterface } from "@/config/projects";
import { cn } from "@/lib/utils";

interface Props {
  primary: ProjectInterface;
  primaryOutcomes: OutcomeMetric[];
  secondary: ProjectInterface[];
  remaining: ProjectInterface[];
}

const featureCopy: Record<string, string> = {
  "scraper-leads": "AI-assisted prospect discovery, qualification, and outreach operations.",
  "nifty50-qa-platform": "50 equities. Live market intelligence. One trading terminal.",
};

const conciseCopy: Record<string, string> = {
  "satyam-journal-portal": "Peer-reviewed research, published and managed in one place.",
  "mba-library": "A digital library for campus resources and discovery.",
  matty: "A focused workspace for managing everyday work.",
  clix: "Fast image workflows built for everyday sharing.",
  vibeStudio: "A creative studio for turning ideas into visuals.",
  chatbot: "A conversational assistant for useful, instant answers.",
  "book-review": "A social home for discovering and reviewing books.",
  "donation-tracker": "Clear donation records, built for accountable giving.",
  newnaanstop: "A restaurant experience designed for hungry, mobile customers.",
  snippetly: "Save, organise, and revisit the code worth keeping.",
  "adopt-me": "Helping future pet owners find their right match.",
  "face-track-project": "Real-time face tracking with a camera-first interface.",
  "amazon-clone": "A familiar commerce journey, recreated end to end.",
  "n8n-drive-whatsapp": "New Drive files delivered directly to WhatsApp.",
  "p2p-file-share": "Direct browser-to-browser file sharing without the middleman.",
};

function projectImage(project: ProjectInterface) {
  return project.pagesInfoArr?.[0]?.imgArr?.[0] || project.companyLogoImg;
}

function projectYear(project: ProjectInterface) {
  return project.endDate?.getFullYear() || project.startDate?.getFullYear() || "Recent";
}

function projectCategory(project: ProjectInterface) {
  return project.category?.[0] || project.type;
}

function shortCopy(project: ProjectInterface) {
  return conciseCopy[project.id] || project.shortDescription.split(" ").slice(0, 11).join(" ").replace(/[,.]$/, "") + ".";
}

export default function EditorialProjectsShowcase({ primary, primaryOutcomes, secondary, remaining }: Props) {
  const [previewProject, setPreviewProject] = useState<ProjectInterface | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [inspectionProject, setInspectionProject] = useState<ProjectInterface | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inspectionProject) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setInspectionProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspectionProject]);

  const handlePreviewMove = (event: React.MouseEvent<HTMLAnchorElement>, project: ProjectInterface) => {
    const previewWidth = 420;
    const previewHeight = 260;
    const gap = 24;
    const x = Math.min(event.clientX + gap, window.innerWidth - previewWidth - 20);
    const y = Math.min(event.clientY - 38, window.innerHeight - previewHeight - 20);
    setCursor({ x: Math.max(20, x), y: Math.max(20, y) });
    setPreviewProject(project);
  };

  return (
    <>
      <div className="space-y-20 sm:space-y-28">
        <FlagshipProject project={primary} outcomes={primaryOutcomes} reduceMotion={reduceMotion} onInspect={setInspectionProject} />

        <section aria-labelledby="featured-engineering" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 id="featured-engineering" className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Featured engineering work</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            {secondary.map((project, index) => (
              <FeaturedProjectShowcase key={project.id} project={project} index={index} reduceMotion={reduceMotion} onInspect={setInspectionProject} />
            ))}
          </div>
        </section>

        <section aria-labelledby="other-projects" className="relative">
          <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">The archive</p>
              <h2 id="other-projects" className="mt-2 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">Other projects, still worth opening.</h2>
            </div>
            <span className="hidden font-mono text-xs text-text-muted sm:block">Hover to preview</span>
          </div>
          <EditorialProjectList
            projects={remaining}
            onPreviewMove={handlePreviewMove}
            onPreviewEnd={() => setPreviewProject(null)}
            onInspect={setInspectionProject}
          />
        </section>
      </div>

      <FloatingProjectPreview project={previewProject} cursor={cursor} reduceMotion={reduceMotion} />
      <ProjectInspection project={inspectionProject} onClose={() => setInspectionProject(null)} />
    </>
  );
}

function FlagshipProject({ project, outcomes, onInspect, reduceMotion }: {
  project: ProjectInterface;
  outcomes: OutcomeMetric[];
  onInspect: (project: ProjectInterface) => void;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#16090f] p-3 shadow-[0_32px_100px_rgba(0,0,0,0.45)] sm:p-5"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.45fr] lg:items-end lg:gap-12 lg:p-8">
        <div className="order-2 lg:order-1 lg:pb-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Flagship project</p>
          <h2 className="mt-5 max-w-lg font-heading text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-text sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">{project.companyName}</h2>
          <p className="mt-5 max-w-md text-lg leading-snug text-text-muted">{project.shortDescription}</p>
          {outcomes.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-white/10 py-4 font-mono text-xs text-text-muted">
              {outcomes.map(({ value, label }) => (
                <span key={label}><b className="block text-base text-text">{value}</b>{label}</span>
              ))}
            </div>
          )}
          <Link href={`/projects/${project.id}`} className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-text transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Explore project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
        <ProjectImage project={project} priority large onInspect={onInspect} className="order-1 lg:order-2" />
      </div>
    </motion.section>
  );
}

function FeaturedProjectShowcase({ project, index, onInspect, reduceMotion }: { project: ProjectInterface; index: number; onInspect: (project: ProjectInterface) => void; reduceMotion: boolean | null }) {
  const accent = index === 0 ? "#22C55E" : "#8B5CF6";
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#16090f]", index === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-14")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 blur-3xl" style={{ background: accent }} />
      <ProjectImage project={project} onInspect={onInspect} className="mx-3 mt-3 sm:mx-5 sm:mt-5" />
      <div className="relative p-6 sm:p-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{project.category.join(" · ")}</p>
        <h3 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-text">{project.companyName}</h3>
        <p className="mt-3 max-w-md text-base text-text-muted">{featureCopy[project.id] || project.shortDescription}</p>
        <Link href={`/projects/${project.id}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">Explore <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
      </div>
    </motion.article>
  );
}

function ProjectImage({ project, onInspect, priority = false, large = false, className = "" }: { project: ProjectInterface; onInspect: (project: ProjectInterface) => void; priority?: boolean; large?: boolean; className?: string }) {
  return (
    <div className={cn("group/image relative overflow-hidden rounded-[1.1rem] border border-white/10 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.42)]", large ? "aspect-[16/10]" : "aspect-[16/9]", className)}>
      <Image src={projectImage(project)} alt={`${project.companyName} product interface`} fill priority={priority} sizes={large ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 1024px) 100vw, 52vw"} className="object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-[1.035]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <button type="button" onClick={() => onInspect(project)} className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 backdrop-blur transition-all group-hover/image:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <Maximize2 className="h-3 w-3" /> Inspect
      </button>
    </div>
  );
}

function EditorialProjectList({ projects, onPreviewMove, onPreviewEnd, onInspect }: { projects: ProjectInterface[]; onPreviewMove: (event: React.MouseEvent<HTMLAnchorElement>, project: ProjectInterface) => void; onPreviewEnd: () => void; onInspect: (project: ProjectInterface) => void }) {
  return <div className="divide-y divide-white/10 border-y border-white/10">{projects.map((project, index) => (
    <Link key={project.id} href={`/projects/${project.id}`} onMouseMove={(event) => onPreviewMove(event, project)} onMouseLeave={onPreviewEnd} onFocus={(event) => onPreviewMove(event as unknown as React.MouseEvent<HTMLAnchorElement>, project)} onBlur={onPreviewEnd} className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-5 transition-colors hover:bg-[#260f19] focus:bg-[#260f19] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent sm:grid-cols-[52px_minmax(180px,0.7fr)_1.4fr_auto] sm:gap-6 sm:px-5">
      <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="font-heading text-lg font-bold uppercase tracking-tight text-text sm:text-xl">{project.companyName}</span>
      <span className="hidden text-sm text-text-muted sm:block">{shortCopy(project)}</span>
      <span className="hidden font-mono text-[11px] uppercase tracking-wider text-text-muted md:block">{projectCategory(project)} / {projectYear(project)}</span>
      <ArrowRight className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent" />
      <span className="col-span-3 mt-1 overflow-hidden rounded-xl border border-white/10 sm:hidden"><Image src={projectImage(project)} alt="" width={800} height={450} className="h-auto w-full object-cover" /></span>
    </Link>
  ))}</div>;
}

function FloatingProjectPreview({ project, cursor, reduceMotion }: { project: ProjectInterface | null; cursor: { x: number; y: number }; reduceMotion: boolean | null }) {
  return <AnimatePresence>{project && <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 280, damping: 25 }} className="pointer-events-none fixed z-50 hidden w-[420px] overflow-hidden rounded-2xl border border-white/15 bg-[#170a11] shadow-[0_30px_80px_rgba(0,0,0,0.62)] md:block" style={{ left: cursor.x, top: cursor.y, transform: "perspective(1000px) rotateY(-3deg) rotateX(1deg)" }}><div className="relative aspect-[16/10]"><Image src={projectImage(project)} alt="" fill sizes="420px" className="object-cover object-top" /></div><div className="flex items-center justify-between px-4 py-3"><span className="font-heading text-sm font-bold uppercase text-text">{project.companyName}</span><span className="font-mono text-[10px] text-accent">OPEN ↗</span></div></motion.div>}</AnimatePresence>;
}

function ProjectInspection({ project, onClose }: { project: ProjectInterface | null; onClose: () => void }) {
  return <AnimatePresence>{project && <motion.div role="dialog" aria-modal="true" aria-label={`${project.companyName} screenshot`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}><motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#15090f] p-2 shadow-2xl" onClick={(event) => event.stopPropagation()}><Image src={projectImage(project)} alt={`${project.companyName} full-size product interface`} width={1800} height={1100} className="max-h-[82vh] w-full rounded-xl object-contain" /><button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/60 p-2 text-white hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Close full-size preview"><X className="h-4 w-4" /></button></motion.div></motion.div>}</AnimatePresence>;
}
