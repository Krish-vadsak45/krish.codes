import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { AppId } from "../../types/desktop";

interface WindowFrameProps {
  id: AppId;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, children, headerContent }) => {
  const { 
    windows, 
    activeAppId, 
    closeApp, 
    minimizeApp, 
    toggleMaximizeApp, 
    focusApp, 
    updatePosition,
    updateSizeAndPosition 
  } = useDesktop();
  
  const win = windows[id];
  const [trafficHovered, setTrafficHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resizeRef = useRef<{
    direction: string;
    startX: number;
    startY: number;
    initialWidth: number;
    initialHeight: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
  } | null>(null);

  if (!win) return null;

  const isActive = activeAppId === id;
  const isMinimizing = win.exitType === "minimize";

  // Smooth 120fps Drag Handler with direct pointer tracking (avoids Framer Motion jump/cutting)
  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized || isResizing) return;
    if ((e.target as HTMLElement).closest("button")) return;

    e.preventDefault();
    focusApp(id);
    setIsDragging(true);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: win.position.x,
      initY: win.position.y,
    };

    let pendingDragRaf: number | null = null;
    let latestClientX = e.clientX;
    let latestClientY = e.clientY;

    const handlePointerMove = (moveEv: PointerEvent) => {
      latestClientX = moveEv.clientX;
      latestClientY = moveEv.clientY;

      if (pendingDragRaf === null) {
        pendingDragRaf = requestAnimationFrame(() => {
          pendingDragRaf = null;
          if (!dragRef.current) return;
          const dx = latestClientX - dragRef.current.startX;
          const dy = latestClientY - dragRef.current.startY;
          const newX = Math.max(-win.size.width + 120, Math.min(window.innerWidth - 80, dragRef.current.initX + dx));
          const newY = Math.max(30, Math.min(window.innerHeight - 80, dragRef.current.initY + dy));
          updatePosition(id, { x: newX, y: newY });
        });
      }
    };

    const handlePointerUp = () => {
      if (pendingDragRaf !== null) {
        cancelAnimationFrame(pendingDragRaf);
        pendingDragRaf = null;
      }
      setIsDragging(false);
      dragRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
  };

  // High-performance resize handler with 120fps RAF synchronization
  const handleResizeStart = (
    e: React.PointerEvent,
    direction: "e" | "s" | "se" | "w" | "sw"
  ) => {
    if (win.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    focusApp(id);

    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: win.size.width,
      initialHeight: win.size.height,
      initialX: win.position.x,
      initialY: win.position.y,
    };

    let pendingResizeRaf: number | null = null;
    let latestResizeX = e.clientX;
    let latestResizeY = e.clientY;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      latestResizeX = moveEvent.clientX;
      latestResizeY = moveEvent.clientY;

      if (pendingResizeRaf === null) {
        pendingResizeRaf = requestAnimationFrame(() => {
          pendingResizeRaf = null;
          if (!resizeRef.current) return;
          const { direction, startX, startY, initialWidth, initialHeight, initialX, initialY } =
            resizeRef.current;

          const deltaX = latestResizeX - startX;
          const deltaY = latestResizeY - startY;

          let newWidth = initialWidth;
          let newHeight = initialHeight;
          let newX = initialX;
          let newY = initialY;

          const MIN_WIDTH = 440;
          const MIN_HEIGHT = 280;
          const MAX_WIDTH = window.innerWidth - 16;
          const MAX_HEIGHT = window.innerHeight - 60;

          if (direction.includes("e")) {
            newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, initialWidth + deltaX));
          }
          if (direction.includes("s")) {
            newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, initialHeight + deltaY));
          }
          if (direction.includes("w")) {
            const potentialWidth = initialWidth - deltaX;
            if (potentialWidth >= MIN_WIDTH && potentialWidth <= MAX_WIDTH) {
              newWidth = potentialWidth;
              newX = initialX + deltaX;
            }
          }

          updateSizeAndPosition(
            id,
            { width: newWidth, height: newHeight },
            { x: newX, y: newY }
          );
        });
      }
    };

    const handlePointerUp = () => {
      if (pendingResizeRaf !== null) {
        cancelAnimationFrame(pendingResizeRaf);
        pendingResizeRaf = null;
      }
      setIsResizing(false);
      resizeRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
  };

  const isInteracting = isDragging || isResizing;

  return (
    <motion.div
      // Authentic macOS Window Open Animation with Apple Spring Physics
      initial={
        win.openSource === "desktop"
          ? { opacity: 0, scale: 0.85, y: 15 }
          : { opacity: 0, scale: 0.35, y: 140 }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        left: win.isMaximized ? 8 : win.position.x,
        top: win.isMaximized ? 34 : win.position.y,
        width: win.isMaximized ? "calc(100vw - 16px)" : win.size.width,
        height: win.isMaximized ? "calc(100vh - 110px)" : win.size.height,
        transition: isInteracting
          ? { duration: 0 }
          : {
              scale: { type: "spring", stiffness: 320, damping: 24, mass: 0.8 },
              y: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
              opacity: { duration: 0.16, ease: "easeOut" },
              left: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
              top: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
              width: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
              height: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
            },
      }}
      // Authentic macOS Close (zooms back in space & fades) vs Minimize (swoops down to Dock)
      exit={
        isMinimizing
          ? {
              opacity: 0,
              scaleX: 0.2,
              scaleY: 0.05,
              y: 380,
              transition: { duration: 0.28, ease: [0.32, 0, 0.24, 1] },
            }
          : {
              opacity: 0,
              scale: 0.84,
              y: 0,
              transition: { duration: 0.18, ease: [0.2, 0, 0, 1] },
            }
      }
      style={{
        position: "fixed",
        zIndex: win.zIndex,
        willChange: isInteracting ? "left, top, width, height" : "auto",
        transformOrigin: isMinimizing
          ? "center bottom"
          : win.openSource === "desktop"
          ? "top left"
          : "center center",
      }}
      onMouseDown={() => focusApp(id)}
      className={`flex flex-col rounded-xl overflow-hidden mac-glass mac-specular-sheen select-none transition-shadow duration-150 ${
        isActive
          ? "border-white/30 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/20"
          : "border-white/15 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.65)] opacity-95"
      }`}
    >
      {/* Title Bar - Drag Handle with 3D Specular Light */}
      <div
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={() => toggleMaximizeApp(id)}
        className={`h-10 px-3.5 flex items-center justify-between border-b transition-colors cursor-default select-none relative ${
          isActive 
            ? "bg-gradient-to-b from-white/12 via-neutral-900/80 to-neutral-950/90 border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" 
            : "bg-neutral-900/60 border-white/5"
        }`}
      >
        {/* macOS Traffic Lights with Authentic Inactive Dimming & Hover Glyphs */}
        <div
          className="flex items-center space-x-2 w-16"
          onMouseEnter={() => setTrafficHovered(true)}
          onMouseLeave={() => setTrafficHovered(false)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Close 🔴 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp(id);
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center text-neutral-950 focus:outline-none transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer shadow-sm border ${
              isActive || trafficHovered
                ? "bg-[#ff5f56] border-[#e0443e]"
                : "bg-neutral-600/40 border-neutral-600/50"
            }`}
            title="Close"
          >
            <span className={`text-[8px] font-bold leading-none transition-opacity duration-150 ${trafficHovered ? "opacity-100 text-neutral-900" : "opacity-0"}`}>
              ✕
            </span>
          </button>

          {/* Minimize 🟡 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(id);
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center text-neutral-950 focus:outline-none transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer shadow-sm border ${
              isActive || trafficHovered
                ? "bg-[#ffbd2e] border-[#dea123]"
                : "bg-neutral-600/40 border-neutral-600/50"
            }`}
            title="Minimize"
          >
            <span className={`text-[10px] font-bold leading-none pb-0.5 transition-opacity duration-150 ${trafficHovered ? "opacity-100 text-neutral-900" : "opacity-0"}`}>
              −
            </span>
          </button>

          {/* Maximize / Zoom 🟢 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeApp(id);
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center text-neutral-950 focus:outline-none transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer shadow-sm border ${
              isActive || trafficHovered
                ? "bg-[#27c93f] border-[#1aab29]"
                : "bg-neutral-600/40 border-neutral-600/50"
            }`}
            title="Zoom / Maximize"
          >
            <span className={`text-[7px] font-bold leading-none transition-opacity duration-150 ${trafficHovered ? "opacity-100 text-neutral-900" : "opacity-0"}`}>
              +
            </span>
          </button>
        </div>

        {/* Window Title / Extra Header Content */}
        <div className="flex-1 flex items-center justify-center px-4 overflow-hidden pointer-events-none">
          {headerContent ? (
            headerContent
          ) : (
            <span
              className={`text-xs font-medium truncate transition-colors duration-150 ${
                isActive ? "text-neutral-100 font-semibold" : "text-neutral-400"
              }`}
            >
              {win.title}
            </span>
          )}
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-16"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-neutral-950/85 text-neutral-100 flex flex-col relative">
        {/* Interaction blocker overlay to prevent lag/stutter while moving or resizing */}
        {isInteracting && (
          <div className="absolute inset-0 z-50 pointer-events-auto bg-transparent cursor-grabbing" />
        )}
        {children}
      </div>

      {/* ===== macOS Interactive Resize Edge Handles ===== */}
      {!win.isMaximized && (
        <>
          {/* Right Edge Resize Handle */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "e")}
            className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-40 hover:bg-blue-500/10 active:bg-blue-500/25 transition-colors"
          />

          {/* Bottom Edge Resize Handle */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "s")}
            className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-40 hover:bg-blue-500/10 active:bg-blue-500/25 transition-colors"
          />

          {/* Left Edge Resize Handle */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "w")}
            className="absolute top-0 left-0 w-2 h-full cursor-w-resize z-40 hover:bg-blue-500/10 active:bg-blue-500/25 transition-colors"
          />

          {/* Bottom-Right Corner Resize Grip (Signature macOS Handle) */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "se")}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5 group"
            title="Resize Window"
          >
            <svg
              className="w-2.5 h-2.5 text-neutral-500 group-hover:text-white transition-colors"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <line x1="8" y1="2" x2="2" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="5" x2="5" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Bottom-Left Corner Resize Handle */}
          <div
            onPointerDown={(e) => handleResizeStart(e, "sw")}
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50"
          />
        </>
      )}
    </motion.div>
  );
};
