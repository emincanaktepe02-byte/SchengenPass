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

function FlightCard({ deal, index }: { deal: FlightDeal; index: number }) {
  const d = new Date(deal.departDate);
  const dateStr = d.toLocaleDateString("tr-TR", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className="group bg-white border border-[#0A1628]/7 rounded-2xl overflow-hidden hover:border-[#C9A84C]/35 hover:shadow-md transition-all duration-300"
      style={{ boxShadow: "0 1px 4px rgba(10,22,40,0.04)" }}
    >
      {/* Gold strip at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#C9A84C] via-[#E8CC7A] to-[#C9A84C]" />

      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Flag + route */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-4xl shrink-0 leading-none">{deal.destinationFlag}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-mono font-semibold text-[#0077B6] bg-[#0077B6]/8 border border-[#0077B6]/15 px-2 py-0.5 rounded-md">
                {deal.originCode}
              </span>
              <Plane size={9} className="text-[#0A1628]/25 shrink-0" />
              <span className="text-[11px] font-mono font-semibold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-2 py-0.5 rounded-md">
                {deal.destinationCode}
              </span>
              {deal.airline && (
                <span className="text-[10px] text-[#0A1628]/30 font-light ml-1">{deal.airline}</span>
              )}
            </div>
            <p className="text-base font-semibold text-[#0A1628]/85 truncate leading-tight">
              {deal.originCity} → {deal.destinationCity}
            </p>
            <p className="text-xs text-[#0A1628]/35 font-light">{deal.destinationCountry}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-[#0A1628]/35 font-light shrink-0 bg-[#FAF9F7] border border-[#0A1628]/6 rounded-full px-3 py-1.5">
          <Calendar size={10} className="text-[#C9A84C]/60 shrink-0" />
          <span>{dateStr}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <div className="text-right">
            <div className="text-2xl font-bold text-[#0A1628] leading-none">
              {deal.price.toLocaleString("tr-TR")}
              <span className="text-lg font-light text-[#C9A84C] ml-1">₺</span>
            </div>
            <p className="text-[10px] text-[#0A1628]/30 font-light mt-0.5">gidiş · tek yön</p>
          </div>
          <a
            href={deal.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #B8933F 100%)",
              boxShadow: "0 4px 14px rgba(201,168,76,0.3)",
            }}
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

function SkeletonCard({ i }: { i: number }) {
  return (
    <div
      className="bg-white border border-[#0A1628]/6 rounded-2xl overflow-hidden"
      style={{ opacity: 1 - i * 0.15 }}
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-[#C9A84C]/20" />
      <div className="p-5 flex items-center gap-4 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-[#0A1628]/5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#0A1628]/5 rounded w-24" />
          <div className="h-4 bg-[#0A1628]/7 rounded w-44" />
          <div className="h-3 bg-[#0A1628]/4 rounded w-20" />
        </div>
        <div className="h-8 bg-[#0A1628]/5 rounded-full w-28 shrink-0" />
        <div className="h-9 bg-[#C9A84C]/12 rounded-full w-20 shrink-0" />
      </div>
    </div>
  );
}

const FALLBACK_ROUTES = [
  { code: "ATH", city: "Atina",       country: "Yunanistan",  flag: "🇬🇷" },
  { code: "CDG", city: "Paris",       country: "Fransa",      flag: "🇫🇷" },
  { code: "FCO", city: "Roma",        country: "İtalya",      flag: "🇮🇹" },
  { code: "MAD", city: "Madrid",      country: "İspanya",     flag: "🇪🇸" },
  { code: "AMS", city: "Amsterdam",   country: "Hollanda",    flag: "🇳🇱" },
  { code: "BER", city: "Berlin",      country: "Almanya",     flag: "🇩🇪" },
  { code: "VIE", city: "Viyana",      country: "Avusturya",   flag: "🇦🇹" },
  { code: "PRG", city: "Prag",        country: "Çekya",       flag: "🇨🇿" },
  { code: "BUD", city: "Budapeşte",   country: "Macaristan",  flag: "🇭🇺" },
  { code: "LIS", city: "Lizbon",      country: "Portekiz",    flag: "🇵🇹" },
  { code: "BTS", city: "Bratislava",  country: "Slovakya",    flag: "🇸🇰" },
  { code: "TLL", city: "Tallinn",     country: "Estonya",     flag: "🇪🇪" },
] as const;

const ORIGINS_LABELS = ["IST", "SAW", "ESB", "ADB"] as const;
type OriginCode = typeof ORIGINS_LABELS[number];

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
    <section id="flights" className="py-24 section-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#0A1628]/8 rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <Plane size={11} className="text-[#C9A84C]" />
            <span className="text-xs text-[#0A1628]/40 font-light tracking-wider uppercase">
              Uçuş Fırsatları
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="text-4xl md:text-5xl font-light text-[#0A1628] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Güncel
                <br />
                <span className="italic gradient-text">Uçuş Fiyatları</span>
              </h2>
              <p className="text-[#0A1628]/40 font-light text-sm mt-3 max-w-lg leading-relaxed">
                Travelpayouts API ile gerçek zamanlı güncellenen bilet fiyatları.
                IST, SAW, ESB ve ADB kalkışlı Schengen destinasyonlarına en ucuz biletler.
              </p>
            </div>
            {updatedAt && (
              <div className="flex items-center gap-1.5 text-xs text-[#0A1628]/30 font-light shrink-0">
                <RefreshCw size={10} />
                Güncellendi:{" "}
                {new Date(updatedAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Origin tabs */}
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
                      ? "text-white font-medium shadow-sm"
                      : "bg-white border border-[#0A1628]/8 text-[#0A1628]/45 hover:text-[#0A1628] hover:border-[#C9A84C]/30"
                  }`}
                  style={
                    activeOrigin === o
                      ? { background: "linear-gradient(135deg, #C9A84C, #B8933F)", boxShadow: "0 2px 12px rgba(201,168,76,0.3)" }
                      : undefined
                  }
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

        {/* Content */}
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
            <p className="text-xs text-[#0A1628]/20 text-center mt-4 font-light">
              Fiyatlar Travelpayouts üzerinden alınmış olup değişkendir · Satın almadan önce doğrulayın
            </p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 mb-6 flex-wrap">
              {ORIGINS_LABELS.map((o) => (
                <button
                  key={o}
                  onClick={() => setActiveOrigin(o)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all ${
                    activeOrigin === o
                      ? "text-white"
                      : "bg-white border border-[#0A1628]/8 text-[#0A1628]/45 hover:text-[#0A1628]"
                  }`}
                  style={
                    activeOrigin === o
                      ? { background: "linear-gradient(135deg, #C9A84C, #B8933F)" }
                      : undefined
                  }
                >
                  {o}
                </button>
              ))}
            </div>

            <p className="text-sm text-[#0A1628]/40 font-light mb-5">
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
                  className="group bg-white border border-[#0A1628]/7 rounded-xl p-4 hover:border-[#C9A84C]/35 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center"
                  style={{ boxShadow: "0 1px 4px rgba(10,22,40,0.04)" }}
                >
                  <span className="text-3xl leading-none">{route.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-[#0A1628]/75 group-hover:text-[#0A1628] transition-colors">
                      {route.city}
                    </p>
                    <p className="text-[11px] text-[#0A1628]/35">{route.country}</p>
                  </div>
                  <div className="text-[10px] text-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    <ExternalLink size={9} />
                    Skyscanner&apos;da Ara
                  </div>
                </motion.a>
              ))}
            </div>

            <p className="mt-6 text-xs text-[#0A1628]/20 font-light text-center">
              Anlık fiyat verisi için Travelpayouts API bağlantısı aktif · Veri yüklenemezse Skyscanner linkleri gösterilir
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
