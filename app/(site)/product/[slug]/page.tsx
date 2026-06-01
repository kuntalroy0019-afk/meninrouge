import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProduct,
  products,
  relatedProducts,
  formatPrice,
} from "@/lib/catalog";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found — Men in Rogue" };
  return {
    title: `${product.name} — ${formatPrice(product.price)} | Men in Rogue`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} related={relatedProducts(product)} />;
}
