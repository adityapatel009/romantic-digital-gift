"use client";

import { useEffect, useRef, useState } from "react";
import HeartBurstCanvas from "./HeartBurstCanvas";

const START_DATE = "2026-02-06T00:00:00";

const PLANS = [
  "✨ Take a spontaneous road trip with no fixed plan",
  "✨ Have a movie marathon in pajamas",
  "✨ Be each other’s safe space on bad days",
];

function getTimeLeft() {
  const diff = new Date(START_DATE).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function FuturePlansSection() {
  const [time, setTime] = useState(getTimeLeft);
  const [unlocked, setUnlocked] = useState(false);
  const burstRef = useRef<{ fire: () => void }>(null);

  useEffect(() => {
    const i = setInterval(() => {
      const next = getTimeLeft();
      setTime(next);

      if (next.done && !unlocked) {
        setUnlocked(true);
        burstRef.current?.fire(); // 💖 HEART BURST
      }
    }, 1000);

    return () => clearInterval(i);
  }, [unlocked]);

  return (
    <section className="relative py-36 text-center overflow-hidden bg-gradient-to-b from-[#2a0d12] to-[#1a070b]">
      {/* 💖 CANVAS HEART BURST */}
      <HeartBurstCanvas ref={burstRef} />

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl font-[cursive] text-pink-200">
        Countdown to Valentine’s
      </h2>

      {/* COUNTDOWN */}
      <div className="mt-10 flex justify-center gap-8 text-white">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit} className="text-center">
            <div className="text-4xl font-bold">
              {String((time as any)[unit]).padStart(2, "0")}
            </div>
            <div className="text-xs uppercase tracking-widest opacity-70">
              {unit}
            </div>
          </div>
        ))}
      </div>

      {/* SURPRISE */}
      {unlocked && (
        <div className="mt-12 inline-block px-10 py-6 rounded-3xl bg-white/15 backdrop-blur-xl shadow-[0_0_80px_rgba(255,105,180,0.8)] animate-pulse">
          <h3 className="text-4xl font-[cursive] text-pink-100">
            It’s Valentine’s Day 💖
          </h3>
          <p className="mt-2 text-pink-200">
            A little surprise… just for us ✨
          </p>
        </div>
      )}

      {/* PLANS */}
      <div
        className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 transition-all duration-1000 ${
          unlocked ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {PLANS.map((plan, i) => (
          <div
            key={i}
            className="
              bg-white/10 backdrop-blur-xl
              rounded-2xl p-6 text-left
              text-pink-100
              shadow-lg
              transition-all duration-300
              hover:shadow-[0_0_35px_rgba(255,105,180,0.6)]
              hover:scale-[1.04]
              active:scale-[1.03]
            "
          >
            {plan}
          </div>
        ))}
      </div>
    </section>
  );
}
