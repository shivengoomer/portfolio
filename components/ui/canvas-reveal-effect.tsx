"use client";

import { motion } from "framer-motion";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  colors = [[59, 130, 246]],
  containerClassName,
}: {
  animationSpeed?: number;
  colors?: number[][];
  containerClassName?: string;
}) => {
  return (
    <div className={`h-full w-full absolute inset-0 transition-opacity duration-500 overflow-hidden ${containerClassName}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 10 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: animationSpeed, ease: "easeOut" }}
        className="absolute inset-0 m-auto rounded-full w-12 h-12 blur-xl"
        style={{
           backgroundColor: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
    </div>
  );
};
