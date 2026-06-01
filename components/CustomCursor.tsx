"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic dot + trailing ring cursor, with an optional label read from
 * [data-cursor-label] (e.g. "View" over a product). Purpose: delight
 * (low-frequency, marketing). Desktop-only; disabled on touch & reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      const interactive = t.closest(
        "a, button, [data-cursor='hover'], input, textarea"
      );
      setLabel(labelled?.dataset.cursorLabel ?? "");
      setHovering(!!interactive || !!labelled);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  const big = hovering || !!label;
  const size = label ? 64 : big ? 44 : 26;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-rose-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 0.7 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full border border-rose-gold/40"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: big ? 0.8 : 0.35,
          backgroundColor: label
            ? "rgba(183,110,121,0.9)"
            : big
              ? "rgba(183,110,121,0.07)"
              : "rgba(183,110,121,0)",
          borderColor: label ? "rgba(183,110,121,0)" : "rgba(183,110,121,0.4)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
      >
        {label && (
          <span className="font-sans text-[10px] uppercase tracking-wide2 text-cream">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
