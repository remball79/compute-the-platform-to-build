"use client";

import { useEffect, useRef } from "react";

export function AnimatedDotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const SPACING = 18;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      const maxR = SPACING * 0.4;

      // Wavelengths scale with the canvas the same way the original width/height-
      // normalized version did (width/9, height/7, etc.), so desktop blob size
      // is unchanged on any screen width. The floor only kicks in on narrow
      // mobile viewports, where it previously compressed the same cycle count
      // into far fewer pixels and made the motion look much slower than desktop.
      const wlX = Math.max(width / 9, 150);
      const wlY = Math.max(height / 7, 115);
      const wlDiagX = Math.max(width / 6, 130);
      const wlDiagY = Math.max(height / 6, 100);

      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          const v =
            Math.sin(x / wlX + time) +
            Math.sin(y / wlY - time * 0.85) +
            Math.sin(x / wlDiagX + y / wlDiagY + time * 1.3);
          const t = Math.max(0, Math.min(1, (v + 3) / 6));

          if (t < 0.35) {
            const r = 1 + t * 1.5;
            ctx.fillStyle = `rgba(255,255,255,${0.05 + t * 0.15})`;
            ctx.fillRect(x - r / 2, y - r / 2, r, r);
          } else if (t < 0.7) {
            const r = 1.5 + maxR * ((t - 0.35) / 0.35) * 0.7;
            ctx.strokeStyle = `rgba(93, 125, 224, ${0.25 + t * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            const r = maxR * (0.6 + ((t - 0.7) / 0.3) * 0.4);
            ctx.fillStyle = `rgba(93, 125, 224, ${0.5 + (t - 0.7) * 1.2})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      time += 0.008;
      animationId = requestAnimationFrame(animate);
    };

    let running = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        animate();
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(animationId);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
}
