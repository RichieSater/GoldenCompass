"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold">
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path
          d="M20 8 L22 20 L20 32 L18 20 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
    title: "The Bonfire",
    description:
      "Clear your mind of all noise, worry, and stress. Watch your burdens dissolve into the flames and find instant peace.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold">
        <rect x="8" y="8" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="12" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="12" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="12" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    title: "Past & Future",
    description:
      "Extract golden lessons from your past year, then dream bigger than ever about the future you want to create.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold">
        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path
          d="M20 4 L24 20 L20 36 L16 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M4 20 L20 16 L36 20 L20 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.8" />
      </svg>
    ),
    title: "The Golden Path",
    description:
      "Build a concrete roadmap from where you are to your perfect day, with milestones and accountability built in.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col items-center rounded-2xl border border-white/5 bg-charcoal/30 p-8 text-center transition-colors hover:border-gold/10"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
        {feature.icon}
      </div>
      <h3 className="mb-3 font-serif text-xl font-bold text-cream">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-cream-muted">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-deep-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Your Journey In Three Steps
          </h2>
          <p className="mt-4 text-cream-muted">
            A proven process used by thousands to design their best year.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
