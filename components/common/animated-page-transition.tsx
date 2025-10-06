"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedPageTransitionProps {
  children: ReactNode;
  duration?: number; // optional for flexibility
}

export const AnimatedPageTransition = ({
  children,
  duration = 0.6,
}: AnimatedPageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
