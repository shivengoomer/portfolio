import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("px-4 pb-10 pt-4 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl border border-zinc-200 bg-white/70 px-6 py-6 backdrop-blur md:flex-row dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Shiven Goomer
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
                "h-10 w-10 rounded-full border border-zinc-200 bg-white/80 p-2 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
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
