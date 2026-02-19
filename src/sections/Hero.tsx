import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import HeroParticles from "../components/canvas/HeroParticles";

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
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Particle background — sits behind everything */}
      <div className="absolute inset-0 z-0">
        <HeroParticles />
      </div>

      {/* Main content — scrollable, above particles */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center ${styles.paddingX} max-w-7xl mx-auto pt-28 pb-16`}
      >
        <div className="flex lg:flex-row flex-col items-center justify-between gap-10">
          <div className="flex flex-row items-start gap-5 flex-1 order-2 lg:order-1">
            {/* Accent line */}
            <div className="flex flex-col justify-center items-center mt-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>

            {/* Text block */}
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#aaa6c3] text-base sm:text-lg font-medium tracking-widest uppercase mb-2"
              >
                Hello, World! 👋 I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white font-black lg:text-[64px] sm:text-[50px] xs:text-[40px] text-[32px] lg:leading-[1.1] mt-2"
              >
                <span className="text-[#915EFF]">Krish</span> Vadsak
                <span className="hidden sm:inline"> — </span>
                <br className="sm:hidden" />
                <span className="text-white lg:text-[36px] sm:text-[28px] text-[20px] block sm:inline mt-2 sm:mt-0 font-medium">
                  Full Stack Engineer | AI-Driven Web Apps & Scalable Systems
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-[#dfd9ff] font-medium lg:text-[26px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[1.4] mt-4 max-w-2xl"
              >
                I build production-ready full stack apps with payment, AI, real-time flows, and robust backend logic.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 flex flex-wrap items-center gap-2 text-[#aaa6c3] text-[18px]"
              >
                <span>Currently specialized in: </span>
                <span className="text-[#915EFF] font-bold min-w-[200px]">
                  {displayed}
                  <span className="inline-block w-[2px] h-[1em] bg-white ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="#work"
                  aria-label="View my engineering projects"
                  className="px-8 py-4 bg-[#915EFF] !text-white font-bold rounded-xl hover:bg-[#7a4fd6] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#915EFF]/30 flex items-center justify-center min-w-[160px] cursor-pointer"
                >
                  View Projects
                </a>
                <a
                  href="/Krish_Vadsak_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Krish Vadsak's Resume in a new tab"
                  className="px-8 py-4 border-2 border-[#915EFF] !text-[#915EFF] font-bold rounded-xl hover:bg-[#915EFF] hover:!text-white transition-all duration-300 hover:scale-105 flex items-center justify-center min-w-[160px] cursor-pointer"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  aria-label="Go to the contact section"
                  className="px-8 py-4 border-2 border-[#aaa6c3] !text-[#aaa6c3] font-bold rounded-xl hover:border-white hover:!text-white transition-all duration-300 hover:scale-105 flex items-center justify-center min-w-[160px] cursor-pointer"
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
              {/* Outer glowing ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#915EFF] to-purple-800 rounded-full blur-xl opacity-40 animate-pulse" />
              
              {/* Image container with border */}
              <div className="relative w-full h-full rounded-full border-4 border-[#915EFF]/50 p-2 bg-[#050816] overflow-hidden">
                <img
                  src="/_C0A7128.JPG"
                  alt="Krish Vadsak - Full Stack Engineer & Computer Science Student at Sarvajanik College"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Decorative arc */}
              <svg viewBox="0 0 100 100" className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none stroke-[#915EFF]/20 fill-none">
                <circle cx="50" cy="50" r="48" strokeDasharray="60 40" className="animate-[spin_10s_linear_infinite]" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;