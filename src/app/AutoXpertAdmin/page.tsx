"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Tag, Link2, Calendar, Phone, Mail,
  MapPin, Clock, Plus, Trash2, Check, ExternalLink,
  TrendingUp, ChevronRight, Globe, Share2, Loader2, BarChart2,
  MousePointer, Eye, Timer, Smartphone, Monitor, Tablet,
} from "lucide-react";

type Tab = "overview" | "customers" | "promotions" | "social" | "analytics";

interface Booking {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string; service: string; preferred_date: string;
  preferred_time: string; suburb: string; vehicle_make: string;
  vehicle_model: string; vehicle_year: string; notes: string; status: string;
}

interface Lead {
  id: string; created_at: string; type: string; name: string;
  phone: string; email: string; service: string; suburb: string;
  message: string; status: string;
}

interface Promo {
  id: string; created_at: string; title: string; description: string;
  cta_text: string; cta_link: string; badge: string; active: boolean;
  expires_at: string | null;
}

interface AnalyticsData {
  overview: { activeUsers: number; sessions: number; pageViews: number; engagementRate: number; avgSessionDuration: number; bounceRate: number };
  dailyUsers: { date: string; users: number; sessions: number }[];
  topPages: { path: string; title: string; views: number; users: number }[];
  devices: { device: string; users: number }[];
  sources: { channel: string; sessions: number; users: number }[];
}

const socialLinks = [
  { label: "Facebook", icon: Globe, href: "https://facebook.com/autoxpertgroup", color: "#1877F2" },
  { label: "Instagram", icon: Share2, href: "https://instagram.com/autoxpertgroup", color: "#E1306C" },
  { label: "Website", icon: ExternalLink, href: "https://autoxpertgroup.org", color: "#FFB300" },
  { label: "Google Business", icon: MapPin, href: "https://maps.google.com", color: "#34A853" },
  { label: "Bookings", icon: Calendar, href: "https://autoxpertgroup.org/bookings", color: "#FF8C00" },
  { label: "Phone", icon: Phone, href: "tel:1300096616", color: "#FFB300" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    new: "bg-blue-100 text-blue-700",
    manual: "bg-purple-100 text-purple-700",
    callback: "bg-orange-100 text-orange-700",
    inquiry: "bg-sky-100 text-sky-700",
  };
  return (
    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide ${map[s] ?? "bg-gray-100 text-gray-600"}`}>
      {s}
    </span>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const [loading, setLoading] = useState(true);

  // Add customer form
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", email: "", service: "", suburb: "", message: "" });
  const [customerSaving, setCustomerSaving] = useState(false);

  // Add promo form
  const [addingPromo, setAddingPromo] = useState(false);
  const [promoForm, setPromoForm] = useState({ title: "", description: "", badge: "", cta_text: "", cta_link: "", active: true, expires_at: "" });
  const [promoSaving, setPromoSaving] = useState(false);

  async function loadData() {
    setLoading(true);
    const [b, l, p] = await Promise.all([
      fetch("/api/admin/bookings").then((r) => r.json()),
      fetch("/api/admin/leads").then((r) => r.json()),
      fetch("/api/admin/promotions").then((r) => r.json()),
    ]);
    setBookings(b.bookings ?? []);
    setLeads(l.leads ?? []);
    setPromos(p.promotions ?? []);
    setLoading(false);
  }

  async function loadAnalytics() {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (data.error) { setAnalyticsError(data.error); }
      else { setAnalytics(data); }
    } catch { setAnalyticsError("Failed to load analytics."); }
    setAnalyticsLoading(false);
  }

  useEffect(() => { loadData(); }, []);
  useEffect(() => { if (tab === "analytics" && !analytics) loadAnalytics(); }, [tab]);

  async function addCustomer() {
    if (!customerForm.name || !customerForm.phone) return;
    setCustomerSaving(true);
    await fetch("/api/admin/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...customerForm, type: "manual" }) });
    setCustomerSaving(false);
    setAddingCustomer(false);
    setCustomerForm({ name: "", phone: "", email: "", service: "", suburb: "", message: "" });
    loadData();
  }

  async function addPromo() {
    if (!promoForm.title) return;
    setPromoSaving(true);
    await fetch("/api/admin/promotions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...promoForm, expires_at: promoForm.expires_at || null }) });
    setPromoSaving(false);
    setAddingPromo(false);
    setPromoForm({ title: "", description: "", badge: "", cta_text: "", cta_link: "", active: true, expires_at: "" });
    loadData();
  }

  async function togglePromo(promo: Promo) {
    await fetch("/api/admin/promotions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: promo.id, active: !promo.active }) });
    loadData();
  }

  async function deletePromo(id: string) {
    await fetch(`/api/admin/promotions?id=${id}`, { method: "DELETE" });
    loadData();
  }

  const allCustomers = [
    ...bookings.map((b) => ({ id: b.id, name: `${b.first_name} ${b.last_name}`.trim(), phone: b.phone, email: b.email, service: b.service, suburb: b.suburb, type: "booking", date: b.created_at, status: b.status })),
    ...leads.map((l) => ({ id: l.id, name: l.name, phone: l.phone, email: l.email, service: l.service, suburb: l.suburb, type: l.type, date: l.created_at, status: l.status })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "customers", label: "Customers", icon: Users },
    { id: "promotions", label: "Promotions", icon: Tag },
    { id: "social", label: "Quick Links", icon: Link2 },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] flex flex-col fixed top-0 left-0 bottom-0 z-10">
        <div className="px-6 py-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src="/logo.png" alt="AutoXpert" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-white text-sm">AutoXpert</div>
              <div className="text-[10px] font-bold text-[#FFB300] tracking-widest uppercase">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                tab === item.id
                  ? "bg-[#FFB300]/20 text-[#FFB300]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
              }`}
            >
              <item.icon size={16} />
              {item.label}
              {tab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/[0.07]">
          <a href="https://autoxpertgroup.org" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-white/35 text-xs font-semibold hover:text-white/60 transition-colors">
            <ExternalLink size={12} />
            View Live Site
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 size={28} className="animate-spin text-[#FFB300]" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              {/* OVERVIEW */}
              {tab === "overview" && (
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Dashboard Overview</h1>
                  <p className="text-[#1A1A2E]/45 font-medium text-sm mb-8">Welcome back — here&apos;s your business at a glance.</p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {[
                      { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "#FFB300", sub: "All time" },
                      { label: "Total Leads", value: leads.length, icon: Users, color: "#FF8C00", sub: "Inquiries & callbacks" },
                      { label: "Active Promos", value: promos.filter(p => p.active).length, icon: Tag, color: "#FFB300", sub: "Live on site" },
                      { label: "Total Customers", value: allCustomers.length, icon: TrendingUp, color: "#FF8C00", sub: "Combined database" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-5 border border-black/[0.05]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                            <stat.icon size={18} style={{ color: stat.color }} />
                          </div>
                        </div>
                        <div className="text-3xl font-black text-[#1A1A2E] mb-0.5">{stat.value}</div>
                        <div className="text-sm font-bold text-[#1A1A2E]/70">{stat.label}</div>
                        <div className="text-xs text-[#1A1A2E]/35 font-medium mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent bookings */}
                  <div className="bg-white rounded-2xl border border-black/[0.05] overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.05]">
                      <h2 className="font-extrabold text-[#1A1A2E]">Recent Bookings</h2>
                      <button onClick={() => setTab("customers")} className="text-xs font-bold text-[#FF8C00] hover:underline">View all</button>
                    </div>
                    <div className="divide-y divide-black/[0.04]">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.id} className="px-6 py-4 flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF8C00] font-extrabold text-sm">{b.first_name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#1A1A2E] text-sm">{b.first_name} {b.last_name}</div>
                            <div className="text-xs text-[#1A1A2E]/45 font-medium truncate">{b.service} — {b.suburb}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <StatusBadge s={b.status} />
                            <div className="text-[10px] text-[#1A1A2E]/35 font-medium mt-1">{formatDate(b.created_at)}</div>
                          </div>
                        </div>
                      ))}
                      {bookings.length === 0 && (
                        <div className="px-6 py-10 text-center text-[#1A1A2E]/35 text-sm font-medium">No bookings yet</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}
              {tab === "analytics" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Analytics</h1>
                      <p className="text-[#1A1A2E]/45 font-medium text-sm">Last 28 days — powered by Google Analytics</p>
                    </div>
                    <button onClick={loadAnalytics} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 text-sm font-bold text-[#1A1A2E]/60 hover:bg-[#F8F8F8]">
                      Refresh
                    </button>
                  </div>

                  {analyticsLoading && (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 size={28} className="animate-spin text-[#FFB300]" />
                    </div>
                  )}

                  {analyticsError && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                      <p className="text-red-600 font-bold mb-2">Could not load analytics</p>
                      <p className="text-red-500 text-sm mb-4">{analyticsError}</p>
                      <p className="text-[#1A1A2E]/50 text-xs">You may need to re-authorise at <a href="/api/auth/google" className="text-[#FF8C00] font-bold underline">/api/auth/google</a> with the new analytics scope, then update the refresh token in Netlify.</p>
                    </div>
                  )}

                  {analytics && !analyticsLoading && (() => {
                    const { overview, dailyUsers, topPages, devices, sources } = analytics;
                    const maxUsers = Math.max(...dailyUsers.map(d => d.users), 1);
                    const maxViews = Math.max(...topPages.map(p => p.views), 1);
                    const totalDeviceUsers = devices.reduce((s, d) => s + d.users, 0) || 1;
                    const totalSourceSessions = sources.reduce((s, d) => s + d.sessions, 0) || 1;
                    const deviceIcon = (d: string) => d === "mobile" ? Smartphone : d === "tablet" ? Tablet : Monitor;
                    const fmt = (n: number) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : n.toString();
                    const fmtDuration = (s: number) => `${Math.floor(s/60)}m ${Math.round(s%60)}s`;
                    const fmtDate = (d: string) => `${d.slice(4,6)}/${d.slice(6,8)}`;

                    return (
                      <div className="space-y-6">
                        {/* Overview stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { label: "Active Users", value: fmt(overview.activeUsers), icon: Users, color: "#FFB300", sub: "28 days" },
                            { label: "Sessions", value: fmt(overview.sessions), icon: MousePointer, color: "#FF8C00", sub: "28 days" },
                            { label: "Page Views", value: fmt(overview.pageViews), icon: Eye, color: "#FFB300", sub: "28 days" },
                            { label: "Engagement Rate", value: `${(overview.engagementRate * 100).toFixed(1)}%`, icon: TrendingUp, color: "#FF8C00", sub: "Engaged sessions" },
                            { label: "Avg. Session", value: fmtDuration(overview.avgSessionDuration), icon: Timer, color: "#FFB300", sub: "Duration" },
                            { label: "Bounce Rate", value: `${(overview.bounceRate * 100).toFixed(1)}%`, icon: BarChart2, color: "#FF8C00", sub: "Single-page sessions" },
                          ].map((s) => (
                            <div key={s.label} className="bg-white rounded-2xl p-5 border border-black/[0.05]">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}18` }}>
                                <s.icon size={16} style={{ color: s.color }} />
                              </div>
                              <div className="text-2xl font-black text-[#1A1A2E] mb-0.5">{s.value}</div>
                              <div className="text-sm font-bold text-[#1A1A2E]/70">{s.label}</div>
                              <div className="text-xs text-[#1A1A2E]/35 font-medium">{s.sub}</div>
                            </div>
                          ))}
                        </div>

                        {/* Daily users chart */}
                        <div className="bg-white rounded-2xl border border-black/[0.05] p-6">
                          <h2 className="font-extrabold text-[#1A1A2E] mb-1">Visitors — Last 30 Days</h2>
                          <p className="text-xs text-[#1A1A2E]/40 font-medium mb-5">Daily active users</p>
                          <div className="flex items-end gap-1 h-40">
                            {dailyUsers.map((d, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                                <div className="absolute bottom-full mb-1 bg-[#1A1A2E] text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {fmtDate(d.date)}: {d.users} users
                                </div>
                                <div
                                  className="w-full rounded-t-sm transition-all"
                                  style={{
                                    height: `${Math.max((d.users / maxUsers) * 100, 2)}%`,
                                    background: `linear-gradient(to top, #FFB300, #FF8C00)`,
                                    opacity: 0.7 + (d.users / maxUsers) * 0.3,
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2 text-[10px] text-[#1A1A2E]/30 font-medium">
                            <span>{dailyUsers[0] ? fmtDate(dailyUsers[0].date) : ""}</span>
                            <span>{dailyUsers[Math.floor(dailyUsers.length/2)] ? fmtDate(dailyUsers[Math.floor(dailyUsers.length/2)].date) : ""}</span>
                            <span>{dailyUsers[dailyUsers.length-1] ? fmtDate(dailyUsers[dailyUsers.length-1].date) : ""}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Top pages */}
                          <div className="bg-white rounded-2xl border border-black/[0.05] p-6">
                            <h2 className="font-extrabold text-[#1A1A2E] mb-1">Top Pages</h2>
                            <p className="text-xs text-[#1A1A2E]/40 font-medium mb-4">Most viewed pages — 28 days</p>
                            <div className="space-y-3">
                              {topPages.slice(0, 8).map((p, i) => (
                                <div key={i}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#1A1A2E] truncate max-w-[65%]">{p.path === "/" ? "Home" : p.path}</span>
                                    <span className="text-xs font-extrabold text-[#FF8C00]">{fmt(p.views)}</span>
                                  </div>
                                  <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${(p.views / maxViews) * 100}%`, background: "linear-gradient(90deg,#FFB300,#FF8C00)" }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Devices + Sources */}
                          <div className="space-y-6">
                            {/* Device breakdown */}
                            <div className="bg-white rounded-2xl border border-black/[0.05] p-6">
                              <h2 className="font-extrabold text-[#1A1A2E] mb-4">Devices</h2>
                              <div className="space-y-3">
                                {devices.map((d) => {
                                  const Icon = deviceIcon(d.device);
                                  const pct = Math.round((d.users / totalDeviceUsers) * 100);
                                  return (
                                    <div key={d.device} className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-xl bg-[#FFB300]/10 flex items-center justify-center flex-shrink-0">
                                        <Icon size={14} className="text-[#FF8C00]" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                          <span className="text-xs font-bold text-[#1A1A2E] capitalize">{d.device}</span>
                                          <span className="text-xs font-extrabold text-[#FF8C00]">{pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FFB300,#FF8C00)" }} />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Traffic sources */}
                            <div className="bg-white rounded-2xl border border-black/[0.05] p-6">
                              <h2 className="font-extrabold text-[#1A1A2E] mb-4">Traffic Sources</h2>
                              <div className="space-y-2.5">
                                {sources.map((s) => {
                                  const pct = Math.round((s.sessions / totalSourceSessions) * 100);
                                  return (
                                    <div key={s.channel} className="flex items-center gap-3">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                          <span className="text-xs font-bold text-[#1A1A2E] truncate">{s.channel || "Direct"}</span>
                                          <span className="text-xs font-extrabold text-[#FF8C00] flex-shrink-0 ml-2">{pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FFB300,#FF8C00)" }} />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* CUSTOMERS */}
              {tab === "customers" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Customer Database</h1>
                      <p className="text-[#1A1A2E]/45 font-medium text-sm">{allCustomers.length} total records</p>
                    </div>
                    <button
                      onClick={() => setAddingCustomer(true)}
                      className="flex items-center gap-2 btn-brand text-[#1A1A2E] px-5 py-2.5 rounded-xl font-extrabold text-sm"
                    >
                      <Plus size={15} />
                      Add Customer
                    </button>
                  </div>

                  {/* Add customer modal */}
                  <AnimatePresence>
                    {addingCustomer && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-white rounded-2xl border border-black/[0.07] p-6 mb-6"
                      >
                        <h3 className="font-extrabold text-[#1A1A2E] mb-4">Add Customer Manually</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {[
                            { key: "name", label: "Full Name *", placeholder: "Jane Smith" },
                            { key: "phone", label: "Phone *", placeholder: "04XX XXX XXX" },
                            { key: "email", label: "Email", placeholder: "jane@example.com" },
                            { key: "service", label: "Service", placeholder: "e.g. Car Servicing" },
                            { key: "suburb", label: "Suburb", placeholder: "e.g. Norwood" },
                          ].map((f) => (
                            <div key={f.key}>
                              <label className="text-xs font-bold text-[#1A1A2E]/60 block mb-1">{f.label}</label>
                              <input
                                type="text"
                                value={customerForm[f.key as keyof typeof customerForm] as string}
                                onChange={(e) => setCustomerForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                                placeholder={f.placeholder}
                                className="w-full px-3 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-sm font-medium text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40"
                              />
                            </div>
                          ))}
                          <div>
                            <label className="text-xs font-bold text-[#1A1A2E]/60 block mb-1">Notes</label>
                            <textarea
                              value={customerForm.message}
                              onChange={(e) => setCustomerForm((prev) => ({ ...prev, message: e.target.value }))}
                              rows={2}
                              placeholder="Any notes..."
                              className="w-full px-3 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-sm font-medium text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={addCustomer}
                            disabled={customerSaving}
                            className="flex items-center gap-2 btn-brand text-[#1A1A2E] px-5 py-2.5 rounded-xl font-extrabold text-sm disabled:opacity-60"
                          >
                            {customerSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            Save Customer
                          </button>
                          <button onClick={() => setAddingCustomer(false)} className="px-5 py-2.5 rounded-xl border border-black/10 text-sm font-bold text-[#1A1A2E]/60 hover:bg-[#F8F8F8]">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-white rounded-2xl border border-black/[0.05] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-black/[0.05]">
                            {["Name", "Phone", "Email", "Service", "Suburb", "Type", "Date"].map((h) => (
                              <th key={h} className="text-left px-5 py-3.5 text-[10px] font-extrabold text-[#1A1A2E]/40 uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.04]">
                          {allCustomers.map((c) => (
                            <tr key={`${c.type}-${c.id}`} className="hover:bg-[#F8F8F8] transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                                    <span className="text-[#FF8C00] font-extrabold text-xs">{c.name[0]}</span>
                                  </div>
                                  <span className="font-bold text-[#1A1A2E] text-sm">{c.name}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-sm text-[#1A1A2E]/70 font-medium">{c.phone}</td>
                              <td className="px-5 py-3.5 text-sm text-[#1A1A2E]/70 font-medium">{c.email || "—"}</td>
                              <td className="px-5 py-3.5 text-sm text-[#1A1A2E]/70 font-medium">{c.service || "—"}</td>
                              <td className="px-5 py-3.5 text-sm text-[#1A1A2E]/70 font-medium">{c.suburb || "—"}</td>
                              <td className="px-5 py-3.5"><StatusBadge s={c.type} /></td>
                              <td className="px-5 py-3.5 text-xs text-[#1A1A2E]/40 font-medium">{formatDate(c.date)}</td>
                            </tr>
                          ))}
                          {allCustomers.length === 0 && (
                            <tr>
                              <td colSpan={7} className="px-5 py-12 text-center text-[#1A1A2E]/35 text-sm font-medium">
                                No customers yet — they&apos;ll appear here when forms are submitted
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PROMOTIONS */}
              {tab === "promotions" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Promotions</h1>
                      <p className="text-[#1A1A2E]/45 font-medium text-sm">Active promos appear as a banner on the homepage</p>
                    </div>
                    <button
                      onClick={() => setAddingPromo(true)}
                      className="flex items-center gap-2 btn-brand text-[#1A1A2E] px-5 py-2.5 rounded-xl font-extrabold text-sm"
                    >
                      <Plus size={15} />
                      New Promotion
                    </button>
                  </div>

                  <AnimatePresence>
                    {addingPromo && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-white rounded-2xl border border-black/[0.07] p-6 mb-6"
                      >
                        <h3 className="font-extrabold text-[#1A1A2E] mb-4">Create Promotion</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {[
                            { key: "title", label: "Title *", placeholder: "e.g. 10% Off Car Servicing" },
                            { key: "badge", label: "Badge Label", placeholder: "e.g. LIMITED TIME" },
                            { key: "description", label: "Description", placeholder: "Short details about the offer" },
                            { key: "cta_text", label: "Button Text", placeholder: "e.g. Book Now" },
                            { key: "cta_link", label: "Button Link", placeholder: "/bookings" },
                            { key: "expires_at", label: "Expires (optional)", placeholder: "2026-12-31" },
                          ].map((f) => (
                            <div key={f.key}>
                              <label className="text-xs font-bold text-[#1A1A2E]/60 block mb-1">{f.label}</label>
                              <input
                                type="text"
                                value={promoForm[f.key as keyof typeof promoForm] as string}
                                onChange={(e) => setPromoForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                                placeholder={f.placeholder}
                                className="w-full px-3 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-sm font-medium text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={promoForm.active} onChange={(e) => setPromoForm((p) => ({ ...p, active: e.target.checked }))} className="w-4 h-4 accent-[#FFB300]" />
                            <span className="text-sm font-bold text-[#1A1A2E]/70">Active (visible on site)</span>
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={addPromo} disabled={promoSaving}
                            className="flex items-center gap-2 btn-brand text-[#1A1A2E] px-5 py-2.5 rounded-xl font-extrabold text-sm disabled:opacity-60">
                            {promoSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            Publish
                          </button>
                          <button onClick={() => setAddingPromo(false)} className="px-5 py-2.5 rounded-xl border border-black/10 text-sm font-bold text-[#1A1A2E]/60 hover:bg-[#F8F8F8]">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 gap-4">
                    {promos.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl border border-black/[0.05] p-5 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 mb-1">
                            {p.badge && <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#FFB300] bg-[#FFB300]/10 px-2 py-0.5 rounded-full">{p.badge}</span>}
                            <span className="font-extrabold text-[#1A1A2E]">{p.title}</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {p.active ? "LIVE" : "PAUSED"}
                            </span>
                          </div>
                          {p.description && <p className="text-sm text-[#1A1A2E]/55 font-medium mb-2">{p.description}</p>}
                          {p.cta_text && <div className="text-xs text-[#1A1A2E]/40 font-medium">Button: &quot;{p.cta_text}&quot; → {p.cta_link}</div>}
                          {p.expires_at && <div className="text-xs text-[#1A1A2E]/35 font-medium mt-1">Expires: {formatDate(p.expires_at)}</div>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => togglePromo(p)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${p.active ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                            {p.active ? "Pause" : "Activate"}
                          </button>
                          <button onClick={() => deletePromo(p.id)}
                            className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                            <Trash2 size={13} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {promos.length === 0 && (
                      <div className="bg-white rounded-2xl border border-black/[0.05] p-12 text-center text-[#1A1A2E]/35 text-sm font-medium">
                        No promotions yet — create one and it will appear on the homepage
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SOCIAL / QUICK LINKS */}
              {tab === "social" && (
                <div>
                  <h1 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Quick Links</h1>
                  <p className="text-[#1A1A2E]/45 font-medium text-sm mb-8">Fast access to your platforms and business tools</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white rounded-2xl border border-black/[0.05] p-5 flex items-center gap-4 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}18` }}>
                          <link.icon size={22} style={{ color: link.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-[#1A1A2E] text-sm group-hover:text-[#FF8C00] transition-colors">{link.label}</div>
                          <div className="text-xs text-[#1A1A2E]/40 font-medium truncate">{link.href}</div>
                        </div>
                        <ExternalLink size={14} className="text-[#1A1A2E]/25 group-hover:text-[#FF8C00] transition-colors flex-shrink-0" />
                      </a>
                    ))}
                  </div>

                  {/* Contact details */}
                  <div className="mt-8 bg-white rounded-2xl border border-black/[0.05] p-6">
                    <h2 className="font-extrabold text-[#1A1A2E] mb-4">Business Contact Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: Phone, label: "Phone", value: "1300 09 66 16", href: "tel:1300096616" },
                        { icon: Mail, label: "Email", value: "admin@autoxpertgroup.org", href: "mailto:admin@autoxpertgroup.org" },
                        { icon: MapPin, label: "Service Area", value: "Adelaide & Surrounding Suburbs", href: null },
                        { icon: Clock, label: "Hours", value: "24/7 — Always Open", href: null },
                      ].map((d) => (
                        <div key={d.label} className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F8F8]">
                          <d.icon size={16} className="text-[#FF8C00] flex-shrink-0" />
                          <div>
                            <div className="text-[10px] font-extrabold text-[#1A1A2E]/40 uppercase tracking-wider">{d.label}</div>
                            {d.href
                              ? <a href={d.href} className="text-sm font-bold text-[#1A1A2E] hover:text-[#FF8C00]">{d.value}</a>
                              : <div className="text-sm font-bold text-[#1A1A2E]">{d.value}</div>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
