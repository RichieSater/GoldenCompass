"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BonfireAnimationProps {
  items: string[];
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function BonfireAnimation({ items }: BonfireAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [showItems, setShowItems] = useState(true);
  const [burningIndex, setBurningIndex] = useState(-1);

  // Stagger-burn each item one by one, then dissolve them all
  useEffect(() => {
    if (items.length === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    items.forEach((_, i) => {
      timers.push(setTimeout(() => setBurningIndex(i), 800 + i * 600));
    });

    // After all items have burned, hide the list
    timers.push(
      setTimeout(() => setShowItems(false), 800 + items.length * 600 + 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [items]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const sparks: Spark[] = [];
    let time = 0;

    function addSpark() {
      sparks.push({
        x: 200 + (Math.random() - 0.5) * 40,
        y: 280,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 3 + 1),
        life: 0,
        maxLife: Math.random() * 40 + 20,
        size: Math.random() * 3 + 1,
      });
    }

    function drawFlame(cx: number, baseY: number, t: number) {
      const flameHeight = 120 + Math.sin(t * 0.05) * 10;

      // Outer glow
      const outerGrad = ctx!.createRadialGradient(cx, baseY - 40, 10, cx, baseY - 40, 100);
      outerGrad.addColorStop(0, "rgba(201, 168, 76, 0.15)");
      outerGrad.addColorStop(1, "rgba(201, 168, 76, 0)");
      ctx!.fillStyle = outerGrad;
      ctx!.fillRect(cx - 100, baseY - 140, 200, 200);

      // Main flame body
      for (let i = 0; i < 3; i++) {
        const offset = Math.sin(t * 0.08 + i * 2) * (8 - i * 2);
        const width = 30 - i * 8;
        const height = flameHeight - i * 20;
        const alpha = 0.4 - i * 0.1;

        const grad = ctx!.createLinearGradient(cx, baseY, cx, baseY - height);
        grad.addColorStop(0, `rgba(184, 115, 51, ${alpha})`);
        grad.addColorStop(0.4, `rgba(201, 168, 76, ${alpha * 0.8})`);
        grad.addColorStop(0.8, `rgba(212, 184, 90, ${alpha * 0.4})`);
        grad.addColorStop(1, "rgba(212, 184, 90, 0)");

        ctx!.beginPath();
        ctx!.moveTo(cx - width, baseY);
        ctx!.bezierCurveTo(
          cx - width + offset, baseY - height * 0.4,
          cx - width * 0.3 - offset, baseY - height * 0.8,
          cx + offset * 0.5, baseY - height
        );
        ctx!.bezierCurveTo(
          cx + width * 0.3 + offset, baseY - height * 0.8,
          cx + width - offset, baseY - height * 0.4,
          cx + width, baseY
        );
        ctx!.closePath();
        ctx!.fillStyle = grad;
        ctx!.fill();
      }
    }

    function draw() {
      time++;
      ctx!.clearRect(0, 0, 400, 400);

      drawFlame(200, 300, time);

      // Spawn sparks
      if (Math.random() > 0.6) addSpark();

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.02;
        s.life++;

        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 168, 76, ${alpha * 0.8})`;
        ctx!.fill();

        if (s.life >= s.maxLife) sparks.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const displayItems = items.slice(0, 8);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
      />

      <AnimatePresence>
        {showItems && displayItems.length > 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute bottom-0 left-1/2 w-full max-w-xs -translate-x-1/2 space-y-1.5"
          >
            {displayItems.map((item, i) => {
              const isBurned = i <= burningIndex;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isBurned ? 0 : 1,
                    x: 0,
                    y: isBurned ? -20 : 0,
                    filter: isBurned ? "blur(4px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: isBurned ? 0.6 : 0.3,
                    delay: isBurned ? 0 : i * 0.1,
                  }}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-charcoal/60 px-3 py-1.5"
                >
                  <span className="text-xs text-amber/60">
                    {isBurned ? "\uD83D\uDD25" : "\u2022"}
                  </span>
                  <span className="truncate text-xs text-cream-muted/70">
                    {item}
                  </span>
                </motion.div>
              );
            })}
            {items.length > 8 && (
              <p className="text-center text-[10px] text-cream-muted/30">
                + {items.length - 8} more burning away...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
