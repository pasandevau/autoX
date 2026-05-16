import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "General Car Servicing Adelaide | AutoXpert Group — Mobile Mechanic Near Me",
  description:
    "Expert log book servicing, oil changes, filter replacements & full car servicing across Adelaide. Mobile mechanic comes to you. Call AutoXpert on 1300 09 66 16.",
  keywords:
    "car service near me, log book service Adelaide, mobile car service, mechanic near me, oil change Adelaide",
};

export default function CarServicingPage() {
  return (
    <ServicePageTemplate
      title="General Car Servicing"
      subtitle="Log book servicing and complete car maintenance — delivered to your door."
      description="Keep your car running perfectly with AutoXpert's professional car servicing. We perform manufacturer-recommended servicing right at your location — saving you time, hassle, and the headache of booking into a traditional workshop."
      icon="wrench"
      accent="#FFB300"
      includes={[
        "Engine oil & filter change",
        "Air filter inspection & replacement",
        "Brake fluid check & top-up",
        "Coolant level check",
        "Tyre pressure & condition check",
        "Battery health test",
        "Lights & wiper inspection",
        "Spark plug check",
        "Belts & hoses inspection",
        "Log book stamp & service record",
        "35-point safety check",
        "Digital inspection report",
      ]}
      benefits={[
        {
          title: "We Come to You",
          description:
            "Your car gets serviced at home, work, or anywhere convenient — no drop-offs, no waiting rooms.",
        },
        {
          title: "Log Book Compliant",
          description:
            "Our servicing is performed to manufacturer specifications and your warranty stays fully intact.",
        },
        {
          title: "Transparent Quoting",
          description:
            "You'll know exactly what needs doing and what it costs before we start. No surprises, ever.",
        },
        {
          title: "All Makes & Models",
          description:
            "From Toyotas to Teslas, European prestige to Japanese workhorses — we service them all.",
        },
      ]}
      faq={[
        {
          q: "Will a mobile service affect my new car warranty?",
          a: "No. As long as we use manufacturer-approved parts and fluids and stamp your log book, your warranty remains valid. We do this as standard practice.",
        },
        {
          q: "How long does a car service take?",
          a: "A standard service typically takes 1–2 hours depending on your vehicle and any additional work required. We'll give you an accurate estimate beforehand.",
        },
        {
          q: "What if my car needs parts I don't have?",
          a: "We carry the most common parts on our vans. For specialist items, we'll source them quickly and book a follow-up — usually same or next day.",
        },
        {
          q: "Do you service all areas of Adelaide?",
          a: "We cover Adelaide CBD and all surrounding suburbs — from Glenelg to Tea Tree Gully and Salisbury to Marion. Call us to confirm availability in your area.",
        },
      ]}
    />
  );
}
