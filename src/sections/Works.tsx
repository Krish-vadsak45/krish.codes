import { useState } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Calendar, X, Rocket, Zap, Brain, Shield, ArrowRight } from "lucide-react";

import { styles } from "../styles";
import { projects } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";

const CaseStudyModal = ({ project, onClose }: any) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-[#050816] border border-[#915EFF]/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`relative h-48 sm:h-64 bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-end`}>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-7xl" role="img" aria-hidden="true">{project.emoji}</span>
            <div>
              <h2 id="modal-title" className="text-white font-black text-2xl sm:text-4xl">{project.name}</h2>
              <p className="text-white/80 font-medium text-sm sm:text-base mt-1">{project.period}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#915EFF] font-bold uppercase tracking-wider text-xs">
                <Brain size={14} /> The Problem
              </div>
              <p className="text-secondary leading-relaxed">{project.problem_statement}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#915EFF] font-bold uppercase tracking-wider text-xs">
                <Shield size={14} /> Role & Stack
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech_stack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#915EFF] rounded-lg text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-secondary italic">Role: {project.role}</p>
            </div>
          </div>

          {/* Architecture Flow */}
          <div className="bg-tertiary/50 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-[#915EFF] font-bold uppercase tracking-wider text-xs mb-6">
              <Zap size={14} /> Engineering Flow
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              {project.architecture_flow.split(" -> ").map((step: string, i: number, arr: any[]) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="bg-[#1d1836] px-4 py-2 rounded-xl border border-white/10 text-white text-sm font-medium shadow-lg shadow-black/20">
                    {step}
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={16} className="text-[#915EFF] animate-pulse" />}
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Decisions */}
          <div>
            <div className="flex items-center gap-2 text-[#915EFF] font-bold uppercase tracking-wider text-xs mb-4">
              <Rocket size={14} /> Key Engineering Decisions
            </div>
            <ul className="space-y-4">
              {project.key_decisions.map((decision: string, i: number) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#915EFF]/20 flex items-center justify-center text-[#915EFF] text-xs font-bold group-hover:bg-[#915EFF] group-hover:text-white transition-all duration-300">
                    {i + 1}
                  </span>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">{decision}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact/Metrics */}
          <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-wider text-xs mb-4">
              <Zap size={14} /> Impact & Metrics
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.impact.map((metric: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-black/20 p-4 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                  <p className="text-secondary text-sm font-medium">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
            <button
              onClick={() => window.open(project.source_code_link, "_blank")}
              aria-label={`View source code for ${project.name} on GitHub`}
              className="flex items-center gap-2 px-6 py-3 bg-[#1d1836] text-white rounded-xl font-bold hover:bg-[#2a244d] transition-all"
            >
              <Github size={18} /> GitHub Repo
            </button>
            <button
              onClick={() => window.open(project.live_link, "_blank")}
              aria-label={`View live demo for ${project.name}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#915EFF] text-white rounded-xl font-bold hover:bg-[#7a4fd6] transition-all shadow-lg shadow-[#915EFF]/20"
            >
              <ExternalLink size={18} /> Live Demo
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  gradient,
  emoji,
  period,
  onOpenCaseStudy,
}: any) => {
  return (
    <motion.div variants={cardVariant(index)}>
      <Tilt
        options={{ max: 15, scale: 1.02, speed: 400 }}
        className="bg-tertiary p-5 rounded-3xl sm:w-[380px] w-full border border-white/5 hover:border-[#915EFF]/40 transition-all duration-300 group flex flex-col h-full will-change-transform"
      >
        {/* Project visual */}
        <div
          className={`relative w-full h-[200px] bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer shadow-inner`}
          onClick={onOpenCaseStudy}
          role="button"
          aria-label={`Open case study for ${name}`}
        >
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/5 blur-sm" />
          <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/5 blur-md" />
          <span className="text-7xl z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300" role="img" aria-hidden="true">{emoji}</span>
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold px-6 py-2 border border-white rounded-full bg-white/10 backdrop-blur-sm">
              Read Case Study
            </span>
          </div>
        </div>

        <div className="mt-5 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-[#aaa6c3]" />
            <span className="text-[#aaa6c3] text-[12px]">{period}</span>
          </div>
          <h3 className="text-white font-bold text-[22px] leading-tight group-hover:text-[#915EFF] transition-colors">{name}</h3>
          <p className="mt-3 text-secondary text-[14px] leading-[22px] line-clamp-3">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 ${tag.color} font-semibold`}
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onOpenCaseStudy}
            aria-label={`Engineering story for ${name}`}
            className="w-full py-3 bg-[#915EFF]/10 border border-[#915EFF]/30 text-[#915EFF] rounded-xl text-[14px] font-bold hover:bg-[#915EFF] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            Engineering Story <ArrowRight size={14} />
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={`${styles.sectionSubText}`}>Engineering Portfolio</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I don't just build UI; I solve complex engineering challenges. Below are case studies detailing 
        the architecture, key decisions, and measurable impact of my flagship applications.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index} 
            {...project} 
            onOpenCaseStudy={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* LeetCode callout */}
      <motion.div
        variants={fadeUp}
        className="mt-24 relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#915EFF] to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-tertiary rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 text-left">
          <div className="text-6xl bg-black/20 p-6 rounded-2xl">⚡</div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-[24px]">Algorithmic Mastery</h3>
            <p className="text-secondary text-[16px] mt-2 leading-[28px]">
              Solved <span className="text-[#915EFF] font-black text-[22px]">200+</span> problems on
              LeetCode using C++, focusing on optimization and algorithmic efficiency. This foundation 
              allows me to write high-performance backend logic and complex frontend data transformations.
            </p>
          </div>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 bg-[#915EFF] text-white rounded-xl font-bold hover:bg-[#7a4fd6] transition-all flex items-center gap-2 shadow-lg shadow-[#915EFF]/20"
          >
            LeetCode Profile <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
