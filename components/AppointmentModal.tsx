"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Concierge appointment / video-consultation modal (store-driven).
 * Open it from anywhere via useStore().openAppointment().
 */
export default function AppointmentModal() {
  const { appointmentOpen, closeAppointment } = useStore();
  const [mode, setMode] = useState<"boutique" | "video">("video");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!appointmentOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAppointment();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [appointmentOpen, closeAppointment]);

  // reset success state shortly after closing
  useEffect(() => {
    if (!appointmentOpen && sent) {
      const t = setTimeout(() => setSent(false), 400);
      return () => clearTimeout(t);
    }
  }, [appointmentOpen, sent]);

  return (
    <AnimatePresence>
      {appointmentOpen && (
        <div className="fixed inset-0 z-[95] grid place-items-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAppointment}
          />
          <motion.div
            className="relative w-full max-w-md rounded-[3px] bg-blush-50 p-8 shadow-[0_30px_80px_rgba(43,32,36,0.28)]"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EXPO }}
            role="dialog"
            aria-label="Book an appointment"
          >
            <button
              onClick={closeAppointment}
              aria-label="Close"
              className="absolute right-5 top-5 text-ink hover:text-rose-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EXPO }}
                  className="py-8 text-center"
                >
                  <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-rose-gold text-xl text-cream">
                    ✦
                  </div>
                  <h3 className="font-serif text-3xl font-light text-ink">
                    Request received
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs font-sans text-sm font-light text-ink-soft">
                    A personal advisor will confirm your{" "}
                    {mode === "video" ? "video consultation" : "boutique visit"}{" "}
                    within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
                    Private appointment
                  </p>
                  <h3 className="mt-1 font-serif text-3xl font-light leading-tight text-ink">
                    Meet your advisor
                  </h3>
                  <p className="mt-2 font-sans text-sm font-light text-ink-soft">
                    One-to-one styling — at our boutique or over video.
                  </p>

                  {/* mode toggle */}
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {(["video", "boutique"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`rounded-full py-2.5 font-sans text-[11px] uppercase tracking-wide2 transition-colors ${
                          mode === m
                            ? "bg-ink text-cream"
                            : "border border-ink/15 text-ink-soft hover:border-rose-gold"
                        }`}
                      >
                        {m === "video" ? "Video call" : "In boutique"}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 space-y-4">
                    <Field label="Name" type="text" placeholder="Your name" />
                    <Field label="Phone" type="tel" placeholder="+91 …" />
                    <Field label="Preferred date" type="date" />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-ink py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                  >
                    Request appointment
                  </button>
                  <p className="mt-3 text-center font-sans text-[11px] text-ink-faint">
                    No obligation · Complimentary
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
