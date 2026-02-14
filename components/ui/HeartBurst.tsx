"use client";

import { motion } from "framer-motion";

export default function HeartBurst({ x, y }: { x: number; y: number }) {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ x, y, opacity: 1, scale: 1 }}
          animate={{
            x: x + (Math.random() * 120 - 60),
            y: y + (Math.random() * 120 - 60),
            opacity: 0,
            scale: 0.6,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-[999] pointer-events-none text-pink-500"
        >
          💖
        </motion.span>
      ))}
    </>
  );
}
