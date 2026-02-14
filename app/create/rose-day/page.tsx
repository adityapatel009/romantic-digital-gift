"use client";

import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import GlowingVideoCard from "@/components/ui/GlowingVideoCard";

export default function RoseDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;

  const photos = gift?.photos || [];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

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

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-black/70" />

      {gift?.music && (
        <audio ref={audioRef} src={gift.music.url} autoPlay loop />
      )}

      <div className="relative z-20 px-4 py-24 max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Hey my sweetheart 💖
          </h1>
          <p className="mt-4 text-pink-300 text-xl">
            Something special for you 🌹
          </p>
        </div>

        <GlowingVideoCard src="/rose-video-2.mp4" />

        <GlowingVideoCard src="/rose-video-1.mp4" />

        {photos.length >= 1 && (
          <div className="space-y-16">
            {[0, 1].map((idx) => {
              const photo = photos[idx];
              if (!photo) return null;
              return (
                <div
                  key={photo.id}
                  className={`flex flex-col md:flex-row gap-10 items-center ${
                    idx === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={photo.preview}
                    className="w-full max-w-[420px] h-[300px] object-cover rounded-2xl shadow-2xl"
                  />
                  <p className="max-w-md text-lg italic text-white/90">
                    {idx === 0
                      ? "This rose is my heart wrapped in petals 🌹"
                      : "You are my forever 💖"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* NAVIGATION */}
        <div className="pt-20 flex flex-col items-center gap-8">

          {!experienceMode && (
            <button
              onClick={() => router.push("/create/photos")}
              className="text-white/70 underline hover:text-white"
            >
              ← Go Back
            </button>
          )}

          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={() => {
                if (experienceMode) {
                  router.push(`/experience/${gift.id}/propose`);
                } else {
                  router.push("/create/propose-day");
                }
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-24 h-24 rounded-full
              bg-gradient-to-br from-pink-400 to-rose-600
              shadow-[0_0_40px_rgba(255,105,180,0.8)]
              flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-full border-2 border-white/40"
              />
              <span className="text-3xl">💍</span>
            </motion.button>

            <motion.p
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-white/80"
            >
              Click this ring to explore new feelings ✨
            </motion.p>
          </div>
        </div>
      </div>
    </main>
  );
}
