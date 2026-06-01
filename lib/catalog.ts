export type Category = "Rings" | "Chains" | "Bracelets" | "Cufflinks";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // INR
  material: string;
  badge?: "New" | "Bestseller" | "Limited";
  images: string[];
  description: string;
  details: { label: string; value: string }[];
};

const U = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  "Rings",
  "Chains",
  "Bracelets",
  "Cufflinks",
];

const DETAILS = (metal: string, finish: string, stone: string, weight: string) => [
  { label: "Metal", value: metal },
  { label: "Finish", value: finish },
  { label: "Stone", value: stone },
  { label: "Weight", value: weight },
  { label: "Hallmark", value: "BIS Hallmarked" },
];

export const products: Product[] = [
  {
    id: "rogue-signet",
    slug: "rogue-signet-ring",
    name: "Rogue Signet Ring",
    category: "Rings",
    price: 86000,
    material: "Black Rhodium Silver",
    badge: "New",
    images: [
      U("photo-1638382874010-aa4e76fe267d"),
      U("photo-1638382874453-6f93c3b4b36a"),
      U("photo-1621899576741-a4dd9bcddaa2"),
    ],
    description:
      "A heavyweight engraved signet with a blacked-out face. Wear it as a seal, a statement, or a quiet warning. Built to take a beating and look better for it.",
    details: DETAILS("Black Rhodium over Silver", "Matte / brushed edge", "—", "14.2 g"),
  },
  {
    id: "onyx-band",
    slug: "onyx-bond-band",
    name: "Onyx Bond Band",
    category: "Rings",
    price: 74000,
    material: "Matte Steel & Onyx",
    images: [
      U("photo-1778759335295-b332b4eaac15"),
      U("photo-1638382874361-5d1438548f10"),
      U("photo-1612285127323-1837364f9da0"),
    ],
    description:
      "A heavy signet crowned with a slab of black onyx — the everyday ring for the man who doesn't do flashy, just permanent.",
    details: DETAILS("Stainless Steel", "Sandblasted matte", "Black onyx face", "12.4 g"),
  },
  {
    id: "knot-ring",
    slug: "knuckle-knot-ring",
    name: "Knuckle Knot Ring",
    category: "Rings",
    price: 52000,
    material: "Sterling Silver",
    badge: "Bestseller",
    images: [
      U("photo-1638382875827-9be89d76946e"),
      U("photo-1638382875668-3a1751bb6f20"),
      U("photo-1612285127323-1837364f9da0"),
    ],
    description:
      "A sculpted statement ring with a bold stone — architectural, weighty, and impossible to ignore across a table.",
    details: DETAILS("925 Sterling Silver", "Oxidised detail", "Cabochon stone", "11.0 g"),
  },
  {
    id: "cuban-chain",
    slug: "cuban-link-chain",
    name: "Cuban Link Chain",
    category: "Chains",
    price: 148000,
    material: "18k Solid Gold",
    badge: "Bestseller",
    images: [
      U("photo-1623040594055-9afc9b891b04"),
      U("photo-1613498510372-8901cad084a2"),
    ],
    description:
      "The chain that started a thousand reputations. Solid, hand-linked, and built with a box clasp that locks like a vault. 6mm of pure presence.",
    details: DETAILS("18k Solid Gold", "High polish", "—", "62 g · 22\""),
  },
  {
    id: "dogtag-pendant",
    slug: "dog-tag-pendant",
    name: "Black Dog-Tag Pendant",
    category: "Chains",
    price: 96000,
    material: "Blackened Steel",
    badge: "Limited",
    images: [
      U("photo-1607872828012-d0741c867edf"),
      U("photo-1637035223000-e921f071da98"),
    ],
    description:
      "A military-cut dog tag on a blackened ball chain. Engrave it. Earn it. Never explain it.",
    details: DETAILS("Blackened Steel", "Matte black", "—", "28 g"),
  },
  {
    id: "foxtail-chain",
    slug: "foxtail-chain",
    name: "Figaro Foxtail Chain",
    category: "Chains",
    price: 112000,
    material: "Gold Vermeil",
    images: [
      U("photo-1613498510372-8901cad084a2"),
      U("photo-1623040594055-9afc9b891b04"),
    ],
    description:
      "A tight, fluid Figaro weave that moves like liquid metal and sits sharp under an open collar.",
    details: DETAILS("Gold Vermeil over Silver", "Mirror polish", "—", "44 g · 24\""),
  },
  {
    id: "black-diamond-bracelet",
    slug: "black-diamond-bracelet",
    name: "Diamond-Cut Bracelet",
    category: "Bracelets",
    price: 132000,
    material: "Gold & Diamond",
    badge: "New",
    images: [
      U("photo-1623040593884-0044b3ce4ff9"),
      U("photo-1612473078715-923c0069e0c2"),
    ],
    description:
      "A diamond-cut line bracelet that throws light with every gesture. Stealth wealth, on the wrist.",
    details: DETAILS("18k Gold", "Diamond-cut", "Pavé diamond line", "18 g"),
  },
  {
    id: "cuban-bracelet",
    slug: "cuban-link-bracelet",
    name: "Cuban Link Bracelet",
    category: "Bracelets",
    price: 68000,
    material: "18k Gold",
    images: [
      U("photo-1612473078715-923c0069e0c2"),
      U("photo-1623040593884-0044b3ce4ff9"),
    ],
    description:
      "The Cuban chain's heavier brother for the wrist — solid links, lobster clasp, zero apologies.",
    details: DETAILS("18k Gold", "High polish", "—", "26 g · 8\""),
  },
  {
    id: "tigereye-cufflinks",
    slug: "tiger-eye-cufflinks",
    name: "Tiger-Eye Cufflinks",
    category: "Cufflinks",
    price: 64000,
    material: "Tiger-Eye & Gold",
    badge: "Limited",
    images: [
      U("photo-1685392024138-36e7aade79f7"),
      U("photo-1592593044691-f45c8db82a48"),
    ],
    description:
      "Domed tiger-eye framed in gold — the finishing move for a sharp suit and a sharper agenda.",
    details: DETAILS("Gold-plated brass", "High polish", "Tiger-eye cabochon", "12 g pair"),
  },
  {
    id: "gold-cufflinks",
    slug: "polished-gold-cufflinks",
    name: "Polished Gold Cufflinks",
    category: "Cufflinks",
    price: 78000,
    material: "18k Gold",
    images: [
      U("photo-1685392024338-f50db22ef99a"),
      U("photo-1685392024138-36e7aade79f7"),
    ],
    description:
      "A clean, weighty disc of polished gold. Understated until you shake a hand.",
    details: DETAILS("18k Gold", "Mirror polish", "—", "10 g pair"),
  },
];

// ── Meet the Maker videos ───────────────────────────────────────────────
// Crafter explains each piece. Stock jewellery b-roll for now (Mixkit, free /
// hotlink-friendly, returns video/mp4); the product photo is used as the
// poster. Swap `src` for the client's real crafter videos in production.
export type MakerVideo = {
  src: string;
  crafter: string;
  role: string;
  transcript: string;
};

const MK = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;
const V_RING = MK(13058);
const V_CHAIN = MK(34213);
const V_BRACELET = MK(34611);
const V_CUFF = MK(34636);

export const productVideos: Record<string, MakerVideo> = {
  "rogue-signet": {
    src: V_RING,
    crafter: "Rajan Verma",
    role: "Master Goldsmith · 24 years",
    transcript:
      "I cut the face dead flat so it takes an engraving cleanly, then black-rhodium it by hand. A signet should feel like there's weight behind every word you don't say.",
  },
  "onyx-band": {
    src: V_RING,
    crafter: "Rajan Verma",
    role: "Master Goldsmith · 24 years",
    transcript:
      "The onyx is set deep so it sits flush with the steel — nothing to snag, nothing to fuss over. This is the ring you forget you're wearing until someone asks about it.",
  },
  "knot-ring": {
    src: V_RING,
    crafter: "Rajan Verma",
    role: "Master Goldsmith · 24 years",
    transcript:
      "The knot is forged from a single bar and twisted while it's still hot. No two finish identically — and that's exactly the point.",
  },
  "cuban-chain": {
    src: V_CHAIN,
    crafter: "Imran Sheikh",
    role: "Chain-maker · 18 years",
    transcript:
      "Every link is hand-soldered and hand-polished — over two hundred of them in a 22-inch. The box clasp is the hardest part; get it wrong and the whole chain feels cheap.",
  },
  "dogtag-pendant": {
    src: V_CHAIN,
    crafter: "Imran Sheikh",
    role: "Chain-maker · 18 years",
    transcript:
      "We blacken the steel in layers so it wears in, not out. Bring it back in ten years and the marks on it will look earned.",
  },
  "foxtail-chain": {
    src: V_CHAIN,
    crafter: "Imran Sheikh",
    role: "Chain-maker · 18 years",
    transcript:
      "A Figaro weave has to flow — too stiff and it sits wrong under a collar. I tune the link ratio by hand until it moves like water.",
  },
  "black-diamond-bracelet": {
    src: V_BRACELET,
    crafter: "Devendra Soni",
    role: "Setter & Polisher · 20 years",
    transcript:
      "Each facet is diamond-cut so it throws light as the wrist moves. Setting a continuous line is pure patience — one stone off and the whole row reads crooked.",
  },
  "cuban-bracelet": {
    src: V_BRACELET,
    crafter: "Devendra Soni",
    role: "Setter & Polisher · 20 years",
    transcript:
      "Same Cuban links as the chain, just heavier per inch for the wrist. The lobster clasp is rated to take a real grip.",
  },
  "tigereye-cufflinks": {
    src: V_CUFF,
    crafter: "Anil Kapadia",
    role: "Finisher · 16 years",
    transcript:
      "Tiger-eye is cut as a dome so it catches light from every angle across a table. I hand-polish the gold bezel last, so it's the final thing that shines.",
  },
  "gold-cufflinks": {
    src: V_CUFF,
    crafter: "Anil Kapadia",
    role: "Finisher · 16 years",
    transcript:
      "A plain gold disc hides nothing — every tool mark shows. So I finish these by hand to a mirror, then check them under a loupe. Twice.",
  },
};

export const getProductVideo = (id: string): MakerVideo | undefined =>
  productVideos[id];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// ── Transparency: price breakup + EMI ───────────────────────────────────
export const emiPerMonth = (price: number, months = 12) =>
  Math.round(price / months);

export function priceBreakup(p: Product) {
  const gst = Math.round(p.price - p.price / 1.03); // 3% GST component
  const base = p.price - gst;
  const hasStone = p.details.some(
    (d) => d.label === "Stone" && d.value !== "—"
  );

  let metalPct = 0.6;
  let makingPct = 0.25;
  if (p.category === "Chains") {
    metalPct = 0.78;
    makingPct = 0.22;
  } else if (p.category === "Cufflinks") {
    metalPct = 0.55;
    makingPct = 0.3;
  }
  if (!hasStone) metalPct = 1 - makingPct; // fold stone share into metal

  const metal = Math.round(base * metalPct);
  const making = Math.round(base * makingPct);
  const stones = base - metal - making; // remainder keeps the sum exact

  const rows: { label: string; value: number }[] = [
    { label: `${p.material} (incl. weight)`, value: metal },
    { label: "Making charges", value: making },
  ];
  if (stones > 0) rows.push({ label: "Diamonds / stones", value: stones });
  rows.push({ label: "GST (3%)", value: gst });
  return { rows, total: p.price };
}

// ── Structured specifications (BlueStone-style grouped detail tables) ────
export function productCode(p: Product) {
  let h = 0;
  for (const c of p.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const num = (h % 900000) + 100000; // 6 digits
  const pre =
    p.category === "Rings"
      ? "RG"
      : p.category === "Chains"
        ? "CH"
        : p.category === "Bracelets"
          ? "BR"
          : "CF";
  return `MR-${pre}${num}`;
}

function purity(material: string) {
  if (/platinum/i.test(material)) return "950 Platinum";
  if (/silver|sterling/i.test(material)) return "925 Sterling";
  if (/steel/i.test(material)) return "316L Steel";
  if (/gold|vermeil/i.test(material)) return "18 Kt";
  return material;
}

export type SpecGroup = { title: string; rows: { label: string; value: string }[] };

export function productSpecs(p: Product): SpecGroup[] {
  const get = (label: string) =>
    p.details.find((d) => d.label === label)?.value;
  const hasStone = (get("Stone") ?? "—") !== "—";

  const groups: SpecGroup[] = [
    {
      title: "Product Details",
      rows: [
        { label: "Product code", value: productCode(p) },
        { label: "Category", value: p.category },
        { label: "Finish", value: get("Finish") ?? "Hand-finished" },
        { label: "Product weight", value: get("Weight") ?? "—" },
      ],
    },
  ];

  if (hasStone) {
    groups.push({
      title: "Stone Details",
      rows: [
        { label: "Stone", value: get("Stone") as string },
        { label: "Clarity", value: "VS1" },
        { label: "Colour", value: "F – G" },
        { label: "Shape", value: "Round / mixed" },
        { label: "Setting", value: "Pavé / prong" },
      ],
    });
  }

  groups.push({
    title: "Metal Details",
    rows: [
      { label: "Type", value: get("Metal") ?? p.material },
      { label: "Purity", value: purity(p.material) },
      { label: "Hallmark", value: get("Hallmark") ?? "BIS Hallmarked" },
    ],
  });

  return groups;
}

// ── Ratings & reviews (mock — deterministic so SSR matches client) ───────
export type Review = {
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

const REVIEW_POOL: Review[] = [
  {
    name: "Kabir M.",
    rating: 5,
    date: "Apr 2026",
    title: "Heavier than I expected — in a good way",
    body: "Solid metal, real weight. Feels like it'll outlast me. Wear it every day.",
  },
  {
    name: "Aryan S.",
    rating: 5,
    date: "Mar 2026",
    title: "Exactly as pictured",
    body: "The finish is clean and the packaging felt genuinely premium. No complaints.",
  },
  {
    name: "Rohan D.",
    rating: 4,
    date: "Mar 2026",
    title: "Great piece, sizing tip",
    body: "Go half a size up if you're between sizes. Otherwise flawless craftsmanship.",
  },
  {
    name: "Vihaan R.",
    rating: 5,
    date: "Feb 2026",
    title: "Get compliments constantly",
    body: "Understated but people notice. The engraving service was a nice touch.",
  },
  {
    name: "Ishaan K.",
    rating: 5,
    date: "Feb 2026",
    title: "Worth every rupee",
    body: "You can feel the difference between this and plated stuff. Buy it.",
  },
  {
    name: "Devendra P.",
    rating: 4,
    date: "Jan 2026",
    title: "Shipping was quick",
    body: "Insured delivery arrived in two days, beautifully boxed. Quality is top-notch.",
  },
];

export function productRating(p: Product) {
  const seed = p.slug.length + (p.price % 13);
  const rating = 4.5 + ((seed % 5) * 0.1); // 4.5 – 4.9
  const count = 16 + (p.price % 47);
  return { rating: Math.round(rating * 10) / 10, count };
}

export function productReviews(p: Product, n = 3): Review[] {
  const start = p.slug.charCodeAt(0) % REVIEW_POOL.length;
  return Array.from({ length: n }, (_, i) => REVIEW_POOL[(start + i) % REVIEW_POOL.length]);
}

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const productsByCategory = (cat: Category | "All") =>
  cat === "All" ? products : products.filter((p) => p.category === cat);

export const relatedProducts = (p: Product, n = 4) =>
  products
    .filter((x) => x.id !== p.id && x.category === p.category)
    .concat(products.filter((x) => x.id !== p.id && x.category !== p.category))
    .slice(0, n);
