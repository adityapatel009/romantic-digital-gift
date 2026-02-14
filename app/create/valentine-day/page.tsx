"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGiftStore } from "@/lib/gift-store";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function ValentineDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const router = useRouter();

  const storeGift = useGiftStore((state) => state.gift);
  const gift = experienceMode ? experienceGift : storeGift;


  const [stage, setStage] = useState<"entry" | "letters">("entry");
  const [openedLetter, setOpenedLetter] = useState<any>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [confetti, setConfetti] = useState(false);
  const [ringBurst, setRingBurst] = useState(false);

  const receiverName = gift.receiverName?.trim();
  const senderName = gift.senderName?.trim();
const violinRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  violinRef.current = new Audio("/violin-swell.mp3");
  violinRef.current.volume = 0.5;
}, []);

const handleLetterClick = (letter: any) => {
  violinRef.current?.play().catch(() => {});
  setOpenedLetter({
    id: letter.id,
    message: letter.message(receiverName || "My Love"),
  });
};
const [showHint, setShowHint] = useState(true);
const [bouquetPos, setBouquetPos] = useState({ x: 0, y: 0 });
const bouquetRef = useRef<HTMLDivElement | null>(null);

const [sparkles, setSparkles] = useState<
  { right: number; top: number; delay: number }[]
>([]);

useEffect(() => {
  if (!bouquetRef.current) return;

  const rect = bouquetRef.current.getBoundingClientRect();

  setBouquetPos({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowHint(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  if (stage === "entry") {
    const generated = Array.from({ length: 6 }).map(() => ({
      right: 20 + Math.random() * 10,
      top: 40 + Math.random() * 10,
      delay: Math.random() * 2,
    }));
    setSparkles(generated);
  }
}, [stage]);

useEffect(() => {
  if (stage === "entry") {
    const timer = setTimeout(() => setShowHint(true), 2000);
    return () => clearTimeout(timer);
  }
}, [stage]);

  /* ================= MOUSE PARALLAX ================= */

  const handleMouseMove = (e: any) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    setMouse({ x, y });
  };
const [goldBurst, setGoldBurst] = useState(false);
const [hintPosition, setHintPosition] = useState<{ right: string; top: string } | null>(null);

useEffect(() => {
  setHintPosition({
    right: "26%",
    top: "48%",
  });
}, []);

  /* ================= LETTER DATA ================= */

  const letters = [
    {
      id: 1,
      message: (name: string) =>
        `My dearest ${name}, safar wahi tak hai jaha tak tum ho,
      Nazar wahi tak hai jaha tak tum ho....
      Hazari phool hai es gulshan me, lekin khushboo wahi tak hai jaha tak tum ho...`,
    },
    {
      id: 2,
      message: (name: string) =>
        `${name}, Main aadat hu uski, woh zarurat hain meri,
      main farmayish hu uski, woh ibadat hain meri...,
      itni aasani se kaise nikal du use apni dil se,
      main khwab hu uska, woh haqeeqat hain meri...`,
    },
    {
      id: 3,
      message: (name: string) =>
        `Every moment with you, ${name}, feels magical.`,
    },
    {
      id: 4,
      message: (name: string) =>
        `${name},Nazar ko nazar ki khabar na lage,
      lpo accha bhi is qadar na lage,
      dekha hai tumhe us nazar se, 
      jis nazar se tumhe nazar na lage!!..
       will you walk with me forever?`,
    },
  ];

  /* ================= HANDLERS ================= */

 const handleBouquetClick = () => {
  setShowHint(false); // permanently hide
  setStage("letters");
};


 const handleClose = () => {
  if (openedLetter?.id === 4) {
    setRingBurst(true);
    setConfetti(true);

    // remove body manipulation
    setTimeout(() => {
      if (experienceMode) {
  router.push(`/experience/${gift.id}/valentine-day/memories`);
} else {
  router.push("/create/valentine-day/memories");
}

    }, 1200);
  }

  setOpenedLetter(null);
};

  return (
    <main
      onMouseMove={handleMouseMove}
      style={{ perspective: 1500 }}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#1a001f] to-black"
    >
      <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5 }}
  onAnimationComplete={() => setGoldBurst(true)}
  className="mt-12 text-right text-pink-600 text-3xl md:text-4xl"
  style={{ fontFamily: "'Great Vibes', cursive" }}
>
  — Tumhara, {senderName || "Someone"} 💖
</motion.p>

{goldBurst &&
  sparkles.map((sparkle, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        opacity: 0,
        scale: 0
      }}
      transition={{ duration: 1.2 }}
    />
  ))
}

      {/* 🌌 Background Layer */}
      <motion.div
        animate={{
          x: mouse.x * 30,
          y: mouse.y * 30,
        }}
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,#ff0080_0%,#1a001f_40%,#000_100%)]"
      />

      {/* ✨ Gold Luxury Name */}
      {receiverName && (
        <motion.h1
          animate={{
            x: mouse.x * 20,
            y: mouse.y * 20,
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="
            text-6xl md:text-8xl font-extrabold
            bg-[linear-gradient(90deg,#ffd700,#fff5b7,#ffd700)]
            bg-[length:200%_200%]
            bg-clip-text text-transparent
            drop-shadow-[0_0_40px_rgba(255,215,0,0.9)]
            mb-10
          "
        >
          {receiverName}
        </motion.h1>
      )}



{/* 👦 HERO WRAPPER */}
<div className="relative z-20 flex items-center justify-center gap-16">

  {/* 👦 Hero */}
  <motion.div
    animate={{
      x: mouse.x * 40,
      y: mouse.y * 40,
      scale: stage === "letters" ? 0.85 : 1,
      filter: stage === "letters" ? "blur(6px)" : "blur(0px)",
    }}
    transition={{ duration: 1 }}
    className="relative"
  >
    {/* 💡 Soft Spotlight */}
    {stage === "entry" && (
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="
          absolute
          right-[10%]
          top-[35%]
          w-[250px]
          h-[250px]
          bg-pink-500/30
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />
    )}

    {/* 👦 Boy Image */}
    <motion.img
      src="/hero-boy.png"
      className="w-80 relative z-10"
      animate={
        stage === "entry"
          ? { rotate: [0, -1.5, 1.5, 0] }
          : {}
      }
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* 🌹 Bouquet Click Area */}
    {stage === "entry" && (
  <div
    ref={bouquetRef}
    onClick={handleBouquetClick}
    className="
      absolute
      right-[18%]
      top-[42%]
      w-[32%]
      h-[28%]
      cursor-pointer
      z-20
    "
  />
)}


    {/* ✨ Roses Sparkle */}
    {stage === "entry" &&
      sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 text-sm pointer-events-none"
          style={{
            right: `${s.right}%`,
            top: `${s.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: s.delay,
          }}
        >
          ✨
        </motion.div>
      ))}
  </motion.div>

  {/* 🌹 RIGHT SIDE HINT */}
{stage === "entry" && showHint && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: "fixed",
      left: bouquetPos.x + 80,
      top: bouquetPos.y - 40,
    }}
    className="z-[9999]"
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="
        bg-white/95
        backdrop-blur-md
        text-pink-600
        px-6 py-3
        rounded-2xl
        shadow-2xl
        text-base
        font-semibold
        whitespace-nowrap
        flex items-center gap-2
      "
    >
      💖 Tap the roses
    </motion.div>

    {/* Tracking Arrow */}
    <motion.div
      animate={{ x: [0, -8, 0] }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className="absolute -left-6 top-1/2 -translate-y-1/2 text-xl"
    >
    </motion.div>
  </motion.div>
)}




</div>

      {/* ✉️ Envelopes */}
      <AnimatePresence>
        {stage === "letters" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-10 z-40"
          >
            {letters.map((letter, i) => (
              <motion.div
                key={letter.id}
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative w-[180px] h-[120px] cursor-pointer"
                onClick={() => handleLetterClick(letter)}
              >
                <img src="/envelope-base.png" className="w-full h-full" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
<AnimatePresence>
  {openedLetter && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[9999]"
    >

      {/* 🌌 Fantasy Sky Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#ff4da6_0%,#2a0033_40%,#000_100%)] pointer-events-none -z-10" />

      {/* ✨ Floating Dust Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-sm pointer-events-none -z-10"
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
            opacity: 0,
          }}
          animate={{
            y: "-20%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* 👑 Cinematic Push Layer */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none -z-10"
      />

      {/* 💌 Envelope Back */}
      <motion.div
        initial={{ rotateY: 90, scale: 0.8 }}
        animate={{ rotateY: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute z-0 pointer-events-none"
        style={{ perspective: 2000 }}
      >
        <img
          src="/envelope-base.png"
          className="w-[450px] opacity-30"
        />
      </motion.div>

      {/* 🔴 Wax Seal */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 0, rotate: 360 }}
        transition={{ duration: 0.8 }}
        className="absolute z-0 pointer-events-none"
      >
        ❤️
      </motion.div>

      {/* 📜 Letter Panel */}
      <motion.div
        initial={{ rotateX: 90, scale: 0.7 }}
        animate={{ rotateX: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-[92%] max-w-3xl z-[1000]"
        style={{ perspective: 2000 }}
      >

        <motion.div
          className="
            bg-[#fffaf2]
            p-12 md:p-16
            rounded-3xl
            shadow-[0_60px_150px_rgba(0,0,0,0.7)]
            border border-rose-200
            relative z-[1001]
            max-h-[80vh]
            overflow-y-auto
          "
        >

          {/* Paper Grain */}
          <div className="absolute inset-0 bg-[url('/paper-grain.png')] opacity-20 mix-blend-multiply pointer-events-none" />

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="
              text-rose-800
              text-2xl md:text-3xl
              leading-relaxed
              whitespace-pre-wrap
              break-words
            "
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {openedLetter.message}
          </motion.p>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-right text-pink-600 text-3xl md:text-4xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            — Tumhara, {senderName || "Someone"} 💖
          </motion.p>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="
              relative z-[2000]
              mt-12 px-10 py-4 rounded-full
              bg-gradient-to-r from-pink-500 via-rose-500 to-red-500
              text-white font-bold text-lg
              shadow-[0_20px_50px_rgba(255,0,120,0.6)]
            "
          >
            Continue 💌
          </motion.button>

        </motion.div>
      </motion.div>

    </motion.div>
  )}
</AnimatePresence>















      {/* 💍 Ring Burst */}
      {ringBurst &&
        Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              opacity: 0,
            }}
            transition={{ duration: 1.2 }}
          />
        ))}

      {ringBurst && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.4 }}
          transition={{ duration: 0.6 }}
          className="absolute text-6xl z-50"
        >
          💍
        </motion.div>
      )}

      {/* 🎉 Confetti */}
      {confetti &&
        Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-500 rounded-full"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
            }}
            transition={{ duration: 1 }}
          />
        ))}
    </main>
  );
}
