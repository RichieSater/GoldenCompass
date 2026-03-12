"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  gravity: number;
}

export default function CelebrationFinale() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [showButton, setShowButton] = useState(false);

  // Show download button after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Confetti canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 500;
    const h = 500;
    canvas.width = w;
    canvas.height = h;

    const colors = [
      "rgba(201, 168, 76, 0.9)",
      "rgba(212, 184, 90, 0.8)",
      "rgba(168, 138, 58, 0.8)",
      "rgba(245, 245, 240, 0.7)",
      "rgba(245, 245, 240, 0.5)",
    ];

    const particles: ConfettiParticle[] = [];

    // Burst confetti
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: w / 2,
        y: h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        gravity: 0.08 + Math.random() * 0.04,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Radial gold glow pulse
      const pulseScale = 0.8 + Math.sin(Date.now() * 0.002) * 0.2;
      const grad = ctx!.createRadialGradient(
        w / 2, h / 2, 0,
        w / 2, h / 2, 200 * pulseScale
      );
      grad.addColorStop(0, "rgba(201, 168, 76, 0.08)");
      grad.addColorStop(1, "rgba(201, 168, 76, 0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx!.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 md:h-[400px] md:w-[400px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.5,
        }}
        className="relative z-10"
      >
        <h2 className="text-center font-serif text-4xl font-bold text-gold md:text-5xl">
          Congratulations!
        </h2>
      </motion.div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="mb-4 text-center text-sm text-cream-muted">
            Your Golden Compass is complete.
          </p>
        </motion.div>
      )}
    </div>
  );
}
