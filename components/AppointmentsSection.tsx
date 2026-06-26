"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ChevronLeft, ChevronRight, X,
  CheckCircle2, Plus, Bell, ShieldCheck, MapPin, Flag,
} from "lucide-react";
import { BULLETINS } from "@/lib/appointments-bulletin";
import type { CommunityAppointment } from "@/app/api/appointments/route";
import SceneryBg from "@/components/SceneryBg";

// ── Cloudflare Turnstile global tipi ─────────────────────────────────────────
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset:  (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// ── 26 Schengen ülkesi ────────────────────────────────────────────────────────
const SCHENGEN = [
  { code: "DE", name: "Almanya",       flag: "🇩🇪", center: "iDATA",             citiesStr: "İstanbul · Ankara · İzmir · Bursa"                },
  { code: "AT", name: "Avusturya",     flag: "🇦🇹", center: "VFS Global",        citiesStr: "İstanbul · Ankara · İzmir"                        },
  { code: "BE", name: "Belçika",       flag: "🇧🇪", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "CZ", name: "Çekya",         flag: "🇨🇿", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "DK", name: "Danimarka",     flag: "🇩🇰", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "EE", name: "Estonya",       flag: "🇪🇪", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "FI", name: "Finlandiya",    flag: "🇫🇮", center: "VFS Global",        citiesStr: "İstanbul · Ankara · İzmir · Antalya"              },
  { code: "FR", name: "Fransa",        flag: "🇫🇷", center: "VFS Global",        citiesStr: "İst. Şişli · İst. Kadıköy · Ankara · İzmir"       },
  { code: "NL", name: "Hollanda",      flag: "🇳🇱", center: "VFS Global",        citiesStr: "İstanbul · Ankara · İzmir"                        },
  { code: "IS", name: "İzlanda",       flag: "🇮🇸", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "ES", name: "İspanya",       flag: "🇪🇸", center: "BLS International", citiesStr: "İstanbul (İzmir dahil) · Ankara"                  },
  { code: "SE", name: "İsveç",         flag: "🇸🇪", center: "VFS Global",        citiesStr: "İstanbul · Ankara · Antalya"                      },
  { code: "CH", name: "İsviçre",       flag: "🇨🇭", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "IT", name: "İtalya",        flag: "🇮🇹", center: "iDATA",             citiesStr: "İstanbul · Ankara · İzmir"                        },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮", center: "Konsolosluk",       citiesStr: "İstanbul (İsviçre Başkonsolosluğu)"               },
  { code: "LT", name: "Litvanya",      flag: "🇱🇹", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "LV", name: "Letonya",       flag: "🇱🇻", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "LU", name: "Lüksemburg",    flag: "🇱🇺", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "HU", name: "Macaristan",    flag: "🇭🇺", center: "AS Visa Solutions", citiesStr: "İstanbul · Ankara"                                },
  { code: "MT", name: "Malta",         flag: "🇲🇹", center: "VFS Global",        citiesStr: "İstanbul · Ankara · İzmir"                        },
  { code: "NO", name: "Norveç",        flag: "🇳🇴", center: "VFS Global",        citiesStr: "İstanbul · Ankara · İzmir · Antalya"              },
  { code: "PL", name: "Polonya",       flag: "🇵🇱", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "PT", name: "Portekiz",      flag: "🇵🇹", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "SK", name: "Slovakya",      flag: "🇸🇰", center: "BLS International", citiesStr: "İstanbul · Ankara"                                },
  { code: "SI", name: "Slovenya",      flag: "🇸🇮", center: "VFS Global",        citiesStr: "İstanbul · Ankara"                                },
  { code: "GR", name: "Yunanistan",    flag: "🇬🇷", center: "Kosmos Vize",       citiesStr: "İstanbul · Ankara · İzmir"                        },
] as const;

type SchengenEntry = typeof SCHENGEN[number];

// ── Takvim yardımcıları ───────────────────────────────────────────────────────
const TR_MONTHS = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const TR_DAYS   = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function friendlyDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${TR_MONTHS[m - 1]} ${y}`;
}
function friendlyDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}
function friendlyTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}
function friendlyDay(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

// ── Operatör rengi ────────────────────────────────────────────────────────────
function operatorColor(op: string) {
  if (op.startsWith("Kosmos"))  return "text-sky-300/70 bg-sky-900/30 border-sky-700/25";
  if (op.startsWith("BLS"))     return "text-orange-300/70 bg-orange-900/25 border-orange-700/20";
  if (op.startsWith("iDATA") || op.startsWith("iData")) return "text-violet-300/70 bg-violet-900/30 border-violet-700/25";
  if (op.startsWith("AS"))      return "text-emerald-300/70 bg-emerald-900/25 border-emerald-700/20";
  return "text-slate-300/60 bg-slate-800/40 border-slate-700/30";
}

// ── Takvim bileşeni ───────────────────────────────────────────────────────────
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
  const today = new Date(); today.setHours(0, 0, 0, 0);
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
        <span className="text-sm font-medium text-[#F0EBE0]/65">{TR_MONTHS[mi]} {y}</span>
        <button onClick={() => setMonth(new Date(y, mi + 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-white/8 flex items-center justify-center text-[#F0EBE0]/35 hover:text-[#F0EBE0]/70 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1.5">
        {TR_DAYS.map(d => <div key={d} className="text-center text-[10px] text-[#F0EBE0]/22 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const iso  = isoDate(y, mi, day);
          const past = new Date(y, mi, day) < today;
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

// ── Editör bülten kartı ───────────────────────────────────────────────────────
function BulletinCard({ b, index }: { b: typeof BULLETINS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: Math.min(index * 0.05, 0.35) }}
      className="card p-5 border-[#D4A843]/10 hover:border-[#D4A843]/22 transition-all flex flex-col gap-3"
    >
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
      <div className="flex items-center gap-1.5 text-[11px] text-[#F0EBE0]/30 font-light">
        <MapPin size={10} className="shrink-0 text-[#F0EBE0]/20" />
        {b.cities}
      </div>
      <p className="text-[13px] text-[#F0EBE0]/60 font-light leading-[1.65] border-l-2 border-[#D4A843]/20 pl-3">
        {b.info}
      </p>
    </motion.div>
  );
}

// ── Topluluk kartı ────────────────────────────────────────────────────────────
function CommunityCard({ apt, onReport }: { apt: CommunityAppointment; onReport: (id: string) => void }) {
  const [reported, setReported] = useState(false);

  const handleReport = async () => {
    if (reported) return;
    setReported(true);
    try {
      await fetch("/api/appointments/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: apt.id }),
      });
      onReport(apt.id);
    } catch { /* sessizce başarısız */ }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="card p-5 flex flex-col gap-3 border-white/8 hover:border-[#D4A843]/15 transition-all">
      {/* Üst satır */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{apt.flag}</span>
          <div>
            <p className="text-[15px] font-semibold text-[#F0EBE0]/80 leading-tight">{apt.country}</p>
            <p className="text-[11px] text-[#F0EBE0]/28 font-light mt-0.5">{apt.center}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[11px] text-[#F0EBE0]/35 font-light">{friendlyDay(apt.submittedAt)}</p>
          <p className="text-[11px] text-[#F0EBE0]/20 font-light">{friendlyTime(apt.submittedAt)}</p>
        </div>
      </div>

      {/* Şehirler */}
      {apt.cities.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-[#F0EBE0]/28 font-light">
          <MapPin size={9} className="shrink-0 text-[#F0EBE0]/18" />
          {apt.cities.join(" · ")}
        </div>
      )}

      {/* Tarihler */}
      <div className="flex flex-wrap gap-1.5">
        {[...apt.dates].sort().map(d => (
          <span key={d}
            className="flex items-center gap-1 text-[11px] bg-[#D4A843]/8 border border-[#D4A843]/15 rounded-full px-2.5 py-1 text-[#D4A843]/70 font-medium">
            <Calendar size={8} />
            {friendlyDateShort(d)}
          </span>
        ))}
      </div>

      {/* Bildir butonu */}
      <div className="flex justify-end">
        <button onClick={handleReport} disabled={reported}
          className={`text-[10px] font-light transition-colors ${
            reported ? "text-[#F0EBE0]/15 cursor-default" : "text-[#F0EBE0]/18 hover:text-red-400/50"
          }`}>
          {reported ? "Bildirildi" : "Yanlış bildir"}
        </button>
      </div>
    </motion.div>
  );
}

// ── Cloudflare Turnstile bileşeni ─────────────────────────────────────────────
// Test sitekey (1x00000000000000000000AA) → her zaman geçer, üretimde gerçek key kullan.
function TurnstileWidget({ onToken, onExpire }: { onToken: (t: string) => void; onExpire: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

  useEffect(() => {
    let widgetId: string | undefined;

    const render = () => {
      if (!ref.current || !window.turnstile) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey:            siteKey,
        callback:           onToken,
        "expired-callback": onExpire,
        theme:              "dark",
        size:               "normal",
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector('script[data-turnstile]');
      if (!existing) {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        s.async = true;
        s.dataset.turnstile = "1";
        s.onload = render;
        document.head.appendChild(s);
      } else {
        const interval = setInterval(() => {
          if (window.turnstile) { clearInterval(interval); render(); }
        }, 100);
        return () => clearInterval(interval);
      }
    }

    return () => {
      if (widgetId && window.turnstile) {
        try { window.turnstile.remove(widgetId); } catch { /* ignore */ }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="mt-1" />;
}

// ── Ana bileşen ───────────────────────────────────────────────────────────────
export default function AppointmentsSection() {
  // Aktif sekme
  const [activeTab, setActiveTab] = useState<"bulletins" | "community">("bulletins");

  // Editör bülten filtresi
  const [filterCountry, setFilterCountry]         = useState<string | null>(null);
  const [showAllBulletins, setShowAllBulletins]   = useState(false);
  const BULLETINS_INITIAL = 6;

  // Topluluk paylaşımları (KV'den)
  const [communityApts, setCommunityApts]   = useState<CommunityAppointment[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [showAllCommunity, setShowAllCommunity] = useState(false);
  const COMMUNITY_INITIAL = 6;

  // Form durumu
  const [showForm, setShowForm]           = useState(false);
  const [step, setStep]                   = useState<1 | 2 | 3>(1);
  const [selCountry, setSelCountry]       = useState<SchengenEntry | null>(null);
  const [selCities, setSelCities]         = useState<string[]>([]);
  const [selDates, setSelDates]           = useState<string[]>([]);
  const [calMonth, setCalMonth]           = useState(new Date());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting]       = useState(false);
  const [success, setSuccess]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);

  // Topluluk paylaşımlarını yükle
  const fetchCommunity = async () => {
    try {
      setCommunityLoading(true);
      const res = await fetch("/api/appointments");
      const data = await res.json() as { appointments: CommunityAppointment[] };
      setCommunityApts(data.appointments ?? []);
    } catch { /* yok sayılır */ } finally {
      setCommunityLoading(false);
    }
  };

  useEffect(() => { fetchCommunity(); }, []);

  const resetForm = () => {
    setSelCountry(null); setSelCities([]); setSelDates([]);
    setTurnstileToken(null); setStep(1); setError(null);
  };

  const handleSubmit = async () => {
    if (!selCountry || selDates.length === 0 || !turnstileToken) return;
    setSubmitting(true); setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryCode:    selCountry.code,
          flag:           selCountry.flag,
          country:        selCountry.name,
          center:         selCountry.center,
          cities:         selCities.length > 0 ? selCities : selCountry.citiesStr.split(" · "),
          dates:          [...selDates].sort(),
          turnstileToken,
        }),
      });
      if (res.status === 429) { setError("Çok fazla paylaşım yaptınız. Lütfen bir süre bekleyin."); return; }
      if (res.status === 403) { setError("Captcha doğrulaması başarısız. Lütfen tekrar deneyin."); return; }
      if (!res.ok)            { setError("Bir hata oluştu. Lütfen tekrar deneyin."); return; }

      resetForm(); setShowForm(false); setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      fetchCommunity();
      setActiveTab("community");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  // Ülke şehirlerini dizi olarak al
  const countryCity = (c: SchengenEntry) => c.citiesStr.split(" · ");

  // Filtreler
  const bulletinCountries  = [...new Set(BULLETINS.map(b => b.country))];
  const filteredBulletins  = filterCountry ? BULLETINS.filter(b => b.country === filterCountry) : BULLETINS;
  const visibleBulletins   = showAllBulletins ? filteredBulletins : filteredBulletins.slice(0, BULLETINS_INITIAL);
  const visibleCommunity   = showAllCommunity ? communityApts : communityApts.slice(0, COMMUNITY_INITIAL);

  const handleRemoveReported = (id: string) => {
    setCommunityApts(prev => prev.filter(a => a.id !== id));
  };

  const autoText = selCountry && selDates.length > 0
    ? `${selCountry.flag} ${selCountry.name} (${selCountry.center}${selCities.length > 0 ? " — " + selCities.join(", ") : ""}) — ${[...selDates].sort().map(friendlyDate).join(", ")} tarihlerinde boş randevu slotu tespit edildi.`
    : "";

  return (
    <section id="appointments" className="relative overflow-hidden py-28" style={{ background: "#1A1A1A" }}>
      <SceneryBg
        images={["/Paris.jpg", "/Barcelona.jpg", "/Amsterdam.jpg"]}
        darkness={86}
        interval={9}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Başlık ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="badge mb-5">
            <Bell size={10} className="text-[#D4A843]" />
            Randevu Duyuruları
          </p>
          <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
            Boş Schengen<br />
            <em className="not-italic italic opacity-60">Randevuları</em>
          </h2>
          <p className="mt-4 text-[#F0EBE0]/55 font-light text-[16px] max-w-lg leading-[1.75]">
            Vize merkezlerinde tespit edilen boş randevu slotları burada paylaşılır.
          </p>
        </motion.div>

        {/* ── Tab switcher ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="flex gap-1 mb-8 bg-[#0D0D0D]/60 backdrop-blur-sm rounded-2xl p-1 border border-white/6 w-fit">
          {(["bulletins", "community"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === tab ? "text-[#F0EBE0]/90" : "text-[#F0EBE0]/30 hover:text-[#F0EBE0]/60"
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="apt-tab-bg"
                  className="absolute inset-0 rounded-xl bg-white/8 border border-white/8"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === "bulletins" ? (
                  <><ShieldCheck size={12} className="text-[#D4A843]/70" />Editör Bültenleri</>
                ) : (
                  <>
                    <Flag size={12} className="text-sky-400/70" />
                    Kullanıcı Paylaşımları
                    {communityApts.length > 0 && (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                        {communityApts.length}
                      </span>
                    )}
                  </>
                )}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Tab içerikleri ── */}
        <AnimatePresence mode="wait">

          {/* ─────────────── SEKME 1: EDİTÖR BÜLTENLERİ ─────────────── */}
          {activeTab === "bulletins" && (
            <motion.div key="bulletins"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

              {/* Editör etiketi */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/25 border border-emerald-700/25 text-emerald-400/70 text-[11px] font-medium">
                  <ShieldCheck size={11} />Editör doğrulamalı · Resmi kanallardan derlenen duyurular
                </div>
              </div>

              {/* Filtre chipleri */}
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

              {/* Bülten kartları */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {visibleBulletins.map((b, i) => <BulletinCard key={i} b={b} index={i} />)}
              </div>
              {!showAllBulletins && filteredBulletins.length > BULLETINS_INITIAL && (
                <div className="flex justify-center mb-4">
                  <button onClick={() => setShowAllBulletins(true)}
                    className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-3 rounded-full transition-all">
                    Daha Fazla Göster
                    <span className="text-xs text-[#D4A843]/45 font-medium">+{filteredBulletins.length - BULLETINS_INITIAL} duyuru</span>
                  </button>
                </div>
              )}
              {showAllBulletins && (
                <div className="flex justify-center mb-4">
                  <button onClick={() => setShowAllBulletins(false)}
                    className="text-sm text-[#F0EBE0]/22 hover:text-[#F0EBE0]/50 font-light transition-colors">
                    Daha Az Göster ↑
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ─────────────── SEKME 2: KULLANICI PAYLAŞIMLARI ─────────────── */}
          {activeTab === "community" && (
            <motion.div key="community"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

              {/* Başarı banner */}
              <AnimatePresence>
                {success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 bg-emerald-900/30 border border-emerald-500/20 rounded-xl px-5 py-4 mb-6">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <p className="text-[15px] text-emerald-300/80 font-light">Paylaşımınız yayınlandı. Teşekkürler!</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* "Siz de Paylaşın" CTA */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-[13px] text-[#F0EBE0]/30 font-light">
                  Son {communityApts.length > 0 ? communityApts.length : "—"} topluluk bildirimi
                </p>
                <button onClick={() => { setShowForm(v => !v); if (showForm) resetForm(); }}
                  className="flex items-center gap-2 bg-[#D4A843] hover:bg-[#C89A35] text-[#111111] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  style={{ boxShadow: "0 3px 18px rgba(212,168,67,0.28)" }}>
                  {showForm ? <X size={13} /> : <Plus size={13} />}
                  {showForm ? "Kapat" : "Siz de Paylaşın"}
                </button>
              </div>

              {/* Form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-8">
                    <div className="card p-6 md:p-8 border-[#D4A843]/14">

                      {/* Adım göstergesi */}
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
                          {step === 1 ? "Ülke seç" : step === 2 ? "Şehir ve tarih" : "Önizle ve paylaş"}
                        </span>
                        <button onClick={() => { setShowForm(false); resetForm(); }}
                          className="ml-auto text-[#F0EBE0]/20 hover:text-[#F0EBE0]/50 transition-colors">
                          <X size={15} />
                        </button>
                      </div>

                      {/* ADIM 1 */}
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
                                  <p className="text-[10px] opacity-45 truncate mt-0.5">{c.center}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          {selCountry && (
                            <div className="mb-5 p-3 bg-[#0F0F0F] border border-white/6 rounded-xl text-[12px] text-[#F0EBE0]/38 flex items-start gap-2">
                              <MapPin size={11} className="text-[#D4A843]/40 shrink-0 mt-0.5" />
                              <span>
                                <span className="text-[#F0EBE0]/55">{selCountry.center}</span>
                                &nbsp;— Yetki alanı: {selCountry.citiesStr}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button disabled={!selCountry} onClick={() => { setSelCities([]); setStep(2); }}
                              className="px-7 py-2.5 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all">
                              İleri →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ADIM 2 */}
                      {step === 2 && selCountry && (
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-[#F0EBE0]/50 text-[15px] font-light mb-4 leading-relaxed">
                              {selCountry.flag} {selCountry.name} — Boş gördüğünüz tarihleri seçin:
                            </p>
                            <div className="bg-[#0F0F0F] border border-white/6 rounded-2xl p-5">
                              <CalendarPicker selected={selDates} onChange={setSelDates}
                                month={calMonth} setMonth={setCalMonth} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-5">
                            <div>
                              <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">Hangi merkezde?</p>
                              <div className="flex flex-wrap gap-2">
                                {countryCity(selCountry).map(city => (
                                  <button key={city} onClick={() =>
                                    setSelCities(prev =>
                                      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
                                    )}
                                    className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-all ${
                                      selCities.includes(city)
                                        ? "border-[#D4A843]/40 bg-[#D4A843]/10 text-[#F0EBE0]/80"
                                        : "border-white/8 bg-white/3 text-[#F0EBE0]/35 hover:border-white/18 hover:text-[#F0EBE0]/60"
                                    }`}>
                                    <MapPin size={9} className="shrink-0" />{city}
                                  </button>
                                ))}
                              </div>
                              {selCities.length === 0 && (
                                <p className="text-[11px] text-[#F0EBE0]/18 mt-2 font-light">En az bir merkez seçin</p>
                              )}
                            </div>
                            <div>
                              <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">Seçilen Tarihler</p>
                              {selDates.length === 0 ? (
                                <p className="text-[#F0EBE0]/18 text-[13px] font-light">Takvimden tarih seçin</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {[...selDates].sort().map(d => (
                                    <span key={d} className="flex items-center gap-1.5 text-[12px] bg-[#D4A843]/10 border border-[#D4A843]/20 rounded-full px-3 py-1.5 text-[#D4A843]/80">
                                      <Calendar size={9} />{friendlyDate(d)}
                                      <button onClick={() => setSelDates(selDates.filter(s => s !== d))}
                                        className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity"><X size={9} /></button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <button onClick={() => setStep(1)}
                                className="text-sm text-[#F0EBE0]/28 hover:text-[#F0EBE0]/60 transition-colors">← Geri</button>
                              <button disabled={selDates.length === 0 || selCities.length === 0}
                                onClick={() => setStep(3)}
                                className="px-7 py-2.5 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all">
                                Önizle →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ADIM 3 */}
                      {step === 3 && (
                        <div className="space-y-6">
                          <div>
                            <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-3">Paylaşım Önizlemesi</p>
                            <div className="bg-[#0F0F0F] border border-white/6 rounded-xl p-5">
                              <p className="text-[15px] text-[#F0EBE0]/70 font-light leading-[1.7]">{autoText}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#F0EBE0]/25 uppercase tracking-wider mb-2">Doğrulama</p>
                            <p className="text-[12px] text-[#F0EBE0]/25 font-light mb-3">Paylaşmadan önce kısa bir doğrulama tamamlayın.</p>
                            <TurnstileWidget onToken={(t: string) => setTurnstileToken(t)} onExpire={() => setTurnstileToken(null)} />
                          </div>
                          {error && (
                            <p className="text-[13px] text-red-400/70 font-light bg-red-900/15 border border-red-700/20 rounded-xl px-4 py-3">{error}</p>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <button onClick={() => setStep(2)}
                              className="text-sm text-[#F0EBE0]/28 hover:text-[#F0EBE0]/60 transition-colors">← Geri</button>
                            <button onClick={handleSubmit}
                              disabled={selDates.length === 0 || !turnstileToken || submitting}
                              className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#D4A843] text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#C89A35] transition-all"
                              style={{ boxShadow: "0 3px 18px rgba(212,168,67,0.3)" }}>
                              {submitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="w-3 h-3 border-2 border-[#111]/30 border-t-[#111] rounded-full animate-spin" />
                                  Gönderiliyor…
                                </span>
                              ) : (
                                <><CheckCircle2 size={14} /> Herkese Açık Paylaş</>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Topluluk kartları */}
              {communityLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="card p-5 animate-pulse space-y-3">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-white/6 rounded w-28" />
                          <div className="h-3 bg-white/4 rounded w-16" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-[#D4A843]/8 rounded-full w-20" />
                        <div className="h-6 bg-[#D4A843]/8 rounded-full w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : communityApts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleCommunity.map(apt => (
                      <CommunityCard key={apt.id} apt={apt} onReport={handleRemoveReported} />
                    ))}
                  </div>
                  {!showAllCommunity && communityApts.length > COMMUNITY_INITIAL && (
                    <div className="flex justify-center mt-5">
                      <button onClick={() => setShowAllCommunity(true)}
                        className="flex items-center gap-2 border border-white/8 hover:border-[#D4A843]/25 text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 text-sm font-light px-7 py-3 rounded-full transition-all">
                        Daha Fazla Göster
                        <span className="text-xs text-[#D4A843]/45 font-medium">+{communityApts.length - COMMUNITY_INITIAL}</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                !showForm && (
                  <div className="text-center py-16 border border-dashed border-white/6 rounded-2xl">
                    <Flag size={20} className="text-[#F0EBE0]/12 mx-auto mb-3" />
                    <p className="text-[13px] text-[#F0EBE0]/20 font-light">
                      Henüz topluluk paylaşımı yok — boş randevu görürseniz yukarıdaki butonu kullanın.
                    </p>
                  </div>
                )
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
