"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import MagneticButton from "./ui/MagneticButton";

const EXPO = [0.16, 1, 0.3, 1] as const;

// Deterministic glint field (no Math.random → no hydration mismatch).
// Kept few, small and dim — a hint of sparkle, not a light show.
const GLINTS = [
  { x: 14, y: 28, s: 5, d: 0 },
  { x: 84, y: 60, s: 4, d: 1.6 },
  { x: 24, y: 74, s: 3, d: 0.9 },
  { x: 70, y: 20, s: 4, d: 2.3 },
  { x: 90, y: 38, s: 3, d: 0.5 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Choreograph reveal to the intro gate; fall back if no gate fires.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const onEnter = () => setStarted(true);
    window.addEventListener("maison:enter", onEnter);
    const fallback = setTimeout(() => setStarted(true), 2800);
    return () => {
      window.removeEventListener("maison:enter", onEnter);
      clearTimeout(fallback);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax (springed, subtle)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgTX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const bgTY = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const fgTX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const fgTY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* Background image w/ Ken Burns + scroll + mouse parallax */}
      <motion.div
        className="absolute inset-[-4%] -z-10"
        style={{ y: bgY, scale: bgScale, x: bgTX, translateY: bgTY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1575863438848-e058621afa9b?auto=format&fit=crop&w=2000&q=80"
          alt="Man wearing silver chains and signet rings"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Blush wash so the baby-pink theme reads through any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-blush-100/70 via-blush-200/30 to-blush-100/90 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-t from-blush-50 via-transparent to-blush-50/40" />
        <div className="absolute inset-0 bg-rose-soft/10" />
      </motion.div>

      {/* Drifting rose sheen */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(246,199,209,0.38),transparent_62%)] blur-2xl"
        animate={{ x: ["-10%", "10%", "-10%"], y: ["-6%", "8%", "-6%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating glint field */}
      <motion.div
        className="absolute inset-0 -z-[5]"
        style={{ x: fgTX, y: fgTY }}
        aria-hidden
      >
        {GLINTS.map((g, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-champagne"
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              width: g.s,
              height: g.s,
              filter: "blur(0.5px)",
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.85, 1.1, 0.85] }}
            transition={{
              duration: 4.5 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: g.d,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, x: fgTX }}
        className="relative z-10 px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EXPO, delay: 0.1 }}
          className="mb-6 font-sans text-[11px] uppercase tracking-luxe text-rose-gold md:text-xs"
        >
The Rogue Collection · 2026
        </motion.p>

        <h1 className="font-serif text-[15vw] font-light leading-[0.92] tracking-tight text-ink md:text-[8.5rem]">
          <span className="mask-line">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={started ? { y: "0%" } : {}}
              transition={{ duration: 1.05, ease: EXPO, delay: 0.2 }}
            >
              Where edge
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              className="block italic text-gold-shimmer"
              initial={{ y: "110%" }}
              animate={started ? { y: "0%" } : {}}
              transition={{ duration: 1.05, ease: EXPO, delay: 0.32 }}
            >
              meets craft
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EXPO, delay: 0.55 }}
          className="mx-auto mt-7 max-w-md font-sans text-sm font-light leading-relaxed text-ink-soft md:text-base"
        >
          Signet rings, solid chains and cuffs — forged by hand in our
          workshop. Jewellery for men who write their own rules.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EXPO, delay: 0.72 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#collections">Explore the collection</MagneticButton>
          <MagneticButton href="#bridal" variant="outline">
            Wedding bands
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-ink/30 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-rose-gold"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
