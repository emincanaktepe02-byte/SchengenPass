"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ChevronLeft, ChevronRight, Upload, X,
  CheckCircle2, Plus, Image as ImageIcon, MapPin,
  ShieldCheck, Bell,
} from "lucide-react";
import { BULLETINS } from "@/lib/appointments-bulletin";

// ── All 26 Schengen countries ─────────────────────────────────────────────────

const SCHENGEN = [
  { code: "DE", name: "Almanya",       flag: "🇩🇪", center: "iDATA",             cities: "İstanbul · Ankara · İzmir · Bursa"                },
  { code: "AT", name: "Avusturya",     flag: "🇦🇹", center: "VFS Global",        cities: "İstanbul · Ankara · İzmir"                        },
  { code: "BE", name: "Belçika",       flag: "🇧🇪", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "CZ", name: "Çekya",         flag: "🇨🇿", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "DK", name: "Danimarka",     flag: "🇩🇰", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "EE", name: "Estonya",       flag: "🇪🇪", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "FI", name: "Finlandiya",    flag: "🇫🇮", center: "VFS Global",        cities: "İstanbul · Ankara · İzmir · Antalya"              },
  { code: "FR", name: "Fransa",        flag: "🇫🇷", center: "VFS Global",        cities: "İst. Şişli · İst. Kadıköy · Ankara · İzmir"       },
  { code: "NL", name: "Hollanda",      flag: "🇳🇱", center: "VFS Global",        cities: "İstanbul · Ankara · İzmir"                        },
  { code: "IS", name: "İzlanda",       flag: "🇮🇸", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "ES", name: "İspanya",       flag: "🇪🇸", center: "BLS International", cities: "İstanbul (İzmir dahil) · Ankara"                  },
  { code: "SE", name: "İsveç",         flag: "🇸🇪", center: "VFS Global",        cities: "İstanbul · Ankara · Antalya"                      },
  { code: "CH", name: "İsviçre",       flag: "🇨🇭", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "IT", name: "İtalya",        flag: "🇮🇹", center: "iDATA",             cities: "İstanbul · Ankara · İzmir"                        },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮", center: "Konsolosluk",       cities: "İstanbul (İsviçre Başkonsolosluğu)"               },
  { code: "LT", name: "Litvanya",      flag: "🇱🇹", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "LV", name: "Letonya",       flag: "🇱🇻", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "LU", name: "Lüksemburg",    flag: "🇱🇺", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "HU", name: "Macaristan",    flag: "🇭🇺", center: "AS Visa Solutions", cities: "İstanbul · Ankara"                                },
  { code: "MT", name: "Malta",         flag: "🇲🇹", center: "VFS Global",        cities: "İstanbul · Ankara · İzmir"                        },
  { code: "NO", name: "Norveç",        flag: "🇳🇴", center: "VFS Global",        cities: "İstanbul · Ankara · İzmir · Antalya"              },
  { code: "PL", name: "Polonya",       flag: "🇵🇱", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "PT", name: "Portekiz",      flag: "🇵🇹", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "SK", name: "Slovakya",      flag: "🇸🇰", center: "BLS International", cities: "İstanbul · Ankara"                                },
  { code: "SI", name: "Slovenya",      flag: "🇸🇮", center: "VFS Global",        cities: "İstanbul · Ankara"                                },
  { code: "GR", name: "Yunanistan",    flag: "🇬🇷", center: "Kosmos Vize",       cities: "İstanbul · Ankara · İzmir"                        },
] as const;

type Country = typeof SCHENGEN[number];

interface SharedAppointment {
  id: string;
  flag: string;
  country: string;
  center: string;
  dates: string[];
  note?: string;
  screenshot?: string;
  submittedAt: string;
}

// ── Calendar helpers ──────────────────────────────────────────────────────────

const TR_MONTHS = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const TR_DAYS   = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function friendlyDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${TR_MONTHS[m - 1]} ${y}`;
}

function friendlyTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

function friendlyDay(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

// ── Operator badge color ──────────────────────────────────────────────────────

function operatorColor(op: string) {
  if (op === "Kosmos") return "text-sky-300/70 bg-sky-900/30 border-sky-700/25";
  if (op === "BLS")    return "text-orange-300/70 bg-orange-900/25 border-orange-700/20";
  if (op === "iDATA")  return "text-violet-300/70 bg-violet-900/30 border-violet-700/25";
  return "text-slate-300/60 bg-slate-800/40 border-slate-700/30"; // VFS
}

// ── Bulletin card ─────────────────────────────────────────────────────────────

function BulletinCard({ b, index }: { b: typeof BULLETINS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: Math.min(index * 0.05, 0.35) }}
      className="card p-5 border-[#D4A843]/10 hover:border-[#D4A843]/22 transition-all flex flex-col gap-3"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[2rem] leading-none shrink-0">{b.flag}</span>
          <div>
            <p className="text-[15px] font-semibold text-[#F0EBE0]/85 leading-tight">{b.country}</p>
            <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${operatorColor(b.operator)}`}>
              {b.operator}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[11px] text-[#F0EBE0]/35 font-light">{b.date}</p>
          <p className="text-[11px] text-[#D4A843]/45 font-mono">{b.time}</p>
        </div>
      </div>

      {/* Cities */}
      <div className="flex items-center gap-1.5 text-[11px] text-[#F0EBE0]/30 font-light">
        <MapPin size={10} className="shrink-0 text-[#F0EBE0]/20" />
        {b.cities}
      </div>

      {/* Info */}
      <p className="text-[13px] text-[#F0EBE0]/60 font-light leading-[1.65] border-l-2 border-[#D4A843]/20 pl-3">
        {b.info}
      </p>
    </motion.div>
  );
}

// ── Calendar picker ───────────────────────────────────────────────────────────

function CalendarPicker({
  selected, onChange, month, setMonth,
}: {
  selected: string[];
  onChange: (d: string[]) => void;
  month: Date;
  setMonth: (d: Date) => void;
}) {
  const y  = month.getFullYear();
  const mi = month.getMonth();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDOW = (new Date(y, mi, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, mi + 1, 0).getDate();

  const cells: (number | null)[] = Array(firstDOW).fill(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(new Date(y, mi - 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-white/8 flex items-center justify-center text-[#F0EBE0]/35 hover:text-[#F0EBE0]/70 transition-colors">
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-medium text-[#F0EBE0]/65">
          {TR_MONTHS[mi]} {y}
        </span>
        <button onClick={() => setMonth(new Date(y, mi + 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-white/8 flex items-center justify-center text-[#F0EBE0]/35 hover:text-[#F0EBE0]/70 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1.5">
        {TR_DAYS.map(d => (
          <div key={d} className="text-center text-[10px] text-[#F0EBE0]/22 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const iso  = isoDate(y, mi, day);
          const dt   = new Date(y, mi, day);
          const past = dt < today;
          const sel  = selected.includes(iso);
          return (
            <button key={i} disabled={past}
              onClick={() => onChange(sel ? selected.filter(s => s !== iso) : [...selected, iso])}
              className={`mx-auto flex items-center justify-center w-8 h-8 rounded-full text-[13px] transition-all ${
                sel  ? "bg-[#D4A843] text-[#111111] font-semibold shadow-md" :
                past ? "text-[#F0EBE0]/10 cursor-not-allowed" :
                       "text-[#F0EBE0]/50 hover:bg-white/10 hover:text-[#F0EBE0]"
              }`}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Submitted card ────────────────────────────────────────────────────────────

function SharedCard({ apt }: { apt: SharedAppointment }) {
  const [showImg, setShowImg] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      className="card p-5 flex flex-col gap-3.5 border-[#D4A843]/12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{apt.flag}</span>
          <div>
            <p className="text-[15px] font-semibold text-[#F0EBE0]/85 leading-tight">{apt.country}</p>
            <p className="text-xs text-[#F0EBE0]/30 font-light mt-0.5">{apt.center}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#F0EBE0]/35 font-light">{friendlyDay(apt.submittedAt)}</p>
          <p className="text-[11px] text-[#F0EBE0]/20 font-light">{friendlyTime(apt.submittedAt)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[...apt.dates].sort().map(d => (
          <span key={d}
            className="flex items-center gap-1.5 text-xs bg-[#D4A843]/10 border border-[#D4A843]/20 rounded-full px-3 py-1.5 text-[#D4A843]/80 font-medium">
            <Calendar size={9} />
            {friendlyDate(d)}
          </span>
        ))}
      </div>
      {apt.note && (
        <p className="text-[13px] text-[#F0EBE0]/38 font-light italic border-l-2 border-[#D4A843]/20 pl-3 leading-relaxed">
          &ldquo;{apt.note}&rdquo;
        </p>
      )}
      {apt.screenshot && (
        <div>
          <button onClick={() => setShowImg(!showImg)}
            className="flex items-center gap-1.5 text-[12px] text-[#D4A843]/45 hover:text-[#D4A843] transition-colors">
            <ImageIcon size={11} />
            {showImg ? "Görüntüyü gizle" : "Ekran görüntüsünü göster"}
          </button>
          {showImg && (
            <img src={apt.screenshot} alt="Randevu ekran görüntüsü"
              className="mt-3 max-h-56 w-full rounded-xl border border-white/8 object-contain bg-[#0F0F0F]" />
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/50 mt-2">
            <CheckCircle2 size={11} />
            Ekran görüntüsüyle doğrulanmış
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "sp_apts_v1";

export default function AppointmentsSection() {
  const [apts, setApts]         = useState<SharedAppointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep]         = useState<1 | 2 | 3>(1);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const [selCountry, setSelCountry] = useState<Country | null>(null);
  const [selDates, setSelDates]     = useState<string[]>([]);
  const [note, setNote]             = useState("");
  const [calMonth, setCalMonth]     = useState(new Date());
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [success, setSuccess]       = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setApts(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (updated: SharedAppointment[]) => {
    setApts(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setScreenshot(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const resetForm = () => {
    setSelCountry(null); setSelDates([]); setNote(""); setScreenshot(null); setStep(1);
  };

  const handleSubmit = () => {
    if (!selCountry || selDates.length === 0) return;
    const apt: SharedAppointment = {
      id: Date.now().toString(),
      flag:        selCountry.flag,
      country:     selCountry.name,
      center:      selCountry.center,
      dates:       [...selDates].sort(),
      note:        note.trim() || undefined,
      screenshot:  screenshot ?? undefined,
      submittedAt: new Date().toISOString(),
    };
    persist([apt, ...apts]);
    resetForm();
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const autoText = selCountry && selDates.length > 0
    ? `${selCountry.flag} ${selCountry.name} (${selCountry.center}) — ${[...selDates].sort().map(friendlyDate).join(", ")} tarihlerinde boş randevu slotu tespit edildi. Portal'dan kontrol ederek doğrulayın.`
    : "";

  const [showAllBulletins, setShowAllBulletins] = useState(false);
  const BULLETINS_INITIAL = 6;

  // Unique countries in bulletins for filter chips
  const bulletinCountries = [...new Set(BULLETINS.map(b => b.country))];
  const filteredBulletins = filterCountry
    ? BULLETINS.filter(b => b.country === filterCountry)
    : BULLETINS;
  const visibleBulletins = showAllBulletins ? filteredBulletins : filteredBulletins.slice(0, BULLETINS_INITIAL);

  return (
    <section id="appointments" className="section-ink2 py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="badge mb-5">
            <Bell size={10} className="text-[#D4A843]" />
            Randevu Duyuruları
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
                Boş Schengen<br />
                <em className="not-italic italic opacity-60">Randevuları</em>
              </h2>
              <p className="mt-5 text-[#F0EBE0]/60 font-light text-[17px] max-w-lg leading-[1.75]">
                Vize merkezlerinde tespit edilen boş randevu slotları burada paylaşılır.
                Her duyuruda yetkili kuruluş ve şehir bilgisi yer alır.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/25 border border-emerald-700/25 text-emerald-400/70 text-[11px] font-medium">
                <ShieldCheck size={11} />
                Editör doğrulamalı
              </div>
              <button onClick={() => { setShowForm(v => !v); if (showForm) resetForm(); }}
                className="flex items-center gap-2 bg-[#D4A843] hover:bg-[#C89A35] text-[#111111] font-semibold text-sm px-5 py-3 rounded-full transition-colors"
                style={{ boxShadow: "0 3px 18px rgba(212,168,67,0.28)" }}>
                {showForm ? <X size={14} /> : <Plus size={14} />}
                {showForm ? "Kapat" : "Siz de Paylaşın"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Success banner ── */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 bg-emerald-900/30 border border-emerald-500/20 rounded-xl px-5 py-4 mb-8">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <p className="text-[15px] text-emerald-300/80 font-light">Paylaşımınız alındı. Teşekkürler!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Community form ── */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-10">
              <div className="card p-6 md:p-8 border-[#D4A843]/14">
                <div className="flex items-center gap-2 mb-8">
                  {([1, 2, 3] as const).map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                        step === s ? "bg-[#D4A843] text-[#111111]" :
                        step > s  ? "bg-emerald-500/60 text-white"  :
                                    "bg-white/8 text-[#F0EBE0]/25"
                      }`}>
                        {step > s ? "✓" : s}
                      </div>
                      {s < 3 && <div className={`h-px w-8 transition-colors ${step > s ? "bg-emerald-500/40" : "bg-white/8"}`} />}
                    </div>
                  ))}
                  <span className="ml-3 text-xs text-[#F0EBE0]/28 font-light">
                    {step === 1 ? "Ülke seç" : step === 2 ? "Tarih işaretle" : "Önizle ve paylaş"}
                  </span>
                  <button onClick={() => { setShowForm(false); resetForm(); }}
                    className="ml-auto text-[#F0EBE0]/20 hover:text-[#F0EBE0]/50 transition-colors">
                    <X size={15} />
                  </button>
                </div>

                {/* STEP 1: Country */}
                {step === 1 && (
                  <div>
                    <p className="text-[#F0EBE0]/50 text-[15px] font-light mb-6 leading-relaxed">
                      Boş randevu tespit ettiğiniz Schengen ülkesini seçin:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-7">
                      {SCHENGEN.map(c => (
                        <button key={c.code} onClick={() => setSelCountry(c)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all ${
                            selCountry?.code === c.code
                              ? "border-[#D4A843]/50 bg-[#D4A843]/10 text-[#F0EBE0]/90"
                              : "border-white/7 bg-white/3 text-[#F0EBE0]/40 hover:border-white/14 hover:text-[#F0EBE0]/65"
                          }`}>
                          <span className="text-xl shrink-0 leading-none">{c.flag}</span>
                          <div className="min-w-0">
                            <p className="text-[13px] font-medium truncate leading-tight">{c.name}</p>
                            <p className="text-[10px] opacity-50 truncate mt-0.5">{c.center}</p>
                            <p className="text-[9px] opacity-28 truncate mt-0.5 flex items-center gap-0.5">
                              <MapPin size={7} className="shrink-0" />
                              {c.cities}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {selCountry && (
                      <div className="mb-5 p-3 bg-[#0F0F0F] border border-white/6 rounded-xl text-[12px] text-[#F0EBE0]/38 font-light flex items-start gap-2">
                        <MapPin size={11} className="text-[#D4A843]/40 shrink-0 mt-0.5" />
                        <span>
                          <span className="text-[#F0EBE0]/55">{selCountry.center}</span>
                          &nbsp;— Yetki alanı: {selCountry.cities}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button disabled={!selCountry} onClick={() => setStep(2)}
                        className="px-7 py-2.5 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all">
                        İleri →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Calendar */}
                {step === 2 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[#F0EBE0]/50 text-[15px] font-light mb-5 leading-relaxed">
                        {selCountry?.flag} {selCountry?.name} ({selCountry?.center}) — Boş gördüğünüz tarihleri işaretleyin:
                      </p>
                      <div className="bg-[#0F0F0F] border border-white/6 rounded-2xl p-5">
                        <CalendarPicker selected={selDates} onChange={setSelDates}
                          month={calMonth} setMonth={setCalMonth} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">Seçilen Tarihler</p>
                        {selDates.length === 0 ? (
                          <p className="text-[#F0EBE0]/18 text-[13px] font-light">Takvimden tarih seçin</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {[...selDates].sort().map(d => (
                              <span key={d}
                                className="flex items-center gap-1.5 text-[12px] bg-[#D4A843]/10 border border-[#D4A843]/20 rounded-full px-3 py-1.5 text-[#D4A843]/80">
                                <Calendar size={9} />
                                {friendlyDate(d)}
                                <button onClick={() => setSelDates(selDates.filter(s => s !== d))}
                                  className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity">
                                  <X size={9} />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2">
                          Not <span className="normal-case text-[9px] opacity-60">— İsteğe Bağlı</span>
                        </p>
                        <textarea value={note} onChange={e => setNote(e.target.value)}
                          placeholder="Örn: Sabah 09:00-10:00 arası gördüm, İstanbul VFS merkezi"
                          rows={3}
                          className="w-full bg-[#0F0F0F] border border-white/8 rounded-xl px-4 py-3 text-[13px] text-[#F0EBE0]/60 font-light placeholder-[#F0EBE0]/18 outline-none focus:border-[#D4A843]/28 resize-none transition-colors" />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <button onClick={() => setStep(1)}
                          className="text-sm text-[#F0EBE0]/28 hover:text-[#F0EBE0]/60 transition-colors">
                          ← Geri
                        </button>
                        <button disabled={selDates.length === 0} onClick={() => setStep(3)}
                          className="px-7 py-2.5 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all">
                          Önizle →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Preview */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">Paylaşım Metni</p>
                      <div className="bg-[#0F0F0F] border border-white/6 rounded-xl p-5">
                        <p className="text-[15px] text-[#F0EBE0]/70 font-light leading-[1.7]">{autoText}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-1">Ekran Görüntüsü</p>
                      <p className="text-[12px] text-[#F0EBE0]/25 font-light mb-3">
                        İsteğe bağlı — randevu portalının görüntüsünü ekleyerek paylaşımınızı doğrulayın
                      </p>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                      {!screenshot ? (
                        <button onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-2.5 border border-dashed border-white/10 rounded-xl px-5 py-4 text-[13px] text-[#F0EBE0]/28 hover:border-[#D4A843]/25 hover:text-[#F0EBE0]/55 transition-all">
                          <Upload size={14} />
                          Görüntü yükle (JPG, PNG)
                        </button>
                      ) : (
                        <div>
                          <div className="relative inline-block">
                            <img src={screenshot} alt="Ekran görüntüsü önizlemesi"
                              className="max-h-44 rounded-xl border border-white/8 object-contain bg-[#0F0F0F]" />
                            <button onClick={() => setScreenshot(null)}
                              className="absolute top-2 right-2 w-6 h-6 bg-[#111]/80 rounded-full flex items-center justify-center text-[#F0EBE0]/50 hover:text-[#F0EBE0] transition-colors">
                              <X size={11} />
                            </button>
                          </div>
                          <p className="flex items-center gap-1.5 text-[11px] text-emerald-400/55 mt-2">
                            <CheckCircle2 size={11} />
                            Görüntü eklendi — paylaşım doğrulanmış olarak işaretlenecek
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <button onClick={() => setStep(2)}
                        className="text-sm text-[#F0EBE0]/28 hover:text-[#F0EBE0]/60 transition-colors">
                        ← Geri
                      </button>
                      <button onClick={handleSubmit}
                        disabled={selDates.length === 0}
                        className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all"
                        style={{ boxShadow: "0 3px 18px rgba(212,168,67,0.3)" }}>
                        <CheckCircle2 size={14} />
                        Paylaş
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bulletin filter chips ── */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => { setFilterCountry(null); setShowAllBulletins(false); }}
            className={`px-4 py-1.5 rounded-full text-[12px] transition-all ${
              !filterCountry ? "bg-[#D4A843] text-[#111111] font-semibold" : "border border-white/8 text-[#F0EBE0]/30 hover:text-[#F0EBE0]/60"
            }`}>
            Tümü
          </button>
          {bulletinCountries.map(c => (
            <button key={c} onClick={() => { setFilterCountry(filterCountry === c ? null : c); setShowAllBulletins(false); }}
              className={`px-4 py-1.5 rounded-full text-[12px] transition-all ${
                filterCountry === c ? "bg-[#D4A843]/90 text-[#111111] font-semibold" : "border border-white/8 text-[#F0EBE0]/30 hover:text-[#F0EBE0]/60"
              }`}>
              {BULLETINS.find(b => b.country === c)?.flag} {c}
            </button>
          ))}
        </div>

        {/* ── Bulletin grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {visibleBulletins.map((b, i) => (
            <BulletinCard key={i} b={b} index={i} />
          ))}
        </div>
        {!showAllBulletins && filteredBulletins.length > BULLETINS_INITIAL && (
          <div className="flex justify-center mb-14">
            <button onClick={() => setShowAllBulletins(true)}
              className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-3 rounded-full transition-all">
              Daha Fazla Göster
              <span className="text-xs text-[#D4A843]/45 font-medium">+{filteredBulletins.length - BULLETINS_INITIAL} duyuru</span>
            </button>
          </div>
        )}
        {showAllBulletins && (
          <div className="flex justify-center mb-14">
            <button onClick={() => setShowAllBulletins(false)}
              className="text-sm text-[#F0EBE0]/22 hover:text-[#F0EBE0]/50 font-light transition-colors">
              Daha Az Göster ↑
            </button>
          </div>
        )}
        {showAllBulletins || filteredBulletins.length <= BULLETINS_INITIAL ? <div className="mb-14" /> : null}

        {/* ── Community submissions ── */}
        {apts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-white/5" />
              <p className="text-[11px] text-[#F0EBE0]/22 uppercase tracking-widest font-light">Topluluk Paylaşımları</p>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="space-y-4">
              {apts.map(apt => <SharedCard key={apt.id} apt={apt} />)}
            </div>
          </div>
        )}

        {apts.length === 0 && !showForm && (
          <div className="text-center py-8">
            <p className="text-[13px] text-[#F0EBE0]/20 font-light">
              Siz de boş bir randevu slotu görürseniz &ldquo;Siz de Paylaşın&rdquo; butonu ile topluluğa bildirin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
