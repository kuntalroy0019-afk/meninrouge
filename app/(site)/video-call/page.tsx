"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;
const STEPS = ["Cart", "Book Video Call", "Confirmation"];
const MAX_PICKS = 5;

export default function VideoCallPage() {
  const { cart, hydrated } = useStore();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"video" | "boutique">("video");
  const picks = cart.slice(0, MAX_PICKS);

  return (
    <div className="mx-auto max-w-content px-6 py-10 md:px-8 md:py-12">
      {/* stepper bar */}
      <div className="flex flex-col gap-6 border-b border-rose-gold/15 pb-8 md:flex-row md:items-center md:justify-between">
        <ol className="flex items-center pt-7">
          {STEPS.map((s, i) => (
            <Fragment key={s}>
              <li className="flex items-center">
                <div className="relative flex flex-col items-center">
                  <span
                    className={`absolute -top-7 whitespace-nowrap font-sans text-[12px] uppercase tracking-wide2 ${
                      i <= step ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {s}
                  </span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                      i < step
                        ? "border-rose-gold bg-rose-gold"
                        : i === step
                          ? "border-rose-gold bg-rose-gold"
                          : "border-ink/25 bg-cream"
                    }`}
                  >
                    {i < step && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </div>
              </li>
              {i < STEPS.length - 1 && (
                <span
                  className={`mx-3 h-px w-16 md:w-28 ${
                    i < step ? "bg-rose-gold" : "bg-ink/15"
                  }`}
                />
              )}
            </Fragment>
          ))}
        </ol>

        <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-wide2 text-ink-soft">
          <Link href="/login" className="hover:text-rose-gold">
            Login
          </Link>
          <span className="text-ink/20">|</span>
          <span className="flex items-center gap-1.5 text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            100% Secure
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0 — picks */}
        {step === 0 && (
          <motion.div
            key="picks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EXPO }}
            className="mt-12"
          >
            <p className="mb-2 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
              Your video-call picks
            </p>
            <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
              Curate your selection
            </h1>
            <p className="mt-3 max-w-md font-sans text-sm font-light text-ink-soft">
              Add up to {MAX_PICKS} designs to your video-call cart. An advisor will
              walk you through each one, live.
            </p>

            {!hydrated ? (
              <p className="mt-10 text-ink-faint">Loading…</p>
            ) : picks.length === 0 ? (
              <div className="mt-10 rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-12 text-center">
                <p className="font-serif text-2xl font-light text-ink">
                  No pieces selected yet
                </p>
                <p className="mx-auto mt-2 max-w-sm font-sans text-sm font-light text-ink-soft">
                  Browse the collection and add the designs you&apos;d like to view.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-block rounded-full bg-ink px-8 py-3.5 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                >
                  Browse the collection
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-10 space-y-4">
                  {picks.map((line) => (
                    <div
                      key={line.key}
                      className="flex items-center gap-5 border-b border-rose-gold/12 pb-4"
                    >
                      <Link
                        href={`/product/${line.product.slug}`}
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[2px] bg-blush-100"
                      >
                        <Image src={line.product.images[0]} alt={line.product.name} fill sizes="64px" className="object-cover" />
                      </Link>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-ink">{line.product.name}</h3>
                        <p className="font-sans text-xs uppercase tracking-wide2 text-ink-faint">
                          {line.product.material}
                        </p>
                      </div>
                      <p className="font-sans text-sm text-ink">{formatPrice(line.product.price)}</p>
                    </div>
                  ))}
                </div>
                {cart.length > MAX_PICKS && (
                  <p className="mt-3 font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
                    Showing first {MAX_PICKS} of {cart.length} — a video call covers up to {MAX_PICKS} pieces.
                  </p>
                )}
                <div className="mt-8 flex items-center gap-4">
                  <Link href="/shop" className="font-sans text-xs uppercase tracking-wide2 text-ink hover:text-rose-gold">
                    ← Add more
                  </Link>
                  <button
                    onClick={() => setStep(1)}
                    className="ml-auto rounded-full bg-ink px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                  >
                    Continue to booking →
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 1 — booking */}
        {step === 1 && (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EXPO }}
            className="mx-auto mt-12 max-w-lg"
          >
            <p className="mb-2 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
              Book your slot
            </p>
            <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
              When suits you?
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="mt-8 space-y-5"
            >
              <div className="grid grid-cols-2 gap-2">
                {(["video", "boutique"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`rounded-full py-2.5 font-sans text-[11px] uppercase tracking-wide2 transition-colors ${
                      mode === m ? "bg-ink text-cream" : "border border-ink/15 text-ink-soft hover:border-rose-gold"
                    }`}
                  >
                    {m === "video" ? "Video call" : "In boutique"}
                  </button>
                ))}
              </div>
              <Field label="Name" type="text" placeholder="Your name" />
              <Field label="Phone" type="tel" placeholder="+91 …" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Preferred date" type="date" />
                <label className="block">
                  <span className="mb-1.5 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">Time</span>
                  <select className="w-full rounded-[2px] border border-ink/15 bg-cream px-4 py-3 font-sans text-sm text-ink focus:border-rose-gold focus:outline-none">
                    <option>11:00 AM</option>
                    <option>1:00 PM</option>
                    <option>4:00 PM</option>
                    <option>6:30 PM</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button type="button" onClick={() => setStep(0)} className="font-sans text-xs uppercase tracking-wide2 text-ink hover:text-rose-gold">
                  ← Back
                </button>
                <button type="submit" className="ml-auto rounded-full bg-ink px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold">
                  Confirm booking →
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 2 — confirmation */}
        {step === 2 && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
            className="mx-auto mt-16 max-w-lg text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-rose-gold text-2xl text-cream"
            >
              ✦
            </motion.div>
            <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
              Your viewing is booked
            </h1>
            <p className="mx-auto mt-4 max-w-sm font-sans text-sm font-light text-ink-soft">
              A dedicated advisor will confirm your{" "}
              {mode === "video" ? "video consultation" : "boutique appointment"} by
              phone shortly. You&apos;ll be viewing{" "}
              {picks.length || "your selected"} {picks.length === 1 ? "piece" : "pieces"}.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
            >
              Continue browsing
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-[2px] border border-ink/15 bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rose-gold focus:outline-none"
      />
    </label>
  );
}
