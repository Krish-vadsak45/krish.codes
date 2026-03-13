import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Zap } from "lucide-react";

import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeUp, fadeIn } from "../utils/variants";

const stats = [
  { value: "3+",   label: "Projects Built",  color: "from-[#915EFF]/15 to-purple-500/5 border-[#915EFF]/25" },
  { value: "200+", label: "LeetCode Solved", color: "from-blue-500/15 to-cyan-500/5 border-blue-500/25" },
  { value: "8.78", label: "CGPA / 10",       color: "from-emerald-500/15 to-teal-500/5 border-emerald-500/25" },
  { value: "Open", label: "To Work",         color: "from-amber-500/15 to-orange-500/5 border-amber-500/25" },
];

const services = [
  { icon: <Code2 size={15} />,      label: "Full Stack Development" },
  { icon: <Zap size={15} />,        label: "AI & LLM Integration" },
  { icon: <Briefcase size={15} />,  label: "Backend Architecture" },
];

const About = () => {
  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="mt-8 flex flex-col lg:flex-row gap-10 items-start"
      >
        {/* ── Left: Bio + Stats + Education ─── */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4 text-secondary text-[16.5px] leading-[1.8] max-w-2xl">
            <p>
              I'm{" "}
              <span className="text-white font-semibold">Krish Vadsak</span>, a passionate
              Computer Science student at{" "}
              <span className="text-[#915EFF] font-semibold">
                Sarvajanik College of Engineering & Technology
              </span>{" "}
              (CGPA: 8.78/10, 2023–2027). I specialize in building high-performance full-stack
              applications with{" "}
              <span className="text-white font-medium">React, Next.js, Node.js, and MongoDB</span>.
            </p>
            <p>
              I've shipped production systems with AI-driven query engines using{" "}
              <span className="text-white font-medium">LangChain & Groq</span>, fault-tolerant
              event queues via{" "}
              <span className="text-white font-medium">Inngest</span>, and scalable SaaS
              platforms with tiered Stripe billing. I've also solved{" "}
              <span className="text-[#915EFF] font-bold">200+ LeetCode problems</span> in C++.
            </p>
            <p>
              Currently open to{" "}
              <span className="text-white font-medium">internships and full-time roles</span>{" "}
              in Software Engineering, Full Stack, and Backend Development.
            </p>
          </div>

          {/* Stats grid */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
          >
            {stats.map(({ value, label, color }) => (
              <div
                key={label}
                className={`bg-gradient-to-br ${color} border rounded-2xl p-4 text-center group hover:scale-105 transition-all duration-300 cursor-default`}
              >
                <p className="text-white font-black text-[26px] leading-none group-hover:text-[#915EFF] transition-colors duration-300">
                  {value}
                </p>
                <p className="text-[#aaa6c3] text-[10px] uppercase tracking-wider mt-1.5 font-semibold leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Education card */}
          <motion.div
            variants={fadeUp}
            className="mt-5 bg-[#0d1130] rounded-2xl p-5 border border-white/8 max-w-xl hover:border-[#915EFF]/30 transition-colors duration-300 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/25 flex items-center justify-center group-hover:bg-[#915EFF]/25 transition-colors duration-300">
                <GraduationCap size={16} className="text-[#915EFF]" />
              </div>
              <span className="text-[#aaa6c3] text-[11px] uppercase tracking-widest font-bold">Education</span>
            </div>
            <h4 className="text-white font-bold text-[16px] leading-tight">
              B.Tech — Computer Science & Engineering
            </h4>
            <p className="text-[#aaa6c3] text-[13px] mt-1">
              Sarvajanik College of Engineering & Technology
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/6">
              <span className="text-[#915EFF] font-black text-[15px]">CGPA: 8.78 / 10</span>
              <span className="text-[#aaa6c3] text-[11px] bg-white/5 px-3 py-1 rounded-full">2023 – 2027</span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Availability + Services + Fact ─── */}
        <motion.div
          variants={fadeUp}
          className="w-full lg:w-[268px] shrink-0 space-y-4"
        >
          {/* Availability */}
          <div className="relative bg-[#0d1130] rounded-2xl p-5 border border-emerald-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/6 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">Available Now</span>
              </div>
              <p className="text-white font-semibold text-sm mb-2">Seeking roles in</p>
              <div className="space-y-1.5">
                {["Software Engineering", "Full Stack Development", "Backend Development"].map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-[#aaa6c3] text-xs">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-[#0d1130] rounded-2xl p-5 border border-white/8">
            <p className="text-[#aaa6c3] text-[11px] font-bold uppercase tracking-widest mb-4">What I Do</p>
            <div className="space-y-3">
              {services.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#915EFF]/10 border border-[#915EFF]/20 flex items-center justify-center text-[#915EFF] group-hover:bg-[#915EFF]/25 transition-colors duration-200 shrink-0">
                    {icon}
                  </div>
                  <span className="text-[#aaa6c3] text-sm font-medium group-hover:text-white transition-colors duration-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick fact */}
          <div className="bg-[#915EFF]/8 rounded-2xl p-5 border border-[#915EFF]/20">
            <p className="text-[#915EFF] text-[11px] font-bold uppercase tracking-widest mb-2">Quick Fact</p>
            <p className="text-[#dfd9ff] text-sm leading-relaxed">
              Solved <span className="font-black text-white">200+ LeetCode</span> problems in C++ — competitive edge on every backend algorithm I write.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
