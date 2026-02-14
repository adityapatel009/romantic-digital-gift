"use client";

type Props = {
  title: string;
  onOpen: () => void;
  locked?: boolean;
};

export default function OpenWhenCard({ title, onOpen, locked }: Props) {
  return (
    <div
      onClick={() => {
        if (!locked) onOpen();
      }}
      className={`
        relative cursor-pointer
        bg-[#fdfcf9]
        rounded-xl p-10
        transition-transform
        ${locked ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
      `}
      style={{
        boxShadow: "0 18px 35px rgba(0,0,0,0.12)",
        border: "4px dashed transparent",
        borderImage:
          "repeating-linear-gradient(90deg,#7aa2ff 0 14px,#f2a1b3 14px 28px) 8",
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0)",
        backgroundSize: "6px 6px",
      }}
    >
      {/* 🔒 LOCK */}
      {locked && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <div className="text-center">
            <div className="text-4xl">🔒</div>
            <p className="mt-2 text-sm tracking-widest text-gray-600">
              PREMIUM
            </p>
          </div>
        </div>
      )}

      {/* STAMP */}
      <div className="absolute top-6 right-6 flex gap-2 rotate-6">
        <div className="w-14 h-14 rounded-full border border-gray-300 text-[9px] flex items-center justify-center text-gray-400 text-center bg-white/80">
          FEB 14<br />EXPRESS<br />DELIVERY
        </div>
        <div className="w-11 h-14 border border-pink-400 rounded-sm flex items-center justify-center text-pink-500 text-lg bg-white/80">
          ❤
        </div>
      </div>

      <p className="text-sm text-gray-400">To: My Love</p>

      <h3 className="mt-10 text-4xl font-[cursive] text-[#4b1e1e] text-center">
        {title}
      </h3>

      <div className="flex justify-center">
        <button className="mt-8 px-6 py-2 border border-[#4b1e1e] rounded-md text-xs tracking-[0.25em]">
          OPEN WHEN
        </button>
      </div>
    </div>
  );
}
