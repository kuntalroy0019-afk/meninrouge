"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const channels = [
  { label: "Client care", value: "care@meninrogue.com" },
  { label: "Appointments", value: "+91 22 4000 1999" },
  { label: "Flagship", value: "Altamount Road, Mumbai 400026" },
  { label: "Hours", value: "Mon–Sat · 11:00–20:00 IST" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          We are here for you
        </p>
        <h1 className="font-serif text-5xl font-light text-ink md:text-7xl">
Contact the House
        </h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm font-light text-ink-soft">
          For bespoke commissions, appointments or client care — a personal
          advisor will respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div className="rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-8 md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO }}
                className="py-16 text-center"
              >
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-rose-gold text-xl text-cream">
                  ✦
                </div>
                <h2 className="font-serif text-3xl font-light text-ink">
                  Message received
                </h2>
                <p className="mx-auto mt-3 max-w-sm font-sans text-sm font-light text-ink-soft">
                  Thank you for writing to Men in Rogue. An advisor will be in
                  touch with you shortly.
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
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="First name" placeholder="Aria" />
                  <Field label="Last name" placeholder="Mehta" />
                </div>
                <Field label="Email" type="email" placeholder="you@example.com" />
                <Field label="Subject" placeholder="Bespoke engagement ring" />
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you have in mind…"
                    className="w-full rounded-[2px] border border-ink/15 bg-blush-50 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rose-gold focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-ink px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                >
                  Send message
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Details */}
        <aside className="space-y-6">
          {channels.map((c) => (
            <div key={c.label} className="border-b border-rose-gold/15 pb-5">
              <p className="font-sans text-[11px] uppercase tracking-wide2 text-rose-gold">
                {c.label}
              </p>
              <p className="mt-2 font-serif text-xl font-light text-ink">
                {c.value}
              </p>
            </div>
          ))}
          <div className="flex gap-5 pt-2">
            {["Instagram", "Pinterest", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-sans text-xs uppercase tracking-wide2 text-ink-soft hover:text-rose-gold"
              >
                {s}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-[2px] border border-ink/15 bg-blush-50 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rose-gold focus:outline-none"
      />
    </label>
  );
}
