import React, { Suspense, lazy } from "react";

const MacDynamicWallpaperCanvas = lazy(() => import("../canvas/MacDynamicWallpaperCanvas"));

export const DesktopWallpaper: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* High-Performance WebGL macOS Sequoia / Sonoma Dynamic Aurora Shader */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-tr from-[#03050d] via-[#0e0722] to-[#1a0f2e]" />
        }
      >
        <MacDynamicWallpaperCanvas />
      </Suspense>

      {/* Subtle Apple Precision Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
});
