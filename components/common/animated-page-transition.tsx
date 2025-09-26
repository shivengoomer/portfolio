"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedPageTransitionProps {
  children: ReactNode;
}


export const AnimatedPageTransition = ({
  children,
}: AnimatedPageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
