"use client";

import { motion } from "framer-motion";

const STORY = [
  {
    date: "01 Jan 2024",
    title: "✨ First Hello",
    text: "A simple “hi” that turned into endless conversations and unexpected feelings.",
    side: "right",
  },
  {
    date: "10 Jan 2024",
    title: "🌙 Late Night Talks",
    text: "Talking till midnight, sharing secrets, laughing softly, and forgetting the world.",
    side: "left",
  },
  {
    date: "25 Jan 2024",
    title: "💔 First Fight",
    text: "We disagreed, learned, and realized how much we care about each other.",
    side: "right",
  },
  {
    date: "28 Jan 2024",
    title: "💞 Making Up",
    text: "An apology, a hug, and love that grew even stronger than before.",
    side: "left",
  },
];

export default function OurStoryTimeline() {
  return (
    <section className="relative z-10 bg-[#fff6f7] py-24 overflow-hidden">
      
      {/* Floating hearts already coming from AnimatedBackground */}

      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-[cursive] text-[#5b2b2b]">
          Our Story
        </h2>
        <p className="text-[#8b5d5d] mt-2">
          How it all began…
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto space-y-20 px-4">
        {STORY.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`
              flex
              ${item.side === "left" ? "justify-start" : "justify-end"}
            `}
          >
            <div className="
              w-full md:w-[420px]
              bg-white
              rounded-2xl
              p-6
              shadow-lg
              relative
            ">
              <p className="text-sm text-gray-400 mb-1">
                {item.date}
              </p>
              <h3 className="text-lg font-semibold text-[#3b1f1f]">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {item.text}
              </p>

              {/* Floating heart */}
              <span className="absolute -top-3 right-4 text-pink-400">
                ❤️
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
