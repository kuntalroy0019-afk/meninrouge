"use client";

import Link from "next/link";
import { products } from "@/lib/catalog";
import AnimatedText from "./ui/AnimatedText";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import ProductCard from "./ProductCard";

export default function FeaturedCollection() {
  const featured = products.slice(0, 4);
  return (
    <section className="bg-blush-100/60 py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            New arrivals
          </p>
          <AnimatedText
            as="h2"
            lines={[<>The Rogue Edit</>]}
            className="font-serif text-5xl font-light text-ink md:text-7xl"
          />
          <p className="mx-auto mt-5 max-w-md font-sans text-sm font-light text-ink-soft">
            Four signatures from this season&apos;s collection — each a study in
            blush, brilliance and balance.
          </p>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {featured.map((p) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
          >
            View all pieces →
          </Link>
        </div>
      </div>
    </section>
  );
}
