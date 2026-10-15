"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  id?: string;
  /** distance in px to shift from (default 32) */
  distance?: number;
  /** spring stiffness (default 80) */
  stiffness?: number;
  /** spring damping (default 18) */
  damping?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  distance = 32,
  stiffness = 80,
  damping = 18,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
      ? { y: -distance }
      : direction === "left"
      ? { x: distance }
      : direction === "right"
      ? { x: -distance }
      : {};

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                type: "spring",
                stiffness,
                damping,
                delay: Math.min(delay, 0.6),
              },
            }
          : { opacity: 0, ...offset }
      }
    >
      {children}
    </motion.div>
  );
};
