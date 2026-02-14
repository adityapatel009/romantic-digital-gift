"use client";

const stats = [
  { value: "12,000+", label: "Gifts Created" },
  { value: "9,500+", label: "Smiles Delivered" },
  { value: "4.9★", label: "Average Rating" },
];

export default function StatsSection() {
  return (
    <section className="py-28 bg-[#120308] text-white px-6">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="text-5xl font-bold text-pink-300">
              {s.value}
            </div>
            <p className="mt-3 text-sm tracking-widest text-pink-100">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
