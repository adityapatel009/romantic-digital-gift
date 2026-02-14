"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

/* =========================
   💍 DAY 2 – PROPOSE DAY
   ========================= */

export default function ProposeDaySection({
  photos = [],
  startIndex = 2,
}: {
  photos: any[];
  startIndex?: number;
}) {
  const userImg1 = photos[startIndex];
  const userImg2 = photos[startIndex + 1];

  return (
    <section className="relative z-20 px-4 pt-28 pb-28 max-w-6xl mx-auto space-y-24">

      {/* 💍 CINEMATIC TITLE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="relative text-center max-w-4xl mx-auto"
      >
        <div className="absolute inset-0 bg-pink-500/30 blur-3xl rounded-[3rem]" />
        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[3rem] px-8 py-12 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
          <motion.h2
            animate={{ letterSpacing: ["0.05em", "0.14em", "0.05em"] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-4xl md:text-6xl font-semibold text-pink-300"
          >
            💍 PROPOSE DAY 💍
          </motion.h2>
          <p className="mt-5 text-xl md:text-2xl italic text-white/85">
            When love gathers courage to speak…
          </p>
        </div>
      </motion.div>

      {/* 💖 MAIN PROPOSAL MESSAGE */}
      <GlowText>
        No matter how many times we fight, I am never going to stop loving you.
        I will never give up on us. I will love you forever.
        I want to spend my today, tomorrow, my entire life with you —
        my sweetheart. 💖🌹
      </GlowText>

      {/* 🎬 VIDEO 1 */}
      <VideoBlock src="/propose-reel.mp4" glow="bg-purple-500/30" />

      {/* 🖼️ IMAGE + MESSAGE */}
      <GlassImage
        src="/propose-fixed-1.jpg"
        text="Tum meri zindagi ka woh maqsad ho jiske bina sab kuch hote huye bhi
        adhoora lagta hai… tumse milkar samajh aaya ki pyaar sirf saath rehna
        nahi hota, pyaar toh woh wajah hota hai jiske liye insaan har din jeena chahe. ❤️"
      />

      {/* 🎬 VIDEO 2 */}
      <VideoBlock src="/propose-reel-2.mp4" glow="bg-pink-500/30" />

      {/* 🧑‍🤝‍🧑 USER IMAGE + MESSAGE */}
      {userImg1 && (
        <GlassImage
          src={userImg1.preview}
          reverse
          text="Tumhara haath thaam kar maine apni har manzil ko pehchana,
          kyunki tum hi woh wajah ho jiske liye main har din behtar banna chahta hoon."
        />
      )}

      {/* 🎬 VIDEO 3 */}
      <VideoBlock src="/propose-reel-3.mp4" glow="bg-rose-500/30" />

      {/* 🖼️ IMAGE + MESSAGE */}
      <GlassImage
        src="/propose-fixed-2.jpg"
        text="Tum sirf meri kahani ka hissa nahi ho, tum meri kahani ka matlab ho.
        Tumhare saath zindagi ek khoobsurat haqeeqat lagti hai jise main har roz jeena chahta hoon. 💍"
      />

      {/* 🧑‍🤝‍🧑 USER IMAGE + MESSAGE */}
      {userImg2 && (
        <GlassImage
          src={userImg2.preview}
          reverse
          text="Agar kabhi poocha jaaye meri zindagi ki sabse badi jeet kya hai —
          toh bina soche sirf tumhara naam loonga. ✨"
        />
      )}

      {/* 🔚 DIVIDER */}
      <div className="flex justify-center pt-24">
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      </div>
    </section>
  );
}

/* =========================
   💓 GLOW TEXT
   ========================= */

function GlowText({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative max-w-3xl mx-auto text-center px-6 py-10"
    >
      <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-[2.5rem]" />
      <p className="relative text-lg md:text-xl italic text-white/95 leading-relaxed">
        {children}
      </p>

      <motion.span
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 right-6 text-pink-400"
      >
        💓
      </motion.span>
    </motion.div>
  );
}

/* =========================
   🎬 VIDEO CARD
   ========================= */

function VideoBlock({ src, glow }: { src: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }

  return (
    <div className="relative mx-auto max-w-3xl perspective-[1400px]">
      <div className={`absolute -inset-6 ${glow} blur-3xl opacity-60 rounded-[3rem]`} />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        style={{ rotateX, rotateY }}
        className="relative rounded-[2.8rem] bg-white/10 backdrop-blur-2xl
        border border-white/20 shadow-[0_80px_200px_rgba(0,0,0,0.9)] overflow-hidden"
      >
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

function GlassImage({
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
        bg-white/10 backdrop-blur-2xl border border-white/20
        shadow-[0_60px_180px_rgba(0,0,0,0.85)] p-6"
      >
        <img
          src={src}
          className="w-full max-h-[420px] object-contain rounded-2xl"
        />
      </motion.div>

      <GlowText>{text}</GlowText>
    </div>
  );
}
