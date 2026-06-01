"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Magnetic button — content drifts toward the cursor; on hover a rose-gold fill
 * wipes up from the bottom and an arrow slides in. Spring on release so an
 * interrupted gesture settles naturally rather than snapping.
 * Purpose: delight on a primary CTA (low frequency).
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };
  const reset = () => {
    setPos({ x: 0, y: 0 });
    setHover(false);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-9 py-4 font-sans text-xs uppercase tracking-wide2";
  const styles =
    variant === "solid"
      ? "bg-ink text-cream"
      : "border border-ink/30 text-ink";

  const inner = (
    <motion.span
      className="relative z-10 inline-flex items-center gap-2"
      animate={{
        x: pos.x * 0.4,
        y: pos.y * 0.4,
        color: hover && variant === "solid" ? "#2B2024" : undefined,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {children}
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        animate={{ x: hover ? 4 : 0, opacity: hover ? 1 : 0.6 }}
        transition={{ duration: 0.3, ease: EXPO }}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.span>
  );

  // Fill wipe — champagne for solid (text turns ink), rose-gold for outline
  const fill = (
    <motion.span
      aria-hidden
      className="absolute inset-0 z-0 rounded-full"
      style={{
        background: variant === "solid" ? "#E6D3A8" : "#B76E79",
        transformOrigin: "bottom",
      }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: hover ? 1 : 0 }}
      transition={{ duration: 0.45, ease: EXPO }}
    />
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 17, mass: 0.5 }}
      className="inline-block"
      data-cursor="hover"
    >
      {href ? (
        <a href={href} className={`${base} ${styles} ${className}`}>
          {fill}
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={`${base} ${styles} ${className}`}>
          {fill}
          {inner}
        </button>
      )}
    </motion.div>
  );
}
