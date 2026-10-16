import React from "react";
import { DesktopProvider, useDesktop } from "./context/DesktopContext";
import { DesktopWallpaper } from "./components/desktop/DesktopWallpaper";
import { TopBar } from "./components/desktop/TopBar";
import { DesktopGrid } from "./components/desktop/DesktopGrid";
import { WindowManager } from "./components/desktop/WindowManager";
import { Dock } from "./components/desktop/Dock";
import { CinematicHero } from "./components/hero/CinematicHero";
import { motion, AnimatePresence } from "framer-motion";

const DesktopContent: React.FC = () => {
  const { viewMode, setViewMode, openApp } = useDesktop();

  return (
    <main
      className={`relative w-full ${
        viewMode === "cinematic"
          ? "min-h-screen overflow-x-hidden overflow-y-auto"
          : "h-[100dvh] min-h-[100dvh] overflow-hidden select-none"
      } bg-[#050505] font-sans text-white`}
    >
      <AnimatePresence mode="wait">
        {viewMode === "cinematic" ? (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            <CinematicHero
              onSwitchToDesktop={() => setViewMode("desktop")}
              onOpenContact={() => {
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  setViewMode("desktop");
                  openApp("mail");
                }
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            {/* 3D Background Wallpaper & Atmospheric Lighting */}
            <DesktopWallpaper />

            {/* Top macOS Menu Bar */}
            <TopBar />

            {/* Desktop Shortcut Icons */}
            <DesktopGrid />

            {/* Active Application Windows & Modals */}
            <WindowManager />

            {/* macOS Bottom Dock with Framer Motion Magnification */}
            <Dock />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <DesktopProvider>
      <DesktopContent />
    </DesktopProvider>
  );
};

export default App;
