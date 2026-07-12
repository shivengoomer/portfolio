"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumLoaderProps {
  onComplete?: () => void;
}

interface ScriptStep {
  type: "input" | "output";
  text: string;
  delayBefore?: number;
  delayAfter?: number;
}

// Subtle Matrix Rain Background Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const columns = Math.floor(width / 20);
    const yPositions = Array(columns).fill(0);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.06)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#4338ca"; // Calm Indigo digital waterfall
      ctx.font = "12px Courier New";

      yPositions.forEach((y, index) => {
        const char = Math.random() > 0.5 ? "0" : "1";
        const x = index * 20;
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 16;
        }
      });
    };

    const interval = setInterval(draw, 40);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]" 
    />
  );
}

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  // Interactive speech bubble quotes
  const [quoteIndex, setQuoteIndex] = useState(0);
  const interactiveQuotes = [
    "i'm just a chill guy building cool web apps.",
    "works on my machine ¯\\_(ツ)_/¯",
    "git commit -m \"fix: please don't break again\"",
    "i run on coffee and coffee only. ☕",
    "why do programmers wear glasses? to see C#.",
    "B.Tech IT status: optimized and ready for production.",
    "did you know? bugs are just undocumented features.",
  ];

  // 3D Parallax Tilt state for the avatar card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setTilt({
      x: (y / (box.height / 2)) * -8,
      y: (x / (box.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Exit loader transition
  const handleExit = () => {
    setProgress(100);
    setIsExiting(true);
  };

  // Core boot sequence (highly geeky, memory addresses, diagnostic pings) - Optimized for readable cadence (~2.2s runtime)
  const script: ScriptStep[] = [
    { type: "output", text: "[0x7FFF5F] CONNECTING TO CLIENT INTERFACE... [OK]", delayAfter: 80 },
    { type: "input", text: "ssh shiven@shivengoomer.dev -p 22", delayBefore: 120, delayAfter: 180 },
    { type: "output", text: "ECDSA key signature verified: SHA256:dGhpcyBpcyBhIHJlYWxseSBjaGlsbCBndXk.", delayAfter: 100 },
    { type: "input", text: "••••••••", delayBefore: 150, delayAfter: 200 },
    { type: "output", text: "Warning: SSH shell established from 192.168.1.104.", delayAfter: 120 },
    { type: "output", text: "[0x7FFF68] ALLOCATING MEMORY BLOCKS... [OK]", delayAfter: 80 },
    { type: "output", text: "[0x7FFF74] CPU TEMPERATURES: CORE0: 74°C CORE1: 78°C [STABLE]", delayAfter: 90 },
    { type: "output", text: "[0x7FFF8C] COFFEE RESERVOIRS: 84% motivation potential.", delayAfter: 110 },
    { type: "output", text: "[0x7FFF98] DEPLOYING B.TECH IT NEURAL OPTIMIZER...", delayAfter: 140 },
    { type: "output", text: "------------------------------------------------------------", delayAfter: 60 },
    { type: "input", text: "npm run dev", delayBefore: 180, delayAfter: 200 },
    { type: "output", text: "▲ Next.js 14.1.0 - compilation starting...", delayAfter: 100 },
    { type: "output", text: "compiled client and server layers successfully in 842ms.", delayAfter: 150 },
    { type: "output", text: "Routes verified:", delayAfter: 100 },
    { type: "output", text: "  └─ / (index), /skills, /projects, /experience, /contact [200 OK]", delayAfter: 160 },
    { type: "output", text: "[0x7FFFA4] Core compilation complete. Booting shell...", delayAfter: 250 },
  ];

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, currentInput]);

  // Terminal run loop (Runs automatically to completion) - Restored natural typing speed
  useEffect(() => {
    let scriptIndex = 0;
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    const runStep = () => {
      if (scriptIndex >= script.length) {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
        }, 500); // satisfying pause on complete before curtain wipe
        return;
      }

      const step = script[scriptIndex];
      setProgress(Math.floor((scriptIndex / script.length) * 100));

      if (step.type === "input") {
        const typingDelay = step.delayBefore || 80;
        
        const typeChar = () => {
          if (charIndex < step.text.length) {
            setCurrentInput((prev) => prev + step.text[charIndex]);
            charIndex++;
            timer = setTimeout(typeChar, 12 + Math.random() * 18); // realistic typing cadence
          } else {
            timer = setTimeout(() => {
              const promptSymbol = scriptIndex < 10 ? "guest@shiven-os:~ $ " : "shiven@shivengoomer.dev:~ $ ";
              setLines((prev) => [...prev, promptSymbol + step.text]);
              setCurrentInput("");
              charIndex = 0;
              scriptIndex++;
              setTimeout(runStep, step.delayAfter || 60);
            }, 60);
          }
        };

        timer = setTimeout(typeChar, typingDelay);
      } else {
        timer = setTimeout(() => {
          setLines((prev) => [...prev, step.text]);
          scriptIndex++;
          runStep();
        }, step.delayAfter || 60);
      }
    };

    runStep();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAvatarClick = () => {
    setQuoteIndex((prev) => (prev + 1) % interactiveQuotes.length);
  };

  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[#030303] text-white p-4 sm:p-6 font-mono select-none overflow-hidden h-screen"
        >
          {/* Custom style injection for moving tilted red stripes */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scanHorizontal {
                0% { transform: translateX(-25%) rotate(-12deg); }
                50% { transform: translateX(25%) rotate(-12deg); }
                100% { transform: translateX(-25%) rotate(-12deg); }
              }
              .animate-scan-slow {
                animation: scanHorizontal 14s ease-in-out infinite;
              }
              .animate-scan-medium {
                animation: scanHorizontal 9s ease-in-out infinite;
              }
              .animate-scan-fast {
                animation: scanHorizontal 6s ease-in-out infinite;
              }
            `
          }} />

          {/* Subtle Indigo Binary Waterfalls */}
          <MatrixRain />

          {/* Tilted Scanning Neon Red Stripes */}
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[20%] left-[-50%] w-[200%] h-[1.5px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent rotate-[-12deg] animate-scan-slow" />
            <div className="absolute top-[50%] left-[-50%] w-[200%] h-[3px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent rotate-[-12deg] animate-scan-fast" />
            <div className="absolute top-[80%] left-[-50%] w-[200%] h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent rotate-[-12deg] animate-scan-medium" />
          </div>

          {/* Glowing Aura Background */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.22, 0.15],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.04) 60%, transparent 100%)`,
              width: "450px",
              height: "450px",
            }}
            className="absolute blur-[80px] pointer-events-none"
          />

          {/* Quick Skip Button */}
          <button
            onClick={handleExit}
            className="absolute top-4 right-4 z-[100000] flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-zinc-500 hover:text-indigo-400 bg-zinc-900/40 border border-zinc-800/40 hover:border-indigo-500/30 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95 shadow-sm"
          >
            <span>SKIP SEQUENCE</span>
            <kbd className="bg-zinc-800 px-1 rounded text-[8px] border border-zinc-700">ENTER</kbd>
          </button>

          {/* Main Interface Layout */}
          <div className="relative z-10 w-full max-w-5xl flex flex-col lg:grid lg:grid-cols-12 gap-5 md:gap-8 items-center justify-center max-h-full">
            
            {/* Left Column: borderless HUD Terminal Window */}
            <motion.div 
              initial={{ opacity: 0, x: -65, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[440px] bg-zinc-950/90 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative group"
            >
              {/* Sci-Fi HUD Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-indigo-500/50 rounded-tl-sm pointer-events-none z-30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-indigo-500/50 rounded-tr-sm pointer-events-none z-30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-indigo-500/50 rounded-bl-sm pointer-events-none z-30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-indigo-500/50 rounded-br-sm pointer-events-none z-30" />

              {/* Retro CRT monitor scanlines */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.06)_50%,rgba(0,0,0,0.06))] bg-[size:100%_4px] opacity-25 z-20" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-indigo-500/3 z-20" />

              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/50 z-30 relative">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] text-zinc-400 font-sans tracking-wide">
                  shiven@shivengoomer.dev: ~ (zsh)
                </div>
                <div className="w-8" />
              </div>

              {/* Terminal screen text area */}
              <div className="flex-1 p-4 overflow-y-auto text-[10px] sm:text-[11px] md:text-[12px] leading-relaxed text-zinc-300 scrollbar-none z-10">
                {lines.map((line, index) => {
                  let colorClass = "text-zinc-300";
                  if (line.includes("guest@") || line.includes("shiven@")) {
                    colorClass = "text-emerald-400";
                  } else if (line.includes("[0x7FFF") || line.includes(" verified")) {
                    colorClass = "text-emerald-500/90 font-medium";
                  } else if (line.includes("Warning:") || line.includes("critical")) {
                    colorClass = "text-amber-500/90";
                  } else if (line.includes("▲") || line.includes("compiling")) {
                    colorClass = "text-indigo-400 font-semibold";
                  }
                  return (
                    <div key={index} className={colorClass}>
                      {line}
                    </div>
                  );
                })}
                
                {/* Typing Prompt */}
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-1.5">
                    {lines.length < 5 ? "guest@shiven-os:~ $ " : "shiven@shivengoomer.dev:~ $ "}
                  </span>
                  <span>{currentInput}</span>
                  <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
                </div>
                
                <div ref={terminalEndRef} />
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/50 bg-zinc-900/30 text-[9px] md:text-[11px] text-zinc-500 z-30 relative select-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono bg-zinc-800/80 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] text-zinc-400">
                    SYSTEM.OK
                  </span>
                  <span className="text-emerald-500 font-semibold uppercase animate-pulse">COMPILING</span>
                </div>
                <div className="font-mono text-zinc-400">
                  {progress.toString().padStart(3, "0")}% COMPLETE
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Interactive Parallax Floating Avatar (NO Div Card Background) */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <motion.div
                ref={cardRef}
                layoutId="hero-avatar"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleAvatarClick}
                initial={{ opacity: 0, x: 65, y: 20, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                }}
                transition={{
                  x: { type: "spring", stiffness: 65, damping: 13, delay: 0.3 },
                  y: { type: "spring", stiffness: 65, damping: 13, delay: 0.3 },
                  scale: { type: "spring", stiffness: 65, damping: 13, delay: 0.3 },
                  opacity: { duration: 0.5, delay: 0.3 },
                  rotateX: { type: "spring", stiffness: 150, damping: 20 },
                  rotateY: { type: "spring", stiffness: 150, damping: 20 },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="flex flex-col items-center relative cursor-pointer select-none group w-full"
              >
                {/* Stylized 'SHIVEN' Background Typography / Graffiti watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                  <span className="text-[120px] sm:text-[160px] font-heading font-black tracking-tighter text-zinc-500/[0.04] dark:text-zinc-400/[0.05] uppercase rotate-[-12deg] scale-125">
                    SHIVEN
                  </span>
                </div>
                
                {/* Unified Speech Bubble / Message Cloud (Responsive: Above avatar on mobile, Right of mouth on desktop) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 85, damping: 13, delay: 0.6 }}
                  style={{ transform: "translateZ(60px)" }}
                  className="mb-6 lg:mb-0 lg:absolute lg:top-8 lg:left-[70%] lg:w-[260px] p-4 bg-[#0e0e11] border border-zinc-700/80 rounded-2xl shadow-2xl z-[60] w-full max-w-[280px] sm:max-w-[340px]"
                >
                  {/* Pointer pointing DOWN on Mobile/Tablet */}
                  <div className="block lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0e0e11] border-b border-r border-zinc-700/80 rotate-45 -mt-[7px]" />
                  
                  {/* Pointer pointing LEFT to mouth on Desktop */}
                  <div className="hidden lg:block absolute top-[45px] right-full translate-x-[7px] w-3.5 h-3.5 bg-[#0e0e11] border-b border-l border-zinc-700/80 rotate-45" />
                  
                  {/* Interactive Quote (Keyed text to avoid bubble container remount delay) */}
                  <motion.p 
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="text-[11px] sm:text-[12px] font-medium text-zinc-300 text-center leading-relaxed font-sans select-none"
                  >
                    &ldquo;{interactiveQuotes[quoteIndex]}&rdquo;
                  </motion.p>
                  
                  {/* Subtle Separator */}
                  <div className="border-t border-zinc-900/80 my-2.5" />

                  {/* Technical Telemetry Specs */}
                  <div className="flex flex-col items-center gap-0.5 font-mono text-[8px] text-zinc-500 tracking-wider uppercase select-none">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                      <span>USER_SHELL: OPTIMIZED</span>
                    </div>
                    <div>PING: 12ms // COFFEE: 84% // BOOT: READY</div>
                  </div>

                  {/* Click Micro tip */}
                  <div className="text-[7.5px] text-zinc-700 text-center mt-2.5 font-mono uppercase tracking-widest select-none opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                    Click avatar to talk
                  </div>
                </motion.div>

                {/* 3D Floating Avatar container (MASSIVE SIZE & INCREASED MOBILE VIEW SIZE) */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transform: "translateZ(35px)" }}
                  className="w-64 h-[320px] sm:w-76 sm:h-[440px] md:w-88 md:h-[460px] lg:w-[440px] lg:h-[560px] xl:w-[480px] xl:h-[620px] relative drop-shadow-[0_25px_50px_rgba(139,92,246,0.3)] flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300 z-10"
                >
                  <img 
                    src="/shiven-pixel-waving.png" 
                    alt="Shiven Pixel Avatar" 
                    className="object-contain w-full h-full pixelated scale-x-[-1]"
                  />
                </motion.div>

              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
