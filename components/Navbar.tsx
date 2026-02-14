"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-white font-bold text-xl">
        ValentineGift 💖
      </Link>

      {user ? (
        <div className="flex items-center gap-6">
          <span className="text-pink-300 text-sm">
            Hi, {displayName} 👋
          </span>

          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-pink-500 text-white"
          >
            Dashboard
          </Link>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-5 py-2 rounded-full bg-pink-500 text-white"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
