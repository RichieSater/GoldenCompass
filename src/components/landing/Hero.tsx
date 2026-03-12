"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GoldenParticles from "@/components/compass/animations/GoldenParticles";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-deep-black px-6">
      <GoldenParticles />

      {/* Radial gold gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Compass icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            className="text-gold"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="32"
              cy="32"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <polygon points="32,8 36,32 28,32" fill="currentColor" opacity="0.8" />
            <polygon points="32,56 36,32 28,32" fill="currentColor" opacity="0.3" />
            <polygon points="56,32 32,28 32,36" fill="currentColor" opacity="0.5" />
            <polygon points="8,32 32,28 32,36" fill="currentColor" opacity="0.5" />
            <circle cx="32" cy="32" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-5xl font-bold tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-8xl"
        >
          THE GOLDEN{" "}
          <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            COMPASS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-serif text-xl italic text-cream-muted md:text-2xl"
        >
          Your Best Year Ever
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-lg text-base leading-relaxed text-cream-muted md:text-lg"
        >
          A premium, interactive experience that clears your mind, draws wisdom
          from your past, and sets the direction for an extraordinary future.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href="/dashboard"
            className="mt-12 inline-flex items-center rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-deep-black transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
          >
            Begin Your Journey
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider text-cream-muted/40">
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-cream-muted/40"
          >
            <path
              d="M8 2v12M3 9l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
