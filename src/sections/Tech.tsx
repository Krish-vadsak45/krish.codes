import { motion } from "framer-motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { skillCategories } from "../constants";
import { styles } from "../styles";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";
import { Award, Briefcase, Zap, CheckCircle2 } from "lucide-react";

// ─── Lookup maps with explicit fallbacks ───────────────────────────────────────
const categoryColors: Record<string, string> = {
  Languages:        "from-purple-500/10 to-violet-500/10 border-purple-500/20",
  Frontend:         "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  Backend:          "from-green-500/10 to-emerald-500/10 border-green-500/20",
  Databases:        "from-orange-500/10 to-amber-500/10 border-orange-500/20",
  "Tools & DevOps": "from-pink-500/10 to-rose-500/10 border-pink-500/30",
  "AI & Automation": "from-indigo-500/10 to-blue-500/10 border-indigo-500/30",
};

const categoryIcons: Record<string, string> = {
  Languages:        "💻",
  Frontend:         "🎨",
  Backend:          "⚙️",
  Databases:        "🗄️",
  "Tools & DevOps": "🛠️",
  "AI & Automation": "🤖",
};

// ─── Detailed Skill Card ──────────────────────────────────────────────────────
const SkillCard = ({ skill }: { skill: any }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-black/20 border border-white/5 p-4 rounded-xl hover:border-[#915EFF]/40 hover:bg-[#915EFF]/5 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-[#915EFF] transition-colors">
        {skill.name}
      </h4>
      <div className="flex items-center gap-1">
        <Award size={12} className={skill.level === "Experienced" ? "text-[#915EFF]" : "text-secondary"} />
        <span className={`text-[10px] font-bold uppercase tracking-tighter ${skill.level === "Experienced" ? "text-[#915EFF]" : "text-secondary"}`}>
          {skill.level}
        </span>
      </div>
    </div>
    
    <p className="text-[#aaa6c3] text-[11px] leading-relaxed mb-3 line-clamp-2">
      {skill.description}
    </p>

    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
      <Briefcase size={10} className="text-secondary" />
      <span className="text-[10px] text-secondary font-medium italic truncate">
        Used in: {skill.project}
      </span>
    </div>
  </motion.div>
);

// ─── Category Section ──────────────────────────────────────────────────────────
const CategoryCard = ({ category, skills, index }: any) => {
  const colorClass = categoryColors[category] ?? "from-gray-500/20 to-slate-500/20 border-gray-500/30";
  const icon = categoryIcons[category] ?? "🔧";

  return (
    <motion.div
      variants={cardVariant(index)}
      className={`bg-gradient-to-br ${colorClass} border rounded-3xl p-6 sm:p-8 flex flex-col h-full`}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-black/30 flex items-center justify-center text-2xl shadow-inner" role="img" aria-label={`${category} icon`}>
          {icon}
        </div>
        <div>
          <h3 className="text-white font-black text-xl tracking-tight leading-none uppercase">{category}</h3>
          <div className="h-1 w-8 bg-[#915EFF] mt-2 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 flex-1">
        {skills.map((skill: any) => (
          <SkillCard key={skill.name} skill={skill} />
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
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I specialize in building production-ready systems using the MERN stack and Next.js, with a strong focus on 
        AI-driven automation, fault-tolerant backends, and high-performance frontend architectures.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat, index) => (
          <CategoryCard
            key={cat.category}
            category={cat.category}
            skills={cat.skills}
            index={index}
          />
        ))}
      </div>

      {/* Philosophy Callout */}
      <motion.div
        variants={fadeUp}
        className="mt-20 p-8 rounded-3xl bg-tertiary border border-white/5 flex flex-col lg:flex-row items-center gap-8"
      >
        <div className="shrink-0 w-20 h-20 rounded-full bg-[#915EFF]/10 flex items-center justify-center border border-[#915EFF]/20">
          <Zap className="text-[#915EFF]" size={32} />
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-white font-bold text-xl mb-2">My Engineering Philosophy</h3>
          <p className="text-secondary text-sm leading-relaxed max-w-3xl">
            I don't just "use" tools; I master them to solve specific business problems. Whether it's implementing 
            <span className="text-white font-semibold"> Type-Safe Distributed Systems</span> or building 
            <span className="text-white font-semibold"> Fault-Tolerant AI Pipelines</span>, my focus is always on 
            performance, scalability, and clean code.
          </p>
        </div>
        <div className="lg:ml-auto grid grid-cols-2 gap-4 shrink-0">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
            <CheckCircle2 size={14} aria-hidden="true" /> Production Ready
          </div>
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xs">
            <CheckCircle2 size={14} aria-hidden="true" /> Scalable Design
          </div>
          <div className="flex items-center gap-2 text-purple-500 font-bold text-xs">
            <CheckCircle2 size={14} aria-hidden="true" /> Security First
          </div>
          <div className="flex items-center gap-2 text-[#915EFF] font-bold text-xs">
            <CheckCircle2 size={14} aria-hidden="true" /> Performance Ops
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
