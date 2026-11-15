"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useReducedMotion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  Calendar,
  Layers,
  Maximize2,
  Minimize2,
  Flame,
  ArrowUpRight,
  HelpCircle,
  Compass,
} from "lucide-react";
import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

/* ── TYPES ── */
export type ContributionDay = {
  date: string;
  weekday: number;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type GitHubPayload = {
  username?: string;
  year?: number;
  totalContributions: number;
  weeks: ContributionWeek[];
  busiestDay?: {
    date: string;
    count: number;
  };
  activeDays?: number;
  longestStreak?: number;
  currentStreak?: number;
};

type HoveredVoxel = {
  date: string;
  count: number;
  weekday: number;
  level: number;
  screenX: number;
  screenY: number;
};

/* ── PROCEDURAL PROCEDURAL VOXEL WINDOW TEXTURE ── */
function createSkyscraperWindowTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Structural Wall Background
    ctx.fillStyle = isDark ? "#0e131b" : "#242a35";
    ctx.fillRect(0, 0, 128, 256);

    // Subtle concrete edge lines
    ctx.strokeStyle = isDark ? "#16202c" : "#323c4b";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 126, 254);

    // Matrix of illuminated pixel windows
    const cols = 5;
    const rows = 16;
    const w = 14;
    const h = 8;
    const padX = 9;
    const padY = 7;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 12 + c * (w + padX);
        const y = 14 + r * (h + padY);

        // Pseudorandom lighting state for city night effect
        const seed = Math.sin(r * 37 + c * 17) * 1000;
        const rand = seed - Math.floor(seed);

        if (rand > 0.65) {
          // Lit window: glowing neon green, cyber teal, or warm amber
          if (rand > 0.88) {
            ctx.fillStyle = "#39d353"; // High-voltage green
          } else if (rand > 0.78) {
            ctx.fillStyle = "#00e5ff"; // Cyber cyan
          } else {
            ctx.fillStyle = "#ffd166"; // Warm interior yellow
          }
        } else {
          // Unlit dark glass
          ctx.fillStyle = isDark ? "#06090d" : "#181d24";
        }

        ctx.fillRect(x, y, w, h);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

export function GitHubScrollCityGraph({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // State
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [hoveredVoxel, setHoveredVoxel] = useState<HoveredVoxel | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  // Manual camera rotation overrides
  const rotRef = useRef({ yaw: -0.65, pitch: 0.52, targetYaw: -0.65, targetPitch: 0.52 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const replayTriggerRef = useRef(0);
  const manualModeRef = useRef<"3d" | "2d">("3d");

  // Keep manualModeRef in sync
  useEffect(() => {
    manualModeRef.current = viewMode;
  }, [viewMode]);

  /* ── 1. THEME OBSERVER ── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── 2. SCROLL DRIVEN TRANSITION ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 45%"],
  });
  const scrollRef = useRef({ progress: 0 });
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollRef.current.progress = Math.max(0, Math.min(1, v));
    });
  }, [scrollYProgress]);

  /* ── 3. FETCH LIVE GITHUB DATA ── */
  useEffect(() => {
    let alive = true;
    fetch("/api/github/contributions?username=shivengoomer&year=2026")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (alive && j) {
          setData(j);
        }
      })
      .catch(() => {
        // Fallback handled gracefully in API route
      });
    return () => {
      alive = false;
    };
  }, []);

  /* ── 4. THREE.JS VOXEL METROPOLIS ENGINE ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability using a temporary throwaway canvas
    let supported = false;
    try {
      const testCanvas = document.createElement("canvas");
      supported = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      supported = false;
    }

    if (!supported) {
      setWebglSupported(false);
      return;
    }

    const weeks = data?.weeks ?? [];
    const nWeeks = weeks.length || 53;
    const nDays = 7;
    const totalVoxels = nWeeks * nDays;

    /* ── Grid geometry metrics (SimCity Voxel proportions) ── */
    const CW = 1.15; // Voxel width
    const CD = 1.15; // Voxel depth
    const GX = 0.22; // Street gap X
    const GZ = 0.22; // Street gap Z
    const SX = CW + GX;
    const SZ = CD + GZ;
    const gridW = nWeeks * SX;
    const gridD = nDays * SZ;

    /* ── Renderer (Safely initialized inside try-catch) ── */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 1.25 : 1.1;
      setWebglSupported(true);
    } catch {
      setWebglSupported(false);
      return;
    }

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglSupported(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    /* ── Scene & Atmospheric Fog ── */
    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x0f0812 : 0xf4efdc;
    scene.fog = new THREE.FogExp2(fogColor, 0.0075);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 1500);

    /* ── Procedural Window Texture & Materials ── */
    const windowTexture = createSkyscraperWindowTexture(isDark);
    windowTexture.repeat.set(1, 3);

    // Wall Material (Voxel skyscraper facades with illuminated windows)
    const wallMaterial = new THREE.MeshStandardMaterial({
      map: windowTexture,
      roughness: 0.35,
      metalness: 0.25,
      color: isDark ? 0xcccccc : 0xeeeeee,
    });

    // Rooftop Material (Vibrant GitHub green caps with emissive lighting)
    const roofMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.15,
      emissiveIntensity: isDark ? 0.35 : 0.15,
    });

    /* ── Instanced Meshes ── */
    // 1. Tower Body
    const bodyGeo = new THREE.BoxGeometry(CW, 1, CD);
    bodyGeo.translate(0, 0.5, 0); // Pivot at ground
    const bodyMesh = new THREE.InstancedMesh(bodyGeo, wallMaterial, totalVoxels);
    bodyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(bodyMesh);

    // 2. Rooftop Cap (Vibrant green roof plates)
    const roofGeo = new THREE.BoxGeometry(CW, 0.22, CD);
    roofGeo.translate(0, 0.11, 0);
    const roofMesh = new THREE.InstancedMesh(roofGeo, roofMaterial, totalVoxels);
    roofMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(roofMesh);

    /* ── Lighting System ── */
    // Ambient Light
    const ambient = new THREE.AmbientLight(isDark ? 0x221326 : 0xfffcf0, isDark ? 2.2 : 2.0);
    scene.add(ambient);

    // Key Directional Light (Sun/Moon creating crisp diagonal shadows)
    const keyLight = new THREE.DirectionalLight(isDark ? 0xeef5ff : 0xfffae0, isDark ? 2.6 : 2.2);
    keyLight.position.set(40, 90, 60);
    scene.add(keyLight);

    // Luminous Green Volumetric Rim Light (giving the signature GitHub city glow)
    const greenRim = new THREE.DirectionalLight(0x39d353, isDark ? 1.6 : 0.8);
    greenRim.position.set(-60, 45, -30);
    scene.add(greenRim);

    // Cyan Fill from opposite side
    const cyanFill = new THREE.DirectionalLight(0x00e5ff, isDark ? 0.8 : 0.4);
    cyanFill.position.set(60, 30, -50);
    scene.add(cyanFill);

    /* ── Isometric Ground Foundation & Perspective Grid ── */
    const groundGeo = new THREE.PlaneGeometry(gridW * 1.5, gridD * 2.8);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x09050b : 0xe4dec8,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.05;
    scene.add(ground);

    // Glowing Cyber Grid on ground
    const gridHelper = new THREE.GridHelper(
      gridW * 1.5,
      Math.round(nWeeks * 1.5),
      isDark ? 0x26a641 : 0xa0c8a0,
      isDark ? 0x141f18 : 0xd8d2be
    );
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = isDark ? 0.35 : 0.25;
    scene.add(gridHelper);

    /* ── Palette Colors ── */
    const palette = isDark
      ? {
          l0: new THREE.Color("#161b22"), // Empty lot
          l1: new THREE.Color("#0e4429"), // 1-2 commits
          l2: new THREE.Color("#006d32"), // 3-5 commits
          l3: new THREE.Color("#26a641"), // 6-9 commits
          l4: new THREE.Color("#39d353"), // 10+ commits
          highlight: new THREE.Color("#a3e635"), // Hover state
        }
      : {
          l0: new THREE.Color("#d0cab6"),
          l1: new THREE.Color("#9be9a8"),
          l2: new THREE.Color("#40c463"),
          l3: new THREE.Color("#26a641"),
          l4: new THREE.Color("#196127"),
          highlight: new THREE.Color("#f59e0b"),
        };

    /* ── Precompute Voxel Lot Data ── */
    type VoxelData = {
      date: string;
      weekday: number;
      count: number;
      level: number;
      targetH: number;
      posX: number;
      posZ: number;
      roofColor: THREE.Color;
    };

    const voxels: VoxelData[] = [];
    const originX = -(gridW / 2) + SX / 2;
    const originZ = -(gridD / 2) + SZ / 2;

    let idx = 0;
    for (let w = 0; w < nWeeks; w++) {
      const days = weeks[w]?.contributionDays ?? [];
      for (let d = 0; d < nDays; d++) {
        const day = days.find((x) => x.weekday === d);
        const count = day?.contributionCount ?? 0;
        const date = day?.date ?? `2026-W${w + 1}-D${d}`;

        const posX = originX + w * SX;
        const posZ = originZ + d * SZ;

        let targetH = 0.12; // Flat ground lot
        let level = 0;
        let roofColor = palette.l0;

        if (count > 0) {
          if (count <= 2) {
            targetH = 2.8;
            level = 1;
            roofColor = palette.l1;
          } else if (count <= 5) {
            targetH = 5.8;
            level = 2;
            roofColor = palette.l2;
          } else if (count <= 9) {
            targetH = 10.5;
            level = 3;
            roofColor = palette.l3;
          } else {
            // Skyscraper penthouse
            targetH = 15.5 + Math.min(count - 10, 15) * 0.75;
            level = 4;
            roofColor = palette.l4;
          }
        }

        roofMesh.setColorAt(idx, roofColor);
        voxels.push({ date, weekday: d, count, level, targetH, posX, posZ, roofColor });
        idx++;
      }
    }
    if (roofMesh.instanceColor) roofMesh.instanceColor.needsUpdate = true;

    /* ── Responsive Viewport Scaling ── */
    let cW = 0, cH = 0;
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      cW = rect.width;
      // Generous responsive height for metropolis depth
      cH = Math.max(460, Math.min(680, cW * 0.58));
      renderer.setSize(cW, cH, false);
      camera.aspect = cW / cH;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    /* ── Render & Animation Loop ── */
    let animId: number;
    let animProgress = 0;
    const dummy = new THREE.Object3D();
    const roofDummy = new THREE.Object3D();

    const render = () => {
      // Interpolate scroll / interactive animation
      const scrollProgress = scrollRef.current.progress;
      const is2D = manualModeRef.current === "2d";

      // If in 2D mode, target progress is 0 (flat heatmap); if 3D, target is scrollProgress
      const targetAnim = is2D ? 0 : Math.max(0.08, scrollProgress);
      animProgress += (targetAnim - animProgress) * 0.08;
      const p = shouldReduceMotion ? 1 : Math.max(0, Math.min(1, animProgress));

      // Smooth camera orbit angles
      rotRef.current.yaw += (rotRef.current.targetYaw - rotRef.current.yaw) * 0.08;
      rotRef.current.pitch += (rotRef.current.targetPitch - rotRef.current.pitch) * 0.08;

      // Base camera distances
      const isMobile = cW < 640;
      const baseDist = isMobile ? 135 : 105;

      // Camera elevation: 2D is direct top-down (90° pitch), 3D is isometric tilted
      const effectivePitch = is2D
        ? Math.PI / 2
        : THREE.MathUtils.lerp(Math.PI / 2, rotRef.current.pitch, p);
      const effectiveYaw = is2D
        ? 0
        : THREE.MathUtils.lerp(0, rotRef.current.yaw, p);

      const cx = baseDist * Math.sin(effectiveYaw) * Math.cos(effectivePitch);
      const cy = baseDist * Math.sin(effectivePitch);
      const cz = baseDist * Math.cos(effectiveYaw) * Math.cos(effectivePitch);

      camera.position.set(cx, cy, cz);
      // Look slightly above ground when in 3D so the skyline is centered
      camera.lookAt(0, is2D ? 0 : THREE.MathUtils.lerp(0, 5, p), 0);

      // Extrude buildings dynamically
      let i = 0;
      for (const v of voxels) {
        const h = THREE.MathUtils.lerp(0.12, v.targetH, p);

        // Body matrix
        dummy.position.set(v.posX, 0, v.posZ);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        bodyMesh.setMatrixAt(i, dummy.matrix);

        // Rooftop cap matrix
        roofDummy.position.set(v.posX, h, v.posZ);
        roofDummy.scale.set(1, 1, 1);
        roofDummy.updateMatrix();
        roofMesh.setMatrixAt(i, roofDummy.matrix);

        i++;
      }
      bodyMesh.instanceMatrix.needsUpdate = true;
      roofMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };
    render();

    /* ── Pointer Raycasting & Hover Illumination ── */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    let lastHoverId: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      // Handle drag rotation if pointer is down
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastPointerRef.current.x;
        const deltaY = e.clientY - lastPointerRef.current.y;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };

        rotRef.current.targetYaw += deltaX * 0.008;
        rotRef.current.targetPitch = Math.max(
          0.18,
          Math.min(1.25, rotRef.current.targetPitch + deltaY * 0.006)
        );
        return;
      }

      // Raycast hover
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // Intersect both roof and body
      const hits = raycaster.intersectObjects([roofMesh, bodyMesh]);

      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        const id = hits[0].instanceId;
        if (id !== lastHoverId) {
          // Restore previous
          if (lastHoverId !== null && voxels[lastHoverId]) {
            roofMesh.setColorAt(lastHoverId, voxels[lastHoverId].roofColor);
          }
          // Highlight active
          roofMesh.setColorAt(id, palette.highlight);
          if (roofMesh.instanceColor) roofMesh.instanceColor.needsUpdate = true;
          lastHoverId = id;
        }

        const v = voxels[id];
        if (v) {
          setHoveredVoxel({
            date: v.date,
            count: v.count,
            weekday: v.weekday,
            level: v.level,
            screenX: e.clientX - rect.left,
            screenY: e.clientY - rect.top,
          });
        }
      } else {
        if (lastHoverId !== null && voxels[lastHoverId]) {
          roofMesh.setColorAt(lastHoverId, voxels[lastHoverId].roofColor);
          if (roofMesh.instanceColor) roofMesh.instanceColor.needsUpdate = true;
          lastHoverId = null;
        }
        setHoveredVoxel(null);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const onPointerLeave = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
      if (lastHoverId !== null && voxels[lastHoverId]) {
        roofMesh.setColorAt(lastHoverId, voxels[lastHoverId].roofColor);
        if (roofMesh.instanceColor) roofMesh.instanceColor.needsUpdate = true;
        lastHoverId = null;
      }
      setHoveredVoxel(null);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animId);

      // Clean disposal
      bodyGeo.dispose();
      wallMaterial.dispose();
      roofGeo.dispose();
      roofMaterial.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      windowTexture.dispose();
      renderer.dispose();
    };
  }, [data, isDark, shouldReduceMotion, replayTriggerRef.current]);

  /* ── Interaction Handlers ── */
  const handleResetOrbit = useCallback(() => {
    rotRef.current.targetYaw = -0.65;
    rotRef.current.targetPitch = 0.52;
  }, []);

  const handleReplay = useCallback(() => {
    handleResetOrbit();
    scrollRef.current.progress = 0;
    replayTriggerRef.current += 1;
    setTimeout(() => {
      scrollRef.current.progress = 1;
    }, 100);
  }, [handleResetOrbit]);

  const totalContributions = data?.totalContributions ?? 420;
  const busiestDay = data?.busiestDay ?? { date: "2026-06-15", count: 18 };
  const longestStreak = data?.longestStreak ?? 24;
  const activeDays = data?.activeDays ?? 168;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full select-none", className)}
    >
      {/* ── RETRO-FUTURISTIC CYBER METROPOLIS CARD ── */}
      <div className="relative rounded-3xl border border-border/80 bg-surface/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        {/* Subtle Pixel-Grid Scrim */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 -z-10"
          style={{
            backgroundImage: "radial-gradient(rgba(57,211,83,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── TOP TELEMETRY HUD ── */}
        <div className="border-b border-border/70 p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Identity & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39d353] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39d353]" />
              </span>
              <Icons.gitHub className="h-5 w-5 text-text" />
              <span className="font-heading text-sm sm:text-base font-bold text-text uppercase tracking-wider">
                GitHub Contribution Metropolis
              </span>
            </div>

            <Link
              href="https://github.com/shivengoomer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-text-muted hover:text-accent hover:border-accent transition-all"
            >
              <span>@shivengoomer</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs">
            {/* Total Contributions */}
            <div className="flex items-center gap-1.5 rounded-xl border border-[#39d353]/30 bg-[#39d353]/10 px-3 py-1 text-[#39d353]">
              <Zap className="h-3.5 w-3.5" />
              <span className="font-bold">{totalContributions.toLocaleString()}</span>
              <span className="text-[10px] uppercase text-text-muted">Commits</span>
            </div>

            {/* Peak Day */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border bg-surface-2 px-3 py-1 text-text-muted">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span>Peak:</span>
              <span className="font-semibold text-text">{busiestDay.count} in 1 day</span>
            </div>

            {/* Streak */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-border bg-surface-2 px-3 py-1 text-text-muted">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span>Longest Streak:</span>
              <span className="font-semibold text-text">{longestStreak} days</span>
            </div>

            {/* Controls: 2D/3D & Replay */}
            <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-border">
              {/* 2D / 3D Mode Toggle */}
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "3d" ? "2d" : "3d")}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-text hover:border-accent hover:text-accent transition-all active:scale-95 shadow-xs"
                title={viewMode === "3d" ? "Switch to Flat 2D Heatmap" : "Switch to 3D Voxel Skyline"}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{viewMode === "3d" ? "3D City" : "2D Heatmap"}</span>
              </button>

              {/* Replay Dive-In */}
              <button
                type="button"
                onClick={handleReplay}
                className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted hover:text-text hover:border-border active:scale-90 transition-all"
                title="Replay Camera Flight & Elevation"
                aria-label="Replay animation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              {/* Reset Orbit Angle */}
              <button
                type="button"
                onClick={handleResetOrbit}
                className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted hover:text-text hover:border-border active:scale-90 transition-all"
                title="Reset Camera Angle"
                aria-label="Reset Camera Angle"
              >
                <Compass className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* ── 3D CANVAS VIEWPORT ── */}
        <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] cursor-grab active:cursor-grabbing overflow-hidden">
          
          {/* Top/Bottom Atmospheric Vignettes */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-surface via-surface/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

          {/* Fallback for unsupported devices */}
          {!webglSupported ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 text-center overflow-x-auto">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#39d353] animate-pulse" />
                <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-text">
                  2D Heatmap Mode (WebGL Fallback Active)
                </span>
              </div>
              <div className="flex gap-1.5 p-3 sm:p-4 rounded-2xl border border-border bg-surface-2/80 max-w-full overflow-x-auto shadow-inner">
                {(data?.weeks ?? []).map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5 shrink-0">
                    {week.contributionDays.map((day) => {
                      const count = day.contributionCount;
                      const bg =
                        count === 0
                          ? "bg-[#161b22]"
                          : count <= 2
                          ? "bg-[#0e4429]"
                          : count <= 5
                          ? "bg-[#006d32]"
                          : count <= 9
                          ? "bg-[#26a641]"
                          : "bg-[#39d353] shadow-[0_0_6px_#39d353]";
                      return (
                        <div
                          key={day.date}
                          className={cn("h-3 w-3 rounded-xs cursor-pointer transition-transform hover:scale-125", bg)}
                          title={`${day.date}: ${count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[11px] text-text-muted">
                Rendering in lightweight 2D mode. Enable hardware acceleration in your browser to unlock the 3D Voxel Metropolis.
              </p>
            </div>
          ) : (
            <canvas ref={canvasRef} className="w-full h-full block touch-none" />
          )}

          {/* ── INTERACTIVE HOVER HUD TOOLTIP ── */}
          <AnimatePresence>
            {hoveredVoxel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-2xl border border-[#39d353]/40 bg-black/85 p-3 text-xs text-white shadow-2xl backdrop-blur-md"
                style={{
                  left: `${Math.max(80, Math.min(hoveredVoxel.screenX, (canvasRef.current?.clientWidth ?? 800) - 80))}px`,
                  top: `${Math.max(40, hoveredVoxel.screenY - 14)}px`,
                }}
              >
                <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 mb-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      hoveredVoxel.level === 4
                        ? "bg-[#39d353] shadow-[0_0_8px_#39d353]"
                        : hoveredVoxel.level === 3
                        ? "bg-[#26a641]"
                        : hoveredVoxel.level === 2
                        ? "bg-[#006d32]"
                        : hoveredVoxel.level === 1
                        ? "bg-[#0e4429]"
                        : "bg-zinc-600"
                    )}
                  />
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                    {hoveredVoxel.level === 4
                      ? "Voxel Skyscraper"
                      : hoveredVoxel.level === 3
                      ? "High-Rise Tower"
                      : hoveredVoxel.level === 2
                      ? "Mid-Rise District"
                      : hoveredVoxel.level === 1
                      ? "Low-Rise Parcel"
                      : "Quiet Day"}
                  </span>
                </div>

                <p className="font-heading text-sm font-bold text-white">
                  {hoveredVoxel.count}{" "}
                  <span className="font-normal text-zinc-300">
                    {hoveredVoxel.count === 1 ? "contribution" : "contributions"}
                  </span>
                </p>

                <p className="font-mono text-[10px] text-emerald-400 mt-0.5">
                  {new Date(hoveredVoxel.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Dragging Indicator */}
          {isInteracting && (
            <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
              Orbiting Metropolis Angle...
            </div>
          )}

        </div>

        {/* ── FOOTER HUD: VOXEL LEGEND & INTERACTION HINT ── */}
        <div className="border-t border-border/70 bg-surface-2/60 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-text-muted font-mono">
          
          {/* Hint */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] sm:text-xs">
              Drag to orbit 360° · Scroll to elevate skyline · Hover to inspect parcel
            </span>
          </div>

          {/* Voxel Height & Color Legend */}
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Density:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted">0</span>
              <span className="h-3 w-3 rounded-xs border border-border bg-[#161b22] dark:bg-[#161b22]" title="0 contributions" />
              <span className="h-3 w-3 rounded-xs bg-[#0e4429] dark:bg-[#0e4429]" title="1-2 contributions (Low-Rise)" />
              <span className="h-3 w-3 rounded-xs bg-[#006d32] dark:bg-[#006d32]" title="3-5 contributions (Mid-Rise)" />
              <span className="h-3 w-3 rounded-xs bg-[#26a641] dark:bg-[#26a641]" title="6-9 contributions (High-Rise)" />
              <span className="h-3 w-3 rounded-xs bg-[#39d353] dark:bg-[#39d353] shadow-[0_0_8px_#39d353]" title="10+ contributions (Skyscraper)" />
              <span className="text-[10px] text-[#39d353] font-bold">Max</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
