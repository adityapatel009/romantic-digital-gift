"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "12,000+", label: "Gifts Created" },
  { value: "9,500+", label: "Smiles Delivered" },
  { value: "4.9★", label: "Average Rating" },
];

const reviews = [
  {
    text: "She actually cried when it opened. Best gift I’ve ever given.",
    author: "Aman · Delhi",
  },
  {
    text: "Felt more personal than any physical gift. Beautiful experience.",
    author: "Riya · Mumbai",
  },
  {
    text: "I scheduled it for midnight. Worth every rupee.",
    author: "Kunal · Bangalore",
  },
];

export default function TrustSection() {
  return (
    <section className="px-6 py-28 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-[cursive]"
        >
          Loved by Real People ❤️
        </motion.h2>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-semibold text-pink-400">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-gray-300">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6 bg-white/5 backdrop-blur
                         border border-white/10 shadow-lg"
            >
              <p className="text-sm leading-relaxed text-gray-200">
                “{r.text}”
              </p>
              <p className="mt-4 text-xs text-gray-400">
                — {r.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Security */}
        <div className="mt-20 text-center text-sm text-gray-400">
          🔒 Secure payments · 🛡️ Private links · ❌ No ads · ❌ No tracking
        </div>
      </div>
    </section>
  );
}
