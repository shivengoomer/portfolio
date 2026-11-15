import { type Metadata } from "next";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { ReachOutConsole } from "@/components/contact/reach-out-console";

export const metadata: Metadata = { title: "Reach Out | Shiven Goomer", description: "Directly connect with Shiven Goomer for software engineering opportunities, technical advisory, and ambitious collaborations." };

export default function ContactPage() {
  return <ClientPageWrapper><main className="retro-surface site-gutter relative min-h-screen overflow-hidden bg-[#12070d] pb-20 pt-28 sm:pt-32">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[580px] bg-[radial-gradient(ellipse_52%_40%_at_50%_0%,rgba(242,92,42,0.16),transparent_72%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(242,92,42,0.17)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_34%)]" />
    <div className="relative mx-auto max-w-6xl"><header className="max-w-3xl pb-14 sm:pb-20"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Contact / open channel</p><h1 className="mt-4 font-heading text-5xl font-extrabold uppercase tracking-[-0.06em] text-text sm:text-6xl lg:text-7xl">Let&apos;s make<br />something matter.</h1><p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">An open line for ambitious engineering work, thoughtful products, and collaborations with a clear reason to exist.</p></header><ReachOutConsole /></div>
  </main></ClientPageWrapper>;
}
