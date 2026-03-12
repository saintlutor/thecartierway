import React from "react";
import { motion } from "framer-motion";
import { Mail, ShoppingBag, Store } from "lucide-react";

const steps = [
  {
    icon: Mail,
    number: "01",
    title: "Daily Gift Cards at 8:00 AM",
    description: "Monday to Thursday, you'll receive 4 Apple Gift Cards directly to your email at exactly 8:00 AM. Each card is rendered with credit profiles based on your chosen balance.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Place Orders on Apple.com",
    description: "Use your digital gift codes to check out on Apple.com. Orders must be placed for in-store collection only — the system directs you to your nearest Apple Store automatically.",
  },
  {
    icon: Store,
    number: "03",
    title: "Collect & Resell for Profit",
    description: "Collect your products from the Apple Store, then resell through our network of 16 affiliated retail shops across the UK. You keep 70% — paid cash in hand at the till.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-28 md:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0076DF" }}>How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            How The Apple Print Works
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            A simple, repeatable weekly cycle — Monday to Thursday, every week
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative"
            >
              <div
                className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,118,223,0.15)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#f3f4f6"}
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-[2.75rem] -right-4 w-8 h-px z-10"
                    style={{ background: "linear-gradient(90deg, #e5e7eb, rgba(0,118,223,0.2))" }} />
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: "rgba(0,118,223,0.08)" }}>
                    <step.icon className="w-5 h-5" style={{ color: "#0076DF" }} />
                  </div>
                  <span className="text-5xl font-bold text-black select-none">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resale network callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 rounded-2xl p-8 border"
          style={{ background: "rgba(0,118,223,0.03)", borderColor: "rgba(0,118,223,0.12)" }}
        >
          <div className="text-center mb-6">
            <p className="font-semibold text-gray-900 text-lg">Our UK Resale Network — 16 Affiliated Shops</p>
            <p className="text-gray-400 text-sm mt-1">70% profit split, paid cash in hand at the till</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm text-gray-600">
            {[
              "📍 London — Newham", "📍 London — Shepherd's Bush", "📍 London — Edmonton",
              "📍 Birmingham — Solihull", "📍 Birmingham — Jewellery Quarter",
              "📍 Manchester — Oldham", "📍 Manchester — Rusholme", "📍 Manchester — Deansgate",
              "📍 Liverpool — City Centre", "📍 Liverpool — Mossley Hill",
              "📍 Leicester — Clarendon Park", "📍 Leicester — Evington",
              "📍 Leeds — Armley",
              "📍 Scotland — Edinburgh", "📍 Scotland — Aberdeen", "📍 Scotland — Glasgow",
            ].map((loc, i) => (
              <div key={i} className="bg-white rounded-lg px-3 py-2 border border-gray-100 text-xs text-gray-500 font-medium">
                {loc}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}