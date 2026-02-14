"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type EventConfig = {
  title: string;
  name: string;
  quote: string;
  startDate: string;
};

const DEMO_EVENT: EventConfig = {
  title: "Happy Valentine’s Day",
  name: "Jenilia",
  quote: "My heart beats only for you.",
  startDate: "2023-01-01T00:00:00",
};

function getTimeDiff(start: string) {
  const now = new Date().getTime();
  const startTime = new Date(start).getTime();
  const diff = Math.max(now - startTime, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function EventRevealDemo() {
  const [time, setTime] = useState(() =>
    getTimeDiff(DEMO_EVENT.startDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDiff(DEMO_EVENT.startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#2a0d12] overflow-hidden">
      
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,105,180,0.25),transparent_60%)]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl mx-6 rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 text-center text-white"
      >
        <p className="font-[cursive] text-lg text-pink-300 mb-2">
          ✨ {DEMO_EVENT.title} ✨
        </p>

        <h1 className="text-5xl font-[cursive] mt-2">
          {DEMO_EVENT.name}
        </h1>

        <p className="mt-4 italic text-white/90">
          “{DEMO_EVENT.quote}”
        </p>

        <button className="mt-8 px-8 py-3 rounded-full border border-white/40 hover:bg-white/10 transition">
          ❤️ Shower me with Love
        </button>

        <div className="mt-8 bg-black/30 rounded-xl px-6 py-4 text-sm tracking-widest">
          <p className="text-white/70 mb-1">WE’VE BEEN IN LOVE FOR</p>
          <p className="text-lg font-mono">
            {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </p>
        </div>

        <div className="mt-6 text-white/70 text-sm">
          🎵 Love Song — Playing for you
        </div>
      </motion.div>
    </div>
  );
}
