"use client";

import { motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;
const quote =
  "Men in Rogue makes the only jewellery I'll wear. It's heavy, it's honest, and it doesn't ask for permission.";

export default function Testimonial() {
  const words = quote.split(" ");
  return (
    <section className="bg-blush-100 py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-10 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          In their words
        </p>
        <blockquote className="font-serif text-3xl font-light leading-snug text-ink md:text-5xl md:leading-[1.15]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EXPO }}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </blockquote>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: EXPO }}
          className="mt-10"
        >
          <div className="mx-auto mb-4 h-px w-12 bg-rose-gold/40" />
          <p className="font-sans text-xs uppercase tracking-wide2 text-ink-soft">
GQ India · Brand to Watch 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
