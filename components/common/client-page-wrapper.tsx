"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ClientPageWrapperProps {
  children: ReactNode;
}

export const ClientPageWrapper = ({ children }: ClientPageWrapperProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="w-full"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
