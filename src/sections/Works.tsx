/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useCallback } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Github,
  ExternalLink,
  Calendar,
  X,
  Rocket,
  Zap,
  Brain,
  Shield,
  ArrowRight,
  Layers,
  Quote,
  ChevronRight,
} from "lucide-react";

import { styles } from "../styles";
import { projects } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";

/* ─── Types ────────────────────────────────────────────────────────── */
interface Tag {
  name: string;
  color: string;
}

interface Project {
  name: string;
  description: string;
  problem_statement: string;
  role: string;
  tech_stack: string[];
  architecture_flow: string;
  key_decisions: string[];
  impact: string[];
  tags: Tag[];
  gradient: string;
  emoji: string;
  period: string;
  source_code_link: string;
  live_link?: string;
  portfolio_summary?: string;
}

/* ─── Animation variants ──────────────────────────────────────────── */
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 28, stiffness: 320, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] },
  },
  exit: { opacity: 0, x: -12, transition: { duration: 0.15 } },
};

const staggerList: Variants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
};

/* ─── Tab definitions ─────────────────────────────────────────────── */
const TABS = [
  { id: "overview", label: "Overview", icon: Brain },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "decisions", label: "Engineering", icon: Rocket },
  { id: "impact", label: "Impact", icon: Zap },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ─── Modal component ─────────────────────────────────────────────── */
const CaseStudyModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  /* Keyboard + scroll-lock */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* Reset tab when project changes */
  useEffect(() => {
    setActiveTab("overview");
  }, [project?.name]);

  const architectureSteps: string[] = project.architecture_flow.split(" -> ");

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-[#060a1a] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Gradient banner header ─────────────────────────── */}
        <div
          className={`relative shrink-0 h-44 sm:h-56 bg-gradient-to-br ${project.gradient} overflow-hidden`}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-black/20 blur-xl" />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            aria-label="Close modal"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-9 h-9 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
          >
            <X size={18} className="text-white" />
          </motion.button>

          {/* Project identity */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end gap-4">
              <span
                className="text-5xl sm:text-6xl drop-shadow-2xl leading-none"
                role="img"
                aria-hidden="true"
              >
                {project.emoji}
              </span>
              <div className="mb-0.5">
                <h2
                  id="modal-title"
                  className="text-white font-black text-2xl sm:text-3xl leading-tight"
                >
                  {project.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={12} className="text-white/60" />
                  <span className="text-white/60 text-xs font-medium">
                    {project.period}
                  </span>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/60 text-xs font-medium">
                    {project.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab bar ────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center gap-1 px-4 sm:px-6 py-3 border-b border-white/8 bg-[#060a1a] overflow-x-auto scrollbar-none">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-white bg-[#915EFF]/20 border border-[#915EFF]/40"
                    : "text-[#aaa6c3] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={13} />
                {label}
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Scrollable tab content ─────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#915EFF #060a1a" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-5 sm:p-8"
            >
              {/* ── OVERVIEW tab ────────────────────────────── */}
              {activeTab === "overview" && (
                <motion.div
                  variants={staggerList}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Problem */}
                  <motion.div
                    variants={listItem}
                    className="bg-[#915EFF]/5 border border-[#915EFF]/15 rounded-2xl p-5"
                  >
                    <p className="text-[#915EFF] font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Brain size={12} /> The Problem
                    </p>
                    <p className="text-secondary text-sm leading-relaxed">
                      {project.problem_statement}
                    </p>
                  </motion.div>

                  {/* Role badge */}
                  <motion.div
                    variants={listItem}
                    className="flex items-center gap-3"
                  >
                    <span className="px-4 py-1.5 bg-[#1d1836] border border-white/10 text-white text-xs font-bold rounded-full">
                      {project.role}
                    </span>
                    <span className="text-[#aaa6c3] text-xs">
                      {project.period}
                    </span>
                  </motion.div>

                  {/* Tech stack */}
                  <motion.div variants={listItem}>
                    <p className="text-[#915EFF] font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Shield size={12} /> Technology Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-[#915EFF]/10 border border-[#915EFF]/20 text-[#915EFF] rounded-lg text-[11px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* TL;DR */}
                  {project.portfolio_summary && (
                    <motion.div
                      variants={listItem}
                      className="bg-white/3 border border-white/8 rounded-2xl p-5"
                    >
                      <p className="text-[#915EFF] font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Quote size={12} /> Engineering TL;DR
                      </p>
                      <p className="text-[#dfd9ff] text-sm leading-relaxed italic">
                        "{project.portfolio_summary}"
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── ARCHITECTURE tab ─────────────────────────── */}
              {activeTab === "architecture" && (
                <motion.div
                  variants={staggerList}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  <motion.p
                    variants={listItem}
                    className="text-secondary text-sm leading-relaxed"
                  >
                    Step-by-step data and control flow through the system — from
                    user action to infrastructure response.
                  </motion.p>
                  <motion.div variants={listItem} className="space-y-2">
                    {architectureSteps.map((step: string, i: number) => (
                      <motion.div
                        key={`${step}-${i}`}
                        variants={listItem}
                        className="flex items-start gap-3 group"
                      >
                        {/* Step number */}
                        <div className="shrink-0 w-7 h-7 rounded-full bg-[#915EFF]/15 border border-[#915EFF]/30 flex items-center justify-center text-[#915EFF] text-[11px] font-black mt-0.5 group-hover:bg-[#915EFF] group-hover:text-white transition-all duration-200">
                          {i + 1}
                        </div>

                        {/* Step box */}
                        <div className="flex-1 bg-[#0d1130] border border-white/8 rounded-xl px-4 py-3 group-hover:border-[#915EFF]/30 transition-colors duration-200">
                          <p className="text-white text-sm font-medium leading-relaxed">
                            {step}
                          </p>
                        </div>

                        {/* Arrow connector */}
                        {i < architectureSteps.length - 1 && (
                          <div
                            className="absolute left-[13px] mt-8 w-px h-2 bg-[#915EFF]/30"
                            aria-hidden="true"
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* ── DECISIONS tab ────────────────────────────── */}
              {activeTab === "decisions" && (
                <motion.div
                  variants={staggerList}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {project.key_decisions.map((decision: string, i: number) => (
                    <motion.div
                      key={decision}
                      variants={listItem}
                      className="flex gap-4 p-4 bg-[#0d1130] border border-white/6 rounded-2xl hover:border-[#915EFF]/25 transition-colors duration-300 group"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-full bg-[#915EFF]/15 border border-[#915EFF]/30 flex items-center justify-center text-[#915EFF] text-[11px] font-black mt-0.5 group-hover:bg-[#915EFF] group-hover:text-white transition-all duration-300">
                        {i + 1}
                      </div>
                      <p className="text-secondary text-sm leading-relaxed">
                        {decision}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* ── IMPACT tab ───────────────────────────────── */}
              {activeTab === "impact" && (
                <motion.div
                  variants={staggerList}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {project.impact.map((metric: string, i: number) => (
                    <motion.div
                      key={metric}
                      variants={listItem}
                      className="flex items-start gap-4 p-4 bg-emerald-500/5 border border-emerald-500/12 rounded-2xl hover:border-emerald-500/30 transition-colors duration-300"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <p className="text-secondary text-sm leading-relaxed font-medium">
                        {metric}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Sticky action footer ───────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-t border-white/8 bg-[#060a1a]">
          {/* Tab progress dots */}
          <div className="flex gap-1.5">
            {TABS.map(({ id }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-label={`Switch to ${id} tab`}
                className={`rounded-full transition-all duration-300 ${
                  activeTab === id
                    ? "w-5 h-2 bg-[#915EFF]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.name}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
            >
              <Github size={16} /> Code
            </a>
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.name}`}
                className="flex items-center gap-2 px-4 py-2 bg-[#915EFF] hover:bg-[#7a4fd6] text-white rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-[#915EFF]/25"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Project card ────────────────────────────────────────────────── */
interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: Tag[];
  gradient: string;
  emoji: string;
  period: string;
  onOpenCaseStudy: () => void;
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  gradient,
  emoji,
  period,
  onOpenCaseStudy,
}: ProjectCardProps) => (
  <motion.div variants={cardVariant(index)}>
    <Tilt
      options={{ max: 12, scale: 1.02, speed: 400 }}
      className="bg-tertiary p-5 rounded-3xl sm:w-[370px] w-full border border-white/5 hover:border-[#915EFF]/40 transition-all duration-300 group flex flex-col h-full will-change-transform"
    >
      {/* Visual banner */}
      <button
        className={`relative w-full h-50 bg-linear-to-br ${gradient} rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer shadow-inner`}
        onClick={onOpenCaseStudy}
        aria-label={`Open case study for ${name}`}
        onKeyDown={(e) => e.key === "Enter" && onOpenCaseStudy()}
      >
        <div className="absolute top-3 left-3 w-20 h-20 rounded-full bg-white/8 blur-xl" />
        <div className="absolute bottom-3 right-3 w-28 h-28 rounded-full bg-black/20 blur-2xl" />
        <span
          className="text-7xl z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
          role="img"
          aria-hidden="true"
        >
          {emoji}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6">
          <span className="flex items-center gap-2 text-white font-bold text-sm px-5 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
            Read Case Study <ChevronRight size={14} />
          </span>
        </div>
      </button>

      {/* Content */}
      <div className="mt-5 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={13} className="text-[#aaa6c3]" />
          <span className="text-[#aaa6c3] text-[12px]">{period}</span>
        </div>
        <h3 className="text-white font-bold text-[21px] leading-tight group-hover:text-[#915EFF] transition-colors duration-200">
          {name}
        </h3>
        <p className="mt-2.5 text-secondary text-[13.5px] leading-[21px] line-clamp-3">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${name}-${tag.name}`}
            className={`text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/8 ${tag.color} font-semibold`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onOpenCaseStudy}
        aria-label={`Engineering story for ${name}`}
        whileTap={{ scale: 0.97 }}
        className="mt-5 w-full py-3 bg-[#915EFF]/10 border border-[#915EFF]/30 text-[#915EFF] rounded-xl text-[13.5px] font-bold hover:bg-[#915EFF] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
      >
        Engineering Story <ArrowRight size={14} />
      </motion.button>
    </Tilt>
  </motion.div>
);

/* ─── Section ─────────────────────────────────────────────────────── */
const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>Engineering Portfolio</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I don't just build UI — I solve complex engineering challenges. Below
        are case studies detailing the architecture, key decisions, and
        measurable impact of my flagship applications.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            index={index}
            {...project}
            onOpenCaseStudy={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>

      {/* LeetCode callout */}
      <motion.div variants={fadeUp} className="mt-24 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#915EFF] to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-tertiary rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 text-left">
          <div className="text-6xl bg-black/20 p-6 rounded-2xl">⚡</div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-[24px]">
              Algorithmic Mastery
            </h3>
            <p className="text-secondary text-[16px] mt-2 leading-[28px]">
              Solved{" "}
              <span className="text-[#915EFF] font-black text-[22px]">
                200+
              </span>{" "}
              problems on LeetCode using C++, focusing on optimization and
              algorithmic efficiency. This foundation allows me to write
              high-performance backend logic and complex frontend data
              transformations.
            </p>
          </div>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 bg-[#915EFF] text-white rounded-xl font-bold hover:bg-[#7a4fd6] transition-all flex items-center gap-2 shadow-lg shadow-[#915EFF]/20 hover:scale-105"
          >
            LeetCode Profile <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
