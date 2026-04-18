import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ProjectCard from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { Spotlight } from "@/components/ui/spotlight";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { SocialLinks } from "@/config/socials";
import { featuredSkills } from "@/config/skills";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

export const metadata: Metadata = {
  title: "Shiven Goomer",
  description: pagesConfig.home.metadata.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

const stats = [
  {
    value: "12+",
    label: "Projects shipped across product, AI, and full-stack work",
  },
  {
    value: "3+",
    label: "Years building communities, products, and developer workflows",
  },
  {
    value: "5",
    label: "Core skills featured with production-ready modern web tooling",
  },
];

const heroParallaxImages = [
  "/projects/matty/editor.png",
  "/projects/clix/dashboard.png",
  "/projects/chatbot/chatpage.png",
  "/projects/newnaanstop/homepage.png",
  "/projects/matty/logo.png",
  "/projects/clix/logo.png",
  "/projects/snippetly/ui.png",
  "/projects/vibestudio/logo.png",
];

function formatExperienceDate(endDate: Date | "Present", startDate: Date) {
  const start = formatDateFromObj(startDate);

  if (endDate === "Present") {
    return `${start} - Present`;
  }

  return `${start} - ${formatDateFromObj(endDate)}`;
}

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
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
  };

  const highlightedExperience = experiences.slice(0, 2);

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="relative isolate">
        <Spotlight
          className="-top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-60"
          fill="#8aa0b8"
        />

        <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
          <ParallaxHeroImages
            images={heroParallaxImages}
            variant="edge-focus"
            className="opacity-55 [mask-image:radial-gradient(circle_at_center,white,transparent_78%)]"
            imageClassName="border border-black/10 bg-white/85 p-3 object-contain backdrop-blur dark:border-white/10 dark:bg-[#09090b]/85"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.76),rgba(255,255,255,0.18)_42%,transparent_76%)] dark:bg-[radial-gradient(circle_at_center,rgba(10,10,12,0.82),rgba(10,10,12,0.28)_42%,transparent_76%)]" />
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center xl:gap-16">
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-neutral-600 shadow-[0_1px_0_rgba(255,255,255,0.7)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                Full Stack Developer • React • Next.js • AI Workflows
              </div>

              <div className="space-y-5">
                <p className="max-w-xl text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                  {pagesConfig.home.description}
                </p>
                <h1 className="max-w-4xl font-heading text-5xl tracking-[-0.05em] text-neutral-950 dark:text-white sm:text-6xl lg:text-7xl">
                  Building thoughtful products with clean interfaces and strong
                  backend foundations.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                  I&apos;m Shiven Goomer, a developer focused on polished web
                  experiences, scalable APIs, and AI-powered tooling that feels
                  simple to use.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-full px-6 text-sm shadow-[0_12px_30px_rgba(15,23,42,0.14)]",
                  )}
                >
                  View Projects
                  <Icons.arrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-full border-black/10 bg-white/80 px-6 text-sm text-neutral-700 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10",
                  )}
                >
                  Let&apos;s Work Together
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-3xl border border-black/10 bg-white/75 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 lg:justify-self-end lg:w-full lg:max-w-[36rem]">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),transparent_64%)] opacity-90 blur-3xl dark:bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_64%)]" />
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-black/10 bg-white/85 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur dark:border-white/10 dark:bg-[#09090b]/80 sm:p-5">
                <div className="mb-4 flex items-center gap-2 px-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>

                <div className="grid gap-5 rounded-[1.6rem] border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,244,245,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.92),rgba(10,10,12,0.98))] sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.5rem] border border-black/10 bg-neutral-200 shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-neutral-900">
                      <Image
                        src={profileImg}
                        alt="Portrait of Shiven Goomer"
                        fill
                        sizes="96px"
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                        Currently building
                      </p>
                      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[1.75rem]">
                        Fast, clean products that still feel personal.
                      </h2>
                      <p className="max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                        Shipping with Next.js, TypeScript, Tailwind CSS,
                        Node.js, and AI integrations.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {featuredSkills.slice(0, 4).map((skill) => {
                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          className="rounded-2xl border border-black/5 bg-white/85 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] dark:bg-white dark:text-neutral-950">
                              <SkillIcon className="h-8 w-8" />
                            </div>
                            <div>
                              <p className="text-base font-semibold text-neutral-900 dark:text-white">
                                {skill.name}
                              </p>
                              <p className="mt-1 text-xs text-start leading-5 text-neutral-500 dark:text-neutral-400">
                                {skill.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-black/5 pt-3 dark:border-white/10">
                    {SocialLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.link}
                          target={
                            link.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.link.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-700 transition-transform duration-300 hover:-translate-y-0.5 hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
          aria-labelledby="featured-projects-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                  Featured Work
                </p>
                <h2
                  id="featured-projects-title"
                  className="font-heading text-3xl tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-4xl"
                >
                  Selected projects with strong UX, clear systems, and real use
                  cases.
                </h2>
                <p className="text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  A curated look at products spanning analytics, AI workflows,
                  full-stack apps, and interaction-heavy interfaces.
                </p>
              </div>

              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start rounded-full px-0 text-sm text-neutral-700 hover:bg-transparent hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
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

        <section
          id="about"
          className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
          aria-labelledby="about-title"
        >
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                About
              </p>
              <h2
                id="about-title"
                className="mt-3 font-heading text-3xl tracking-[-0.04em] text-neutral-950 dark:text-white"
              >
                Clean visual design backed by practical engineering.
              </h2>
              <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-300">
                I enjoy the intersection of product thinking and engineering,
                especially when a project needs both strong execution and a
                calm, elegant interface. My work usually centers on React,
                Next.js, Node.js, and AI-enabled developer tools.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {featuredSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-black/10 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                Experience
              </p>
              <div className="mt-6 space-y-5">
                {highlightedExperience.map((experience, index) => (
                  <div
                    key={experience.id}
                    className={cn(
                      "rounded-3xl border border-black/10 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.04]",
                      index === 1 && "lg:translate-x-6",
                    )}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                          {experience.position}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {experience.company} • {experience.location}
                        </p>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatExperienceDate(
                          experience.endDate,
                          experience.startDate,
                        )}
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                      {experience.description[0]}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/experience"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-6 rounded-full border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5",
                )}
              >
                View full experience
              </Link>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="px-4 pb-24 sm:px-6 lg:px-8"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,244,245,0.9))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.92),rgba(10,10,12,0.96))] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                  Contact
                </p>
                <h2
                  id="contact-title"
                  className="mt-3 font-heading text-3xl tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-4xl"
                >
                  Looking for a frontend engineer who cares about product
                  polish?
                </h2>
                <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-300">
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
                    "h-12 rounded-full px-6 text-sm",
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
                    "h-12 rounded-full border-black/10 bg-white/80 px-6 text-sm dark:border-white/10 dark:bg-white/5",
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
