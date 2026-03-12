import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

const planData = {
  standard: {
    label: "Standard Plan (£250/month)",
    cardsPerWeek: 3,
    cardsPerMonth: 12,
    avgValue: 950,
    planCost: 250,
    weeklyOrders: 2850,
    totalMonthly: 11400,
    afterDiscount: 9120,
    netProfit: 8870,
    calc: [
      "12 gift cards/month × £950 each = £11,400 total order value",
      "Typical market discount ~20%: £11,400 × 0.80 = £9,120",
      "Subtract Standard Plan cost: £9,120 - £250 = £8,870 net profit per month",
    ],
    weekly: "£2,850",
    profit: "~£8,870",
  },
  pro: {
    label: "Pro Plan (£450/month)",
    cardsPerWeek: 5,
    cardsPerMonth: 20,
    avgValue: 950,
    planCost: 450,
    weeklyOrders: 4750,
    totalMonthly: 19000,
    afterDiscount: 15200,
    netProfit: 14750,
    calc: [
      "20 gift cards/month × £950 each = £19,000 total order value",
      "Typical market discount ~20%: £19,000 × 0.80 = £15,200",
      "Subtract Pro Plan cost: £15,200 - £450 = £14,750 net profit per month",
    ],
    weekly: "£4,750",
    profit: "~£14,750",
  },
  ultimate: {
    label: "Ultimate Plan (Custom)",
    cardsPerWeek: 10,
    cardsPerMonth: 40,
    avgValue: 950,
    planCost: 0,
    weeklyOrders: 9500,
    totalMonthly: 38000,
    afterDiscount: 30400,
    netProfit: 30400,
    calc: [
      "40+ gift cards/month × £950 each = £38,000+ total order value",
      "Typical market discount ~20%: £38,000 × 0.80 = £30,400",
      "Custom pricing — contact us for final net profit figures",
    ],
    weekly: "£9,500+",
    profit: "£30,000+",
  },
};

const planTabs = [
  { key: "standard", label: "Standard" },
  { key: "pro", label: "Pro" },
  { key: "ultimate", label: "Ultimate" },
];

export default function ProfitSection() {
  const [activePlan, setActivePlan] = useState("pro");
  const data = planData[activePlan];

  return (
    <section id="results" className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#0076DF' }}>ROI</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Profit Analysis & ROI
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto font-light">
            See exactly how much you can earn with our proven system
          </p>
        </motion.div>

        {/* Plan Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-gray-100">
            {planTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePlan(tab.key)}
                className="relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  color: activePlan === tab.key ? 'white' : '#6b7280',
                  backgroundColor: activePlan === tab.key ? '#0076DF' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main breakdown card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: '#0076DF' }} />
              <h3 className="text-white font-semibold text-lg">{data.label} — Profit Breakdown</h3>
            </div>
            <p className="text-white/40 text-sm mb-10 max-w-2xl leading-relaxed">
              With this plan, you can generate{" "}
              <span className="text-white font-medium">{data.cardsPerWeek} gift cards per week (~{data.cardsPerMonth}/month)</span>.
              Assuming an average Apple product value of{" "}
              <span className="text-white font-medium">£950 per gift card</span>:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {[
                { value: `£${data.totalMonthly.toLocaleString()}`, label: "Total Monthly Order Value" },
                { value: `£${data.afterDiscount.toLocaleString()}`, label: "After 20% Resale Discount" },
                { value: `£${data.netProfit.toLocaleString()}${activePlan === 'ultimate' ? '+' : ''}`, label: "Net Profit After Plan Cost", highlight: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 transition-all duration-500 ${item.highlight ? "border" : "border border-white/5"}`}
                  style={item.highlight
                    ? { backgroundColor: 'rgba(0,118,223,0.08)', borderColor: 'rgba(0,118,223,0.2)' }
                    : { backgroundColor: 'rgba(255,255,255,0.04)' }
                  }
                >
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: item.highlight ? '#0076DF' : 'white' }}
                  >
                    {item.value}
                  </div>
                  <div className="text-white/40 text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/8 pt-8 space-y-3">
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Detailed Calculation</h4>
              {data.calc.map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#0076DF' }} />
                  <p className="text-white/40 text-sm">{line}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Plan comparison cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {planTabs.map((tab, i) => {
            const d = planData[tab.key];
            const isActive = activePlan === tab.key;
            return (
              <motion.button
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActivePlan(tab.key)}
                className="rounded-2xl border p-6 text-center cursor-pointer transition-all duration-400 hover:-translate-y-0.5 text-left"
                style={isActive
                  ? { borderColor: '#0076DF', backgroundColor: 'rgba(0,118,223,0.04)', boxShadow: '0 8px 30px rgba(0,118,223,0.1)' }
                  : { borderColor: 'rgb(243,244,246)', backgroundColor: 'white' }
                }
              >
                <h4 className="font-semibold text-gray-900">{tab.label} Plan</h4>
                <p className="text-gray-400 text-sm mt-1">{tab.key === 'ultimate' ? 'Custom' : tab.key === 'pro' ? '£450/month' : '£250/month'}</p>
                <p className="text-sm text-gray-500 mt-3">{d.cardsPerWeek} cards/week = {d.weekly} weekly</p>
                <div className="text-2xl font-bold mt-3" style={{ color: '#0076DF' }}>{d.profit}</div>
                <p className="text-xs text-gray-400 mt-1">monthly profit</p>
                {isActive && (
                  <div className="mt-3 text-xs font-medium" style={{ color: '#0076DF' }}>● Currently viewing</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}