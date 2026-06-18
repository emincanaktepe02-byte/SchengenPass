"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, AlertCircle, ExternalLink, Clock, TrendingDown, Loader2 } from "lucide-react";
import type { Flight, CheapFlightDeal } from "@/lib/types";
import flightsData from "@/content/flights.json";
import { formatTimeAgo } from "@/lib/data";

const curatedFlights = flightsData as Flight[];

const INSPIRATION_SOURCES = [
  { label: "@gokdenizgok", href: "https://www.instagram.com/gokdenizgok" },
  { label: "@ucuzarota", href: "https://www.instagram.com/ucuzarota" },
  { label: "@ucuza.ucak", href: "https://www.instagram.com/ucuza.ucak" },
  { label: "ucuzaucak.net", href: "https://ucuzaucak.net" },
];

// ── Curated flight card ───────────────────────────────────────────────────────

function CuratedCard({ flight, index }: { flight: Flight; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="bg-[#202020] border border-white/5 rounded-[10px] p-6 hover:border-white/10 transition-colors flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-light text-white/80 flex-wrap">
          <Plane size={13} className="text-white/30 shrink-0" />
          <span>{flight.origin}</span>
          <span className="text-white/20">→</span>
          <span>{flight.destination}</span>
        </div>
        <span className="text-lg font-medium text-white tracking-tight shrink-0">{flight.price}</span>
      </div>

      <div className="flex items-center gap-3 text-xs text-white/40 font-light">
        <span>{flight.airline}</span>
        <span className="text-white/15">·</span>
        <span>{flight.date}</span>
      </div>

      {flight.note && (
        <p className="text-xs text-white/35 font-light leading-relaxed italic border-l border-white/10 pl-3">
          "{flight.note}"
        </p>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[10px] text-white/20">
          <Clock size={10} />
          <span>{formatTimeAgo(flight.postedAt)}</span>
        </div>
        {flight.sourceUrl ? (
          <a
            href={flight.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors"
          >
            <span>{flight.sourceLabel ?? "Kaynak"}</span>
            <ExternalLink size={9} />
          </a>
        ) : flight.sourceLabel ? (
          <span className="text-[10px] text-white/20">{flight.sourceLabel}</span>
        ) : null}
      </div>
    </motion.div>
  );
}

// ── Auto-detected deal card ───────────────────────────────────────────────────

function DealCard({ deal, index }: { deal: CheapFlightDeal; index: number }) {
  const weekDate = new Date(deal.departDate).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="bg-[#1a1a1a] border border-white/8 rounded-[10px] p-6 hover:border-white/15 transition-colors flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Savings badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
        <TrendingDown size={9} className="text-green-400" />
        <span className="text-[10px] text-green-400 font-medium">%{deal.savingsPercent} ucuz</span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 text-sm font-light text-white/80 pr-16">
        <Plane size={13} className="text-white/30 shrink-0" />
        <span>{deal.originCity}</span>
        <span className="text-white/20">→</span>
        <span>{deal.destinationCity}</span>
      </div>

      {/* Price */}
      <div>
        <div className="text-2xl font-medium text-white tracking-tight">
          {deal.price.toLocaleString("tr-TR")} ₺
        </div>
        <div className="text-[11px] text-white/25 font-light mt-0.5">
          6 aylık ort. {deal.sixMonthAvg.toLocaleString("tr-TR")} ₺ · {weekDate} haftası
        </div>
      </div>

      {deal.airline && (
        <p className="text-xs text-white/35 font-light">{deal.airline}</p>
      )}

      {/* CTA */}
      <a
        href={deal.bookingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-full px-4 py-2 transition-colors w-fit"
      >
        Skyscanner'da Ara
        <ExternalLink size={11} />
      </a>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FlightsSection() {
  const [deals, setDeals] = useState<CheapFlightDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  useEffect(() => {
    fetch("/api/cheap-flights")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.deals) && data.deals.length > 0) {
          setDeals(data.deals);
          setApiAvailable(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="flights" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-5">
              <Plane size={11} className="text-white/40" />
              <span className="text-xs text-white/40 font-light tracking-wider uppercase">Uygun Uçuşlar</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Uygun Fiyatlı
              <br />
              <span className="italic">Uçuş Fırsatları</span>
            </h2>
            <p className="text-white/35 font-light text-sm mt-3 max-w-md leading-relaxed">
              Küratörlenmiş fırsatlar ve otomatik tespit edilen %40 indirimli uçuşlar.
              Fiyatlar değişkendir; kaynaktan doğrulayın.
            </p>
          </div>

          <div className="shrink-0">
            <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2">Takip ettiğimiz kaynaklar</p>
            <div className="flex flex-wrap gap-2">
              {INSPIRATION_SOURCES.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-white/30 border border-white/8 rounded-full px-2.5 py-1 hover:text-white/60 hover:border-white/20 transition-colors"
                >
                  {s.label}
                  <ExternalLink size={9} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start gap-2.5 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 mb-10 max-w-2xl"
        >
          <AlertCircle size={14} className="text-white/30 shrink-0 mt-0.5" />
          <p className="text-xs text-white/30 font-light leading-relaxed">
            Fiyatlar değişkendir. Satın almadan önce havayolu veya ilgili platformdan doğrulayın.
            SchengenPass bilet satışı yapmaz.
          </p>
        </motion.div>

        {/* ── Otomatik tespit (Travelpayouts) ── */}
        {loading && (
          <div className="flex items-center gap-2 text-white/20 text-sm font-light mb-8">
            <Loader2 size={14} className="animate-spin" />
            Fırsat analizi yapılıyor...
          </div>
        )}

        {!loading && apiAvailable && deals.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <TrendingDown size={14} className="text-green-400" />
              <span className="text-xs text-white/40 font-light uppercase tracking-wider">
                Otomatik Tespit — 6 Aylık Ortalamanın %40 Altındaki Uçuşlar
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deals.map((deal, i) => (
                <DealCard key={`${deal.origin}-${deal.destination}-${deal.departDate}`} deal={deal} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Küratörlenmiş fırsatlar ── */}
        {curatedFlights.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-white/40 font-light uppercase tracking-wider">
                Elle Küratörlenmiş Fırsatlar
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {curatedFlights.map((flight, i) => (
                <CuratedCard key={flight.id} flight={flight} index={i} />
              ))}
            </div>
          </div>
        )}

        {!loading && !apiAvailable && curatedFlights.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[10px]">
            <Plane size={20} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-light">Henüz uçuş fırsatı yok.</p>
          </div>
        )}
      </div>
    </section>
  );
}
