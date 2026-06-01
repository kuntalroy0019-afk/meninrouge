"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  emiPerMonth,
  formatPrice,
  priceBreakup,
  productSpecs,
  type Product,
} from "@/lib/catalog";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import MakerVideo from "./MakerVideo";
import SizeGuide from "./SizeGuide";
import Reviews, { RatingInline } from "./Reviews";
import RecentlyViewed from "./RecentlyViewed";
import HowItWorks from "./HowItWorks";
import VideoConsultBanner from "./VideoConsultBanner";

const EXPO = [0.16, 1, 0.3, 1] as const;

const services = [
  "Complimentary insured shipping",
  "60-day returns & exchange",
  "Lifetime cleaning & care",
  "Gift packaging included",
];

const certs = ["BIS Hallmarked", "IGI Certified", "SGL Assured"];

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated, pushRecent } =
    useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [engrave, setEngrave] = useState(false);
  const [engraving, setEngraving] = useState("");
  const wished = hydrated && isWishlisted(product.id);
  const breakup = priceBreakup(product);

  useEffect(() => {
    pushRecent(product.id);
  }, [product.id, pushRecent]);

  const onAdd = () => {
    addToCart(product.id, qty, engrave ? engraving : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-content px-6 py-10 md:px-8 md:py-14">
      {/* breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
        <Link href="/" className="hover:text-rose-gold">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-rose-gold">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-rose-gold">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 md:flex-row md:sticky md:top-24 md:self-start">
          <div className="flex gap-3 md:flex-col">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-20 w-16 overflow-hidden rounded-[2px] border transition-colors md:h-24 md:w-20 ${
                  active === i ? "border-rose-gold" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-square max-h-[560px] flex-1 overflow-hidden rounded-[2px] bg-blush-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EXPO }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[active]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-ink">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:pt-4">
          <p className="font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            {product.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
            {product.name}
          </h1>

          <RatingInline product={product} />

          <p className="mt-4 font-sans text-xl text-ink">{formatPrice(product.price)}</p>
          <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
            Inclusive of all taxes · {product.material}
          </p>
          <p className="mt-2 font-sans text-xs text-ink-soft">
            or {formatPrice(emiPerMonth(product.price))}/mo
            <span className="text-ink-faint"> · 12 months, no-cost EMI</span>
          </p>

          <p className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* size guide */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
              {product.category === "Rings" ? "Find your ring size" : "Check sizing"}
            </span>
            <SizeGuide category={product.category} />
          </div>

          {/* engraving */}
          <div className="mt-6 rounded-[3px] border border-rose-gold/20 bg-blush-100/40 p-4">
            <label className="flex cursor-pointer items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wide2 text-ink">
                Add engraving
                <span className="ml-2 text-rose-gold">Complimentary</span>
              </span>
              <input
                type="checkbox"
                checked={engrave}
                onChange={(e) => setEngrave(e.target.checked)}
                className="h-4 w-4 accent-rose-gold"
              />
            </label>
            <AnimatePresence initial={false}>
              {engrave && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EXPO }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    value={engraving}
                    maxLength={15}
                    onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                    placeholder="Initials or a short message"
                    className="mt-3 w-full rounded-[2px] border border-ink/15 bg-cream px-4 py-3 font-sans text-sm uppercase tracking-wide2 text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-faint focus:border-rose-gold focus:outline-none"
                  />
                  <p className="mt-1.5 text-right font-sans text-[10px] uppercase tracking-wide2 text-ink-faint">
                    {engraving.length}/15
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* qty + add */}
          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-ink/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-lg text-ink hover:text-rose-gold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-sans text-sm tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center text-lg text-ink hover:text-rose-gold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={onAdd}
              className="relative flex-1 overflow-hidden rounded-full bg-ink py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
            >
              {added ? "Added to cart ✦" : "Add to cart"}
            </button>
          </div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 py-3.5 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "#b76e79" : "none"} stroke={wished ? "#b76e79" : "currentColor"} strokeWidth="1.5">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
              </svg>
              {wished ? "Saved" : "Add to wishlist"}
            </button>
            <Link
              href="/video-call"
              className="flex flex-1 items-center justify-center rounded-full border border-ink/20 py-3.5 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
            >
              Book a viewing
            </Link>
          </div>

          {/* certification */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[3px] bg-blush-100/50 px-4 py-3">
            <span className="font-sans text-[11px] uppercase tracking-wide2 text-ink">
              100% Certified
            </span>
            {certs.map((c) => (
              <span key={c} className="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
                <span className="text-rose-gold">✦</span>
                {c}
              </span>
            ))}
          </div>

          {/* grouped specifications */}
          <div className="mt-8 border-t border-rose-gold/15">
            {productSpecs(product).map((g, i) => (
              <div key={g.title} className={i > 0 ? "border-t border-rose-gold/15" : ""}>
                <Accordion title={g.title} defaultOpen={i === 0}>
                  {g.rows.map((r) => (
                    <Row key={r.label} label={r.label} value={r.value} />
                  ))}
                </Accordion>
              </div>
            ))}

            {/* price breakup */}
            <div className="border-t border-rose-gold/15">
              <Accordion title="Price breakup">
                {breakup.rows.map((r) => (
                  <Row key={r.label} label={r.label} value={formatPrice(r.value)} />
                ))}
                <div className="flex justify-between pt-3 font-sans text-sm">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-medium text-ink">{formatPrice(breakup.total)}</span>
                </div>
                <p className="mt-3 font-sans text-[11px] font-light text-ink-faint">
                  Transparent pricing — metal weight billed at the day&apos;s rate.
                </p>
              </Accordion>
            </div>
          </div>

          {/* services */}
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-2 font-sans text-xs font-light text-ink-soft">
                <span className="text-rose-gold">✦</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video consultation banner */}
      <div className="mt-16">
        <VideoConsultBanner />
      </div>

      {/* Meet the maker */}
      <MakerVideo product={product} />

      {/* How a private viewing works */}
      <HowItWorks />

      {/* Reviews */}
      <Reviews product={product} />

      {/* Related */}
      <section className="mt-20 border-t border-rose-gold/12 pt-14">
        <h2 className="mb-10 text-center font-serif text-3xl font-light text-ink md:text-4xl">
          You may also <span className="italic">love</span>
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      <RecentlyViewed currentId={product.id} />
    </div>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 font-sans text-xs uppercase tracking-wide2 text-ink"
      >
        {title}
        <motion.span animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-rose-gold/10 py-2.5 font-sans text-sm">
      <span className="text-ink-faint">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
