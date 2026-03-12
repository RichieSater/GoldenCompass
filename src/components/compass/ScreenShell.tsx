"use client";

import { motion } from "framer-motion";

interface ScreenShellProps {
  headline?: string;
  narrativeText?: string;
  questionText?: string;
  children?: React.ReactNode;
}

export default function ScreenShell({
  headline,
  narrativeText,
  questionText,
  children,
}: ScreenShellProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center text-center">
      {headline && (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-serif text-3xl font-bold tracking-tight text-cream md:text-4xl"
        >
          {headline}
        </motion.h2>
      )}

      {narrativeText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-xl"
        >
          {narrativeText.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mb-4 font-serif text-base italic leading-relaxed text-cream-muted last:mb-0 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      )}

      {questionText && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-sm font-semibold uppercase tracking-[0.15em] text-gold md:text-base"
        >
          {questionText}
        </motion.h3>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
