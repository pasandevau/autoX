import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BookingWizard from "./BookingWizard";

export default function BookingsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="Book a Service"
          title="Schedule Your"
          titleHighlight="Mobile Mechanic"
          subtitle="Pick your date, choose a time that suits you, and we'll confirm within the hour. Need immediate help? Call us directly — we're available 24/7."
          cta={{ label: "Call Now: 1300 09 66 16", href: "tel:1300096616", tel: true }}
        />

        <section className="section bg-[#F8F8F8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              {[
                "✓ Real-time availability",
                "✓ Confirmed within 1 hour",
                "✓ Fixed price — no surprises",
                "✓ We come to you",
              ].map((item) => (
                <span key={item} className="text-sm font-bold text-[#1A1A2E]/55">{item}</span>
              ))}
            </div>

            <BookingWizard />

            {/* Urgent CTA below */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#1A1A2E]/45 font-medium">
                Need immediate roadside assistance?{" "}
                <a href="tel:1300096616" className="text-[#FF8C00] font-extrabold hover:underline">
                  Call 1300 09 66 16
                </a>{" "}
                — we're available 24/7
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
