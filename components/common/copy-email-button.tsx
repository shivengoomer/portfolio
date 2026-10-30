"use client";

import { useState } from "react";
import { Icons } from "@/components/common/icons";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex w-full items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-left text-sm transition-all duration-200 hover:bg-surface-2/80 hover:border-accent/30"
      aria-label="Copy email address"
    >
      <span className="font-mono text-sm font-medium text-text">
        {email}
      </span>
      <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-lg bg-border text-text-muted transition-all group-hover:bg-accent/10 group-hover:text-accent">
        {copied ? (
          <Icons.check className="h-3.5 w-3.5 text-success" />
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}
