import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Process", href: "#process" },
  { label: "Plans", href: "#plans" },
  { label: "Results", href: "#results" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onBookCall }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("#home")} className="flex items-center">
          <span className="text-white font-semibold text-lg tracking-tight">
            The Apple Print
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-light"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={onBookCall}
            className="px-5 py-2 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: '#0076DF' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0066c5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0076DF'}
          >
            Book Your Call
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 hover:text-white"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-3 py-2.5 text-white/70 hover:text-white text-sm rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onBookCall(); }}
                className="w-full mt-3 px-5 py-2.5 text-white text-sm font-medium rounded-full"
                style={{ backgroundColor: '#0076DF' }}
              >
                Book Your Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}