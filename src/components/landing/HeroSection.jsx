import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, CheckCircle, Gift, Phone } from "lucide-react";

const stats = [
  { icon: Users, value: "775+", label: "Verified Users" },
  { icon: CheckCircle, value: "4+ Years", label: "Operating Successfully" },
  { icon: Gift, value: "100%", label: "Success Rate" },
  { icon: Phone, value: "1-on-1", label: "Personal Strategy Calls" },
];

export default function HeroSection({ onBookCall }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,118,223,0.08) 0%, transparent 70%)' }} />
      </motion.div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,118,223,0.05) 0%, transparent 70%)' }}
      />

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-6 text-center pt-24 pb-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
              style={{ borderColor: 'rgba(0,118,223,0.25)', backgroundColor: 'rgba(0,118,223,0.08)' }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#0076DF' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#0076DF' }}>
                Trusted by Hundreds
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.02]"
          >
            The Apple Print
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
          >
            A streamlined system to generate real income through the strategic use of Apple Gift Cards — collected directly from Apple Stores and resold through our UK retail network.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-sm md:text-base text-white/60 font-medium"
          >
            4+ years proven. 185+ verified users. 100% success rate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={onBookCall}
              className="px-8 py-3.5 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] text-sm"
              style={{ backgroundColor: '#0076DF', boxShadow: '0 8px 32px rgba(0,118,223,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0066c5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0076DF'}
            >
              Book Your Call Now
            </button>
            <button
              onClick={() => document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-white/60 hover:text-white font-medium rounded-full transition-all duration-300 text-sm border border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              View Plans
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto px-6 pb-24 mt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center py-8 px-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 group"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: 'rgba(0,118,223,0.1)' }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: '#0076DF' }} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs text-white/35 mt-1 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}