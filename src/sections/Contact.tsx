import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";

import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import EarthCanvas from "../components/canvas/Earth";
import { fadeUp, slideLeft, slideRight } from "../utils/variants";

type FormStatus = "idle" | "loading" | "success" | "error";

const contactItems = [
  { icon: Mail,     label: "krishvadsak234@gmail.com",                      href: "mailto:krishvadsak234@gmail.com" },
  { icon: Phone,    label: "+91 6354905340",                                href: "tel:+916354905340" },
  { icon: MapPin,   label: "Surat, Gujarat, India",                         href: undefined },
  { icon: Github,   label: "github.com/krish-vadsak45",                     href: "https://github.com/krish-vadsak45" },
  { icon: Linkedin, label: "linkedin.com/in/krish-vadsak-a5bab427b",        href: "https://www.linkedin.com/in/krish-vadsak-a5bab427b" },
];

const inputClass =
  "bg-[#0d1130] py-4 px-5 placeholder:text-white/25 text-white rounded-xl outline-none border border-white/8 focus:border-[#915EFF]/50 focus:ring-1 focus:ring-[#915EFF]/20 font-medium transition-all duration-200 w-full";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
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
        {/* ── Form panel ── */}
        <motion.div
          variants={slideLeft}
          className="flex-[0.75] bg-[#0d1130] p-8 rounded-2xl border border-white/6"
        >
          {/* Contact info */}
          <div className="flex flex-col gap-2.5 mb-6">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <div className="w-8 h-8 rounded-xl bg-[#915EFF]/15 flex items-center justify-center shrink-0 group-hover:bg-[#915EFF]/30 transition-colors duration-200">
                    <Icon size={15} className="text-[#915EFF]" />
                  </div>
                  <span className="text-[13px] truncate">{item.label}</span>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#aaa6c3] hover:text-white transition-colors duration-200 group"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3 text-[#aaa6c3] group">
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/6 mb-6" />

          {/* Inline feedback */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-medium overflow-hidden"
              >
                <CheckCircle2 size={17} className="shrink-0" />
                Thanks! I'll get back to you as soon as possible.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-medium overflow-hidden"
              >
                <AlertCircle size={17} className="shrink-0" />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-white/80 text-sm font-semibold">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white/80 text-sm font-semibold">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                required
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white/80 text-sm font-semibold">Your Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to say?"
                required
                className={`${inputClass} resize-none`}
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full flex items-center justify-center gap-2 bg-[#915EFF] py-3.5 px-8 rounded-xl text-white font-bold shadow-lg shadow-[#915EFF]/20 hover:bg-[#7a4fd6] hover:shadow-[#915EFF]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[#915EFF]/20"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={16} /> Sent!
                </>
              ) : (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* ── Earth canvas ── */}
        <motion.div
          variants={slideRight}
          className="xl:flex-1 xl:h-auto md:h-137.5 h-87.5"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
