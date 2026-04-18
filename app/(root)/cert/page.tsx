import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import { certsUnsorted } from "@/config/certs";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.certificates.metadata.title,
  description: pagesConfig.certificates.metadata.description,
};

export default function CertPage() {
  return (
    <PageContainer
      title={pagesConfig.certificates.title}
      description={pagesConfig.certificates.description}
    >
      <section className="rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
        <ContributionCard contributions={certsUnsorted} />
      </section>
    </PageContainer>
  );
}
