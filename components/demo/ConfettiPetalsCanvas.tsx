"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

type Handle = { fire: () => void };

const ConfettiPetalsCanvas = forwardRef<Handle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    fire() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const ctx = canvasEl.getContext("2d");
      if (!ctx) return;

      const canvas = canvasEl as HTMLCanvasElement; // 🔥 force stable reference

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const petals = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 2 + 1,
        sway: Math.random() * 2,
        life: 300,
      }));

      function drawPetal(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number
      ) {
        context.fillStyle = "rgba(255,105,180,0.8)";
        context.beginPath();
        context.ellipse(x, y, size, size * 0.6, Math.random(), 0, Math.PI * 2);
        context.fill();
      }

      function animate(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        petals.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(p.y / 20) * p.sway;
          p.life--;
          drawPetal(context, p.x, p.y, p.size);
        });

        if (petals.some((p) => p.life > 0)) {
          requestAnimationFrame(() => animate(context));
        }
      }

      animate(ctx);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 pointer-events-none"
    />
  );
});

export default ConfettiPetalsCanvas;
