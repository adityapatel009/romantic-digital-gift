"use client";

import Link from "next/link";
import { useState } from "react";

import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import HeartBurst from "@/components/ui/HeartBurst";

export default function HeroText() {
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="relative z-30 pointer-events-auto max-w-xl">
      {/* Accent text */}
      <p
        className="text-4xl mb-2 text-slate-300"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        Make Them
      </p>

      {/* Main heading */}
      <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-white">
        Feel <span className="text-pink-500">Special</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-slate-400 leading-relaxed">
        A premium digital gift that opens like a secret —
        filled with words, memories, and love.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 relative z-30 pointer-events-auto">
        
        {/* 💖 PRIMARY CTA */}
        <Link href="/create" className="relative">
          <MagneticButton>
            <button
              onClick={(e) => {
                setBurst({ x: e.clientX, y: e.clientY });
                setTimeout(() => setBurst(null), 700);
              }}
              className="
                relative
                px-8 py-4 text-lg rounded-full
                bg-gradient-to-r from-pink-500 to-fuchsia-500
                text-white
                shadow-lg shadow-pink-500/30
                hover:shadow-pink-500/50
                transition-all duration-300
                overflow-hidden
              "
            >
              Create Your Gift 💖
            </button>
          </MagneticButton>
        </Link>

        {/* Heart burst */}
        {burst && <HeartBurst x={burst.x} y={burst.y} />}

        {/* Secondary CTA */}
        <Link href="/demo">
          <Button
            variant="outline"
            className="
              px-8 py-4 rounded-full
              border-white/30 text-white
              hover:bg-white/10
              transition
            "
          >
            See Live Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}
