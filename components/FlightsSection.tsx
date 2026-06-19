"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, ExternalLink, Search, Calendar, MapPin } from "lucide-react";
import autoDeals from "@/content/flights.json";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CountryDeal {
  country: string;
  flag: string;
  coverGradient: [string, string];
  city: string;
  destinationCode: string;
  originCity: string;
  originCode: string;
  price: number;
  departDate: string;
  airline?: string | null;
  bookingLink: string;
}

// ── Skyscanner fallback data ──────────────────────────────────────────────────

const ORIGINS = [
  { code: "IST", label: "İstanbul (IST)" },
  { code: "SAW", label: "Sabiha Gökçen (SAW)" },
  { code: "ESB", label: "Ankara (ESB)" },
  { code: "ADB", label: "İzmir (ADB)" },
] as const;

const FALLBACK_ROUTES = [
  { code: "ATH", city: "Atina", country: "Yunanistan", flag: "🇬🇷", gradient: ["#0D5EAF","#FFFFFF"] },
  { code: "CDG", city: "Paris", country: "Fransa", flag: "🇫🇷", gradient: ["#002395","#ED2939"] },
  { code: "FCO", city: "Roma", country: "İtalya", flag: "🇮🇹", gradient: ["#009246","#CE2B37"] },
  { code: "MAD", city: "Madrid", country: "İspanya", flag: "🇪🇸", gradient: ["#AA151B","#F1BF00"] },
  { code: "BCN", city: "Barselona", country: "İspanya", flag: "🇪🇸", gradient: ["#AA151B","#F1BF00"] },
  { code: "AMS", city: "Amsterdam", country: "Hollanda", flag: "🇳🇱", gradient: ["#AE1C28","#21468B"] },
  { code: "BER", city: "Berlin", country: "Almanya", flag: "🇩🇪", gradient: ["#000000","#DD0000"] },
  { code: "VIE", city: "Viyana", country: "Avusturya", flag: "🇦🇹", gradient: ["#ED2939","#FFFFFF"] },
  { code: "PRG", city: "Prag", country: "Çekya", flag: "🇨🇿", gradient: ["#D7141A","#11457E"] },
  { code: "BUD", city: "Budapeşte", country: "Macaristan", flag: "🇭🇺", gradient: ["#CE2939","#436F4D"] },
  { code: "LIS", city: "Lizbon", country: "Portekiz", flag: "🇵🇹", gradient: ["#006600","#FF0000"] },
  { code: "DBV", city: "Dubrovnik", country: "Hırvatistan", flag: "🇭🇷", gradient: ["#FF0000","#0055A4"] },
  { code: "MLA", city: "Malta", country: "Malta", flag: "🇲🇹", gradient: ["#CF142B","#FFFFFF"] },
  { code: "SOF", city: "Sofya", country: "Bulgaristan", flag: "🇧🇬", gradient: ["#00966E","#D62612"] },
  { code: "WAW", city: "Varşova", country: "Polonya", flag: "🇵🇱", gradient: ["#DC143C","#FFFFFF"] },
  { code: "BTS", city: "Bratislava", country: "Slovakya", flag: "🇸🇰", gradient: ["#FFFFFF","#0B4EA2"] },
  { code: "TLL", city: "Tallinn", country: "Estonya", flag: "🇪🇪", gradient: ["#0072CE","#1B4F91"] },
  { code: "ZRH", city: "Zürih", country: "İsviçre", flag: "🇨🇭", gradient: ["#CC0000","#FFFFFF"] },
  { code: "CPH", city: "Kopenhag", country: "Danimarka", flag: "🇩🇰", gradient: ["#C60C30","#FFFFFF"] },
  { code: "ARN", city: "Stockholm", country: "İsveç", flag: "🇸🇪", gradient: ["#006AA7","#FECC02"] },
] as const;

type OriginCode = typeof ORIGINS[number]["code"];

function skyscannerUrl(from: string, to: string) {
  return `https://www.skyscanner.com.tr/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/`;
}

// ── Big deal card (when real data available) ───────────────────────────────────

function DealCard({ deal, index }: { deal: CountryDeal; index: number }) {
  const [g1, g2] = deal.coverGradient;
  const dateLabel = new Date(deal.departDate).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "short",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300"
      style={{ background: `linear-gradient(135deg, ${g1}45 0%, #0e0e0e 55%, ${g2}25 100%)` }}
    >
      {/* Decorative giant flag */}
      <span
        className="absolute right-5 top-1/2 -translate-y-1/2 text-[140px] leading-none select-none pointer-events-none"
        style={{ opacity: 0.07, filter: "blur(2px)" }}
      >
        {deal.flag}
      </span>

      <div className="relative z-10 p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        {/* Left: destination info */}
        <div className="flex items-center gap-4 flex-1">
          <span className="text-5xl md:text-6xl leading-none shrink-0">{deal.flag}</span>
          <div>
            <p className="text-xs text-white/35 font-light uppercase tracking-wider mb-1">{deal.country}</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-none">
              {deal.city}
            </h3>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-white/40 font-light">
                <MapPin size={11} className="text-white/25" />
                {deal.originCity} ({deal.originCode}) → {deal.destinationCode}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40 font-light">
                <Calendar size={11} className="text-white/25" />
                {dateLabel}
              </span>
              {deal.airline && (
                <span className="text-xs text-white/30 font-light">{deal.airline}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: price + CTA */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
          <div className="text-right">
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
              {deal.price.toLocaleString("tr-TR")}
              <span className="text-2xl md:text-3xl ml-1 font-light text-white/70">₺</span>
            </div>
            <p className="text-xs text-white/30 mt-1">Gidiş · En ucuz 40 gün</p>
          </div>
          <a
            href={deal.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150 shrink-0 whitespace-nowrap"
          >
            <Plane size={14} />
            Skyscanner&apos;da Satın Al
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Fallback route card (when no token) ──────────────────────────────────────

function FallbackCard({ route, origin, index }: {
  route: typeof FALLBACK_ROUTES[number];
  origin: OriginCode;
  index: number;
}) {
  const [g1, g2] = route.gradient;
  return (
    <motion.a
      href={skyscannerUrl(origin, route.code)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.03, 0.25) }}
      className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-200 flex items-center gap-4 p-5"
      style={{ background: `linear-gradient(135deg, ${g1}30 0%, #111111 70%, ${g2}15 100%)` }}
    >
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl leading-none opacity-[0.06] pointer-events-none">{route.flag}</span>
      <span className="text-3xl leading-none z-10">{route.flag}</span>
      <div className="z-10 flex-1">
        <p className="text-base font-semibold text-white/85 group-hover:text-white transition-colors">{route.city}</p>
        <p className="text-xs text-white/35 font-light">{route.country}</p>
      </div>
      <div className="z-10 flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors shrink-0">
        <Search size={11} />
        <span>Ara</span>
        <ExternalLink size={10} />
      </div>
    </motion.a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FlightsSection() {
  const [activeOrigin, setActiveOrigin] = useState<OriginCode>("IST");
  const deals = autoDeals as CountryDeal[];
  const hasDeals = deals.length > 0;

  return (
    <section id="flights" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <Plane size={11} className="text-white/40" />
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Uçuş Fırsatları</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Sonraki 40 Gün
                <br />
                <span className="italic">En Ucuz Uçuşlar</span>
              </h2>
              <p className="text-white/35 font-light text-sm mt-3 max-w-lg leading-relaxed">
                IST, SAW, ESB ve ADB kalkışlı Schengen ülkelerinin en popüler şehirlerine
                sonraki 40 gün içindeki en ucuz bilet fiyatları.
              </p>
            </div>
            <a
              href="https://www.skyscanner.com.tr/ucak-bileti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-5 py-2.5 transition-all shrink-0"
            >
              Tüm Uçuşlar
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>

        {/* ── Real deals (build-time fetch) ── */}
        {hasDeals ? (
          <div className="flex flex-col gap-4">
            {deals.map((deal, i) => (
              <DealCard
                key={`${deal.originCode}-${deal.destinationCode}-${deal.departDate}`}
                deal={deal}
                index={i}
              />
            ))}
            <p className="text-xs text-white/20 text-center mt-2 font-light">
              Fiyatlar değişkendir · Satın almadan önce Skyscanner&apos;dan doğrulayın · SchengenPass bilet satışı yapmaz
            </p>
          </div>
        ) : (
          /* ── Fallback: Skyscanner search by origin ── */
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm text-white/40 font-light">
                Kalkış noktasını seçin ve Schengen&apos;e ara:
              </p>
              <div className="flex gap-2 flex-wrap">
                {ORIGINS.map((o) => (
                  <button
                    key={o.code}
                    onClick={() => setActiveOrigin(o.code)}
                    className={`text-sm rounded-full px-4 py-2 border transition-all duration-150 ${
                      activeOrigin === o.code
                        ? "bg-white/10 border-white/25 text-white font-medium"
                        : "bg-white/[0.03] border-white/8 text-white/35 hover:border-white/18 hover:text-white/60"
                    }`}
                  >
                    {o.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {FALLBACK_ROUTES.map((route, i) => (
                <FallbackCard key={route.code} route={route} origin={activeOrigin} index={i} />
              ))}
            </div>

            <p className="mt-5 text-xs text-white/20 font-light text-center">
              TRAVELPAYOUTS_TOKEN ayarlandığında otomatik fiyat tespiti devreye girer
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
