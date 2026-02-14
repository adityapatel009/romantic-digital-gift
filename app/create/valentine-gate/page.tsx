"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";

/* =========================
   💖 PREMIUM VALENTINE GATE
   ========================= */

export default function ValentineGatePage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const router = useRouter();
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;


  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFinalBtn, setShowFinalBtn] = useState(false);

  
  const partnerName =
  gift?.receiverName ||
  gift?.receiver_name ||
  "My Love";


  function moveNoButton() {
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 120 - 60;
    setNoPos({ x, y });
  }

  useEffect(() => {
    if (showCelebration) {
      const t = setTimeout(() => setShowFinalBtn(true), 3200);
      return () => clearTimeout(t);
    }
  }, [showCelebration]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden
      bg-gradient-to-br from-[#fdecef] via-[#fff5f7] to-[#fdecef]
      flex items-center justify-center">

      {/* 🌸 floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: [0, 0.6, 0], y: -300 }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute left-1/2 text-pink-300 text-xl"
          >
            💕
          </motion.span>
        ))}
      </div>

      {/* 💎 GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 w-[92%] max-w-2xl
        rounded-[3.2rem]
        bg-white/60 backdrop-blur-3xl
        border border-white/50
        shadow-[0_60px_180px_rgba(255,105,135,0.35)]
        px-12 py-16 text-center"
      >

        {/* ======================
           QUESTION VIEW
        ====================== */}
        {!showCelebration && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-lg italic text-rose-600"
            >
              💕 Hey!! <span className="font-semibold">{partnerName}</span> 💕
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-2 text-base italic text-pink-500"
            >
              💌 Just one question for you… ✨
            </motion.p>

            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-6 text-3xl md:text-4xl font-semibold text-rose-700"
            >
              Will you be my Valentine? ❤️
            </motion.h1>

            {/* BUTTONS */}
            <div className="relative mt-20 flex flex-col items-center gap-10 h-64">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCelebration(true)}
                className="px-14 py-4 rounded-full
                bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500
                text-white text-lg font-medium
                shadow-[0_15px_50px_rgba(255,105,135,0.6)]"
              >
                YES 💖
              </motion.button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 140 }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="absolute top-28 px-10 py-3 rounded-full
                bg-white/80 backdrop-blur-xl
                text-rose-500 font-medium
                border border-rose-300
                shadow-lg"
              >
                NO 😜
              </motion.button>
            </div>
          </>
        )}

        {/* ======================
           🎉 CELEBRATION VIEW
        ====================== */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative flex flex-col items-center gap-10"
            >
              {/* HERO GIF */}
            <img
  src="/celebrate.gif"
  alt="celebrate"
  className="w-80 h-80 object-contain z-10
  drop-shadow-[0_0_40px_rgba(255,105,135,0.5)]"
/>


              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg italic text-rose-600"
              >
                Loading your big surprise…
              </motion.p>

              {showFinalBtn && (
               <motion.button
  onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/valentine-day`);
  } else {
    router.push("/create/valentine-day");
  }
}}

  whileHover={{
    scale: 1.08,
    rotateX: -8,
    boxShadow: "0 25px 80px rgba(255,105,135,0.8)",
  }}
  whileTap={{
    scale: 0.96,
    rotateX: 0,
  }}
  transition={{ type: "spring", stiffness: 180, damping: 12 }}
  className="relative mt-6 px-20 py-5 rounded-full
  text-white text-xl font-semibold tracking-wide
  bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600
  shadow-[0_18px_0_rgba(180,40,90,1)]
  perspective-[1000px]"
>
  {/* ✨ glossy highlight */}
  <span className="absolute inset-0 rounded-full
    bg-gradient-to-b from-white/40 to-transparent
    opacity-60 pointer-events-none"
  />

  {/* 💖 heart pulse */}
  <motion.span
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 1.8, repeat: Infinity }}
    className="absolute -top-3 -right-3 text-2xl"
  >
    ❤️
  </motion.span>

  <span className="relative z-10">My Valentine</span>
</motion.button>

              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

