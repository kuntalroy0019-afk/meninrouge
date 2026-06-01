"use client";

import { createElement } from "react";
import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Masked line-by-line text reveal (Boucheron/Bulgari style headline entrance).
 * Each line sits in an overflow-hidden mask and rises into view.
 */
export default function AnimatedText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  return createElement(
    Tag,
    { className },
    lines.map((line, i) => (
      <span key={i} className="mask-line">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "115%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.9,
            ease: EXPO,
            delay: delay + i * stagger,
          }}
        >
          {line}
        </motion.span>
      </span>
    ))
  );
}
