"use client";

import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";

export default function EnvelopeReveal({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <div className="relative w-72 h-52 flex items-center justify-center">
      
      {/* 💕 Floating Hearts Background */}
      <FloatingHearts />

      {/* ✉️ Envelope */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="
          relative cursor-pointer
          w-64 h-40
          bg-pink-500
          rounded-xl
          shadow-2xl
          z-10
        "
      >
        {/* Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -160 }}
          transition={{ duration: 0.8 }}
          className="
            absolute top-0 left-0 right-0 h-1/2
            bg-pink-600
            origin-top
            rounded-t-xl
          "
        />

        {/* Heart Seal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            ❤️
          </div>
        </div>
      </motion.div>

      <p className="absolute -bottom-8 font-[cursive] text-pink-200 text-lg">
        Read my heart…
      </p>
    </div>
  );
}
