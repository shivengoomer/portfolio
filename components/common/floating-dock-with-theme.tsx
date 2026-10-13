"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";

export function FloatingDockWithTheme({ items, className }: { items: any[], className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  const themeToggleItem = {
    title: isDark ? "Light Mode" : "Dark Mode",
    icon: isDark ? (
      <IconSun className="h-full w-full text-text transition-colors hover:text-accent" />
    ) : (
      <IconMoon className="h-full w-full text-text transition-colors hover:text-accent" />
    ),
    onClick: () => setTheme(isDark ? "light" : "dark"),
    className: "md:hidden",
  };

  return (
    <FloatingDock 
      items={[...items, themeToggleItem]} 
      desktopClassName={className} 
    />
  );
}
