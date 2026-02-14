"use client";

import { useGiftStore } from "@/lib/gift-store";
import BackgroundVideoRotator from "@/components/ui/BackgroundVideoRotator";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


/* =========================
   💍 DAY 2 – PROPOSE DAY
   ========================= */

function ProposeDaySection({
  photos = [],
  startIndex = 2,
}: {
  photos: any[];
  startIndex?: number;
}) {
  const userImg1 = photos[startIndex];
  const userImg2 = photos[startIndex + 1];

  return (
    <section className="relative z-20 px-4 pt-28 pb-28 max-w-6xl mx-auto space-y-20">

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="absolute inset-0 bg-pink-500/25 blur-3xl rounded-[2.5rem]" />
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] px-8 py-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
          <p className="text-lg md:text-xl leading-relaxed italic text-white/95">
            No matter how many times we fight, I am never going to stop loving you.
            I will never give up on us. I will love you forever.
            I want to spend my today, tomorrow, my entire life with you —
            my sweetheart. 💖🌹
          </p>
        </div>
      </motion.div>

      {/* 🎞️ REEL / VIDEO (NO CROP) */}
        <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
        className="relative mx-auto max-w-3xl mb-20"
      >
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-[2.5rem]" />
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
          {/* Replace src with your reel/video */}
          <video
            src="/propose-reel.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[360px] object-cover"
          />
        </div>
      </motion.div>

      {/* 🖼️ FIXED IMAGE 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-full md:w-1/2 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.8)] p-6">
          <img
            src="/propose-fixed-1.jpg"
            className="w-full max-h-[420px] object-contain mx-auto"
          />
        </div>

        <p className="md:w-1/2 text-lg italic text-white/90 leading-relaxed">
          Tum meri zindagi ka woh maqsad ho jiske bina sab kuch hote huye bhi
          adhoora lagta hai… tumse milkar samajh aaya ki pyaar sirf saath rehna
          nahi hota, pyaar toh woh wajah hota hai jiske liye insaan har din jeena chahe. ❤️
        </p>
      </div>

      {/* 🧑‍🤝‍🧑 USER IMAGE 1 */}
      {userImg1 && (
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.85)]"
          >
            <img
              src={userImg1.preview}
              className="w-full h-[340px] object-cover"
            />
          </motion.div>

          <p className="md:w-1/2 text-lg italic text-white/90 leading-relaxed">
            Tumhara haath thaam kar maine apni har manzil ko pehchana,
            kyunki tum hi woh wajah ho jiske liye main har din behtar banna chahta hoon.
          </p>
        </div>
      )}

      {/* 🖼️ FIXED IMAGE 2 */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-full md:w-1/2 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.8)] p-6">
          <img
            src="/propose-fixed-2.jpg"
            className="w-full max-h-[420px] object-contain mx-auto"
          />
        </div>

        <p className="md:w-1/2 text-lg italic text-white/90 leading-relaxed">
          Tum sirf meri kahani ka hissa nahi ho, tum meri kahani ka matlab ho.
          Tumhare saath zindagi ek khoobsurat haqeeqat lagti hai jise main har roz jeena chahta hoon. 💍
        </p>
      </div>

      {/* 🧑‍🤝‍🧑 USER IMAGE 2 */}
      {userImg2 && (
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.85)]"
          >
            <img
              src={userImg2.preview}
              className="w-full h-[340px] object-cover"
            />
          </motion.div>

          <p className="md:w-1/2 text-lg italic text-white/90 leading-relaxed">
            Agar kabhi poocha jaaye meri zindagi ki sabse badi jeet kya hai —
            toh bina soche sirf tumhara naam loonga. ✨
          </p>
        </div>
      )}

      {/* 🔚 DIVIDER */}
      <div className="flex justify-center pt-20">
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      </div>
    </section>
  );
}
export default function StoryPage() {
  const gift = useGiftStore((s) => s.gift);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundVideoRotator />
      <div className="absolute inset-0 bg-black/70" />
      <ProposeDaySection photos={gift?.photos || []} />
    </main>
  );
}
