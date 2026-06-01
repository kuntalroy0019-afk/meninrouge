"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Category } from "@/lib/catalog";

const EXPO = [0.16, 1, 0.3, 1] as const;

const ringSizes = [
  { in: "6", us: "6", mm: "51.8" },
  { in: "9", us: "7", mm: "54.4" },
  { in: "12", us: "8", mm: "57.0" },
  { in: "15", us: "9", mm: "59.5" },
  { in: "18", us: "10", mm: "62.1" },
  { in: "21", us: "11", mm: "64.6" },
  { in: "24", us: "12", mm: "67.2" },
];

export default function SizeGuide({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  const isRing = category === "Rings";
  const label = isRing ? "Ring size guide" : "Sizing guide";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-sans text-[11px] uppercase tracking-wide2 text-ink-soft underline-offset-4 hover:text-rose-gold hover:underline"
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[95] grid place-items-center p-4">
            <motion.div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative w-full max-w-lg rounded-[3px] bg-blush-50 p-8 shadow-[0_30px_80px_rgba(43,32,36,0.25)]"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EXPO }}
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
                    Find your fit
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-light text-ink">
                    {label}
                  </h3>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink hover:text-rose-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isRing ? (
                <>
                  <table className="w-full border-collapse font-sans text-sm">
                    <thead>
                      <tr className="border-b border-rose-gold/20 text-left text-[11px] uppercase tracking-wide2 text-ink-faint">
                        <th className="py-2">India</th>
                        <th className="py-2">US</th>
                        <th className="py-2">Inner Ø (mm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ringSizes.map((r) => (
                        <tr key={r.in} className="border-b border-rose-gold/10 text-ink">
                          <td className="py-2.5">{r.in}</td>
                          <td className="py-2.5">{r.us}</td>
                          <td className="py-2.5">{r.mm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-5 rounded-[2px] bg-blush-100 p-4 font-sans text-xs font-light leading-relaxed text-ink-soft">
                    <strong className="font-medium text-ink">At home:</strong> wrap
                    a strip of paper around the base of your finger, mark where it
                    overlaps, and measure the length in mm — that&apos;s your inner
                    circumference. Still unsure? We&apos;ll send a complimentary ring
                    sizer.
                  </div>
                </>
              ) : (
                <div className="space-y-4 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  <p>
                    Our chains and bracelets are listed by total length. Measure a
                    favourite piece you already own, or wrap a tape around your wrist
                    /neck and add 1–2 cm for comfortable drape.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex justify-between border-b border-rose-gold/10 pb-2"><span>Bracelet — snug</span><span className="text-ink">18 cm</span></li>
                    <li className="flex justify-between border-b border-rose-gold/10 pb-2"><span>Bracelet — relaxed</span><span className="text-ink">20–21 cm</span></li>
                    <li className="flex justify-between border-b border-rose-gold/10 pb-2"><span>Chain — collar</span><span className="text-ink">45 cm</span></li>
                    <li className="flex justify-between"><span>Chain — statement</span><span className="text-ink">55–60 cm</span></li>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
