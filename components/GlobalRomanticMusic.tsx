"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalRomanticMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const [started, setStarted] = useState(false);

 const isRomanticStart =
  pathname.includes("/create") ||
  pathname.includes("/experience");



  // 🎵 Start Music
  useEffect(() => {
    if (!isRomanticStart || started) return;

    const handleFirstInteraction = () => {
      if (!audioRef.current) return;

      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setStarted(true);

        let volume = 0;
        const fade = setInterval(() => {
          if (!audioRef.current) return;
          if (volume < 0.4) {
            volume += 0.02;
            audioRef.current.volume = volume;
          } else {
            clearInterval(fade);
          }
        }, 200);
      });

      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [isRomanticStart, started]);

  // 🎧 Pause / Resume Listeners
  useEffect(() => {
    const pause = () => {
      audioRef.current?.pause();
    };

    const resume = () => {
      if (started) {
        audioRef.current?.play().catch(() => {});
      }
    };

    window.addEventListener("pause-romantic-music", pause);
    window.addEventListener("resume-romantic-music", resume);

    return () => {
      window.removeEventListener("pause-romantic-music", pause);
      window.removeEventListener("resume-romantic-music", resume);
    };
  }, [started]);

  return (
    <audio
      ref={audioRef}
      src="/romantic-theme.mp3"
      loop
      preload="auto"
    />
  );
}
