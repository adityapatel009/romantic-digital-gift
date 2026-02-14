"use client";

import { motion } from "framer-motion";

type Props = {
  date: string;
  title: string;
  text: string;
  align: "left" | "right";
};

export default function StoryCard({
  date,
  title,
  text,
  align,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex ${
        align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
        <p className="text-sm text-gray-500 mb-1">{date}</p>
        <h3 className="text-lg font-semibold text-[#5a2d2f]">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
