"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";

/* =========================
   🍫 CHOCOLATE DAY – PREMIUM & DARK
   ========================= */
function getPhotoAtIndex(photos: any[], index: number) {
  if (!photos || photos.length === 0) return null;
  return photos[index % photos.length];
}

export default function ChocolateDayPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const photos = gift?.photos || [];
  const userImg1 = getPhotoAtIndex(photos, 4);
  const userImg2 = getPhotoAtIndex(photos, 5);



  /* 🎵 music fade-in */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let v = 0;
    const t = setInterval(() => {
      v += 0.02;
      audioRef.current!.volume = Math.min(v, 0.45);
      if (v >= 0.45) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white bg-[#1a0f0a]">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-black/70" />

      {gift?.music && (
        <audio ref={audioRef} src={gift.music.url} autoPlay loop />
      )}

      {/* 🍫 HERO */}
      <section className="relative z-20 h-screen flex items-center justify-center">
        <ChocolateDripTop />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-semibold text-amber-300">
            🍫 Chocolate Day 🍫
          </h1>
          <p className="mt-6 text-xl text-white/80 italic">
            Some love is rich, deep, and irresistible.
          </p>
        </motion.div>
      </section>

      {/* 🍫 CONTENT */}
      <section className="relative z-20 px-4 pb-28 max-w-6xl mx-auto space-y-28">

        {/* 🎬 VIDEO 1 */}
        <ChocolateVideo src="/chocolate-video-1.mp4" />

        {/* 🖼️ FIXED IMAGE 1 */}
        <ChocolateImage
          src="/chocolate-fixed-1.jpg"
          text="Like fine chocolate, you don’t need many words —
          your presence alone is enough."
        />

        {/* 🧑‍🤝‍🧑 USER IMAGE 1 */}
        {userImg1 && (
          <ChocolateImage
            src={userImg1.preview}
            reverse
            text="You are the sweetness I never expected,
            but now I can’t imagine my days without you."
          />
        )}

        {/* 🍫 DRIP DIVIDER */}
        <ChocolateDivider />

        {/* 🎬 VIDEO 2 */}
        <ChocolateVideo src="/chocolate-video-2.mp4" />

        {/* 🖼️ FIXED IMAGE 2 */}
        <ChocolateImage
          src="/chocolate-fixed-2.jpg"
          text="You are the kind of sweetness
          I never get tired of."
        />

        {/* 🧑‍🤝‍🧑 USER IMAGE 2 */}
        {userImg2 && (
          <ChocolateImage
            src={userImg2.preview}
            reverse
            text="Every moment with you feels
            rich, warm, and comforting."
          />
        )}

        {/* 🖼️ FIXED IMAGE 3 */}
        <ChocolateImage
          src="/chocolate-fixed-3.jpg"
          text="Every day with you feels
          a little more indulgent."
        />

        {/* 🔻 NAVIGATION */}
        <div className="pt-20 flex flex-col items-center gap-10">
          <button
  onClick={() => {
    if (experienceMode) {
      router.push(`/experience/${gift.id}/propose`);
    } else {
      router.push("/create/propose-day");
    }
  }}

            className="text-white/70 underline hover:text-white"
          >
            ← Back to Propose Day
          </button>

          <motion.button
  onClick={() => {
    if (experienceMode) {
      router.push(`/experience/${gift.id}/teddy`);
    } else {
      router.push("/create/teddy-day");
    }
  }}

            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-4 rounded-xl
            bg-gradient-to-r from-amber-900 via-amber-700 to-yellow-600
            shadow-[0_0_40px_rgba(255,193,7,0.6)]
            text-lg font-medium"
          >
            🧸 Next Sweet Surprise
          </motion.button>
        </div>
      </section>
    </main>
  );
}

/* =========================
   🍫 DRIP TOP
   ========================= */

function ChocolateDripTop() {
  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 2.2, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full h-64
      bg-gradient-to-b from-[#3b1f12] to-transparent"
    />
  );
}

/* =========================
   🎬 VIDEO CARD
   ========================= */

function ChocolateVideo({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }

  return (
    <div className="relative mx-auto max-w-3xl perspective-[1400px]">
      <div className="absolute -inset-6 bg-amber-800/30 blur-3xl rounded-[3rem]" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        style={{ rotateX, rotateY }}
        className="relative rounded-[2.8rem]
        bg-white/5 backdrop-blur-2xl border border-white/15
        shadow-[0_80px_200px_rgba(0,0,0,0.9)]
        overflow-hidden"
      >
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0
          bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12"
        />

        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[360px] object-contain rounded-[2.8rem]"
        />
      </motion.div>
    </div>
  );
}

/* =========================
   🖼️ IMAGE + MESSAGE
   ========================= */

function ChocolateImage({
  src,
  text,
  reverse = false,
}: {
  src: string;
  text: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.04, rotateY: reverse ? -5 : 5 }}
        transition={{ duration: 0.8 }}
        className="relative w-full md:w-1/2 rounded-[2.5rem]
        bg-white/5 backdrop-blur-2xl border border-white/15
        shadow-[0_60px_180px_rgba(0,0,0,0.85)] p-6"
      >
        <img
          src={src}
          className="w-full max-h-[420px] object-contain rounded-2xl"
        />
      </motion.div>

      <motion.p
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="md:w-1/2 text-lg italic text-amber-200 leading-relaxed relative"
      >
        {text}
        <span className="absolute -top-4 -right-2">🍫</span>
      </motion.p>
    </div>
  );
}

/* =========================
   🍫 DRIP DIVIDER
   ========================= */

function ChocolateDivider() {
  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-3 bg-[#3b1f12]" />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-1/2 w-4 h-16 bg-[#3b1f12] rounded-b-full"
      />
    </div>
  );
}
