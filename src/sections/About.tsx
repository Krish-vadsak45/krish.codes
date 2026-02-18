import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Code, Database, Smartphone, Lightbulb } from "lucide-react";

import { styles } from "../styles";
import { services } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeUp, fadeIn, cardVariant } from "../utils/variants";

const iconMap: Record<string, React.ReactNode> = {
  web: <Code size={48} className="text-white" />,
  mobile: <Smartphone size={48} className="text-white" />,
  backend: <Database size={48} className="text-white" />,
  creator: <Lightbulb size={48} className="text-white" />,
};

interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={cardVariant(index)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col hover:bg-[#1d1836] transition-colors duration-300">
        {iconMap[icon]}
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="mt-6 flex flex-col lg:flex-row gap-8 items-start"
      >
        {/* Bio */}
        <div className="flex-1">
          <p className="text-secondary text-[17px] max-w-3xl leading-[30px]">
            I'm <span className="text-white font-semibold">Krish Vadsak</span>, a passionate
            Computer Science student at{" "}
            <span className="text-[#915EFF] font-semibold">
              Sarvajanik College of Engineering & Technology
            </span>{" "}
            (CGPA: 8.78/10, 2023–2027). I specialize in building high-performance full-stack
            applications with modern technologies like{" "}
            <span className="text-white font-semibold">
              React, Next.js, Node.js, and MongoDB
            </span>
            .
          </p>
          <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
            I've built production-ready systems featuring AI-driven query engines with{" "}
            <span className="text-white font-semibold">LangChain & Groq</span>, fault-tolerant
            backends with <span className="text-white font-semibold">Inngest</span>, and scalable
            SaaS platforms with tiered billing. I've also solved{" "}
            <span className="text-[#915EFF] font-bold">200+ LeetCode problems</span> in C++,
            strengthening my algorithmic thinking.
          </p>
          <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
            I'm open to{" "}
            <span className="text-white font-semibold">
              internships and full-time roles
            </span>{" "}
            in Software Engineering, Full Stack Development, and Backend Development.
          </p>

          {/* Education card */}
          <motion.div
            variants={fadeUp}
            className="mt-6 bg-tertiary rounded-2xl p-5 border border-[#915EFF]/30 max-w-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#915EFF]" />
              <span className="text-[#aaa6c3] text-sm uppercase tracking-wider">Education</span>
            </div>
            <h4 className="text-white font-bold text-[18px]">
              B.Tech – Computer Science & Engineering
            </h4>
            <p className="text-[#aaa6c3] text-[14px] mt-1">
              Sarvajanik College of Engineering & Technology
            </p>
            <div className="flex justify-between mt-3">
              <span className="text-[#915EFF] font-bold text-[16px]">CGPA: 8.78 / 10</span>
              <span className="text-[#aaa6c3] text-[14px]">2023 – 2027</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Cards */}
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
