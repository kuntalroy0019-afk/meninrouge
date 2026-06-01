"use client";

import { motion } from "framer-motion";

/**
 * Slowly rotating faceted diamond (pure SVG). Purpose: ambient delight.
 * A drifting highlight sweeps the facets to suggest catching the light.
 */
export default function RotatingDiamond({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="gemA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FADCE2" />
          <stop offset="100%" stopColor="#B76E79" />
        </linearGradient>
        <linearGradient id="gemB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6D3A8" />
          <stop offset="100%" stopColor="#C9A86A" />
        </linearGradient>
      </defs>
      {/* crown */}
      <polygon points="50,8 78,32 50,38 22,32" fill="url(#gemB)" opacity="0.95" />
      <polygon points="22,32 50,38 50,8" fill="url(#gemA)" opacity="0.7" />
      {/* table facets */}
      <polygon points="22,32 78,32 64,46 36,46" fill="url(#gemA)" opacity="0.55" />
      {/* pavilion */}
      <polygon points="36,46 64,46 50,92" fill="url(#gemB)" opacity="0.9" />
      <polygon points="22,32 36,46 50,92" fill="url(#gemA)" opacity="0.6" />
      <polygon points="78,32 64,46 50,92" fill="url(#gemA)" opacity="0.75" />
      {/* hairline edges */}
      <g stroke="#fff" strokeWidth="0.6" opacity="0.5" fill="none">
        <polygon points="50,8 78,32 50,38 22,32" />
        <polygon points="22,32 78,32 64,46 36,46" />
        <polygon points="36,46 64,46 50,92" />
      </g>
      {/* moving glint */}
      <motion.circle
        r="3"
        fill="#fff"
        animate={{ cx: [34, 66, 50, 34], cy: [30, 34, 60, 30], opacity: [0, 1, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
