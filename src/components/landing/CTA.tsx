"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative overflow-hidden bg-deep-black px-6 py-24 md:py-32">
      {/* Gold gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06)_0%,transparent_60%)]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <div className="mb-8 inline-block rounded-full border border-gold/20 px-4 py-1.5 text-xs uppercase tracking-wider text-gold">
          Your journey starts now
        </div>

        <h2 className="font-serif text-3xl font-bold text-cream md:text-5xl">
          Set Your Compass.
          <br />
          <span className="text-gold">Change Your Life.</span>
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-cream-muted">
          Join thousands who have used The Golden Compass to design their best
          year ever. The exercise is deeply personal, profoundly
          transformative, and completely free.
        </p>

        <Link
          href="/register"
          className="mt-10 inline-flex items-center rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-deep-black transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
        >
          Begin Your Journey
        </Link>
      </motion.div>
    </section>
  );
}
