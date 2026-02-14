"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❗ SSR ke time kuch bhi render nahi karega
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 60,
            x: Math.random() * 300 - 150,
            scale: Math.random() * 0.5 + 0.4,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: -260,
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
          className="absolute text-pink-300 text-xl"
        >
          💗
        </motion.span>
      ))}
    </div>
  );
}
