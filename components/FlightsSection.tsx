"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, ExternalLink, RefreshCw, Calendar } from "lucide-react";

interface FlightDeal {
  originCode: string; originCity: string;
  destinationCode: string; destinationCity: string;
  destinationCountry: string; destinationFlag: string;
  price: number; departDate: string;
  airline: string | null; bookingUrl: string;
}

const FADE = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: Math.min(i * 0.05, 0.35), duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function FlightCard({ deal, index }: { deal: FlightDeal; index: number }) {
  const dateStr = new Date(deal.departDate).toLocaleDateString("tr-TR", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.div
      custom={index} variants={FADE} initial="hidden" animate="show"
      className="card hover:border-[#D4A843]/25 transition-all group"
    >
      {/* Gold top accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent rounded-t-2xl" />

      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Flag + route */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-4xl shrink-0 leading-none">{deal.destinationFlag}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-semibold text-[#D4A843] bg-[#D4A843]/10 border border-[#D4A843]/15 px-2 py-0.5 rounded-md">
                {deal.originCode}
              </span>
              <Plane size={8} className="text-[#F0EBE0]/20 shrink-0" />
              <span className="text-[10px] font-mono font-semibold text-[#F0EBE0]/60 bg-white/5 border border-white/8 px-2 py-0.5 rounded-md">
                {deal.destinationCode}
              </span>
              {deal.airline && (
                <span className="text-[10px] text-[#F0EBE0]/25 font-light">{deal.airline}</span>
              )}
            </div>
            <p className="text-[15px] font-medium text-[#F0EBE0]/85 truncate leading-tight">
              {deal.originCity} → {deal.destinationCity}
            </p>
            <p className="text-xs text-[#F0EBE0]/35 font-light mt-0.5">{deal.destinationCountry}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-[#F0EBE0]/35 font-light shrink-0 bg-[#242424] border border-white/5 rounded-full px-3 py-1.5">
          <Calendar size={9} className="text-[#D4A843]/50 shrink-0" />
          <span>{dateStr}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-4 shrink-0 ml-auto">
          <div className="text-right">
            <div className="text-[22px] font-semibold text-[#F0EBE0] leading-none">
              {deal.price.toLocaleString("tr-TR")}
              <span className="text-base font-light text-[#D4A843] ml-1">₺</span>
            </div>
            <p className="text-[9px] text-[#F0EBE0]/25 font-light mt-0.5 tracking-wide">GİDİŞ · TEK YÖN</p>
          </div>
          <a
            href={deal.bookingUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#D4A843] hover:bg-[#C89A35] text-[#111111] text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap"
            style={{ boxShadow: "0 2px 12px rgba(212,168,67,0.3)" }}
          >
            <Plane size={10} />
            Satın Al
            <ExternalLink size={8} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ i }: { i: number }) {
  return (
    <div className="card" style={{ opacity: 1 - i * 0.18 }}>
      <div className="h-[1px] w-full bg-[#D4A843]/10 rounded-t-2xl" />
      <div className="p-5 flex items-center gap-4 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/5 rounded w-24" />
          <div className="h-4 bg-white/7 rounded w-44" />
          <div className="h-3 bg-white/4 rounded w-20" />
        </div>
        <div className="h-8 bg-white/5 rounded-full w-28" />
        <div className="h-9 bg-[#D4A843]/10 rounded-full w-20" />
      </div>
    </div>
  );
}

const FALLBACK = [
  { code: "ATH", city: "Atina",      country: "Yunanistan",  flag: "🇬🇷" },
  { code: "CDG", city: "Paris",      country: "Fransa",      flag: "🇫🇷" },
  { code: "FCO", city: "Roma",       country: "İtalya",      flag: "🇮🇹" },
  { code: "MAD", city: "Madrid",     country: "İspanya",     flag: "🇪🇸" },
  { code: "AMS", city: "Amsterdam",  country: "Hollanda",    flag: "🇳🇱" },
  { code: "BER", city: "Berlin",     country: "Almanya",     flag: "🇩🇪" },
  { code: "VIE", city: "Viyana",     country: "Avusturya",   flag: "🇦🇹" },
  { code: "PRG", city: "Prag",       country: "Çekya",       flag: "🇨🇿" },
  { code: "BUD", city: "Budapeşte",  country: "Macaristan",  flag: "🇭🇺" },
  { code: "LIS", city: "Lizbon",     country: "Portekiz",    flag: "🇵🇹" },
  { code: "BTS", city: "Bratislava", country: "Slovakya",    flag: "🇸🇰" },
  { code: "TLL", city: "Tallinn",    country: "Estonya",     flag: "🇪🇪" },
] as const;

const ORIGINS = ["IST", "SAW", "ESB", "ADB"] as const;
type Origin = typeof ORIGINS[number];

export default function FlightsSection() {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [origin, setOrigin] = useState<Origin>("IST");

  useEffect(() => {
    fetch("/api/cheap-flights")
      .then(r => r.json())
      .then((d: { deals: FlightDeal[]; updatedAt?: string }) => {
        setDeals(d.deals ?? []);
        setUpdatedAt(d.updatedAt ?? null);
      })
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = ORIGINS.reduce<Record<string, number>>((a, o) => {
    a[o] = deals.filter(d => d.originCode === o).length;
    return a;
  }, {});
  const hasDeals    = !loading && deals.length > 0;
  const filtered    = deals.filter(d => d.originCode === origin);
  const showFiltered = hasDeals && filtered.length > 0;

  return (
    <section id="flights" className="section-ink3 py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="badge mb-5">
            <Plane size={10} className="text-[#D4A843]" />
            Uçuş Fırsatları
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
                Güncel
                <br />
                <em className="not-italic gold-text font-medium italic">Uçuş Fiyatları</em>
              </h2>
              <p className="mt-4 text-[#F0EBE0]/40 font-light text-[15px] max-w-lg leading-relaxed">
                Travelpayouts API ile gerçek zamanlı güncellenen bilet fiyatları.
                IST, SAW, ESB ve ADB kalkışlı Schengen destinasyonları.
              </p>
            </div>
            {updatedAt && (
              <div className="flex items-center gap-1.5 text-xs text-[#F0EBE0]/25 font-light shrink-0">
                <RefreshCw size={10} />
                {new Date(updatedAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Origin tabs */}
        {(hasDeals || loading) && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {ORIGINS.map(o => {
              const n = counts[o] ?? 0;
              if (!loading && n === 0) return null;
              const active = o === origin;
              return (
                <button key={o} onClick={() => setOrigin(o)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all ${
                    active
                      ? "bg-[#D4A843] text-[#111111] font-medium"
                      : "border border-white/8 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 hover:border-[#D4A843]/20"
                  }`}>
                  {o}{!loading && n > 0 && <span className="ml-1.5 text-xs opacity-50">({n})</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <SkeletonCard key={i} i={i} />)}</div>
        ) : showFiltered ? (
          <div className="space-y-3">
            {filtered.map((d, i) => (
              <FlightCard key={`${d.originCode}-${d.destinationCode}-${d.departDate}`} deal={d} index={i} />
            ))}
            <p className="text-[11px] text-[#F0EBE0]/18 text-center mt-4 font-light tracking-wide">
              Fiyatlar Travelpayouts üzerinden alınmış olup değişkendir · Satın almadan önce doğrulayın
            </p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 mb-6 flex-wrap">
              {ORIGINS.map(o => (
                <button key={o} onClick={() => setOrigin(o)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all ${
                    o === origin
                      ? "bg-[#D4A843] text-[#111111]"
                      : "border border-white/8 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65"
                  }`}>{o}
                </button>
              ))}
            </div>
            <p className="text-[15px] text-[#F0EBE0]/40 font-light mb-6">
              Schengen&apos;e uçuş ara — destinasyon seç:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {FALLBACK.map((r, i) => (
                <motion.a key={r.code}
                  href={`https://www.skyscanner.com.tr/transport/flights/${origin.toLowerCase()}/${r.code.toLowerCase()}/`}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card p-4 hover:border-[#D4A843]/25 transition-all flex flex-col items-center gap-2 text-center group"
                >
                  <span className="text-3xl leading-none">{r.flag}</span>
                  <div>
                    <p className="text-[14px] font-medium text-[#F0EBE0]/75 group-hover:text-[#F0EBE0] transition-colors">{r.city}</p>
                    <p className="text-[11px] text-[#F0EBE0]/30">{r.country}</p>
                  </div>
                  <div className="text-[10px] text-[#D4A843]/40 group-hover:text-[#D4A843] transition-colors flex items-center gap-1">
                    <ExternalLink size={8} />Skyscanner
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
