"use client";
import { motion } from "framer-motion";

export default function ValentineIntroCard({
  title,
  name,
  quote,
  time,
}: any) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-xl
          rounded-[32px]
          bg-white/10 backdrop-blur-2xl
          border border-white/25
          shadow-[0_30px_80px_rgba(255,105,180,0.35)]
          p-12 text-center text-white
        "
      >
        <p className="font-[cursive] text-lg text-pink-300 mb-2">
          ✨ {title} ✨
        </p>

        <h1 className="text-6xl font-[cursive] mt-2">
          {name}
        </h1>

        <p className="mt-6 italic text-white/90 text-lg">
          “{quote}”
        </p>

        <div className="mt-10 bg-black/30 rounded-2xl px-6 py-4 text-sm tracking-widest">
          <p className="text-white/70 mb-1">
            WE’VE BEEN IN LOVE FOR
          </p>
          <p className="text-xl font-mono">
            {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </p>
        </div>
      </motion.div>
    </section>
  );
}
