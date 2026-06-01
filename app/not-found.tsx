import Link from "next/link";
import RotatingDiamond from "@/components/ui/RotatingDiamond";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream to-blush-200/60 px-6 text-center">
      <RotatingDiamond size={88} className="mb-8 animate-floaty" />
      <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
        Error 404
      </p>
      <h1 className="font-serif text-6xl font-light leading-none text-ink md:text-8xl">
        Lost its <span className="italic text-gold-shimmer">sparkle</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md font-sans text-sm font-light text-ink-soft">
        The page you are looking for has slipped away. Let us guide you back to
        the light.
      </p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-ink px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
        >
          Return home
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-ink/25 px-8 py-4 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold"
        >
          Browse the collection
        </Link>
      </div>
    </section>
  );
}
