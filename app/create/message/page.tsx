"use client";

import { useGiftStore } from "@/lib/gift-store";
import ProgressBar from "@/components/create/ProgressBar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

/* 💗 Floating Hearts Background */
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 120,
            x: Math.random() * 120 - 60,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -700,
          }}
          transition={{
            duration: 14 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.2,
          }}
          className="absolute left-1/2 text-pink-400 text-xl"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

export default function MessagePage() {
  const router = useRouter();
  const { gift, updateGift } = useGiftStore();
  const [preview, setPreview] = useState(gift.message || "");

  return (
    <main
      className="
        relative min-h-screen
        bg-[radial-gradient(circle_at_top,rgba(255,120,160,0.18),transparent_60%),linear-gradient(to_br,#fff5f7,#ffe9ef)]
        flex items-center justify-center
        px-4 py-16 overflow-hidden
      "
    >
      <FloatingHearts />

      {/* 💎 3D Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9 }}
        whileHover={{ rotateX: 4, rotateY: -4 }}
        className="
          relative z-10
          w-full max-w-2xl
          rounded-3xl
          bg-white
          overflow-hidden
          shadow-[0_20px_40px_rgba(0,0,0,0.12),0_60px_120px_rgba(255,120,160,0.35)]
        "
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-400">Step 3 of 6</span>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <ProgressBar step={3} />
        </div>

        {/* Content */}
        <div className="px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Write a short message
          </h1>

          <p className="text-gray-600 mb-6">
            Just a few lines from your heart.  
            Emojis are welcome 💖
          </p>

          {/* ✍️ Message Input */}
          <motion.textarea
            rows={5}
            value={preview}
            onChange={(e) => {
              setPreview(e.target.value);
              updateGift({ message: e.target.value });
            }}
            placeholder="Type something beautiful..."
            whileFocus={{ scale: 1.02 }}
            className="
              w-full p-5 rounded-2xl
              bg-rose-50
              border border-pink-200
              shadow-inner
              focus:ring-2 focus:ring-pink-400
              outline-none resize-none
              text-gray-800
            "
          />

          {/* 💌 Live Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="
              mt-8
              rounded-2xl
              bg-white/70 backdrop-blur
              border border-white/60
              shadow-lg
              p-6
              text-center
              text-lg
              font-[cursive]
              text-gray-800
            "
          >
            {preview ? (
              preview.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={
                    char.match(/[\p{Emoji}]/u)
                      ? { scale: [1, 1.4, 1], y: [0, -6, 0] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <span className="text-gray-400">
                Your message preview will appear here…
              </span>
            )}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="px-6 py-6 border-t flex justify-end">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create/preview")}
            className="
              px-12 py-4 rounded-full
              text-white text-lg
              bg-gradient-to-r from-pink-500 to-purple-500
              shadow-[0_10px_20px_rgba(255,100,160,0.4)]
              hover:shadow-[0_16px_30px_rgba(255,100,160,0.6)]
            "
          >
            Next →
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
