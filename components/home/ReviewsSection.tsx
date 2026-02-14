"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aarav",
    text: "She cried happy tears. Best gift I’ve ever given.",
  },
  {
    name: "Simran",
    text: "It felt so personal. Way better than flowers.",
  },
  {
    name: "Rahul",
    text: "Private, emotional, and beautiful. Highly recommended.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-pink-50 to-white px-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-[cursive] text-[#4b1e1e]">
          Loved by Couples
        </h2>
        <p className="mt-4 text-gray-600">
          Real reactions from real moments.
        </p>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="
              bg-white/80 backdrop-blur
              rounded-3xl p-8
              shadow-xl shadow-pink-200/40
              border border-pink-200/50
            "
          >
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-gray-700 leading-relaxed">
              “{r.text}”
            </p>
            <p className="mt-6 text-sm font-semibold text-gray-900">
              — {r.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
