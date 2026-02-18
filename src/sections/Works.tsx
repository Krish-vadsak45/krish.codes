import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar } from "lucide-react";

import { styles } from "../styles";
import { projects } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  gradient,
  emoji,
  period,
  source_code_link,
}: any) => {
  return (
    <motion.div variants={cardVariant(index)}>
      <Tilt
        options={{ max: 15, scale: 1.02, speed: 400 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[380px] w-full border border-white/5 hover:border-[#915EFF]/40 transition-all duration-300"
      >
        {/* Project visual */}
        <div
          className={`relative w-full h-[200px] bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/5 blur-sm" />
          <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/5 blur-md" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 blur-lg" />
          <span className="text-7xl z-10 drop-shadow-2xl">{emoji}</span>

          <div className="absolute inset-0 flex justify-end items-start m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <Github className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-[#aaa6c3]" />
            <span className="text-[#aaa6c3] text-[12px]">{period}</span>
          </div>
          <h3 className="text-white font-bold text-[22px] leading-tight">{name}</h3>
          <p className="mt-3 text-secondary text-[14px] leading-[22px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] px-3 py-1 rounded-full bg-white/5 border border-white/10 ${tag.color} font-medium`}
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center gap-2 text-[#915EFF] text-[13px] font-semibold hover:text-white transition-colors duration-200 group"
          >
            <Github size={14} />
            View on GitHub
            <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Here are my key projects that showcase my skills in full-stack development, AI
        integration, and scalable system design. Each project is built with production-ready
        architecture and real-world problem solving.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* LeetCode callout */}
      <motion.div
        variants={fadeUp}
        className="mt-16 bg-tertiary rounded-2xl p-6 border border-[#915EFF]/30 max-w-2xl mx-auto text-center"
      >
        <div className="text-4xl mb-3">⚡</div>
        <h3 className="text-white font-bold text-[20px]">LeetCode Achiever</h3>
        <p className="text-secondary text-[15px] mt-2 leading-[26px]">
          Solved <span className="text-[#915EFF] font-bold text-[20px]">200+</span> problems on
          LeetCode using C++, strengthening algorithmic thinking and problem-solving skills across
          data structures, dynamic programming, and graph algorithms.
        </p>
        <a
          href="https://leetcode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-[#915EFF]/20 border border-[#915EFF]/40 text-[#915EFF] rounded-xl text-[14px] font-semibold hover:bg-[#915EFF]/30 transition-all duration-200"
        >
          View LeetCode Profile <ExternalLink size={14} />
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
