"use client";
import { motion } from "framer-motion";

export default function LockScreen({
  onUnlock,
  message,
}: {
  onUnlock: () => void;
  message?: string;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-4">🔒</div>
      <p className="text-gray-700">
        {message || "A private gift is waiting for you"}
      </p>
      {!message && (
        <button
          onClick={onUnlock}
          className="mt-4 px-6 py-2 rounded-full bg-black text-white"
        >
          Tap to unlock
        </button>
      )}
    </div>
  );
}

