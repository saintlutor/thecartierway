import React from "react";
import { motion } from "framer-motion";
import { Shield, Store, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Success Rate",
    description: "Never had a single gift card fail. Every code works perfectly on Apple's official platforms.",
  },
  {
    icon: Store,
    title: "Walk-In Apple Store",
    description: "Completely legitimate process — walk into any Apple Store worldwide and collect with zero issues.",
  },
  {
    icon: Clock,
    title: "4+ Years Operation",
    description: "The original Apple gift card generation system, refined and perfected over years of operation.",
  },
  {
    icon: Users,
    title: "3000+ Verified Users",
    description: "Join 185+ verified users who have successfully used our system to legally obtain Apple products.",
  },
];

export default function TrustSection({ onBookCall }) {
  return (
    <section className="py-28 md:py-40 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#0076DF' }}>Trust</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Why CEO Is The Most Trusted
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            4+ years of proven success and thousands of satisfied users
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex gap-5 p-7 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(0,118,223,0.08)' }}
              >
                <feat.icon className="w-5 h-5" style={{ color: '#0076DF' }} />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold mb-1.5">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-[#0a0a0a] rounded-3xl p-10 md:p-16 text-center"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,118,223,0.12) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-5 tracking-tight">
              100% Legitimate & Trusted for 4+ Years
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm leading-relaxed mb-8 font-light">
              CEO are the original creators of the Apple gift card generation system. 
              With over 185 verified users and 4+ years of successful operation, our track record 
              speaks for itself. Every gift card generated has a 100% success rate.
            </p>
            <button
              onClick={onBookCall}
              className="px-8 py-3.5 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] text-sm"
              style={{ backgroundColor: '#0076DF', boxShadow: '0 8px 32px rgba(0,118,223,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0066c5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0076DF'}
            >
              Book Your Strategy Call Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}