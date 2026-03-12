import React from "react";
import { motion } from "framer-motion";

const images = [
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ab42c08963ba746faca2a9/398457356_IMG_9380.jpg",
    caption: "4 iPhones collected in a single week",
    tag: "Weekly Collection",
  },
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ab42c08963ba746faca2a9/b8b5bccfa_IMG_9381.jpg",
    caption: "Multiple MacBooks collected from the Apple Store",
    tag: "Apple Store Haul",
  },
  {
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ab42c08963ba746faca2a9/0fc778a22_IMG_9382.jpg",
    caption: "Cash earnings + iPhones — a typical Thursday resale",
    tag: "Resale Profits",
  },
];

export default function StoriesSection() {
  return (
    <section id="stories" className="py-28 md:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0076DF" }}>Proof</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Real Results. Real Collections.
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            These aren't stock photos — these are from our actual users collecting from Apple Stores
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-2xl overflow-hidden bg-gray-100"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ background: "rgba(0,118,223,0.85)", color: "#fff" }}
                >
                  {img.tag}
                </div>
                <p className="text-white text-sm font-medium leading-snug">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm">
            Monday–Thursday: collect from Apple Store &nbsp;·&nbsp; Thursday–Sunday: resell through our network &nbsp;·&nbsp; <span className="font-semibold text-gray-700">70% profit — cash in hand</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}