import React, { useState, useEffect, useRef, useMemo } from "react";
import { InteractivePortraitCanvas } from "../canvas/InteractivePortraitCanvas";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Monitor, 
  Mail, 
  Copy, 
  Check, 
  ArrowUp
} from "lucide-react";

interface CinematicHeroProps {
  onSwitchToDesktop?: () => void;
  onOpenContact?: () => void;
}

// Scramble text effect helper matching the Code & Chill typewriter animation
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onSwitchToDesktop,
  onOpenContact,
}) => {
  // Navigation & Scroll Tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scramble Hero Headline effect
  const [scrambleText, setScrambleText] = useState("PORTFOLIO");
  const [isScrambleComplete, setIsScrambleComplete] = useState(false);

  // Service Accordion State (row index active)
  const [activeService, setActiveService] = useState<number | null>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Component Shelf / Carousel State
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  // Scramble wordmark effect on initial load
  useEffect(() => {
    const targetWord = "KRISH";
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambleText(() =>
        targetWord
          .split("")
          .map((_char, index) => {
            if (index < iteration) {
              return targetWord[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= targetWord.length) {
        clearInterval(interval);
        setIsScrambleComplete(true);
      }
      iteration += 1 / 3;
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Scroll listener for Navbar & Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1.0, Math.max(0.0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);
      setIsNavScrolled(scrollY > 24);

      // Detect active section
      const sections = ["home", "about", "service", "project", "components", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("krishvadsak@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setFormSubmitted(true);
      window.open(
        `mailto:krishvadsak@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`
      );
    }, 600);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "contact" && onOpenContact) {
      onOpenContact();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Marquee Tickers Data (The Stack)
  const stackRows = useMemo(() => [
    {
      label: "Frontend",
      items: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "Three.js", "GSAP 3", "WebGL Shaders", "Redux Toolkit", "Vite", "HTML5 & CSS3"],
      duration: 48,
      reverse: false,
    },
    {
      label: "Backend",
      items: ["Node.js", "Express 5", "Python", "Inngest Pipelines", "RESTful APIs", "GraphQL", "WebSockets", "Zod", "better-auth", "JWT"],
      duration: 42,
      reverse: true,
    },
    {
      label: "Platform",
      items: ["MongoDB Atlas", "PostgreSQL", "Redis", "Docker", "Stripe Checkout & Webhooks", "Vercel", "Cloudinary AI", "AWS S3", "Git & GitHub"],
      duration: 52,
      reverse: false,
    },
    {
      label: "AI & Algorithms",
      items: ["LangChain", "Gemini 2.5 REST", "Groq LPU", "LeetCode 217+ Solved", "Dynamic Programming", "Trees & Graphs", "System Design", "CI/CD"],
      duration: 46,
      reverse: true,
    },
  ], []);

  // Services Data (What We Can Do Accordion)
  const servicesList = useMemo(() => [
    {
      id: "01",
      title: "FULL STACK WEB & SAAS ARCHITECTURE",
      description: "I architect and ship production SaaS web platforms end to end — from database schema design to high-throughput client state. Multi-tenant isolation, tiered Stripe billing with idempotent webhooks, and strict type-safe REST & GraphQL APIs.",
      capabilities: [
        "Next.js 16 App Router & React 19 Server Components",
        "Multi-tenant RBAC with 2-token invitation verification",
        "Stripe Subscriptions & Webhook Idempotency",
        "Server-side usage quota budgeting with daily cron resets",
        "High-performance responsive UI with Tailwind CSS v4"
      ],
      buttonText: "VIEW PROJECTS",
    },
    {
      id: "02",
      title: "AUTONOMOUS AI AGENTS & LLM PIPELINES",
      description: "I build reliable AI agent systems that don't hallucinate — direct tool execution mapping to database aggregations, strict output schemas via Zod, and multi-model cost optimization.",
      capabilities: [
        "LangChain tool-calling agents for structured queries",
        "Raw Gemini 2.5 REST API with precise maxOutputTokens budgeting",
        "Groq LPU inference acceleration for instant sub-second responses",
        "Stateless trust probability analysis & review fraud engines",
        "RAG search pipelines & context isolation guards"
      ],
      buttonText: "EXPLORE AGENTS",
    },
    {
      id: "03",
      title: "EVENT-DRIVEN BACKENDS & ATOMIC CONCURRENCY",
      description: "I connect applications to resilient distributed backends — async background queues, atomic database state locks, automated TTL releases, and audit trails that survive server restarts.",
      capabilities: [
        "Atomic seat locking without database transactions (MongoDB conditional $set)",
        "Inngest background step functions with automated TTL cleanup",
        "High-throughput aggregation pipelines on MongoDB Atlas",
        "PostgreSQL relational modeling & connection pooling",
        "Redis caching & fan-out notification architectures"
      ],
      buttonText: "VIEW BACKEND",
    },
    {
      id: "04",
      title: "CREATIVE 3D WEBGL & HARDWARE-ACCELERATED UI",
      description: "I craft interactive web experiences that feel native — 60–120 FPS GPU rendering, single-pass GLSL shaders, GSAP compositor transforms, and Apple-grade glassmorphic desktop interfaces.",
      capabilities: [
        "Three.js 3D backdrops & interactive scene graph management",
        "Custom GLSL fragment shaders (organic noise domain warping)",
        "Zero-reflow GPU composited window dragging (translate3d)",
        "Authentic macOS spring dock physics & traffic light controls",
        "Accessibility compliance & mobile-first fluid adaptations"
      ],
      buttonText: "LAUNCH OS",
    },
    {
      id: "05",
      title: "ALGORITHMIC OPTIMIZATION & SYSTEM DESIGN",
      description: "Deep algorithmic foundation ensuring every system is optimal in both time and space complexity before writing application code. 217+ solved challenges across dynamic programming, trees, and graphs.",
      capabilities: [
        "217+ LeetCode problems solved with top percentile efficiency",
        "Graph traversal (Dijkstra, BFS/DFS, Topological Sort)",
        "Dynamic programming state memoization & bottom-up tabulation",
        "Distributed system design & microservice load balancing",
        "Database query indexing & schema normalization"
      ],
      buttonText: "VIEW LEETCODE",
    },
  ], []);

  // Featured Projects Showcase Data (Selected Work)
  const projectsList = useMemo(() => [
    {
      number: "01",
      name: "NexusAI",
      title: (
        <>
          NEXUSAI <br />
          <span className="font-light italic text-gray-300 lowercase font-serif pr-4">multi-tenant</span>
          AI SAAS PLATFORM
        </>
      ),
      description: "A production-grade, multi-tenant AI SaaS platform exposing nine distinct productivity tools under a unified workspace with tiered Stripe billing, idempotent webhook upserts, and project-level RBAC with a 2-token invitation verification system.",
      live: "https://github.com/Krish-vadsak45/NexusAI",
      liveLabel: "Live Demo",
      repo: "https://github.com/Krish-vadsak45/NexusAI",
      tags: ["Next.js 16", "Stripe API", "MongoDB Atlas", "Gemini 2.5", "better-auth"],
      bgClass: "from-indigo-950/40 via-neutral-900/70 to-black/90",
    },
    {
      number: "02",
      name: "MyShow",
      title: (
        <>
          MYSHOW <br />
          <span className="font-light italic text-gray-300 lowercase font-serif pr-4">atomic</span>
          MOVIE BOOKING SYSTEM
        </>
      ),
      description: "Full-stack ticket booking platform with atomic seat-locking without database transactions, a LangChain tool-calling agent for natural-language queries, event-driven payment verification via Inngest, and a 5-chart aggregation-backed admin revenue suite.",
      live: "https://github.com/Krish-vadsak45/MyShow",
      liveLabel: "Live Demo",
      repo: "https://github.com/Krish-vadsak45/MyShow",
      tags: ["React 19", "Inngest", "Clerk Auth", "Express 5", "LangChain Agent"],
      bgClass: "from-blue-950/40 via-neutral-900/70 to-black/90",
    },
    {
      number: "03",
      name: "krish.codes",
      title: (
        <>
          KRISH.CODES <br />
          <span className="font-light italic text-gray-300 lowercase font-serif pr-4">interactive</span>
          MACOS WEB OS
        </>
      ),
      description: "An interactive macOS Sequoia desktop simulation featuring a 60–120 FPS WebGL dynamic aurora shader, hardware-accelerated zero-reflow window dragging, spring-physics floating dock, interactive terminal shell, and live settings inspector.",
      live: "#",
      liveLabel: "Launch macOS Mode",
      repo: "https://github.com/Krish-vadsak45",
      tags: ["Three.js", "GLSL Shaders", "GSAP Physics", "macOS Architecture", "Tailwind CSS"],
      bgClass: "from-purple-950/40 via-neutral-900/70 to-black/90",
      isDesktopTrigger: true,
    },
    {
      number: "04",
      name: "ShopIQ",
      title: (
        <>
          SHOPIQ <br />
          <span className="font-light italic text-gray-300 lowercase font-serif pr-4">stateless</span>
          AI REVIEW TRUST ENGINE
        </>
      ),
      description: "A stateless AI trust engine for e-commerce reviews using Gemini 2.5 Flash Lite at temperature 0, returning an objective trust probability score (0–100), verified pros/cons, and alternative product recommendations with zero persistent infrastructure cost.",
      live: "https://github.com/Krish-vadsak45",
      liveLabel: "View Project",
      repo: "https://github.com/Krish-vadsak45",
      tags: ["Next.js", "Gemini 2.5 Flash Lite", "Zero-Temp Inference", "Zod", "Tailwind CSS"],
      bgClass: "from-emerald-950/40 via-neutral-900/70 to-black/90",
    },
  ], []);

  // Interface Components Shelf Data
  const componentsShelf = useMemo(() => [
    {
      slug: "meniscus",
      name: "Meniscus",
      tagline: "liquid bottom navigation",
      category: "navigation",
      sizeKb: 8.7,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs font-mono text-gray-300">Fluid Blob Navigation</span>
          </div>
        </div>
      )
    },
    {
      slug: "lucid",
      name: "Lucid",
      tagline: "liquid glass segmented bar",
      category: "navigation",
      sizeKb: 8.0,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/15">
            <span className="px-3 py-1 rounded-lg bg-white/20 text-xs font-semibold text-white">Active</span>
            <span className="px-3 py-1 rounded-lg text-xs text-gray-400">Preview</span>
            <span className="px-3 py-1 rounded-lg text-xs text-gray-400">Settings</span>
          </div>
        </div>
      )
    },
    {
      slug: "sigil",
      name: "Sigil",
      tagline: "a code field that seals itself",
      category: "form",
      sizeKb: 12.2,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="flex gap-2">
            {[4, 8, 2, 9].map((digit, i) => (
              <div key={i} className="w-9 h-11 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-white">
                {digit}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      slug: "quarto",
      name: "Quarto",
      tagline: "four boxes that fold into one",
      category: "form",
      sizeKb: 16.1,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-12 h-10 rounded bg-white/10 border border-white/15" />
            <div className="w-12 h-10 rounded bg-white/20 border border-white/25" />
            <div className="w-12 h-10 rounded bg-white/15 border border-white/20" />
            <div className="w-12 h-10 rounded bg-white/5 border border-white/10" />
          </div>
        </div>
      )
    },
    {
      slug: "parachute",
      name: "Parachute",
      tagline: "animated download button",
      category: "animation",
      sizeKb: 9.2,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-white">
            <span>Download</span>
            <span className="text-[10px] text-emerald-400 font-mono">100%</span>
          </div>
        </div>
      )
    },
    {
      slug: "quench",
      name: "Quench",
      tagline: "Submit Button Animation",
      category: "form",
      sizeKb: 11.9,
      preview: (
        <div className="w-full h-32 flex items-center justify-center p-4">
          <div className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-lg">
            Submit Order
          </div>
        </div>
      )
    },
  ], []);

  const totalShelfSizeKb = useMemo(
    () => componentsShelf.reduce((acc, item) => acc + item.sizeKb, 0).toFixed(1),
    [componentsShelf]
  );

  return (
    <div className="relative w-full bg-[#050505] text-white selection:bg-white/20 selection:text-white font-sans antialiased">
      
      {/* ── Fixed Top Navigation Bar (Exact Code & Chill style) ── */}
      <nav 
        aria-label="Main"
        className={`fixed top-0 left-0 w-full z-50 transition-[transform,opacity,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isNavScrolled || mobileMenuOpen
            ? "bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
          {/* Logo Name with Accent Underline */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
            className="group relative z-50 text-white font-black text-xl md:text-2xl tracking-widest uppercase leading-none rounded-sm outline-none"
          >
            <span className="inline-block transition-colors duration-300 group-hover:text-[var(--accent)]">
              KRISH <span className="hidden md:inline-block font-light text-gray-300">&nbsp;VADSAK</span>
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {["Home", "About", "Service", "Project", "Components", "Contact"].map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className={`group relative block py-1 text-sm uppercase tracking-wider font-medium transition-colors duration-300 rounded-sm outline-none ${
                      isActive ? "text-[var(--accent)]" : "text-gray-300 hover:text-[var(--accent)]"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)] origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action: macOS Mode Switcher & Profiles */}
          <div className="hidden md:flex items-center gap-4">
            {onSwitchToDesktop && (
              <button
                onClick={onSwitchToDesktop}
                className="cursor-pointer px-5 py-2 rounded-full border border-white/20 bg-white/5 text-white text-xs font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
                title="Switch to full interactive macOS Web OS"
              >
                <Monitor className="w-3.5 h-3.5 text-blue-400 group-hover:text-black transition-colors" />
                <span>macOS Mode</span>
              </button>
            )}

            <a
              href="https://github.com/Krish-vadsak45"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/krish-vadsak45"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-white"
          >
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Scroll Progress Line Indicator */}
        <div 
          aria-hidden="true"
          className="h-px w-full origin-left bg-[var(--accent)] transition-opacity duration-300 opacity-60"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />

        {/* Mobile Fullscreen Menu Drawer */}
        <div 
          id="mobile-menu"
          aria-hidden={!mobileMenuOpen}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0a0a] transition-[opacity,visibility] duration-500 ease-out md:hidden ${
            mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center gap-8">
            {["Home", "About", "Service", "Project", "Components", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                  className="block text-3xl font-black uppercase tracking-widest text-white transition-colors duration-300 hover:text-[var(--accent)] active:text-[var(--accent)]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4">
            {onSwitchToDesktop && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToDesktop();
                }}
                className="px-6 py-3 rounded-full bg-[var(--accent)] text-black font-bold text-xs uppercase tracking-wider"
              >
                Switch to macOS Mode
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: HOME (Exact Code & Chill Hero) ─────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          background: "radial-gradient(circle, #222222 0%, #000000 80%)",
        }}
      >
        {/* Subtle backdrop overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Giant Centered Wordmark Title Container */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-start w-max">
          <h1 className={`flex items-baseline text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 transition-opacity duration-300 ${isScrambleComplete ? "opacity-100" : "opacity-90"}`}>
            <span>{scrambleText.slice(0, 3)}</span>
            <span>{scrambleText.slice(3)}</span>
          </h1>

          {/* Subtitle Role text on bottom-left of the wordmark */}
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-4xl drop-shadow-md z-10 w-max">
            <span className="font-bold">Full Stack Lead</span>{" "}
            <span className="font-light italic text-gray-300">& AI Systems Architect</span>
          </p>

          {/* Contact Action button on bottom-right of the wordmark */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-auto md:right-20 flex items-center gap-2 md:gap-4 pointer-events-auto z-10 w-max">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="group w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-300 transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all cursor-pointer"
            >
              <span className="text-gray-300 text-xs md:text-base italic font-light tracking-wider">Contact</span>
            </a>
          </div>
        </div>

        {/* Central Stage: Interactive WebGL Mosaic Portrait Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <InteractivePortraitCanvas
            portraitSrc="/krish-portrait.png"
            scrollProgress={scrollProgress}
          />
        </div>
      </section>

      {/* ── SECTION 2: ABOUT (Exact Code & Chill Layout) ──────── */}
      <section
        id="about"
        className="bg-[#050505] text-white pt-24 pb-0 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full z-10 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-24 items-center">
            
            {/* Left: Giant "Intro" Headline */}
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-4 md:mb-6">
                About me
              </span>
              <h2 className="text-[18vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.85]">
                Intro
              </h2>
            </div>

            {/* Right: Glassmorphic Narrative Card */}
            <div className="relative bg-white/5 backdrop-blur-md px-5 py-7 md:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/[0.07] transition-colors duration-300 text-left">
              <p className="text-gray-300 text-[15px] sm:text-base md:text-lg lg:text-xl leading-[1.7] md:leading-relaxed font-light text-pretty hyphens-auto">
                Hey, I'm{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Krish Vadsak.
                </span>{" "}
                A Full Stack Lead & AI Systems Engineer with{" "}
                <span className="text-white font-medium">14+ repositories</span> and{" "}
                <span className="text-white font-medium">575+ contributions</span> on GitHub. I architect and ship production platforms end to end — UI and animations, atomic concurrency, in-app billing, push queues, and autonomous tool agents — on{" "}
                <span className="text-white font-medium">React 19,</span>{" "}
                <span className="text-white font-medium">Next.js 16,</span>{" "}
                <span className="text-white font-medium">TypeScript,</span>{" "}
                <span className="text-white font-medium">Inngest,</span> and{" "}
                <span className="text-white font-medium">MongoDB Atlas.</span>{" "}
                Alongside system engineering, I have solved{" "}
                <span className="text-white font-medium">217+ algorithmic challenges</span> on LeetCode across dynamic programming, trees, and graphs, ensuring every data pipeline is optimal at both runtime and scale.
              </p>
            </div>

          </div>
        </div>

        {/* The Stack: Infinite Animated Marquee Shelf */}
        <div className="relative mt-auto -mx-6 md:-mx-16 pt-10 pb-4 bg-[#030303] border-t border-white/10">
          <div className="flex items-center gap-4 px-6 md:px-16 mb-6">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 whitespace-nowrap">
              The stack
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="flex flex-col gap-2.5 md:gap-3">
            {stackRows.map((row) => (
              <div key={row.label} className="marquee-row overflow-hidden whitespace-nowrap" aria-hidden="true">
                <div 
                  className="marquee-track inline-flex"
                  style={{
                    animation: `marquee ${row.duration}s linear infinite ${row.reverse ? 'reverse' : 'normal'}`
                  }}
                >
                  {[...row.items, ...row.items, ...row.items, ...row.items].map((item, idx) => (
                    <span
                      key={idx}
                      className="mx-1 md:mx-1.5 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 md:px-5 md:py-2.5 text-[13px] md:text-sm text-gray-300 font-medium hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SERVICE (Exact Code & Chill Layout) ────── */}
      <section
        id="service"
        className="bg-[#050505] text-white pt-12 pb-0 px-6 md:px-16 flex flex-col relative overflow-hidden"
      >
        {/* Top Section Headline (Right Aligned) */}
        <div className="flex flex-col md:flex-row items-end md:items-start justify-end w-full mt-0 z-0 pb-12">
          <div className="flex flex-col md:flex-row items-start justify-end gap-2 md:gap-4 lg:gap-8 pr-2 md:pr-0 text-right">
            <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[1.1] md:leading-[0.9] text-right">
              {["WHAT WE", "CAN DO"].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Expandable Contrast Accordion Rows */}
        <div className="z-10 relative mt-0 -mx-6 md:-mx-16 border-t border-white/20">
          {servicesList.map((service, index) => {
            const isSelected = activeService === index;
            const isHovered = hoveredService === index;
            const isLit = isSelected || isHovered;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(isSelected ? null : index)}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`service-row relative py-5 md:py-7 px-6 md:px-16 cursor-pointer transition-colors duration-500 ease-out border-b border-white/10 ${
                  isLit ? "bg-[var(--surface-lit)]" : ""
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start">
                  
                  {/* Left Column: Number, Title & Capabilities */}
                  <div className="flex items-start justify-between w-full lg:w-1/2 gap-2">
                    <div className="flex items-start gap-3 md:gap-16 w-full min-w-0">
                      
                      {/* Step Number */}
                      <div className="h-7 flex items-center md:h-10 flex-shrink-0">
                        <span className={`text-lg md:text-3xl font-medium transition-colors duration-300 leading-none ${
                          isLit ? "text-[var(--surface-lit-ink)]" : "text-white"
                        }`}>
                          {service.id}
                        </span>
                      </div>

                      {/* Title & Expandable Capabilities */}
                      <div className="flex flex-col w-full min-w-0">
                        <div className="h-7 flex items-center md:h-10">
                          <h3 className={`text-[11px] sm:text-sm md:text-xl lg:text-2xl font-black uppercase tracking-wide leading-none transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${
                            isLit ? "text-[var(--surface-lit-ink)]" : "text-white"
                          }`}>
                            {service.title}
                          </h3>
                        </div>

                        {/* Expandable capability bullets */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
                          isSelected ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                          <div className="pt-6 lg:pt-8 flex flex-col gap-3">
                            <ul className={`transition-colors duration-300 text-sm md:text-base font-light space-y-2 flex flex-col ${
                              isLit ? "text-[var(--surface-lit-ink-soft)]" : "text-gray-300"
                            }`}>
                              {service.capabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className={`transition-colors duration-300 mt-1.5 opacity-70 text-[10px] ${
                                    isLit ? "text-[var(--surface-lit-ink)]" : "text-[var(--accent)]"
                                  }`}>
                                    ■
                                  </span>
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Mobile Arrow Icon */}
                    <div className="h-7 flex items-center flex-shrink-0 lg:hidden">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-6 h-6 transition-all duration-300 ${
                          isLit ? "text-[var(--surface-lit-ink)]" : "text-[var(--accent)]"
                        } ${isSelected ? "-rotate-45" : "rotate-45"}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Column: Description paragraph & Action Button */}
                  <div className="flex flex-row gap-6 w-full lg:w-1/2 justify-between lg:justify-end relative items-start">
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-start w-full ${
                      isSelected ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pt-4 md:pt-6 lg:pt-[72px] flex flex-col gap-6 w-full pr-0 lg:pr-12">
                        <p className={`transition-colors duration-300 text-base md:text-lg leading-relaxed max-w-lg font-light ${
                          isLit ? "text-[var(--surface-lit-ink-soft)]" : "text-gray-400"
                        }`}>
                          {service.description}
                        </p>
                        <div>
                          <button
                            onClick={() => scrollToSection("project")}
                            className={`cursor-pointer px-6 py-2.5 rounded-full border text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-2 ${
                              isLit
                                ? "border-[var(--surface-lit-ink)] text-[var(--surface-lit-ink)] hover:bg-[var(--surface-lit-ink)] hover:text-white"
                                : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                            }`}
                          >
                            <span>{service.buttonText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Rotating Arrow */}
                    <div className="hidden lg:flex items-center h-10">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-6 h-6 transition-all duration-300 ${
                          isLit ? "text-[var(--surface-lit-ink)]" : "text-[var(--accent)]"
                        } ${isSelected ? "-rotate-45" : "rotate-45"}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 4: PROJECT (Exact Code & Chill Layout) ────── */}
      <div
        id="project"
        className="bg-[#050505] w-full text-white pt-10 md:pt-20 pb-24 px-6 md:px-16 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-12 lg:gap-0 mb-20 lg:mb-32">
            <div className="w-full lg:w-7/12 overflow-visible">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase whitespace-nowrap">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="line flex items-center gap-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                      Selected
                    </span>
                    <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-2 md:pt-4">
                      work
                    </span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="w-full lg:w-4/12 flex flex-col items-start lg:mt-4">
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8">
                As a full-stack engineer using modern ideas, high-throughput systems, simplicity design and universal visual identification tailored to dedicated and current market.
              </p>
              <button
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black font-medium text-xs md:text-sm hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] transition-colors flex items-center gap-2"
              >
                <span>Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>

          {/* Staggered Alternating Project Cards */}
          <div className="flex flex-col gap-24 lg:gap-40 w-full">
            {projectsList.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={project.number}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-between gap-12 lg:gap-16 w-full group`}
                >
                  {/* Parallax Aspect Ratio Image / Mockup Card */}
                  <div className="w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm border border-white/10 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-mono">{project.name}</span>
                      <span>Case Study 0{index + 1}</span>
                    </div>

                    <div className={`my-auto p-6 rounded-2xl bg-gradient-to-br ${project.bgClass} border border-white/10 flex flex-col justify-center items-center text-center`}>
                      <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                        {project.name}
                      </span>
                      <p className="text-xs md:text-sm text-gray-300 max-w-sm line-clamp-3 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="w-full lg:w-5/12 flex flex-col items-start">
                    <span className="text-[var(--accent)] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
                      {project.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.1] uppercase mb-6">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                      {project.isDesktopTrigger && onSwitchToDesktop ? (
                        <button
                          onClick={onSwitchToDesktop}
                          className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black text-xs md:text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-2"
                        >
                          <span>{project.liveLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black text-xs md:text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-2"
                        >
                          <span>{project.liveLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION 5: COMPONENTS (Exact Code & Chill Layout) ──── */}
      <section
        id="components"
        className="bg-[#050505] w-full text-white overflow-hidden pt-10 md:pt-20 pb-24 border-t border-white/5"
      >
        <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-5 px-6 md:px-16">
          
          {/* Left Column: Headline and CTAs */}
          <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 flex flex-col">
            <div className="bg-white/[0.05] p-[1.125rem] border-t-2 border-white/80">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-[0.95] mb-6">
                Interface parts that behave under pressure.
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                {componentsShelf.length} components, {totalShelfSizeKb} KB in total, every one of them plain HTML, CSS and JavaScript with no framework and no build step.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-3 bg-white/[0.05] p-[1.125rem]">
              <a
                href="https://github.com/Krish-vadsak45"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 bg-[var(--accent)] text-black text-xs font-bold tracking-[0.15em] uppercase hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-2 shadow-[0_0_28px_-6px_var(--accent)]"
              >
                <span>Browse the shop</span>
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://wa.me/919726255959?text=Hi%20Krish%2C%20I'd%20like%20to%20talk%20about%20your%20software%20engineering%20work."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-white/25 text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                Message me
              </a>
            </div>
          </div>

          {/* Right Column: Carousel Shelf */}
          <div className="flex-1 min-w-0 flex flex-col bg-white/[0.05] p-[1.125rem] gap-3">
            <div 
              ref={shelfRef}
              role="group"
              aria-roledescription="carousel"
              aria-label="Components for sale"
              className="flex items-stretch gap-3 py-3 -my-3 -mr-[1.125rem] pr-[1.125rem] overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing no-scrollbar"
            >
              {componentsShelf.map((item, index) => {
                const isActive = index === activeComponentIndex;
                const distance = Math.min(2, Math.abs(index - activeComponentIndex));
                const scaleClasses = [
                  "scale-100 opacity-100",
                  "scale-90 opacity-50",
                  "scale-[0.81] opacity-25",
                ];

                return (
                  <div
                    key={item.slug}
                    onClick={() => setActiveComponentIndex(index)}
                    className={`relative shrink-0 snap-start flex flex-col origin-top transition-[scale,opacity] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] w-[280px] sm:w-[320px] lg:w-[360px] ${scaleClasses[distance]}`}
                  >
                    {isActive && (
                      <span className="absolute -top-3 left-0 z-20 px-2 py-0.5 bg-[#ff5c3d] text-white text-[10px] font-bold tracking-widest uppercase">
                        Active Component
                      </span>
                    )}

                    <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between min-h-[300px]">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                          <span className="uppercase tracking-widest font-mono text-[10px] text-[var(--accent)]">{item.category}</span>
                          <span className="font-mono text-[11px]">{item.sizeKb} KB</span>
                        </div>
                        <h4 className="text-2xl font-black text-white">{item.name}</h4>
                        <p className="text-gray-400 text-xs font-light italic mb-4">{item.tagline}</p>
                      </div>

                      {/* Interactive Demo Preview Widget */}
                      <div className="my-auto rounded-lg bg-black/40 border border-white/5">
                        {item.preview}
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-gray-400">Zero dependencies</span>
                        <span className="text-xs text-white font-semibold flex items-center gap-1">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Bottom Indicator Row */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
              <div className="flex items-center gap-4">
                <div className="flex gap-[0.3rem]">
                  {componentsShelf.map((item, index) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setActiveComponentIndex(index)}
                      aria-label={`Go to ${item.name}`}
                      className={`h-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                        index === activeComponentIndex ? "w-5 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="hidden sm:inline text-[10px] tracking-[0.2em] text-[#ff5c3d] font-mono uppercase">
                  → Click / Drag to spin the shelf
                </span>
              </div>

              <span className="text-[10px] tracking-[0.2em] text-gray-500 font-mono">
                {activeComponentIndex + 1} / {componentsShelf.length}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: CONTACT (Exact Code & Chill Layout) ────── */}
      <section
        id="contact"
        className="relative min-h-screen text-white font-sans flex flex-col overflow-hidden [clip-path:inset(0)] border-t border-white/10"
        style={{
          background: "radial-gradient(circle at 50% 20%, #1c1d2e 0%, #06070c 70%, #020204 100%)",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/70 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 md:pt-32 flex-1 flex items-center">
          <div className="w-full flex flex-col lg:flex-row gap-14 lg:gap-24">
            
            {/* Left Column: Available Pill, Get In Touch & Socials */}
            <div className="w-full lg:w-6/12 flex flex-col">
              <div className="mb-7">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-gray-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-halo" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available for work
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl mb-7 leading-[0.95]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                    Get in touch
                  </span>
                </span>
              </h2>

              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-md">
                Open for full-time engineering roles, contract work and collaborations — Full Stack architectures & AI agent pipelines in particular. WhatsApp and email get the fastest reply.
              </p>

              {/* Action Buttons matching Code & Chill */}
              <div className="flex flex-wrap gap-3 mt-10">
                <a
                  href="https://wa.me/919726255959?text=Hi%20Krish%2C%20I'd%20like%20to%20discuss%20a%20software%20engineering%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-sm font-medium inline-flex items-center gap-2.5 shadow-lg shadow-black/30 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[var(--accent-hover)] hover:shadow-xl hover:shadow-black/40 cursor-pointer"
                >
                  <span>Message on WhatsApp</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29z" />
                  </svg>
                </a>

                <a
                  href="mailto:krishvadsak@gmail.com"
                  className="group px-6 py-3.5 rounded-full border border-white/25 text-white text-sm inline-flex items-center gap-2.5 backdrop-blur-md transition-[background-color,color,border-color] duration-300 ease-out hover:bg-white hover:text-black hover:border-white cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>

                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="group px-6 py-3.5 rounded-full border border-white/25 text-white text-sm inline-flex items-center gap-2.5 backdrop-blur-md transition-[background-color,color,border-color] duration-300 ease-out hover:bg-white hover:text-black hover:border-white cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Working Contact Form & Direct Info */}
            <div className="w-full lg:w-6/12 flex flex-col justify-center">
              <div className="p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <h3 className="text-2xl font-black text-white mb-2">Direct Message</h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light mb-6">
                  Reach out directly and I'll respond within 24 hours.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">Message Prepared</h4>
                    <p className="text-gray-300 text-xs leading-relaxed max-w-sm mb-4">
                      Thank you! Your email client has been opened with your message. You can also reach me directly at <span className="text-white font-medium">krishvadsak@gmail.com</span>.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent)] text-white text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent)] text-white text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent)] text-white text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={3}
                        placeholder="Message Details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent)] text-white text-sm outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
                    >
                      {isSending ? <span>Sending...</span> : <span>Send Message →</span>}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-8 pb-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Krish Vadsak. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>React 19 · Next.js · Three.js · Tailwind CSS</span>
            <button
              onClick={() => scrollToSection("home")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CinematicHero;
