import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
// import ProfileCard from "@/components/common/ProfileCard"

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import CertificationCard from "@/components/contributions/contribution-card";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { certsUnsorted } from "@/config/certs";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { featuredSkills } from "@/config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";
import { ShivenTerminal } from "./terminal/ShivenTerminal";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Projects } from "@/config/projects";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Timeline } from "@/components/ui/timeline";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HoverEffectGrid } from "@/components/ui/card-hover-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { SparklesCore } from "@/components/ui/sparkles";
import { CyclingTypewriter } from "@/components/ui/cycling-typewriter";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { TracingBeam } from "@/components/ui/tracing-beam";

const galleryImages = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80"
];

export const metadata: Metadata = {
  title: "Shiven Goomer",
  description: `${pagesConfig.home.metadata.description}`,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  // Structured data for personal portfolio

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Full Stack Developer",
    sameAs: [siteConfig.links.github, siteConfig.links.twitter],
  };

  // Structured data for website as a software application (template)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Next.js Portfolio Template",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <section className="relative z-10 flex flex-col lg:flex-row min-h-[70vh] md:h-screen items-center justify-center gap-8 lg:gap-20 py-10 px-4 lg:px-20 overflow-hidden w-full">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25 pointer-events-none [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]">
          <ThreeDMarquee images={[...Projects.filter(p => p.companyLogoImg).map(p => p.companyLogoImg), ...Projects.filter(p => p.companyLogoImg).map(p => p.companyLogoImg), ...Projects.filter(p => p.companyLogoImg).map(p => p.companyLogoImg), ...Projects.filter(p => p.companyLogoImg).map(p => p.companyLogoImg)]} />
        </div>
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="purple" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="blue" />
        <div className="container flex max-w-[40rem] flex-col items-center gap-4 text-center z-10 relative">
          <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[240px] sm:h-[240px]">
             <Image
              src={profileImg}
              height={300}
              width={300}
              sizes="(max-width: 640px) 40vw, 180px"
              style={{ objectFit: "cover" }}
              className="rounded-full bg-primary relative z-20 mb-0 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 border border-primary object-cover"
              alt="Shiven Goomer - Full Stack Developer Portfolio"
              priority
             />
          </div>

          <TextGenerateEffect
            words="Shiven Goomer"
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl !mb-0 pb-0"
          />
          <CyclingTypewriter titles={["Full Stack Developer", "MERN Stack Engineer", "Hackathon Winner"]} />
          
          <div className="flex flex-col mt-10 items-center justify-center sm:flex-row sm:space-x-4 gap-3 z-20 relative">
            <AnimatedText delay={0.6}>
              <Link
                href={"https://github.com/shivengoomer"}
                target="_blank"
                aria-label="View Shiven Goomer's GitHub profile"
              >
                <MovingBorderButton borderRadius="1.75rem" className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                     <Icons.gitHub className="w-5 h-5 mr-2" /> GitHub
                  </div>
                </MovingBorderButton>
              </Link>
            </AnimatedText>
            <AnimatedText delay={0.8}>
              <Link
                href={"/contact"}
                rel="noreferrer"
                aria-label="Contact Shiven Goomer"
              >
                <MovingBorderButton borderRadius="1.75rem" className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                     <Icons.contact className="w-5 h-5 mr-2" /> Contact
                  </div>
                </MovingBorderButton>
              </Link>
            </AnimatedText>
          </div>
          <AnimatedText delay={1.2}>
            <Icons.chevronDown className="h-6 w-6 mt-10 text-neutral-400" />
          </AnimatedText>
        </div>
        <div className="flex-1 w-full h-[380px] sm:h-[480px] lg:h-[700px] rounded-3xl p-4 overflow-auto flex flex-col transition-colors duration-500 z-10 relative">
          <AnimatedText
            as="h3"
            delay={0.2}
            className="font-heading text-center mb-4"
          >
            Type{" "}
            <span className="font-mono bg-black/30 px-2 py-1 rounded">
              help
            </span>{" "}
            for available commands
          </AnimatedText>

          <div className="flex-1 w-full overflow-y-auto">
            <ShivenTerminal />
          </div>
        </div>
      </section>

      <AnimatedSection
        className="container space-y-6 bg-muted py-10"
        id="skills"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.skills.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.skills.description}
          </AnimatedText>
        </div>
        <SkillsCard skills={featuredSkills} />
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/skills">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
      <AnimatedSection
        direction="right"
        className="container space-y-6 py-10 my-14"
        id="projects"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.projects.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.projects.description}
          </AnimatedText>
        </div>
        <HoverEffectGrid className="mx-auto w-full max-w-7xl">
          {featuredProjects.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              delay={0.1 * (index + 1)}
              direction="up"
              className="h-full w-full flex"
            >
              <ProjectCard project={exp} />
            </AnimatedSection>
          ))}
        </HoverEffectGrid>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/projects">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
        {/* <div className="mx-auto text-center md:max-w-[58rem]">
                    <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        See all the relevant experiences.
                    </p>
                </div> */}
      </AnimatedSection>
      <TracingBeam className="px-4 md:px-6 w-full max-w-7xl mx-auto">
        <AnimatedSection
          direction="left"
          className="container space-y-6 py-10 my-14"
          id="experience"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              {pagesConfig.experience.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              {pagesConfig.experience.description}
            </AnimatedText>
          </div>
          <Timeline 
            data={experiences.slice(0, 3).map((experience) => ({
              title: experience.startDate.getFullYear().toString(),
              content: (
                 <ExperienceCard experience={experience} />
              )
            }))}
          />
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/experience">
              <Button variant={"outline"} className="rounded-xl">
                <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
              </Button>
            </Link>
          </AnimatedText>
        </AnimatedSection>
      </TracingBeam>
      <AnimatedSection
        direction="left"
        className="container space-y-6 py-10 my-14"
        id="gallery"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            Gallery
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            A collection of Hackathon memories and other stuff!
          </AnimatedText>
        </div>
        <div className="mx-auto w-full max-w-5xl">
          <ParallaxScroll images={galleryImages} />
        </div>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
