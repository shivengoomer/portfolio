"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "super-slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: React.ReactNode;
    name: string;
    brandColor?: number[]; // [R, G, B]
  }[];
  direction?: "left" | "right";
  speed?:
  | "fast"
  | "normal"
  | "slow"
  | "slower"
  | "very-slow"
  | "super-slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();

      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;

    const speedMap = {
      fast: "20s",
      normal: "40s",
      slow: "70s",
      slower: "100s",
      "very-slow": "140s",
      "super-slow": "220s",
    };

    containerRef.current.style.setProperty(
      "--animation-duration",
      speedMap[speed]
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full w-max shrink-0 flex-nowrap gap-5 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <SkillCard item={item} key={item.name + idx} />
        ))}
      </ul>
    </div>
  );
};

const SkillCard = ({ item }: { item: any }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={cn(
        "group/canvas-card relative flex h-[160px] w-[170px] flex-shrink-0 overflow-hidden rounded-3xl",
        "bg-neutral-900/20 backdrop-blur-xl dark:text-white text-black",
        "transition-all duration-500 hover:-translate-y-1",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <CanvasRevealEffect
            animationSpeed={0.4}
            colors={[item.brandColor || [59, 130, 246]]}
            containerClassName="absolute inset-0 z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md">
          {item.icon}
        </div>

        <div className="text-sm font-medium tracking-wide dark:text-white ">
          {item.name}
        </div>
      </div>

    </li>
  );
};
