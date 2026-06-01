"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { promises } from "@/lib/data";
import AnimatedChars from "./ui/AnimatedChars";
import { RevealGroup, RevealItem } from "./ui/Reveal";

const icons = [
  "M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z", // sparkle
  "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM9 12l2 2 4-4", // check circle
  "M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z", // shield
  "M12 3l2.5 5 5.5.5-4 4 1 5.5-5-3-5 3 1-5.5-4-4 5.5-.5L12 3Z", // star
];

export default function Promises() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  // Radial spotlight follows the cursor across the section
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(246,199,209,0.6), transparent 65%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      id="promises"
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
The Rogue standard
          </p>
          <AnimatedChars
            as="h2"
            text="Crafted to be trusted"
            className="block font-serif text-4xl font-light text-ink md:text-6xl"
          />
        </div>

        <RevealGroup
          className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
          stagger={0.14}
        >
          {promises.map((p, i) => (
            <RevealItem key={p.title} className="text-center">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group"
              >
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-rose-gold/30 bg-blush-100 transition-colors group-hover:border-rose-gold group-hover:bg-blush-200">
                  <motion.svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b76e79"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                  >
                    <path d={icons[i % icons.length]} />
                  </motion.svg>
                </div>
                <h3 className="font-serif text-xl font-normal text-ink">
                  {p.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[16rem] font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {p.desc}
                </p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
