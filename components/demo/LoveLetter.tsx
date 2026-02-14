"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   LETTER CONTENT (2 PAGES)
========================= */
const LETTER_PAGES = [
  `My love,

Somewhere between our first conversations
and the moments when silence felt comfortable,
you slowly became my favorite part of every day.

I didn’t realize when it happened,
but suddenly your smile felt like home,
your voice felt like comfort,
and your presence felt like peace.

With you, even ordinary days
started feeling special.
You made me laugh when I was tired,
you listened when I had nothing to say,
and you stayed when things weren’t easy.

I never believed in magic,
until I found it in the way you care.`,

  `With you, I learned what love truly means.

It means choosing each other,
even on difficult days.
It means growing together,
learning together,
and dreaming together.

No matter where life takes us,
I promise to stand by you,
to support your dreams,
and to love you in all the little ways
that matter the most.

You are my today,
my tomorrow,
and every hope I hold for the future.

Always yours,
With all my heart. ❤️`
];

/* =========================
   COMPONENT
========================= */
export default function LoveLetter() {
  const [page, setPage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  const fullText = LETTER_PAGES[page];
  const TYPING_SPEED = 30; // ms (slow = romantic)

  /* Typing effect */
  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [page]);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, TYPING_SPEED);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <section className="relative py-40 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          w-full max-w-4xl
          bg-[#fff7e6]
          rounded-[32px]
          shadow-[0_40px_90px_rgba(0,0,0,0.25)]
          p-16
          text-[#3b1d1d]
        "
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Title */}
        <h2 className="text-5xl font-[cursive] text-pink-600 text-center mb-3">
          A Letter From My Heart 💌
        </h2>

        <p className="text-center text-sm text-gray-500 mb-10">
          Page {page + 1} of {LETTER_PAGES.length}
        </p>

        {/* Typed Text */}
        <p className="text-2xl leading-relaxed whitespace-pre-line min-h-[420px]">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* Controls */}
        <div className="mt-14 flex justify-center gap-6">
          {page > 0 && (
            <button
              onClick={() => setPage(page - 1)}
              className="
                px-8 py-3 rounded-full
                border border-pink-300
                text-pink-600
                hover:bg-pink-50
              "
            >
              ← Previous
            </button>
          )}

          {page < LETTER_PAGES.length - 1 && index >= fullText.length && (
            <button
              onClick={() => setPage(page + 1)}
              className="
                px-10 py-3 rounded-full
                bg-pink-500
                text-white
                hover:bg-pink-600
              "
            >
              Next Page →
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
