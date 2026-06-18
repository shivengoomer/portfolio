"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

type DockItem = {
  title: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockMobile items={items} className={mobileClassName} />
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e: any) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onTouchMove={(e: any) => mouseX.set(e.touches[0].pageX)}
      onTouchEnd={() => mouseX.set(Infinity)}
      onTouchCancel={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-zinc-50 px-4 pb-3 dark:bg-zinc-900 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-12 w-full items-center justify-between gap-1 overflow-x-auto rounded-2xl border border-black/10 bg-white/75 px-2 shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/75 md:hidden",
        className,
      )}
    >
      {items.map((item) => (
        <MobileDockItem key={item.title} {...item} />
      ))}
    </div>
  );
};

function MobileDockItem({ title, icon, href, onClick, className }: DockItem) {
  const [pulseKey, setPulseKey] = useState(0);

  const content = (
    <motion.span
      onTapStart={() => setPulseKey((key) => key + 1)}
      whileTap={{ scale: 0.9, y: 2 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 p-2 text-zinc-700 shadow-sm transition-colors dark:bg-zinc-900 dark:text-zinc-200"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10" />
      <AnimatePresence>
        {pulseKey > 0 && (
          <motion.span
            key={pulseKey}
            initial={{ opacity: 0.35, scale: 0.25 }}
            animate={{ opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-zinc-400/35 dark:bg-white/25"
          />
        )}
      </AnimatePresence>
      <motion.span
        className="relative z-10 flex h-full w-full items-center justify-center"
        whileTap={{ rotate: -8 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        {icon}
      </motion.span>
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={title}
        className={cn("flex shrink-0 items-center justify-center", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={title}
      className={cn(
        "flex shrink-0 items-center justify-center border-none bg-transparent p-0",
        className,
      )}
    >
      {content}
    </button>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  className,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onTouchCancel={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: "-50%", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -5, x: "-50%", filter: "blur(4px)" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[calc(100%+12px)] left-1/2 w-fit rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 whitespace-pre shadow-2xl z-[9000] pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn("border-none bg-transparent p-0", className)}
    >
      {content}
    </button>
  );
}
