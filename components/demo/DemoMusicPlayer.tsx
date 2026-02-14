"use client";

import { useRef, useState } from "react";

export default function DemoMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/love-song.mp3" loop />

      <div className="
        fixed bottom-6 left-6 z-50
        bg-black/60 backdrop-blur-md
        text-white px-4 py-3 rounded-full
        flex items-center gap-3
        shadow-lg
      ">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 transition"
        >
          {playing ? "⏸" : "▶️"}
        </button>

        <div className="text-sm leading-tight">
          <p className="font-medium">Love Song</p>
          <p className="text-xs text-white/70">Playing for you</p>
        </div>
      </div>
    </>
  );
}
