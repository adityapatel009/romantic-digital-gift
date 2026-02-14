"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0b0205] via-[#120308] to-black text-white flex items-center justify-center px-6 overflow-hidden">

      {/* 💗 Ambient Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-pink-500/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative
          z-10
          w-full
          max-w-md
          p-10
          rounded-3xl
          bg-white/10
          backdrop-blur-2xl
          border border-white/20
          shadow-[0_40px_100px_rgba(0,0,0,0.7)]
        "
      >
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome Back 💖
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to create and manage your romantic digital gifts.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            py-4
            rounded-full
            bg-gradient-to-r from-pink-500 to-purple-500
            font-semibold
            shadow-lg
            hover:shadow-[0_20px_60px_rgba(255,0,150,0.5)]
            transition
          "
        >
          {loading ? "Redirecting..." : "Login with Google 🚀"}
        </motion.button>

        <div className="mt-8 text-center text-sm text-gray-400">
          By continuing, you agree to spread love responsibly 💌
        </div>
      </motion.div>
    </main>
  );
}
