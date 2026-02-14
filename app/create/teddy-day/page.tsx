"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";

/* =========================
   🧸 TEDDY DAY – SOFT & COMFORTING
   ========================= */

function getPhotoAtIndex(photos: any[], index: number) {
  if (!photos || photos.length === 0) return null;
  return photos[index % photos.length];
}

export default function TeddyDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const photos = gift.photos || [];
  const userImg1 = getPhotoAtIndex(photos, 6);
  const userImg2 = getPhotoAtIndex(photos, 7);

  /* 🎵 music fade-in */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let v = 0;
    const t = setInterval(() => {
      v += 0.015;
      audioRef.current!.volume = Math.min(v, 0.4);
      if (v >= 0.4) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white bg-[#f5eee8]">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-[#f5eee8]/90" />

      {gift?.music && (

        <audio ref={audioRef} src={gift.music.url} autoPlay loop />
      )}

      {/* 🧸 HERO */}
      <section className="relative z-20 pt-28 pb-24 px-4 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-6xl font-semibold text-[#8b5e3c]"
        >
          🧸 Teddy Day 🧸
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="relative mt-10 mx-auto max-w-3xl"
        >
          <div className="absolute inset-0 bg-[#d6b49c]/40 blur-3xl rounded-[2.5rem]" />
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] px-8 py-10 shadow-xl">
            <p className="text-lg md:text-xl italic text-[#5a3b2e] leading-relaxed">
              This teddy is my hug in your arms.  
              No matter how busy life gets,  
              no matter how far we are,  
              my care will always find you,  
              because love isn’t about presence —  
              it’s about comfort you can feel.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 🧸 CONTENT */}
      <section className="relative z-20 px-4 pb-28 max-w-6xl mx-auto space-y-24">

        <TeddyImage
          src="/teddy-fixed-1.jpg"
          text="Whenever you feel tired or lonely, imagine this teddy holding you for me."
        />

        {userImg1 && (
          <TeddyImage
            src={userImg1.preview}
            reverse
            text="Some hugs don’t need arms — they just need love and trust."
          />
        )}

        <TeddyImage
          src="/teddy-fixed-2.jpg"
          text="This teddy carries my warmth, even when I’m not around."
        />

        <TeddyImage
          src="/teddy-fixed-3.jpg"
          reverse
          text="Comfort is knowing someone is always thinking about you."
        />

        {userImg2 && (
          <TeddyImage
            src={userImg2.preview}
            text="No distance can stop care that comes from the heart."
          />
        )}

        <TeddyImage
          src="/teddy-fixed-4.jpg"
          reverse
          text="This teddy is a promise of softness, safety, and love."
        />

        {/* 🔻 NAVIGATION */}
        <div className="pt-24 flex flex-col items-center gap-10">

          <button
            onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/chocolate`);
  } else {
    router.push("/create/chocolate-day");
  }
}}

            className="text-[#5a3b2e]/70 underline hover:text-[#5a3b2e]"
          >
            ← Back to Chocolate Day
          </button>

          {/* 💍 NEXT – PROMISE DAY */}
          <motion.button
            onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/promise`);
  } else {
    router.push("/create/promise-day");
  }
}}

            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-14 py-5 rounded-full
            bg-gradient-to-r from-[#caa47a] via-[#e2c39a] to-[#caa47a]
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            flex items-center gap-4"
          >
            <span className="text-2xl">🤝</span>
            <span className="text-lg font-medium text-[#5a3b2e]">
              Promise Day
            </span>
            <span className="text-2xl">🤝</span>
          </motion.button>
        </div>
      </section>
    </main>
  );
}

/* =========================
   🧸 IMAGE + MESSAGE CARD
   ========================= */

function TeddyImage({
  src,
  text,
  reverse = false,
}: {
  src: string;
  text: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-40, 40], [6, -6]);
  const rotateY = useTransform(x, [-40, 40], [-6, 6]);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        className="relative w-full md:w-1/2 rounded-[2.5rem]
        bg-white/50 backdrop-blur-xl border border-white/40
        shadow-[0_40px_120px_rgba(0,0,0,0.2)] p-6"
      >
        <img
          src={src}
          className="w-full max-h-[420px] object-contain rounded-2xl"
        />
      </motion.div>

      <motion.p
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="md:w-1/2 text-lg italic text-[#5a3b2e] leading-relaxed"
      >
        {text}
      </motion.p>
    </div>
  );
}
