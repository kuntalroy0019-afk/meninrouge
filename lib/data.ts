export type Product = {
  id: string;
  name: string;
  price: string;
  badge?: "New" | "Bestseller" | "Limited";
  image: string;
  imageAlt: string;
};

export type Category = {
  title: string;
  caption: string;
  image: string;
};

// Unsplash imagery (jewellery / editorial). Swap for brand assets in production.
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    title: "Rings",
    caption: "Signets & bands",
    image: U("photo-1621899576741-a4dd9bcddaa2"),
  },
  {
    title: "Chains",
    caption: "Cuban links & pendants",
    image: U("photo-1613498510372-8901cad084a2"),
  },
  {
    title: "Bracelets",
    caption: "Cuffs & link bracelets",
    image: U("photo-1612473078715-923c0069e0c2"),
  },
  {
    title: "Cufflinks",
    caption: "Tiger-eye & gold",
    image: U("photo-1592593044691-f45c8db82a48"),
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Rogue Signet Ring",
    price: "₹86,000",
    badge: "New",
    image: U("photo-1638382874010-aa4e76fe267d", 800),
    imageAlt: "Engraved signet ring for men",
  },
  {
    id: "p2",
    name: "Cuban Link Chain",
    price: "₹1,48,000",
    badge: "Bestseller",
    image: U("photo-1623040594055-9afc9b891b04", 800),
    imageAlt: "Man wearing a solid gold cuban link chain",
  },
  {
    id: "p3",
    name: "Tiger-Eye Cufflinks",
    price: "₹64,000",
    image: U("photo-1685392024138-36e7aade79f7", 800),
    imageAlt: "Tiger-eye and gold cufflinks",
  },
  {
    id: "p4",
    name: "Diamond-Cut Bracelet",
    price: "₹1,32,000",
    badge: "Limited",
    image: U("photo-1623040593884-0044b3ce4ff9", 800),
    imageAlt: "Diamond-cut bracelet on a man's wrist",
  },
];

export const signatureCollections = [
  {
    title: "Rogue",
    year: "House Signature",
    desc: "Stacked silver, chains and signets.",
    image: U("photo-1575863438848-e058621afa9b", 1100),
  },
  {
    title: "Onyx",
    year: "Stealth Line",
    desc: "Black onyx set in matte steel.",
    image: U("photo-1778759335295-b332b4eaac15", 1100),
  },
  {
    title: "Heritage",
    year: "Wedding Bands",
    desc: "Bands built to outlast the vows.",
    image: U("photo-1637035223000-e921f071da98", 1100),
  },
  {
    title: "Forge",
    year: "Limited Drop",
    desc: "Hand-forged, numbered, never repeated.",
    image: U("photo-1638382874010-aa4e76fe267d", 1100),
  },
  {
    title: "Cuban",
    year: "Everyday Gold",
    desc: "Solid links for daily wear.",
    image: U("photo-1623040594055-9afc9b891b04", 1100),
  },
];

export const heritageStats = [
  { value: 27, suffix: "", label: "Years forging" },
  { value: 24, suffix: "", label: "Cities stocked" },
  { value: 60, suffix: "k+", label: "Pieces hand-set" },
  { value: 100, suffix: "%", label: "Solid metal" },
];

export const promises = [
  {
    title: "Ethically Sourced",
    desc: "Conflict-free stones, fully traceable.",
  },
  {
    title: "Lifetime Service",
    desc: "Free re-polishing and re-sizing, for life.",
  },
  {
    title: "Solid, Never Plated",
    desc: "Real metal, certified weight, every time.",
  },
  {
    title: "Bespoke Forge",
    desc: "Commission a one-of-one piece with our makers.",
  },
];

export const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Signature", href: "#editorial" },
  { label: "The Code", href: "#bridal" },
  { label: "The House", href: "#promises" },
];
