"use client";

import { motion } from "framer-motion";

export default function RingAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex justify-center"
    >
      <div className="
        w-40 h-40 rounded-full
        bg-gradient-to-br from-yellow-300 to-yellow-500
        shadow-[0_0_60px_rgba(255,215,0,0.9)]
        flex items-center justify-center
      ">
        <span className="text-6xl">💍</span>
      </div>
    </motion.div>
  );
}
