import { type Metadata } from "next";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import ContributionCard from "@/components/contributions/contribution-card";
import { certsUnsorted } from "@/config/certs";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = { title: pagesConfig.certificates.metadata.title, description: pagesConfig.certificates.metadata.description };

export default function CertPage() {
  return <ClientPageWrapper><main className="retro-surface relative min-h-screen overflow-hidden bg-[#12070d] px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8"><div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_52%_40%_at_50%_0%,rgba(242,92,42,0.15),transparent_72%)]" /><div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(242,92,42,0.17)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_35%)]" /><div className="relative mx-auto max-w-6xl"><header className="max-w-3xl pb-14 sm:pb-20"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Learning / verified credentials</p><h1 className="mt-4 font-heading text-5xl font-extrabold uppercase tracking-[-0.06em] text-text sm:text-6xl lg:text-7xl">Credentials.</h1><p className="mt-4 text-lg leading-relaxed text-text-muted sm:text-xl">A small record of the work put into sharpening the craft.</p></header><ContributionCard contributions={certsUnsorted} /></div></main></ClientPageWrapper>;
}
