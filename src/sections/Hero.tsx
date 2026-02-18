import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import HeroParticles from "../components/canvas/HeroParticles";

const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "React Developer",
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
        <div className="flex flex-row items-start gap-5">
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
              className={`${styles.heroHeadText} text-white`}
            >
              <span className="text-[#915EFF]">Krish</span> Vadsak
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`${styles.heroSubText} mt-3 text-white-100 flex flex-wrap items-center gap-2`}
            >
              <span className="text-[#aaa6c3]">I'm a </span>
              <span className="text-[#915EFF] font-bold" style={{ minWidth: "260px" }}>
                {displayed}
                <span className="inline-block w-[2px] h-[1em] bg-white ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {[
                { value: "200+", label: "LeetCode Problems" },
                { value: "2",    label: "Projects Built" },
                { value: "8.78", label: "CGPA" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-white font-black text-[28px] sm:text-[36px] leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[#aaa6c3] text-[12px] sm:text-[14px] mt-1 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="px-6 py-3 bg-[#915EFF] text-white font-bold rounded-xl hover:bg-[#7a4fd6] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#915EFF]/30"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-[#915EFF] text-[#915EFF] font-bold rounded-xl hover:bg-[#915EFF] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Hire Me
              </a>
              <a
                href="https://github.com/krishvadsak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-[#aaa6c3] text-[#aaa6c3] font-bold rounded-xl hover:border-white hover:text-white transition-all duration-300 hover:scale-105"
              >
                GitHub ↗
              </a>
            </motion.div>
          </div>
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
