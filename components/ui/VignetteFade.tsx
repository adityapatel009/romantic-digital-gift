"use client";

import { motion } from "framer-motion";

export default function VignetteFade() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="
        fixed inset-0 pointer-events-none z-40
        bg-radial-gradient
      "
      style={{
        background:
          "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.75) 80%)",
      }}
    />
  );
}
