"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Curtain preloader. Purpose: understanding/delight on first load only.
 * Brand mark draws in, count ticks to 100, then a blush curtain lifts away.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDone(true);
      return;
    }
    let raf: number;
    const start = performance.now();
    const DURATION = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-blush-100"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EXPO }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO }}
            className="text-center"
          >
            <p className="mb-3 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
              Est. 1999
            </p>
            <h1 className="font-serif text-4xl font-light tracking-tight text-ink md:text-6xl">
              Men in <span className="italic text-gold-shimmer">Rogue</span>
            </h1>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 px-8">
            <div className="mx-auto flex max-w-content items-end justify-between">
              <span className="font-sans text-xs uppercase tracking-wide2 text-ink-soft">
                Fine Jewellery
              </span>
              <span className="font-serif text-3xl text-ink tabular-nums md:text-4xl">
                {count}
              </span>
            </div>
            <div className="mx-auto mt-3 h-px max-w-content overflow-hidden bg-rose-gold/20">
              <motion.div
                className="h-full bg-rose-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                style={{ transformOrigin: "left" }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
