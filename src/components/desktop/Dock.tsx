import React, { useRef, useState } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  MotionValue, 
  AnimatePresence 
} from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { AppId } from "../../types/desktop";
import { 
  FinderIcon, 
  SafariIcon, 
  TerminalIcon, 
  SettingsIcon, 
  NotesIcon, 
  MailIcon, 
  GithubMacIcon 
} from "./MacIcons";
import { Linkedin } from "lucide-react";

interface DockAppConfig {
  id: AppId | "github" | "linkedin";
  title: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  url?: string;
  isSystemUtility?: boolean;
}

const DOCK_APPS: DockAppConfig[] = [
  {
    id: "finder",
    title: "Finder",
    icon: <FinderIcon />,
  },
  {
    id: "safari",
    title: "Safari",
    icon: <SafariIcon />,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: <TerminalIcon />,
  },
  {
    id: "settings",
    title: "System Settings",
    icon: <SettingsIcon />,
  },
  {
    id: "notes",
    title: "Notes",
    icon: <NotesIcon />,
  },
  {
    id: "mail",
    title: "Mail",
    icon: <MailIcon />,
  },
  {
    id: "github",
    title: "GitHub",
    icon: <GithubMacIcon />,
    isExternal: true,
    url: "https://github.com/Krish-vadsak45",
    isSystemUtility: true,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: (
      <div className="w-full h-full bg-[#0a66c2] rounded-[22%] flex items-center justify-center p-2.5 shadow-md">
        <Linkedin className="w-full h-full text-white" />
      </div>
    ),
    isExternal: true,
    url: "https://linkedin.com",
    isSystemUtility: true,
  },
];

interface DockItemProps {
  mouseX: MotionValue<number>;
  app: DockAppConfig;
  isOpen?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ mouseX, app, isOpen, isActive, onClick }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Authentic macOS continuous Gaussian-like magnification
  const widthSync = useTransform(distance, [-130, 0, 130], [50, 78, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 240, damping: 18 });

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1100);
    onClick();
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-end"
    >
      {/* Authentic macOS Tooltip with Pointer Arrow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-11 px-2.5 py-1 bg-neutral-900/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium rounded-md shadow-2xl whitespace-nowrap pointer-events-none select-none z-50 ring-1 ring-white/10"
          >
            {app.title}
            {/* Pointer arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900/90 border-r border-b border-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Icon Button with Authentic Multi-stage macOS Launch Bounce */}
      <motion.button
        style={{ width, height: width }}
        animate={isBouncing ? { y: [0, -28, 0, -14, 0, -6, 0] } : { y: 0 }}
        transition={
          isBouncing
            ? { duration: 1.05, ease: [0.34, 1.56, 0.64, 1] }
            : { duration: 0.15 }
        }
        onClick={handleClick}
        className="relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] hover:brightness-110 active:brightness-95 transition-filter select-none p-0.5 cursor-pointer focus:outline-none"
        aria-label={app.title}
      >
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          {app.icon}
        </div>
      </motion.button>

      {/* Running App Indicator Dot (macOS Sonoma / Sequoia Style) */}
      <div className="h-2 flex items-center justify-center mt-0.5">
        <span
          className={`rounded-full transition-all duration-200 ${
            isActive
              ? "w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,1)] opacity-100 scale-100"
              : isOpen
              ? "w-1 h-1 bg-white/75 shadow-[0_0_3px_rgba(255,255,255,0.7)] opacity-90 scale-100"
              : "w-1 h-1 bg-transparent opacity-0 scale-50"
          }`}
        />
      </div>
    </div>
  );
};

export const Dock: React.FC = () => {
  const { windows, activeAppId, openApp, focusApp, minimizeApp } = useDesktop();
  const mouseX = useMotionValue(Infinity);

  const handleAppClick = (app: DockAppConfig) => {
    if (app.isExternal && app.url) {
      window.open(app.url, "_blank", "noreferrer");
      return;
    }

    const appId = app.id as AppId;
    const win = windows[appId];

    if (!win) return;

    if (!win.isOpen) {
      openApp(appId, "dock");
    } else if (win.isMinimized) {
      focusApp(appId, "dock");
    } else if (activeAppId === appId) {
      minimizeApp(appId);
    } else {
      focusApp(appId, "dock");
    }
  };

  return (
    <nav
      aria-label="Desktop Dock"
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 mac-dock-glass border border-white/20 rounded-2xl flex items-end gap-2.5 select-none"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {DOCK_APPS.map((app, index) => {
        const isInternal = !app.isExternal;
        const appId = app.id as AppId;
        const isAppOpen = isInternal ? windows[appId]?.isOpen : false;
        const isAppActive = isInternal ? activeAppId === appId : false;
        const prevApp = DOCK_APPS[index - 1];
        const isFirstUtility = app.isSystemUtility && !prevApp?.isSystemUtility;

        return (
          <React.Fragment key={app.id}>
            {/* Dock separator divider */}
            {isFirstUtility && (
              <div className="w-[1px] h-10 bg-white/20 mx-1 mb-2 self-center rounded-full" />
            )}

            <DockItem
              mouseX={mouseX}
              app={app}
              isOpen={isAppOpen}
              isActive={isAppActive}
              onClick={() => handleAppClick(app)}
            />
          </React.Fragment>
        );
      })}
    </nav>
  );
};
