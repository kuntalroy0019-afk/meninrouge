"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const EXPO = [0.16, 1, 0.3, 1] as const;

const tabs = ["Orders", "Wishlist", "Profile", "Addresses"] as const;
type Tab = (typeof tabs)[number];

const orders = [
  {
    id: "ROG-10428",
    date: "12 May 2026",
    status: "Delivered",
    total: 86000,
    item: "Rogue Signet Ring",
  },
  {
    id: "ROG-10391",
    date: "28 Mar 2026",
    status: "In transit",
    total: 148000,
    item: "Cuban Link Chain",
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { wishlist, hydrated, toggleWishlist, addToCart } = useStore();
  const [tab, setTab] = useState<Tab>("Orders");

  return (
    <div className="mx-auto max-w-content px-6 py-14 md:px-8">
      <div className="mb-10">
        <p className="mb-2 font-sans text-[11px] uppercase tracking-luxe text-rose-gold">
          My account
        </p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
Welcome back, Kabir
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative whitespace-nowrap rounded-full px-5 py-3 text-left font-sans text-xs uppercase tracking-wide2 transition-colors lg:rounded-[2px] ${
                  tab === t
                    ? "bg-ink text-cream lg:bg-blush-100 lg:text-rose-gold"
                    : "text-ink-soft hover:text-rose-gold"
                }`}
              >
                {t}
                {t === "Wishlist" && hydrated && wishlist.length > 0 && (
                  <span className="ml-2 text-rose-gold">({wishlist.length})</span>
                )}
              </button>
            ))}
            <button
              onClick={() => router.push("/login")}
              className="mt-2 rounded-[2px] px-5 py-3 text-left font-sans text-xs uppercase tracking-wide2 text-ink-faint hover:text-rose-gold"
            >
              Sign out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EXPO }}
        >
          {tab === "Orders" && (
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-6"
                >
                  <div>
                    <p className="font-serif text-lg text-ink">{o.item}</p>
                    <p className="mt-1 font-sans text-xs uppercase tracking-wide2 text-ink-faint">
                      Order {o.id} · {o.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 ${
                        o.status === "Delivered"
                          ? "bg-rose-gold/15 text-rose-gold"
                          : "bg-champagne/20 text-champagne-dark"
                      }`}
                    >
                      {o.status}
                    </span>
                    <p className="mt-2 font-sans text-sm text-ink">
                      {formatPrice(o.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Wishlist" && (
            <div>
              {!hydrated ? (
                <p className="text-ink-faint">Loading…</p>
              ) : wishlist.length === 0 ? (
                <Empty
                  title="Your wishlist is empty"
                  cta="Discover pieces"
                  href="/shop"
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {wishlist.map((p) => (
                    <div
                      key={p.id}
                      className="flex gap-4 rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-4"
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[2px] bg-blush-100"
                      >
                        <Image src={p.images[0]} alt={p.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link href={`/product/${p.slug}`}>
                          <h3 className="font-serif text-base text-ink hover:text-rose-gold">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="mt-1 font-sans text-sm text-ink-soft">
                          {formatPrice(p.price)}
                        </p>
                        <div className="mt-auto flex gap-3 pt-2">
                          <button
                            onClick={() => addToCart(p.id)}
                            className="font-sans text-[11px] uppercase tracking-wide2 text-ink hover:text-rose-gold"
                          >
                            Add to cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="font-sans text-[11px] uppercase tracking-wide2 text-ink-faint hover:text-rose-gold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "Profile" && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-md space-y-5 rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-7"
            >
              <Row label="Full name" value="Kabir Singh" />
              <Row label="Email" value="kabir@example.com" type="email" />
              <Row label="Phone" value="+91 98765 43210" />
              <button className="rounded-full bg-ink px-7 py-3.5 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold">
                Save changes
              </button>
            </form>
          )}

          {tab === "Addresses" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-6">
                <span className="rounded-full bg-rose-gold/15 px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-rose-gold">
                  Default
                </span>
                <p className="mt-4 font-serif text-lg text-ink">Kabir Singh</p>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  14 Altamount Road, Apt 9B
                  <br />
                  Mumbai, Maharashtra 400026
                  <br />
                  India · +91 98765 43210
                </p>
              </div>
              <button className="grid min-h-[160px] place-items-center rounded-[3px] border border-dashed border-rose-gold/30 font-sans text-xs uppercase tracking-wide2 text-ink-faint transition-colors hover:border-rose-gold hover:text-rose-gold">
                + Add new address
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="w-full rounded-[2px] border border-ink/15 bg-blush-50 px-4 py-3 font-sans text-sm text-ink focus:border-rose-gold focus:outline-none"
      />
    </label>
  );
}

function Empty({
  title,
  cta,
  href,
}: {
  title: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="rounded-[3px] border border-rose-gold/15 bg-blush-100/40 p-12 text-center">
      <p className="font-serif text-2xl font-light text-ink">{title}</p>
      <Link
        href={href}
        className="mt-5 inline-block rounded-full bg-ink px-7 py-3.5 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
      >
        {cta}
      </Link>
    </div>
  );
}
