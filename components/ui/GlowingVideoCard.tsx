"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function GlowingVideoCard({
  src,
}: {
  src: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // rotation mapping
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  // glow movement
  const glowX = useTransform(x, [-50, 50], ["30%", "70%"]);
  const glowY = useTransform(y, [-50, 50], ["30%", "70%"]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posX = e.clientX - rect.left - rect.width / 2;
        const posY = e.clientY - rect.top - rect.height / 2;
        x.set(posX);
        y.set(posY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative mx-auto max-w-[420px] md:max-w-[460px] perspective-[1200px]"
    >
      {/* 🌸 MOVING GLOW */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="
          absolute
          w-[280px]
          h-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-pink-500/40
          blur-[120px]
          pointer-events-none
        "
      />

      {/* 🪞 GLASS CARD */}
      <div
        className="
        relative
        rounded-[2.5rem]
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        shadow-[0_50px_140px_rgba(0,0,0,0.9)]
        overflow-hidden
      "
      >
        {/* 🎥 VIDEO */}
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="
            w-full
            h-auto
            max-h-[520px]
            object-contain
          "
        />

        {/* ✨ GLASS SHINE */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />

        {/* 🎛 CONTROLS */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="bg-black/60 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full shadow-lg"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="bg-black/60 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full shadow-lg"
          >
            {isMuted ? "🔇 Mute" : "🔊 Sound"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
