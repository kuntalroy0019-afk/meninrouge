"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

const columns = [
  {
    title: "The House",
    links: ["Our story", "The workshop", "Sustainability", "Careers"],
  },
  {
    title: "Client care",
    links: ["Track your order", "Shipping & returns", "Ring sizing", "Care guide"],
  },
  {
    title: "Discover",
    links: ["Collections", "Wedding bands", "Bespoke forge", "Gifting"],
  },
];

const socials = ["Instagram", "Pinterest", "TikTok", "YouTube"];

export default function Footer() {
  const { openAppointment } = useStore();
  return (
    <footer className="bg-ink text-cream">
      {/* Oversized brand mark */}
      <div className="mx-auto max-w-content overflow-hidden px-6 pt-20 md:px-8">
        <motion.h2
          initial={{ y: "30%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap text-center font-serif text-[13vw] font-light leading-none tracking-tight text-cream/95 md:text-[8.5rem]"
        >
          Men in <span className="italic text-blush-300">Rogue</span>
        </motion.h2>
      </div>

      <div className="mx-auto max-w-content px-6 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-xl text-cream">Men in Rogue</p>
            <p className="mt-3 max-w-xs font-sans text-sm font-light leading-relaxed text-cream/60">
              Fine men&apos;s jewellery, forged by hand. For men who write their
              own rules.
            </p>
            <button
              onClick={openAppointment}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-sans text-[11px] uppercase tracking-wide2 text-cream transition-colors hover:border-blush-300 hover:text-blush-300"
            >
              Book an appointment
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 font-sans text-[11px] uppercase tracking-wide2 text-blush-300">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center font-sans text-sm font-light text-cream/70 transition-colors hover:text-cream"
                    >
                      <span className="h-px w-0 bg-blush-300 transition-[width] duration-300 ease-out-quart group-hover:mr-2 group-hover:w-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-12 h-px w-full bg-cream/10" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-sans text-xs text-cream/50">
            © 2026 Men in Rogue. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="font-sans text-xs uppercase tracking-wide2 text-cream/60 transition-colors hover:text-blush-300"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="flex gap-5 font-sans text-xs text-cream/50">
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
