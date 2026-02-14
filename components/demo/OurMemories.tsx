"use client";

import MemoryFlipCard from "./MemoryFlipCard";
import { MEMORIES } from "./memoriesData";

export default function OurMemories() {
  return (
    <section className="relative py-24 bg-[#fff4f6] overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-pink-500 tracking-widest text-sm mb-2">
          ✨ OUR MEMORIES ✨
        </p>
        <h2 className="text-4xl font-[cursive] text-gray-800">
          Captured Moments
        </h2>
        <p className="text-gray-500 mt-2">
          Every picture tells a story of us…
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-12 px-6">
        {MEMORIES.map((m, i) => (
          <div key={i} className="animate-float">
            <MemoryFlipCard {...m} />
          </div>
        ))}
      </div>
    </section>
  );
}
