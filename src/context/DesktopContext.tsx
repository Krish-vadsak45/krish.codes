import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { AppId, WindowState } from "../types/desktop";

interface DesktopContextType {
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  isSpotlightOpen: boolean;
  openApp: (id: AppId, source?: 'dock' | 'desktop') => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId, source?: 'dock' | 'desktop') => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
  updateSize: (id: AppId, size: { width: number; height: number }) => void;
  updateSizeAndPosition: (id: AppId, size: { width: number; height: number }, pos: { x: number; y: number }) => void;
  setIsSpotlightOpen: (open: boolean) => void;
  toggleSpotlight: () => void;
}

const DEFAULT_WINDOWS: Record<AppId, WindowState> = {
  finder: {
    id: "finder",
    title: "Finder — Projects & Works",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 40, y: 50 },
    size: { width: 860, height: 560 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal — zsh (krish@macbook)",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 140, y: 90 },
    size: { width: 720, height: 460 },
  },
  safari: {
    id: "safari",
    title: "Safari — Project Inspector",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    position: { x: 80, y: 60 },
    size: { width: 900, height: 580 },
  },
  settings: {
    id: "settings",
    title: "System Settings — Tech Stack & Skills",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 100, y: 70 },
    size: { width: 800, height: 520 },
  },
  notes: {
    id: "notes",
    title: "Notes — About Krish",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
    position: { x: 120, y: 80 },
    size: { width: 760, height: 500 },
  },
  mail: {
    id: "mail",
    title: "Mail — Contact Krish",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 16,
    position: { x: 160, y: 100 },
    size: { width: 680, height: 480 },
  },
};

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(DEFAULT_WINDOWS);
  const [activeAppId, setActiveAppId] = useState<AppId | null>("terminal");
  const topZIndexRef = useRef(25);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  // Keyboard shortcut for Spotlight (Cmd+K / Ctrl+K) and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const focusApp = (id: AppId, source?: 'dock' | 'desktop') => {
    topZIndexRef.current += 1;
    const nextZ = topZIndexRef.current;
    setWindows((winMap) => ({
      ...winMap,
      [id]: {
        ...winMap[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        openSource: source || winMap[id]?.openSource || 'dock',
      },
    }));
    setActiveAppId(id);
  };

  const openApp = (id: AppId, source?: 'dock' | 'desktop') => {
    focusApp(id, source);
  };

  const closeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        exitType: 'close',
      },
    }));
    if (activeAppId === id) {
      // Find another open and not minimized app with the highest zIndex
      const otherOpen = Object.values(windows)
        .filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);
      setActiveAppId(otherOpen.length > 0 ? otherOpen[0].id : null);
    }
  };

  const minimizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
        exitType: 'minimize',
      },
    }));
    if (activeAppId === id) {
      const otherOpen = Object.values(windows)
        .filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);
      setActiveAppId(otherOpen.length > 0 ? otherOpen[0].id : null);
    }
  };

  const toggleMaximizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
    focusApp(id);
  };

  const updatePosition = (id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos,
      },
    }));
  };

  const updateSize = (id: AppId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  };

  const updateSizeAndPosition = (
    id: AppId,
    size: { width: number; height: number },
    pos: { x: number; y: number }
  ) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
        position: pos,
      },
    }));
  };

  const toggleSpotlight = () => setIsSpotlightOpen((prev) => !prev);

  return (
    <DesktopContext.Provider
      value={{
        windows,
        activeAppId,
        isSpotlightOpen,
        openApp,
        closeApp,
        minimizeApp,
        toggleMaximizeApp,
        focusApp,
        updatePosition,
        updateSize,
        updateSizeAndPosition,
        setIsSpotlightOpen,
        toggleSpotlight,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used within a DesktopProvider");
  }
  return context;
};
