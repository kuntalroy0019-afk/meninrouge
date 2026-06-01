"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated } = useStore();
  const [added, setAdded] = useState(false);
  const wished = hydrated && isWishlisted(product.id);
  const hoverImage = product.images[1] ?? product.images[0];

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} data-cursor="hover" data-cursor-label="View">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-blush-100">
          {/* primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover"
          />
          {/* secondary image fades/zooms in on hover */}
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { opacity: 0, scale: 1.05 }, hover: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.7, ease: EXPO }}
          >
            <Image
              src={hoverImage}
              alt=""
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          {/* shine sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            variants={{ rest: { x: "-130%", opacity: 0 }, hover: { x: "130%", opacity: 1 } }}
            transition={{ duration: 0.9, ease: EXPO }}
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
            }}
          />

          {product.badge && (
            <span className="absolute left-4 top-4 z-30 rounded-full bg-cream/90 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-ink backdrop-blur">
              {product.badge}
            </span>
          )}

          {/* wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink backdrop-blur transition-all hover:scale-110 hover:text-rose-gold"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={wished ? "#b76e79" : "none"}
              stroke={wished ? "#b76e79" : "currentColor"}
              strokeWidth="1.5"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
          </button>

          {/* add to cart */}
          <motion.button
            onClick={onAdd}
            variants={{ rest: { y: "120%" }, hover: { y: "0%" } }}
            transition={{ duration: 0.5, ease: EXPO }}
            className="absolute inset-x-3 bottom-3 z-30 rounded-full bg-ink py-3 font-sans text-[11px] uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
          >
            {added ? "Added ✦" : "Add to cart"}
          </motion.button>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-normal leading-tight text-ink transition-colors group-hover:text-rose-gold">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
            {product.material}
          </p>
        </div>
        <p className="whitespace-nowrap font-sans text-sm text-ink">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
