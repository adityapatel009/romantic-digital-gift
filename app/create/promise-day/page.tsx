"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";

/* =========================
   💍 PROMISE DAY – DEEP COMMITMENT
   ========================= */

function getPhotoAtIndex(photos: any[], index: number) {
  if (!photos || photos.length === 0) return null;
  return photos[index % photos.length];
}

export default function PromiseDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const router = useRouter();
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const photos = gift.photos || [];
  const userImg = getPhotoAtIndex(photos, 8);

const [playing, setPlaying] = useState(false);
const [muted, setMuted] = useState(true);

  /* 🎧 video audio fade-in */
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = 0;
    let v = 0;
    const t = setInterval(() => {
      v += 0.02;
      videoRef.current!.volume = Math.min(v, 0.7);
      if (v >= 0.7) clearInterval(t);
    }, 140);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white bg-[#f7f5f2]">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-white/80" />

      {/* 💍 HERO TITLE */}
      <section className="relative z-20 pt-28 pb-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-6xl font-semibold text-[#6b6b6b]"
        >
          💍 Promise Day 💍
        </motion.h1>
      </section>

      {/* 🎥 PROMISE VIDEO */}
      <section className="relative z-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="relative rounded-[2.8rem]
          bg-white/40 backdrop-blur-2xl
          border border-white/40
          shadow-[0_80px_200px_rgba(0,0,0,0.15)]
          overflow-hidden"
        >
          <div className="relative">

  <video
    ref={videoRef}
    src="/promise-video.mp4"
    playsInline
    muted={muted}
    className="w-full h-[420px] object-contain"
    onEnded={() => {
      setPlaying(false);
      window.dispatchEvent(new Event("resume-romantic-music"));
    }}
  />

  {/* ▶ PLAY OVERLAY */}
  {!playing && (
    <div
      onClick={() => {
        videoRef.current?.play();
        setPlaying(true);
        window.dispatchEvent(new Event("pause-romantic-music"));
      }}
      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
    >
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-full text-3xl border border-white/40 hover:scale-110 transition">
        ▶
      </div>
    </div>
  )}

  {/* ⏸ Pause Button */}
  {playing && (
    <button
      onClick={() => {
        videoRef.current?.pause();
        setPlaying(false);
        window.dispatchEvent(new Event("resume-romantic-music"));
      }}
      className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm"
    >
      Pause ⏸
    </button>
  )}

  {/* 🔊 Mute Toggle */}
  {playing && (
    <button
      onClick={() => setMuted(!muted)}
      className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm"
    >
      {muted ? "Unmute 🔊" : "Mute 🔇"}
    </button>
  )}

</div>

        </motion.div>
      </section>

      {/* 🤍 TRANSITION LINE */}
      <section className="relative z-20 pt-20 text-center px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-lg italic text-[#7a7a7a]"
        >
          Some promises are felt, not spoken.
        </motion.p>
      </section>

      {/* 💞 USER PROMISE */}
      <section className="relative z-20 pt-24 px-4 max-w-6xl mx-auto space-y-24">

        {userImg && (
          <PromiseCard
            src={userImg.preview}
            text={`I can’t promise perfection,
but I promise honesty.
I promise to stay,
even when it’s hard.`}
          />
        )}

        {/* 🖼️ FIXED PROMISE IMAGES */}
        <PromiseCard
          src="/promise-fixed-1.jpg"
          text="I promise to protect what we have,
with respect and care."
        />

        <PromiseCard
          src="/promise-fixed-2.jpg"
          text="I promise to grow with you,
not away from you."
          reverse
        />

        <PromiseCard
          src="/promise-fixed-3.jpg"
          text="I promise you’ll never face
this life alone."
        />

        {/* 🌙 FINAL LINE */}
        <div className="pt-20 text-center">
          <p className="text-xl italic text-[#6b6b6b]">
            If tomorrow changes everything,
            my promise to you will remain the same.
          </p>
        </div>

        {/* 🔻 NAVIGATION */}
        <div className="pt-24 flex flex-col items-center gap-10">
          <button
            onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/teddy`);
  } else {
    router.push("/create/teddy-day");
  }
}}

            className="text-[#6b6b6b]/70 underline hover:text-[#6b6b6b]"
          >
            ← Back to Teddy Day
          </button>

          <motion.button
           onClick={() => {
  if (experienceMode) {
    router.push(`/experience/${gift.id}/hug`);
  } else {
    router.push("/create/hug-day");
  }
}}

            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-16 py-5 rounded-full
            border-2 border-[#c2b8ad]
            bg-white/60 backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
            flex items-center gap-4"
          >
            <span className="text-2xl">🤍</span>
            <span className="text-lg font-medium text-[#6b6b6b]">
              Hug Day
            </span>
            <span className="text-2xl">🤍</span>
          </motion.button>
        </div>
      </section>
    </main>
  );
}

/* =========================
   💍 PROMISE CARD
   ========================= */

function PromiseCard({
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
        className="relative w-full md:w-1/2 rounded-[2.6rem]
        bg-white/50 backdrop-blur-xl
        border border-white/50
        shadow-[0_60px_160px_rgba(0,0,0,0.15)]
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
        className="md:w-1/2 text-lg italic text-[#6b6b6b] leading-relaxed"
      >
        {text}
      </motion.p>
    </div>
  );
}
