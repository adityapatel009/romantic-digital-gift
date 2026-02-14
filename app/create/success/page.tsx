"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const sp = useSearchParams();
  const giftId = sp.get("giftId") || "demo";
  const link = `http://localhost:3000/reveal/${giftId}`;

  const [mode, setMode] = useState<"now" | "later">("now");
  const [dt, setDt] = useState("");

  const saveSchedule = async () => {
    await fetch("/api/schedule/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        giftId,
        scheduledAt: mode === "later" ? dt : null,
      }),
    });
    alert("Saved! 🎉");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-[cursive] text-gray-900">
          Your Gift is Ready 🎁
        </h1>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-500">Your private link</p>
          <p className="font-mono text-sm mt-1 break-all">{link}</p>
        </div>

        <div className="mt-8 text-left">
          <p className="font-medium mb-2">When should it open?</p>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              checked={mode === "now"}
              onChange={() => setMode("now")}
            />
            Open now
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={mode === "later"}
              onChange={() => setMode("later")}
            />
            Schedule for later
          </label>

          {mode === "later" && (
            <input
              type="datetime-local"
              className="mt-3 w-full p-3 border rounded-lg"
              value={dt}
              onChange={(e) => setDt(e.target.value)}
            />
          )}
        </div>

        <button
          onClick={saveSchedule}
          className="mt-6 w-full py-3 rounded-full text-white
                     bg-gradient-to-r from-pink-500 to-purple-500"
        >
          Save Schedule
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
