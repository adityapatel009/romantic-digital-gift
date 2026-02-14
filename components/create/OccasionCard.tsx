"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  title: string;
  desc: string;
  onClick: () => void;
};

export default function OccasionCard({ title, desc, onClick }: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <motion.button
      onClick={() => {
        setSelected(true);
        onClick();
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full text-left p-6 rounded-2xl
        border transition-all duration-300
        backdrop-blur-xl
        ${
          selected
            ? "border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.35)]"
            : "border-white/10 hover:border-pink-400/60"
        }
        bg-white/[0.04]
      `}
    >
      {/* 💍 Proposal sparkle */}
      {title === "Proposal" && (
        <motion.span
          className="absolute top-4 right-4 text-xl"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          💍
        </motion.span>
      )}

      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        {desc}
      </p>

      {/* 🎀 Persistent glow */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-pink-500/10 blur-xl -z-10" />
      )}
    </motion.button>
  );
}
