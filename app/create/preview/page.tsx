"use client";

import { useGiftStore } from "@/lib/gift-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const router = useRouter();
  const { gift } = useGiftStore();
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  // 🔗 Generate experience link safely
  const experienceLink =
    typeof window !== "undefined" && gift?.id
      ? `${window.location.origin}/gift/${gift.id}`
      : "";

 useEffect(() => {
  if (gift.bannerImage) {
    setBannerUrl(gift.bannerImage);
  }
}, [gift.bannerImage]);


  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* 🎞️ BANNER BACKGROUND */}
      {bannerUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bannerUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="
            w-full max-w-2xl
            rounded-3xl
            bg-white/15 backdrop-blur-xl
            border border-white/20
            shadow-[0_40px_100px_rgba(0,0,0,0.5)]
            p-10
            text-center
          "
        >
          <p className="text-sm uppercase tracking-widest text-pink-300 mb-2">
            A message from
          </p>

          <h2 className="text-3xl md:text-4xl text-white">
            {gift.senderName || "Someone"}
          </h2>

          <p className="mt-2 text-white/70">
            to {gift.receiverName || "Someone special"}
          </p>

          <div className="w-20 h-px bg-pink-400/40 mx-auto my-6" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white leading-relaxed"
          >
            {gift.message || "Your message will appear here…"}
          </motion.p>

         {/* BUTTON SECTION */}
<div className="mt-10 flex flex-col items-center gap-4">

  {/* CREATE MODE → Go to Photos */}
  {!gift?.id && (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("/create/photos")}
      className="
        px-14 py-4
        rounded-full
        text-lg
        text-white
        bg-gradient-to-r from-pink-500 to-purple-500
      "
    >
      Continue to Upload Memories ✨
    </motion.button>
  )}

  {/* EXPERIENCE MODE */}
  {gift?.id && (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push(`/gift/${gift.id}`)}
        className="
          px-14 py-4
          rounded-full
          text-lg
          text-white
          bg-gradient-to-r from-pink-500 to-purple-500
        "
      >
        Open Experience 💖
      </motion.button>

      <button
        onClick={() => navigator.clipboard.writeText(experienceLink)}
        className="text-sm text-pink-300 underline"
      >
        Copy Share Link 🔗
      </button>
    </>
  )}
</div>

        </motion.div>
      </div>
    </main>
  );
}
