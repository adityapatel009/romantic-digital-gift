"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

export default function OpenWhenLetterModal({
  open,
  title,
  content,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* LETTER */}
          <motion.div
            initial={{ y: 60, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 60, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              relative z-10
              w-[92%] max-w-md
              bg-[#fffdf7]
              rounded-2xl
              p-8
              shadow-2xl
              text-center
              font-serif
            "
          >
            <h3 className="text-pink-500 text-lg mb-1">My Dearest,</h3>

            <h2 className="font-[cursive] text-2xl text-gray-800 mb-6">
              Open when {title}
            </h2>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </p>

            <p className="mt-8 text-right font-[cursive] text-gray-700">
              With all my love, <br />
              <span className="text-pink-500">Your Valentine ❤️</span>
            </p>

            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 text-xl"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
