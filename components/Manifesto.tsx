"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Diamond3D from "./ui/Diamond3D";

const TEXT =
  "A man's jewellery should say what he won't. Every piece is forged by hand, weighed in solid metal, and built to outlast the moment that earned it.";

/**
 * Scroll-linked gold-fill manifesto. Each word brightens from faint ink to full
 * as the section scrolls through the viewport — text that "reads itself".
 * Purpose: understanding/storytelling on a low-frequency hero statement.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = TEXT.split(" ");

  return (
    <section className="relative overflow-hidden bg-blush-50 py-28 md:py-40">
      <div
        ref={ref}
        className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          {/* Real-time 3D refraction diamond — its home, on a calm stage.
              Falls back to the animated SVG gem on touch / weak / reduced-motion. */}
          <Diamond3D
            className="h-[240px] w-[240px] md:h-[320px] md:w-[320px]"
            fallbackSize={120}
          />
        </motion.div>

        <p className="mb-8 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
The code
        </p>

        <p className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 font-serif text-3xl font-light leading-[1.3] md:text-5xl md:leading-[1.25]">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#9C8B91", "#2B2024"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}
    </motion.span>
  );
}
