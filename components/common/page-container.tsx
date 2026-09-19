import React from "react";
import { ClientPageWrapper } from "./client-page-wrapper";
import PageHeader from "./page-header";

interface PageContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <ClientPageWrapper>
      <div className="relative min-h-screen overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:px-8">
        {/* Ambient Top Glow & Technical Micro-Grid Backdrop */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.12),rgba(168,85,247,0.08),transparent_80%)] blur-3xl dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.18),rgba(168,85,247,0.12),transparent_80%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl space-y-8">
          <PageHeader title={title} description={description} />
          <div>{children}</div>
        </div>
      </div>
    </ClientPageWrapper>
  );
}
