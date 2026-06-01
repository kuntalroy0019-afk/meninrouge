"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Rings", href: "/shop?category=Rings" },
  { label: "Chains", href: "/shop?category=Chains" },
  { label: "The House", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlistCount, hydrated, openCart } = useStore();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rose-gold/15 bg-blush-50/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-8">
          {/* Left links */}
          <ul className="hidden flex-1 items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`group relative whitespace-nowrap font-sans text-[12px] uppercase tracking-wide2 transition-colors hover:text-rose-gold ${
                    pathname === l.href.split("?")[0] && l.href !== "/shop"
                      ? "text-rose-gold"
                      : "text-ink/80"
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose-gold transition-[width] duration-300 ease-out-quart group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="flex flex-1 items-center lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icon d="M3 6h18M3 12h18M3 18h18" />
          </button>

          <Link
            href="/"
            className="flex-1 text-center font-serif text-2xl font-light tracking-tight text-ink md:text-[28px]"
          >
            Men in <span className="italic">Rogue</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5 text-ink">
            <Link href="/shop" aria-label="Search" className="hover:text-rose-gold transition-colors">
              <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden hover:text-rose-gold transition-colors sm:block"
            >
              <Icon d="M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hover:text-rose-gold transition-colors"
            >
              <Icon d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
              {hydrated && wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-rose-gold text-[9px] font-medium text-cream">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative hover:text-rose-gold transition-colors"
            >
              <Icon d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
              {hydrated && cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-rose-gold text-[9px] font-medium text-cream"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-blush-100 px-8 py-7"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: EXPO }}
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="font-serif text-2xl text-ink">
                Men in Rogue
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <Icon d="M18 6 6 18M6 6l12 12" />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-2">
              {links.concat({ label: "Account", href: "/account" }).map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: EXPO, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-rose-gold/20 py-4 font-serif text-3xl text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
