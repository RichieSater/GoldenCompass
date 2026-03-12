"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { NavigationDirection } from "@/types/compass";

interface ScreenTransitionProps {
  direction: NavigationDirection;
  screenKey: string;
  children: React.ReactNode;
}

const variants = {
  enter: (dir: NavigationDirection) => ({
    y: dir === "forward" ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: NavigationDirection) => ({
    y: dir === "forward" ? -60 : 60,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function ScreenTransition({
  direction,
  screenKey,
  children,
}: ScreenTransitionProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={screenKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-8"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
