"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const VIDEOS = [
  "/videos/bg-1.mp4",
  "/videos/bg-2.mp4",
  "/videos/bg-3.mp4",
];

export default function BackgroundVideoRotator() {
  const [index, setIndex] = useState(0);

  const handleVideoEnd = () => {
    setIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <AnimatePresence mode="wait">
        <motion.video
          key={index}
          src={VIDEOS[index]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
