import { MainNav } from "@/components/common/main-nav";
import { SiteFooter } from "@/components/common/site-footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import {
  IconHome,
  IconTerminal2,
  IconNewSection,
  IconCertificate,
  IconMail,
  IconBriefcase
} from "@tabler/icons-react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col relative w-full overflow-x-clip bg-neutral-950">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000]">
        <FloatingDock 
           desktopClassName="bg-black/80 backdrop-blur-md border border-white/10"
           mobileClassName="bg-black/80 backdrop-blur-md border border-white/10 translate-y-20"
           items={[
               { title: "Home", icon: <IconHome className="h-full w-full text-neutral-300" />, href: "/" },
               { title: "Skills", icon: <IconTerminal2 className="h-full w-full text-neutral-300" />, href: "/skills" },
               { title: "Projects", icon: <IconNewSection className="h-full w-full text-neutral-300" />, href: "/projects" },
               { title: "Experience", icon: <IconBriefcase className="h-full w-full text-neutral-300" />, href: "/experience" },
               { title: "Certificates", icon: <IconCertificate className="h-full w-full text-neutral-300" />, href: "/cert" },
               { title: "Contact", icon: <IconMail className="h-full w-full text-neutral-300" />, href: "/contact" },
           ]}
        />
      </div>
      <main className="container flex-1 mt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
