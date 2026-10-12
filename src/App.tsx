import React from "react";
import { DesktopProvider } from "./context/DesktopContext";
import { DesktopWallpaper } from "./components/desktop/DesktopWallpaper";
import { TopBar } from "./components/desktop/TopBar";
import { DesktopGrid } from "./components/desktop/DesktopGrid";
import { WindowManager } from "./components/desktop/WindowManager";
import { Dock } from "./components/desktop/Dock";

const App: React.FC = () => {
  return (
    <DesktopProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-neutral-950 font-sans select-none text-white">
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
      </main>
    </DesktopProvider>
  );
};

export default App;
