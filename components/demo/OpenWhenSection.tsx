"use client";

import { useState } from "react";
import OpenWhenCard from "./OpenWhenCard";
import OpenWhenEnvelope from "./OpenWhenEnvelope";
import OpenWhenLetterModal from "./OpenWhenLetterModal";

const LETTERS = [
  { title: "you miss me", premium: false, content: "I’m always with you ❤️" },
  { title: "you're sad", premium: false, content: "You are stronger than you know." },
  { title: "you're happy", premium: true, content: "Your happiness is my joy 💖" },
  { title: "you can't sleep", premium: true, content: "Close your eyes and feel my hug 🌙" },
];

export default function OpenWhenSection() {
  const [active, setActive] = useState<number | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const openFlow = (index: number) => {
    setActive(index);
    setShowEnvelope(true);
  };

  return (
    <section className="relative z-20 py-32 bg-[#fff4f6] text-center">
      <h2 className="text-4xl font-[cursive] text-[#4b1e1e]">
        Open When…
      </h2>

      <p className="mt-3 text-gray-500">
        Little reminders of my love for every mood
      </p>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
        {LETTERS.map((item, i) => (
          <OpenWhenCard
            key={i}
            title={item.title}
            locked={item.premium}
            onOpen={() => openFlow(i)}
          />
        ))}
      </div>

      {/* ✉️ Envelope Animation */}
      <OpenWhenEnvelope
        open={showEnvelope}
        onDone={() => setShowEnvelope(false)}
      />

      {/* 📜 Letter Modal */}
      {active !== null && !showEnvelope && (
        <OpenWhenLetterModal
          open={true}
          title={LETTERS[active].title}
          content={LETTERS[active].content}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
