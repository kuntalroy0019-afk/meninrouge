"use client";

import { productRating, productReviews, type Product } from "@/lib/catalog";

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-rose-gold/25" fill="currentColor" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="text-rose-gold" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ size, className, fill }: { size: number; className?: string; fill: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} aria-hidden>
      <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3z" />
    </svg>
  );
}

/** Compact rating line for next to the product title. */
export function RatingInline({ product }: { product: Product }) {
  const { rating, count } = productRating(product);
  return (
    <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-ink-soft hover:text-rose-gold">
      <Stars value={rating} />
      <span className="font-sans text-xs">
        {rating.toFixed(1)} · {count} reviews
      </span>
    </a>
  );
}

export default function Reviews({ product }: { product: Product }) {
  const { rating, count } = productRating(product);
  const reviews = productReviews(product, 3);

  return (
    <section id="reviews" className="mt-20 border-t border-rose-gold/12 pt-14">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr] md:gap-14">
        {/* summary */}
        <div>
          <p className="font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            Owner reviews
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="font-serif text-6xl font-light text-ink">
              {rating.toFixed(1)}
            </span>
            <div className="pb-2">
              <Stars value={rating} size={16} />
              <p className="mt-1 font-sans text-xs text-ink-faint">{count} reviews</p>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="space-y-7">
          {reviews.map((r, i) => (
            <div key={i} className="border-b border-rose-gold/10 pb-6 last:border-0">
              <div className="flex items-center justify-between">
                <Stars value={r.rating} />
                <span className="font-sans text-[11px] uppercase tracking-wide2 text-ink-faint">
                  {r.date}
                </span>
              </div>
              <h4 className="mt-3 font-serif text-lg text-ink">{r.title}</h4>
              <p className="mt-1.5 max-w-xl font-sans text-sm font-light leading-relaxed text-ink-soft">
                {r.body}
              </p>
              <p className="mt-3 font-sans text-[11px] uppercase tracking-wide2 text-ink">
                {r.name} · Verified owner
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
