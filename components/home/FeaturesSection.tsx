"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Digital Photo Booth",
    desc:
      "Capture memories with custom frames, strip mode, and instant downloads. It's like a date night in your pocket.",
    icon: "📸",
    bg: "from-rose-50 to-pink-100",
  },
  {
    title: "Interactive Love Letter",
    desc:
      "A beautiful envelope animation that opens to reveal your heartfelt words. Classic romance, digitized.",
    icon: "💌",
    bg: "from-purple-50 to-pink-100",
  },
  {
    title: "Open When Cards",
    desc:
      "Leave hidden messages for specific moments: 'When you're sad', 'When you miss me'. A gift that keeps giving.",
    icon: "⏰",
    bg: "from-yellow-50 to-amber-100",
  },
  {
    title: "Our Song",
    desc:
      "Set the mood with background music that plays as they explore your love story.",
    icon: "🎵",
    bg: "from-pink-50 to-rose-100",
  },
  {
    title: "Private & Secure",
    desc:
      "Password protected. Only the two of you have the key to this private world.",
    icon: "🔒",
    bg: "from-green-50 to-emerald-100",
  },
  {
    title: "Gamified Experience",
    desc:
      "Test their knowledge of your relationship with fun, interactive quizzes.",
    icon: "⚡",
    bg: "from-blue-50 to-sky-100",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-20">
        <p className="uppercase tracking-widest text-pink-500 text-sm">
          Features They’ll Love
        </p>
        <h2
          className="mt-4 text-4xl md:text-5xl font-[cursive] text-gray-900"
        >
          More Than Just a Website
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We've packed every romantic gesture into one unforgettable digital experience.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180 }}
            className={`
              rounded-3xl p-8 bg-gradient-to-br ${f.bg}
              shadow-xl shadow-pink-200/30
              relative overflow-hidden
            `}
          >
            {/* Icon bubble */}
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow mb-6">
              {f.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900">
              {f.title}
            </h3>

            <p className="mt-3 text-gray-700 leading-relaxed">
              {f.desc}
            </p>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition pointer-events-none">
              <div className="absolute -inset-10 bg-pink-400/20 blur-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
