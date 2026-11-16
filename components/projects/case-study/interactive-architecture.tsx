"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Sparkles,
  ShieldAlert,
  FileSearch,
  ScanFace,
  Send,
  GitBranch,
  Cpu,
  Layers,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  ArrowRight,
  Workflow,
  ChevronRight,
  Wifi,
} from "lucide-react";
import {
  SiNextdotjs,
  SiFastapi,
  SiTradingview,
  SiNumpy,
  SiPytest,
  SiExpress,
  SiRedis,
  SiMongodb,
  SiClerk,
  SiWhatsapp,
} from "react-icons/si";

import { ArchNode, ArchEdge } from "@/config/case-study-data";
import { cn } from "@/lib/utils";

// ─── ICON RESOLVER ────────────────────────────────────────────────────────────
function renderTechIcon(iconKey?: string, id?: string, className?: string) {
  const key = (iconKey || id || "").toLowerCase();
  const cls = className || "h-4 w-4";

  if (key.includes("next")) return <SiNextdotjs className={cls} />;
  if (key.includes("fastapi")) return <SiFastapi className={cls} />;
  if (key.includes("tradingview") || key.includes("tv")) return <SiTradingview className={cls} />;
  if (key.includes("numpy") || key.includes("quant")) return <SiNumpy className={cls} />;
  if (key.includes("pytest") || key.includes("qa")) return <SiPytest className={cls} />;
  if (key.includes("express")) return <SiExpress className={cls} />;
  if (key.includes("redis") || key.includes("bullmq") || key.includes("queue"))
    return <SiRedis className={cls} />;
  if (key.includes("mongodb") || key.includes("db")) return <SiMongodb className={cls} />;
  if (key.includes("clerk")) return <SiClerk className={cls} />;
  if (key.includes("whatsapp") || key.includes("wa")) return <SiWhatsapp className={cls} />;
  if (key.includes("groq") || key.includes("llm")) return <Sparkles className={cls} />;
  if (key.includes("websocket") || key.includes("ws")) return <Wifi className={cls} />;
  if (key.includes("phishing") || key.includes("security")) return <ShieldAlert className={cls} />;
  if (key.includes("nlp") || key.includes("faiss")) return <FileSearch className={cls} />;
  if (key.includes("deepfake")) return <ScanFace className={cls} />;
  if (key.includes("resp") || key.includes("verdict")) return <Send className={cls} />;
  if (key.includes("router")) return <GitBranch className={cls} />;
  if (key.includes("data")) return <Database className={cls} />;

  return <Cpu className={cls} />;
}

// ─── CANVAS COORDINATE CONSTANTS ──────────────────────────────────────────────
const VW = 1040;
const VH = 480;
const NODE_W = 196;
const NODE_H = 70;

interface Point {
  x: number;
  y: number;
}

// Computes port coordinates based on relative node positions
function getEdgePorts(fromNode: ArchNode, toNode: ArchNode): {
  source: Point;
  target: Point;
  sourcePort: "right" | "left" | "top" | "bottom";
  targetPort: "right" | "left" | "top" | "bottom";
} {
  const fx = (fromNode.x / 100) * VW;
  const fy = (fromNode.y / 100) * VH;
  const tx = (toNode.x / 100) * VW;
  const ty = (toNode.y / 100) * VH;

  const dx = tx - fx;
  const dy = ty - fy;

  // Primarily horizontal connection
  if (Math.abs(dx) >= Math.abs(dy) * 0.5) {
    if (dx >= 0) {
      return {
        source: { x: fx + NODE_W / 2, y: fy },
        target: { x: tx - NODE_W / 2, y: ty },
        sourcePort: "right",
        targetPort: "left",
      };
    } else {
      return {
        source: { x: fx - NODE_W / 2, y: fy },
        target: { x: tx + NODE_W / 2, y: ty },
        sourcePort: "left",
        targetPort: "right",
      };
    }
  } else {
    // Primarily vertical connection
    if (dy >= 0) {
      return {
        source: { x: fx, y: fy + NODE_H / 2 },
        target: { x: tx, y: ty - NODE_H / 2 },
        sourcePort: "bottom",
        targetPort: "top",
      };
    } else {
      return {
        source: { x: fx, y: fy - NODE_H / 2 },
        target: { x: tx, y: ty + NODE_H / 2 },
        sourcePort: "top",
        targetPort: "bottom",
      };
    }
  }
}

// Generates smooth S-curve cubic Bézier and mid-point for label
function createSmoothCurve(s: Point, t: Point, sPort: string) {
  const dx = t.x - s.x;
  const dy = t.y - s.y;

  let cx1: number, cy1: number, cx2: number, cy2: number;

  if (sPort === "right" || sPort === "left") {
    const curvature = Math.max(Math.abs(dx) * 0.45, 40);
    cx1 = s.x + (dx >= 0 ? curvature : -curvature);
    cy1 = s.y;
    cx2 = t.x - (dx >= 0 ? curvature : -curvature);
    cy2 = t.y;
  } else {
    const curvature = Math.max(Math.abs(dy) * 0.45, 40);
    cx1 = s.x;
    cy1 = s.y + (dy >= 0 ? curvature : -curvature);
    cx2 = t.x;
    cy2 = t.y - (dy >= 0 ? curvature : -curvature);
  }

  const d = `M ${s.x} ${s.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${t.x} ${t.y}`;

  // Cubic Bézier midpoint at t = 0.5
  const mx = 0.125 * s.x + 0.375 * cx1 + 0.375 * cx2 + 0.125 * t.x;
  const my = 0.125 * s.y + 0.375 * cy1 + 0.375 * cy2 + 0.125 * t.y;

  return { d, mx, my };
}

interface InteractiveArchitectureProps {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export default function InteractiveArchitecture({
  nodes,
  edges,
}: InteractiveArchitectureProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeIndex, setHoveredEdgeIndex] = useState<number | null>(null);

  const [zoom, setZoom] = useState(1);
  const [isFlowing, setIsFlowing] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeNode = useMemo(
    () => nodes.find((n) => n.id === activeNodeId) || null,
    [nodes, activeNodeId]
  );

  // Compute set of connected nodes and edges for hover/active focus
  const highlightedContext = useMemo(() => {
    const focusId = hoveredNodeId || activeNodeId;
    if (!focusId) return null;

    const connectedNodeIds = new Set<string>([focusId]);
    const connectedEdgeIndices = new Set<number>();

    edges.forEach((edge, idx) => {
      if (edge.from === focusId || edge.to === focusId) {
        connectedNodeIds.add(edge.from);
        connectedNodeIds.add(edge.to);
        connectedEdgeIndices.add(idx);
      }
    });

    return { connectedNodeIds, connectedEdgeIndices };
  }, [hoveredNodeId, activeNodeId, edges]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  if (!nodes || nodes.length === 0) return null;

  return (
    <section id="architecture" className="py-16 sm:py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              <Workflow className="h-3.5 w-3.5" />
              System Architecture
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-text">
              System Topology &amp; Pipelines
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-text-muted leading-relaxed">
              Click any node to inspect data contracts, I/O boundaries, and engineering responsibilities.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Pipeline
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1">
              <span className="h-1.5 w-4 rounded-full bg-accent" />
              Data Flow
            </span>
          </div>
        </div>

        {/* ── ARCHITECTURE CANVAS ── */}
        <div
          ref={containerRef}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border bg-[#140810] shadow-2xl transition-all duration-300",
            isFullscreen && "fixed inset-0 z-50 rounded-none border-none p-6 bg-[#0E050B]"
          )}
        >
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(242,92,42,0.2) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Ambient Lighting */}
          <div
            className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: "#F25C2A" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "#0891B2" }}
          />

          {/* Canvas Controls Toolbar */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1 rounded-xl border border-border/80 bg-surface/90 p-1.5 shadow-lg backdrop-blur-md">
            <button
              onClick={() => setIsFlowing(!isFlowing)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors",
                isFlowing && "text-accent bg-accent/10"
              )}
              title={isFlowing ? "Pause Data Flow" : "Start Data Flow"}
              aria-label="Toggle flow animation"
            >
              {isFlowing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="h-4 w-px bg-border mx-0.5" />
            <button
              onClick={() => setZoom((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.3))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZoom((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.75))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setActiveNodeId(null);
                setHoveredNodeId(null);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors"
              title="Reset View"
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <div className="h-4 w-px bg-border mx-0.5" />
            <button
              onClick={toggleFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>

          {/* SVG & Node Stage */}
          <div className="relative w-full overflow-x-auto overflow-y-hidden select-none py-6 px-4">
            <div
              className="relative mx-auto transition-transform duration-200 origin-center"
              style={{
                width: `${VW}px`,
                height: `${VH}px`,
                transform: `scale(${zoom})`,
              }}
            >
              {/* ── SVG EDGES LAYER ── */}
              <svg
                viewBox={`0 0 ${VW} ${VH}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <style>{`
                    @keyframes archFlowDash {
                      to {
                        stroke-dashoffset: -50;
                      }
                    }
                    .animate-flow-dash {
                      animation: archFlowDash 1.2s linear infinite;
                    }
                  `}</style>
                  {/* Arrow markers */}
                  {nodes.map((n) => (
                    <marker
                      key={`arrow-${n.id}`}
                      id={`arrow-${n.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={n.color || "#F25C2A"} />
                    </marker>
                  ))}
                  <filter id="glow-edge" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {edges.map((edge, idx) => {
                  const fromNode = nodes.find((n) => n.id === edge.from);
                  const toNode = nodes.find((n) => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const { source, target, sourcePort } = getEdgePorts(fromNode, toNode);
                  const { d, mx, my } = createSmoothCurve(source, target, sourcePort);

                  const isHighlighted =
                    highlightedContext === null ||
                    highlightedContext.connectedEdgeIndices.has(idx) ||
                    hoveredEdgeIndex === idx;

                  const strokeColor = fromNode.color || "#F25C2A";

                  return (
                    <g
                      key={`${edge.from}-${edge.to}-${idx}`}
                      className="transition-opacity duration-200"
                      style={{ opacity: isHighlighted ? 1 : 0.15 }}
                    >
                      {/* Transparent wide path for hover interaction */}
                      <path
                        d={d}
                        fill="none"
                        stroke="transparent"
                        strokeWidth={24}
                        className="pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredEdgeIndex(idx)}
                        onMouseLeave={() => setHoveredEdgeIndex(null)}
                      />

                      {/* Main connection line */}
                      <path
                        id={`architecture-edge-${idx}`}
                        d={d}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={isHighlighted && (hoveredNodeId || activeNodeId) ? 2 : 1.5}
                        strokeDasharray="6 5"
                        strokeOpacity={isHighlighted ? 0.75 : 0.3}
                        markerEnd={`url(#arrow-${toNode.id})`}
                      />

                      {/* Animated fluid pulse along connection */}
                      {isFlowing && isHighlighted && (
                        <>
                          <path
                            d={d}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={2}
                            strokeDasharray="10 40"
                            strokeDashoffset={idx * 15}
                            className="animate-flow-dash"
                            filter="url(#glow-edge)"
                          />
                          {/* Visible packets travel source → target, making the data direction explicit. */}
                          {[0, 1].map((packet) => (
                            <circle
                              key={packet}
                              r={4}
                              fill={strokeColor}
                              filter="url(#glow-edge)"
                              className="pointer-events-none"
                            >
                              <animateMotion
                                dur={`${2.6 + (idx % 3) * 0.35}s`}
                                begin={`${packet * 1.3 + (idx % 4) * 0.18}s`}
                                repeatCount="indefinite"
                              >
                                <mpath href={`#architecture-edge-${idx}`} />
                              </animateMotion>
                            </circle>
                          ))}
                        </>
                      )}

                      {/* Connection Label Pill */}
                      {edge.label && (
                        <foreignObject
                          x={mx - 55}
                          y={my - 13}
                          width={110}
                          height={26}
                          className="pointer-events-auto overflow-visible"
                        >
                          <div
                            onMouseEnter={() => setHoveredEdgeIndex(idx)}
                            onMouseLeave={() => setHoveredEdgeIndex(null)}
                            className={cn(
                              "mx-auto flex w-max items-center justify-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wide transition-all duration-200 shadow-sm cursor-pointer",
                              hoveredEdgeIndex === idx
                                ? "bg-accent text-white scale-105 border border-accent shadow-[0_0_12px_rgba(242,92,42,0.4)]"
                                : "border border-border/80 bg-surface/90 text-text-muted backdrop-blur-md hover:border-accent/50 hover:text-text"
                            )}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: strokeColor }}
                            />
                            <span>{edge.label}</span>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* ── HTML NODES LAYER ── */}
              {nodes.map((node) => {
                const cx = (node.x / 100) * VW;
                const cy = (node.y / 100) * VH;
                const nodeLeft = cx - NODE_W / 2;
                const nodeTop = cy - NODE_H / 2;

                const isSelected = activeNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;

                const isConnected =
                  highlightedContext === null ||
                  highlightedContext.connectedNodeIds.has(node.id);

                const nodeColor = node.color || "#F25C2A";

                return (
                  <div
                    key={node.id}
                    className="absolute cursor-pointer select-none transition-transform duration-180"
                    style={{
                      left: `${nodeLeft}px`,
                      top: `${nodeTop}px`,
                      width: `${NODE_W}px`,
                      height: `${NODE_H}px`,
                      zIndex: isSelected ? 30 : isHovered ? 25 : 10,
                      opacity: isConnected ? 1 : 0.2,
                      transform: isSelected ? "scale(1.04)" : isHovered ? "scale(1.02)" : "scale(1)",
                    }}
                    onClick={() => setActiveNodeId(isSelected ? null : node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.label} node: ${node.tech}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveNodeId(isSelected ? null : node.id);
                      }
                    }}
                  >
                    {/* Node Card Shell */}
                    <div
                      className={cn(
                        "relative flex h-full w-full flex-col justify-between rounded-xl border p-2.5 backdrop-blur-md transition-all duration-200",
                        isSelected
                          ? "bg-[#1F0E18] shadow-xl"
                          : "bg-[#180B13]/90 hover:bg-[#200F1A] shadow-md"
                      )}
                      style={{
                        borderColor: isSelected
                          ? nodeColor
                          : isHovered
                          ? `${nodeColor}80`
                          : "rgba(255,255,255,0.08)",
                        boxShadow: isSelected
                          ? `0 0 20px ${nodeColor}25, 0 8px 24px rgba(0,0,0,0.6)`
                          : undefined,
                      }}
                    >
                      {/* Top Bar: Category + Status Dot */}
                      <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                        <span
                          className="font-semibold uppercase tracking-wider truncate max-w-[125px]"
                          style={{ color: nodeColor }}
                        >
                          {node.category || "SERVICE"}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] text-text-muted">
                          <span
                            className="h-1.5 w-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: nodeColor }}
                          />
                          <span className="text-[8px] uppercase">LIVE</span>
                        </div>
                      </div>

                      {/* Main Info: Tech Icon + Title & Tech Subtitle */}
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Icon Container */}
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200"
                          style={{
                            backgroundColor: `${nodeColor}14`,
                            borderColor: `${nodeColor}30`,
                            color: nodeColor,
                          }}
                        >
                          {renderTechIcon(node.iconKey, node.id, "h-4 w-4")}
                        </div>

                        {/* Title & Tech */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-tight text-text truncate">
                            {node.label}
                          </h4>
                          <p className="font-mono text-[10px] text-text-muted truncate">
                            {node.tech}
                          </p>
                        </div>
                      </div>

                      {/* Left Port Handle */}
                      <div
                        className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-bg"
                        style={{ backgroundColor: nodeColor }}
                      />

                      {/* Right Port Handle */}
                      <div
                        className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border border-bg"
                        style={{ backgroundColor: nodeColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connection Hover Tooltip */}
          <AnimatePresence>
            {hoveredEdgeIndex !== null && edges[hoveredEdgeIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-4 left-4 z-30 flex items-center gap-3 rounded-xl border border-border/80 bg-surface/95 px-4 py-2 font-mono text-xs shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-1.5 text-text">
                  <span className="font-semibold text-accent">
                    {nodes.find((n) => n.id === edges[hoveredEdgeIndex].from)?.label}
                  </span>
                  <ArrowRight className="h-3 w-3 text-text-muted" />
                  <span className="font-semibold text-text">
                    {nodes.find((n) => n.id === edges[hoveredEdgeIndex].to)?.label}
                  </span>
                </div>
                {edges[hoveredEdgeIndex].protocol && (
                  <>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-text-muted">
                      {edges[hoveredEdgeIndex].protocol}
                    </span>
                  </>
                )}
                {edges[hoveredEdgeIndex].payload && (
                  <>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-[11px] text-accent/80">
                      {edges[hoveredEdgeIndex].payload}
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Node Inspector Side Drawer */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-x-3 top-3 bottom-3 z-40 w-auto max-w-none overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:top-0 sm:right-0 sm:bottom-0 sm:h-full sm:w-full sm:max-w-md sm:rounded-none sm:border-y-0 sm:border-r-0 sm:border-l"
              >
                <button
                  onClick={() => setActiveNodeId(null)}
                  className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-muted hover:text-text transition-colors"
                  aria-label="Close inspector"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="h-full overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] p-5 sm:p-6">
                  <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${activeNode.color || "#F25C2A"}20`,
                          color: activeNode.color || "#F25C2A",
                        }}
                      >
                        {activeNode.category || "SERVICE"}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Operational
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          backgroundColor: `${activeNode.color || "#F25C2A"}15`,
                          borderColor: `${activeNode.color || "#F25C2A"}40`,
                          color: activeNode.color || "#F25C2A",
                        }}
                      >
                        {renderTechIcon(activeNode.iconKey, activeNode.id, "h-5 w-5")}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-text">
                          {activeNode.label}
                        </h3>
                        <p className="font-mono text-xs text-text-muted">{activeNode.tech}</p>
                      </div>
                    </div>
                  </div>

                  {activeNode.role && (
                    <div className="rounded-xl border border-border bg-surface-2/60 p-3.5 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        Primary Responsibility
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-text leading-snug">
                        {activeNode.role}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Implementation Details
                    </span>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {activeNode.detail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {activeNode.inputs && activeNode.inputs.length > 0 && (
                      <div className="rounded-xl border border-border bg-surface-2/40 p-3 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          Ingests
                        </span>
                        <ul className="space-y-1 text-xs text-text-muted font-mono">
                          {activeNode.inputs.map((inp, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-text-muted/60">↳</span>
                              <span className="truncate">{inp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeNode.outputs && activeNode.outputs.length > 0 && (
                      <div className="rounded-xl border border-border bg-surface-2/40 p-3 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-emerald-400" />
                          Outputs
                        </span>
                        <ul className="space-y-1 text-xs text-text-muted font-mono">
                          {activeNode.outputs.map((out, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-text-muted/60">↳</span>
                              <span className="truncate">{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Connected Nodes Navigation */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Connected Topology
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edges
                        .filter((e) => e.from === activeNode.id || e.to === activeNode.id)
                        .map((e, idx) => {
                          const otherId = e.from === activeNode.id ? e.to : e.from;
                          const otherNode = nodes.find((n) => n.id === otherId);
                          if (!otherNode) return null;
                          const isOutgoing = e.from === activeNode.id;

                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveNodeId(otherNode.id)}
                              className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2/80 px-2.5 py-1 text-xs font-mono text-text hover:border-accent/50 hover:bg-surface-2 transition-all"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: otherNode.color || "#F25C2A" }}
                              />
                              <span className="text-[11px]">{otherNode.label}</span>
                              <span className="text-[10px] text-text-muted">
                                ({isOutgoing ? "out" : "in"})
                              </span>
                              <ChevronRight className="h-3 w-3 text-text-muted group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Chips Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted mr-1">
              Filter Node:
            </span>
            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveNodeId(activeNodeId === n.id ? null : n.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-all duration-180",
                  activeNodeId === n.id
                    ? "border-accent bg-accent/15 text-accent shadow-sm"
                    : "border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text"
                )}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: n.color || "#F25C2A" }}
                />
                {n.label}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] text-text-muted hidden sm:inline">
            Click any node or connection to inspect details
          </span>
        </div>
      </div>
    </section>
  );
}
