import React, { Suspense, lazy } from "react";

const StarsCanvas = lazy(() => import("../canvas/Stars"));

export const DesktopWallpaper: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* Dynamic macOS Sequoia / Aurora Cosmic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#05060f] via-[#0b0e24] to-[#1a0f2e] opacity-95" />

      {/* Radiant Glow Mesh */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />

      {/* 3D Stars Canvas */}
      <div className="absolute inset-0 pointer-events-auto opacity-75">
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>

      {/* Subtle Grid Overlay for precision tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};
