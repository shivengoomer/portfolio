"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

export const StarsBackground = ({
  starDensity = 0.00015,
  color = "#fff",
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1.5,
  twinkleProbability = 0.7,
  className,
}: {
  starDensity?: number;
  color?: string;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  twinkleProbability?: number;
  className?: string;
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback((width: number, height: number) => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity * 1.5);
    return Array.from({ length: numStars }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed:
        Math.random() > twinkleProbability
          ? null
          : Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) +
            minTwinkleSpeed,
    }));
  }, [starDensity, maxTwinkleSpeed, minTwinkleSpeed, twinkleProbability]);

  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
      setStars(generateStars(canvas.width, canvas.height));
    };
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => {
      window.removeEventListener("resize", setupCanvas);
    };
  }, [generateStars]);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${
          star.twinkleSpeed
            ? Math.abs(Math.sin((Date.now() / 1000) * star.twinkleSpeed)) *
                0.5 +
              0.5
            : star.opacity
        })`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 z-[-1]", className)} />;
};
