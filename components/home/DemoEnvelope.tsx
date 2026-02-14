"use client";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function DemoEnvelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(false);

  // 🎮 Mouse tilt (gyroscope feel)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [12, -12]);
  const rotateY = useTransform(x, [-60, 60], [-12, 12]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setBurst(true);
    setTimeout(onOpen, 900);
  };

  return (
    <motion.div
      onClick={handleOpen}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative w-72 h-48 mx-auto cursor-pointer perspective-[1200px]"
    >
      {/* 🌸 Ambient glow */}
      <div className="absolute -inset-8 bg-pink-400/30 blur-3xl rounded-3xl -z-10" />

      {/* 💗 Tiny heart burst */}
      {burst && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: 1,
                opacity: 0,
                x: Math.random() * 120 - 60,
                y: Math.random() * -120,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 text-pink-500"
            >
              💖
            </motion.span>
          ))}
        </div>
      )}

      {/* 📜 Letter */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={opened ? { y: -70, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          absolute left-1/2 top-4
          -translate-x-1/2
          w-56 h-36
          bg-white rounded-xl
          shadow-xl
          z-40
          flex items-center justify-center
          text-sm text-gray-700
        "
      >
        Just for you 💗
      </motion.div>

      {/* ✉️ Envelope body */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-rose-200 to-pink-300
          rounded-2xl shadow-2xl
          overflow-hidden
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ✉️ Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={opened ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="
            absolute top-0 left-0 w-full h-1/2
            bg-gradient-to-br from-pink-300 to-rose-400
            origin-top
            z-30
          "
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backfaceVisibility: "hidden",
          }}
        />

        {/* ✉️ Front triangle */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-pink-200 z-20"
          style={{
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          }}
        />
      </div>

      {!opened && (
        <p className="mt-56 text-center text-sm text-gray-600">
          Tap to open the letter 💌
        </p>
      )}
    </motion.div>
  );
}
