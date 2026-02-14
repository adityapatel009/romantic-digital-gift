"use client";

import { motion } from "framer-motion";

const hearts = Array.from({ length: 18 });

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.6,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [-120, -320],
            scale: [0.6, 1, 0.8],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-pink-300"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}px`,
            fontSize: `${14 + Math.random() * 24}px`,
          }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}
