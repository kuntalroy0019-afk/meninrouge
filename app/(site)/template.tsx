"use client";

import { motion } from "framer-motion";

/**
 * Per-navigation enter transition for shop pages. Opacity-only by design — a
 * transform on this wrapper would break `position: sticky` descendants (the
 * shop toolbar), so we fade without moving.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
