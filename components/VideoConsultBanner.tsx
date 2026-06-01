"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * "Browse fine jewellery through private video consultations" promo banner.
 * Links to the /video-call booking flow.
 */
export default function VideoConsultBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 overflow-hidden rounded-[3px] border border-rose-gold/15 bg-blush-100/50 p-8 md:flex-row md:p-10"
    >
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-light leading-tight text-ink md:text-3xl">
          Browse fine jewellery through private video consultations.
        </h3>
        <p className="mt-3 max-w-xl font-sans text-sm font-light leading-relaxed text-ink-soft">
          Explore up to 5 of your favourite pieces with a dedicated advisor — a
          relaxed, no-obligation virtual viewing on your schedule.
        </p>
        <Link
          href="/video-call"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
        >
          Book a video call
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Video-call illustration */}
      <div className="shrink-0">
        <svg
          width="170"
          height="120"
          viewBox="0 0 170 120"
          fill="none"
          stroke="#b76e79"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* laptop */}
          <rect x="28" y="18" width="92" height="64" rx="5" />
          <path d="M14 96h120l8-12H22l-8 12Z" />
          {/* person on screen (far) */}
          <circle cx="58" cy="44" r="8" />
          <path d="M44 70c0-9 6.5-15 14-15s14 6 14 15" />
          {/* foreground person */}
          <circle cx="112" cy="58" r="13" fill="#f6c7d1" stroke="#b76e79" />
          <path d="M86 100c0-16 11-26 26-26s26 10 26 26" fill="#f6c7d1" stroke="#b76e79" />
        </svg>
      </div>
    </motion.section>
  );
}
