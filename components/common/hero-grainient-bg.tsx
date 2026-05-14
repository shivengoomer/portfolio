"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Grainient = dynamic(() => import("@/components/Grainient"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />,
});

export function HeroGrainientBg() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />;
  }

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.95)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,1)_100%)]" />

      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.6]">
        <Grainient
          timeSpeed={0.15}
          colorBalance={0.1}
          warpStrength={1.5}
          warpFrequency={2.0}
          warpSpeed={0.5}
          warpAmplitude={80.0}
          blendAngle={45.0}
          blendSoftness={0.5}
          rotationAmount={360.0}
          noiseScale={1.5}
          grainAmount={0.08}
          grainScale={1.5}
          grainAnimated
          contrast={1.2}
          gamma={1.1}
          saturation={isDark ? 0.8 : 0.6}
          zoom={1.2}
          color1={isDark ? "#0ea5e9" : "#e0f2fe"}
          color2={isDark ? "#8b5cf6" : "#ede9fe"}
          color3={isDark ? "#ec4899" : "#fbcfe8"}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
