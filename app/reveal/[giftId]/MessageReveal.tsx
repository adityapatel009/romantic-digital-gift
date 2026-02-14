"use client";
import { motion } from "framer-motion";

export default function MessageReveal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center
                bg-gradient-to-br from-rose-100 via-pink-50 to-white

                 px-6 text-center"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-[cursive] text-gray-900"
      >
        To My Favorite Person ❤️
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-md text-gray-700 leading-relaxed"
      >
        This little surprise is just to remind you
        how special you are to me.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-sm text-gray-500"
      >
        🎵 Soft music playing…
      </motion.p>
    </motion.div>
  );
}
