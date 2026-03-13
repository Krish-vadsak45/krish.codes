import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import HeroParticles from "../components/canvas/HeroParticles";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const roles = [
  "Full Stack Engineer",
  "AI Solutions Architect",
  "Next.js Specialist",
  "Backend Developer",
  "Problem Solver",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <HeroParticles />
      </div>

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] glow-blob bg-[#915EFF] opacity-10 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[360px] h-[360px] glow-blob bg-purple-700 opacity-8 z-0 pointer-events-none" />

      {/* Main content */}
      <div className={`relative z-10 h-full flex flex-col justify-center ${styles.paddingX} max-w-7xl mx-auto pt-24 pb-16`}>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-10 lg:gap-16">

          {/* ── Left: Text ───────────────────────────────── */}
          <div className="flex flex-row items-start gap-5 flex-1 order-2 lg:order-1 min-w-0">
            {/* Accent line */}
            <div className="flex flex-col justify-center items-center mt-3 shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#915EFF] shadow-[0_0_12px_#915EFF]" />
              <div className="w-0.5 sm:h-72 h-32 violet-gradient mt-1" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#aaa6c3] text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-3"
              >
                Hello, World! 👋 I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="font-black lg:text-[68px] sm:text-[52px] xs:text-[42px] text-[34px] leading-[1.05]"
              >
                <span className="shimmer-text">Krish</span>
                <span className="text-white"> Vadsak</span>
              </motion.h1>

              {/* Title pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#915EFF]/30 bg-[#915EFF]/8 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#915EFF] animate-pulse" />
                <span className="text-[#c4b5fd] text-sm font-semibold tracking-wide">
                  Full Stack Engineer · AI-Driven Apps · Scalable Systems
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#aaa6c3] text-[16px] sm:text-[17px] leading-[1.75] mt-5 max-w-xl"
              >
                I build production-ready full stack apps with{" "}
                <span className="text-white font-medium">payment flows</span>,{" "}
                <span className="text-white font-medium">AI pipelines</span>,
                real-time systems, and robust backend logic.
              </motion.p>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-5 flex flex-wrap items-center gap-2"
              >
                <span className="text-[#aaa6c3] text-sm">Currently:</span>
                <span className="text-[#915EFF] font-bold text-[15px] min-w-[210px] font-mono">
                  {displayed}
                  <span className="inline-block w-0.5 h-[1.1em] bg-[#915EFF] ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#work"
                  aria-label="View projects"
                  className="px-7 py-3 bg-[#915EFF] text-white font-bold rounded-xl hover:bg-[#7a4fd6] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#915EFF]/25 text-sm"
                >
                  View Projects
                </a>
                <a
                  href="/Krish_Vadsak_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume"
                  className="px-7 py-3 border border-[#915EFF]/50 text-[#915EFF] font-bold rounded-xl hover:bg-[#915EFF] hover:text-white transition-all duration-300 hover:scale-105 text-sm"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  aria-label="Contact me"
                  className="px-7 py-3 border border-white/15 text-[#aaa6c3] font-bold rounded-xl hover:border-white/35 hover:text-white transition-all duration-300 hover:scale-105 text-sm"
                >
                  Contact
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 }}
                className="mt-6 flex items-center gap-3"
              >
                <span className="text-[#aaa6c3] text-[11px] font-medium tracking-widest uppercase">Find me</span>
                <div className="h-px w-5 bg-white/15" />
                {[
                  { href: "https://github.com/krish-vadsak45", icon: <Github size={16} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/krish-vadsak-a5bab427b", icon: <Linkedin size={16} />, label: "LinkedIn" },
                  { href: "mailto:krishvadsak234@gmail.com", icon: <Mail size={16} />, label: "Email" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-white hover:bg-[#915EFF]/20 hover:border-[#915EFF]/50 transition-all duration-300 hover:scale-110"
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Right: Profile picture ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px]">
              {/* Outer ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#915EFF] via-purple-700 to-[#915EFF] rounded-full blur-2xl opacity-20 animate-[glow-pulse_4s_ease-in-out_infinite]" />

              {/* Clockwise dashed ring */}
              <svg
                viewBox="0 0 100 100"
                className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none fill-none stroke-[#915EFF]/30"
              >
                <circle cx="50" cy="50" r="47" strokeWidth="1.2" strokeDasharray="50 50"
                  className="animate-[spin_14s_linear_infinite]" />
              </svg>

              {/* Counter-clockwise ring */}
              <svg
                viewBox="0 0 100 100"
                className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none fill-none stroke-[#915EFF]/15"
              >
                <circle cx="50" cy="50" r="47" strokeWidth="0.8" strokeDasharray="18 82"
                  className="animate-[spin_22s_linear_infinite_reverse]" />
              </svg>

              {/* Photo */}
              <div className="relative w-full h-full rounded-full border-2 border-[#915EFF]/35 p-1.5 bg-[#050816] overflow-hidden shadow-xl shadow-[#915EFF]/10">
                <img
                  src="/profile.png"
                  alt="Krish Vadsak — Full Stack Engineer"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                  fetchPriority="high"
                  width={340}
                  height={340}
                />
              </div>

              {/* Open-to-work badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-[#0b1024] border border-emerald-500/35 rounded-full shadow-lg shadow-black/50 whitespace-nowrap z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[11px] font-bold tracking-widest uppercase">Open to Work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 w-full flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <a href="#about" aria-label="Scroll to about" className="flex flex-col items-center gap-2 group">
          <span className="text-[#aaa6c3] text-[10px] font-semibold tracking-[0.25em] uppercase group-hover:text-[#915EFF] transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#aaa6c3] group-hover:border-[#915EFF]/50 group-hover:text-[#915EFF] transition-all duration-300"
          >
            <ArrowDown size={14} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
