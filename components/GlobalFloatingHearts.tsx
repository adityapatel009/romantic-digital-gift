"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Heart = {
  id: number;
  x: number;
  delay: number;
  duration: number;
};

export default function GlobalFloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // 🔒 Runs ONLY on client
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
    }));

    setHearts(generated);
  }, []);

  // ⛔ Prevent SSR mismatch
  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/40"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
