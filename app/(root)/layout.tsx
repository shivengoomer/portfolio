import { SiteFooter } from "@/components/common/site-footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconTerminal2,
  IconNewSection,
  IconCertificate,
  IconMail,
  IconBriefcase,
} from "@tabler/icons-react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
      <div className="fixed left-1/2 top-6 z-[5000] -translate-x-1/2">
        <FloatingDock
          desktopClassName="border border-black/10 bg-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-black/65"
          mobileClassName="translate-y-20 border border-black/10 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-black/65"
          items={[
            {
              title: "Home",
              icon: (
                <IconHome className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/",
            },
            {
              title: "Skills",
              icon: (
                <IconTerminal2 className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/skills",
            },
            {
              title: "Projects",
              icon: (
                <IconNewSection className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/projects",
            },
            {
              title: "Experience",
              icon: (
                <IconBriefcase className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/experience",
            },
            {
              title: "Certificates",
              icon: (
                <IconCertificate className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/cert",
            },
            {
              title: "Contact",
              icon: (
                <IconMail className="h-full w-full text-neutral-600 dark:text-neutral-300" />
              ),
              href: "/contact",
            },
          ]}
        />
      </div>
      <main className="mt-20 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
