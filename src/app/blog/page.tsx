"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { posts } from "@/data/blog";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Maintenance", "Safety", "Industry", "Breakdowns", "Buying Tips", "DIY Tips"];

const categoryGradients: Record<string, string> = {
  Maintenance: "from-[#FFB300]/20 to-[#FF8C00]/10",
  Safety: "from-[#FF8C00]/20 to-[#FFB300]/10",
  Industry: "from-[#FFB300]/15 to-[#1A1A2E]/5",
  Breakdowns: "from-[#FF8C00]/15 to-[#FFB300]/8",
  "Buying Tips": "from-[#FFB300]/20 to-[#FF8C00]/10",
  "DIY Tips": "from-[#FF8C00]/20 to-[#FFB300]/10",
};

const categoryIcons: Record<string, string> = {
  Maintenance: "🔧",
  Safety: "🛡️",
  Industry: "🚗",
  Breakdowns: "⚡",
  "Buying Tips": "🔍",
  "DIY Tips": "💡",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="AutoXpert Blog"
          title="Car Care Tips &"
          titleHighlight="Expert Advice"
          subtitle="Practical advice from Adelaide's mobile mechanic team — helping you understand your car, avoid breakdowns, and make smarter decisions."
        />

        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? "btn-brand text-[#1A1A2E]"
                      : "bg-[#F8F8F8] text-[#1A1A2E]/60 hover:bg-[#FFB300]/10 hover:text-[#FF8C00]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                >
                  <Link href={`/blog/${post.slug}`} className="card flex flex-col h-full group overflow-hidden block">
                    {/* Card image area */}
                    <div
                      className={`h-48 bg-gradient-to-br ${categoryGradients[post.category] || "from-[#FFB300]/15 to-[#FF8C00]/8"} flex items-center justify-center relative overflow-hidden`}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
                        className="text-6xl"
                      >
                        {categoryIcons[post.category] || "🚗"}
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-xs font-extrabold px-3 py-1 rounded-full"
                          style={{
                            background: post.categoryColor + "22",
                            color: post.categoryColor,
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3 text-xs text-[#1A1A2E]/40 font-semibold">
                        <span>{post.date}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="font-extrabold text-[#1A1A2E] text-lg leading-snug mb-3 group-hover:text-[#FF8C00] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#1A1A2E]/55 font-medium leading-relaxed flex-1 mb-5">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#FF8C00] group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter-style CTA */}
        <section className="section bg-[#F8F8F8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                Stay Informed
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
                Need Help Right Now?
              </h2>
              <p className="text-lg text-[#1A1A2E]/55 font-medium mb-8">
                Reading is great, but sometimes you just need a mechanic. Call us 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:1300096616"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg"
                >
                  Call 1300 09 66 16
                </motion.a>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/bookings"
                    className="inline-flex items-center justify-center gap-3 border-2 border-[#1A1A2E]/15 text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg hover:border-[#FFB300]/50 transition-colors"
                  >
                    Book a Service
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
