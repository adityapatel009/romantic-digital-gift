"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: string;
  delay: string;
  size: string;
};

export default function GlobalFloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      size: `${12 + Math.random() * 18}px`,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] text-pink-300/30 animate-float-heart"
          style={{
            left: h.left,
            animationDelay: h.delay,
            fontSize: h.size,
          }}
        >
          💗
        </span>
      ))}
    </div>
  );
}
