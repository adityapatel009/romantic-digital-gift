"use client";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-yellow-300 text-2xl">★</span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl md:text-2xl font-[cursive]"
        >
          “Simple to make but looks so professional.
          The music integration is a game changer.”
        </motion.p>

        <div className="mt-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            A
          </div>
          <p className="mt-2 font-medium">Amit K.</p>
          <p className="text-sm text-white/80">Created Feb 2025</p>
        </div>
      </div>
    </section>
  );
}
