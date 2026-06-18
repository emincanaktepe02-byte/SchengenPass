"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, AlertCircle, ExternalLink, Search } from "lucide-react";
import { COUNTRIES } from "@/lib/data";

function CountryCard({ country, index }: { country: typeof COUNTRIES[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      className="bg-[#202020] border border-white/5 rounded-[10px] overflow-hidden hover:border-white/10 transition-colors"
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between p-6 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <div className="text-sm font-medium text-white">{country.name}</div>
              <div className="text-[11px] text-white/30 font-light">{country.popularCity}</div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/8 rounded-full px-2.5 py-1 text-white/40">
              <Clock size={9} />
              {country.processingTime}
            </span>
            <span className="inline-flex text-[10px] bg-white/5 border border-white/8 rounded-full px-2.5 py-1 text-white/40">
              Ort. bekleme: {country.avgWait}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-white/20 mt-1 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-5">
              {/* Tips */}
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">İpuçları</p>
                <ul className="space-y-2">
                  {country.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/45 font-light leading-relaxed">
                      <span className="text-white/20 shrink-0 mt-0.5">·</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Gerekli Belgeler</p>
                <div className="flex flex-wrap gap-1.5">
                  {country.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white/[0.04] border border-white/8 rounded-full px-2.5 py-1 text-white/40"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Centers */}
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">VFS Merkezleri</p>
                <p className="text-xs text-white/35 font-light">{country.centers.join(", ")}</p>
              </div>

              {/* Official link */}
              <div className="flex items-start gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-3">
                <AlertCircle size={12} className="text-white/25 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] text-white/30 font-light leading-relaxed">
                    Vize kuralları değişebilir. Başvuru öncesi resmi kaynaktan doğrulayın.
                  </p>
                  <a
                    href={`https://visa.vfsglobal.com/tur/en/${country.code}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-white/35 hover:text-white/60 transition-colors mt-1.5 underline underline-offset-2"
                  >
                    VFS {country.name} sayfası
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

export default function CountryGuide() {
  const [query, setQuery] = useState("");

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.popularCity.toLowerCase().includes(query.toLowerCase())
  );

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
                Gerekli belgeler, başvuru ipuçları ve VFS merkezleri. Her ülke için detayları görmek için karta tıklayın.
              </p>
            </div>

            {/* Search */}
            <div className="relative shrink-0 w-full md:w-64">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Ülke ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/8 rounded-full pl-8 pr-4 py-2.5 text-sm text-white/60 font-light placeholder-white/20 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start gap-2.5 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 mb-8 max-w-2xl"
        >
          <AlertCircle size={14} className="text-white/30 shrink-0 mt-0.5" />
          <p className="text-xs text-white/30 font-light leading-relaxed">
            Bu rehberdeki bilgiler genel bilgilendirme amaçlıdır. Vize kuralları sık değiştiğinden
            başvuru öncesi mutlaka{" "}
            <a
              href="https://visa.vfsglobal.com/tur/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/50 transition-colors"
            >
              VFS Global
            </a>{" "}
            veya ilgili konsolosluğun resmi sitesini kontrol edin.
          </p>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/25 text-sm font-light">"{query}" için sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((country, i) => (
              <CountryCard key={country.code} country={country} index={i} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-white/15 font-light"
        >
          {filtered.length} ülke gösteriliyor · İçerik elle küratörlenmiştir
        </motion.p>
      </div>
    </section>
  );
}
