import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { cn } from "../utils/cn";
import { Menu, X, Code2 } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id, title }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(title);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300",
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Krish Vadsak - Back to home"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-[#915EFF] to-[#6b3fcf] rounded-full flex justify-center items-center text-white font-bold shadow-lg shadow-[#915EFF]/30 group-hover:scale-110 transition-transform duration-200">
            <Code2 size={18} />
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex items-center gap-1">
            Krish
            <span className="sm:block hidden text-[#915EFF]"> Vadsak</span>
          </p>
        </Link>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[17px] font-medium cursor-pointer transition-colors duration-200 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#915EFF] to-purple-400 transition-all duration-300 ${
                  active === nav.title ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              />
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setActive("Contact")}
              className="px-5 py-2 bg-[#915EFF] text-white text-[15px] font-bold rounded-xl hover:bg-[#7a4fd6] transition-all duration-300 hover:scale-105 shadow-md shadow-[#915EFF]/25"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
          >
            {toggle ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl border border-white/10`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white transition-colors duration-200`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li className="mt-2 w-full">
                <a
                  href="#contact"
                  onClick={() => { setToggle(false); setActive("Contact"); }}
                  className="block text-center w-full px-4 py-2 bg-[#915EFF] text-white text-[14px] font-bold rounded-xl hover:bg-[#7a4fd6] transition-all duration-300"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
