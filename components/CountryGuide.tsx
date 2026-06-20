"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, AlertCircle, ExternalLink, Search,
  CheckCircle2, XCircle, CreditCard, MapPin,
  ArrowRight, Star, Lightbulb, ShieldAlert,
} from "lucide-react";
import { COUNTRIES } from "@/lib/data";
import type { CenterOperator } from "@/lib/types";

// ── Operator styling (dark theme) ────────────────────────────────────────────

const OPERATOR_STYLE: Record<CenterOperator, {
  badgeBg: string; badgeText: string; dot: string;
}> = {
  "VFS Global":        { badgeBg: "bg-slate-800/60 border border-slate-700/40",   badgeText: "text-slate-300/70",    dot: "bg-slate-400/60"  },
  "iData":             { badgeBg: "bg-violet-900/40 border border-violet-700/30", badgeText: "text-violet-300/70",  dot: "bg-violet-400"    },
  "Kosmos":            { badgeBg: "bg-sky-900/40 border border-sky-700/30",       badgeText: "text-sky-300/70",     dot: "bg-sky-400"       },
  "BLS International": { badgeBg: "bg-orange-900/30 border border-orange-700/25", badgeText: "text-orange-300/70", dot: "bg-orange-400"    },
  "AS Visa Solutions": { badgeBg: "bg-emerald-900/30 border border-emerald-700/25",badgeText: "text-emerald-300/70",dot: "bg-emerald-400"  },
  "Konsolosluk":       { badgeBg: "bg-[#2A2010] border border-[#D4A843]/15",      badgeText: "text-[#D4A843]/60",  dot: "bg-[#D4A843]/60"  },
};

const OPERATOR_LABELS: Record<CenterOperator, string> = {
  "VFS Global": "VFS Global", "iData": "iDATA", "Kosmos": "Kosmos Vize",
  "BLS International": "BLS International", "AS Visa Solutions": "AS Visa Solutions", "Konsolosluk": "Konsolosluk",
};

function getDifficulty(avgWait: string) {
  const first = parseInt(avgWait.match(/\d+/)?.[0] ?? "30");
  if (first <= 20) return { label: "Kolay", color: "text-emerald-400", barClass: "bg-emerald-400",  bars: [true, false, false] };
  if (first <= 40) return { label: "Orta",  color: "text-yellow-400",  barClass: "bg-yellow-400",   bars: [true, true,  false] };
  return              { label: "Zorlu", color: "text-red-400",    barClass: "bg-red-400",      bars: [true, true,  true ] };
}

// ── Country card ──────────────────────────────────────────────────────────────

function CountryCard({ country, index }: { country: typeof COUNTRIES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const style = OPERATOR_STYLE[country.centerOperator];
  const diff  = getDifficulty(country.avgWait);
  const opLabel = OPERATOR_LABELS[country.centerOperator];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="card hover:border-[#D4A843]/25 transition-all overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full text-left relative">
        {/* Big decorative flag */}
        <span className="absolute right-4 bottom-2 text-8xl leading-none select-none pointer-events-none opacity-[0.07]">
          {country.flag}
        </span>

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-4xl leading-none shrink-0">{country.flag}</span>
            <div>
              <h3 className="text-[17px] font-semibold text-[#F0EBE0]/90 leading-tight">{country.name}</h3>
              <p className="text-xs text-[#F0EBE0]/30 font-light mt-0.5">{country.popularCity}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`inline-flex items-center gap-1.5 text-[11px] rounded-full px-2.5 py-1 font-medium ${style.badgeBg} ${style.badgeText}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
              {opLabel}
            </span>
            <span className="inline-flex items-center text-[11px] bg-white/5 border border-white/8 rounded-full px-2.5 py-1 text-[#F0EBE0]/35">
              {country.processingTime}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-[11px] rounded-full px-2.5 py-1 bg-white/4 border border-white/6 ${diff.color}`}>
              <span className="flex gap-0.5">
                {diff.bars.map((filled, i) => (
                  <span key={i} className={`block w-1 h-2.5 rounded-[2px] ${filled ? diff.barClass : "bg-white/10"}`} />
                ))}
              </span>
              {diff.label}
            </span>
            {country.cascadeFriendly && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-[#D4A843]/10 border border-[#D4A843]/20 rounded-full px-2.5 py-1 text-[#D4A843]/75">
                <Star size={9} />CASCADE
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 right-5 z-10">
          <ChevronDown size={15} className={`text-[#F0EBE0]/20 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 space-y-5 border-t border-white/5 bg-[#0F0F0F]">
              {/* Documents */}
              <div>
                <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">📋 Gerekli Belgeler</p>
                <div className="flex flex-wrap gap-2">
                  {country.requirements.map((req, i) => (
                    <span key={i} className="text-[11px] bg-white/5 border border-white/8 rounded-full px-3 py-1 text-[#F0EBE0]/50">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bank */}
              <div>
                <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard size={10} />Banka &amp; Finansal Gereksinimler
                </p>
                <p className="text-[14px] text-[#F0EBE0]/50 font-light leading-relaxed">{country.bankRequirements}</p>
              </div>

              {/* Rejection risks */}
              <div>
                <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert size={10} />Red Riskleri &amp; Çözümleri
                </p>
                <ul className="space-y-2">
                  {country.rejectionReasons.map((reason, i) => {
                    const [risk, sol] = reason.includes("→") ? reason.split("→") : [reason, null];
                    return (
                      <li key={i} className="flex items-start gap-2.5">
                        <XCircle size={11} className="text-red-400/50 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-[#F0EBE0]/40 font-light leading-relaxed">
                          <span className="text-[#F0EBE0]/60">{risk.trim()}</span>
                          {sol && (
                            <><ArrowRight size={10} className="inline mx-1 text-[#F0EBE0]/15" />
                            <span className="text-emerald-400/70">{sol.trim()}</span></>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Tips */}
              {country.tips.length > 0 && (
                <div>
                  <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Lightbulb size={10} />İpuçları
                  </p>
                  <ul className="space-y-2">
                    {country.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-[#F0EBE0]/40 font-light leading-relaxed">
                        <CheckCircle2 size={11} className="text-[#D4A843]/50 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Centers */}
              <div>
                <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <MapPin size={10} />Başvuru Merkezleri &amp; Yetki Alanları
                </p>
                <div className="flex flex-wrap gap-2">
                  {country.centers.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-[12px] bg-white/5 border border-white/8 rounded-full px-3 py-1.5 text-[#F0EBE0]/45">
                      <MapPin size={9} className="text-[#D4A843]/40 shrink-0" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official link */}
              <div className="flex items-start gap-2.5 bg-[#1E1A10] border border-[#D4A843]/12 rounded-xl px-4 py-3.5">
                <AlertCircle size={13} className="text-[#D4A843]/40 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-[#F0EBE0]/35 font-light leading-relaxed">
                    Bilgiler değişebilir. Başvuru öncesi resmi kaynaktan doğrulayın.
                  </p>
                  <a href={country.centerUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 text-[11px] mt-2 text-[#D4A843]/55 hover:text-[#D4A843] underline underline-offset-2 transition-colors">
                    {opLabel} — Resmi Başvuru Sayfası <ExternalLink size={9} />
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

// ── Approval Rates ────────────────────────────────────────────────────────────

const APPROVAL_DATA = [
  { flag: "🇪🇪", name: "Estonya",    rate: 94, rej: 6,  op: "VFS Global",        note: "2024'te en yüksek onay oranı; ilk başvuru için ideal, randevu bulma çok kolay" },
  { flag: "🇱🇻", name: "Letonya",    rate: 92, rej: 8,  op: "VFS Global",        note: "Randevu bekleme süresi kısa; belge incelemesi tutarlı ve öngörülü" },
  { flag: "🇱🇹", name: "Litvanya",   rate: 91, rej: 9,  op: "VFS Global",        note: "İlk başvuru için güçlü alternatif; 6 aylık banka özeti istenir" },
  { flag: "🇲🇹", name: "Malta",      rate: 90, rej: 10, op: "VFS Global",        note: "7-10 iş gününde sonuç; belge esnekliği yüksek, 2024'te Türkiye'den %90 onay" },
  { flag: "🇸🇮", name: "Slovenya",   rate: 88, rej: 12, op: "VFS Global",        note: "Eksik belgede doğrudan red yerine açıklama talep eder; sürpriz düşük red oranı" },
  { flag: "🇭🇺", name: "Macaristan", rate: 88, rej: 12, op: "AS Visa Solutions", note: "AS Visa çok kısa randevu bekleme; 2024 istatistiklerinde Türkiye'den %88 onay" },
  { flag: "🇸🇰", name: "Slovakya",   rate: 87, rej: 13, op: "BLS International", note: "BLS üzerinden randevu kolaylığı yüksek; Viyana turlarıyla birlikte planlanabilir" },
  { flag: "🇬🇷", name: "Yunanistan", rate: 86, rej: 14, op: "Kosmos Vize",       note: "Türkiye'den 1,5 saat; Kosmos üzerinden 3-7 günde sonuç, %86 onay (2024)" },
  { flag: "🇫🇮", name: "Finlandiya", rate: 85, rej: 15, op: "VFS Global",        note: "2024'te onay oranı arttı; İstanbul, Ankara, İzmir ve Antalya'da merkezi var" },
  { flag: "🇵🇹", name: "Portekiz",   rate: 83, rej: 17, op: "VFS Global",        note: "Batı Avrupa'nın en esnek vize politikası; CASCADE'i güvenilir uygular" },
  { flag: "🇨🇿", name: "Çekya",      rate: 82, rej: 18, op: "VFS Global",        note: "VFS üzerinden makul randevu süresi; Prag turizmiyle birlikte işlem hızlı" },
  { flag: "🇦🇹", name: "Avusturya",  rate: 81, rej: 19, op: "VFS Global",        note: "CASCADE dostu; İstanbul, Ankara, İzmir'de merkezi mevcut" },
  { flag: "🇩🇪", name: "Almanya",    rate: 79, rej: 21, op: "iDATA",             note: "Titiz belge incelemesi; CASCADE'i en tutarlı uygulayan ülke — 2. başvuruda 1 yıl çok girişli" },
  { flag: "🇳🇱", name: "Hollanda",   rate: 77, rej: 23, op: "VFS Global",        note: "2024'te %77 onay; banka belgesi güçlü olmalı, CASCADE uyumu iyi" },
  { flag: "🇮🇹", name: "İtalya",     rate: 76, rej: 24, op: "iDATA",             note: "iDATA üzerinden başvuru; randevu yoğun, yaz öncesi en az 3 ay önceden harekete geçin" },
  { flag: "🇪🇸", name: "İspanya",    rate: 74, rej: 26, op: "BLS International", note: "BLS; yaz sezonu randevusu en zorlu ülkelerden — 2-3 ay önceden plan yapın" },
  { flag: "🇫🇷", name: "Fransa",     rate: 72, rej: 28, op: "VFS Global",        note: "Red oranı yüksek fakat CASCADE kuralını en tutarlı uygulayan 2. ülke" },
  { flag: "🇧🇪", name: "Belçika",    rate: 68, rej: 32, op: "VFS Global",        note: "2024'te Türkiye'den en yüksek red oranı; güçlü bağ belgesi ve düzenli banka geçmişi şart" },
];

function ApprovalRatesSection() {
  const [showAllRates, setShowAllRates] = useState(false);
  const RATES_INITIAL = 6;
  const visible = showAllRates ? APPROVAL_DATA : APPROVAL_DATA.slice(0, RATES_INITIAL);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="mb-14 card overflow-hidden">
      <div className="border-b border-white/5 px-8 py-6">
        <p className="badge badge-gold mb-4">2024 AB Schengen İstatistikleri</p>
        <h3 className="serif text-2xl md:text-3xl font-light text-[#F0EBE0] leading-tight mb-2">
          Onay &amp; Red Oranları<em className="italic ml-2 opacity-50">— Ülkelere Göre</em>
        </h3>
        <p className="text-[#F0EBE0]/45 font-light text-[15px] leading-relaxed max-w-2xl">
          Türkiye&apos;den yapılan Schengen vize başvurularında 2024 yılı AB verilerine göre güncel onay/red oranları.
          Red oranı yüksek ülkeler CASCADE&apos;i en tutarlı uygulayan ülkelerdir.
        </p>
      </div>
      <div className="p-6 md:p-8">
        <div className="space-y-3">
          {visible.map((item, i) => (
            <motion.div key={item.name}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: Math.min(i * 0.04, 0.3) }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#0F0F0F] border border-white/5 rounded-xl px-4 py-3 hover:border-[#D4A843]/15 transition-all"
            >
              <div className="flex items-center gap-2.5 shrink-0 w-36">
                <span className="text-2xl">{item.flag}</span>
                <div>
                  <p className="text-sm font-medium text-[#F0EBE0]/75">{item.name}</p>
                  <p className="text-[10px] text-[#F0EBE0]/25">{item.op}</p>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                      style={{ width: `${item.rate}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 shrink-0 w-10 text-right">%{item.rate}</span>
                  <span className="text-xs text-red-400/50 shrink-0 w-10">-%{item.rej}</span>
                </div>
                <p className="text-[12px] text-[#F0EBE0]/35 font-light leading-relaxed">{item.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {!showAllRates && APPROVAL_DATA.length > RATES_INITIAL && (
          <div className="flex justify-center mt-5">
            <button onClick={() => setShowAllRates(true)}
              className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-2.5 rounded-full transition-all">
              Daha Fazla Göster
              <span className="text-xs text-[#D4A843]/45 font-medium">+{APPROVAL_DATA.length - RATES_INITIAL} ülke</span>
            </button>
          </div>
        )}
        {showAllRates && (
          <div className="flex justify-center mt-5">
            <button onClick={() => setShowAllRates(false)}
              className="text-sm text-[#F0EBE0]/22 hover:text-[#F0EBE0]/50 font-light transition-colors">
              Daha Az Göster ↑
            </button>
          </div>
        )}
        <p className="mt-4 text-[11px] text-[#F0EBE0]/18 text-center font-light">
          Kaynak: AB Schengen İstatistikleri 2024 · Değerler Türkiye kaynaklı başvurular için yaklaşıktır
        </p>
      </div>
    </motion.div>
  );
}

// ── CASCADE ───────────────────────────────────────────────────────────────────

const CASCADE_STEPS = [
  { step: "01", label: "İlk Başvuru",          sub: "Tek / çift girişli, seyahat süresi kadar",   color: "text-[#F0EBE0]/40" },
  { step: "02", label: "1 Yıl Çok Girişli",    sub: "1. vizeni kurallara uygun kullandıysan",      color: "text-sky-400"      },
  { step: "03", label: "2 Yıl Çok Girişli",    sub: "1 yıllık vizeni kurallara uygun kullandıysan",color: "text-violet-400"   },
  { step: "04", label: "5 Yıl Çok Girişli",    sub: "2 yıllık vizeni kurallara uygun kullandıysan",color: "text-[#D4A843]"    },
];

const CASCADE_RULES = [
  "180 gün içinde en fazla 90 gün Schengen&apos;de kalabilirsin",
  "Vize bitiş tarihini asla aşma — tek ihlal CASCADE&apos;i sıfırlar",
  "Her seyahatten sonra çıkış belgelerini (boarding pass, damga) sakla",
  "İkinci başvuruda 'çok girişli vize talep ediyorum' yaz ve önceki vizeni göster",
  "Pasaport değişirse eski pasaportunu mutlaka yanında taşı",
];

const CASCADE_COUNTRIES = [
  { flag: "🇩🇪", name: "Almanya",    note: "iDATA — 2. başvuruda 1 yıl çok girişli; en tutarlı CASCADE uygulayıcısı" },
  { flag: "🇳🇱", name: "Hollanda",   note: "VFS — CASCADE kuralına tam uyumlu; 3. başvuruda 2 yıl" },
  { flag: "🇫🇷", name: "Fransa",     note: "VFS — düzenli seyahatlerde CASCADE basamağını otomatik uygular" },
  { flag: "🇮🇹", name: "İtalya",     note: "iDATA — kademeli yükseltme sistemini aktif kullanır" },
  { flag: "🇦🇹", name: "Avusturya",  note: "VFS — çok girişli konusunda esnek; CASCADE dostu" },
  { flag: "🇵🇹", name: "Portekiz",   note: "VFS — en esnek Schengen politikası; düzenli seyahate çok girişli" },
];

function CascadeSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="mb-14 card overflow-hidden">
      <div className="border-b border-white/5 px-8 py-6">
        <p className="badge badge-gold mb-4">AB Vize Kodu Madde 24/2 · 2024–2026</p>
        <h3 className="serif text-2xl md:text-3xl font-light text-[#F0EBE0] leading-tight mb-2">
          CASCADE Kuralı<em className="italic ml-2 opacity-50">— Vize Kademeleme Sistemi</em>
        </h3>
        <p className="text-[#F0EBE0]/45 font-light text-[15px] leading-relaxed max-w-2xl">
          Schengen vizeni kurallara uygun her kullanımda bir üst basamağa geçersin.
          Doğru kullanım = uzun süreli çok girişli vize.
        </p>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        {/* Steps */}
        <div>
          <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-5">Kademeleme Basamakları</p>
          <div className="space-y-4">
            {CASCADE_STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <span className={`text-base font-mono font-bold ${s.color}`}>{s.step}</span>
                  {i < CASCADE_STEPS.length - 1 && <div className="w-px h-6 bg-white/6 mt-1.5" />}
                </div>
                <div className="pb-1">
                  <p className={`text-base font-semibold ${s.color} leading-tight`}>{s.label}</p>
                  <p className="text-xs text-[#F0EBE0]/30 font-light mt-1">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-4">CASCADE&apos;i Koruyan Prensipler</p>
            <ul className="space-y-2.5">
              {CASCADE_RULES.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={12} className="text-emerald-400/50 shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#F0EBE0]/45 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: rule }} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-4">
              <Star size={9} className="inline mr-1 text-[#D4A843]" />
              CASCADE İçin En Uyumlu Ülkeler
            </p>
            <div className="space-y-2.5">
              {CASCADE_COUNTRIES.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-xl shrink-0 leading-none mt-0.5">{c.flag}</span>
                  <div>
                    <span className="text-sm text-[#F0EBE0]/65 font-medium">{c.name}</span>
                    <p className="text-[11px] text-[#F0EBE0]/28 font-light mt-0.5">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── First-timer section ───────────────────────────────────────────────────────

const FIRST_TIME_EASIEST = [
  { flag: "🇬🇷", name: "Yunanistan", why: "Kosmos Vize, 3-7 iş günü, hızlı randevu" },
  { flag: "🇲🇹", name: "Malta",      why: "VFS, 7-10 iş günü, esnek belgeler"        },
  { flag: "🇪🇪", name: "Estonya",    why: "VFS, 5-10 iş günü, düşük red oranı"       },
  { flag: "🇱🇻", name: "Letonya",    why: "VFS, 7-10 iş günü, kolay randevu"         },
  { flag: "🇸🇰", name: "Slovakya",   why: "BLS, 7-10 iş günü, az kuyruk"             },
  { flag: "🇭🇺", name: "Macaristan", why: "AS Visa, 7-10 iş günü, uygun maliyet"     },
];

const CHECKLIST = [
  { ok: true,  item: "Pasaport — seyahat sonrası en az 3 ay geçerli" },
  { ok: true,  item: "Son 3-6 aylık banka hesap özeti (ani büyük yatırım YOK)" },
  { ok: true,  item: "Minimum bakiye: günlük 50-100€ × gün + konaklama + bilet" },
  { ok: true,  item: "Aylık düzenli gelir görünür olmalı (maaş/fatura)" },
  { ok: true,  item: "Otel/Airbnb rezervasyonu — kesinleştirilmiş (iade edilebilir)" },
  { ok: true,  item: "Uçuş rezervasyonu — onaylı (bilet zorunlu değil, rezervasyon yeterli)" },
  { ok: true,  item: "Seyahat sigortası — en az 30.000€ teminat, tüm Schengen geçerli" },
  { ok: true,  item: "Türkiye bağ belgesi: iş sözleşmesi + tapu/kira sözleşmesi" },
  { ok: false, item: "Başvurudan hemen önce bankaya büyük para yatırma" },
  { ok: false, item: "Tatil günleri için belirsiz seyahat planı sunma" },
  { ok: false, item: "Eksik belgeyle randevu iptalini bekle ve düzelt" },
];

function FirstTimerSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="mb-14 grid md:grid-cols-2 gap-6">
      {/* Recommended countries */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <p className="badge badge-gold mb-3">İlk Schengen Başvurusu</p>
          <h3 className="text-xl font-semibold text-[#F0EBE0]/85 mb-1">Nereden Başlamalı?</h3>
          <p className="text-sm text-[#F0EBE0]/35 font-light leading-relaxed">
            İlk Schengen için randevu kolaylığı, hızlı işlem ve düşük red oranına sahip ülkeleri tercih et.
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-4">Önerilen Ülkeler (Kolaydan Zorluya)</p>
            <div className="space-y-3">
              {FIRST_TIME_EASIEST.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{c.flag}</span>
                  <div>
                    <span className="text-sm text-[#F0EBE0]/70 font-medium">{c.name}</span>
                    <p className="text-[11px] text-[#F0EBE0]/30 font-light">{c.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#2A2010] border border-[#D4A843]/15 rounded-xl p-4">
            <p className="text-[12px] text-[#D4A843]/65 font-light leading-relaxed">
              <span className="font-semibold text-[#D4A843]/80">İpucu:</span> İlk vizende hedef ülkende en az
              3-4 gece konak planla. Kısa konaklamalar şüphe uyandırabilir.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <p className="badge mb-3">Belge Kontrol Listesi</p>
          <h3 className="text-xl font-semibold text-[#F0EBE0]/85 mb-1">Eksiksiz Başvuru</h3>
          <p className="text-sm text-[#F0EBE0]/30 font-light">Yeşil = yapmalısın · Kırmızı = yapma</p>
        </div>
        <div className="p-6">
          <ul className="space-y-2.5">
            {CHECKLIST.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5">
                {c.ok
                  ? <CheckCircle2 size={12} className="text-emerald-400/60 shrink-0 mt-0.5" />
                  : <XCircle     size={12} className="text-red-400/50 shrink-0 mt-0.5"    />
                }
                <span className={`text-[12px] font-light leading-relaxed ${c.ok ? "text-[#F0EBE0]/50" : "text-red-400/50"}`}>
                  {c.item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── General Tips 2026 ─────────────────────────────────────────────────────────

const TIPS_2026 = [
  { emoji: "⏰", title: "Boş Randevular Gece Çıkar",       tip: "İptal edilen rezervasyonlar genellikle 08:00–09:00 ve 23:00–00:00'da döner. Bu saatlerde Kosmos, VFS ve iDATA portallarını kontrol et." },
  { emoji: "💶", title: "2026 Vize Maliyeti ~120€",         tip: "2026 itibarıyla vize ücreti 90€ + vize merkezi servis bedeli ~25-35€ = kişi başı yaklaşık 115-125€. Döviz kuru farkını hesaba kat." },
  { emoji: "📅", title: "180 Gün Öncesinden Başvurabilirsin",tip: "Schengen vize başvurusu seyahat tarihinden en fazla 180 gün önce, en geç 15 gün önce yapılabilir. Popüler ülkeler için en erken tarihe randevu al." },
  { emoji: "🇬🇷", title: "En Kolay Randevu: Yunanistan",   tip: "2026'da Yunanistan özellikle Ekim–Mart döneminde randevu bulmayı en kolaylaştıran Schengen ülkesidir. Slovakya, Macaristan ve Estonya da erişilebilir seçenekler." },
  { emoji: "🏙️", title: "Alternatif Şehir Dene",           tip: "İstanbul merkezleri genellikle dolu. Ankara, İzmir, Bursa ve Antalya'daki vize merkezleri çoğunlukla daha erken slot sunar." },
  { emoji: "📋", title: "Güçlü Türkiye Bağı = Düşük Risk", tip: "İş sözleşmesi, tapu/kira, araç ruhsatı, SGK belgesi — bu belgeler vizeyi güçlendirir. Konsolosluk için en önemli belge Türkiye'de ne bıraktığındır." },
];

// ── Main ──────────────────────────────────────────────────────────────────────

const ALL_OPERATORS = ["Tümü", "VFS Global", "iData", "Kosmos", "BLS International", "AS Visa Solutions"] as const;
type Filter = typeof ALL_OPERATORS[number];

export default function CountryGuide() {
  const [query, setQuery]     = useState("");
  const [activeOp, setActiveOp] = useState<Filter>("Tümü");
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE = 6;

  const filtered = COUNTRIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(query.toLowerCase()) || c.popularCity.toLowerCase().includes(query.toLowerCase());
    const matchOp = activeOp === "Tümü" || c.centerOperator === activeOp;
    return matchSearch && matchOp;
  });

  const counts = COUNTRIES.reduce<Record<string, number>>((a, c) => {
    a[c.centerOperator] = (a[c.centerOperator] ?? 0) + 1; return a;
  }, {});

  return (
    <section id="guide" className="section-ink2 py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="badge mb-5">Ülke Rehberi</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
                Schengen Başvuru<br />
                <em className="not-italic italic opacity-60">Rehberi 2026</em>
              </h2>
              <p className="text-[#F0EBE0]/45 font-light text-[16px] mt-4 max-w-lg leading-relaxed">
                {COUNTRIES.length} ülke · CASCADE kuralı · Onay oranları · Banka gereksinimleri · VFS, iDATA, Kosmos, BLS, AS Visa Solutions
              </p>
            </div>
            <div className="relative shrink-0 w-full md:w-72">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F0EBE0]/25" />
              <input type="text" placeholder="Ülke ara..." value={query} onChange={e => setQuery(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/8 rounded-full pl-9 pr-4 py-3 text-sm text-[#F0EBE0]/65 font-light placeholder-[#F0EBE0]/20 outline-none focus:border-[#D4A843]/30 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Approval rates */}
        <ApprovalRatesSection />

        {/* CASCADE */}
        <CascadeSection />

        {/* First timer */}
        <FirstTimerSection />

        {/* 2026 tips */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={14} className="text-[#D4A843]/50" />
            <span className="text-[11px] text-[#F0EBE0]/30 font-medium uppercase tracking-wider">2026 Genel İpuçları</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS_2026.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="card p-6 flex gap-4 hover:border-[#D4A843]/20 transition-all">
                <span className="text-2xl shrink-0 mt-0.5">{t.emoji}</span>
                <div>
                  <p className="text-[14px] font-semibold text-[#F0EBE0]/75 mb-1.5">{t.title}</p>
                  <p className="text-[14px] text-[#F0EBE0]/45 font-light leading-relaxed">{t.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-start gap-3 bg-[#1E1A10] border border-[#D4A843]/12 rounded-xl px-5 py-4 mb-10 max-w-3xl">
          <AlertCircle size={14} className="text-[#D4A843]/40 shrink-0 mt-0.5" />
          <p className="text-[14px] text-[#F0EBE0]/45 font-light leading-relaxed">
            Bu rehberdeki bilgiler genel bilgilendirme amaçlıdır. Vize kuralları değişkendir —
            başvuru öncesi mutlaka ilgili konsolosluğun veya yetkili vize merkezinin resmi sitesini kontrol edin.
          </p>
        </motion.div>

        {/* Operator filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8">
          {ALL_OPERATORS.map(op => {
            const active = op === activeOp;
            const count  = op === "Tümü" ? COUNTRIES.length : (counts[op] ?? 0);
            return (
              <button key={op} onClick={() => setActiveOp(op)}
                className={`inline-flex items-center gap-1.5 text-sm rounded-full px-4 py-2 border transition-all ${
                  active
                    ? "bg-[#D4A843] text-[#111111] border-[#D4A843] font-medium"
                    : "border-white/8 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 hover:border-[#D4A843]/20"
                }`}>
                {op === "Tümü" ? "Tüm Ülkeler" : OPERATOR_LABELS[op as CenterOperator]}
                <span className={`text-xs ${active ? "opacity-60" : "opacity-40"}`}>({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Country grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/8 rounded-2xl">
            <p className="text-[#F0EBE0]/25 text-sm font-light">&ldquo;{query}&rdquo; için sonuç bulunamadı.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.slice(0, showAll ? filtered.length : INITIAL_VISIBLE).map((country, i) => (
                <CountryCard key={country.code} country={country} index={i} />
              ))}
            </div>
            {filtered.length > INITIAL_VISIBLE && !showAll && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="flex justify-center mt-6">
                <button onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 border border-white/10 hover:border-[#D4A843]/30 text-[#F0EBE0]/40 hover:text-[#F0EBE0]/70 text-sm font-light px-7 py-3 rounded-full transition-all">
                  Daha Fazla Göster
                  <span className="text-xs text-[#D4A843]/50 font-medium">
                    +{filtered.length - INITIAL_VISIBLE} ülke
                  </span>
                </button>
              </motion.div>
            )}
            {showAll && (
              <div className="flex justify-center mt-6">
                <button onClick={() => setShowAll(false)}
                  className="text-sm text-[#F0EBE0]/25 hover:text-[#F0EBE0]/50 font-light transition-colors">
                  Daha Az Göster ↑
                </button>
              </div>
            )}
          </>
        )}

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 text-center text-xs text-[#F0EBE0]/18 font-light">
          {filtered.length} ülke gösteriliyor · İçerik elle küratörlenmiş · Resmi kaynaklardan doğrulayın
        </motion.p>
      </div>
    </section>
  );
}
