import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { projects } from "../../constants";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  ShieldCheck, 
  Share2, 
  Github, 
  Sparkles, 
  Zap, 
  Globe 
} from "lucide-react";

export const SafariApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentProject = projects[activeTab] || projects[0];

  const projectUrl = currentProject.live_link || `https://${currentProject.name.toLowerCase()}.dev`;

  return (
    <WindowFrame
      id="safari"
      headerContent={
        <div className="flex items-center gap-2 max-w-sm w-full bg-neutral-900/80 px-3 py-1 rounded-md border border-white/10 text-xs text-neutral-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate">{projectUrl}</span>
        </div>
      }
    >
      {/* Safari Navigation & Tab Bar */}
      <div className="bg-neutral-900/70 border-b border-white/10 px-3 py-1.5 flex items-center justify-between text-neutral-300 text-xs">
        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-lg mx-2">
          {projects.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 rounded-t-md text-xs font-medium flex items-center gap-1.5 border-t border-x transition-colors whitespace-nowrap ${
                activeTab === idx
                  ? "bg-neutral-950 border-white/15 text-white"
                  : "bg-neutral-900/40 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span>{p.emoji || "🌐"}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(projectUrl);
                alert("URL copied to clipboard!");
              }
            }}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Safari Webpage Viewport */}
      <div className="flex-1 overflow-y-auto bg-neutral-950 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* Web Preview Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
              {currentProject.emoji || "🚀"}
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Full Stack Platform</span>
              </div>

              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {currentProject.name}
              </h1>

              <p className="text-base text-neutral-300 max-w-2xl leading-relaxed">
                {currentProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.tech_stack.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-4">
                {currentProject.live_link ? (
                  <a
                    href={currentProject.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Launch Live Production App ↗</span>
                  </a>
                ) : (
                  <div className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-200 font-medium text-xs flex items-center gap-2 border border-white/15">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Live preview deployed via Vercel</span>
                  </div>
                )}

                {currentProject.source_code_link && (
                  <a
                    href={currentProject.source_code_link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs flex items-center gap-2 border border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Architecture Flow & Deep Decisions */}
          {currentProject.architecture_flow && (
            <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Architecture & Data Flow
              </h3>
              <p className="font-mono text-xs text-neutral-300 bg-black/60 p-3 rounded-lg border border-white/10 overflow-x-auto leading-relaxed">
                {currentProject.architecture_flow}
              </p>
            </div>
          )}

          {/* Key Decisions */}
          {currentProject.key_decisions && (
            <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                Key Engineering Decisions & Trade-offs
              </h3>
              <div className="space-y-2">
                {currentProject.key_decisions.map((dec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-yellow-400 font-bold">0{idx + 1}.</span>
                    <p className="leading-relaxed">{dec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowFrame>
  );
};
