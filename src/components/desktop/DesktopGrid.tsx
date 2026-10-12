import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { 
  FinderIcon, 
  SafariIcon, 
  TerminalIcon, 
  NotesIcon, 
  MailIcon 
} from "./MacIcons";
import { 
  Download, 
  FolderPlus, 
  Info,
  Terminal as TerminalLucide, 
  Settings as SettingsLucide, 
  RotateCw, 
  FileText 
} from "lucide-react";

interface DesktopShortcut {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
}

interface MarqueeBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface ContextMenuPos {
  x: number;
  y: number;
}

export const DesktopGrid: React.FC = () => {
  const { openApp } = useDesktop();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [marquee, setMarquee] = useState<MarqueeBox | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuPos | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const shortcutRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const shortcuts: DesktopShortcut[] = [
    {
      id: "sc-projects",
      title: "Projects",
      icon: <FinderIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("finder", "desktop"),
    },
    {
      id: "sc-nexusai",
      title: "NexusAI.app",
      icon: <SafariIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("safari", "desktop"),
    },
    {
      id: "sc-terminal",
      title: "Terminal.app",
      icon: <TerminalIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("terminal", "desktop"),
    },
    {
      id: "sc-readme",
      title: "About_Krish.md",
      icon: <NotesIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("notes", "desktop"),
    },
    {
      id: "sc-resume",
      title: "Resume.pdf",
      icon: (
        <div className="w-12 h-12 rounded-[22%] bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg drop-shadow-md border border-white/20">
          <Download className="w-6 h-6 text-white" />
        </div>
      ),
      action: () => window.open("/resume.pdf", "_blank"),
    },
    {
      id: "sc-mail",
      title: "Contact.app",
      icon: <MailIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("mail", "desktop"),
    },
  ];

  // Close context menu on outside click
  useEffect(() => {
    const handleCloseMenu = () => setContextMenu(null);
    window.addEventListener("click", handleCloseMenu);
    return () => window.removeEventListener("click", handleCloseMenu);
  }, []);

  // Native desktop marquee box selection handler
  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    // Only drag marquee if clicking on the background, not on an icon or context menu
    if ((e.target as HTMLElement).closest(".desktop-shortcut") || e.button !== 0) return;

    setContextMenu(null);
    setSelectedIds([]);

    const startX = e.clientX;
    const startY = e.clientY;
    setMarquee({ startX, startY, currentX: startX, currentY: startY });

    const handlePointerMove = (moveEv: PointerEvent) => {
      setMarquee((prev) => (prev ? { ...prev, currentX: moveEv.clientX, currentY: moveEv.clientY } : null));

      // Calculate intersection with desktop icons
      const boxLeft = Math.min(startX, moveEv.clientX);
      const boxRight = Math.max(startX, moveEv.clientX);
      const boxTop = Math.min(startY, moveEv.clientY);
      const boxBottom = Math.max(startY, moveEv.clientY);

      const newlySelected: string[] = [];
      shortcuts.forEach((sc) => {
        const el = shortcutRefs.current[sc.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const intersects =
            rect.left < boxRight &&
            rect.right > boxLeft &&
            rect.top < boxBottom &&
            rect.bottom > boxTop;
          if (intersects) newlySelected.push(sc.id);
        }
      });
      setSelectedIds(newlySelected);
    };

    const handlePointerUp = () => {
      setMarquee(null);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // Only show custom desktop context menu when right-clicking on desktop background
    if ((e.target as HTMLElement).closest(".desktop-shortcut")) return;
    e.preventDefault();
    setContextMenu({
      x: Math.min(window.innerWidth - 220, e.clientX),
      y: Math.min(window.innerHeight - 240, e.clientY),
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handleDesktopPointerDown}
      onContextMenu={handleContextMenu}
      className="absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Desktop Shortcut Grid Column */}
      <div className="absolute top-11 left-4 z-10 flex flex-col space-y-3">
        {shortcuts.map((sc) => {
          const isSelected = selectedIds.includes(sc.id);

          return (
            <div
              key={sc.id}
              ref={(el) => {
                shortcutRefs.current[sc.id] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIds([sc.id]);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                sc.action();
              }}
              className={`desktop-shortcut group flex flex-col items-center w-20 p-1.5 rounded-lg transition-all duration-100 cursor-pointer ${
                isSelected
                  ? "bg-white/20 ring-1 ring-white/30 backdrop-blur-sm"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="group-hover:scale-105 transition-transform duration-150">
                {sc.icon}
              </div>
              <span
                className={`text-[11px] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-1.5 text-center leading-tight line-clamp-1 px-1 rounded transition-colors duration-100 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-white group-hover:text-blue-100"
                }`}
              >
                {sc.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* ===== Authentic macOS Marquee Selection Box ===== */}
      {marquee && (
        <div
          className="fixed pointer-events-none z-30 border border-blue-400/80 bg-blue-500/20 rounded-[2px]"
          style={{
            left: Math.min(marquee.startX, marquee.currentX),
            top: Math.min(marquee.startY, marquee.currentY),
            width: Math.abs(marquee.currentX - marquee.startX),
            height: Math.abs(marquee.currentY - marquee.startY),
          }}
        />
      )}

      {/* ===== Authentic macOS Desktop Context Menu (Right Click) ===== */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: contextMenu.x, top: contextMenu.y }}
            className="fixed z-50 w-52 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 text-white text-xs ring-1 ring-white/10 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                alert("New Folder created on desktop");
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>New Folder</span>
            </button>

            <button
              onClick={() => {
                openApp("terminal");
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <TerminalLucide className="w-3.5 h-3.5" />
              <span>Open in Terminal</span>
            </button>

            <div className="h-[1px] bg-white/10 my-1 mx-1.5" />

            <button
              onClick={() => {
                openApp("settings");
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <SettingsLucide className="w-3.5 h-3.5" />
              <span>System Settings...</span>
            </button>

            <button
              onClick={() => {
                openApp("notes");
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>About Krish (Bio)</span>
            </button>

            <button
              onClick={() => {
                window.location.reload();
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Refresh Desktop</span>
            </button>

            <div className="h-[1px] bg-white/10 my-1 mx-1.5" />

            <button
              onClick={() => {
                alert("Krish OS — macOS Sequoia Interactive Web Portfolio v2.0\nCreated with React 18, Tailwind CSS, & Framer Motion.");
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Get Info</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
