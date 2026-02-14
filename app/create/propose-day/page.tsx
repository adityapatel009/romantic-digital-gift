"use client";

import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProposeDaySection from "@/components/ProposeDaySection";

export default function ProposeDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;

  const photos = gift?.photos || [];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  /* 🎵 Music fade-in */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let v = 0;
    const t = setInterval(() => {
      v += 0.02;
      audioRef.current!.volume = Math.min(v, 0.5);
      if (v >= 0.5) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  const handleBack = () => {
    if (experienceMode) {
      router.push(`/experience/${gift.id}/rose`);
    } else {
      router.push("/create/rose-day");
    }
  };

  const handleNext = () => {
    if (experienceMode) {
      router.push(`/experience/${gift.id}/chocolate`);
    } else {
      router.push("/create/chocolate-day");
    }
  };

  if (!gift) return null;

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-black/70" />

      {gift.music && (
        <audio ref={audioRef} src={gift.music.url} autoPlay loop />
      )}

      {/* 💍 PROPOSE CONTENT */}
      <ProposeDaySection photos={photos} startIndex={2} />

      {/* 🔻 NAVIGATION */}
      <div className="relative z-30 pb-24 flex flex-col items-center gap-10">

        {/* ⬅ BACK */}
        <button
          onClick={handleBack}
          className="text-white/70 underline hover:text-white"
        >
          ← Back to Rose Day
        </button>

        {/* 🍫 NEXT */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-24 h-24 rounded-full
            bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500
            shadow-[0_0_40px_rgba(255,193,7,0.8)]
            flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border-2 border-white/30"
            />
            <span className="text-3xl">🍫</span>
          </motion.button>

          <motion.p
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-white/80"
          >
            A sweet surprise is waiting 🍫✨
          </motion.p>
        </div>
      </div>
    </main>
  );
}
