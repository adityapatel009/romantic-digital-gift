"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GradientButton({ text }: { text: string }) {
  return (
    <Link href="/create" className="inline-block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-4 rounded-full text-white font-semibold
                   bg-gradient-to-r from-pink-500 via-red-500 to-purple-500
                   shadow-xl shadow-pink-300/40 cursor-pointer select-none"
      >
        {text}
      </motion.div>
    </Link>
  );
}
