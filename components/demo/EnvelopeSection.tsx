"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EnvelopeSection({
  onReveal,
}: {
  onReveal: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [gone, setGone] = useState(false);

  // 🔊 paper sound (gesture-safe)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio("/sounds/paper-open.mp3");
    audioRef.current.volume = 0.6;
  }, []);

  const playSound = () => {
    audioRef.current?.play().catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen perspective-1000">
      <AnimatePresence>
        {!gone && (
          <motion.div
            key="envelope"
            initial={{ scale: 1, rotateX: 0 }}
            animate={{
              scale: opened ? 1.03 : 1,
              rotateX: opened ? -6 : 0,
            }}
            exit={{ opacity: 0, y: -80, scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // ✨ luxury
            onClick={() => {
              if (!opened) {
                playSound();          // 🔊
                setOpened(true);
                // letter comes out AFTER flap starts
                setTimeout(() => setShowLetter(true), 550);
                // finish flow
                setTimeout(() => {
                  setGone(true);
                  onReveal();
                }, 1600);
              }
            }}
            className="relative cursor-pointer transform-style-preserve-3d"
          >
            {/* BACK */}
            <div className="absolute inset-0 w-[320px] h-[200px] bg-pink-200 rounded-xl shadow-2xl" />

            {/* FRONT */}
            <div className="relative w-[320px] h-[200px] bg-gradient-to-b from-pink-100 to-pink-50 rounded-xl shadow-xl overflow-hidden">
              <div className="absolute bottom-2 w-full text-center text-xs text-pink-500">
  Tap to open 💌
</div>

              {/* TOP FLAP */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-pink-300 to-pink-200 origin-top rounded-t-xl"
                animate={{ rotateX: opened ? 180 : 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              />

              {/* 💌 SEAL */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-pink-400 shadow-md flex items-center justify-center text-white text-xl">
                ❤
              </div>
            </div>

            {/* 📜 LETTER SLIDE-OUT */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  key="letter"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: -90, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 -top-6 w-[260px] h-[160px] bg-white rounded-lg shadow-xl"
                >
                  <div className="p-4 text-center text-sm text-gray-600">
                    A letter just for you 💗
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
