"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();

  return (
    <div className="mx-auto max-w-content px-6 py-14 md:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          Saved by you
        </p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          Your Wishlist
        </h1>
      </div>

      {!hydrated ? (
        <p className="py-20 text-center text-ink-faint">Loading…</p>
      ) : wishlist.length === 0 ? (
        <div className="mx-auto max-w-md py-16 text-center">
          <p className="font-serif text-2xl font-light text-ink">
            You haven&apos;t saved anything yet
          </p>
          <p className="mx-auto mt-3 max-w-sm font-sans text-sm font-light text-ink-soft">
            Tap the heart on any piece to keep it here while you decide.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
