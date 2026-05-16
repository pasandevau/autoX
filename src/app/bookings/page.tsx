"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  Wrench, Settings, Truck, Car, Shield, ClipboardCheck, AlertTriangle,
  Phone, CheckCircle, Send, Calendar, MapPin, User, Mail,
} from "lucide-react";

const serviceOptions = [
  { value: "car-servicing", label: "General Car Servicing", icon: Wrench },
  { value: "repairs", label: "General Repairs", icon: Settings },
  { value: "fleet", label: "Fleet Services", icon: Truck },
  { value: "suspension", label: "Suspension Repairs", icon: Car },
  { value: "safety-checks", label: "Safety & Roadworthy Check", icon: Shield },
  { value: "pre-purchase", label: "Pre-Purchase Inspection", icon: ClipboardCheck },
  { value: "roadside", label: "24/7 Roadside Assistance", icon: AlertTriangle },
  { value: "other", label: "Other / Not Sure", icon: Wrench },
];

const timeSlots = [
  "7:00 AM – 9:00 AM",
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "1:00 PM – 3:00 PM",
  "3:00 PM – 5:00 PM",
  "5:00 PM – 7:00 PM",
  "Flexible / ASAP",
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  preferredDate: string;
  preferredTime: string;
  suburb: string;
  notes: string;
};

export default function BookingsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    service: "", vehicleMake: "", vehicleModel: "", vehicleYear: "",
    preferredDate: "", preferredTime: "", suburb: "", notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="Book a Service"
          title="Schedule Your"
          titleHighlight="Mobile Mechanic"
          subtitle="Fill in the form below and we'll confirm your booking within the hour. For urgent help, call us directly — we're available 24/7."
          cta={{ label: "Call Now: 1300 09 66 16", href: "tel:1300096616", tel: true }}
        />

        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-5">
                <div className="card p-6">
                  <h3 className="font-extrabold text-[#1A1A2E] mb-4 text-lg">Why Book With Us?</h3>
                  {[
                    "Confirmed within 1 hour",
                    "Same-day service available",
                    "Fixed price — no surprises",
                    "We come to you",
                    "All makes & models",
                    "Licensed & insured",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-2.5 border-b border-black/[0.04] last:border-0">
                      <CheckCircle size={16} className="text-[#FFB300] flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-sm font-semibold text-[#1A1A2E]/70">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-[#1A1A2E] p-6 text-white">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-white/40 mb-2">
                    Urgent? Call Now
                  </div>
                  <a
                    href="tel:1300096616"
                    className="text-2xl font-extrabold brand-gradient-text hover:opacity-80 transition-opacity"
                  >
                    1300 09 66 16
                  </a>
                  <p className="text-sm text-white/50 font-medium mt-2">
                    24/7 including weekends &amp; public holidays
                  </p>
                  <a
                    href="tel:1300096616"
                    className="flex items-center justify-center gap-2 w-full btn-brand text-[#1A1A2E] py-3.5 rounded-xl font-extrabold mt-4"
                  >
                    <Phone size={18} />
                    Call for Immediate Help
                  </a>
                </div>

                <div className="card p-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#FFB300] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-[#1A1A2E] text-sm mb-1">We Come to You</div>
                      <p className="text-xs text-[#1A1A2E]/55 font-medium leading-relaxed">
                        Service at your home, workplace, car park, or wherever your car is across Adelaide and surrounds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card p-12 flex flex-col items-center justify-center text-center gap-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#FFB300]/15 flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#FFB300]" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#1A1A2E]">Booking Received!</h3>
                    <p className="text-[#1A1A2E]/60 font-medium max-w-sm leading-relaxed">
                      We'll review your request and confirm your booking within the hour. Keep an eye on your phone.
                    </p>
                    <p className="text-sm text-[#1A1A2E]/45 font-medium">
                      For urgent assistance, call us directly:
                    </p>
                    <a
                      href="tel:1300096616"
                      className="btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg"
                    >
                      <Phone size={20} className="inline mr-2" />
                      1300 09 66 16
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="card p-8 lg:p-10 flex flex-col gap-7">
                    {/* Your Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                          <User size={14} className="text-[#FF8C00]" />
                        </div>
                        <h3 className="font-extrabold text-[#1A1A2E]">Your Details</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { name: "firstName", label: "First Name", placeholder: "Sarah", type: "text" },
                          { name: "lastName", label: "Last Name", placeholder: "Johnson", type: "text" },
                          { name: "email", label: "Email", placeholder: "sarah@example.com", type: "email" },
                          { name: "phone", label: "Phone Number", placeholder: "04XX XXX XXX", type: "tel" },
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A1A2E]/65">{field.label}</label>
                            <input
                              type={field.type}
                              name={field.name}
                              required
                              value={form[field.name as keyof FormData]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                          <Wrench size={14} className="text-[#FF8C00]" />
                        </div>
                        <h3 className="font-extrabold text-[#1A1A2E]">Service Required</h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {serviceOptions.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              form.service === opt.value
                                ? "border-[#FFB300] bg-[#FFB300]/8"
                                : "border-black/[0.08] hover:border-[#FFB300]/40 bg-[#F8F8F8]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={opt.value}
                              checked={form.service === opt.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <opt.icon
                              size={18}
                              className={form.service === opt.value ? "text-[#FF8C00]" : "text-[#1A1A2E]/40"}
                            />
                            <span className="text-xs font-bold text-[#1A1A2E]/70 leading-tight">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                          <Car size={14} className="text-[#FF8C00]" />
                        </div>
                        <h3 className="font-extrabold text-[#1A1A2E]">Your Vehicle</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { name: "vehicleMake", label: "Make", placeholder: "e.g. Toyota" },
                          { name: "vehicleModel", label: "Model", placeholder: "e.g. Camry" },
                          { name: "vehicleYear", label: "Year", placeholder: "e.g. 2019" },
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A1A2E]/65">{field.label}</label>
                            <input
                              type="text"
                              name={field.name}
                              value={form[field.name as keyof FormData]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                          <Calendar size={14} className="text-[#FF8C00]" />
                        </div>
                        <h3 className="font-extrabold text-[#1A1A2E]">When &amp; Where</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-[#1A1A2E]/65">Preferred Date</label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={form.preferredDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-[#1A1A2E]/65">Preferred Time</label>
                          <select
                            name="preferredTime"
                            value={form.preferredTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all appearance-none"
                          >
                            <option value="">Select time…</option>
                            {timeSlots.map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-[#1A1A2E]/65">Your Suburb</label>
                          <input
                            type="text"
                            name="suburb"
                            required
                            value={form.suburb}
                            onChange={handleChange}
                            placeholder="e.g. Norwood"
                            className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#1A1A2E]/65">Additional Notes</label>
                      <textarea
                        name="notes"
                        rows={4}
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Tell us about your car's issue, any warning lights, symptoms, or anything else useful…"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-lg w-full"
                    >
                      <Send size={20} />
                      Request Booking
                    </motion.button>
                    <p className="text-center text-xs text-[#1A1A2E]/40 font-medium">
                      We'll confirm within the hour. For immediate help call{" "}
                      <a href="tel:1300096616" className="text-[#FF8C00] font-bold">
                        1300 09 66 16
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
