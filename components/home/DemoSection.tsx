"use client";

import FadeIn from "../ui/FadeIn";
import DemoPreview from "../demo/DemoPreview";
import FloatingHearts from "@/components/ui/FloatingHearts";

export default function DemoSection() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-rose-50 overflow-hidden">
      
      {/* 🌫 Background depth blur */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl -z-10" />

      {/* 💗 Floating hearts */}
      <FloatingHearts />

      <FadeIn>
        <h2 className="text-center text-3xl font-[cursive] text-gray-900">
          See the Magic Before You Create
        </h2>
        <p className="text-center text-gray-700 mt-4 max-w-xl mx-auto">
          Tap through a live demo to understand how your gift will feel.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <DemoPreview />
      </FadeIn>
    </section>
  );
}
