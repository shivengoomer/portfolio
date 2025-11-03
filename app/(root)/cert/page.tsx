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
      <ContributionCard contributions={certsUnsorted} />
    </PageContainer>
  );
}
