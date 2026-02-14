"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function MobileParallax({ children }: { children: ReactNode }) {
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, [-100, 100], [-20, 20]);

  return (
    <motion.div
      style={{ y: parallaxY }}
      onPointerMove={(e) => {
        const center = window.innerHeight / 2;
        y.set(e.clientY - center);
      }}
    >
      {children}
    </motion.div>
  );
}
