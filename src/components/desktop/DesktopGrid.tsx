import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { certificates } from "../../constants";
import { 
  FinderIcon, 
  SafariIcon, 
  TerminalIcon, 
  NotesIcon, 
  MailIcon,
  LeetCodeMacIcon
} from "./MacIcons";
import { 
  Download, 
  FolderPlus, 
  Info,
  Terminal as TerminalLucide, 
  Settings as SettingsLucide, 
  RotateCw, 
  FileText,
  Award
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

  const shortcuts: DesktopShortcut[] = useMemo(() => [
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
      id: "sc-leetcode",
      title: "LeetCode_217.app",
      icon: <LeetCodeMacIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => window.open("https://leetcode.com/u/G8KOATYwH6/", "_blank"),
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
      id: "sc-certificates",
      title: `Certificates (${certificates.length})`,
      icon: (
        <div className="w-12 h-12 rounded-[22%] bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center shadow-lg drop-shadow-md border border-white/20">
          <Award className="w-6 h-6 text-white" />
        </div>
      ),
      action: () => {
        openApp("settings", "desktop");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-settings-tab", { detail: "certificates" }));
        }, 50);
      },
    },
    {
      id: "sc-mail",
      title: "Contact.app",
      icon: <MailIcon className="w-12 h-12 drop-shadow-md" />,
      action: () => openApp("mail", "desktop"),
    },
  ], [openApp]);

  // Close context menu on outside click
  useEffect(() => {
    const handleCloseMenu = () => setContextMenu(null);
    window.addEventListener("click", handleCloseMenu);
    return () => window.removeEventListener("click", handleCloseMenu);
  }, []);

  // Native desktop marquee box selection handler with 120fps RAF synchronization
  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    // Only drag marquee if clicking on the background, not on an icon or context menu
    if ((e.target as HTMLElement).closest(".desktop-shortcut") || e.button !== 0) return;

    e.preventDefault();
    setContextMenu(null);
    setSelectedIds([]);

    const startX = e.clientX;
    const startY = e.clientY;
    setMarquee({ startX, startY, currentX: startX, currentY: startY });

    let pendingMarqueeRaf: number | null = null;
    let latestMoveX = startX;
    let latestMoveY = startY;

    const handlePointerMove = (moveEv: PointerEvent) => {
      latestMoveX = moveEv.clientX;
      latestMoveY = moveEv.clientY;

      if (pendingMarqueeRaf === null) {
        pendingMarqueeRaf = requestAnimationFrame(() => {
          pendingMarqueeRaf = null;
          setMarquee((prev) => (prev ? { ...prev, currentX: latestMoveX, currentY: latestMoveY } : null));

          // Calculate intersection with desktop icons
          const boxLeft = Math.min(startX, latestMoveX);
          const boxRight = Math.max(startX, latestMoveX);
          const boxTop = Math.min(startY, latestMoveY);
          const boxBottom = Math.max(startY, latestMoveY);

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
        });
      }
    };

    const handlePointerUp = () => {
      if (pendingMarqueeRaf !== null) {
        cancelAnimationFrame(pendingMarqueeRaf);
        pendingMarqueeRaf = null;
      }
      setMarquee(null);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
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
              className={`desktop-shortcut group flex flex-col items-center w-20 p-2 rounded-xl transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-white/20 ring-1 ring-white/35 backdrop-blur-md shadow-lg"
                  : "hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              <div className="transition-all duration-200 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_16px_30px_rgba(0,0,0,0.85)]">
                {sc.icon}
              </div>
              <span
                className={`text-[11px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] mt-2 text-center leading-tight line-clamp-1 px-1.5 py-0.5 rounded transition-colors duration-150 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/40"
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
            className="fixed z-[9995] w-52 mac-glass border border-white/20 rounded-xl shadow-2xl p-1 text-white text-xs ring-1 ring-white/10 select-none"
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
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent("open-settings-tab", { detail: "certificates" }));
                }, 50);
                setContextMenu(null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-neutral-200"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Credentials ({certificates.length})</span>
            </button>

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
