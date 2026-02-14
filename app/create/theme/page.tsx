"use client";
import { useGiftStore } from "@/lib/gift-store";
import ProgressBar from "@/components/create/ProgressBar";
import Link from "next/link";

const themes = ["Soft Pink", "Romantic Purple", "Midnight Love"];

export default function ThemePage() {
  const { updateGift } = useGiftStore();

  return (
    <main className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <ProgressBar step={3} />

      <h1 className="text-2xl font-semibold text-gray-900">
        Choose a visual theme
      </h1>

      <div className="mt-8 space-y-4">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => updateGift({ visualTheme: t })}
            className="w-full p-5 rounded-xl bg-rose-50 text-left"
          >
            {t}
          </button>
        ))}
      </div>

      <Link
        href="/create/music"
        className="block mt-10 text-center py-4 rounded-full text-white
                   bg-gradient-to-r from-pink-500 to-purple-500"
      >
        Next →
      </Link>
    </main>
  );
}
