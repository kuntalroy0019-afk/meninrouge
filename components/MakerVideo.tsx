"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { getProductVideo, type Product } from "@/lib/catalog";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * "Meet the Maker" — the crafter explains the piece.
 * The product photo is the poster; the video is preload="none" so nothing
 * downloads until the visitor presses play (keeps all product pages light).
 */
export default function MakerVideo({ product }: { product: Product }) {
  const video = getProductVideo(product.id);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!video) return null;

  const play = () => {
    ref.current?.play();
    setPlaying(true);
  };

  return (
    <section className="mt-24 border-t border-rose-gold/12 pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">
        {/* Player */}
        <div className="relative aspect-video overflow-hidden rounded-[2px] bg-blush-100">
          <video
            ref={ref}
            src={video.src}
            poster={product.images[0]}
            preload="none"
            playsInline
            controls={playing}
            onPause={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {!playing && (
            <button
              onClick={play}
              aria-label={`Play: ${video.crafter} on the ${product.name}`}
              className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
            >
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-cream/90 text-ink shadow-[0_8px_30px_rgba(43,32,36,0.25)] backdrop-blur"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.span>
              <span className="absolute bottom-4 left-4 font-sans text-[11px] uppercase tracking-wide2 text-cream/90">
                Watch · {video.crafter}
              </span>
            </button>
          )}
        </div>

        {/* Copy */}
        <div>
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
            Meet the maker
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ink md:text-4xl">
            {video.crafter}
          </h2>
          <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
            {video.role}
          </p>
          <blockquote className="mt-6 font-serif text-xl font-light italic leading-relaxed text-ink-soft md:text-2xl">
            &ldquo;{video.transcript}&rdquo;
          </blockquote>
          <p className="mt-6 flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-ink">
            <span className="h-px w-8 bg-rose-gold/50" />
            On the {product.name}
          </p>
        </div>
      </div>
    </section>
  );
}
