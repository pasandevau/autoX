"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { ChevronDown, Phone } from "lucide-react";

const categories = [
  {
    title: "General Questions",
    colour: "#FFB300",
    faqs: [
      {
        q: "What is a mobile mechanic?",
        a: "A mobile mechanic is a fully qualified technician who travels to your location — your home, workplace, or wherever your car is — instead of you having to take the car to a workshop. We carry all the tools and most parts needed to complete the job on the spot.",
      },
      {
        q: "What areas do you service?",
        a: "We cover the greater Adelaide metropolitan area and most surrounding suburbs, including Adelaide CBD, Norwood, Prospect, Unley, Burnside, Glenelg, Port Adelaide, Campbelltown, Modbury, Tea Tree Gully, Mawson Lakes, Marion, Morphett Vale, Salisbury, Elizabeth and many more. Call us to confirm if you're in a fringe area.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. All AutoXpert Group mechanics hold current Motor Vehicle Technician licences. We carry full public liability insurance and all staff are police-checked. You can ask to see our credentials at any time.",
      },
      {
        q: "Do I need to stay with my car during the service?",
        a: "Not at all. As long as we can access the vehicle and you're available by phone in case we have questions, you're free to carry on with your day. Many customers are at work while we service their car in the car park.",
      },
    ],
  },
  {
    title: "Booking & Scheduling",
    colour: "#FF8C00",
    faqs: [
      {
        q: "How do I book a service?",
        a: "You can book through our online booking form on this website, or call us directly on 1300 09 66 16. We'll confirm your booking within the hour and send a reminder the day before.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "For routine services, 1–2 days notice is usually sufficient. For same-day bookings, call us and we'll do our best to fit you in. Emergency roadside callouts are available 24/7 with no advance notice required.",
      },
      {
        q: "Can I reschedule or cancel?",
        a: "Yes. We ask for at least 24 hours notice for rescheduling or cancellation of non-emergency bookings. Same-day cancellations may incur a small callout fee.",
      },
      {
        q: "Do you offer after-hours and weekend appointments?",
        a: "Yes. We operate 7 days a week and can accommodate early morning or evening appointments on request. After-hours and weekend bookings may attract a small surcharge — we'll always advise you upfront.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    colour: "#FFB300",
    faqs: [
      {
        q: "How do you price your services?",
        a: "We provide fixed quotes before starting any work. Our pricing is transparent — labour, parts, and any callout fees are itemised clearly. We never start a job without your approval of the quote.",
      },
      {
        q: "Is there a callout fee?",
        a: "Standard hours (Monday–Friday, 7am–6pm) have no callout fee for routine services. After-hours, weekends, and emergency callouts attract a small callout fee which is always communicated before dispatch.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, credit/debit card (Visa, Mastercard), bank transfer, and most digital payment methods. Payment is due on completion of the job.",
      },
      {
        q: "Do you offer any warranties on your work?",
        a: "Yes. All labour is covered by a 12-month workmanship warranty. Parts are covered by the manufacturer warranty — typically 12 months. If anything goes wrong within the warranty period, we'll fix it at no cost.",
      },
    ],
  },
  {
    title: "Services",
    colour: "#FF8C00",
    faqs: [
      {
        q: "Do you service all makes and models?",
        a: "Yes — from small Japanese hatchbacks to European prestige vehicles, 4WDs, utes, and vans. The only exceptions are some high-performance vehicles requiring specialised workshop lifts, which we'll advise you about upfront.",
      },
      {
        q: "Will a mobile service affect my new car warranty?",
        a: "No. Australian consumer law guarantees your right to have your car serviced by any qualified mechanic. As long as we follow manufacturer specifications and use approved parts — which we always do — your warranty remains fully intact.",
      },
      {
        q: "Do you carry parts with you?",
        a: "We stock the most commonly needed parts on our vans — oil, filters, belts, batteries, brake pads, spark plugs and more for popular vehicles. For specialist items, we can source and deliver most parts within 24 hours.",
      },
      {
        q: "Can you perform a roadworthy certificate inspection?",
        a: "Yes. We carry out SA roadworthy inspections for vehicle sales and registration purposes. The inspection typically takes 1–1.5 hours. If repairs are needed, we re-inspect after completion at no additional charge.",
      },
    ],
  },
  {
    title: "Roadside Assistance",
    colour: "#FFB300",
    faqs: [
      {
        q: "How fast can you reach me in a breakdown?",
        a: "We aim to reach you within 30–60 minutes across the greater Adelaide area. Response times can vary depending on traffic, time of day, and our nearest available mechanic.",
      },
      {
        q: "What roadside issues can you handle?",
        a: "We handle flat tyres, dead batteries (jump start or replacement), engine overheating, no-start diagnosis, fuel delivery, minor breakdowns, emergency diagnostics and more. If we can't fix it on the spot, we'll coordinate a tow and stay with you until it's sorted.",
      },
      {
        q: "Is roadside assistance available 24/7?",
        a: "Yes — 24 hours a day, 7 days a week, 365 days a year including public holidays. Call 1300 09 66 16 any time.",
      },
      {
        q: "Do I need to be a regular customer to call for roadside help?",
        a: "Not at all. Anyone in the Adelaide area can call us for emergency roadside assistance, regardless of whether you've used us before.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-bold text-[#1A1A2E] text-sm sm:text-base leading-snug pr-2">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={20} className="text-[#FFB300]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#1A1A2E]/60 font-medium leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="FAQ"
          title="Frequently Asked"
          titleHighlight="Questions"
          subtitle="Everything you need to know about AutoXpert Group's mobile mechanic services. Can't find your answer? Call us — we're always happy to help."
        />

        <section className="section bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat, i) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === i
                      ? "btn-brand text-[#1A1A2E]"
                      : "bg-[#F8F8F8] text-[#1A1A2E]/60 hover:bg-[#FFB300]/10 hover:text-[#FF8C00]"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* FAQ list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ background: `linear-gradient(to bottom, #FFB300, #FF8C00)` }}
                  />
                  <h2 className="text-lg font-extrabold text-[#1A1A2E]">
                    {categories[activeCategory].title}
                  </h2>
                </div>
                {categories[activeCategory].faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Still have questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-10 rounded-3xl bg-gradient-to-br from-[#FFB300]/15 to-[#FF8C00]/8 p-8 text-center"
            >
              <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-2">
                Still have a question?
              </h3>
              <p className="text-[#1A1A2E]/60 font-medium mb-6">
                Our team is available 24/7. Call us and we'll answer immediately.
              </p>
              <motion.a
                href="tel:1300096616"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg"
              >
                <Phone size={22} />
                Call 1300 09 66 16
              </motion.a>
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
