"use client";

import { createElement } from "react";
import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Character-split reveal. Each glyph rises and rotates into place from a mask,
 * staggered. Purpose: a high-impact, low-frequency headline entrance.
 * Spaces are preserved as non-collapsing gaps.
 */
export default function AnimatedChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const chars = Array.from(text);
  return createElement(
    Tag,
    { className, "aria-label": text },
    <span className="mask-line inline-block align-bottom" aria-hidden>
        {chars.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre will-change-transform"
            style={{ transformOrigin: "bottom" }}
            initial={{ y: "110%", rotate: 6, opacity: 0 }}
            whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.8,
              ease: EXPO,
              delay: delay + i * stagger,
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </span>
  );
}
