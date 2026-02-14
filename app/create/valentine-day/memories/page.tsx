"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useInView,  useTransform,useSpring } from "framer-motion";
import { useGiftStore } from "@/lib/gift-store";


export default function MemoriesPage({
  gift: experienceGift,
  experienceMode = false,
}: any) {
  const storeGift = useGiftStore((s) => s.gift);
  const gift = experienceMode ? experienceGift : storeGift;


  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [introDone, setIntroDone] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);
const { scrollY } = useScroll();

const layer1 = useTransform(scrollY, [0, 1000], [0, -50]);
const layer2 = useTransform(scrollY, [0, 1000], [0, -120]);

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.6) {
        vol += 0.05;
        audioRef.current!.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 300);
  }
}, []);
useEffect(() => {
  let fade: NodeJS.Timeout;

  if (audioRef.current) {
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    let vol = 0;

    fade = setInterval(() => {
      if (vol < 0.6 && audioRef.current) {
        vol += 0.05;
        audioRef.current.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 300);
  }

  return () => clearInterval(fade);
}, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      <ScrollProgressBar />
      <AmbientBackground />
      <FloatingQuotes />
<ParallaxLayers />
<GlowBlobs />
<FloatingLoveQuotes />

<audio ref={audioRef} src="/romantic-music.mp3" loop />
<motion.div
  style={{ y: layer1 }}
  className="fixed inset-0 bg-gradient-to-b from-pink-900/20 to-transparent -z-30"
/>

<motion.div
  style={{ y: layer2 }}
  className="fixed inset-0 bg-gradient-to-t from-purple-900/20 to-transparent -z-40"
/>

      {/* Cinematic Intro */}
      {!introDone && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl md:text-6xl font-bold text-pink-400"
          >
            Our Love Story Begins...
          </motion.h1>
        </motion.div>
      )}

      {/* Dynamic Light */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${lightPos.x}px ${lightPos.y}px, rgba(255,0,120,0.12), transparent 80%)`,
        }}
      />

      {/* HERO */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">
          Our Beautiful Memories
        </h1>

        <p className="mt-8 text-lg text-gray-300 max-w-2xl">
          Every moment we’ve shared becomes forever.
        </p>
      </div>


     <TimelineBlock gift={gift} />
<FinalProposal gift={gift} />

    </div>
  );
}

/* ================= SCROLL BAR ================= */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[4px] origin-left z-[999]
      bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500"
    />
  );
}

/* ================= BACKGROUND ================= */

function AmbientBackground() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="fixed inset-0 -z-20 
      bg-gradient-to-br from-black via-[#1a001f] to-black"
    />
  );
}


/* ================= FLOATING LOVE QUOTES ================= */

function FloatingQuotes() {
  const quotes = [
    "Forever starts with you ❤️",
    "You are my favorite place 💕",
    "With you, life is magical ✨",
  ];

  return (
    <>
      {quotes.map((q, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: 0.4 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity }}
          className="fixed text-pink-300 text-sm left-[10%] md:left-[20%]"
          style={{ left: `${20 + i * 20}%` }}
        >
          {q}
        </motion.div>
      ))}
    </>
  );
}

/* ================= TIMELINE ================= */

function TimelineBlock({ gift }: any) {
  const photos = gift?.photos ?? [];


  return (
    <div className="flex flex-col items-center space-y-24 pb-40 relative z-10">

      {/* First Video with Cinematic Reveal */}
      <CinematicSection>
        <VideoCard src="/memory-6main.mp4" />
      </CinematicSection>

      {photos[0] && (
        <CinematicSection>
          <ImageCard src={photos[0].preview} />
        </CinematicSection>
      )}

      <CinematicSection>
        <VideoCard src="/memory-2main.mp4" />
      </CinematicSection>

      <CinematicSection>
        <SimpleGrid images={photos.slice(1, 3)} />
      </CinematicSection>

      <CinematicSection>
        <VideoCard src="/memory-3main.mp4" />
      </CinematicSection>

      <CinematicSection>
        <FlipGrid images={photos.slice(6, 10)} />
      </CinematicSection>

      <CinematicSection>
        <VideoCard src="/memory-4main.mp4" />
      </CinematicSection>

    </div>
  );
}

/* ================= VIDEO ================= */



function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const isVertical = src.includes("memory-2main");
  const isMemory3 = src.includes("memory-3main");

  const isInView = useInView(containerRef, { amount: 0.5 });

  /* 🎬 Auto Pause When Out Of View */
  useEffect(() => {
    if (!isInView && playing) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [isInView, playing]);

 const handlePlay = () => {
  videoRef.current?.play();
  setPlaying(true);

  // 🔇 Pause background music
  window.dispatchEvent(new Event("pause-romantic-music"));
};


 const handlePause = () => {
  videoRef.current?.pause();
  setPlaying(false);

  // 🎵 Resume background music
  window.dispatchEvent(new Event("resume-romantic-music"));
};

useEffect(() => {
  if (!isInView && playing) {
    videoRef.current?.pause();
    setPlaying(false);

    window.dispatchEvent(new Event("resume-romantic-music"));
  }
}, [isInView, playing]);


  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full flex justify-center relative z-10 group"
    >
      <div
        className={`relative rounded-3xl overflow-hidden 
        backdrop-blur-2xl bg-white/5 border border-white/20
        shadow-[0_30px_120px_rgba(255,0,120,0.25)]
        transition-all duration-700
      hover:shadow-[0_40px_160px_rgba(255,0,120,0.45)]
before:absolute
before:inset-0
before:bg-gradient-to-t
before:from-black/60
before:via-transparent
before:to-black/40
before:pointer-events-none
transition-transform
duration-[6000ms]
ease-linear
hover:scale-[1.03]


transition-transform duration-[6000ms] ease-linear hover:scale-[1.03]

        ${
          isVertical 
  ? "w-[320px] md:w-[360px]" 
  : "w-[85%] md:w-[750px]"

        }`}
      >
        {/* 🎥 VIDEO */}
       <video
  ref={videoRef}
  src={src}
  muted={muted}
  playsInline
  className={`
    w-full
    ${
      isVertical
        ? "aspect-[9/16] max-h-[58vh] object-cover"
        : "aspect-video max-h-[70vh] object-contain"
    }
    ${
      isMemory3
        ? "-rotate-90 scale-[1.2]"
        : ""
    }
  `}
/>


        {/* 🌟 Apple Glass Shine Layer */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-30 mix-blend-overlay" />

        {/* ✨ Light Reflection Sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000 ease-out" />
        </div>

        {/* ▶ PLAY BUTTON */}
        {!playing && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20"
          >
            <div className="
              bg-white/20 backdrop-blur-md 
              p-6 rounded-full text-3xl 
              border border-white/40
              animate-pulse
              shadow-[0_0_30px_rgba(255,0,120,0.9)]
              hover:scale-110 transition
            ">
              ▶
            </div>
          </div>
        )}

        {/* ⏸ Pause Button */}
        {playing && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handlePause}
            className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm hover:scale-110 transition z-30"
          >
            Pause ⏸
          </motion.button>
        )}

        {/* 🔊 Sound Toggle */}
        {playing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setMuted(!muted)}
            className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm hover:scale-110 transition z-30"
          >
            {muted ? "Unmute 🔊" : "Mute 🔇"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}


/* ================= IMAGE ================= */

function ImageCard({ src }: { src: string }) {
  return (
    <div className="w-[92%] max-w-[520px] mx-auto">
      <div className="
        group relative rounded-3xl overflow-hidden
        backdrop-blur-xl bg-white/5 border border-white/20
        shadow-[0_20px_60px_rgba(255,0,120,0.25)]
        transition-all duration-500
        hover:scale-[1.03]
      ">
        <img
          src={src}
          className="
            w-full 
            aspect-[6/5] 
            object-cover
          "
        />
      </div>
    </div>
  );
}



/* ================= SIMPLE GRID ================= */

function SimpleGrid({ images }: { images: any[] }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 
    w-[85%] md:w-[850px] mx-auto">
      {images.map((img, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden 
          backdrop-blur-xl bg-white/5 border border-white/20
          shadow-lg hover:scale-[1.03] transition-all duration-500"
        >
          <img
            src={img.preview ?? img}
            className="w-full h-[300px] object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/* ================= FLIP ================= */

function FlipGrid({ images }: { images: any[] }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-[92%] md:w-[1000px]">
      {images.map((img, i) => (
        <FlipCard key={i} image={img.preview ?? img} />
      ))}
    </div>
  );
}

function FlipCard({ image }: { image: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
  className="w-full h-[280px] cursor-pointer relative z-30"
  style={{ perspective: "1000px" }}
  onClick={() => setFlipped(!flipped)}
>

      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <img src={image} className="w-full h-full object-cover"/>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center bg-pink-500 text-white rounded-3xl"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          Forever With You ❤️
        </div>
      </div>
    </div>
  );
}

function GlowBlobs() {
  return (
    <>
      <div className="fixed top-1/4 left-1/4 w-80 h-80 bg-rose-500/20 blur-[150px] rounded-full animate-pulse pointer-events-none z-[-18]" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 blur-[160px] rounded-full animate-pulse pointer-events-none z-[-18]" />
    </>
  );
}

function ParallaxLayers() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="fixed inset-0 pointer-events-none z-[-15]"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="fixed inset-0 pointer-events-none z-[-16]"
      >
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full" />
      </motion.div>
    </>
  );
}

function CinematicSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function FloatingLoveQuotes() {
  const quotes = [
    "You are my forever ❤️",
    "Every heartbeat whispers your name 💕",
    "With you, life feels magical ✨",
    "Some souls are meant to meet 🌙",
  ];

  return (
    <>
      {quotes.map((quote, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, 20, -20],
            opacity: 0.1,
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
          }}
          className="fixed text-white text-2xl font-light pointer-events-none"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          {quote}
        </motion.div>
      ))}
    </>
  );
}

/* ================= FINAL ================= */
function FinalProposal({ gift }: any) {

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.6, once: true });


const sender = gift?.senderName || gift?.sender_name || "You";
const receiver = gift?.receiverName || gift?.receiver_name || "Me";


  const [stage, setStage] = useState<
    "intro" | "unlock" | "question" | "accepted"
  >("intro");

  const [holding, setHolding] = useState(false);
  const [teaseState, setTeaseState] = useState<
    "idle" | "dodge" | "dialogue"
  >("idle");
const [acceptedAnimation, setAcceptedAnimation] = useState(false);

  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 🎬 Move to unlock stage */
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStage("unlock");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  /* 💖 HOLD LOGIC */
  const startHold = () => {
    if (stage !== "unlock") return;

    setHolding(true);

    holdTimeout.current = setTimeout(() => {
      setStage("question");
      setHolding(false);
    }, 1800);
  };

  const stopHold = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    setHolding(false);
  };

  /* 😌 TEASE LOGIC */
  const handleTease = () => {
    if (teaseState !== "idle") return;

    setTeaseState("dodge");

    setTimeout(() => {
      setTeaseState("dialogue");
    }, 300);

    setTimeout(() => {
      setTeaseState("idle");
    }, 2200);
  };

  const circumference = 2 * Math.PI * 115;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* 🌑 Vignette */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* ================= INTRO ================= */}
      {stage === "intro" && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2 }}
          className="space-y-6 z-10"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Every memory led me here…
          </h2>
          <p className="text-xl text-rose-300">
            And now… there is only one question left.
          </p>
        </motion.div>
      )}

      {/* ================= UNLOCK ================= */}
      {stage === "unlock" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-10 z-10"
        >
          <div className="relative w-64 h-64 perspective-[1000px]">
            <motion.div
              animate={{
                rotateY: 360,
                y: [-10, -25, -10],
              }}
              transition={{
                rotateY: { duration: 16, repeat: Infinity, ease: "linear" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-full h-full"
            >
              {/* Diamond Body */}
              <div
                className={`absolute inset-0 rounded-[45%] backdrop-blur-2xl 
                bg-white/10 border border-white/30
                transition-all duration-300
                ${
                  holding
                    ? "shadow-[0_0_120px_rgba(244,114,182,0.8)] scale-105"
                    : "shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                }`}
              />

              {/* Rose Gold Glow */}
              <div
                className={`absolute inset-0 rounded-[45%] transition-all duration-500 ${
                  holding
                    ? "bg-gradient-to-t from-rose-400/60 via-amber-300/40 to-transparent blur-xl"
                    : "bg-gradient-to-t from-rose-400/30 via-amber-200/20 to-transparent blur-lg"
                }`}
              />

              {/* Shine */}
              <div className="absolute inset-0 overflow-hidden rounded-[45%]">
                <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 animate-[shine_4s_linear_infinite]" />
              </div>
            </motion.div>

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
              <circle
                cx="128"
                cy="128"
                r="115"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="115"
                stroke="url(#grad)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={holding ? 0 : circumference}
                style={{
                  transition: holding
                    ? "stroke-dashoffset 1.8s linear"
                    : "stroke-dashoffset 0.4s ease",
                }}
              />
              <defs>
                <linearGradient id="grad">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.p
            key={holding ? "unlocking" : "hold"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-lg transition-all duration-300 ${
              holding ? "text-rose-400 animate-pulse" : "text-rose-300"
            }`}
          >
            {holding ? "Unlocking…" : "Press & hold for 2 seconds"}
          </motion.p>

          <div
            onPointerDown={startHold}
            onPointerUp={stopHold}
            onPointerLeave={stopHold}
            onTouchEnd={stopHold}
            className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full cursor-pointer hover:scale-105 transition"
          >
            Hold 💍
          </div>
        </motion.div>
      )}

      {/* ================= QUESTION ================= */}
      {stage === "question" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-10 z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-rose-300 to-amber-300 bg-clip-text text-transparent">
            Will You Stay With Me…
          </h2>

          <h3 className="text-5xl md:text-7xl font-bold text-rose-400">
            Forever?
          </h3>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-6 justify-center items-center">
              {/* YES */}
              <button
                onClick={() => {
  setStage("accepted");
  setAcceptedAnimation(true);
}}

                className={`px-8 py-4 rounded-full text-xl transition-all duration-300 ${
                  teaseState === "dodge"
                    ? "bg-rose-600 scale-105"
                    : "bg-rose-500 hover:scale-110"
                }`}
              >
                Yes, Forever 💖
              </button>

              {/* TEASE */}
              <motion.button
                onClick={handleTease}
                animate={
                  teaseState === "dodge"
                    ? { x: 40, rotate: -4 }
                    : { x: 0, rotate: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="px-6 py-4 bg-white/10 border border-white/20 rounded-full text-lg"
              >
                Tease Me 😌
              </motion.button>
            </div>

            {/* Dialogue Below */}
            {teaseState === "dialogue" && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-rose-300 text-lg"
              >
                {Math.random() > 0.5
                  ? "Not so easy…"
                  : "My heart is serious about this 💖"}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

   {/* ================= ACCEPTED ================= */}
{stage === "accepted" && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden px-6"
  >
    {/* 🌑 Royal Darkened Background */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-black"
    />

    {/* 🌅 Vertical Royal Glow */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 2 }}
      className="absolute w-[400px] h-[700px] bg-gradient-to-b from-rose-500/40 via-amber-300/30 to-transparent blur-3xl"
    />

    {/* 💖 Vows */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-4xl md:text-6xl text-white z-10"
    >
      From this moment…
    </motion.h2>

    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="text-3xl md:text-5xl text-rose-300 z-10"
    >
      My heart belongs to you…
    </motion.h3>

    {/* 💞 Names + Connection */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
      className="flex items-center gap-6 mt-10 text-3xl md:text-5xl text-amber-200 z-10 relative"
    >
      <span>{sender}</span>

      {/* Elegant Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="h-[2px] bg-gradient-to-r from-rose-400 to-amber-300 rounded-full"
      />

      {/* Heart */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
        transition={{ delay: 4, duration: 1.5, repeat: Infinity }}
        className="text-rose-400"
      >
        ❤️
      </motion.span>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="h-[2px] bg-gradient-to-l from-rose-400 to-amber-300 rounded-full"
      />

      <span>{receiver}</span>
    </motion.div>

    {/* 👑 Forever with Refined Halo */}
    <div className="relative mt-12 flex items-center justify-center">
      {/* Thin Royal Halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 rounded-full border border-amber-300/30"
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1.03, 1] }}
        transition={{ delay: 4.8, duration: 3, repeat: Infinity }}
        className="text-6xl md:text-8xl font-bold text-rose-500 z-10 drop-shadow-[0_0_20px_rgba(251,191,114,0.7)]"
      >
        Forever ❤️
      </motion.h1>
    </div>
  </motion.div>
)}

    </div>
  );
}
