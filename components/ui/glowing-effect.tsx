"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const GlowingEffect = ({
  className,
  glowClassName,
}: {
  className?: string; // used for inner div
  glowClassName?: string; // used for outer glow
}) => {
  return (
    <div
      className={cn(
        "absolute -inset-[2px] rounded-[inherit] -z-10 opacity-60 dark:opacity-40 animate-pulse bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-400 blur-md",
        glowClassName
      )}
    />
  );
};
