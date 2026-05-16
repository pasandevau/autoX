"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/blog";
import { Clock, ArrowRight } from "lucide-react";
import { categoryIllustrations } from "@/components/BlogIllustrations";

export default function BlogPreview() {
  const featured = posts.slice(0, 3);

  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
              From the Blog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
              Car Care Tips &<br />
              <span className="brand-gradient-text">Expert Advice</span>
            </h2>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-[#1A1A2E]/12 text-[#1A1A2E] px-6 py-3 rounded-2xl font-extrabold text-sm hover:border-[#FFB300]/50 hover:text-[#FF8C00] transition-all whitespace-nowrap"
            >
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="card flex flex-col h-full group overflow-hidden block"
              >
                <div className="h-40 bg-gradient-to-br from-[#FFB300]/15 to-[#FF8C00]/8 flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center px-6"
                  >
                    {(() => { const Illus = categoryIllustrations[post.category]; return Illus ? <Illus /> : null; })()}
                  </motion.div>
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wide"
                      style={{
                        background: post.categoryColor + "22",
                        color: post.categoryColor,
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2.5 text-xs text-[#1A1A2E]/40 font-semibold">
                    <Clock size={10} />
                    {post.readTime}
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-extrabold text-[#1A1A2E] text-base leading-snug mb-2 group-hover:text-[#FF8C00] transition-colors flex-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF8C00] group-hover:gap-3 transition-all mt-3">
                    Read more <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
