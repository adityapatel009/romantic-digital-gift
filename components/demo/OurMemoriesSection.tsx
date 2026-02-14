"use client";

import { motion } from "framer-motion";
import { MEMORIES } from "./memoriesData";
import MemoryFlipCard from "./MemoryFlipCard";


export default function OurMemoriesSection() {
  return (
    <section className="relative py-32 bg-[#fff6f8] overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-20">
        <p className="inline-block px-6 py-2 rounded-full bg-pink-100 text-pink-600 text-sm tracking-widest">
          ✨ OUR MEMORIES ✨
        </p>

        <h2 className="mt-6 text-5xl font-[cursive] text-[#5a2b2b]">
          Captured Moments
        </h2>

        <p className="mt-4 text-gray-500">
          Every picture tells a story of us…
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-14 px-6">
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <MemoryFlipCard {...memory} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
