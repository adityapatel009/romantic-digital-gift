"use client";
import { motion } from "framer-motion";

export default function DemoMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="
        relative rounded-3xl p-10 text-center
        bg-white/90 backdrop-blur-xl
        shadow-2xl border border-white/50
      "
    >
      <div className="absolute -inset-4 bg-pink-200/30 blur-3xl rounded-3xl -z-10" />

      <p
        className="text-2xl mb-4"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        Just for you
      </p>

      <p className="text-slate-700 leading-relaxed">
        Even on ordinary days, you make life feel special.
      </p>
    </motion.div>
  );
}
