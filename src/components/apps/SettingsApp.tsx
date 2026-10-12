import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { skillCategories, technologies } from "../../constants";
import { 
  Cpu, 
  Code2, 
  Palette, 
  Server, 
  Database, 
  Wrench, 
  Bot, 
  ShieldCheck 
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-blue-400" />,
  Frontend: <Palette className="w-4 h-4 text-purple-400" />,
  Backend: <Server className="w-4 h-4 text-emerald-400" />,
  Databases: <Database className="w-4 h-4 text-cyan-400" />,
  "Tools & DevOps": <Wrench className="w-4 h-4 text-amber-400" />,
  "AI & Automation": <Bot className="w-4 h-4 text-rose-400" />,
};

export const SettingsApp: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const currentCat = skillCategories[activeCategoryIndex] || skillCategories[0];

  return (
    <WindowFrame id="settings">
      <div className="flex-1 flex overflow-hidden text-xs">
        {/* Left Settings Sidebar */}
        <div className="w-56 bg-neutral-900/60 border-r border-white/10 p-3 flex flex-col justify-between select-none">
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                KV
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Krish Vadsak</h4>
                <p className="text-[10px] text-neutral-400">Full Stack Engineer</p>
              </div>
            </div>

            {/* Category Nav */}
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2 block mb-1">
                Engineering Hardware & Specs
              </span>
              {skillCategories.map((cat, idx) => {
                const isSelected = activeCategoryIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white font-semibold shadow"
                        : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                    }`}
                  >
                    {CATEGORY_ICONS[cat.category] || <Cpu className="w-4 h-4" />}
                    <span>{cat.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Spec Footer */}
          <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-white/10 text-[10px] text-neutral-300">
            <div className="flex justify-between">
              <span>Environment</span>
              <span className="text-emerald-400 font-semibold">Production</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Architecture</span>
              <span className="text-neutral-100 font-medium">Modern Full-Stack</span>
            </div>
          </div>
        </div>

        {/* Right Settings Detail Panel */}
        <div className="flex-1 p-6 overflow-y-auto bg-neutral-950/80 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {CATEGORY_ICONS[currentCat.category]}
              <h2 className="text-lg font-bold text-white">{currentCat.category} Capabilities</h2>
            </div>
            <p className="text-neutral-300 text-xs">
              Verified skills, technical frameworks, and real project implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentCat.skills.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-white/15 bg-neutral-900/60 hover:bg-neutral-900/90 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs">{s.name}</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3" /> {s.level}
                    </span>
                  </div>
                  <p className="text-neutral-200 text-[11px] leading-relaxed mb-2">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-300">
                  <span>Applied in:</span>
                  <span className="text-blue-400 font-semibold">{s.project}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Technology Chips */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-neutral-200 mb-2">All Configured Technologies:</h4>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/15 rounded-md text-[11px] text-neutral-200 font-medium transition-colors"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};
