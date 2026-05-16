"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Norwood, Adelaide",
    rating: 5,
    text: "Had a flat tyre on the freeway at 11pm. AutoXpert was there in under 20 minutes. The mechanic was so calm and reassuring — absolute lifesavers! Highly, highly recommend.",
    service: "Roadside Assistance",
  },
  {
    name: "James T.",
    location: "Prospect, Adelaide",
    rating: 5,
    text: "Fixed my car right in my driveway — no towing, no hassle. The mechanic explained everything clearly, was super friendly, and the price was exactly what they quoted. Brilliant service.",
    service: "General Repairs",
  },
  {
    name: "Michael K.",
    location: "Marion, Adelaide",
    rating: 5,
    text: "Used them for a pre-purchase inspection on a used car I was looking at. They found a serious issue that could've cost me thousands. Saved me from a nightmare purchase. Worth every cent.",
    service: "Pre-Purchase Inspection",
  },
  {
    name: "Priya S.",
    location: "Port Adelaide, Adelaide",
    rating: 5,
    text: "Car wouldn't start on a Monday morning. Called AutoXpert, they came within the hour and sorted my battery on the spot. I still made it to my meeting. Incredible service.",
    service: "Battery Replacement",
  },
  {
    name: "Tom R.",
    location: "Tea Tree Gully, Adelaide",
    rating: 5,
    text: "Our entire business fleet is serviced by AutoXpert. They're reliable, professional and always on time. Makes running our logistics business so much easier.",
    service: "Fleet Services",
  },
  {
    name: "Lucy W.",
    location: "Glenelg, Adelaide",
    rating: 5,
    text: "Needed a roadworthy check urgently and they came the same afternoon. So convenient. Will never go back to a traditional mechanic after this experience!",
    service: "Roadworthy Check",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={14} className="text-[#FFB300] fill-[#FFB300]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="section bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            Customer Reviews
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
            Hundreds of Happy
            <br />
            <span className="brand-gradient-text">Adelaide Drivers</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-xl mx-auto">
            Don't just take our word for it — here's what real customers say.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="card p-7 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-[0.07]">
                <Quote size={48} className="text-[#FFB300]" />
              </div>

              <StarRow count={review.rating} />

              <p className="text-sm text-[#1A1A2E]/70 leading-relaxed font-medium flex-1">
                "{review.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
                <div>
                  <div className="font-extrabold text-[#1A1A2E] text-sm">{review.name}</div>
                  <div className="text-xs text-[#1A1A2E]/45 font-medium mt-0.5">{review.location}</div>
                </div>
                <div className="text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#FFB300]/12 text-[#FF8C00]">
                  {review.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4 bg-white border border-black/[0.07] px-6 py-4 rounded-2xl shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#1A1A2E]">5.0</span>
              <StarRow count={5} />
            </div>
            <div className="w-px h-10 bg-black/10" />
            <div className="text-sm text-[#1A1A2E]/60 font-medium">
              Rated <strong className="text-[#1A1A2E]">5 stars</strong> on Google<br />
              by 500+ Adelaide drivers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
