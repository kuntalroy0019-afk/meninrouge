import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { categories, type Category } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Men's Jewellery — Men in Rogue",
  description:
    "Browse signet rings, solid gold chains, bracelets and cufflinks for men.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const initial =
    sp.category && categories.includes(sp.category as Category)
      ? (sp.category as Category)
      : "All";
  return <ShopGrid initialCategory={initial} />;
}
