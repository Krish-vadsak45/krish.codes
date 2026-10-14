import React, { Suspense, lazy } from "react";

const StarsCanvas = lazy(() => import("../canvas/Stars"));

export const DesktopWallpaper: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* Dynamic macOS Sequoia / Aurora Cosmic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#05060f] via-[#0b0e24] to-[#1a0f2e] opacity-95" />

      {/* Radiant 3D Aurora Mesh & Atmospheric Lighting */}
      <div className="absolute -top-48 -left-48 w-[720px] h-[720px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse will-change-[opacity] transform-gpu" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-48 -right-48 w-[720px] h-[720px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse will-change-[opacity] transform-gpu" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/15 rounded-full blur-[160px] transform-gpu" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px] transform-gpu" />
      <div className="absolute top-2/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-rose-500/10 rounded-full blur-[130px] transform-gpu" />

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
});
