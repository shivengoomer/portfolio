import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

import { AnimatedSection } from "@/components/common/animated-section";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";

interface Props { params: { expId: string } }

const formatDate = (date: Date | "Present") => typeof date === "string" ? date : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experience = experiences.find((item) => item.id === params.expId);
  if (!experience) return { title: "Experience Not Found" };
  return { title: `${experience.position} at ${experience.company} | Experience`, description: `Detailed information about my role as ${experience.position} at ${experience.company}.`, alternates: { canonical: `${siteConfig.url}/experience/${params.expId}` } };
}

export default function ExperienceDetailPage({ params }: Props) {
  const experience = experiences.find((item) => item.id === params.expId);
  if (!experience) redirect("/experience");
  const dates = `${formatDate(experience.startDate)} — ${formatDate(experience.endDate)}`;
  const current = experience.endDate === "Present";

  return <ClientPageWrapper><main className="retro-surface site-gutter relative min-h-screen overflow-hidden bg-[#12070d] pb-20 pt-28 sm:pt-32">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_52%_40%_at_50%_0%,rgba(242,92,42,0.15),transparent_72%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(242,92,42,0.17)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_32%)]" />
    <div className="relative mx-auto max-w-[1400px]">
      <AnimatedSection><Link href="/experience" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ArrowLeft className="h-4 w-4" /> All experience</Link></AnimatedSection>

      <AnimatedSection delay={0.08} className="mt-10 sm:mt-14"><section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#180a11] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.42)] sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[auto_1fr_0.7fr] lg:items-end">
          <div className="grid h-24 w-24 place-items-center rounded-[1.7rem] border border-white/10 bg-black/25 p-4 sm:h-28 sm:w-28">{experience.logo ? <Image src={experience.logo} alt={`${experience.company} logo`} width={76} height={76} className="h-full w-full object-contain" /> : <span className="font-heading text-3xl text-accent">SG</span>}</div>
          <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{experience.category || "Engineering"} / chapter</p><h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-text sm:text-5xl lg:text-6xl">{experience.position}</h1><div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted"><span className="font-semibold text-text">{experience.company}</span><span className="hidden h-1 w-1 rounded-full bg-accent sm:block" /><span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-accent" />{experience.location}</span></div></div>
          <div className="flex flex-col items-start border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">Timeline</p><p className="mt-2 font-heading text-xl font-bold uppercase text-text">{dates}</p>{current && <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#7FD6A0]"><span className="h-2 w-2 rounded-full bg-[#7FD6A0]" />Current role</p>}{experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent">Visit company <ArrowUpRight className="h-4 w-4" /></a>}</div>
        </div>
      </section></AnimatedSection>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimatedSection delay={0.14}><section className="rounded-[1.5rem] border border-white/10 bg-[#16090f] p-6 sm:p-8"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">The role</p><div className="mt-6 space-y-5">{experience.description.map((item, index) => <p key={item} className={index === 0 ? "text-lg leading-relaxed text-text sm:text-xl" : "border-l border-accent/60 pl-4 text-sm leading-relaxed text-text-muted sm:text-base"}>{item}</p>)}</div></section></AnimatedSection>
        <AnimatedSection delay={0.2}><section className="rounded-[1.5rem] border border-white/10 bg-[#16090f] p-6 sm:p-8"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Tools in the work</p><div className="mt-6 flex flex-wrap gap-2">{experience.skills.map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-text-muted">{skill}</span>)}</div><div className="mt-8 border-t border-white/10 pt-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{experience.achievements.length} documented outcomes</p></div></section></AnimatedSection>
      </div>

      <AnimatedSection delay={0.24} className="mt-8"><section className="rounded-[1.5rem] border border-white/10 bg-[#16090f] p-6 sm:p-8"><div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5"><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">What shipped</p><h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-text">Selected outcomes.</h2></div><span className="font-mono text-xs text-text-muted">0{experience.achievements.length}</span></div><ol className="mt-2 divide-y divide-white/10">{experience.achievements.map((achievement, index) => <li key={achievement} className="grid gap-3 py-5 sm:grid-cols-[48px_1fr]"><span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span><p className="text-sm leading-relaxed text-text-muted sm:text-base">{achievement}</p></li>)}</ol></section></AnimatedSection>

      <AnimatedSection delay={0.28} className="mt-10 flex justify-center"><Link href="/experience" className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> More experience</Link></AnimatedSection>
    </div>
  </main></ClientPageWrapper>;
}
