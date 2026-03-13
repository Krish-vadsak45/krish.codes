import { motion } from "framer-motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { skillCategories } from "../constants";
import { styles } from "../styles";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";
import { Briefcase, Zap, CheckCircle2 } from "lucide-react";

// ─── Per-category accent config ───────────────────────────────────────────────
const categoryConfig: Record<string, { gradient: string; border: string; accent: string; dot: string; icon: string }> = {
  Languages:         { gradient: "from-purple-500/10 to-violet-500/5",  border: "border-purple-500/20",  accent: "bg-[#915EFF]",    dot: "bg-[#915EFF]",    icon: "💻" },
  Frontend:          { gradient: "from-blue-500/10 to-cyan-500/5",      border: "border-blue-500/20",    accent: "bg-blue-400",     dot: "bg-blue-400",     icon: "🎨" },
  Backend:           { gradient: "from-emerald-500/10 to-green-500/5",  border: "border-emerald-500/20", accent: "bg-emerald-400",  dot: "bg-emerald-400",  icon: "⚙️" },
  Databases:         { gradient: "from-orange-500/10 to-amber-500/5",   border: "border-orange-500/20",  accent: "bg-orange-400",   dot: "bg-orange-400",   icon: "🗄️" },
  "Tools & DevOps":  { gradient: "from-pink-500/10 to-rose-500/5",      border: "border-pink-500/20",    accent: "bg-pink-400",     dot: "bg-pink-400",     icon: "🛠️" },
  "AI & Automation": { gradient: "from-indigo-500/10 to-blue-500/5",    border: "border-indigo-500/20",  accent: "bg-indigo-400",   dot: "bg-indigo-400",   icon: "🤖" },
};

const levelDots = { Experienced: 3, Intermediate: 2, Beginner: 1 } as const;

// ─── Skill Card ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill, dotColor }: { skill: any; dotColor: string }) => {
  const filled = levelDots[skill.level as keyof typeof levelDots] ?? 1;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="bg-black/25 border border-white/6 p-4 rounded-xl hover:border-white/15 hover:bg-white/4 transition-colors duration-300 group"
    >
      <div className="flex justify-between items-start mb-2.5">
        <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-white transition-colors leading-tight">
          {skill.name}
        </h4>
        {/* Level dots */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                n <= filled ? dotColor : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-[#aaa6c3] text-[11px] leading-relaxed mb-3 line-clamp-2">
        {skill.description}
      </p>

      <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
        <Briefcase size={9} className="text-white/30 shrink-0" />
        <span className="text-[10px] text-white/35 font-medium italic truncate">
          {skill.project}
        </span>
      </div>
    </motion.div>
  );
};

// ─── Category Card ────────────────────────────────────────────────────────────
const CategoryCard = ({ category, skills, index }: any) => {
  const cfg = categoryConfig[category] ?? {
    gradient: "from-gray-500/10 to-slate-500/5",
    border: "border-gray-500/20",
    accent: "bg-gray-400",
    dot: "bg-gray-400",
    icon: "🔧",
  };

  return (
    <motion.div
      variants={cardVariant(index)}
      className={`bg-linear-to-br ${cfg.gradient} ${cfg.border} border rounded-3xl p-6 flex flex-col h-full`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-black/30 flex items-center justify-center text-xl shadow-inner shrink-0" role="img" aria-label={`${category} icon`}>
          {cfg.icon}
        </div>
        <div>
          <h3 className="text-white font-black text-[15px] tracking-tight uppercase leading-none">{category}</h3>
          <div className={`h-0.5 w-6 ${cfg.accent} mt-1.5 rounded-full`} />
        </div>
        <span className="ml-auto text-[10px] text-white/25 font-semibold uppercase tracking-widest">
          {skills.length} skill{skills.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 gap-3 flex-1">
        {skills.map((skill: any) => (
          <SkillCard key={skill.name} skill={skill} dotColor={cfg.dot} />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const Tech = () => {
  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>Technical Proficiency</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-7.5"
      >
        I specialize in building production-ready systems using the MERN stack and Next.js, with a strong focus on
        AI-driven automation, fault-tolerant backends, and high-performance frontend architectures.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, index) => (
          <CategoryCard
            key={cat.category}
            category={cat.category}
            skills={cat.skills}
            index={index}
          />
        ))}
      </div>

      {/* Philosophy callout */}
      <motion.div
        variants={fadeUp}
        className="mt-16 p-7 rounded-3xl bg-[#0d1130] border border-white/6 flex flex-col lg:flex-row items-center gap-8"
      >
        <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#915EFF]/10 flex items-center justify-center border border-[#915EFF]/20">
          <Zap className="text-[#915EFF]" size={28} />
        </div>
        <div className="text-center lg:text-left flex-1">
          <h3 className="text-white font-bold text-lg mb-1.5">My Engineering Philosophy</h3>
          <p className="text-secondary text-sm leading-relaxed">
            I don't just "use" tools — I master them to solve specific business problems. Whether implementing{" "}
            <span className="text-white font-semibold">Type-Safe Distributed Systems</span> or building{" "}
            <span className="text-white font-semibold">Fault-Tolerant AI Pipelines</span>, my focus is always on
            performance, scalability, and clean code.
          </p>
        </div>
        <div className="lg:ml-auto grid grid-cols-2 gap-x-6 gap-y-3 shrink-0">
          {[
            { label: "Production Ready", color: "text-emerald-400" },
            { label: "Scalable Design",  color: "text-blue-400"    },
            { label: "Security First",   color: "text-purple-400"  },
            { label: "Performance Ops",  color: "text-[#915EFF]"   },
          ].map(({ label, color }) => (
            <div key={label} className={`flex items-center gap-2 ${color} font-bold text-xs`}>
              <CheckCircle2 size={13} aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
