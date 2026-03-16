import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this system really 100% legitimate?",
    answer: "Yes, absolutely. We've been operating for 4+ years with thousands of successful users. You can walk into any Apple Store worldwide and collect products with zero issues. Our gift cards work 100% of the time on Apple's official platforms.",
  },
  {
    question: "How soon can I start after booking my call?",
    answer: "Immediately after your strategy call and payment. We set up your account during the call and walk you through your first gift cards. Most users place their orders for collection within the same day.",
  },
  {
    question: "What's the success rate of the gift cards?",
    answer: "100% success rate. We've never had a single gift card fail in 4+ years of operation. Every code generated works perfectly on Apple's official website and stores.",
  },
  {
    question: "Can I really collect from Apple Stores?",
    answer: "Yes, you can walk into any Apple Store worldwide and collect your ordered products. Many of our users do this regularly. The process is completely legitimate and Apple Store staff will process your collection normally.",
  },
  {
    question: "What if I have no experience with Apple products?",
    answer: "No experience needed. We provide step-by-step tutorials, and during your strategy call we'll walk you through everything. Most of our successful users started with zero experience.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span
          className="text-gray-900 font-medium text-sm md:text-base pr-4 transition-colors duration-300"
          style={isOpen ? { color: "#0076DF" } : {}}
        >
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180" : "text-gray-300"}`}
          style={isOpen ? { color: "#0076DF" } : {}}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-6 pr-10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-28 md:py-36 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0076DF" }}>Support</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400 text-lg font-light">
            Everything you need to know about CEO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-100 px-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}