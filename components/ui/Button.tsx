"use client";

import React from "react";

type Variant = "solid" | "outline";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "solid",
}: Props) {
  const base =
    "px-8 py-3 rounded-full font-semibold transition-all duration-300";

  const variants = {
    solid:
      "bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/30",
    outline:
      "border border-white/30 text-white hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
