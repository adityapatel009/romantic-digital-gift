"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/lib/gift-store";
import OccasionCard from "@/components/create/OccasionCard";
import FloatingHearts from "@/components/ui/FloatingHearts";
import VignetteFade from "@/components/ui/VignetteFade";
import MobileParallax from "@/components/ui/MobileParallax";

const occasions = [
  { id: "valentine", title: "Valentine’s Day", desc: "A soft, romantic surprise made just for them" },
  { id: "birthday", title: "Birthday", desc: "A personal moment to make their day special" },
  { id: "anniversary", title: "Anniversary", desc: "Celebrate your journey together" },
  { id: "proposal", title: "Proposal", desc: "Ask the most important question beautifully" },
  { id: "just-because", title: "Just Because", desc: "No reason needed to show love" },
];

export default function OccasionPage() {
  const router = useRouter();
  const { updateGift } = useGiftStore();

  const handleSelect = (id: string) => {
    updateGift({ occasion: id });
    router.push("/create/names");
  };

  return (
    <section className="
      relative min-h-screen px-6 py-28
      bg-gradient-to-b from-[#16070c] via-[#1c0912] to-[#090205]
      overflow-hidden
    ">
      <VignetteFade />
      <FloatingHearts />

      {/* Soft glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px]
                      bg-pink-500/10 blur-[180px] rounded-full" />

      <MobileParallax>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">
            Select an Occasion
          </h1>

          <p className="mt-3 text-center text-slate-400">
            Choose the moment you want to turn into a memory
          </p>

          <div className="mt-14 space-y-5">
            {occasions.map((o) => (
              <OccasionCard
                key={o.id}
                title={o.title}
                desc={o.desc}
                onClick={() => handleSelect(o.id)}
              />
            ))}
          </div>
        </div>
      </MobileParallax>
    </section>
  );
}
