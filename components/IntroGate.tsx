"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RotatingDiamond from "./ui/RotatingDiamond";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * "Enter the Maison" intro gate (Active-Theory-style experience gate).
 * Brand draws in, a hairline charges to 100, then an Enter affordance appears.
 * Entering dispatches `maison:enter` (Hero choreographs its reveal to it) and
 * lifts a blush curtain. Auto-enters after the charge so nobody is stuck.
 * Reduced-motion users skip the gate entirely.
 */
export default function IntroGate() {
  const [done, setDone] = useState(false);
  const [charged, setCharged] = useState(false);
  const [count, setCount] = useState(0);
  const entered = useRef(false);

  const enter = () => {
    if (entered.current) return;
    entered.current = true;
    window.dispatchEvent(new Event("maison:enter"));
    document.documentElement.style.overflow = "";
    setDone(true);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      enter();
      return;
    }
    document.documentElement.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const DURATION = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCharged(true);
    };
    raf = requestAnimationFrame(tick);

    // Auto-enter shortly after fully charged (still lets the user click sooner)
    const auto = setTimeout(enter, DURATION + 900);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(auto);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-blush-100"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: EXPO }}
        >
          {/* soft radial glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,199,209,0.6),transparent_60%)] blur-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO }}
            className="relative flex flex-col items-center text-center"
          >
            <RotatingDiamond size={64} className="mb-7" />
            <p className="mb-3 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
              Est. 1999
            </p>
            <h1 className="font-serif text-5xl font-light tracking-tight text-ink md:text-7xl">
              Men in <span className="italic text-gold-shimmer">Rogue</span>
            </h1>

            {/* Enter affordance */}
            <div className="mt-10 h-12">
              <AnimatePresence mode="wait">
                {charged ? (
                  <motion.button
                    key="enter"
                    onClick={enter}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-3 rounded-full border border-ink/30 px-8 py-3 font-sans text-[11px] uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
                  >
                    Enter the House
                    <span className="text-rose-gold transition-transform duration-300 ease-out group-hover:translate-x-1">
                      ✦
                    </span>
                  </motion.button>
                ) : (
                  <motion.span
                    key="count"
                    exit={{ opacity: 0 }}
                    className="font-serif text-2xl text-ink-soft tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* charging hairline */}
          <div className="absolute bottom-12 left-1/2 h-px w-56 -translate-x-1/2 overflow-hidden bg-rose-gold/20">
            <motion.div
              className="h-full bg-rose-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
