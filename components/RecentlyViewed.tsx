"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";

/**
 * "Recently viewed" strip. Reads from the persisted store (localStorage),
 * excluding the product currently being viewed. Renders nothing until there
 * is something worth showing (avoids an empty/flashing section).
 */
export default function RecentlyViewed({ currentId }: { currentId: string }) {
  const { recentProducts, hydrated } = useStore();
  const [items, setItems] = useState(() => recentProducts(currentId));

  useEffect(() => {
    setItems(recentProducts(currentId));
  }, [recentProducts, currentId, hydrated]);

  if (!hydrated || items.length === 0) return null;

  return (
    <section className="mt-20 border-t border-rose-gold/12 pt-14">
      <h2 className="mb-10 text-center font-serif text-3xl font-light text-ink md:text-4xl">
        Recently <span className="italic">viewed</span>
      </h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {items.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
