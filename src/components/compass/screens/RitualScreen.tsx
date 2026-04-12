"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getScreenListItems } from "@/lib/list-answer-utils";

interface RitualScreenProps {
  answers: Record<string, string>;
  allAnswers: Record<string, Record<string, string>>;
  onAnswerChange: (key: string, value: string) => void;
}

export default function RitualScreen({
  allAnswers,
  onAnswerChange,
}: RitualScreenProps) {
  // Get items from the box of compassion
  const items = getScreenListItems(
    {
      id: "past-compassion-box",
      sectionIndex: 2,
      sectionKey: "past",
      sectionTitle: "The Past",
      type: "multi-input",
    },
    allAnswers["past-compassion-box"]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [forgiven, setForgiven] = useState<Set<number>>(new Set());

  if (items.length === 0) {
    return (
      <p className="text-cream-muted">
        No items to forgive. You can continue to the next step.
      </p>
    );
  }

  const allForgiven = forgiven.size >= items.length;
  const currentItem = items[currentIndex];

  function forgiveCurrent() {
    const newForgiven = new Set(forgiven);
    newForgiven.add(currentIndex);
    setForgiven(newForgiven);
    onAnswerChange("forgiven_count", String(newForgiven.size));

    // Move to next unforgiven item
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
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
                    ? "text-gold/40 line-through"
                    : "text-cream"
                }`}
              >
                {currentItem}
              </p>
              {forgiven.has(currentIndex) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-4xl text-gold/30">✕</span>
                </motion.div>
              )}
            </div>

            {!forgiven.has(currentIndex) && (
              <button
                onClick={forgiveCurrent}
                className="rounded-full border border-gold/30 px-8 py-3 font-serif text-sm italic text-gold transition-all hover:border-gold/60 hover:bg-gold/5"
              >
                &ldquo;It&apos;s ok. I forgive you for this.&rdquo;
              </button>
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
            onClick={() => setCurrentIndex(i)}
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
