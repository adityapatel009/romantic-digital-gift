"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  image: string;
  title: string;
  emoji: string;
  text: string;
};

export default function MemoryFlipCard({
  image,
  title,
  emoji,
  text,
}: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);

  /* 🔊 PLAY FLIP SOUND (safe) */
  const playFlipSound = () => {
    if (typeof window === "undefined") return;

    const audio = new Audio("/sounds/flip.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  /* 🌀 TILT EFFECT */
  const handleMove = (e: React.MouseEvent) => {
    const card = tiltRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = -((y / rect.height) - 0.5) * 14;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };

  const reset = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = "rotateX(0) rotateY(0)";
    }
  };

  return (
    /* 🔹 FLIP CONTROLLER */
    <div className="perspective-1000">
      <div
        className="
          relative w-[260px] h-[360px]
          transition-transform duration-700
          transform-style-preserve-3d
          hover:rotate-y-180
        "
        onMouseEnter={playFlipSound}
        onTouchStart={playFlipSound} // 📱 mobile safe
      >
        {/* FRONT */}
        <div
          className="
            absolute inset-0
            bg-white/70 backdrop-blur-xl
            rounded-2xl
            shadow-[0_30px_60px_rgba(0,0,0,0.25)]
            backface-hidden
          "
        >
          {/* TILT LAYER */}
          <div
            ref={tiltRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="h-full transition-transform duration-300"
          >
            <div className="p-4">
              <div className="relative h-[240px] rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {emoji} {title}
                </p>
              </div>
            </div>

            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/60 rounded-sm rotate-2" />
          </div>
        </div>

        {/* BACK */}
        <div
          className="
            absolute inset-0
            bg-pink-100
            rounded-2xl
            shadow-xl
            rotate-y-180
            backface-hidden
            flex items-center justify-center
            p-6
          "
        >
          <p className="text-sm text-gray-700 leading-relaxed text-center">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
