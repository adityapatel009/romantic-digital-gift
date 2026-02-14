"use client";

import { motion } from "framer-motion";
import { useGiftStore } from "@/lib/gift-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProposePage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
const storeGift = useGiftStore((s) => s.gift);
const gift = experienceMode ? experienceGift : storeGift;
const receiverName =
  gift?.receiverName || gift?.receiver_name || "My Love";



  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleYes = () => {
    setAccepted(true);

    setTimeout(() => {
     if (experienceMode) {
  router.push(`/experience/${gift.id}/valentine-day/success`);
} else {
  router.push("/create/valentine-day/success");
}

    }, 2500);
  };

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: accepted ? [1, 1.8, 1] : 1 }}
  transition={{ duration: 1 }}
  className="absolute w-40 h-40 bg-pink-400/30 blur-3xl rounded-full"
/>

      {/* Romantic Glow */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[1000px] h-[1000px] bg-pink-600/30 blur-[250px] rounded-full"
      />

      {!accepted ? (
        <div className="relative z-10 text-center text-white px-6">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {receiverName}, 💍
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl md:text-4xl mb-10"
          >
            Will You Marry Me?
          </motion.h2>

          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            src="/ring-box.png"
            className="w-40 mx-auto mb-10 drop-shadow-[0_0_30px_rgba(255,0,150,0.8)]"
          />

          <div className="flex gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleYes}
              className="px-8 py-3 bg-pink-600 rounded-full text-lg font-semibold"
            >
              YES 💖
            </motion.button>

            <motion.button
              whileHover={{ x: 100 }}
              className="px-8 py-3 bg-gray-700 rounded-full text-lg font-semibold"
            >
              NO 😅
            </motion.button>
          </div>

        </div>
      ) : (
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl text-pink-500 font-bold"
        >
          She Said YES! 💍💖
        </motion.h1>
      )}

    </main>
  );
}
