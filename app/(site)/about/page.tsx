import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";

export const metadata: Metadata = {
  title: "The House — About Men in Rogue",
  description:
    "The story of Men in Rogue — a house forging fine men's jewellery by hand, in solid metal.",
};

const values = [
  { title: "Hand-forged", desc: "Every piece is made by a single master, start to finish." },
  { title: "Solid metal", desc: "Real gold, platinum and silver — never plated, never faked." },
  { title: "Built to last", desc: "Designed to be handed down, guaranteed for life." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1607872828012-d0741c867edf?auto=format&fit=crop&w=2000&q=80"
          alt="Blackened dog-tag pendants — the Men in Rogue house"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/15 to-blush-50" />
        <div className="relative z-10 px-6 text-center">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-luxe text-champagne-light">
            Est. 1999 · Mumbai
          </p>
          <h1 className="font-serif text-5xl font-light text-cream md:text-7xl">
            The House
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <AnimatedText
          as="h2"
          lines={["Jewellery should say", <em key="i" className="italic">what you won&apos;t</em>]}
          className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-ink-soft">
            Men in Rogue began in a small Mumbai workshop with a single belief —
            that a man&apos;s jewellery should be as honest as a handshake.
            Three decades on, our makers still forge every piece by hand, in
            solid gold, platinum and blackened silver, for the men who wear it
            like armour.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-y border-rose-gold/15 bg-blush-100/50 py-20">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1} className="text-center">
              <p className="font-serif text-5xl font-light text-rose-gold">
                0{i + 1}
              </p>
              <h3 className="mt-4 font-serif text-2xl text-ink">{v.title}</h3>
              <p className="mx-auto mt-2 max-w-xs font-sans text-sm font-light text-ink-soft">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-6 py-24 text-center md:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">
            Begin your <span className="italic">heirloom</span>
          </h2>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-ink px-9 py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
          >
            Explore the collection
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
