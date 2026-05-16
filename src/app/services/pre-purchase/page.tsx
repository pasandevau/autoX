import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "Pre-Purchase Car Inspection Adelaide | AutoXpert Group",
  description:
    "Professional pre-purchase vehicle inspections across Adelaide. Don't buy blind — let our mobile mechanic inspect any used car before you buy. Call 1300 09 66 16.",
  keywords:
    "pre-purchase inspection Adelaide, used car inspection Adelaide, car inspection before buying, vehicle inspection Adelaide, mechanic inspection",
};

export default function PrePurchasePage() {
  return (
    <ServicePageTemplate
      title="Pre-Purchase Inspections"
      subtitle="Don't buy a lemon — know exactly what you're getting before you sign."
      description="A used car can look perfect on the surface but hide thousands of dollars in problems underneath. AutoXpert's thorough pre-purchase inspection reveals the true condition of any vehicle, giving you the knowledge to negotiate, walk away, or buy with total confidence."
      icon="clipboard-check"
      accent="#FF8C00"
      includes={[
        "Engine condition & compression test",
        "Oil & fluid quality check",
        "Chassis & body for accident damage",
        "Rust & corrosion inspection",
        "Brake system assessment",
        "Suspension & steering check",
        "Transmission & gearbox inspection",
        "Electrical systems & warning lights",
        "Tyre condition & matching",
        "ANCAP safety check",
        "Odometer verification",
        "Detailed written report with photos",
      ]}
      benefits={[
        {
          title: "Save Thousands",
          description:
            "A $200 inspection can reveal a $5,000 engine problem. It's the smartest investment you can make when buying a used car.",
        },
        {
          title: "Negotiation Power",
          description:
            "Our report gives you solid grounds to negotiate a lower price or ask the seller to fix issues before purchase.",
        },
        {
          title: "We Go to the Car",
          description:
            "We meet the seller's car wherever it is — at the dealership, private address, or auction yard across Adelaide.",
        },
        {
          title: "Unbiased Assessment",
          description:
            "We have no interest in the sale. Our report is completely independent and honest — 100% on your side.",
        },
      ]}
      faq={[
        {
          q: "How soon can you do an inspection?",
          a: "In most cases, we can be there same day or next day. Don't let a seller pressure you — a good car will still be available after an inspection.",
        },
        {
          q: "What do I get at the end of the inspection?",
          a: "You receive a detailed written report covering every system inspected, with photos, our findings, and a clear recommendation on whether to buy.",
        },
        {
          q: "Does the seller need to be present?",
          a: "Yes, the seller (or a representative) must be present to provide access to the vehicle. The inspection takes around 60–90 minutes.",
        },
        {
          q: "Can you inspect motorcycles or caravans too?",
          a: "We specialise in passenger cars, SUVs, and light commercial vehicles. Contact us for specialist vehicle enquiries.",
        },
      ]}
    />
  );
}
