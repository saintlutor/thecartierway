import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Standard",
    price: "£250",
    period: "/month",
    popular: false,
    features: [
      "Access to Gift Card Generator",
      { text: "3 Gift Cards Per Week", bold: true, sub: "(~12/month)" },
      "Personal Account Dashboard",
      "24/7 Customer Support",
      "Step-by-Step Tutorials",
    ],
    cta: "Book Call for Standard",
    planKey: "standard",
  },
  {
    name: "Pro",
    price: "£450",
    period: "/month",
    popular: true,
    features: [
      "Everything in Standard",
      { text: "5 Gift Cards Per Week", bold: true, sub: "(~20/month)" },
      "Priority Generation Access",
      "Advanced Strategy Guides",
      "Personal Account Manager",
      "Weekly Optimization Tips",
      "Exclusive Community Access",
    ],
    cta: "Book Call for Pro",
    planKey: "pro",
  },
  {
    name: "Ultimate",
    price: "Custom",
    period: "",
    popular: false,
    features: [
      "Everything in Pro",
      { text: "10+ Gift Cards Per Week", bold: true, sub: "(40+/month)" },
      "Dedicated Success Coach",
      "Custom Generation Strategies",
      "VIP Phone Support",
      "Advanced Analytics Dashboard",
      "Business Scaling Consultation",
    ],
    cta: "Book Call for Ultimate",
    planKey: "ultimate",
  },
];

export default function PlansSection({ onSelectPlan }) {
  return (
    <section id="plans" className="py-28 md:py-40 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#0076DF' }}>Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            Select your plan, then book your personalized onboarding call
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
                plan.popular
                  ? "shadow-2xl md:scale-[1.03] z-10"
                  : "shadow-sm hover:shadow-xl"
              } bg-white`}
              style={plan.popular ? { border: `2px solid #0076DF`, boxShadow: '0 20px 60px rgba(0,118,223,0.15)' } : {}}
            >
              {plan.popular && (
                <div
                  className="text-white text-xs font-semibold text-center py-2.5 tracking-widest uppercase flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: '#0076DF' }}
                >
                  <Star className="w-3 h-3" fill="currentColor" />
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name} Plan</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((f, fi) => {
                    const text = typeof f === "string" ? f : f.text;
                    const bold = typeof f === "object" && f.bold;
                    const sub = typeof f === "object" ? f.sub : "";
                    return (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#0076DF' }} />
                        <span className={`text-gray-600 ${bold ? "font-semibold text-gray-900" : ""}`}>
                          {text} {sub && <span className="text-gray-400 font-normal">{sub}</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => onSelectPlan(plan.planKey)}
                  className="w-full mt-8 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  style={plan.popular
                    ? { backgroundColor: '#0076DF', color: 'white' }
                    : { backgroundColor: '#1d1d1f', color: 'white' }
                  }
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}