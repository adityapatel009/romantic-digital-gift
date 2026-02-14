"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/hero/couple-1.jpg",
  "/hero/couple-2.jpg",
  "/hero/couple-3.jpg",
  "/hero/couple-4.jpg",
];

export default function HeroCanvasMock() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // slower = premium

    return () => clearInterval(i);
  }, []);

  return (
    <motion.div
      animate={{
        rotateY: [0, 4, -4, 0],
        rotateX: [0, 2, -2, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        relative
        w-[260px] h-[360px]
        md:w-[320px] md:h-[460px]
        perspective-[1400px]
      "
    >
      {/* 🌸 Ambient Glow (layered) */}
      <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-pink-400/30 via-fuchsia-400/20 to-purple-500/20 blur-3xl -z-20" />
      <div className="absolute -inset-2 rounded-[32px] bg-white/10 blur-xl -z-10" />

      {/* 💎 Card */}
      <div
        className="
          relative w-full h-full
          rounded-3xl overflow-hidden
          border border-white/30
          bg-white/10 backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* 📸 Image slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="A real love moment"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* 🌗 Depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* ✨ Moving light sheen */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-30"
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🔒 Premium badge */}
        <div className="absolute top-4 right-4 px-3 py-1 text-[11px] rounded-full
                        bg-white/80 backdrop-blur text-gray-900 shadow-md">
          🔒 A moment waiting
        </div>

        {/* 📝 Caption */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-medium leading-snug">
            Every love story deserves  
            <span className="block text-pink-200">a moment like this</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
