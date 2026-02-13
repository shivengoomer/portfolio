
"use client";

import React, { useState, useRef, useEffect } from "react";
import dataJson from "./data.json";

interface Directory {
  [key: string]: Directory | string;
}

/* ---------------- PATH RESOLVER ---------------- */
const resolvePath = (cwd: string[], path: string): string[] => {
  if (path.startsWith("/"))
    return path === "/" ? ["home"] : ["home", ...path.slice(1).split("/")];

  const parts = path.split("/");
  const newPath = [...cwd];

  for (const part of parts) {
    if (part === "..") {
      if (newPath.length > 1) newPath.pop();
    } else if (part === "." || part === "") continue;
    else newPath.push(part);
  }
  return newPath;
};

export const ShivenTerminal: React.FC = () => {
  const [cwd, setCwd] = useState<string[]>(["home"]);
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  /* ---------------- RESPONSIVE CHECK ---------------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---------------- AUTO SCROLL + FOCUS ---------------- */
  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });

    inputRef.current?.focus();
  }, [history]);

  /* ---------------- DARK MODE DETECTION ---------------- */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  /* ---------------- FILE SYSTEM ACCESS ---------------- */
  const getDir = (path: string[]): Directory | string => {
    let dir: Directory | string = dataJson as Directory;

    for (const p of path) {
      if (typeof dir === "object" && dir !== null && p in dir)
        dir = (dir as Directory)[p];
      else return "Invalid path";
    }
    return dir;
  };

  /* ---------------- COMMAND HANDLER ---------------- */
  const handleCommand = (input: string) => {
    const [cmd, ...args] = input.trim().split(" ");
    const dir = getDir(cwd);
    let output = "";

    switch (cmd) {
      case "help":
        output = "Commands: ls, cd <folder>, cat <file>, pwd, clear, help";
        break;

      case "pwd":
        output = "/" + cwd.join("/");
        break;

      case "ls":
        if (typeof dir === "object")
          output = Object.keys(dir).join("  ");
        else output = "Not a directory";
        break;

      case "cd":
        if (!args[0]) {
          output = "Specify directory";
          break;
        }
        const targetPath = resolvePath(cwd, args[0]);
        const targetDir = getDir(targetPath);

        if (typeof targetDir === "object") setCwd(targetPath);
        else output = `No such directory: ${args[0]}`;
        break;

      case "cat":
        if (!args[0]) output = "Specify file";
        else if (
          typeof dir === "object" &&
          dir[args[0]] &&
          typeof dir[args[0]] === "string"
        )
          output = dir[args[0]] as string;
        else output = `No such file: ${args[0]}`;
        break;

      case "clear":
        setHistory([]);
        setCommand("");
        return;

      default:
        if (cmd.trim() !== "")
          output = `Command not found: ${cmd}. Type 'help' for commands.`;
    }

    setHistory((prev) => [...prev, `$ ${input}`, output]);
    setCommand("");
    setHistoryIndex(null);
  };

  /* ---------------- KEYBOARD NAVIGATION ---------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const commands = history
      .filter((h) => h.startsWith("$ "))
      .map((h) => h.slice(2));

    if (e.key === "Enter") {
      handleCommand(command);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commands.length) return;

      const newIndex =
        historyIndex === null ? commands.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setCommand(commands[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;

      const newIndex = Math.min(commands.length - 1, historyIndex + 1);
      setHistoryIndex(newIndex);
      setCommand(commands[newIndex]);
    }
  };

  /* ---------------- COLORS ---------------- */
  const bgColor = isDark ? "#18181b" : "#f5f5f5";
  const textColor = isDark ? "#e5e7eb" : "#111827";
  const borderColor = isDark ? "#27272a" : "#d1d5db";
  const promptColor = isDark ? "#a3a3a3" : "#6b7280";

  return (
    <div
      ref={terminalRef}
      onTouchStart={() => inputRef.current?.focus()}
      onClick={() => inputRef.current?.focus()}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: "Menlo, Monaco, 'Liberation Mono', monospace",

        padding: isMobile ? "0.8rem" : "1.5rem",
        height: isMobile ? "65vh" : "500px",
        maxHeight: "80vh",

        paddingBottom: "env(safe-area-inset-bottom, 12px)",

        borderRadius: isMobile ? "6px" : "12px",
        boxShadow: isMobile
          ? "0 2px 10px rgba(0,0,0,0.15)"
          : "0 6px 40px rgba(0,0,0,0.2)",

        overflowY: "auto",
        overflowX: "hidden",

        display: "flex",
        flexDirection: "column",
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* HISTORY */}
      {history.map((line, i) => (
        <div
          key={i}
          style={{
            marginBottom: "4px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            lineHeight: "1.4",
            fontSize: isMobile ? "0.82rem" : "0.95rem",
          }}
        >
          {line}
        </div>
      ))}

      {/* INPUT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
          position: "sticky",
          bottom: 0,
          background: bgColor,
          paddingTop: "6px",
        }}
      >
        <span
          style={{
            marginRight: "6px",
            color: promptColor,
            whiteSpace: "nowrap",
            fontSize: isMobile ? "0.8rem" : "0.95rem",
          }}
        >
          {cwd.join("/")} $
        </span>

        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          style={{
            background: "transparent",
            border: "none",
            color: textColor,
            outline: "none",
            fontFamily: "inherit",
            fontSize: isMobile ? "0.85rem" : "1rem",
            flexGrow: 1,
            padding: "4px 0",
            minWidth: 0,
            width: "100%",
            caretColor: textColor,
          }}
        />
      </div>
    </div>
  );
};

