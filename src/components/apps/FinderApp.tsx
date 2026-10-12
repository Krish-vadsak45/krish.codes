import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { projects } from "../../constants";
import { useDesktop } from "../../context/DesktopContext";
import { 
  Folder, 
  ExternalLink, 
  Github, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Star,
  CheckCircle2
} from "lucide-react";

export const FinderApp: React.FC = () => {
  const { openApp } = useDesktop();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const currentProject = projects[selectedProjectIndex] || projects[0];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai") return p.name.includes("AI") || p.tech_stack.some(t => t.toLowerCase().includes("gemini") || t.toLowerCase().includes("langchain"));
    if (activeCategory === "fullstack") return p.role.includes("Full Stack") || p.tech_stack.includes("Node.js");
    return true;
  });

  return (
    <WindowFrame
      id="finder"
      headerContent={
        <div className="flex items-center gap-2 text-xs text-neutral-300">
          <Folder className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium text-white">Projects</span>
          <ChevronRight className="w-3 h-3 text-neutral-500" />
          <span className="text-neutral-400">{currentProject.name}</span>
        </div>
      }
    >
      {/* Finder Toolbar */}
      <div className="h-10 bg-neutral-900/60 border-b border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded ${viewMode === "grid" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"}`}
            title="Icons View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded ${viewMode === "list" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"}`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-xs text-neutral-400 hidden sm:block">
          {projects.length} items · 1.4 GB available
        </div>
      </div>

      {/* Main Finder Body: Sidebar + File Area + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Finder Sidebar */}
        <div className="w-48 bg-neutral-900/40 border-r border-white/10 p-3 hidden md:flex flex-col space-y-4 select-none text-xs">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">
              Favorites
            </span>
            <div className="mt-1 space-y-0.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  activeCategory === "all" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-blue-400" />
                <span>All Projects</span>
              </button>
              <button
                onClick={() => setActiveCategory("ai")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  activeCategory === "ai" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI & SaaS</span>
              </button>
              <button
                onClick={() => setActiveCategory("fullstack")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  activeCategory === "fullstack" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Stack</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">
              Tags
            </span>
            <div className="mt-1 space-y-1.5 px-2 text-neutral-300 text-[11px] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                <span>Production</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                <span>Full Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" />
                <span>AI Agent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Projects Browser */}
        <div className="flex-1 p-4 overflow-y-auto border-r border-white/10">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProjects.map((p, idx) => {
                const isSelected = p.name === currentProject.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedProjectIndex(projects.findIndex(item => item.name === p.name))}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-600/25 border-blue-400 shadow-lg shadow-blue-500/15"
                        : "bg-neutral-900/60 border-white/15 hover:border-white/30 hover:bg-neutral-900/90"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl drop-shadow-sm">{p.emoji || "💻"}</span>
                        <span className="text-[10px] text-neutral-200 bg-white/10 px-2 py-0.5 rounded border border-white/15 font-semibold">
                          {p.role}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                        {p.name}
                        {isSelected && <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />}
                      </h4>
                      <p className="text-xs text-neutral-200 line-clamp-3 leading-relaxed mb-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tech_stack.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-neutral-800 text-neutral-200 border border-white/10 px-2 py-0.5 rounded font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredProjects.map((p, idx) => {
                const isSelected = p.name === currentProject.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedProjectIndex(projects.findIndex(item => item.name === p.name))}
                    className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer text-xs ${
                      isSelected ? "bg-blue-600 text-white" : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{p.emoji || "🚀"}</span>
                      <span className="font-semibold">{p.name}</span>
                    </div>
                    <span className="text-[11px] opacity-75">{p.role}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Project Detail Inspector */}
        <div className="w-80 bg-neutral-900/30 p-4 overflow-y-auto flex flex-col justify-between hidden lg:flex text-xs">
          <div className="space-y-4">
            <div className="text-center pb-3 border-b border-white/10">
              <div className="w-16 h-16 mx-auto bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner mb-2 border border-white/10">
                {currentProject.emoji || "🚀"}
              </div>
              <h3 className="text-base font-bold text-white">{currentProject.name}</h3>
              <p className="text-xs text-neutral-400">{currentProject.role} · {currentProject.period}</p>
            </div>

            <div>
              <span className="font-semibold text-neutral-300 text-[11px] uppercase tracking-wider block mb-1">
                Problem Statement
              </span>
              <p className="text-neutral-300 text-xs leading-relaxed">
                {currentProject.problem_statement || currentProject.description}
              </p>
            </div>

            {currentProject.impact && (
              <div>
                <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Key Impact
                </span>
                <ul className="space-y-1 text-neutral-300 text-[11px]">
                  {currentProject.impact.slice(0, 3).map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <span className="font-semibold text-neutral-300 text-[11px] uppercase tracking-wider block mb-1.5">
                Full Tech Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {currentProject.tech_stack.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-neutral-800/80 text-neutral-200 px-2 py-0.5 rounded border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => openApp("safari")}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/35 hover:shadow-blue-600/50 active:scale-[0.98] text-xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Inspect in Safari (Live Demo)</span>
            </button>

            {currentProject.source_code_link && (
              <a
                href={currentProject.source_code_link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-neutral-800/90 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 active:scale-[0.98] text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
