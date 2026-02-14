"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UnlockCTA() {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotateX: 6 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => router.push("/create")}
      className="
        relative
        px-10 py-6
        rounded-3xl
        bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500
        text-white
        shadow-[0_20px_60px_rgba(255,105,180,0.45)]
        backdrop-blur-xl
        text-lg
        font-medium
      "
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">🔓</span>
        <span>Tap to unlock the surprise</span>
      </div>

      {/* glow */}
      <div className="absolute inset-0 rounded-3xl blur-2xl bg-pink-400/40 -z-10" />
    </motion.button>
  );
}
