"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    title: ["Curate your", "shortlist"],
    desc: "Save the pieces that catch your eye, or request a private viewing of any design.",
    icon: (
      <>
        <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
        <path d="M3 8h18M9 3 7.5 8 12 21l4.5-13L15 3" />
      </>
    ),
  },
  {
    title: ["View them", "live"],
    desc: "An advisor calls to set up a private video consultation, at a time that suits you.",
    icon: (
      <>
        <rect x="2.5" y="6" width="13" height="12" rx="2" />
        <path d="M15.5 10.5 21 7v10l-5.5-3.5" />
      </>
    ),
  },
  {
    title: ["Decide with", "confidence"],
    desc: "See real-time photos and video of each piece — with no obligation to purchase.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" />
      </>
    ),
  },
];

function Arrow() {
  return (
    <svg
      width="40"
      height="16"
      viewBox="0 0 40 16"
      fill="none"
      stroke="#b76e79"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="hidden md:block"
    >
      <path d="M2 8h34M30 3l6 5-6 5" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="mt-20 rounded-[3px] border border-rose-gold/15 bg-blush-100/40 px-6 py-14 md:px-10 md:py-16">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
          How does it work?
        </h2>
        <div className="mx-auto mt-3 h-px w-12 bg-rose-gold/50" />
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-4">
        {steps.map((s, i) => (
          <div key={i} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EXPO, delay: i * 0.12 }}
              className="flex max-w-[16rem] flex-1 flex-col items-center text-center"
            >
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-rose-gold/30 bg-blush-50">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2b2024"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="font-sans text-xs uppercase tracking-wide2 leading-relaxed text-ink">
                {s.title[0]}
                <br />
                {s.title[1]}
              </h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                {s.desc}
              </p>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex items-center self-center pt-2 md:pt-8">
                <Arrow />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/video-call"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
        >
          Start a video consultation
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
