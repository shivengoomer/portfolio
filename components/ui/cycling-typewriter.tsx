"use client";
import React, { useState, useEffect } from "react";
import { TypewriterEffect } from "./typewriter-effect";

export const CyclingTypewriter = ({ titles }: { titles: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [titles]);

  const words = titles[index].split(" ").map((word) => ({ text: word }));

  return <TypewriterEffect key={index} words={words} className="text-xl sm:text-2xl md:text-3xl font-heading text-neutral-300" />;
};
