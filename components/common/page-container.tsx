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
      <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader title={title} description={description} />
          <div>{children}</div>
        </div>
      </div>
    </ClientPageWrapper>
  );
}
