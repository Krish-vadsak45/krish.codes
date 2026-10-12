import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { projects, technologies } from "../../constants";
import { 
  Search, 
  Terminal, 
  FolderKanban, 
  Compass, 
  Settings, 
  FileText, 
  Mail, 
  Download, 
  Sparkles,
  Command
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "app" | "project" | "skill" | "action";
  icon: React.ReactNode;
  action: () => void;
}

export const SpotlightModal: React.FC = () => {
  const { isSpotlightOpen, setIsSpotlightOpen, openApp } = useDesktop();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSpotlightOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isSpotlightOpen]);

  // Build searchable items
  const baseItems: SearchResult[] = [
    {
      id: "app-terminal",
      title: "Terminal (iTerm2)",
      subtitle: "Interactive developer CLI shell",
      type: "app",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        openApp("terminal");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "app-finder",
      title: "Finder",
      subtitle: "Browse featured projects and work",
      type: "app",
      icon: <FolderKanban className="w-4 h-4 text-blue-400" />,
      action: () => {
        openApp("finder");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "app-safari",
      title: "Safari",
      subtitle: "Web inspector and live project demos",
      type: "app",
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      action: () => {
        openApp("safari");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "app-settings",
      title: "System Settings",
      subtitle: "Engineering capabilities and skills",
      type: "app",
      icon: <Settings className="w-4 h-4 text-neutral-400" />,
      action: () => {
        openApp("settings");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "app-notes",
      title: "Notes",
      subtitle: "About Krish Vadsak, background & journey",
      type: "app",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => {
        openApp("notes");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "app-mail",
      title: "Mail",
      subtitle: "Send a message or get in touch",
      type: "app",
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      action: () => {
        openApp("mail");
        setIsSpotlightOpen(false);
      },
    },
    {
      id: "act-resume",
      title: "Download Resume",
      subtitle: "Full-Stack Engineer resume PDF",
      type: "action",
      icon: <Download className="w-4 h-4 text-green-400" />,
      action: () => {
        window.open("/resume.pdf", "_blank");
        setIsSpotlightOpen(false);
      },
    },
    ...projects.map((p) => ({
      id: `proj-${p.name}`,
      title: p.name,
      subtitle: `${p.role} · ${p.tags.map(t => t.name).join(", ")}`,
      type: "project" as const,
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        openApp("finder");
        setIsSpotlightOpen(false);
      },
    })),
    ...technologies.map((t) => ({
      id: `tech-${t.name}`,
      title: t.name,
      subtitle: "Configured Skill in System Settings",
      type: "skill" as const,
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        openApp("settings");
        setIsSpotlightOpen(false);
      },
    })),
  ];

  const filteredItems = baseItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm select-none"
          onClick={() => setIsSpotlightOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -24 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl mac-glass border border-white/20 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 gpu-accelerated"
          >
            {/* Spotlight Search Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Spotlight Search..."
                className="flex-1 bg-transparent border-none text-white text-base focus:outline-none placeholder-neutral-400"
              />
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-200 bg-white/10 px-2.5 py-1 rounded-md border border-white/20">
                <Command className="w-3.5 h-3.5 text-neutral-300" />
                <span>ESC to exit</span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-300">
                  No results found for "{query}". Try "Nexus", "Terminal", or "Resume".
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-3 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors duration-100 ${
                        isSelected 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" 
                          : "text-neutral-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border ${
                          isSelected ? "bg-blue-700/80 border-blue-400/40" : "bg-black/40 border-white/15"
                        }`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-white">{item.title}</h4>
                          <p className={`text-[11px] truncate max-w-md ${
                            isSelected ? "text-blue-100 font-normal" : "text-neutral-300"
                          }`}>
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isSelected 
                          ? "text-blue-100 bg-blue-700/60 border-blue-400/30" 
                          : "text-neutral-300 bg-black/30 border-white/10"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
