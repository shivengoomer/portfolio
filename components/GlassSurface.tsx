"use client";

import React, { useEffect, useState } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: string;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 32,
  className = '',
  contentClassName = '',
  style = {}
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`
        relative overflow-hidden transition-all duration-300 ease-out
        
        /* Light Mode: Apple Liquid Frosted Glass (76% calibrated opacity, crystalline highlights) */
        bg-gradient-to-br from-white/[0.84] via-white/[0.74] to-slate-100/[0.78]
        backdrop-blur-[28px] [-webkit-backdrop-filter:blur(28px)_saturate(190%)_brightness(104%)]
        border border-white/80
        shadow-[0_24px_48px_-12px_rgba(15,23,42,0.14),inset_0_1.5px_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(255,255,255,0.4)]
        
        /* Dark Mode: Apple Dark Material (80% calibrated opacity, deep slate vibrancy, specular bevel) */
        dark:bg-gradient-to-br dark:from-[#1c2232]/[0.86] dark:via-[#0e1320]/[0.80] dark:to-[#090d16]/[0.86]
        dark:backdrop-blur-[30px] dark:[-webkit-backdrop-filter:blur(30px)_saturate(190%)_brightness(96%)]
        dark:border-white/[0.18]
        dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),inset_0_1.5px_1.5px_0_rgba(255,255,255,0.28),inset_0_-1px_1px_0_rgba(0,0,0,0.4)]

        focus-visible:outline-2 focus-visible:outline-[#007AFF] dark:focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2
        ${className}
      `}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
    >
      {/* Apple Liquid Glass Specular Highlight Sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-0"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[45%] -left-[30%] w-[160%] h-[130%] rounded-full opacity-70 transition-opacity duration-300"
          style={{
            background: isDarkMode
              ? 'radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 65%)'
              : 'radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 65%)',
          }}
        />
      </div>

      <div className={`w-full h-full rounded-[inherit] relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;


