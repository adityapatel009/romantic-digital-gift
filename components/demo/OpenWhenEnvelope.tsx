"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function OpenWhenEnvelope({
  open,
  onDone,
}: {
  open: boolean;
  onDone: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* ENVELOPE */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[320px] h-[220px]"
          >
            {/* BODY */}
            <div className="absolute inset-0 bg-pink-100 rounded-xl shadow-xl" />

            {/* FLAP */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 180 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute top-0 left-0 w-full h-1/2 bg-pink-200 origin-top rounded-t-xl"
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* LETTER */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -90, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              onAnimationComplete={onDone}
              className="absolute left-1/2 -translate-x-1/2 -top-6 w-[260px] h-[160px] bg-white rounded-lg shadow-lg"
            >
              <div className="p-4 text-center text-sm text-gray-500">
                A letter for you 💗
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
