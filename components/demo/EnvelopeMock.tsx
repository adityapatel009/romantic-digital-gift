"use client";
import { motion } from "framer-motion";

export default function EnvelopeMock({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer bg-white rounded-2xl p-10 shadow-xl
                 shadow-pink-200/40 text-center"
      onClick={onOpen}
    >
      <div className="text-4xl">💌</div>
      <p className="mt-4 font-medium text-gray-900">
        Tap to open the letter
      </p>
      <p className="text-sm text-gray-500">
        (Demo Preview)
      </p>
    </motion.div>
  );
}
