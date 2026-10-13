import { SiteFooter } from "@/components/common/site-footer";
import { DarkModeToggle } from "@/components/common/dark-mode-toggle";
import { FloatingDockWithTheme } from "@/components/common/floating-dock-with-theme";
import {
  IconHome,
  IconTerminal2,
  IconNewSection,
  IconCertificate,
  IconMail,
  IconBriefcase,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
interface MarketingLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Shiven Goomer",
  description: pagesConfig.home.metadata.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
      {/* Floating Dock Nav */}
      <div className="fixed left-1/2 top-3 z-[5000] w-[calc(100%-1rem)] max-w-md -translate-x-1/2 md:top-6 md:w-[90%] md:max-w-fit">
        <FloatingDockWithTheme
          className="border border-border bg-surface-2/90 shadow-xl backdrop-blur-xl"
          items={[
            {
              title: "Home",
              icon: (
                <IconHome className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/",
            },
            {
              title: "Skills",
              icon: (
                <IconTerminal2 className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/skills",
            },
            {
              title: "Projects",
              icon: (
                <IconNewSection className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/projects",
            },
            {
              title: "Experience",
              icon: (
                <IconBriefcase className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/experience",
            },
            {
              title: "Certificates",
              icon: (
                <IconCertificate className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/cert",
            },
            {
              title: "Contact",
              icon: (
                <IconMail className="h-full w-full text-text transition-colors hover:text-accent" />
              ),
              href: "/contact",
            },
          ]}
        />
      </div>

      {/* Dark Mode Toggle — top right */}
      <div className="fixed right-6 top-7 z-[5000] hidden md:block">
        <DarkModeToggle />
      </div>

      <main className="relative flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
