"use client";
import { motion } from "framer-motion";

export default function RevealMock() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-pink-100 to-rose-50
                 rounded-3xl p-10 shadow-xl text-center"
    >
      <h3 className="text-2xl font-[cursive] text-gray-900">
        To My Favorite Person ❤️
      </h3>
      <p className="mt-4 text-gray-700">
        This is a small preview of how your love will be revealed.
        Soft music, beautiful visuals, and a moment they’ll never forget.
      </p>
      <p className="mt-6 text-sm text-gray-500">
        🎵 Music starts playing here
      </p>
    </motion.div>
  );
}
