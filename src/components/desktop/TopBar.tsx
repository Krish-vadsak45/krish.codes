import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { AppId } from "../../types/desktop";
import { certificates } from "../../constants";
import { 
  Search, 
  Wifi, 
  Battery, 
  SlidersHorizontal, 
  Code2, 
  Download, 
  RefreshCw, 
  Lock, 
  FolderKanban,
  Terminal,
  Compass,
  FileText,
  Mail,
  Minimize2,
  Maximize2,
  XSquare,
  Sparkles,
  Award
} from "lucide-react";

const APP_DISPLAY_NAMES: Record<AppId, string> = {
  finder: "Finder",
  terminal: "Terminal",
  safari: "Safari",
  settings: "System Settings",
  notes: "Notes",
  mail: "Mail",
};

export const TopBar: React.FC = React.memo(() => {
  const { 
    activeAppId, 
    openApp, 
    closeApp, 
    minimizeApp, 
    toggleMaximizeApp, 
    toggleSpotlight 
  } = useDesktop();
  
  const [timeStr, setTimeStr] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<"apple" | "file" | "terminal" | "window" | "help" | null>(null);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  // Live real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTimeStr(now.toLocaleDateString("en-US", options).replace(",", ""));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".topbar-menu-container")) {
        setActiveMenu(null);
      }
      if (!target.closest("#control-center-trigger") && !target.closest("#control-center-dropdown")) {
        setControlCenterOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleMenuClick = (menu: "apple" | "file" | "terminal" | "window" | "help") => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleMenuHover = (menu: "apple" | "file" | "terminal" | "window" | "help") => {
    if (activeMenu !== null) {
      setActiveMenu(menu);
    }
  };

  const activeAppName = activeAppId ? APP_DISPLAY_NAMES[activeAppId] : "Krish OS";

  return (
    <header className="fixed top-0 left-0 right-0 h-7 z-[9999] bg-black/55 backdrop-blur-2xl border-b border-white/10 text-white text-xs select-none flex items-center justify-between px-3">
      {/* Left Menu Items */}
      <div className="flex items-center space-x-2 topbar-menu-container">
        {/* Apple Logo Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("apple")}
            onMouseEnter={() => handleMenuHover("apple")}
            className={`flex items-center justify-center p-1 px-1.5 rounded transition-colors duration-100 focus:outline-none ${
              activeMenu === "apple" ? "bg-white/20 text-white" : "hover:bg-white/15 text-white"
            }`}
            aria-label="Apple Menu"
          >
            <svg
              className="w-4 h-4 text-white fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.16.65-2.84 1.44-.6.69-1.12 1.76-1.02 2.81 1.07.08 2.24-.59 2.85-1.38z" />
            </svg>
          </button>

          {/* Apple Menu Popup */}
          <AnimatePresence>
            {activeMenu === "apple" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-7 w-60 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 z-[10000] text-white ring-1 ring-white/10 origin-top-left"
              >
                <button
                  onClick={() => {
                    openApp("notes");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center justify-between text-neutral-100"
                >
                  <span className="font-medium">About Krish Vadsak</span>
                  <span className="text-[10px] text-neutral-200 bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
                    Dev
                  </span>
                </button>

                <button
                  onClick={() => {
                    openApp("settings");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center justify-between text-neutral-100"
                >
                  <span>System Settings...</span>
                  <span className="text-[10px] text-neutral-300 font-mono">⌘,</span>
                </button>

                <button
                  onClick={() => {
                    openApp("settings");
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-settings-tab", { detail: "certificates" }));
                    }, 50);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Credentials</span>
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                    {certificates.length}
                  </span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    openApp("terminal");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center gap-2 text-neutral-100"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open iTerm2 Terminal</span>
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center gap-2 text-neutral-100 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download Resume</span>
                </a>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center gap-2 text-neutral-100"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restart Session</span>
                </button>

                <button
                  onClick={() => {
                    alert("Krish OS Portfolio Session Locked. Click OK to resume.");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-100 flex items-center gap-2 text-neutral-100"
                >
                  <Lock className="w-3.5 h-3.5 text-red-400" />
                  <span>Lock Screen</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current Active App Name */}
        <span className="font-bold text-white tracking-wide cursor-default transition-all duration-150 pl-0.5 pr-1">
          {activeAppName}
        </span>

        {/* ===== File Menu ===== */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => handleMenuClick("file")}
            onMouseEnter={() => handleMenuHover("file")}
            className={`px-2 py-0.5 rounded font-medium transition-colors duration-100 ${
              activeMenu === "file" ? "bg-white/20 text-white" : "text-neutral-200 hover:text-white hover:bg-white/10"
            }`}
          >
            File
          </button>

          <AnimatePresence>
            {activeMenu === "file" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-7 w-56 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 z-[10000] text-white ring-1 ring-white/10"
              >
                <button
                  onClick={() => {
                    openApp("finder");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="w-3.5 h-3.5 text-blue-400" /> New Finder Window
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘N</span>
                </button>

                <button
                  onClick={() => {
                    openApp("safari");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" /> Open Safari Inspector
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘O</span>
                </button>

                <button
                  onClick={() => {
                    openApp("finder");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Certificates Folder
                  </span>
                  <span className="font-mono text-[10px] text-amber-300">{certificates.length} items</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    if (activeAppId) closeApp(activeAppId);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-red-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <XSquare className="w-3.5 h-3.5 text-red-400" /> Close Active Window
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘W</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Terminal Menu ===== */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => handleMenuClick("terminal")}
            onMouseEnter={() => handleMenuHover("terminal")}
            className={`px-2 py-0.5 rounded font-medium transition-colors duration-100 ${
              activeMenu === "terminal" ? "bg-white/20 text-white" : "text-neutral-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Terminal
          </button>

          <AnimatePresence>
            {activeMenu === "terminal" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-7 w-56 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 z-[10000] text-white ring-1 ring-white/10"
              >
                <button
                  onClick={() => {
                    openApp("terminal");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Launch CLI Session
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘T</span>
                </button>

                <button
                  onClick={() => {
                    openApp("terminal");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Run 'projects'
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘P</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Window Menu ===== */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => handleMenuClick("window")}
            onMouseEnter={() => handleMenuHover("window")}
            className={`px-2 py-0.5 rounded font-medium transition-colors duration-100 ${
              activeMenu === "window" ? "bg-white/20 text-white" : "text-neutral-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Window
          </button>

          <AnimatePresence>
            {activeMenu === "window" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-7 w-56 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 z-[10000] text-white ring-1 ring-white/10"
              >
                <button
                  onClick={() => {
                    if (activeAppId) minimizeApp(activeAppId);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Minimize2 className="w-3.5 h-3.5 text-yellow-400" /> Minimize Window
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌘M</span>
                </button>

                <button
                  onClick={() => {
                    if (activeAppId) toggleMaximizeApp(activeAppId);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" /> Zoom / Maximize
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">⌃⌘F</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Help Menu ===== */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => handleMenuClick("help")}
            onMouseEnter={() => handleMenuHover("help")}
            className={`px-2 py-0.5 rounded font-medium transition-colors duration-100 ${
              activeMenu === "help" ? "bg-white/20 text-white" : "text-neutral-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Help
          </button>

          <AnimatePresence>
            {activeMenu === "help" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-7 w-56 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 z-[10000] text-white ring-1 ring-white/10"
              >
                <button
                  onClick={() => {
                    openApp("notes");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> About Krish Bio
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">Help</span>
                </button>

                <button
                  onClick={() => {
                    openApp("mail");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between text-neutral-100"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-400" /> Contact Engineer
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">✉</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Tray Indicators */}
      <div className="flex items-center space-x-2.5 text-neutral-200">
        <button
          onClick={toggleSpotlight}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/15 text-white font-medium text-[11px] transition-colors"
          title="Spotlight Search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-neutral-200" />
          <span className="hidden md:inline font-mono text-[10px] bg-black/40 px-1 py-0.2 rounded text-neutral-200 border border-white/10">
            ⌘K
          </span>
        </button>

        <div className="p-1 px-1.5 rounded hover:bg-white/10 transition-colors">
          <Wifi className="w-3.5 h-3.5 text-neutral-200 hover:text-white cursor-pointer" />
        </div>

        <div className="flex items-center gap-1 text-neutral-200 p-1 px-1.5 rounded hover:bg-white/10">
          <span className="text-[10px] font-mono hidden sm:inline">100%</span>
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Control Center */}
        <div className="relative">
          <button
            id="control-center-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setControlCenterOpen(!controlCenterOpen);
            }}
            className="p-1 px-1.5 rounded hover:bg-white/15 active:bg-white/25 transition-colors duration-100"
            aria-label="Control Center"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-200 hover:text-white" />
          </button>

          <AnimatePresence>
            {controlCenterOpen && (
              <motion.div
                id="control-center-dropdown"
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-8 w-64 mac-glass border border-white/20 rounded-xl shadow-2xl p-3 z-[10000] text-white ring-1 ring-white/10 origin-top-right"
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/10 p-2.5 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between text-blue-400">
                      <Wifi className="w-4 h-4" />
                      <span className="text-[10px] text-neutral-400">Wi-Fi</span>
                    </div>
                    <span className="text-xs font-medium mt-2">Connected</span>
                    <span className="text-[10px] text-neutral-400">Krish-HighSpeed</span>
                  </div>

                  <div className="bg-white/10 p-2.5 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between text-purple-400">
                      <Code2 className="w-4 h-4" />
                      <span className="text-[10px] text-neutral-400">Stack</span>
                    </div>
                    <span className="text-xs font-medium mt-2">Full Stack</span>
                    <span className="text-[10px] text-neutral-400">React · Next · Node</span>
                  </div>
                </div>

                <div className="bg-white/10 p-2.5 rounded-lg mb-2">
                  <div className="flex justify-between items-center text-[11px] mb-1 text-neutral-300">
                    <span>Display Theme</span>
                    <span className="text-blue-400 font-medium">macOS Dark</span>
                  </div>
                  <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-4/5 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white/10 p-2.5 rounded-lg">
                  <div className="flex justify-between items-center text-[11px] mb-1 text-neutral-300">
                    <span>Interactive 3D Engine</span>
                    <span className="text-emerald-400 font-medium">60 FPS</span>
                  </div>
                  <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Real-time Clock */}
        <span className="font-medium tracking-tight cursor-default text-neutral-200 hover:text-white">
          {timeStr || "Mon Oct 11 7:00 PM"}
        </span>
      </div>
    </header>
  );
});
