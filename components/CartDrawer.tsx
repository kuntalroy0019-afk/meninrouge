"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Slide-in cart drawer. Purpose: spatial confirmation that a piece was added,
 * plus a quick path to review/checkout without leaving the page.
 * Opens automatically on add-to-cart (see store.addToCart) and from the header
 * cart icon. Backdrop + Esc close it; body scroll is locked while open.
 */
export default function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    setQty,
    removeFromCart,
    cartOpen,
    closeCart,
  } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [cartOpen, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[90]">
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* panel */}
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-blush-50 shadow-[-20px_0_60px_rgba(183,110,121,0.18)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EXPO }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-rose-gold/15 px-6 py-5">
              <h2 className="font-serif text-2xl font-light text-ink">
                Your cart{" "}
                <span className="font-sans text-sm text-ink-faint">({cartCount})</span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:text-rose-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="font-serif text-2xl font-light text-ink">
                  Your cart is empty
                </p>
                <p className="mt-2 font-sans text-sm font-light text-ink-soft">
                  Add a piece and it&apos;ll appear here.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-7 rounded-full bg-ink px-8 py-3.5 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                >
                  Browse the collection
                </Link>
              </div>
            ) : (
              <>
                {/* items */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {cart.map((line) => (
                      <motion.div
                        key={line.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: EXPO }}
                        className="mb-5 flex gap-4"
                      >
                        <Link
                          href={`/product/${line.product.slug}`}
                          onClick={closeCart}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[2px] bg-blush-100"
                        >
                          <Image
                            src={line.product.images[0]}
                            alt={line.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-3">
                            <Link
                              href={`/product/${line.product.slug}`}
                              onClick={closeCart}
                              className="font-serif text-base leading-tight text-ink hover:text-rose-gold"
                            >
                              {line.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(line.key)}
                              aria-label="Remove"
                              className="text-ink-faint hover:text-rose-gold"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                <path d="M18 6 6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <p className="mt-1 font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
                            {line.product.material}
                          </p>
                          {line.engraving && (
                            <p className="mt-1 font-sans text-[11px] italic text-rose-gold">
                              Engraving: “{line.engraving}”
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-ink/15">
                              <button
                                onClick={() => setQty(line.key, line.qty - 1)}
                                className="grid h-8 w-8 place-items-center text-ink hover:text-rose-gold"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-6 text-center font-sans text-sm tabular-nums">
                                {line.qty}
                              </span>
                              <button
                                onClick={() => setQty(line.key, line.qty + 1)}
                                className="grid h-8 w-8 place-items-center text-ink hover:text-rose-gold"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-sans text-sm text-ink">
                              {formatPrice(line.lineTotal)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* footer */}
                <div className="border-t border-rose-gold/15 px-6 py-5">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 font-sans text-[11px] text-ink-faint">
                    Shipping &amp; gift packaging included.
                  </p>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-4 block w-full rounded-full bg-ink py-4 text-center font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/video-call"
                    onClick={closeCart}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-3.5 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="2.5" y="6" width="13" height="12" rx="2" />
                      <path d="M15.5 10.5 21 7v10l-5.5-3.5" />
                    </svg>
                    Book a video call
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 w-full py-3 text-center font-sans text-xs uppercase tracking-wide2 text-ink-soft transition-colors hover:text-rose-gold"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
