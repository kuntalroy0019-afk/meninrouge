"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";

export default function BridalShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="bridal"
      ref={ref}
      className="relative flex h-[90vh] min-h-[560px] items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ scale: bgScale, y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1637035223000-e921f071da98?auto=format&fit=crop&w=2000&q=80"
          alt="Man wearing a chain, cross and dog-tag pendant"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/50" />
        <div className="absolute inset-0 bg-rose-soft/15 mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 max-w-2xl px-6 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-sans text-[11px] uppercase tracking-luxe text-champagne-light"
        >
          Wedding Bands
        </motion.p>
        <h2 className="font-serif text-5xl font-light leading-[1] md:text-8xl">
          <span className="mask-line">
            <motion.span
              className="block"
              initial={{ y: "115%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Seal it,
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              className="block italic"
              initial={{ y: "115%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              your way
            </motion.span>
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-md font-sans text-sm font-light text-cream/85"
        >
          Bands forged in solid gold, platinum and blackened silver — built to
          take a lifetime of wear and never flinch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/shop?category=Rings">Shop wedding bands</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
