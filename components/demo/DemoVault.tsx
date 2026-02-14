"use client";

import { useState } from "react";

type DemoVaultProps = {
  onUnlock: () => void;
};

export default function DemoVault({ onUnlock }: DemoVaultProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handlePress = (num: string) => {
    if (code.length < 8) setCode(code + num);
  };

  const handleUnlock = () => {
    if (code !== "14022024") {
      setError(true);
      setTimeout(() => setError(false), 500);
    } else {
      onUnlock(); // ✅ NEXT SCREEN TRIGGER
    }
  };

  return (
    <div
      className="
        w-full max-w-sm
        rounded-[28px]
        bg-white/90
        backdrop-blur-xl
        shadow-[0_30px_80px_rgba(255,105,180,0.35)]
        p-6 text-center
        border border-white/40
        transition-transform
        hover:-translate-y-1
      "
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl animate-pulse" />
          <div className="relative text-4xl">🔒</div>
        </div>

        <h2 className="font-[cursive] text-2xl mt-3 text-pink-600">
          The Vault
        </h2>

        <div className="mt-2 inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
          DEMO PASS: 14022024
        </div>
      </div>

      {/* Input */}
      <div className={`mb-6 ${error ? "animate-shake" : ""}`}>
        <input
          value={code}
          readOnly
          placeholder="DDMMYYYY"
          className="
            w-full text-center text-lg tracking-widest
            p-3 rounded-xl
            bg-pink-50 border border-pink-200
            focus:outline-none
          "
        />
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => handlePress(String(n))}
            className="
              h-14 rounded-full
              bg-white
              shadow-[0_8px_20px_rgba(0,0,0,0.08)]
              text-lg font-medium
              transition
              active:scale-90
              hover:bg-pink-50
            "
          >
            {n}
          </button>
        ))}

        <div />

        <button
          onClick={() => handlePress("0")}
          className="
            h-14 rounded-full
            bg-white
            shadow-[0_8px_20px_rgba(0,0,0,0.08)]
            text-lg font-medium
            transition
            active:scale-90
            hover:bg-pink-50
          "
        >
          0
        </button>

        <button
          onClick={() => setCode("")}
          className="
            h-14 rounded-full
            text-pink-500 text-lg
            transition
            active:scale-90
          "
        >
          ⌫
        </button>
      </div>

      {/* Unlock */}
      <button
        onClick={handleUnlock}
        className={`
          w-full py-4 rounded-full
          bg-gradient-to-r from-pink-400 to-rose-500
          text-white font-semibold
          transition
          hover:shadow-[0_0_40px_rgba(255,105,180,0.7)]
          ${error ? "bg-red-400" : ""}
        `}
      >
        UNLOCK GIFT
      </button>
    </div>
  );
}
