import IntroGate from "@/components/IntroGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import HorizontalGallery from "@/components/HorizontalGallery";
import FeaturedCollection from "@/components/FeaturedCollection";
import Heritage from "@/components/Heritage";
import WordMarquee from "@/components/WordMarquee";
import EditorialBanner from "@/components/EditorialBanner";
import Manifesto from "@/components/Manifesto";
import BridalShowcase from "@/components/BridalShowcase";
import Promises from "@/components/Promises";
import Testimonial from "@/components/Testimonial";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import GoldLine from "@/components/ui/GoldLine";

export default function Home() {
  return (
    <main>
      <IntroGate />
      <Navbar />
      <Hero />
      <Marquee />
      <Categories />
      <HorizontalGallery />
      <FeaturedCollection />
      <Heritage />
      <WordMarquee />
      <EditorialBanner />
      <Manifesto />
      <BridalShowcase />
      <Promises />
      <GoldLine />
      <Testimonial />
      <Newsletter />
      <Footer />
    </main>
  );
}
