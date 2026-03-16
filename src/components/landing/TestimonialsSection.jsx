import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "JM",
    name: "James Mitchell",
    label: "Standard Plan → Pro Plan",
    text: "Saw this on TikTok and honestly thought it was another scam. Watched the video like 4 times before I even messaged. Started on the Standard Plan just to test it — worst case I lose £250. First week was slow, I only placed 2 orders. Second week I collected 3 iPhones, sold them all through the Birmingham shop on Saturday. Made back my plan cost plus £400 on top. Upgraded to Pro the week after. Now I'm consistent every single week.",
    color: "bg-[#0076DF]",
  },
  {
    initials: "RK",
    name: "Ryan Kaur",
    label: "Verified Standard Plan User",
    text: "I'll be real — one of my gift cards didn't work when I went to check out on Apple.com. Panicked a bit, messaged support straight away. They responded within the hour and had a replacement code to me about 8 hours later. Went back, placed the order, collected next day. That was the only issue I've had in 3 months. Everything else has been smooth. Wish I'd started sooner instead of sitting on the fence after seeing it on Instagram.",
    color: "bg-blue-500",
  },
  {
    initials: "TL",
    name: "Thomas Lee",
    label: "Pro Plan User — 5 months in",
    text: "My mate showed me the TikTok and we both signed up the same week. He chickened out after the call, I went ahead. He's still at his warehouse job. I'm collecting 5 iPhones a week, dropping them at the Manchester shop on Thursdays, getting paid cash same day. The 70/30 split sounds rough on paper but when you're moving 5 units a week it adds up fast. No regrets.",
    color: "bg-violet-500",
  },
  {
    initials: "DW",
    name: "Daniel Walsh",
    label: "Student — Standard Plan",
    text: "Genuinely thought the strategy call would be a hard sell. It wasn't — they walked me through everything, answered every question I had, and there was no pressure. I paid after the call because I actually understood it. Week one I was nervous so I only placed 1 order. Week two I did all 3 and sold two of them to the Leicester shop. Made back the £250 and had £180 left over. It's not life-changing money yet but it's consistent, and I'm just a second-year student.",
    color: "bg-amber-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 md:py-36 overflow-hidden" style={{ background: "#f5f5f7" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0076DF" }}>Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            What Our Users Say
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            Verified testimonials from real CEO users
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}