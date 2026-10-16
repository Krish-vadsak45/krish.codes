import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  viewMode: 'cinematic' | 'desktop';
  setViewMode: (mode: 'cinematic' | 'desktop') => void;
  toggleViewMode: () => void;
}

const isMobileClient = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

const getInitialWindows = (): Record<AppId, WindowState> => ({
  finder: {
    id: "finder",
    title: "Finder — Projects & Works",
    isOpen: true,
    isMinimized: false,
    isMaximized: isMobileClient,
    zIndex: isMobileClient ? 20 : 10,
    position: isMobileClient ? { x: 6, y: 34 } : { x: 40, y: 50 },
    size: isMobileClient ? { width: 360, height: 500 } : { width: 860, height: 560 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal — zsh (krish@macbook)",
    isOpen: !isMobileClient,
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
    isMaximized: isMobileClient,
    zIndex: 15,
    position: { x: 80, y: 60 },
    size: { width: 900, height: 580 },
  },
  settings: {
    id: "settings",
    title: "System Settings — Tech Stack & Skills",
    isOpen: false,
    isMinimized: false,
    isMaximized: isMobileClient,
    zIndex: 12,
    position: { x: 100, y: 70 },
    size: { width: 800, height: 520 },
  },
  notes: {
    id: "notes",
    title: "Notes — About Krish",
    isOpen: false,
    isMinimized: false,
    isMaximized: isMobileClient,
    zIndex: 14,
    position: { x: 120, y: 80 },
    size: { width: 760, height: 500 },
  },
  mail: {
    id: "mail",
    title: "Mail — Contact Krish",
    isOpen: false,
    isMinimized: false,
    isMaximized: isMobileClient,
    zIndex: 16,
    position: { x: 160, y: 100 },
    size: { width: 680, height: 480 },
  },
});

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(getInitialWindows);
  const [activeAppId, setActiveAppId] = useState<AppId | null>(isMobileClient ? "finder" : "terminal");
  const topZIndexRef = useRef(25);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cinematic' | 'desktop'>('cinematic');

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'cinematic' ? 'desktop' : 'cinematic'));
  }, []);

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

  const focusApp = useCallback((id: AppId, source?: 'dock' | 'desktop') => {
    topZIndexRef.current = Math.min(450, topZIndexRef.current + 1);
    const nextZ = topZIndexRef.current;
    setWindows((winMap) => {
      const current = winMap[id];
      if (current && current.isOpen && !current.isMinimized && current.zIndex === nextZ) {
        return winMap;
      }
      return {
        ...winMap,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          openSource: source || current?.openSource || 'dock',
        },
      };
    });
    setActiveAppId(id);
  }, []);

  const openApp = useCallback((id: AppId, source?: 'dock' | 'desktop') => {
    focusApp(id, source);
  }, [focusApp]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const current = prev[id];
      if (current && !current.isOpen && !current.isMinimized && current.exitType === 'close') {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: false,
          isMinimized: false,
          exitType: 'close',
        },
      };
    });
    setActiveAppId((currActive) => {
      if (currActive === id) {
        return null;
      }
      return currActive;
    });
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const current = prev[id];
      if (current && current.isMinimized && current.exitType === 'minimize') {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          isMinimized: true,
          exitType: 'minimize',
        },
      };
    });
    setActiveAppId((currActive) => {
      if (currActive === id) {
        return null;
      }
      return currActive;
    });
  }, []);

  const toggleMaximizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
    focusApp(id);
  }, [focusApp]);

  const updatePosition = useCallback((id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => {
      const current = prev[id];
      if (current && current.position.x === pos.x && current.position.y === pos.y) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          position: pos,
        },
      };
    });
  }, []);

  const updateSize = useCallback((id: AppId, size: { width: number; height: number }) => {
    setWindows((prev) => {
      const current = prev[id];
      if (current && current.size.width === size.width && current.size.height === size.height) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          size,
        },
      };
    });
  }, []);

  const updateSizeAndPosition = useCallback((
    id: AppId,
    size: { width: number; height: number },
    pos: { x: number; y: number }
  ) => {
    setWindows((prev) => {
      const current = prev[id];
      if (
        current &&
        current.size.width === size.width &&
        current.size.height === size.height &&
        current.position.x === pos.x &&
        current.position.y === pos.y
      ) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          size,
          position: pos,
        },
      };
    });
  }, []);

  const toggleSpotlight = useCallback(() => setIsSpotlightOpen((prev) => !prev), []);

  const contextValue = useMemo(() => ({
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
    viewMode,
    setViewMode,
    toggleViewMode,
  }), [
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
    toggleSpotlight,
    viewMode,
    toggleViewMode,
  ]);

  return (
    <DesktopContext.Provider value={contextValue}>
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
