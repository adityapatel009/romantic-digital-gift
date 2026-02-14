"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import HeroText from "./HeroText";
import HeroCanvasMock from "./HeroCanvasMock";

export default function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  };

  return (
    <section className="pt-24 relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b0205] via-[#120308] to-black">
      
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 px-6 max-w-7xl mx-auto">

        <div className="flex flex-col items-start gap-8">
          <HeroText />

          {!user && (
            <button
              onClick={handleLogin}
              className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
            >
              Login with Google 🚀
            </button>
          )}
        </div>

        <div className="relative z-0 pointer-events-none">
          <HeroCanvasMock />
        </div>
      </div>
    </section>
  );
}
