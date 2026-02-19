import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send, Linkedin } from "lucide-react";

import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import EarthCanvas from "../components/canvas/Earth";
import { fadeUp, slideLeft, slideRight } from "../utils/variants";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Thank you! I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <>
      <motion.div variants={fadeUp}>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
      </motion.div>

      <div className="mt-10 xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        <motion.div
          variants={slideLeft}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/5"
        >
          {/* Contact info */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { icon: <Mail size={16} className="text-[#915EFF]" />, label: "krishvadsak234@gmail.com", href: "mailto:krishvadsak234@gmail.com" },
              { icon: <Phone size={16} className="text-[#915EFF]" />, label: "+91 6354905340", href: "tel:+916354905340" },
              { icon: <MapPin size={16} className="text-[#915EFF]" />, label: "Surat, Gujarat, India", href: undefined },
              { icon: <Github size={16} className="text-[#915EFF]" />, label: "github.com/krish-vadsak45", href: "https://github.com/krish-vadsak45" },
              { icon: <Linkedin size={16} className="text-[#915EFF]" />, label: "linkedin.com/in/krish-vadsak-a5bab427b", href: "https://www.linkedin.com/in/krish-vadsak-a5bab427b" },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-secondary hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#915EFF]/20 flex items-center justify-center group-hover:bg-[#915EFF]/40 transition-colors duration-200 shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[14px]">{item.label}</span>
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3 text-secondary">
                  <div className="w-8 h-8 rounded-full bg-[#915EFF]/20 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[14px]">{item.label}</span>
                </div>
              )
            )}
          </div>

          <div className="border-t border-white/10 mb-6" />

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-[#915EFF]/60 font-medium transition-colors duration-200"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                required
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-[#915EFF]/60 font-medium transition-colors duration-200"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Your Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to say?"
                required
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-[#915EFF]/60 font-medium transition-colors duration-200 resize-none"
              />
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#915EFF] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-[#915EFF]/30 hover:bg-[#7a4fd6] hover:scale-105 transition-all duration-300"
            >
              {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideRight}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
