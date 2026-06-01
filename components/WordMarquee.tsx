"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const WORDS = ["Bold", "Forged", "Edge", "Rogue", "Onyx", "Steel"];

/**
 * Oversized serif word band — two rows drifting in opposite directions, with a
 * scroll-driven horizontal offset layered on top of the constant drift.
 * Outlined glyphs alternate with filled for an editorial, couture feel.
 * Purpose: dramatic spatial divider between chapters of the page.
 */
export default function WordMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xA = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);

  const row = [...WORDS, ...WORDS];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-ink py-14 md:py-20"
    >
      {/* Row 1 — drifts left */}
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ x: xA }}
        animate={{ translateX: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <Word key={`a${i}`} word={w} outline={i % 2 === 1} />
        ))}
      </motion.div>

      {/* Row 2 — drifts right */}
      <motion.div
        className="mt-2 flex w-max gap-10 whitespace-nowrap"
        style={{ x: xB }}
        animate={{ translateX: ["-50%", "0%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <Word key={`b${i}`} word={w} outline={i % 2 === 0} />
        ))}
      </motion.div>
    </div>
  );
}

function Word({ word, outline }: { word: string; outline: boolean }) {
  return (
    <span className="flex items-center gap-10">
      <span
        className={`font-serif text-6xl font-light italic leading-none md:text-8xl ${
          outline ? "text-transparent" : "text-blush-200"
        }`}
        style={
          outline
            ? { WebkitTextStroke: "1px rgba(246,199,209,0.55)" }
            : undefined
        }
      >
        {word}
      </span>
      <span className="text-2xl text-champagne/70">✦</span>
    </span>
  );
}
