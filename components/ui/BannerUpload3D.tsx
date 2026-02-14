"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  preview: string | null;
  onUpload: (file: File | null) => void;
}

export default function BannerUpload3D({ preview, onUpload }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      className="perspective-[1200px]"
    >
      <motion.label
        whileHover={{ scale: 1.03 }}
        className="
          relative block w-full h-48
          rounded-2xl overflow-hidden
          bg-white/70 backdrop-blur-xl
          border border-pink-200
          shadow-[0_30px_60px_rgba(255,120,180,0.35)]
          cursor-pointer
        "
      >
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onUpload(e.target.files?.[0] || null)}
        />

        {/* CONTENT */}
        {!preview ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-medium text-gray-700">
              Click to upload banner photo
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, HEIC supported
            </p>
          </div>
        ) : (
          <motion.img
            src={preview}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
          />
        )}

        {/* UPLOADED BADGE */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              absolute bottom-3 right-3
              px-3 py-1 rounded-full
              bg-green-500 text-white text-xs
              shadow
            "
          >
            ✓ Uploaded
          </motion.div>
        )}
      </motion.label>
    </motion.div>
  );
}
