"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

type Handle = {
  fire: () => void;
};

const HeartBurstCanvas = forwardRef<Handle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    fire() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const ctx = canvasEl.getContext("2d");
      if (!ctx) return;

      const canvas = canvasEl as HTMLCanvasElement; // 🔥 stable reference

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const hearts = Array.from({ length: 80 }).map(() => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 6,
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 1) * 6,
        life: 100,
      }));

      function drawHeart(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number
      ) {
        context.fillStyle = "rgba(255,105,180,0.9)";
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(
          x - size,
          y - size,
          x - size * 2,
          y + size / 2,
          x,
          y + size * 2
        );
        context.bezierCurveTo(
          x + size * 2,
          y + size / 2,
          x + size,
          y - size,
          x,
          y
        );
        context.fill();
      }

      function animate(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach((h) => {
          h.x += h.speedX;
          h.y += h.speedY;
          h.life -= 1;
          drawHeart(context, h.x, h.y, h.size);
        });

        if (hearts.some((h) => h.life > 0)) {
          requestAnimationFrame(() => animate(context));
        }
      }

      animate(ctx);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
});

export default HeartBurstCanvas;
