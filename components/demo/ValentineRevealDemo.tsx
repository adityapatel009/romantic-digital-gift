"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import ValentineIntroCard from "./ValentineIntroCard";
import EnvelopeSection from "./EnvelopeSection";
import LoveLetter from "./LoveLetter";
import OurStoryTimeline from "./OurStoryTimeline";
import OurMemoriesSection from "./OurMemoriesSection";
import OpenWhenSection from "@/components/demo/OpenWhenSection";
import FuturePlansSection from "@/components/demo/FuturePlansSection";
import FinalProposalSection from "@/components/demo/FinalProposalSection";

/* =========================
   EVENT DATA
========================= */
const DEMO_EVENT = {
  title: "Happy Valentine’s Day",
  name: "Nitya",
  quote: "My heart beats only for you.",
  startDate: "2026-02-06T00:00:00",
};

function getTimeDiff(start: string) {
  const diff = Date.now() - new Date(start).getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ValentineRevealDemo() {
  const [revealed, setRevealed] = useState(false);
  const [time, setTime] = useState(() =>
    getTimeDiff(DEMO_EVENT.startDate)
  );

  useEffect(() => {
    const i = setInterval(() => {
      setTime(getTimeDiff(DEMO_EVENT.startDate));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className="relative w-full">
      <AnimatedBackground />

      <ValentineIntroCard
        title={DEMO_EVENT.title}
        name={DEMO_EVENT.name}
        quote={DEMO_EVENT.quote}
        time={time}
      />

      {/* ENVELOPE (ONLY ONCE) */}
      {!revealed && (
        <EnvelopeSection onReveal={() => setRevealed(true)} />
      )}

      {/* AFTER REVEAL */}
      {revealed && (
        <>
          <LoveLetter />
          <OurStoryTimeline />
          <OurMemoriesSection />
        </>
      )}
<FuturePlansSection /> 
<FinalProposalSection />

      {/* 🔽 ALWAYS VISIBLE */}
      <OpenWhenSection />
    </main>
  );
}
