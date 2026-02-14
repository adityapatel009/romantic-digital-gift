"use client";

import { useState } from "react";
import DemoVault from "@/components/demo/DemoVault";
import ValentineRevealDemo from "@/components/demo/ValentineRevealDemo";
import DemoMusicPlayer from "@/components/demo/DemoMusicPlayer";

export default function DemoPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#2a0d12]">
      {!unlocked ? (
        /* 🔒 Vault Screen */
        <div className="min-h-screen flex items-center justify-center px-4">
          <DemoVault onUnlock={() => setUnlocked(true)} />
        </div>
      ) : (
        /* ❤️ Valentine Reveal Screen */
        <ValentineRevealDemo />
        
      )}
      {unlocked && <DemoMusicPlayer />}

    </main>
  );
}
