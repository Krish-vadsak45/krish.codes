import React, { useState, useRef, useEffect } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { projects, skillCategories, developerProfile, certificates } from "../../constants";
import { useDesktop } from "../../context/DesktopContext";

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = React.memo(() => {
  const { openApp } = useDesktop();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      command: "",
      output: (
        <div className="space-y-2 mb-3 text-neutral-300">
          <p className="text-neutral-400">Last login: {new Date().toDateString()} on ttys001</p>
          <div className="text-emerald-400 font-mono font-semibold leading-relaxed overflow-x-auto scrollbar-none">
            <pre className="text-cyan-400 select-none text-[8px] sm:text-xs leading-none sm:leading-relaxed">
{` _  __     _     _       ____            _            
| |/ /_ __(_)___| |__   / ___|___   __| | ___  ___ 
| ' /| '__| / __| '_ \\ | |   / _ \\ / _\` |/ _ \\/ __|
| . \\| |  | \\__ \\ | | || |__| (_) | (_| |  __/\\__ \\
|_|\\_\\_|  |_|___/_| |_| \\____\\___/ \\__,_|\\___||___/`}
            </pre>
          </div>
          <p className="text-xs text-neutral-300">
            Welcome to <span className="text-emerald-400 font-semibold">Krish Vadsak's</span> interactive shell!
          </p>
          <p className="text-xs text-neutral-400">
            Type <span className="text-yellow-400 font-mono font-bold bg-white/10 px-1 py-0.5 rounded">help</span> for available commands, or click any app on the Dock.
          </p>
        </div>
      ),
    },
  ]);

  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const commandHistoryRef = useRef<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const args = trimmed.split(" ");
    const cmd = args[0].toLowerCase();

    if (trimmed) {
      commandHistoryRef.current.push(trimmed);
      setCmdIndex(-1);
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-neutral-300 font-mono py-1">
            <p className="text-yellow-400 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-2 gap-y-1">
              <span className="text-amber-400">leetcode</span>
              <span>Display verified LeetCode stats (217 Solved, C++, Badges)</span>

              <span className="text-purple-400">github</span>
              <span>View GitHub stats (14 Repos, 575 Contribs, streak)</span>

              <span className="text-blue-400">linkedin</span>
              <span>Krish's LinkedIn profile & career info</span>

              <span className="text-emerald-400">stats</span>
              <span>All engineering metrics & problem-solving scoreboard</span>

              <span className="text-cyan-400">projects</span>
              <span>List featured full-stack projects (*NexusAI*, *MyShow*, etc.)</span>

              <span className="text-amber-400">certs</span>
              <span>List all {certificates.length} verified certifications with links & credential IDs</span>

              <span className="text-cyan-400">skills</span>
              <span>Display tech stack & engineering capabilities</span>

              <span className="text-cyan-400">about</span>
              <span>View Krish's bio, education, and background</span>

              <span className="text-cyan-400">cat resume</span>
              <span>Display resume summary and download link</span>

              <span className="text-cyan-400">open &lt;app&gt;</span>
              <span>Launch an app (finder, safari, settings, notes, mail)</span>

              <span className="text-cyan-400">sudo hire-krish</span>
              <span>Unlock full engineering potential</span>

              <span className="text-cyan-400">clear</span>
              <span>Clear terminal screen</span>
            </div>
          </div>
        );
        break;

      case "certs":
      case "certificates":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-white/10 text-amber-300 font-bold">
              <span>Verified Certifications & Credentials ({certificates.length} Total)</span>
              <span className="text-[10px] text-neutral-400">Type 'open settings' for QuickLook gallery</span>
            </div>
            <div className="space-y-1.5 max-h-72 mac-scroll-viewport pr-1">
              {certificates.map((c, idx) => (
                <div key={c.id} className="border-l-2 border-amber-500/40 pl-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-300 font-semibold">[{idx + 1}] {c.title}</span>
                    <a href={c.driveUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300 text-[10px]">
                      Drive ↗
                    </a>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    {c.issuer} · {c.issueDate} {c.credentialId ? `| ID: ${c.credentialId}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 py-1 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Featured Projects:</p>
            {projects.map((p, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500/40 pl-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">[{idx + 1}] {p.name}</span>
                  <span className="text-neutral-400 text-[10px]">({p.role})</span>
                </div>
                <p className="text-neutral-300 text-[11px] font-sans leading-relaxed">{p.portfolio_summary || p.description}</p>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {p.tech_stack.slice(0, 5).map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-neutral-400 text-[11px]">
              Tip: Open <span className="text-cyan-400 cursor-pointer underline" onClick={() => openApp("finder")}>Finder</span> to browse detailed architecture diagrams.
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs">
            <p className="text-cyan-400 font-bold">Technical Skills & Arsenal:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-neutral-900/60 p-2.5 rounded border border-white/5">
                  <span className="text-yellow-400 font-semibold">{cat.category}:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {cat.skills.map((s, sIdx) => (
                      <span key={sIdx} className="text-[11px] text-neutral-300 bg-neutral-800 px-2 py-0.5 rounded">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono py-1 text-neutral-300">
            <p className="text-yellow-400 font-bold">About Krish Vadsak:</p>
            <p className="font-sans leading-relaxed text-neutral-200">
              Passionate Full Stack Developer specializing in React, Next.js, Node.js, and AI-driven platforms.
              Creator of production applications with focus on resilient architectures, atomic database operations,
              and responsive, high-performance UI/UX.
            </p>
            <p className="text-neutral-400">
              📍 Location: India · Ready for full-time & high-impact engineering roles.
            </p>
          </div>
        );
        break;

      case "cat":
        if (args[1] === "resume" || args[1] === "resume.pdf" || args[1] === "resume.txt") {
          output = (
            <div className="space-y-2 text-xs font-mono py-1 text-neutral-300">
              <p className="text-emerald-400 font-bold">📄 Krish Vadsak — Full Stack Engineer Resume</p>
              <p className="text-neutral-300 font-sans">
                Full stack developer with hands-on experience designing multi-tenant SaaS platforms,
                event-driven microservices (Inngest), LangChain AI tool integrations, and Next.js / TypeScript systems.
              </p>
              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans px-3 py-1 rounded text-xs transition-colors"
                >
                  Download Official Resume PDF ↗
                </a>
              </div>
            </div>
          );
        } else {
          output = <p className="text-red-400 text-xs font-mono">cat: {args[1] || "missing argument"}: No such file or directory. Try 'cat resume'.</p>;
        }
        break;

      case "open":
        const targetApp = args[1]?.toLowerCase();
        if (["finder", "safari", "settings", "notes", "mail"].includes(targetApp)) {
          openApp(targetApp as any);
          output = <p className="text-emerald-400 text-xs font-mono">Opening {targetApp}...</p>;
        } else {
          output = <p className="text-red-400 text-xs font-mono">App not found: {args[1]}. Try 'finder', 'safari', 'settings', 'notes', or 'mail'.</p>;
        }
        break;

      case "sudo":
        if (args[1] === "hire-krish" || args[1] === "hire") {
          output = (
            <div className="space-y-1.5 text-xs font-mono py-1">
              <p className="text-emerald-400 font-bold">🚀 ACCESS GRANTED: 100% Match!</p>
              <p className="text-neutral-200">
                Krish has been initialized in your talent pipeline. High-velocity shipping and quality code incoming!
              </p>
              <p className="text-cyan-400">
                Let's connect: krish.vadsak@codes or click Mail on the dock.
              </p>
            </div>
          );
        } else {
          output = <p className="text-yellow-400 text-xs font-mono">Password: ********** (Nice try! Try 'sudo hire-krish')</p>;
        }
        break;

      case "leetcode":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">⚡ LeetCode Problem Solving Matrix:</span>
              <span className="text-neutral-400 text-[10px]">(@{developerProfile.leetcode.username})</span>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-neutral-900/80 p-2.5 rounded border border-white/10">
              <div>
                <span className="text-emerald-400 font-bold">Easy: </span>
                <span className="text-white">{developerProfile.leetcode.easy.solved} / {developerProfile.leetcode.easy.total}</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold">Medium: </span>
                <span className="text-white">{developerProfile.leetcode.medium.solved} / {developerProfile.leetcode.medium.total}</span>
              </div>
              <div>
                <span className="text-rose-400 font-bold">Hard: </span>
                <span className="text-white">{developerProfile.leetcode.hard.solved} / {developerProfile.leetcode.hard.total}</span>
              </div>
            </div>
            <div className="text-neutral-300 space-y-0.5">
              <p>🏆 Total Solved: <span className="text-amber-300 font-bold">{developerProfile.leetcode.totalSolved} problems</span> ({developerProfile.leetcode.primaryLanguage})</p>
              <p>🎖️ Badges: <span className="text-amber-300 font-bold">{developerProfile.leetcode.badgeHighlight}</span> ({developerProfile.leetcode.badgesCount} total badges)</p>
              <p>📈 Contest Rating: <span className="text-blue-400 font-bold">{developerProfile.leetcode.contestRating}</span> ({developerProfile.leetcode.topPercentage}) | Rank: #{developerProfile.leetcode.globalRanking}</p>
              <p>🧠 Core Topics: Dynamic Programming (35), Array (109), Two Pointers (36), Strings (42), DFS (28)</p>
            </div>
            <a 
              href={developerProfile.leetcode.url} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block text-amber-400 underline hover:text-amber-300 pt-1"
            >
              Open LeetCode Profile ↗
            </a>
          </div>
        );
        break;

      case "github":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">🐙 GitHub Activity & Repositories:</span>
              <span className="text-neutral-400 text-[10px]">(@{developerProfile.github.username})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-900/80 p-2 rounded border border-white/10 text-center">
              <div>
                <div className="text-neutral-400 text-[10px]">Repos</div>
                <div className="text-white font-bold">{developerProfile.github.publicRepos}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[10px]">Contributions</div>
                <div className="text-emerald-400 font-bold">{developerProfile.github.contributions}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[10px]">Commits (1y)</div>
                <div className="text-blue-400 font-bold">{developerProfile.github.commitsPastYear}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[10px]">Streak</div>
                <div className="text-amber-400 font-bold">{developerProfile.github.longestStreak}</div>
              </div>
            </div>
            <p className="text-neutral-300">Languages: TypeScript (78.9%), JavaScript (16.6%), CSS (3.2%), HTML (1.2%)</p>
            <div className="text-neutral-400">
              Featured Repos: NexusAI, MyShow, ShopIQ, PlacemateAI, Nasa-BloomWatch, AssetFlow
            </div>
            <a 
              href={developerProfile.github.url} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block text-purple-400 underline hover:text-purple-300 pt-1"
            >
              Open GitHub Profile ↗
            </a>
          </div>
        );
        break;

      case "linkedin":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs text-neutral-300">
            <p className="text-blue-400 font-bold">💼 LinkedIn Profile:</p>
            <p className="text-white font-semibold">{developerProfile.name}</p>
            <p className="text-neutral-300 font-sans leading-relaxed">
              {developerProfile.linkedin.headline}
            </p>
            <p className="text-neutral-400">Location: {developerProfile.location} · {developerProfile.openToRoles}</p>
            <a 
              href={developerProfile.linkedin.url} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block text-blue-400 underline hover:text-blue-300 pt-1"
            >
              Open LinkedIn Profile ↗
            </a>
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="space-y-2 py-1 font-mono text-xs text-neutral-300">
            <p className="text-emerald-400 font-bold">📊 Engineering Scorecard:</p>
            <div className="space-y-1 bg-neutral-900/80 p-3 rounded border border-white/10">
              <p>• LeetCode: <span className="text-amber-400 font-bold">217 Solved</span> (132 Medium, 15 Hard) · Rating: 1360 · 50-Day Badge 2025</p>
              <p>• GitHub: <span className="text-blue-400 font-bold">575 Contributions</span> · 14 Repositories · 31-Day Streak</p>
              <p>• Primary Languages: <span className="text-emerald-400 font-bold">TypeScript (78.9%)</span> · C++ (LeetCode)</p>
              <p>• Architecture: Next.js 16, React 19, MongoDB, Inngest, LangChain, Gemini REST</p>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "ls":
        output = (
          <div className="flex gap-4 text-xs font-mono text-cyan-400 py-1">
            <span className="text-blue-400">projects/</span>
            <span>skills.json</span>
            <span>resume.pdf</span>
            <span>about.md</span>
            <span className="text-green-400">nexus-ai/</span>
          </div>
        );
        break;

      case "":
        output = null;
        break;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            zsh: command not found: {cmd}. Type <span className="text-yellow-400 underline">help</span> for options.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const list = commandHistoryRef.current;
      if (list.length > 0) {
        const nextIdx = cmdIndex === -1 ? list.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(list[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const list = commandHistoryRef.current;
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= list.length) {
          setCmdIndex(-1);
          setInputVal("");
        } else {
          setCmdIndex(nextIdx);
          setInputVal(list[nextIdx]);
        }
      }
    }
  };

  return (
    <WindowFrame id="terminal">
      <div 
        className="flex-1 p-4 font-mono text-sm overflow-y-auto cursor-text bg-black/90 text-neutral-200 min-h-[300px]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="mb-2">
            {item.command && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-semibold select-none">krish@macbook:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output && <div className="mt-1">{item.output}</div>}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs mt-1">
          <span className="text-emerald-400 font-semibold select-none text-[11px] sm:text-xs">krish@macbook:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white focus:outline-none border-none p-0 font-mono caret-emerald-400 text-[11px] sm:text-xs"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick Command Pills for 1-Tap execution on mobile / desktop */}
      <div className="flex overflow-x-auto gap-1.5 p-2 bg-neutral-900/90 border-t border-white/10 select-none scrollbar-none flex-shrink-0">
        <span className="text-[10px] text-neutral-400 uppercase font-mono self-center mr-1 hidden sm:inline">Quick:</span>
        {["help", "projects", "leetcode", "github", "certs", "skills", "about", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-emerald-600/30 hover:text-emerald-300 text-neutral-300 font-mono text-[11px] whitespace-nowrap transition-colors border border-white/10 active:scale-95 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </WindowFrame>
  );
});
