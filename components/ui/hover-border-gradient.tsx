"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState("TOP");

  const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

  const rotateDirection = () => {
    setDirection((curr) => {
      const idx = directions.indexOf(curr);
      const nextIdx = clockwise ? (idx + 1) % 4 : (idx - 1 + 4) % 4;
      return directions[nextIdx];
    });
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        rotateDirection();
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-white/20 content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center overflow-hidden w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 px-4 py-2 w-full text-white bg-black rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn("absolute inset-0 z-0 bg-blue-500", className)}
        style={{
          filter: "blur(2px)",
          opacity: hovered ? 1 : 0.5,
        }}
        initial={{ opacity: 0.5 }}
        animate={{
          background:
            direction === "TOP"
              ? "radial-gradient(16\\.2% 41\\.2% at 50% 0%, #3b82f6 0%, rgba(255, 255, 255, 0) 100%)"
              : direction === "LEFT"
              ? "radial-gradient(16\\.2% 41\\.2% at 0% 50%, #3b82f6 0%, rgba(255, 255, 255, 0) 100%)"
              : direction === "BOTTOM"
              ? "radial-gradient(16\\.2% 41\\.2% at 50% 100%, #3b82f6 0%, rgba(255, 255, 255, 0) 100%)"
              : "radial-gradient(16\\.2% 41\\.2% at 100% 50%, #3b82f6 0%, rgba(255, 255, 255, 0) 100%)",
        }}
        transition={{ duration: duration }}
      />
    </Tag>
  );
}
