import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
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
        <Hero />
        <MarqueeBanner />
        <ServicesGrid />
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
