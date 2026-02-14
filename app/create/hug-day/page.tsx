"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";

/* =========================
   🤍 HUG DAY – HEALING & WARM
   ========================= */

function getPhotoAtIndex(photos: any[], index: number) {
  if (!photos || photos.length === 0) return null;
  return photos[index % photos.length];
}

export default function HugDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const router = useRouter();
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;


  const photos = gift?.photos || [];
  const userImg1 = getPhotoAtIndex(photos, 9);
  const userImg2 = getPhotoAtIndex(photos, 10);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f7f4f1] text-[#5b4a42]">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-[#f7f4f1]/90" />

      {/* 🤍 HERO */}
      <section className="relative z-20 pt-28 pb-24 px-4 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-6xl font-semibold"
        >
          🤍 Hug Day 🤍
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mt-10 text-lg md:text-xl italic leading-relaxed"
        >
          A hug is my way of holding you close,
          even when words fall short.
          <br />
          In this moment, let everything feel lighter,
          warmer, safer.
        </motion.p>
      </section>

      {/* 🤍 CONTENT */}
      <section className="relative z-20 px-4 pb-28 max-w-6xl mx-auto space-y-28">

        {/* 🧑‍🤝‍🧑 USER IMAGE 1 */}
        {userImg1 && (
          <HugCard
            src={userImg1.preview}
            text="This hug is my way of saying —
            you are safe with me, always."
          />
        )}

        {/* 🧑‍🤝‍🧑 USER IMAGE 2 */}
        {userImg2 && (
          <HugCard
            src={userImg2.preview}
            reverse
            text="Whenever the world feels heavy,
            let this hug remind you —
            you’re not alone."
          />
        )}

        {/* 🧸 FIXED HUG IMAGES (8) */}
        {[
          "hug-fixed-1.jpg",
          "hug-fixed-2.jpg",
          "hug-fixed-3.jpg",
          "hug-fixed-4.jpg",
          "hug-fixed-5.jpg",
          "hug-fixed-6.jpg",
          "hug-fixed-7.jpg",
          "hug-fixed-8.jpg",
        ].map((img, i) => (
          <HugCard
            key={img}
            src={`/${img}`}
            reverse={i % 2 === 1}
            text={
              i % 2 === 0
                ? "Some hugs reach places words never can."
                : "In this hug, everything feels calm again."
            }
          />
        ))}

        {/* 🔻 NAVIGATION */}
        <div className="pt-24 flex flex-col items-center gap-10">
          <button
            onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/promise`);
  } else {
    router.push("/create/promise-day");
  }
}}

            className="underline text-[#5b4a42]/70 hover:text-[#5b4a42]"
          >
            ← Back to Promise Day
          </button>

          <motion.button
            onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/kiss`);
  } else {
    router.push("/create/kiss-day");
  }
}}

            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-5 rounded-full
            bg-white/70 backdrop-blur-xl
            border border-white/60
            shadow-[0_10px_40px_rgba(0,0,0,0.12)]
            text-lg font-medium"
          >
            💋 Kiss Day
          </motion.button>
        </div>
      </section>
    </main>
  );
}

/* =========================
   🤍 HUG IMAGE CARD
   ========================= */

function HugCard({
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

  const rotateX = useTransform(y, [-30, 30], [4, -4]);
  const rotateY = useTransform(x, [-30, 30], [-4, 4]);

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
        shadow-[0_50px_140px_rgba(0,0,0,0.15)]
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
