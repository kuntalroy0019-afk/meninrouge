"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function CartPage() {
  const { cart, subtotal, setQty, removeFromCart, clearCart, hydrated } =
    useStore();
  const [placed, setPlaced] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-content px-6 py-24 text-center text-ink-faint">
        Loading your cart…
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-rose-gold text-2xl text-cream"
        >
          ✦
        </motion.div>
        <h1 className="font-serif text-4xl font-light text-ink">Thank you</h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm font-light text-ink-soft">
          Your order has been received. A client advisor from Men in Rogue will
          be in touch to arrange your insured delivery.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          Your cart
        </p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          Nothing here yet
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm font-light text-ink-soft">
          Your selections will appear here. Begin with the pieces everyone is
          talking about.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
        >
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-6 py-14 md:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            Your selection
          </p>
          <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
            Shopping cart
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="font-sans text-xs uppercase tracking-wide2 text-ink-faint hover:text-rose-gold"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        {/* Line items */}
        <div>
          <AnimatePresence initial={false}>
            {cart.map((line) => (
              <motion.div
                key={line.key}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: EXPO }}
                className="flex gap-5 border-b border-rose-gold/12 py-6"
              >
                <Link
                  href={`/product/${line.product.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded-[2px] bg-blush-100"
                >
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link href={`/product/${line.product.slug}`}>
                        <h3 className="font-serif text-lg text-ink hover:text-rose-gold">
                          {line.product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
                        {line.product.material}
                      </p>
                      {line.engraving && (
                        <p className="mt-1 font-sans text-xs italic text-rose-gold">
                          Engraving: “{line.engraving}”
                        </p>
                      )}
                    </div>
                    <p className="whitespace-nowrap font-sans text-sm text-ink">
                      {formatPrice(line.lineTotal)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button
                        onClick={() => setQty(line.key, line.qty - 1)}
                        className="grid h-9 w-9 place-items-center text-ink hover:text-rose-gold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-sans text-sm tabular-nums">
                        {line.qty}
                      </span>
                      <button
                        onClick={() => setQty(line.key, line.qty + 1)}
                        className="grid h-9 w-9 place-items-center text-ink hover:text-rose-gold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(line.key)}
                      className="font-sans text-xs uppercase tracking-wide2 text-ink-faint hover:text-rose-gold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wide2 text-ink hover:text-rose-gold"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-[3px] border border-rose-gold/15 bg-blush-100/50 p-7 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl font-light text-ink">Order summary</h2>
          <div className="mt-6 space-y-3 font-sans text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span className="text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span className="text-rose-gold">Complimentary</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Gift packaging</span>
              <span className="text-rose-gold">Included</span>
            </div>
          </div>
          <div className="my-5 h-px bg-rose-gold/15" />
          <div className="flex justify-between font-serif text-xl text-ink">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <button
            onClick={() => setPlaced(true)}
            className="mt-7 w-full rounded-full bg-ink py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
          >
            Proceed to checkout
          </button>

          <div className="my-4 flex items-center gap-3 text-ink-faint">
            <span className="h-px flex-1 bg-rose-gold/15" />
            <span className="font-sans text-[10px] uppercase tracking-wide2">or</span>
            <span className="h-px flex-1 bg-rose-gold/15" />
          </div>

          <Link
            href="/video-call"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-4 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2.5" y="6" width="13" height="12" rx="2" />
              <path d="M15.5 10.5 21 7v10l-5.5-3.5" />
            </svg>
            Book a video call
          </Link>

          <p className="mt-4 text-center font-sans text-[11px] leading-relaxed text-ink-faint">
            Secure checkout · Insured delivery · Easy returns
          </p>
        </aside>
      </div>
    </div>
  );
}
