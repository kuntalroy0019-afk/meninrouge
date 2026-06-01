"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const items = [
  "Complimentary engraving",
  "Free insured shipping",
  "Lifetime cleaning & care",
  "60-day returns",
  "Ethically sourced diamonds",
  "Bespoke forge service",
];

/**
 * Velocity-reactive marquee. A base drift runs constantly; scroll velocity adds
 * speed and direction, and a touch of skew, so the ticker feels physically
 * coupled to the page. Purpose: time-based ambient motion with spatial feedback.
 */
export default function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothV = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map scroll velocity → speed multiplier (gentle)
  const velFactor = useTransform(smoothV, [0, 1000], [0, 3], { clamp: false });
  // Very subtle skew while scrolling fast
  const skew = useTransform(smoothV, [-2000, 0, 2000], [-3, 0, 3], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * -2.0 * (delta / 1000);
    const v = velFactor.get();
    if (v < 0) directionRef.current = -1;
    else if (v > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * Math.abs(v);
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-rose-gold/15 bg-blush-100 py-4">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{ x, skewX: skew, willChange: "transform" }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-sans text-[11px] uppercase tracking-wide2 text-ink-soft"
          >
            {t}
            <span className="text-rose-gold">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
