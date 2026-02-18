import { motion } from "framer-motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { skillCategories } from "../constants";
import { styles } from "../styles";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";

// ─── Lookup maps with explicit fallbacks to avoid undefined at runtime ─────────
const categoryColors: Record<string, string> = {
  Languages:        "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  Frontend:         "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  Backend:          "from-green-500/20 to-emerald-500/20 border-green-500/30",
  Databases:        "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  "Tools & DevOps": "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  "Soft Skills":    "from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
};

const categoryIcons: Record<string, string> = {
  Languages:        "💻",
  Frontend:         "🎨",
  Backend:          "⚙️",
  Databases:        "🗄️",
  "Tools & DevOps": "🛠️",
  "Soft Skills":    "🌟",
};

// ─── Skill badge — isolated from parent stagger with its own motion scope ──────
const SkillBadge = ({ skill }: { skill: string }) => (
  <motion.span
    // `inherit: false` stops this span from re-running hidden→show on parent stagger
    // whileHover is a gesture, completely independent of the variant lifecycle
    whileHover={{ scale: 1.08, y: -2 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[13px] font-medium rounded-lg cursor-default hover:bg-[#915EFF]/30 hover:border-[#915EFF]/50"
    // Note: removed `transition-all duration-200` Tailwind class — it conflicts with
    // framer-motion's transform on the same element, causing jank on hover.
  >
    {skill}
  </motion.span>
);

// ─── Category card ─────────────────────────────────────────────────────────────
interface CategoryCardProps {
  category: string;
  skills: string[];
  index: number;
}

const CategoryCard = ({ category, skills, index }: CategoryCardProps) => {
  // Safe fallbacks so undefined never reaches className or JSX
  const colorClass = categoryColors[category] ?? "from-gray-500/20 to-slate-500/20 border-gray-500/30";
  const icon = categoryIcons[category] ?? "🔧";

  return (
    <motion.div
      variants={cardVariant(index)}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`bg-gradient-to-br ${colorClass} border rounded-2xl p-6 hover:shadow-lg hover:shadow-[#915EFF]/10 transition-shadow duration-300`}
      // Note: `hover:scale-[1.02]` Tailwind class removed — it conflicts with
      // framer-motion's whileHover scale transform on the same element.
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label={category}>{icon}</span>
        <h3 className="text-white font-bold text-[18px]">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Section ───────────────────────────────────────────────────────────────────
const Tech = () => {
  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        A comprehensive toolkit built through hands-on project development and continuous learning.
      </motion.p>

      {/*
        This is a plain div — intentional.
        The cards carry their own `variants` with explicit delays, so they animate
        correctly even without being direct motion children of the stagger container.
        Using a motion.div here would add an extra stagger layer that fights the
        card delays and causes double-animation.
      */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, index) => (
          <CategoryCard
            key={cat.category}
            category={cat.category}
            skills={cat.skills}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
