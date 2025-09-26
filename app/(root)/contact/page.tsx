import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import Link from "next/link";
import { SocialLinks } from "@/config/socials";
import { pagesConfig } from "@/config/pages";

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
 
        <div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Connect</h3>
            <p className="text-muted-foreground text-sm">
              Prefer email or socials? Reach me directly here.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {SocialLinks.map((s) => (
              <Link
                key={s.name}
                href={s.link}
                className="flex items-center justify-between rounded-md border p-3 transition-colors hover:bg-accent"
                target={s.link.startsWith("http") ? "_blank" : undefined}
                rel={s.link.startsWith("http") ? "noreferrer" : undefined}
              >
                <div className="flex items-center gap-3">
                  <s.icon className="h-5 w-5" />
                  <div>
                    <p className="font-medium leading-none">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.username}</p>
                  </div>
                </div>
                <span className="text-sm text-primary">Open</span>
              </Link>
            ))}
          </div>
        </div>
    </PageContainer>
  );
}
