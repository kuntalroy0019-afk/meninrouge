"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
} from "framer-motion";
import { heritageStats } from "@/lib/data";
import { RevealGroup, RevealItem } from "./ui/Reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Heritage() {
  return (
    <section className="border-y border-rose-gold/15 bg-blush-100/50 py-16 md:py-20">
      <RevealGroup
        className="mx-auto grid max-w-content grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-8"
        stagger={0.12}
      >
        {heritageStats.map((s) => (
          <RevealItem key={s.label} className="text-center">
            <p className="font-serif text-5xl font-light text-ink md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <div className="mx-auto my-3 h-px w-8 bg-rose-gold/40" />
            <p className="font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
              {s.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
