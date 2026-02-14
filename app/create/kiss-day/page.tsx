"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";

/* =========================
   💋 KISS DAY – ROMANTIC & ELEGANT
   ========================= */

function getPhotoAtIndex(photos: any[], index: number) {
  if (!photos || photos.length === 0) return null;
  return photos[index % photos.length];
}

export default function KissDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const router = useRouter();
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;


 const photos = gift?.photos || [];
  const userImg1 = getPhotoAtIndex(photos, 11);
  const userImg2 = getPhotoAtIndex(photos, 12);

  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden bg-[#fdecef] text-[#6a2c3a]">
        <BackgroundVideoRotator />
        <div className="absolute inset-0 bg-[#fdecef]/90" />

        {/* 💋 HERO */}
        <section className="relative z-20 pt-28 pb-24 px-4 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-6xl font-semibold"
          >
            💋 Kiss Day 💋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mt-10 text-lg md:text-xl italic leading-relaxed"
          >
            Some kisses don’t touch lips,  
            they touch hearts.  
            In this moment, let closeness speak  
            louder than words.
          </motion.p>
        </section>

        {/* 💋 CONTENT */}
        <section className="relative z-20 px-4 pb-28 max-w-6xl mx-auto space-y-28">

          {/* 🧑‍🤝‍🧑 USER IMAGE 1 */}
          {userImg1 && (
            <KissCard
              src={userImg1.preview}
              text={`This kiss carries everything
I feel for you —
softly, honestly, deeply.`}
            />
          )}

          {/* 🧑‍🤝‍🧑 USER IMAGE 2 */}
          {userImg2 && (
            <KissCard
              src={userImg2.preview}
              reverse
              text={`In this kiss,
the world fades away
and it’s just us.`}
            />
          )}

          {/* 💕 FIXED KISS IMAGES */}
          {[
            "kiss-fixed-1.jpg",
            "kiss-fixed-2.jpg",
            "kiss-fixed-3.jpg",
            "kiss-fixed-4.jpg",
            "kiss-fixed-5.jpg",
            "kiss-fixed-6.jpg",
            "kiss-fixed-7.jpg",
          ].map((img, i) => (
            <KissCard
              key={img}
              src={`/${img}`}
              reverse={i % 2 === 1}
              text={
                i % 2 === 0
                  ? "A soft kiss, sealed with love."
                  : "A quiet promise, felt in a kiss."
              }
            />
          ))}

          {/* 🔻 NAVIGATION */}
          <div className="pt-24 flex flex-col items-center gap-10">
            <button
              onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/hug`);
  } else {
    router.push("/create/hug-day");
  }
}}

              className="underline text-[#6a2c3a]/70 hover:text-[#6a2c3a]"
            >
              ← Back to Hug Day
            </button>

            <motion.button
           onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/valentine-gate`);
  } else {
    router.push("/create/valentine-gate");
  }
}}

              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-5 rounded-full
              bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400
              shadow-[0_10px_40px_rgba(255,105,135,0.4)]
              text-white text-lg font-medium"
            >
              ❤️ Valentine’s Day
            </motion.button>
          </div>
        </section>
      </main>
    </>
  );
}

/* =========================
   💋 KISS IMAGE CARD
   ========================= */

function KissCard({
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

  const rotateX = useTransform(y, [-30, 30], [5, -5]);
  const rotateY = useTransform(x, [-30, 30], [-5, 5]);

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
      className={`flex flex-col md:flex-row items-center gap-14 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        className="relative w-full md:w-1/2 rounded-[2.8rem]
        bg-white/60 backdrop-blur-xl
        border border-white/50
        shadow-[0_50px_140px_rgba(0,0,0,0.18)]
        p-6"
      >
        <img
          src={src}
          className="w-full max-h-[420px] object-contain rounded-2xl"
        />
      </motion.div>

      <motion.p
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="md:w-1/2 text-lg italic leading-relaxed"
      >
        {text}
      </motion.p>
    </div>
  );
}
