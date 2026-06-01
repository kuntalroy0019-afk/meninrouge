import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CartDrawer from "@/components/CartDrawer";
import AppointmentModal from "@/components/AppointmentModal";
import { StoreProvider } from "@/lib/store";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Men in Rogue — Fine Men's Jewellery, Forged by Hand",
  description:
    "Men in Rogue crafts fine men's jewellery — signet rings, solid gold chains, bracelets and cufflinks. Forged by hand for men who write their own rules.",
  keywords: [
    "men's jewellery",
    "men's rings",
    "signet ring",
    "gold chain for men",
    "cufflinks",
    "men's bracelet",
  ],
  openGraph: {
    title: "Men in Rogue — Fine Men's Jewellery",
    description: "Where edge meets craft.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="grain antialiased">
        <StoreProvider>
          <CustomCursor />
          <ScrollProgress />
          <CartDrawer />
          <AppointmentModal />
          <SmoothScroll>{children}</SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  );
}
