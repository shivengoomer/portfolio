"use client";

import React, { useState } from "react";
import { PremiumLoader } from "@/components/common/premium-loader";

export default function TestPage() {
  const [loaderKey, setLoaderKey] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  const handleComplete = () => {
    setCompleteCount((prev) => prev + 1);
    // Restart the loader animation after a short delay to create a loop
    setTimeout(() => {
      setLoaderKey((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030303] overflow-hidden flex items-center justify-center">
      
      {/* Loop indicator overlay */}
      <div className="absolute top-4 left-4 z-[100000] font-mono text-[10px] sm:text-[11px] text-zinc-500 bg-zinc-900/80 px-3.5 py-2 border border-zinc-800/80 rounded-full flex items-center gap-2 select-none backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        <span>LOADER LOOP MODE // COMPLETED RUNS: {completeCount}</span>
      </div>

      {/* Render loader with dynamic key to force remount on complete */}
      <PremiumLoader key={loaderKey} onComplete={handleComplete} />
      
    </div>
  );
}
