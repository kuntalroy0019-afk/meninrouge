import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-blush-50">{children}</main>
      <Footer />
    </>
  );
}
