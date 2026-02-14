"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftClient({ gift }: any) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
const [particles, setParticles] = useState<
  { left: number; top: number }[]
>([]);

useEffect(() => {
  const generated = Array.from({ length: 15 }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

  setParticles(generated);
}, []);

  // Start music only after tap
  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied 💖");
  };

  const handleDownload = () => {
    window.open(`/api/download/${gift.id}`, "_blank");
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🎵 Music */}
      <audio ref={audioRef} src="/romantic.mp3" loop />

      {/* 🎬 Opening Overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl mb-6"
            >
              A gift made with love 💖
            </motion.h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-rose-600 rounded-full text-lg"
            >
              Tap to Begin
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ Background glow */}
      <motion.div
  animate={{
    backgroundPosition: ["0% 50%", "100% 50%"],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
  className="absolute inset-0 bg-[linear-gradient(120deg,#3b0000,#000000,#2a001a)] bg-[length:200%_200%] pointer-events-none"
/>

<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {particles.map((p, i) => (
    <motion.div
      key={i}
      className="absolute w-1.5 h-1.5 bg-rose-400 rounded-full opacity-40"
      animate={{
        y: ["0%", "100%"],
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 15 + i * 2,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
      }}
    />
  ))}
</div>


      {started && (
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-20">

          {/* 💖 Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-6xl font-bold tracking-wide">
              {gift.sender_name}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mx-3 text-rose-500"
              >
                ❤️
              </motion.span>
              {gift.receiver_name}
            </h1>

            <p className="mt-6 text-lg sm:text-xl italic text-rose-300 max-w-2xl mx-auto">
              {gift.message}
            </p>

            <div className="mt-10 flex justify-center gap-6 flex-wrap">
              <button
                onClick={handleCopy}
                className="px-8 py-3 bg-rose-600 rounded-full hover:bg-rose-500 transition"
              >
                Copy Link
              </button>

              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-white text-black rounded-full hover:scale-105 transition"
              >
                Download PDF
              </button>
            </div>
          </motion.div>

          {/* 📸 Images */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 perspective-1000">
  {gift.photos?.map((photo: any, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        whileHover={{
          rotateX: 6,
          rotateY: -6,
          scale: 1.05,
        }}
        transition={{ type: "spring", stiffness: 120 }}
        className="rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(255,105,180,0.35)] transform-gpu bg-black"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={photo.preview}
          className="w-full h-[300px] sm:h-[500px]
  object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Soft Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
      </motion.div>
    </motion.div>
  ))}
</div>


          {/* 🌟 Ending */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-center mt-32 text-rose-400 text-xl"
          >
            Forever begins here ✨
          </motion.div>
        </div>
      )}
    </main>
  );
}
