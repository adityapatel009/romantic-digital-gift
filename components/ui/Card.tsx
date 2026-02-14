export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      rounded-2xl bg-white/70 backdrop-blur
      shadow-lg p-6
    ">
      {children}
    </div>
  );
}
