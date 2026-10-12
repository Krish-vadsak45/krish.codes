import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { 
  CheckSquare, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Rocket 
} from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: React.ReactNode;
}

export const NotesApp: React.FC = () => {
  const [activeNoteId, setActiveNoteId] = useState<string>("about-me");

  const notes: NoteItem[] = [
    {
      id: "about-me",
      title: "About Me & Philosophy",
      date: "Today, 10:14 AM",
      preview: "I'm Krish Vadsak, a Full Stack Developer passionate about...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-xl font-bold text-amber-200 mb-1">Krish Vadsak</h2>
            <p className="text-neutral-400">Full Stack Lead & Software Craftsman</p>
          </div>

          <p>
            I am a full-stack developer who loves designing and shipping end-to-end web applications. 
            From crafting pixel-perfect, fluid user interfaces to architecting robust distributed backends,
            I focus on building products that balance technical excellence with exceptional user experience.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-100">
            <h4 className="font-semibold mb-1 flex items-center gap-1.5 text-amber-300">
              <Rocket className="w-3.5 h-3.5" /> Core Philosophy
            </h4>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              "Great software isn't just about writing code that compiles — it's about solving real human problems with resilient architectures, atomic transactions, and zero wasted latency."
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> What I Focus On Daily:
            </h4>
            <ul className="space-y-1.5 pl-2 text-neutral-300 text-[11px]">
              <li>✓ Full-stack Next.js & React ecosystems with TypeScript.</li>
              <li>✓ Multi-tenant SaaS architectures with Stripe subscriptions and RBAC.</li>
              <li>✓ Event-driven backend workflows with Inngest and background workers.</li>
              <li>✓ AI integrations using Google Gemini REST APIs and LangChain agents.</li>
              <li>✓ Interactive 3D graphics with Three.js and Framer Motion micro-interactions.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "journey",
      title: "Engineering Journey & Milestones",
      date: "Yesterday",
      preview: "How I started building full-stack applications...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <h2 className="text-xl font-bold text-white mb-1">My Journey</h2>
          
          <div className="space-y-3">
            <div className="border-l-2 border-blue-500 pl-3">
              <span className="text-blue-400 font-semibold">2024 - Present: Multi-Tenant AI SaaS</span>
              <p className="text-neutral-300 mt-1">
                Engineered <strong>NexusAI</strong>, an enterprise SaaS exposing 9 distinct productivity tools with Stripe billing, Google Gemini, and multi-tenant RBAC.
              </p>
            </div>

            <div className="border-l-2 border-emerald-500 pl-3">
              <span className="text-emerald-400 font-semibold">2024: Event-Driven Architectures</span>
              <p className="text-neutral-300 mt-1">
                Built <strong>MyShow</strong> movie booking engine with atomic MongoDB seat-locking, LangChain agents, and Inngest background job pipelines.
              </p>
            </div>

            <div className="border-l-2 border-purple-500 pl-3">
              <span className="text-purple-400 font-semibold">2023 - 2024: DSA & Algorithmic Problem Solving</span>
              <p className="text-neutral-300 mt-1">
                Solved 200+ LeetCode problems in C++ and TypeScript with emphasis on memory optimization and algorithmic complexity.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      title: "Education & Details",
      date: "Oct 8",
      preview: "Computer Science foundation, location, and hobbies...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <h2 className="text-xl font-bold text-white mb-1">Background & Contact</h2>
          
          <div className="space-y-2 text-neutral-300">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>B.Tech in Computer Engineering / Information Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Gujarat, India · Open to Remote & Worldwide Relocation</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Passionate about Clean Code, UI/UX Micro-Interactions, Open Source</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  return (
    <WindowFrame id="notes">
      <div className="flex-1 flex overflow-hidden text-xs">
        {/* Left Notes List */}
        <div className="w-60 bg-neutral-900/60 border-r border-white/10 p-2 overflow-y-auto space-y-1 select-none">
          <div className="px-2 py-1 text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
            Notes ({notes.length})
          </div>
          {notes.map((note) => {
            const isSelected = note.id === activeNote.id;
            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? "bg-amber-500/25 border border-amber-500/50 shadow-sm" : "hover:bg-white/10 border border-transparent text-neutral-200"
                }`}
              >
                <h4 className="font-bold text-white truncate text-xs">{note.title}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium mt-0.5">
                  <span>{note.date}</span>
                </div>
                <p className="text-[11px] text-neutral-200 truncate mt-1">{note.preview}</p>
              </div>
            );
          })}
        </div>

        {/* Right Note Reader */}
        <div className="flex-1 p-6 overflow-y-auto bg-neutral-950/70">
          <div className="max-w-xl mx-auto">{activeNote.content}</div>
        </div>
      </div>
    </WindowFrame>
  );
};
