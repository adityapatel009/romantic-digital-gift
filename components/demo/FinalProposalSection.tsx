"use client";

import { useRef, useState } from "react";
import RingAnimation from "./RingAnimation";
import ConfettiPetalsCanvas from "./ConfettiPetalsCanvas";

export default function FinalProposalSection() {
  const [accepted, setAccepted] = useState(false);
  const petalsRef = useRef<{ fire: () => void }>(null);

  const handleYes = () => {
    setAccepted(true);
    petalsRef.current?.fire(); // 🌹 CONFETTI + PETALS
  };

  return (
    <section className="relative py-40 bg-[#fff4f6] text-center overflow-hidden">
      <ConfettiPetalsCanvas ref={petalsRef} />

      {!accepted ? (
        <>
          <h2 className="text-4xl md:text-5xl font-[cursive] text-[#4b1e1e]">
            Will you be my Valentine?
          </h2>

          <div className="mt-16 flex justify-center gap-6">
            <button
              className="px-8 py-4 rounded-full bg-gray-300 text-gray-700 shadow-md cursor-not-allowed"
            >
              No 🥺
            </button>

            <button
              onClick={handleYes}
              className="
                px-10 py-4 rounded-full
                bg-gradient-to-r from-pink-500 to-red-500
                text-white font-semibold
                shadow-[0_0_40px_rgba(255,105,180,0.6)]
                hover:scale-105 transition
              "
            >
              YES! 💖
            </button>
          </div>
        </>
      ) : (
        <>
          <RingAnimation />
          <h3 className="mt-10 text-4xl font-[cursive] text-pink-600 animate-pulse">
            She said YES 💍💖
          </h3>
        </>
      )}
    </section>
  );
}
