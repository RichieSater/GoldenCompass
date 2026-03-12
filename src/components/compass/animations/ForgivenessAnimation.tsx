"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgivenessAnimationProps {
  items: string[];
  onComplete?: () => void;
}

export default function ForgivenessAnimation({
  items,
  onComplete,
}: ForgivenessAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgiven, setForgiven] = useState<Set<number>>(new Set());

  if (items.length === 0) {
    return (
      <p className="text-cream-muted">
        No items to forgive. Continue to the next step.
      </p>
    );
  }

  const allForgiven = forgiven.size >= items.length;

  function forgiveCurrent() {
    const newForgiven = new Set(forgiven);
    newForgiven.add(currentIndex);
    setForgiven(newForgiven);

    setTimeout(() => {
      if (newForgiven.size >= items.length) {
        onComplete?.();
      } else {
        // Find next unforgiven
        for (let i = currentIndex + 1; i < items.length; i++) {
          if (!newForgiven.has(i)) {
            setCurrentIndex(i);
            return;
          }
        }
        for (let i = 0; i < currentIndex; i++) {
          if (!newForgiven.has(i)) {
            setCurrentIndex(i);
            return;
          }
        }
      }
    }, 800);
  }

  return (
    <div className="w-full space-y-8">
      {!allForgiven ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-xs uppercase tracking-wider text-cream-muted/50">
              Item {currentIndex + 1} of {items.length}
            </p>

            <div className="relative rounded-xl border border-white/10 bg-charcoal/50 px-8 py-6">
              <p
                className={`text-center text-lg transition-all duration-500 ${
                  forgiven.has(currentIndex)
                    ? "text-gold/40"
                    : "text-cream"
                }`}
              >
                {items[currentIndex]}
              </p>

              {/* SVG strikethrough line */}
              {forgiven.has(currentIndex) && (
                <motion.svg
                  className="absolute inset-0 h-full w-full"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <motion.line
                    x1="10%"
                    y1="50%"
                    x2="90%"
                    y2="50%"
                    stroke="rgba(201, 168, 76, 0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.svg>
              )}

              {/* Shimmer effect on completed */}
              {forgiven.has(currentIndex) && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                />
              )}
            </div>

            {!forgiven.has(currentIndex) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={forgiveCurrent}
                className="rounded-full border border-gold/30 px-8 py-3 font-serif text-sm italic text-gold transition-all hover:border-gold/60 hover:bg-gold/5"
              >
                &ldquo;It&apos;s ok. I forgive you for this.&rdquo;
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="font-serif text-xl text-gold">
            You&apos;ve forgiven yourself for everything.
          </p>
          <p className="text-sm text-cream-muted">
            Take a deep breath. You&apos;re free to move forward.
          </p>
        </motion.div>
      )}

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => !forgiven.has(i) && setCurrentIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              forgiven.has(i)
                ? "bg-gold/60"
                : i === currentIndex
                ? "bg-cream"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
