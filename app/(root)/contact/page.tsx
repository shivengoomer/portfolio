import { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/common/page-container";
import { ContactForm } from "@/components/forms/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              Direct contact
            </p>
            <h2 className="font-heading text-2xl tracking-[-0.03em] text-neutral-950 dark:text-white">
              Reach out the way that feels easiest.
            </h2>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              I usually respond fastest to email, but LinkedIn and GitHub work
              well too for project discussions and collaboration.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {SocialLinks.map((s) => (
              <Link
                key={s.name}
                href={s.link}
                className="flex items-center justify-between rounded-[1.5rem] border border-black/10 bg-white/70 p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
                target={s.link.startsWith("http") ? "_blank" : undefined}
                rel={s.link.startsWith("http") ? "noreferrer" : undefined}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium leading-none text-neutral-950 dark:text-white">
                      {s.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.username}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-primary">Open</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-neutral-50/90 p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              Prefer async?
            </p>
            <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              Share a short brief, your timeline, and what success looks like. I
              can then reply with a clearer next step.
            </p>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4 rounded-full border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5",
              )}
            >
              View GitHub
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              Send a message
            </p>
            <h2 className="font-heading text-2xl tracking-[-0.03em] text-neutral-950 dark:text-white">
              Tell me what you&apos;re building.
            </h2>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              A little context helps a lot. Project scope, role details, or even
              a rough idea is enough to start.
            </p>
          </div>

          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
