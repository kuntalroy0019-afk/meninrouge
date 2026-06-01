"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const HEADING = ["Be the first to see", "what comes next"];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden bg-blush-200/50 py-24 md:py-32">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,199,209,0.6),transparent_60%)]" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="mb-5 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          The inner circle
        </p>
        <h2 className="font-serif text-4xl font-light leading-[1.08] text-ink md:text-6xl">
          {HEADING.map((line, i) => (
            <span key={i} className="mask-line">
              <motion.span
                className={`block ${i === 1 ? "italic" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EXPO, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-md font-sans text-sm font-light text-ink-soft">
          Private previews, workshop stories and first access to drops —
          delivered rarely, never spam.
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 border-b border-ink/25 pb-2 focus-within:border-rose-gold"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent py-2 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="shrink-0 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:text-rose-gold"
                >
                  Subscribe →
                </button>
              </motion.form>
            ) : (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO }}
                className="font-serif text-2xl italic text-rose-gold"
              >
Welcome to the inner circle. ✦
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
