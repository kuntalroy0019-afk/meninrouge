"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { signatureCollections } from "@/lib/data";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Pinned horizontal scroll. Vertical scroll progress drives a horizontal
 * translate of the collection row. Purpose: spatial storytelling — a gallery
 * you walk through. Falls back to a normal horizontal scroll-snap row on small
 * screens (where pinning feels cramped).
 */
export default function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Translate across the off-screen width. ~ -72% reveals all cards.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-blush-50">
      {/* Mobile: simple snap row */}
      <div className="md:hidden">
        <div className="px-6 pb-8 pt-20">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            The collections
          </p>
          <h2 className="font-serif text-4xl font-light text-ink">
            Five worlds <span className="italic">of light</span>
          </h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-20">
          {signatureCollections.map((c) => (
            <Card key={c.title} c={c} className="w-[78vw] shrink-0 snap-center" />
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-10 flex w-full max-w-content items-end justify-between px-8">
            <div>
              <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
                The collections
              </p>
              <h2 className="font-serif text-5xl font-light leading-none text-ink lg:text-6xl">
                Five worlds <span className="italic">of light</span>
              </h2>
            </div>
            <p className="hidden max-w-xs font-sans text-sm font-light text-ink-soft lg:block">
              Scroll to wander each signature — from everyday brilliance to high
              jewellery commissioned for a lifetime.
            </p>
          </div>

          <motion.div style={{ x }} className="flex gap-6 pl-8 will-change-transform">
            {signatureCollections.map((c, i) => (
              <Card
                key={c.title}
                c={c}
                index={i}
                className="h-[62vh] w-[42vw] shrink-0 lg:w-[34vw]"
              />
            ))}
            <div className="flex h-[62vh] w-[24vw] shrink-0 items-center">
              <a
                href="#bridal"
                data-cursor="hover"
                className="group font-serif text-3xl font-light italic text-rose-gold"
              >
                View all
                <span className="ml-2 inline-block transition-transform duration-300 ease-out-quart group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* progress rail */}
          <div className="mx-auto mt-10 h-px w-full max-w-content overflow-hidden bg-rose-gold/15 px-8">
            <motion.div className="h-full bg-rose-gold" style={{ width: progress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  c,
  index = 0,
  className = "",
}: {
  c: (typeof signatureCollections)[number];
  index?: number;
  className?: string;
}) {
  return (
    <motion.a
      href="#collections"
      data-cursor="hover"
      data-cursor-label="Open"
      whileHover="hover"
      className={`group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-blush-200 ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.9, ease: EXPO }}
      >
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="42vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />
      <div className="absolute left-6 top-6">
        <span className="rounded-full border border-cream/40 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-cream/90">
          {String(index + 1).padStart(2, "0")} · {c.year}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <h3 className="font-serif text-4xl font-light text-cream">{c.title}</h3>
        <motion.p
          className="mt-1 max-w-xs font-sans text-sm font-light text-cream/75"
          initial={{ opacity: 0, y: 10 }}
          variants={{ hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.4, ease: EXPO }}
        >
          {c.desc}
        </motion.p>
      </div>
    </motion.a>
  );
}
