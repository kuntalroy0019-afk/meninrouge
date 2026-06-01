"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  categories,
  products,
  type Category,
} from "@/lib/catalog";
import ProductCard from "./ProductCard";
import VideoConsultBanner from "./VideoConsultBanner";

const EXPO = [0.16, 1, 0.3, 1] as const;
type Filter = Category | "All";
type Sort = "featured" | "price-asc" | "price-desc";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ShopGrid({
  initialCategory = "All",
}: {
  initialCategory?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const base =
      filter === "All" ? products : products.filter((p) => p.category === filter);
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filter, sort]);

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-rose-gold/15 bg-blush-100/50">
        <div className="mx-auto max-w-content px-6 py-16 text-center md:px-8 md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO }}
            className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.05 }}
            className="font-serif text-5xl font-light text-ink md:text-7xl"
          >
            Fine Jewellery
          </motion.h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm font-light text-ink-soft">
            Every piece forged by hand in our workshop. Filter by category, or
            see it all.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[57px] z-30 border-b border-rose-gold/10 bg-blush-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {(["All", ...categories] as Filter[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 font-sans text-[11px] uppercase tracking-wide2 transition-colors ${
                  filter === c
                    ? "bg-ink text-cream"
                    : "border border-ink/15 text-ink-soft hover:border-rose-gold hover:text-rose-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-ink-soft">
            <span className="font-sans text-[11px] uppercase tracking-wide2">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-ink/15 bg-transparent px-4 py-2 font-sans text-xs text-ink focus:border-rose-gold focus:outline-none"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-content px-6 py-14 md:px-8">
        <p className="mb-8 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>
        <motion.div
          layout
          className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EXPO, delay: (i % 4) * 0.05 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20">
          <VideoConsultBanner />
        </div>
      </div>
    </div>
  );
}
