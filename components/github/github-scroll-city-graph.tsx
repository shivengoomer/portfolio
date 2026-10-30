"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  weekday: number;
  contributionCount: number;
};
type ContributionWeek = { contributionDays: ContributionDay[] };
type GitHubData = { totalContributions: number; weeks: ContributionWeek[] };

export function GitHubScrollCityGraph({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const [data, setData]         = useState<GitHubData | null>(null);
  const [isDark, setIsDark]     = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const [total, setTotal]       = useState(0);

  /* ── theme observer ─────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── scroll progress ────────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center 40%"],
  });
  const scrollRef = useRef({ progress: 0 });
  useEffect(() => {
    return scrollYProgress.on("change", (v) => { scrollRef.current.progress = Math.max(0, Math.min(1, v)); });
  }, [scrollYProgress]);

  /* ── data fetch ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let alive = true;
    fetch("/api/github/contributions?username=shivengoomer&year=2026")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (alive && j) { setData(j); setTotal(j.totalContributions ?? 0); } })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  /* ── Three.js ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const weeks   = data?.weeks ?? [];
    const nWeeks  = weeks.length || 53;
    const nDays   = 7;
    const total_c = nWeeks * nDays;

    /* grid metrics */
    const CW = 1.0, CD = 1.0, GX = 0.16, GZ = 0.16;
    const SX = CW + GX, SZ = CD + GZ;
    const gridW = nWeeks * SX;
    const gridD = nDays  * SZ;

    /* ── renderer ────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    /* ── scene ───────────────────────────────────────────────────── */
    const scene = new THREE.Scene();

    /* ── orthographic camera ─────────────────────────────────────── */
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000);
    camera.up.set(0, 1, 0);

    /* ── lighting ────────────────────────────────────────────────── */
    // Warm ambient
    scene.add(new THREE.AmbientLight(isDark ? 0x1a0d10 : 0xfff8f0, isDark ? 2.0 : 1.8));

    // Key: front-top, slightly warm
    const key = new THREE.DirectionalLight(isDark ? 0xffffff : 0xfffde8, isDark ? 2.8 : 2.4);
    key.position.set(0, 60, 90);
    scene.add(key);

    // Green rim from left — gives the "city glow" feel
    const rimL = new THREE.DirectionalLight(0x39d353, isDark ? 0.9 : 0.4);
    rimL.position.set(-50, 30, 20);
    scene.add(rimL);

    // Subtle rim from right — keeps right side from going pure black
    const rimR = new THREE.DirectionalLight(0x26a641, isDark ? 0.45 : 0.2);
    rimR.position.set(50, 20, 10);
    scene.add(rimR);

    // Bottom bounce — lifts shadow floor
    const bounce = new THREE.DirectionalLight(0x006d32, isDark ? 0.3 : 0.15);
    bounce.position.set(0, -20, 30);
    scene.add(bounce);

    /* ── ground plane ────────────────────────────────────────────── */
    // Subtle grid-lined ground to anchor the city
    const groundGeo = new THREE.PlaneGeometry(gridW * 1.3, gridD * 2.2);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0d0d10 : 0xe8e2d0,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: isDark ? 0.82 : 0.55,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.01;
    scene.add(ground);

    // Grid lines on top of ground
    const gridHelper = new THREE.GridHelper(
      gridW * 1.3,
      Math.round(nWeeks * 1.3),
      isDark ? 0x1a2a1a : 0xc8c0a8,
      isDark ? 0x142014 : 0xd4ccb4,
    );
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = isDark ? 0.35 : 0.3;
    scene.add(gridHelper);

    /* ── building geometry ───────────────────────────────────────── */
    const geo = new THREE.BoxGeometry(CW, 1, CD);
    geo.translate(0, 0.5, 0); // pivot at base

    const mat = new THREE.MeshStandardMaterial({ roughness: 0.30, metalness: 0.12 });
    const mesh = new THREE.InstancedMesh(geo, mat, total_c);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    /* ── colours ─────────────────────────────────────────────────── */
    const C = isDark
      ? {
          empty: new THREE.Color("#0d1117"),
          l1   : new THREE.Color("#0e4429"),
          l2   : new THREE.Color("#006d32"),
          l3   : new THREE.Color("#26a641"),
          l4   : new THREE.Color("#39d353"),
        }
      : {
          empty: new THREE.Color("#ccc7b4"),
          l1   : new THREE.Color("#9be9a8"),
          l2   : new THREE.Color("#40c463"),
          l3   : new THREE.Color("#26a641"),
          l4   : new THREE.Color("#196127"),
        };

    /* ── cube metadata ───────────────────────────────────────────── */
    type Cube = { date: string; count: number; targetH: number; posX: number; posZ: number; color: THREE.Color };
    const cubes: Cube[] = [];
    const dummy = new THREE.Object3D();
    const originX = -(gridW / 2) + SX / 2;
    const originZ = -(gridD / 2) + SZ / 2;

    let idx = 0;
    for (let w = 0; w < nWeeks; w++) {
      const days = weeks[w]?.contributionDays ?? [];
      for (let d = 0; d < nDays; d++) {
        const day   = days.find((x) => x.weekday === d);
        const count = day?.contributionCount ?? 0;
        const date  = day?.date ?? "2026-01-01";

        const posX = originX + w * SX;
        const posZ = originZ + d * SZ;

        let targetH = 0.06;
        let color   = C.empty;

        if (count > 0) {
          if      (count <= 2)  { targetH = 2.0;  color = C.l1; }
          else if (count <= 5)  { targetH = 4.5;  color = C.l2; }
          else if (count <= 9)  { targetH = 8.5;  color = C.l3; }
          else                  { targetH = 13.0 + Math.min(count - 10, 10) * 0.55; color = C.l4; }
        }

        mesh.setColorAt(idx, color);
        cubes.push({ date, count, targetH, posX, posZ, color });
        idx++;
      }
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    /* ── resize / frustum ────────────────────────────────────────── */
    let cW = 0, cH = 0;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      cW = rect.width;
      cH = Math.max(320, Math.min(460, cW * 0.40));
      renderer.setSize(cW, cH, false);

      const aspect = cW / cH;
      const halfW  = (gridW / 2) * 1.08;
      const halfH  = halfW / aspect;
      camera.left   = -halfW;
      camera.right  =  halfW;
      camera.top    =  halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── render loop ─────────────────────────────────────────────── */
    const DIST     = 130;
    const DEG_2D   = 90;  // top-down  → flat heatmap
    const DEG_3D   = 30;  // elevation → city view

    let curP = 0, animId: number;

    const render = () => {
      const targetP = scrollRef.current.progress;
      curP += (targetP - curP) * 0.065;
      const p = Math.max(0, Math.min(1, curP));

      // Camera tilt
      const elevDeg = THREE.MathUtils.lerp(DEG_2D, DEG_3D, p);
      const elevRad = (elevDeg * Math.PI) / 180;

      camera.position.set(
        0,
        DIST * Math.sin(elevRad),
        DIST * Math.cos(elevRad),
      );

      // Look slightly upward when tilted so skyline is centered
      camera.lookAt(0, THREE.MathUtils.lerp(0, 5, p), 0);
      camera.up.set(0, 1, 0);

      // Ground & grid fade in with progress
      groundMat.opacity = isDark
        ? THREE.MathUtils.lerp(0, 0.82, p)
        : THREE.MathUtils.lerp(0, 0.55, p);
      (gridHelper.material as THREE.Material).opacity = isDark
        ? THREE.MathUtils.lerp(0, 0.35, p)
        : THREE.MathUtils.lerp(0, 0.3, p);

      // Extrude buildings
      let i = 0;
      for (const c of cubes) {
        const h = THREE.MathUtils.lerp(0.06, c.targetH, p);
        dummy.position.set(c.posX, 0, c.posZ);
        dummy.scale.set(1, h, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i++, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };
    render();

    /* ── hover tooltip ───────────────────────────────────────────── */
    const raycaster  = new THREE.Raycaster();
    const mouse      = new THREE.Vector2(-9999, -9999);
    let lastId: number | null = null;
    const hi         = new THREE.Color("#a3e635");

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  *  2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) *  2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(mesh);
      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        const id = hits[0].instanceId;
        if (id !== lastId) {
          if (lastId !== null && cubes[lastId]) mesh.setColorAt(lastId, cubes[lastId].color);
          mesh.setColorAt(id, hi);
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          lastId = id;
        }
        const c = cubes[id];
        if (c) setHoverInfo({ date: c.date, count: c.count, x: e.clientX - rect.left, y: e.clientY - rect.top - 16 });
      } else {
        if (lastId !== null && cubes[lastId]) {
          mesh.setColorAt(lastId, cubes[lastId].color);
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          lastId = null;
        }
        setHoverInfo(null);
      }
    };

    const onLeave = () => {
      if (lastId !== null && cubes[lastId]) {
        mesh.setColorAt(lastId, cubes[lastId].color);
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        lastId = null;
      }
      setHoverInfo(null);
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(animId);
      geo.dispose(); mat.dispose();
      groundGeo.dispose(); groundMat.dispose();
      renderer.dispose();
    };
  }, [data, isDark]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full select-none", className)}
    >
      {/* ── card wrapper with subtle bg ────────────────────────────── */}
      <div className="rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-sm overflow-hidden shadow-sm dark:shadow-[0_0_40px_-12px_rgba(57,211,83,0.15)]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Icons.gitHub className="h-4 w-4 text-[#26a641]" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              GitHub Contributions
            </span>
            {total > 0 && (
              <span className="rounded-full border border-[#26a641]/30 bg-[#26a641]/10 px-2 py-0.5 text-[10px] font-semibold text-[#26a641]">
                {total.toLocaleString()} this year
              </span>
            )}
          </div>
          <Link
            href="https://github.com/shivengoomer"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-text-muted hover:text-[#26a641] transition-colors"
          >
            @shivengoomer ↗
          </Link>
        </div>

        {/* Canvas */}
        <div className="relative w-full cursor-crosshair">
          {/* Vignette overlay — top and bottom fade into the card bg */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6"
            style={{ background: "linear-gradient(to bottom, var(--surface), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10"
            style={{ background: "linear-gradient(to top, var(--surface), transparent)" }}
          />

          <canvas ref={canvasRef} className="w-full block" />

          {hoverInfo && (
            <div
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-border/80 bg-surface/95 px-3 py-1.5 text-xs text-text shadow-xl backdrop-blur-md"
              style={{
                left: `${Math.max(48, Math.min(hoverInfo.x, (canvasRef.current?.clientWidth ?? 800) - 52))}px`,
                top : `${Math.max(14, hoverInfo.y)}px`,
              }}
            >
              <p className="font-semibold">
                {hoverInfo.count}{" "}
                <span className="font-normal text-text-muted">
                  {hoverInfo.count === 1 ? "contribution" : "contributions"}
                </span>
              </p>
              <p className="text-[10px] text-text-muted">{hoverInfo.date}</p>
            </div>
          )}
        </div>

        {/* Footer / legend */}
        <div className="flex items-center justify-end gap-1.5 px-4 pb-3 text-[11px] text-text-muted">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-sm border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#40c463] dark:bg-[#006d32]" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#26a641]" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#196127] dark:bg-[#39d353]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
