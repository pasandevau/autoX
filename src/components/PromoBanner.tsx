"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Tag, X, ArrowRight } from "lucide-react";

interface Promo {
  id: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
  badge: string;
  active: boolean;
  expires_at: string | null;
}

export default function PromoBanner() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/promotions")
      .then((r) => r.json())
      .then(({ promotions }) => setPromos(promotions ?? []));
  }, []);

  const visible = promos.filter((p) => !dismissed.includes(p.id));
  if (visible.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-[#1A1A2E] to-[#2a1a3e] py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          {visible.map((promo) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFB300]/20 flex items-center justify-center flex-shrink-0">
                  <Tag size={16} className="text-[#FFB300]" />
                </div>
                <div className="min-w-0">
                  {promo.badge && (
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#FFB300] mr-2">
                      {promo.badge}
                    </span>
                  )}
                  <span className="font-extrabold text-white text-sm">{promo.title}</span>
                  {promo.description && (
                    <span className="text-white/55 text-sm font-medium ml-2 hidden sm:inline">
                      — {promo.description}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {promo.cta_text && promo.cta_link && (
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={promo.cta_link}
                      className="inline-flex items-center gap-1.5 btn-brand text-[#1A1A2E] px-4 py-2 rounded-xl font-extrabold text-xs"
                    >
                      {promo.cta_text}
                      <ArrowRight size={12} />
                    </Link>
                  </motion.div>
                )}
                <button
                  onClick={() => setDismissed((d) => [...d, promo.id])}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={13} className="text-white/60" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
