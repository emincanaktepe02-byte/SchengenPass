"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  MapPin,
  Clock,
  TrendingUp,
  Utensils,
  Camera,
  Lightbulb,
  CreditCard,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import type { CountryPageData, Attraction } from "@/lib/countryPages";

const ATTR_ICON: Record<Attraction["type"], React.ReactNode> = {
  tarihi: <Camera size={12} />,
  müze: <Star size={12} />,
  doğa: <MapPin size={12} />,
  yemek: <Utensils size={12} />,
  alışveriş: <Star size={12} />,
  eğlence: <Star size={12} />,
};

const ATTR_COLOR: Record<Attraction["type"], string> = {
  tarihi: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  müze: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  doğa: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  yemek: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  alışveriş: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  eğlence: "text-sky-400 bg-sky-400/10 border-sky-400/20",
};

const DIFF_CONFIG = {
  Kolay: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/25",
    bars: [true, false, false],
    barColor: "bg-emerald-400",
  },
  Orta: {
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/25",
    bars: [true, true, false],
    barColor: "bg-yellow-400",
  },
  Zorlu: {
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/25",
    bars: [true, true, true],
    barColor: "bg-red-400",
  },
};

type Tab = "seyahat" | "vize";

export default function CountryPageClient({
  country,
  prevCountry,
  nextCountry,
}: {
  country: CountryPageData;
  prevCountry: CountryPageData | null;
  nextCountry: CountryPageData | null;
}) {
  const [tab, setTab] = useState<Tab>("seyahat");
  const diff = DIFF_CONFIG[country.visa.difficulty];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "70vh", minHeight: 480 }}>
        <Image
          src={country.heroImage}
          alt={country.heroCity}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-end pb-16 px-6 max-w-7xl mx-auto"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#F0EBE0]/30 font-light mb-6">
            <Link href="/" className="hover:text-[#F0EBE0]/60 transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/ulkeler" className="hover:text-[#F0EBE0]/60 transition-colors">
              Ülkeler
            </Link>
            <span>/</span>
            <span className="text-[#F0EBE0]/55">{country.name}</span>
          </div>

          <div className="flex items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl leading-none">{country.flag}</span>
                <div>
                  <p className="text-xs text-[#F0EBE0]/35 uppercase tracking-widest font-light">
                    {country.heroCity}
                  </p>
                  <p className="text-sm text-[#F0EBE0]/50 font-light">{country.tagline}</p>
                </div>
              </div>

              <h1
                className="text-[clamp(2.6rem,6vw,5rem)] font-light text-[#F0EBE0] leading-[1.06] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {country.name}
              </h1>
            </div>

            {/* Quick visa badge */}
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${diff.bg} ${diff.color} font-medium`}>
                <span className="flex gap-0.5">
                  {diff.bars.map((filled, i) => (
                    <span
                      key={i}
                      className={`block w-1 h-3 rounded-[2px] ${filled ? diff.barColor : "bg-white/15"}`}
                    />
                  ))}
                </span>
                {country.visa.difficulty}
              </div>
              <p className="text-xs text-[#F0EBE0]/30 font-light">
                Vize Güçlüğü
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TAB SWITCHER ── */}
      <div className="sticky top-16 z-30 bg-[#111111]/95 backdrop-blur-md border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-2">
          {(["seyahat", "vize"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-2.5 text-sm rounded-full font-light transition-all ${
                tab === t
                  ? "text-[#F0EBE0]/90"
                  : "text-[#F0EBE0]/35 hover:text-[#F0EBE0]/60"
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-full bg-white/8"
                  transition={{ duration: 0.25 }}
                />
              )}
              <span className="relative z-10">
                {t === "seyahat" ? "✈ Seyahat Rehberi" : "📋 Vize Rehberi"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {tab === "seyahat" ? (
            <TravelTab key="travel" country={country} />
          ) : (
            <VisaTab key="visa" country={country} diff={diff} />
          )}
        </AnimatePresence>
      </div>

      {/* ── COUNTRY NAVIGATION ── */}
      <div className="border-t border-white/6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between gap-4">
          {prevCountry ? (
            <Link
              href={`/ulkeler/${prevCountry.slug}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#D4A843]/30 transition-all">
                <ChevronLeft size={16} className="text-[#F0EBE0]/35 group-hover:text-[#D4A843]" />
              </div>
              <div>
                <p className="text-xs text-[#F0EBE0]/25 font-light">Önceki</p>
                <p className="text-sm text-[#F0EBE0]/65 group-hover:text-[#F0EBE0] transition-colors">
                  {prevCountry.flag} {prevCountry.name}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/ulkeler"
            className="text-xs text-[#F0EBE0]/30 hover:text-[#F0EBE0]/55 font-light transition-colors"
          >
            Tüm Ülkeler
          </Link>

          {nextCountry ? (
            <Link
              href={`/ulkeler/${nextCountry.slug}`}
              className="flex items-center gap-3 text-right group"
            >
              <div>
                <p className="text-xs text-[#F0EBE0]/25 font-light">Sonraki</p>
                <p className="text-sm text-[#F0EBE0]/65 group-hover:text-[#F0EBE0] transition-colors">
                  {nextCountry.flag} {nextCountry.name}
                </p>
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#D4A843]/30 transition-all">
                <ChevronRight size={16} className="text-[#F0EBE0]/35 group-hover:text-[#D4A843]" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}

// ── Travel Tab ────────────────────────────────────────────────────────────────

function TravelTab({ country }: { country: CountryPageData }) {
  const t = country.travel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Intro */}
      <p className="text-[#F0EBE0]/55 text-base font-light leading-relaxed max-w-3xl">
        {country.intro}
      </p>

      {/* Quick info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Para Birimi", value: t.currency, icon: "💶" },
          { label: "Dil", value: t.language.split("—")[0].trim(), icon: "🗣️" },
          { label: "En İyi Dönem", value: t.bestTime.split(":")[0], icon: "📅" },
          { label: "Bütçe", value: t.budget.split(".")[0], icon: "💰" },
        ].map((item) => (
          <div key={item.label} className="card p-4">
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <p className="text-xs text-[#F0EBE0]/30 uppercase tracking-wider mb-1 font-light">
              {item.label}
            </p>
            <p className="text-sm text-[#F0EBE0]/70 font-medium leading-snug">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Best time expanded */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📅</span>
          <h3 className="text-base font-semibold text-[#F0EBE0]/80">
            En İyi Zaman — Ne Zaman Gidilmeli?
          </h3>
        </div>
        <p className="text-sm text-[#F0EBE0]/50 font-light leading-relaxed">{t.bestTime}</p>
      </div>

      {/* Must See */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Camera size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Görülmesi Gereken Yerler
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.mustSee.map((attr) => (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-5 hover:border-[#D4A843]/20 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium ${ATTR_COLOR[attr.type]}`}
                >
                  {ATTR_ICON[attr.type]}
                  {attr.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#F0EBE0]/80 mb-2">{attr.name}</h4>
              <p className="text-xs text-[#F0EBE0]/40 font-light leading-relaxed">
                {attr.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Local Food */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Utensils size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Yerel Mutfak
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {t.localFood.map((food) => (
            <div key={food.name} className="card p-4 hover:border-[#D4A843]/15 transition-all">
              <p className="text-sm font-semibold text-[#F0EBE0]/75 mb-1">{food.name}</p>
              <p className="text-xs text-[#F0EBE0]/38 font-light leading-relaxed">
                {food.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🚆</span>
          <h3 className="text-base font-semibold text-[#F0EBE0]/80">Ulaşım</h3>
        </div>
        <p className="text-sm text-[#F0EBE0]/50 font-light leading-relaxed">{t.transport}</p>
      </div>

      {/* Practical Tips */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Pratik İpuçları
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {t.practicalTips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-[#1A1A1A] border border-white/6 rounded-xl p-4 hover:border-[#D4A843]/15 transition-all"
            >
              <CheckCircle2 size={12} className="text-[#D4A843]/50 shrink-0 mt-0.5" />
              <p className="text-xs text-[#F0EBE0]/48 font-light leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Visa Tab ──────────────────────────────────────────────────────────────────

function VisaTab({
  country,
  diff,
}: {
  country: CountryPageData;
  diff: (typeof DIFF_CONFIG)[keyof typeof DIFF_CONFIG];
}) {
  const v = country.visa;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Approval rate */}
        <div className="card p-5 flex flex-col gap-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <p className="text-2xl font-bold text-emerald-400">%{v.approvalRate}</p>
          <p className="text-xs text-[#F0EBE0]/30 font-light">2024 Onay Oranı</p>
        </div>
        {/* Difficulty */}
        <div className="card p-5 flex flex-col gap-2">
          <div className="flex gap-0.5">
            {diff.bars.map((filled, i) => (
              <span key={i} className={`block w-1.5 h-4 rounded-sm ${filled ? diff.barColor : "bg-white/10"}`} />
            ))}
          </div>
          <p className={`text-2xl font-bold ${diff.color}`}>{v.difficulty}</p>
          <p className="text-xs text-[#F0EBE0]/30 font-light">Vize Güçlüğü</p>
        </div>
        {/* Processing */}
        <div className="card p-5 flex flex-col gap-2">
          <Clock size={16} className="text-[#D4A843]/70" />
          <p className="text-base font-semibold text-[#F0EBE0]/75 leading-tight">{v.processingTime}</p>
          <p className="text-xs text-[#F0EBE0]/30 font-light">İşlem Süresi</p>
        </div>
        {/* CASCADE */}
        <div className="card p-5 flex flex-col gap-2">
          <Star size={16} className={v.cascadeFriendly ? "text-[#D4A843]" : "text-white/20"} />
          <p className={`text-base font-semibold ${v.cascadeFriendly ? "text-[#D4A843]" : "text-[#F0EBE0]/30"} leading-tight`}>
            {v.cascadeFriendly ? "CASCADE Uyumlu" : "CASCADE Değil"}
          </p>
          <p className="text-xs text-[#F0EBE0]/30 font-light">Vize Kademeleme</p>
        </div>
      </div>

      {/* Wait time */}
      <div className="flex items-start gap-3 bg-[#1E1A10] border border-[#D4A843]/15 rounded-xl px-5 py-4">
        <AlertCircle size={14} className="text-[#D4A843]/50 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[#D4A843]/80 mb-0.5">Randevu Bekleme Süresi</p>
          <p className="text-sm text-[#F0EBE0]/50 font-light">{v.avgWait}</p>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Gerekli Belgeler
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {v.requirements.map((req, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 bg-[#1A1A1A] border border-white/6 rounded-xl px-4 py-3"
            >
              <CheckCircle2 size={12} className="text-emerald-400/50 shrink-0 mt-0.5" />
              <span className="text-xs text-[#F0EBE0]/55 font-light leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bank requirements */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={14} className="text-[#D4A843]/60" />
          <h3 className="text-sm font-semibold text-[#F0EBE0]/75">Banka & Finansal Gereksinimler</h3>
        </div>
        <p className="text-sm text-[#F0EBE0]/50 font-light leading-relaxed">{v.bankRequirements}</p>
      </div>

      {/* Tips */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Başvuru İpuçları
          </h3>
        </div>
        <div className="space-y-2.5">
          {v.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#1A1A1A] border border-white/6 rounded-xl px-4 py-3.5">
              <CheckCircle2 size={12} className="text-[#D4A843]/50 shrink-0 mt-0.5" />
              <p className="text-sm text-[#F0EBE0]/50 font-light leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection reasons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <XCircle size={14} className="text-red-400/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Red Riskleri & Çözümleri
          </h3>
        </div>
        <div className="space-y-2.5">
          {v.rejectionReasons.map((reason, i) => {
            const [risk, sol] = reason.includes("→") ? reason.split("→") : [reason, null];
            return (
              <div key={i} className="flex items-start gap-3 bg-[#1A1A1A] border border-white/6 rounded-xl px-4 py-3.5">
                <XCircle size={12} className="text-red-400/50 shrink-0 mt-0.5" />
                <p className="text-sm font-light leading-relaxed">
                  <span className="text-[#F0EBE0]/65">{risk.trim()}</span>
                  {sol && (
                    <>
                      <span className="text-[#F0EBE0]/20 mx-1.5">→</span>
                      <span className="text-emerald-400/70">{sol.trim()}</span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={14} className="text-[#D4A843]/60" />
          <h3 className="text-[11px] text-[#F0EBE0]/30 uppercase tracking-wider font-medium">
            Başvuru Merkezleri
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {v.centers.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/8 rounded-full px-3.5 py-1.5 text-[#F0EBE0]/50"
            >
              <MapPin size={9} className="text-[#D4A843]/40" />
              {c}
            </span>
          ))}
        </div>
        <a
          href={v.operatorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#D4A843]/60 hover:text-[#D4A843] border border-[#D4A843]/20 hover:border-[#D4A843]/40 rounded-full px-5 py-2.5 transition-all"
        >
          {v.operator} — Resmi Başvuru Sayfası
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 bg-[#0F0F0F] border border-white/6 rounded-xl px-5 py-4">
        <AlertCircle size={13} className="text-[#F0EBE0]/20 shrink-0 mt-0.5" />
        <p className="text-xs text-[#F0EBE0]/30 font-light leading-relaxed">
          Bu rehberdeki bilgiler genel bilgilendirme amaçlıdır. Vize kuralları değişkendir —
          başvuru öncesi mutlaka {v.operator} ve ilgili konsolosluğun resmi sitesini kontrol edin.
        </p>
      </div>
    </motion.div>
  );
}
