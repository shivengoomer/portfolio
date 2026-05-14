import { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/common/page-container";
import { ContactForm } from "@/components/forms/contact-form";
import { pagesConfig } from "@/config/pages";
import { SocialLinks } from "@/config/socials";
import { CopyEmailButton } from "@/components/common/copy-email-button";

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
      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        {/* ── Left Column — Contact Info ── */}
        <div className="flex flex-col gap-5">
          {/* Intro */}
          <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Let&apos;s build something together
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              I&apos;m always open to new projects, collaborations, and
              interesting conversations. Drop me a line and I&apos;ll respond
              within 24 hours.
            </p>

            {/* Email with copy */}
            <div className="mt-4">
              <CopyEmailButton email="shivengoomer@gmail.com" />
            </div>
          </section>

          {/* Social links */}
          <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Connect
            </h3>
            <div className="mt-4 flex items-center gap-3">
              {SocialLinks.map((s) => (
                <Link
                  key={s.name}
                  href={s.link}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  target={s.link.startsWith("http") ? "_blank" : undefined}
                  rel={s.link.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={s.name}
                >
                  <s.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </section>

          {/* Location + Timezone */}
          <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Available for opportunities
              </p>
            </div>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              New Delhi · IST UTC+5:30
            </p>
          </section>
        </div>

        {/* ── Right Column — Contact Form ── */}
        <section className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Send a message
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            A little context goes a long way — project scope, timeline, or even
            a rough idea is enough to start.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
