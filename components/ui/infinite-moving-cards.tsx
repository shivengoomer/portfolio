"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: React.ReactNode;
    name: string;
    brandColor?: number[]; // [R, G, B]
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  
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
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "35s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
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
      className="w-[150px] group/canvas-card max-w-full relative rounded-2xl border border-white/10 flex-shrink-0 bg-neutral-900/40 backdrop-blur-md px-4 py-6 md:w-[200px] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <CanvasRevealEffect
            animationSpeed={0.5}
            colors={[item.brandColor || [59, 130, 246]]}
            containerClassName="absolute inset-0 z-0"
          />
        )}
      </AnimatePresence>
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 flex items-center justify-center relative mb-4">
          {item.icon}
        </div>
        <div className="text-sm leading-[1.6] text-gray-100 font-normal">
          {item.name}
        </div>
      </div>
    </li>
  );
};
