"use client";

import { motion } from "framer-motion";

export default function CompassRoseAnimation() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute h-64 w-64 rounded-full bg-gradient-radial from-gold/10 to-transparent"
      />

      {/* Compass rose SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 2.5,
          type: "spring",
          stiffness: 60,
          damping: 12,
        }}
      >
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="drop-shadow-[0_0_20px_rgba(201,168,76,0.3)]"
        >
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="rgba(201, 168, 76, 0.3)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="rgba(201, 168, 76, 0.15)"
            strokeWidth="0.5"
          />

          {/* Cardinal points - N/S */}
          <polygon
            points="100,10 110,100 90,100"
            fill="rgba(201, 168, 76, 0.9)"
          />
          <polygon
            points="100,190 110,100 90,100"
            fill="rgba(201, 168, 76, 0.4)"
          />

          {/* Cardinal points - E/W */}
          <polygon
            points="190,100 100,90 100,110"
            fill="rgba(201, 168, 76, 0.6)"
          />
          <polygon
            points="10,100 100,90 100,110"
            fill="rgba(201, 168, 76, 0.6)"
          />

          {/* Intercardinal points */}
          <polygon
            points="155,45 108,92 92,108"
            fill="rgba(201, 168, 76, 0.3)"
          />
          <polygon
            points="45,155 92,108 108,92"
            fill="rgba(201, 168, 76, 0.3)"
          />
          <polygon
            points="155,155 108,108 92,92"
            fill="rgba(201, 168, 76, 0.3)"
          />
          <polygon
            points="45,45 92,92 108,108"
            fill="rgba(201, 168, 76, 0.3)"
          />

          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="4"
            fill="rgba(201, 168, 76, 1)"
          />

          {/* N label */}
          <text
            x="100"
            y="28"
            textAnchor="middle"
            fill="rgba(201, 168, 76, 0.8)"
            fontSize="10"
            fontWeight="bold"
          >
            N
          </text>
        </motion.svg>
      </motion.div>

      {/* Gold particle burst on arrival */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
            x: Math.cos((i * Math.PI * 2) / 12) * 120,
            y: Math.sin((i * Math.PI * 2) / 12) * 120,
          }}
          transition={{
            duration: 1.5,
            delay: 1.8 + i * 0.05,
            ease: "easeOut",
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-gold"
        />
      ))}
    </div>
  );
}
