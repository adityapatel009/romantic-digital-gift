"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/demo-bg/bg1.jpg",
  "/demo-bg/bg2.jpg",
  "/demo-bg/bg3.jpg",
  "/demo-bg/bg4.jpg",
];

export default function AnimatedBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px)",
          }}
        />
      </AnimatePresence>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#2a0d12]/70 pointer-events-none" />
    </div>
  );
}
