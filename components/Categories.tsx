"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import AnimatedText from "./ui/AnimatedText";
import { RevealGroup, RevealItem } from "./ui/Reveal";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Categories() {
  return (
    <section id="collections" className="mx-auto max-w-content px-6 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            Shop by category
          </p>
          <AnimatedText
            as="h2"
            lines={["Find your", <em key="i" className="italic">signature</em>]}
            className="font-serif text-5xl font-light leading-[0.95] text-ink md:text-7xl"
          />
        </div>
        <a
          href="/shop"
          className="group flex items-center gap-2 font-sans text-xs uppercase tracking-wide2 text-ink hover:text-rose-gold"
        >
          View all collections
          <span className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {categories.map((c) => (
          <RevealItem key={c.title}>
            <motion.a
              href={`/shop?category=${c.title}`}
              data-cursor="hover"
              className="group relative block aspect-[3/4] overflow-hidden rounded-[2px] bg-blush-200"
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0"
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.7, ease: EXPO }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              {/* gold hairline frame appears on hover */}
              <motion.div
                className="pointer-events-none absolute inset-3 border border-champagne-light/0"
                variants={{ hover: { borderColor: "rgba(230,211,168,0.7)" } }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-2xl font-light text-cream md:text-3xl">
                  {c.title}
                </h3>
                <motion.p
                  className="font-sans text-[11px] uppercase tracking-wide2 text-cream/70"
                  initial={{ opacity: 0, y: 8 }}
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: EXPO }}
                >
                  {c.caption}
                </motion.p>
              </div>
            </motion.a>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
