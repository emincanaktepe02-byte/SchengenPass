"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ExternalLink, ChevronDown, Calendar } from "lucide-react";

interface FlightDeal {
  originCode: string; originCity: string;
  destinationCode: string; destinationCity: string;
  destinationCountry: string; destinationFlag: string;
  price: number; departDate: string;
  airline: string | null; bookingUrl: string;
}

interface CountryGroup {
  flag: string;
  country: string;
  deals: FlightDeal[];
  minPrice: number;
}

const ORIGINS = ["IST", "SAW", "ESB", "ADB"] as const;
type Origin = typeof ORIGINS[number];

const ORIGIN_LABELS: Record<Origin, string> = {
  IST: "İstanbul (Atatürk)",
  SAW: "İstanbul (Sabiha)",
  ESB: "Ankara (Esenboğa)",
  ADB: "İzmir (Adnan Menderes)",
};

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

function groupDeals(deals: FlightDeal[], origin: Origin): CountryGroup[] {
  const map = new Map<string, CountryGroup>();
  for (const d of deals) {
    if (d.originCode !== origin) continue;
    if (!map.has(d.destinationCountry)) {
      map.set(d.destinationCountry, { flag: d.destinationFlag, country: d.destinationCountry, deals: [], minPrice: Infinity });
    }
    const g = map.get(d.destinationCountry)!;
    g.deals.push(d);
    if (d.price < g.minPrice) g.minPrice = d.price;
  }
  return [...map.values()].sort((a, b) => a.minPrice - b.minPrice);
}

function DealRow({ d }: { d: FlightDeal }) {
  const date = new Date(d.departDate).toLocaleDateString("tr-TR", {
    weekday: "short", day: "numeric", month: "short",
  });
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 bg-[#0F0F0F] border border-white/5 rounded-xl hover:border-[#D4A843]/12 transition-all">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[12px] font-mono font-bold text-[#D4A843] bg-[#D4A843]/10 border border-[#D4A843]/15 px-2 py-0.5 rounded-md shrink-0">
            {d.originCode}
          </span>
          <Plane size={9} className="text-[#F0EBE0]/15 shrink-0" />
          <span className="text-[12px] font-mono text-[#F0EBE0]/45 bg-white/5 border border-white/8 px-2 py-0.5 rounded-md shrink-0">
            {d.destinationCode}
          </span>
          {d.airline && <span className="text-[11px] text-[#F0EBE0]/20 font-light truncate ml-1">{d.airline}</span>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-[#F0EBE0]/30 font-light shrink-0">
        <Calendar size={9} />
        {date}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <span className="text-[18px] font-semibold text-[#F0EBE0] leading-none">
            {d.price.toLocaleString("tr-TR")}
          </span>
          <span className="text-sm text-[#D4A843] ml-1 font-light">₺</span>
        </div>
        <a href={d.bookingUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 bg-[#D4A843] hover:bg-[#C89A35] text-[#111111] text-[11px] font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0">
          Satın Al <ExternalLink size={8} />
        </a>
      </div>
    </div>
  );
}

function CountryCard({ group, origin }: { group: CountryGroup; origin: Origin }) {
  const [open, setOpen] = useState(false);
  const sorted = [...group.deals].sort((a, b) => a.price - b.price);

  return (
    <div className="card overflow-hidden hover:border-[#D4A843]/20 transition-all">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{group.flag}</span>
          <div>
            <p className="text-[15px] font-semibold text-[#F0EBE0]/80 leading-tight">{group.country}</p>
            <p className="text-[11px] text-[#F0EBE0]/28 font-light mt-0.5">
              {group.deals.length} rota · {ORIGIN_LABELS[origin]}&apos;ndan
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[11px] text-[#F0EBE0]/25 font-light">&apos;den başlayan</p>
            <p className="text-[20px] font-semibold text-[#F0EBE0]">
              {group.minPrice.toLocaleString("tr-TR")}
              <span className="text-[#D4A843] text-sm font-light ml-1">₺</span>
            </p>
          </div>
          <ChevronDown size={16} className={`text-[#F0EBE0]/20 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-2">
              {sorted.map((d, i) => <DealRow key={i} d={d} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/6 rounded w-32" />
        <div className="h-3 bg-white/4 rounded w-20" />
      </div>
      <div className="h-7 bg-[#D4A843]/10 rounded-full w-24" />
    </div>
  );
}

export default function FlightsSection() {
  const [deals,   setDeals]   = useState<FlightDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [origin,  setOrigin]  = useState<Origin>("IST");
  const [showAll, setShowAll] = useState(false);
  const FLIGHTS_INITIAL = 6;

  useEffect(() => {
    fetch("/api/cheap-flights")
      .then(r => r.json())
      .then((d: { deals: FlightDeal[] }) => setDeals(d.deals ?? []))
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  const groups = groupDeals(deals, origin);
  const hasDeals = !loading && groups.length > 0;
  const visibleGroups = showAll ? groups : groups.slice(0, FLIGHTS_INITIAL);
  const visibleFallback = showAll ? [...FALLBACK] : [...FALLBACK].slice(0, FLIGHTS_INITIAL);

  return (
    <section id="flights" className="section-ink3 py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="badge mb-5">
            <Plane size={10} className="text-[#D4A843]" />
            Uçuş Fırsatları
          </p>
          <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
            Güncel<br />
            <em className="not-italic gold-text font-medium italic">Uçuş Fiyatları</em>
          </h2>
          <p className="mt-4 text-[#F0EBE0]/45 font-light text-[16px] max-w-lg leading-relaxed">
            Travelpayouts API ile güncellenen bilet fiyatları. Kalkış noktanızı seçin, destinasyona göre en ucuz seçeneği bulun.
          </p>
        </motion.div>

        {/* Origin tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {ORIGINS.map(o => (
            <button key={o} onClick={() => { setOrigin(o); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                o === origin
                  ? "bg-[#D4A843] text-[#111111] font-semibold"
                  : "border border-white/8 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 hover:border-[#D4A843]/20"
              }`}>
              {o}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-3">{[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : hasDeals ? (
          <div className="space-y-3">
            {visibleGroups.map(g => <CountryCard key={g.country} group={g} origin={origin} />)}
            {!showAll && groups.length > FLIGHTS_INITIAL && (
              <div className="flex justify-center pt-2">
                <button onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-3 rounded-full transition-all">
                  Daha Fazla Göster
                  <span className="text-xs text-[#D4A843]/45 font-medium">+{groups.length - FLIGHTS_INITIAL} destinasyon</span>
                </button>
              </div>
            )}
            {showAll && groups.length > FLIGHTS_INITIAL && (
              <div className="flex justify-center pt-2">
                <button onClick={() => setShowAll(false)}
                  className="text-sm text-[#F0EBE0]/22 hover:text-[#F0EBE0]/50 font-light transition-colors">
                  Daha Az Göster ↑
                </button>
              </div>
            )}
            <p className="text-[11px] text-[#F0EBE0]/15 text-center mt-3 font-light">
              Fiyatlar Travelpayouts üzerinden alınmış olup değişkendir · Satın almadan önce doğrulayın
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[15px] text-[#F0EBE0]/40 font-light mb-6">
              {origin} kalkışlı Schengen uçuşları — destinasyon seç:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {visibleFallback.map((r, i) => (
                <motion.a key={r.code}
                  href={`https://www.skyscanner.com.tr/transport/flights/${origin.toLowerCase()}/${r.code.toLowerCase()}/`}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card p-4 hover:border-[#D4A843]/25 transition-all flex flex-col items-center gap-2 text-center group">
                  <span className="text-3xl leading-none">{r.flag}</span>
                  <div>
                    <p className="text-[14px] font-medium text-[#F0EBE0]/70 group-hover:text-[#F0EBE0] transition-colors">{r.city}</p>
                    <p className="text-[11px] text-[#F0EBE0]/28 font-light">{r.country}</p>
                  </div>
                  <div className="text-[10px] text-[#D4A843]/40 group-hover:text-[#D4A843] transition-colors flex items-center gap-1">
                    <ExternalLink size={8} />Skyscanner
                  </div>
                </motion.a>
              ))}
            </div>
            {!showAll && FALLBACK.length > FLIGHTS_INITIAL && (
              <div className="flex justify-center mt-5">
                <button onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-3 rounded-full transition-all">
                  Daha Fazla Göster
                  <span className="text-xs text-[#D4A843]/45 font-medium">+{FALLBACK.length - FLIGHTS_INITIAL} destinasyon</span>
                </button>
              </div>
            )}
            {showAll && FALLBACK.length > FLIGHTS_INITIAL && (
              <div className="flex justify-center mt-5">
                <button onClick={() => setShowAll(false)}
                  className="text-sm text-[#F0EBE0]/22 hover:text-[#F0EBE0]/50 font-light transition-colors">
                  Daha Az Göster ↑
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
