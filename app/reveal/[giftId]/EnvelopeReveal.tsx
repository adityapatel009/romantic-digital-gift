"use client";
import { motion } from "framer-motion";

export default function EnvelopeReveal({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="h-screen flex items-center justify-center
                 bg-gradient-to-b from-white to-rose-50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="cursor-pointer text-center"
      >
        <div className="text-7xl">💌</div>
        <p className="mt-4 text-gray-700">
          Tap to open the letter
        </p>
      </motion.div>
    </motion.div>
  );
}
