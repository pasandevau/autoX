"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { posts, getPost } from "@/data/blog";
import { Clock, ArrowLeft, ArrowRight, Phone, CheckCircle } from "lucide-react";

const categoryIcons: Record<string, string> = {
  Maintenance: "🔧",
  Safety: "🛡️",
  Industry: "🚗",
  Breakdowns: "⚡",
  "Buying Tips": "🔍",
  "DIY Tips": "💡",
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const post = getPost(slug);

  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden brand-gradient">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-24 right-16 text-[120px] opacity-10 pointer-events-none select-none"
          >
            {categoryIcons[post.category] || "🚗"}
          </motion.div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#1A1A2E]/55 hover:text-[#1A1A2E] font-semibold text-sm mb-8 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs font-extrabold px-3 py-1.5 rounded-full"
                  style={{
                    background: post.categoryColor + "22",
                    color: post.categoryColor,
                  }}
                >
                  {post.category}
                </span>
                <span className="text-xs text-[#1A1A2E]/45 font-semibold">{post.date}</span>
                <span className="flex items-center gap-1 text-xs text-[#1A1A2E]/45 font-semibold">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] leading-[1.1] mb-5">
                {post.title}
              </h1>
              <p className="text-lg text-[#1A1A2E]/65 font-semibold leading-relaxed">
                {post.excerpt}
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14 fill-white">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </section>

        {/* Article content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Article body */}
              <article className="lg:col-span-2">
                {post.sections.map((section, i) => (
                  <motion.div
                    key={section.heading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                    className="mb-10"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-[#FF8C00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-[#FF8C00]" />
                      </div>
                      <h2 className="text-xl font-extrabold text-[#1A1A2E] leading-snug">{section.heading}</h2>
                    </div>
                    <p className="text-[#1A1A2E]/65 font-medium leading-relaxed pl-12">
                      {section.body}
                    </p>
                  </motion.div>
                ))}

                {/* Author card */}
                <div className="mt-12 p-6 rounded-2xl bg-[#F8F8F8] border border-black/[0.05] flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFB300] to-[#FF8C00] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
                    AX
                  </div>
                  <div>
                    <div className="font-extrabold text-[#1A1A2E]">AutoXpert Group Team</div>
                    <div className="text-sm text-[#1A1A2E]/50 font-medium mt-0.5">
                      Adelaide's mobile mechanic team — licensed, insured, and always honest.
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Emergency CTA */}
                <div className="rounded-2xl bg-[#1A1A2E] p-6 text-white sticky top-28">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-white/40 mb-2">
                    Need Help Now?
                  </div>
                  <a
                    href="tel:1300096616"
                    className="text-2xl font-extrabold brand-gradient-text hover:opacity-80 transition-opacity"
                  >
                    1300 09 66 16
                  </a>
                  <p className="text-sm text-white/50 font-medium mt-2 mb-4">
                    Available 24/7 — we come to you.
                  </p>
                  <a
                    href="tel:1300096616"
                    className="flex items-center justify-center gap-2 w-full btn-brand text-[#1A1A2E] py-3.5 rounded-xl font-extrabold"
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <Link
                    href="/bookings"
                    className="flex items-center justify-center w-full text-white/60 text-sm font-bold py-3 hover:text-white transition-colors"
                  >
                    Or book online →
                  </Link>
                </div>

                {/* Related articles */}
                <div>
                  <h3 className="font-extrabold text-[#1A1A2E] mb-4">More Articles</h3>
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="flex gap-3 p-3 rounded-xl hover:bg-[#F8F8F8] transition-colors group mb-2"
                    >
                      <div className="text-2xl flex-shrink-0">{categoryIcons[p.category] || "🚗"}</div>
                      <div>
                        <div className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#FF8C00] transition-colors leading-snug">
                          {p.title}
                        </div>
                        <div className="text-xs text-[#1A1A2E]/40 font-semibold mt-1">{p.readTime}</div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-sm font-bold text-[#FF8C00] hover:text-[#FFB300] transition-colors mt-3"
                  >
                    View all articles <ArrowRight size={14} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
