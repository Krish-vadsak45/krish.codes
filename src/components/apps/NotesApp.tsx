import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { developerProfile, certificates } from "../../constants";
import { 
  CheckSquare, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Rocket,
  Award,
  Flame,
  Code2,
  GitBranch,
  Linkedin,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: React.ReactNode;
}

const NOTES: NoteItem[] = [
  {
      id: "leetcode",
      title: "LeetCode & DSA Mastery (217 Solved)",
      date: "Today, 11:20 AM",
      preview: "217 problems solved in C++, 50 Days Badge 2025, Rating 1,360...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-amber-300 mb-0.5">LeetCode & Problem Solving</h2>
              <p className="text-neutral-400">Competitive Programming in C++ · Profile @{developerProfile.leetcode.username}</p>
            </div>
            <a
              href={developerProfile.leetcode.url}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black font-semibold flex items-center gap-1 transition-all"
            >
              <span>LeetCode Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-100 space-y-2">
            <h4 className="font-semibold flex items-center gap-2 text-amber-300 text-sm">
              <Award className="w-4 h-4" /> 50 Days Streak Badge 2025 & Global Rating
            </h4>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Maintained rigorous daily problem solving, achieving the official <strong>50 Days Badge 2025</strong> on LeetCode with 4 badges overall. Reached a Contest Rating of <strong>1,360</strong> (Top 91.2%) with global rank #{developerProfile.leetcode.globalRanking}.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-400" /> Solved Breakdown by Difficulty:
            </h4>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-emerald-400 font-bold">Easy</div>
                <div className="text-white text-base font-bold mt-0.5">70</div>
                <div className="text-neutral-400 text-[10px]">Beats 76.5%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <div className="text-amber-400 font-bold">Medium</div>
                <div className="text-white text-base font-bold mt-0.5">132</div>
                <div className="text-neutral-400 text-[10px]">Core Algorithmic Core</div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <div className="text-rose-400 font-bold">Hard</div>
                <div className="text-white text-base font-bold mt-0.5">15</div>
                <div className="text-neutral-400 text-[10px]">Advanced Complexities</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-400" /> Key Topics & Quantities:
            </h4>
            <ul className="grid grid-cols-2 gap-1.5 text-neutral-300 text-[11px]">
              <li>• Array manipulation (109 problems)</li>
              <li>• Dynamic Programming (35 problems)</li>
              <li>• Two Pointers (36 problems)</li>
              <li>• String Algorithms (42 problems)</li>
              <li>• Hash Tables & Sets (30 problems)</li>
              <li>• Depth-First Search & Trees (28 problems)</li>
              <li>• Math & Bitwise Logic (26 problems)</li>
              <li>• Monotonic Stack (10 problems)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "github-ecosystem",
      title: "GitHub & Open Source Ecosystem",
      date: "Yesterday",
      preview: "14 repositories, 575 contributions, 78.9% TypeScript...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">GitHub Repositories</h2>
              <p className="text-neutral-400">@{developerProfile.github.username} · Full-Stack Web Development</p>
            </div>
            <a
              href={developerProfile.github.url}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold flex items-center gap-1 transition-all"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-neutral-400 text-[10px]">Contributions</div>
              <div className="text-emerald-400 font-bold text-base mt-0.5">{developerProfile.github.contributions}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-neutral-400 text-[10px]">Commits (1y)</div>
              <div className="text-blue-400 font-bold text-base mt-0.5">{developerProfile.github.commitsPastYear}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-neutral-400 text-[10px]">Public Repos</div>
              <div className="text-amber-400 font-bold text-base mt-0.5">{developerProfile.github.publicRepos}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-purple-400" /> Featured Projects:
            </h4>
            <div className="space-y-2 text-neutral-300">
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/10">
                <span className="text-white font-bold">1. PlacemateAI</span> — Next.js & AI mock technical interviews and ATS resume analyzer.
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/10">
                <span className="text-white font-bold">2. MyShow</span> — Atomic seat locking movie engine with LangChain and Inngest.
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/10">
                <span className="text-white font-bold">3. ShopIQ</span> — Stateless AI trust engine analyzing e-commerce reviews with Gemini Flash Lite.
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/10">
                <span className="text-white font-bold">4. NexusAI</span> — Multi-tenant AI SaaS with Stripe billing and 9 productivity tools.
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/10">
                <span className="text-white font-bold">5. Nasa-BloomWatch</span> — NASA Space Apps Challenge Earth observation app.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "about-me",
      title: "About Me & Philosophy",
      date: "Oct 10, 10:14 AM",
      preview: "I'm Krish Vadsak, a Full Stack Developer passionate about...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-xl font-bold text-amber-200 mb-1">Krish Vadsak</h2>
            <p className="text-neutral-400">{developerProfile.linkedin.headline}</p>
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
              <li>✓ Full-stack Next.js & React ecosystems with TypeScript (78.9% codebase).</li>
              <li>✓ Algorithmic problem solving in C++ (217 LeetCode problems solved).</li>
              <li>✓ Multi-tenant SaaS architectures with Stripe subscriptions and RBAC.</li>
              <li>✓ Event-driven backend workflows with Inngest and background workers.</li>
              <li>✓ AI integrations using Google Gemini REST APIs and LangChain agents.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      title: "Education & Contact",
      date: "Oct 8",
      preview: "Computer Engineering foundation, LinkedIn, and details...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <h2 className="text-xl font-bold text-white mb-1">Background & Contact</h2>
          
          <div className="space-y-3 text-neutral-300">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>B.Tech in Computer Engineering / Information Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{developerProfile.location} · Open to Remote & Relocation</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-400" />
              <a 
                href={developerProfile.linkedin.url}
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Connect on LinkedIn (Krish Vadsak) ↗
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Passionate about Clean Architecture, Scalable Systems, and Open Source</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "certifications",
      title: `Verified Credentials (${certificates.length} Certifications)`,
      date: "Today, 1:20 PM",
      preview: "NASA Space Apps, SuperOps Global AI, IBM, freeCodeCamp, LeetCode Badges...",
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-amber-300 mb-0.5">{certificates.length} Verified Certifications</h2>
              <p className="text-neutral-400">Official Credentials Across Hackathons, AI, Full-Stack, & Problem Solving</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold text-xs">
              {certificates.length} Total
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-purple-400 font-bold">Hackathons</div>
              <div className="text-white text-base font-bold mt-0.5">3 Global</div>
              <div className="text-[10px] text-neutral-400">NASA & AWS</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-amber-400 font-bold">LeetCode Badges</div>
              <div className="text-white text-base font-bold mt-0.5">4 Badges</div>
              <div className="text-[10px] text-neutral-400">Top 4.2% Global</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10">
              <div className="text-emerald-400 font-bold">freeCodeCamp</div>
              <div className="text-white text-base font-bold mt-0.5">{certificates.filter(c => c.category === "freeCodeCamp").length * 300} Hours</div>
              <div className="text-[10px] text-neutral-400">{certificates.filter(c => c.category === "freeCodeCamp").length} Certifications</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Complete Credentials Inventory:
            </h4>
            <div className="space-y-2 max-h-96 mac-scroll-viewport pr-1">
              {certificates.map((c, i) => (
                <div key={c.id} className="p-2.5 rounded-lg bg-neutral-900/70 border border-white/10 hover:border-amber-400/30 transition-colors duration-150 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-mono font-bold text-[10px]">#{i + 1}</span>
                      <span className="font-bold text-white text-xs">{c.title}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {c.issuer} · {c.issueDate} {c.credentialId ? `(ID: ${c.credentialId})` : ""}
                    </p>
                    <p className="text-[11px] text-neutral-300 mt-1 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <a
                      href={c.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-200 text-[10px] font-semibold flex items-center gap-1"
                    >
                      <span>Drive</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black text-[10px] font-semibold flex items-center gap-0.5 border border-emerald-500/30"
                      >
                        <ShieldCheck className="w-2.5 h-2.5" />
                        <span>Verify</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

const NOTES_MAP: Map<string, NoteItem> = new Map(NOTES.map((n) => [n.id, n]));

export const NotesApp: React.FC = React.memo(() => {
  const [activeNoteId, setActiveNoteId] = useState<string>("leetcode");
  const activeNote = NOTES_MAP.get(activeNoteId) || NOTES[0];

  return (
    <WindowFrame id="notes">
      <div className="flex-1 flex overflow-hidden text-xs">
        {/* Left Notes List */}
        <div className="w-64 bg-neutral-900/60 border-r border-white/10 p-2 overflow-y-auto space-y-1 select-none mac-scroll-viewport">
          <div className="px-2 py-1 text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
            Notes ({NOTES.length})
          </div>
          {NOTES.map((note) => {
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
        <div className="flex-1 p-6 overflow-y-auto bg-neutral-950/70 mac-scroll-viewport">
          <div className="max-w-xl mx-auto">{activeNote.content}</div>
        </div>
      </div>
    </WindowFrame>
  );
});
