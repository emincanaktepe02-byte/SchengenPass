"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, AlertCircle, ExternalLink, Search, Lightbulb } from "lucide-react";
import { COUNTRIES } from "@/lib/data";
import type { CenterOperator } from "@/lib/types";

// ── Operator styling ──────────────────────────────────────────────────────────

const OPERATOR_STYLE: Record<CenterOperator, {
  border: string;
  badge: string;
  dot: string;
  filterActive: string;
}> = {
  "VFS Global": {
    border: "border-l-white/20",
    badge: "bg-white/5 border border-white/10 text-white/50",
    dot: "bg-white/30",
    filterActive: "bg-white/10 border-white/20 text-white/70",
  },
  "iData": {
    border: "border-l-violet-500/50",
    badge: "bg-violet-500/10 border border-violet-500/25 text-violet-300/80",
    dot: "bg-violet-400",
    filterActive: "bg-violet-500/15 border-violet-400/30 text-violet-300",
  },
  "Kosmos": {
    border: "border-l-blue-500/50",
    badge: "bg-blue-500/10 border border-blue-500/25 text-blue-300/80",
    dot: "bg-blue-400",
    filterActive: "bg-blue-500/15 border-blue-400/30 text-blue-300",
  },
  "BLS International": {
    border: "border-l-orange-500/50",
    badge: "bg-orange-500/10 border border-orange-500/25 text-orange-300/80",
    dot: "bg-orange-400",
    filterActive: "bg-orange-500/15 border-orange-400/30 text-orange-300",
  },
  "AS Visa Solutions": {
    border: "border-l-emerald-500/50",
    badge: "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/80",
    dot: "bg-emerald-400",
    filterActive: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
  },
  "Konsolosluk": {
    border: "border-l-yellow-500/50",
    badge: "bg-yellow-500/10 border border-yellow-500/25 text-yellow-300/80",
    dot: "bg-yellow-400",
    filterActive: "bg-yellow-500/15 border-yellow-400/30 text-yellow-300",
  },
};

const OPERATOR_LABELS: Record<CenterOperator, string> = {
  "VFS Global": "VFS Global",
  "iData": "iDATA",
  "Kosmos": "Kosmos Vize",
  "BLS International": "BLS International",
  "AS Visa Solutions": "AS Visa Solutions",
  "Konsolosluk": "Konsolosluk",
};

// ── Difficulty from avgWait ───────────────────────────────────────────────────

function getDifficulty(avgWait: string) {
  const first = parseInt(avgWait.match(/\d+/)?.[0] ?? "30");
  if (first <= 20) return { label: "Kolay", color: "text-green-400", bars: [true, false, false] };
  if (first <= 40) return { label: "Orta", color: "text-yellow-400", bars: [true, true, false] };
  return { label: "Zorlu", color: "text-red-400", bars: [true, true, true] };
}

// ── Country card ──────────────────────────────────────────────────────────────

function CountryCard({ country, index }: { country: typeof COUNTRIES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const style = OPERATOR_STYLE[country.centerOperator];
  const diff = getDifficulty(country.avgWait);
  const operatorLabel = OPERATOR_LABELS[country.centerOperator];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.035, 0.35) }}
      className={`bg-[#1c1c1c] border-l-[3px] border border-white/5 rounded-[10px] overflow-hidden hover:border-white/10 transition-all duration-200 hover:bg-[#202020] ${style.border}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between p-5 text-left gap-3"
      >
        <div className="flex-1 min-w-0">
          {/* Country name + flag */}
          <div className="flex items-center gap-3 mb-3.5">
            <span className="text-3xl leading-none">{country.flag}</span>
            <div className="min-w-0">
              <div className="text-sm font-medium text-white leading-tight">{country.name}</div>
              <div className="text-[11px] text-white/30 font-light mt-0.5">{country.popularCity}</div>
            </div>
          </div>

          {/* Chips row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Operator */}
            <span className={`inline-flex items-center gap-1 text-[10px] rounded-full px-2 py-0.5 font-medium ${style.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
              {operatorLabel}
            </span>

            {/* Processing time */}
            <span className="inline-flex items-center gap-1 text-[10px] bg-white/4 border border-white/8 rounded-full px-2 py-0.5 text-white/35">
              <Clock size={9} />
              {country.processingTime}
            </span>

            {/* Difficulty */}
            <span className={`inline-flex items-center gap-1.5 text-[10px] rounded-full px-2 py-0.5 bg-white/4 border border-white/8 ${diff.color}`}>
              <span className="flex gap-0.5">
                {diff.bars.map((filled, i) => (
                  <span
                    key={i}
                    className={`block w-1 h-2.5 rounded-[2px] ${filled ? diff.color.replace("text-", "bg-") : "bg-white/10"}`}
                  />
                ))}
              </span>
              {diff.label}
            </span>
          </div>
        </div>

        <ChevronDown
          size={15}
          className={`text-white/20 mt-1 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
              {/* Average wait */}
              <div className="flex items-center gap-2 text-xs text-white/30 font-light">
                <Clock size={11} className="text-white/20" />
                Ortalama bekleme: <span className="text-white/50">{country.avgWait}</span>
              </div>

              {/* Tips */}
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2.5">İpuçları</p>
                <ul className="space-y-2">
                  {country.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/40 font-light leading-relaxed">
                      <span className="text-white/15 shrink-0 mt-0.5">·</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2.5">Gerekli Belgeler</p>
                <div className="flex flex-wrap gap-1.5">
                  {country.requirements.map((req, i) => (
                    <span key={i} className="text-[10px] bg-white/[0.04] border border-white/8 rounded-full px-2.5 py-1 text-white/40">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Centers */}
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Başvuru Merkezleri</p>
                <p className="text-xs text-white/35 font-light">{country.centers.join(" · ")}</p>
              </div>

              {/* Official link */}
              <div className={`flex items-start gap-2.5 rounded-lg px-3.5 py-3 border ${style.badge}`}>
                <AlertCircle size={12} className="shrink-0 mt-0.5 opacity-60" />
                <div className="flex-1">
                  <p className="text-[11px] font-light leading-relaxed opacity-70">
                    Bilgiler değişebilir. Başvuru öncesi resmi kaynaktan doğrulayın.
                  </p>
                  <a
                    href={country.centerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] mt-1.5 underline underline-offset-2 hover:opacity-90 transition-opacity"
                  >
                    {operatorLabel} — Resmi başvuru sayfası
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── General tips ──────────────────────────────────────────────────────────────

const GENERAL_TIPS_2026 = [
  { emoji: "⏰", title: "Doğru saatleri yakala", tip: "Boş randevu slotları genellikle sabah 08:00–09:00 ve gece 23:00–00:00'da çıkar. İptal edilen rezervasyonlar bu saatlerde sisteme döner." },
  { emoji: "💶", title: "Toplam maliyet ~120€", tip: "2026 vize ücreti 90€ + merkez servis bedeli ~30€ = kişi başı yaklaşık 120€. Döviz kuru farkına dikkat edin." },
  { emoji: "📅", title: "180 gün öncesinden başvurabilirsin", tip: "Schengen vize başvurusu seyahat tarihinden en fazla 180 gün önce yapılabilir. Popüler ülkeler için en erken tarihe randevu alın." },
  { emoji: "🇬🇷", title: "Yunanistan en kolay randevu", tip: "2026'da Yunanistan, özellikle Ekim–Mart döneminde randevu bulmayı en kolaylaştıran Schengen ülkesidir. Slovakya ve Macaristan da rahat." },
  { emoji: "📋", title: "Kaskad kuralı — uzun vizeye geçiş", tip: "Kısa süreli vizeni uyumlu kullanırsan sıradaki başvuruda 6 aylık vize alabilirsin. Sonra sırayla 1 yıl → 3 yıl → 5 yıl." },
  { emoji: "🏙️", title: "Alternatif merkez dene", tip: "Büyük şehirlerin dışında Ankara, İzmir, Bursa, Antalya gibi şehirlerdeki merkezler genellikle daha erken randevu sunuyor." },
];

// ── Operator filter ───────────────────────────────────────────────────────────

const ALL_OPERATORS = ["Tümü", "VFS Global", "iData", "Kosmos", "BLS International", "AS Visa Solutions"] as const;
type Filter = typeof ALL_OPERATORS[number];

// ── Main component ────────────────────────────────────────────────────────────

export default function CountryGuide() {
  const [query, setQuery] = useState("");
  const [activeOperator, setActiveOperator] = useState<Filter>("Tümü");

  const filtered = COUNTRIES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.popularCity.toLowerCase().includes(query.toLowerCase());
    const matchesOperator =
      activeOperator === "Tümü" || c.centerOperator === activeOperator;
    return matchesSearch && matchesOperator;
  });

  // Count per operator for badges
  const counts = COUNTRIES.reduce<Record<string, number>>((acc, c) => {
    acc[c.centerOperator] = (acc[c.centerOperator] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section id="guide" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Ülke Rehberi</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Schengen Ülkeleri
                <br />
                <span className="italic">Başvuru Rehberi</span>
              </h2>
              <p className="text-white/35 font-light text-sm mt-3 max-w-md leading-relaxed">
                {COUNTRIES.length} ülke · 5 yetkili merkez · VFS Global, iDATA, Kosmos, BLS, AS Visa Solutions
              </p>
            </div>

            {/* Search */}
            <div className="relative shrink-0 w-full md:w-64">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Ülke ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/8 rounded-full pl-9 pr-4 py-2.5 text-sm text-white/60 font-light placeholder-white/20 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Operator filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {ALL_OPERATORS.map((op) => {
            const isActive = activeOperator === op;
            const count = op === "Tümü" ? COUNTRIES.length : (counts[op] ?? 0);
            const style = op !== "Tümü" ? OPERATOR_STYLE[op as CenterOperator] : null;

            return (
              <button
                key={op}
                onClick={() => setActiveOperator(op)}
                className={`inline-flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5 border transition-all duration-150 ${
                  isActive
                    ? style
                      ? style.filterActive
                      : "bg-white/10 border-white/20 text-white/70"
                    : "bg-white/[0.03] border-white/8 text-white/30 hover:border-white/15 hover:text-white/50"
                }`}
              >
                {style && isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                )}
                {op === "Tümü" ? "Tümü" : OPERATOR_LABELS[op as CenterOperator]}
                <span className={`text-[10px] ${isActive ? "opacity-70" : "opacity-40"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* 2026 General Tips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={13} className="text-white/25" />
            <span className="text-[10px] text-white/25 uppercase tracking-wider font-light">2026 Genel İpuçları</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GENERAL_TIPS_2026.map((t, i) => (
              <div key={i} className="bg-[#1c1c1c] border border-white/5 rounded-[10px] p-4 flex gap-3 hover:border-white/10 transition-colors">
                <span className="text-xl shrink-0 mt-0.5">{t.emoji}</span>
                <div>
                  <p className="text-xs font-medium text-white/65 mb-1">{t.title}</p>
                  <p className="text-[11px] text-white/30 font-light leading-relaxed">{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start gap-2.5 bg-white/[0.02] border border-white/6 rounded-lg px-4 py-3 mb-8 max-w-2xl"
        >
          <AlertCircle size={13} className="text-white/25 shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/25 font-light leading-relaxed">
            Bu rehberdeki bilgiler genel bilgilendirme amaçlıdır. Vize kuralları sık değiştiğinden
            başvuru öncesi mutlaka ilgili konsolosluğun veya yetkili vize merkezinin resmi sitesini kontrol edin.
          </p>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/8 rounded-[10px]">
            <p className="text-white/20 text-sm font-light">"{query}" için sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((country, i) => (
              <CountryCard key={country.code} country={country} index={i} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-[10px] text-white/12 font-light"
        >
          {filtered.length} ülke gösteriliyor · İçerik elle küratörlenmiştir · Resmi kaynaklardan doğrulayın
        </motion.p>
      </div>
    </section>
  );
}
