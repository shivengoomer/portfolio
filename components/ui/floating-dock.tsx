"use client";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void; className?: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <FloatingDockDesktop items={items} className={desktopClassName} />
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void; className?: string }[];
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
        "mx-auto flex h-14 md:h-16 items-end gap-2 md:gap-4 rounded-2xl bg-zinc-50 px-2 md:px-4 pb-2 md:pb-3 dark:bg-zinc-900",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

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
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className={cn("border-none bg-transparent p-0", className)}>
      {content}
    </button>
  );
}
