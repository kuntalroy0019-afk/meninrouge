"use client";

import { motion } from "framer-motion";

/**
 * Self-drawing gold hairline with a centred diamond node. The path draws itself
 * (pathLength 0→1) as it scrolls into view. Purpose: an elegant scroll reward
 * that punctuates section transitions.
 */
export default function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-content px-6 py-6 md:px-8 ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="h-6 w-full"
        aria-hidden
      >
        <motion.line
          x1="0"
          y1="12"
          x2="560"
          y2="12"
          stroke="#B76E79"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="1200"
          y1="12"
          x2="640"
          y2="12"
          stroke="#B76E79"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M600 4 L612 12 L600 20 L588 12 Z"
          fill="#C9A86A"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ transformOrigin: "600px 12px" }}
        />
      </svg>
    </div>
  );
}
