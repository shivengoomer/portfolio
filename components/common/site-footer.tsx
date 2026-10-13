import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("px-4 pb-10 pt-4 sm:px-6 lg:px-8", className)}>
      <div className="editorial-card mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl px-6 py-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-heading text-sm font-semibold text-text">
            Shiven Goomer
          </p>
          <p className="text-sm text-text-muted">
            Full stack developer focused on clean, modern web experiences.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
        {SocialLinks.map((item, ind) => (
          <CustomTooltip icon={item.icon} text={item.username} key={ind}>
            <Link
              href={item.link}
              target="_blank"
              aria-label={item.name}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "h-10 w-10 rounded-full border border-border bg-surface-2 p-2 text-text transition-colors hover:border-accent hover:text-accent"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </CustomTooltip>
        ))}
        </div>
      </div>
    </footer>
  );
}
