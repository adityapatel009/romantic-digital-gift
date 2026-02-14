"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function FeelLovedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* BACKDROP */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* 💎 GLASS CARD */}
          <motion.div
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              relative z-10
              max-w-sm w-[90%]
              rounded-3xl
              bg-white/30
              backdrop-blur-xl
              border border-white/40
              shadow-[0_0_60px_rgba(255,105,180,0.6)]
              p-8 text-center
            "
          >
            <h3 className="text-3xl font-[cursive] text-[#4b1e1e]">
              Why I Love You
            </h3>

            <p className="mt-6 text-lg text-[#4b1e1e] leading-relaxed">
              “I love you because you understand me even  
              when I don’t explain properly.”
            </p>

            <button
              onClick={onClose}
              className="
                mt-8 px-6 py-2
                rounded-full
                bg-pink-500 text-white
                shadow-lg
              "
            >
              Close 💗
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
