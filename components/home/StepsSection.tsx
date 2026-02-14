"use client";

import { motion } from "framer-motion";

const steps = [
  {
    no: "01",
    title: "Customize",
    desc: "Enter names, upload photos, and add a short heartfelt message.",
  },
  {
    no: "02",
    title: "Preview",
    desc: "See the magic before sending. Adjust everything until it feels perfect.",
  },
  {
    no: "03",
    title: "Gift",
    desc: "Share the private link and watch their beautiful reaction.",
  },
];

export default function StepsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-pink-50">
      
      {/* 🌸 Ambient hearts */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute top-24 left-[15%] text-pink-400 text-xl animate-float-heart">💗</div>
        <div className="absolute top-[55%] left-[75%] text-pink-300 text-lg animate-float-heart">💖</div>
        <div className="absolute top-[35%] left-[45%] text-pink-200 text-sm animate-float-heart">💞</div>
      </div>

      {/* 💎 Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-[cursive] text-[#4b1e1e]">
          3 Steps to Romance
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          It’s easier than ordering flowers.
        </p>
      </div>

      {/* 🧩 Cards */}
      <div className="relative z-10 mt-20 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="
              group
              relative
              rounded-3xl
              p-10
              bg-white/80
              backdrop-blur
              border border-pink-200/60
              shadow-xl shadow-pink-200/30
              hover:shadow-pink-400/40
              transition-all
            "
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl opacity-0 
                            group-hover:opacity-100
                            bg-gradient-to-br from-pink-300/20 to-rose-400/10
                            blur-xl transition" />

            {/* Step number */}
            <div className="relative z-10 w-12 h-12 rounded-full 
                            bg-gradient-to-br from-pink-500 to-rose-500
                            text-white font-semibold flex items-center justify-center
                            shadow-md">
              {s.no}
            </div>

            {/* Content */}
            <h3 className="relative z-10 mt-6 text-2xl font-semibold text-gray-900">
              {s.title}
            </h3>

            <p className="relative z-10 mt-3 text-gray-700 leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🌫 Top fade (connects with Hero) */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent" />
    </section>
  );
}
