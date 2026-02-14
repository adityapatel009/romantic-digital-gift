"use client";
import { motion } from "framer-motion";

export default function DemoLock({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      onClick={onUnlock}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="
        relative cursor-pointer
        rounded-3xl p-10 text-center
        bg-white/80 backdrop-blur-xl
        shadow-2xl border border-white/50
      "
    >
      {/* Glow */}
      <div className="absolute -inset-4 bg-pink-400/30 blur-3xl rounded-3xl -z-10" />

      <div className="text-5xl mb-4">🔒</div>
      <p className="text-slate-700 font-medium">
        Tap to unlock the surprise
      </p>
    </motion.div>
  );
}
