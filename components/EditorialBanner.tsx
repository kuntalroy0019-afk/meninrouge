"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import MagneticButton from "./ui/MagneticButton";

export default function EditorialBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Image parallax inside its frame
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="editorial"
      ref={ref}
      className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32"
    >
      {/* Image with parallax + reveal mask */}
      <motion.div
        initial={{ clipPath: "inset(8% 8% 8% 8%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-blush-200"
      >
        <motion.div className="absolute inset-[-12%]" style={{ y: imgY }}>
          <Image
            src="https://images.unsplash.com/photo-1612285127323-1837364f9da0?auto=format&fit=crop&w=1400&q=80"
            alt="A man's hand wearing hand-forged signet rings"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Copy */}
      <div className="md:pl-6">
        <p className="mb-5 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          The Workshop · Hand-forged
        </p>
        <AnimatedText
          as="h2"
          lines={[
            "Forged by hand,",
            <>worn for</>,
            <em key="i" className="italic text-gold-shimmer">a lifetime</em>,
          ]}
          className="font-serif text-4xl font-light leading-[1.02] text-ink md:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-md font-sans text-sm font-light leading-relaxed text-ink-soft"
        >
          In our workshop, every piece is cut, set and weighed by hand. Our
          makers work in solid gold, platinum and blackened silver — building
          pieces meant to be passed down, not replaced.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <MagneticButton href="#bridal" variant="outline">
            Inside the workshop
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
