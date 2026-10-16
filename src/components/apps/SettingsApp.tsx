import React, { useState, useEffect, useMemo, useCallback } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { 
  skillCategories, 
  skillCategoriesMap,
  technologies, 
  developerProfile, 
  certificates, 
  certificatesMap,
  CertificateItem,
  certificateCategoryCounts,
  certificateSearchIndex
} from "../../constants";
import { 
  Cpu, 
  Code2, 
  Palette, 
  Server, 
  Database, 
  Wrench, 
  Bot, 
  ShieldCheck,
  ExternalLink,
  Award,
  Flame,
  GitBranch,
  GitCommit,
  Linkedin,
  Github,
  Trophy,
  Zap,
  Search,
  Check,
  Copy,
  Eye,
  X,
  Sparkles
} from "lucide-react";
import { LeetCodeMacIcon, GithubMacIcon } from "../desktop/MacIcons";

type SettingsTab = "overview" | "leetcode" | "github" | "certificates" | string;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-blue-400" />,
  Frontend: <Palette className="w-4 h-4 text-purple-400" />,
  Backend: <Server className="w-4 h-4 text-emerald-400" />,
  Databases: <Database className="w-4 h-4 text-cyan-400" />,
  "Tools & DevOps": <Wrench className="w-4 h-4 text-amber-400" />,
  "AI & Automation": <Bot className="w-4 h-4 text-rose-400" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Hackathons & AI": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "Full-Stack & Web": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "AI & Machine Learning": "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "freeCodeCamp": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "LeetCode Badges": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Cloud & DevOps": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
};

interface CertificateCardProps {
  cert: CertificateItem;
  isCopied: boolean;
  onCopy: (id: string, text: string) => void;
  onPreview: (cert: CertificateItem) => void;
}

const CertificateCard = React.memo<CertificateCardProps>(({ cert, isCopied, onCopy, onPreview }) => {
  return (
    <div className="mac-cert-card p-4 rounded-xl border border-white/10 bg-[#12131d]/90 hover:bg-[#181926] hover:border-amber-400/40 transition-colors duration-150 flex flex-col justify-between group shadow-sm">
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${CATEGORY_COLORS[cert.category] || "bg-white/10 text-white"}`}>
            {cert.category}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            {cert.fileType.toUpperCase()}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-amber-300 transition-colors">
          {cert.title}
        </h3>
        <p className="text-neutral-400 text-[11px] mb-2 font-medium">
          {cert.issuer} · {cert.issueDate}
        </p>

        {/* Description */}
        <p className="text-neutral-200 text-xs leading-relaxed mb-3">
          {cert.description}
        </p>

        {/* Skills pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {cert.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Credential ID */}
        {cert.credentialId && (
          <div className="mb-3 p-1.5 rounded-md bg-white/5 border border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-neutral-400 truncate mr-2">
              ID: <code className="text-neutral-200 font-mono">{cert.credentialId}</code>
            </span>
            <button
              onClick={() => onCopy(cert.id, cert.credentialId!)}
              className="text-neutral-300 hover:text-white flex items-center gap-1 font-semibold transition-colors"
              title="Copy Credential ID"
            >
              {isCopied ? (
                <span className="text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <span className="flex items-center gap-0.5">
                  <Copy className="w-3 h-3" /> Copy
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="pt-3 border-t border-white/10 flex items-center gap-2">
        <button
          onClick={() => onPreview(cert)}
          className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-semibold text-[11px] flex items-center justify-center gap-1.5 border border-amber-500/40 transition-colors duration-150"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick Look</span>
        </button>

        <a
          href={cert.driveUrl}
          target="_blank"
          rel="noreferrer"
          className="py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] flex items-center justify-center gap-1 border border-white/15 transition-colors duration-150"
          title="Open original in Google Drive"
        >
          <span>Drive</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-semibold text-[11px] flex items-center justify-center gap-1 border border-emerald-500/40 transition-colors duration-150"
            title="Verify Official Credential"
          >
            <span>Verify</span>
            <ShieldCheck className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
});
CertificateCard.displayName = "CertificateCard";

export const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("overview");
  const [certCategory, setCertCategory] = useState<string>("all");
  const [certSearch, setCertSearch] = useState<string>("");
  const [previewCert, setPreviewCert] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const detail = (e as CustomEvent<string | { tab: string; id?: string }>).detail;
      if (detail) {
        if (typeof detail === "string") {
          setActiveTab(detail);
        } else if (typeof detail === "object" && "tab" in detail) {
          setActiveTab(detail.tab);
          if (detail.id) {
            const found = certificatesMap.get(detail.id);
            if (found) {
              setPreviewCert(found);
            }
          }
        }
      }
    };
    window.addEventListener("open-settings-tab", handleTabChange);
    return () => window.removeEventListener("open-settings-tab", handleTabChange);
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handlePreview = useCallback((cert: CertificateItem) => {
    setPreviewCert(cert);
  }, []);

  const currentCategory = skillCategoriesMap.get(activeTab);

  const filteredCerts = useMemo(() => {
    const query = certSearch.toLowerCase().trim();
    return certificates.filter((cert) => {
      const matchesCategory = certCategory === "all" || cert.category === certCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const searchTokens = certificateSearchIndex.get(cert.id);
      return searchTokens ? searchTokens.includes(query) : true;
    });
  }, [certCategory, certSearch]);

  return (
    <WindowFrame id="settings">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden text-xs relative">
        {/* Mobile Category Pill Bar (Visible on mobile/tablets < md) */}
        <div className="flex md:hidden overflow-x-auto gap-1.5 p-2 bg-neutral-900/60 border-b border-white/10 select-none scrollbar-none flex-shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "overview" ? "bg-blue-600 text-white shadow-sm" : "bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("leetcode")}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "leetcode" ? "bg-amber-600 text-white shadow-sm" : "bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            <div className="w-3.5 h-3.5">
              <LeetCodeMacIcon />
            </div>
            <span>LeetCode (217)</span>
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "github" ? "bg-neutral-800 text-white shadow-sm" : "bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            <div className="w-3.5 h-3.5">
              <GithubMacIcon />
            </div>
            <span>GitHub (575)</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "certificates" ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm" : "bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Certificates ({certificates.length})</span>
          </button>

          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat.category)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === cat.category ? "bg-blue-600 text-white shadow-sm" : "bg-white/5 text-neutral-300 hover:bg-white/10"
              }`}
            >
              {CATEGORY_ICONS[cat.category] || <Cpu className="w-3 h-3" />}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Left Settings Sidebar (Desktop Only) */}
        <div className="w-60 bg-neutral-900/70 border-r border-white/10 p-3 hidden md:flex flex-col justify-between select-none overflow-y-auto flex-shrink-0">
          <div className="space-y-4">
            {/* User Profile Card */}
            <div 
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                activeTab === "overview"
                  ? "bg-blue-600/30 border-blue-400/50 shadow-md ring-1 ring-blue-500/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                KV
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-xs truncate">Krish Vadsak</h4>
                <p className="text-[10px] text-neutral-300 truncate">Full-Stack Engineer</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-emerald-400 font-medium">Available for Hire</span>
                </div>
              </div>
            </div>

            {/* Verified Profiles Group */}
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1">
                Verified Profiles
              </span>

              <button
                onClick={() => setActiveTab("leetcode")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                  activeTab === "leetcode"
                    ? "bg-amber-600/80 text-white font-semibold shadow"
                    : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4">
                    <LeetCodeMacIcon />
                  </div>
                  <span>LeetCode Profile</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                  217
                </span>
              </button>

              <button
                onClick={() => setActiveTab("github")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                  activeTab === "github"
                    ? "bg-neutral-800 text-white font-semibold shadow"
                    : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4">
                    <GithubMacIcon />
                  </div>
                  <span>GitHub Activity</span>
                </div>
                <span className="text-[10px] bg-white/10 text-neutral-300 px-1.5 py-0.2 rounded font-mono">
                  14 Repos
                </span>
              </button>

              <button
                onClick={() => setActiveTab("certificates")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                  activeTab === "certificates"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow"
                    : "text-neutral-200 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Certificates & Badges</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                  {certificates.length}
                </span>
              </button>
            </div>

            {/* Category Nav */}
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1">
                Engineering Stack
              </span>
              {skillCategories.map((cat, idx) => {
                const isSelected = activeTab === cat.category;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(cat.category)}
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
          <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-white/10 text-[10px] text-neutral-300 mt-4 space-y-1">
            <div className="flex justify-between">
              <span>LeetCode Solved</span>
              <span className="text-amber-400 font-bold">217 Problems</span>
            </div>
            <div className="flex justify-between">
              <span>GitHub Commits</span>
              <span className="text-emerald-400 font-bold">575 Contribs</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-white/10">
              <span>Certificates</span>
              <span className="text-amber-400 font-bold">{certificates.length} Verified</span>
            </div>
          </div>
        </div>

        {/* Right Settings Detail Panel */}
        <div className="flex-1 p-3.5 sm:p-6 mac-scroll-viewport bg-[#0c0d12] border-l-0 md:border-l border-white/5 space-y-4 sm:space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white">System Profile Overview</h2>
                  <div className="flex items-center gap-2">
                    <a
                      href={developerProfile.github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-neutral-200 flex items-center gap-1.5 border border-white/15"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={developerProfile.linkedin.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-[#0a66c2]/80 hover:bg-[#0a66c2] text-white flex items-center gap-1.5 border border-white/20"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
                <p className="text-neutral-300 text-xs mt-1 leading-relaxed">
                  Full-Stack Software Engineer specializing in scalable Next.js platforms, event-driven backends, and algorithmic problem solving.
                </p>
              </div>

              {/* Big KPI Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                <div 
                  onClick={() => setActiveTab("leetcode")}
                  className="p-3 sm:p-3.5 rounded-xl mac-card-glass border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs text-neutral-400">LeetCode</span>
                    <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300">217</div>
                  <div className="text-[10px] text-neutral-300 mt-1 flex items-center gap-1 truncate">
                    <Award className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    <span className="truncate">50 Days Badge 2025</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("github")}
                  className="p-3 sm:p-3.5 rounded-xl mac-card-glass border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs text-neutral-400">GitHub</span>
                    <GitCommit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-300">575</div>
                  <div className="text-[10px] text-neutral-300 mt-1 truncate">
                    Contributions · 14 Repos
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl mac-card-glass border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs text-neutral-400 truncate">Primary Stack</span>
                    <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-extrabold text-emerald-300 truncate">TypeScript</div>
                  <div className="text-[10px] text-neutral-300 mt-1 truncate">
                    78.9% of code
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("certificates")}
                  className="p-3 sm:p-3.5 rounded-xl mac-card-glass border border-orange-500/30 hover:border-orange-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-[11px] sm:text-xs text-neutral-400">Certificates</span>
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-orange-300">{certificates.length} Verified</div>
                  <div className="text-[10px] text-neutral-300 mt-1 flex items-center gap-1 truncate">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">NASA, AWS, IBM, FCC</span>
                  </div>
                </div>
              </div>

              {/* Fast Bio & Roles */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Headline & Professional Focus</span>
                </h4>
                <p className="text-neutral-200 text-xs leading-relaxed">
                  "{developerProfile.linkedin.headline}"
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    📍 {developerProfile.location}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    💼 {developerProfile.openToRoles}
                  </span>
                </div>
              </div>

              {/* Quick Technology Chips */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-neutral-200 mb-2">Verified Production Stack:</h4>
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
          )}

          {/* TAB 2: LEETCODE STATS */}
          {activeTab === "leetcode" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shadow-lg">
                    <LeetCodeMacIcon />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      LeetCode Metrics
                      <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-semibold border border-amber-500/30">
                        @{developerProfile.leetcode.username}
                      </span>
                    </h2>
                    <p className="text-neutral-300 text-xs">
                      Algorithmic problem solving in C++ · Data structures, dynamic programming & graph traversal.
                    </p>
                  </div>
                </div>

                <a
                  href={developerProfile.leetcode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>View Live Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Difficulty Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Easy */}
                <div className="p-4 rounded-xl mac-card-glass border border-emerald-500/30">
                  <div className="flex justify-between items-center text-xs text-neutral-300 mb-1">
                    <span className="font-semibold text-emerald-400">Easy</span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded">
                      Beats {developerProfile.leetcode.easy.beats}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {developerProfile.leetcode.easy.solved}{" "}
                    <span className="text-xs text-neutral-400 font-normal">/ {developerProfile.leetcode.easy.total}</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${(developerProfile.leetcode.easy.solved / developerProfile.leetcode.easy.total) * 100 * 3}%` }} 
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="p-4 rounded-xl mac-card-glass border border-amber-500/30">
                  <div className="flex justify-between items-center text-xs text-neutral-300 mb-1">
                    <span className="font-semibold text-amber-400">Medium</span>
                    <span className="text-[10px] text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded">
                      Core Problem Solving
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {developerProfile.leetcode.medium.solved}{" "}
                    <span className="text-xs text-neutral-400 font-normal">/ {developerProfile.leetcode.medium.total}</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${(developerProfile.leetcode.medium.solved / developerProfile.leetcode.medium.total) * 100 * 2.5}%` }} 
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="p-4 rounded-xl mac-card-glass border border-rose-500/30">
                  <div className="flex justify-between items-center text-xs text-neutral-300 mb-1">
                    <span className="font-semibold text-rose-400">Hard</span>
                    <span className="text-[10px] text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded">
                      Advanced Algorithms
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {developerProfile.leetcode.hard.solved}{" "}
                    <span className="text-xs text-neutral-400 font-normal">/ {developerProfile.leetcode.hard.total}</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-rose-500 h-full rounded-full" 
                      style={{ width: `${(developerProfile.leetcode.hard.solved / developerProfile.leetcode.hard.total) * 100 * 3}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Badges & Contest Rating Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Special Badge</div>
                    <div className="font-bold text-white text-xs">{developerProfile.leetcode.badgeHighlight}</div>
                    <div className="text-[10px] text-amber-300">4 Badges Earned</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Contest Rating</div>
                    <div className="font-bold text-white text-xs">{developerProfile.leetcode.contestRating}</div>
                    <div className="text-[10px] text-blue-300">{developerProfile.leetcode.topPercentage}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Primary Language</div>
                    <div className="font-bold text-white text-xs">{developerProfile.leetcode.primaryLanguage}</div>
                    <div className="text-[10px] text-emerald-300">217 Submissions</div>
                  </div>
                </div>
              </div>

              {/* Algorithmic Topic Tags */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Top Algorithmic Skills & Topics Solved</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {developerProfile.leetcode.topSkills.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between"
                    >
                      <span className="text-neutral-200 text-[11px] font-medium">{topic.name}</span>
                      <span className="text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 px-1.5 py-0.5 rounded">
                        x{topic.solved}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB STATS */}
          {activeTab === "github" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shadow-lg">
                    <GithubMacIcon />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      GitHub Repositories & Activity
                      <span className="text-[11px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono font-semibold border border-white/10">
                        @{developerProfile.github.username}
                      </span>
                    </h2>
                    <p className="text-neutral-300 text-xs">
                      14 Public Repositories · 575 Contributions in past year · 31-day longest streak.
                    </p>
                  </div>
                </div>

                <a
                  href={developerProfile.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] text-neutral-400">Repositories</div>
                  <div className="text-xl font-bold text-white mt-0.5">{developerProfile.github.publicRepos}</div>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] text-neutral-400">Contributions</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">{developerProfile.github.contributions}</div>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] text-neutral-400">Past Year Commits</div>
                  <div className="text-xl font-bold text-blue-400 mt-0.5">{developerProfile.github.commitsPastYear}</div>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] text-neutral-400">Longest Streak</div>
                  <div className="text-xl font-bold text-amber-400 mt-0.5">{developerProfile.github.longestStreak}</div>
                </div>
              </div>

              {/* Codebase Language Distribution */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-xs">Production Codebase Language Distribution:</h4>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-neutral-800">
                  {developerProfile.github.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  {developerProfile.github.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="font-medium text-white">{lang.name}:</span>
                      <span className="text-neutral-400">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Repositories List */}
              <div>
                <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                  <span>Featured Open Source Repositories:</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {developerProfile.github.featuredRepos.map((repoName, idx) => (
                    <a
                      key={idx}
                      href={`https://github.com/Krish-vadsak45/${repoName}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg bg-neutral-900/70 border border-white/10 hover:border-blue-400/50 hover:bg-neutral-900 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-bold text-white text-xs group-hover:text-blue-300 transition-colors">
                          {repoName}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CERTIFICATES & CREDENTIALS (23) */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
                      <Award className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Verified Certifications & Credentials</h2>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                      23 Verified
                    </span>
                  </div>
                  <p className="text-neutral-300 text-xs">
                    Official certifications from NASA Space Apps, SuperOps Global AI Hackathon, IBM, freeCodeCamp, LeetCode, DevTown, and Simplilearn.
                  </p>
                </div>

                {/* Quick Stats Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    3 Hackathons
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    4 LeetCode Badges
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-emerald-400" />
                    {certificates.filter(c => c.category === "freeCodeCamp").length} freeCodeCamp (1,500h)
                  </span>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={certSearch}
                      onChange={(e) => setCertSearch(e.target.value)}
                      placeholder="Search credentials by title, issuer, credential ID, or skill..."
                      className="w-full pl-9 pr-8 py-2 rounded-lg bg-neutral-900/90 border border-white/15 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 transition-all"
                    />
                    {certSearch && (
                      <button
                        onClick={() => setCertSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 self-center whitespace-nowrap">
                    Showing <strong className="text-white font-mono">{filteredCerts.length}</strong> of {certificates.length}
                  </span>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: `All (${certificateCategoryCounts.all})` },
                    { id: "Hackathons & AI", label: `Hackathons & AI (${certificateCategoryCounts["Hackathons & AI"] || 0})` },
                    { id: "Full-Stack & Web", label: `Full-Stack & Web (${certificateCategoryCounts["Full-Stack & Web"] || 0})` },
                    { id: "AI & Machine Learning", label: `AI & Machine Learning (${certificateCategoryCounts["AI & Machine Learning"] || 0})` },
                    { id: "freeCodeCamp", label: `freeCodeCamp (${certificateCategoryCounts["freeCodeCamp"] || 0})` },
                    { id: "LeetCode Badges", label: `LeetCode Badges (${certificateCategoryCounts["LeetCode Badges"] || 0})` },
                    { id: "Cloud & DevOps", label: `Cloud & DevOps (${certificateCategoryCounts["Cloud & DevOps"] || 0})` },
                  ].map((cat) => {
                    const isSelected = certCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCertCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                          isSelected
                            ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                            : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Certificates Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredCerts.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    isCopied={copiedId === cert.id}
                    onCopy={handleCopy}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS CATEGORY */}
          {currentCategory && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {CATEGORY_ICONS[currentCategory.category]}
                  <h2 className="text-lg font-bold text-white">{currentCategory.category} Capabilities</h2>
                </div>
                <p className="text-neutral-300 text-xs">
                  Verified skills, technical frameworks, and real project implementations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCategory.skills.map((s, idx) => (
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
          )}
        </div>

        {/* macOS QuickLook Modal for Certificate Preview */}
        {previewCert && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-neutral-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92%] animate-in fade-in zoom-in-95 duration-150">
              {/* Window Header */}
              <div className="h-10 bg-neutral-800/90 border-b border-white/10 px-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block cursor-pointer" onClick={() => setPreviewCert(null)} />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/90 inline-block" />
                  <span className="ml-2 font-medium text-white text-xs truncate max-w-xs">
                    Quick Look — {previewCert.title}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Media Preview */}
              <div className="p-4 bg-black/60 flex items-center justify-center overflow-auto flex-1 min-h-[300px]">
                {previewCert.fileType === "image" ? (
                  <img
                    src={previewCert.localFile}
                    alt={previewCert.title}
                    className="max-h-[50vh] w-auto max-w-full rounded-lg shadow-2xl object-contain border border-white/20"
                  />
                ) : (
                  <div className="w-full h-[50vh] flex flex-col items-center justify-center bg-neutral-900/90 rounded-lg border border-white/10 p-6 text-center">
                    <iframe
                      src={previewCert.localFile}
                      title={previewCert.title}
                      className="w-full h-full rounded border border-white/10 mb-2"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer & Actions */}
              <div className="p-3.5 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white text-xs">{previewCert.title}</h4>
                  <p className="text-[11px] text-neutral-400">
                    {previewCert.issuer} · {previewCert.issueDate}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={previewCert.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>View in Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {previewCert.verifyUrl && (
                    <a
                      href={previewCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Verify Credential</span>
                      <ShieldCheck className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => setPreviewCert(null)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 font-medium text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowFrame>
  );
};
