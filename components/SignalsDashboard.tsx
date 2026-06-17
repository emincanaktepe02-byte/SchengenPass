"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Filter } from "lucide-react";
import SignalCard from "@/components/SignalCard";
import { MOCK_SIGNALS } from "@/lib/data";
import { COUNTRIES } from "@/lib/data";

const VISIBLE_CODES = new Set(COUNTRIES.filter((c) => c.visible).map((c) => c.code));

export default function SignalsDashboard() {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [count, setCount] = useState(0);

  // Animate signal counter
  useEffect(() => {
    const target = MOCK_SIGNALS.filter((s) => s.isActive).length;
    let current = 0;
    const t = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  const filtered = MOCK_SIGNALS.filter((s) => {
    if (filter === "active") return s.isActive;
    if (filter === "inactive") return !s.isActive;
    return true;
  });

  const visibleSignals = filtered.filter((s) => VISIBLE_CODES.has(s.countryCode));
  const premiumSignals = filtered.filter((s) => !VISIBLE_CODES.has(s.countryCode));

  return (
    <section id="signals" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
              <Activity size={12} className="text-green-400" />
              <span className="text-xs text-white/50 font-light">Canlı İzleme Aktif</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Güncel Randevu Sinyalleri
            </h2>
            <p className="text-white/40 font-light text-sm mt-3 max-w-lg">
              Her 3 dakikada bir VFS Global'deki tüm Türkiye uygulama merkezleri otomatik olarak kontrol edilir.
              Boşluk bulunduğu anda aşağıda görünür.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live counter */}
            <div className="text-right">
              <div className="text-3xl font-light text-white tabular-nums">{count}</div>
              <div className="text-xs text-white/30 font-light">aktif sinyal</div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1 border border-white/10 rounded-full p-1">
              {(["all", "active", "inactive"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs rounded-full px-3 py-1 transition-all ${
                    filter === f ? "bg-white text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {f === "all" ? "Tümü" : f === "active" ? "Aktif" : "Doldu"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visible signals label */}
        {visibleSignals.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-white/30 font-light uppercase tracking-widest">Ücretsiz Sinyaller</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
        )}

        {/* Visible signal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {visibleSignals.map((signal, i) => (
            <SignalCard key={signal.id} signal={signal} index={i} />
          ))}
        </div>

        {/* Premium signals label */}
        {premiumSignals.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-white/30 font-light uppercase tracking-widest">Premium Sinyaller</span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-white/20">Temel Plan gerekli</span>
          </div>
        )}

        {/* Premium signal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {premiumSignals.map((signal, i) => (
            <SignalCard key={signal.id} signal={signal} isPremium index={visibleSignals.length + i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-4 border border-white/5 rounded-[10px] bg-white/[0.02] text-center"
        >
          <p className="text-xs text-white/30 font-light">
            Sistem her 3 dakikada bir Avusturya, Belçika, Bulgaristan, İsviçre, Çek Cumhuriyeti, Danimarka, Estonya, Finlandiya,
            Fransa, Hırvatistan, İzlanda, Litvanya, Lüksemburg, Letonya, Malta, Hollanda, Norveç, Polonya, Slovenya
            ve İsveç konsolosluklarını otomatik tarar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
