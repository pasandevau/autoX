import Navigation from "@/components/Navigation";
import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import ServicesGrid from "@/components/ServicesGrid";
import MobileServiceShowcase from "@/components/MobileServiceShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import NDISSection from "@/components/NDISSection";
import RoadsideSection from "@/components/RoadsideSection";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import CTABanner from "@/components/CTABanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <PromoBanner />
        <Hero />
        <MarqueeBanner />
        <ServicesGrid />
        <MobileServiceShowcase />
        <NDISSection />
        <WhyChooseUs />
        <HowItWorks />
        <RoadsideSection />
        <Testimonials />
        <BlogPreview />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
