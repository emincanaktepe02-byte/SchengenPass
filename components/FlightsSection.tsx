"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, ExternalLink, RefreshCw, Calendar } from "lucide-react";

interface FlightDeal {
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  destinationCountry: string;
  destinationFlag: string;
  price: number;
  departDate: string;
  airline: string | null;
  bookingUrl: string;
}

// ── Flight ticket card ────────────────────────────────────────────────────────

function FlightCard({ deal, index }: { deal: FlightDeal; index: number }) {
  const d = new Date(deal.departDate);
  const dateStr = d.toLocaleDateString("tr-TR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300"
    >
      {/* Gradient strip at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#00d4ff] via-[#7b2ff7] to-[#00ff87]" />

      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Flag + route info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-4xl shrink-0 leading-none">{deal.destinationFlag}</span>
          <div className="min-w-0">
            {/* IATA codes */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-mono font-semibold text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-2 py-0.5 rounded-md">
                {deal.originCode}
              </span>
              <Plane size={9} className="text-white/30 shrink-0" />
              <span className="text-[11px] font-mono font-semibold text-[#7b2ff7] bg-[#7b2ff7]/10 border border-[#7b2ff7]/20 px-2 py-0.5 rounded-md">
                {deal.destinationCode}
              </span>
              {deal.airline && (
                <span className="text-[10px] text-white/25 font-light ml-1">{deal.airline}</span>
              )}
            </div>
            {/* City names */}
            <p className="text-base font-semibold text-white/90 truncate leading-tight">
              {deal.originCity} → {deal.destinationCity}
            </p>
            <p className="text-xs text-white/35 font-light">{deal.destinationCountry}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-white/35 font-light shrink-0 glass rounded-full px-3 py-1.5">
          <Calendar size={10} className="text-white/25 shrink-0" />
          <span>{dateStr}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <div className="text-right">
            <div className="text-2xl font-bold text-white leading-none">
              {deal.price.toLocaleString("tr-TR")}
              <span className="text-lg font-light text-[#00d4ff] ml-1">₺</span>
            </div>
            <p className="text-[10px] text-white/25 font-light mt-0.5">gidiş · tek yön</p>
          </div>
          <a
            href={deal.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all whitespace-nowrap glow-cyan"
          >
            <Plane size={11} />
            Satın Al
            <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function SkeletonCard({ i }: { i: number }) {
  return (
    <div
      key={i}
      className="glass rounded-2xl overflow-hidden"
      style={{ opacity: 1 - i * 0.15 }}
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
      <div className="p-5 flex items-center gap-4 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/5 rounded w-24" />
          <div className="h-4 bg-white/8 rounded w-44" />
          <div className="h-3 bg-white/5 rounded w-20" />
        </div>
        <div className="h-8 bg-white/5 rounded-full w-28 shrink-0" />
        <div className="h-9 bg-white/5 rounded-full w-20 shrink-0" />
      </div>
    </div>
  );
}

// ── Fallback grid (when API has no data) ─────────────────────────────────────

const FALLBACK_ROUTES = [
  { code: "ATH", city: "Atina", country: "Yunanistan", flag: "🇬🇷" },
  { code: "CDG", city: "Paris", country: "Fransa", flag: "🇫🇷" },
  { code: "FCO", city: "Roma", country: "İtalya", flag: "🇮🇹" },
  { code: "MAD", city: "Madrid", country: "İspanya", flag: "🇪🇸" },
  { code: "AMS", city: "Amsterdam", country: "Hollanda", flag: "🇳🇱" },
  { code: "BER", city: "Berlin", country: "Almanya", flag: "🇩🇪" },
  { code: "VIE", city: "Viyana", country: "Avusturya", flag: "🇦🇹" },
  { code: "PRG", city: "Prag", country: "Çekya", flag: "🇨🇿" },
  { code: "BUD", city: "Budapeşte", country: "Macaristan", flag: "🇭🇺" },
  { code: "LIS", city: "Lizbon", country: "Portekiz", flag: "🇵🇹" },
  { code: "BTS", city: "Bratislava", country: "Slovakya", flag: "🇸🇰" },
  { code: "TLL", city: "Tallinn", country: "Estonya", flag: "🇪🇪" },
] as const;

const ORIGINS_LABELS = ["IST", "SAW", "ESB", "ADB"] as const;
type OriginCode = typeof ORIGINS_LABELS[number];

// ── Main component ────────────────────────────────────────────────────────────

export default function FlightsSection() {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [activeOrigin, setActiveOrigin] = useState<OriginCode>("IST");

  useEffect(() => {
    fetch("/api/cheap-flights")
      .then((r) => r.json())
      .then((data: { deals: FlightDeal[]; updatedAt?: string }) => {
        setDeals(data.deals ?? []);
        setUpdatedAt(data.updatedAt ?? null);
      })
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  const originCounts = ORIGINS_LABELS.reduce<Record<string, number>>((acc, o) => {
    acc[o] = deals.filter((d) => d.originCode === o).length;
    return acc;
  }, {});

  const hasDeals = !loading && deals.length > 0;
  const filteredDeals = deals.filter((d) => d.originCode === activeOrigin);
  const showFiltered = hasDeals && filteredDeals.length > 0;

  return (
    <section
      id="flights"
      className="py-24"
      style={{ background: "linear-gradient(to bottom, #030b14, #020918, #040d1a)" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
            <Plane size={11} className="text-[#00d4ff]" />
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">
              Uçuş Fırsatları
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Güncel
                <br />
                <span className="italic gradient-text">Uçuş Fiyatları</span>
              </h2>
              <p className="text-white/35 font-light text-sm mt-3 max-w-lg leading-relaxed">
                Travelpayouts API ile gerçek zamanlı güncellenen bilet fiyatları.
                IST, SAW, ESB ve ADB kalkışlı Schengen destinasyonlarına en ucuz biletler.
              </p>
            </div>
            {updatedAt && (
              <div className="flex items-center gap-1.5 text-xs text-white/25 font-light shrink-0">
                <RefreshCw size={10} />
                Güncellendi:{" "}
                {new Date(updatedAt).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Origin selector (only when we have deals) */}
        {(hasDeals || loading) && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {ORIGINS_LABELS.map((o) => {
              const count = originCounts[o] ?? 0;
              if (!loading && count === 0) return null;
              return (
                <button
                  key={o}
                  onClick={() => setActiveOrigin(o)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                    activeOrigin === o
                      ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white font-medium"
                      : "glass text-white/40 hover:text-white/70 hover:bg-white/[0.07]"
                  }`}
                >
                  {o}
                  {!loading && count > 0 && (
                    <span className="ml-1.5 text-xs opacity-50">({count})</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Content area */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} i={i} />)}
          </div>
        ) : showFiltered ? (
          <div className="space-y-3">
            {filteredDeals.map((deal, i) => (
              <FlightCard
                key={`${deal.originCode}-${deal.destinationCode}-${deal.departDate}`}
                deal={deal}
                index={i}
              />
            ))}
            <p className="text-xs text-white/20 text-center mt-4 font-light">
              Fiyatlar Travelpayouts üzerinden alınmış olup değişkendir ·
              Satın almadan önce doğrulayın · SchengenPass bilet satışı yapmaz
            </p>
          </div>
        ) : (
          /* Fallback: Quick Skyscanner links */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-2 mb-6 flex-wrap">
              {ORIGINS_LABELS.map((o) => (
                <button
                  key={o}
                  onClick={() => setActiveOrigin(o)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all ${
                    activeOrigin === o
                      ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white"
                      : "glass text-white/40 hover:text-white/70"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>

            <p className="text-sm text-white/35 font-light mb-5">
              Schengen&apos;e uçuş ara — kalkış noktanı seç:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {FALLBACK_ROUTES.map((route, i) => (
                <motion.a
                  key={route.code}
                  href={`https://www.skyscanner.com.tr/transport/flights/${activeOrigin.toLowerCase()}/${route.code.toLowerCase()}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group glass rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/15 transition-all flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-3xl leading-none">{route.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      {route.city}
                    </p>
                    <p className="text-[11px] text-white/30">{route.country}</p>
                  </div>
                  <div className="text-[10px] text-[#00d4ff]/50 group-hover:text-[#00d4ff] transition-colors flex items-center gap-1">
                    <ExternalLink size={9} />
                    Skyscanner&apos;da Ara
                  </div>
                </motion.a>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/15 font-light text-center">
              Anlık fiyat verisi için Travelpayouts API bağlantısı aktif · Veri yüklenemezse Skyscanner linkleri gösterilir
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
