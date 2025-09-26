"use client";

import React, { useState, useRef, useEffect } from "react";
import dataJson from "./data.json";

interface Directory {
  [key: string]: Directory | string;
}

// Resolve absolute/relative paths
const resolvePath = (cwd: string[], path: string): string[] => {
  if (path.startsWith("/")) return path === "/" ? ["home"] : ["home", ...path.slice(1).split("/")];
  const parts = path.split("/");
  const newPath = [...cwd];
  for (const part of parts) {
    if (part === "..") {
      if (newPath.length > 1) newPath.pop();
    } else if (part === "." || part === "") {
      continue;
    } else {
      newPath.push(part);
    }
  }
  return newPath;
};

export const ShivenTerminal: React.FC = () => {
  const [cwd, setCwd] = useState<string[]>(["home"]);
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input and scroll to bottom
  useEffect(() => {
    inputRef.current?.focus();
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  // Detect Tailwind dark mode
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const getDir = (path: string[]): Directory | string => {
    let dir: Directory | string = dataJson as Directory;
    for (const p of path) {
      if (typeof dir === "object" && dir !== null && p in dir) {
        dir = (dir as Directory)[p];
      } else {
        return "Invalid path";
      }
    }
    return dir;
  };

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
        if (typeof dir === "object") output = Object.keys(dir).join("  ");
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
        else if (typeof dir === "object" && dir[args[0]] && typeof dir[args[0]] === "string")
          output = dir[args[0]] as string;
        else output = `No such file: ${args[0]}`;
        break;
      case "clear":
        setHistory([]);
        setCommand("");
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for commands.`;
    }

    setHistory([...history, `$ ${input}`, output]);
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand(command);
  };

  // Colors based on theme
  const bgColor = isDark ? "#18181b" : "#f5f5f5";
  const textColor = isDark ? "#e5e7eb" : "#111827";
  const borderColor = isDark ? "#27272a" : "#d1d5db";
  const promptColor = isDark ? "#a3a3a3" : "#6b7280";

  return (
    <div
      ref={terminalRef}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "1.5rem",
        fontFamily: "Menlo, Monaco, 'Liberation Mono', monospace",
        minHeight: "400px",
        borderRadius: "10px",
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${borderColor}`,
        transition: "all 0.3s ease",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* History */}
      {history.map((line, i) => (
        <div key={i} style={{ marginBottom: "2px", whiteSpace: "pre-wrap" }}>
          {line}
        </div>
      ))}

      {/* Command Input */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
        <span style={{ marginRight: "0.5rem", color: promptColor }}>
          {cwd.join("/")} $
        </span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: "transparent",
            border: "none",
            color: textColor,
            outline: "none",
            fontFamily: "inherit",
            fontSize: "1rem",
            flexGrow: 1,
            padding: 0,
            transition: "all 0.3s ease",
          }}
        />
      </div>
      <style jsx>{`
        .blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
