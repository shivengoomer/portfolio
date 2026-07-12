"use client";

import React, { useEffect, useState } from "react";
import { PremiumLoader } from "./premium-loader";

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if the user has already loaded the intro in this tab session
    const hasLoaded = sessionStorage.getItem("has-loaded-intro");
    if (hasLoaded === "true") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Toggle body scroll lock to prevent scrolling while the intro is active
    if (loading && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, mounted]);

  const handleComplete = () => {
    setLoading(false);
    sessionStorage.setItem("has-loaded-intro", "true");
  };

  return (
    <>
      {/* Support progressive enhancement / noscript fallback */}
      <noscript>
        <style dangerouslySetInnerHTML={{
          __html: `
            #premium-loader-container { display: none !important; }
            #main-content-wrapper { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }
          `
        }} />
      </noscript>

      {/* Render the Premium Loader if loading state is active */}
      {loading && mounted && (
        <div id="premium-loader-container">
          <PremiumLoader onComplete={handleComplete} />
        </div>
      )}

      {/* 
        Main content wrapper.
        Animates opacity and scales up slightly once the loader completes, 
        providing a premium staggered depth feel.
      */}
      <div
        id="main-content-wrapper"
        className="transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
        style={{
          opacity: mounted && loading ? 0 : 1,
          transform: mounted && loading ? "scale(0.98) translateY(12px)" : "scale(1) translateY(0)",
          pointerEvents: mounted && loading ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
